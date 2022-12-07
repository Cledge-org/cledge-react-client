import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import BlogText from "../../common/components/Blog/CardBlog";
import { Button } from "react-bootstrap";
import Footer from "../../common/components/Footer/Footer";
import { callGetAccount } from "../../utils/apiCalls";
import { useSession } from "next-auth/react";

const BlogsPage = ({ blogInfo }) => {
    //console.log(blogInfo.articles);
    const blogs = blogInfo.articles[0];
    const [searchTerm, setSearchTerm] = useState("");
    const [topicFilter, setTopicFilter] = useState("");
    const [accountInfo, setAccount] = useState<AccountInfo>();
    const session = useSession();

    useEffect(() => {
        if (session.data) {
            callGetAccount(session.data.user.uid)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setAccount(res);
                });
        }
    }, []);

    // grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0

    function FilterItem(props) {
        return (
            <Button
                className={`btn rounded-pill mb-3 mx-2 ${
                    topicFilter === props.filter ? "btn-blue" : "btn-light"
                }`}
                onClick={() => {
                    setTopicFilter(props.filter);
                }}>
                {props.display}
            </Button>
        );
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
                                        val.title
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                })
                                .filter((val) => {
                                    if (topicFilter == "") {
                                        return val;
                                    } else if (
                                        val.topics.includes(topicFilter)
                                    ) {
                                        return val;
                                    }
                                })
                                .map((blog) => (
                                    <div
                                        key={blog.title}
                                        className="border border-3 border-gray-200 m-2 rounded-xl shadow overflow-hidden">
                                        <Link href={`/blog/${blog._slug}`}>
                                            <a>
                                                <BlogText
                                                    title={blog.title}
                                                    author={blog.author}
                                                    date={blog.date}
                                                    description={
                                                        blog.description
                                                    }
                                                    imageURL={blog.image}
                                                />
                                            </a>
                                        </Link>
                                        <div className="mx-1 mb-4">
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
                                <div
                                    className="p-1 cl-mid-gray"
                                    style={{ width: "30px" }}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                                <input
                                    style={{ width: "30em", height: "4vh" }}
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
                            <FilterItem
                                display="Extracurriculars"
                                filter="Extracurriculars"
                            />
                            <FilterItem display="Essay" filter="Essay" />
                            <FilterItem
                                display="Application"
                                filter="Application"
                            />
                            <FilterItem
                                display="Standardized Tests"
                                filter="Standardized Tests"
                            />
                            <FilterItem
                                display="Academics"
                                filter="Academics"
                            />
                            <FilterItem display="Grades" filter="Grades" />
                            <FilterItem
                                display="Scholarships"
                                filter="Scholarships"
                            />
                        </div>
                        {(!accountInfo?.hasUWAccess ?? true) && (
                            <div
                                className="alert alert-primary w-75 mt-3"
                                style={{ maxWidth: "450px" }}
                                role="alert">
                                <div className="pb-2">
                                    <h6 className="alert-link">
                                        Be the first to know when we release
                                    </h6>
                                </div>
                                <p>
                                    Cledge uses AI and data to help you plan
                                    your path ahead and give you an edge on your
                                    application. We're releasing soon!
                                </p>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        className="w-75"
                                        key="subscribe-btn"
                                        onClick={() => {
                                            window.open(
                                                "https://forms.gle/M1GxLK45Yi3Esfn5A",
                                                "_blank"
                                            );
                                        }}>
                                        Join Our Insider Program
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div
                            className="alert alert-primary w-75"
                            style={{ maxWidth: "450px" }}
                            role="alert">
                            <div className="pb-2">
                                <h6 className="alert-link">
                                    Other free resources
                                </h6>
                            </div>

                            <div>
                                <a
                                    href="https://forms.gle/VL5rVntF2Sc1oyeC7"
                                    target="_blank"
                                    className="alert-link"
                                    rel="noreferrer">
                                    Monthly Newsletters with Free Resources ➜
                                </a>
                            </div>
                            <div>
                                <a
                                    href="https://chat.whatsapp.com/LLlFJSX9g0oCu3QFCFI8Qc"
                                    target="_blank"
                                    className="alert-link"
                                    rel="noreferrer">
                                    Join WhatsApp community ➜
                                </a>
                            </div>
                            <div>
                                <a
                                    href="https://discord.gg/TYTfXGNh"
                                    target="_blank"
                                    className="alert-link"
                                    rel="noreferrer">
                                    Join Discord community ➜
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default BlogsPage;
