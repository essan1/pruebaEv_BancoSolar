import express from 'express';
import router from './routes/routes.js';
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

//carpetos publicas middleware
app.use(express.static(path.join(__dirname, 'assets')));

//middleware para recibir json
app.use(express.json());

//middleware para recibir form
app.use(express.urlencoded((false)));

//middleware para routes
app.use(router);


app.listen(PORT, () => console.log(`serv running on http://localhost:${PORT}`));