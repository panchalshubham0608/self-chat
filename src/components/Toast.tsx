import styles from "./Toast.module.css";

export type ToastType = "info" | "success" | "error";
interface Props {
    message: string;
    type?: ToastType;
    visible: boolean;
}

const getStyles = (type?: ToastType) => {
    if (type === "success") return styles.success;
    if (type === "error") return styles.error;
    return styles.info;
}

export default function Toast({ message, type = "info", visible }: Props) {
    if (!visible) return null;


    return (
        <div className={styles.toastContainer}>
            <div className={`${styles.toast} ${getStyles(type)}`}>
                {message}
            </div>
        </div >
    );
}