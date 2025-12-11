@echo off
echo ========================================
echo Starting Full Stack Application
echo ========================================
echo.
echo This will start:
echo   1. Backend API (port 8000)
echo   2. Frontend Dev Server (port 8080)
echo.

REM Start backend in a new window
echo Starting backend server...
start "Backend Server" cmd /k "start-backend.bat"

REM Wait a moment for backend to initialize
timeout /t 3 /nobreak > nul

REM Start frontend in current window
echo Starting frontend dev server...
npm run dev

pause
