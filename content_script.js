
$(document).ready(() => {

  // console.log("ready2S")

  // ポップアップで設定した認証情報を読み込む
  chrome.storage.sync.get(['txtID2', 'txtID1', 'txtPass'], (result) => {
    // 保存された値がある場合のみ入力
    if (result.txtID2) {
      $("#txtID2").val(result.txtID2);
    }
    if (result.txtID1) {
      $("#txtID1").val(result.txtID1);
    }
    if (result.txtPass) {
      $("#txtPass").val(result.txtPass);
    }

    // すべての値が設定されている場合のみログインボタンをクリック
    if (result.txtID2 && result.txtID1 && result.txtPass) {
      $("#popup_1").click();
    }
  });

  // $('form#form1').submit();
  // // $('#imgLogin').trigger(evt);
  // if ($("#popup_container").is(":visible")) {
  //   console.log("popup_containerVisible")
  //   $('form#form1').submit();

  // }
  // console.log($.cookie())
  // // $("chkLoginStart").val(true)
  // console.log("chkLoginStart")
})

