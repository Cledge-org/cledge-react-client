import React, { useState } from "react";
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
  tabCallBack?: (e, newValue) => void;
  tabValue?: number;
  data?: object;
  schoolFit: string;
}

function CollegeCard(props: CardProps) {
  const router = useRouter();
  const URL = `/collegeDetail/`;

  return (
    <CardWrapper style={{ marginBottom: "25px" }}>
      {(props.isLoading && (
        <Card sx={{ width: 700, height: 400 }}>
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
          sx={{
            width: 700,
            minHeight: 400,
            height: "fit-content",
          }}
        >
          <CardActionArea
            onClick={() => {
              console.log(props.data);
              router.push(
                {
                  pathname: URL,
                  query: {
                    data: JSON.stringify(props.data),
                  },
                },
                URL
              );
            }}
            className={
              "d-flex flex-column justify-content-start align-items-start"
            }
            style={{ minHeight: "400px", height: "auto" }}
          >
            <InnerCard {...props} />
          </CardActionArea>
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
  schoolFit,
}: CardProps) {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  return (
    <>
      {!img ? (
        <div
          style={{ backgroundColor: "lightgray", height: "250px" }}
          className="center-child w-100"
        >
          No Image for this college
        </div>
      ) : (
        <img
          src={img}
          style={{
            height: imageHasLoaded ? "250px" : "0",
            width: "100%",
            objectFit: "cover",
          }}
          onLoad={() => {
            setImageHasLoaded(true);
          }}
          alt={title + " Image"}
        />
      )}
      {!imageHasLoaded && img && (
        <div
          className={classNames(styles.gradient, "w-100")}
          style={{ height: "250px" }}
        />
      )}
      <CardContent style={{ minHeight: "fit-content", width: "100%" }}>
        <h1
          className="cl-blue"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: 5,
          }}
        >
          {title}
        </h1>
        <div
          className="w-100 d-flex justify-content-between align-items-end"
          style={{ height: "90px" }}
        >
          <div className={styles.collegeFitContainer}>{schoolFit}</div>
          <h6 className="text-secondary" style={{ fontSize: "1.4em" }}>
            {schoolType == "Public"
              ? "Public School | "
              : schoolType == "Private for-profit" || "Private non-profit"
              ? "Private School | "
              : ""}
            <span style={{ marginLeft: 5 }}>{location}</span>
          </h6>
        </div>
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
