import { Row, Col } from "antd";
import { ContentBlockProps } from "../../types";
import { Fade } from "react-awesome-reveal";
import {
  LeftContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
} from "./styles";
import { SvgIcon } from "../../../SvgIcon/SvgIcon";

const LeftContentBlock = ({
  icon,
  title,
  content,
  section,
  id,
  isMobile,
}: ContentBlockProps) => {
  return (
    <LeftContentSection>
      <Row justify="space-between" align="top" id={id}>
        {!isMobile && (
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
        )}
        <Col lg={11} md={11} sm={11} xs={24}>
          <ContentWrapper className="container-margin">
            <h6>{title}</h6>
            <Content>{content}</Content>
            <ServiceWrapper>
              {typeof section === "object" &&
                section.map((item: any, id: number) => {
                  return (
                    <Col key={id} span={11}>
                      <SvgIcon src={item.icon} width="50px" height="50px" />
                      <MinTitle>{item.title}</MinTitle>
                      <MinPara>{item.content}</MinPara>
                    </Col>
                  );
                })}
            </ServiceWrapper>
          </ContentWrapper>
        </Col>
        {isMobile && (
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
        )}
      </Row>
    </LeftContentSection>
  );
};

export default LeftContentBlock;
