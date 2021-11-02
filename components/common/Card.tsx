import { AppProps } from "next/dist/shared/lib/router/router";
import { ComponentProps, ComponentPropsWithoutRef, useEffect } from "react";

export interface CardProps {
  title: String;
  url?: string;
  onClick?: Function;
  child?: any;
  textGradient: "light" | "dark";
}

export default function Card({
  title,
  child,
  url,
  textGradient,
  onClick,
}: CardProps) {
  useEffect(() => {}, []);
  return (
    <div
      className="col-12 col-md-6 col-lg-4 p-3"
      onClick={() => {
        if (onClick === undefined) {
          location.href = url;
        } else {
          onClick();
        }
      }}
    >
      <div className="card-container px-4 w-100 shadow">
        <div
          className={
            textGradient === "light"
              ? "card-title pt-2 red-purple-text-gradient"
              : "card-title pt-2 blue-purple-text-gradient"
          }
        >
          {title}
        </div>
        <div className="w-100 wrap overflow-hidden p-3">{child}</div>
      </div>
    </div>
  );
}
