import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";
import DashboardPage from "src/main-pages/DashboardPage/DashboardPage";

const Dashboard = () => {
  const { data: session } = useSession()
  const [dashboardParts, setDashboardParts] = useState()
  useEffect(() => {
    if (session) {
      getDashboardData()
    }
  }, [session])
  async function getDashboardData() {
    const response = await fetch(`/api/user/get-dashboard-parts?userID=${session.user.uid}`)
    const responseJson = await response.json()
    setDashboardParts(responseJson)
  }
  if (dashboardParts) {
    return <DashboardPage dashboardParts={dashboardParts} />
  }
  else {
    return <LoadingScreen />
  }
};
export default Dashboard;
