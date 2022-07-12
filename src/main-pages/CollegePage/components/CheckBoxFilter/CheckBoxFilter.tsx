import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

const CheckBoxFilter = ({
  title,
  options,
  mappedValues,
  onChange,
}: {
  title: string;
  options: string[];
  mappedValues?: any[];
  onChange: (selectedOptions: string[]) => void;
}) => {
  const [selected, setSelected] = useState([]);
  return (
    <FormGroup key={title + "-form-group"}>
      {options.map((option, i) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                key={title + i}
                onChange={(e) => {
                  const copyOfSelected = [...selected];
                  if (copyOfSelected.includes(option)) {
                    copyOfSelected.splice(copyOfSelected.indexOf(option), 1);
                  } else {
                    copyOfSelected.push(option);
                  }
                  setSelected(copyOfSelected);
                  onChange(
                    mappedValues
                      ? copyOfSelected.map((selected) => {
                          return mappedValues[options.indexOf(selected)];
                        })
                      : copyOfSelected
                  );
                }}
                id={i + 1 + ""}
              />
            }
            label={option}
          />
        );
      })}
    </FormGroup>
  );
};
export default CheckBoxFilter;
