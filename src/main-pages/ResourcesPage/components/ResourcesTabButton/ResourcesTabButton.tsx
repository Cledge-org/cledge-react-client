import styles from "./resources-tab-button.module.scss";
interface ResourcesTabButtonProps {
  onClick: Function;
  title: String;
  currTab: String;
}
function ResourcesTabButton({
  onClick,
  title,
  currTab,
}: ResourcesTabButtonProps) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  const lowerCaseName = title.toLowerCase();
  return (
    <li
      className={styles.resourcesTabNavBtn}
      id={lowerCaseName + "-tab"}
      onClick={() => {
        onClick(lowerCaseName);
      }}
      style={
        currTab === lowerCaseName
          ? {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }
          : {}
      }
    >
      <div
        style={{
          width: "fit-content",
        }}
      >
        {title}
      </div>
    </li>
  );
}
export default ResourcesTabButton;