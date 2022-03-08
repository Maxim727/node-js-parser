const axios = require("axios");
const cheerio = require("cheerio");

// in case need to write in json
// const pretty = require("pretty");
// const fs = require("fs");

// URL of the page we want to scrape
const nationalbank = "https://nationalbank.kz/ru";

// OLD VERSION IN DB
let dataBODY = {
  inflation: 8.7,
  inflationbp: 0,
  baserate: 13.5,
  baseratebp: 0
}


// CURRENT VALUES
let newValues = {
  inflationNum: 8.7,
  baserateNum: 13.5
}

// VALUES TO COMPARE WITH
let previousValues = {
  inflationNum: 8.5,
  baserateNum: 14
}


// Async function which scrapes the data every 24h
async function nbValue24() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(nationalbank);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const percent = $(".intro-board__title")
    const base = $(".link-white")

    let inflation = percent.html()
    let baserate = base.html()

    // saving for calculation
    newValues.inflation = inflation.substring(0, inflation.length - 1) * 1;
    newValues.baserate = baserate.substring(0, baserate.length - 1) * 1;

    // saving for DB
    dataBODY.inflation = inflation.substring(0, inflation.length - 1) * 1;
    dataBODY.baserate = baserate.substring(0, baserate.length - 1) * 1;

    // calculating "Базисные пункты"
    dataBODY.inflationbp = (newValues.inflationNum - previousValues.inflationNum).toFixed(2) * 100
    dataBODY.baseratebp = (newValues.baserateNum - previousValues.baserateNum).toFixed(2) * 100

    console.log(dataBODY)

  } catch (err) {
    console.error(err);
  }
} 

// Async function which scrapes the data every 48h
async function nbValue48() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(nationalbank);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const percent = $(".intro-board__title")
    const base = $(".link-white")

    let inflation = percent.html()
    let baserate = base.html()

    previousValues.inflation = inflation.substring(0, inflation.length - 1) * 1;
    previousValues.baserate = baserate.substring(0, baserate.length - 1) * 1;

    console.log(previousValues.inflation)
    console.log(previousValues.baserate)

  } catch (err) {
    console.error(err);
  }
} 


// 1000 * 60 * 60 * 24 // 24hrs
// 900000 // 15min
// Updating once in 24hrs & 48hrs

setInterval(function () { nbValue24() }, 1000 * 60 * 60 * 24)
setInterval(function () { nbValue48() }, 1000 * 60 * 60 * 48)


//Updating the values in DB

setInterval(function() {
  axios.put('http://192.168.211.41:3000/api/v1/data/1', dataBODY)
  .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
  }).catch((err) => {
      console.error(err);
  });
}, 1000 * 60 * 60 * 24)
