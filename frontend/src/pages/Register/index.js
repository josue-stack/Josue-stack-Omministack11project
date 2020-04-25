import React from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import { useState } from 'react';

export default function Register(){
    /**Função criada para após toda codificação do back e frontend
     * Faz parte da comunicação entre as duas fazes
     * Ela é responsávl por realizar o cadastro do usuario, ela sera ativada no formulario, veja.
     * 
     * Adicione cada input np modo state
     */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); /**Mandar o usuario a pagina de login */

    async function handleRegister(e){
        e.preventDefault(); /**Previnindo o comportamento de recarregar a pagina */
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
            /**Enviando os dados para o banco */
            const response = await api.post('ongs', data);
            alert(`Este é seu Id de Acesso, obrigado! ${ response.data.id }`);

            history.push('/');

        } catch(Err){
            alert('Erro ao cadastrar');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Seja o Herói"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG. </p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar ao Logon
                    </Link>
                </section> 

                <form onSubmit={handleRegister}> 
                    <input 
                        placeholder="Nome da Ong"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />


                    <input 
                        type="email" 
                        placeholder="E-Mail"
                        value={email}  
                        onChange = {e => setEmail(e.target.value)}  
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}    
                        onChange= {e=> setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Municipio"
                            value={city}
                            onChange= {e=>setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width:80}}
                            value={uf}    
                            onChange={e=>setUf(e.target.value)}
                        /> 
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}