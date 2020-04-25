import React, {useState} from 'react';
import './global.css';
import Routes from './routes';


/** JSX (JAVASCRIPT XML) � quando o HTML est� integrado dentro do JAVASCRIPT */
/** Componentes: O componente em REACT � uma fun��o que retorna HTML*/
/** PROPRIEDADES: Semelhante ao conceito de atributos do HTML */
/** ESTADO: � uma informa��o que ser� mantida pelo componente, quando se usa esse metodo
 * atrav�s de useStates() ele nos retorna uma string com dois parametros, o primeiro � o 
 * valor atual e o segundo � uma fun��o de atualiza��o de valor e � ela quem alterar o valor
*/

function App() {
  return (
   <Routes />
  );
}

export default App;
