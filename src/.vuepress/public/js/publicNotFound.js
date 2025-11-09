if (typeof window.__publicNotFoundLoaded === "undefined") {
    window.__publicNotFoundLoaded = true;
    let isMobile = window.matchMedia("(pointer:coarse)").matches,
        head = document.getElementsByTagName("head")[0], uin, aegis,
        debuging = /debug/.test(location.hash),
        subject = /subject=/.test(location.hash) ? location.hash.match(/([&#])subject=([^& ]*)/)[2] : "",
        renderTargetId = document.currentScript.getAttribute("rendertarget"),
        rendertarget;

    if (!(uin = localStorage.getItem("uin")))
        localStorage.setItem("uin", uin = Math.floor(Math.random() * (1 << 30)));

    function createElementInHead(tagName, properties) {
        let element = document.createElement(tagName);
        for (const i in properties) element[i] = properties[i];
        head.appendChild(element);
    }

    if (debuging) {
    } else {
        createElementInHead("script", {
            "src": "https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js",
            "crossorigin": "anonymous",
            "charset": "utf-8",
            "onload": () => {
                aegis = new Aegis({
                    id: 'aorgLlJTLfQVrxAwGe', uin: uin, reportApiSpeed: true, reportAssetSpeed: true,
                    beforeReport(log) {
                        return (log.msg && /Script error\.? @ \(:0:0\)/.test(log.msg)) ? false : log;
                    }
                });
            }
        });
    }
    createElementInHead("meta", {
        "name": "viewport",
        "content": "width=device-width, initial-scale=1.0, maximum-scale=1"
    });
    createElementInHead("script", {
        "src": (debuging ? location.href.replace(/\/[^\/]*$/, "/") : "https://volunteer.cdn-go.cn/404/latest/") + "404.jsonp.js",
        "charset": "utf-8",
        "crossOrigin": "anonymous",
        "callback": (d) => {
            if (subject !== "") {//按标题展示
                render(d.find(i => i.id.toLowerCase() === subject.toLowerCase()))
            } else {//按权重随机选
                let p = [];
                p.push(d.map(i => i.p).reduce((a, b) => {
                    p.push(a);
                    return a + b
                }))
                let r = Math.random() * p[p.length - 1];
                render(d[p.findIndex(v => v > r)])
            }
        }
    });

    function reportClick(event) {
        const linkElement = (event.target.closest('a') || event.currentTarget);
        const link = linkElement ? linkElement.href : '';

        aegis.infoAll({
            msg: '点击跳转到' + link,
            ext3: link,
            trace: 'trace',
        });
    }

    function render(data) {
        const html = data[isMobile ? "mobile" : "pc"];
        rendertarget = document.getElementById(renderTargetId);
        if (null === rendertarget) {
            rendertarget = document.body;
            if ("bgColor" in data) {
                document.body.bgColor = data.bgColor;
            }
        } else {
            if ("bgColor" in data) {
                rendertarget.style.backgroundColor = data.bgColor;
            }
        }
        rendertarget.innerHTML = "<div style=\"margin:0;padding:0;background-color:rgba(0,0,0,0);\">" + html + "</div>";
        rendertarget.style.overflowX = "hidden";
        rendertarget.style.maxWidth = "100vw";
        setTimeout(() => {
            for (let i = 0; i < document.links.length; i++) {
                document.links[i].addEventListener("click", reportClick, {"once": true});
            }
            if (rendertarget.getElementsByTagName("IMG")[0].height > 0) {
                window.scrollTo(rendertarget.offsetLeft, rendertarget.offsetTop);
            } else {
                rendertarget.getElementsByTagName("IMG")[0].addEventListener("load", () => {
                    setTimeout(window.scrollTo, 100, 0, rendertarget.offsetTop);
                });
            }
        }, 0);
    }
}
else {
    location.reload();
    window.__publicNotFoundLoaded = "undefined";
}
