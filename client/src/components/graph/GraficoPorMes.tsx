// src/components/graph/GraficoPorMes.tsx

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  dados: { mes: string; total: number }[];
}

export default function GraficoPorMes({ dados }: Props) {
  const labels = dados.map(item => item.mes);
  const valores = dados.map(item => item.total);

  return (
    <div style={{ maxWidth: 600 }}>
      <h3>Gastos por Mês</h3>
      <Bar
        data={{
          labels,
          datasets: [{
            label: 'Total em R$',
            data: valores,
            backgroundColor: '#3498db',
          }],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: { display: false }
          }
        }}
      />
    </div>
  );
}
