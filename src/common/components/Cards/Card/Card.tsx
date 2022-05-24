export interface CardProps {
  title: String;
  url?: string;
  className?: string;
  child?: any;
  textGradient: "light" | "dark";
  isCardTask?: boolean;
}
import styles from "./card.module.scss";
import classNames from "classnames";
export default function Card({
  isCardTask,
  title,
  child,
  url,
  className = "col-lg-4 col-md-6 col-xs-12 p-3 px-4",
  textGradient,
}: CardProps) {
  return (
    <div
      className={className}
      onClick={() => {
        if (isCardTask !== undefined && !isCardTask) {
          location.href = url;
        }
      }}
    >
      <div
        style={{ minHeight: "35vh" }}
        className={classNames(
          styles.cardContainer,
          "px-4 w-100 h-100 d-flex flex-column shadow"
        )}
      >
        <div
          className={classNames(
            styles.cardTitle,
            { ["red-purple-text-gradient"]: textGradient === "light" },
            { ["blue-purple-text-gradient"]: textGradient !== "light" },
            "ms-3 mt-3"
          )}
        >
          {title}
        </div>
        <div
          className="w-100 wrap overflow-hidden p-3 d-flex flex-column"
          style={{ flex: 3 }}
        >
          {child}
        </div>
      </div>
    </div>
  );
}
