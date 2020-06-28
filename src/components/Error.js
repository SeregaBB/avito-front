export default class Error{
    constructor(errorElement){
        this.errorElement = errorElement;
    }

    show(err){
        this.errorElement.querySelector('.error-text').textContent = `Something went wrong...:(  \n ${err}`;
        this.errorElement.classList.contains('visible-flex-element') ? 
        undefined : 
        this.errorElement.classList.add('visible-flex-element');
     }

     hide(){
        this.errorElement.classList.contains('visible-flex-element') ? 
        this.errorElement.classList.remove('visible-flex-element') :
        undefined;
     }
}