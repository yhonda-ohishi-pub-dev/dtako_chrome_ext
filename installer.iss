#define MyAppName "デジタコデータ取込補助"
#define MyAppVersion "1.5"
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
; 拡張機能のファイルをすべてコピー
Source: "manifest.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "background.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "content_script.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "popup.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "DataDisplayConfig.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "GeneralCsv.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "OperationEdit.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "OperationExpenseEdit.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "OperationWorkEdit.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "jquery-3.7.1.min.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "jquery.cookie.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "favicon-16x16.png"; DestDir: "{app}"; Flags: ignoreversion
Source: "favicon-32x32.png"; DestDir: "{app}"; Flags: ignoreversion
Source: "html\*"; DestDir: "{app}\html"; Flags: ignoreversion recursesubdirs

[Registry]
; レジストリは使用しない（個人PCでは動作しないため）

[Code]
procedure CurStepChanged(CurStep: TSetupStep);
var
  InstallPath: String;
begin
  if CurStep = ssPostInstall then
  begin
    InstallPath := ExpandConstant('{app}');
    MsgBox('インストールが完了しました。' + #13#10 + #13#10 +
           '次の手順で拡張機能を有効にしてください：' + #13#10 +
           '1. Chromeで chrome://extensions/ を開く' + #13#10 +
           '2. 「デベロッパーモード」をONにする' + #13#10 +
           '3. 「パッケージ化されていない拡張機能を読み込む」をクリック' + #13#10 +
           '4. 以下のフォルダを選択：' + #13#10 +
           '   ' + InstallPath + #13#10 + #13#10 +
           '※ 更新版をインストールすると、自動的に更新されます',
           mbInformation, MB_OK);
  end;
end;

[UninstallDelete]
Type: filesandordirs; Name: "{app}"
