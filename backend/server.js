import { PORT_NUMBER } from "./config.js";
import app from "./index.js";

const PORT = process.env.PORT || PORT_NUMBER;

const server = app.listen(PORT, () => console.log("Listening on port", PORT));
