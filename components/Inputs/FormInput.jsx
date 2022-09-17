import React from "react";

import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";

function FormInput({
  type,
  label,
  value,
  handleChange,
  defaultValue,
  icon,
  isTextArea = false,
}) {
  return (
    <div className="relative flex items-center">
      <TextField
        // config style ketika pada state 'focus'
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              border: 1,
              borderColor: "#437EEB",
              color: "#437EEB",
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
              color: "#437EEB",
            },
          },
        }}
        multiline={isTextArea}
        rows={isTextArea ? 4 : 1}
        fullWidth
        type={type}
        variant="outlined"
        value={value}
        onChange={handleChange}
        label={label}
        required
      />
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        {icon}
      </div>
    </div>
  );
}

export default FormInput;
