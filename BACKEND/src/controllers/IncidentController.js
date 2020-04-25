/**
 * Conexões essenciais
 * BD, Pag, etc
 * 
 * Trabalharemos com o metodo MVC 
 * não repita os tipos de rotas, caso precise
 * fazer duas rotas com o mesmo sentido, faça a segunda rota em outro
 * arquivo. Geralmente demoninamos este arquivo como
 * profileController 
 * 
 */

 /**Banco de dados */
 const connection = require('../database/connection');
/** Corpo de rotas */
module.exports = {
    
    /** Rota de listagem-------------------------------------------------- */
    async index(request, response){
        /**Paginação da listagem */
        const { page = 1 } = request.query; /** Busque dentro do request.query o parametro chamado page e defina seu valor inicial como 1 */
        const [count] = await connection('incidents').count();
        /** Contagem total de registros
         * Utilize os colchetes envolta de count para pegar a primeira posição das contagens
         */
        response.header('X-Total-Count', count['count(*)']);


        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id' ) /** Junção de tabelas para exibição */
        .limit(5) /** Limitação de consulta por paginas no banco de dados */
        .offset((page - 1) * 5 ) /** Pulando 5 registros por paginas */
        .select(['incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
    ]);
        /** Neste select estamos selecionando todos os dados da tabela incidentes
         * mas selecionamos apenas alguns da tabela ongs. Analise o codigo para mais explicações 
         * 
         * */ 
        return response.json(incidents);
    },
    /** Rota de criação--------------------------------------------------- */
    /**conceito importante
     * request.headers
     *   Neste request deve vir informações de validações.
     * O headers guarda informações do contexto da requisição
     * Usa-se dados de autenticação de usuario, dados de localização,
     * dados sobre o idioma   
     */
    async create(request, response){
        const {title, description, value} = request.body; 
        const ong_id = request.headers.authorization; /** Acessando o id da ong */ 

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });

    },

    /**Rota delete------------------------------------------------------- */
    async delete(request, response){
        /** A primeira coisa a ser feita é pegar o ID do caso a ser deletado.
         *  Segundo passo busque o iud da ong logada
         */

        const { id } = request.params;   /**Id a ser deletado */
        const ong_id = request.headers.authorization; /** Id da ong que deseja deletar/logada */
        /**Lembrando que exclusão de registros so pode ser efetuada pela ong que
         * fez a publicação, este nosso processo servirá de filtro para evitar
         * exclusões não autorizadas pela ong autora da postagem
         */

        const incident = await connection('incidents')
            .where('id', id) /**Validação de ids */
            .select('ong_id') /**Requisição apenas de id */
            .first();/**Retorna apenas 1 resultado, ou seja o primeiro que aparecer */

            if(incident.ong_id != ong_id){ /** se o id da ong for diferente do id da ong postadora sera executado o codigo abaixo */
                return response.status(401).json({error: 'Operation not permitted.'}); /** 401 significa NÃO AUTORIZADO */

            }
            await connection('incidents').where('id', id).delete();
            return response.status(204).send(); /**Status vazio, send envia a reposta vazia*/
    },


};