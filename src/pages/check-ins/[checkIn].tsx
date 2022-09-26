import React from "react";
import { GetServerSidePropsContext } from "next";
import CheckInPage from "../../main-pages/CheckInPage/CheckInPage";
import { getQuestionList } from "src/pages/api/questions/get-question-list";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
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
      },
    };
  } catch (err) {
    console.error(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const CheckIn = ({ checkInData }) => {
  return <CheckInPage checkInData={checkInData} />;
};
CheckIn.requireAuth = true;
export default CheckIn;
