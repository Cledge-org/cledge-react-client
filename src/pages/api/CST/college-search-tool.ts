import { NextApiRequest, NextApiResponse } from "next";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
import dicts from "../../../../college-search-tool/assets/cst_result_parse.json";
import { MongoClient } from "mongodb";
import { getEnvVariable } from "src/config/getConfig";

// References:
// https://docs.microsoft.com/en-us/javascript/api/overview/azure/search-documents-readme?view=azure-node-latest

// Data Master List:
// https://docs.google.com/document/d/1K6c2FKCbVZgcndtt0A7tJAf2QgC4rzy9Tmxvf-mus9M/edit

const serviceName = "college-search-tool";
const indexName = "college-search-index";
const queryKey = "59bp6Txm4A6ualhWE86SLaC9XbIPj0SVcEKKhe7mfvAzSeAuzXJi"; // college-search-tool resource -> Keys
const endPoint = "https://" + serviceName + ".search.windows.net/";
const searchClient = new SearchClient(
  endPoint,
  indexName,
  new AzureKeyCredential(queryKey)
);

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const reqBodyJson = req.body;
  try {
    if (reqBodyJson["mode"] && reqBodyJson["mode"] === "metric") {
      const collegeMetricResult = await getCollegeMetrics(
        reqBodyJson["userTier"]
      );
      resolve.status(200).send(collegeMetricResult);
    } else {
      const { searchText, top, skip, filters, searchFields } = req.body;
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const collegeSearchResult = await getCollegeInfo(
        searchText,
        top,
        skip,
        filters,
        searchFields,
        client
      );
      resolve.status(200).send(collegeSearchResult);
    }
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Get a dictionary that maps college name with safety & target tiers
// *Only for college fit metrics*
export const getCollegeMetrics = (userTier): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {
      const selectFields: string[] = ["INSTNM", "TARGET_TIER", "SAFETY_TIER"];
      const searchOptions: any = {
        top: 7000,
        skip: 0,
        includeTotalCount: true,
        searchMode: "all",
        select: selectFields,
      };
      const searchResults = await searchClient.search("*", searchOptions);
      let output = {};
      for await (const result of searchResults.results) {
        const curCollege = result["document"];
        const curTargetTier = curCollege["TARGET_TIER"];
        const curSafetyTier = curCollege["SAFETY_TIER"];
        const collegeLabel = getCollegeLabel(
          userTier,
          curTargetTier,
          curSafetyTier
        );
        output[curCollege["INSTNM"]] = collegeLabel;
      }
      res(output);
    } catch (e) {
      err(res);
    }
  });
};

// Return a list of colleges that contains formatted attributes
// *For Searching colleges based on filters and search text*
export const getCollegeInfo = (
  searchRawText,
  top,
  skip,
  filters,
  searchFields,
  client: MongoClient
): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {

      let searchFuzzyText = toFuzzyString(searchRawText);

      const searchResults = await searchClient.search(searchFuzzyText, {
        top: top,
        skip: skip,
        includeTotalCount: true,
        searchMode: "all",
        queryType: "full",
        filter: createFilterExpression(filters),
        searchFields: searchFields,
        orderBy: ["ADM_RATE desc"],
      });
      let output = [];
      for await (const result of searchResults.results) {
        Object.keys(result["document"]).map((key) => {
          result["document"][key] = truncateNumericalResult(
            result["document"][key]
          );
        });
        output.push(await formatOutput(result["document"], client, err));
      }
      res(output);
    } catch (e) {
      err(res);
    }
  });
};

// creates filters in odata syntax
// <field> : <value>
const createFilterExpression = (filters) => {
  let filterExpressions = [];
  Object.keys(filters).forEach(function (currentValue) {
    let curKey = currentValue.split(" ");

    let curItemValue = filters[currentValue];
    if (Array.isArray(curItemValue)) {
      let filterCheckBoxExpression = [];
      curItemValue.forEach(function (curSelection) {
        filterCheckBoxExpression.push(`${currentValue} eq ${curSelection}`);
      });
      filterExpressions.push(filterCheckBoxExpression.join(" or "));
    } else {
      if (curKey.length === 1) {
        filterExpressions.push(`${currentValue} eq ${curItemValue}`);
      } else {
        if (curKey[1] === "min") {
          filterExpressions.push(`${curKey[0]} gt ${curItemValue}`);
        } else if (curKey[1] === "max") {
          filterExpressions.push(`${curKey[0]} lt ${curItemValue}`);
        }
      }
    }
  });

  return filterExpressions.join(" and ");
};

const createSortExpression = (orders) => {
  let sortExpression = "search.score() desc";
  return sortExpression;
}

const formatOutput = async (college: any, client: MongoClient, err: any) => {
  try {
    const image_db = await client.db("images");
    const imageRes = await image_db
      .collection("college_images")
      .findOne({ INSTID: college["UNITID"] });
    const collegedata_db = await client.db("colleges");
    const collegedataRes = await collegedata_db
      .collection("colleges-data")
      .findOne({ college_id: college["UNITID"] });
    const output = {
      img_title: imageRes["img_title"],
      img_wiki_link: imageRes["img_wiki_link"],
      img_link: imageRes["img_link"],
      img_description: imageRes["img_description"],
      college_id: collegedataRes["college_id"],
      title: college["INSTNM"],
      location: college["CITY"] + ", " + college["STABBR"],
      college_type: dicts.college_type_dict[college["CONTROL"]],
      inst_size: dicts.inst_size[college["INSTSIZE"]],
      tuition_and_fee: college["TUFEYR3"],
      student_faculty_ratio: college["STUFACR"],
      acceptance_rate: college["ADM_RATE"]
    };
    return output;
  } catch (e) {
    err(e);
    return {};
  }
};

const getCollegeLabel = (userTier, targetTier, safetyTier) => {
  if (userTier < targetTier) {
    return 2;
  } else if (userTier >= safetyTier) {
    return 0;
  } else {
    return 1;
  }
};

const truncateNumericalResult = (collegeField) => {
  return typeof collegeField === "number"
    ? Math.round((collegeField + Number.EPSILON) * 100) / 100
    : collegeField;
};

const toFuzzyString = (str) => {
  if (str !== "" && str !== "*" && typeof str === "string")
    return str.split(" ").join("~ ") + "~";
  return str;
};
