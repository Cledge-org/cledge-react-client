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
  try {
    return {
      props: {
        pathwayInfo: await (
          await fetch(`${ORIGIN_URL}/api/get-pathway`, {
            method: "POST",
            body: JSON.stringify({
              userId: AuthFunctions.userId,
              pathwayId: ctx.query.id as string,
            }),
          })
        ).json(),
        userTags: await (
          await fetch(`${ORIGIN_URL}/api/get-account`, {
            method: "POST",
            body: JSON.stringify({ userId: AuthFunctions.userId }),
          })
        ).json(),
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
  userTags: string[];
}> = ({ pathwayInfo, userTags }) => {
  const [currPage, setCurrPage] = useState(null);
  const [currSelected, setCurrSelected] = useState("");

  useEffect(() => {
    let currContent = getSortedContent(
      pathwayInfo.modules[0].presetContent,
      pathwayInfo.modules[0].personalizedContent
    )[0];
    setCurrSelected(pathwayInfo.modules[0].title + currContent.title);
    setCurrPage(
      <div className="d-flex flex-column" style={{ flex: 3 }}>
        <div className="w-100" style={{ height: "55%" }}>
          <YoutubeEmbed
            isPathway
            videoId={currContent.url.substring(
              currContent.url.lastIndexOf("/") + 1
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
  const getPersonalizedContent = (
    modulePersonalizedContent: PersonalizedContent[]
  ) => {
    let personalizedContent: PersonalizedContent[] = [];
    for (let i = 0; i < modulePersonalizedContent.length; i++) {
      let containsNum = 0;
      for (let j = 0; j < modulePersonalizedContent[i].tags.length; j++) {
        if (userTags.includes(modulePersonalizedContent[i].tags[j])) {
          containsNum++;
        }
      }
      if (containsNum >= 2) {
        personalizedContent.push(modulePersonalizedContent[i]);
      }
    }
    return personalizedContent;
  };
  const getSortedContent = (presetContent, personalizedContent) => {
    let allContent = presetContent.concat(
      getPersonalizedContent(personalizedContent)
    );
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
                            currContent.url.lastIndexOf("/") + 1
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
