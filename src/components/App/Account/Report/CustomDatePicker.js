import React from "react";
import addMonths from "date-fns/addMonths";
import DateFnsUtils from "@date-io/date-fns"; // import
import { withStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

function CustomDatePicker(props) {
  const moment = require("moment");
  const CustomPicker = withStyles({
    root: {
      width: "160px",
      height: "35px",
      float: "left",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0px 2px 3px 0 rgba(0, 0, 0, 0.18)",
      "& .MuiInputBase-root": {
        paddingRight: 5,
        borderRadius: "12px",
      },
      "& input": {
        fontFamily: "SimHei",
        fontSize: "14px",
      },
      "& .MuiInputAdornment-positionEnd": {
        width: "45px",
        height: "48px",
        marginRight: "5px",
        maxHeight: "40px",
        borderLeft: "solid 1px #b6b6b6",
        "& .MuiButtonBase-root": {
          padding: "5px",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  })(KeyboardDatePicker);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CustomPicker
        disableToolbar
        InputAdornmentProps={{ position: "end" }}
        variant="inline"
        maxDate={new Date()}
        inputVariant="outlined"
        format="yyyy/MM/dd"
        id="date-picker-inline"
        value={props.selectedDate ? props.selectedDate : new Date()}
        onChange={props.onhandleDateChange}
        minDate={props.minDate}
        InputProps={{
          readOnly: true,
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default CustomDatePicker;
