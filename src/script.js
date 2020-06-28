import './style.css'

import Api from '../src/components/Api';
import Card from '../src/components/Card';
import Error from '../src/components/Error';
import Loader from '../src/components/Loader';
import Modal from '../src/components/Modal';
import Paginator from '../src/components/Paginator';
import Results from '../src/components/Results';
import SaverFilters from '../src/components/SaverFilters';


const token = '2795431e178f4dd3bb82a26f343dd7930f3321ce';
const results = document.querySelector('.results');
const reg = new RegExp('(http://)|(https://)', 'gi');
const itemsPerPage = 10;
const loading = document.querySelector('.load');
const errElement = document.querySelector('.error');
const paginator = document.querySelector('.pagination');
const form = document.forms.form;
const template = document.querySelector('template');
const modalElem = document.querySelector('.modal');

const resultsContainer = new Results(results);
const api = new Api(token, 'https://api.github.com/');
const loader = new Loader(loading);
const error = new Error(errElement);
const pages = new Paginator(paginator);
const modal = new Modal(api.getData, modalElem);
const saver = new SaverFilters();
const filters = saver.getFilters();
modal.setListener();

form.addEventListener('submit', handler);



if(filters){
    form.elements.query.value = filters.query;
    pages.activatePage(paginator.querySelectorAll('.page-link')[filters.page - 1]);
    handler();
}

window.addEventListener('beforeunload',()=>{
    const query = form.elements.query.value;
    const page = paginator.querySelector('.page-link-active').textContent;
    
    saver.setFilters({
        query: query,
        page: page
    })
})


function handler(event) {
    
    if(event) event.preventDefault()
    resultsContainer.clearContainer();
    loader.show();
    error.hide();
    pages.hidePaginator();
    

    const start = pages.getPrevPage() * itemsPerPage;
    const end = pages.getCurrentPage() * itemsPerPage;

    api.search(form.elements.query.value)
    .then(data=> {
        const numOfPages = Math.floor(data.items.length / itemsPerPage) * 1;
        console.log(numOfPages);
        pages.hideExtPages(numOfPages);

        data.items.slice(start,end).forEach((item)=>{
            const card = new Card(item, api.getData, template);
            const cardElement = card.create();
            resultsContainer.render(cardElement);            
        })

          loader.hide();  
          pages.showPaginator();
    })
    .catch(err => {
        loader.hide();
        error.show(err.message)
        console.error(err);
    })
}






pages.addEventListener('click', (event)=>{
    if(event.target.classList.contains('page-link')){
        pages.activatePage(event.target);
        handler(event);
    }
})




resultsContainer.addEventListener('click',(event)=>{
    if(event.target.classList.contains('card')){
        modal.create(event.target);
        modal.show();
    } 
    if(!event.target.classList.contains('card')) {
        const card = event.target.closest('.card');
        if(card && !event.target.classList.contains('link')){
        modal.create(card);
        modal.show();
        }
        
    }
    
                 
            })