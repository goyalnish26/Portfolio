import { useState, useEffect, useRef, useCallback } from 'react';
import { inject, track } from '@vercel/analytics';

// Import CSS Stylesheets
import './styles/global.css';
import './styles/Entry.css';
import './styles/DevMode.css';
import './styles/HackerMode.css';

// Import Custom Hooks
import { useCustomCursor } from './hooks/useCustomCursor';

// Import Components
import CustomCursor from './components/common/CustomCursor';
import GlitchTransition from './components/common/GlitchTransition';
import EntryScreen from './components/entry/EntryScreen';
import DevMode from './components/dev/DevMode';
import HackerTerminal from './components/hacker/HackerTerminal';

// Import Constants & Utilities
import {
  HELP_TEXT,
  WHOAMI_TEXT,
  ABOUT_TEXT,
  SKILLS_TEXT,
  PROJECTS_TEXT,
  EXPERIENCE_TEXT,
  CERTS_TEXT,
  JOURNEY_TEXT,
  CONTACT_TEXT_JSX,
  CANON_TEXT,
  LORE_TEXT,
  ORIGIN_TEXT,
  REALITY_TEXT,
  WATCHER_TEXT,
  MASKS_TEXT,
  NEXUS_TEXT,
  BIKE_TEXT,
  MILES_TEXT,
  PETER_TEXT,
  THEMES_TEXT,
  COFFEE_TEXTS,
  getGreetingOutput
} from './config/portfolioData';

const TerminalText = ({ children }) => (
  <pre className="terminal-output-text">{children}</pre>
);

function App() {
  const [mode, setMode] = useState('entry'); // 'entry', 'dev', 'hacker'
  const [transitioning, setTransitioning] = useState(false);
  const [entryExpandingSide, setEntryExpandingSide] = useState(null); // 'dev' or 'hacker'

  // Developer Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Hacker Mode state variables & refs
  const [hackerState, setHackerState] = useState('terminal'); // starts directly in terminal
  const [hackerInput, setHackerInput] = useState('');
  const [hackerHistory, setHackerHistory] = useState([
    { command: null, output: getGreetingOutput() }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorPos, setCursorPos] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hackerTheme, setHackerTheme] = useState(() => {
    return localStorage.getItem('hackerModeTheme') || 'dark';
  });
  const [canonRejectedActive, setCanonRejectedActive] = useState(false);
  const [exitingTerminal, setExitingTerminal] = useState(false);
  const [tabSuggestions, setTabSuggestions] = useState([]);
  const [unmaskProtocolState, setUnmaskProtocolState] = useState(null); // null, 'exit', 'sync', 'off'

  const terminalInputRef = useRef(null);
  const terminalHistoryRef = useRef(null);

  // Navbar blur background state
  const [scrolled, setScrolled] = useState(false);

  // Custom cursor hook
  const { cursorDotRef, cursorRingRef, isTouchDevice } = useCustomCursor();

  // === DEV MODE EASTER EGG STATES ===
  const [spiderWebTooltip, setSpiderWebTooltip] = useState(false);
  const [maskProtocolState, setMaskProtocolState] = useState(null); // null, 'init', 'sync', 'ready'
  const [bikeRides, setBikeRides] = useState([]);
  const [devPostCreditsState, setDevPostCreditsState] = useState(null); // null, 'wait', 'rejected', 'loading', 'cursor'
  const [spiderSenseNear, setSpiderSenseNear] = useState(false);
  const devPostCreditsSentinelRef = useRef(null);

  // Smooth expand transition for entry screen
  const entryTransition = useCallback((targetMode) => {
    if (entryExpandingSide) return;
    setEntryExpandingSide(targetMode);
    track('Entry Choice Selected', { selection: targetMode });

    // After expand animation completes (700ms), switch mode
    setTimeout(() => {
      setMode(targetMode);
      setEntryExpandingSide(null);
      if (targetMode === 'hacker') {
        setHackerState('terminal');
        setHackerInput('');
        setCursorPos(0);
        setHistoryIndex(-1);
        setHackerHistory([{ command: null, output: getGreetingOutput() }]);
        setCanonRejectedActive(false);
        setExitingTerminal(false);
      }
    }, 700);
  }, [entryExpandingSide]);

  // Canon Shift glitch transition — ONLY for switching between dev <-> hacker
  const triggerTransition = useCallback((targetMode) => {
    if (transitioning) return;
    setTransitioning(true);
    track('Transition Started', { to: targetMode });

    // Switch underlying content at the visual peak (400ms)
    setTimeout(() => {
      setMode(targetMode);
      if (targetMode === 'hacker') {
        setHackerState('terminal');
        setHackerInput('');
        setCursorPos(0);
        setHistoryIndex(-1);
        setHackerHistory([{ command: null, output: getGreetingOutput() }]);
        setCanonRejectedActive(false);
        setExitingTerminal(false);
      } else if (targetMode === 'dev') {
        isMaskProtocolRunning.current = false;
      }
    }, 400);

    // Complete transition (800ms)
    setTimeout(() => {
      setTransitioning(false);
    }, 800);
  }, [transitioning]);

  const triggerMaskProtocol = useCallback(() => {
    if (isMaskProtocolRunning.current) return;
    // eslint-disable-next-line react-hooks/immutability
    isMaskProtocolRunning.current = true;
    setMaskProtocolState('init');
    track('Mask Protocol Started');
    
    setTimeout(() => {
      setMaskProtocolState('sync');
    }, 1000);
    setTimeout(() => {
      setMaskProtocolState('ready');
    }, 2000);
    setTimeout(() => {
      triggerTransition('hacker');
      setTimeout(() => {
        setMaskProtocolState(null);
        isMaskProtocolRunning.current = false;
      }, 1000);
    }, 2600);
  }, [triggerTransition]);

  const triggerBikeRide = () => {
    const newRide = { id: Date.now() + Math.random() };
    setBikeRides(prev => [...prev, newRide]);
    track('Bike Ride Triggered');
  };

  // Dev mode keydown buffer for "maskon"
  const devKeyBuffer = useRef('');
  const isMaskProtocolRunning = useRef(false);
  useEffect(() => {
    if (mode !== 'dev') return;
    const handleDevKeyDown = (e) => {
      if (e.target.closest('input, textarea')) return;
      if (e.key.length === 1) {
        devKeyBuffer.current = (devKeyBuffer.current + e.key.toLowerCase()).slice(-10);
        if (devKeyBuffer.current.endsWith('maskon')) {
          triggerMaskProtocol();
          devKeyBuffer.current = '';
        }
      }
    };
    window.addEventListener('keydown', handleDevKeyDown);
    return () => window.removeEventListener('keydown', handleDevKeyDown);
  }, [mode, triggerMaskProtocol]);

  // Dev post-credits observer with 4s delay and state transitions
  const isSentinelIntersecting = useRef(false);
  const postCreditsTimer = useRef(null);

  useEffect(() => {
    if (mode !== 'dev' || !devPostCreditsSentinelRef.current) return;
    if (sessionStorage.getItem('devPostCreditsSeen')) return;

    const observer = new IntersectionObserver(([entry]) => {
      isSentinelIntersecting.current = entry.isIntersecting;

      if (entry.isIntersecting) {
        if (postCreditsTimer.current) clearTimeout(postCreditsTimer.current);

        postCreditsTimer.current = setTimeout(() => {
          if (isSentinelIntersecting.current) {
            sessionStorage.setItem('devPostCreditsSeen', 'true');
            setDevPostCreditsState('wait');
            track('Dev Post Credits Triggered');

            setTimeout(() => {
              setDevPostCreditsState('rejected');
            }, 2000);

            setTimeout(() => {
              setDevPostCreditsState('loading');
            }, 3500);

            setTimeout(() => {
              setDevPostCreditsState('cursor');
            }, 4500);
          }
        }, 4000);
      } else {
        if (postCreditsTimer.current) {
          clearTimeout(postCreditsTimer.current);
          postCreditsTimer.current = null;
        }
      }
    }, { threshold: 0.1 });

    observer.observe(devPostCreditsSentinelRef.current);
    return () => {
      observer.disconnect();
      if (postCreditsTimer.current) clearTimeout(postCreditsTimer.current);
    };
  }, [mode]);

  // Initialize Vercel Analytics
  useEffect(() => {
    inject();
  }, []);

  // Sync Titles and Meta Tags dynamically for SEO
  useEffect(() => {
    if (mode === 'dev') {
      document.title = "Nishchal Goyal | Backend Developer";
      document.querySelector('meta[name="description"]')?.setAttribute("content", "Nishchal Goyal - Final-year ECE student at SKIT Jaipur. Backend developer building production systems with Python, FastAPI, Flask, and Odoo ERP.");
    } else if (mode === 'hacker') {
      document.title = "nishchal@canon-breaker:~$";
      document.querySelector('meta[name="description"]')?.setAttribute("content", "Nishchal OS v2.1.0. Offensive security research environment. CVE tracking, Bandit, TryHackMe, and SIEM modules.");
    } else {
      document.title = "Nishchal Goyal | Developer & Security Researcher";
      document.querySelector('meta[name="description"]')?.setAttribute("content", "Nishchal Goyal - Final-year ECE student at SKIT Jaipur. Dual-identity portfolio featuring a warm magazine developer log and a retro phosphor terminal security environment.");
    }
  }, [mode]);

  // Keyboard input for selection
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // Mode entry choice — smooth expand (no glitch)
      if (mode === 'entry' && !entryExpandingSide) {
        if (key === 'd') {
          entryTransition('dev');
        } else if (key === 'h') {
          entryTransition('hacker');
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [mode, entryExpandingSide, entryTransition]);

  // Navbar scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Performance-Optimized Spider-Sense Proximity Detection Cache
  const triggerRects = useRef([]);

  const updateTriggerRects = useCallback(() => {
    if (mode !== 'dev') {
      triggerRects.current = [];
      return;
    }
    const elements = document.querySelectorAll('.spider-sense-trigger');
    const rects = [];
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      rects.push({
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY
      });
    });
    triggerRects.current = rects;
  }, [mode]);

  // Update layout bounding cache on load, resize, and scroll
  useEffect(() => {
    if (mode === 'dev') {
      const timer = setTimeout(updateTriggerRects, 200);
      window.addEventListener('resize', updateTriggerRects);
      window.addEventListener('scroll', updateTriggerRects, { passive: true });
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateTriggerRects);
        window.removeEventListener('scroll', updateTriggerRects);
      };
    }
  }, [mode, updateTriggerRects]);

  // Proximity handler using cached offsets
  useEffect(() => {
    if (isTouchDevice || mode !== 'dev') {
      return;
    }

    const onMouseMove = (e) => {
      const mousePageX = e.clientX + window.scrollX;
      const mousePageY = e.clientY + window.scrollY;

      if (triggerRects.current.length > 0) {
        let near = false;
        const radius = window.innerWidth < 768 ? 60 : 40;

        for (let i = 0; i < triggerRects.current.length; i++) {
          const rect = triggerRects.current[i];
          const dx = Math.max(rect.left - mousePageX, 0, mousePageX - rect.right);
          const dy = Math.max(rect.top - mousePageY, 0, mousePageY - rect.bottom);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius) {
            near = true;
            break;
          }
        }
        setSpiderSenseNear(near);
      } else {
        setSpiderSenseNear(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      setSpiderSenseNear(false); // Clean up state cleanly without synchronous render triggers
    };
  }, [mode, isTouchDevice]);

  // Scroll terminal history to bottom
  useEffect(() => {
    if (mode === 'hacker' && hackerState === 'terminal' && terminalHistoryRef.current) {
      terminalHistoryRef.current.scrollTop = terminalHistoryRef.current.scrollHeight;
    }
  }, [hackerHistory, hackerState, mode]);

  // Focus terminal input
  useEffect(() => {
    if (mode === 'hacker' && hackerState === 'terminal') {
      terminalInputRef.current?.focus();
    }
  }, [mode, hackerState]);

  // All available terminal commands for Tab autocomplete
  const TERMINAL_COMMANDS = [
    'about', 'whoami', 'skills', 'projects', 'project', 'experience',
    'certs', 'journey', 'contact', 'hero', 'themes', 'theme',
    'canon', 'lore', 'origin', 'reality', 'watcher', 'masks',
    'nexus', 'bike', 'coffee', 'clear', 'maskoff', 'help',
    'miles', 'peter', 'glitch'
  ];

  // Handle terminal command execution
  const handleTerminalKeyDown = (e) => {
    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const typed = hackerInput.trim().toLowerCase();
      if (!typed) return;

      const matches = TERMINAL_COMMANDS.filter(cmd => cmd.startsWith(typed));

      if (matches.length === 1) {
        // Single match → autofill
        setHackerInput(matches[0]);
        setCursorPos(matches[0].length);
        setTabSuggestions([]);
      } else if (matches.length > 1) {
        // Multiple matches → show inline below prompt
        setTabSuggestions(matches);
      }
      return;
    }
    // Clear suggestions on any other key
    if (tabSuggestions.length > 0 && e.key !== 'Shift') {
      setTabSuggestions([]);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const historyCmds = hackerHistory
        .map(h => h.command)
        .filter(cmd => cmd !== null && cmd !== undefined && cmd.trim() !== '');
      if (historyCmds.length > 0) {
        let newIndex = historyIndex;
        if (historyIndex === -1) {
          newIndex = historyCmds.length - 1;
        } else if (historyIndex > 0) {
          newIndex = historyIndex - 1;
        }
        setHistoryIndex(newIndex);
        setHackerInput(historyCmds[newIndex]);
        setCursorPos(historyCmds[newIndex].length);
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const historyCmds = hackerHistory
        .map(h => h.command)
        .filter(cmd => cmd !== null && cmd !== undefined && cmd.trim() !== '');
      if (historyCmds.length > 0 && historyIndex !== -1) {
        if (historyIndex < historyCmds.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setHackerInput(historyCmds[newIndex]);
          setCursorPos(historyCmds[newIndex].length);
        } else {
          setHistoryIndex(-1);
          setHackerInput('');
          setCursorPos(0);
        }
      }
    }
    if (e.key === 'Enter') {
      const rawCmd = hackerInput;
      const cmdTrimmed = rawCmd.trim();
      setHackerInput('');
      setCursorPos(0);
      setHistoryIndex(-1);

      if (!cmdTrimmed) {
        setHackerHistory(prev => [...prev, { command: '', output: null }]);
        return;
      }

      const parts = cmdTrimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      let output = null;

      // Abbreviations mapping
      let cmdMatched = command;
      if (command === 's') cmdMatched = 'skills';
      else if (command === 'p') cmdMatched = 'projects';
      else if (command === 'c') cmdMatched = 'contact';

      track('Terminal Command Executed', { command: cmdMatched, raw: cmdTrimmed });

      switch (cmdMatched) {
        case 'help':
          output = <TerminalText>{HELP_TEXT}</TerminalText>;
          break;
        case 'whoami':
          output = <TerminalText>{WHOAMI_TEXT}</TerminalText>;
          break;
        case 'about':
          output = <TerminalText>{ABOUT_TEXT}</TerminalText>;
          break;
        case 'skills':
          output = <TerminalText>{SKILLS_TEXT}</TerminalText>;
          break;
        case 'projects':
          output = <TerminalText>{PROJECTS_TEXT}</TerminalText>;
          break;
        case 'project': {
          const targetProj = args[0] ? args[0].toLowerCase() : '';
          if (targetProj === 'aegisguard') {
            output = (
              <pre className="terminal-output-text">
                {`AegisGuard — Real-time Security Monitoring Platform\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nReal-time log monitoring tailing auth.log and\nweb_access.log streams. Detects:\n\n  • SSH Brute Force (5+ failed attempts per 60s window)\n  • SQL Injection patterns\n  • Cross-Site Scripting (XSS) vectors\n  • Path Traversal attempts\n  • Sensitive directory discovery\n\nCustom regex rules engine. Zero dependencies.\nLive attack simulator sandbox for testing.\nDiscord webhook alerts for High + Critical severity events.\n\nStack: Python · FastAPI · SQLite · JavaScript\n\nRepository: `}<a href="https://github.com/goyalnish26/AegisGuard" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/goyalnish26/AegisGuard</a>{`\nLive Demo: `}<a href="https://goyalnish26.github.io/AegisGuard" target="_blank" rel="noopener noreferrer" className="terminal-link">goyalnish26.github.io/AegisGuard</a>
              </pre>
            );
          } else if (targetProj === 'intelscope' || targetProj === 'intelscope-pulse') {
            output = (
              <pre className="terminal-output-text">
                {`IntelScope-Pulse — CVE Threat Intelligence Dashboard\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nLive threat intelligence dashboard pulling CVE data\nfrom the NVD API. Features:\n\n  • Dynamic 90-day rolling window queries\n  • Real-time severity breakdown charts\n  • Persistent CVE watchlist\n  • Actionable threat classification\n\nBuilt for analysts who want signal, not noise.\n\nStack: React · NVD API · Chart.js\n\nRepository: `}<a href="https://github.com/goyalnish26/IntelScope-Pulse" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/goyalnish26/IntelScope-Pulse</a>
              </pre>
            );
          } else if (targetProj === 'writeblog') {
            output = (
              <pre className="terminal-output-text">
                {`WriteBlog — Full-Stack Blogging Platform\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nPolished Flask blogging application with:\n\n  • Role-based authentication (reader/author/admin)\n  • Markdown editor with live preview\n  • Nested comments system\n  • Likes and bookmarks\n  • Image uploads\n  • Admin analytics dashboard\n  • Rate-limited auth routes\n  • Full Docker + CI/CD pipeline\n\nStack: Python · Flask · SQLAlchemy · Bootstrap 5 ·\n       Chart.js · Docker · GitHub Actions\n\nRepository: `}<a href="https://github.com/goyalnish26/writeblog" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/goyalnish26/writeblog</a>
              </pre>
            );
          } else {
            output = <TerminalText>{`Project not found.
Available: aegisguard, intelscope, writeblog`}</TerminalText>;
          }
          break;
        }
        case 'experience':
          output = <TerminalText>{EXPERIENCE_TEXT}</TerminalText>;
          break;
        case 'certs':
          output = <TerminalText>{CERTS_TEXT}</TerminalText>;
          break;
        case 'journey':
          output = <TerminalText>{JOURNEY_TEXT}</TerminalText>;
          break;
        case 'contact':
          output = <CONTACT_TEXT_JSX />;
          break;
        case 'canon':
          output = <TerminalText>{CANON_TEXT}</TerminalText>;
          break;
        case 'lore':
          output = <TerminalText>{LORE_TEXT}</TerminalText>;
          break;
        case 'origin':
          output = <TerminalText>{ORIGIN_TEXT}</TerminalText>;
          break;
        case 'reality':
          output = <TerminalText>{REALITY_TEXT}</TerminalText>;
          break;
        case 'watcher':
          output = <TerminalText>{WATCHER_TEXT}</TerminalText>;
          break;
        case 'masks':
          output = <TerminalText>{MASKS_TEXT}</TerminalText>;
          break;
        case 'nexus':
          output = <TerminalText>{NEXUS_TEXT}</TerminalText>;
          break;
        case 'bike':
          output = <TerminalText>{BIKE_TEXT}</TerminalText>;
          break;
        case 'coffee': {
          const randomIndex = Math.floor(Math.random() * COFFEE_TEXTS.length);
          output = <TerminalText>{COFFEE_TEXTS[randomIndex]}</TerminalText>;
          break;
        }
        case 'miles':
          output = <TerminalText>{MILES_TEXT}</TerminalText>;
          break;
        case 'peter':
          output = <TerminalText>{PETER_TEXT}</TerminalText>;
          break;
        case 'glitch':
          setIsGlitching(true);
          setTimeout(() => {
            setIsGlitching(false);
          }, 250);
          output = null;
          break;
        case 'hero':
          output = getGreetingOutput();
          break;
        case 'themes':
          output = <TerminalText>{THEMES_TEXT}</TerminalText>;
          break;
        case 'theme': {
          const targetTheme = args[0] ? args[0].toLowerCase() : '';
          const validThemes = ['light', 'dark', 'peter', 'miles', 'noir', '2099', 'kali'];
          if (validThemes.includes(targetTheme)) {
            setHackerTheme(targetTheme);
            localStorage.setItem('hackerModeTheme', targetTheme);
            let themeResponse = '';
            if (targetTheme === 'light') themeResponse = "Day Mode Activated.\nTheme updated successfully.";
            else if (targetTheme === 'dark') themeResponse = "Night Mode Activated.\nTheme updated successfully.";
            else if (targetTheme === 'peter') themeResponse = "Dimension Shift Successful.\nPeter Universe Connected.";
            else if (targetTheme === 'miles') themeResponse = "Dimension Shift Successful.\nEarth-1610 Connected.";
            else if (targetTheme === 'noir') themeResponse = "Dimension Shift Successful.\nNoir Universe Connected.";
            else if (targetTheme === '2099') themeResponse = "Dimension Shift Successful.\nNueva York Connected.";
            else if (targetTheme === 'kali') themeResponse = "Kali Environment Loaded.\nHappy Hacking.";
            output = <TerminalText>{themeResponse}</TerminalText>;
            track('Hacker Theme Switched', { theme: targetTheme });
          } else {
            output = <TerminalText>{`Theme not found.
Type: themes
to view available themes.`}</TerminalText>;
          }
          break;
        }
        case 'clear':
          setHackerHistory([]);
          return;
        case 'maskoff':
          setUnmaskProtocolState('exit');
          setTimeout(() => setUnmaskProtocolState('sync'), 800);
          setTimeout(() => setUnmaskProtocolState('off'), 1600);
          setTimeout(() => {
            triggerTransition('dev');
            setTimeout(() => setUnmaskProtocolState(null), 1000);
          }, 2200);
          return;
        default:
          output = <TerminalText>{`Command not found: ${command}\nType 'help' for available commands.`}</TerminalText>;
      }

      setHackerHistory(prev => [...prev, { command: rawCmd, output }]);
    }
  };

  return (
    <div className={`root-wrapper-theme ${mode}-mode-active`}>
      {/* Spider Sense Bolts */}
      {spiderSenseNear && (
        <div className="spider-sense-bolts">
          <svg className="spider-sense-svg" viewBox="0 0 100 100">
            <path d="M 50,50 C 44,44 42,32 30,28" className="bolt-path" />
            <path d="M 50,50 C 40,48 34,58 20,54" className="bolt-path" />
            <path d="M 48,50 C 46,62 38,64 30,76" className="bolt-path" />
            <path d="M 50,50 C 50,60 44,66 50,80" className="bolt-path" />
            <path d="M 52,50 C 54,62 62,64 70,76" className="bolt-path" />
            <path d="M 50,50 C 60,48 66,58 80,54" className="bolt-path" />
            <path d="M 52,50 C 54,62 62,64 70,76" className="bolt-path" />
            <path d="M 50,50 C 60,48 66,58 80,54" className="bolt-path" />
            <path d="M 50,50 C 56,44 58,32 70,28" className="bolt-path" />
            <path d="M 50,50 C 50,38 56,34 50,20" className="bolt-path" />
            <path d="M 34,26 C 28,32 26,26 18,34" className="bolt-path" />
            <path d="M 66,34 C 72,28 74,34 82,26" className="bolt-path" />
            <path d="M 72,48 C 78,46 82,52 90,48" className="bolt-path" />
          </svg>
        </div>
      )}

      {/* Custom Cursor System */}
      <CustomCursor
        cursorDotRef={cursorDotRef}
        cursorRingRef={cursorRingRef}
        mode={mode}
        isTouchDevice={isTouchDevice}
      />

      {/* Glitch Transition */}
      <GlitchTransition transitioning={transitioning} />

      {/* Floating Toggle Button */}
      {mode !== 'entry' && (
        <button
          className={`mode-toggle-button ${mode === 'dev' ? 'dev-toggle' : 'hacker-toggle'}`}
          onClick={() => {
            if (mode === 'dev') {
              triggerMaskProtocol();
            } else {
              setUnmaskProtocolState('exit');
              setTimeout(() => setUnmaskProtocolState('sync'), 800);
              setTimeout(() => setUnmaskProtocolState('off'), 1600);
              setTimeout(() => {
                triggerTransition('dev');
                setTimeout(() => setUnmaskProtocolState(null), 1000);
              }, 2200);
            }
          }}
        >
          {mode === 'dev' ? '[ >_ ]' : '[ ◈ DEV ]'}
        </button>
      )}

      {/* Screen 1: Entry Screen */}
      {(mode === 'entry' || entryExpandingSide) && (
        <EntryScreen
          entryExpandingSide={entryExpandingSide}
          entryTransition={entryTransition}
        />
      )}

      {/* Screen 2: Developer Mode */}
      {mode === 'dev' && (
        <DevMode
          scrolled={scrolled}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          spiderWebTooltip={spiderWebTooltip}
          setSpiderWebTooltip={setSpiderWebTooltip}
          devPostCreditsState={devPostCreditsState}
          devPostCreditsSentinelRef={devPostCreditsSentinelRef}
          triggerBikeRide={triggerBikeRide}
        />
      )}

      {/* Screen 3: Security Researcher Mode */}
      {mode === 'hacker' && (
        <HackerTerminal
          hackerTheme={hackerTheme}
          isGlitching={isGlitching}
          terminalHistoryRef={terminalHistoryRef}
          hackerHistory={hackerHistory}
          exitingTerminal={exitingTerminal}
          hackerInput={hackerInput}
          setHackerInput={setHackerInput}
          cursorPos={cursorPos}
          setCursorPos={setCursorPos}
          tabSuggestions={tabSuggestions}
          setTabSuggestions={setTabSuggestions}
          terminalInputRef={terminalInputRef}
          handleTerminalKeyDown={handleTerminalKeyDown}
        />
      )}

      {/* Mask Protocol Phased Overlay */}
      {maskProtocolState !== null && (
        <div className="mask-protocol-overlay">
          <div className="mask-protocol-content">
            {maskProtocolState === 'init' && (
              <div className="mask-phase-text">Initializing Mask Protocol...</div>
            )}
            {maskProtocolState === 'sync' && (
              <div className="mask-phase-text">Synchronizing dimensions...</div>
            )}
            {maskProtocolState === 'ready' && (
              <div className="mask-phase-text">Mask on.</div>
            )}
          </div>
        </div>
      )}

      {/* Unmask Protocol Overlay */}
      {unmaskProtocolState !== null && (
        <div className="unmask-protocol-overlay">
          <div className="unmask-protocol-content">
            {unmaskProtocolState === 'exit' && (
              <div className="unmask-phase-text">Exiting Terminal Session...</div>
            )}
            {unmaskProtocolState === 'sync' && (
              <div className="unmask-phase-text">Synchronizing Dimensions...</div>
            )}
            {unmaskProtocolState === 'off' && (
              <div className="unmask-phase-text">Mask Off.</div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic motorcycle runs */}
      {bikeRides.map(ride => (
        <div
          key={ride.id}
          className="cb350-bike"
          style={{ animationDuration: window.innerWidth < 768 ? '1.8s' : '2.5s' }}
          onAnimationEnd={() => {
            setBikeRides(prev => prev.filter(b => b.id !== ride.id));
          }}
        >
          🏍️
        </div>
      ))}

      {/* Canon Rejected Ending Noir Overlay */}
      {canonRejectedActive && (
        <div className="canon-rejected-overlay" onClick={() => setCanonRejectedActive(false)}>
          <div className="aot-crack" />
          <div className="sv-panels-noir">
            <div className="sv-panel-noir sv-panel-noir-1">
              <div className="sv-halftone" />
              <div className="sv-panel-noir-title">ANOMALY DETECTED</div>
              <div className="sv-panel-noir-desc">Subject: Nishchal Goyal, ECE &apos;27. Diverging from the prescribed syllabus pathway.</div>
            </div>
            <div className="sv-panel-noir-2">
              <div className="sv-halftone" />
              <div className="sv-panel-noir-title">THE SHIFT</div>
              <div className="sv-panel-noir-desc">Writing high-performance API layers, structuring PostgreSQL queries, building log parsers in the dark.</div>
            </div>
            <div className="sv-panel-noir-3">
              <div className="sv-halftone" />
              <div className="sv-panel-noir-title">CANON BROKEN</div>
              <div className="sv-panel-noir-desc">Standard curriculum expectations rejected. Operating outside standard dimensions.</div>
            </div>
            <div className="sv-panel-noir-4">
              <div className="sv-halftone-multi" />
              <div className="sv-panel-noir-large-splash">REJECTED.</div>
              <div className="sv-panel-noir-splash-sub">NAH, I&apos;MMA DO MY OWN THING.</div>
              <div className="sv-panel-noir-splash-sig">— Nishchal Goyal, ECE &apos;27</div>
            </div>
          </div>
          <div className="sv-to-be-continued">
            <span className="sv-typewriter">// ending verified.</span>
            <span className="terminal-cursor" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
