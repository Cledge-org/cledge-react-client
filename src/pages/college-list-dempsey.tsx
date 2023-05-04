import { GetServerSidePropsContext } from "next";
import CollegeListDempseyPage from "src/main-pages/CollegeListDempsey/CollegeListDempseyPage";
import { getCollegeList } from "src/main-pages/DempseyPage/get-college-list";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const collegeList = await getCollegeList("0vKSdjmusWXBquxeYq25qEFMlCV2");
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

const CollegeList = ({ collegeListData }) => {
  return <CollegeListDempseyPage collegeList={collegeListData} accountInfo={undefined} />;
};

export default CollegeList;
