import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBhbBDCdb5rK1rCD3shpybvnBFW0ErDk-Q",
  authDomain: "temp-contributions.firebaseapp.com",
  projectId: "temp-contributions",
  storageBucket: "temp-contributions.appspot.com",
  messagingSenderId: "218725914046",
  appId: "1:218725914046:web:fcbbb46ca04d6d6fc615ef",
  measurementId: "G-1FF7YY6RPF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
