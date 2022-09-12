import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getAllUserInfo } from "src/pages/api/admin/get-all-students";
import StudentProgressDownloadPage from "src/main-pages/AdminPages/StudentProgressDownloadPage/StudentProgressDownloadPage";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    if (session?.user?.email === "test31@gmail.com") {
      return {
        props: {
          allStudents: JSON.parse(JSON.stringify(await getAllUserInfo())),
        },
      };
    }
    return {
      props: {
        allStudents: {},
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const StudentProgressDownload = ({ allStudents }) => {
  return <StudentProgressDownloadPage allStudents={allStudents} />;
};
export default StudentProgressDownload;
