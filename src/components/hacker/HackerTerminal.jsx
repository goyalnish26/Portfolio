export default function HackerTerminal({
  hackerTheme,
  isGlitching,
  terminalHistoryRef,
  hackerHistory,
  exitingTerminal,
  hackerInput,
  setHackerInput,
  cursorPos,
  setCursorPos,
  tabSuggestions,
  setTabSuggestions,
  terminalInputRef,
  handleTerminalKeyDown
}) {
  const focusInput = () => {
    terminalInputRef.current?.focus();
  };

  return (
    <div 
      className={`hacker-portfolio-wrapper theme-${hackerTheme} ${isGlitching ? 'terminal-glitching' : ''}`} 
      onClick={focusInput}
    >
      <div className="hacker-terminal-container">
        <div className="hacker-status-bar">
          <span>nishchal@canon-breaker:~</span>
          <span className="status-tags">[SESSION ACTIVE]</span>
        </div>

        <div className="terminal-history-scroller" ref={terminalHistoryRef}>
          {hackerHistory.map((item, idx) => (
            <div key={idx} className="history-item-group">
              {item.command !== null && (
                <div className="history-command-line">
                  <span className="terminal-prompt-text">nishchal@canon-breaker:~$ </span>
                  <span className="history-command-text">{item.command}</span>
                </div>
              )}
              {item.output && (
                <div className="history-output-line">
                  {item.output}
                </div>
              )}
            </div>
          ))}

          {!exitingTerminal && (
            <>
              <div className="terminal-input-row">
                <span className="terminal-prompt-text">nishchal@canon-breaker:~$ </span>
                <div className="terminal-input-container">
                  <span className="terminal-typed-text">{hackerInput.slice(0, cursorPos)}</span>
                  <span className="terminal-cursor-block">
                    {cursorPos < hackerInput.length ? hackerInput[cursorPos] : ' '}
                  </span>
                  <span className="terminal-typed-text">{hackerInput.slice(cursorPos + 1)}</span>
                  <input
                    ref={terminalInputRef}
                    className="terminal-hidden-input"
                    type="text"
                    value={hackerInput}
                    onChange={(e) => {
                      setHackerInput(e.target.value);
                      setCursorPos(e.target.selectionStart);
                      setTabSuggestions([]);
                    }}
                    onKeyDown={(e) => {
                      setTimeout(() => {
                        if (terminalInputRef.current) {
                          setCursorPos(terminalInputRef.current.selectionStart);
                        }
                      }, 0);
                      handleTerminalKeyDown(e);
                    }}
                    onClick={() => {
                      if (terminalInputRef.current) {
                        setCursorPos(terminalInputRef.current.selectionStart);
                      }
                    }}
                    onKeyUp={() => {
                      if (terminalInputRef.current) {
                        setCursorPos(terminalInputRef.current.selectionStart);
                      }
                    }}
                    onFocus={() => {
                      if (terminalInputRef.current) {
                        setCursorPos(terminalInputRef.current.selectionStart);
                      }
                    }}
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>
              </div>
              {tabSuggestions.length > 0 && (
                <div className="terminal-tab-suggestions">
                  {tabSuggestions.join('  ')}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="crt-scanline"></div>
    </div>
  );
}
