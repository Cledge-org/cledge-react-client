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
      recentBlogs,
      ecMetricsResponse,
      acMetricsResponse,
      pathwaysResponse,
    ] = await Promise.all([
      await fetch(`/api/blogs/get-recent-blogs`),
      fetch(`/api/metrics/get-activities`, {
        method: "POST",
        body: JSON.stringify({ userId: session.user.uid }),
      }),
      fetch(`/api/metrics/get-academics`, {
        method: "POST",
        body: JSON.stringify({ userId: session.user.uid }),
      }),
      fetch(`/api/user/get-dashboard-parts?userID=${session.user.uid}`),
    ]);
    const [recentBlogsJSON, ecMetricsJSON, acMetricsJSON, pathwaysJSON] =
      await Promise.all([
        recentBlogs.json(),
        ecMetricsResponse.status === 200 && ecMetricsResponse.json(),
        acMetricsResponse.status === 200 && acMetricsResponse.json(),
        pathwaysResponse.json(),
      ]);
    setDashboardData({
      ecMetricsJSON,
      acMetricsJSON,
      pathwaysJSON,
      recentBlogsJSON,
    });
  }
  if (dashboardData) {
    return (
      <DashboardPage
        recentBlogs={dashboardData.recentBlogsJSON}
        ecMetrics={dashboardData.ecMetricsJSON}
        acMetrics={dashboardData.acMetricsJSON}
        dashboardParts={dashboardData.pathwaysJSON}
      />
    );
  } else {
    return <LoadingScreen />;
  }
};
Dashboard.requireAuth = true;
export default Dashboard;
