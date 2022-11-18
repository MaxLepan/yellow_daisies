const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const daisies = require("./database/bellis.json");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


//port http
app.listen(port, () =>
    console.log(`Example app listening on port ${port} !`),
);

app.use(express.static(__dirname + '/public'));

//select link to start
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/getNbFlowersPerDecade', (req, res) => {
    let decade = parseInt(req.body.decade);
    res.send(parseByRegion(filterByDecade(decade)));
});

app.post('/getNbInvasiveFlowersPerDecade', (req, res) => {
    let decade = parseInt(req.body.decade);
    res.send(parseByRegion(filterByInvasive(true, filterByDecade(decade))));
})

app.post('/getNbNonInvasiveFlowersPerDecade', (req, res) => {
    let decade = parseInt(req.body.decade);
    res.send(parseByRegion(filterByInvasive(false, filterByDecade(decade))));
})
app.post('/getPercentageInvasiveFlowersPerDecade', (req, res) => {
    let decade = parseInt(req.body.decade);
    res.send(percentageInvasive(decade));
})

app.post('/getSpeciesOccurrencesByDecade', (req, res) => {
    let decade = parseInt(req.body.decade);
    res.send(getSpeciesByDecade(filterByDecade(decade)));
})
app.post('/getSpeciesOccurrencesBySpecies', (req, res) => {
    let decade = parseInt(req.body.decade);
    let species = req.body.species;
    let region = req.body.region;
    console.log(parseByRegion(filterBySpecies(species, filterByDecade(decade)))[region])
    res.send({nb:parseByRegion(filterBySpecies(species, filterByDecade(decade)))[region]||0});
})

function filterByDecade(decade, oldArr = daisies) {
    let arr = [];
    for (let i = 0, j = oldArr.length; i < j; i++) {
        if (oldArr[i].decennie === decade) {
            arr.push(oldArr[i]);
        }
    }
    return arr;
}

function getSpeciesByDecade(oldArr = daisies) {

    const count = {};

    for (const element of oldArr) {
        if (count[element.nomScientifiqueRef]) {
            count[element.nomScientifiqueRef] += 1;
        } else {
            count[element.nomScientifiqueRef] = 1;
        }
    }

    return count;
}

function filterByInvasive(isInvasive, oldArr = daisies) {
    let arr = [];
    for (let i = 0, j = oldArr.length; i < j; i++) {
        if (isInvasive && oldArr[i].nomScientifiqueRef === "Erigeron karvinskianus") {
            arr.push(oldArr[i]);
        } else if (!isInvasive && oldArr[i].nomScientifiqueRef !== "Erigeron karvinskianus") {
            arr.push(oldArr[i]);
        }
    }
    return arr;
}
function filterBySpecies(species, oldArr = daisies) {
    let arr = [];
    for (let i = 0, j = oldArr.length; i < j; i++) {
        if (oldArr[i].nomScientifiqueRef === species) {
            arr.push(oldArr[i]);
        }
    }
    return arr;
}

function percentageInvasive(decade) {
    let flowers = parseByRegion(filterByDecade(decade));
    let nonInvasive = parseByRegion(filterByInvasive(false, filterByDecade(decade)));
    let percentByRegion = {}
    for (const regionName in flowers) {
        if (nonInvasive[regionName]) {
            percentByRegion[regionName] = nonInvasive[regionName]/flowers[regionName]*100
        } else {
            percentByRegion[regionName] = 0;
        }
    }
    return percentByRegion;
}

function parseByRegion(arr = daisies) {
    let obj = {};
    for (let i = 0, j = arr.length; i < j; i++) {
        if (obj[arr[i].region]) {
            obj[arr[i].region]++;
        } else {
            obj[arr[i].region] = 1;
        }
    }
    return obj;
}
percentageInvasive(2000);

