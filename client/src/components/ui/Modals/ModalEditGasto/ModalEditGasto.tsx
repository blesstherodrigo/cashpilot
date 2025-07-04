// src/components/ui/ModalEditGasto/ModalEditGasto.tsx

import './ModalEditGasto.css';
import { useState } from 'react';
import api from '../../../../services/Api';
import { Gasto } from '../../../forms/GastoForm/GastoForm';
import { TIPOS_DE_GASTO } from '../../../../Types/TiposGasto';

interface Props {
  gasto: Gasto;
  onClose: () => void;
}

export default function ModalEditGasto({ gasto, onClose }: Props) {
  const [titulo, setTitulo] = useState(gasto.titulo);
  const [tipo, setTipo] = useState(gasto.tipo);
  const [data, setData] = useState(gasto.data);
  const [valor, setValor] = useState(gasto.valor.toString()); // convertido pra string
  const [descricao, setDescricao] = useState(gasto.descricao || '');

  const salvar = async () => {
    try {
      const payload = {
        titulo,
        tipo,
        data,
        valor: Number(valor), // conversão aqui
        descricao,
      };
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
        <button onClick={salvar} className="BtAdicionar">Salvar</button>
      </div>
    </div>
  );
}

