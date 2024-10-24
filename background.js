
chrome.action.onClicked.addListener(async (tab) => {
    console.log('拡張機能のアイコンがクリックされました')

    loginflg = false;
    untenflg = false;
    dataflg = false;
    let test = await chrome.tabs.query({}, (tabs) => {

        for (let i = 0; i < tabs.length; i++) {
            console.log(tabs[i])
            if (tabs[i].url == "https://theearth-np.com/F-AAS1020[MainMenu].aspx") {
                loginflg = true
            }
            if (tabs[i].url == "https://theearth-np.com/F-DES1010[OperationEdit].aspx") {
                untenflg = true
            }
            if (tabs[i].url == "https://theearth-np.com/F-NOS3010[GeneralCsv].aspx") {
                dataflg = true
            }
        }
        if (!dataflg)
            chrome.tabs.create({ "url": "https://theearth-np.com/F-NOS3010[GeneralCsv].aspx" });
        if (!untenflg)
            chrome.tabs.create({ "url": "https://theearth-np.com/F-DES1010[OperationEdit].aspx" });
    })
    console.log("dataflg:", dataflg)
    console.log("untenflg:", untenflg)
});
console.log("end");

//content_scriptのアクションで発火する。
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    //①APIに渡す値をformDataに格納。
    console.log("message", sender, sendResponse, message)
    console.log(sender)

    await chrome.tabs.query({}, (tabs) => {

        for (let i = 0; i < tabs.length; i++) {
            // console.log(tabs[i])
            if (tabs[i].url == "https://theearth-np.com/F-GOS0030[DataDisplayConfig].aspx") {
                chrome.tabs.sendMessage(tabs[i].id, { message: '選択範囲ちょうだい2' })

            }
        }
    })
    chrome.tabs.sendMessage(sender.tab.id, { message: '選択範囲ちょうだい' })
    //     if (!item) {
    //         alert('選択範囲が見つかりませんでした');
    //         return;
    //     }
    //     $('#memo').val($('#memo').val() + item);
    // });
    // var fd = new FormData();
    // fd.append("demo_data", message.submitData);

    // //②fetchAPIで外部サイトにアクセスする
    // fetch('https://任意のドメイン', {
    //     method: 'POST',
    //     body: fd
    // })
    // .then(response => response.json())
    // //③apiからの戻り値をcontent_scriptに返す。
    // .then(data => {
    //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //         chrome.tabs.sendMessage(tabs[0].id, {message: data});
    //     });
    // })
    // .catch(error => {
    //     console.error(error);
    // });
});