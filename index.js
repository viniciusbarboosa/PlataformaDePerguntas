const express = require("express");
const app = express();
//EJS

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index")
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar")
})




app.listen(3000,(err)=>{
    if(err){
        console.log("Erro ao rodar Servidor!");
    }else{
        console.log("Servidor Rodando!");
    }
})