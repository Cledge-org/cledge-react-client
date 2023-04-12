import { GetServerSidePropsContext } from "next";
import CollegeDetailPage from '../../main-pages/CollegeDetailPage/CollegeDetailPage';
import { getSingleCollegeInfo } from '../api/CST/get-single-college';
import React from 'react';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { id } = ctx.query;
    const college = await getSingleCollegeInfo(`${id}`);
    return {
      props: {
        collegeData: JSON.stringify(college),
      },
    };
  } catch (err) {
    ctx.res.end();
    return { props: {} as never };
  }
};

const CollegeDetail = ({ collegeData }) => {
  return <CollegeDetailPage collegeData={collegeData} />;
};
CollegeDetail.requireAuth = true;
export default CollegeDetail;