import styles from "./ConfirmDialog.module.css";

interface Props {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}: Props) {
    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.message}>{message}</p>

                <div className={styles.actions}>
                    <button className={styles.cancelBtn} onClick={onCancel}>
                        {cancelText}
                    </button>

                    <button className={styles.confirmBtn} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}