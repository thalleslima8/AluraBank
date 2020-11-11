import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';

export class NegociacaoServices{



    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {

        return <Promise<Negociacao[]>> fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => 
                dados
                .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => {
                console.log(err.message);
                throw new Error('Não foi Possivel Importar as Negociações');
            });
    }
}

export interface HandlerFunction{
    (res: Response): Response
}