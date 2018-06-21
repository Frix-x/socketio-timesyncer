import { AbstractInnerClient } from "./AbstractInnerClient";
import * as microtime from 'microtime';

export class McClient extends AbstractInnerClient {

    constructor(socket: SocketIOClient.Socket) {
        super(socket);
        this._socket = socket;

        this._socket.on('AckMc', (t0: number, t1: number) => {
            this.computeSync(t0, t1, microtime.now());
        });
    }

    protected startSync(): void {
        this._socket.emit('SyncMc', microtime.now());
    }

    protected computeSync(t0: number, t1: number, t2: number): void {
        const diff = ((t1 - t0) + (t1 - t2)) / 2;
        this._offsets.unshift(diff);
        if (this._offsets.length > 50) this._offsets.pop();
    }
}