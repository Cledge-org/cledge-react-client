import React from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getAcademics } from "./api/get-academics";
import { getActivities } from "./api/get-activities";
import MetricsPage from "../main-pages/MetricsPage/MetricsPage";
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const activities = await getActivities((await session).user.uid);
    const academics = await getAcademics((await session).user.uid);
    let userActivitiesJSON = {};
    let userAcademicsJSON = {};
    try {
      userActivitiesJSON = JSON.parse(JSON.stringify(activities));
      userAcademicsJSON = JSON.parse(JSON.stringify(academics));
    } catch (e) {
      userActivitiesJSON = {};
      userAcademicsJSON = {};
    }
    return {
      props: {
        academics: userAcademicsJSON,
        activities: userActivitiesJSON,
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Metrics = ({ activities, academics }) => {
  return <MetricsPage activities={activities} academics={academics} />;
};
Metrics.requireAuth = true;
export default Metrics;
