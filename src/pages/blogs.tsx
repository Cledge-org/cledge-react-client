import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getAllPosts } from "./api/get-all-blogs";
import Link from 'next/Link';
import Image from 'next/image';
import BlogText from "../../src/common/components/Blog/CardBlog";
import { validateCallback } from "@firebase/util";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        blogInfo: JSON.parse(JSON.stringify(await getAllPosts()))
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Blogs = ({
  blogInfo
}) => {
  //console.log(blogInfo.articles);
  const blogs = blogInfo.articles[0];
  const [searchTerm, setSearchTerm] = useState('');
  // grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0
  return (
    <>
    <div className='container-fluid d-flex flex-row px-0'>
      <div 
        className='col-md-8'
        style={{minHeight: '100vh'}}
      > 
        <div className='flex align-items-center ms-5 p-5 me-5'>
        <h1 className="ms-5">Blogs</h1>
          <div 
            className='card-body row'
          >
            {blogs.filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
              }
            }).map((blog) => (
              <div
                key={blog.title}
                className='border border-3 border-gray-200 m-2 rounded-xl shadow overflow-hidden'
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='col-md-4 border-start h-12'>
        <div className="d-flex flex-row justify-content-center mt-4">
          <div className="d-flex flex-row justify-content-start align-items-center search-container">
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
        <div className='d-flex flex-row mt-4 ms-5'>
              <p className='text-muted'>Topics</p>
        </div>
      </div>
    </div>
    </>
  );
};
export default Blogs
