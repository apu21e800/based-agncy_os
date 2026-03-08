#!/usr/bin/env bash
# HUBSS Cowork Setup
# Run once after cloning to create all expected folders and copy the env template.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Setting up HUBSS cowork folder structure at: $ROOT"

# Content directories
mkdir -p "$ROOT/content/blog/drafts"

# Public asset directories
mkdir -p "$ROOT/public/images/products"
mkdir -p "$ROOT/public/images/projects"
mkdir -p "$ROOT/public/images/about"
mkdir -p "$ROOT/public/images/blog"
mkdir -p "$ROOT/public/docs"

# Scripts directory
mkdir -p "$ROOT/scripts"

# Copy env template if .env.local doesn't exist
if [ ! -f "$ROOT/.env.local" ]; then
  cp "$ROOT/.env.local.example" "$ROOT/.env.local"
  echo ""
  echo "  Created .env.local from template."
  echo "  Open it and fill in:"
  echo "    RESEND_API_KEY    — from resend.com"
  echo "    ANTHROPIC_API_KEY — from console.anthropic.com"
  echo "    ADMIN_PASSWORD    — any strong password"
  echo ""
else
  echo "  .env.local already exists — skipped copy."
fi

echo ""
echo "Done. Folder structure:"
echo ""
echo "  content/blog/          ← published MDX posts"
echo "  content/blog/drafts/   ← AI-generated drafts"
echo "  public/images/products/ ← product hero photos"
echo "  public/images/projects/ ← project hero photos"
echo "  public/images/about/    ← team + office photos"
echo "  public/images/blog/     ← blog cover images"
echo "  public/docs/            ← PDF spec sheets"
echo ""
echo "See COWORK_INTEGRATIONS.md for the full workflow guide."
