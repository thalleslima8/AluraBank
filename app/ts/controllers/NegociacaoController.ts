class NegociacaoController{
    private inputData: JQuery;
    private inputQuantidade: JQuery;
    private inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor(){
        this.inputData = $('#data');
        this.inputQuantidade = $('#quantidade');
        this.inputValor = $('#valor');
        this._negociacoesView.upDate(this._negociacoes);
    }

    adiciona(event: Event){
        event.preventDefault();
        const negociacao = new Negociacao(
           new Date(this.inputData.val().replace(/-/g,'/')),
           parseInt(this.inputQuantidade.val()),
           parseFloat(this.inputValor.val())
        )
        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.upDate(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }
}