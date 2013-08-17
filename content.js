//-----------------全局变量-------------------
var page = document.URL.substring(0, document.URL.indexOf("com") + 3)

switch (page) {
    case "http://www.renren.com":
        sidebar2 = document.getElementById("sidebar2")
        container = document.getElementById("container")
        main2 = document.getElementById("main2")
        globalPublisher = document.getElementById("global-publisher")
        content = document.getElementById("content")
        feedList = document.getElementsByClassName("feed-list")[0]
        break
    case "http://weibo.com":
        w_main = document.getElementsByClassName("W_main")[0]
        plc_main = document.getElementById("plc_main")
        scrollToTop = document.getElementById('base_scrollToTop')
        break
    case "http://blog.renren.com":
        fullPage = document.getElementsByClassName("full-page clearfix ")[0]
        shareHome = document.getElementsByClassName("share-home share-home2 terminal")[0]
        shareChainForward = document.getElementsByClassName("float-left share-chain-forward")[0]
        textArticle = document.getElementsByClassName("text-article")[0]
        break
    default :
        console.log("这什么吊网站啊？")
}

//----------------functions----------------------
function changeWidth(width) {
//    console.log("变"+width)
    switch (page) {
        case "http://www.renren.com":
            sidebar2.style.float = "right"
            container.style.width = parseInt(width) + 440 + "px"
            main2.style.width = parseInt(width) + 260 + "px"
            globalPublisher.style.width = parseInt(width) + 40 + "px"
            content.style.width = width + "px"
            feedList.style.width = width + "px"
            break
        case "http://weibo.com":
            var w_width = parseInt(width) + 250,
                scrollToTop_marginLeft = w_width / 2
            w_main.setAttribute("style", "width:" + w_width + "px !important")
            plc_main.setAttribute("style", "width:" + width + "px !important")
            scrollToTop.setAttribute("style", "margin-left:" + scrollToTop_marginLeft + "px !important")
            break
        case "http://blog.renren.com":
            fullPage.style.width = parseInt(width) + 260 + "px"
            shareHome.style.width = width + "px"
            textArticle.style.width = parseInt(width) - 30 + "px"
            shareChainForward.style.width = parseInt(width) - 60 + "px"
            break
        default :
            console.log("这什么吊网站啊？")
    }
}

//----------------main----------------------
console.log("宽度调节启动" + page)
//向backgroud页查询
chrome.runtime.sendMessage({message: "getWidth", page: page}, function (response) {
    if (response.success) {
        changeWidth(response.width)
    }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    changeWidth(request.width)
})