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
        <div className=" container py-3 mb-5 border rounded " style={{ background: "linear-gradient(93deg, rgba(231,230,251,1) 0%, rgba(135,171,213,1) 83%)", }}>
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
                <div className="h-50 ">Hey {accountInfo.name.split(" ")[0]}! Here is your preliminary college list. Checkout the&nbsp; 
                <span className="cl-blue text-decoration-underline">
                  <Link href="/dashboard" className="text-blue">dashboard</Link>
                </span> to further explore next steps!</div>
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