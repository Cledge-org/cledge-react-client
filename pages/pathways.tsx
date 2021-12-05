import React, { useEffect, useState } from "react";
import YoutubeEmbed from "../components/common/YoutubeEmbed";
import DropDownTab from "../components/common/DropDown_Tab";

//profile progress/ question summary page

interface PathwaysProps {
  pathway: Course;
  userTags: string[];
}

export default function Pathways({ pathway, userTags }: PathwaysProps) {
  const [currPage, setCurrPage] = useState(null);
  const [currSelected, setCurrSelected] = useState("");
  useEffect(() => {
    let currContent = getSortedContent(
      pathway.modules[0].presetContent,
      pathway.modules[0].personalizedContent
    )[0];
    setCurrSelected(pathway.modules[0].title + currContent.title);
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
      for (let j = 0; j < modulePersonalizedContent[i].tagConfigs.length; j++) {
        let containsAll = true;
        for (
          let k = 0;
          k < modulePersonalizedContent[i].tagConfigs[j].length;
          k++
        ) {
          if (
            !userTags.includes(modulePersonalizedContent[i].tagConfigs[j][k])
          ) {
            containsAll = false;
          }
        }
        if (containsAll) {
          personalizedContent.push(modulePersonalizedContent[i]);
          break;
        }
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
    <div
      className="container-fluid d-flex flex-row px-0"
      style={{ height: "94vh" }}
    >
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        {pathway.modules.map(
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
  );
}

Pathways.requireAuth = false;
