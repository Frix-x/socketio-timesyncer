import { AbstractInnerClient } from './innerClient/AbstractInnerClient';
import { McClient } from './innerClient/McClient';
import { MsClient } from './innerClient/MsClient';

export interface ClientOptions {
    microTimePrecision?: boolean,
    autoSync?: boolean,
    autoSyncTime?: number
}

export class TimeSyncerClient {

    private _innerClient: AbstractInnerClient;

    constructor(socket: SocketIOClient.Socket, options?: ClientOptions) {
        if (options && options.microTimePrecision) this._innerClient = new McClient(socket);
        else this._innerClient = new MsClient(socket);

        if (options && options.autoSync) {
            setInterval(this._innerClient.synchronize(), options.autoSyncTime || 1000);
        }
    }

    public synchronize(): void {
        this._innerClient.synchronize();
    }

    public get timeOffset(): number {
        return this._innerClient.timeOffset;
    }
}