import { MeuObjeto } from './index'

export class Negociacao implements MeuObjeto<Negociacao> {

    constructor(readonly data: Date, readonly quantidade: number,
                readonly valor: number){}
    
    
    ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() == negociacao.data.getDate()
        && this.data.getMonth() == negociacao.data.getMonth()
        && this.data.getFullYear() == negociacao.data.getFullYear();
    }

    get volume(){
        return this.quantidade * this.valor;
    }

    paraTexto(): void{
        console.log(
            `Dados da Negociação:\n
            Data: ${this.data}\n
            Quantidade: ${this.quantidade}\n
            Valor: ${this.valor}\n
            Volume: ${this.volume}`
        );
    }
}