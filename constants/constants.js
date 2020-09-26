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

//ERROR MESSAGES
const ERROR_GPU = 'Error has occurred somewhere in the gpuSearch function.';
const ERROR = "Error Occurred!";

module.exports = {
    NVIDIA_GEFORCE_3080,
    OOS,
    CLASS_NOICON,
    CLASS_PRODUCT_DETAILS_STRING,
    CLASS_NVIDIA_OOS,
    CLASS_NVIDIA_INSTOCK,
    NVIDIA_STORE,
    NVIDIA_3080_URL,
    URL_NVIDIA_3080_ONLY,
    ERROR_GPU,
    ERROR
}

