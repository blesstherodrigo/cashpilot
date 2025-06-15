import styles from './Header.module.css';

interface HeaderProps {
  titulo: string;
}

export default function Header({ titulo }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>{titulo}</h1>
    </header>
  );
}