export type MessageType = {
    id: string;
    sender: string
    recipent: string
    text: string
    timestamp: string
    date: number
};

export const emptyMessage: MessageType = {
    id: "",
    sender: "",
    recipent: "",
    text: "",
    timestamp: "",
    date: 0
}

