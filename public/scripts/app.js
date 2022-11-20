import Page from './class/Page.js'
import Message from './class/Message.js'

let page, messagepage2, messagepage5, messagepage9


function init() {
    document.querySelector('#page5 .sb3').classList.remove('hidden')
    document.querySelector('#page5 .blablaMouetteSearch').classList.add('hidden')
    document.querySelector('#page9>div>div>.next_button').classList.add('hidden')
    document.querySelector('#page9 .buttons').classList.remove('hidden')
    document.querySelector('#page9 .flowerContainer').classList.add('hidden')
    document.querySelector('#page9 .flowersContainer').classList.remove('hidden')
    page = new Page(1, document.querySelectorAll('body>section').length);
    messagepage2 = new Message(1, document.querySelectorAll('#page2 div[class^=text]').length, 2);
    messagepage5 = new Message(1, document.querySelectorAll('#page5 div[class^=text]').length, 5);
    messagepage9 = new Message(1, document.querySelectorAll('#page9 div[class^=text]').length, 9);

    document.querySelectorAll('a.goToNextPage, button.goToNextPage').forEach((button) => {
        console.log(button)
        button.addEventListener("click", () => {
            console.log("click", page.actualPage)
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
    document.querySelector('#page7 .goToNextPage').addEventListener("click", () => {

    }, false);
    document.querySelector('#page5 .next_button')?.addEventListener("click", () => {
        if (messagepage5.actualMessage === messagepage5.nbMessage - 1) {
            document.querySelector('#page5 .sb3').classList.add('hidden')
            document.querySelector('#page5 .blablaMouetteSearch').classList.remove('hidden')
            typeWriter();
        }
        if (messagepage5.actualMessage === messagepage5.nbMessage) {

            window.setTimeout(() => page.goToNextPage(), 4.0 * 1000)
        }
        messagepage5.goToNextMessage(page);
    }, false)
    getFlowersByDecade("1990")
    document.querySelectorAll(".year-btn")?.forEach((button) => {
        button.addEventListener("click", () => {
            getFlowersByDecade(button.value);
        }, false)
    })

    let i = 0;
    const txt = 'Voyager en France'; /* The text */
    const speed =50; /* The speed/duration of the effect in milliseconds */

    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("typingEffect").innerHTML += txt.charAt(i);
            console.log(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }


    window.invasiveButton = document.querySelector('#invasive-btn')
    console.log(window.invasiveButton)
    invasiveButton?.addEventListener("click", () => {
        invasiveButton.classList.toggle('active')
        if (invasiveButton.classList.contains('active')) {
            invasiveButton.querySelector('img').src = '/assets/img/invasive-filter-on.svg'
            getInvasiveFlowersByDecade(window.decade.toString())
        } else {
            invasiveButton.querySelector('img').src = '/assets/img/invasive-filter-off.svg'
            clearInvasiveBellis();
        }
    })

    window.nonInvasiveButton = document.querySelector('#non-invasive-btn')
    console.log(window.nonInvasiveButton)
    nonInvasiveButton?.addEventListener("click", () => {
        nonInvasiveButton.classList.toggle('active')
        if (nonInvasiveButton.classList.contains('active')) {
            nonInvasiveButton.querySelector('img').src = '/assets/img/non-invasive-filter-on.svg'
            getNonInvasiveFlowersByDecade(window.decade.toString())
        } else {
            nonInvasiveButton.querySelector('img').src = '/assets/img/non-invasive-filter-off.svg'
            clearNonInvasiveBellis();
        }
    })
    document.querySelectorAll(".regionC").forEach((button) => {
        button.addEventListener("click", () => {
            var idR = button.id;
            console.log(idR)
            onclickRegion(window.decade.toString(), idR);
        }, false)
    })
    console.log(window.regionButton)


    document.querySelectorAll('#page9 .next_button').forEach(button => {
        button.addEventListener("click", () => {
            if (messagepage9.actualMessage === 1) {
                document.querySelector('#page9 .flowerContainer').classList.remove('hidden')
                document.querySelector('#page9 .flowersContainer').classList.add('hidden')
                document.querySelector('#page9 .buttons').classList.add('hidden')
                document.querySelector('#page9>div>div>.next_button').classList.remove('hidden')
            }
            if (messagepage9.actualMessage === messagepage9.nbMessage - 1) {
                document.querySelector('#page9>div>div>.next_button').classList.add('hidden')
            }
            messagepage9.goToNextMessage(page);
        }, false)
    })

    document.querySelector('.goToPage-1')?.addEventListener("click", () => {
        location.reload();
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
window.decade = 2020;

window.decadeClick = function (decade) {
    window.decade = decade;
    if (invasiveButton.classList.contains('active')) {
        getInvasiveFlowersByDecade(decade);
    }
    if (nonInvasiveButton.classList.contains('active')) {
        getNonInvasiveFlowersByDecade(decade);
    }
}

function onclickRegion(decadeR, id) {
    console.log("start onclickRegion")
    //decter le click de la région
    // afficher les infos de la région pour l'année cliquée
    //btn je visite
    var popup = document.getElementById("defaultModal");
    popup.classList.remove("hidden");
    popup.ariaHidden = "false";
    var nbFleur;
    const params = new URLSearchParams();
    params.append('decade', decadeR);
    console.log("before /getNbFlowersPerDecade")
    axios.post('/getNbFlowersPerDecade', params).then((res) => {
        console.log("after /getNbFlowersPerDecade")
        nbFleur = res.data[id];

        const params3 = new URLSearchParams();
        params3.append('decade', decadeR);
        params3.append('region', id);
        console.log("after init")
        console.log("before /getSpeciesWithMostOccurent")
        axios.post('/getSpeciesWithMostOccurent', params3).then((res2) => {
            console.log("after /getSpeciesWithMostOccurent")
            console.log("salam")
            console.log("name Species => ", res2.data.name)
            const flowerValue = res2.data.name
            var soil;
            var soilName;
            var species;
            var soils;
            switch (flowerValue) {
                case "automn":
                    soil = "La forêt";
                    soils = "forêts"
                    soilName = "la paquerette d'automne"
                    species = "Bellis sylvestris"
                    break;
                case "muraille":
                    soil = "Les cailloux";
                    soils = "sols caillouteux"
                    soilName = "la paquerette des murailles"
                    species = "Erigeron karvinskianus"
                    break;
                case "prairie":
                    soil = "La prairie";
                    soils = "prairies"
                    soilName = "la paquerette des prairies"
                    species = "Bellis annua"
                    break;
                case "pomponette":
                    soil = "Le jardin";
                    soils = "jardins"
                    soilName = "la pomponette"
                    species = "Bellis";
                    break;
            }

            console.log(nbFleur)
            var croix = document.getElementById("closeButton");
            croix.addEventListener("click", () => {
                popup.classList.add("hidden");
                popup.ariaHidden = "true";
            })
            console.log("end onclickRegion")
            console.log("generateByRegion(", id, nbFleur, { flowerValue, soil, soils, soilName, species }, decadeR, ")")
            generateByRegion(id, nbFleur, { flowerValue, soil, soils, soilName, species }, decadeR)
        })
    })
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
        case 1:
            soil = "automn";
            soilName = "la paquerette d'automne"
            species = "Bellis sylvestris"
            break;
        case 2:
            soil = "muraille";
            soilName = "la paquerette des murailles"
            species = "Erigeron karvinskianus"
            break;
        case 3:
            soil = "prairie";
            soilName = "la paquerette des prairies"
            species = "Bellis annua"
            break;
        case 4:
            soil = "pomponette";
            soilName = "la pomponette"
            species = "Bellis";
            break;

    }
    document.querySelector('#page4 img').src = "../assets/img/" + soil + ".gif";
    document.querySelectorAll(".flowerChoice").forEach(flower => {
        flower.src = "../assets/img/flower_" + soil + ".svg";
    })
    document.querySelector("#page9 .flowersContainer>img").src = "../assets/img/" + soil + "_muraille" + ".svg";

    document.querySelectorAll(".mouette").forEach(mouette => { mouette.src = "../assets/img/mouette_" + soil + ".svg" })
    document.querySelector("#page5 .imageFlowerChoice").src = "../assets/img/photo_" + soil + ".svg";
    document.querySelector('.nameFlower').innerHTML = soilName
    window.actualSoil = soil
    window.species = species;
}

function generateByRegion(region, nbFlower, mostSpecies) {

    // page 7 popup
    document.getElementById("nomPaquerette").innerText = mostSpecies.soilName
    document.getElementById("nomPaqueretteS").innerText = mostSpecies.species
    document.getElementById("sol").innerHTML = "<strong>Type de sol : </strong>" + mostSpecies.soil
    document.getElementById("nomRegionC").innerText = region
    document.getElementById("nombrePaquerettes").innerHTML = "<strong>Nombre de Pâquerette : </strong>" + nbFlower

    // page 8
    document.getElementById("goInRegion").innerHTML = "Allons en région <strong>" + region + "</strong>"
    document.getElementById("descRegion").innerHTML = "Dans ette région, la pâquerette numéro 1 est la <strong>" + mostSpecies.species + "</strong>.<br />Tu pourras trouver beaucoup de " + mostSpecies.soils + " où t’implanter."

    // page 9
    document.getElementById("titleGraph").innerHTML = "Découvres les différentes pâquerettes<br />en <strong>" + region + "</strong>"
    document.querySelector("#page9 .flowersContainer>img").src = "../assets/img/" + window.actualSoil + "_" + mostSpecies.flowerValue + ".svg";
    onGenerateGraphData(region)
    window.region = region;
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


async function onGenerateGraphData(region) {
    const listCourbes = [
        {
            backgroundColor: "rgba(255, 232, 182, 1)",
            borderColor: "rgba(255, 205, 80, 1)",
            pointBackgroundColor: "rgba(255, 205, 80, 1)",
            pointBorderColor: "#fff"
        }, {
            backgroundColor: "rgba(188, 227, 213, 1)",
            borderColor: "rgba(90, 186, 151, 1)",
            pointBackgroundColor: "rgba(90, 186, 151, 1)",
            pointBorderColor: "#fff"
        }, {
            backgroundColor: "rgba(218, 193, 224, 1)",
            borderColor: "rgba(170, 118, 183, 1)",
            pointBackgroundColor: "rgba(170, 118, 183, 1)",
            pointBorderColor: "#fff"
        }, {
            backgroundColor: "rgba(204, 173, 173, 1)",
            borderColor: "rgba(79, 47, 47, 1)",
            pointBackgroundColor: "rgba(79, 47, 47, 1)",
            pointBorderColor: "#fff"
        },
    ]

    const listSpecies = ["Erigeron karvinskianus", "Bellis annua", "Bellis", "Bellis sylvestris"];
    let i = 0
    for(const speciesName of listSpecies) {
        i = parseInt(i)
        listCourbes[i].data = [];
        for (let j = 0; j < 4; j++) {
            let params = new URLSearchParams();
            params.append('decade', (1990 + j * 10) + "");
            params.append('species', speciesName);

            params.append('region', region || "Occitanie");
            await axios.post('/getSpeciesOccurrencesBySpecies', params).then((res) => {
                let value = 0
                if (res.data.nb) {
                    value = parseInt(Math.round(Math.sqrt(parseInt(res.data.nb))));
                }
                console.log("Value => ", value)
                
                if (parseInt(i)-1 >= 0) {
                    console.log("I => ", parseInt(listCourbes[i - 1].data[j]))
                    value += parseInt(listCourbes[i - 1].data[j])
                    console.log("Value + i => ", value)
                }
                listCourbes[i].data.push(value);

            })
        }

        console.log(listCourbes[i].data);
        i++
    }
    onCreateGraph(listCourbes);
}

function onCreateGraph(listCourbes) {
    const xValues = [1990, 2000, 2010, 2020];
    document.querySelector(".chartjs-size-monitor")?.remove()
    const myChart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: listCourbes
        },
        options: {

            legend: { display: false },
            scales: {
                yAxis: {
                    grid: false,
                    beginAtZero: true,
                    display: false
                }
            }
        },
    })
    console.log("dom ok")
}



window.addEventListener('load', () => {
    includeHTML()
    setTimeout(() => {
        document.querySelector('#onLoader').classList.add('hidden');
        init()
    }, 3000)
})