require("dotenv").config();
const http = require("http");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("Введите город: ");
rl.on("line", (answer) => {
  currentWeather(answer);
});
function currentWeather(city) {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.apiKey}&query=${city}`;

  http
    .get(url, (res) => {
      let weather = "";
      res.on("data", (chunk) => (weather += chunk));
      res.on("end", () => {
        const objWeather = JSON.parse(weather)
        console.log(`Страна: ${objWeather.location.country}\nГород: ${objWeather.location.name}\nТемпература: ${objWeather.current.temperature}\nСкорость ветра: ${objWeather.current.wind_speed}`);
        process.exit(1);
      });
    })
    .on("error", (err) => {
      console.error(err);
    });
}
