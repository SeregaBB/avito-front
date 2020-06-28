export default class Card {
    constructor(data, api, template, handler) {
        this.data = data;
        this.api = api;
        this.template = template;

        
    }

    create() {
        const fragment = document.importNode(this.template.content, true);
        const title = fragment.querySelector('.title');
        const commits = fragment.querySelector('.last-commit');
        const stars = fragment.querySelector('.stars');
        const link = fragment.querySelector('.link');


        fragment.querySelector('.card').setAttribute('data-url', `https://api.github.com/repos/${this.data.full_name}`);
        title.textContent = this.data.full_name.split('/')[1];
        title.setAttribute('title', this.data.full_name.split('/')[1])
        fragment.querySelector('.avatar').src = this.data.owner.avatar_url;
        link.href = this.data.html_url;
        link.textContent = 'Page on GitHub'

        this.api(this.data.commits_url.slice(0, -6))
            .then(response => {
                const date = new Date(response[0].commit.author.date);
                commits.textContent = `Last commit ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


        this.api(this.data.stargazers_url)
            .then(data => {
                stars.textContent = `${stars.textContent} ${data.length}`;
                })
            })
            
            return fragment
    }

    
}