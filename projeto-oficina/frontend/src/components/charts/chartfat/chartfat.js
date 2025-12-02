import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function Chartfat() {
  const dadosBrutosMeses = [
    { mes: 'Janeiro', faturamento: 22500 },
    { mes: 'Fevereiro', faturamento: 25000 },
    { mes: 'Março', faturamento: 17000 },
    { mes: 'Abril', faturamento: 13000 },
    { mes: 'Maio', faturamento: 31000 },
    { mes: 'Junho', faturamento: 28000 },
  ];

  const labels = dadosBrutosMeses.map((dado) => dado.mes);
  const valor = dadosBrutosMeses.map((dado) => dado.faturamento.toFixed(2));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#252525',
          font: {
            weight: 'bold',
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Faturamento Anual - 2025',
        color: '#252525',
        font: {
          size: 15,
        },
      },
      datalabels: {
        display: true,
        color: '#252525',
        font: {
          size: 14,
        },
        anchor: 'end',
        align: 'top',
        formatter: (value) => `R$ ${value}`,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#252525',
          font: {
            size: 11,
          },
          minRotation: 40,
          maxRotation: 40,
        },
      },
      y: {
        ticks: {
          color: '#252525',
          callback(value) {
            return `R$ ${value}`;
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Faturamento Mensal',
        data: valor,
        backgroundColor: 'rgba(147, 7, 7, 0.9)',
        borderColor: '#252525',
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
