export default class GifBySoil {
    constructor(actualGif, nbGif, page) {
        this.page = page
        this.actualGif = actualGif
        this.nbGif = nbGif
    }

    changeMessage(newMessage) {
        if(document.querySelector())
        document.querySelector('#page'+ this.page + ' #1' + this.actualGif).classList.add('hidden');
        this.actualGif = newMessage
        console.log('#page'+ this.page + ' .text' + this.actualGif)
        document.querySelector('#page'+ this.page + ' #1' + this.actualGif).classList.remove('hidden');
        return this.actualGif
    }
}
