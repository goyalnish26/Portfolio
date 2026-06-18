# Technical Requirement Document (TRD)
## Project Name: Nishchal Goyal Personal Portfolio Website (v3.3)
**Author**: Antigravity AI  
**Status**: Completed & Deployed  
**Stack**: React (Vite) · HTML5 · Vanilla CSS (Inline Style Injection)

---

## 1. System Architecture & Setup
The portfolio is implemented as a single-page React application compiled using Vite. To allow hot-swapping themes and complex dynamic behaviors without external asset requests, all styling parameters are contained in a CSS-in-JS style injection block (`CustomStyles`) parsing native CSS variables.

---

## 2. Key State Hook Schema & Variables

```javascript
// Mode State
const [mode, setMode] = useState('entry'); // 'entry', 'dev', 'hacker'
const [transitioning, setTransitioning] = useState(false); // Glitch shift overlay block
const [entryExpandingSide, setEntryExpandingSide] = useState(null); // 'dev' | 'hacker' expansion

// Terminal Inputs & Cursor
const [hackerInput, setHackerInput] = useState('');
const [hackerHistory, setHackerHistory] = useState([{ command: null, output: ReactNode }]);
const [historyIndex, setHistoryIndex] = useState(-1); // Back/forward commands array index pointer
const [cursorPos, setCursorPos] = useState(0); // Caret index within hackerInput string

// Easter Eggs & Alerts
const [spiderSenseNear, setSpiderSenseNear] = useState(false); // Active cursor proximity trigger
const [maskProtocolState, setMaskProtocolState] = useState(null); // null | 'init' | 'sync' | 'ready'
const isMaskProtocolRunning = useRef(false); // Ref-based concurrency guard preventing transition duplication
const [bikeRides, setBikeRides] = useState([]); // Running array of motorcycle instances
const [devPostCreditsState, setDevPostCreditsState] = useState(null); // null | 'wait' | 'rejected' | 'loading' | 'cursor'
```

---

## 3. Core Technical Implementations

### 3.1. Cursor Position Lerping & Proximity Detection
- **Dot Snap**: The cursor dot follows the exact window mouse position instantly on `mousemove`.
- **Ring Interpolation (Lerp)**: To create a delayed fluid drag effect, the outer ring coordinates are updated inside a `requestAnimationFrame` animation loop:
  $$\text{ringX} \leftarrow \text{ringX} + (\text{mouseX} - \text{ringX}) \times 0.12$$
  $$\text{ringY} \leftarrow \text{ringY} + (\text{mouseY} - \text{ringY}) \times 0.12$$
- **Proximity Math**: Calculates the distance from the cursor coordinates to all elements tagged with `.spider-sense-trigger` via `getBoundingClientRect()`. If the computed minimum distance is less than 40px (or 60px on mobile), `spiderSenseNear` is set to `true`, rendering the SVG warning waves inside the cursor ring.

### 3.2. Inline Caret Character Slicing
To support cursor repositioning using Left/Right arrows and inserting text anywhere within a word, the string in the command console input row is split into three parts based on the caret index state `cursorPos`:
1. **Pre-Caret Text**: `{hackerInput.slice(0, cursorPos)}`
2. **Caret Character**: `{cursorPos < hackerInput.length ? hackerInput[cursorPos] : ' '}` (rendered inside `span.terminal-cursor-block`)
3. **Post-Caret Text**: `{hackerInput.slice(cursorPos + 1)}`

A hidden native `<input>` overlays the spans with `opacity: 0`. The React component updates the `cursorPos` state by querying `e.target.selectionStart` across five interaction hooks:
* `onChange`: Tracks typing and deletes.
* `onKeyDown` (wrapped in a `setTimeout` of 0ms): Captures cursor movements from arrow keys.
* `onClick`: Updates index when clicking letters.
* `onKeyUp` & `onFocus`: Syncs caret indices.

### 3.3. Command History Traversal
The ArrowUp and ArrowDown event handlers read the command history array recursively using a state-tracked pointer `historyIndex`:
- **ArrowUp**: 
  - If `historyIndex === -1`: sets index to `historyCmds.length - 1` and populates input.
  - If `historyIndex > 0`: decrements index by 1 and updates input.
- **ArrowDown**:
  - If `historyIndex < historyCmds.length - 1`: increments index by 1.
  - If `historyIndex === historyCmds.length - 1`: resets index to `-1` and clears input.
- **Enter**: Submits the command, appends to logs, sets `historyIndex` to `-1`, and sets `cursorPos` to `0`.

---

## 4. Persistent Scoped Theme Definitions
All themes map variables inside `.hacker-portfolio-wrapper.theme-[name]` selector blocks:

| Theme Name | Background (`--hacker-bg`) | Primary Text (`--hacker-text-primary`) | Accent Color (`--hacker-accent`) |
| :--- | :--- | :--- | :--- |
| **light** | `#FEFAE0` | `#1A1A1A` | `#E9C46A` |
| **dark** | `#0D0D0D` | `#C0C0C0` | `#C0C0C0` |
| **peter** | `#0A0A0A` | `#FF0000` | `#0066FF` (blue accent / borders / highlights) |
| **miles** | `#0A0A0A` | `#B833FF` | `#FF3D3D` |
| **noir** | `#000000` | `#FFFFFF` | `#FFFFFF` |
| **2099** | `#0A0A2E` | `#00D9FF` | `#00D9FF` |
| **kali** | `#1A1A2E` | `#33FF00` | `#6B00B0` |

---

## 5. Visual Rendering Tricks
- **Background Blending**: The hero graphic uses CSS `mix-blend-mode: multiply` on the image parent to mask out the image's off-white bounding box, blending it smoothly with the `#FEFAE0` page background.
- **CRT Scanline Filter**: Eulated via repeating gradients overlaid on screen height:
  ```css
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
              linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 4px, 6px 100%;
  ```
