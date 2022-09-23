import React from 'react'
import styled from 'styled-components'


const MainContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;
margin-right:32px;
gap: 10px;
min-width: 380px;
min-height: 183px;
max-width: 385px;
background: #FFFFFF;
@media screen and (max-width:450px) {
  min-width: 340px;
}
/* Card boarder */

border: 1px solid #DEDEFF;
/* Shadow large */

box-shadow: 0px 2px 22px 9px rgba(0, 0, 0, 0.03);
border-radius: 8px;

`
const TopicDisplay = styled.div`
background-color: #E0DFE8;
border-radius: 20px;
color: #000000;
text-decoration: #000000;
padding-top: 6px;
padding-bottom: 6px;
padding-right: 12px;
padding-left: 12px;
font-size: 16px;
`
const AuthorName = styled.span`
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */


/* Grey-purple */
color: #808099;

`
const ArticleTitle = styled.h3`
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 22px;
color: #000000;
`


function BlogCarouselItem({ article }) {
  return (

    <MainContainer>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ArticleTitle>
          {article.title}
        </ArticleTitle>
        <img src={article.image} width={84} height={84} style={{borderRadius:"5px"}} />
      </div>
      <AuthorName>
        {article.author} - {article.date}
      </AuthorName>
      {
        article.topics.map((topic) => <p><TopicDisplay>{topic}</TopicDisplay></p>)
      }
    </MainContainer>
  )
}

export default BlogCarouselItem