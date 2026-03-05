import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";
import styles from "./AuthForm.module.css";
import Logo from "../assets/logo.png";
import SpinnerLoader from "./SpinnerLoader";
import { parseFirebaseAuthError } from "../utils/firebaseErrorParser";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            setLoading(true);
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err: any) {
            setError(parseFirebaseAuthError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <img className={styles.logo} src={Logo} alt="logo" />
                    <div className={styles.appName}>SelfChat</div>
                    <div className={styles.subtitle}>
                        Your private cross-device chat!
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="true"
                    />

                    <div className={styles.passwordWrapper}>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className={styles.toggleButton}
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading && <SpinnerLoader size={20} />}
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                {error && <p className={styles.error}>{error}</p>}

                <p className={styles.switchText}>
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className={styles.switchButton}
                    >
                        {isLogin ? "Signup" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
