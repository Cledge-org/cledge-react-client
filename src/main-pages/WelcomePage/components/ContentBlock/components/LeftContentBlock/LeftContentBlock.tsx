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
}: ContentBlockProps) => {
  return (
    <LeftContentSection>
      <Row justify="space-between" align="middle" id={id}>
        <Col lg={11} md={11} sm={12} xs={24}>
          <SvgIcon src={icon} width="110%" height="110%" />
        </Col>
        <Col lg={11} md={11} sm={11} xs={24}>
          <ContentWrapper className="container-margin">
            <h6>{title}</h6>
            <Content>{content}</Content>
            <ServiceWrapper>
              
                {typeof section === "object" &&
                  section.map((item: any, id: number) => {
                    return (
                      <Col key={id} span={11}>
                        <SvgIcon src={item.icon} width="60px" height="60px" />
                        <MinTitle>{item.title}</MinTitle>
                        <MinPara>{item.content}</MinPara>
                      </Col>
                    );
                  })}
              
            </ServiceWrapper>
          </ContentWrapper>
        </Col>
      </Row>
    </LeftContentSection>
  );
};

export default LeftContentBlock;
