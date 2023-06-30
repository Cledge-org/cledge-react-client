import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import DashboardPage from "src/main-pages/DashboardPage/DashboardPage";
import { getUserData } from "src/pages/api/user/get-meta-data";
import { getPathwayPercent } from "./api/user/get-pathway-percent";
import { getAcademics } from "./api/metrics/get-academics";
import { getActivities } from "./api/metrics/get-activities";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const pathwayPercent = await getPathwayPercent((await session).user.uid);
    const ecTier = await getActivities((await session).user.uid);
    const acTier = await getAcademics((await session).user.uid);
    let ec = 0;
    if (ecTier) {
      ec = ecTier.overallTier
    }
    let ac = 0;
    if (acTier) {
      ac = acTier.overallTier
    }

    return {
      props: {
        pathwayRet: pathwayPercent.userData,
        ecRet: ec,
        acRet: ac
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Dashboard = ({ pathwayRet, ecRet, acRet }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <DashboardPage pathwayPercentage={pathwayRet} ecOverall={ecRet} acOverall={acRet} />
    );
  } else {
    return <LoadingScreen />;
  }
};
Dashboard.requireAuth = true;
export default Dashboard;
