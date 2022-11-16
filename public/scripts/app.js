import Page from './class/page.js'
let page
function init() {
    page = new Page(1, document.querySelectorAll('body>section').length)
}
axios.get('/')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        console.log("always passed")
    });

window.addEventListener('load', ()=>{
    init()
})