import { createServer } from "http";
import { Server as ServerSocket } from "socket.io";
import app from "./app.js";
import sockets from "./sockets.js";
import { PORT } from "./config.js";
import "./db.js";
import "./initialValue.js";

const server = createServer(app);

//TODO: Eliminar cors antes de deploy
const io = new ServerSocket(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

server.listen(PORT);
sockets(io);

app.set("io", io);

console.log(`Listen on Port: ${PORT}`);
