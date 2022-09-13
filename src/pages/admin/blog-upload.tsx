import { GetServerSidePropsContext } from "next";
import { getAllPosts } from "src/pages/api/blogs/get-all-blogs";
import BlogUploadPage from "../../main-pages/AdminPages/BlogUpload/BlogUploadPage";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        blogInfo: JSON.parse(JSON.stringify(await getAllPosts())),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Blogs = ({ blogInfo }) => {
  return (
    <BlogUploadPage
      blogInfo={blogInfo.articles.reduce((prev, curr) => prev.concat(curr), [])}
    />
  );
};
export default Blogs;
