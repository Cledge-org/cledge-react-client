import { NextApiRequest, NextApiResponse } from "next";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
import dicts from "../../../college-search-tool/assets/cst_result_parse.json";

// References:
// https://docs.microsoft.com/en-us/javascript/api/overview/azure/search-documents-readme?view=azure-node-latest

// Data Master List:
// https://docs.google.com/document/d/1K6c2FKCbVZgcndtt0A7tJAf2QgC4rzy9Tmxvf-mus9M/edit

const serviceName = "college-search-service";
const indexName = "college-search-index";
const queryKey = "1F7801474A40D9360ED57EC698A3CF10";
const endPoint = "https://" + serviceName + ".search.windows.net/";
const searchClient = new SearchClient(
  endPoint,
  indexName,
  new AzureKeyCredential(queryKey)
);

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  console.log(req.body);
  const { searchText, top, skip, filters, searchFields } = JSON.parse(req.body);
  console.log(searchFields);
  // const processedFacets = processFacets(facets);
  try {
    const collegeSearchResult = await getCollegeInfo(
      searchText,
      top,
      skip,
      filters,
      searchFields
    );
    resolve.status(200).send(collegeSearchResult);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const getCollegeInfo = (
  searchText,
  top,
  skip,
  filters,
  searchFields
): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {
      const searchOptions: any = {
        top: top,
        skip: skip,
        includeTotalCount: true,
        searchMode: "all",
        // facets: Object.keys(processedFacets),
        filter: createFilterExpression(filters),
        // select: ,
        searchFields: searchFields,
      };

      const searchResults = await searchClient.search(
        searchText,
        searchOptions
      );
      let output = [];
      for await (const result of searchResults.results) {
        output.push(formatOutput(result["document"]));
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
  console.log(72, filters);
  let filterExpressions = [];
  Object.keys(filters).forEach(function (currentValue) {
    let curKey = currentValue.split(" ");

    let curItemValue = filters[currentValue];
    if (curKey.length === 1) {
      filterExpressions.push(`${currentValue} eq ${curItemValue}`);
    } else {
      if (curKey[1] === "min") {
        filterExpressions.push(`${curKey[0]} ge ${curItemValue}`);
      } else if (curKey[1] === "max") {
        filterExpressions.push(`${curKey[0]} le ${curItemValue}`);
      }
    }
  });
  for (let i = 0; i < filters.length; i++) {
    let field = filters[i].field;
    let comparison = filters[i].comparison;
    let value = filters[i].value;

    filterExpressions.push(`${field} ${comparison} ${value}`);
    console.log(filterExpressions);
  }

  return filterExpressions.join(" and ");
};

const formatOutput = (college) => {
  const output = {
    title: college["INSTNM"],
    institution_url: college["INSTURL"],
    net_price_url: college["NPCURL"],
    location: college["CITY"] + ", " + college["STABBR"],
    college_type: dicts.college_type_dict[college["CONTROL"]],
    "in-state_tuition": college["TUITIONFEE_IN"],
    "out-state_tuition": college["TUITIONFEE_OUT"],
    abbreviation: null,
    coordinates: {
      latitude: college["LATITUDE"],
      longitude: college["LONGITUDE"],
    },
    introduction: null,
    urbanization: college["LOCALE2"],
    religious_affiliation: college["RELAFFIL"],
    standard_address:
      college["CITY"] + ", " + college["STABBR"] + ", " + college["ZIP"],
    application_requirement: null,
    "sat/act_score": {
      sat_critical_reading_25: college["SATVR25"],
      sat_critical_reading_75: college["SATVR75"],
      sat_math_25: college["SATMT25"],
      sat_math_75: college["SATMT75"],
      sat_writing_25: college["SATWR25"],
      sat_writing_75: college["SATWR75"],
      sat_critical_reading_50: college["SATVRMID"],
      sat_math_50: college["SATMTMID"],
      sat_writing_reading_50: college["SATWRMID"],
      act_cumulative_25: college["ACTCM25"],
      act_cumulative_50: college["ACTCMMID"],
      act_cumulative_75: college["ACTCM75"],
      sat_avg: college["SAT_AVG"],
    },
    acceptance_rate: college["ADM_RATE"],
    applicants_per_year: null,
    matriculation_rate: null,
    student_faculty_ratio: null,
    calendar_system: null,
    study_disciplines: formatStudyDisciplines(college, dicts.cds_categories),
    enrolled_first_year_students: null,
    retention_rate_4_years: college["RET_FT4"],
    retention_rate_lt_4_years: college["RET_FTL4"],
    "4_year_graduation_rate": college["C150_4"],
    "6_year_graduation_rate": null,
    "admission policy": {
      coeducational: null,
      men_only: college["MENONLY"] == 1,
      women_only: college["WOMENONLY"] == 1,
    },
    student_ethnicity_ratio: {
      White: college["UGDS_WHITE"],
      Black: college["UGDS_BLACK"],
      Hispanic: college["UGDS_HISP"],
      Asian: college["UGDS_ASIAN"],
      "American Indian/Alaska Native": college["UGDS_AIAN"],
      "Native Hawaiian/Pacific Islander": college["UGDS_NHPI"],
      "2 or More Races": college["UGDS_2MOR"],
      "Non-resident Aliens": college["UGDS_NRA"],
      Unknown: college["UGDS_UNKN"],
    },
  };
  return output;
};

const formatStudyDisciplines = (college, cds_categories) => {
  const studyDisciplines = {};
  Object.keys(cds_categories).forEach(function (curDisName) {
    studyDisciplines[curDisName] = college[cds_categories[curDisName]];
  });
  return studyDisciplines;
};
