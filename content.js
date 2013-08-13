//-----------------全局变量-------------------
var w_main = document.getElementsByClassName("W_main")[0]
var plc_main = document.getElementById("plc_main")
var scrollToTop = document.getElementById('base_scrollToTop')

//----------------functions----------------------
function changeWidth(plc_width) {
    var w_width = parseInt(plc_width) + 250,
        scrollToTop_marginLeft = w_width / 2
    w_main.setAttribute("style", "width:" + w_width + "px !important")
    plc_main.setAttribute("style", "width:" + plc_width + "px !important")
    scrollToTop.setAttribute("style", "margin-left:" + scrollToTop_marginLeft + "px !important")
}
//----------------main----------------------
chrome.runtime.sendMessage({message: "getWidth"}, function (response) {
    changeWidth(response.width)
})

console.log("监听器启动")
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("got" + request.width)
    changeWidth(request.width)
})