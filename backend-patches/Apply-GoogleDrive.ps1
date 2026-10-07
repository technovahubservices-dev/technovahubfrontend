param([string]$BackendPath = 'D:\Technovahub-solution_backend')
$ErrorActionPreference = 'Stop'
$backendRoot = (Resolve-Path -LiteralPath $BackendPath).Path
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'google-drive-base.json') -Raw | ConvertFrom-Json
$patchPath = Join-Path $PSScriptRoot 'google-drive.patch'

# Refuse to replace work added since this patch was prepared.
foreach ($entry in $manifest) {
    $target = [IO.Path]::GetFullPath((Join-Path $backendRoot $entry.path))
    if (-not $target.StartsWith($backendRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Path outside backend.' }
    if ($null -eq $entry.sha256) {
        if (Test-Path -LiteralPath $target) { throw "New file already exists: $($entry.path)" }
    } else {
        if (-not (Test-Path -LiteralPath $target)) { throw "Missing original: $($entry.path)" }
        if ((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sha256) {
            throw "Backend file changed since preparation: $($entry.path)"
        }
    }
}
git -c "safe.directory=$backendRoot" -C $backendRoot apply --check $patchPath
if ($LASTEXITCODE -ne 0) { throw 'Patch validation failed.' }

# Keep byte-for-byte originals before applying the scoped diff. No services restart.
$backupRoot = Join-Path $backendRoot ('.drive-backup-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $backupRoot | Out-Null
foreach ($entry in $manifest) {
    if ($null -ne $entry.sha256) {
        $backupFile = Join-Path $backupRoot $entry.path
        New-Item -ItemType Directory -Force -Path (Split-Path $backupFile) | Out-Null
        Copy-Item -LiteralPath (Join-Path $backendRoot $entry.path) -Destination $backupFile
    }
}
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'google-drive-base.json') -Destination (Join-Path $backupRoot 'manifest.json')
git -c "safe.directory=$backendRoot" -C $backendRoot apply $patchPath
if ($LASTEXITCODE -ne 0) { throw "Patch failed. Original files are backed up at $backupRoot" }
Write-Output "Applied Google Drive backend patch. Originals backed up at $backupRoot"
