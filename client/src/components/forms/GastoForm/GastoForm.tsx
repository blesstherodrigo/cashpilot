// src/components/forms/GastoForm/GastoForm.tsx

import { useEffect, useState } from 'react';
import api from '../../../services/Api';
import GastoItem from '../../../components/ui/GastoItem';
import ModalAddGasto from '../../../components/ui/Modals/ModalAddGasto/ModalAddGasto';
import ModalEditGasto from '../../../components/ui/Modals/ModalEditGasto/ModalEditGasto';
import ModalDeleteGasto from '../../../components/ui/Modals/ModalDeleteGasto/ModalDeleteGasto';
import './GastoForm.css';
import TitleGasto from '../../ui/Titles/TitleGasto/TitleGasto';

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
  const [gastoDeletando, setGastoDeletando] = useState<Gasto | null>(null);

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
    carregarGastos();
  };

  const abrirModalExcluir = (gasto: Gasto) => {
    setGastoDeletando(gasto);
  };

  const cancelarExclusao = () => {
    setGastoDeletando(null);
  };

  const confirmarExclusao = async () => {
    try {
      if (gastoDeletando) {
        await api.delete(`/gastos/${gastoDeletando.id}`);
        setGastoDeletando(null);
        carregarGastos();
      }
    } catch (err) {
      alert('Erro ao excluir gasto.');
    }
  };

  useEffect(() => {
    carregarGastos();
  }, []);

  return (
        <div className='sectiongastos'>
          <TitleGasto/>
          <button className='add-gasto' onClick={abrirModalNovo}>Adicionar</button>
  
          {gastos.length === 0 ? (
            <p className='nenhum-gasto'>Nenhum gasto encontrado.</p>
          ) : (
            gastos.map((gasto) => (
              <GastoItem
                key={gasto.id}
                gasto={gasto}
                onEditar={abrirModalEditar}
                onExcluir={abrirModalExcluir}
              />
            ))
          )}
  
          {modalAberto && !gastoEditando && (
            <ModalAddGasto onClose={fecharModal} />
          )}
  
          {modalAberto && gastoEditando && (
            <ModalEditGasto gasto={gastoEditando} onClose={fecharModal} />
          )}
  
          {gastoDeletando && (
            <ModalDeleteGasto
              isOpen={true}
              onCancelar={cancelarExclusao}
              onConfirmar={confirmarExclusao}
            />
          )}
        </div>
    );
  }