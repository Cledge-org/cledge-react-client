import { NextApiRequest, NextApiResponse } from "next";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
import { setLogLevel } from "@azure/logger";
import { any } from "prop-types";

// References:
// https://docs.microsoft.com/en-us/javascript/api/overview/azure/search-documents-readme?view=azure-node-latest

setLogLevel("info");

const serviceName = "college-search-service";
const indexName = "college-search-index";
const queryKey = "1F7801474A40D9360ED57EC698A3CF10";

const endPoint = "https://" + serviceName + ".search.windows.net/";

// To query and manipulate documents
const searchClient = new SearchClient(
    endPoint,
    indexName,
    new AzureKeyCredential(queryKey)
);

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const {searchText, top, skip, filters, facets} = JSON.parse(req.body);
    console.log(searchText);
    const processedFacets = processFacets(facets);
    try {
      const collegeSearchResult = await getCollegeInfo(searchText, top, skip, filters, processedFacets);
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
    processedFacets
): Promise<Object> => {
    return new Promise(async (res, err) => {
        try {
            const searchOptions = {
                top: top,
                skip: skip,
                includeTotalCount: true,
                searchMode: "all",
                facets: Object.keys(processedFacets),
                filter: createFilterExpression(filters, processedFacets)
            }

                // queryType: "full",
                // searchMode: "all",
                // top: 10,
                // searchFields: ["INSTNM"]
                // select: ["INSTNM"]
            const searchResults = await searchClient.search(searchText, {
                searchMode: "all",
                top: 10,
                facets: ["TUITIONFEE_IN,values:5000|10000|15000"],
                select: ["TUITIONFEE_IN"]
            });
            let output = [];
            for await (const result of searchResults.results) {
                output.push(result);
            }
            res(searchResults.facets);
        } catch (e) {
            err(res);
        }
    });
};

// parses facets and their types
/*
    facets : [
        {
            "field": <>,
            "type":
        }
    ]
*/
const processFacets = (facetString) => {
    let facets = facetString.split(",");
    let output = {};
    facets.forEach(function (currentFacet) {
        if (currentFacet.indexOf('*') >= 0) {
            output[currentFacet.replace('*', '')] = 'array';
        } else {
            output[currentFacet] = 'string';
        }
    })
    return output;
}

// creates filters in odata syntax
// <not?> <field> <comparison> <value>
const createFilterExpression = (filterList) => {
    let filterExpressions = [];
    for (let i = 0; i < filterList.length; i++) {
        let field = filterList[i].field;
        let comparison = filterList[i].comparison;
        let value = filterList[i].value;
        filterExpressions.push(`${field} ${comparison} '${value}'`);
    }
    // while (i < filterList.length) {
    //     let field = filterList[i].field;
    //     let value = filterList[i].value;

    //     if (facets[field] === 'array') {
    //         filterExpressions.push(`${field}/any(t: search.in(t, '${value}', ','))`);
    //     } else {
    //         filterExpressions.push(`${field} eq '${value}'`);
    //     }
    //     i++;
    // }
    return filterExpressions.join(' and ');
}

/*
    filter:
    public/private
    prestige?
    collegetype?

    in-state tuition (TUITIONFEE_IN)
    out-of-state tuition (TUITIONFEE_OUT)

    application requirements
    SAT/ACT policy?
    SAT average
    TOEFL/IELTS (no information)


*/