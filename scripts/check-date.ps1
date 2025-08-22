# Daily Project Setup Script
# Run this at the start of each work session

$today = Get-Date -Format "yyyy-MM-dd"
$todayShort = Get-Date -Format "yyyyMMdd"

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "    NEO PORTFOLIO 2 - Daily Setup" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📅 Today's Date: $today" -ForegroundColor Green
Write-Host "📁 Report Directory: reports/$today/" -ForegroundColor Blue

# Create today's report directory
$reportDir = "reports/$today"
if (!(Test-Path $reportDir)) {
    New-Item -Path $reportDir -ItemType Directory -Force | Out-Null
    Write-Host "✅ Created report directory: $reportDir" -ForegroundColor Green
} else {
    Write-Host "📂 Report directory already exists: $reportDir" -ForegroundColor Yellow
}

# Show recent work reports
Write-Host ""
Write-Host "📊 Recent Work Reports:" -ForegroundColor Magenta
Get-ChildItem "reports" -Directory | Sort-Object Name -Descending | Select-Object -First 5 | ForEach-Object {
    $reportFile = Join-Path $_.FullName "work-report.md"
    if (Test-Path $reportFile) {
        Write-Host "   ✅ $($_.Name)" -ForegroundColor Green
    } else {
        Write-Host "   📝 $($_.Name) (no report yet)" -ForegroundColor Yellow
    }
}

# Check project status
Write-Host ""
Write-Host "🚀 Project Status:" -ForegroundColor Magenta

# Check if development server is running
$devProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" }
if ($devProcess) {
    Write-Host "   🟢 Development server likely running" -ForegroundColor Green
} else {
    Write-Host "   🔴 Development server not detected" -ForegroundColor Red
    Write-Host "   💡 Run: pnpm dev" -ForegroundColor Cyan
}

# Check git status
try {
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "   📝 Uncommitted changes detected" -ForegroundColor Yellow
        Write-Host "   💡 Review and commit when ready" -ForegroundColor Cyan
    } else {
        Write-Host "   ✅ Git working tree clean" -ForegroundColor Green
    }
} catch {
    Write-Host "   ❓ Could not check git status" -ForegroundColor Red
}

# Show next steps
Write-Host ""
Write-Host "🎯 Suggested Next Steps:" -ForegroundColor Magenta
Write-Host "   1. Review latest work report" -ForegroundColor White
Write-Host "   2. Start development server: pnpm dev" -ForegroundColor White
Write-Host "   3. Continue with priority tasks" -ForegroundColor White
Write-Host "   4. Update work report throughout session" -ForegroundColor White

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Ready to start coding! 🚀" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan