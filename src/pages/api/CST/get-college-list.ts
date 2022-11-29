import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { collegeListIndivudialInfo } from "src/@types/types";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const user_id = req.query.userId.toString();
  if (user_id) {
    try {
      const collegeList = await getCollegeIdList(user_id);
      const collegeListInfo: collegeListIndivudialInfo[] =
        await getCollegeListInfo(collegeList);
      resolve
        .status(200)
        .send({ status: "Success", college_list: collegeListInfo });
    } catch (e) {
      console.log(e);
      resolve.status(500).send({ status: "Error", error_message: e });
    }
  } else {
    resolve
      .status(400)
      .send({ status: "Error", error_message: "No user_id provided" });
  }
};

export const getCollegeIdList = (user_id: String): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const userDb = client.db("users");
      const userCollegeList = await userDb
        .collection("college-list")
        .findOne({ firebaseId: user_id });
      if (userCollegeList) {
        res(userCollegeList["college_list"]);
      } else {
        res([]);
      }
    } catch (e) {
      err(e);
    }
  });
};

// Pass in a list of college id and fit types
// Return a list of college list info by ids (replace safety tier and target tier into existing fit types)
export const getCollegeListInfo = async (
  collegeList
): Promise<collegeListIndivudialInfo[]> => {
  return new Promise(async (res, err) => {
    try {
      if (collegeList.length === 0) {
        res([]);
      }
      const collegeIdList = [];
      collegeList.forEach((curCollege) => {
        collegeIdList.push(curCollege["college_id"]);
      });
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const collegeDb = client.db("colleges");
      const collegeListData = await collegeDb
        .collection("colleges")
        .find({ college_id: { $in: collegeIdList } })
        .toArray();
      res(formatCollegeListInfoOutput(collegeList, collegeListData));
    } catch (e) {
      err(e);
    }
  });
};

const formatCollegeListInfoOutput = (collegeList, collegeListData) => {
  const collegeListDataDict = {};
  collegeListData.forEach((curCollegeData) => {
    collegeListDataDict[curCollegeData.college_id] = {
      img_url: curCollegeData.img_url,
      img_title: curCollegeData.img_title,
      college_name: curCollegeData.college_name,
      location: curCollegeData.location,
      in_state_tuition: curCollegeData.in_state_tuition,
      out_state_tuition: curCollegeData.out_state_tuition,
      college_type: curCollegeData.college_type,
    };
  });
  const output = [];
  collegeList.forEach((curCollege) => {
    const curCollegeInfo = Object.assign(
      curCollege,
      collegeListDataDict[curCollege.college_id]
    );
    output.push(curCollegeInfo);
  });
  return output;
};
