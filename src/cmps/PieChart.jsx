import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart({ pieData }) {
  if (!pieData) return <h1>loading</h1>
  const data = {
    labels: Object.keys(pieData),
    datasets: [
      {
        label: '# of toys',
        data: Object.values(pieData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };



  return (
    <div >
      <h2 style={{textAlign:'center'}}>toys by label</h2>
      <div style={{ height: 300 + 'px', width: 300 + 'px' }}>
        <Pie data={data} />
      </div>
    </div>
  )
}