import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import styled from "styled-components";
import styles from "./college-card.module.scss";
import { CardActionArea, Tab, Tabs } from "@mui/material";
import classNames from "classnames";

interface CardProps {
  abbreviation?: string;
  title: string;
  location: string;
  img: string;
  schoolType: string;
  inState: string;
  isLoading?: boolean;
  outState: string;
  isDetail?: boolean;
  tabCallBack?: (e, newValue) => void;
  tabValue?: number;
  data?: object;
}

function CollegeCard(props: CardProps) {
  const router = useRouter();
  const URL = `/collegeDetail/`;

  return (
    <CardWrapper>
      {(props.isLoading && (
        <Card
          sx={
            props.isDetail
              ? { maxWidth: 1000, maxHeight: 400 }
              : { width: 420, height: 320 }
          }
        >
          <div
            className={classNames(styles.gradient, "w-100")}
            style={{ height: "60%" }}
          />
          <div
            className={classNames(styles.gradient, "mt-3 ms-2")}
            style={{ height: "12%", width: "70%" }}
          />
          <div
            className={classNames(styles.gradient, "mt-3 ms-2")}
            style={{ height: "8%", width: "60%" }}
          />
        </Card>
      )) || (
        <Card
          sx={
            props.isDetail
              ? { maxWidth: 1000, maxHeight: 400, minHeight: "fit-content" }
              : { width: 420, minHeight: 320, height: "auto" }
          }
        >
          {props.isDetail ? (
            <div style={{ minHeight: "fit-content" }}>
              <InnerCard {...props} />
              <Tabs value={props.tabValue} onChange={props.tabCallBack}>
                <Tab label="Overview" />
                <Tab label="Admission" />
                <Tab label="Academics" />
                <Tab label="Housing" />
                <Tab label="Student" />
                <Tab label="Insights" />
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
              }}
            >
              <InnerCard {...props} />
            </CardActionArea>
          )}
        </Card>
      )}
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
      {!img ? (
        <div
          style={{ backgroundColor: "lightgray", height: "200px" }}
          className="center-child w-100"
        >
          No Image for this college
        </div>
      ) : (
        <CardMedia
          component="img"
          height="200"
          image={img}
          alt={title + " Image"}
        />
      )}
      <CardContent style={{ minHeight: "fit-content" }}>
        <h1
          className="cl-blue"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: isDetail ? 10 : 5,
          }}
        >
          {title}
        </h1>
        {isDetail ? (
          <>
            <h6 className="text-secondary">
              {schoolType == "Public"
                ? "Public School"
                : schoolType == "Private for-profit" || "Private non-profit"
                ? "Private School"
                : ""}
            </h6>
          </>
        ) : (
          <>
            <h6 className="text-secondary">
              {schoolType == "Public"
                ? "Public School | "
                : schoolType == "Private for-profit" || "Private non-profit"
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
