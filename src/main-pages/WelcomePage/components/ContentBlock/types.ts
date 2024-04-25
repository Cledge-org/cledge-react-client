import { CSSProperties } from "react";

export interface ContentBlockProps {
  icon?: string;
  title: React.ReactNode;
  content: string;
  section?: any;
  button?: any;
  t?: any;
  id: string;
  type?: string;
  video?: JSX.Element;
  width?: number;
  style?: CSSProperties;
  isMobile?: boolean;
}
