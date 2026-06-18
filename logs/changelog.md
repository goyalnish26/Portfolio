# Changelog: Nishchal Goyal Portfolio Website
All notable changes to this project are documented below.

---

## [v3.4] — 2026-06-19 (Latest Release)
### Added
- **Space Grotesk Font**: Integrated the Space Grotesk font into Google Fonts imports for a bold, geometric, tech-confident developer name styling.
- **Favicon Integration**: Added `hero.png` as the website favicon, replacing the purple lightning SVG symbol.
- **Clickable Header Logo**: Logo `NG.` is now clickable with a smooth hover transition, scrolling the page smoothly to the top.
- **Ref-Based Concurrency Guard**: Added `isMaskProtocolRunning` ref to prevent state updates from overlapping or double-triggering when typing `maskon` or clicking toggles.
- **Split Quote Layout**: Split the Miles Morales footer quote across two lines with proper right alignment on desktop and center alignment on mobile.
- **Spider-Man suit colors in Peter Theme**: Refactored the `peter` hacker theme to feature a dynamic red (`#FF0000`) and blue (`#0066FF`) suit-themed color interplay.
### Changed
- **Immediate maskoff sequence**: The `maskoff` command now exits immediately to Developer mode, bypassing any terminal print logs/history updates.
- **Non-Wrapping Hero Name**: Added `white-space: nowrap` and `max-width: 600px` to "Nishchal" and "Goyal" to prevent layout breaking or wrapping on zoom levels from 75% to 200% across all viewports.
- **Hero Image Transparency**: Removed the gray-and-white checkered background pattern from both the outer borders and the enclosed gaps (mug handle, shoe laces) of the newly uploaded `hero.png` illustration.

---

## [v3.3] — 2026-06-17
### Added
- **Inline Caret Navigation**: Added Left/Right arrow key movement inside terminal mode, slicing strings to allow inserting and deleting characters in the middle of words.
- **Concentric Caret Inversion**: Block cursor now inverts the character it is hovering over by switching color variables (`color: var(--hacker-bg)`) inside the background block container.
- **Recursive Terminal History**: Upgraded terminal commands input to support traversing history arrays back and forth using `ArrowUp` and `ArrowDown` keys via a bound-checked state pointer.
- **Greeting Subtitle Slogans**: Added dual narrative subtitles below the terminal prompt: *"building systems by day / breaking them by night"*.
- **'hero' Command**: Implemented a command that reprints the full ASCII greeting splash panel directly in active terminal log scrolls.
- **Spider Hood Art**: Integrated the Spider Hood illustration on the greeting screen, adding a subtle chest spider design (`/ Y \` and `\ / \ /`).
### Changed
- **Themes Output Formatting**: Condensed the output of `themes` to display names in a single space-separated line, removing descriptive text to encourage exploration.

---

## [v3.2] — 2026-06-17
### Added
- **Multiply Image Blending**: Repositioned the right-column hero illustration absolutely to the edge (`position: absolute; right: 0; top: 50%`) and applied `mix-blend-mode: multiply` to mask its off-white bounding background.
- **Smooth Image Zoom**: Added transition properties triggering a scale zoom (`transform: scale(1.05)`) when hovering over the hero illustration.
- **Reordered Experience Section**: Rearranged the timeline order to place Dreamsoft4u at the top, True Value in the middle (with description details), and AIESEC at the bottom.
### Changed
- **Staggered Overlapping Cards**: Set project widths to 70%, 65%, and 65%, adding negative vertical margins (`margin-top: -6rem`) to create overlapping layout cascades.
- **Featured Deloitte Certificate**: Converted the Deloitte Cyber Simulation card into a featured card with a red outline (`cert-card-featured`) and red verification badge (`cert-verified-red`), matching the Google cert layout.
- **Cert Spacing Pass**: Shrunk cert card paddings to `1.25rem 1.5rem` and flex gaps to `4px`.
- **Targeted Spider-Sense**: Restricted proximity warning alerts strictly to the spider web SVG and CB350 text.
- **Reversed Bike Path**: Reversed the `rideScreen` keyframes to trigger from right to left, matching the left-facing direction of the `🏍️` emoji.

---

## [v3.1] — 2026-06-16
### Added
- **Block Name ASCII**: Implemented a large block-letter ASCII art header for "NISHCHAL" in the terminal greeting.
- **Cybersecurity Rating Polish**: Lowered cybersecurity skill score percentages in the Dark Panel insert (e.g. Network Security to 72%, SIEM to 65%) to reflect realistic, honest competency ratings.

---

## [v3.0] — 2026-06-16
### Removed
- **Web-Terminal Wrapping**: Scrapped all web-style layout grids, scrolling cards, and timelines from Hacker Mode.
### Added
- **Command-Line Interface**: Rebuilt Hacker Mode from scratch into a pure text-based UNIX console interface.
- **Standard Command Set**: Implemented arguments parser supporting: `whoami`, `about`, `skills` (abbreviation `s`), `projects` (`p`), `project <name>`, `experience`, `certs`, `journey`, `contact` (`c`).
- **Narrative Command Set**: Added narrative modules: `canon`, `lore`, `origin`, `reality`, `watcher`, `masks`, `nexus`, `bike`, and random outcomes generator `coffee`.
- **Theme Color Persistence**: Integrated local storage tracking (`hackerModeTheme`) to load and swap 7 themes (`light`, `dark`, `peter`, `miles`, `noir`, `2099`, `kali`).
- **Visual Glitch**: Created `glitch` screen flicker commands and standard sequenced timeouts for exit `maskoff` scripts.

---

## [v2.1] — 2026-06-15
### Added
- **Maskon Key Buffer**: Implemented a global keydown buffer listening for the string "maskon" to trigger the overlay dimension synchronization transition.
- **Spider-Sense Cursor Proximity**: Configured SVG lightning bolts to draw and pulse around the custom cursor ring when entering the boundaries of easter egg target points.
- **IntersectionObserver Credits**: Configured a bottom credit sequence observer at the bottom footer that fires after a 4-second scroll delay.
- **Lore Rename**: Renamed "About" to "Lore" across navigation menus and anchors.

---

## [v2.0] — 2026-06-15
### Changed
- **Developer Mode Refactor**: Re-designed the layout into an asymmetric, warm magazine Gwen Stacy aesthetic (`#FEFAE0` background) using Playfair Display typography.
- **Interactive Spider Web Corner**: Added a spider web graphic trigger with custom cream-colored tooltips.
- **Interactive Toggle buttons**: Added the floatingToggle button to swap modes.

---

## [v1.0] — 2026-06-14
### Added
- **Initial Release**: Setup repository, added basic developer resume columns, links, contact forms, and basic CSS styling sheets.
