# Changelog

All notable changes to this project will be documented in this file.

## [1.7.1] - 2026-07-14
### Changed
- **Winner & Final Score Presentation**: Redesigned the center champion block to display the winner's flag at the top, the final score bubble directly below it, and the champion label at the bottom, resolving visual overlap issues.
- **Victory Path Cleanup**: Removed the final score bubble from the final match connector lines to keep the golden victory path clear and visible.
- **Victory Path Gradient Fix**: Added a tiny offset to straight horizontal/vertical paths (such as the final match line) to ensure SVG `linearGradient` works properly and does not disappear or render as grey due to a zero-width/height bounding box.
- **Localisation**: Improved French translation of penalty shootouts by using `t.a.b.` instead of `PEN`.

## [1.7.0] - 2026-07-14
### Added
- **1998 World Cup Integration**: Added full historical knockout stage data for the 1998 World Cup in France.
- **Custom Dropdown Selectors**: Replaced all native `<select>` elements in the header with premium, glassmorphic custom React dropdown selectors:
  - **SeasonSelect**: Displays the year, host countries, flags, and the official tournament mascot in all 5 supported languages.
  - **LanguageSelect**: Displays localized language names with corresponding flag emojis.
  - **TimezoneSelect**: Lists common timezones showing their live local times.
- **Flags and Codes Mapping**: Added missing country flags and 3-letter FIFA abbreviation codes for Romania (`ROU` / `ro`) and FR Yugoslavia (`YUG` / `rs`).
### Changed
- **Bracket Mapping**: Added R16 team pairing definitions and updated `getMatchSlot` in `src/api/sportsdb.ts` to support the 1998 tournament layout.
- **Fetch Integration**: Configured `fetchBracketData` in `src/api/sportsdb.ts` to bypass live requests for 1998 and directly load historical data.

## [1.6.0] - 2026-07-13
### Added
- **2002 World Cup Integration**: Added full historical knockout stage data for the 2002 World Cup in South Korea & Japan.
### Changed
- **Bracket Mapping**: Added R16 team pairing definitions and updated `getMatchSlot` in `src/api/sportsdb.ts` to support the 2002 season structure.
- **Season Selection**: Added "2002" to the season selection dropdown in `src/App.tsx`.
- **Fetch Integration**: Configured `fetchBracketData` in `src/api/sportsdb.ts` to bypass live requests for 2002 and directly load historical data.

## [1.5.0] - 2026-07-12
### Added
- **2006 World Cup Integration**: Added full historical knockout stage data for the 2006 World Cup in Germany.
### Changed
- **Bracket Mapping**: Added R16 team pairing definitions and updated `getMatchSlot` in `src/api/sportsdb.ts` to support the 2006 season structure.
- **Season Selection**: Added "2006" to the season selection dropdown in `src/App.tsx`.

## [1.4.0] - 2026-07-11
### Added
- **2010 World Cup Integration**: Added full historical knockout stage data for the 2010 World Cup in South Africa.
- **Slovakia Flag & Codes**: Added flag icon (ISO "sk") and short code ("SVK") for Slovakia.
### Changed
- **Adaptive Bracket Layout**: Refactored the rings configuration and 16-team layouts to automatically apply to all historical 16-team editions (2022, 2018, 2014, 2010).

## [1.3.0] - 2026-07-11
### Added
- **Historical World Cups Support**: Added option to switch the bracket view between 2026, 2022, and 2018 World Cup data.
### Changed
- **Styling Refactoring**: Extracted inline select element styles to a `.select-btn` class in `src/index.css`.
### Fixed
- **Dropdown Accessibility**: Added visible focus outline style (`:focus-visible`) for select elements to improve keyboard accessibility.

## [1.2.3] - 2026-07-10
### Fixed
- **API Rate Limiting**: Migrated parallel requests to sequential fetches with a 150ms delay and added exponential backoff retry logic. This prevents HTTP 429 and Cloudflare 1015 errors when loading the bracket.
- **Quarter-finals Custom Round Numbers**: Added support for custom round numbers from the database (specifically round `125` for QF, and fallbacks `126` for SF and `127` for the Final). This allows matches like France vs Morocco (2-0) to load and propagate correctly.
- **Penalty Shootout rendering for "AP" matches**: Updated match link state detection to treat the `"AP"` (After Penalties) status code as a penalty shootout, ensuring penalty shootout scores (e.g. `4 - 3 PEN`) are rendered.

## [1.2.2] - 2026-07-03
### Fixed
- **Language Switching**: Decoupled data fetching from the selected language, so switching locales no longer fires redundant API requests or resets the 60s auto-refresh timer.
- **Timezone Selector**: De-duplicated the "Auto" option against the common timezone list, so users in a listed zone (e.g. Europe/Paris) can now see and select it.
- **Refresh Race Condition**: Added a request-id guard so a slow in-flight fetch can no longer overwrite fresher data when refresh and auto-poll overlap.
- **Stable Render Keys**: Bracket nodes and connector links now key on their geometric position instead of array index, preventing flicker and mismatched tooltips when match states reorder between polls.
- **Partial API Failures**: Round fetches now distinguish a genuine network/HTTP failure from a legitimately empty round. A full outage surfaces as an error, and a partial failure shows a "⚠ partial data" warning instead of silently presenting an incomplete bracket as complete.
- **Blank Next-Round Node**: When both feeder teams are known but the next-round fixture isn't yet published by the API (common right after a round finishes), the slot now renders the determined pairing as a split node (both flags + a tooltip) instead of an empty circle.
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
