import React from "react";

import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";

function InputText({
  type,
  helperText,
  invalid,
  label,
  value,
  handleChange,
  icon,
}) {
  return (
    <div className="relative">
      <TextField
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              border: 1,
              borderColor: "#2028EB",
              color: "#2028EB",
            },
          },
        }}
        InputProps={{
          style: {
            height: 52,
            borderRadius: 9,
            fontSize: 13,
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: 13,
            textAlign: "center",
          },
          sx: {
            // set the color of the label when not shrinked
            color: "#656565",
            [`&.${inputLabelClasses.shrink}`]: {
              // set the color of the label when shrinked (usually when the TextField is focused)
              color: "#2028EB",
            },
          },
        }}
        error={invalid ? true : false}
        helperText={helperText}
        fullWidth
        type={type}
        variant="outlined"
        value={value}
        onChange={handleChange}
        label={label}
      />
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        {icon}
      </div>
    </div>
  );
}

export default InputText;
