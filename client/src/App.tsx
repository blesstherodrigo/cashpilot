import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaLogin from './pages/TelaLogin'
import TelaRegister from './pages/TelaRegister'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/cadastro" element={<TelaRegister />} />
      </Routes>
    </Router>
  );
}

export default App;