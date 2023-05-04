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
  video,
  id,
}: ContentBlockProps) => {
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
        justify={id === "intro"|| id ==="CST"? "space-around" : "space-between"}
        align="middle"
        id={id}
        style={
          id === "intro" || id ==="CST"
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
            className={id === "intro" || id === "CST" ? "" :  "container-margin"}
            style={id === "intro" ? { margin: "0" } : id === "CST" ? {margin: "0"} : {}}
          >
            <h6 style={{color:"white"}}>{title}</h6>
            <Content style={{color:"white"}}>{content}</Content>
            <ButtonWrapper>
                <Button
                  key="subscribe-btn"
                  color="#F7BC76"
                  fixedWidth={true}
                  className={"w-50 mb-3"}
                  onClick={() => {
                    window.open("https://cledge.org/college", "_blank");
                  }}
                >
                  Try Now!
                </Button>

                {/* *************************************************************** */}
                {/* This is the code for the double buttons from the original intro */}
                {/* *************************************************************** */}

                    {/* {typeof button === "object" &&
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
                    })} */}
                {/* *************************************************************** */}
                {/* This is the code for the double buttons from the original intro */}
                {/* *************************************************************** */}
                
            </ButtonWrapper>
          </ContentWrapper>
        </Col>
        <Col lg={11} md={11} sm={11} xs={24}>
          {id === "intro" || id === "CST"? (
            <VideoWrapper id="videoWrapper">{video}</VideoWrapper>
          ) : (
            <SvgIcon src={icon} width="100%" height="100%" />
          )}
        </Col>
      </Row>
    </RightBlockContainer>
  );
};

export default RightBlock;
