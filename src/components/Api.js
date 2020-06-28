export default class Api {
    constructor(token, mainUlr) {
        this.token = token;
        this.mainUrl = mainUlr;
    }


    search(query) {
        return fetch(`${this.mainUrl}search/repositories?q=${query}`, {
            headers: {
                authorization: this.token
            }
        })
            .then(response => response.ok ? response.json() : response)
    }

    getData(url) {
        return fetch(url, {
            headers: {
                authorization: this.token
            }
        })
            .then(response => response.ok ? response.json() : response)
    }

}