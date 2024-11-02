// Configuracion del socket del lado del cliente
const socket = io()


socket.emit('mensaje', "Hola soy el cliente!!!")


// escuchamos al evento que envia el server
socket.on('mensaje_02', (data) => {
    console.log(data);
})


// escuchamos al evento que envia el server para todos los clientes menos el que lo envió
socket.on('broadcast', (data) => {
    console.log(data);
})


// escuchamos al evento que envia el server para todos los clientes
socket.on('evento_para_todos', (data) => {
    console.log(data);
})