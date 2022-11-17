import Page from './class/Page.js'
import Message from './class/Message.js'

let page, messagepage2, messagepage5

function init() {
    page = new Page(1, document.querySelectorAll('body>section').length);
    messagepage2 = new Message(1, document.querySelectorAll('#page2 div[class^=text]').length, 2);
    messagepage5 = new Message(1, document.querySelectorAll('#page5 div[class^=text]').length, 5);
    document.querySelector('#changepagedebug').addEventListener('input', (e) => {
        if (e.target.value) page.changePage(e.target.value)
    })
    document.querySelectorAll('a.goToNextPage')?.forEach((button) => {
        button.addEventListener("click", () => {
            page.goToNextPage();
        }, false)
    })

    document.querySelector('#page2 .next_button').addEventListener("click", () => {
        messagepage2.goToNextMessage(page);
    }, false)
    document.querySelector('#page5 .next_button').addEventListener("click", () => {
        messagepage5.goToNextMessage(page);
    }, false)
}

function getFlowersByDecade(decade) {

    const params = new URLSearchParams();
    params.append('decade', decade);

    axios.post('/getNbFlowersPerDecade', params).then((res) => {
        let values = Object.values(res.data)
        const max = Math.max(...values)
        const min = Math.min(...values)
        document.querySelectorAll(".region").forEach((region) => {
            region.style.fill = "#D9D9D9";
            region.style.opacity = 1;
        })

        for (const region in res.data) {
            document.querySelectorAll('#' + region + ' > path').forEach(path => {
                path.style.fill = "#2D6C56";
                let diff = max - min;
                path.style.opacity = ((res.data[region] - min) / diff) * 0.6 + 0.4;
            })
        }
    })
}

function bellisClick(event) {
    let region = event.target.dataset.region;

    console.log(region);

}

let imgs = []

function clearBellis() {
    imgs?.forEach(img => {
        img.remove();
    })
}

window.isInvasive = false;
window.decade = 1990;


window.invasiveClick = function (isInvasiveClick) {
    getInvasiveFlowersByDecade(window.decade.toString(), isInvasiveClick)
}

window.decadeClick = function (decadeClick) {
    getInvasiveFlowersByDecade(decadeClick, window.isInvasive)

}


window.getInvasiveFlowersByDecade = function (decade, isInvasive) {

    window.isInvasive = isInvasive;
    window.decade = decade;

    const params = new URLSearchParams();
    params.append('decade', decade);

    axios.post('/getPercentageInvasiveFlowersPerDecade', params).then((res) => {
        clearBellis();
        for (const region in res.data) {

            document.querySelectorAll('#' + region).forEach(path => {

                //A clean tard plu

                let img = document.createElement('img');


                if (isInvasive)
                    img.src = '/assets/img/invasive-icon.svg';
                else
                    img.src = '/assets/img/non-invasive-icon.svg';


                img.classList.add('img-invasive-add');
                let left = `${parseInt(getPositionXY(path)[0])}px`;
                let top = `${parseInt(getPositionXY(path)[1])}px`;
                img.dataset.region = region;
                img.addEventListener("click", bellisClick);
                img.style.left = left;
                img.style.top = top;

                imgs.push(img);
                document.querySelector('#page6').appendChild(img);

                function getPositionXY(element) {
                    var rect = element.getBoundingClientRect();
                    var childRect = element.children[0].getBoundingClientRect();
                    return [rect.x + childRect.width / 2 - window.innerWidth * 0.025, rect.y + childRect.height / 2 - window.innerWidth * 0.025];
                }


            })
        }


    })
}


getFlowersByDecade("1990")
document.querySelectorAll(".year-btn").forEach((button) => {
    button.addEventListener("click", () => {
        getFlowersByDecade(button.value);
    }, false)
})

const params2 = new URLSearchParams();

params2.append('decade', "1990");

axios.post('/getPercentageInvasiveFlowersPerDecade', params2).then((res) => {
    //console.log(res.data["Auvergne-Rhone-Alpes"]);
    let nbPetals = Math.floor(res.data["Auvergne-Rhone-Alpes"] / 100 * 22);
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