import Page from './class/Page.js'
import Message from './class/Message.js'
let page, messagepage2, messagepage5, messagepage9


function init() {
    document.querySelector('#page9 .next_button').classList.remove('hidden')
    page = new Page(1, document.querySelectorAll('body>section').length);
    messagepage2 = new Message(1, document.querySelectorAll('#page2 div[class^=text').length, 2);
    messagepage5 = new Message(1, document.querySelectorAll('#page5 div[class^=text').length, 5);
    messagepage9 = new Message(1, document.querySelectorAll('#page9 div[class^=text').length, 9);
    document.querySelector('#changepagedebug').addEventListener('input', (e) => {
        if (e.target.value) page.changePage(e.target.value)
    })

  document.querySelectorAll('a.goToNextPage, button.goToNextPage')?.forEach((button) => {
        button.addEventListener("click", () => {
            page.goToNextPage();
        }, false)
    })

    document.querySelectorAll('a[class^=goToPage-], button[class^=goToPage-]').forEach((button) => {
        const pageDirection = button.className[button.className.indexOf('goToPage-') + 9]
        button.addEventListener("click", () => {
            page.changePage(pageDirection);
        }, false)
    })

    document.querySelector('#page2 .next_button')?.addEventListener("click", () => {
        messagepage2.goToNextMessage(page);
    }, false)

    document.querySelectorAll('#page3 .goToNextPage')?.forEach(soil => {
        soil.addEventListener("click", () => {
            getChosenSoil();
           window.setTimeout(() => page.goToNextPage(), 5.9 * 1000);
        }, false)
    })
    
    document.querySelector('#page5 .next_button')?.addEventListener("click", () => {
        messagepage2.goToNextMessage(page);
    }, false)

    document.querySelector('#page5 .next_button')?.addEventListener("click", () => {
        messagepage5.goToNextMessage(page);
    }, false)
    document.querySelector('#page9 .next_button').addEventListener("click", () => {
        if(messagepage9.actualMessage === messagepage9.nbMessage-1){
            document.querySelector('#page9 .next_button').classList.add('hidden')
    getFlowersByDecade("1990")
    document.querySelectorAll(".year-btn")?.forEach((button) => {
        button.addEventListener("click", () => {
            getFlowersByDecade(button.value);
        }, false)
    })

    window.invasiveButton = document.querySelector('#invasive-btn')
    console.log(window.invasiveButton)
    window.invasiveButton?.addEventListener("click", () => {
        window.invasiveButton.classList.toggle('active')
        if (window.invasiveButton.classList.contains('active')) {
            getInvasiveFlowersByDecade(window.decade.toString())
        } else {
            clearBellis();
        }
    })
        }
        messagepage9.goToNextMessage(page);
    }, false)
    document.querySelector('.goToPage-1')?.addEventListener("click", () => {
        init()
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

window.isInvasive = true;
window.decade = 1990;

window.decadeClick = function (decade) {
    window.decade = decade;
    if (window.invasiveButton.classList.contains('active')) {
        getInvasiveFlowersByDecade(decade);
    }
}

window.getInvasiveFlowersByDecade = function (decade) {

    //window.isInvasive = isInvasive;
    console.log(decade)
    window.decade = decade;

    const params = new URLSearchParams();
    params.append('decade', decade);

    axios.post('/getPercentageInvasiveFlowersPerDecade', params).then((res) => {
        clearBellis();
        for (const region in res.data) {
            document.querySelectorAll('#' + region).forEach(path => {

                let img = document.createElement('img');


                if (res.data[region] >= 50)
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
                    var childRect = element.getBoundingClientRect();
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

function getChosenSoil() {
    for (let i = 1; i <= 4; i++) {
        document.querySelector('#soil' + i).addEventListener("click", () => {
            generateBySoil(i);
            window.soil = i;
        })
    }
}

function generateBySoil(soil) {
    switch (soil) {
        case 1 :
            soil = "automn";
            break;
        case 2 :
            soil = "muraille";
            break;
        case 3 :
            soil = "prairie";
            break;
        case 4 :
            soil = "pomponette";
            break;

    }
    document.querySelector('#page4 img').src = "../assets/img/" + soil + ".gif";
    document.querySelector("#page5 .flowerChoice").src = "../assets/img/flower_" + soil + ".svg";
    document.querySelector("#page5 .imageFlowerChoice").src = "../assets/img/photo_" + soil + ".svg";

}

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