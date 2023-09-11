import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import MyLearningPage from "src/main-pages/MyLearningPage/MyLearningPage";
import { callGetAllPathwayProgress } from "src/utils/apiCalls";

const MyLearning = () => {
  const { data: session } = useSession();
  const [dashboardParts, setDashboardParts] = useState();
  const [pathwayProgress, setPathwayProgress] = useState();
  useEffect(() => {
    if (session) {
      getDashboardData();
      getPathwayProgress();
    }
  }, [session]);
  async function getDashboardData() {
    const response = await fetch(
      `/api/user/get-dashboard-parts?userID=${session.user.uid}`
    );
    const responseJson = await response.json();
    setDashboardParts(responseJson);
  }
  async function getPathwayProgress() {
    const response = callGetAllPathwayProgress(session.user.uid)
    const responseJson = await (await response).json()
    setPathwayProgress(responseJson);
  }
  if (dashboardParts) {
    return <MyLearningPage dashboardParts={dashboardParts} pathwaysProgress={pathwayProgress} />;
  } else {
    return <LoadingScreen />;
  }
};
MyLearning.requireAuth = true;
export default MyLearning;
