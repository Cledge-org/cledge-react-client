import styled from "styled-components";

export const StyledContainer = styled("div")<any>`
  position: relative;
  width: 100%;
  border-top: ${(p) => (p.border ? "1px solid #CDD1D4" : "")};

  a:hover {
    color: #18216d;
  }

  input,
  textarea,
  .ec-dropdown-btn {
    border-radius: 4px;
    border: 0;
    transition: all 0.3s ease-in-out;
    outline: none;
    width: 100%;
    padding: 1rem 1.25rem;

    :focus-within {
      box-shadow: #2e186a 0px 0px 0px 1px;
    }
  }

  h6 {
    color: #1a2169;
    font-size: 36px;
    line-height: 1.18;
    font-weight: 700;

    @media only screen and (max-width: 890px) {
      font-size: 32px;
    }

    @media only screen and (max-width: 414px) {
      font-size: 28px;
    }
  }

  p {
    color: #1a2169;
    font-size: 18px;
    line-height: 1.41;
  }

  h1 {
    font-weight: 600;
  }

  a {
    text-decoration: none;
    outline: none;
    color: #2e186a;

    :hover {
      color: #2e186a;
    }
  }

  *:focus {
    outline: none;
  }

  .about-block-image svg {
    text-align: center;
  }

  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-top: 1.5rem;
  }

  .ant-drawer-content-wrapper {
    width: 300px !important;
  }
`;
