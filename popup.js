//-----------------全局变量-------------------
var range = document.getElementsByName("range")[0]
var pages = ["http://www.renren.com", "http://weibo.com","http://blog.renren.com"]


//----------------functions------------------
function sendChange(page, width) {
    //发给background页
    chrome.runtime.sendMessage({message: "setWidth", page: page, width: width}, function response() {
    })
    //发给content页
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            width: width
        }, null)
    })
}

function startWith(string, sub) {
    return (string.lastIndexOf(sub, 0) === 0)
}


//----------------main----------------------

chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        var url = tabs[0].url
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i]
            if (startWith(url, page)) {
                chrome.runtime.sendMessage({message: "getWidth", page: page}, function (response) {
                    if (response.success) {
                        range.value=response.width
                    }
                })
                range.onchange = function (e) {
                    sendChange(page, range.value)
                }
                break
            }
        }
    }
)


