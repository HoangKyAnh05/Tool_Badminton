@echo off
title Git Push - Badminton Pro Repository
color 0E

echo ================================================================
echo           DANG DONG BO DU LIEU LEN GITHUB REPOSITORY
echo   Repo: https://github.com/trongtinozzzz-stack/Tool_Badminton.git
echo ================================================================
echo.

cd /d "%~dp0"

:: Initialize git if not present
if not exist ".git\" (
    echo [KHOI TAO] Dang khoi tao git repository...
    git init
    git branch -M main
)

:: Ensure remote origin is set
git remote remove origin >nul 2>nul
git remote add origin https://github.com/trongtinozzzz-stack/Tool_Badminton.git

echo.
set /p COMMIT_MSG="Nhap noi dung commit (Hoac an Enter de dung mac dinh): "

if "%COMMIT_MSG%"=="" (
    set "COMMIT_MSG=feat: complete badminton reaction and training app with electron, 9-grid, and theory quiz"
)

echo.
echo [1/3] Dang them tat ca cac tap tin (git add .)...
git add .

echo.
echo [2/3] Dang commit: "%COMMIT_MSG%"...
git commit -m "%COMMIT_MSG%"

echo.
echo [3/3] Dang push len GitHub (main branch)...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ================================================================
    echo  [THANH CONG] Da day ma nguon len GitHub thanh cong!
    echo ================================================================
) else (
    echo.
    echo ================================================================
    echo  [CHU Y] Neu gap loi xac thuc, hay kiem tra Personal Access Token
    echo  hoac dang nhap Git Credentials cua ban tren may tinh.
    echo ================================================================
)

echo.
pause
