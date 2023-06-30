import React from "react";
import { GetServerSidePropsContext } from "next";
import CheckInPage from "../../main-pages/CheckInPage/CheckInPage";
import { getQuestionList } from "src/pages/api/questions/get-question-list";
import { getSession } from "next-auth/react";
import { getQuestionResponses } from "../api/user/get-question-responses";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const questionResponses = await getQuestionResponses((await session).user.uid);
    let questionResponsesRes = ([]);
    if (questionResponses) {
      questionResponsesRes = JSON.parse(JSON.stringify(questionResponses));
    }
    let firstCheckIn = ctx.query.checkIn.indexOf(",");
    let checkIn = JSON.parse(
      JSON.stringify(
        await getQuestionList(
          new String(ctx.query.checkIn).substring(
            0,
            firstCheckIn === -1 ? ctx.query.checkIn.length : firstCheckIn
          ) as string
        )
      )
    );
    return {
      props: {
        checkInData: checkIn,
        questionResponses: questionResponsesRes
      },
    };
  } catch (err) {
    console.error(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const CheckIn = ({ checkInData, questionResponses }) => {
  return <CheckInPage checkInData={checkInData} userResponses={questionResponses} />;
};
CheckIn.requireAuth = true;
export default CheckIn;
