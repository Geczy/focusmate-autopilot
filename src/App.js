import React from "react";
import "./App.css";
import Title from "./components/Title";
import TimeCheckForm from "./components/TimeCheckForm";
import SoundRadioForm from "./components/SoundRadioForm";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const font = "'Nunito', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: font,
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Title />
        <TimeCheckForm />
        <SoundRadioForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
