import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { getRecentBlogs } from "src/pages/api/blogs/get-recent-blogs";
import WelcomePage from "../main-pages/WelcomePage/WelcomePage";
import UWCSLandingPage from "src/main-pages/WelcomePage/components/UWCSLandingPage/UWCSLandingPage";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const recentBlogs = JSON.parse(JSON.stringify(await getRecentBlogs()));
  return {
    props: {
      data: {
        recentBlogs,
      },
    },
  };
}

function Welcome({ data }) {
  return <WelcomePage data={data} />;
}

export default Welcome;
