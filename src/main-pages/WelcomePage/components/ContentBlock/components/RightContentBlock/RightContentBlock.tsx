import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import { Button } from "../../../Button/Button";
import { SvgIcon } from "../../../SvgIcon/SvgIcon";
import { ContentBlockProps } from "../../types";
import {
  VideoWrapper,
  RightBlockContainer,
  Content,
  ContentWrapper,
  ButtonWrapper,
  IconWrapper,
} from "./styles";

const RightBlock = ({
  title,
  content,
  button,
  icon,
  id,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  const windowSize = useWindowSize();
  const introStyles = id === "intro"
  ? {
      paddingLeft: `${(windowSize.width - 1920) / 2}px`,
      paddingRight: `${(windowSize.width - 1920) / 2}px`,
    }
  : {};
  return (
    <RightBlockContainer style={{ maxWidth: "none" }}>
      
        
          <ContentWrapper
            id={id}
            className={id === "intro" ? "" : "container-margin"}
            style={id === "intro" ? { margin: "0" } : {}}
          >
            <h6>{title}</h6>
            <Content>{content}</Content>
            <ButtonWrapper>
              {typeof button === "object" &&
                button.map((item: any, id: number) => {
                  return (
                    <Button
                      key={id}
                      color={item.color}
                      fixedWidth={true}
                      onClick={() => {
                        if (id === 0) {
                          window.open(
                            "https://forms.gle/M1GxLK45Yi3Esfn5A",
                            "_blank"
                          );
                        }
                      }}
                    >
                      {item.title}
                    </Button>
                  );
                })}
            </ButtonWrapper>
          </ContentWrapper>
    </RightBlockContainer>
  );
};

export default RightBlock;
