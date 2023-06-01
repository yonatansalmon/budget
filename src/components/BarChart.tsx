import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { useAppSelector } from '../redux/hooks';

const BarChart = () => {
  const budget = useAppSelector((state) => state.budget);
  const [options, setOptions] = useState({});

  const [data, setData] = useState<{ labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    createChart();
  }, []);

  const createChart = () => {
    const colorPalette: string[] = []; // Array to store colors
    const categories: { [key: string]: number } = {};
    budget.entries.forEach((entry) => {
      if (entry.amount < 0) {
        if (categories.hasOwnProperty(entry.category)) {
          categories[entry.category] += entry.amount * -1;
        } else {
          categories[entry.category] = entry.amount * -1;
          colorPalette.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);
        }
      }
    });
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        title: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.5)',
            // Set color for the x-axis grid lines
          },
          ticks: {
            color: 'white', // Set color for the x-axis labels
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.5)', // Set color for the y-axis grid lines
          },
          ticks: {
            color: 'white', // Set color for the x-axis labels
          },
        },
      },
    };

    const labels = Object.keys(categories);
    const data = {
      labels,
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: colorPalette,
        },
      ],
    };
    setData(data);
    setOptions(options);
  };

  return  <div className="BarCharContainer"> <Bar options={options} data={data} className='BarChar'></Bar></div>
};

export default BarChart;
