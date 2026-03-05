export const copyToClipboard = async (text: string) => {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            console.error("Failed to copy password to clipboard", err);
        }
        textArea.remove();
    }
};
