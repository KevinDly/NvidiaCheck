const puppeteer = require('puppeteer');
const NVIDIA_STORE = 'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us';
const CLASS_PRODUCT_DETAILS_STRING = '.product-details-list-tile';
const CLASS_NVIDIA_OOS = 'featured-buy-link link-btn brand-green  cta-button stock-grey-out';
const NVIDIA_INSTOCK = 'featured-buy-link link-btn brand-green cta-button js-add-button';
const NVIDIA_GEFORCE_3080 = 'NVIDIA GEFORCE RTX 3080';
const CLASS_NOICON = '.noicon';
const OOS = "OUT OF STOCK";
const cooldown = 3;
const NVIDIA_3080_URL = 'https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3080/'

//TODO: Repeatidly call this script, with timer delay
//TODO: Need to close page rather than browser after every call
//TODO: Need to remove browser from gpuSearch and have it created outside.
//TODO: Need to make function return a promise
//TODO: Add sound that signals if card was found.

async function gpuSearch(){
    var browser, inStock; 
    try{
        browser = await puppeteer.launch();
        var page = await browser.newPage();
        
        //Taken from the following:
        //https://www.scrapehero.com/how-to-increase-web-scraping-speed-using-puppeteer/#:~:text=To%20block%20images%2C%20we%20have%20to%20set%20up%20a%20Request%20Interception.&text=In%20the%20existing%20script%20add,%7D)%3B%20let%20page%20%3D%20await%20browser.
        await page.setRequestInterception(true);
        
        page.on('request', (req) => {
            if(req.resourceType() === 'image'){
                req.abort();
            }
            else{
                req.continue();
            }
        });
        
        await page.goto(NVIDIA_3080_URL,{
            timeout: 0
            });
        
        console.log("Went to page!");
        
        //Grab the list of document elements that are graphics cards.
        
        var data = await page.evaluate(() => document.body.innerHTML);
        var doc = await page.$$(CLASS_NOICON);
        
        //Might need to iterate if they decide to change the html again.
        var innerText = await doc[1].getProperty('innerText');
        var jsonText = await innerText.jsonValue();
        var jsonUpper = jsonText.toUpperCase();
        
        if(jsonUpper.includes(OOS)){
            console.log("3080 is not in stock!")
        }
        else{
            console.log("3080 is in stock!")
        }
        
        //Probably dont close browser every time?
    }
    catch(err){
        console.log('Error has occurred somewhere in the gpuSearch function.');
        console.log(err)
    }
    
    //Close Browser Regardless of Success or Failure
    if(browser != null) {
        await browser.close();
        console.log("Closed browser!")
    }
    
    //return inStock;
}

gpuSearch();