import { useState } from "react";

export function useToast() {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const showToast = (msg: string) => {
        setMessage(msg);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 2000);
    };

    return { toastMessage: message, visible, showToast };
}