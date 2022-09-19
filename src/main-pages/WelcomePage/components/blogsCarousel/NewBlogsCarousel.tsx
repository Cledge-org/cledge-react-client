import React from 'react'
import BlogCarouselItem from 'src/main-pages/WelcomePage/components/blogsCarousel/components/BlogCaroselItem'
import styles from './styles.module.scss'
import styled from 'styled-components'
import { Button, createTheme, Fab, ThemeProvider } from '@mui/material'
import ArrowIcon from './Arrow.png'
import Image from 'next/image'
const CarouselDiv = styled.div`
background-color: #f9faff;
margin-bottom: 50px;
width: 100%;
display: flex;
flex-direction: row;
overflow-x: scroll;
-ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
::-webkit-scrollbar{
  display: none; 
  }
  margin-top: 40px;
`

const RightArrow = styled.div`
right: 23px;
position: absolute;
display: flex;
align-self: center;
justify-self: flex-end;
@media screen and (max-width: 700px) {
  display: none;
}
`

const LeftArrow = styled.div`
left: 23px;
position: absolute;
display: flex;
align-self: center;
justify-self: flex-end;
transform: rotate(180deg);
@media screen and (max-width: 700px) {
  display: none;
}
`

function NewBlogsCarousel({ recentBlogs }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#506BED"
      },
      secondary: {
        main: "#FAFAFA"
      }
    }
  })
  const recentBlogsData = recentBlogs.articles[0]
  return (
    <ThemeProvider theme={theme}>

      <div className={styles.mainContainer}>
        <h1>Get started with our free expert-written blogs</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>

          <CarouselDiv id='carouselDiv'>

            <LeftArrow>
              <Fab color='secondary' onClick={() => {
                document.getElementById('carouselDiv').scrollBy({ left: -400, behavior: "smooth" })
              }} size="large" >
                <Image src={ArrowIcon} />
              </Fab>
            </LeftArrow>

            {
              recentBlogsData.map((e) =>
                <BlogCarouselItem article={e} />
              )}
            <RightArrow>
              <Fab color='secondary' onClick={() => {
                document.getElementById('carouselDiv').scrollBy({ left: 400, behavior: "smooth" })
              }} size="large" >
                <Image src={ArrowIcon} />
              </Fab>
            </RightArrow>
          </CarouselDiv>

        </div>

        <Button variant="contained" color='primary' style={{ textTransform: "none" }}>
          View more blogs
        </Button>
      </div>
    </ThemeProvider>
  )
}

export default NewBlogsCarousel