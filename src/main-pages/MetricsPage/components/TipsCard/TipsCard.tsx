import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "src/main-pages/CollegeDetailPage/college-detail-page.module.scss"
import LockIcon from "@mui/icons-material/Lock";
const TipsCard = ({
  title,
  tips,
  isOverall,
  updatePage,
  updateChunk,
  isPremium,
}: {
  title: string;
  tips: string[];
  isOverall?: boolean;
  updatePage: string;
  updateChunk: string;
  isPremium?: boolean
}) => {
  const router = useRouter();
  const premium = isPremium ? isPremium : false;
  const BlockPaywallCover = () => {
    if (!premium)
      return (
        <div 
          className={styles.paywallBlock}
          onClick={() => {
            router.push("/auth/premium")
          }}
          style={{ cursor: "pointer" }}
        >
          <LockIcon style={{ color: "#070452" }} />
        </div>
      );
    else return <></>;
  };
  return (
    <div
      className={`position-relative d-flex overflow-hidden flex-${
        isOverall ? "row" : "column"
      } align-items-center justify-content-${
        isOverall ? "between" : "around"
      } w-100 px-3 pt-3 shadow-sm soft-gray-border`}
      style={{
        height: "25vh",
        borderRadius: "10px",
        marginTop: isOverall ? "10vh" : 0,
      }}
    >
      <div
        style={{
          textAlign: "left",
          width: isOverall ? "40%" : "100%",
          height: isOverall ? "100%" : "auto",
        }}
        className="pb-2"
      >
        <strong style={{ fontSize: "1.3em" }}>Tips</strong>
        <br />
        {title}
      </div>
      
      <div
        className={`d-flex flex-column align-items-center justify-content-evenly`}
        style={{ height: "95%", width: isOverall ? "40%" : "100%" }}
      >

        
        {tips.map((tip) => (
          <div
            className="py-2 w-100 px-2 justify-content-start px-2 h-100"
            style={{
              height: "5vh",
              borderRadius: "10px",
            }}
          >
            {tip?.includes("https") ? (
              <>
                <BlockPaywallCover />
                {premium ? tip.substring(0, tip.indexOf("https")) : 
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al" +
                "iqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
                <br />
                <Link href={premium ? tip.substring(tip.indexOf("https")) : ""}>
                  <a className="cl-blue" target="_blank">
                    View Resource
                  </a>
                </Link>    
              </>
            ) : (
              <div>
              <BlockPaywallCover />
              {premium ? tip : 
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al"}
              </div>
            )}
          </div>
        ))}
        <div
          className="position-absolute top-0 w-100"
          style={{ left: 0, backgroundColor: "#F2F2F7", height: "1vh" }}
        />
      </div>
      {!isOverall ? (
        <div className="d-flex flex-row py-3 align-items-center justify-content-end px-2 w-100">
          <button
            onClick={() => {
              router.push({
                pathname: "/application-profile",
                query: { page: updatePage, chunk: updateChunk },
              });
            }}
            className="cl-btn-tips"
          >
            Update my profile
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default TipsCard;
