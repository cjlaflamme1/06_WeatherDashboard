$(document).ready(function() {
    // All of the current weather hooks
    const currentDate = moment().format('L');
    const cityAndDate = $('h2.cityDateValue');
    const currentIcon = $('img.currentWeatherIcon');
    const currentTemp = $('span.currentTempValue');
    const currentWind = $('span.currentWindSpeedValue');
    const currentUV = $('span.currentUVIndexValue');
    // All of the forecast hooks
    const forecastContent = $('div.forecastContent');
    const forecastDate = $('h6.forecastDate');
    const forecastIcon = $('img.forecastPic');
    const forecastTemp = $('span.tempValue');
    const forecastHumidity = $('span.humidityValue');
    // Establish search history for buttons
    let searchHistory = JSON.parse(window.localStorage.getItem('searchHistory')) || [];
    // Button creation for the search history
    const buttonRow = $('div.buttonRow');
    const historyButton = $('<button>').addClass('btn btn-light btn-lg btn-block historyButton');
    
    $('button.weatherSubmit').on("click", function(event) {
        event.preventDefault();
        // API Keys and their documentation
        // https://openweathermap.org/api/one-call-api#how
        const weatherApiKey = "95f8c20b3dbfd6ef88b8d05477161fb2";
        // https://positionstack.com/quickstart
        const geocodeApiKey = "05f7e859be5401b4c8ef273ab790760d";
        // takes the value of the weather input.
        const locationInput = $('input').val();
        console.log(locationInput);
        // Grabs the Lat/Long of the input location.
        const queryURL = `http://api.positionstack.com/v1/forward?access_key=${geocodeApiKey}&query=${locationInput}`;
        // Querys the geocode API
        $.get(queryURL).then(function(returnedLatLong) {
            const lat = returnedLatLong.data[0].latitude;
            const long = returnedLatLong.data[0].longitude;
            console.log(returnedLatLong);
            const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${weatherApiKey}&units=imperial`;
            // Uses newly acquired lat/long to find weather for the location.
            $.get(weatherURL).then(function(returnedWeather) {
                console.log(returnedWeather);
                const { current: {temp, wind_speed, uvi, weather: {[0]:{icon}}}, daily} = returnedWeather;
                cityAndDate.text(`${locationInput} (${currentDate})`);
                currentIcon.attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
                currentTemp.text(temp);
                currentWind.text(wind_speed);
                currentUV.text(uvi);

                forecastContent.each(function(forecastDay) {
                    console.log(forecastDay);
                    $(forecastDate[forecastDay]).text(moment().add(forecastDay, 'days').format('ddd'));
                    $(forecastIcon[forecastDay]).attr("src", `http://openweathermap.org/img/wn/${daily[forecastDay].weather[0].icon}@2x.png`);
                    $(forecastTemp[forecastDay]).text(daily[forecastDay].temp.day);
                    $(forecastHumidity[forecastDay]).text(daily[forecastDay].humidity);
                })

                searchHistory.push({value: locationInput, lat: lat, long: long});
                window.localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                console.log(searchHistory);
                historyButton.attr('data-lat', lat).attr('data-long', long).attr('value', locationInput).text(locationInput);
                buttonRow.prepend(historyButton);
            })
        })
    })

    
})