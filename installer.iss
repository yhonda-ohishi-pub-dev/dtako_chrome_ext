#define MyAppName "デジタコデータ取込補助"
#define MyAppVersion "1.0"
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
; パッケージ化されていない拡張機能として配布するため、レジストリ登録は不要
; 手動で chrome://extensions/ から読み込む方式を採用

[Code]
function InitializeSetup(): Boolean;
begin
  Result := True;
  MsgBox('この拡張機能は、インストール後にChromeを再起動する必要があります。' + #13#10 + #13#10 +
         'インストール完了後、以下の手順を実行してください：' + #13#10 +
         '1. Chromeを再起動' + #13#10 +
         '2. chrome://extensions/ を開く' + #13#10 +
         '3. デベロッパーモードをON' + #13#10 +
         '4. 「パッケージ化されていない拡張機能を読み込む」をクリック' + #13#10 +
         '5. インストールフォルダを選択: ' + ExpandConstant('{autopf}\{#MyAppName}'),
         mbInformation, MB_OK);
end;

[UninstallDelete]
Type: filesandordirs; Name: "{app}"
