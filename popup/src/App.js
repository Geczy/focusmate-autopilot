import React from 'react';
import './App.css';
import Title from './components/Title';
import TimeCheckForm from './components/TimeCheckForm';
import SoundRadioForm from './components/SoundRadioForm';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import TogglesForm from './components/TogglesForm';

const theme = createTheme();

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Title />
        <TogglesForm />
        <TimeCheckForm />
        <SoundRadioForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
