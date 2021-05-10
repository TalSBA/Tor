import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./DatePicker.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({ onDateSelected }) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  return (
    <form className={`${classes.container} date-picker`} noValidate>
      <h4>בחר תאריך המבוקש:</h4>
      <TextField
        id="date"
        type="date"
        defaultValue={Date.now()}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={(e) => onDateSelected(e.target.value)}
      />
    </form>
  );
}
