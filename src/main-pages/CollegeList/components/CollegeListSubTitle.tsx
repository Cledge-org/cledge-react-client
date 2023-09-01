import { useRouter } from "next/router";
import React, { useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";
const CollegeListSubTitle = ({
  accountInfo
}: {
  accountInfo: AccountInfo;
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const handleCloseClick = () => {
    setIsExpanded(false);
  };

  return (
    <div className="">
      {isExpanded && (
        <div className="py-3  mb-5">
          <div className="container pt-4 pb-5 fw-bold " style={{ fontSize: "20px", }}>
            <div style={{ position: "relative" }}>
              <button
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    background: "transparent",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={handleCloseClick}
                >
                  X
                </button>
                Hey {accountInfo.name.split(" ")[0]}, here is your preliminary college list. Checkout your 
                <Link href="/dashboard" passHref legacyBehavior
                style={{ textDecoration: "underline !important" }}> dashboard</Link> to further explore next steps!
            </div>
          </div>
        </div>
      )}
  </div>
  );
};
export default connect((state) => {
  return {
    accountInfo: state.accountInfo,
  };
})(CollegeListSubTitle);