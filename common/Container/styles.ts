import styled from "styled-components";

export const StyledContainer = styled("div")<any>`
  position: relative;
  width: 100%;
  padding: 0 90px;
  border-top: ${(p) => (p.border ? "1px solid #CDD1D4" : "")};

  @media only screen and (max-width: 1024px) {
    padding: 0 60px;
  }

  @media only screen and (max-width: 768px) {
    padding: 0 18px;
  }

  @media only screen and (max-width: 414px) {
    padding: 0 18px;
  }
`;
