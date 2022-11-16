import Page from './class/Page.js'
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

const params = new URLSearchParams();
params.append('decade', "1990");

axios.post('/getNbInvasiveFlowersPerDecade', params).then((res) => {
    for (const region in res.data) {
        document.querySelectorAll('#' + region + ' > path').forEach(path => {
            path.style.fill = "#000";
            path.style.opacity = "0.4";
        })
    }
})


const params2 = new URLSearchParams();

params2.append('decade', "1990");

axios.post('/getPercentageInvasiveFlowersPerDecade', params2).then((res) => {
    console.log(res.data["Auvergne-Rhone-Alpes"]);
    let nbPetals = Math.floor(res.data["Auvergne-Rhone-Alpes"]/100*22);
    for (let i = 1; i <= 22; i++) {
            document.querySelectorAll('#_' + i).forEach(path => {
                path.style.fill = nbPetals < i ? "#000" : "#ededed";
                path.style.opacity = "0.8";

            })
        }
})

window.addEventListener('load', () => {
    init()
})