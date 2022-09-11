import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import BlogText from "../../common/components/Blog/CardBlog";
import Item from "antd/lib/list/Item";
import { Button } from "react-bootstrap";

const BlogsPage = ({ blogInfo }) => {
  //console.log(blogInfo.articles);
  const blogs = blogInfo.articles[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  // grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0

  function FilterItem(props) {
    return (
      <Button
        className="btn btn-light rounded-pill mb-3 mx-2"
        onClick={() => {
          setTopicFilter(props.filter);
        }}
      >
        {props.display}
      </Button>
    )
  }
  
  return (
    <>
      <div className="d-flex justify-content-center">
        <div style={{ width: "50%" }}>
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
                    <div className="mx-1 mb-4" >
                      {blog.topics.map(function (topic) {
                        return (
                          <div className="btn btn-light rounded-pill mx-2">
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
        <div className="col-md-4 border-start">
          
          <div className="mx-4 mt-5">
            <div className="d-flex mt-4 mb-4">
              <div className="d-flex align-items-center">
                <div className="p-1 cl-mid-gray" style={{ width: "30px" }}>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  style={{width: "30em", height: "4vh"}}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className="py-1 search-input"
                  type="text"
                  placeholder={"Search"}
                />
              </div>
            </div>
            <p className="row text-muted mx-2">Topics</p>
            <div className="w-75">
              <FilterItem display="All" filter="" />
              <FilterItem display="Extracurriculars" filter="Extracurriculars" />
              <FilterItem display="Essay" filter="Essay" />
              <FilterItem display="Application" filter="Application" />
              <FilterItem display="Standardized Tests" filter="Application" />
              <FilterItem display="Academics" filter="Academics" />
              <FilterItem display="Grades" filter="Grades" />
              <FilterItem display="Scholarships" filter="Scholarships" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogsPage;