import { GetServerSidePropsContext } from "next";
import { useSession, getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getDashboardParts } from "src/ClientSideFunctions/PartsAndPathways";
import LoadingScreen from "src/common/components/Loading/Loading";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import MyLearningPage from "src/main-pages/MyLearningPage/MyLearningPage";
import { getAllPathwayProgress } from "src/pages/api/admin/learning-pathway/get-all-pathway-progress";
import { initialStateAction } from "src/utils/redux/actionFunctions";
import { store } from "src/utils/redux/store";
import { getPathwayPercent } from "./api/user/get-pathway-percent";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const pathwaysProgress = await getAllPathwayProgress((await session).user.uid);
    const pathwaysJSON = await JSON.parse(JSON.stringify(pathwaysProgress));
    const dashboardParts = await getDashboardParts((await session).user.uid);
    const pathwayPercent = await getPathwayPercent((await session).user.uid);
    let dashboardJSON = null;
    if (dashboardParts) {
      dashboardJSON = await JSON.parse(JSON.stringify(dashboardParts));
    }
    
    return {
      props: {
        pathwaysProgress: pathwaysJSON,
        dashboardRet: dashboardJSON,
        pathwayRet: pathwayPercent.userData,
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const MyLearning = ({ pathwaysProgress, dashboardRet, pathwayRet }) => {
  const { data: session } = useSession();
  return <MyLearningPage dashboardParts={dashboardRet} pathwaysProgress={pathwaysProgress} pathwaysPercent={pathwayRet} />;

};
MyLearning.requireAuth = true;
export default MyLearning;
