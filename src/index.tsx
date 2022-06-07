import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { initializeApp } from "firebase/app";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { BrowserRouter } from "react-router-dom";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);

const firebaseConfig = {
  apiKey: "AIzaSyBhbBDCdb5rK1rCD3shpybvnBFW0ErDk-Q",
  authDomain: "temp-contributions.firebaseapp.com",
  projectId: "temp-contributions",
  storageBucket: "temp-contributions.appspot.com",
  messagingSenderId: "218725914046",
  appId: "1:218725914046:web:fcbbb46ca04d6d6fc615ef",
  measurementId: "G-1FF7YY6RPF",
};

initializeApp(firebaseConfig);

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
