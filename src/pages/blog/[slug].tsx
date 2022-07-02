import { GetServerSidePropsContext } from "next";
import { getPost } from "../api/get-blog";
import BlogLayout from '../../../src/common/components/Blog/BlogLayout';
import ReactMarkdown from "react-markdown";
import rw from "rehype-raw";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { slug } = ctx.query;
    const post = await getPost(`${slug}`);
    return {
      props: {
        blogData: JSON.parse(
          JSON.stringify(
            post
          )
        ),
      },
    };
  } catch (err) {
    ctx.res.end();
    return { props: {} as never };
  }
};

export default function PostPage({ blogData }) {
  return (
    <BlogLayout>
      <div>
        <div className='container mb-4'>
          <h1>{blogData.title}</h1>
          <p className='text-muted'>{blogData.author} - {blogData.date}</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <ReactMarkdown children={blogData.content} rehypePlugins={[rw]} />
            </div>
            <div className="col-lg-4">
              
            </div>
          </div>
        </div>
        
      </div>
    </BlogLayout>
  );
}
