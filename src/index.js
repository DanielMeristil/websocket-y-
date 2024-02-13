import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import * as path from "path";
import { Server } from "socket.io";
import mongoose from "mongoose";
import prodsRouter from './routes/products.route.js';

const app = express()
const PORT = 8080


app.get("/ping", (req, res) => {
    res.send("Pong!");
});

app.use((req, res, next) => {
    res.render("404");
});

mongoose.connect("mongodb://127.0.0.1:27017/electronicproducts")

const server = app.listen(PORT,()=>{
    console.log(`server run Express port:${PORT}`);
});

const io =new Server(server);

app.engine("handlebars", engine())
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + "/views"));

app.use('/', express.static(__dirname + "/public"));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Route products
app.use("/products", prodsRouter);


app.get('/',(req, res) =>{
res.render("index");
io.on('connection', socket =>{
    console.log(socket)
});
});

