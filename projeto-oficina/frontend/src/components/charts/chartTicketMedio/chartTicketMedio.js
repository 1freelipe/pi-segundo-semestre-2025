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

export default function ChartTicketMedio() {
  const dadosBrutosMeses = [
    { mes: 'Janeiro', faturamento: 22500, totalOS: 50 },
    { mes: 'Fevereiro', faturamento: 25000, totalOS: 55 },
    { mes: 'Março', faturamento: 17000, totalOS: 41 },
    { mes: 'Abril', faturamento: 13000, totalOS: 34 },
    { mes: 'Maio', faturamento: 31000, totalOS: 62 },
    { mes: 'Junho', faturamento: 28000, totalOS: 57 },
  ];

  const labels = dadosBrutosMeses.map((dado) => dado.mes);
  const ticketMedio = dadosBrutosMeses.map((dado) =>
    (dado.faturamento / dado.totalOS).toFixed(2)
  );

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
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Evolução do Ticket Médio Semestral - 2025',
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
        },
        anchor: 'end',
        align: 'top',
        formatter: (value) => `R$ ${value}`,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fffff0',
          font: {
            size: 11,
          },
          minRotation: 40,
          maxRotation: 40,
        },
      },
      y: {
        ticks: {
          color: '#fffff0',
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
        label: 'Ticket Médio (R$)',
        data: ticketMedio,
        backgroundColor: [
          'rgba(147, 7, 7, 0.9)',
          'rgba(196, 26, 26, 0.8)',
          'rgba(245, 32, 32, 0.8)',
        ],
        borderColor: '#fffff0',
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
