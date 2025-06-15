// src/components/forms/RegisterForm.tsx

import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';
import { useState } from 'react';
import api from '../../../services/Api';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

export default function RegisterForm() {

  const navigate = useNavigate ();
  const [isShow, setIsShow] = useState(false);
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

  const handlePassword =() => setIsShow(!isShow);

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
          <div className='SectSenhaRegister'>
            <input
              type={isShow ? "text" : "password"}
              className={styles.Senha}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button className={styles.EsconderSenhaRegister} type='button' onClick={handlePassword}>
              {isShow && <Eye size={18} />}
              {!isShow && <EyeOff size={18} />}
            </button>
          </div>
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

        {erro && <p className={styles.AvisoPreenchimento}>{erro}</p>}
      </section>
    </>
  );
}