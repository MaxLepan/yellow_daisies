import daisies from '../bellis.json' assert { type: "json" };

function getCount(decade) {
    let obj = {};
    for (let i = 0, j = daisies.length; i < j; i++) {
        if (daisies[i].decennie === decade) {
            if (obj[daisies[i].region]) {
                obj[daisies[i].region]++;
            } else {
                obj[daisies[i].region] = 1;
            }
        }
    }
    return obj;
}

console.log(getCount(1990));
