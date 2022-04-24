import LeftContentBlock from "./LeftContentBlock";
import RightContentBlock from "./RightContentBlock";
import { ContentBlockProps } from "./types";
import { Fade } from "react-awesome-reveal";

const ContentBlock = (props: ContentBlockProps) => {
  if (props.width && props.width < 576) {
    return <ContentBlockContent {...props}></ContentBlockContent>
  } else {
    return (
      <Fade direction={props.type}>
        <ContentBlockContent {...props}></ContentBlockContent>
      </Fade>
    );
  }
}

const ContentBlockContent = (props: ContentBlockProps) => {
  if (props.type === "left") return <LeftContentBlock {...props} />;
  if (props.type === "right") return <RightContentBlock {...props} />;
  return null;
};

export default ContentBlock;
