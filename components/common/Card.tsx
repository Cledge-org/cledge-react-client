import { AppProps } from "next/dist/shared/lib/router/router";
import { ComponentProps, ComponentPropsWithoutRef, useEffect } from "react";

export interface CardProps {
  title: String;
  url?: URL;
  child?: any;
  textGradient: "light" | "dark";
}

export default function Card({ title, child, url, textGradient }: CardProps) {
  useEffect(() => {}, []);
  return (
    <div className="col-12 col-md-6 col-lg-4  p-3">
      <div
        className="card-container w-100 shadow"
        onClick={() => alert(url?.toString())}
      >
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
