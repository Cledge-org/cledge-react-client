import { useState } from "react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import TabButton from "../components/common/TabButton";
import { NextApplicationPage } from "./_app";
import CardImage from "../components/common/Card_Image";
import { GetServerSidePropsContext } from "next";
import { getResourcesInfo } from "./api/get-resources";
import { ORIGIN_URL } from "../config";

export const getStaticProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        resourcesInfo: await (
          await fetch(`${ORIGIN_URL}/api/get-resources`)
        ).json(),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Resources: NextApplicationPage<{ resourcesInfo: ResourcesInfo }> = ({
  resourcesInfo,
}) => {
  const [currTab, setCurrTab] = useState("resources");
  return (
    <div className="d-flex flex-column vh-100">
      <div className="row">
        <TabButton
          onClick={() => {
            setCurrTab("resources");
          }}
          title="Resources"
          currTab={currTab}
        />
        <TabButton
          onClick={() => {
            setCurrTab("articles");
          }}
          title="Articles"
          currTab={currTab}
        />
        <TabButton
          onClick={() => {
            setCurrTab("videos");
          }}
          title="Videos"
          currTab={currTab}
        />
      </div>

      <div className="container-fluid align-self-center mx-0 col justify-content-evenly">
        {currTab === "resources" ? (
          <div className="row jusify-content-evenly">
            {resourcesInfo.resources.map((element) => (
              <CardImage
                snippet=""
                title={element.name}
                textGradient={"light"}
              />
            ))}
          </div>
        ) : null}
        {currTab === "articles" ? (
          <div className="row">
            {resourcesInfo.articles.map((element) => (
              <CardText
                snippet=""
                title={element.name}
                textGradient={"light"}
              />
            ))}
          </div>
        ) : null}
        {currTab === "videos" ? (
          <div className="row">
            {resourcesInfo.videoList.map((element) => (
              <CardVideo
                title={element.name}
                textGradient={"light"}
                videoUrl={element.source}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Resources;
