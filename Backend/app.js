const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio')
const app = express();
const port = 4321;

const mediaMarkt = {
    websiteUrl: 'https://mediamarkt.pl/komputery-i-tablety/monitor-lg-ultragear-27gl850-b-27-qhd-nano-ips-1ms',
    targeting: `('.b-stickyOffer_wrapper .js-pre-add-cart.m-btn.m-btn_primary')[0].attribs['data-price']`,
}

const komputronik = {
    websiteUrl: 'https://www.komputronik.pl/product/663880/lg-27gl850-b-nanoips-hdr10.html',
    targeting: `('ktr-product-policy')`,
}

const morele = {
    websiteUrl: 'https://www.morele.net/monitor-lg-27gl850-b-5939152/',
    targeting: `('#product_price_brutto')[0].attribs['content']`,
}

const mediaExpert = {
    websiteUrl: 'https://www.mediaexpert.pl/komputery-i-tablety/monitory-led/monitor-lg-27-27gl850-b-2xhdmi-dp-hubusb',
    targeting: `JSON.parse($('.v-product_show')[0].attribs['data-product'])`,
}

const xkom = {
    websiteUrl: 'https://www.x-kom.pl/p/502255-monitor-led-27-lg-27gl850-b-nanoips-hdr10.html',
    targeting: `.product-detail-impression`,
}

const rtvEuroAgd = {
    websiteUrl: 'https://www.euro.com.pl/monitory-led-i-lcd/lg-monitor-lg-27-27gl850-b.bhtml',
    targeting: `$('.selenium-price-normal')[0].children[0].data;`,
}

const proline = {
    websiteUrl: 'https://proline.pl/monitor-lg-27gl850-b-nanoips-144hz-1ms-2560x1440-p1401903',
    targeting: `$('input[name="f[cena]"]')[0].attribs['value'];`,
}

const scrappingWebsite = async (shop) => {
    const response = await axios.get(shop.websiteUrl);
    return cheerio.load(response.data);
};

app.get('/mediamarkt', (req, res) => {
    scrappingWebsite(mediaMarkt).then(($) => {
        const price = $('.b-stickyOffer_wrapper .js-pre-add-cart.m-btn.m-btn_primary')[0].attribs['data-price'];
        res.send(price);
    }).catch((error) => {
        throw error;
    });
});

app.get('/morele', (req, res) => {
    scrappingWebsite(morele).then(($) => {
        const price = $('#product_price_brutto')[0].attribs['content'];
        res.send(price);
    }).catch((error) => {
        throw error;
    });
});

app.get('/komputronik', (req, res) => {
    scrappingWebsite(komputronik).then(($) => {
        const price = $('ktr-product-policy')[0].attribs['price'];
        res.send(price);
    }).catch((error) => {
        throw error;
    });
});

app.get('/mediaexpert', (req, res) => {
    scrappingWebsite(mediaExpert).then(($) => {
        const jsonDataProduct = JSON.parse($('.v-product_show')[0].attribs['data-product']);
        res.send(jsonDataProduct.price);
    }).catch((error) => {
        throw error;
    })
});

app.get('/xkom', (req, res) => {
    scrappingWebsite(xkom).then(($) => {
        const price = $('.product-detail-impression')[0].attribs['data-product-price'];
        res.send(price);
    }).catch((error) => {
        throw error;
    })
});

app.get('/rtveuroagd', (req, res) => {
    scrappingWebsite(rtvEuroAgd).then(($) => {
        const price = $('.selenium-price-normal')[0].children[0].data;
        // TODO: parse to number
        res.send(price);
    }).catch((error) => {
        throw error;
    })
});

app.get('/proline', (req, res) => {
    scrappingWebsite(proline).then(($) => {
        const price = $('input[name="f[cena]"]')[0].attribs['value'];
        res.send(price);
    }).catch((error) => {
        throw error;
    })
});

app.listen(port, () => console.log(`App is listening at port - ${port}`));
