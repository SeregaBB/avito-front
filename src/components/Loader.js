export default class Loader{
    constructor(loaderElement) {
        this.loaderElement = loaderElement;
    }


    show(){

        this.loaderElement.classList.contains('visible-flex-element') ? 
        undefined : 
        this.loaderElement.classList.add('visible-flex-element');
     }

     hide(){
        this.loaderElement.classList.contains('visible-flex-element') ? 
        this.loaderElement.classList.remove('visible-flex-element') :
        undefined;
     }

}