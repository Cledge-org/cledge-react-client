import {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import CardTask from "../components/common/Card_Task";
import TabButton from "../components/common/TabButton";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "./_app";
import { getDashboardInfo } from "./api/get-dashboard-info";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return { props: {} };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

// logged in landing page
const UploadPage: NextApplicationPage<{}> = ({}) => {
  const router = useRouter();
  const session = useSession();
  if (session.data.user.email === "yousefgomaa@hotmail.com") {
    console.log(router.query);
    return (
      <div className="container-fluid p-5 d-flex flex-row justify-content-between">
        {router.query.type === "resources" ? (
          <div>
            <button>HI</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  return (
    <div>
      <div>
        <div>404</div>
        <div>This page could not be found.</div>
      </div>
    </div>
  );
};
UploadPage.requireAuth = true;
export default UploadPage;
