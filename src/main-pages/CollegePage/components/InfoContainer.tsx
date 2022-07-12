import React from 'react'
import styled from "styled-components";

function InfoContainer(props) {
  console.log(props.isOverview);
  const StyledDiv = styled.div`
      box-shadow: 0px 0px 22px 9px rgba(0, 0, 0, 0.03);
      border-radius: 12px;
      padding: 24px;
      margin-top: 2rem;
      margin-bottom: 1rem;

      & > div > h5 {
          margin-bottom: 0.9rem;
      }

      & h1 {
          font-size: ${props.isOverview ? "18px" : "24px"};
          font-weight: bold;
          color: #070452;
          margin-bottom: 1rem;
      }

      & h2 {
          font-size: 12px;
          color: #636366;
      }

      & h3 {
          font-size: 1rem;
          font-weight: 800;
          color: #070452;
      }

      & h4 {
          font-size: 28px;
          font-weight: bold;
          color: #070452;
      }

      & h5 {
          font-size: 16px;
          color: #070452;
          font-weight: 600;
      }
  `;

  return (
    <StyledDiv>{props.children}</StyledDiv>
  )
}



export default InfoContainer