/*global chrome*/
import React, { useEffect } from "react";
import { FormControl, TextField } from "@material-ui/core";
import { useStyles } from "./SoundRadioForm";

export default function TimeCheckForm() {
  const classes = useStyles();

  const [playAtSecond, setPlayAtSecond] = React.useState(20);
  useEffect(() => {
    chrome?.storage?.sync?.get(["playAtSecond"], (result) => {
      setPlayAtSecond(result.playAtSecond || 20);
    });
  }, []);

  const handleTimeChoice = (event) => {
    const { value } = event.target;
    chrome?.storage?.sync?.set({ playAtSecond: value }, () => {
      setPlayAtSecond(value);
    });
  };

  return (
    <FormControl className={classes.root} component="fieldset">
      <TextField
        required
        onChange={handleTimeChoice}
        type="number"
        name="playAtSecond"
        label="Play when x seconds left"
        defaultValue={playAtSecond}
      />
    </FormControl>
  );
}
