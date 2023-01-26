import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import { Button } from "../../../Button/Button";
import { SvgIcon } from "../../../SvgIcon/SvgIcon";
import { UWContentBlockProps } from "./types";
import {
  VideoWrapper,
  RightBlockContainer,
  Content,
  ContentWrapper,
  ButtonWrapper,
  IconWrapper,
} from "./styles";

const UWRightContentBlock = ({
  title,
  content,
  button,
  icon,
  video,
  id,
}: UWContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  const windowSize = useWindowSize();
  return (
    <RightBlockContainer style={{ maxWidth: "none" }}>
      <Row
        justify={id === "intro" ? "space-around" : "space-between"}
        align="middle"
        id={id}
        style={
          id === "intro"
            ? {
                paddingLeft: `${(windowSize.width - 1920) / 2}px`,
                paddingRight: `${(windowSize.width - 1920) / 2}px`,
              }
            : {}
        }
      >
        <Col lg={11} md={11} sm={11} xs={24}>
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
                        if (id === 1) {
                          scrollTo("about");
                        }
                      }}
                    >
                      {item.title}
                    </Button>
                  );
                })}
            </ButtonWrapper>
          </ContentWrapper>
        </Col>
        <Col lg={11} md={11} sm={11} xs={24}>
          {id === "intro" ? (
            <VideoWrapper id="videoWrapper">{video}</VideoWrapper>
          ) : (
            <img src={icon} width="100%" height="100%" />
          )}
        </Col>
      </Row>
    </RightBlockContainer>
  );
};

export default UWRightContentBlock;
