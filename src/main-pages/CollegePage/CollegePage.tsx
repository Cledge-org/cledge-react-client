import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Row, Col, Input } from "antd";
import SideBar from "./components/SideBar";
import CollegeCard from "./components/CollegeCard/CollegeCard";
import DropDownQuestion from "../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import styled from "styled-components";

const axios = require("axios").default;
const { Search } = Input;

const CardsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px auto;
    max-width: 1000px;

    & > div {
        margin: 20px;
    }

    & .MuiButtonBase-root {
        height: 100%;
    }
`;

const College = () => {
    const [collegeData, setData] = useState(null);
    const [filter, setFilter] = useState({});
    const [requestData, setRequest] = useState({
        searchText: "*",
        top: 10,
        skip: 0,
        filters: {},
        searchFields: ["INSTNM"],
    });

    function handleSearch(keyWord) {
        setRequest({ ...requestData, searchText: keyWord });
    }

    function getData() {
        let data = axios({
            method: "post",
            url: "api/college-search-tool",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
            data: JSON.stringify({
                searchText: "*",
                top: 10,
                skip: 0,
                filters: filter,
                searchFields: ["INSTNM"],
            }),
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        return data;
    }

    useEffect(() => {
        setRequest({ ...requestData, filters: filter });
    }, [filter]);

    useEffect(() => {
        async function fetchData() {
            let data = await getData();
            setData(data);
        }
        fetchData();
    }, [requestData]);

    return (
        <Layout>
            <Row>
                <Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
                    <SideBar setFilter={setFilter} />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    md={18}
                    lg={18}
                    xl={19}
                    xxl={20}
                    style={{
                        overflow: "scroll",
                        height: "calc(100vh - 59px)",
                    }}>
                    <Row className="searchWrapper justify-content-evenly align-items-end">
                        <div className="searchBox" style={{ width: "30%" }}>
                            <Search
                                placeholder="Search College"
                                onSearch={handleSearch}
                                // style={{ width: auto }}
                            />
                        </div>
                        <div
                            className="dropdown w-20 input d-flex flex-row align-items-center justify-content"
                            style={{ width: "200px" }}>
                            <DropDownQuestion
                                isForCST
                                placeholder="Sort by..."
                                valuesList={[
                                    "A-Z",
                                    "QS Ranking",
                                    "Size",
                                    "Tuition",
                                    "Student-Faculty Ratio",
                                    "Acceptence Rate",
                                    "US News Ranking",
                                    "My Match",
                                ]}
                            />
                        </div>
                    </Row>
                    <CardsWrapper>
                        {collegeData &&
                            collegeData.map((data) => {
                                return (
                                    <CollegeCard
                                        title={data.title}
                                        location={data.location}
                                        img="uw.jpg"
                                        schoolType={data["college_type"]}
                                        inState={data["in-state_tuition"]}
                                        outState={data["out-state_tuition"]}
                                        abbreviation={"uw"}
                                        data={data}
                                    />
                                );
                            })}
                    </CardsWrapper>
                </Col>
            </Row>
        </Layout>
    );
};

export default College;
