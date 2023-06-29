import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import DashboardPage from "src/main-pages/DashboardPage/DashboardPage";
import { getUserData } from "src/pages/api/user/get-meta-data";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const userData = await getUserData((await session).user.uid);
    let userJSON = null;
    if (userData) {
      userJSON = await JSON.parse(JSON.stringify(userData.userData));
    }
    return {
      props: {
        userData: userJSON.value
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Dashboard = ({ userData }) => {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState(null);
  
  if (session) {
    return (
      <DashboardPage userData={userData} />
    );
  } else {
    return <LoadingScreen />;
  }
};
Dashboard.requireAuth = true;
export default Dashboard;
