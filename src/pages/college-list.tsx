import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import CollegeListPage from "src/main-pages/CollegeList/CollegeListPage";
import { getCollegeList } from "./api/CST/get-college-list";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const userId = (await session).user.uid;
    const collegeList = await getCollegeList(userId);
    let collegeListJSON = {};
    try {
      collegeListJSON = JSON.parse(JSON.stringify(collegeList)).list;
    } catch (e) {
      collegeListJSON = {};
    }

    return {
      props: {
        firebaseId: userId,
        collegeListData: collegeListJSON
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const CollegeList = ({ collegeListData }) => {
  return <CollegeListPage collegeList={collegeListData} />;
};

CollegeList.requireAuth = true;
export default CollegeList;
