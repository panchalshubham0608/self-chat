import { type User } from "firebase/auth";
import LogoutButton from "./LogoutButton";

interface ChatProps {
    user: User;
}

const Chat = ({ user }: ChatProps) => {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Welcome, {user.email}</h2>
            <LogoutButton />
            <p>Your self chat will appear here...</p>
        </div>
    );
};

export default Chat;