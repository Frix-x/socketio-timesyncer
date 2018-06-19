import { HrTimeData } from './models';

export class TimeSyncerServer {

    private _socket: SocketIO.Socket;

    constructor(sckt: SocketIO.Socket) {
        this._socket = sckt;

        this._socket.on('clientTimeSync', (d: HrTimeData) => {
            const timeDataToSend: HrTimeData = {
                t0: d.t0,
                t1: process.hrtime()
            };
            this._socket.emit('serverTimeSyncAnswer', timeDataToSend);
        });
    }

    public get socket(): SocketIO.Socket {
        return this._socket;
    }
}