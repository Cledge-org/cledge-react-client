import { useRouter } from "next/router";
import React, { useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";

const SMFutureTitle = ({
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
    <div>
      {isExpanded && (
        <div className="container py-3 mb-5 border rounded" style={{ background: "linear-gradient(93deg, rgba(231,230,251,1) 0%, rgba(135,171,213,1) 83%)" }}>
          <div className="container pt-4 pb-3 fw-bold h3">
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
              <div className="mb-3" style={{ fontSize: "1.5rem" }}>
                Hey {accountInfo.name.split(" ")[0]}!
              </div>
              <div style={{ fontSize: "1rem" }}>
                Welcome to your <span style={{ fontWeight: "bold", color: "#2a2a2a" }}>metrics tab</span>! Use this page to understand how you <span style={{ fontWeight: "bold", color: "#2a2a2a" }}>rank</span> in your college search and how you can <span style={{ fontWeight: "bold", color: "#2a2a2a" }}>improve your score</span>. Currently, this product is in <span style={{ fontWeight: "bold", color: "#2a2a2a" }}>beta</span> and we expect future versions to provide further value such as personalized advice from an interactive <span style={{ fontWeight: "bold", color: "#2a2a2a" }}>college counselor</span> and more!
              </div>
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
})(SMFutureTitle);
