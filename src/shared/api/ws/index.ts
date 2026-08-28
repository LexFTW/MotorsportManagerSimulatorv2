type MessageHandler = (message: unknown) => void;

export class LeagueRealtimeClient {
    private socket: WebSocket | null = null;
    private handlers = new Set<MessageHandler>();

    connect(leagueId: string): void {
        const wsUrl = import.meta.env.VITE_WS_URL; // ej: ws://localhost:3000

        this.socket = new WebSocket(`${wsUrl}/ws/leagues/${leagueId}`);

        this.socket.onmessage = (event) => {
            console.log(event);

            const message = JSON.parse(event.data);
            this.handlers.forEach((handler) => handler(message));
        };

        this.socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };
    }

    onMessage(handler: MessageHandler): () => void {
        this.handlers.add(handler);
        return () => this.handlers.delete(handler); // para el cleanup
    }

    disconnect(): void {
        this.socket?.close();
        this.socket = null;
        this.handlers.clear();
    }
}