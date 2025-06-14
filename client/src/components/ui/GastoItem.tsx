// src/components/ui/GastoItem.tsx
import { Gasto } from '../../pages/TelaGastos/TelaGastos';
import api from '../../services/Api';

interface Props {
  gasto: Gasto;
  onEditar: (gasto: Gasto) => void;
  onDeletar: () => void;
}

export default function GastoItem({ gasto, onEditar, onDeletar }: Props) {
  const handleDelete = async () => {
    if (window.confirm('Deseja excluir este gasto?')) {
      try {
        await api.delete(`/gastos/${gasto.id}`);
        onDeletar();
      } catch (err) {
        alert('Erro ao excluir gasto.');
      }
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: '1rem 0' }}>
      <strong>{gasto.titulo}</strong> — R$ {gasto.valor.toFixed(2)}<br />
      {gasto.tipo} | {new Date(gasto.data).toLocaleDateString()}
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onEditar(gasto)}>Editar</button>
        <button onClick={handleDelete} style={{ marginLeft: 8 }}>Excluir</button>
      </div>
    </div>
  );
}
