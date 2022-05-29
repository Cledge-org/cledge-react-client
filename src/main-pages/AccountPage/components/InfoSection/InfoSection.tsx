import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import styles from "./info-section.module.scss";
interface InfoSectionProps {
  name: string;
  value: any;
  onEdit: Function;
}
function InfoSection({ name, value, onEdit }: InfoSectionProps) {
  return (
    <div className={classNames(styles.myaccountInfoSection, "pt-1 pb-3")}>
      <span className={styles.name}>{name.toUpperCase()}</span>
      <div className={styles.infoContainer}>
        {value}
        <button className={styles.iconBtn} onClick={() => onEdit()}>
          <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
        </button>
      </div>
    </div>
  );
}
export default InfoSection;
