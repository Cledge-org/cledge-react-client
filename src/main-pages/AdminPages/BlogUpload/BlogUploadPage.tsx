import { useMemo, useState } from "react";
import { NextApplicationPage } from "../../AppPage/AppPage";
import UploadPage from "../BlogUpload/CustomBlogUploadPage";
import DropDownQuestion from "../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { callPutBlog } from "src/utils/apiCalls";
import RichTextEditor from "src/common/components/RichTextEditor/RichTextEditor";

// logged in landing page
const BlogUploadPage: NextApplicationPage<{ blogInfo }> = ({ blogInfo }) => {
  const [resourceType, setResourceType] = useState("article");
  const [resourceData, setResourceData] = useState({
    _id: "",
    _slug: "",
    title: "",
    author: "",
    date: "",
    description: "",
    content: [],
    image: "",
    topics: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const uploadImage = (e) => {
    const files = e.target.files;
    const file = files[0];
    getbase64(file);
  };
  const onLoad = (fileString) => {
    setResourceData({ ...resourceData, image: fileString });
  };
  const getbase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  function handleEditorChange(textJSON) {
    setResourceData({
      ...resourceData,
      content: textJSON,
    });
  }
  function handleUpload() {
  let resourceSendData = {};
    resourceSendData[resourceType.toLowerCase()] = resourceData;
    callPutBlog(resourceData._id, { ...resourceData, _id: undefined })
      .then((res) => {
        console.log(res.status);
        alert("Upload Successful!");
        router.push({ pathname: "/dashboard" });
      })
      .catch(() => {
        alert(
          "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
        );
        router.push({ pathname: "/dashboard" });
      });
  }
  const editor = useMemo(() => {
    return (
      <RichTextEditor
        className="w-100"
        key={resourceData._id}
        initialValue={
          resourceData.content && resourceData.content.length > 0
            ? resourceData.content
            : [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "This is a placeholder",
                      bold: true,
                      "font-size": "28px",
                      "font-color": "#070452",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "This is a placeholder",
                      bold: true,
                      "font-size": "22px",
                      "font-color": "#070452",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "This is a placeholder",
                      bold: true,
                      "font-size": "18px",
                      "font-color": "#070452",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "This is a placeholder",
                      "font-size": "14px",
                      "font-color": "#070452",
                    },
                  ],
                },
              ]
        }
        onChange={handleEditorChange}
      />
    );
  }, [resourceData]);
  return (
    <>
      <UploadPage
        onUpload={() => {
          let resourceSendData = {};
          resourceSendData[resourceType.toLowerCase()] = resourceData;
          callPutBlog(resourceData._id, { ...resourceData, _id: undefined })
            .then((res) => {
              console.log(res.status);
              alert("Upload Successful!");
              router.push({ pathname: "/dashboard" });
            })
            .catch(() => {
              alert(
                "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
              );
              router.push({ pathname: "/dashboard" });
            });
        }}
      >
        <div className="row">
          <div className="col-md-9">
            {editor}
          </div>
          <div className="col">
            <div
              style={{
                position: "relative",
                padding: "1px 18px 17px",
                margin: "0 -30px",
                height: "6.3em",
                borderBottom: "2px solid #eee",
                marginBottom: "20px",
              }}
              className="d-flex justify-content-center align-items-center"
            >
              <button className="me-5" style={{backgroundColor: "transparent", border: "0px", color: "#2651ed", fontWeight: "bold"}}>Save</button>
              <button
                className="me-5"
                style={{
                  backgroundColor: "transparent",
                  border: "0px",
                  color: "#2651ed",
                  fontWeight: "bold"
                }}
                onClick={() => history.back()}
              >
                Cancel
              </button>
              <button
                className="cl-btn-blue me-2"
                onClick={handleUpload}
              >
                Publish
              </button>
            </div>
            <div
              style={{
                borderLeft: "2px solid #eee"
              }}
              className="h-100"
            >
              <div className="ms-4">
                <div className="pt-4 border-bottom pb-3">
                  <h6 className="mb-3">Settings</h6>

                  <div className="form-group me-5">
                    <DropDownQuestion
                      isForWaitlist
                      onChange={(value) => {
                        if (value === "NEW BLOG") {
                          setResourceData({
                            _id: "",
                            _slug: "",
                            title: "",
                            author: "",
                            date: "",
                            description: "",
                            content: [],
                            image: "",
                            topics: [],
                          });
                          return;
                        }
                        setResourceData(blogInfo.find((blog) => blog.title === value));
                      }}
                      defaultValue={"NEW BLOG"}
                      valuesList={blogInfo.map((blog) => blog.title).concat(["NEW BLOG"])}
                    />
                    <div className="mb-2" />
                  </div>

                  {resourceData._id && (
                    <div className="form-group mb-2 me-5">
                      <button
                        className="cl-btn-red w-100"
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      >
                        DELETE THIS BLOG
                      </button>
                    </div>
                  )}
                  <div className="form-group mb-2 w-75">
                    <input
                      value={resourceData.title}
                      onChange={(e) =>
                        setResourceData({
                          ...resourceData,
                          title: e.target.value,
                          _slug: e.target.value.replace(/\s+/g, "-").toLowerCase(),
                        })
                      }
                      type="text"
                      className="px-3 form-control"
                      id="title"
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="form-group mb-2 w-75">
                    <input
                      value={resourceData.author}
                      onChange={(e) =>
                        setResourceData({
                          ...resourceData,
                          author: e.target.value,
                        })
                      }
                      type="text"
                      className="px-3 form-control"
                      id="author"
                      placeholder="Enter author"
                    />
                  </div>
                  <div className="form-group mb-2 w-75">
                    <input
                      value={resourceData.date}
                      onChange={(e) =>
                        setResourceData({
                          ...resourceData,
                          date: e.target.value,
                        })
                      }
                      type="text"
                      className="px-3 form-control"
                      id="date"
                      placeholder="Enter date"
                    />
                  </div>
                  <div className="form-group mb-2 w-75">
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
                      placeholder="Enter description"
                    />
                  </div>     
                </div>
                <div className="pt-4 border-bottom pb-2">
                  <p className="font-weight-light">Thumbnail picture</p>

                  <div className="form-group">
                    <div>
                      <input type="file" onChange={uploadImage} />
                      <img src={resourceData.image} style={{ width: "50%" }} />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-bottom pb-2">
                  <p>Categories</p>
                  <div className="form-group mb-3 w-75">
                    <DropDownQuestion
                      isForWaitlist
                      onChange={(value) => {
                        setResourceData({
                          ...resourceData,
                          topics: value,
                        });
                      }}
                      isConcatenable
                      defaultValue={resourceData.topics || ""}
                      valuesList={[
                        "Extracurriculars",
                        "Essay",
                        "Application",
                        "Standardized Tests",
                        "Academics",
                        "Grades",
                        "Scholarships",
                      ]}
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <p>SEO Keywords</p>
                  <div className="form-group mb-2 w-75">
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
                      placeholder='Separate by ","'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            ariaHideApp={false}
            style={{
              overlay: {
                background: "rgba(50, 50, 50, 0.5)",
              },
              content: {
                top: "30%",
                left: "35%",
                width: "30%",
                height: "fit-content",
                borderRadius: "20px",
                borderColor: "white",
                zIndex: 100,
              },
            }}
            onRequestClose={() => {
              setModalOpen(false);
            }}
            isOpen={modalOpen}
          >
            <div className="center-child flex-column">
              Are you sure you want to delete this Blog?
              <div className="w-100 center-child mt-3">
                <button
                  className="cl-btn-blue me-2"
                  onClick={() => {
                    console.log(resourceData._id);
                    callPutBlog(resourceData._id, undefined)
                      .then((res) => {
                        console.log(res.status);
                        alert("Deletion Successful!");
                        router.push({ pathname: "/dashboard" });
                      })
                      .catch(() => {
                        alert(
                          "Deletion Unsuccessful! (should probably talk to Yousef or Bryan)"
                        );
                        router.push({ pathname: "/dashboard" });
                      });
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setModalOpen(false);
                  }}
                  className="cl-btn-clear ms-2"
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </UploadPage>
    </>

  );
};
export default BlogUploadPage;
