import './App.css';
import Title from './components/Title/Title';
import LoginForm from './components/LoginForm/LoginForm';
import LinkCadastro from './components/Cadastro/Cadastro';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Title />
      <LoginForm />
      <LinkCadastro />
      <Footer />
    </div>
  );
}

export default App;