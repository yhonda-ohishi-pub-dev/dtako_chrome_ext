console.log("OpeWorkEditBack")
var port = chrome.runtime.connect({ name: "OpeWorkEditBack" });
$(document).ready(() => {

    $(document).on("click", "#popup_1", () => {
        console.log("OpeWorkEditBack")
        chrome.storage.sync.set(
            { opeNum: $("#lstWork_lblOperationNo_0").text() }
        );

        port.postMessage({ event: "startdownload" });
        console.log("lstWork_lblOperationNo_0", $("#lstWork_lblOperationNo_0").text())
    })
    // port.postMessage({ opeNum: $("#carInput").val() });

})