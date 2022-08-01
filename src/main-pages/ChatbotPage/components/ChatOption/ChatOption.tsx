import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import styles from "./chat-option.module.scss";

const ChatOption = ({
  option,
  onClick,
  isChosen,
}: {
  option: string;
  onClick: (option: string) => void;
  isChosen?: boolean;
}) => {
  const size = useWindowSize();
  return (
    <div
      style={{
        background: isChosen ? "#506BED1F" : "#FFFFFF",
        border: "1.5px solid #2651ED",
        borderRadius: "24px",
        color: "#506BED",
        overflowWrap: "break-word",
        maxWidth: size.width < 800 ? "60vw" : "40vw",
      }}
      onClick={() => {
        onClick(option);
      }}
      className={classNames(styles.option, "center-child p-3 me-2")}
    >
      {option}
    </div>
  );
};
export default ChatOption;
