import React from "react";

export default function preventDefault(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>): void {
  e.preventDefault();
}