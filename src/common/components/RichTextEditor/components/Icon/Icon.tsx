import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      style={{ fontSize: "18px", verticalAlign: "text-bottom" }}
      className={classNames("material-icons", className)}
    />
  )
);
