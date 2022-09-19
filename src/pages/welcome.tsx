import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import WelcomePage from "../main-pages/WelcomePage/WelcomePage";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const recentBlogs = await fetch(
    `http://${ctx.req.headers.host}/api/blogs/get-recent-blogs`
  );
  const recentBlogsJson = await recentBlogs.json();
  return {
    props: {
      data: {
        recentBlogs: recentBlogsJson,
      },
    },
  };
}

function Welcome({ data }) {
  return <WelcomePage data={data} />;
}

export default Welcome;
