import { GetServerSidePropsContext } from "next";
import ResourcesPage from "../main-pages/ResourcesPage/ResourcesPage";
import { getResourcesInfo } from "./api/resources/get-resources";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        resourcesInfo: JSON.parse(JSON.stringify(await getResourcesInfo())),
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Resources = ({ resourcesInfo }) => {
  return <ResourcesPage resourcesInfo={resourcesInfo} />;
};
export default Resources;
