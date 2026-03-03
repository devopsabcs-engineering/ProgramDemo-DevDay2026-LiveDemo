<#
.SYNOPSIS
    Starts the CIVIC local development environment.

.DESCRIPTION
    Launches the Java Spring Boot backend (port 8080) and React frontend (port 3000)
    for local development. Supports running backend-only, frontend-only, or both.

.PARAMETER SkipBuild
    Skip Maven and npm build steps. Use when dependencies are already installed.

.PARAMETER BackendOnly
    Start only the Java backend server on port 8080.

.PARAMETER FrontendOnly
    Start only the React frontend server on port 3000.

.PARAMETER UseAzureSql
    Use Azure SQL connection instead of H2. Requires Azure credentials.

.EXAMPLE
    .\Start-Local.ps1
    Starts both backend and frontend with full build.

.EXAMPLE
    .\Start-Local.ps1 -SkipBuild -BackendOnly
    Starts only backend without rebuilding.

.EXAMPLE
    .\Start-Local.ps1 -FrontendOnly
    Starts only the React frontend server.

.EXAMPLE
    .\Start-Local.ps1 -UseAzureSql
    Starts both servers using Azure SQL instead of H2 database.
#>

[CmdletBinding()]
param(
    [switch]$SkipBuild,
    [switch]$BackendOnly,
    [switch]$FrontendOnly,
    [switch]$UseAzureSql
)

# Status output helper function
function Write-Status([string]$Message, [string]$Type = "Info") {
    switch ($Type) {
        "Success" { Write-Host "✓ $Message" -ForegroundColor Green }
        "Warning" { Write-Host "⚠ $Message" -ForegroundColor Yellow }
        "Error"   { Write-Host "✗ $Message" -ForegroundColor Red }
        default   { Write-Host "→ $Message" -ForegroundColor Cyan }
    }
}

# Get script and project root directories
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$backendPath = $projectRoot
$frontendPath = Join-Path $projectRoot "src\frontend"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       CIVIC Local Development Environment Startup        ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Prerequisite checks
Write-Status "Checking prerequisites..." "Info"

$prerequisites = @(
    @{ Name = "Java"; Command = "java --version"; Required = -not $FrontendOnly },
    @{ Name = "Maven"; Command = "mvn --version"; Required = -not $FrontendOnly },
    @{ Name = "Node.js"; Command = "node --version"; Required = -not $BackendOnly },
    @{ Name = "npm"; Command = "npm --version"; Required = -not $BackendOnly }
)

$allPrerequisitesMet = $true
foreach ($prereq in $prerequisites) {
    if ($prereq.Required) {
        try {
            $null = Invoke-Expression $prereq.Command 2>&1
            Write-Status "$($prereq.Name) found" "Success"
        }
        catch {
            Write-Status "$($prereq.Name) not found - please install it" "Error"
            $allPrerequisitesMet = $false
        }
    }
}

if (-not $allPrerequisitesMet) {
    Write-Status "Some prerequisites are missing. Please install them and try again." "Error"
    exit 1
}

Write-Host ""

# Determine Spring profile
$springProfile = if ($UseAzureSql) { "azure" } else { "local" }
if ($UseAzureSql) {
    Write-Status "Using Azure SQL database (profile: azure)" "Info"
} else {
    Write-Status "Using H2 in-memory database (profile: local)" "Info"
}

Write-Host ""

# Start Backend
if (-not $FrontendOnly) {
    Write-Status "Starting Java Spring Boot backend..." "Info"
    
    if (Test-Path $backendPath) {
        if (-not $SkipBuild) {
            Write-Status "Building backend with Maven..." "Info"
            Push-Location $backendPath
            & mvn clean compile -q
            Pop-Location
            Write-Status "Backend build complete" "Success"
        } else {
            Write-Status "Skipping backend build" "Warning"
        }
        
        $backendArgs = "/c mvn spring-boot:run -Dspring.profiles.active=$springProfile"
        Start-Process -FilePath "cmd" -ArgumentList $backendArgs -WorkingDirectory $backendPath -WindowStyle Minimized
        Write-Status "Backend server starting on port 8080" "Success"
    } else {
        Write-Status "Backend directory not found: $backendPath" "Error"
    }
}

# Start Frontend
if (-not $BackendOnly) {
    Write-Status "Starting React frontend..." "Info"
    
    if (Test-Path $frontendPath) {
        if (-not $SkipBuild) {
            Write-Status "Installing npm dependencies..." "Info"
            Push-Location $frontendPath
            & npm install --silent
            Pop-Location
            Write-Status "npm install complete" "Success"
        } else {
            Write-Status "Skipping npm install" "Warning"
        }
        
        $frontendArgs = "/c npm run dev"
        Start-Process -FilePath "cmd" -ArgumentList $frontendArgs -WorkingDirectory $frontendPath -WindowStyle Minimized
        Write-Status "Frontend server starting on port 3000" "Success"
    } else {
        Write-Status "Frontend directory not found: $frontendPath" "Error"
    }
}

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                   Development URLs                       ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

if (-not $FrontendOnly) {
    Write-Status "Backend API:    http://localhost:8080" "Info"
    if (-not $UseAzureSql) {
        Write-Status "H2 Console:     http://localhost:8080/h2-console" "Info"
    }
}

if (-not $BackendOnly) {
    Write-Status "Frontend:       http://localhost:3000" "Info"
}

Write-Host ""
Write-Status "Servers are starting in background windows." "Info"
Write-Status "Use Stop-Local.ps1 to stop all servers." "Info"
Write-Host ""
