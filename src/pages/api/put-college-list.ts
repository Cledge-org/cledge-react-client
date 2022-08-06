import { IntegerType, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
      externalResolver: true,
    },
  };

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const { user_id, college_id, user_tier } = (req.body);
    if (user_id) {
        try {
            // remove current college from the college list
            if (user_tier === -1) {
                await removeCollegeFromCollegeList(user_id, college_id);
            } else {
                await addCollegeToCollegeList(user_id, college_id, user_tier);
            }
            resolve.status(200).send({"status": "Success"});
        } catch (e) {
            console.log(e);
            resolve.status(500).send({"status": "Error", "error_message": e});
        }
    } else {
        resolve.status(400).send({"status": "Error", "error_message": "No user_id provided"});
    }
};

export const removeCollegeFromCollegeList = async (
    user_id: String,
    college_id: String
): Promise<void> => {
    return new Promise(async(res, err) => {
        try {
            const client = await MongoClient.connect(process.env.MONGO_URL);
            const userDb = client.db("users");
            await userDb.collection("college-list").updateOne(
                { firebaseId: user_id },
                { $pull: { college_list: { college_id: college_id }}}
            );
            res();
        } catch (e) {
            err(e);
        }
    })
}

export const addCollegeToCollegeList = async (
    user_id: String,
    college_id: String,
    user_tier: IntegerType
): Promise<void> => {
    return new Promise(async(res, err) => {
        try {
            const client = await MongoClient.connect(process.env.MONGO_URL);
            const singleCollege = await client.db("colleges").collection("colleges").findOne(
                { college_id: college_id }
            );
            const fit_type = formatFitType(user_tier, singleCollege["safety_tier"], singleCollege["target_tier"]);
            const curSingleCollege = {
                college_id: college_id,
                fit_type: fit_type
            };
            const curUser = await client.db("users").collection("college-list").findOne({ firebaseId: user_id });
            if (curUser) {
                await client.db("users").collection("college-list").updateOne(
                    { firebaseId: user_id },
                    { $push: { college_list: curSingleCollege}}
                );
            } else {
                await client.db("users").collection("college-list").insertOne(
                    {
                        firebaseId: user_id,
                        college_list: [curSingleCollege]
                    }
                );
            }
            res();
        } catch (e) {
            err(e);
        }
    })
}

const formatFitType = (user_tier, safety_tier, target_tier) => {
    if (user_tier < target_tier) {
        return 2;
    } else if (user_tier >= safety_tier) {
        return 0;
    } else {
        return 1;
    }
}