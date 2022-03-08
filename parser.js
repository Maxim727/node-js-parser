const axios = require("axios");
const cheerio = require("cheerio");
// in case need to write in json
// const pretty = require("pretty");
// const fs = require("fs");

// URL of the page we want to scrape
const nationalbank = "https://nationalbank.kz/ru";
//const investing = "https://markets.businessinsider.com/commodities/oil-price";

let dataBODY = {
  inflation: '8.7%',
  //brent: '71.63',
  baserate: '9.75%'
}

let numInfl = 0;
let numBase = 0;

let newNumInfl = 0;
let newNumBase = 0;


function convertFromStrToNumb(inflation, baserate){
   this.numInfl = this.dataBODY.inflation.parseFloat() 
   this.numBase = this.dataBODY.baserate.parseFloat()
}

function calcTrend(){
  
}

// Async function which scrapes the data
async function nbValue() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(nationalbank);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const percent = $(".intro-board__title")
    const base = $(".link-white")

    dataBODY.inflation = percent.html()
    dataBODY.baserate = base.html()

    dataBODY.inflation.substring(0, dataBODY.inflation.length - 1)
    dataBODY.baserate.substring(0, dataBODY.baserate.length - 1)

     console.log(dataBODY.inflation)
     console.log(dataBODY.baserate)

  } catch (err) {
    console.error(err);
  }
} //setInterval(nbValue,  1000 * 60 * 60 * 24)

// Async function which scrapes the data
// async function brentValue() {
//   try {
//     // Fetch HTML of the page we want to scrape
//     const { data } = await axios.get(investing);
//     // Load HTML we fetched in the previous line
//     const $ = cheerio.load(data);
//     // Select all the list items in plainlist class
//     const percent = $(".price-section__current-value")
//
//     dataBODY.brent = percent.html();
//
//     console.log(dataBODY.brent)
//
//   } catch (err) {
//     console.error(err);
//   }
// }
//
// 1000 * 60 * 60 * 24 // 24hrs
// 900000 // 15min


// Updating once in 24hrs
setInterval(function () { nbValue() }, 1000 * 60 * 60 * 24)

// Updating every 15 minutes
//setInterval(function () { brentValue() }, 900000)

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
