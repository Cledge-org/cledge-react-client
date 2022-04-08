import { Row, Col } from "antd";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import { ContentBlockProps } from "../types";
import { Fade } from "react-awesome-reveal";
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
  video,
  id,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <RightBlockContainer>
      <Fade direction="right">
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper id={id} className="container-margin">
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
              <SvgIcon src={icon} width="100%" height="100%" />
            )}
          </Col>
        </Row>
      </Fade>
    </RightBlockContainer>
  );
};

export default RightBlock;
