System.register(["../models/index", "../views/index", "../enums/DiaDaSemana", "../helpers/decorators/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, DiaDaSemana_1, index_3, NegociacaoController;
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
            },
            function (index_3_1) {
                index_3 = index_3_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_2.MensagemView('#mensagemView');
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
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoController.prototype, "inputData", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoController.prototype, "inputQuantidade", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoController.prototype, "inputValor", void 0);
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
