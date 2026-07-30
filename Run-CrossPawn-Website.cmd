@echo off
setlocal
set "PORT=8787"
set "ROOT=%~dp0"

if not exist "%ROOT%index.html" (
  echo Could not find index.html in this folder.
  pause
  exit /b 1
)

echo Starting CrossPawn website on http://127.0.0.1:%PORT%/
set "TS=%DATE:~10,4%%DATE:~4,2%%DATE:~7,2%-%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%"
set "TS=%TS: =0%"
start "CrossPawn Website" "http://127.0.0.1:%PORT%/?v=%TS%"
node "%ROOT%serve.js" %PORT%
