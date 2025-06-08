import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

export default function Cadastro() {

  const navigate = useNavigate ();

  return (
    <>
      <section className={styles.section}>

        <button className={styles.btVoltar} onClick={() => navigate('/')}>Voltar</button>

        <div className={styles.formulario}>
          <input type="text" className={styles.Nome} placeholder="Digite seu nome..." />
          <input type="text" className={styles.Email} placeholder="exemplo@email.com" />
          <input type="password" className={styles.Senha} placeholder="Digite sua senha" />
          <input type="date" className={styles.DtNascimento} />
          <input type="text" className={styles.CPF} placeholder="Digite seu CPF..." />
        </div>

        <div className={styles.linhaFinal}>
          <label className={styles.caixaCheckbox}>
            <input type="checkbox" className={styles.checkbox} />
            Termos de Uso
          </label>
          <button className={styles.btCadastrar}>CADASTRAR</button>
        </div>

      </section>
    </>
  );
}