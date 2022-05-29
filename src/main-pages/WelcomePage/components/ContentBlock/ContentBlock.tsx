import LeftContentBlock from "./components/LeftContentBlock/LeftContentBlock";
import RightContentBlock from "./components/RightContentBlock/RightContentBlock";
import { ContentBlockProps } from "./types";
import { Fade } from "react-awesome-reveal";

const ContentBlock = (props: ContentBlockProps) => {
  if (props.width && props.width < 576) {
    return <ContentBlockContent {...props}></ContentBlockContent>;
  } else {
    if (props.type == "left") {
      return (
        <Fade direction="left">
          <ContentBlockContent {...props}></ContentBlockContent>
        </Fade>
      );
    } else {
      return (
        <Fade direction="right">
          <ContentBlockContent {...props}></ContentBlockContent>
        </Fade>
      );
    }
  }
};

const ContentBlockContent = (props: ContentBlockProps) => {
  if (props.type === "left") return <LeftContentBlock {...props} />;
  if (props.type === "right") return <RightContentBlock {...props} />;
  return null;
};

export default ContentBlock;
