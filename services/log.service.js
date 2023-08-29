import chalk from 'chalk';
import dedent from 'dedent-js';
const printError = (error) => {
    console.log(chalk.bgRed('Error ' + error));
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen('Success ' + message));
}


const printHelp = () => {
    console.log(     
        dedent`${chalk.bgCyan(` HELP `)}
        Without parammiters - weather forecast
        -s [CITY] for seting up city
        -h help
        -t [API_KEY] for saving token
        `
    );
}
const printWeather = (res, icon) => {
    console.log(     
        dedent`${chalk.bgYellow(` WEATHER `)} in the city ${res.name}
        ${icon} ${res.weather[0].description}
        Temirature: ${res.main.temp} (feels like ${res.main.feels_like})
        Humidity: ${res.main.humidity}
        Wind: ${res.wind.speed}
        `
    );
}
export {printError, printSuccess, printHelp, printWeather};