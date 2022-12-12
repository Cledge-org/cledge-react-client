import React from "react";
import QuickAccessLinkBlock from "src/main-pages/DashboardPage/components/QuickAccessLinks/QuickAccessLinkBlock";
import styled from "styled-components";
import QALinksData from "./QALinksData.json";
import Arrow from "../../../WelcomePage/components/blogsCarousel/Arrow.png";
import { createTheme, Fab, ThemeProvider } from "@mui/material";
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

const MainContainer = styled.div`
  padding: 50px;
  margin-top: 100px;
  margin-bottom: 100px;
  background: #f9faff;
  padding-left: 112px;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 43px;
    color: #070452;
  }
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
function QuickAccessLinks() {
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
  return (
    <ThemeProvider theme={theme}>
      <div>
      <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>University of Washington quick access links</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <LeftArrow>
            <Fab
              className="ms-3"
              style={{ boxShadow: "none", backgroundColor: "white" }}
              color="secondary"
              onClick={() => {
                document
                  .getElementById("qalCarouselDiv")
                  .scrollBy({ left: -400, behavior: "smooth" });
              }}
              size="large"
            >
              <Image src={Arrow} />
            </Fab>
          </LeftArrow>
          <CarouselDiv
            id="qalCarouselDiv"
            style={{ backgroundColor: "transparent" }}
          >
            {QALinksData.QuickAccessLinks.map((e) => {
              return (
                <QuickAccessLinkBlock
                  title={e.title}
                  link={e.link}
                  content={e.content}
                />
              );
            })}
          </CarouselDiv>
          <RightArrow>
            <Fab
              className="ms-3"
              style={{ boxShadow: "none", backgroundColor: "white" }}
              color="secondary"
              onClick={() => {
                document
                  .getElementById("qalCarouselDiv")
                  .scrollBy({ left: 400, behavior: "smooth" });
              }}
              size="large"
            >
              <Image src={Arrow} />
            </Fab>
          </RightArrow>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default QuickAccessLinks;
