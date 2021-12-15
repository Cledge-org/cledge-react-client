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
import ECDropDown from "../components/question_components/ec_dropdown_question";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import LearningPathwaysUploadPage from "../components/common/learningPathwaysUpload";
import ResourcesUploadPage from "../components/common/resourcesUploadPage";
import { getLearningPathways } from "./api/get-learning-pathways";
import QuestionUploadPage from "../components/common/questionUpload";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return { props: { allCourses: await getLearningPathways() } };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

// logged in landing page
const UploadPage: NextApplicationPage<{ allCourses?: Course[] }> = ({
  allCourses,
}) => {
  const router = useRouter();
  const session = useSession();
  if (session.data.user.email === "yousefgomaa@hotmail.com") {
    return (
      <div className="container-fluid p-5 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center w-50">
          {router.query.type === "resources" ? (
            <ResourcesUploadPage />
          ) : router.query.type === "learning-pathways" ? (
            <LearningPathwaysUploadPage allCourses={allCourses} />
          ) : router.query.type === "questions" ? (
            <QuestionUploadPage />
          ) : (
            <div></div>
          )}
          <button className="mt-3" onChange={() => {}}>
            Upload
          </button>
        </div>
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
