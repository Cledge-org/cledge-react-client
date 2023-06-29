import { GetServerSidePropsContext } from "next";
import CollegeDetailPage from '../../main-pages/CollegeDetailPage/CollegeDetailPage';
import { getSingleCollegeInfo } from '../api/CST/get-single-college';
import { getCollegeList } from "../api/CST/get-college-list";
import { getSession } from "next-auth/react";
import React from 'react';
import { getQuestionResponses } from "src/pages/api/user/get-question-responses";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { id } = ctx.query;
    const session = getSession(ctx);
    const userId = (await session).user.uid;
    const college = await getSingleCollegeInfo(`${id}`);
    const collegeList = await getCollegeList(userId);
    const questionRes = await getQuestionResponses(userId);

    let collegeListJSON = {};
    let questionResJSON = {};

    try {
      collegeListJSON = JSON.parse(JSON.stringify(collegeList)).list;
      questionResJSON = JSON.parse(JSON.stringify(questionRes));

    } catch (e) {
      collegeListJSON = {};
      questionResJSON = {};
    }
    return {
      props: {
        collegeData: JSON.stringify(college),
        collegeList: collegeListJSON,
        questionRes: questionResJSON,
      },
    };
  } catch (err) {
    return { props: {} as never };
  }
};

const CollegeDetail = ({ collegeData, collegeList, questionRes}) => {
  return <CollegeDetailPage collegeData={collegeData} collegeList={collegeList} questionResponses={questionRes} />;
};
CollegeDetail.requireAuth = true;
export default CollegeDetail;