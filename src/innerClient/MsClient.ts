import { AbstractInnerClient } from "./AbstractInnerClient";

export class MsClient extends AbstractInnerClient {

    constructor(socket: SocketIOClient.Socket) {
        super(socket);
        this._socket = socket;

        this._socket.on('AckMs', (t0: number, t1: number) => {
            this.computeSync(t0, t1, Date.now());
        });
    }

    protected startSync(): void {
        this._socket.emit('SyncMs', Date.now());
    }

    protected computeSync(t0: number, t1: number, t2: number): void {
        const diff = ((t1 - t0) + (t1 - t2)) / 2;
        this._offsets.unshift(diff);
        if (this._offsets.length > 10) this._offsets.pop();
    }
}