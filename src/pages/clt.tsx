import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import CollegeListPage from "src/main-pages/CollegeList/CollegeListPage";
import { getCollegeList } from "../pages/api/CST/get-college-list";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const userId = (await session).user.uid;
    const collegeList = await getCollegeList("rybYEMoHtzQuJPdMJWpD0Ra9yyv1");
    let collegeListJSON = {};
    try {
      collegeListJSON = JSON.parse(JSON.stringify(collegeList)).list;
    } catch (e) {
      collegeListJSON = {};
    }

    return {
      props: {
        collegeListData: collegeListJSON
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const CLT = ({ collegeListData }) => {
  return <CollegeListPage collegeList={collegeListData} setCollegeList={null} />;
};

export default CLT;
