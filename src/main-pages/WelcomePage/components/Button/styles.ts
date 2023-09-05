import styled from "styled-components";

export const StyledButton = styled("button") <any>`
  background: ${(p) => p.color || "#2e186a"};
  color: ${(p) => (p.color ? "#2E186A" : "#fff")};
  max-width: ${(p) => (p.fixedWidth ? "max-content" : "initial")};
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  padding: 13px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);

  &:hover,
  &:active,
  &:focus {
    color: #fff;
    background-color: rgb(255, 130, 92);
  }
`;
