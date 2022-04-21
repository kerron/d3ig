import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};
const labels = ["January", "February"];

const App = observer(() => {
  const { authStore, octokitStore } = useStore();
  const {
    showLOCChart,
    showPRShart,
    locData,
    prsData,
    queryClosedPRs,
    queryLOC,
  } = octokitStore;
  const { getAuth, getOrg } = authStore;

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
    datasets: prsData.data.map((d) => d),
  };

  useEffect(() => {
    if (!authStore.hasInstance) {
      getAuth();
    }
  }, [authStore, getAuth]);

  return (
    <Container>
      <Box component="form" noValidate autoComplete="off">
        <Button onClick={() => getOrg()} variant="contained">
          getOrgs
        </Button>
        <Button onClick={() => queryClosedPRs()} variant="contained">
          query closed PRs
        </Button>
        <Button onClick={() => queryLOC()} variant="contained">
          query lines of code
        </Button>
      </Box>
      {showLOCChart && <PolarArea options={options} data={data} />}
      {showPRShart && <Line options={options} data={data2} />}
    </Container>
  );
});

export default App;
