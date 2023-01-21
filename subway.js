var axios = require('axios');
const cheerio = require('cheerio');

async function loadData(line) {
    var url = 'https://smapp.seoulmetro.co.kr:58443/traininfo/traininfoUserMap.do';
    var response = await axios.post(url, {
        "params": {
            'line': line + '',
            'isCb': 'N'
        }
    }, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Mobile Safari/537.36'
        }
    });
    var $ = cheerio.load(response.data);
    var result = [];
    parse($, 'div.' + line + 'line_metro', result);
    parse($, 'div.' + line + 'line_korail', result);

    return result;
}

function parse($, selector, result) {
    var data = $(selector).children('div');
    for (var n = 0; n < data.length; n++) {
        var datum = $(data[n]);
        datum = datum.attr('title').split(' ');
        result.push({
            trainNo: datum[0],
            station: datum[2],
            status: datum[3],
            terminal: datum[4]
        });
    }
}

module.exports.getRunningData = loadData;

