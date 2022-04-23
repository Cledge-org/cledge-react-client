import { NextApiRequest, NextApiResponse } from "next";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
import { setLogLevel } from "@azure/logger";
import { any } from "prop-types";

// References:
// https://docs.microsoft.com/en-us/javascript/api/overview/azure/search-documents-readme?view=azure-node-latest

// Data Master List:
// https://docs.google.com/document/d/1K6c2FKCbVZgcndtt0A7tJAf2QgC4rzy9Tmxvf-mus9M/edit

setLogLevel("info");

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
    const {searchText, top, skip, filters, facets, searchFields} = JSON.parse(req.body);
    console.log(searchFields);
    const processedFacets = processFacets(facets);
    try {
      const collegeSearchResult = await getCollegeInfo(searchText, top, skip, filters, processedFacets, searchFields);
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
    processedFacets,
    searchFields
): Promise<Object> => {
    return new Promise(async (res, err) => {
        try {
            const searchOptions = {
                top: top,
                skip: skip,
                includeTotalCount: true,
                searchMode: "all",
                // facets: Object.keys(processedFacets),
                filter: createFilterExpression(filters),
                select: ["INSTNM", "TUITIONFEE_IN"],
                searchFields: searchFields
            }

            const searchResults = await searchClient.search(searchText, searchOptions);
            let output = [];
            for await (const result of searchResults.results) {
                output.push(result);
            }
            res(output);
        } catch (e) {
            err(res);
        }
    });
};

// parses facets and their types
// Need to validate facets with frontend
// https://docs.microsoft.com/en-us/azure/search/search-faceted-navigation

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

        output[currentFacet] = 'string';
    })
    return output;
}

// creates filters in odata syntax
// <field> <comparison> <value>
const createFilterExpression = (filters) => {
    console.log(filters);
    let filterExpressions = [];
    for (let i = 0; i < filters.length; i++) {
        let field = filters[i].field;
        let comparison = filters[i].comparison;
        let value = filters[i].value;

        filterExpressions.push(`${field} ${comparison} ${value}`);
        console.log(filterExpressions);
    }

    return filterExpressions.join(' and ');
}