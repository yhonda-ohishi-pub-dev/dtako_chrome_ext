
console.log(new Date())


async function openTabs() {
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
    return false
};


async function sendCarInput(car_input) {
    if (OperationBack) {
        OperationBack.postMessage({ carinput: true })
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
                console.log("carinput:", msg.carinput)
                await openTabs()

                await sendCarInput()

            }
        })
    }
    if (port.name === "OperationBack") {
        OperationBack = port
        await sendCarInput()
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
