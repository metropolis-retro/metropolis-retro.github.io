@echo off
:: Windows batch equivalent of the Makefile
:: Usage: make.bat [command]

if "%1"=="" goto help
if "%1"=="help" goto help
if "%1"=="install" goto install
if "%1"=="dev" goto dev
if "%1"=="build" goto build
if "%1"=="lint" goto lint
if "%1"=="prek" goto prek
if "%1"=="prek-manual" goto prek-manual
if "%1"=="prek-update" goto prek-update
if "%1"=="clean" goto clean

echo Unknown command: %1
echo Run "make.bat help" for available commands.
exit /b 1

:help
echo.
echo Available commands:
echo   help           Show this help message
echo   install        Install dependencies (uv + bun)
echo   dev            Start Next.js dev server
echo   build          Build Next.js app
echo   lint           Run eslint (Checks TS/JS)
echo   prek           Run all prek hooks
echo   prek-manual    Run prek with an alternative config file
echo   prek-update    Autoupdate prek hooks and refresh uv lock
echo   clean          Clean build artifacts
goto :eof

:install
uv sync
bun install
goto :eof

:dev
bun dev
goto :eof

:build
bun build
goto :eof

:lint
bun lint
goto :eof

:prek
uv run prek run --all-files
goto :eof

:prek-manual
echo Running prek with custom config...
uv run prek --config .pre-commit-config.yaml run --all-files --hook-stage manual
goto :eof

:prek-update
echo Updating prek and hooks...
uv run prek autoupdate
goto :eof

:clean
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules rmdir /s /q node_modules
if exist .venv rmdir /s /q .venv
echo Cleanup complete.
goto :eof
