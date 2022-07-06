import { useWindowSize } from "src/utils/hooks/useWindowSize";

const Message = ({
  isOnLeft,
  message,
}: {
  isOnLeft?: boolean;
  message: string | JSX.Element;
}) => {
  const size = useWindowSize();
  return (
    <div
      className={`d-flex flex-row w-100 ${
        isOnLeft ? "justify-content-end" : ""
      } my-3`}
    >
      {!isOnLeft ? (
        <img
          src="/images/chatbot_picture.svg"
          className="me-2"
          style={{ width: size.width < 800 ? "4vmax" : "2.5vmax" }}
        />
      ) : null}
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          minWidth: "15vw",
          // width: "fit-content",
          overflowWrap: "break-word",
          // https://css-tricks.com/almanac/properties/o/overflow-wrap/
          maxWidth: size.width < 800 ? "60vw" : "45vw",
        }}
        className="p-2"
      >
        {message}
      </div>
    </div>
  );
};
export default Message;
