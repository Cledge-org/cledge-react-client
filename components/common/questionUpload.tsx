import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../../pages/_app";
import ECDropDown from "../question_components/ec_dropdown_question";

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
const QuestionUploadPage: NextApplicationPage<{}> = ({}) => {
  return <></>;
};
export default QuestionUploadPage;
