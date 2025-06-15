// src/components/ui/ModalAddGasto/ModalAddGasto.tsx

import './ModalAddGasto.css'; 
import { useState } from 'react';
import api from '../../../../services/Api';
import { TIPOS_DE_GASTO } from '../../../../Types/TiposGasto';

interface Props {
  onClose: () => void;
}

export default function ModalAddGasto({ onClose }: Props) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState(TIPOS_DE_GASTO[0].label);
  const [data, setData] = useState('');
  const [valor, setValor] = useState(''); // agora é string
  const [descricao, setDescricao] = useState('');

  const salvar = async () => {
    try {
      const payload = {
        titulo,
        tipo,
        data,
        valor: Number(valor), // conversão aqui
        descricao,
      };
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
          <input
            className="Nome"
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />

          <select
            className="Tipo"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          >
            {TIPOS_DE_GASTO.map((tipoItem) => (
              <option key={tipoItem.label} value={tipoItem.label}>
                {tipoItem.label}
              </option>
            ))}
          </select>

          <input
            className="Preco"
            type="number"
            placeholder="Valor (R$)"
            value={valor}
            onChange={e => setValor(e.target.value)}
          />

          <input
            className="Data"
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
          />
        </div>

        <textarea
          className="Descricao"
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <button onClick={onClose} className="BtCancelar">Cancelar</button>
        <button onClick={salvar} className="BtAdicionar">Adicionar</button>
      </div>
    </div>
  );
}

