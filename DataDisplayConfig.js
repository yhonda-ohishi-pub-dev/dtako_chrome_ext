
$(document).ready(() => {
  console.log("DataDisplay")
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let selection;
    console.log("DataDisplay")
    console.log(request.message); // -> 選択範囲ちょうだい が出力される
    $("#txtSVehicle").val("3728")
    $("#txtEVehicle").val("3728")
    $("#btnOK").click()
  });
})
