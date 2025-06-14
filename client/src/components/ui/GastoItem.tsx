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
        <strong>{gasto.titulo}</strong> — R$ {gasto.valor.toFixed(2)}<br />
        {gasto.tipo} | {new Date(gasto.data).toLocaleDateString()}
      </div>
      <div className="gastoButtons">
        <button onClick={() => onEditar(gasto)}>Editar</button>
        <button onClick={() => onExcluir(gasto)}>Excluir</button> {/* ✅ aqui */}
      </div>
    </div>
  );
}