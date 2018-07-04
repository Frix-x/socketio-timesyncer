export abstract class AbstractInnerClient {
  protected _offsets: number[];
  protected _socket: SocketIOClient.Socket;

  constructor(socket: SocketIOClient.Socket) {
    this._offsets = [0];
  }

  protected abstract startSync(): void;
  protected abstract computeSync(t0: number, t1: number, t2: number): void;

  public synchronize(): void {
    this.startSync();
  }

  public get timeOffset(): number {
    const sum = this._offsets.reduce((p, c) => p + c, 0);
    return sum / this._offsets.length;
  }
}
