var axios = require('axios');
const cheerio = require('cheerio');

(async function() {
    var url = 'https://smapp.seoulmetro.co.kr:58443/traininfo/traininfoUserMap.do';
    var response = await axios.post(url, {
        "params": {
            'line': '1',
            'isCb': 'N'
        }
    }, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Mobile Safari/537.36'
        }
    });
    var $ = cheerio.load(response.data);
    var data = $('div.1line_metro').children('div');
    var result = [];
    for (var n = 0; n < data.length; n++) {
        var datum = $(data[n]);
        var value = datum.attr('title');
        result.push(value);
    }
    var data = $('div.1line_korail').children('div');
    var result = [];
    for (var n = 0; n < data.length; n++) {
        var datum = $(data[n]);
        var value = datum.attr('title');
        result.push(value);
    }
    console.log(result);
})();

