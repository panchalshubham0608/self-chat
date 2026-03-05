import styles from "./Toast.module.css";

interface Props {
    message: string;
    visible: boolean;
}

export default function Toast({ message, visible }: Props) {
    if (!visible) return null;

    return (
        <div className={styles.toastContainer}>
            <div className={styles.toast}>
                {message}
            </div>
        </div>
    );
}