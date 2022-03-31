import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  aligh-items: center;
  margin-top: 36px;
  width: 100%;
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
`;
export const PartnerCard = styled.div`
  width: 45vw;
  height: 40vh;
  background: #ffffff;
  box-shadow: 2px 8px 44px rgba(0, 11, 67, 0.06);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
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
  h6,
  p {
    text-align: center;
  }

  h6 {
    max-width: 690px;
    margin: auto;
    font-weight: 600;
    font-size: 36px;
  }

  p {
    margin-top: 36px;
    max-width: 920px;
  }

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;
