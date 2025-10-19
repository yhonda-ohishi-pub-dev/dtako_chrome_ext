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
; CRXファイルをインストール
Source: "dtako_chrome_ext.crx"; DestDir: "{app}"; Flags: ignoreversion
Source: "update_manifest.xml"; DestDir: "{app}"; Flags: ignoreversion

[Registry]
; Chrome拡張機能を企業ポリシーで自動インストール（update_url経由で自動更新）
Root: HKLM; Subkey: "Software\Policies\Google\Chrome\ExtensionInstallForcelist"; ValueType: string; ValueName: "1"; ValueData: "{#ExtensionId};https://yhonda-ohishi-pub-dev.github.io/dtako_chrome_ext/update_manifest.xml"; Flags: uninsdeletevalue

[Code]
function InitializeSetup(): Boolean;
begin
  Result := True;
  MsgBox('この拡張機能をインストールします。' + #13#10 + #13#10 +
         '注意事項：' + #13#10 +
         '- 管理者権限が必要です' + #13#10 +
         '- インストール後、Chromeを再起動してください' + #13#10 +
         '- 拡張機能が自動的にインストールされます' + #13#10 +
         '- 今後のバージョンアップは自動で行われます',
         mbInformation, MB_OK);
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    MsgBox('インストールが完了しました。' + #13#10 + #13#10 +
           'Chromeを再起動すると、拡張機能が自動的に有効になります。' + #13#10 + #13#10 +
           '拡張機能ID: {#ExtensionId}' + #13#10 +
           '自動更新: 有効',
           mbInformation, MB_OK);
  end;
end;

[UninstallDelete]
Type: filesandordirs; Name: "{app}"
