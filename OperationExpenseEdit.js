console.log("OperationExpenseEdit")
var port = chrome.runtime.connect({ name: "OperationExpenseEdit" });
$(document).ready(() => {

    $(document).on("click", "#popup_1", () => {
        console.log("OpeWorkEditBack")
        if ($("#lstWork_lblOperationNo_0").length) {

            chrome.storage.sync.set(
                { opeNum: $("#lstWork_lblOperationNo_0").text() }
            )
            console.log("lstWork_lblOperationNo_0", $("#lstWork_lblOperationNo_0").text())
        }
        if ($("#lstTollRoad_lblOperationNo_0").length) {
            chrome.storage.sync.set(
                { opeNum: $("#lstTollRoad_lblOperationNo_0").text() }
            )
            console.log("lstTollRoad_lblOperationNo_0", $("#lstTollRoad_lblOperationNo_0").text())
        }
        if ($("#lstFuel_lblOperationNo_0").length) {
            chrome.storage.sync.set(
                { opeNum: $("#lstFuel_lblOperationNo_0").text() }
            )
            console.log("lstFuel_lblOperationNo_0", $("#lstFuel_lblOperationNo_0").text())
        }


        console.log("OpeWorkEditBack:startdownload")
        port.postMessage({ event: "startdownload" });
    })
    // port.postMessage({ opeNum: $("#carInput").val() });

})