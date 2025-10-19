@echo off
echo Building installer...

REM Inno Setup のパスを指定（環境に合わせて変更してください）
set INNO_SETUP="C:\Program Files (x86)\Inno Setup 6\ISCC.exe"

REM インストーラーをビルド
%INNO_SETUP% installer.iss

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Build successful!
    echo Installer created in: Output\
    echo.
    pause
) else (
    echo.
    echo Build failed!
    echo Please check if Inno Setup is installed correctly.
    echo.
    pause
)
