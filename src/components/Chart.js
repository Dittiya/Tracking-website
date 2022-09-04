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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Charts({ data }) {
  
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

  return <Bar options={options} data={chartData} />
}

export default Charts;
