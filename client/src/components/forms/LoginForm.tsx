import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { AlignJustify, Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useState } from 'react';



export default function LoginForm() {

  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const handlePassword =() => setIsShow(!isShow);

    return (
      <>
        <section className="section">
      <input type="text" className="Email" placeholder="Email" />
      <br />
      <div className='SectSenha'>
        <input type={isShow ? "text" : "password"} className="Senha" placeholder="Senha" />
        <button className='EsconderSenha' onClick={handlePassword}>

          {isShow && <EyeOff size={18} />}
          {!isShow && <Eye size={18} />}
        </button>
      </div>
      <br />
      <button className="entrar"  onClick={() => navigate('/inicio')}>Entrar</button>
    </section>
      <p className='txtCad'>Não tem uma Conta? <a href="/cadastro" className="linkregister"> Cadastre-se</a></p>
      </>
    );
}

