const express = require("express")
const server = express()

//Configurar a pasta public
server.use(express.static("public"))

//Utilizando Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//Configurar caminhos da minha aplicação
//Página inicial
//Req é o pedido (requisição), res é a resposta

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//Ligando o servidor 
server.listen(3000)