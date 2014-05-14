//-----------------全局变量-------------------
var page = document.URL.substring(0, document.URL.indexOf("com") + 3)

switch (page) {
    case "http://www.renren.com":
        break
    case "http://weibo.com":
        w_main = document.getElementsByClassName("W_main")[0]
        plc_main = document.getElementById("plc_main")
        scrollToTop = document.getElementById('base_scrollToTop')        
        //屏蔽新浪的“推广”微博（每天第一次登录冒出来的陌生博主的广告微博）
        var adFeed = document.querySelector('[feedtype="ad"]')
        if (adFeed)adFeed.style.display='none'
        break
    case "http://blog.renren.com":        
        break
    default :
        console.log("这什么吊网站啊？")
}

//----------------functions----------------------
function changeWidth(width) {
//    console.log("变"+width)
    switch (page) {
        case "http://www.renren.com":
            var bdContentWidth = parseInt(width) + 262 + "px"
            var nxContentWidth = parseInt(width) + 2 + "px"
            var feedListWidth = parseInt(width) + 2 + "px"
            var newFeedTipWidth = width + "px"
            var aFeedWidth = width + "px"
            var popDiaryWidth = "90%"
            var popDiaryContentWidth = "96%"
            var popDiaryContentPadding = "20px 2%"
            var newStyle = document.createElement("style")
            newStyle.innerHTML = '.nx-main760 .bd-content{width:'+bdContentWidth +'} .nx-content{width:'+nxContentWidth +'} .feed-list{width:'+feedListWidth +'} #feed-list .new-feed-tip a{width:'+newFeedTipWidth + '} .a-feed{width:'+aFeedWidth + '} .pop-diary{width:'+popDiaryWidth+'} .pop-diary-content{width:'+popDiaryContentWidth+'; padding:'+popDiaryContentPadding+'}'
            document.body.appendChild(newStyle)            
            break
        case "http://weibo.com":
            var w_width = parseInt(width) + 250,
                scrollToTop_marginLeft = w_width / 2
            w_main.setAttribute("style", "width:" + w_width + "px !important")
            plc_main.setAttribute("style", "width:" + width + "px !important")
            scrollToTop.setAttribute("style", "margin-left:" + scrollToTop_marginLeft + "px !important")
            break
        case "http://blog.renren.com":
            var bdContentWidth = parseInt(width) + 480
            var blogDetailWrapWidth = parseInt(width) + 480
            var blogDetailBoxWidth = parseInt(width) + 218
            var blogDetailTextWidth = parseInt(width) + 178            
            var newStyle = document.createElement("style")
            newStyle.innerHTML = '.nx-main980 .bd-content{width:'+bdContentWidth +'px;} #blogDetail_wrap{width:'+blogDetailWrapWidth +'px;} #blogDetail_sideLeft{width:'+blogDetailBoxWidth +'px;} .blogDetail-text{width:'+blogDetailTextWidth + 'px;}'
            document.body.appendChild(newStyle)            
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