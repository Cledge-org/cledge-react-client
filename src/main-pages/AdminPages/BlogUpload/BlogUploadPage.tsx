import { useMemo, useState } from "react";
import { NextApplicationPage } from "../../AppPage/AppPage";
import UploadPage from "../components/UploadPage/UploadPage";
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
    <UploadPage
      onUpload={() => {
        let resourceSendData = {};
        resourceSendData[resourceType.toLowerCase()] = resourceData;
        callPutBlog(resourceData._id, { ...resourceData, _id: undefined })
          .then((res) => {
            alert("Upload Successful!");
            router.push({ pathname: "/my-learning" });
          })
          .catch(() => {
            alert(
              "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
            );
            router.push({ pathname: "/my-learning" });
          });
      }}
    >
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group">
          <label
            style={{ fontSize: "1.2em" }}
            className="text-muted"
            htmlFor="course-name"
          >
            CURRENT PATHWAY:
          </label>
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
          <div className="form-group">
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
                _slug: e.target.value.replace(/\s+/g, "-").toLowerCase(),
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
            htmlFor="author"
          >
            Author:
          </label>
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
            placeholder="Enter Author"
          />
        </div>
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="date"
          >
            Upload Date:
          </label>
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
            placeholder="Enter Date"
          />
        </div>

        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="title"
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

        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="topic"
          >
            Topic:
          </label>
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
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="title"
          >
            Image:
          </label>
          <div>
            <input type="file" onChange={uploadImage} />
            <img src={resourceData.image} style={{ width: "50%" }} />
          </div>
        </div>
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="content"
          >
            Content:
          </label>
          {editor}
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
                callPutBlog(resourceData._id, undefined)
                  .then((res) => {
                    alert("Deletion Successful!");
                    router.push({ pathname: "/my-learning" });
                  })
                  .catch(() => {
                    alert(
                      "Deletion Unsuccessful! (should probably talk to Yousef or Bryan)"
                    );
                    router.push({ pathname: "/my-learning" });
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
    </UploadPage>
  );
};
export default BlogUploadPage;
