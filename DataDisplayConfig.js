
var port = chrome.runtime.connect({ name: "DispConfigBack" });
console.log("DispConfigBack")
port.onMessage.addListener(function (msg) {
    console.log(msg);
    if (msg.event) {
        // switch (msg.event) {
        //     case "DataDisplayConfigSet":
        //         chrome.storage.sync.get(null, (options) => {
        //             if (options.searchVal) {
        //                 $("#btnConfig1").click()
        //             }
        //         })
        //         break
        // }
    }
});



$(document).ready(() => {
  // console.log("DataDisplay")
  // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   let selection;
  //   console.log("DataDisplay")
  //   console.log(request.message); // -> 選択範囲ちょうだい が出力される
  chrome.storage.sync.get(null, (options) => {
    if (options.searchVal) {
      $("#txtSVehicle").val(options.searchVal)
      $("#txtEVehicle").val(options.searchVal)
      port.postMessage({ event: "DataDisplayConfigSet" });
      $("#btnOK").click()
    }
  })
  // });
})
