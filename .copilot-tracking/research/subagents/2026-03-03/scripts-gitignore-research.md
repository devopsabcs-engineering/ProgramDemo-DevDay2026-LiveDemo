# Research: Local Development Scripts and .gitignore Specification for CIVIC Demo

**Date**: 2026-03-03  
**Status**: Complete  
**Topic**: PowerShell scripts for local development and comprehensive .gitignore

---

## Research Topics and Questions

1. **Start-Local.ps1**: PowerShell script to start local development environment
   - Parameter handling with `-SkipBuild`, `-BackendOnly`, `-FrontendOnly`, `-UseAzureSql`
   - Spring Boot Maven commands with profile switching
   - React/Vite development server commands
   - Prerequisite checking (Java, Maven, Node)

2. **Stop-Local.ps1**: PowerShell script to stop local development processes
   - Process discovery by port (8080, 3000)
   - Safe process termination
   - Status reporting

3. **.gitignore**: Comprehensive ignore patterns
   - Java/Maven build artifacts
   - Node/npm dependencies and build outputs
   - IDE configurations (with MCP exception)
   - OS-specific files
   - Logs and coverage reports

---

## Research Findings

### PowerShell Script Best Practices

**Comment-Based Help** (Source: Microsoft Learn - about_Comment_Based_Help):

- Use `<# ... #>` block comments for help content
- Required keywords: `.SYNOPSIS`, `.DESCRIPTION`, `.PARAMETER`, `.EXAMPLE`
- Help block should appear at the beginning of the script before `param()`
- Two blank lines required between help block end and first function declaration

**Script Structure**:

```powershell
<#
.SYNOPSIS
    Brief one-line description

.DESCRIPTION
    Detailed multi-line description of what the script does.

.PARAMETER ParameterName
    Description of the parameter.

.EXAMPLE
    PS> .\Script.ps1 -Parameter Value
    Description of what this example does.
#>

param (
    [switch]$SwitchParam,
    [string]$StringParam = "default"
)
```

**Best Practices**:

- Use `[CmdletBinding()]` for advanced function features
- Use `Write-Verbose` for detailed output (enabled with `-Verbose`)
- Use `Write-Host` with colors for status messages
- Use `$ErrorActionPreference = 'Stop'` for fail-fast behavior
- Check prerequisites with `Get-Command` before execution
- Use `Start-Process` for launching background processes

### Spring Boot Local Development

**Maven Plugin Run Command** (Source: Spring Boot Reference Documentation):

```bash
mvn spring-boot:run
```

**Profile Activation**:

```bash
# Using Maven property
mvn spring-boot:run -Dspring-boot.run.profiles=local

# Using environment variable
$env:SPRING_PROFILES_ACTIVE = "local"
mvn spring-boot:run
```

**Profile Configuration**:

- `local` profile: Uses H2 in-memory database
- `azure` profile: Uses Azure SQL connection string from environment

### React/Vite Development

**Development Server Start**:

```bash
npm run dev
```

**Vite Default Configuration**:

- Development server runs on port 5173 by default
- Can be configured in `vite.config.ts` to use port 3000:

```typescript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Process Management in PowerShell

**Get-NetTCPConnection** (Source: Microsoft Learn):

- Gets TCP connections with local/remote port information
- Returns `OwningProcess` property containing the PID
- Filter by port: `Get-NetTCPConnection -LocalPort 8080`
- Filter by state: `-State Listen` or `-State Established`

**Stop-Process**:

```powershell
# Stop by PID
Stop-Process -Id $pid -Force

# Stop by name
Stop-Process -Name "java" -Force -ErrorAction SilentlyContinue
```

**Port-to-Process Pattern**:

```powershell
$connections = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
if ($connections) {
    $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($processId in $pids) {
        Stop-Process -Id $processId -Force
    }
}
```

### .gitignore Patterns

**Java/Maven Patterns**:

- `target/` - Maven build output directory
- `*.jar` - Java archive files
- `*.class` - Compiled Java classes
- `*.war`, `*.ear` - Web/Enterprise archives
- `.gradle/`, `build/` - Gradle artifacts
- `pom.xml.tag`, `pom.xml.next` - Maven release plugin files

**Node/npm Patterns**:

- `node_modules/` - npm dependencies
- `dist/` - Build output
- `.env.local`, `.env.*.local` - Local environment files
- `npm-debug.log*` - npm debug logs
- `yarn-error.log*` - Yarn error logs

**IDE Patterns**:

- `.idea/` - IntelliJ IDEA project files
- `*.iml` - IntelliJ module files
- `.vscode/` - VS Code settings (with exception for MCP)
- `*.suo`, `*.user` - Visual Studio user files

**Negation Pattern** (keep specific files):

```gitignore
.vscode/
!.vscode/mcp.json
```

---

## Key Specifications

### 1. Start-Local.ps1 Specification

```powershell
<#
.SYNOPSIS
    Starts the CIVIC demo local development environment.

.DESCRIPTION
    Starts the backend (Java Spring Boot) and/or frontend (React + Vite) 
    development servers for local development. By default, starts both servers.
    
    Backend runs on port 8080, frontend runs on port 3000.
    
    Uses H2 in-memory database by default. Use -UseAzureSql to connect to 
    Azure SQL instead (requires environment variables).

.PARAMETER SkipBuild
    Skip Maven and npm build steps. Use when code hasn't changed and you 
    just want to restart the servers.

.PARAMETER BackendOnly
    Start only the Java Spring Boot backend on port 8080.

.PARAMETER FrontendOnly
    Start only the React frontend development server on port 3000.

.PARAMETER UseAzureSql
    Use Azure SQL database instead of H2 in-memory database.
    Requires AZURE_SQL_CONNECTION_STRING environment variable.

.EXAMPLE
    PS> .\Start-Local.ps1
    Starts both backend and frontend with default settings (H2 database).

.EXAMPLE
    PS> .\Start-Local.ps1 -BackendOnly
    Starts only the Spring Boot backend on port 8080.

.EXAMPLE
    PS> .\Start-Local.ps1 -FrontendOnly -SkipBuild
    Starts only the React frontend, skipping npm install.

.EXAMPLE
    PS> .\Start-Local.ps1 -UseAzureSql
    Starts both servers using Azure SQL database connection.

.NOTES
    Prerequisites:
    - Java 21 (for backend)
    - Maven (for backend)
    - Node.js 18+ (for frontend)
    - npm (for frontend)
#>

[CmdletBinding()]
param (
    [switch]$SkipBuild,
    [switch]$BackendOnly,
    [switch]$FrontendOnly,
    [switch]$UseAzureSql
)

$ErrorActionPreference = 'Stop'

# Colors for output
$InfoColor = 'Cyan'
$SuccessColor = 'Green'
$WarningColor = 'Yellow'
$ErrorColor = 'Red'

function Write-Status {
    param([string]$Message, [string]$Color = $InfoColor)
    Write-Host "[CIVIC] $Message" -ForegroundColor $Color
}

function Test-Prerequisite {
    param([string]$Command, [string]$Name)
    if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
        Write-Status "$Name is not installed or not in PATH" $ErrorColor
        return $false
    }
    Write-Verbose "$Name found: $(Get-Command $Command | Select-Object -ExpandProperty Source)"
    return $true
}

# Determine what to start
$startBackend = -not $FrontendOnly
$startFrontend = -not $BackendOnly

# Check prerequisites
Write-Status "Checking prerequisites..."

$prereqsMet = $true

if ($startBackend) {
    if (-not (Test-Prerequisite "java" "Java")) { $prereqsMet = $false }
    if (-not (Test-Prerequisite "mvn" "Maven")) { $prereqsMet = $false }
    
    # Check Java version
    $javaVersion = java -version 2>&1 | Select-String -Pattern 'version "(\d+)'
    if ($javaVersion -match 'version "(\d+)') {
        $majorVersion = [int]$Matches[1]
        if ($majorVersion -lt 21) {
            Write-Status "Java 21+ required, found Java $majorVersion" $WarningColor
        }
    }
}

if ($startFrontend) {
    if (-not (Test-Prerequisite "node" "Node.js")) { $prereqsMet = $false }
    if (-not (Test-Prerequisite "npm" "npm")) { $prereqsMet = $false }
}

if (-not $prereqsMet) {
    Write-Status "Prerequisites check failed. Please install missing tools." $ErrorColor
    exit 1
}

Write-Status "Prerequisites OK" $SuccessColor

# Set Spring profile
$springProfile = if ($UseAzureSql) { "azure" } else { "local" }
Write-Status "Using Spring profile: $springProfile"

# Start Backend
if ($startBackend) {
    Write-Status "Starting backend (Spring Boot on port 8080)..."
    
    Push-Location -Path "$PSScriptRoot\..\backend"
    
    try {
        if (-not $SkipBuild) {
            Write-Status "Building backend with Maven..."
            & mvn clean compile -q
            if ($LASTEXITCODE -ne 0) {
                Write-Status "Maven build failed" $ErrorColor
                exit 1
            }
        }
        
        Write-Status "Starting Spring Boot application..."
        $env:SPRING_PROFILES_ACTIVE = $springProfile
        Start-Process -FilePath "mvn" -ArgumentList "spring-boot:run" -NoNewWindow
        
        Write-Status "Backend starting at http://localhost:8080" $SuccessColor
    }
    finally {
        Pop-Location
    }
}

# Start Frontend
if ($startFrontend) {
    Write-Status "Starting frontend (React + Vite on port 3000)..."
    
    Push-Location -Path "$PSScriptRoot\..\frontend"
    
    try {
        if (-not $SkipBuild) {
            Write-Status "Installing npm dependencies..."
            & npm install --silent
            if ($LASTEXITCODE -ne 0) {
                Write-Status "npm install failed" $ErrorColor
                exit 1
            }
        }
        
        Write-Status "Starting Vite development server..."
        Start-Process -FilePath "npm" -ArgumentList "run", "dev" -NoNewWindow
        
        Write-Status "Frontend starting at http://localhost:3000" $SuccessColor
    }
    finally {
        Pop-Location
    }
}

# Summary
Write-Host ""
Write-Status "========================================" $SuccessColor
Write-Status "CIVIC Development Environment Started" $SuccessColor
Write-Status "========================================" $SuccessColor

if ($startBackend) {
    Write-Status "  Backend API: http://localhost:8080" $InfoColor
    Write-Status "  Database: $(if ($UseAzureSql) { 'Azure SQL' } else { 'H2 In-Memory' })" $InfoColor
}

if ($startFrontend) {
    Write-Status "  Frontend:    http://localhost:3000" $InfoColor
}

Write-Host ""
Write-Status "Use Stop-Local.ps1 to stop all services" $InfoColor
```

### 2. Stop-Local.ps1 Specification

```powershell
<#
.SYNOPSIS
    Stops the CIVIC demo local development environment.

.DESCRIPTION
    Finds and stops processes running on the backend (port 8080) and 
    frontend (port 3000) ports used by the CIVIC development environment.
    
    Reports what processes were stopped or if no processes were found.

.EXAMPLE
    PS> .\Stop-Local.ps1
    Stops all CIVIC development processes on ports 8080 and 3000.

.NOTES
    This script requires administrator privileges to stop some processes.
#>

[CmdletBinding()]
param ()

$ErrorActionPreference = 'Continue'

# Colors for output
$InfoColor = 'Cyan'
$SuccessColor = 'Green'
$WarningColor = 'Yellow'

function Write-Status {
    param([string]$Message, [string]$Color = $InfoColor)
    Write-Host "[CIVIC] $Message" -ForegroundColor $Color
}

function Stop-ProcessOnPort {
    param(
        [int]$Port,
        [string]$ServiceName
    )
    
    Write-Status "Checking port $Port ($ServiceName)..."
    
    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    
    if (-not $connections) {
        Write-Status "  No process found on port $Port" $WarningColor
        return $false
    }
    
    $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
    $stopped = $false
    
    foreach ($processId in $pids) {
        try {
            $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($process) {
                $processName = $process.ProcessName
                Write-Status "  Stopping $processName (PID: $processId)..."
                Stop-Process -Id $processId -Force
                Write-Status "  Stopped $processName" $SuccessColor
                $stopped = $true
            }
        }
        catch {
            Write-Status "  Failed to stop process $processId`: $_" $WarningColor
        }
    }
    
    return $stopped
}

Write-Status "Stopping CIVIC Development Environment..."
Write-Host ""

$backendStopped = Stop-ProcessOnPort -Port 8080 -ServiceName "Backend"
$frontendStopped = Stop-ProcessOnPort -Port 3000 -ServiceName "Frontend"

Write-Host ""

if ($backendStopped -or $frontendStopped) {
    Write-Status "========================================" $SuccessColor
    Write-Status "Development environment stopped" $SuccessColor
    Write-Status "========================================" $SuccessColor
}
else {
    Write-Status "No CIVIC processes were running" $WarningColor
}
```

### 3. .gitignore Specification

```gitignore
# =============================================================================
# CIVIC Demo .gitignore
# Combined rules for Java/Maven backend and React/TypeScript frontend
# =============================================================================

# -----------------------------------------------------------------------------
# Java / Maven
# -----------------------------------------------------------------------------
target/
*.jar
*.class
*.war
*.ear

# Gradle (if used)
.gradle/
build/

# Maven wrapper
!.mvn/wrapper/maven-wrapper.jar

# Maven release plugin
pom.xml.releaseBackup
pom.xml.tag
pom.xml.next
release.properties

# -----------------------------------------------------------------------------
# Node / npm / React / Vite
# -----------------------------------------------------------------------------
node_modules/
dist/
.cache/

# Environment files (keep template, ignore local overrides)
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Vite
*.local

# TypeScript
*.tsbuildinfo

# -----------------------------------------------------------------------------
# IDE / Editors
# -----------------------------------------------------------------------------

# IntelliJ IDEA
.idea/
*.iml
*.ipr
*.iws
out/

# VS Code - ignore all except MCP configuration
.vscode/*
!.vscode/mcp.json

# Eclipse
.classpath
.project
.settings/
bin/

# NetBeans
nbproject/private/
nbbuild/
nbdist/
.nb-gradle/

# -----------------------------------------------------------------------------
# Operating System
# -----------------------------------------------------------------------------
.DS_Store
.DS_Store?
._*
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/

# -----------------------------------------------------------------------------
# Logs
# -----------------------------------------------------------------------------
*.log
logs/
*.log.*

# Spring Boot
spring.log

# -----------------------------------------------------------------------------
# Test Coverage
# -----------------------------------------------------------------------------
coverage/
*.lcov
.nyc_output/

# JaCoCo (Java coverage)
jacoco.exec
jacoco/

# -----------------------------------------------------------------------------
# Build / Temporary
# -----------------------------------------------------------------------------
*.tmp
*.temp
*.bak
*.swp
*.swo
*~

# Package files
*.gz
*.zip

# -----------------------------------------------------------------------------
# Application-specific
# -----------------------------------------------------------------------------

# H2 Database files (local development)
*.mv.db
*.trace.db

# Certificates and keys (never commit)
*.pem
*.key
*.crt
*.p12
*.jks

# Local configuration overrides
application-local.yml
application-local.properties
```

---

## References and Evidence

1. **PowerShell Comment-Based Help**
   - Source: Microsoft Learn - about_Comment_Based_Help
   - URL: https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comment_based_help
   - Key: Use `.SYNOPSIS`, `.DESCRIPTION`, `.PARAMETER`, `.EXAMPLE` keywords

2. **Spring Boot Maven Plugin**
   - Source: Spring Boot Reference Documentation
   - URL: https://docs.spring.io/spring-boot/reference/using/running-your-application.html
   - Key: `mvn spring-boot:run` with `-Dspring-boot.run.profiles=` for profile activation

3. **Get-NetTCPConnection Cmdlet**
   - Source: Microsoft Learn - NetTCPIP Module
   - URL: https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection
   - Key: `-LocalPort` parameter and `OwningProcess` property for port-to-PID mapping

4. **PowerShell Cmdlet Development**
   - Source: Microsoft Learn - Cmdlet Overview
   - URL: https://learn.microsoft.com/en-us/powershell/scripting/developer/cmdlet/cmdlet-overview
   - Key: `[CmdletBinding()]` attribute for advanced script functions

---

## Discovered Research Topics

1. **Vite Configuration**: Vite defaults to port 5173; need to verify `vite.config.ts` sets port to 3000
2. **Spring Profile Configuration**: Ensure `application-local.yml` and `application-azure.yml` exist with appropriate database configurations
3. **Azure SQL Connection**: Consider using `AZURE_SQL_CONNECTION_STRING` or individual `AZURE_SQL_*` environment variables
4. **Error Handling**: Scripts should handle cases where ports are already in use or processes fail to start

---

## Next Research

- [ ] Verify Vite configuration structure for port 3000 setting
- [ ] Research Azure SQL connection string format for Spring Boot
- [ ] Consider adding health check polling after server startup
- [ ] Research cross-platform compatibility (macOS/Linux versions of scripts)

---

## Clarifying Questions

None - all specifications are complete based on the provided requirements.
