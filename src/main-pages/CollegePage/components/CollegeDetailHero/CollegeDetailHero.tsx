import React from "react";
import styled from "styled-components";
import { Tab, Tabs } from "@mui/material";

function CollegeDetailHero(props) {
    return (
        <Wrapper>
            <div className="content">
                <div>
                    <h1
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            marginBottom: 10,
                        }}>
                        {props.title}
                    </h1>
                    <div className="btn">Save to my list</div>
                </div>
                <h6 className="text-secondary">
                    {props.schoolType == "Public"
                        ? "Public School | "
                        : props.schoolType == "Private for-profit" ||
                          "Private non-profit"
                        ? "Private School | "
                        : ""}
                    <span style={{ marginLeft: 5 }}>{props.location}</span>
                </h6>
            </div>
            <Tabs value={props.tabValue} onChange={props.tabCallBack}>
                <Tab label="Overview" />
                <Tab label="Admission" />
                <Tab label="Academics" />
                <Tab label="Finance" />
                <Tab label="Students" />
                {/* <Tab label="Insights" /> */}
            </Tabs>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100vw;
    height: 200px;
    background-color: #fbfcff;
    display: flex;
    flex-direction: column;

    & > .content {
        width: 80%;
        max-width: 1000px;
        margin-top: 2rem;
    }

    & > .content > div {
        display: flex;
        justify-content: space-between;
    }

    & .MuiTabs-root {
        max-width: 1200px;
        width: 100vw;
    }

    & .MuiTabs-flexContainer {
        justify-content: space-evenly;
    }

    & .btn {
        color: #2651ED;
    }
`;

export default CollegeDetailHero;
