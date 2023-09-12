import { StyledContainer, StyledContainerProps } from "./styles";

const Container = (props: ContainerProps & StyledContainerProps) => (
  <StyledContainer {...props} >{props.children}</StyledContainer>
);

export default Container;
