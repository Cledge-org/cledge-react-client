
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import WelcomePage from 'src/main-pages/WelcomePage/WelcomePage'

function welcome({ data }) {
    return (
    // <ThemeProvider theme={theme}>
        <WelcomePage data={data} />
    // </ThemeProvider>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    const recentBlogs = await fetch(`http://${ctx.req.headers.host}/api/get-recent-blogs`)
    const recentBlogsJson = await recentBlogs.json()


    return {
        props:
        {
            data: {
                recentBlogs: recentBlogsJson
            }
        }
    }
}

export default welcome