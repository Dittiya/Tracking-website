import { Chart } from 'react-chartjs-2';
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

function Charts({ data, type }) {
  useEffect(() => {
    data.sort(raritySort);
  }, [data]);

  const raritySort = (a, b) => {
    return a[2] - b[2] || a[1].localeCompare(b[1]);
  }
  
  const options = {
    responsive: true,
    scale: {
      x: {
        type: 'category',
        labels: data.map(array => array[1]),
        display: true,
        position: 'bottom'
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Historygram'
      },
      legend: {
        display: false
      }
    }
  }

  const chartData = {
    datasets: [
      {
        label: 'count',
        data: data.map(array => array[3]),
        backgroundColor: data.map(array => {
          if (array[2] === 3) return 'rgba(150, 150, 150, 0.75)';
          else return 'rgba(147, 128, 207, 0.75)';
        })
      }
    ]
  }

  return <Chart type={type} options={options} data={chartData} />
}

export default Charts;
