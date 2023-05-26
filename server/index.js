import { createServer } from "http";
import { Server as ServerSocket } from "socket.io";
import app from "./app.js";
import sockets from "./sockets.js";
import { PORT, PRODUCTION } from "./config.js";
import "./db.js";
import "./initialSetup.js";

const server = createServer(app);

//TODO: Modificar variable de entorno en caso de deploy
const io = PRODUCTION
  ? new ServerSocket(server)
  : new ServerSocket(server, {
      cors: {
        origin: "http://localhost:5173",
      },
    });

server.listen(PORT);
sockets(io);

app.set("io", io);

console.log(`Listen on Port: ${PORT}`);
