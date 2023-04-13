import React from "react";
import { GetServerSidePropsContext } from "next";
import { getPathway } from "../api/learning-pathway/get-pathway";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import PathwayPage from "../../main-pages/PathwayPage/PathwayPage";
import { getAllPathwayProgress } from "src/pages/api/admin/learning-pathway/get-all-pathway-progress";

//profile progress/ question summary page

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const pathwaysProgress = await getAllPathwayProgress((await session).user.uid);
    const pathwaysJSON = await JSON.parse(JSON.stringify(pathwaysProgress));
    return {
      props: {
        pathwayInfo: JSON.parse(
          JSON.stringify(
            await getPathway(
              session.user.uid,
              new ObjectId(ctx.query.id as string)
            )
          )
        ),
        pathwaysProgress: pathwaysJSON
      },
    };
  } catch (err) {
    ////console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Pathway = ({ pathwayInfo, pathwaysProgress }) => {
  return <PathwayPage pathwayInfo={pathwayInfo} pathwaysProgress={pathwaysProgress} />;
};
export default Pathway;
