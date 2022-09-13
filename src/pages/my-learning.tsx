import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import MyLearningPage from "src/main-pages/MyLearningPage/MyLearningPage";

const MyLearning = () => {
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
    return <MyLearningPage dashboardParts={dashboardParts} />;
  } else {
    return <LoadingScreen />;
  }
};
MyLearning.requireAuth = true;
export default MyLearning;
