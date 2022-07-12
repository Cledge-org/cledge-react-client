import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Row, Col, Input } from "antd";
import SideBar from "./components/SideBar";
import CollegeCard from "./components/CollegeCard/CollegeCard";
import DropDownQuestion from "../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
  const [searchText, setSearchText] = useState("*");
  const [isLoading, setIsLoading] = useState(true);
  const [requestData, setRequest] = useState({
    searchText: "*",
    top: 10,
    skip: 0,
    filters: {},
    searchFields: ["INSTNM"],
  });
  const [prevRequest, setPrevRequest] = useState({
    searchText: "*",
    top: 10,
    skip: 0,
    filters: {},
    searchFields: ["INSTNM"],
  });
  function handleSearch(e) {
    setPrevRequest(requestData);
    setRequest({
      ...requestData,
      searchText: e.target.value ? e.target.value : "*",
    });
  }

  function getData() {
    let data = axios({
      method: "post",
      url: "api/college-search-tool",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      data: JSON.stringify(requestData),
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
    setPrevRequest(requestData);
    setRequest({ ...requestData, filters: filter, skip: 0, top: 12 });
  }, [filter]);

  useEffect(() => {
    async function fetchData() {
      let data = await getData();
      if (requestData.skip - prevRequest.skip > 0) {
        console.log(requestData);
        setData((currData) => {
          return currData.concat(data);
        });
      } else {
        console.log(data);
        setData(data);
        setIsLoading(false);
      }
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
            overflowY: "scroll",
            height: "calc(100vh - 59px)",
          }}
        >
          <Row className="searchWrapper justify-content-evenly align-items-end">
            <div className="searchBox" style={{ width: "30%" }}>
              <Input
                placeholder="Search College"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onPressEnter={handleSearch}
                className="py-2"
                style={{ borderRadius: "10px", fontSize: "20px" }}
                suffix={
                  <button
                    onClick={() => {
                      setPrevRequest(requestData);
                      setRequest({
                        ...requestData,
                        searchText: searchText ? searchText : "*",
                      });
                    }}
                    className="w-100 h-100"
                    style={{
                      backgroundColor: "white",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                }
                // style={{ width: auto }}
              />
            </div>
            <div
              className="dropdown w-20 input d-flex flex-row align-items-center justify-content"
              style={{ width: "200px" }}
            >
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
            {isLoading
              ? new Array(10).fill(0).map(() => {
                  return (
                    <CollegeCard
                      isLoading
                      title={""}
                      location={""}
                      img={""}
                      schoolType={""}
                      inState={""}
                      outState={""}
                      abbreviation={""}
                      data={{}}
                    />
                  );
                })
              : collegeData &&
                collegeData.map((data) => {
                  return (
                    <CollegeCard
                      key={data.title + data.location}
                      title={data.title}
                      location={data.location}
                      img={
                        data["img_link"]
                          ? data["img_link"]
                          : data["img_wiki_link"]
                      }
                      schoolType={data["college_type"]}
                      inState={data["in-state_tuition"]}
                      outState={data["out-state_tuition"]}
                      abbreviation={"uw"}
                      data={data}
                    />
                  );
                })}
            <button
              className="cl-btn-blue"
              onClick={() => {
                setPrevRequest(requestData);
                setRequest({
                  ...requestData,
                  top: collegeData.length + requestData.top,
                  skip: collegeData.length,
                });
              }}
            >
              Load More
            </button>
          </CardsWrapper>
        </Col>
      </Row>
    </Layout>
  );
};

export default College;
