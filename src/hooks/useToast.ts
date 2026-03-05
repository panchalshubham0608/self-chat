import { useState } from "react";
import type { ToastType } from "../components/Toast";

export function useToast() {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<ToastType>("info");

    const showToast = (msg: string, type: ToastType = "info") => {
        setMessage(msg);
        setType(type);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 2000);
    };

    return { toastMessage: message, visible, type, showToast };
}