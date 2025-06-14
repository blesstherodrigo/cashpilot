// src/pages/TelaGastos/TelaGastos.tsx

import MainLayout from '../../components/layout/MainLayout';
import './TelaGastos.css';
import { useEffect, useState } from 'react';
import api from '../../services/Api';
import GastoItem from '../../components/ui/GastoItem';
import ModalAddGasto from '../../components/ui/Modals/ModalAddGasto/ModalAddGasto';
import ModalEditGasto from '../../components/ui/Modals/ModalEditGasto/ModalEditGasto';

export interface Gasto {
  id: string;
  titulo: string;
  tipo: string;
  data: string;
  valor: number;
  descricao?: string;
}

export default function TelaGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [gastoEditando, setGastoEditando] = useState<Gasto | null>(null);

  const carregarGastos = async () => {
    try {
      const res = await api.get('/gastos');
      setGastos(res.data.gastos);
    } catch (err) {
      console.error('Erro ao carregar gastos', err);
    }
  };

  const abrirModalNovo = () => {
    setGastoEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (gasto: Gasto) => {
    setGastoEditando(gasto);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setGastoEditando(null);
    carregarGastos(); // Atualiza lista após salvar
  };

  useEffect(() => {
    carregarGastos();
  }, []);

  return (
    <MainLayout titulo="GASTOS">
      <div style={{ marginLeft: '55px', padding: '2rem' }}>
        <h1>Meus Gastos</h1>
        <button onClick={abrirModalNovo}>+ Adicionar Gasto</button>

        {gastos.length === 0 ? (
          <p>Nenhum gasto encontrado.</p>
        ) : (
          gastos.map((gasto) => (
            <GastoItem
              key={gasto.id}
              gasto={gasto}
              onEditar={abrirModalEditar}
              onDeletar={carregarGastos}
            />
          ))
        )}

        {/* Modal de Adicionar */}
        {modalAberto && !gastoEditando && (
          <ModalAddGasto onClose={fecharModal} />
        )}

        {/* Modal de Edidat */}
        {modalAberto && gastoEditando && (
          <ModalEditGasto gasto={gastoEditando} onClose={fecharModal} />
        )}
      </div>
    </MainLayout>
  );
}
