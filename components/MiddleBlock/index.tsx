import { Row, Col } from "antd";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import {
  MiddleBlockSection,
  Content,
  ContentWrapper,
  Card,
  CardWrapper,
} from "./styles";

interface MiddleBlockProps {
  title: string;
  content: string;
  button?: string;
  id: string;
}

const MiddleBlock = ({ title, content, button, id }: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <MiddleBlockSection>
      <Slide direction="up">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{title}</h6>
              <div>
                {id === "partner" && (
                  <div id="icon">
                    <img src="./images/landing_msft.svg" alt="Microsoft" />
                    <img src="./images/landing_openai.svg" alt="openAI" />
                  </div>
                )}
              </div>
              <p>{content}</p>
            </Col>
          </ContentWrapper>
        </Row>
        <div>
          {id === "goal" && (
            <CardWrapper>
              <Card>
                <img src="./images/school_icon/HV.png" alt="Havard"></img>
              </Card>
              <Card>
                <img src="./images/school_icon/MIT.png" alt="MIT"></img>
              </Card>
              <Card>
                <img src="./images/school_icon/ST.png" alt="Stanford"></img>
              </Card>
              <Card>
                <img
                  src="./images/school_icon/UM.png"
                  alt="University of Michigan"></img>
              </Card>
              <Card>
                <img
                  src="./images/school_icon/UW.png"
                  alt="University of Washington"></img>
              </Card>
              <Card>
                <img src="./images/school_icon/GT.png" alt="Georgia Tech"></img>
              </Card>
            </CardWrapper>
          )}
        </div>
      </Slide>
    </MiddleBlockSection>
  );
};

export default MiddleBlock;
