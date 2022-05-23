import styled from "styled-components";

export const SvgIcon = ({ src, width, height }: SvgIconProps) => (
  <img src={`/images/${src}`} alt={src} width={width} height={height} />
);
