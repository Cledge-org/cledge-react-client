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
    const {top, count} = req.body;
    try {
      const collegeSearchResult = await getCollegeInfo();
      resolve.status(200).send(collegeSearchResult);
    } catch (e) {
      resolve.status(500).send(e);
    }
};

export const getCollegeInfo = (): Promise<Object> => {
    return new Promise(async (res, err) => {
        try {
            const searchText = "University of Washington";

            // const searchOptions = {
            //     "searchMode": "all",
            //     "search fields": "INSTNM"
            // };
            const searchResults = await searchClient.search("University of Washington", {
                queryType: "full",
                searchMode: "all",
                includeTotalCount: false,
                top: 10
            });
            let output = [];
            for await (const result of searchResults.results) {
                output.push(result);
            }
            res(output.length);
        } catch (e) {
            err(res);
        }
    });
};