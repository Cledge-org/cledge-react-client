/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import styled from "styled-components";
import styles from "./college-card.module.scss";
import { CardActionArea, Tab, Tabs } from "@mui/material";
import classNames from "classnames";
import { useSession } from "next-auth/react";

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
  onList: boolean;
}

function CollegeCard(props: CardProps) {
  const router = useRouter();
  const URL = `/collegeDetail/`;

  return (
    <CardWrapper style={{ marginBottom: "25px" }}>
      {(props.isLoading && (
        <Card sx={{ width: "40rem", height: 400 }}>
          <div
            className={classNames(styles.gradient, "w-100")}
            style={{ height: "60%" }}
          />
          <div
            className="d-flex flex-column w-100 justify-content-between"
            style={{ height: "40%" }}
          >
            <div
              className={classNames(styles.gradient, "mt-3 ms-2")}
              style={{ height: "24%", width: "70%" }}
            />
            <div
              className="d-flex flex-row w-100 justify-content-between align-items-center mb-4"
              style={{ height: "20%" }}
            >
              <div
                className={classNames(styles.gradient, "mt-3 ms-2")}
                style={{ height: "100%", width: "20%" }}
              />
              <div
                className={classNames(styles.gradient, "mt-3 me-2")}
                style={{ height: "80%", width: "30%" }}
              />
            </div>
          </div>
        </Card>
      )) || (
        <Card
          sx={{
            width: "40rem",
            minHeight: "10rem",
            height: "fit-content",
          }}
        >
          <CardActionArea
            onClick={() => {
              router.push(
                {
                  pathname: URL,
                  query: {
                    data: JSON.stringify(props.data),
                    onList: props.onList
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
  onList
}: CardProps) {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  const [addedToList, setAddedToList] = useState(onList);
  const { data: session } = useSession();
  const handleAddCollege = async (event) => {
    event.stopPropagation();
    setAddedToList(!addedToList);
    // add to college list
    const response = await fetch(`/api/CST/add-college-to-list`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: session.user.uid,
        college_title: title,
      }),
    });
    const responseJson = await response.json();
  }

  const handleRemoveCollege = async (event) => {
    event.stopPropagation();
    setAddedToList(!addedToList);
    // remove from college list
    const response = await fetch(`/api/CST/remove-college-from-list`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: session.user.uid,
        college_title: title,
      }),
    });
    const responseJson = await response.json();
  }

  
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
        <div className="w-100 d-flex justify-content-between align-items-end">
          <div>
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
          </div>
          <div className="d-flex">
              <Button
                className="ms-3"
                // variant=""
                style={{ textTransform: "none", width: "2rem", height: "2rem", background: addedToList ? '' : ''}}
                onClick={!addedToList ? handleAddCollege : handleRemoveCollege}
              >

                {addedToList ? <img src="/images/book_mark.svg"/>:<img src="/images/grey_book_mark.svg"/>}
              </Button>
            </div> 
        </div>
        
        <h6 className="text-secondary" style={{ fontSize: "1.4em" }}>
          {schoolType == "Public"
            ? "Public School -"
            : schoolType == "Private for-profit" || "Private non-profit"
            ? "Private School -"
            : ""}
          <span style={{ marginLeft: 5 }}>{location}</span>
        </h6>
        <div
          className="w-100 d-flex justify-content-between align-items-end"
          style={{ height: "4rem" }}
        >
          <div className={styles.collegeFitContainer}>{schoolFit}</div>
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
