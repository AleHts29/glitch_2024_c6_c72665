import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js';

import { Server } from 'socket.io'

const app = express();
const PORT = process.env.PORT || 9090

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuracion diritorio public
app.use(express.static(__dirname + '/public/'));


// configuracion de HBS
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// usando router y hbs
app.use('/hbs', viewRouter);



const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
// console.log(httpServer);

// configuramos socket.io con http
const socketServer = new Server(httpServer)

let messages = []
socketServer.on('connection', socket => {
    // AQUI VA TODO LO QUE ES COMUNICACION CON EL SOCKET
    // Esto lo ve cualquier user que se conecte
    socketServer.emit('messageLogs', messages)

    // escuchamos al cliente
    socket.on('message', data => {
        messages.push(data);
        // socket.emit('messageLogs', messages)

        // enviamos un array de objetos ---> [{ user: "Juan", message: "Hola" }, { user: "Elias", message: "Como estas?" }]
        socketServer.emit('messageLogs', messages)
    })


    // hacemos un broadcast del nuevo usuario que se conecta al chat
    socket.on('userConnected', data => {
        console.log(data);
        socket.broadcast.emit('userConnected', data.user)
    })


    // Cuando desees cerrar la conexión con este cliente en particular:
    socket.on('closeChat', data => {
        console.log(data);
        if (data.close === "close")
            socket.disconnect();
    })


    // // escuchamos al cliente
    // socket.on('mensaje', data => {
    //     console.log(data);
    // })


    // // enviamos un mensaje al cliente
    // socket.emit('mensaje_02', "Hola desde el server!")


    // socket.broadcast.emit('broadcast', "Este evento es para todos los sockets, menos el socket desde que se emitió el mensaje!")


    // socketServer.emit("evento_para_todos", "Evento para todos los clientes que esten conectados!")

})

