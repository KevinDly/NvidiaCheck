const puppeteer = require('puppeteer');
const nvidiaURL = 'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us';


const cooldown = 3;

//TODO: Repeatidly call this script, with timer delay

(async () => {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(nvidiaURL);
        
        console.log("Went to page!")
        
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);
        
        console.log("HTML Found!");
        console.log(data);
        
        //Todo: Parse Data for the following:
        /*Gray oos button
        class="featured-buy-link link-btn brand-green  cta-button stock-grey-out"
        Out Of Stock
        Green buy button
        featured-buy-link link-btn brand-green cta-button js-add-button
        Add to cart */
        
        //Todo: Add sound that plays if stock was found.
        
        await browser.close();
        
        
        //Probably dont close browser every time?
        console.log("Closed browser!")
        }
    catch(err){
        console.log('Error occurred, could not successfully setup async function');
        console.log(err)
    }
})();