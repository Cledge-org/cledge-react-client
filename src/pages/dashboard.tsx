import React from "react";
import { GetServerSidePropsContext } from "next";
import { getAllPathways } from "./api/get-all-pathways";
import { getAllCheckins } from "./api/get-all-checkins";
import DashboardPage from "../main-pages/DashboardPage/DashboardPage";
import { connect } from "react-redux";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        allCheckins: JSON.parse(JSON.stringify(await getAllCheckins())),
        allPathways: JSON.parse(JSON.stringify(await getAllPathways())),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Dashboard = ({
  allCheckins,
  allPathways,
  accountInfo,
  pathwaysProgress,
}) => {
  return (
    <DashboardPage
      allPathways={allPathways}
      allCheckins={allCheckins}
      accountInfo={accountInfo}
      pathwaysProgress={pathwaysProgress}
    />
  );
};
export default connect((state) => ({
  accountInfo: state.accountInfo,
  pathwaysProgress: state.pathwaysProgress,
}))(Dashboard);
