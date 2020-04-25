const express = require('express');
const cors = require('cors');
const routes =  require('./routes'); /** diretorio da pasta caminhos, n�o ha necessidade de escrever a exten��o  */
const app = express();
app.use(cors()); 
/** Medida de seguran�a para modo de desenvolvimento
 * N�o adicionando parametros em cors, faz com quie nossa aplica��o
 * fique liberada a todos os frontend
 * envolvidos no projeto
 *  */
app.use(express.json());
app.use(routes);

app.listen(3333); // para acessar este arquivo no navegador utilize, localhost:3333



/*
M�todos HTTP:
    Conceitos
        GET: Buscar/Listar uma informa��o do back-end
        POST: Criar uma informa��o no back-end
        PUT: Alterar uma inform��o no back-end 
        DELETE: Deletar uma infroma��o no back-end
*/

/**
 * Tipos de parametros
 *  Query params: Parametros nomeados enviados na rota ap�s o simbolo de ? e geralmente eles servem para filtros, pagina��o
 *  Route params: Parametros utilizados para identificar recursos
 *  Request Body: Corpo da requisi��o, utilizado para criar ou alterar recursos
 */

 /**
  * Bancos de dados
  *   Relacionais
  *     SQL: Mysql, Sqlite, PostgreSql, Oracle, Microsoft SQL Server
  *  
  *   N�o Relacionais
  *     NoSql: MongoDB, CouchDB, etc    
  * 
  * 
  */