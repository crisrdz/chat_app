import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import friendRoutes from "./routes/friend.routes.js";
import { PRODUCTION } from "./config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(
  PRODUCTION
    ? morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms'
      )
    : morgan("dev")
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/friend", friendRoutes);

// Statics
app.use(express.static(join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

export default app;
