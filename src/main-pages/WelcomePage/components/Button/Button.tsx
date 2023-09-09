import { StyledButton } from "./styles";

export const Button = ({
  color,
  fixedWidth,
  children,
  onClick,
  className,
}: ButtonProps) => (
  <StyledButton
    className={className}
    color={color}
    fixedWidth={fixedWidth}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);
