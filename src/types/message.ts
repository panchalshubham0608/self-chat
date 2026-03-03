export type MessageType = "text" | "file";

export interface Message {
    id: string;
    type: MessageType;
    text?: string;
    fileName?: string;
    fileUrl?: string;
    createdAt?: any;
}
