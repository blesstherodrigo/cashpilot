import './InicioForm.css'
import { useEffect, useState } from 'react';
import api from '../../../services/Api';
import GraficoPorTipo from '../../../components/graph/GraficoPorTipo';
import GraficoPorMes from '../../../components/graph/GraficoPorMes';
import TitleInicio from '../../ui/Titles/TitleInicio/TitleInicio';

export default function TelaInicio() {
  const [porTipo, setPorTipo] = useState<{ tipo: string; total: number }[]>([]);
  const [porMes, setPorMes] = useState<{ mes: string; total: number }[]>([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resTipo, resMes] = await Promise.all([
          api.get('/gastos/por-tipo'),
          api.get('/gastos/por-mes'),
        ]);

        setPorTipo(resTipo.data.gastosPorTipo);
        setPorMes(resMes.data.gastosPorMes);
      } catch (err) {
        console.error('Erro ao carregar gráficos', err);
      }
    };

    carregarDados();
  }, []);

  return (

    <div className='sectionInicio' >
        <TitleInicio/>
      <div className='sectionGraphs' >
        <GraficoPorTipo dados={porTipo} />
        <GraficoPorMes dados={porMes} />
      </div>
    </div>

  );
}