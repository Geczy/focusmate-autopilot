/*global chrome*/
import React, { useEffect, useState } from 'react';
import { Checkbox, FormControl, FormLabel } from '@material-ui/core';

const toggles = {
  playAtStart: { label: 'Play start sound before session begins', defaultValue: true },
  playInSession: { label: 'Play start sound even if already in session', defaultValue: true },
  playAtEnd: { label: 'Play end sound before session ends', defaultValue: true },
  autoMute: { label: 'Auto mute partner when I mute', defaultValue: true },
  autoPNP: { label: 'Auto enable picture-in-picture when I mute', defaultValue: true }
};

export default function TogglesForm() {
  const [savedValues, setSavedValues] = useState({});

  // On mount, load the saved settings from browser storage
  useEffect(() => {
    chrome?.storage?.sync?.get(Object.keys(toggles), setSavedValues);
  }, []);

  // Saving new values to browser storage as you switch 'em up
  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    chrome?.storage?.sync?.set({ [name]: checked });
    setSavedValues({ ...savedValues, [name]: checked });
  };

  return Object.keys(toggles).map((key) => {
    const { label, defaultValue } = toggles[key];
    const savedValue = savedValues[key];
    const value = savedValue === undefined ? defaultValue : savedValue;

    return (
      <FormControl key={key} component="fieldset">
        <FormLabel>
          <Checkbox onChange={handleCheckboxChange} name={key} checked={value} />
          {label}
        </FormLabel>
      </FormControl>
    );
  });
}
