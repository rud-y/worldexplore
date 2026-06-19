import { createPortal } from "react-dom";
import { useEffect, useId, useRef } from "react";
import styles from "./Modal.module.css";
import Button from "./Button";

export interface ModalProps {
  isOpen: boolean;
  question: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function Modal({
  isOpen,
  question,
  onConfirm,
  onCancel,
  confirmLabel = "Yes",
  cancelLabel = "No",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const questionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialog.open) dialog.close();
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onClose={onCancel}
      aria-labelledby={questionId}
    >
      <p id={questionId} className={styles.question}>
        {question}
      </p>
      <div className={styles.buttons}>
        <Button type="button" onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button type="button" onClick={onCancel} className={styles.cancelBtn}>
          {cancelLabel}
        </Button>
      </div>
    </dialog>,
    document.body
  );
}
