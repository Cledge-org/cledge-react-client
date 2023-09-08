import React from "react";
import { GetServerSidePropsContext } from "next";
import { getQuestionProgress } from "./api/questions/get-question-progress";
import ApplicationProfilePage from "../main-pages/ApplicationProfilePage/ApplicationProfilePage";
import { getAcademics } from "src/pages/api/metrics/get-academics";
import { getSession } from "next-auth/react";
import { getActivities } from "src/pages/api/metrics/get-activities";
//profile progress/ question summary page
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const userId = (await session).user.uid;
    const questionProgress = await getQuestionProgress();
    const academicData = await getAcademics(userId);
    const activityData = await getActivities(userId);
    let userProgressJSON = JSON.parse(JSON.stringify(questionProgress));
    let academicJSON = JSON.parse(JSON.stringify(academicData));
    let activityJSON = JSON.parse(JSON.stringify(activityData));
    return {
      props: {
        ...userProgressJSON,
        academicJSON,
        activityJSON
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Progress = ({ questionData, academicJSON, activityJSON }) => {
  return <ApplicationProfilePage academicData={academicJSON} activityData={activityJSON} questionData={questionData} />;
};
Progress.requireAuth = true;
export default Progress;
