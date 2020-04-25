/**
 * Links de conexões
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
 *Definições: REQUEST E RESPONSE
    REQUEST: Guarda todos os dados que vem através da requisição do usuario
    RESPONSE: Retorna a resposta ao usuario
 */
    const {name, email, whatsapp, city, uf} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');  /** Para gerar um id aleatorio de 4 digitos */
    
   /**
    * Medida de segurança para previnir a execução do return somente após a inserção dos dados
    * Defina toda a função como assincrona, através do ASYNC.
    * Antes de INSERT adicione um AWAIT, que faz o programa aguardar o codigo ser
    * executado para prosseguir
    * 
    *  */ 
   await connection('ongs').insert({ /** <<<- Adição do await */
      id,
      name,
      email,
      whatsapp,
      city,
      uf
   })
    
    return response.json({ id }); /** Retorne somente o id deste registro, pois o mesmo 
    funcionará como cpf da ong para fazer o login*/
    }
};