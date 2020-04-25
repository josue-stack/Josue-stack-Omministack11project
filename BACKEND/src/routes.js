const express = require('express');
const OngController = require('./controllers/OngController'); /** Importação de arquivo OngContoller */
const IncidentController = require('./controllers/IncidentController'); /** Importação de arquivo IncidentContoller */
const ProfileController = require('./controllers/ProfileController'); /** Importação de arquivo ProfileContoller */
const SessionController = require('./controllers/SessionController'); /** Importação de arquivo SessionContoller */

const routes = express.Router(); /* Desacoplando as rotas do express */

/** Rota de listagem de todas as ongs no banco de dados */
routes.get('/ongs', OngController.index );

/**rota de adição de ong ao banco de dados */
routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);
/** Listando casos especifico de uma ong */
routes.get('/profile', ProfileController.index);

/** Rota de Login */
routes.post('/sessions', SessionController.create);  /** Usa-se create pois a intenção é criar uma sessão */
module.exports = routes;