// Modifique o exercício 1. de modo que o código passe a consumir o seguinte endpoint
// https://httpbin.org/status/[status_code], onde status_code deve variar entre 401 a 410. Note que as
// requisições irão gerar erros. Deste modo, modifique seu código para que cada requisição seja re-tentada
// ao menos 3 vezes. O objetivo é simular o consumo de endpoints que estão temporariamente fora do ar
// ou não foram encontrados, que estão apresentando problemas de autorização/autenticação (devido a
// algum erro no servidor), ou que estão provendo valores num formato não esperado/solicitado (gerando
// assim problemas de parsing). Para esses casos de erro, deverá ser emitido: “Ocorreu um erro ao
// requisitar a URL [URL consultada] (número de tentativas: 3)” através do console.error().
// OBS: O mesmo delay (lógica) entre requisições do exercício 1. deve ser mantido na lógica desse exercício
// também.

//TEMPO: 1h

import { from, interval } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

const getData = async (status_code) => {
  return await fetch(
        `https://httpbin.org/status/${status_code}`,
        {retries: 3, retryDelay: 1000}
    )
    .then(response => response.json())
    .catch(err => {
        return {
            error: err.message,
            status: status_code,
            message: `Ocorreu um erro ao requisitar a URL "https://httpbin.org/status/${status_code}" (número de tentativas: 3)`
        }
    });
};

const intervalObservable = interval(3000).pipe(take(10));

const fetchDataObservable = intervalObservable.pipe(
    mergeMap((status_code) => from(getData(status_code+401)))
);

fetchDataObservable.subscribe({
    next(data) {
        console.log(JSON.stringify(data, null, 2));
        console.log();
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
});