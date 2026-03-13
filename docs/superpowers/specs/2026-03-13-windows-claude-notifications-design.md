# Windows Claude Code Notifications Design

**Date:** 2026-03-13
**Status:** Approved

## Overview

A lightweight Windows notification system for Claude Code that mirrors the macOS masco tool. Fires native Windows toast notifications when Claude needs attention, finishes a task, or an agent completes — so you never miss a permission prompt or miss that a long task finished.

## Architecture

Two files, no external services:

1. **`~/.claude/notify.ps1`** — PowerShell notification script
2. **`~/.claude/settings.json`** — Claude Code hooks configuration (append to existing)

## notify.ps1

- Reads the JSON payload Claude Code pipes via stdin on each hook event
- Extracts `hook_event_name` and `message` fields
- Maps events to notification titles:
  - `Notification` → "Claude Code — Action Required"
  - `Stop` → "Claude Code — Done"
  - `SubagentStop` → "Claude Code — Agent Done"
- Fires `New-BurntToastNotification` with title + message body
- Falls back gracefully to `Windows.Forms` balloon tooltip if BurntToast is not installed (never silently fails)
- Runs hidden (`-WindowStyle Hidden`) so no PowerShell window flashes

## hooks (settings.json)

Three hooks, all pointing to the same script:

| Hook | Trigger |
|------|---------|
| `Notification` | Permission prompts, idle timeout, any time Claude needs the user |
| `Stop` | Claude finishes responding / completes a task |
| `SubagentStop` | A background subagent finishes |

## Setup

One-time prerequisite (run once in PowerShell):
```powershell
Install-Module BurntToast -Scope CurrentUser
```

No other dependencies. Everything else is built into Windows/PowerShell.

## Files Changed

| File | Action |
|------|--------|
| `~/.claude/notify.ps1` | Create |
| `~/.claude/settings.json` | Append `hooks` section |
