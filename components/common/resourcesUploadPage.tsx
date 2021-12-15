import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../../pages/_app";
import ECDropDown from "../question_components/ec_dropdown_question";

// logged in landing page
const ResourcesUploadPage: NextApplicationPage<{}> = ({}) => {
  const [resourceType, setResourceType] = useState("Video");
  const [resourceData, setResourceData] = useState({
    title: "",
    source: "",
    description: "",
  });

  return (
    <>
      <ECDropDown
        isForWaitlist
        onChange={(value) => {
          console.log(value);
          setResourceType(value);
        }}
        defaultValue={resourceType}
        valuesList={["Video", "Article", "Resource"]}
      />
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            value={resourceData.title}
            onChange={(e) =>
              setResourceData({
                ...resourceData,
                title: e.target.value,
              })
            }
            type="text"
            className="px-3 form-control"
            id="title"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="source"
          >
            Source:
          </label>
          <input
            value={resourceData.source}
            onChange={(e) =>
              setResourceData({
                ...resourceData,
                source: e.target.value,
              })
            }
            type="text"
            className="px-3 form-control"
            id="source"
            placeholder="Enter Source"
          />
        </div>
        {resourceType === "Article" ? (
          <div className="form-group">
            <label
              style={{ fontSize: "0.9em" }}
              className="text-muted"
              htmlFor="description"
            >
              Description:
            </label>
            <input
              value={resourceData.description}
              onChange={(e) =>
                setResourceData({
                  ...resourceData,
                  description: e.target.value,
                })
              }
              type="text"
              className="px-3 form-control"
              id="description"
              placeholder="Enter Description"
            />
          </div>
        ) : null}
      </div>
    </>
  );
};
export default ResourcesUploadPage;
