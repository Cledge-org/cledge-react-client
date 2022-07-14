const DoubleValueSlider = ({
  firstValue,
  secondValue,
  min,
  max,
}: {
  firstValue: number;
  secondValue: number;
  min: number;
  max: number;
}) => {
  return (
    <div className="w-100 py-3 ms-2">
      <div
        className="w-75 position-relative"
        style={{ border: "2px solid lightgray" }}
      >
        <div
          style={{
            overflow: "visible",
            width: `${((secondValue - firstValue) / (max - min)) * 100}%`,
            top: "-9.5px",
            left: `${((firstValue - min) / (max - min)) * 100 - 2}%`,
          }}
          className="d-flex flex-row align-items-center position-absolute justify-content-space-between"
        >
          <div
            style={{
              width: "18px",
              minWidth: "18px",
              height: "18px",
              backgroundColor: "white",
              border: "1px solid lightgray",
              borderRadius: "10px",
            }}
          />
          <div style={{ border: "2px solid #2651ed", width: "90%" }} />
          <div
            style={{
              width: "18px",
              minWidth: "20px",
              height: "20px",
              backgroundColor: "white",
              border: "1px solid lightgray",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default DoubleValueSlider;
