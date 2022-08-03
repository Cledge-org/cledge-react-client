import { GetServerSidePropsContext } from "next";
import { getAllPathways } from "../api/get-all-pathways";
import LearningPathwaysUploadPage from "../../main-pages/AdminPages/LearningPathwaysUploadPage/LearningPathwaysUploadPage";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        allPathways: JSON.parse(JSON.stringify(await getAllPathways())),
        // allModules: await (
        //   await fetch(`/api/get-all-modules`)
        // ).json(),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const LearningPathwaysUpload = ({ allPathways }) => {
  return <LearningPathwaysUploadPage allPathways={allPathways} />;
};
export default LearningPathwaysUpload;
