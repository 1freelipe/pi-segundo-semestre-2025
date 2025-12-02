import React from 'react';

import { Pie } from 'react-chartjs-2';
import { Chart as Chartjs, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chartjs.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export default function ChartServicos() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fffff0',
          font: {
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Faturamento por serviço',
        color: '#fffff0',
        font: {
          size: 15,
        },
      },
      datalabels: {
        display: true,
        color: '#fffff0',
        font: {
          size: 14,
          weight: 'bold',
        },
        anchor: 'top',
        align: 'center',
        formatter: (value) => `${value}%`,
      },
    },
  };

  const labels = ['Troca de Óleo', 'Revisão', 'Motor', 'Troca de Pneus'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Faturamento Percentual',
        data: [50, 25, 14, 11],
        backgroundColor: ['#930707', '#bb2b2bff', '#cf4c4cff', '#da1515ff'],
        borderColor: '#fffff0',
        borderWidth: 2,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}
