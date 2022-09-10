import { GetServerSidePropsContext } from "next";
import { getPost } from "../api/get-blog";
import BlogPage from "src/main-pages/BlogPage/BlogPage";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { slug } = ctx.query;
    const post = await getPost(`${slug}`);
    return {
      props: {
        blogData: JSON.parse(JSON.stringify(post)),
      },
    };
  } catch (err) {
    ctx.res.end();
    return { props: {} as never };
  }
};
const Blog = ({ blogData }) => {
  return <BlogPage blogData={blogData} />;
};
export default Blog;
