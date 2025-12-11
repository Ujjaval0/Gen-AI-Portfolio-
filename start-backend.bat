@echo off
echo ========================================
echo Starting Backend Server
echo ========================================

cd backend

REM Check if virtual environment exists
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)

REM Activate virtual environment
echo Activating virtual environment...
call .venv\Scripts\activate.bat

REM Install/upgrade dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please copy .env.example to .env and add your API keys
    echo.
    echo Example:
    echo   cd backend
    echo   copy .env.example .env
    echo   notepad .env
    echo.
    pause
    exit /b 1
)

REM Start the server
echo.
echo ========================================
echo Backend server starting on port 8000
echo ========================================
echo.
uvicorn main:app --reload --port 8000
