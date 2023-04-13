import { GetServerSidePropsContext } from "next";
import { useSession, getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import MyLearningPage from "src/main-pages/MyLearningPage/MyLearningPage";
import { getAllPathwayProgress } from "src/pages/api/admin/learning-pathway/get-all-pathway-progress";
import { initialStateAction } from "src/utils/redux/actionFunctions";
import { store } from "src/utils/redux/store";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const pathwaysProgress = await getAllPathwayProgress((await session).user.uid);
    const pathwaysJSON = await JSON.parse(JSON.stringify(pathwaysProgress));
    return {
      props: {
        pathwaysProgress: pathwaysJSON
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const MyLearning = ({ pathwaysProgress }) => {
  const { data: session } = useSession();
  const [dashboardParts, setDashboardParts] = useState();
  useEffect(() => {
    if (session) {
      getDashboardData();
    }
  }, [session]);
  async function getDashboardData() {
    const response = await fetch(
      `/api/user/get-dashboard-parts?userID=${session.user.uid}`
    );
    const responseJson = await response.json();
    setDashboardParts(responseJson);
  }
  if (dashboardParts) {
    return <MyLearningPage dashboardParts={dashboardParts} pathwaysProgress={pathwaysProgress} />;
  } else {
    return <LoadingScreen />;
  }
};
MyLearning.requireAuth = true;
export default MyLearning;
