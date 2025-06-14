// src/components/ui/ModalEditGasto.tsx
import { useState } from 'react';
import api from '../../services/Api';
import { Gasto } from '../../pages/TelaGastos/TelaGastos';

interface Props {
  gasto: Gasto;
  onClose: () => void;
}

export default function ModalEditGasto({ gasto, onClose }: Props) {
  const [titulo, setTitulo] = useState(gasto.titulo);
  const [tipo, setTipo] = useState(gasto.tipo);
  const [data, setData] = useState(gasto.data);
  const [valor, setValor] = useState(gasto.valor);
  const [descricao, setDescricao] = useState(gasto.descricao || '');

  const salvar = async () => {
    try {
      const payload = { titulo, tipo, data, valor: Number(valor), descricao };
      await api.put(`/gastos/${gasto.id}`, payload);
      onClose();
    } catch (err) {
      alert('Erro ao editar gasto.');
    }
  };

  return (
    <div className="background">
      <div className="modalAddGastos">
        <div className="headerModAddGasto">Editar Gasto</div>
        <div className="inputs">
          <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
          <input type="text" placeholder="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} />
          <input type="number" placeholder="Valor (R$)" value={valor} onChange={e => setValor(Number(e.target.value))} />
          <input type="date" value={data} onChange={e => setData(e.target.value)} />
        </div>
        <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <button onClick={onClose} className="BtCancelar">Cancelar</button>
        <button onClick={salvar} className="BtAdicionar">Salvar</button>
      </div>
    </div>
  );
}
