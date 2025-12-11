@echo off
echo ========================================
echo Backend Setup Verification
echo ========================================
echo.

cd backend

REM Check virtual environment
if exist ".venv" (
    echo [OK] Virtual environment exists
) else (
    echo [MISSING] Virtual environment not found
    echo Run: python -m venv .venv
)

REM Check .env file
if exist ".env" (
    echo [OK] .env file exists
    
    REM Check if it has actual keys (not placeholders)
    findstr /C:"your-openrouter" .env > nul
    if %errorlevel% equ 0 (
        echo [WARNING] .env contains placeholder keys
        echo Please add your actual API keys to backend\.env
    ) else (
        echo [OK] .env appears to have real API keys
    )
) else (
    echo [MISSING] .env file not found
    echo Run: copy .env.example .env
)

REM Check requirements.txt
if exist "requirements.txt" (
    echo [OK] requirements.txt exists
) else (
    echo [MISSING] requirements.txt not found
)

REM Check main.py
if exist "main.py" (
    echo [OK] main.py exists
) else (
    echo [MISSING] main.py not found
)

echo.
echo ========================================
echo Verification Complete
echo ========================================
echo.
echo Next steps:
echo 1. If .env has placeholders, add your API keys
echo 2. Run: start-backend.bat
echo 3. Or run: npm start (to start both frontend and backend)
echo.
pause
