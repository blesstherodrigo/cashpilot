import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  setModalOpen: () => void;
  onSubmit: (gasto: any) => void;
  gastoEditando?: any;
  isEditando: boolean; //nova prop
}

export default function ModalGastos({ isOpen, setModalOpen, onSubmit, gastoEditando, isEditando }: ModalProps) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [preco, setPreco] = useState(0);
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (gastoEditando) {
      setNome(gastoEditando.nome);
      setTipo(gastoEditando.tipo);
      setPreco(gastoEditando.preco);
      setData(gastoEditando.data);
      setDescricao(gastoEditando.descricao);
    } else {
      setNome('');
      setTipo('');
      setPreco(0);
      setData('');
      setDescricao('');
    }
  }, [gastoEditando]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const gasto = {
      id: gastoEditando?.id || Date.now(),
      nome,
      tipo,
      preco,
      data,
      descricao
    };
    onSubmit(gasto);
  };

  return (
    <div className="background">
      <div className="modalAddGastos">
        <div className='headerModAddGasto'>
          {isEditando ? 'Editar Gasto' : 'Adicionar Gasto'}
        </div>
        <div className='inputs'>
          <input type="text" className='Nome' placeholder='Nome...' value={nome} onChange={e => setNome(e.target.value)} />
          <input type="text" className='Tipo' placeholder='Tipo...' value={tipo} onChange={e => setTipo(e.target.value)} />
          <input type="number" className='Preco' placeholder='Valor(R$)' value={preco} onChange={e => setPreco(Number(e.target.value))} />
          <input type="date" value={data} className='Data' onChange={e => setData(e.target.value)} />
        </div>
        <input type="text" className='Descricao' placeholder='Descrição...' value={descricao} onChange={e => setDescricao(e.target.value)} />

        <button onClick={setModalOpen} className='BtCancelar'>Cancelar</button>
        <button onClick={handleSubmit} className='BtAdicionar'>Adicionar</button>
      </div>
    </div>
  );
}