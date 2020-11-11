System.register(["../models/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, NegociacaoServices;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacaoServices = class NegociacaoServices {
                obterNegociacoes(handler) {
                    return fetch('http://localhost:8080/dados')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((dados) => dados
                        .map(dado => new index_1.Negociacao(new Date(), dado.vezes, dado.montante)))
                        .catch(err => console.log(err.message));
                }
            };
            exports_1("NegociacaoServices", NegociacaoServices);
        }
    };
});