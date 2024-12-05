import { GetServerSidePropsContext } from "next";
import CollegePage from "../main-pages/CollegePage/CollegePage";
import { getSession } from "next-auth/react";
import { getCollegeList } from "../pages/api/CST/get-college-list";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    if (!session) {
      return {
        props: {
          logged: false,
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
          firebaseId: userId,
          collegeListData: collegeListJSON,
          logged: true,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return { props: {} as never };
  }
};

const College = ({ collegeListData, logged }) => {
  if (logged) {
    return <CollegePage collegeList={collegeListData} loggedIn={true} />;
  } else return <CollegePage loggedIn={false} />;
};
// College.requireAuth = true;
export default College;
