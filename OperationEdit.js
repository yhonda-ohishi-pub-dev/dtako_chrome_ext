console.log("opera")

var port = chrome.runtime.connect({ name: "OperationBack" });
console.log("OperationBackConnect")
port.onMessage.addListener(function (msg) {
  console.log(msg);
  if (msg.carinput) {
    console.log("Operation:carinput:", msg.carinput)

    chrome.storage.sync.get(null, (options) => {
      if (options.searchVal) {
        $("#btnConfig1").click()
      }
    })
  }
});