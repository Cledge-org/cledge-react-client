import React from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getActivities } from "./api/get-activities";
import MetricsPage from "../main-pages/MetricsPage/MetricsPage";
//profile progress/ question summary page
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const activities = await getActivities((await session).user.uid);
    let userActivitiesJSON = {};
    try {
      userActivitiesJSON = JSON.parse(JSON.stringify(activities));
    } catch (e) {
      userActivitiesJSON = {};
    }
    return {
      props: {
        activities: userActivitiesJSON,
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Metrics = ({ activities, userTags, questionResponses }) => {
  return <MetricsPage activities={activities} />;
};
export default Metrics;
