import React from "react";
import styled from "styled-components";

function InfoContainer(props) {
  const StyledDiv = styled.div`
    box-shadow: 0px 0px 22px 9px rgba(0, 0, 0, 0.03);
    border-radius: 12px;
    padding: 24px;
    margin-top: 2rem;
    margin-bottom: 1rem;
    border: 1px solid #e0dfe8;

    & > div {
      margin: 1rem 0;
    }

    & > div > h2 {
      margin: 0.5rem 0;
    }

    & > h1 {
      font-size: 20px;
      font-weight: bold;
      color: #070452;
      margin-bottom: 1rem;
    }

    & h2 {
      font-size: 12px;
      color: #636366;
    }

    & h3 {
      font-size: 17px;
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

  return <StyledDiv>{props.children}</StyledDiv>;
}

export default InfoContainer;
