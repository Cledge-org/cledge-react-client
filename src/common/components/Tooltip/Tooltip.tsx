import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

export const Tooltip = ({ tipId, text }: { tipId: string; text: string }) => {
  return (
    <div>
      <a data-tip data-for={`${tipId}`}>
        <AiOutlineInfoCircle size={24} className="cl-mid-gray" />
      </a>
      <ReactTooltip id={`${tipId}`}>{text}</ReactTooltip>
    </div>
  );
};
