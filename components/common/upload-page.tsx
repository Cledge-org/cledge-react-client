import {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import Card from "./Card";
import CardVideo from "./Card_Video";
import CardText from "./Card_Text";
import CardTask from "./Card_Task";
import TabButton from "./TabButton";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../../pages/_app";
import { getDashboardInfo } from "../../pages/api/get-dashboard-info";
import { useRouter } from "next/router";
import ECDropDown from "../question_components/ec_dropdown_question";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import LearningPathwaysUploadPage from "../../pages/upload/learning-pathways-upload";
import ResourcesUploadPage from "../../pages/upload/resources-upload-page";
import { getLearningPathways } from "../../pages/api/get-learning-pathways";
import QuestionUploadPage from "../../pages/upload/question-upload";

// logged in landing page
const UploadPage = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  const session = useSession();
  if (session.data.user.email === "yousefgomaa@hotmail.com") {
    return (
      <div className="container-fluid p-5 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center w-50">
          {children}
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
