// components/graph/TipoChart.tsx

import { Pie } from 'react-chartjs-2';

interface Props {
  dados: { tipo: string; total: number }[];
}

export const TipoChart = ({ dados }: Props) => {
  const cores = ['#f39c12', '#3498db', '#2ecc71', '#9b59b6'];

  return (
    <Pie
      data={{
        labels: dados.map(d => d.tipo),
        datasets: [
          {
            data: dados.map(d => d.total),
            backgroundColor: cores,
          },
        ],
      }}
    />
  );
};
