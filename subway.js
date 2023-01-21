const axios = require('axios');
const cheerio = require('cheerio');

async function loadData(line) {
    const url = 'https://smapp.seoulmetro.co.kr:58443/traininfo/traininfoUserMap.do';
    const response = await axios.post(url, {
        "params": {
            'line': line + '',
            'isCb': 'N'
        }
    }, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Mobile Safari/537.36'
        }
    });
    const $ = cheerio.load(response.data);
    const result = [];
    parse($, 'div.' + line + 'line_metro', result);
    parse($, 'div.' + line + 'line_korail', result);

    return result;
}

function parse($, selector, result) {
    const data = $(selector).children('div');
    for (let n = 0; n < data.length; n++) {
        const datum = $(data[n]).attr('title').split(' ');
        result.push({
            trainNo: datum[0],
            station: datum[2],
            status: datum[3],
            terminal: datum[4]
        });
    }
}

module.exports.getRunningData = loadData;

