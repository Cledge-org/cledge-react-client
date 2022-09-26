import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import DoubleValueSlider from "src/main-pages/CollegePage/components/DoubleValueSlider/DoubleValueSlider";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Menu } from "antd";

interface ComponentProps {
  title: string;
  hasSlider?: boolean;
  customMinTxt?: string;
  customMaxTxt?: string;
  onChange: (min: number, max: number) => void;
  maxInput?: number;
  minInput?: number;
  startAdornment?: ReactElement;
  endAdornment?: ReactElement;
}

const MinMaxFilter = ({
  title,
  customMinTxt,
  customMaxTxt,
  onChange,
  hasSlider,
  maxInput,
  minInput,
  startAdornment,
  endAdornment,
}: ComponentProps) => {
  const [minMax, setMinMax] = useState({
    min: NaN,
    max: NaN,
  });
  return (
    <>
      {hasSlider && (
        <DoubleValueSlider
          firstValue={isNaN(minMax.min) ? 0 : minMax.min}
          secondValue={isNaN(minMax.max) ? 0 : minMax.max}
          min={minInput}
          max={maxInput}
        />
      )}
      <Box sx={{ display: "flex", flexWrap: "no-wrap" }}>
        <FormControl sx={{ m: 1, width: "45%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            {customMinTxt ? customMinTxt : "Min"}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={(e) => {
              setMinMax({
                ...minMax,
                min: parseFloat(e.target.value),
              });
              onChange(parseFloat(e.target.value), minMax.max);
            }}
            startAdornment={startAdornment ? startAdornment : <div />}
            endAdornment={endAdornment}
            label="Amount"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "45%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            {customMaxTxt ? customMaxTxt : "Max"}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={(e) => {
              setMinMax({
                ...minMax,
                max: parseFloat(e.target.value),
              });
              onChange(minMax.min, parseFloat(e.target.value));
            }}
            startAdornment={startAdornment ? startAdornment : <div />}
            endAdornment={endAdornment}
            label="Amount"
          />
        </FormControl>
      </Box>
    </>
  );
};
export default MinMaxFilter;
