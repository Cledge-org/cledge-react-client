import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { name, address, grade, birthday, email, userId, tags } = JSON.parse(
    req.body
  );
  if (
    !name ||
    address === undefined ||
    grade === undefined ||
    !birthday ||
    !email ||
    !tags
  ) {
    resolve
      .status(400)
      .send(
        "User creation missing one of: name, address, grade, birthday, email, or tags."
      );
  } else {
    try {
      await createUser({
        firebaseId: userId,
        name,
        address,
        grade,
        birthday,
        email,
        tags,
        checkIns: ["Onboarding Questions"],
        introducedToChatbot: false,
        isOnMailingList: false,
      });
      resolve.status(200).send("Success");
    } catch (e) {
      //console.log(e);
      resolve.status(500).send(e);
    }
  }
};

// Creates a new user with specified account info
export const createUser = async (user: AccountInfo): Promise<void> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      await client.db("users").collection("users").insertOne(user);
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
