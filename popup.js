function sendChange(width) {
    //发给backgroud.js
    chrome.runtime.sendMessage({message: "setWidth", width: width}, function response() {
    })
    //发给content page
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            width: width
        }, null)
    })
}

//-----------------全局变量-------------------
var range = document.getElementsByName("range")[0]
var width_div = document.getElementById("width")

//----------------main----------------------
chrome.runtime.sendMessage({message: "getWidth"}, function (response) {
    range.value = response.width
    width_div.textContent = range.value
    range.onchange = function (e) {
        width.textContent = this.value
        sendChange(this.value)
    }
});
