// src/components/forms/RegisterForm.tsx

import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';
import { useState } from 'react';
import api from '../../services/Api';

export default function RegisterForm() {

  const navigate = useNavigate ();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = async () => {
    setErro('');
    if (!nome || !email || !senha || !nascimento) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const resposta = await api.post('/cadastro', {
        nome,
        email,
        senha,
        nascimento
      });

      localStorage.setItem('token', resposta.data.token);
      navigate('/inicio');
    } catch (err: any) {
      setErro(err.response?.data?.erro || 'Erro ao cadastrar');
    }
  };

  return (
    <>
      <section className={styles.section}>

        <button className={styles.btVoltar} onClick={() => navigate('/')}>Voltar</button>

        <div className={styles.formulario}>
          <input
            type="text"
            className={styles.Nome}
            placeholder="Digite seu nome..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            className={styles.Email}
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.Senha}
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input
            type="date"
            className={styles.DtNascimento}
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />
        </div>

        <div className={styles.linhaFinal}>
          <button className={styles.btCadastrar} onClick={handleCadastro}>CADASTRAR</button>
        </div>

        {erro && <p style={{ color: 'red', marginTop: '1rem' }}>{erro}</p>}
      </section>
    </>
  );
}