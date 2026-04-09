import ReactDom from 'react-dom';
import styles from './Modal.module.scss';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  // We use createPortal to render the modal at the end of <body> 
  // to avoid z-index or parent styling issues
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('root')!
  );
};

export default Modal;