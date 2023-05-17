import { GetServerSidePropsContext } from "next";
import CollegePage from "../main-pages/CollegePage/CollegePage";
import { getSession } from "next-auth/react";
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
    return { props: {} as never };
  }
};

const College = ({ collegeListData }) => {
  return <CollegePage collegeList={collegeListData} />;
};
// College.requireAuth = true;
export default College;
