import React from 'react'
import styled from "styled-components";

function InfoContainer(props) {
  return (
    <StyledDiv>{props.children}</StyledDiv>
  )
}

const StyledDiv = styled.div`
  box-shadow: 0px 0px 22px 9px rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  padding: 24px;
  margin-top: 3rem;

  & h1 {
    font-size: 24px;
    font-weight: bold;
    color: #070452;
    margin-bottom: 1.5rem;
  }

  & h2 {
    font-size: 12px;
    color: #636366;
  }

  & h3 {
    font-size: 1.1rem;
    font-weight: 800;
    color: #070452;
  }

  & h4 {
    font-size: 28px;
    font-weight: bold;
    color: #070452;
  }
`;

export default InfoContainer