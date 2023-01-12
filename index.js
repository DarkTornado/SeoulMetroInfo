var axios = require('axios');

(async function() {
    var url = 'https://smapp.seoulmetro.co.kr:58443/traininfo/traininfoUserMap.do';
    var data = await axios.get(url, {}, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Mobile Safari/537.36'
        }
    });
    console.log(data);
})();

