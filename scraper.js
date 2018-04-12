const cheerio = require('cheerio');
const rp = require('request-promise');
const imagesManager = require('./imagesManager');

const url = 'https://cointelegraph.com';
const fullUrl = url + '/ico-calendar';

let options = {
    uri: fullUrl,
    transform: (body) => cheerio.load(body)
};

exports.scrape = async () => {
    const $ = await rp(options);
    const temporaryArray = [];
    const innerPage = $('div#ico-ongoing .table-companies__item.j-item');
    const elements = [];

    innerPage.each((i, v) => { elements.push(v); });

    for (let index = 0; index < elements.length; index++) {
        const elem = elements[index];

        // link of the inner page or every ico
        let link = url + $(elem).find('a').attr('href');

        // get the icons file name
        // let iconSrcset = $(elem).find('img.table-companies__item-img.j-img').attr('srcset');
        // let iconSrcset = $(elem).find('img.table-companies__item-img.j-img').attr('srcset');
        // let iconSrc = iconSrcset.split(' ')[0];

        
        let fileName = link.split('/').pop(-1);
        let imageSrc = fileName + '.jpg';

        

        let name = $(elem).find('.table-companies__item-ttl h2.j-title').text();
        let startDate = $(elem).find('.j-start-date div.table-companies__item-date').text();
        let endDate = $(elem).find('.j-end-date .table-companies__item-date').text();
        let shortDescription = $(elem).find('.table-companies__item-desc p').text();

        const $$ = await rp({ uri: link, transform: body => cheerio.load(body) });

        let website = $$('div.ico-card-about__links div.ico-card-about__links-item').find('a').attr('href');
        let iconSrcset = $$('div.ico-card-about__left .ico-card-about__img').attr('src');
        // check if image exists
        const imageExists = imagesManager.readIcon(imageSrc);
        if (imageExists) {
            imagesManager.writeIcon(iconSrcset, fileName, () => { });
        }
        let fullDescription = $$('.ico-card-tabs #ico-description').text();
        let detail = $$('#ico-detail div.detail:first-child').find('p').text();
        let tokenSymbol = (detail.split(' '))[1];

        data = {
            index,
            imageSrc,
            name,
            startDate,
            endDate,
            shortDescription,
            fullDescription,
            website,
            tokenSymbol
        };
        temporaryArray.push(data);   // closure 1
    }

    return temporaryArray;
}