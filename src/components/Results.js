export default class Results {
    constructor(container){
        this.container = container;
        
    }

    render(card){
        this.container.appendChild(card);
    }
    
    clearContainer(){
        this.container.innerHTML = '';
    }

    addEventListener(type,handler){
        this.container.addEventListener(type,handler);
    }
}