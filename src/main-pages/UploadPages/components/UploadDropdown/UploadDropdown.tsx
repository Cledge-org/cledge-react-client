import classNames from "classnames";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";

const UploadDropdown = ({
  title,
  className,
  onChange,
  placeholder,
  valuesList,
  defaultValue,
}: {
  title: string;
  className?: string;
  onChange: Function;
  placeholder?: string;
  valuesList: string[];
  defaultValue: string;
}) => {
  return (
    <div className={classNames("form-group", className)}>
      <label style={{ fontSize: "0.9em" }} className="text-muted">
        {title}:
      </label>
      <DropDownQuestion
        isForWaitlist
        onChange={(value) => {
          onChange(value);
        }}
        defaultValue={defaultValue}
        placeholder={placeholder}
        valuesList={valuesList}
      />
    </div>
  );
};
export default UploadDropdown;
