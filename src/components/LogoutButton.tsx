import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
        </button>
    );
};

export default LogoutButton;
