const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
//database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexao feita com o banco de DADOS");
    })
    .catch((err)=>{
        console.log(err);
    });
//EJS

//CONFIGS EJS
app.set("view engine","ejs");
app.use(express.static("public"));
//CONFIGS BODY PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    Pergunta.findAll({raw:true,order:[
        ['id','DESC'] //ASC SE FOSSE CRESCENTE
    ]}).then((perguntas)=>{
        //console.log(perguntas);
        res.render("index",{
            perguntas:perguntas
        });
    });
    
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar")
})

app.post("/salvarPergunta",(req,res)=>{
    
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/");    
    });
});

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then((pergunta)=>{
        if(pergunta != undefined){ //ACHOU PERGUNTA
            res.render("pergunta",{
                pergunta:pergunta
            });
        }else{//NAO ENCONTRADA
            res.redirect("/");
        }
    });
});

app.listen(3000,(err)=>{
    if(err){
        console.log("Erro ao rodar Servidor!");
    }else{
        console.log("Servidor Rodando!");
    }
})