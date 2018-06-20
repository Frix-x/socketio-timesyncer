socketIO-TimeSyncer
===================

NTP-like time synchronization library using `Socket.io`.
`socketIO-TimeSyncer` give you the time offset between a client and a server at a nanosecond precision using node `process.hrtime()`.

## Installation

```
npm install socketio-timesyncer
```

## Server usage

On the server, you need to open a socket and pass it to the `TimeSyncerServer` object.

```Typescript
xxxxxxxx
xxx
x
xxxxxx
x
```

## Client usage

On the client, you need to connect to the server with `socket.io` and pass that socket to the `TimeSyncerClient` object.

```Typescript
xxxxxxx
xxxxx
xxxxxxxxxx
xxxx
```