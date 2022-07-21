import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import BlogText from "../../common/components/Blog/CardBlog";
import Item from "antd/lib/list/Item";

const BlogsPage = ({ blogInfo }) => {
  //console.log(blogInfo.articles);
  const blogs = blogInfo.articles[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  // grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0
  return (
    <>
      <div className="container-fluid d-flex px-0">
        <div>
          <div className="ms-5 p-5 me-5">
            <h1 className="ms-5">Blogs</h1>
            <div className="card-body row">
              {blogs
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (topicFilter == "") {
                    return val;
                  } else if (val.topics.includes(topicFilter)) {
                    return val;
                  }
                })
                .map((blog) => (
                  <div
                    key={blog.title}
                    className="border border-3 border-gray-200 m-2 rounded-xl shadow overflow-hidden"
                  >
                    <Link href={`/blog/${blog._slug}`}>
                      <a>
                        <BlogText
                          title={blog.title}
                          author={blog.author}
                          date={blog.date}
                          description={blog.description}
                          imageURL={blog.image}
                        />
                      </a>
                    </Link>
                    <div className="mx-1">
                      {blog.topics.map(function (topic) {
                        return (
                          <div className="btn btn-light rounded-pill mb-4 mx-2">
                            {topic}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-md-4 border-start h-12">
          <div className="d-flex flex-row justify-content-center mt-4">
            <div className="d-flex justify-content-start align-items-center search-container">
              <div className="p-1 cl-mid-gray" style={{ width: "30px" }}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <input
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="py-1 search-input"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="container mt-4 ms-4">
            <div className="row">
              <p className="text-muted mx-2">Topics</p>
              <div className="pb-2">
                <button
                  className="btn btn-light rounded-pill mb-2 mx-2"
                  onClick={() => {
                    setTopicFilter("");
                  }}
                >
                  All
                </button>
                <button
                  className="btn btn-light rounded-pill mb-2 mx-2"
                  onClick={() => {
                    setTopicFilter("Extracurriculars");
                  }}
                >
                  Extracurriculars
                </button>
                <button
                  className="btn btn-light rounded-pill mb-2 mx-2"
                  onClick={() => {
                    setTopicFilter("Essay");
                  }}
                >
                  Essay
                </button>
                <button
                  className="btn btn-light rounded-pill mb-2 mx-2"
                  onClick={() => {
                    setTopicFilter("Application");
                  }}
                >
                  Application
                </button>
                <button
                  className="btn btn-light rounded-pill mb-2 mx-2"
                  onClick={() => {
                    setTopicFilter("Standardized Tests");
                  }}
                >
                  Standardized Tests
                </button>
                <button
                  className="btn btn-light rounded-pill mb-2 mx-2"
                  onClick={() => {
                    setTopicFilter("Academics");
                  }}
                >
                  Academics
                </button>
                <button
                  className="btn btn-light rounded-pill mb-2 mx-2"
                  onClick={() => {
                    setTopicFilter("Grades");
                  }}
                >
                  Grades
                </button>
                <button
                  className="btn btn-light rounded-pill mb-2 mx-2"
                  onClick={() => {
                    setTopicFilter("Scholarships");
                  }}
                >
                  Scholarships
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogsPage;
