import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PieController, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { useAppSelector } from '../redux/hooks';

const PieChart = () => {
  const budget = useAppSelector((state) => state.budget);
  const [options, setOptions] = useState({});

  const [data, setData] = useState<{ labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const createChart = () => {
      const colorPalette: string[] = [];
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
            position: 'bottom',
            labels: {
              color: 'white',
            },
          },
          title: {
            display: false,
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

    ChartJS.register(CategoryScale, LinearScale, PieController, Title, Tooltip, Legend, ArcElement);
    createChart();
  }, [budget.entries]);

  return (
    <>
      {budget.entries.length > 0 && (
        <div className='PieChartContainer'>
          <Pie options={options} data={data} className='PieChart'></Pie>
        </div>
      )}
    </>
  );
};

export default PieChart;
