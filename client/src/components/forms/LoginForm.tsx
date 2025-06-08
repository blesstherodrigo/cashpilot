import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm() {

  const navigate = useNavigate();

    return (
      <>
        <section className="section">
      <input type="text" className="Email" placeholder="Email" />
      <br />
      <input type="password" className="Senha" placeholder="Senha" />
      <br />
      <button className="entrar"  onClick={() => navigate('/inicio')}>Entrar</button>
    </section>
      <a href="/cadastro" className="linkregister">Criar Conta</a>
      </>
    );
}

