import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
	  externalResolver: true
	},
};

// Sets counseling time in the database given their user ID (firebase id)
export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, time } = JSON.parse(req.body); 
	if(!userId || !time) {
		resolve
			.status(400)
			.send("User ID (userId) or Counselor Time (time) required");
	} else {
		try {
			await updateTime(userId,time);
			resolve.status(200);
		} catch (e) {
			resolve.status(500).send(e);
		}	
	}
};

// Admin API. Updates counseling time of user - if time is set to
// zero, then instance of user in counseling time collection is deleted
export const updateTime = async (
	firebaseId: string,
	time: number
): Promise<void> => {
	return new Promise(async (res, err) => {
		try{
			const client = await MongoClient.connect(process.env.MONGO_URL);
			if(time <= 0) {
				await client
					.db("users")
					.collection("counseling-time")
					.deleteOne({ firebaseId: firebaseId });
			}
			else {
				const user: AccountCounselingInfo = {
					firebaseId: firebaseId,
					time: time,
				}
				await client
					.db("users")
					.collection("counseling-time")
					.updateOne(
						{ firebaseId: firebaseId }, 
						{ $set: user }, 
						{ upsert: true }
					);
			}
			res();
			client.close();
		} catch(e) {
			err(e);
		}
	});
};

