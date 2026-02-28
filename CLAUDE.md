# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub PR Formatter is a Chrome Extension (Manifest v3) that copies a formatted PR title+link to the clipboard when a user clicks on a GitHub PR title. The user configures the formatting style and enable/disable toggle via the extension popup.

## Development

There is no build system, package manager, or test framework. The extension is pure vanilla JavaScript loaded directly by Chrome.

**To develop:** Load as an unpacked extension at `chrome://extensions/` (Developer mode enabled), then reload the extension after any file changes.

## Architecture

- **`manifest.json`** — Manifest v3 config. Permissions: `storage`, `activeTab`. Content script injected on `*://github.com/*`.
- **`content.js`** — Runs on GitHub pages. Listens for clicks on `.js-issue-title` elements, reads settings from `chrome.storage.sync`, formats the title+URL per the selected style, and copies to clipboard via `navigator.clipboard.writeText()`.
- **`popup.html` / `popup.js` / `popup.css`** — Extension popup UI. Dropdown for format style selection and a toggle switch for enable/disable. Persists settings to `chrome.storage.sync`.
- **`background.js`** — Legacy/unused background script.
- **`options.html` / `options.js`** — Unused options page (not referenced in manifest).

## Formatting Styles

Defined in the `applyStyleToTitle` switch in `content.js`:

| Style | Output |
|-------|--------|
| `slack` | `*[Title](URL)*` |
| `word` | `<a href="URL"><b>Title</b></a>` |
| `notion` | `**[Title](URL)**` |
| `bold` | `*Title*` (no URL) |
| `italic` | `**Title**` (no URL) |

## Key Patterns

- Settings are shared between popup and content script via `chrome.storage.sync` with keys `formatStyle` and `enabled`.
- The content script walks up the DOM from the click target to find an ancestor with class `js-issue-title` (GitHub's PR title element).
