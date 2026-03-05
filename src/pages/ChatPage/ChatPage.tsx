import { useEffect, useRef, useState } from "react";
import styles from "./ChatPage.module.css";
import { authService } from "../../services/firebase/auth.service";
import Logo from "../../assets/logo.png";
import { chatService } from "../../services/firebase/chat.service";
import type { Message } from "../../types/message";
import { QueryDocumentSnapshot } from "firebase/firestore";

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const hasInitialScroll = useRef(false);
    const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
    const [selectionMode, setSelectionMode] = useState(false);
    const longPressTimer = useRef<any>(null);

    useEffect(() => {
        if (!hasInitialScroll.current && messages.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: "auto" });
            hasInitialScroll.current = true;
        }
    }, [messages]);

    useEffect(() => {
        const unsubscribe = chatService.subscribeToMessages((data: Message[], cursor: QueryDocumentSnapshot | null) => {
            setMessages(data);
            setLastDoc(cursor);
        });

        return () => unsubscribe();
    }, []);

    const handleScroll = async () => {
        if (!messagesRef.current || !lastDoc) return;

        if (messagesRef.current.scrollTop === 0) {
            const result = await chatService.loadOlderMessages(lastDoc);
            setMessages((prev) => [...result.messages, ...prev]);
            setLastDoc(result.lastDoc);
        }
    };

    const handleSend = async () => {
        if (!message.trim()) return;
        try {
            await chatService.sendTextMessage(message.trim());
            setMessage("");
            bottomRef.current?.scrollIntoView({ behavior: "auto" });
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

    const toggleSelect = (id: string) => {
        setSelectedMessages((prev) => {
            const newSet = new Set(prev);

            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }

            if (newSet.size === 0) {
                setSelectionMode(false);
            }

            return newSet;
        });
    };

    const handleLongPressStart = (id: string) => {
        longPressTimer.current = setTimeout(() => {
            setSelectionMode(true);
            setSelectedMessages(new Set([id]));
        }, 500);
    };

    const handleLongPressEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
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

            <div className={styles.messages} ref={messagesRef} onScroll={handleScroll}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.messageRow} ${selectedMessages.has(msg.id) ? styles.selected : ""}`}
                        onMouseDown={() => handleLongPressStart(msg.id)}
                        onMouseUp={handleLongPressEnd}
                        onMouseLeave={handleLongPressEnd}
                        onTouchStart={() => handleLongPressStart(msg.id)}
                        onTouchEnd={handleLongPressEnd}
                        onClick={() => {
                            if (selectionMode) toggleSelect(msg.id);
                        }}
                    >
                        <div className={`${styles.messageBubble}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef}></div>
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
