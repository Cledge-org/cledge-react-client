import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { Menu } from "src/common/components/RichTextEditor/components/Toolbar/components/Menu/Menu";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu
      {...props}
      ref={ref}
      style={{
        position: "relative",
        padding: "1px 18px 17px",
        margin: "0 -20px",
        borderBottom: "2px solid #eee",
        marginBottom: "20px",
      }}
      className={className}
    />
  )
);
