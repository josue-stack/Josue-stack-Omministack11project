const express = require('express');
const cors = require('cors');
const routes =  require('./routes'); /** diretorio da pasta caminhos, não ha necessidade de escrever a extenção  */
const app = express();
app.use(cors()); 
/** Medida de segurança para modo de desenvolvimento
 * Não adicionando parametros em cors, faz com quie nossa aplicação
 * fique liberada a todos os frontend
 * envolvidos no projeto
 *  */
app.use(express.json());
app.use(routes);

app.listen(3333); // para acessar este arquivo no navegador utilize, localhost:3333



/*
Métodos HTTP:
    Conceitos
        GET: Buscar/Listar uma informação do back-end
        POST: Criar uma informação no back-end
        PUT: Alterar uma informção no back-end 
        DELETE: Deletar uma infromação no back-end
*/

/**
 * Tipos de parametros
 *  Query params: Parametros nomeados enviados na rota após o simbolo de ? e geralmente eles servem para filtros, paginação
 *  Route params: Parametros utilizados para identificar recursos
 *  Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * Bancos de dados
  *   Relacionais
  *     SQL: Mysql, Sqlite, PostgreSql, Oracle, Microsoft SQL Server
  *  
  *   Não Relacionais
  *     NoSql: MongoDB, CouchDB, etc    
  * 
  * 
  */