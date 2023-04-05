import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { CollegeDB } from "src/@types/types";


export const config = {
    api: {
        externalResolver: true,
    },
};

// check if the imput college is added to user's college list
export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const { userId, collegeId } = req.body;
    if (userId) {
        try {
            const containsCollegeList = await checkCollegeList(userId, collegeId);
            resolve.status(200).send(containsCollegeList);
        } catch (e) {
            resolve.status(500).send(e);
        }
    }
};

export const checkCollegeList = (userId: string, collegeId: string): Promise<any> => {
    return new Promise(async (res, err) => {
        try {
            const client = await MongoClient.connect(process.env.MONGO_URL);
            const users_db = client.db("users");
            const collegelist = await users_db
                .collection("college-list")
                .findOne({
                    firebaseId: userId,
                });
            if (!collegelist) {
                res(null);
            } else {
                collegelist.college_list.forEach((curCollege) => {
                    if (curCollege.college_id === collegeId) {
                        res(true);
                        return;
                    }
                })
                res(false);
            }
        } catch (e) {
            err(e);
        }
    });
}