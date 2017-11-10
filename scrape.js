const request = require('request');
const cheerio = require('cheerio');
const pRequest = require("promisified-request").create();
const fScraper = require("form-scraper");

//helpers
const emailGenerator = require('./helpers/email_generator');
const phoneGenerator = require('./helpers/phone_number_generator');
const emailIds = require('./helpers/email_address_ids');
const phoneIds = require('./helpers/phone_number_ids');

//const startUrl = 'https://news.ycombinator.com';
const startUrl = 'https://catkinson19.github.io/test_site/';
//const depth = 1;

crawlScrape(startUrl, 'external');

function crawlScrape(startUrl, urlSet) {

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
        let urlsToScrape;
        switch (urlSet) {
            case 'internal':
            urlsToScrape = scrapedInternalUrls;
                break;
            case 'external':
            urlsToScrape = scrapedExternalUrls;
                break;
            case 'both':
            urlsToScrape = scrapedInternalUrls.concat(scrapedExternalUrls);
                break;
            default:
            throw new Error('Invalid url set');
        }

        for (let i = 0; i < urlsToScrape.length; i++) {
            request(scrapedInternalUrls[i], function (err, resp, body) {
                $ = cheerio.load(body);
                let forms = $('form')[0];
                if (forms) {
                    //Pull all the forms off the page
                    let formId = [];
                    $('form').each(function (i, elem) {
                        formId[i] = $(this).attr('id');
                    });
                    formId.join(', ');
                    console.log(`I found ${formId.length} form(s) on ${scrapedInternalUrls[i]}`);
                    for (let j = 0; j < formId.length; j++) {

                        //Current form Id
                        let currentFormId = (formId[j]);

                        //Store Input id's
                        let inputId = [];

                        //Create form object
                        let formObject = {};

                        $(`#${formId[j]} input`).each(function (i, elem) {
                            inputId[i] = $(this).attr('id');
                        });
                        inputId.join(', ');
                        console.log(`I found ${inputId.length} inputs(s) on ${currentFormId}`);

                        for (let x = 0; x < inputId.length; x++) {
                            if (emailIds.emailAddressIds.includes(inputId[x])) {
                                formObject[inputId[x]] = emailGenerator.emailAddress();
                            } else if (phoneIds.phoneNumberIds.includes(inputId[x])) {
                                formObject[inputId[x]] = phoneGenerator.phoneNumber();
                            } else {
                                formObject[inputId[x]] = 'test';
                            }
                        }
                        console.log(formObject);
/*
                        //Form scraper
                        let pRequest = require("promisified-request").create();
                        let fScraper = require("form-scraper");
                        let formStructure = fScraper.fetchForm(formId[j], scrapedInternalUrls[i], pRequest);

                        //Fix me here
                        //var loginDetails = { user: "my user", password: "my password" };

                        fScraper.submitForm(loginDetails, fScraper.provideForm(formStructure), pRequest).then(function (response) {
                            console.log(response.body);
                        })
                        */
                    }
                }
            })
        };
    });
};

//function searchForm();
