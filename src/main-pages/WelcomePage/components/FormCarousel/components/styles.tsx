import styled from "styled-components";

interface MainContainerProps {
  flexDirection?: "row" | "column";
  gap?: string;
  alignItems?: "center" | "start" | "end" | "flex-start" | "flex-end";
}

export const MainContainer = styled.div<MainContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  padding: 20px 30px;
  gap: ${(p) => p.gap || "70px"};
  justify-content: space-between;
  align-items: ${props => props.alignItems || "center"};
  /* Card boarder */
  /* Shadow large */
  :hover {
    cursor: pointer;
  }
  box-shadow: 0px 2px 22px 9px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
`;

export const Heading = styled.h1`
line-height: 1.4 !important;
font-weight: bold !important;
color: white;
`;