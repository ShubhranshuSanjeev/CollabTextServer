const http = require('http');
const socket_io = require('socket.io');

const port = (process.env.PORT || 7070);

var http_server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("<p>Connected</p>");
})
.listen(port, () => {
    console.log('Listening on PORT ' + port + '.');
});

var sockets = [];
var io = socket_io(http_server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
});

io.on('connection', socket => {
    console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);

    sockets.push(socket);
    console.log(sockets.length);

    socket.on('insert', data => {
        console.log('DATA ' + socket.remoteAddress + ': ' + data);

        // sockets.forEach( sock => {
        //     sock.emit(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        // });
    });

    socket.on('delete', data => {
        console.log('DATA ' + socket.remoteAddress + ': ' + data);

        // sockets.forEach( sock => {
        //     sock.emit(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        // });
    });


    socket.on('disconnect', data => {
        let index = sockets.findIndex(o => {
            return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort;
        });
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
        console.log(sockets.length);
    });
});




/*

const net = require('net');
const port = (process.env.PORT || 7070);
const host = '127.0.0.1';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function (sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    console.log(sockets.length);
    sock.on('data', function (data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function (sock, index, array) {
            sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        });
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('end', function (data) {
        let index = sockets.findIndex(function (o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
        console.log(sockets.length);
    });
});

 */