import { SvgIconProps } from "../types";
import Image from "next/dist/client/image";

export const SvgIcon = ({ src, width, height }: SvgIconProps) => (
  <img src={`/images/${src}`} alt={src} width={width} height={height} />
);
