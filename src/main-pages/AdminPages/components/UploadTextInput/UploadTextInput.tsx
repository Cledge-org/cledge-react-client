import classNames from "classnames";

const UploadTextInput = ({
  title,
  className,
  isNumber,
  onChange,
  placeholder,
  value,
}: {
  title: string;
  className?: string;
  onChange: Function;
  placeholder?: string;
  value: string | number;
  isNumber?: boolean;
}) => {
  return (
    <div className={classNames("form-group", className)}>
      <label style={{ fontSize: "0.9em" }} className="text-muted">
        {title}:
      </label>
      <input
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        type={isNumber ? "number" : "text"}
        className="px-3 form-control"
        placeholder={placeholder ?? ""}
      />
    </div>
  );
};
export default UploadTextInput;
