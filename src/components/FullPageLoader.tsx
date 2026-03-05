import styles from "./FullPageLoader.module.css";

interface Props {
    visible: boolean;
}

export default function FullPageLoader({ visible }: Props) {
    if (!visible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.loader}></div>
        </div>
    );
}