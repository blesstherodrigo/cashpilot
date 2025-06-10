import React from 'react';

interface ModalProps {
  isOpen: boolean;
  setModalOpen: () => void;
  children: React.ReactNode;
}

export default function ModalGastos({ isOpen, setModalOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="background">
      <div className="modalAddGastos">
        <div>{children}</div>
        <div className='headerModAddGasto'>Adicionar Gasto
        </div>
        <div className='inputs'>
            <input type="text" className='Nome' placeholder='Nome...'/>
            <input type="text" className='Tipo' placeholder='Alimentação'/>
            <input type="number" className='Preco' placeholder='R$00,00'/>
            <input type="date" className='Data' />
        </div>
            <input type="text" className='Descricao' placeholder='Descrição...'/>

        <div></div>

        <button onClick={setModalOpen} className='BtCancelar'>Cancelar</button>
        <button className='BtAdicionar'>Adicionar</button>
      </div>
    </div>
  );
}