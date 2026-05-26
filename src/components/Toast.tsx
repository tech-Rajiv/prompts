import styles from './Toast.module.css';

interface Props {
  visible: boolean;
  message: string;
  color?: string;
}

export default function Toast({ visible, message, color }: Props) {
  return (
    <div
      className={`${styles.toast} ${visible ? styles.show : ''}`}
      style={color ? { background: color } : undefined}
    >
      {message}
    </div>
  );
}
