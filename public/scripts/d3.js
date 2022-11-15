<<<<<<< Updated upstream

async function csvParse(d3) {
    await d3.csv("./../BELLIS-VS-ERIGERON.csv", function (data) {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].nomScientifiqueRef);
        }
        console.log(data);
    })
}

=======
>>>>>>> Stashed changes
