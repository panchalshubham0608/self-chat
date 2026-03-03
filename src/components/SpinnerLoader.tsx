import styles from "./SpinnerLoader.module.css";

interface SpinnerLoaderProps {
    size?: number;        // px
    color?: string;       // CSS color
}

export default function SpinnerLoader({
    size = 18,
    color = "white",
}: SpinnerLoaderProps) {
    return (
        <span
            className={styles.spinner}
            style={{
                width: size,
                height: size,
                borderTopColor: color,
            }}
        />
    );
}