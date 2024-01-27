// Utilize o endpoint https://dummyjson.com/products/[product_id], onde product_id varia entre 1 a
// 100, para fazer um consumo aleatório de produtos (simulando, por exemplo, um feed de promoções
// buscando produtos aleatoriamente). O product_id deve ser gerado aleatoriamente (isto é, deve ser um
// número entre 1 e 100) sempre num intervalo de 10 segundos (para que o usuário possa apreciar os
// dados de cada produto/requisição) gerando assim uma stream de ids aleatórios. Os dados (produtos)
// devem ser mostrados na saída padrão do console (console.log).

//TEMPO: 15min

import { from, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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

const fetchDataObservable = timer(0, 10000).pipe(
    mergeMap(() => from(getProduct(randomInt(1,100))))
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