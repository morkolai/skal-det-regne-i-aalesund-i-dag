fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=2&lat=62.472229&lon=6.149482")
    .then(response => response.json())
    .then(data => main(data));


function calculateTodaysRainfall(weather_data) {

    const timeseries = weather_data.properties.timeseries;

    let index = 0;
    const todayDate = timeseries[index].time.slice(8, 10);
    let iterDate = todayDate;
    let rainfall = 0;

    while (todayDate === iterDate) {
        rainfall += timeseries[index].data.next_1_hours.details.precipitation_amount;
        //console.log(`index:${index} date:${iterDate} rainfall:${rainfall}`)
        index++;
        iterDate = timeseries[index].time.slice(8, 10);
    }

    return rainfall;
}

function main(weather_data) {

    const rainfall = calculateTodaysRainfall(weather_data);

    let result = "Nei";

    if (rainfall > 0) {
        result = "Ja";
    }

    document.getElementById("result").innerHTML = result;
}


