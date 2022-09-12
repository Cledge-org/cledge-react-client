import React from "react";
import { GetServerSidePropsContext } from "next";
import { getPathway } from "../api/learning-pathway/get-pathway";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import PathwayPage from "../../main-pages/PathwayPage/PathwayPage";

//profile progress/ question summary page

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
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
      },
    };
  } catch (err) {
    ////console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Pathway = ({ pathwayInfo }) => {
  return <PathwayPage pathwayInfo={pathwayInfo} />;
};
export default Pathway;
