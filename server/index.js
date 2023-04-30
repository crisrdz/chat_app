import app from "./app.js";
import { PORT } from "./config.js";
import "./db.js";

app.listen(PORT);

console.log(`Listen on Port: ${PORT}`);
