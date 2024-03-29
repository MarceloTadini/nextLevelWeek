//importar a dependência sqlite3

const sqlite3 = require("sqlite3").verbose()

//Criar o objeto que irá fazer alterações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//Utilizar o objeto de banco de dados para operações
db.serialize(() => {
    //1 criar uma tabela com comandos sql
       db.run(`
         CREATE TABLE IF NOT EXISTS places (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             image TEXT,
             name TEXT,
             address TEXT,
             address2 TEXT,
             state TEXT,
             city TEXT,
             items TEXT
         );
     `)

     //2 Inserir dados
     const query = `
         INSERT INTO places (
             image,
             name,
             address,
             address2,
             state,
             city,
             items
         ) VALUES (?,?,?,?,?,?,?);
`   
     const values = [
         "Link da imagem",
         "Testando",
         "Rua do teste, Testando",
         "Número 260",
         "Minas Gerais",
         "Itajubá",
         "Resíduos eletrônicos e lâmpadas"
     ]

     function afterInsertData(err){
         if(err) {
             return console.log(err)
         }

         console.log("Cadastrado com sucesso")
         console.log(this)
     }

    //db.run(query, values, afterInsertData) 
 
    //3 Consultar os dados da tabela
     db.all(`SELECT * FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    }) 

 
    //4 Deletar um dado da tabela
        db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){ //`DELETE FROM places WHERE id = ?`, [1], 
          if(err) {
              return console.log(err)
          }
        
          console.log("Registro deletado com sucesso");
         }) 
})