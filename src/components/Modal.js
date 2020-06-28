export default class Modal{
    constructor(api,modal) {
        this.api = api;
        this.modal = modal;

        this.setListener = this.setListener.bind(this);
    }

    create(card){
        const languages = this.modal.querySelector('.modal-languages');
        const contries =  this.modal.querySelector('.modal-contributors');
        
        this.modal.querySelector('.modal-title').textContent = card.querySelector('.title').textContent;

        this.modal.querySelector('.modal-avatar').src = card.querySelector('.avatar').src;

        this.modal.querySelector('.modal-last-commit').textContent = card.querySelector('.last-commit').textContent;

        this.modal.querySelector('.modal-stars').textContent = card.querySelector('.stars').textContent;

        this.api(card.getAttribute('data-url'))
        .then(data => {
            this.modal.querySelector('.modal-nick').textContent = data.owner.login;
            this.modal.querySelector('.modal-subtitle').textContent = data.description;

              this.api(data.languages_url)
                .then(langs =>{
                    languages.innerHTML = '';
                    Object.keys(langs).forEach((item)=>{
                        let lang = document.createElement('li');
                        lang.className = 'language';
                        lang.textContent = item;
                        languages.appendChild(lang);
                    })
                })
            
            this.api(data.contributors_url)
                .then(contrs => {
                    contries.innerHTML = '';
                    contrs.slice(0,10).forEach((item)=>{
                        let contr = document.createElement('li');
                        contr.className = 'contributor';
                        let link = document.createElement('a');
                        link.setAttribute('target', '_blank');
                        link.href = item.html_url;
                        link.textContent = item.login;
                        contr.appendChild(link);
                        contries.appendChild(contr)
                    })
                })

            
        })
    }

    show(){
        this.modal.style.display = 'block';
    }
    hide(){
        this.modal.style.display = 'none';
    }

    setListener(){
        this.modal.querySelector('.close').addEventListener('click', ()=>{
            this.hide();
        })
    }
}