import styles from "./ChatHeader.module.css";
import Logo from "../../assets/logo.png";

interface Props {
    selectionMode: boolean;
    selectedCount: number;
    onExitSelection: () => void;
    onCopy: () => void;
    onDelete: () => void;
    onLogout: () => void;
}

export default function ChatHeader({
    selectionMode,
    selectedCount,
    onExitSelection,
    onCopy,
    onDelete,
    onLogout,
}: Props) {
    if (selectionMode) {
        return (
            <header className={styles.header}>
                <button className={styles.iconBtn} onClick={onExitSelection}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <span className={styles.selectionCount}>
                    {selectedCount} selected
                </span>

                <div className={styles.actions}>
                    <button className={styles.iconBtn} onClick={onCopy}>
                        <span className="material-symbols-outlined">content_copy</span>
                    </button>
                    <button className={styles.iconBtn} onClick={onDelete}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <img src={Logo} alt="logo" className={styles.logo} />
                <span>Self Chat</span>
            </div>
            <button className={styles.iconBtn} onClick={onLogout}>
                <span className="material-symbols-outlined">logout</span>
            </button>
        </header>
    );
}