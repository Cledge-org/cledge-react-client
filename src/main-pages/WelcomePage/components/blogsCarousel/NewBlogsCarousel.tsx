import { breakpoints } from '@mui/system'
import React from 'react'
import Carousel from '@itseasy21/react-elastic-carousel'
import BlogCarouselItem from 'src/main-pages/WelcomePage/components/blogsCarousel/components/BlogCaroselItem'
import styles from './styles.module.scss'
import styled from 'styled-components'
import { Button, createTheme,Fab,ThemeProvider } from '@mui/material'
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

const Arrow = styled.div`
right: 23px;
position: absolute;
display: flex;
align-self: center;
justify-self: flex-end;
`

const MainContainer = styled.div`
.mainContainer {
    padding: 50px;
    margin-top: 100px;
    margin-bottom: 100px;
    background: #f9faff;
    h1 {
        font-style: normal;
        font-weight: 800;
        font-size: 36px;
        line-height: 43px;
        color: #070452;
    }
}
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
      <div style={{display:"flex", flexDirection:"row"}}>

      <CarouselDiv id='carouselDiv'>

        {
          recentBlogsData.map((e) =>
          <BlogCarouselItem article={e} />
          )}
     <Arrow>
      <Fab color='inherit' onClick={()=>{
        document.getElementById('carouselDiv').scrollBy({left:300,behavior:"smooth"})
      }} size="large">
<Image src={ArrowIcon}/>
      </Fab>
      </Arrow> 
      </CarouselDiv>
    
          </div>

      <Button variant="contained" color='primary'>
        View more blogs
      </Button>
    </div>
          </ThemeProvider>
  )
}

export default NewBlogsCarousel