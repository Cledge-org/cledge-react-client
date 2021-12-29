import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../_app";
import ECDropDown from "../../components/question_components/ec_dropdown_question";
import UploadPage from "../../components/common/upload-page";
import { ORIGIN_URL } from "../../config";

// logged in landing page
const ResourcesUploadPage: NextApplicationPage<{}> = ({}) => {
  const [resourceType, setResourceType] = useState("Video");
  const [resourceData, setResourceData] = useState({
    title: "",
    source: "",
    description: "",
  });

  return (
    <UploadPage
      onUpload={() => {
        fetch(`${ORIGIN_URL}/api/put-resource`, {
          method: "POST",
          body: JSON.stringify({
            type: resourceType.toLowerCase() + "s",
            resource: resourceData,
          }),
        }).then((res) => {
          console.log(res.status);
        });
      }}
    >
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
    </UploadPage>
  );
};
export default ResourcesUploadPage;
