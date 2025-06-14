// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaLogin from './pages/TelaLogin/TelaLogin';
import TelaRegister from './pages/TelaRegister/TelaRegister'; 
import TelaInicio from './pages/TelaInicio/TelaInicio';
import TelaProfile from './pages/TelaProfile/TelaProfile';
import TelaGastos from './pages/TelaGastos/TelaGastos';
import TelaSuporte from './pages/TelaSuporte/TelaSuporte';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/cadastro" element={<TelaRegister />} />
        <Route path="/inicio" element={<TelaInicio />} />
        <Route path="/perfil" element={<TelaProfile />} />
        <Route path="/gastos" element={<TelaGastos />} />
        <Route path="/suporte" element={<TelaSuporte />} />
      </Routes>
    </Router>
  );
}

export default App;