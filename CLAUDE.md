# Claude Code Project Instructions

## Startup Behavior

When starting work on this project, always:

1. **Check Current Date**: Use `Get-Date -Format "yyyy-MM-dd"` to confirm today's date
2. **Create Daily Report Directory**: Ensure `reports/YYYY-MM-DD/` exists for today
3. **Review Previous Work**: Check the latest report in `reports/` directory
4. **Continue from Last Session**: Resume work based on the most recent work report

## Daily Workflow

### On Session Start
```powershell
# Check today's date
$today = Get-Date -Format "yyyy-MM-dd"
Write-Host "Today is: $today"

# Create today's report directory
New-Item -Path "reports/$today" -ItemType Directory -Force

# List recent reports to understand context
Get-ChildItem "reports" | Sort-Object Name -Descending | Select-Object -First 3
```

### Work Tracking
- Always use TodoWrite tool for task management
- Update work reports in real-time during sessions
- Commit changes with descriptive messages including 🤖 Generated with Claude Code

### Session End
- Create comprehensive work report for today
- Commit all changes with proper documentation
- Update project status and next steps

## Project Context

This is **Neo Portfolio 2** - a modern developer portfolio built with:
- Next.js 15 + TypeScript + Tailwind CSS
- Sanity CMS integration
- GitHub API integration  
- Vercel deployment ready

## Current Status
✅ Development ready
✅ Build successful
✅ Deployment configured
✅ Documentation complete

## Priority Tasks
1. Vercel deployment execution
2. GitHub API token setup
3. Content population
4. Performance optimization

---

**Note**: This file helps Claude Code understand project context and maintain consistency across sessions.