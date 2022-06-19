import { useState } from "react";
import { NextApplicationPage } from "../../AppPage/AppPage";
import UploadPage from "../components/UploadPage/UploadPage";
import DropDownQuestion from "../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import MdEditor from "react-markdown-editor-lite";
import markIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css'

// logged in landing page
const BlogUploadPage: NextApplicationPage<{}> = ({}) => {
  const [resourceType, setResourceType] = useState("article");
  const [resourceData, setResourceData] = useState({
    _slug: "",
    title: "",
    author: "",
    date: "",
    description: "",
    content: "",
    image: "",
    topics: ""
  });
  const md = new markIt();
  const uploadImage = (e) => {
    const files = e.target.files;
    const file = files[0];
    getbase64(file);
  }
  const onLoad = (fileString) => {
    resourceData.image = fileString;
  }
  const getbase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    }
  }
  function handleEditorChange({ html, text }) {
      console.log('handleEditorChange', html, text);
      setResourceData({
        ...resourceData,
        content: html,
      })
  }
  return (
    <UploadPage
      onUpload={() => {
        let resourceSendData = {};
        resourceSendData[resourceType.toLowerCase()] = resourceData;
        console.log(resourceSendData);
        fetch(`/api/put-blog`, {
          method: "POST",
          body: JSON.stringify(resourceSendData),
        }).then((res) => {
          console.log(res.status);
        });
      }}
    >
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
                _slug: e.target.value.replace(/\s+/g, '-').toLowerCase()
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
          defaultValue=""
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
            <form>
              <input type="file" onChange={uploadImage} />
            </form>
        </div>
        
        <div className='form-group'>
            <label
                style={{ fontSize: "0.9em" }}
                className="text-muted"
                htmlFor="content"
            >
              Content:
            </label>
            <MdEditor 
              style={{ height: '500px' }} 
              renderHTML={text => md.render(text)} 
              onChange={handleEditorChange} />
        </div>
      </div>
    </UploadPage>
  );
};
export default BlogUploadPage;