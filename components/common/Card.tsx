import { auto } from "@popperjs/core";
import { AppProps } from "next/dist/shared/lib/router/router";
import { ComponentProps, ComponentPropsWithoutRef, useEffect } from "react";

export interface CardProps {
  title: String;
  url?: string;
  classNames?: string;
  child?: any;
  textGradient: "light" | "dark";
  isCardTask?: boolean;
}

export default function Card({
  isCardTask,
  title,
  child,
  url,
  classNames = "col-lg-4 col-md-6 col-xs-12 p-3 px-4",
  textGradient,
}: CardProps) {
  return (
    <div
      className={classNames}
      style={{ height: "35vh" }}
      onClick={() => {
        if (isCardTask !== undefined && !isCardTask) {
          location.href = url;
        }
      }}
    >
      <div className="card-container px-4 w-100 h-100 shadow">
        <div
          className={
            textGradient === "light"
              ? "card-title pt-2 red-purple-text-gradient"
              : "card-title pt-2 blue-purple-text-gradient"
          }
        >
          {title}
        </div>
        <div className="w-100 h-75 wrap overflow-hidden p-3 d-flex flex-column justify-content-end">
          {child}
        </div>
      </div>
    </div>
  );
}
