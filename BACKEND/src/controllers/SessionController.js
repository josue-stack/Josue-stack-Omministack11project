const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        /**Busque o id atrav�s do corpo da requisi��o */
        const {id} = request.body;
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        /**Caso a ong n�o exista ela cair� nesta sequencia nde codigo */
        if (!ong){
            return response.status(400).json({error: 'No ONG found with this ID'});
        }    

        return response.json(ong);
    }
}