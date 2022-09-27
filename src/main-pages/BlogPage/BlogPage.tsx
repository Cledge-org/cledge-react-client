import BlogLayout from "src/common/components/Blog/BlogLayout";
import RichText from "src/common/components/RichText/RichText";
import Footer from "../../common/components/Footer/Footer"

export default function BlogPage({ blogData }) {
  return (
    <>
      <BlogLayout>
        <div>
          <div className="container mb-4">
            <h1>{blogData.title}</h1>
            <p className="text-muted">
              {blogData.author} - {blogData.date}
            </p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <RichText text={blogData.content} />
              </div>
              <div className="col-lg-4"></div>
            </div>
          </div>
        </div>
      </BlogLayout>
      <Footer />
    </>
  );
}
