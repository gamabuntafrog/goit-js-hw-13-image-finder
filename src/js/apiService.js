
export default class ImagesApiService {
    constructor() {
        this.req = '';
        this.page = 1;
    }

    fetchArticles() {
        console.log(this);

        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=24171560-aa5fd197445269f608c2688cc`

        return fetch(url).then(r => r.json()).then(data => {
            this.incrementPage()
            return data.hits
        })


    }

    incrementPage() {
        this.page +=1;
    }
    get query() {
        return this.req;
    }

    resetPage() {
        this.page = 1;
    }

    set query(newQuery) {
        this.req = newQuery;
    }
}

// export default fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${name}&page=1&per_page=10&key=24171560-aa5fd197445269f608c2688cc`).then((res) => { return res.json() })



