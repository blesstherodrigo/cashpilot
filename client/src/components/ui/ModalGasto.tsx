// src/components/ModalGasto.tsx
import { useState } from 'react';
import api from '../../services/Api';
import { Gasto } from '../../pages/TelaGastos';


interface Props {
  gasto: Gasto | null;
  onClose: () => void;
}

export default function ModalGasto({ gasto, onClose }: Props) {
  const [titulo, setTitulo] = useState(gasto?.titulo || '');
  const [tipo, setTipo] = useState(gasto?.tipo || '');
  const [data, setData] = useState(gasto?.data || '');
  const [valor, setValor] = useState(gasto?.valor || 0);
  const [descricao, setDescricao] = useState(gasto?.descricao || '');

  const salvar = async () => {
    try {
      const payload = { titulo, tipo, data, valor: Number(valor), descricao };

      if (gasto) {
        await api.put(`/gastos/${gasto.id}`, payload);
      } else {
        await api.post('/gastos', payload);
      }

      onClose();
    } catch (err) {
      alert('Erro ao salvar gasto.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 8, width: 300 }}>
        <h3>{gasto ? 'Editar Gasto' : 'Novo Gasto'}</h3>
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <input placeholder="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} />
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <input type="number" placeholder="Valor" value={valor} onChange={e => setValor(Number(e.target.value))} />
        <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <div style={{ marginTop: 10 }}>
          <button onClick={salvar}>Salvar</button>
          <button onClick={onClose} style={{ marginLeft: 10 }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
