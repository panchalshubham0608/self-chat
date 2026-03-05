import { useEffect, useState } from "react";
import styles from "./ChatPage.module.css";
import { authService } from "../../services/firebase/auth.service";
import Logo from "../../assets/logo.png";
import { chatService } from "../../services/firebase/chat.service";
import type { Message } from "../../types/message";

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const unsubscribe = chatService.subscribeToMessages((data: Message[]) => {
            setMessages(data);
        });

        return () => unsubscribe();
    }, []);

    const handleSend = async () => {
        if (!message.trim()) return;
        try {
            await chatService.sendTextMessage(message.trim());
            setMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <img src={Logo} alt="logo" className={styles.logo} />
                    <span>Self Chat</span>
                </div>

                <button className={styles.logoutBtn} onClick={authService.logout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>

            <div className={styles.messages}>
                {messages.map((msg) => (
                    <div key={msg.id} className={styles.messageRow}>
                        <div className={`${styles.messageBubble}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.inputWrapper}>
                <div className={styles.inputContainer}>
                    <textarea
                        className={styles.chatInput}
                        placeholder="Type a message..."
                        value={message}
                        rows={1}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <button
                        className={styles.sendBtn}
                        onClick={handleSend}
                        disabled={!message.trim()}
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}