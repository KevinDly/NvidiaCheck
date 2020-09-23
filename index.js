const puppeteer = require('puppeteer');
const nvidiaURL = 'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us';
const PRODUCT_DETAILS_STRING = '.product-details-list-tile';
const NVIDIA_OOS = 'featured-buy-link link-btn brand-green  cta-button stock-grey-out';
const NVIDIA_INSTOCK = 'featured-buy-link link-btn brand-green cta-button js-add-button';
const TOOLTIP = 'tooltip';
const NVIDIA_GEFORCE_3080 = 'NVIDIA GEFORCE RTX 3080';
const OOS = "OUT OF STOCK"
const cooldown = 3;

//TODO: Repeatidly call this script, with timer delay
//TODO: Need to close page rather than browser after every call
//TODO: Need to remove browser from gpuSearch and have it created outside.
//TODO: Need to make function return a promise

async function gpuSearch(){
    var browser, inStock; 
    try{
        browser = await puppeteer.launch();
        var page = await browser.newPage();
        await page.goto(nvidiaURL);
        
        console.log("Went to page!")
        
        //Grab the list of document elements that are graphics cards.
        var doclist = await page.$$(PRODUCT_DETAILS_STRING)
        
        //Iterate through all graphics card elements until we find the 3080
        var gpuElement = null;
        var gpuText = "";
        
        for(var i = 0; i < doclist.length; i++) {
            //Since we are operating on the element we have to await at both points here. Aka, both getProperty and innerText returns promises.
            var innerText = await doclist[i].getProperty('innerText');
            var jsonText = await innerText.jsonValue()
            
            if(jsonText.includes(NVIDIA_GEFORCE_3080)){
                console.log(i + " is the 3080 Element");
                gpuElement = doclist[i]
                gpuText = jsonText;
            }
            else
                console.log(i + " is not the 3080 Element");
        }
        
        //Check if we actually found the 3080
        if(gpuElement == null){
            //If we cantg find the 3080, return from function as something must be wrong.
            console.log("Couldnt find 3080")
            return;
        }
        else{
            /*var instockcheck = await gpuElement.$(NVIDIA_OOS)
            console.log(instockcheck)*/
            if(gpuText.includes(OOS)) {
                console.log("3080 is not in stock!")
                inStock = false;
            }
            else {
                console.log("3080 is in stock!")
                inStock = true;
            }
        }
        
        //Todo: Add sound that plays if stock was found.
        
        await browser.close();
        
        
        //Probably dont close browser every time?
        console.log("Closed browser!")
        }
    catch(err){
        console.log('Error occurred, could not successfully setup async function');
        console.log(err)
        
        //Check if browser was opened.
    }
    if(browser != null)
        await browser.close();
    
    //return inStock;
}

gpuSearch();

