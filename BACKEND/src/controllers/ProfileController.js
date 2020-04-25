const connection = require('../database/connection');
/** Arquivo sequencia de IncidentControler.js */

/** Rota para listar conteudos especificos de uma ong */
module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization; /** Acessando id da ong */

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
        return response.json(incidents);    
    }
}