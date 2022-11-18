import Page from './class/Page.js'
import Message from './class/Message.js'

let page, messagepage2, messagepage5, messagepage9


function init() {
    document.querySelector('#page5 .sb3').classList.remove('hidden')
    document.querySelector('#page5 .blablaMouetteSearch').classList.add('hidden')
    document.querySelector('#page9>div>div>.next_button').classList.add('hidden')
    document.querySelector('#page9 .buttons').classList.remove('hidden')
    page = new Page(1, document.querySelectorAll('body>section').length);
    messagepage2 = new Message(1, document.querySelectorAll('#page2 div[class^=text]').length, 2);
    messagepage5 = new Message(1, document.querySelectorAll('#page5 div[class^=text]').length, 5);
    messagepage9 = new Message(1, document.querySelectorAll('#page9 div[class^=text]').length, 9);
    document.querySelector('#changepagedebug').addEventListener('input', (e) => {
        if (e.target.value) page.changePage(e.target.value)
    })

    document.querySelectorAll('a.goToNextPage, button.goToNextPage').forEach((button) => {
        console.log(button)
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
            window.setTimeout(() => page.goToNextPage(), 6.0 * 1000);
        }, false)
    })

    document.querySelector('#page5 .next_button')?.addEventListener("click", () => {
        if (messagepage5.actualMessage === messagepage5.nbMessage - 1) {
            document.querySelector('#page5 .sb3').classList.add('hidden')
            document.querySelector('#page5 .blablaMouetteSearch').classList.remove('hidden')
        }
        messagepage5.goToNextMessage(page);
    }, false)
    getFlowersByDecade("1990")
    document.querySelectorAll(".year-btn")?.forEach((button) => {
        button.addEventListener("click", () => {
            getFlowersByDecade(button.value);
        }, false)
    })

    window.invasiveButton = document.querySelector('#invasive-btn')
    console.log(window.invasiveButton)
    invasiveButton?.addEventListener("click", () => {
        invasiveButton.classList.toggle('active')
        if (invasiveButton.classList.contains('active')) {
            getInvasiveFlowersByDecade(window.decade.toString())
        } else {
            clearInvasiveBellis();
        }
    })

    window.nonInvasiveButton = document.querySelector('#non-invasive-btn')
    console.log(window.nonInvasiveButton)
    nonInvasiveButton?.addEventListener("click", () => {
        nonInvasiveButton.classList.toggle('active')
        if (nonInvasiveButton.classList.contains('active')) {
            getNonInvasiveFlowersByDecade(window.decade.toString())
        } else {
            clearNonInvasiveBellis();
        }
    })

    document.querySelectorAll('#page9 .next_button').forEach(button => {
        button.addEventListener("click", () => {
            if (messagepage9.actualMessage === 1) {
                document.querySelector('#page9>div>div>.next_button').classList.remove('hidden')
                document.querySelector('#page9 .buttons').classList.add('hidden')
            }
            if (messagepage9.actualMessage === messagepage9.nbMessage - 1) {
                document.querySelector('#page9>div>div>.next_button').classList.add('hidden')
            }
            messagepage9.goToNextMessage(page);
        }, false)
    })

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

let imgsInvasive = []
let imgsNonInvasive = []

function clearInvasiveBellis() {
    imgsInvasive?.forEach(img => {
        img.remove();
    })
}

function clearNonInvasiveBellis() {
    imgsNonInvasive?.forEach(img => {
        img.remove();
    })
}

window.isInvasive = true;
window.decade = 1990;

window.decadeClick = function (decade) {
    window.decade = decade;
    if (invasiveButton.classList.contains('active')) {
        getInvasiveFlowersByDecade(decade);
    }
    if (nonInvasiveButton.classList.contains('active')) {
        getNonInvasiveFlowersByDecade(decade);
    }
}

window.getInvasiveFlowersByDecade = function (decade) {

    //window.isInvasive = isInvasive;
    window.decade = decade;

    const params = new URLSearchParams();
    params.append('decade', decade);

    axios.post('/getPercentageInvasiveFlowersPerDecade', params).then((res) => {
        clearInvasiveBellis();
        for (const region in res.data) {
            document.querySelectorAll('#' + region).forEach(path => {

                let img = document.createElement('img');

                if (res.data[region] >= 50) {
                    img.src = '/assets/img/invasive-icon.svg';

                    img.classList.add('img-invasive-add');
                    let left = `${parseInt(getPositionXY(path)[0])}px`;
                    let top = `${parseInt(getPositionXY(path)[1])}px`;
                    img.dataset.region = region;
                    img.addEventListener("click", bellisClick);
                    img.style.left = left;
                    img.style.top = top;

                    imgsInvasive.push(img);
                    document.querySelector('#page7').appendChild(img);
                }

                function getPositionXY(element) {
                    var rect = element.getBoundingClientRect();
                    var childRect = element.getBoundingClientRect();
                    return [rect.x + childRect.width / 2 - window.innerWidth * 0.025, rect.y + childRect.height / 2 - window.innerWidth * 0.025];
                }
            })
        }
    })
}

window.getNonInvasiveFlowersByDecade = function (decade) {

    //window.isInvasive = isInvasive;
    window.decade = decade;

    const params = new URLSearchParams();
    params.append('decade', decade);

    axios.post('/getPercentageInvasiveFlowersPerDecade', params).then((res) => {
        clearNonInvasiveBellis();
        for (const region in res.data) {
            document.querySelectorAll('#' + region).forEach(path => {

                let img = document.createElement('img');


                if (res.data[region] < 50) {
                    img.src = '/assets/img/non-invasive-icon.svg';

                    img.classList.add('img-invasive-add');
                    let left = `${parseInt(getPositionXY(path)[0])}px`;
                    let top = `${parseInt(getPositionXY(path)[1])}px`;
                    img.dataset.region = region;
                    img.addEventListener("click", bellisClick);
                    img.style.left = left;
                    img.style.top = top;

                    imgsNonInvasive.push(img);
                    document.querySelector('#page7').appendChild(img);

                    function getPositionXY(element) {
                        var rect = element.getBoundingClientRect();
                        var childRect = element.getBoundingClientRect();
                        return [rect.x + childRect.width / 2 - window.innerWidth * 0.025, rect.y + childRect.height / 2 - window.innerWidth * 0.025];
                    }
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
    let soilName
    let species;
    switch (soil) {
        case 1 :
            soil = "automn";
            soilName = "la paquerette d'automne"
            species = "Bellis sylvestris"
            break;
        case 2 :
            soil = "muraille";
            soilName = "la paquerette des mulailles"
            species = "Erigeron karvinskianus"
            break;
        case 3 :
            soil = "prairie";
            soilName = "la paquerette des prairies"
            species = "Bellis annua"
            break;
        case 4 :
            soil = "pomponette";
            soilName = "la pomponette"
            species = "Bellis";
            break;

    }
    document.querySelector('#page4 img').src = "../assets/img/" + soil + ".gif";
    document.querySelector("#page5 .flowerChoice").src = "../assets/img/flower_" + soil + ".svg";
    document.querySelector("#page5 .imageFlowerChoice").src = "../assets/img/photo_" + soil + ".svg";
    document.querySelector('.nameFlower').innerHTML = soilName

    window.species = species;
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

function getSpeciesOccurencesByDecade() {
    const listCourbes = [{
        borderColor: "#EEAAFF",
        fill: false,
        pointRadius: 20,
        pointBackgroundColor: fillPattern
    }, {
        borderColor: "#F8CCD0",
        fill: false,
    }, {
        borderColor: "#FFCD50",
        fill: false
    }, {
        borderColor: "#A7214B",
        fill: false
    }]
    const listSpecies=["Bellis sylvestris","Erigeron karvinskianus", "Bellis annua", "Bellis"];
    listSpecies.forEach((speciesName,i) => {
        listCourbes[i].data=[];
        for(let j=0; j< 4; j++) {
            let params = new URLSearchParams();
            params.append('decade', (1990 + j*10)+"");
            params.append('species', speciesName);
            params.append('region', "Occitanie");
            axios.post('/getSpeciesOccurencesByDecade', params).then((res) => {
                let values = Object.values(res.data);
                listCourbes[i].data.push(values);

            })
        }

    })
    onGenerateGraph(listCourbes);


}

function onGenerateGraph(listCourbes) {
    const img = new Image();
    img.src = '../assets/img/prairieChart.png';

    img.onload = function () {
        const ctx = document.getElementById('myChart').getContext('2d');
        const fillPattern = ctx.createPattern(img, 'repeat');
        var xValues = [1990, 2000, 2010, 2020];
        var myChart = new Chart("myChart", {
            type: "line",
            borderColor: "#4F2F2F",
            color: "#4F2F2F",
            data: {
                labels: xValues,
                datasets: listCourbes
            },
            options: {
                legend: {display: false},
                events: ['click'],
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                },
            }
        });

    };
    console.log("dom ok")
}



window.addEventListener('load', () => {
    includeHTML()
    setTimeout(() => {
        init()
        onGenerateGraph()
    }, 1000)
})