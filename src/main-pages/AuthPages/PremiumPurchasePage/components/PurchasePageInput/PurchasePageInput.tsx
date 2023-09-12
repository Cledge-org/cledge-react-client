const PurchasePageInput = ({
  heading,
  placeholder,
  onChange,
  isShort,
  isPassword,
}: {
  isShort?: boolean;
  heading: string;
  isPassword?: boolean;
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div
      style={{ width: isShort ? "48%" : "100%" }}
      className="d-flex flex-column pt-2"
    >
      <label className="cl-mid-gray pb-1" style={{}}>
        {heading}
      </label>
      <input
        type={isPassword ? "password" : "text"}
        style={{
          fontWeight: 600,
          borderRadius: "5px",
          border: "1px solid #808099",
        }}
        className="cl-dark-text p-2"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};
export default PurchasePageInput;
