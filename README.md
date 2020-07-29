# 06_WeatherDashboard
## Homework #6
### About the Project

For our sixth homework assignment, we were tasked with created a mobile-first and responsively designed Weather App.  The app needs to be able to retrieve weather for various cities and show the current for 5-day forecast.  

[Link to website](https://cjlaflamme1.github.io/06_WeatherDashboard/)

---
### Biggest Challenges

1. On this project, I decided to first work with the script and apis.  We were given OpenWeatherApp as a source to retrieve weather from.  After viewing some of their API options, I decided on the "one-call" API since it provided all of the information I required in an easy to navigate JSON object.  The issue I first encountered was that it required Lat/Long input for locations.  After searching through several Geocode APIs I settled on one that didn't work out.  The free API key provided was not HTTPS and luckily I quickly learned that was a problem with the GitHub Pages deployment.  I also found that the actual location of the retrieved coordinates, were usually not what I was actually looking for.  

2. The Geocode I finally decided on was from opencagedata.com.  The search results were more consistent in my expected location, but I was still encountering some mis-represented weather.  Eventually, I decided on capturing the actual location from the geocode api response, and presenting that with the weather, so that the end user could see very specifically where the weather forecast is from, and add more specific locations as necessary.  This seemed faster, more efficient, and less cumbersome for the user than having very strict parameters for a search. 

3. The multiple API requests forced me to nest an AJAX GET request within another.  This didn't present much additional challenge but since I had to refactor once for the new geocode API, so decided to try my luck with deconstructing the returning objects.  After reading through a couple of articles, this seemed like a fairly intuitive process for this application and made the code much easier to read.  The only information I didn't fully destructure was the forecast Array.  Since I was intending to loop through the information, I was worried I may run into issues so I left that as an array. 

---
### Screen Shots

![Weather Page](.assets/screenShot.jpg)