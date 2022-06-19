import { GetServerSidePropsContext } from "next";
import { getAllPosts } from "./api/get-all-blogs";
import BlogPage from "../main-pages/BlogPage/BlogPage";

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

const Blogs = ({ blogInfo }) => {
  return <BlogPage blogInfo={blogInfo} />;
};

export default Blogs
