import { GetServerSidePropsContext } from "next";
import { getAllPathways } from "../api/get-all-pathways";
import LearningPathwaysUploadPage from "../../main-pages/AdminPages/LearningPathwaysUploadPage/LearningPathwaysUploadPage";
import PathwayPartsUploadPage from "src/main-pages/AdminPages/PathwayPartsUpload/PathwayPartsUpload";
import { getAllParts } from "src/pages/api/get-all-pathway-parts";
import { getAllCheckins } from "src/pages/api/get-all-checkins";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const [allPathways, allCheckins, allParts] = await Promise.all([
    JSON.parse(JSON.stringify(await getAllPathways())),
    JSON.parse(JSON.stringify(await getAllCheckins())),
    JSON.parse(JSON.stringify(await getAllParts())),
  ]);
  try {
    return {
      props: {
        allPathways,
        allCheckins,
        allParts,
        // allModules: await (
        //   await fetch(`/api/get-all-modules`)
        // ).json(),
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const LearningPathwaysUpload = ({ allPathways, allCheckins, allParts }) => {
  return (
    <PathwayPartsUploadPage
      allPathways={allPathways}
      allCheckins={allCheckins}
      allParts={allParts}
    />
  );
};
export default LearningPathwaysUpload;
