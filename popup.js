console.log("popup.js")
var port = chrome.runtime.connect({ name: "popup_back" });
port.onMessage.addListener(function (msg) {
    if (msg.event === "Who's there?") {

        console.log("event:", msg.event)
    }
});
console.log("popup.js")
$(document).on("keydown", "#carInput", (e) => {
    if (e.keyCode == 13) {
        console.log("enter")
        chrome.storage.sync.set(
            { searchVal: $("#carInput").val() }
        );
        port.postMessage({ carinput: $("#carInput").val() });
    }
});

$(document).on("click", "#testBtn", () => {
    // console.log("testBtn")
    alert("test")
    chrome.storage.sync.set(
        { opeNum: "2410140643300000003792" }
    );


    port.postMessage({ event: "startdownload" });
})

// $("#OpenBtn").click(() => {
//     chrome.runtime.sendMessage({ event: "openTabs" });
// })