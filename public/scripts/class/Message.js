export default class Message {
    constructor(actualMessage, nbMessage, page) {
        this.page = page
        this.actualMessage = actualMessage
        this.nbMessage = nbMessage
        this.start()
    }
    start(){
        document.querySelectorAll('#page'+ this.page + ' div[class^=text]').forEach((text,i)=>{
            if(i+1 !== this.actualMessage){
                document.querySelector('#page'+ this.page + ' .text' + (i+1)).classList.add('hidden');
            }else{
                this.changeMessage(this.actualMessage)
            }
        })
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
        document.querySelector('#page'+ this.page + ' .text' + this.actualMessage).classList.remove('hidden');
        return this.actualMessage
    }
}
