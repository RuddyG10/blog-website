import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

//obtener el nombre de archivo y directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3000;
const app = express();
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
    res.render("index.ejs");
});
app.listen(port, (req, res)=>{
    console.log("Servidor en puerto: ",port);
});