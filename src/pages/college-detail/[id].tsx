import { GetServerSidePropsContext } from "next";
import CollegeDetailPage from "../../main-pages/CollegeDetailPage/CollegeDetailPage";
import { getSingleCollegeInfo } from "../api/CST/get-single-college";
import { getCollegeList } from "../api/CST/get-college-list";
import { getSession } from "next-auth/react";
import React from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { id } = ctx.query;
    const college = await getSingleCollegeInfo(`${id}`);
    const session = await getSession(ctx);
    if (!session) {
      return {
        props: {
          logged: false,
          collegeData: JSON.stringify(college)
        },
      };
    } else {
      const userId = session.user.uid;
      const collegeList = await getCollegeList(userId);
      let collegeListJSON = {};
      try {
        collegeListJSON = JSON.parse(JSON.stringify(collegeList)).list;
      } catch (e) {
        collegeListJSON = {};
      }
      return {
        props: {
          logged: true,
          collegeData: JSON.stringify(college),
          collegeList: collegeListJSON,
        },
      };
    }
  } catch (err) {
    return { props: {} as never };
  }
};

const CollegeDetail = ({ collegeData, collegeList, logged }) => {
  if (logged) {
    return (
      <CollegeDetailPage collegeData={collegeData} collegeList={collegeList} loggedIn={true}/>
    );
  } else return (
    <CollegeDetailPage collegeData={collegeData} loggedIn={false} />
  );
};
// CollegeDetail.requireAuth = true;
export default CollegeDetail;
