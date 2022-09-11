import React from "react";
import { GetServerSidePropsContext } from "next";
import CheckInPage from "../../main-pages/CheckInPage/CheckInPage";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    let firstCheckIn = ctx.query.checkIn.indexOf(",");
    let checkIn = await (
      await fetch(`/api/questions/get-question-list`, {
        method: "POST",
        body: JSON.stringify({
          //THIS WORKS
          listName: new String(ctx.query.checkIn).substring(
            0,
            firstCheckIn === -1 ? ctx.query.checkIn.length : firstCheckIn
          ) as string,
        }),
      })
    ).json();
    console.error(checkIn);
    let checkInData = checkIn.chunks[0].questions;
    for (let i = 1; i < checkIn.chunks.length; i++) {
      checkInData = checkInData.concat(checkIn.chunks[i].questions);
    }
    return {
      props: {
        checkInData,
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
export default CheckIn;
