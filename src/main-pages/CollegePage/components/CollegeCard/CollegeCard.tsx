/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import styled from "styled-components";
import styles from "./college-card.module.scss";
import { CardActionArea, Tab, Tabs, duration } from "@mui/material";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mui/material"
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { auto } from "@popperjs/core";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { notification } from "antd";



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
  college_id: string;
  schoolFit: string;
  onList: boolean;
}


function CollegeCard(props: CardProps) {
  const router = useRouter();
  const URL = `/college-detail/${props.college_id}`;
  const isMediumScreen = useMediaQuery('(max-width:992px)');
  const isLargeScreen = useMediaQuery('(max-width:1600px)');
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
            width: 
              isMediumScreen ? "25rem":
              isLargeScreen ? "26rem": 
              "35rem",
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
                    onList: props.onList,
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
  onList,
}: CardProps) {
  const router = useRouter();
  const openAddNotification = () => {
    const btn = (
      <Button
        variant="contained"
        style={{
          textTransform: "none"
        }}
        onClick={() => {
              router.push("/college-list/");}}
      >
        View My List
      </Button>
    );

    notification.open({
      message: "",
      description: "Successfully added this college to your list", btn,
      duration: 2,
      placement: "bottomRight"
    });
  };

  const openRemovedNotification = () => {
    const btn = (
      <Button
        variant="contained"
        style={{
          textTransform: "none"
        }}
        onClick={() => {
              router.push("/college-list/");}}
      >
        View My List
      </Button>
    );

    notification.open({
      message: "",
      description: "Removed this college to your list", btn,
      duration: 2,
      placement: "bottomRight"
    });
  };
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  const [addedToList, setAddedToList] = useState(onList);
  const { data: session } = useSession();
  const handleAddCollege = async (event) => {
    event.stopPropagation();
    openAddNotification();
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
  };

  const handleRemoveCollege = async (event) => {
    event.stopPropagation();
    openRemovedNotification();
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
  };

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
        <Row>
            <div className="w-100 d-flex justify-content-between align-items-end">
              <Col lg={10} md={9} sm={3} xs={9} >
                <div>
                  <h1
                    className="cl-blue"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      marginBottom: 5,
                      overflow:"hidden",
                      textOverflow:"ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {title}
                  </h1>
                </div>
              </Col>
              <Col lg={2} md={3} sm={3} xs={3}>
                <div className="d-flex ps-3">
                    <Button
                      className="ms-3"
                      // variant=""
                      style={{ textTransform: "none", width: "2rem", height: "2rem", background: addedToList ? '' : ''}}
                      onClick={!addedToList ? handleAddCollege : handleRemoveCollege}
                    >
                      {addedToList ? <img src="/images/book_mark.svg"/>:<img src="/images/grey_book_mark.svg"/>}
                    </Button>
                </div>
              </Col>
            </div>

        </Row>
        
        <h6 className="text-secondary" style={{ fontSize: "1.4em" }}>
          {schoolType == "Public"
            ? "Public School -"
            : schoolType == "Private for-profit" || "Private non-profit"
            ? "Private School -"
            : ""}
          <span style={{ marginLeft: 5 }}>{location}</span>
        </h6>
        {/* <div
          className="w-100 d-flex justify-content-between align-items-end"
          style={{ height: "4rem" }}
        >
          <div className={styles.collegeFitContainer}>{schoolFit}</div>
        </div> */}
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
