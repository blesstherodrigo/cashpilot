// src/components/forms/LoginForm.tsx

import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useState } from 'react';
import api from '../../../services/Api'


export default function LoginForm() {

  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handlePassword =() => setIsShow(!isShow);

  const handleLogin = async () => {
    setErro('');
    try {
      const resposta = await api.post('/login', { email, senha });
      localStorage.setItem('token', resposta.data.token);
      navigate('/inicio');
    } catch (err: any) {
      setErro(err.response?.data?.erro || 'Erro ao fazer login');
    }
  };

  return (
    <>
      <section className="section">
        <input 
          type="text"
          className="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
      <div className='SectSenha'>
        <input type={isShow ? "text" : "password"}
          className="Senha"
          placeholder="Senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button className='EsconderSenha' type="button" onClick={handlePassword}>
          {isShow && <Eye size={18} />}
          {!isShow && <EyeOff size={18} />}
        </button>
      </div>
      <br />
      <button className="entrar"  onClick={handleLogin}>Entrar</button>
      </section>
      {erro && <p className="erro">{erro}</p>}

      <p className='txtCad'>
        Não tem uma Conta?{''} 
        <a href="/cadastro" className="linkregister"> Cadastre-se</a>
      </p>
    </>
    );
}
