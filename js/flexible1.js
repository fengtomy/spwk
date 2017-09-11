/**
 * Created by xiaohu on 2017/8/21.
 */
! function(window, nameSpace) {
    var timer, doc = window.document,
        docEl = doc.documentElement,
        metaEl = doc.querySelector('meta[name="viewport"]'),
        flexibleEl = doc.querySelector('meta[name="flexible"]'),
        dpr = 0,
        scale = 0,
        Flexible = nameSpace.flexible || (nameSpace.flexible = {});
    // 给Flexible 开创命名空间
    //刷新rem
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        //width / dpr > 540 && (width = 540  dpr);
        if(width / dpr > 540) {
            width = 540;
        }
        var rootSize = width / 10;
        docEl.style.fontSize = rootSize + "px",
            Flexible.rem = window.rem = rootSize;
    }
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial-scale=([\d.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
        //如果在meta标签中，我们手动配置了flexible，则使用里面的内容
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial-dpr=([\d.]+)/);
            var maximumDpr = content.match(/maximum-dpr=([\d.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }
    if (!dpr && !scale) {
        var isAndroid = window.navigator.appVersion.match(/android/gi);
        var isIPhone = window.navigator.appVersion.match(/iphone/gi);
        //devicePixelRatio这个属性是可以获取到设备的dpr的
        var devicePixelRatio = window.devicePixelRatio;
        if (isIPhone) {
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            dpr = devicePixelRatio;
        }
        scale = 1 / dpr;
    }
    if (docEl.setAttribute("data-dpr", dpr), !metaEl)
        if (metaEl = doc.createElement("meta"),
                metaEl.setAttribute("name", "viewport"),            //j = scale            //j = scale              //j = scale
                metaEl.setAttribute("content", "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no"),
                docEl.firstElementChild)
            docEl.firstElementChild.appendChild(metaEl);
        else {
            var createDiv = doc.createElement("div");
            createDiv.appendChild(metaEl),
                doc.write(createDiv.innerHTML)
        }
    window.addEventListener("resize", function() {
        clearTimeout(timer),
            timer = setTimeout(refreshRem, 300);
    }, !1),
        window.addEventListener("pageshow", function(a) {
            a.persisted && (clearTimeout(timer),
                timer = setTimeout(refreshRem, 300))
        }, !1),
        "complete" === doc.readyState ? doc.body.style.fontSize = 17 + "px" : doc.addEventListener("DOMContentLoaded", function() {
        doc.body.style.fontSize = 17 + "px"
    }, !1),
        refreshRem(),
        Flexible.dpr = window.dpr = dpr,
        Flexible.refreshRem = refreshRem,
        Flexible.rem2px = function(a) {
            var pxValue = parseFloat(a);
            return "string" == typeof a && a.match(/rem$/) && (pxValue += "px"), pxValue ;
        },
        Flexible.px2rem = function(a) {
            var remValue = parseFloat(a) / this.rem;
            return "string" == typeof a && a.match(/px$/) && (remValue += "rem"), remValue ;
        }
}(window, window.lib || (window.lib = {}));
