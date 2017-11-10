const request = require('request');
const cheerio = require('cheerio');

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
                            console.log(`I found a form on ${scrapedInternalUrls[i]}`)
                            for(let i = 0; i < forms.length; i++){
                                let inputFields = [];
                                let fields = $('input').attr('type', 'text');
                                for(let i = 0; i < fields.length; i++){

                                    //Pick up here

                                }
                            }
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
