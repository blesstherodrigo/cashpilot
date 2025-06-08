import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaLogin from './pages/TelaLogin'
import TelaRegister from './pages/TelaRegister'; 
import TelaInicio from './pages/TelaInicio';
import TelaProfile from './pages/TelaProfile';
import TelaGastos from './pages/TelaGastos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/cadastro" element={<TelaRegister />} />
        <Route path="/inicio" element={<TelaInicio />} />
        <Route path="/perfil" element={<TelaProfile />} />
        <Route path="/gastos" element={<TelaGastos />} />
      </Routes>
    </Router>
  );
}

export default App;