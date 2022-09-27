import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import styles from "./info-section.module.scss";
interface InfoSectionProps {
  name: string;
  value: any;
  onEdit: Function;
  isPasswordEdit?: boolean;
}
function InfoSection({
  name,
  value,
  onEdit,
  isPasswordEdit,
}: InfoSectionProps) {
  const [hasSubmittedPasswordReset, setHasSubmittedPasswordReset] =
    useState(false);
  return (
    <div className={classNames(styles.myaccountInfoSection, "pt-1 pb-3")}>
      <span className={styles.name}>{name.toUpperCase()}</span>
      <div className={styles.infoContainer}>
        {value}
        {isPasswordEdit ? (
          hasSubmittedPasswordReset ? (
            <div className={styles.sendEmailBtnSent}>
              <BsCheck fontSize={28} />
            </div>
          ) : (
            <button
              className={styles.sendEmailBtn}
              onClick={() => {
                onEdit();
                setHasSubmittedPasswordReset(true);
                setTimeout(() => {
                  setHasSubmittedPasswordReset(false);
                }, 5000);
              }}
            >
              Send Email to Reset Password
            </button>
          )
        ) : (
          <button className={styles.iconBtn} onClick={() => onEdit()}>
            <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
          </button>
        )}
      </div>
    </div>
  );
}
export default InfoSection;
