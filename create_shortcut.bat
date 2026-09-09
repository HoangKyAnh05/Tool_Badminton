@echo off
title Tao Shortcut Desktop - Badminton Pro
color 0A

echo ================================================================
echo           DANG TAO PHIM TAT DESKTOP CHO BADMINTON PRO
echo ================================================================
echo.

cd /d "%~dp0"

set "TARGET_LAUNCHER=wscript.exe"
set "ARG_VBS=%~dp0launch.vbs"
set "ICON_FILE=%~dp0public\icon.ico"
set "SHORTCUT_NAME=Badminton Pro Trainer.lnk"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ws = New-Object -ComObject WScript.Shell; " ^
  "$desktop = [System.Environment]::GetFolderPath('Desktop'); " ^
  "$s = $ws.CreateShortcut((Join-Path $desktop '%SHORTCUT_NAME%')); " ^
  "$s.TargetPath = '%TARGET_LAUNCHER%'; " ^
  "$s.Arguments = '""%ARG_VBS%""'; " ^
  "$s.WorkingDirectory = '%~dp0'; " ^
  "$s.IconLocation = '%ICON_FILE%'; " ^
  "$s.Description = 'He Thong Luyen Phan Xa & Chien Thuat Cau Long'; " ^
  "$s.Save();"

if %errorlevel% equ 0 (
    echo.
    echo ================================================================
    echo  [THANH CONG] Da tao loi tat 'Badminton Pro Trainer' tren Desktop!
    echo  Ban co the ra man hinh chinh Desktop va nhan dup de mo app.
    echo ================================================================
) else (
    echo.
    echo [LOI] Khong the tao loi tat. Vui long kiem tra lai quyen truy cap.
)

echo.
pause
