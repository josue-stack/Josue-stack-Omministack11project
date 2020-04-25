import axios from 'axios'; /**Importantye o cliente HTTP axios, bastante utilizados em projetos */
/**
 * Crie uma variavel para setar o parametro da base do url
 */

const api = axios.create({
    baseURL:'http://localhost:3333' /**É a parte da url quer será mantida em todas as chamadas */
 })

export default api;
