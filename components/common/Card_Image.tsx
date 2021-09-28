import { useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";

interface CardTextProps extends CardProps {
  snippet: String;
}

export default function CardImage({
  title,
  snippet,
  url,
  textGradient,
}: CardTextProps) {
  useEffect(() => {}, []);
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={
        <div className="center-child">
          <img src="/images/SAT-vocabulary.png" />
        </div>
      }
      url={url}
    />
  );
}
