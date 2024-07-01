import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Blog from "./js/blog.js";
import multer from "multer";

//obtener el nombre de archivo y directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*Server Options*/
const port = 3000;
const app = express();

/* Variable */
var blogs = [
    new Blog(1,"Receta de Cocina","Roman Rodriguez",new Date(),"Hola","images/receta.png"),
    new Blog(2,"Trucos de Videojuegos","Roman Rodriguez",new Date(),"Hola","images/videogame.png")
];

/*
    middleware
*/

//servir archivos estaticos
app.use(express.static(path.join(__dirname,"public")));
app.use('/bootstrap',express.static(path.join(__dirname,'node_modules/bootstrap/dist')));
// Middleware para analizar el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));

//configurar multer para recibir las imagenes que se suban en el formulario de creacion

// const storage = multer.diskStorage({
//     destination: (req,file,cb) =>{
//         cb(null,'public/images');
//     },
//     filename: (req,file,cb)=>{
//         cb(null,Date.now()+'-'+file.originalname);
//     }
// });
const upload = multer({dest:'./public/images'});
/*
    Rutas
*/
app.get('/',(req,res)=>{
    res.render("index.ejs",{blogs});
});
app.get('/createBlog',(req,res)=>{
    res.render("createBlog.ejs")
});
app.post('/createBlog',upload.single('image'),(req,res)=>{
    const {title,author,content} = req.body;
    const imageUrl =`images/${req.file.filename}`;
    const id = blogs.length + 1;
    const newBlog = new Blog(id,title,author,new Date(),content,imageUrl);
    blogs.push(newBlog);
    console.log(req.file);
    res.redirect('/');
});
app.get('/blog/:id',(req,res)=>{
    const blogId = req.params.id;
    const blog = blogs.find(b => b.id === parseInt(blogId));

    if(blog){
        res.render('viewBlog.ejs',{blog});
    }else{
        res.status(404).send('Blog not found');
    }
});
app.listen(port, (req, res)=>{
    console.log("Servidor en puerto: ",port);
});