abstract class View<T>{

    protected _elemento: JQuery;

    constructor(seletor: any){
        
        this._elemento = $(seletor);
    }

    update(model: T){
        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;
}