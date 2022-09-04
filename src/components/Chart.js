import classesJSON from '../yolo_utils/classes.json';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Charts({ data }) {
  const [labels, setLabels] = useState([]);
  const [countData, setCount] = useState([]);

  useEffect(() => {
    initData();
  }, [data]);

  function initData() {
    const labels = [];
    const countData = [];
    data.forEach(e => {
      labels.push(e[1]);
      countData.push(e[2]);
    });

    setLabels(labels);
    setCount(countData);
  }
  
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Test Chart'
      },
      legend: {
        position: 'top'
      }
    }
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Count',
        data: countData,
        backgroundColor: 'rgba(50, 150, 255)'
      }
    ]
  }

  return <Bar options={options} data={chartData} />
}

export default Charts;
