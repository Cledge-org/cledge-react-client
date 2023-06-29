import { GetServerSidePropsContext } from "next";
import CollegePage from "../main-pages/CollegePage/CollegePage";
import { getSession } from "next-auth/react";
import { getCollegeList } from "./api/CST/get-college-list";
import { getQuestionResponses } from "src/pages/api/user/get-question-responses";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const userId = (await session).user.uid;
    const collegeList = await getCollegeList(userId);
    const questionRes = await getQuestionResponses(userId);
    let collegeListJSON = {};
    let questionResJSON = {};
    try {
      collegeListJSON = JSON.parse(JSON.stringify(collegeList)).list;
      questionResJSON = JSON.parse(JSON.stringify(questionRes));
    } catch (e) {
      collegeListJSON = {};
      questionResJSON = {};
    }

    return {
      props: {
        firebaseId: userId,
        collegeListData: collegeListJSON,
        questionResData: questionResJSON
      },
    };
  } catch (err) {
    console.log(err);
    return { props: {} as never };
  }
};

const College = ({ collegeListData, questionResData }) => {
  return <CollegePage collegeList={collegeListData} questionResponses={questionResData} />;
};
// College.requireAuth = true;
export default College;
