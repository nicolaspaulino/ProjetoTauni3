import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";

import faleConoscoRoutes from './routes/faleConoscoRoutes.js';
import ReservaRoutes from './routes/reservaRoutes.js';
import CardapioRoutes from './routes/cardapioRoutes.js';
import userRoutes from './routes/userRoutes.js';
import admRoutes from './routes/admRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "view"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: "chaveSuperSecreta",
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.usuario = req.session.nomeUsuario || null;
  next();
});

app.use('/cardapio', CardapioRoutes);
app.use('/reserva', ReservaRoutes);
app.use('/fale', faleConoscoRoutes);
app.use('/adm', admRoutes);
app.use('/user', userRoutes);

app.engine("handlebars", engine({
  defaultLayout: "main",
  helpers: {
    ifEquals(a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    }
}
}));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("principal");
});

app.get("/logintela", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log("Servidor rodando na url http://localhost:3000");
});

