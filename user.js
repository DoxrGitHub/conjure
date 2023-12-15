const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(window.location.href)

if (urlParams.get('block') || urlParams.get('blocked')) {
    window.location.href = 'https://en.wikipedia.org/wiki/HTTP_403';
    if (localStorage.getItem("blocked") === null) {
        localStorage.setItem("blocked", "true")
    }
}

if (localStorage.getItem("blocked") !== null) {
    window.location.href = 'https://en.wikipedia.org/wiki/HTTP_403';
}


function _0x5329(_0x16f1de, _0xe7b296) {
    var _0x399081 = _0x1a8d();
    return _0x5329 = function (_0xa915db, _0x2c0069) {
        _0xa915db = _0xa915db - (0x1b29 + 0x2 * 0x8bf + -0x2c19);
        var _0x23f587 = _0x399081[_0xa915db];
        return _0x23f587;
    }, _0x5329(_0x16f1de, _0xe7b296);
}
var _0x46c7fc = _0x5329;
(function (_0x53c452, _0x4c11ef) {
    var _0x73e843 = _0x5329, _0x92c5ec = _0x53c452();
    while (!![]) {
        try {
            var _0x28ccc4 = -parseInt(_0x73e843(0x96)) / (0x235e + 0x485 * -0x5 + -0xcc4) + parseInt(_0x73e843(0x90)) / (-0x2256 + 0x1 * -0x235f + 0x45b7) + parseInt(_0x73e843(0x9e)) / (0x1 * -0x23a5 + -0x339 + 0x26e1) + parseInt(_0x73e843(0x93)) / (-0x124f + 0xb1c * 0x3 + -0xf01 * 0x1) + parseInt(_0x73e843(0xa8)) / (-0xc7d * -0x1 + 0x320 + -0xf98) + -parseInt(_0x73e843(0xa3)) / (0x86 * 0x26 + -0x11cb + -0x213) + -parseInt(_0x73e843(0x8e)) / (0xd * -0x30 + -0x1 * -0xb47 + 0x8 * -0x11a);
            if (_0x28ccc4 === _0x4c11ef)
                break;
            else
                _0x92c5ec['push'](_0x92c5ec['shift']());
        } catch (_0x15d953) {
            _0x92c5ec['push'](_0x92c5ec['shift']());
        }
    }
}(_0x1a8d, -0x56ba9 * -0x2 + 0x6 * 0x30709 + 0x71 * -0x2787));
if (urlParams[_0x46c7fc(0x94)](_0x46c7fc(0x9f)) !== _0x46c7fc(0xa7) + _0x46c7fc(0x8f) + _0x46c7fc(0x97) + _0x46c7fc(0x9b) + _0x46c7fc(0x95) + _0x46c7fc(0x9c) + _0x46c7fc(0x91)) {
    if (localStorage[_0x46c7fc(0xa2)](_0x46c7fc(0xa5) + 'h') === null) {
        if (/\bCrOS\b/[_0x46c7fc(0x92)](navigator[_0x46c7fc(0xa6)])) {
        } else
            window[_0x46c7fc(0x99)][_0x46c7fc(0xa0)](document[_0x46c7fc(0x99)][_0x46c7fc(0xa1)] + (_0x46c7fc(0x9d) + _0x46c7fc(0x98) + 'ml'));
    }
}
function _0x1a8d() {
    var _0xcf6bc1 = [
        '1a78',
        'test',
        '6004812PWaFIm',
        'get',
        '8a1b50d46c',
        '1041544fPhnDg',
        '10b62d7720',
        '/index.mht',
        'location',
        'setItem',
        '9b90fce3b3',
        '01de30abb5',
        '/userBlock',
        '48765tOotmZ',
        'pass',
        'replace',
        'origin',
        'getItem',
        '635682lgRvPe',
        'true',
        'foreignAut',
        'userAgent',
        'dade3a08d9',
        '595340rhVdxK',
        '3195766etnqHe',
        '58d99324bd',
        '1449984XRwWPV'
    ];
    _0x1a8d = function () {
        return _0xcf6bc1;
    };
    return _0x1a8d();
}
urlParams[_0x46c7fc(0x94)](_0x46c7fc(0x9f)) === _0x46c7fc(0xa7) + _0x46c7fc(0x8f) + _0x46c7fc(0x97) + _0x46c7fc(0x9b) + _0x46c7fc(0x95) + _0x46c7fc(0x9c) + _0x46c7fc(0x91) && (localStorage[_0x46c7fc(0xa2)](_0x46c7fc(0xa5) + 'h') === null && localStorage[_0x46c7fc(0x9a)](_0x46c7fc(0xa5) + 'h', _0x46c7fc(0xa4)), window[_0x46c7fc(0x99)][_0x46c7fc(0xa0)](document[_0x46c7fc(0x99)][_0x46c7fc(0xa1)]));


(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "jk96hs8oij");

document.title = "Google"

function setFavicons(favImg){
    let headTitle = document.head || document.getElementsByTagName('head')[0];
    let setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel','icon');
    setFavicon.setAttribute('href',favImg);
    headTitle.appendChild(setFavicon);
}
setFavicons('https://google.com/favicon.ico');
