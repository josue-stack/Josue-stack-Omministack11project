import React, {useEffect, useState} from 'react'; /** useEffect serve para disparar uma função em determinado momento
    O useeffect recebe dois parametros
    o primeiro é qual função devera ser executada
    e o segundo é quando ela sera executada
    o terceiro parametro é um array e fica entre colchetes, toda vez que o valor do array se alterar ela executara a função novamente
*/
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';


export default function Profile(){
    /**Importando nome da ong */
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] =useState([]);
    const history = useHistory();
    /**useEffect observe */

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId, 
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, []);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err) {
           alert('Erro ao deletar'); 
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
        
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Seja o Herói"/>
    <span>Bem Vinda, {ongName}</span>
                <Link className="button" to="incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
               {
                   incidents.map( incident => (
                    <li key={incident.id}> 
                        <strong>Caso:</strong>
                            <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                            <p>{incident.description}</p>

                        <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)}  type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                   ))
               }

                
            </ul>
        </div>
    );
}