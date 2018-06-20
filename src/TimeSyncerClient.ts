import { HrTimeData, HrTime } from './models';

export class TimeSyncerClient {

    private _socket: SocketIOClient.Socket;
    private _offsets: number[];

    constructor(sckt: SocketIOClient.Socket) {
        this._socket = sckt;
        this._offsets = [];

        this._socket.on('serverTimeSyncAnswer', (d: HrTimeData) => this.computeSync(d));
    }

    public synchronize(): void {
        const timeDataToSend: HrTimeData = {
            t0: process.hrtime(),
            t1: [0, 0]
        }
        this._socket.emit('clientTimeSync', timeDataToSend);
    }

    private computeSync(d: HrTimeData) {
        const hrTime: HrTime = process.hrtime();
        const localNanoTime = hrTime[0] * 1e9 + hrTime[1];

        const nanoT0 = d.t0[0] * 1e9 + d.t0[1];
        const nanoT1 = d.t1[0] * 1e9 + d.t1[1];
        
        const diff = localNanoTime - nanoT1 + ((localNanoTime - nanoT0) / 2);

        this._offsets.unshift(diff);
        if (this._offsets.length > 10) this._offsets.pop();
    }

    public get socket(): SocketIOClient.Socket {
        return this._socket;
    }

    public get timeOffset(): number {
        const sum = this._offsets.reduce((p, c) => p + c, 0);
        return (sum / this._offsets.length);
    }
}