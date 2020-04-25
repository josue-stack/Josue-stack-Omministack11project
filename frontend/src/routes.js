import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; /**Arquivo essencial */
/**
 * BrowserRouter é essencial para o software pois é ele que fica em volta de toda a aplicação
 * Route = referencia as rotas
 * switch = Garante que apenas uma rota sera executado por momento
 * Path = Referente ao diretorio que se ira persquisar
 * Componente = Adicione a variavel referente a pagina
 */
/** Importando as paginas */
 import Logon from './pages/Logon';
 import Register from './pages/Register';
 import Profile from './pages/Profile';
 import NewIncident from './pages/NewIncident';


/**Exportação de rotas */

export default function Routes(){
    return(
        /**
         * Propriedade EXACT
         * Esta propriedade exige que o dom siga exatamente o caminho definido
         */
    <BrowserRouter>
        <Switch>
             <Route path="/" exact component={Logon}/>
             <Route path="/register" component={Register}/>
             <Route path="/profile" component={Profile}/> 
             <Route path="/incidents/new" component={NewIncident}/>  
        </Switch>
    </BrowserRouter>
    );
}

