import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Row, Col, Input } from "antd";
import SideBar from "./components/SideBar/SideBar";
import CollegeCard from "./components/CollegeCard/CollegeCard";
import DropDownQuestion from "../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./college-page.module.scss";
import classNames from "classnames";

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
  const [currSort, setCurrSort] = useState("");
  const [currNumericalSortOrder, setCurrNumericalSortOrder] =
    useState("Least-Greatest");
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
    e.preventDefault();
    e.stopPropagation();
    setPrevRequest(requestData);
    setRequest({
      ...requestData,
      searchText: searchText ? searchText : "*",
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
          if (currSort) {
            return sortBy(
              currSort,
              currNumericalSortOrder,
              currData.concat(data)
            );
          }
          return currData.concat(data);
        });
      } else {
        if (currSort) {
          setData(sortBy(currSort, currNumericalSortOrder, data));
        } else {
          console.log(data);
          setData(data);
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, [requestData]);

  useEffect(() => {
    if (currSort) {
      sortBy(currSort, currNumericalSortOrder);
    }
  }, [currSort, currNumericalSortOrder]);

  const sortBy = (sortType: string, numericalSortOrder: string, data?) => {
    const parseInstSize = (inst_size: string) => {
      const indexOfNum = inst_size.includes("Under")
        ? 1
        : inst_size.includes("above")
        ? 0
        : 2;
      if (inst_size.includes(",")) {
        const num = inst_size.split(" ")[indexOfNum];
        return parseInt(
          num.substring(0, num.indexOf(",")) +
            num.substring(num.indexOf(",") + 1)
        );
      }
      return parseInt(inst_size.split(" ")[indexOfNum]);
    };
    const copiedData = [...(data ? data : collegeData)];
    const isLeastGreatest = numericalSortOrder === "Least-Greatest";
    if (sortType === "A-Z") {
      copiedData.sort((a, b) =>
        isLeastGreatest
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    } else if (sortType === "Size") {
      copiedData.sort((a, b) =>
        isLeastGreatest
          ? parseInstSize(b.inst_size) - parseInstSize(a.inst_size)
          : parseInstSize(a.inst_size) - parseInstSize(b.inst_size)
      );
    } else if (sortType === "Tuition") {
      copiedData.sort((a, b) =>
        isLeastGreatest
          ? a.tuition_and_fee - b.tuition_and_fee
          : b.tuition_and_fee - a.tuition_and_fee
      );
    } else if (sortType === "Student-Faculty Ratio") {
      copiedData.sort((a, b) =>
        isLeastGreatest
          ? a.student_faculty_ratio - b.student_faculty_ratio
          : b.student_faculty_ratio - a.student_faculty_ratio
      );
    } else if (sortType === "Acceptance Rate") {
      copiedData.sort((a, b) =>
        isLeastGreatest
          ? a.acceptance_rate.acceptance_rate_total -
            b.acceptance_rate.acceptance_rate_total
          : b.acceptance_rate.acceptance_rate_total -
            a.acceptance_rate.acceptance_rate_total
      );
    }
    console.log(copiedData);
    if (data) {
      return copiedData;
    }
    setData(copiedData);
  };

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
          className="d-flex flex-column align-items-center"
        >
          <Row
            className="searchWrapper justify-content-between align-items-end"
            style={{ width: "91%" }}
          >
            <form
              id="search-form"
              onSubmit={handleSearch}
              className="searchBox d-flex flex-row align-items-center"
              style={{
                width: "30%",
                borderRadius: "10px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <input
                className={classNames(styles.searchInput, "py-3 px-3")}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                placeholder="Search College"
              />
              <button
                form="search-form"
                type="submit"
                style={{
                  height: "100%",
                  width: "10%",
                  backgroundColor: "white",
                  outline: "none",
                  border: "none",
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            <div
              className="dropdown w-20 input d-flex flex-row align-items-center justify-content-space-between"
              style={{ width: "420px" }}
            >
              <DropDownQuestion
                isForCST
                placeholder="Sort by..."
                onChange={(value) => {
                  setCurrSort(value);
                }}
                valuesList={[
                  "A-Z",
                  "Size",
                  "Tuition",
                  "Student-Faculty Ratio",
                  "Acceptence Rate",
                ]}
              />
              <div style={{ width: "20px" }} />
              <DropDownQuestion
                isForCST
                defaultValue={"Least-Greatest"}
                onChange={(value) => {
                  setCurrNumericalSortOrder(value);
                }}
                valuesList={["Least-Greatest", "Greatest-Least"]}
              />
            </div>
          </Row>
          <CardsWrapper
            className="d-flex flex-rown align-items-center flex-wrap"
            style={{ width: "100%", maxWidth: "100%" }}
          >
            {isLoading
              ? new Array(12).fill(0).map(() => {
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
          </CardsWrapper>
          <div className="w-100 center-child pb-3">
            <button
              className="cl-btn-blue align-self-center"
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
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default College;
