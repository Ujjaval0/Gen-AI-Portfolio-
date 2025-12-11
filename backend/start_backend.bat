@echo off
echo ========================================
echo   Resume Chatbot Backend Server
echo ========================================
echo.

cd /d "%~dp0"

REM Check if .venv exists
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)

echo Activating virtual environment...
call .venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt --quiet

echo.
echo ========================================
echo   Starting Backend Server on port 8000
echo   Press Ctrl+C to stop
echo ========================================
echo.

uvicorn main:app --reload --port 8000
