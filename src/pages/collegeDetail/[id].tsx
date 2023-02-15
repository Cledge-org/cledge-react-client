import CollegeDetailPage from "../../main-pages/CollegeDetailPage/CollegeDetailPage";
import { GetServerSidePropsContext } from "next";
import { getSingleCollegeInfo } from "src/pages/api/CST/get-single-college";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { id } = ctx.query;
    // why
    // const data = await fetch(`/api/CST/get-single-college/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({ college_id: `${id}` }),
    // });
    const data = await getSingleCollegeInfo(`${id}`);
    return {
      props: {
        collegeData: JSON.parse(JSON.stringify(data)),
      },
    };
  } catch (err) {
    ctx.res.end();
    return { props: {} as never };
  }
};

const CollegeDetail = ({ collegeData }) => {
  return <CollegeDetailPage collegeData={collegeData}/>;
};

CollegeDetail.requireAuth = true;
export default CollegeDetail;
