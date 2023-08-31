import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 60px;
  gap: 70px;
  justify-content: space-between;
  align-items: center;
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
  `;