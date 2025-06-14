// src/components/forms/ProfileForm.tsx

import './ProfileForm.css'
import { useEffect, useState } from 'react';
import api from '../../../services/Api';

export default function ProfileForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const carregarPerfil = async () => {
    try {
      const res = await api.get('/perfil');
      setNome(res.data.nome);
      setEmail(res.data.email);
      setNascimento(res.data.nascimento);
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
    }
  };

  const salvar = async () => {
    try {
      const res = await api.put('/perfil', { nome, email });
      setMensagem(res.data.mensagem || 'Perfil atualizado com sucesso!');
      setEditando(false);
    } catch (err: any) {
      setMensagem(err.response?.data?.erro || 'Erro ao atualizar perfil');
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

  return (
  <div className="profile-container">
    <h2>Perfil do Usuário</h2>
    
    <div className='PerfilIcon'>
      <div className='iconePerf'><i className="bi bi-person-fill"></i></div>
    </div>

    <label>Nome</label>
    <input
      type="text"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      disabled={!editando}
    />

    <br />

    <label>Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={!editando}
    />
    <br />
    <label>Nascimento</label>
    <input
      type="text"
      value={new Date(nascimento).toLocaleDateString()}
      disabled
    />

    <div className="botoes-container">
      {editando ? (
        <>
          <button onClick={salvar}>Salvar</button>
          <button className="botao-cancelar" onClick={() => setEditando(false)}>
            Cancelar
          </button>
        </>
      ) : (
        <button className='botaoEditarPerfil' onClick={() => setEditando(true)}>Editar</button>
      )}
    </div>

    {mensagem && <p className="mensagem-feedback">{mensagem}</p>}
  </div>
);
}
