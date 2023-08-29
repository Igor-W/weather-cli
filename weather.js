#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.service.js";
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  TOKEN_DICTIONARY,
  getKeyValue,
  saveKeyValue,
} from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("No token provided");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token is saved");
  } catch (error) {
    printError(error.message);
  }
};
const saveCity = async (city) => {
  if (!city.length) {
    printError("No token provided");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.CITY, city);
    printSuccess("City is saved");
  } catch (error) {
    printError(error.message);
  }
};
const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.CITY));
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e?.response?.status == 404) printError("City is wrong");
    else if (e?.response?.status == 401) printError("Token is incorrect");
    else printError(e.message);
  }
};
const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  getForcast();
};

initCLI();
