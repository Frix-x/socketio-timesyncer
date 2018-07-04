import * as microtime from "microtime";

export class TimeSyncerServer {
  private _socket: SocketIO.Socket;

  constructor(socket: SocketIO.Socket) {
    this._socket = socket;

    this._socket.on("SyncMs", (t0: number) => {
      this._socket.emit("AckMs", t0, Date.now());
    });

    this._socket.on("SyncMc", (t0: number) => {
      this._socket.emit("AckMc", t0, microtime.now());
    });
  }

  public get socket(): SocketIO.Socket {
    return this._socket;
  }
}
