<#
.SYNOPSIS
    Stops the CIVIC local development servers.

.DESCRIPTION
    Finds and terminates processes running on ports 8080 (backend) and 3000 (frontend).
    Reports what was stopped or indicates if no processes were running.

.EXAMPLE
    .\Stop-Local.ps1
    Stops all CIVIC development servers.
#>

[CmdletBinding()]
param()

# Status output helper function
function Write-Status([string]$Message, [string]$Type = "Info") {
    switch ($Type) {
        "Success" { Write-Host "✓ $Message" -ForegroundColor Green }
        "Warning" { Write-Host "⚠ $Message" -ForegroundColor Yellow }
        "Error"   { Write-Host "✗ $Message" -ForegroundColor Red }
        default   { Write-Host "→ $Message" -ForegroundColor Cyan }
    }
}

# Stop process running on specified port
function Stop-ProcessOnPort([int]$Port) {
    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($connections) {
        $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
        foreach ($processId in $pids) {
            $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($process) {
                Write-Status "Stopping $($process.ProcessName) (PID: $processId) on port $Port" "Warning"
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Status "Stopped process on port $Port" "Success"
                return $true
            }
        }
    } else {
        Write-Status "No process found on port $Port" "Info"
        return $false
    }
    return $false
}

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       CIVIC Local Development Environment Shutdown       ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Status "Checking for running CIVIC servers..." "Info"
Write-Host ""

$stoppedAny = $false

# Stop Backend on port 8080
Write-Status "Checking port 8080 (Backend)..." "Info"
if (Stop-ProcessOnPort -Port 8080) {
    $stoppedAny = $true
}

Write-Host ""

# Stop Frontend on port 3000
Write-Status "Checking port 3000 (Frontend)..." "Info"
if (Stop-ProcessOnPort -Port 3000) {
    $stoppedAny = $true
}

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                       Summary                            ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

if ($stoppedAny) {
    Write-Status "CIVIC development servers have been stopped." "Success"
} else {
    Write-Status "No CIVIC servers were running." "Info"
}

Write-Host ""
