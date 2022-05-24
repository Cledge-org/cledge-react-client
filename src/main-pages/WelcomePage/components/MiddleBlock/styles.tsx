import styled from "styled-components";

export const CardWrapper = styled.div`
  margin-top: 36px;
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;

  @media screen and (min-width: 768px) {
    padding: 5.5rem 0;
  }
`;

export const Card = styled.div`
  width: 176px;
  height: 220px;
  background: #ffffff;
  box-shadow: 2px 8px 44px rgba(0, 11, 67, 0.06);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;
export const PartnerCard = styled.div`
  width: calc(100% - 36px);
  background: #ffffff;
  box-shadow: 2px 8px 44px rgba(0, 11, 67, 0.06);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem auto;
  padding: 1.5rem 1rem;
  & p {
    text-align: justify;
    font-size: 1rem;
  }

  & img {
    max-width: 90%;
    margin-top: 1rem;
    max-height: 64px;
  }

  & strong {
    margin: 2rem 0;
  }

  @media screen and (min-width: 1000px) {
    height: 40vh;
    min-height: 350px;
    width: 45vw;
    align-items: start;
    & p {
      text-align: left;
      font-size: 1.3rem;
    }
    & img {
      height: 20%;
      width: auto;
    }
    & strong {
      margin: 0;
    }
  }
`;
export const MiddleBlockSection = styled("section")`
  position: relative;
  padding: 7.5rem 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    padding: 5.5rem 0;
  }

  & > div {
    width: 100%;
  }

  #icon {
    margin-top: 30px;
  }

  #icon * {
    display: inline-block;
    height: 60px;
    margin-right: 30px;
  }
`;

export const Content = styled("p")`
  padding: 0.75rem 0 0.75rem;
`;

export const ContentWrapper = styled("div")`
  h6 {
    text-align: center;
    max-width: 690px;
    margin: auto;
    font-weight: 600;
    font-size: 36px;
  }

  p {
    text-align: justify;
    margin-top: 36px;
    max-width: 920px;
  }

  @media only screen and (max-width: 768px) {
    max-width: 100%;
    h6 {
      font-size: 30px;
    }
  }
`;
