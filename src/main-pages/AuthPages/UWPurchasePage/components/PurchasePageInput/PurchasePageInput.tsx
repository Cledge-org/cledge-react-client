const PurchasePageInput = ({
  heading,
  placeholder,
  onChange,
}: {
  heading: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <label className="cl-light-gray" style={{}}>
        {heading}
      </label>
      <input
        style={{ fontWeight: 600, borderRadius: "5px" }}
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
