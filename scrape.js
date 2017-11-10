const request = require('request');
const cheerio = require('cheerio');
const pRequest = require("promisified-request").create();
const fScraper = require("form-scraper");

//const startUrl = 'https://news.ycombinator.com';
const startUrl = 'https://catkinson19.github.io/test_site/';
const urlSet = 'internal'
//const depth = 1;

crawlScrape(startUrl);

function crawlScrape(startUrl) {

    let scrapedInternalUrls = [];
    let scrapedExternalUrls = [];

    request(startUrl, function (err, resp, body) {
        $ = cheerio.load(body);
        links = $('a'); //jquery get all hyperlinks
        $(links).each(function (i, link) {

            let scrapedLink = $(link)
            scrapedLink = scrapedLink.attr('href');

            const urlREG = new RegExp("http");
            if (urlREG.test(scrapedLink)) {
                scrapedExternalUrls.push(scrapedLink);
            } else {
                scrapedInternalUrls.push(`${startUrl}/${scrapedLink}`);
            }
        })
        switch (urlSet) {
            case 'internal':
            for (let i = 0; i < scrapedInternalUrls.length; i++) {
                request(scrapedInternalUrls[i], function (err, resp, body) {
                    $ = cheerio.load(body);
                    let forms = $('form')[0];
                    if(forms){
                        //Pull all the forms off the page
                        let formId = [];
                        $('form').each(function (i, elem) {
                            formId[i] = $(this).attr('id');
                        });
                        formId.join(', ');
                        console.log(`I found ${formId.length} form(s) on ${scrapedInternalUrls[i]}`)



                        
                    }
                })
            };
            break;
            case 'external':
                break;
            case 'both':
                break;
        }
    });
};

//function searchForm();
