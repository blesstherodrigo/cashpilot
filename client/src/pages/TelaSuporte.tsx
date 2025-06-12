import MainLayout from '../components/layout/MainLayout';

export default function TelaSuporte() {
  return (
    <MainLayout titulo="SUPORTE"> 
        <h1 className='TitleSuporte'>Chat GPT</h1>
        <label className='subt' htmlFor="">Tem alguma dúvida ou quer aprender algo novo sobre Como administrar seu dinheiro? Pergunte aqui abaixo!</label>
        <br />

        <textarea name="pergunta" className='cxPergunta' id="1" placeholder='Escreva aqui' style={{width:'40rem', height:'15rem', marginTop:'30px'}}></textarea>
        <br />
        <textarea name="resposta" className='cxResposta' id="2" placeholder='Aqui aparecerá a resposta da sua pergunta' style={{width:'40rem', height:'15rem', marginTop:'40px'}}></textarea>
        
    </MainLayout>
  );
}


