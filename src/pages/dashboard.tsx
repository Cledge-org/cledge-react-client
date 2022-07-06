import React from "react";
import { GetServerSidePropsContext } from "next";
import { getAllPathways } from "./api/get-all-pathways";
import { getAllCheckins } from "./api/get-all-checkins";
import DashboardPage from "../main-pages/DashboardPage/DashboardPage";
import { getDashboardParts } from "src/pages/api/get-dashboard-parts";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        dashboardParts: JSON.parse(
          JSON.stringify(
            await getDashboardParts((await getSession(ctx)).user.uid)
          )
        ),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Dashboard = ({ dashboardParts }) => {
  return <DashboardPage dashboardParts={dashboardParts} />;
};
export default Dashboard;
