import { Negociacoes, Negociacao } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { DiaDaSemana } from '../enums/DiaDaSemana'
import { logarTempoDeExecucao, domInject } from '../helpers/decorators/index'

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

    constructor(){
        // this.inputData = $('#data');
        // this.inputQuantidade = $('#quantidade');
        // this.inputValor = $('#valor');
        this._negociacoesView.upDate(this._negociacoes);
    }

    adiciona(event: Event){
        event.preventDefault();

        let data = new Date(this.inputData.val().replace(/-/g,'/'));

        if(!this._verificaDiaUtil(data)){
            this._mensagemView.update('Negociações não podem ocorrer em finais de semana!');
            return;
        }

        const negociacao = new Negociacao(
           data,
           parseInt(this.inputQuantidade.val()),
           parseFloat(this.inputValor.val())
        )
        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.upDate(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private _verificaDiaUtil(data: Date){
        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
    }
}

