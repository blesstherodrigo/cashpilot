import Header from './Header';
import Sidebar from '../ui/Sidebar';
import styles from './MainLayout.module.css';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.main}>
        <Header /> 
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}