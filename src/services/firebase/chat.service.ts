import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    QueryDocumentSnapshot,
    limit,
    getDocs,
    startAfter,
    doc,
    writeBatch,
    deleteDoc,
} from "firebase/firestore";

import { auth } from "../../firebase/config";
import { db } from "../../firebase/firestore";
import { type Message } from "../../types/message";

const PAGE_SIZE = 5;

const getMessagesCollection = () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    return collection(db, "users", user.uid, "messages");
};

export const chatService = {
    subscribeToMessages(callback: (messages: Message[], lastDoc: QueryDocumentSnapshot | null) => void) {
        const messagesRef = getMessagesCollection();
        const q = query(messagesRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));

        return onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs;
            const lastDoc = docs[docs.length - 1] || null;
            const messages: Message[] = docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Message, "id">),
            }));

            callback(messages.reverse(), lastDoc);
        });
    },

    async loadOlderMessages(
        lastDoc: QueryDocumentSnapshot
    ) {
        const messagesRef = getMessagesCollection();

        const q = query(
            messagesRef,
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(PAGE_SIZE)
        );

        const snapshot = await getDocs(q);

        const docs = snapshot.docs;

        const messages: Message[] = docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Message, "id">),
        }));

        const newLastDoc = docs[docs.length - 1] || null;

        return {
            messages: messages.reverse(),
            lastDoc: newLastDoc,
        };
    },

    async sendTextMessage(text: string) {
        if (!text.trim()) return;
        const messagesRef = getMessagesCollection();

        await addDoc(messagesRef, {
            type: "text",
            text,
            createdAt: serverTimestamp(),
        });
    },

    async deleteMessages(ids: string[]) {
        const messagesCollection = getMessagesCollection();
        const deletions = ids.map((id) =>
            deleteDoc(doc(messagesCollection, id))
        );

        await Promise.all(deletions);
    },
};
