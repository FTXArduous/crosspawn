@echo off
setlocal
set "ROOT=%~dp0"
set "EXE=%ROOT%dist-packager\CrossPawn-win32-x64\CrossPawn.exe"

if exist "%EXE%" (
  start "CrossPawn Desktop" "%EXE%"
  exit /b 0
)

echo Packaged EXE not found. Starting development desktop mode instead...
cd /d "%ROOT%"
npm run start:desktop
