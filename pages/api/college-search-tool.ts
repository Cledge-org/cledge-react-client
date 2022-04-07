import { NextApiRequest, NextApiResponse } from "next";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
import { setLogLevel } from "@azure/logger";

// References:
// https://docs.microsoft.com/en-us/javascript/api/overview/azure/search-documents-readme?view=azure-node-latest

setLogLevel("info");

const serviceName = "college-search-service";
const indexName = "college-search-index";
const adminKey = "B6C37FA89C0A5BDD60267B82A1DC1BEF";

const endPoint = "https://" + serviceName + ".search.windows.net/";

// To query and manipulate documents
const searchClient = new SearchClient(
    endPoint,
    indexName,
    new AzureKeyCredential(adminKey)
);

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    try {
      const collegeSearchResult = await getCollegeInfo();
      resolve.status(200).send(collegeSearchResult);
    } catch (e) {
      resolve.status(500).send(e);
    }
};

export const getCollegeInfo = (): Promise<Object> => {
    return new Promise(async(res, err) => {
        try {
            const searchResults = await searchClient.search(
                // search queries
            );
        } catch (e) {
            err(res);
        }
    });
};