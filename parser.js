const axios = require("axios");
const cheerio = require("cheerio");

// in case need to write in json
// const pretty = require("pretty");
// const fs = require("fs");

{/* <div class="intro-board__list">
    <div class="intro-board__row">

        <div class="intro-board__item intro-board__item--hero">
            <div class="intro-board__title">8.9%</div>
            <div class="intro-board__desc">Годовая инфляция</div>
        </div>

        <div class="intro-board__item">
            <div class="intro-board__title">4-6%</div>
            <div class="intro-board__desc">Цель по инфляции</div>
        </div>
        
    </div>
</div>
</div><!-- /.intro-board --> */}


// URL of the page we want to scrape
const nationalbank = "https://nationalbank.kz/ru";
const investing = "https://markets.businessinsider.com/commodities/oil-price";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(nationalbank);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const percent = $(".intro-board__title")
    const inflation = percent.html()
    
    console.log(inflation)
    return inflation;

    


  } catch (err) {
    console.error(err);
  }
} //setInterval(scrapeData,  1000 * 60 * 60 * 24)

// Async function which scrapes the data
async function scrapeData2() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(investing);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const percent = $(".price-section__current-value")
    const brent =  percent.html();

    console.log(brent)
    return brent;

  } catch (err) {
    console.error(err);
  }
} //setInterval(scrapeData2, 900000)




// Invoke the above function
// scrapeData();
// scrapeData2();

