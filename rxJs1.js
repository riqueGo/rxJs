// Utilizando o endpoint https://jsonplaceholder.typicode.com/users/[id], onde id varia de 1 a 10,
// escreva um código reativo para realizar um consumo de todos os dados de usuários (1-10) no formato
// JSON, sendo que cada requisição deve ser sucedido de um intervalo de tempo (delay) de 3 segundos
// (isto é, deve haver um intervalo de 3 segundos entre as requisições). Os dados dos 10 usuários devem
// ser mostrados na saída padrão do console (console.log).

//TEMPO: 1h:30min

import { from, interval } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

const getUserData = async (id) => {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => response.json());
};

const intervalObservable = interval(3000).pipe(take(10));

const fetchDataObservable = intervalObservable.pipe(
    mergeMap((id) => from(getUserData(id+1)))
);

fetchDataObservable.subscribe(userData => console.log(JSON.stringify(userData, null, 2)));