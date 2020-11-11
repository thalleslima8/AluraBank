import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { DiaDaSemana } from '../enums/DiaDaSemana'
import { logarTempoDeExecucao, domInject, throttle } from '../helpers/decorators/index'
import { NegociacaoServices } from '../services/index'
import { imprime } from '../helpers/index'

export class NegociacaoController{
    @domInject('#data')
    private inputData: JQuery;
    @domInject('#quantidade')
    private inputQuantidade: JQuery;
    @domInject('#valor')
    private inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _negociacaoService = new NegociacaoServices();

    constructor(){
        this._negociacoesView.upDate(this._negociacoes);
    }

    @throttle()
    adiciona(){

        let data = new Date(this.inputData.val().replace(/-/g,'/'));
        
        if(!this._verificaDiaUtil(data)){
            this._mensagemView.upDate('Negociações não podem ocorrer em finais de semana!');
            return;
        }

        const negociacao = new Negociacao(
           data,
           parseInt(this.inputQuantidade.val()),
           parseFloat(this.inputValor.val())
        )
        
        this._negociacoes.adiciona(negociacao);
        imprime(negociacao, this._negociacoes);
        this._negociacoesView.upDate(this._negociacoes);
        this._mensagemView.upDate('Negociação adicionada com sucesso!');
    }

    private _verificaDiaUtil(data: Date){
        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
    }

    

    @throttle()
    async importaDados(){
        try{            
            const negociacoesImportadas = await this._negociacaoService
            .obterNegociacoes(res => {
                if(res.ok){
                    return res;
                }
                throw new Error(res.statusText); 
            });           
            
            const negociacoesJaImportadas = this._negociacoes.paraArray();
            
            negociacoesImportadas
            .filter(negociacao => 
                !negociacoesJaImportadas.some(jaImportada => 
                    negociacao.ehIgual(jaImportada)))
                    .forEach(negociacao => 
                        this._negociacoes.adiciona(negociacao));
                        this._negociacoesView.upDate(this._negociacoes);
        }catch(err){
            this._mensagemView.upDate(err.message);
        };
    }
}
        
        

