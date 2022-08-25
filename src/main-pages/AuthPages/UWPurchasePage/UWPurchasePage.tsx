import classNames from "classnames";
import PurchasePageInput from "src/main-pages/AuthPages/UWPurchasePage/components/PurchasePageInput/PurchasePageInput";
import styles from "./uw-purchase-page.module.scss";

const UWPurchasePage = () => {
  return (
    <div
      className="d-flex flex-row justify-content-evenly w-100 py-4"
      style={{
        backgroundColor: "#F9FAFF",
        height: "fit-content",
        minHeight: "100vh",
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "40%" }}
      >
        <div className={styles.blobContainer}>
          <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>
            Create an account
          </div>
          <div className="cl-dark-text fw-bold" style={{ fontSize: "14px" }}>
            You’ll use this account to log in and access Cledge’s UW CS package
          </div>
          <PurchasePageInput
            heading={"Email*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Password*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Confirm password*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
        </div>
        <div className={classNames(styles.blobContainer, "mt-4")}>
          <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>
            Payment method
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <PurchasePageInput
              isShort
              heading={"First Name*"}
              placeholder={""}
              onChange={(value: string) => {}}
            />
            <PurchasePageInput
              isShort
              heading={"Last Name*"}
              placeholder={""}
              onChange={(value: string) => {}}
            />
          </div>
          <PurchasePageInput
            heading={"Credit/debit card number*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <div className="d-flex flex-row align-items-center justify-content-between">
            <PurchasePageInput
              isShort
              heading={"Expiration month and year*"}
              placeholder={""}
              onChange={(value: string) => {}}
            />
            <PurchasePageInput
              isShort
              heading={"CVC*"}
              placeholder={""}
              onChange={(value: string) => {}}
            />
          </div>
          <div>Images HERE</div>
        </div>
        <div className={classNames(styles.blobContainer, "mt-4")}>
          <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>
            Billing address
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <PurchasePageInput
              isShort
              heading={"First Name*"}
              placeholder={""}
              onChange={(value: string) => {}}
            />
            <PurchasePageInput
              isShort
              heading={"Last Name*"}
              placeholder={""}
              onChange={(value: string) => {}}
            />
          </div>
          <PurchasePageInput
            heading={"Address line 1*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Address line 2"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"City"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"State"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Country"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Zip Code"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
        </div>
      </div>
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "40%" }}
      >
        <div
          className="ps-4 py-3 cl-dark-text fw-bold"
          style={{
            backgroundColor: "rgba(80, 107, 237, 0.2)",
            fontSize: "28px",
            width: "80%",
          }}
        >
          Purchase Summary
        </div>
        <div className={styles.blobContainer}>
          <div className="d-flex flex-row align-items-center justify-content-between fw-bold cl-dark-text">
            <div>University of Washington Computer Science Package</div>
            <div>$100</div>
          </div>
          <button
            className="cl-btn-blue w-100"
            style={{ borderRadius: "58x", fontSize: "18px" }}
          >
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
};
export default UWPurchasePage;
