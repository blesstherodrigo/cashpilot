import './SuporteForm.css'
import { useState } from 'react';
import api from '../../../services/Api';

interface Mensagem {
  texto: string;
  remetente: 'user' | 'bot';
}

export default function TelaSuporte() {

  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [pergunta, setPergunta] = useState('');
  const [carregando, setCarregando] = useState(false);

  const enviarPergunta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pergunta.trim()) return;

    const novaMensagem = { texto: pergunta, remetente: 'user' as const };
    setMensagens((prev) => [...prev, novaMensagem]);
    setPergunta('');
    setCarregando(true);

    try {
      const res = await api.post('/perguntar', { pergunta: novaMensagem.texto });
      setMensagens((prev) => [...prev, { texto: res.data.resposta, remetente: 'bot' }]);
    } catch (err) {
      setMensagens((prev) => [...prev, { texto: 'Erro ao obter resposta.', remetente: 'bot' }]);
    } finally {
      setCarregando(false);
    }
  };


  return (
    <div className="tela-suporte-container">
      <div className="mensagens-container">
        {mensagens.map((msg, i) => (
          <div
            key={i}
            className={`mensagem ${msg.remetente}`}
          >
            <strong>{msg.remetente === 'user' ? 'Você:' : 'Suporte:'}</strong> {msg.texto}
          </div>
        ))}
      </div>

      <form onSubmit={enviarPergunta}>
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          disabled={carregando}
          className="input-pergunta"
          />
          <button
            type="submit"
            disabled={carregando}
            className="botao-enviar"
            >
            {carregando ? 'Enviando...' : 'Enviar'}
          </button>
      </form>
        
        <br />
      <div className='Contato'>
        <h4 className='txtContatos'>Ou entre em contato conosco através dos canais abaixo:</h4>
        <p className='ctTelefone'><i className="bi bi-telephone-fill"></i>(11) 12345-6789</p>
        <p className='ctEmail'><i className="bi bi-envelope-fill"></i>cashpilot@email.com</p>
      </div>
      </div>

  );
}

