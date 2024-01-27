// Estenda o exercício 3. de modo que a lógica principal continue a realizar as requisições de produtos
// aleatoriamente até atingir um tempo máximo de 15 segundos. Esse tempo poderia representar uma
// interação do usuário, como o click de um botão (página web) ou acionamento de um sensor (IoT), que
// interrompe o fluxo principal de requisições. A lógica deve ser estruturada de uma maneira reativa
// (através da utilização de algum operador para controlar o término das emissões) e não de uma maneira
// imperativa (chamando o método unsubscribe() dentro de um setTimeout, por exemplo) para finalizar a
// stream.

//TEMPO: 30min

import { from, timer } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';

const getProduct = async (product_id) => {
  return await fetch(`https://dummyjson.com/products/${product_id}`)
    .then(response => response.json())
    .catch(err => {
        return {
            error: err.message,
            product_id: product_id,
        }
    });
};

const fetchDataObservable = timer(0, 1000).pipe(
    mergeMap(() => from(getProduct(randomInt(1,100)))),
    takeUntil(timer(15000))
);

fetchDataObservable.subscribe({
    next(product) {
        console.log(JSON.stringify(product, null, 2));
        console.log();
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
});

function randomInt(low, high) {
    return Math.floor(Math.random()* (high-low) +low);
}