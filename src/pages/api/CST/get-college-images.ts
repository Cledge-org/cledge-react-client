import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

// response college image data (link, description, title, etc.) based on given INSTID list
// request JSON structure: [<INSTID 1>, <INSTID 2>, ...]
export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const { collegeList } = JSON.parse(req.body);
    const images = await getCollegeImages(collegeList);
    resolve.status(200).send(images);
  } catch (e) {
    console.log(e);
    resolve.status(500).send(e);
  }
};

export const getCollegeImages = (collegeList): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
      const image_db = client.db("images");
      const imageResList = await image_db
        .collection("college_images")
        .find({ INSTID: { $in: collegeList } })
        .toArray();
      res(formatResult(imageResList));
    } catch (e) {
      err(res);
    }
  });
};

export const formatResult = (imageResList) => {
  const imageList = {};
  imageResList.forEach((curCollege) => {
    imageList[curCollege["INSTID"]] = {
      college_name: curCollege["college_name"],
      img_title: curCollege["img_title"],
      img_wiki_link: curCollege["img_wiki_link"],
      img_link: curCollege["img_link"],
      img_description: curCollege["img_description"],
    };
  });
  return imageList;
};
