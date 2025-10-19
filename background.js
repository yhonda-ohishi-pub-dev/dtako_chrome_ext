
console.log(new Date())

// グローバル変数を宣言
let popup_back;
let OperationBack;
let DispConfigBack;
let GeneralBack;
let OpeWorkEditBack;
let OperationExpenseEdit;

async function openTabs() {
    console.log('拡張機能のアイコンがクリックされました')

    let loginflg = false;
    let untenflg = false;
    let dataflg = false;
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
    return false
};


async function sendCarInput(car_input) {
    console.log("sendCarInput called with:", car_input);
    if (OperationBack) {
        OperationBack.postMessage({ carinput: car_input });
        console.log("Sent to OperationBack:", car_input);
    } else {
        console.log("OperationBack not connected yet");
    }
};


chrome.runtime.onConnect.addListener(async (port) => {
    // console.assert(port.name === "knockknock");
    if (port.name === "popup_back") {
        popup_back = port
        popup_back.onMessage.addListener(async (msg) => {
            if (msg.event) {
                switch (msg.event) {
                    case "startdownload":
                        if (GeneralBack) {

                            GeneralBack.postMessage({ event: "startdownload" })
                        }
                        break
                }
            }
            if (msg.carinput) {
                console.log("Background received carinput:", msg.carinput);
                await openTabs();
                console.log("Tabs opened, now sending car input...");
                await sendCarInput(msg.carinput);
            }
        })
    }
    if (port.name === "OperationBack") {
        OperationBack = port;
        console.log("OperationBack connected");
        // 接続時には車番が不明なので、送信しない
    }
    if (port.name === "DispConfigBack") {
        DispConfigBack = port
        DispConfigBack.onMessage.addListener(async (msg) => {
            if (msg.event) {
                switch (msg.event) {
                    case "DataDisplayConfigSet":
                        if (GeneralBack) {
                            GeneralBack.postMessage({ event: "DataDisplayConfigSet" })
                        }
                        break
                }
            }
        })
        // await sendCarInput()
    }
    if (port.name === "GeneralBack") {
        GeneralBack = port
        // await sendCarInput()
    }
    if (port.name === "OpeWorkEditBack") {
        OpeWorkEditBack = port
        OpeWorkEditBack.onMessage.addListener(async (msg) => {
            if (msg.event) {
                switch (msg.event) {
                    case "startdownload":
                        console.log("back start download")
                        if (GeneralBack) {
                            GeneralBack.postMessage({ event: "startdownload" })
                        }
                        break
                }
            }
        })
        // await sendCarInput()
    }
    if (port.name === "OperationExpenseEdit") {
        OperationExpenseEdit = port
        OperationExpenseEdit.onMessage.addListener(async (msg) => {
            if (msg.event) {
                switch (msg.event) {
                    case "startdownload":
                        console.log("back start download")
                        if (GeneralBack) {
                            GeneralBack.postMessage({ event: "startdownload" })
                        }
                        break
                }
            }
        })
        // await sendCarInput()
    }
});
