import { Negociacao, MeuObjeto } from './index'

export class Negociacoes implements MeuObjeto<Negociacoes>{
    
    private _negociacoes: Array<Negociacao> = []; //Negociacao[] = [];
    
    
    adiciona(negociacao: Negociacao): void{
        this._negociacoes.push(negociacao);
    }
    
    paraArray(): Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes);
    }
    
    paraTexto(){
        console.log('Impressão\n-----------------------------');
        console.log(JSON.stringify(this._negociacoes));
    }
    
    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}