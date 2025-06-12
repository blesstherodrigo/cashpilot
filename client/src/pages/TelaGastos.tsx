import Title from '../components/ui/TitlePilot';
import MainLayout from '../components/layout/MainLayout';
import '../components/ui/TelaGastos.css';
import ModalGastos from '../components/ui/ModalAddGastos';
import { useState } from 'react';
import ModalConfirmacao from '../components/ui/ModalConfirmação';

type Gasto = {
  id: number;
  nome: string;
  tipo: string;
  preco: number;
  data: string;
  descricao: string;
};

export default function TelaGastos() {
  const [openModal, setOpenModal] = useState(false);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [gastoEditando, setGastoEditando] = useState<Gasto | null>(null);

  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);/////
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);////


  const adicionarOuEditarGasto = (gasto: Gasto) => {
    if (gastoEditando) {
      // Editando
      setGastos(prev =>
        prev.map(g => (g.id === gasto.id ? gasto : g))
      );
    } else {
      // Adicionando
      setGastos(prev => [...prev, { ...gasto, id: Date.now() }]);
    }
    setGastoEditando(null);
    setOpenModal(false);
  };

  const excluirGasto = (id: number) => {
    setGastos(prev => prev.filter(g => g.id !== id));
  };

  const editarGasto = (gasto: Gasto) => {
    setGastoEditando(gasto);
    setOpenModal(true);
  };

return (
  <MainLayout titulo="GASTOS">
    <>
      <button
        className='AddGasto'
        onClick={() => {
          setOpenModal(true);
          setGastoEditando(null);
        }}
      >
        ADD GASTO
      </button>

      {/* ✅ Modal de adicionar/editar gastos */}
      <ModalGastos
        isOpen={openModal}
        setModalOpen={() => setOpenModal(false)}
        onSubmit={adicionarOuEditarGasto}
        gastoEditando={gastoEditando}
        isEditando={!!gastoEditando} //////
      />

      {/* ✅ Novo modal de confirmação de exclusão */}
      <ModalConfirmacao
        isOpen={modalConfirmacaoAberto}
        onCancelar={() => {
          setModalConfirmacaoAberto(false);
          setIdParaExcluir(null);
        }}
        onConfirmar={() => {
          if (idParaExcluir !== null) excluirGasto(idParaExcluir);
          setModalConfirmacaoAberto(false);
          setIdParaExcluir(null);
        }}
      />

      {/* ✅ Lista de gastos */}
      <div className="gastosContainer">
        {gastos.map(gasto => (
          <div
            key={gasto.id}
            className="gastoItem"
            style={{ backgroundColor: getCorPorTipo(gasto.tipo) }}
          >
            <strong>{gasto.tipo}:</strong> - R$ {gasto.preco}
            <span>Data: {gasto.data}</span>
            <div className="gastoButtons">
              <button onClick={() => editarGasto(gasto)}>✏️</button>
              <button onClick={() => {
                setIdParaExcluir(gasto.id);
                setModalConfirmacaoAberto(true);
              }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </>
  </MainLayout>
);

}

function getCorPorTipo(tipo: string) {
  switch (tipo.toLowerCase()) {
    case 'moradia': return '#f6d4f7';
    case 'transporte': return '#fef2cf';
    case 'alimentação': return '#d3f0ff';
    default: return '#f0f0f0';
  }
}