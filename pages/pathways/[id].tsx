import React, { useEffect, useState } from "react";
import YoutubeEmbed from "../../components/common/YoutubeEmbed";
import DropDownTab from "../../components/common/DropDown_Tab";
import { GetServerSidePropsContext } from "next";
import { getPathway } from "../api/get-pathway";
import { NextApplicationPage } from "../_app";
import { useRouter } from "next/router";
import { getAccountInfo } from "../api/get-account";
import AuthFunctions from "../api/auth/firebase-auth";
import { ORIGIN_URL } from "../../config";

//profile progress/ question summary page

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let fetchedData = await fetch(`${ORIGIN_URL}/api/get-pathway`, {
    method: "POST",
    body: JSON.stringify({
      userId: AuthFunctions.userId,
      pathwayId: ctx.query.id as string,
    }),
  });
  console.error(fetchedData.status);
  try {
    return {
      props: {
        pathwayInfo: await fetchedData.json(),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Pathways: NextApplicationPage<{
  pathwayInfo: Pathway;
}> = ({ pathwayInfo }) => {
  const [currPage, setCurrPage] = useState(null);
  const [currSelected, setCurrSelected] = useState("");

  useEffect(() => {
    let currContent = getSortedContent(
      pathwayInfo.modules[0].presetContent,
      pathwayInfo.modules[0].personalizedContent
    )[0];
    console.log(
      currContent.url.substring(currContent.url.lastIndexOf("v=") + 2)
    );
    setCurrSelected(pathwayInfo.modules[0].title + currContent.title);
    setCurrPage(
      <div className="d-flex flex-column" style={{ flex: 3 }}>
        <div className="w-100" style={{ height: "55%" }}>
          <YoutubeEmbed
            isPathway
            videoId={currContent.url.substring(
              currContent.url.lastIndexOf("v=") + 2
            )}
          />
        </div>
        <div className="container-fluid center-child py-5">
          <div className="pathway-description">
            <span
              className="fw-bold cl-dark-text"
              style={{ fontSize: "1.7em" }}
            >
              {currContent.title}
            </span>
          </div>
        </div>
      </div>
    );
  }, []);
  const getSortedContent = (presetContent, personalizedContent) => {
    let allContent = presetContent.concat(personalizedContent);
    console.log(allContent);
    allContent.sort((a, b) => a.priority - b.priority);
    return allContent;
  };
  return (
    <>
      <div
        className="container-fluid d-flex flex-row px-0"
        style={{ height: "94vh" }}
      >
        <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
          {pathwayInfo.modules.map(
            ({ title, presetContent, personalizedContent }) => (
              <DropDownTab
                currSelectedPath={currSelected}
                chunkList={getSortedContent(
                  presetContent,
                  personalizedContent
                ).map(({ title }) => title)}
                onClick={(contentTitle) => {
                  let currContent = presetContent.find(
                    ({ title }) => title === contentTitle
                  );
                  if (currContent === undefined) {
                    currContent = personalizedContent.find(
                      ({ title }) => title === contentTitle
                    );
                  }
                  setCurrSelected(title + contentTitle);
                  setCurrPage(
                    <div className="d-flex flex-column" style={{ flex: 3 }}>
                      <div className="w-100" style={{ height: "55%" }}>
                        <YoutubeEmbed
                          isPathway
                          videoId={currContent.url.substring(
                            currContent.url.lastIndexOf("v=") + 2
                          )}
                        />
                      </div>
                      <div className="container-fluid center-child py-5">
                        <div className="pathway-description">
                          <span
                            className="fw-bold cl-dark-text"
                            style={{ fontSize: "1.7em" }}
                          >
                            {currContent.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
                title={title}
                isPathway
                percentComplete={undefined}
              />
            )
          )}
        </div>
        {currPage}
      </div>
    </>
  );
};

Pathways.requireAuth = true;
export default Pathways;
