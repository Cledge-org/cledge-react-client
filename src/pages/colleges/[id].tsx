import Head from 'next/head'
import { GetServerSidePropsContext } from "next";
import CollegeDetailPage from 'src/main-pages/CollegeDetailPage/CollegeDetailPage';
import { getCollegeDataById } from 'src/pages/api/CST/get-college-data-by-id';
import { getCollegeInfo } from 'src/pages/api/CST/college-search-tool';
import axios from 'axios';
import { useState } from 'react';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { id } = ctx.query;
    const college = await getCollegeDataById(`${id}`);
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