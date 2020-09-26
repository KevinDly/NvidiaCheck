const {getDateTime, zeroAppend} = require('./helpers.js');
//const constants = require('./constants/constants.js');
//NVIDIA Site Constants
const NVIDIA_GEFORCE_3080 = 'NVIDIA GEFORCE RTX 3080';
const OOS = "OUT OF STOCK";

//NVIDIA HTML CLASS TAGS
const CLASS_NOICON = '.noicon';
const CLASS_PRODUCT_DETAILS_STRING = '.product-details-list-tile';
const CLASS_NVIDIA_OOS = 'featured-buy-link link-btn brand-green  cta-button stock-grey-out';
const CLASS_NVIDIA_INSTOCK = 'featured-buy-link link-btn brand-green cta-button js-add-button';

//NVIDIA URLS
const NVIDIA_STORE = 'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us';
const NVIDIA_3080_URL = 'https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3080/';
const URL_NVIDIA_3080_ONLY = 'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us&search=3080&gpu=RTX%203080&manufacturer=NVIDIA&manufacturer_filter=NVIDIA~1,ACER~0,ALIENWARE~0,ASUS~3,DELL~0,EVGA~3,GIGABYTE~2,HP~0,LENOVO~0,LG~0,MSI~3,PNY~0,RAZER~0,ZOTAC~2';
const URL_DIRECT_LINK = 'https://store.nvidia.com/store?Action=AddItemToRequisition&SiteID=nvidia&Locale=en_GB&productID=5438792800&quantity=1'

//ERROR MESSAGES
const ERROR_GPU = 'Error has occurred somewhere in the gpuSearch function.';
const ERROR = "Error Occurred!";

const puppeteer = require('puppeteer');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const notifier = require('node-notifier');
//Main function to check for the gpu
async function gpuSearch(browser, callback){
    var inStock, page; 
    try{
        //console.log("Creating new page.")
        page = await browser.newPage();
        
        //Taken from the following:
        //https://www.scrapehero.com/how-to-increase-web-scraping-speed-using-puppeteer/#:~:text=To%20block%20images%2C%20we%20have%20to%20set%20up%20a%20Request%20Interception.&text=In%20the%20existing%20script%20add,%7D)%3B%20let%20page%20%3D%20await%20browser.
        await page.setRequestInterception(true);
        
        console.log("[" + getDateTime() + "] Checking if RTX 3080 is in stock");
        page.on('request', (req) => {
            if(req.resourceType() === 'image'){
                req.abort();
            }
            else{
                req.continue();
            }
        });
        
        await page.goto(URL_NVIDIA_3080_ONLY,{
            timeout: 0
            });
        //Grab the list of document elements that are graphics cards.
        
        var data = await page.evaluate(() => document.body.innerHTML);
        var doc = await page.$$(CLASS_PRODUCT_DETAILS_STRING);
        
        //Might need to iterate if they decide to change the html again.
        //TODO: Add check if doc is undefined?
        //if(doc == undefined)
        var innerText = await doc[0].getProperty('innerText');
        var jsonText = await innerText.jsonValue();
        var jsonUpper = jsonText.toUpperCase();
        
        //console.log(jsonUpper);
        if(jsonUpper.includes(OOS)){
            console.log("[" + getDateTime() + "] RTX 3080 is not in stock");
        }
        else{
            //TODO: In this function print the html of the page somewhere to check for stock?
            console.log("[" + getDateTime() + "] ~~~~~~~~~~~~~~~~~~~~~~~~~~~~RTX 3080 IS IN STOCK~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            notification("Notify Bot", "RTX 3080 might be in stock!");
        }
        
        page.close();
    
        //Do a callback to the original function
        if(typeof callback == "function")
            callback.call(this, async () => {await gpuSearch(browser, setTimeout);}, 5000);
        //Probably dont close browser every time?
    }
    catch(err){
        console.log(ERROR_GPU);
        console.log(err);
        return err;
    }
    
}

/* function zeroAppend(digit){
    if(digit < 10)
        return "0" + digit.toString(10);
    return digit.toString(10);
}

//Function that simply grabs the current date and time.
function getDateTime(){
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + zeroAppend(today.getMinutes()) + ":" + zeroAppend(today.getSeconds());
    return date + " " + time;
}
 */
//Input reader that allows user to exit from program whenever necessary.
async function stop(){
    readline.question('Press enter to stop the program. \n', (answer) => {
        console.log("Ending program.");
        process.exit();
    });
}

function notification(title, notification){
    notifier.notify({
        title: title,
        notification: notification,
        timeout: 5
    });
}

async function main(){
    var browser;
    try{
        browser = await puppeteer.launch();
        await stop();
        await gpuSearch(browser, setTimeout);
    }
    catch(err){
        console.log(ERROR);
        console.log(err);
    }   
    /*if(browser != null){
        await browser.close();
        console.log("closed browser");
    }*/
}

main();

