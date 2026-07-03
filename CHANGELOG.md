# Changelog

All notable changes to this project will be documented in this file.

## [1.2.2] - 2026-07-03
### Fixed
- **Language Switching**: Decoupled data fetching from the selected language, so switching locales no longer fires redundant API requests or resets the 60s auto-refresh timer.
- **Timezone Selector**: De-duplicated the "Auto" option against the common timezone list, so users in a listed zone (e.g. Europe/Paris) can now see and select it.
- **Refresh Race Condition**: Added a request-id guard so a slow in-flight fetch can no longer overwrite fresher data when refresh and auto-poll overlap.
- **Stable Render Keys**: Bracket nodes and connector links now key on their geometric position instead of array index, preventing flicker and mismatched tooltips when match states reorder between polls.
- **Partial API Failures**: Round fetches now distinguish a genuine network/HTTP failure from a legitimately empty round. A full outage surfaces as an error, and a partial failure shows a "⚠ partial data" warning instead of silently presenting an incomplete bracket as complete.
### Security
- **Analytics Injection**: The inline Google Analytics snippet now uses `textContent` and JSON-encodes the tracking id instead of building script markup via `innerHTML`.
### Changed
- **API Key Configuration**: The TheSportsDB API key is now configurable via the `VITE_SPORTSDB_KEY` environment variable (falls back to the public test key).
### Removed
- **Dead Code**: Removed the unused `.rtl` CSS class hook and the unused `jimp` dependency.

## [1.2.1] - 2026-07-03
### Fixed
- **Live Match Rendering**: Fixed a bug where live matches (e.g. status `1H`/`2H`) were misclassified as finished, resulting in blank match nodes.
- **Layout Overlap**: Adjusted layout to shift match date/time below the live score badge when a match is live, preventing overlap.

## [1.2.0] - 2026-07-02
### Added
- **Multi-Language Support**:
  - Full translations for English (`en`), French (`fr`), Arabic (`ar`), Spanish (`es`), and Portuguese (`pt`).
  - Styled dropdown selector in the header for manual language switching.
  - Automatic browser language detection on initialization.
- **RTL Layout Support**:
  - Fully compatible with `dir="rtl"` for Arabic, ensuring proper text alignment and readability.
- **Localized Content**:
  - Dynamically translated match dates (e.g. "July 4" -> "4 juil." -> "٤ يوليو"), round labels, status text, and tooltips.

## [1.1.0] - 2026-07-02
### Added
- **Match Details Enhancement**:
  - Added support for Penalty Shootout scores (`PEN`) rendered elegantly under match results.
  - Added rich native Tooltips showing Goalscorers and Extra Time details on hover.
  - Replaced center trophy emoji with a hyper-realistic, glowing 3D World Cup trophy asset.
- **Branding & SEO**:
  - Updated the application favicon to use the new 3D World Cup trophy icon.
  - Improved browser tab title to "World Cup 2026 Bracket" for better clarity.

## [1.0.0] - 2026-07-02
### Added
- **World Cup 2026 Bracket App**: Initial complete release.
- **Tech Stack**: Built with React, TypeScript, and Vite.
- **Dynamic Tree Design**:
  - Radial orthogonal connections ("T-shapes" and arcs).
  - Perfect symmetry and mathematical layout.
  - Split-flag nodes for head-to-head matches.
- **Live Match Support**:
  - Red pulsing highlights for live matches.
  - Rounded red score badge for live updates.
- **Timezone Auto-detection**:
  - Top navigation bar includes a timezone selector.
  - Automatically detects and displays match times in the user's local timezone.
- **Advanced SVG Rendering**:
  - Curved round labels that perfectly nestle in the top gap.
  - T-junction score badges for completed matches.
  - Glow filters and premium UI styling (glassmorphism, dark mode).
