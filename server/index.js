import { createServer } from "http";
import { Server as ServerSocket } from "socket.io";
import app from "./app.js";
import sockets from "./sockets.js";
import { PORT } from "./config.js";
import "./db.js";

const server = createServer(app);
const io = new ServerSocket(server);

server.listen(PORT);
sockets(io);

console.log(`Listen on Port: ${PORT}`);
