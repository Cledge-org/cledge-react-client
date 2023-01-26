import React from "react";
import BlogCarouselItem from "src/main-pages/WelcomePage/components/blogsCarousel/components/BlogCaroselItem";
import styles from "./styles.module.scss";
import styled from "styled-components";
import { Button, createTheme, Fab, ThemeProvider } from "@mui/material";
import ArrowIcon from "./Arrow.png";
import Image from "next/image";
const CarouselDiv = styled.div`
  background-color: #f9faff;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-top: 40px;
`;

const RightArrow = styled.div`
  display: flex;
  align-self: center;
  justify-self: flex-end;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const LeftArrow = styled.div`
  display: flex;
  align-self: center;
  justify-self: flex-end;
  transform: rotate(180deg);
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

function NewBlogsCarousel({ recentBlogs }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#506BED",
      },
      secondary: {
        main: "#FAFAFA",
      },
    },
  });
  const recentBlogsData = recentBlogs.articles[0];
  return (
    <ThemeProvider theme={theme}>
      <div className="">
        <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>Get started with our free expert-written blogs</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <LeftArrow>
            <Fab
              className="ms-3"
              style={{ boxShadow: "none", backgroundColor: "white" }}
              color="secondary"
              onClick={() => {
                document
                  .getElementById("carouselDiv")
                  .scrollBy({ left: -400, behavior: "smooth" });
              }}
              size="large"
            >
              <Image src={ArrowIcon} />
            </Fab>
          </LeftArrow>
          <CarouselDiv id="carouselDiv">
            {recentBlogsData.map((e) => (
              <BlogCarouselItem article={e} />
            ))}
          </CarouselDiv>
          <RightArrow>
            <Fab
              className="ms-3"
              style={{ boxShadow: "none", backgroundColor: "white" }}
              color="secondary"
              onClick={() => {
                document
                  .getElementById("carouselDiv")
                  .scrollBy({ left: 400, behavior: "smooth" });
              }}
              size="large"
            >
              <Image src={ArrowIcon} />
            </Fab>
          </RightArrow>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ textTransform: "none" }}
        >
          View more blogs
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default NewBlogsCarousel;
