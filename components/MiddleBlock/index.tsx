import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import { Button } from "../common/Button";
import {
  MiddleBlockSection,
  Content,
  ContentWrapper,
  Card,
  CardWrapper,
  PartnerCard,
} from "./styles";

interface MiddleBlockProps {
  title: string;
  content: string;
  button?: string;
  id: string;
  width?: number;
}

const MiddleBlock = (props: MiddleBlockProps) => {
  console.log("hello" + props.width);
  if (props.width >= 576) {
    return (
      <Fade>
        <MiddleBlockContent {...props} />
      </Fade>
    );
  } else {
    return <MiddleBlockContent {...props} />;
  }
};

const MiddleBlockContent = ({
  title,
  content,
  button,
  id,
}: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <MiddleBlockSection id={id}>
<<<<<<< HEAD
        <div>
          <Row justify="center" align="middle">
            <ContentWrapper className="container-margin">
              <Col lg={24} md={24} sm={24} xs={24}>
                <h6>{title}</h6>
                {id === "partner" ? null : <p>{content}</p>}
              </Col>
            </ContentWrapper>
          </Row>
          <div>
            {id === "goal" ? (
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
            ) : (
              <CardWrapper>
                <PartnerCard>
                  <strong
                    className="cl-dark-text"
                    style={{ fontSize: "1.8em" }}>
                    Partnered with the best technologies
                  </strong>
                  <p
                    style={{
                      fontWeight: 600,
                      width: "85%",
                    }}>
                    With the support of Microsoft for Startups, we are excited to
                    empower every student with the latest technologies to drive
                    their college counseling experience.
                  </p>
                  <img
                    src="./images/landing_msft.svg"
                    alt="Microsoft"
                  />
                </PartnerCard>
                <PartnerCard>
                  <strong
                    className="cl-dark-text"
                    style={{ fontSize: "1.8em" }}>
                    Your data is secured
                  </strong>
                  <p
                    style={{
                      fontWeight: 600,
                      width: "85%",
                    }}>
                    Unlike other free platforms and services, your data is
                    protected and never sold to colleges or other third parties.
                    Period. We ensure your data is only used to help you.
                  </p>
                  <img
                    src="./images/azure-info-protect.png"
                    alt="Azure Information Protection"
                  />
                </PartnerCard>
              </CardWrapper>
            )}
          </div>
=======
      <div>
        <Row justify="center" align="middle">
          <ContentWrapper className="container-margin">
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{title}</h6>
              {id === "partner" ? null : <p>{content}</p>}
            </Col>
          </ContentWrapper>
        </Row>
        <div>
          {id === "goal" ? (
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
          ) : (
            <CardWrapper>
              <PartnerCard>
                <strong className="cl-dark-text" style={{ fontSize: "1.8em" }}>
                  Partnered with the best technologies
                </strong>
                <p
                  style={{
                    fontWeight: 600,
                    width: "85%",
                  }}>
                  With the support of Microsoft for Startups, we are excited to
                  empower every student with the latest technologies to drive
                  their college counseling experience.
                </p>
                <img src="./images/landing_msft.svg" alt="Microsoft" />
              </PartnerCard>
              <PartnerCard>
                <strong className="cl-dark-text" style={{ fontSize: "1.8em" }}>
                  Your data is secured
                </strong>
                <p
                  style={{
                    fontWeight: 600,
                    width: "85%",
                  }}>
                  Unlike other free platforms and services, your data is
                  protected and never sold to colleges or other third parties.
                  Period. We ensure your data is only used to help you.
                </p>
                <img
                  src="./images/azure-info-protect.png"
                  alt="Azure Information Protection"
                />
              </PartnerCard>
            </CardWrapper>
          )}
>>>>>>> landing-page-template
        </div>
      </div>
    </MiddleBlockSection>
  );
};

export default MiddleBlock;
