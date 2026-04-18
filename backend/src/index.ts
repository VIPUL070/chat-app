import WebSocket, { WebSocketServer } from "ws";

interface User {
    socket : WebSocket,
    room: string
}

const wss = new WebSocketServer({port:8000});
let allSocket: User[] = []

wss.on("connection", function connection(socket) {

    socket.on("message" , function(message){

        //msg ko string m convert kro bcz json is not supported by Websocket
        const parsedmessage = JSON.parse(message as unknown as string);

        // agar koi room join krna chahta hai then i will add a new socket user
        if(parsedmessage.type === "join"){
            allSocket.push({
                socket,
                room: parsedmessage.payload.roomId
            })
        }

        else{
            const currUser = allSocket.find((x) => x.socket == socket)
            const currUserRoom = currUser?.room

            allSocket.forEach((s) => {
                if(s.room  === currUserRoom && s.socket != currUser?.socket){
                    s.socket.send("Message sent: " + parsedmessage.payload.message)
                }
            })
        }
    })
})