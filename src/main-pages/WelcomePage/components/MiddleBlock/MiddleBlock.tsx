import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
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
  const schools = [
    { name: "Harvard", image: "HV.png" },
    { name: "MIT", image: "MIT.png" },
    { name: "Stanford", image: "ST.png" },
    { name: "University of Michigan", image: "UM.png" },
    { name: "University of Washington", image: "UW.png" },
    { name: "Georgia Tech", image: "GT.png" },
  ];
  return (
    <MiddleBlockSection id={id}>
        <Row justify="center" align="middle">
          <ContentWrapper className="container-margin">
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{title}</h6>
              {id !== "partner" && <p dangerouslySetInnerHTML={{ __html: content.replace('\n', '<br /> <br />') }} />}
            </Col>
          </ContentWrapper>
        </Row>
          {id === "goal" ? (
      
              <CardWrapper>
                {schools.map((school, index) => (
                  <Card key={index}>
                    <img
                      src={"./images/school_icon/" + school.image}
                      alt={school.name}
                    ></img>
                  </Card>
                ))}
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
                  }}
                >
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
                  }}
                >
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

    </MiddleBlockSection>
  );
};

export default MiddleBlock;
