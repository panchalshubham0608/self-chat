import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
} from "firebase/auth";

import { auth } from "../../firebase/config";

export const authService = {
    async login(email: string, password: string) {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        return credential.user;
    },

    async register(email: string, password: string) {
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return credential.user;
    },

    async logout() {
        return signOut(auth);
    },

    subscribeToAuthChanges(callback: (user: User | null) => void) {
        return onAuthStateChanged(auth, callback);
    },
};
