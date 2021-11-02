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
  useEffect(() => {
    let currContent = pathway.modules[0].presetContent[0];
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
  const getPersonalizedContent = (module: CourseModule) => {
    for (let i = 0; i < module.personalizedContent.length; i++) {
      for (
        let j = 0;
        j < module.personalizedContent[i].tagConfigs.length;
        j++
      ) {
        let containsAll = true;
        for (
          let k = 0;
          k < module.personalizedContent[i].tagConfigs[j].length;
          k++
        ) {
          if (
            !userTags.includes(module.personalizedContent[i].tagConfigs[j][k])
          ) {
            containsAll = false;
          }
        }
      }
    }
  };
  return (
    <div
      className="container-fluid d-flex flex-row px-0"
      style={{ height: "94vh" }}
    >
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        {pathway.modules.map(({ title, presetContent }) => (
          <DropDownTab
            chunkList={presetContent.map(({ title }) => title)}
            onClick={(contentTitle) => {
              let currContent = presetContent.find(
                ({ title }) => title === contentTitle
              );
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
        ))}
      </div>
      {currPage}
    </div>
  );
}

Pathways.requireAuth = false;
