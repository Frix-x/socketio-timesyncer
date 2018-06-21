socketIO-TimeSyncer
===================

NTP-like time synchronization library using `Socket.io`.
SocketIO-TimeSyncer can give you the time offset between a client and a server with a precision of milisecond or microsecond using node `Date.now()` or the `microtime` node package.

## Installation

```
npm install socketio-timesyncer
```

## Server usage

You just need to open a Socket.io server and pass the connected client's socket to the `TimeSyncerServer` object.

```Typescript
import { createServer } from 'http';
import * as express from 'express';
import * as sio from 'socket.io';
import { TimeSyncerServer } from 'socketio-timesyncer';

const server = createServer(express());
server.listen(8080, () => {
    console.log(`Server running on port 8080`);
});
const io = sio(server, {transports: ["websocket"]});
        
// Using a dedicated namespace on the socket server is not an obligation
this.io.of('/timesync').on('connection', (socket: SocketIO.Socket) => {
    console.log(`client connected with socket : ${socket.id}`);
    let timeSyncerServer = new TimeSyncerServer(socket);
});
```

## Client usage

On the client, you need to connect to the server with `socket.io` and pass that socket to the `TimeSyncerClient` object. You will then need to manually ask for a 

```Typescript
import * as io from 'socket.io-client';
import { TimeSyncerClient } from 'socketio-timesyncer';

const socket = io.connect('http://server-ip:8080/timesync', {transports: ["websocket"]});
```

Then you can start the client with multiple options :

```Typescript
// Default option implie to manually trigger a sync (you should do it regularly like every second)
socket.on('connect', () => {
    let timeSyncClient = new TimeSyncerClient(socket);
    timeSyncClient.synchronize();
    // Show the time offset in miliseconds
    console.log(timeSyncClient.timeOffset);
});

// For a microsecond precision, you need to specify it in the options
socket.on('connect', () => {
    let timeSyncClient = new TimeSyncerClient(socket, {microTimePrecision: true});
    timeSyncClient.synchronize();
    // Show the time offset in microseconds
    console.log(timeSyncClient.timeOffset);
});

// You can have an automatic trigger and specify the time interval
socket.on('connect', () => {
    let timeSyncClient = new TimeSyncerClient(socket, {autoSync: true, autoSyncTime: 1000});
    // Show the time offset which is computed every specified interval (default: 1000ms)
    console.log(timeSyncClient.timeOffset);
});
```