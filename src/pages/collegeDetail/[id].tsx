import { GetServerSidePropsContext } from "next";
import CollegeDetailPage from '../../main-pages/CollegeDetailPage/CollegeDetailPage';
import { getSingleCollegeInfo } from '../api/CST/get-single-college';
import { getCollegeList } from "../../pages/api/CST/get-college-list";
import { getSession } from "next-auth/react";
import React from 'react';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { id } = ctx.query;
    const session = getSession(ctx);
    const userId = (await session).user.uid;
    const college = await getSingleCollegeInfo(`${id}`);
    const collegeList = await getCollegeList(userId);
    let collegeListJSON = {};
    try {
      collegeListJSON = JSON.parse(JSON.stringify(collegeList)).list;
    } catch (e) {
      collegeListJSON = {}
    }
    return {
      props: {
        collegeData: JSON.stringify(college),
        collegeList: collegeListJSON
      },
    };
  } catch (err) {
    ctx.res.end();
    return { props: {} as never };
  }
};

const CollegeDetail = ({ collegeData, collegeList }) => {
  return <CollegeDetailPage collegeData={collegeData} collegeList={collegeList} />;
};
CollegeDetail.requireAuth = true;
export default CollegeDetail;