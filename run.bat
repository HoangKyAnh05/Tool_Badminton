@echo off
title Badminton Pro - He Thong Luyen Phan Xa & Ky Chien Thuat Cau Long
color 0B

echo ================================================================
echo          BADMINTON PRO - PHAN XA 9 O & FOOTWORK TRAINER
echo ================================================================
echo.

cd /d "%~dp0"

:: Check if node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] Khong tim thay Node.js tren may tinh!
    echo Vui long cai dat Node.js tu: https://nodejs.org/
    pause
    exit /b 1
)

:: Check if dependencies installed
if not exist "node_modules\" (
    echo [THONG BAO] Dang cai dat cac thu vien can thiet, vui long cho...
    call npm install
    if %errorlevel% neq 0 (
        echo [LOI] Cai dat that bai!
        pause
        exit /b 1
    )
)

echo [KHOI DONG] Dang khoi dong Badminton Pro tren Desktop...
echo.

:: Launch Electron app with Vite
call npm run electron:dev

if %errorlevel% neq 0 (
    echo.
    echo [CHU Y] Neu ung dung Electron gap loi hien thi, dang mo ban Web tai trinh duyet...
    start http://localhost:5173
    call npm run dev
)

pause
