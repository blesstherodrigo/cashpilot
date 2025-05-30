import './LoginForm.css';

function LoginForm() {
  return (
    <section className="section">
      <input type="text" className="Email" placeholder="Email" />
      <br />
      <input type="password" className="Senha" placeholder="Senha" />
      <br />
      <button className="entrar">Entrar</button>
    </section>
  );
}

export default LoginForm;