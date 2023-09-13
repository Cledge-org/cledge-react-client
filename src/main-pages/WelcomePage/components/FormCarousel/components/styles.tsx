import styled from "styled-components";

interface MainContainerProps {
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  gap?: string;
  alignItems?: "center" | "start" | "end" | "flex-start" | "flex-end";
  justifyContent?: "center" | "start" | "end" | "flex-start" | "flex-end";
}

export const MainContainer = styled.div<MainContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  padding: 20px 30px;
  gap: ${(props) => props.gap || "70px"};
  justify-content: ${(props) => props.justifyContent || "space-between"};
  align-items: ${props => props.alignItems || "center"};
  :hover {
    cursor: pointer;
  }
  box-shadow: 0px 2px 22px 9px rgba(0, 0, 0, 0.03);
  border-radius: 8px;

  @media screen and (max-width: 810px) {
    gap: ${(props) => props.gap || "20px"};
  }
`;

export const Heading = styled.h1`
line-height: 1.4 !important;
font-weight: bold !important;
color: white;
`;