import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
      externalResolver: true,
    },
  };

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const { userId } = JSON.parse(req.body);
    if (userId) {
        try {
            const collegeList = await getCollegeIdList(userId);
            resolve.status(200).send(collegeList);
        } catch (e) {
            resolve.status(500).send(e);
        }
    } else {
        resolve.status(400).send("No user id provided");
    }
};

export const getCollegeIdList = (userId: String): Promise<Object> => {
    return new Promise(async(res, err) => {
        try {
            const client = await MongoClient.connect(process.env.MONGO_URL);
            const collegeDb = client.db("users");
            const collegeListData = await collegeDb.collection("college-list").findOne({ firebaseId: userId });
            if (collegeListData) {

            }

        } catch (e) {
            err(e);
        }
    })
}

export const getCollegeListInfo = async (
    collegeIdList
) => {

}