const puppeteer = require('puppeteer');
const NVIDIA_STORE = 'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us';
const CLASS_PRODUCT_DETAILS_STRING = '.product-details-list-tile';
const CLASS_NVIDIA_OOS = 'featured-buy-link link-btn brand-green  cta-button stock-grey-out';
const NVIDIA_INSTOCK = 'featured-buy-link link-btn brand-green cta-button js-add-button';
const NVIDIA_GEFORCE_3080 = 'NVIDIA GEFORCE RTX 3080';
const CLASS_NOICON = '.noicon';
const OOS = "OUT OF STOCK";
const NVIDIA_3080_URL = 'https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3080/'
const URL_NVIDIA_3080_ONLY = 'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us&search=3080&gpu=RTX%203080&manufacturer=NVIDIA&manufacturer_filter=NVIDIA~1,ACER~0,ALIENWARE~0,ASUS~3,DELL~0,EVGA~3,GIGABYTE~2,HP~0,LENOVO~0,LG~0,MSI~3,PNY~0,RAZER~0,ZOTAC~2'

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
        var innerText = await doc[0].getProperty('innerText');
        var jsonText = await innerText.jsonValue();
        var jsonUpper = jsonText.toUpperCase();
        
        //console.log(jsonUpper);
        if(jsonUpper.includes(OOS)){
            console.log("[" + getDateTime() + "] RTX 3080 is not in stock");
        }
        else{
            console.log("[" + getDateTime() + "] RTX 3080 is in stock");
        }
        
        page.close();
    
        //Do a callback to the original function
        if(typeof callback == "function")
            callback.call(this, async () => {await gpuSearch(browser, setTimeout);}, 5000);
        //Probably dont close browser every time?
    }
    catch(err){
        console.log('Error has occurred somewhere in the gpuSearch function.');
        console.log(err);
        return err;
    }
    
}

//Recieved from https://tecadmin.net/
//Function that simply grabs the current date and time.
function getDateTime(){
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + zeroAppend(today.getMinutes()) + ":" + zeroAppend(today.getSeconds());
    return date + " " + time;
}

//Function to make digits zero prepended digits.
function zeroAppend(digit){
    if(digit < 10)
        return "0" + digit.toString(10);
}

async function main(){
    var browser;
    try{
        browser = await puppeteer.launch();
        await gpuSearch(browser, setTimeout);
        //nvidiaTimer(browser, setTimer());
    }
    catch(err){
        console.log("Error Occurred!");
        console.log(err);
    }   
    /*if(browser != null){
        await browser.close();
        console.log("closed browser");
    }*/
}

main();

