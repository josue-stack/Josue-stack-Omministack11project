/**
 * Links de conex�es
 */
/** Banco de dados */
const connection = require('../database/connection');

/**Modulo de criptografia */
const crypto = require('crypto'); 



module.exports = {
/**---------------------------------------------------------------------------------------------------------- */    
    async index(request, response){
        const ongs = await connection('ongs').select('*');
     
        return response.json(ongs);
     },
/**---------------------------------------------------------------------------------------------------------- */     
    async create(request, response){
        /**
 *Defini��es: REQUEST E RESPONSE
    REQUEST: Guarda todos os dados que vem atrav�s da requisi��o do usuario
    RESPONSE: Retorna a resposta ao usuario
 */
    const {name, email, whatsapp, city, uf} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');  /** Para gerar um id aleatorio de 4 digitos */
    
   /**
    * Medida de seguran�a para previnir a execu��o do return somente ap�s a inser��o dos dados
    * Defina toda a fun��o como assincrona, atrav�s do ASYNC.
    * Antes de INSERT adicione um AWAIT, que faz o programa aguardar o codigo ser
    * executado para prosseguir
    * 
    *  */ 
   await connection('ongs').insert({ /** <<<- Adi��o do await */
      id,
      name,
      email,
      whatsapp,
      city,
      uf
   })
    
    return response.json({ id }); /** Retorne somente o id deste registro, pois o mesmo 
    funcionar� como cpf da ong para fazer o login*/
    }
};