import MainLayout from '../components/layout/MainLayout';
import { useState } from 'react';
import api from '../services/Api';

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
    <MainLayout titulo="SUPORTE"> 
      <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Suporte (ChatGPT)</h1>

      <div style={{ border: '1px solid #ccc', padding: 16, height: 400, overflowY: 'auto', marginBottom: 16 }}>
        {mensagens.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.remetente === 'user' ? 'right' : 'left',
              marginBottom: 10,
              color: msg.remetente === 'user' ? '#555' : '#111',
              fontStyle: msg.remetente === 'bot' ? 'italic' : 'normal',
            }}
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
          style={{ width: '80%', padding: 8 }}
        />
        <button type="submit" disabled={carregando} style={{ padding: 8, marginLeft: 8 }}>
          {carregando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
    </MainLayout>
  );
}


