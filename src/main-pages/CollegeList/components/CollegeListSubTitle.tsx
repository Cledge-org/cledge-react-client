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
        <div className=" container py-3 mb-5 border border-3 border-info rounded">
          <div className="container pt-4 pb-3 fw-bold h3" >
            <div style={{ position: "relative" }}>
              <button
                  style={{
                    position: "absolute",
                    top: "-1rem",
                    right: "-0.5rem",
                    background: "transparent",
                    border: "none",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={handleCloseClick}
                >
                  X
                </button>
                <div className="h-50">Hey {accountInfo.name.split(" ")[0]}! Here is your preliminary college list. Checkout your 
                <Link href="/dashboard" className="cl-blue"> dashboard</Link> to further explore next steps!</div>
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