import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Blog from "./js/blog.js";

//obtener el nombre de archivo y directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*Server Options*/
const port = 3000;
const app = express();

/* Variable */
var blogs = [
    new Blog("Receta de Cocina","Roman Rodriguez",new Date(),"Hola","images/receta.png"),
    new Blog("Trucos de Videojuegos","Roman Rodriguez",new Date(),"Hola","images/videogame.png")
];

/*
    middleware
*/

//servir archivos estaticos
app.use(express.static(path.join(__dirname,"public")));
app.use('/bootstrap',express.static(path.join(__dirname,'node_modules/bootstrap/dist')));

/*
    Rutas
*/
app.get('/',(req,res)=>{
    res.render("index.ejs",{blogs});
});
app.get('/createBlog',(req,res)=>{
    res.render("createBlog.ejs")
});
app.listen(port, (req, res)=>{
    console.log("Servidor en puerto: ",port);
});