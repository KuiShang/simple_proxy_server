/*eslint-disable*/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 375)/2 + 'px';
        };
    if (!doc.addEventListener) return;
    var pageRem = function () {
        {
            var e = document.documentElement.clientWidth;
            window.innerHeight
        }
        320 >= e && (e = 320), e >= 750 && (e = 750);
        var n = e / 375 * 100 / 2;
        document.documentElement.style.fontSize = n + "px"
    };
    var pageRem = function () {
        {
            var e = document.documentElement.clientWidth;
            window.innerHeight
        }
        320 >= e && (e = 320), e >= 750 && (e = 750);
        var n = e / 375 * 100 / 2;
        document.documentElement.style.fontSize = n + "px"
    };
    pageRem()
    window.addEventListener("resize", pageRem);
    win.addEventListener(resizeEvt, recalc, false);
    win.addEventListener("resize", pageRem);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    console.log('屏幕dpr:', devicePixelRatio)
})(document, window);
