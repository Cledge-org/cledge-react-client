import { StyledButton } from "./styles";

interface Props {
  color?: string;
  fixedWidth?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

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
