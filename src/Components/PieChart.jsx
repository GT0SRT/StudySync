import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Percentage",
        data: [30, 45, 25],
        backgroundColor: ["#f87171", "#60a5fa", "#facc15"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((sum, val) => sum + val, 0);
            const value = dataset.data[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(1);
            return `${percentage}%`;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Pie Chart</h2>
      <div className="w-64 h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
