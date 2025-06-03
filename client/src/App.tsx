import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaLogin from './pages/TelaLogin'
import TelaRegister from './pages/TelaRegister'; 
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/cadastro" element={<TelaRegister />} />
      </Routes>

      {/* Footer fixo em todas as páginas */}
      <Footer />
    </Router>
  );
}

export default App;