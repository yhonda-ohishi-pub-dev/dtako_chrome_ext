
var port = chrome.runtime.connect({ name: "GeneralBack" });
console.log("GeneralBack")
port.onMessage.addListener(function (msg) {
    console.log(msg);
    if (msg.event) {
        switch (msg.event) {
            case "startdownload":
                // console.log("GeneralBack:DataDisplayConfigSet")
                chrome.storage.sync.get(null, (options) => {
                    if (options.opeNum) {
                        opeNum = options.opeNum
                        console.log("general:Openum:", opeNum)
                        $("table.gtable tr td:nth-child(1)").each((tr, element) => {
                            if (element.children[0]) {
                                if (opeNum) {
                                    if ($("#" + element.children[0].id).text() === opeNum) {
                                        $("#" + element.children[0].id).parent().click()
                                        $("#btnCsv").click()
                                    }
                                }
                            }
                        })
                    }
                })
                break
            case "DataDisplayConfigSet":
                $("#MainContent_ucDataSelect_btnConfig1").click();
                break
        }
    }
});


$(document).ready(() => {
    console.log("GeneralCsv")
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

        if (request.message.event) {
            switch (request.message.event) {
                case "DataDisplayConfigSet":
                    $("#MainContent_ucDataSelect_btnConfig1").click();
                    break
            }
        }
    })
})