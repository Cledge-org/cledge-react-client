import styled from "styled-components";

export const VideoWrapper = styled("div")`

  max-width: 800px;
  margin-left: auto;
  aspect-ratio: 16 / 9;
  flex: 1;
  
  & > * {
    height: 100%;
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  right: -90px;

  @media only screen and (max-width: 1024px) {
    right: -60px;
  }

  @media only screen and (max-width: 768px) {
    right: -18px;
  }
`;

export const RightBlockContainer = styled("section")`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media only screen and (max-width: 768px) {
    padding: 4rem 0 0 0;
  }
`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;
  margin: auto;
  

  @media only screen and (max-width: 575px) {
    padding-bottom: ${(props) => (props.id ==="mission" ? "0" : "4rem")};
  }
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  max-width: 100%;
  button:first-child {
    flex: 2;
  }

  button:last-child {
    flex: 1;
  }
`;
