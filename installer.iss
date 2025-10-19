#define MyAppName "デジタコデータ取込補助"
#define MyAppVersion "1.6"
#define MyAppPublisher "Your Company Name"
#define MyAppURL "https://github.com/yhonda-ohishi-pub-dev/dtako_chrome_ext"
#define ExtensionId "cbopaljicfjeophjpnnbgdhcpnlhobcj"

[Setup]
AppId={{10BAB9B0-BE5A-4CF4-BA70-99E67EE8F427}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DisableProgramGroupPage=yes
OutputDir=Output
OutputBaseFilename=digitaco-chrome-ext-setup-v{#MyAppVersion}
Compression=lzma
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

[Languages]
Name: "japanese"; MessagesFile: "compiler:Languages\Japanese.isl"

[Files]
; CRXファイルをインストール
Source: "dtako_chrome_ext.crx"; DestDir: "{app}"; Flags: ignoreversion

[Registry]
; レジストリは使用しない（個人PCでは動作しないため）

[Code]
procedure CurStepChanged(CurStep: TSetupStep);
var
  CrxPath: String;
  ResultCode: Integer;
begin
  if CurStep = ssPostInstall then
  begin
    CrxPath := ExpandConstant('{app}\dtako_chrome_ext.crx');

    if MsgBox('インストールが完了しました。' + #13#10 + #13#10 +
              '次の手順で拡張機能をインストールしてください：' + #13#10 + #13#10 +
              '1. chrome://extensions/ が自動的に開きます' + #13#10 +
              '2. 「デベロッパーモード」をONにする' + #13#10 +
              '3. CRXファイルを拡張機能ページにドラッグ＆ドロップ' + #13#10 + #13#10 +
              'CRXファイルの場所：' + #13#10 +
              CrxPath + #13#10 + #13#10 +
              '今すぐChromeで chrome://extensions/ を開きますか？',
              mbConfirmation, MB_YESNO) = IDYES then
    begin
      // Chromeで拡張機能ページを開く
      Exec('cmd.exe', '/c start chrome://extensions/', '', SW_HIDE, ewNoWait, ResultCode);

      // エクスプローラーでCRXファイルの場所を開く
      Exec('explorer.exe', '/select,"' + CrxPath + '"', '', SW_SHOWNORMAL, ewNoWait, ResultCode);

      MsgBox('Chromeの拡張機能ページが開きました。' + #13#10 + #13#10 +
             '手順：' + #13#10 +
             '1. 「デベロッパーモード」をON' + #13#10 +
             '2. エクスプローラーから「dtako_chrome_ext.crx」をドラッグして' + #13#10 +
             '   Chromeの拡張機能ページにドロップ' + #13#10 +
             '3. 「拡張機能を追加」をクリック' + #13#10 + #13#10 +
             '拡張機能ID: {#ExtensionId}' + #13#10 +
             '※ 更新版をインストールすると自動的に更新されます',
             mbInformation, MB_OK);
    end;
  end;
end;

[UninstallDelete]
Type: filesandordirs; Name: "{app}"
