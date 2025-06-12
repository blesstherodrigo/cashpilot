// src/components/forms/ProfileForm.tsx
import { useEffect, useState } from 'react';
import api from '../../services/Api';

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
    <div style={{ maxWidth: 400 }}>
      <h2>Perfil do Usuário</h2>

      <label>Nome</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={!editando}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!editando}
      />

      <label>Nascimento</label>
      <input
        type="text"
        value={new Date(nascimento).toLocaleDateString()}
        disabled
      />

      <div style={{ marginTop: 12 }}>
        {editando ? (
          <>
            <button onClick={salvar}>Salvar</button>
            <button onClick={() => setEditando(false)} style={{ marginLeft: 8 }}>
              Cancelar
            </button>
          </>
        ) : (
          <button onClick={() => setEditando(true)}>Editar</button>
        )}
      </div>

      {mensagem && <p style={{ marginTop: 10, color: 'green' }}>{mensagem}</p>}
    </div>
  );
}
