# Windows Claude Code Notifications Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fire native Windows toast notifications when Claude Code needs attention, finishes a task, or a subagent completes.

**Architecture:** A single PowerShell script (`~/.claude/notify.ps1`) reads JSON from stdin on each hook event and fires a BurntToast notification with a contextual title and message. Three hooks in `~/.claude/settings.json` call the script for `Notification`, `Stop`, and `SubagentStop` events.

**Tech Stack:** PowerShell 5+, BurntToast module, Claude Code hooks system

---

## Chunk 1: Notification Script + Hook Config

### Task 1: Install BurntToast

**Files:**
- No files — one-time PowerShell command

- [ ] **Step 1: Install BurntToast module**

Run in PowerShell (not bash):
```powershell
Install-Module BurntToast -Scope CurrentUser -Force
```
Expected: Module installs without error. If already installed, `-Force` is safe.

- [ ] **Step 2: Verify installation**

```powershell
Get-Module -ListAvailable -Name BurntToast
```
Expected: Output shows BurntToast with a version number.

---

### Task 2: Write notify.ps1

**Files:**
- Create: `C:\Users\cleve\.claude\notify.ps1`

- [ ] **Step 1: Create the notification script**

Write the file at `C:\Users\cleve\.claude\notify.ps1`:

```powershell
# Claude Code Windows Notification Hook
# Reads JSON from stdin, fires a Windows toast via BurntToast.
# Falls back to Windows.Forms balloon if BurntToast is not installed.
#
# One-time setup: Install-Module BurntToast -Scope CurrentUser

param()

# Read JSON payload from stdin
$raw = [Console]::In.ReadToEnd()
$data = $null
try {
    $data = $raw | ConvertFrom-Json
} catch {
    # Malformed JSON — still notify with a generic message
}

# Extract event type and message
$event   = if ($data -and $data.hook_event_name) { $data.hook_event_name } else { "Notification" }
$message = if ($data -and $data.message)          { $data.message }          else { "Claude Code needs your attention." }

# Map event to a human-readable title
$title = switch ($event) {
    "Notification"   { "Claude Code — Action Required" }
    "Stop"           { "Claude Code — Done" }
    "SubagentStop"   { "Claude Code — Agent Done" }
    default          { "Claude Code" }
}

# Fire notification — BurntToast preferred, Windows.Forms as fallback
if (Get-Module -ListAvailable -Name BurntToast -ErrorAction SilentlyContinue) {
    Import-Module BurntToast -ErrorAction SilentlyContinue
    New-BurntToastNotification -Text $title, $message
} else {
    Add-Type -AssemblyName System.Windows.Forms
    $notify                    = New-Object System.Windows.Forms.NotifyIcon
    $notify.Icon               = [System.Drawing.SystemIcons]::Information
    $notify.BalloonTipTitle    = $title
    $notify.BalloonTipText     = $message
    $notify.Visible            = $true
    $notify.ShowBalloonTip(5000)
    Start-Sleep -Seconds 6
    $notify.Dispose()
}
```

- [ ] **Step 2: Smoke-test the script manually**

Run in PowerShell:
```powershell
'{"hook_event_name":"Notification","message":"Permission required: write to settings.json"}' | powershell.exe -NoProfile -WindowStyle Hidden -File C:\Users\cleve\.claude\notify.ps1
```
Expected: A Windows toast notification appears saying "Claude Code — Action Required" with the message body.

- [ ] **Step 3: Test the Stop event**

```powershell
'{"hook_event_name":"Stop","message":"Task complete."}' | powershell.exe -NoProfile -WindowStyle Hidden -File C:\Users\cleve\.claude\notify.ps1
```
Expected: Toast appears titled "Claude Code — Done".

- [ ] **Step 4: Test the fallback (malformed JSON)**

```powershell
'not json at all' | powershell.exe -NoProfile -WindowStyle Hidden -File C:\Users\cleve\.claude\notify.ps1
```
Expected: Toast or balloon appears with the generic fallback message — no PowerShell error window.

- [ ] **Step 5: Test the Windows.Forms fallback path**

Temporarily rename BurntToast to simulate absence, then restore:
```powershell
# Rename to simulate absence
$bt = (Get-Module -ListAvailable BurntToast).ModuleBase
Rename-Item $bt "$bt.bak"

# Fire notification — should use Windows.Forms balloon
'{"hook_event_name":"Notification","message":"Fallback test"}' | powershell.exe -NoProfile -WindowStyle Hidden -File C:\Users\cleve\.claude\notify.ps1

# Restore
Rename-Item "$bt.bak" $bt
```
Expected: A system tray balloon tooltip appears (older style). No error window.

- [ ] **Step 6: Verify stdin works when spawned by Node.js (Claude Code's runtime)**

Claude Code runs on Node.js which spawns PowerShell differently than a terminal pipe. Verify the stdin path works end-to-end:
```powershell
node -e "
const { spawn } = require('child_process');
const ps = spawn('powershell.exe', ['-NoProfile','-NonInteractive','-WindowStyle','Hidden','-File','C:\\\\Users\\\\cleve\\\\.claude\\\\notify.ps1'], { stdio: ['pipe','inherit','inherit'] });
ps.stdin.write(JSON.stringify({hook_event_name:'Stop', message:'Node.js spawn test'}));
ps.stdin.end();
"
```
Expected: A "Claude Code — Done" toast fires. If no toast appears, the stdin encoding may need `[Console]::InputEncoding = [System.Text.Encoding]::UTF8` added to the top of `notify.ps1`.

---

### Task 3: Wire up Claude Code hooks

**Files:**
- Modify: `C:\Users\cleve\.claude\settings.json`

- [ ] **Step 0: Check and set PowerShell execution policy**

Run in PowerShell:
```powershell
Get-ExecutionPolicy -Scope CurrentUser
```
If output is `Restricted` or `Undefined`, run:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Expected: Policy is `RemoteSigned` or `Unrestricted`. Without this, Windows will silently block the script on every hook invocation.

- [ ] **Step 1: Add the hooks section**

Read the current `C:\Users\cleve\.claude\settings.json` first to get the exact existing content, then add the `hooks` key alongside the existing keys. The hook command path uses double-backslashes for JSON escaping. Final file should look like:

```json
{
  "enabledPlugins": { /* preserve existing */ },
  "mcpServers": { /* preserve existing, including PAT */ },
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -NoProfile -NonInteractive -WindowStyle Hidden -File C:\\Users\\cleve\\.claude\\notify.ps1"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -NoProfile -NonInteractive -WindowStyle Hidden -File C:\\Users\\cleve\\.claude\\notify.ps1"
          }
        ]
      }
    ],
    "SubagentStop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -NoProfile -NonInteractive -WindowStyle Hidden -File C:\\Users\\cleve\\.claude\\notify.ps1"
          }
        ]
      }
    ]
  }
}
```

- [ ] **Step 2: Reload Claude Code**

Close and reopen Claude Code (or run `/reload-plugins` if in an active session) so the new hooks are picked up.

- [ ] **Step 3: Trigger a live test**

In a new Claude Code session, type: `what is 2+2` and send it.

Pass criteria:
- Within 3 seconds of Claude's response appearing, a Windows toast notification fires
- Title reads "Claude Code — Done"
- Notification appears in the Windows Action Center (Win+N to verify)

If no toast appears: check Task Manager for `powershell.exe` processes launching briefly after the response — if present, the hook fires but BurntToast may need reimporting. If no powershell.exe at all, the hooks config wasn't picked up — confirm `/reload-plugins` was run.

- [ ] **Step 4: Commit the plan**

Note: Do NOT `git add` `~/.claude/settings.json` — it contains secrets (GitHub PAT) and is outside the repo anyway.

```bash
cd "C:/Users/cleve/Based_Agency/based-agncy_os"
git add docs/superpowers/plans/2026-03-13-windows-claude-notifications.md
git commit -m "docs: add Windows Claude Code notifications implementation plan"
```

---

## Done

After Task 3 Step 3 succeeds, the system is live. No further config needed. If you ever want to silence a hook, remove its entry from the `hooks` section in `settings.json`.
