/*global chrome*/
import React from 'react';
import { Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between'
  },
  buttons: {
    marginTop: theme.spacing(1)
  },
  label: {
    minWidth: 90
  }
}));

const sampleAudios = [
  {
    title: 'Level up',
    url: 'https://mgates.me/mp3/320654_5260872-lq.mp3'
  },
  {
    title: 'Level complete',
    url: 'https://mgates.me/mp3/122255_1074082-lq.mp3'
  },
  {
    title: 'Pizzicato Orchestral Roll 6',
    url: 'https://mgates.me/mp3/145457_2615119-lq.mp3'
  }
];

export default function SoundRadioForm() {
  const [value, setValue] = React.useState(sampleAudios[0].url);

  React.useEffect(() => {
    chrome?.storage?.sync?.get(['sound'], (result) => {
      let url = result.sound;
      if (!result.sound || !sampleAudios.find((a) => a.url === result.sound)) {
        console.log('setting a default');
        url = sampleAudios[0].url;
        setStorage(url);
      }
      setValue(url);
    });
  }, []);

  const setStorage = (soundVal) => {
    chrome?.storage?.sync?.set({ sound: soundVal }, () => {
      console.log(`sound is set to ${soundVal}`);
    });
    setValue(soundVal);
  };

  const selectSound = (event) => {
    const soundValue = event.target.value;
    setStorage(soundValue);
  };
  const classes = useStyles();

  return (
    <FormControl className={classes.root} component="fieldset">
      <FormLabel component="legend">Sound</FormLabel>
      <RadioGroup
        aria-label="sound"
        name="sound-file"
        value={value}
        onChange={selectSound}
        className={classes.buttons}
      >
        {sampleAudios.map((audio, i) => (
          <span key={i}>
            <FormControlLabel
              value={audio.url}
              className={classes.label}
              control={<Radio />}
              label={audio.title}
            />
            {audio.url === value && (
              <audio autoPlay controls src={value}>
                Your browser does not support the audio element.
              </audio>
            )}
          </span>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
