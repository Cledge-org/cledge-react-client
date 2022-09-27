import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
	  externalResolver: true
	},
};

// Sets counseling time in the database given their user ID (firebase id)
export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { firebaseId, time } = JSON.parse(req.body);
	if(!firebaseId || !time) {
		resolve
			.status(400)
			.send("User ID (userId) or Counselor Time (time) required");
	} else {
		try {
			await updateTime({
				firebaseId: firebaseId,
				time: time,
			});
			resolve.status(200).send("Success");
		} catch (e) {
			resolve.status(500).send(e);
		}	
	}
};

// Admin API. Updates counseling time of user - if time is set to
// zero, then instance of user in counseling time collection is deleted
export const updateTime = async (user: AccountCounselingInfo): Promise<void> => {
	return new Promise(async (res, err) => {
		try {
			const client = await MongoClient.connect(process.env.MONGO_URL);
			if(user.time <= 0) {
				await client
					.db("users")
					.collection("counseling-time")
					.deleteOne({ firebaseId: user.firebaseId });
			}
			else {
				if(!checkDB) {
					await client
						.db("users")
						.collection("counseling-time")
						.insertOne(user);
				}
				else {
					await client
					.db("users")
					.collection("counseling-time")
					.updateOne(
						{ firebaseId: user.firebaseId }, 
						{ $set: user }, 
						{ upsert: true }
					);
				}
			}
			res();
			client.close();
		} catch(e) {
			err(e);
		}
	});
};

//Helper function to check if user id exists in db
const checkDB = async (
	user: AccountCounselingInfo,
	overrideClient?: MongoClient
): Promise<boolean> => {
	return new Promise(async (res, err) => {
		try{
			const client = overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
			const result = await client
				.db("users")
				.collection("counseling-time")
				.countDocuments({firebaseId: {$eq: user.firebaseId}});
			result > 0 ? res(true) : res(false);
			if(!overrideClient) {
				client.close();
			}
		} catch(e) {
			err(e);
		}
	});
};

