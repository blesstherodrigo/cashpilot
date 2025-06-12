// src/components/graph/GraficoPorTipo.tsx

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  dados: { tipo: string; total: number }[];
}

export default function GraficoPorTipo({ dados }: Props) {
  const labels = dados.map(item => item.tipo);
  const valores = dados.map(item => item.total);
  const cores = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12'];

  return (
    <div style={{ maxWidth: 500 }}>
      <h3>Gastos por Tipo</h3>
      <Pie
        data={{
          labels,
          datasets: [{
            data: valores,
            backgroundColor: cores,
          }],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
          },
        }}
      />
    </div>
  );
}
