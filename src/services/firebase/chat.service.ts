import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";

import { auth } from "../../firebase/config";
import { db } from "../../firebase/firestore";
import { type Message } from "../../types/message";

export const chatService = {
    subscribeToMessages(callback: (messages: Message[]) => void) {
        const user = auth.currentUser;
        if (!user) return () => { };

        const messagesRef = collection(db, "users", user.uid, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        return onSnapshot(q, (snapshot) => {
            const messages: Message[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Message, "id">),
            }));

            callback(messages);
        });
    },

    async sendTextMessage(text: string) {
        const user = auth.currentUser;
        if (!user) return;
        if (!text.trim()) return;

        const messagesRef = collection(db, "users", user.uid, "messages");
        await addDoc(messagesRef, {
            type: "text",
            text,
            createdAt: serverTimestamp(),
        });
    },
};
