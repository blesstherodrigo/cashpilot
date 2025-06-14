// src/components/ui/ModalAddGasto.tsx
import { useState } from 'react';
import api from '../../../../services/Api';

interface Props {
  onClose: () => void;
}

export default function ModalAddGasto({ onClose }: Props) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState('');

  const salvar = async () => {
    try {
      const payload = { titulo, tipo, data, valor: Number(valor), descricao };
      await api.post('/gastos', payload);
      onClose();
    } catch (err) {
      alert('Erro ao adicionar gasto.');
    }
  };

  return (
    <div className="background">
      <div className="modalAddGastos">
        <div className="headerModAddGasto">Adicionar Gasto</div>
        <div className="inputs">
          <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
          <input type="text" placeholder="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} />
          <input type="number" placeholder="Valor (R$)" value={valor} onChange={e => setValor(Number(e.target.value))} />
          <input type="date" value={data} onChange={e => setData(e.target.value)} />
        </div>
        <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <button onClick={onClose} className="BtCancelar">Cancelar</button>
        <button onClick={salvar} className="BtAdicionar">Adicionar</button>
      </div>
    </div>
  );
}
