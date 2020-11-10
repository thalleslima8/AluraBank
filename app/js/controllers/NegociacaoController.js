System.register(["../models/index", "../views/index", "../enums/DiaDaSemana"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, DiaDaSemana_1, NegociacaoController;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (DiaDaSemana_1_1) {
                DiaDaSemana_1 = DiaDaSemana_1_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_2.MensagemView('#mensagemView');
                    this.inputData = $('#data');
                    this.inputQuantidade = $('#quantidade');
                    this.inputValor = $('#valor');
                    this._negociacoesView.upDate(this._negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this.inputData.val().replace(/-/g, '/'));
                    if (!this._verificaDiaUtil(data)) {
                        this._mensagemView.update('Negociações não podem ocorrer em finais de semana!');
                        return;
                    }
                    const negociacao = new index_1.Negociacao(data, parseInt(this.inputQuantidade.val()), parseFloat(this.inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.upDate(this._negociacoes);
                    this._mensagemView.update('Negociação adicionada com sucesso!');
                }
                _verificaDiaUtil(data) {
                    return data.getDay() != DiaDaSemana_1.DiaDaSemana.Domingo && data.getDay() != DiaDaSemana_1.DiaDaSemana.Sabado;
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
