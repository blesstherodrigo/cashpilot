import Header from '../Header/Header';
import Sidebar from '../../ui/SideBar/SideBar';
import styles from './MainLayout.module.css';

interface Props {
  children: React.ReactNode;
  titulo: string; // <- Adicionamos o título aqui
}

export default function MainLayout({ children, titulo }: Props) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.main}>
        <Header titulo={titulo} /> 
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}