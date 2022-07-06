import classNames from "classnames";
import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styles from "./menu.module.scss";
interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div {...props} ref={ref} className={classNames(className, styles.menu)} />
  )
);
