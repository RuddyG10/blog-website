import express from "express";

const port = 3000;
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello");
});
app.listen(port, (req, res)=>{
    console.log("Servidor en puerto: ",port);
});