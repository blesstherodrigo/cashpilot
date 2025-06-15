// src/components/graph//GraficoPorTipo.tsx

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
import './GraficoPorTipo.css'
import { TIPOS_DE_GASTO } from '../../../Types/TiposGasto'

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  dados: { tipo: string; total: number }[];
}

export default function GraficoPorTipo({ dados }: Props) {
  const labels = dados.map(item => item.tipo);
  const valores = dados.map(item => item.total);
  const cores = TIPOS_DE_GASTO.map(item => item.cor);;

  return (
    <div className='sectiongraphtipo'>
      <h3>Gastos por Tipo</h3>
      <Pie
        data={{
          labels,
          datasets: [{
            label: 'Total: R$',
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
