import styled from "styled-components";
import { SvgIcon } from "../../../common/SvgIcon";

export const VideoWrapper = styled("div")`

  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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
  padding: 10rem 0 8rem;
  width: 100%;

  @media only screen and (max-width: 1024px) {
    padding: 8rem 0 6rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 4rem 0 3rem;
  }
`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;

  @media only screen and (max-width: 575px) {
    padding-bottom: 4rem;
  }
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;

  @media screen and (min-width: 1024px) {
    max-width: 80%;
  }

  button:last-child {
    margin-left: 20px;
  }
`;
