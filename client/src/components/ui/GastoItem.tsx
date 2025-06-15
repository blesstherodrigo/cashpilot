// src/components/ui/GastoItem.tsx

import { Gasto } from '../../components/forms/GastoForm/GastoForm';

interface Props {
  gasto: Gasto;
  onEditar: (gasto: Gasto) => void;
  onExcluir: (gasto: Gasto) => void;
}

export default function GastoItem({ gasto, onEditar, onExcluir }: Props) {
  return (
    <div className="gastoItem">
      <div>
        <strong>{gasto.titulo}</strong> <br/>R$ {gasto.valor.toFixed(2)}<br/>
        {gasto.tipo} | {new Date(gasto.data).toLocaleDateString()}
      </div>
      <div className="gastoButtons">
        <button className='editarGasto' onClick={() => onEditar(gasto)}><i className="bi bi-pencil-fill"></i></button>
        <button className='excluirGasto' onClick={() => onExcluir(gasto)}><i className="bi bi-trash3-fill"></i></button>
      </div>
    </div>
  );
}