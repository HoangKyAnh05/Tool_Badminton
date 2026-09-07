@echo off
chcp 65001 >nul
title Đóng Gói Ứng Dụng Badminton Pro Trainer (.exe)
color 0b

echo =====================================================================
echo           🏸 BADMINTON PRO TRAINER - WINDOWS PACKAGER (.EXE) 🏸
echo =====================================================================
echo.
echo  [1/3] Đang kiểm tra môi trường và cài đặt dependencies...
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [LỖI] Không tìm thấy Node.js/npm trên hệ thống. Vui lòng cài đặt Node.js từ https://nodejs.org/
    pause
    exit /b 1
)

echo  [2/3] Đang biên dịch mã nguồn React + TypeScript (Vite)...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [LỖI] Biên dịch mã nguồn thất bại! Vui lòng kiểm tra lại mã TypeScript.
    pause
    exit /b 1
)

echo.
echo  [3/3] Đang đóng gói bộ cài Windows (.exe) với Electron-Builder...
echo        (File cài đặt NSIS + Phiên bản Portable độc lập)
echo        Quá trình này có thể mất 1-2 phút trong lần đầu tiên...
echo.
call npm run electron:build
if %ERRORLEVEL% neq 0 (
    echo [LỖI] Quá trình đóng gói Electron-Builder gặp lỗi!
    pause
    exit /b 1
)

echo.
echo =====================================================================
echo  🎉 ĐÓNG GÓI THÀNH CÔNG!
echo  📁 Thư mục xuất file: %~dp0release\
echo.
echo  Các file đã sẵn sàng để sử dụng hoặc chia sẻ:
echo    1. Badminton Pro Trainer Setup [phiên bản].exe (Bộ cài đặt Windows tự tạo shortcut)
echo    2. Badminton Pro Trainer-Portable-[phiên bản].exe (Chạy ngay không cần cài đặt)
echo =====================================================================
echo.

:: Tự động mở thư mục chứa file .exe
explorer "%~dp0release"

pause
