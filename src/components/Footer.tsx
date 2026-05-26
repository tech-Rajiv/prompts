import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        © 2025 <span className={styles.brand}>PromptForYou</span> — All prompts are community contributed.
      </div>
      <div className={styles.links}>
        <a href="#home">Home</a>
        <a href="#trending">Filters</a>
        <a href="#youtube">YT Thumbnails</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
}
