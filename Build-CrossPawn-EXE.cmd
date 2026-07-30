@echo off
setlocal
set "ROOT=%~dp0"
cd /d "%ROOT%"

echo Installing dependencies...
npm install
if errorlevel 1 (
  echo Dependency install failed.
  pause
  exit /b 1
)

echo Building Windows EXE package...
npm run build:win:packager
if errorlevel 1 (
  echo EXE build failed.
  pause
  exit /b 1
)

echo Build complete. Check the dist folder.
pause
