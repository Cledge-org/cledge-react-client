import {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import CardTask from "../components/common/Card_Task";
import TabButton from "../components/common/TabButton";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "./_app";
import { getDashboardInfo } from "./api/get-dashboard-info";
import { useRouter } from "next/router";
import ECDropDown from "../components/question_components/ec_dropdown_question";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return { props: {} };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

// logged in landing page
const UploadPage: NextApplicationPage<{}> = ({}) => {
  const router = useRouter();
  const session = useSession();
  const [resourceType, setResourceType] = useState("Video");
  const [resourceData, setResourceData] = useState({
    title: "",
    source: "",
    description: "",
  });
  if (session.data.user.email === "yousefgomaa@hotmail.com") {
    return (
      <div className="container-fluid p-5 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center w-50">
          {router.query.type === "resources" ? (
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
          ) : (
            <div></div>
          )}
          <button className="mt-3" onChange={() => {}}>
            Upload
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div>404</div>
        <div>This page could not be found.</div>
      </div>
    </div>
  );
};
UploadPage.requireAuth = true;
export default UploadPage;
