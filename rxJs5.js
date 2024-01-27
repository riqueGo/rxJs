// Modifique o exercício 3. para que, além de exibir os dados dos produtos, seja exibido a média de
// preço dos últimos 3 produtos (isto é, você terá que encontrar um meio de acumular dados da stream
// relativos às últimas requisições/produtos para assim calcular a média de preço). A média deve ser
// mostrada com a frase “Média de preço dos últimos 3 produtos: [média de preço]”. Todos os dados
// devem ser mostrados na saída padrão do console (console.log).

//TEMPO: 15min

import { from, timer } from 'rxjs';
import { mergeMap, takeLast, takeUntil } from 'rxjs/operators';

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

let total = 0;

const fetchDataObservable = timer(0, 1000)
    .pipe(
        mergeMap(() => from(getProduct(randomInt(1,100)))),
        takeUntil(timer(7000)),
    )
    .pipe(takeLast(3));

fetchDataObservable.subscribe({
    next(product) {
        console.log(`product: ${product.title}\nprice: ${product.price}\n\n`);
        total+=product.price;
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('Média de preço dos últimos 3 produtos:', total/3);
        console.log('done');
    }
});

function randomInt(low, high) {
    return Math.floor(Math.random()* (high-low) +low);
}