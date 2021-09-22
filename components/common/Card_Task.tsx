import { useEffect } from "react";
import Card from "./Card";
import { CardProps } from "./Card";

interface CardTaskProps extends CardProps {}

export default function CardTask({ title, url, textGradient }: CardTaskProps) {
  useEffect(() => {}, []);
  return (
    <Card
      textGradient={textGradient}
      title={title}
      child={
        <div className="d-flex flex-column justify-content-evenly ms-3"></div>
      }
      url={url}
    />
  );
}
