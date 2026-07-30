@echo off
setlocal
set "ROOT=%~dp0"

if not exist "%ROOT%Run-CrossPawn-Website.cmd" (
  echo Could not find Run-CrossPawn-Website.cmd next to this launcher.
  pause
  exit /b 1
)

call "%ROOT%Run-CrossPawn-Website.cmd"
exit /b 0
