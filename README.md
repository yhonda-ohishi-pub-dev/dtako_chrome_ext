# デジタコデータ取込補助 Chrome拡張機能

theearth-np.com のデジタコデータ入力を補助するChrome拡張機能です。

## 機能

- キーボードショートカット: `Ctrl+Shift+H`
- 対応ページ:
  - ログインページ
  - 運行編集ページ
  - データ表示設定ページ
  - 汎用CSV取込ページ
  - 作業編集ページ
  - 経費編集ページ

## インストール方法

### 方法1: インストーラーを使う（推奨）

1. [Releases](https://github.com/yhonda-ohishi-pub-dev/dtako_chrome_ext/releases) から最新の `.exe` ファイルをダウンロード
2. ダウンロードした `.exe` ファイルを実行
3. インストーラーの指示に従う
4. Chromeを開いて `chrome://extensions/` にアクセス
5. 「デベロッパーモード」をONにする
6. 「パッケージ化されていない拡張機能を読み込む」をクリック
7. インストールフォルダ（通常 `C:\Program Files\デジタコデータ取込補助`）を選択

### 方法2: 手動インストール

1. このリポジトリをクローンまたはダウンロード
2. Chromeを開いて `chrome://extensions/` にアクセス
3. 「デベロッパーモード」をONにする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. このフォルダを選択

## 使い方

1. theearth-np.com にアクセス
2. `Ctrl+Shift+H` を押すか、ツールバーのアイコンをクリック
3. ポップアップが表示されます

## 開発者向け

### 必要なツール

- [Inno Setup 6](https://jrsoftware.org/isdl.php) - インストーラー作成用

### インストーラーのビルド方法

1. Inno Setup 6 をインストール
2. `build-installer.bat` を実行
3. `Output` フォルダに `.exe` ファイルが生成されます

### GitHub Release への配布

1. インストーラーをビルド
2. GitHub でタグを作成（例: `v1.0`）
3. Release を作成
4. ビルドした `.exe` ファイルをアップロード

### カスタマイズ

`installer.iss` ファイルで以下を編集してください:

- `#define MyAppPublisher` - 会社名
- `#define MyAppURL` - GitHubリポジトリのURL
- `AppId` - 一意のGUID（新規生成推奨）

GUID生成: PowerShellで `[guid]::NewGuid()` を実行

## ライセンス

(ライセンスを記載)

## 更新履歴

### v1.0 (2025-10-19)
- 初回リリース
