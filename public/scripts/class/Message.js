export default class Message {
    constructor(actualMessage, nbMessage, page) {
        this.page = page
        this.actualMessage = actualMessage
        this.nbMessage = nbMessage
    }

    goToNextMessage(page) {
        if (this.actualMessage < this.nbMessage) {
            this.changeMessage(this.actualMessage + 1);
        }else{
            page.goToNextPage()
        }
    }

    changeMessage(newMessage) {
        document.querySelector('#page'+ this.page + ' .text' + this.actualMessage).classList.add('hidden');
        this.actualMessage = newMessage
        console.log('#page'+ this.page + ' .text' + this.actualMessage)
        document.querySelector('#page'+ this.page + ' .text' + this.actualMessage).classList.remove('hidden');
        return this.actualMessage
    }
}
