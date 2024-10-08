import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import DashboardPage from "src/main-pages/DashboardPage/DashboardPage";

const Dashboard = () => {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    if (session) {
      getDashboardData();
    }
  }, [session]);
  async function getDashboardData() {
    const [
      ecMetricsResponse,
      acMetricsResponse,
      pathwaysResponse,
    ] = await Promise.all([
      fetch(`/api/metrics/get-activities`, {
        method: "POST",
        body: JSON.stringify({ userId: session.user.uid }),
      }),
      fetch(`/api/metrics/get-academics`, {
        method: "POST",
        body: JSON.stringify({ userId: session.user.uid }),
      }),
      fetch(`/api/learning-pathway/get-pathway-percentage`, {
        method: "POST",
        body: JSON.stringify({ userId: session.user.uid }),
      }),,
      // fetch(`/api/user/get-dashboard-parts?userID=${session.user.uid}`),
    ]);
    const [ecMetricsJSON, acMetricsJSON, pathwaysJSON] =
      await Promise.all([
        ecMetricsResponse.status === 200 && ecMetricsResponse.json(),
        acMetricsResponse.status === 200 && acMetricsResponse.json(),
        pathwaysResponse.json(),
      ]);
    setDashboardData({
      ecMetricsJSON,
      acMetricsJSON,
      pathwaysJSON,
    });
  }
  if (dashboardData) {
    return (
      <DashboardPage
        recentBlogs={dashboardData.recentBlogsJSON}
        ecMetrics={dashboardData.ecMetricsJSON}
        acMetrics={dashboardData.acMetricsJSON}
        percentageObject={dashboardData.pathwaysJSON}
        // dashboardParts={dashboardData.pathwaysJSON}
      />
    );
  } else {
    return <LoadingScreen />;
  }
};
Dashboard.requireAuth = true;
export default Dashboard;
