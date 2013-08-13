var width = 700
chrome.storage.local.get('width', function (result) {
    if (result.width) width=result.width
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("来家伙了")
        switch (request.message) {
            case "getWidth":
                sendResponse({width: width})
                break
            case "setWidth":
                width = request.width
                chrome.storage.local.set({width:width}, function(){})
                break
            default :
                console("来的是什么货色？")
        }
    })