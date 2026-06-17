# PORTFOLIO — DEV MODE MAJOR OVERHAUL + EASTER EGGS
## Comprehensive Implementation for Antigravity IDE

> This document details the FINAL Dev Mode implementation.
> Read every section completely before writing code.
> Implement in the exact order specified.
> Test each section independently before moving to the next.

---

## SECTION 1 — REMOVE FROM DEV MODE

Delete completely:

```
❌ Konami Code / Attack on Titan overlay
❌ Name triple click easter egg
❌ Slash key search bar easter egg
❌ All related code and CSS for above

KEEP ONLY:
✅ Spider web corner click popup (Section 2)
```

---

## SECTION 2 — SPIDER WEB CLICK POPUP (UNCHANGED)

The subtle spider web SVG in hero top-right corner remains.

On click:

Tooltip appears near the web:
- Background: #FDF5C0 (butter cream)
- Border: 1px solid #E9C46A (gold)
- Padding: 1.2rem 1.5rem
- Font: DM Sans, small, #1A1A1A

Text (exact):

```
You found it. Most people don't observe this carefully.
That's exactly the kind of attention to detail I bring.
```

First line: normal weight
Second line: Playfair Display italic or slightly bolder

Small X to close, or auto-close after 6 seconds.

---

## SECTION 3 — MASK PROTOCOL (NEW EASTER EGG #1)

### Global Keydown Listener

Listen globally for typed characters in Dev Mode.

Buffer the last ~15 characters typed.

When buffer contains exact string: "maskon" (case-insensitive)

Execute Mask Protocol sequence.

```
Implementation pattern:
let devBuffer = "";
document.addEventListener("keydown", (e) => {
  if (mode !== "dev") return;
  if (e.key.length === 1) devBuffer += e.key.toLowerCase();
  if (devBuffer.length > 20) devBuffer = devBuffer.slice(-20);
  
  if (devBuffer.includes("maskon")) {
    triggerMaskProtocol();
    devBuffer = ""; // Reset
  }
});
```

### Mask Protocol Sequence

**Phase 1 (0-1000ms):**

Overlay appears on top of entire page.

Content: centered text

Font: JetBrains Mono
Size: 1.2rem
Color: #1A1A1A
Background: semi-transparent #FEFAE0 (butter yellow)

Text:

```
Initializing Mask Protocol...
```

**Phase 2 (1000-2000ms):**

Same overlay, text updates:

```
Synchronizing dimensions...
```

**Phase 3 (2000-2600ms):**

Overlay fades slightly, text:

```
Mask on.
```

**Phase 4 (2600ms):**

Trigger Canon Shift glitch transition (same as floating toggle does)

Then load Hacker Mode immediately after glitch completes.

---

## SECTION 4 — SPIDER SENSE CURSOR (NEW EASTER EGG #2)

### Cursor Enhancement

Custom cursor (already exists) gets enhanced proximity detection.

When cursor approaches interactive easter egg elements:

Show animated jagged bolt lines radiating from cursor position.

### Elements That Trigger Spider Sense

```
- Spider web SVG corner (hero)
- "Honda CB350 · 2024" text (about section)
- Contact buttons (all three)
- Project cards on hover
- "Lore" section title
```

### Visual Effect

Jagged lightning bolt lines:

- Count: 3-4 bolts
- Pattern: radiate outward from cursor in cardinal/diagonal directions
- Color: #E63946 (red-spider accent) OR #FFB300 (amber)
- Thickness: 2px
- Animation: continuous subtle pulse while cursor in proximity

Proximity radius: ~40px from cursor center

### Implementation

```
On mousemove:
- Calculate distance from cursor to each interactive element
- If distance < 40px: show spider sense effect
- If distance > 40px: hide spider sense effect

Use requestAnimationFrame for performance.

Effect rendering: SVG inline or CSS box-shadow radiating pattern

Color preference: #E63946 red (more Spider-Man energy)
Fallback to #FFB300 amber if red too aggressive

Fade in/out: 200ms transition when entering/leaving proximity
```

### Bolt Animation Details

SVG path approach (preferred):

```
Create SVG with 4 lightning bolt paths
radiating from center point (cursor location)
Each bolt: jagged line, 40-60px length
Animate using: 
  - stroke-dasharray for drawing effect
  - opacity for pulsing
  - rotate for directional variety

Continuous loop: 0.8s cycle time
Slight stagger between bolts for organic feel
```

CSS box-shadow approach (if SVG too complex):

```
Multiple box-shadows creating bolt illusion
Glow effect around cursor
Pulsing opacity animation
Less precise but simpler
```

---

## SECTION 5 — CB350 EASTER EGG (NEW EASTER EGG #3)

### Trigger Location

About section, specifically the text:

```
"Honda CB350 · 2024"
```

Make this text element interactive.

On hover over this specific text:

### Animation Sequence

**Phase 1 (0ms):**

Small animated bike 🏍 emoji (or simple SVG bike) appears.

Position: bottom of viewport, left edge

Size: ~40px height

**Phase 2 (0-2500ms):**

Bike smoothly animates from LEFT to RIGHT across screen.

- Start position: left edge, bottom
- End position: right edge, bottom
- Duration: 2.5 seconds
- Easing: linear (constant speed)
- Path: horizontal, bottom 60px of viewport
- Slight vertical bobbing (subtle up/down animation, ±10px)

**Phase 3 (2500ms):**

Bike reaches right edge and fades out.

Disappears completely.

### Technical Details

```
Element: <div class="cb350-bike">

CSS:
position: fixed;
bottom: 60px;
left: -50px; (start off-screen)
font-size: 40px;
z-index: 999;

Animation:
@keyframes rideScreen {
  0% {
    left: -50px;
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); (subtle bob)
  }
  100% {
    left: 100vw;
    opacity: 0;
    transform: translateY(0);
  }
}

animation: rideScreen 2.5s linear forwards;

Content: 🏍 emoji or <svg> bike illustration

On hover of CB350 text:
- Trigger animation
- Can be triggered multiple times
- No cooldown (user can spam it if they want)
```

### Mobile Consideration

On screens < 600px:

Reduce animation duration to 1.8s (faster)

Reduce emoji size to 30px

---

## SECTION 6 — POST CREDITS SEQUENCE (NEW EASTER EGG #4)

### Trigger Conditions

After Contact section, add hidden scrollable space.

When user:
1. Scrolls past Contact section footer completely
2. Stays at bottom for 4+ seconds without scrolling up

Then trigger sequence.

Use IntersectionObserver + setTimeout to detect.

Only trigger ONCE per session.

Store in sessionStorage: `"devPostCreditsSeen"` = true

Check this key before triggering.

### Post Credits Sequence

All text:
- Font: JetBrains Mono
- Size: small (0.85rem)
- Color: #8A7F6B (muted warm grey)
- Text-align: center
- Position: fixed bottom 20px, center screen

### Timeline

```
T+0s:
Display: "wait"
Hold for 2 seconds

T+2s:
Fade out "wait"
Fade in "Canon rejected"
Hold for 1.5 seconds

T+3.5s:
Fade out "Canon rejected"
Fade in "Story still loading"
Hold for 1 second

T+4.5s:
Fade out "Story still loading"
Fade in blinking cursor: "_"
Blink indefinitely
```

### Cursor Blink

```
CSS animation:
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

animation: blink 1s step-end infinite;
```

### Exact Styling

```
Line height: 1.6
Letter spacing: 0.05em
Font weight: 400 (regular)

Fade transition: 300ms ease-in-out

Position: bottom center
- bottom: 20px from viewport bottom
- left: 50%
- transform: translateX(-50%)
- z-index: 50 (below nav, above content)
```

### Implementation

```
const postCreditsShown = sessionStorage.getItem('devPostCreditsSeen');

if (!postCreditsShown) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // User at bottom
        setTimeout(() => {
          // Check if still at bottom after 4 seconds
          if (atViewportBottom()) {
            triggerPostCredits();
            sessionStorage.setItem('devPostCreditsSeen', 'true');
            observer.disconnect();
          }
        }, 4000);
      }
    });
  });
  
  observer.observe(sentinelElement); // Hidden div below footer
}
```

---

## SECTION 7 — SECTION RENAME: ABOUT → LORE

### Rename Locations

**Navigation bar:**
Change "About" link text to "Lore"

**Section label:**
Change "01 / ABOUT" to "01 / LORE"

**Anchor ID:**
Can keep as `id="about"` for backwards compatibility,
but display text shows "LORE"

**Content:**
NO content changes.
Only visual text changes.

This is a branding/narrative choice.
Reinforces the dual-identity story.

---

## SECTION 8 — HERO SECTION WITH ILLUSTRATION

### Layout

Split layout (already implemented):

Left side:
- "Nishchal" heading (Playfair Display, large, bold, italic)
- "Goyal" outline/stroke style
- Tagline: "Behind the IDE, just a student from Jaipur. Behind the terminal, you won't know I was there."
- Bottom-left: vertical rotated text "ECE '27 · SKIT Jaipur · Jaipur, IN"
- Hidden line: `// breaking the canon since 2021`

Right side:
- **Illustration image** (PNG with transparent background)
- Illustration shows: Indian male, red hoodie, typing, laptop with stickers, spider socks, shoes beside, notebook, coffee mug, butter yellow background
- Scale responsively
- Maintain aspect ratio

### Mobile Layout (below 768px)

Stack vertically:
- Heading + tagline on top (full width)
- Illustration below (full width)
- Hidden rotated text moves to side or below

---

## SECTION 9 — CUSTOM CURSOR (CONFIRMATION + FIX)

### Dev Mode Cursor Specification

Inner dot:
- Size: 6px × 6px
- Background: solid #1A1A1A
- Position: snap to mouse instantly

Outer ring:
- Diameter: 28px
- Border: 2px solid #C9A84C (deep gold, not light #E9C46A)
- Fill: none (transparent center)
- Opacity: 0.85 minimum (MUST be visible)
- Position: lerp behind cursor, 12% per frame via requestAnimationFrame

Mix-blend-mode: multiply (ensures visibility on any background)

On hover over clickable elements:
- Ring scales to 48px
- Ring border color switches to #1A1A1A (dark)
- Ring opacity increases to 1.0
- Transition: transform 0.15s ease, border-color 0.1s ease

### Implementation

```
requestAnimationFrame loop:
- Dot: instantly at mouseX, mouseY
- Ring: smoothly lerp toward dot position
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

CSS cursor: none; (hide system cursor)

Ring element: <div class="cursor-ring"></div>
Dot element: <div class="cursor-dot"></div>

Both positioned: fixed, top/left based on computed values
```

---

## SECTION 10 — RESPONSIVENESS (FINAL PASS)

### Full Responsive Testing

Test Dev Mode on:

```
Mobile small:   360px
Mobile standard: 390px
Mobile large:   414px
Tablet small:   768px
Tablet large:   820px
Laptop small:   1024px
Laptop standard: 1280px
Desktop:        1440px+
```

Rules:
- NO overflow scrolling on main viewport
- NO text cutting off
- NO elements overlapping unintended
- Hero illustration scales smoothly
- Touch targets minimum 44px
- Font sizes using clamp()
- Navigation responsive
- Easter eggs work on all sizes

CB350 bike animation:
- Mobile: 1.8s duration, 30px size
- Desktop: 2.5s duration, 40px size

Spider sense cursor:
- Works on all sizes
- Proximity detection scaled for touch (larger radius on mobile)

Post credits:
- Readable on all sizes
- Bottom positioning accounts for mobile browsers

---

## SECTION 11 — IMPLEMENTATION PRIORITY ORDER

Do in this exact order:

```
1. Remove Konami Code, name triple click, slash search
2. Keep spider web click popup (no changes)
3. Add Mask Protocol (global keydown listener + sequence)
4. Add Spider Sense Cursor (proximity detection + visual effect)
5. Add CB350 Easter Egg (hover animation)
6. Add Post Credits (IntersectionObserver + sequence)
7. Rename About → Lore (text changes only)
8. Confirm custom cursor styling (fix visibility)
9. Full responsive pass (test all breakpoints)
10. Deploy and test live
```

---

## SECTION 12 — TESTING CHECKLIST

After implementation, verify:

```
MASK PROTOCOL:
☐ Type "maskon" anywhere in Dev Mode
☐ Sequence triggers correctly
☐ "Initializing Mask Protocol..." appears
☐ "Synchronizing dimensions..." appears
☐ "Mask on." appears
☐ Canon Shift glitch fires
☐ Hacker Mode loads
☐ No console errors

SPIDER SENSE CURSOR:
☐ Cursor visible on butter yellow background
☐ Spider sense bolts appear near spider web
☐ Spider sense bolts appear near CB350 text
☐ Spider sense bolts appear near contact buttons
☐ Spider sense bolts appear near project cards
☐ Smooth fade in/out on proximity
☐ No performance lag
☐ Works on mobile touch

CB350 EASTER EGG:
☐ Hover over "Honda CB350 · 2024"
☐ Bike appears at bottom left
☐ Bike moves left to right smoothly
☐ Takes ~2.5s to cross screen
☐ Bike bobs up/down slightly
☐ Bike fades out at right edge
☐ Can trigger multiple times
☐ Bike animation smooth on mobile (1.8s)

POST CREDITS:
☐ Scroll past Contact footer
☐ Wait 4+ seconds at bottom
☐ "wait" appears
☐ 2 second hold
☐ "Canon rejected" appears
☐ 1.5 second hold
☐ "Story still loading" appears
☐ 1 second hold
☐ Blinking cursor appears
☐ Cursor blinks indefinitely
☐ Only triggers once per session
☐ sessionStorage key set correctly
☐ Refresh page — post credits don't re-trigger

LORE RENAME:
☐ Nav bar shows "Lore"
☐ Section label shows "01 / LORE"
☐ Content unchanged
☐ Links still work

CUSTOM CURSOR:
☐ Dot visible at all times
☐ Ring visible on butter yellow (NOT blending in)
☐ Ring color is #C9A84C (deep gold)
☐ Ring has mix-blend-mode: multiply
☐ Ring lerps smoothly behind dot
☐ On hover, ring scales to 48px
☐ On hover, ring color switches to #1A1A1A

RESPONSIVENESS:
☐ Test on 360px (mobile small)
☐ Test on 390px (iPhone standard)
☐ Test on 768px (tablet)
☐ Test on 1024px (laptop)
☐ Test on 1440px (desktop)
☐ NO overflow scrolling
☐ Hero illustration scales correctly
☐ CB350 animation duration adjusts (1.8s mobile, 2.5s desktop)
☐ All text readable
☐ Touch targets 44px minimum
```

---

## SECTION 13 — EDGE CASES & SPECIAL HANDLING

```
MASK PROTOCOL:
- User types "maskon" as part of normal text
  → Still triggers (this is intentional easter egg behavior)
- User types in multiple sessions
  → Works every time (no "one-time only" limitation)
- User is in Hacker Mode and somehow types "maskon"
  → Ignore (only works in Dev Mode)

SPIDER SENSE:
- User moves mouse very fast
  → Spider sense should still detect (use continuous checking)
- Element is hidden/off-screen
  → Don't trigger spider sense
- Multiple elements nearby
  → Show spider sense for closest one, or all simultaneously

CB350:
- User hovers rapidly
  → Allow multiple animations simultaneously
  → Each hover triggers new bike run
- Mobile touch
  → Treat touch as hover (on :active or :focus)

POST CREDITS:
- User scrolls to bottom, waits 4s, then scrolls up, scrolls back down
  → Post credits already shown, don't re-trigger
  → sessionStorage prevents re-trigger
- User at bottom on page load
  → Start 4s timer immediately
- User with very slow connection
  → Post credits still work (no async dependencies)
```

---

## SECTION 14 — FINAL DESIGN NOTES

### Vibe & Feel

Dev Mode ecosystem should feel:
- Polished and premium
- Playful but not silly
- Story-driven (all easter eggs tie to dual identity narrative)
- Rewarding (discovering easter eggs feels earned)
- Smooth transitions (everything should feel intentional)

### Narrative Consistency

Every easter egg reinforces the "Canon Breaker" theme:

- "maskon" → literally activating alternate identity
- Spider Sense → Spider-Man reference, fitting the site's metaphor
- CB350 → personal detail (Indian, Jaipur context)
- Post Credits → "Canon rejected" + "Story still loading" = Nishchal writing his own narrative
- Lore rename → from generic "About" to narrative-driven "Lore"

### No Clutter

Do NOT add:
- Excessive animations
- Distracting visual effects
- Confusing UI elements
- Redundant easter eggs

Everything serves a purpose.

---

## SECTION 15 — FINAL IMPLEMENTATION NOTES

This is the FINAL Dev Mode configuration.

No further major changes after this implementation.

Focus on execution quality, not feature quantity.

Each element should feel intentional, not random.

Test thoroughly on real devices.

Deploy with confidence.

---

*End of Dev Mode Overhaul Prompt.*
*Implement everything as specified.*
*No shortcuts. No simplifications.*
*Nishchal's Dev Mode is now complete.*
