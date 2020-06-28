export default class Paginator {
    constructor(paginator) {
        this.paginator = paginator;
    }


    hideExtPages(nums){
        Array.from(this.paginator.querySelectorAll('.page')).forEach((page,i)=>{
            if(i+1 > nums) page.style.display = 'none';
            if(i+1 <= nums) page.style.display = 'list-item';          
        })
    }

    showPaginator(){
        this.paginator.classList.contains('visible-flex-element') ? 
        undefined : 
        this.paginator.classList.add('visible-flex-element');
    }
    hidePaginator(){
        this.paginator.classList.contains('visible-flex-element') ? 
        this.paginator.classList.remove('visible-flex-element') :
        undefined;
    }

    getCurrentPage(){
        return Number(this.paginator.querySelector('.page-link-active').textContent);
    }

    getPrevPage(){
        return this.paginator.querySelector('.page-link-active').textContent - 1;
    }


    addEventListener(type, handler){
        this.paginator.addEventListener(type,handler);
    }

    activatePage(page){
        this.paginator.querySelector('.page-link-active').classList.remove('page-link-active');
        page.classList.add('page-link-active');
    }
}