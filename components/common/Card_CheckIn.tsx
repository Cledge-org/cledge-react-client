import { useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";

interface CardCheckInProps extends CardProps {
  snippet: String;
  percentComplete: number;
  isFinished: boolean;
  onCardClick: Function;
}

export default function CardCheckIn({
  title,
  snippet,
  url,
  textGradient,
  percentComplete,
  isFinished,
  onCardClick,
}: CardCheckInProps) {
  useEffect(() => {}, []);
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={
        <div
          className="d-flex flex-column justify-content-end"
          style={{ flex: 1 }}
        >
          <div className="d-flex flex-column justify-content-between h-100 ms-1">
            <div className="cl-mid-gray">{snippet}</div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={() => {
                  onCardClick();
                }}
                className="cl-btn-blue"
              >
                {isFinished ? "Edit" : "Start"}
              </button>
              {percentComplete}%
            </div>
          </div>
        </div>
      }
      url={url}
    />
  );
}
