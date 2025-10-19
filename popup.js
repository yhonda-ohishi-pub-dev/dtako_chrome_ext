console.log("popup.js")
var port = chrome.runtime.connect({ name: "popup_back" });
port.onMessage.addListener(function (msg) {
    if (msg.event === "Who's there?") {

        console.log("event:", msg.event)
    }
});

// ページ読み込み時に保存済みの設定を読み込む
$(document).ready(() => {
    chrome.storage.sync.get(['txtID2', 'txtID1', 'txtPass'], (result) => {
        if (result.txtID2) {
            $("#txtID2Input").val(result.txtID2);
        }
        if (result.txtID1) {
            $("#txtID1Input").val(result.txtID1);
        }
        if (result.txtPass) {
            $("#txtPassInput").val(result.txtPass);
        }

        // すべての設定が保存されている場合は設定セクションを非表示にして、更新ボタンを表示
        if (result.txtID2 && result.txtID1 && result.txtPass) {
            $("#settingsSection").addClass("hidden");
            $("#updateSettings").show();
        } else {
            // 設定が不完全な場合は設定セクションを表示
            $("#settingsSection").removeClass("hidden");
            $("#updateSettings").hide();
        }
    });
});

// 更新ボタンをクリックしたら設定セクションを表示
$(document).on("click", "#updateSettings", () => {
    $("#settingsSection").removeClass("hidden");
    $("#updateSettings").hide();
});

// 設定を保存
$(document).on("click", "#saveSettings", () => {
    const txtID2 = $("#txtID2Input").val();
    const txtID1 = $("#txtID1Input").val();
    const txtPass = $("#txtPassInput").val();

    chrome.storage.sync.set({
        txtID2: txtID2,
        txtID1: txtID1,
        txtPass: txtPass
    }, () => {
        // 保存完了メッセージを表示
        const statusMsg = $("#statusMessage");
        statusMsg.addClass("success");
        statusMsg.text("設定を保存しました");

        // 1秒後に設定セクションを非表示にして更新ボタンを表示
        setTimeout(() => {
            statusMsg.removeClass("success");
            statusMsg.text("");
            $("#settingsSection").addClass("hidden");
            $("#updateSettings").show();
        }, 1000);
    });
});

console.log("popup.js loaded")
$(document).on("keydown", "#carInput", (e) => {
    if (e.keyCode == 13) {
        const carInputValue = $("#carInput").val();
        console.log("Enter pressed, car input:", carInputValue);

        chrome.storage.sync.set(
            { searchVal: carInputValue },
            () => {
                console.log("Saved searchVal:", carInputValue);
            }
        );

        port.postMessage({ carinput: carInputValue });
        console.log("Sent message to background:", carInputValue);
    }
});

$(document).on("click", "#testBtn", () => {
    // console.log("testBtn")
    alert("test")
    chrome.storage.sync.set(
        { opeNum: "2410140643300000003792" }
    );


    port.postMessage({ event: "startdownload" });
})

// $("#OpenBtn").click(() => {
//     chrome.runtime.sendMessage({ event: "openTabs" });
// })