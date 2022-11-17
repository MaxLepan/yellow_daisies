export default class Page {
    constructor(actualPage, nbPages) {
        if (Page._instance) {
            Page._instance.actualPage = actualPage
            Page._instance.nbPages = nbPages
            return Page._instance
        }
        this.actualPage = actualPage
        this.nbPages = nbPages
        Page._instance = this;
    }

    goToNextPage() {
        if (this.actualPage < this.nbPages) {
            this.changePage(this.actualPage + 1);
        }
    }

    changePage(newPage) {
        document.querySelector('body>#page' + this.actualPage).classList.add('hidden');
        this.actualPage = newPage
        console.log('body>#page' + this.actualPage)
        console.log(document.querySelector('body>#page' + this.actualPage))
        document.querySelector('body>#page' + this.actualPage).classList.add('flex');
        document.querySelector('body>#page' + this.actualPage).classList.remove('hidden');

        if (newPage == 6)
            getInvasiveFlowersByDecade(window.decade.toString(), window.isInvasive)

        return this.actualPage

    }
}
