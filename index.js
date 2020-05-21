const Converter = require('./converter');
const request = require('request');
const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3';

function getCourses() {
    return new Promise(function (resolve, reject) {
        request(url, function (err, res, body) {
            resolve(body);
        })
    })
}

getCourses().then((body) => {
    data = JSON.parse(body);
    baseCurrencyUs = parseFloat(data[2].buy);
    baseCurrencyRu = parseFloat(data[1].buy);
    baseCurrencyEu = parseFloat(data[0].buy);
    let conv = new Converter(baseCurrencyUs, baseCurrencyRu, baseCurrencyEu);
    console.log(conv.convertUsToUa(1000));
    console.log(conv.convertUaToUs(1000));
    console.log(conv.convertRuToUa(1000));
    console.log(conv.convertUaToRu(1000));
    console.log(conv.convertEuToUa(1000));
    console.log(conv.convertUaToEu(1000));    
})