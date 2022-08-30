import { breakpoints } from '@mui/system'
import React from 'react'
import Carousel from '@itseasy21/react-elastic-carousel'
import BlogCarouselItem from 'src/main-pages/WelcomePage/components/blogsCarousel/components/BlogCaroselItem'
import styles from './styles.module.scss'
import styled from 'styled-components'
import { Button, createTheme,ThemeProvider } from '@mui/material'

const CarouselDiv = styled.div`
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

const Arrow = styled.div`
align-self: flex-start;
width: 100px;
height: 100px;
background-color: aqua;
`

function NewBlogsCarousel({ recentBlogs }) {
  const theme = createTheme({
    palette: {
      primary: { 
        main: "#506BED" 
      }
    }
  })
  const recentBlogsData = recentBlogs.articles[0]

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 3 }
  ];
  return (
    <ThemeProvider theme={theme}>

    <div className={styles.mainContainer}>
      <h1>Get started with our free expert-written blogs</h1>
      {/* <div style={{ display: "flex", flexDirection: "row" }}>
      <Carousel breakPoints={breakPoints} isRTL={false} enableAutoPlay={true} showArrows={false} enableMouseSwipe={true} enableTilt={true} enableSwipe={true}>
      {
           recentBlogsData.map((e) =>
           <BlogCarouselItem image={e.image} title={e.title} />
           )}
           <BlogCarouselItem image={"test bro"} title={"you need to go to college!!"} />
           <BlogCarouselItem image={"test bro"} title={"you need to go to college!!"} />
           <BlogCarouselItem image={"test bro"} title={"you need to go to college!!"} />
           <BlogCarouselItem image={"test bro"} title={"you need to go to college!!"} />
           <BlogCarouselItem image={"test bro"} title={"you need to go to college!!"} />

           </Carousel>
      </div> */}
      <CarouselDiv>

        {
          recentBlogsData.map((e) =>
            <BlogCarouselItem article={e} />
          )}
      
      </CarouselDiv>

      <Button variant="contained" color='primary'>
        View more blogs
      </Button>

    </div>
          </ThemeProvider>
  )
}

export default NewBlogsCarousel