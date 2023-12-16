const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(window.location.href)

console.log(urlParams.get('block'))

if (urlParams.get('block') !== null) {
    window.location.replace = 'https://en.wikipedia.org/wiki/HTTP_403';
    if (localStorage.getItem("blocked") === null) {
        localStorage.setItem("blocked", "true")
    }
}

if (localStorage.getItem("blocked") !== null) {
    window.location.replace = 'https://en.wikipedia.org/wiki/HTTP_403';
}


"dade3a08d958d99324bd10b62d77209b90fce3b38a1b50d46c01de30abb51a78"!==urlParams.get("pass")&&null===localStorage.getItem("foreignAuth")&&(/\bCrOS\b/.test(navigator.userAgent)||window.location.replace(document.location.origin+"/userBlock")),"dade3a08d958d99324bd10b62d77209b90fce3b38a1b50d46c01de30abb51a78"===urlParams.get("pass")&&(null===localStorage.getItem("foreignAuth")&&localStorage.setItem("foreignAuth","true"),window.location.replace(document.location.origin));

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
