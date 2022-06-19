import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getPost } from "../api/get-blog";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import BlogLayout from '../../../src/common/components/Blog/BlogLayout';
import ReactMarkdown from "react-markdown";
import rw from "rehype-raw";

//profile progress/ question summary page

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
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

export default function PostPage({ blogData }) {
  //<div dangerouslySetInnerHTML={{ __html: blogData.content }} />
  return (
    <BlogLayout>
      <div>
        <div className='mb-5'>
          <h1>{blogData.title}</h1>
          <p className='text-muted'>{blogData.author} - {blogData.date}</p>
        </div>
        <ReactMarkdown children={blogData.content} rehypePlugins={[rw]} />
      </div>
    </BlogLayout>
  );
}
