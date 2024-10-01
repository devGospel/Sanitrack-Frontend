import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useStats from '@/hooks/useStats';
// import useTask from 'Hooks/useTask';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressBar({ stats }) {
  const { getFacilityOverallCleaning, facilityOverallCleaning } = useStats();

  useEffect(() => {
    getFacilityOverallCleaning();
  }, []);
  console.log('likfnjf', Object.values(facilityOverallCleaning), facilityOverallCleaning);
  const data = {
    datasets: [
      {
        label: Object.values(facilityOverallCleaning)[0]?.facilityNames[0],
        data: Object.values(facilityOverallCleaning).map(item => item?.percentage),
        backgroundColor: ['#FF471A', '#F3A81F', '#D4E725', '#7ADA2C'],
        borderWidth: 1
      }
    ],
    labels: Object.keys(facilityOverallCleaning)
  };
  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Overall System Performance',
        position: 'left'
      }
    }
  };

  const totalPercentage = Object.values(facilityOverallCleaning).reduce((acc, item) => acc + item.percentage, 0);

  const averagePercentage =
    Object.values(facilityOverallCleaning).length === 0 ? 0 : totalPercentage / Object.values(facilityOverallCleaning).length;
  return (
    <div className="relative">
      <Doughnut data={data} options={options} height={80} />;
      <span className="absolute top-[57%] bottom-[50%] font-bold left-[41%]  text-2xl text-blue-500">{`${averagePercentage}%`}</span>
    </div>
  );
}
