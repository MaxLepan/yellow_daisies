export default class Page {
    constructor(actualPage, nbPages) {
        if (Page._instance) {
            Page._instance.actualPage = actualPage
            Page._instance.nbPages = nbPages
            Page._instance.skipPage = false
            return Page._instance
        }
        this.actualPage = actualPage
        this.nbPages = nbPages
        this.skipPage = false
        Page._instance = this;
    }

    canSkipPage() {
        this.skipPage = true
    }

    changePage(newPage) {
        if (this.changePage) {
            this.actualPage = newPage
            this.skipPage = false
            return this.actualPage
        }else{
            throw 'Error you can\'t change the page !';
        }
    }
}