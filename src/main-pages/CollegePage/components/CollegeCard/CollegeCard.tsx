import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import styled from "styled-components";

import { CardActionArea, Tab, Tabs } from "@mui/material";

interface CardProps {
    abbreviation?: string;
    title: string;
    location: string;
    img: string;
    schoolType: string;
    inState: string;
    outState: string;
    isDetail?: boolean;
    tabCallBack?: Function;
    tabValue?: number;
    data?: object;
}

function CollegeCard(props: CardProps) {
    const router = useRouter();
    const URL = `/collegeDetail/`;

    return (
        <CardWrapper>
            <Card
                sx={
                    props.isDetail
                        ? { maxWidth: 1000, maxHeight: 400 }
                        : { width: 420, height: 320 }
                }>
                {props.isDetail ? (
                    <div>
                        <InnerCard {...props} />
                        <Tabs
                            value={props.tabValue}
                            onChange={props.tabCallBack}>
                            <Tab label="Overview" />
                            <Tab label="Admission" />
                            <Tab label="Academics" />
                            <Tab label="Finance" />
                            <Tab label="Students" />
                            {/* <Tab label="Insights" /> */}
                        </Tabs>
                    </div>
                ) : (
                    <CardActionArea
                        onClick={() => {
                            console.log(props.data);
                            router.push(
                                {
                                    pathname: URL,
                                    query: { data: JSON.stringify(props.data) },
                                },
                                URL
                            );
                        }}>
                        <InnerCard {...props} />
                    </CardActionArea>
                )}
            </Card>
        </CardWrapper>
    );
}

export default CollegeCard;

function InnerCard({
    abbreviation,
    title,
    location,
    img,
    schoolType,
    inState,
    outState,
    isDetail,
}: CardProps) {
    return (
        <>
            <CardMedia
                component="img"
                height="200"
                image={`/images/${img}`}
                alt={title + " Image"}
            />
            <CardContent>
                <h1
                    className="cl-blue"
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        marginBottom: isDetail ? 10 : 5,
                    }}>
                    {title}
                </h1>
                {isDetail ? (
                    <>
                        <h6 className="text-secondary">
                            {schoolType == "Public"
                                ? "Public School"
                                : schoolType == "Private for-profit" ||
                                  "Private non-profit"
                                ? "Private School"
                                : ""}
                        </h6>
                    </>
                ) : (
                    <>
                        <h6 className="text-secondary">
                            {schoolType == "Public"
                                ? "Public School | "
                                : schoolType == "Private for-profit" ||
                                  "Private non-profit"
                                ? "Private School | "
                                : ""}
                            <span style={{ marginLeft: 5 }}>{location}</span>
                        </h6>
                    </>
                )}
            </CardContent>
        </>
    );
}

const CardWrapper = styled.div`
    & .MuiTabs-flexContainer {
        justify-content: space-evenly;
        & button {
            /* font-weight: 600; */
        }
    }

    & > div {
        margin: auto;
        box-shadow: 0px 0px 22px 9px rgba(0, 0, 0, 0.04);
        border-radius: 12px;
    }
`;
