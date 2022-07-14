import React from "react";
import { Row, Col, Divider } from "antd";

function DataRow(props) {
    return props.type === "content" ? (
        <Row gutter={[16, 16]}>
            {props.colNum === 3 ? (
                <>
                    <Col span={14}>
                        <p className="cl-dark-text">{props.sub1}</p>
                    </Col>
                    <Col span={5}>
                        <h3 className="cl-dark-text">{props.sub2}</h3>
                    </Col>
                    <Col span={5}>
                        <h3 className="cl-dark-text">{props.sub3}</h3>
                    </Col>
                </>
            ) : (
                <>
                    <Col span={9}>
                        <p className="cl-dark-text">{props.sub1}</p>
                    </Col>
                    <Col span={5}>
                        <h3 className="cl-dark-text">{props.sub2}</h3>
                    </Col>
                    <Col span={5}>
                        <h3 className="cl-dark-text">{props.sub3}</h3>
                    </Col>
                    <Col span={5}>
                        <h3 className="cl-dark-text">{props.sub4}</h3>
                    </Col>
                </>
            )}
        </Row>
    ) : (
        <Row gutter={[16, 16]}>
            {props.colNum === 3 ? (
                <>
                    <Col span={14}>
                        <h2>{props.sub1}</h2>
                    </Col>
                    <Col span={5}>
                        <h2>{props.sub2}</h2>
                    </Col>
                    <Col span={5}>
                        <h2>{props.sub3}</h2>
                    </Col>
                </>
            ) : (
                <>
                    <Col span={9}>
                        <h2>{props.sub1}</h2>
                    </Col>
                    <Col span={5}>
                        <h2>{props.sub2}</h2>
                    </Col>
                    <Col span={5}>
                        <h2>{props.sub3}</h2>
                    </Col>
                    <Col span={5}>
                        <h2>{props.sub4}</h2>
                    </Col>
                </>
            )}
        </Row>
    );
}

export default DataRow;
