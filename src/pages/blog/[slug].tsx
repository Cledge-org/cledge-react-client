import Head from 'next/head'
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
const Blog = ({ blogData }) => {``
  return (
    <>
      <Head>
        <title>{blogData.title}</title>
        <meta name="description" content={blogData.description}/>
        <meta property="og:description" content={blogData.description} />
        <meta property="og:title" content={blogData.title} />
        <meta property="author" content={blogData.author} />
        <meta property="og:image" content={blogData.image} />
        <meta property="keywords" content={blogData.keywords} />
      </Head>
      <BlogPage blogData={blogData} />
    </>
  );
};
export default Blog;
