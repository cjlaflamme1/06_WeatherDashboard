$(document).ready(function() {
    
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
            console.log(lat,long);
            const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${weatherApiKey}`;
            // Uses newly acquired lat/long to find weather for the location.
            $.get(weatherURL).then(function(returnedWeather) {
                console.log(returnedWeather);
            })
        })
    })

    
})