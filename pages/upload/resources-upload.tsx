import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../_app";
import ECDropDown from "../../components/question_components/ec_dropdown_question";
import UploadPage from "../../components/common/upload-page";

// logged in landing page
const ResourcesUploadPage: NextApplicationPage<{}> = ({}) => {
  const [resourceType, setResourceType] = useState("Video");
  const [resourceData, setResourceData] = useState({
    title: "",
    source: "",
    category: "",
    description: "",
  });
  return (
    <UploadPage
      onUpload={() => {
        let resourceSendData = {};
        resourceSendData[resourceType.toLowerCase()] = resourceData;
        console.log(resourceSendData);
        fetch(`/api/resources/put-resource-${resourceType.toLowerCase()}`, {
          method: "POST",
          body: JSON.stringify(resourceSendData),
        }).then((res) => {
          console.log(res.status);
        });
      }}
    >
      <ECDropDown
        isForWaitlist
        onChange={(value) => {
          setResourceData({
            ...resourceData,
            title: value.toLowerCase(),
          });
        }}
        defaultValue={resourceType}
        valuesList={[
          "Extracurriculars",
          "Essay",
          "Application",
          "Standardized Tests",
          "Academics",
          "Grades",
          "Scholarship",
        ]}
      />
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
