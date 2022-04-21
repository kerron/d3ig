import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useStore } from "./hooks/useStore";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, PolarArea } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const dynamicColors = function () {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Lines of code commited since January",
    },
  },
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "PRs closed since January",
    },
  },
};
const App = observer(() => {
  const { authStore, octokitStore } = useStore();
  const {
    isLoading,
    showLOCChart,
    showPRShart,
    locData,
    prsData,
    queryClosedPRs,
    queryLOC,
  } = octokitStore;
  const { getAuth } = authStore;

  const data = {
    labels: locData.labels,
    datasets: [
      {
        label: "Lines of code",
        data: locData.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: prsData.labels,
    datasets: prsData.datasets.map((v) => {
      const color = dynamicColors();
      return { ...v, borderColor: color, backgroundColor: color };
    }),
  };

  useEffect(() => {
    if (!authStore.hasInstance) {
      getAuth();
    }
  }, [authStore, getAuth]);

  return (
    <Container>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mb={8}
        display="flex"
        justifyContent="center"
      >
        <Button
          sx={{ marginRight: 6 }}
          onClick={() => queryClosedPRs()}
          variant="contained"
        >
          query PRs Closed
        </Button>
        <Button onClick={() => queryLOC()} variant="contained">
          query lines of code
        </Button>
      </Box>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {showPRShart && <Line options={options2} data={data2} />}
      {showLOCChart && <PolarArea options={options} data={data} />}
    </Container>
  );
});

export default App;
