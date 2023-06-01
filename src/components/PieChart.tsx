import { Chart } from 'react-google-charts';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';

const PieChart = () => {
  const budget = useAppSelector((state) => state.budget);
  const [chartData, setChartData] = useState<(string | number)[][]>([['Expenses', 'Shekels']]);

  // const myData: (string | number)[][] = [['Expenses', 'Shekels']];

  useEffect(() => {
    createChart();
  }, [budget.entries]);

  const createChart = () => {
    const totalExpenses = budget.entries.reduce((acc, entry) => {
      return entry.amount < 0 ? acc + Math.abs(entry.amount) : acc;
    }, 0);

    const data: (string | number)[][] = budget.entries.reduce(
      (acc: (string | number)[][], entry) => {
        if (entry.amount < 0) {
          const existingCategory = acc.find((item) => item[0] === entry.category);
          const absoluteAmount = Math.abs(entry.amount);
          const percentage = ((absoluteAmount / totalExpenses) * 100).toFixed(2);

          if (existingCategory) {
            existingCategory[1] = (existingCategory[1] as number) + absoluteAmount;
            existingCategory[2] = `${existingCategory[2]} (${percentage}%)`;
          } else {
            acc.push([entry.category, absoluteAmount, `${entry.category} (${percentage}%)`]);
          }
        }
        return acc;
      },
      [['Expenses', 'Shekels', 'Percentage']]
    );

    setChartData(data);
  };

  const options = {
    legend: 'none',
    pieSliceText: 'label', // Display the category names
    chartArea: {
      top: 10,
      width: '80%',
      height: '80%',
    },
  };
  return (
    <div className='ChartContainer'>
      <hr style={{ color: 'white', height: '5px' }}></hr>
      <h2 className='ExpensesLabel'>Expenses</h2>
      <Chart chartType='PieChart' data={chartData} options={options} width={'100%'} height={'400px'} className='Pie' />
    </div>
  );
};

export default PieChart;
