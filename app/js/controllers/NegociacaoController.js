System.register(["../models/index", "../views/index", "../enums/DiaDaSemana", "../helpers/decorators/index", "../services/index", "../helpers/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, DiaDaSemana_1, index_3, index_4, index_5, NegociacaoController;
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
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_2.MensagemView('#mensagemView');
                    this._negociacaoService = new index_4.NegociacaoServices();
                    this._negociacoesView.upDate(this._negociacoes);
                }
                adiciona() {
                    let data = new Date(this.inputData.val().replace(/-/g, '/'));
                    if (!this._verificaDiaUtil(data)) {
                        this._mensagemView.upDate('Negociações não podem ocorrer em finais de semana!');
                        return;
                    }
                    const negociacao = new index_1.Negociacao(data, parseInt(this.inputQuantidade.val()), parseFloat(this.inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    index_5.imprime(negociacao, this._negociacoes);
                    this._negociacoesView.upDate(this._negociacoes);
                    this._mensagemView.upDate('Negociação adicionada com sucesso!');
                }
                _verificaDiaUtil(data) {
                    return data.getDay() != DiaDaSemana_1.DiaDaSemana.Domingo && data.getDay() != DiaDaSemana_1.DiaDaSemana.Sabado;
                }
                importaDados() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const negociacoesImportadas = yield this._negociacaoService
                                .obterNegociacoes(res => {
                                if (res.ok) {
                                    return res;
                                }
                                throw new Error(res.statusText);
                            });
                            const negociacoesJaImportadas = this._negociacoes.paraArray();
                            negociacoesImportadas
                                .filter(negociacao => !negociacoesJaImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                            this._negociacoesView.upDate(this._negociacoes);
                        }
                        catch (err) {
                            this._mensagemView.upDate(err.message);
                        }
                        ;
                    });
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
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importaDados", null);
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
