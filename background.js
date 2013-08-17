//--------------global variables---------------
var pages_width = {}
var pages = ["http://www.renren.com", "http://weibo.com","http://blog.renren.com"]
var DEFAULT_WIDTH=800

//----------------functions------------------
function getWidth(page) {
    if (pages_width[page])return pages_width[page]
    return null //表示不支持该网页变宽
}


//----------------main----------------------
chrome.storage.local.get("pages_width", function (result) {
    if (result.pages_width) pages_width = result.pages_width
    else{
        for (var i= 0;i<pages.length;i++){
            var page=pages[i]
            pages_width[page]=DEFAULT_WIDTH
        }
    }
})


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("来家伙了")
        switch (request.message) {
            case "getWidth":
                var width = getWidth(request.page)
                if (width) sendResponse({success: true, width: width})
                else sendResponse({success: false})
                break
            case "setWidth":
                var width = request.width
                pages_width[request.page]=width
                chrome.storage.local.set({pages_width: pages_width}, function () {
                })
                break
            default :
                console("来的是什么货色？")
        }
    })

