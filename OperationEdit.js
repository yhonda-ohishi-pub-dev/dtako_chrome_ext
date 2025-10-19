console.log("OperationEdit.js loaded")

var port = chrome.runtime.connect({ name: "OperationBack" });
console.log("OperationBack connected from OperationEdit.js")

port.onMessage.addListener(function (msg) {
  console.log("OperationEdit received message:", msg);

  if (msg.carinput) {
    console.log("Operation: carinput value:", msg.carinput);

    chrome.storage.sync.get(['searchVal'], (options) => {
      console.log("Retrieved searchVal from storage:", options.searchVal);

      if (options.searchVal) {
        console.log("Clicking btnConfig1");
        $("#btnConfig1").click();
      } else {
        console.log("No searchVal found in storage");
      }
    });
  }
});