// src/components/ui/Modals/ModalDeleteGasto/ModalDeleteGasto.tsx

import React from 'react';

interface ModalConfirmacaoProps {
  isOpen: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export default function ModalDeleteGasto({ isOpen, onCancelar, onConfirmar }: ModalConfirmacaoProps) {
  if (!isOpen) return null;

  return (
    <div className="background">
      <div className="modalExcluirGasto">
        <div className='headerModAddGasto'>Apagar Gasto</div>
        <p className='txtExc'>Tem certeza que deseja excluir este gasto?</p>
        <button className='BtCancelar' onClick={onCancelar}>Cancelar</button>
        <button className='BtAdicionar' onClick={onConfirmar}>Excluir</button>
      </div>
    </div>
  );
} 