@echo off
chcp 65001 >nul
setlocal

REM 切换到脚本所在目录
cd /d "%~dp0"

echo ============================================
echo   history-frontend 一键启动脚本
echo ============================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if errorlevel 1 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js：https://nodejs.org/
    pause
    exit /b 1
)

REM 检查依赖是否已安装，未安装则自动安装
if not exist "node_modules" (
    echo [信息] 未检测到 node_modules，开始安装依赖...
    call npm install
    if errorlevel 1 (
        echo [错误] 依赖安装失败，请检查网络或 npm 配置后重试。
        pause
        exit /b 1
    )
    echo [信息] 依赖安装完成。
    echo.
) else (
    echo [信息] 依赖已就绪。
)

REM 启动开发服务器并在默认浏览器打开
echo [信息] 正在启动 Vite 开发服务器...
echo [信息] 浏览器将在服务启动后自动打开 http://localhost:5173
echo.

start "" timeout /t 3 /nobreak >nul ^&^& start http://localhost:5173

call npm run dev

endlocal
