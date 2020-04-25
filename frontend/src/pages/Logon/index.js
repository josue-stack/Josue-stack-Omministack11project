import React, { useState } from 'react';
import './styles.css'; /** Importando CSS da pasta Logon */
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom'; /** Link que substituiu a tag A, isso ajuda no desempenho da app */
import api from '../../services/api';


export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory('');

    /**Função de logar */
    async function handleLogin(e){
        e.preventDefault(); /**Faça isso em todo formulario do react */
        try{
            const response = await api.post('sessions', {id});
            console.log(response.data.nome);
            /**
             * Para ter esta informação disponivel em toda app
             * use o metodo localstorage abaixo
             */
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            /**Enviando a nova pagina */
            history.push('/profile');
        } catch(err){
            alert('Falha no login');
        }
    }
    
    return (    
       <div class="logon-container">
           <section className="form">
               <img src={logoImg} alt="Seja-O-Heroi"/>
               <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Sua Id"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho Cadastro
                    </Link>
               </form>
           </section>
           <img src={heroesImg} alt="Heroes"/>
       </div>

       
    );
}