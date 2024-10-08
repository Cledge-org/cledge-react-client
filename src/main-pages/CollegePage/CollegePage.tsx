/* eslint-disable react/jsx-key */
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
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

const axios = require("axios").default;

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

const College = ({
  collegeList,
  questionResponses,
}: {
  questionResponses: UserResponse[];
  collegeList: any;
}) => {
  const [collegeData, setData] = useState([]);
  const [hasMoreData, setHasMore] = useState(true);
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currSort, setCurrSort] = useState("Default");
  let collegeListArray = [];
  const [currNumericalSortOrder, setCurrNumericalSortOrder] =
    useState("Least-Greatest");
  const userResponse = questionResponses.find(
    ({ questionId }) => questionId == "627e8fe7e97c3c14537dc7f5"
  )?.response;

  const [requestData, setRequest] = useState({
    searchText: "*",
    top: 10,
    skip: 0,
    filters: {},
    searchFields: ["INSTNM"],
    userTier: userResponse.includes("Level 1")
      ? 1
      : userResponse.includes("Level 2")
      ? 2
      : 3,
  });
  const [prevRequest, setPrevRequest] = useState({
    searchText: "*",
    top: 10,
    skip: 0,
    filters: {},
    searchFields: ["INSTNM"],
    userTier: userResponse.includes("Level 1")
      ? 1
      : userResponse.includes("Level 2")
      ? 2
      : 3,
  });

  function handleSearch(e) {
    e.preventDefault();
    e.stopPropagation();
    setPrevRequest(requestData);

    setRequest({
      ...requestData,
      searchText: e.target.searchText.value ? e.target.searchText.value : "*",
      top: 12,
      skip: 0,
    });
  }

  function getData() {
    let data = axios({
      method: "post",
      url: "api/CST/college-search-tool",
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

  for (let i = 0; i < collegeList.length; i++) {
    collegeListArray[i] = collegeList[i]?.college_name;
  }

  useEffect(() => {
    setPrevRequest(requestData);
    setRequest({ ...requestData, filters: filter, skip: 0, top: 12 });
  }, [filter]);

  useEffect(() => {
    async function fetchData() {
      let data = await getData();
      // if no data, hasmore state to false
      if (!data || !data.length) {
        setHasMore(false);
        return;
      }
      setHasMore(true);
      if (requestData.skip - prevRequest.skip > 0) {
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
        return;
      }
      // TODO: there's a bug that causes the initial data fetch call to re-sort the data with the default sort even after the user has selected a different sort, this only happens at the initial page load if the user changes the sort before data loads
      setData(sortBy(currSort, currNumericalSortOrder, data));
      setIsLoading(false);
    }
    fetchData();
  }, [requestData]);

  useEffect(() => {
    if (isLoading) return;
    setData(sortBy(currSort, currNumericalSortOrder));
  }, [currSort, currNumericalSortOrder, isLoading]);

  const sortBy = (
    sortType: string,
    numericalSortOrder: string,
    data: any[] = []
  ) => {
    const parseInstSize = (inst_size: string) => {
      if (!inst_size) return 0;
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
    const copiedData = data && data.length ? [...data] : [...collegeData];
    const isLeastGreatest = numericalSortOrder === "Least-Greatest";
    const sortFunctions = {
      "A-Z": (a: any, b: any) =>
        isLeastGreatest
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
      Size: (a: any, b: any) =>
        isLeastGreatest
          ? parseInstSize(a.inst_size) - parseInstSize(b.inst_size)
          : parseInstSize(b.inst_size) - parseInstSize(a.inst_size),
      Tuition: (a: any, b: any) =>
        isLeastGreatest
          ? a.tuition_and_fee - b.tuition_and_fee
          : b.tuition_and_fee - a.tuition_and_fee,
      "Student-Faculty Ratio": (a: any, b: any) =>
        isLeastGreatest
          ? a.student_faculty_ratio - b.student_faculty_ratio
          : b.student_faculty_ratio - a.student_faculty_ratio,
      "Acceptance Rate": (a: any, b: any) =>
        isLeastGreatest
          ? a.acceptance_rate - b.acceptance_rate
          : b.acceptance_rate - a.acceptance_rate,
      Default: (a: any, b: any) => 0,
    };
    if (sortType && sortType in sortFunctions) {
      copiedData.sort(sortFunctions[sortType]);
    }
    return copiedData;
  };

  return (
    <Layout>
      <Row>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
          <SideBar setFilter={setFilter} />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={20}
          lg={20}
          xl={20}
          xxl={20}
          id="college-scroll"
          style={{
            overflow: "scroll",
            height: "calc(100vh - 59px)",
          }}
          className="d-flex flex-column align-items-center"
        >
          <InfiniteScroll
            scrollableTarget="college-scroll"
            className="w-100 h-100 d-flex flex-column align-items-center"
            style={{ maxHeight: "100%" }}
            next={() => {
              setPrevRequest(requestData);
              setRequest({
                ...requestData,
                top: collegeData.length + requestData.top,
                skip: collegeData.length,
              });
            }}
            hasMore={hasMoreData}
            loader={
              <div className="w-100 d-flex flex-row align-items-center justify-content-evenly flex-wrap">
                {new Array(
                  collegeData ? collegeData.length + requestData.top : 0
                )
                  .fill(0)
                  .map(() => {
                    return (
                      <CollegeCard
                        isLoading
                        schoolFit=""
                        title={""}
                        location={""}
                        img={""}
                        schoolType={""}
                        inState={""}
                        outState={""}
                        college_id={""}
                        abbreviation={""}
                        onList={false}
                      />
                    );
                  })}
              </div>
            }
            dataLength={collegeData ? collegeData.length : 0}
          >
            <Row
              className="searchWrapper justify-content-between align-items-end"
              style={{ width: "92.5%", marginBottom: "20px" }}
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
                  name="searchText"
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
                    "Acceptance Rate",
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
            <div className="d-flex flex-row align-items-center justify-content-evenly flex-wrap w-100">
              {isLoading ? (
                new Array(12).fill(0).map(() => {
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
                      schoolFit=""
                      college_id=""
                      onList={false}
                    />
                  );
                })
              ) : collegeData && collegeData.length > 0 ? (
                collegeData.map((data) => {
                  return (
                    <CollegeCard
                      key={data.title + data.location}
                      college_id={data.college_id}
                      title={data.title}
                      location={data.location}
                      schoolFit={
                        requestData.userTier >=
                        data["college_fit_metric"]?.safety
                          ? "Safety School"
                          : requestData.userTier <
                            data["college_fit_metric"]?.target
                          ? "Reach School"
                          : "Fit School"
                      }
                      // TODO: what if college fit metric does not exist
                      img={
                        data["img_link"]
                          ? data["img_link"]
                          : data["img_wiki_link"]
                      }
                      schoolType={data["college_type"]}
                      inState={data["in-state_tuition"]}
                      outState={data["out-state_tuition"]}
                      abbreviation={data["abbreviation"]}
                      onList={collegeListArray.includes(data["title"])}
                    />
                  );
                })
              ) : (
                <div className="w-100" />
              )}
            </div>
          </InfiniteScroll>
        </Col>
      </Row>
    </Layout>
  );
};

export default connect((state) => {
  return {
    questionResponses: state.questionResponses,
  };
})(College);
