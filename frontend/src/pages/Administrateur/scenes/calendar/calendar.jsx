import { useState, useRef, useEffect } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const EVENT_COLORS = [
  { bg: "rgba(59,130,246,0.18)", dot: "#3b82f6", border: "rgba(59,130,246,0.35)" },
  { bg: "rgba(34,197,94,0.15)",  dot: "#22c55e", border: "rgba(34,197,94,0.30)" },
  { bg: "rgba(249,115,22,0.15)", dot: "#f97316", border: "rgba(249,115,22,0.30)" },
  { bg: "rgba(168,85,247,0.15)", dot: "#a855f7", border: "rgba(168,85,247,0.30)" },
  { bg: "rgba(236,72,153,0.15)", dot: "#ec4899", border: "rgba(236,72,153,0.30)" },
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}
function formatDateLabel(date) {
  return `${MONTHS[date.getMonth()].slice(0,3)} ${date.getDate()}, ${date.getFullYear()}`;
}

const STORAGE_KEY = "calendar_events_v1";

// Serialize: Date → ISO string
function serializeEvents(evts) {
  return JSON.stringify(evts.map(e => ({ ...e, date: e.date.toISOString() })));
}
// Deserialize: ISO string → Date
function deserializeEvents(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed.map(e => ({ ...e, date: new Date(e.date) }));
  } catch { return null; }
}

function loadEvents(today) {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const evts = deserializeEvents(raw);
    if (evts) return evts;
  }
  // default events seulement si localStorage vide
  return [
    { id: 1, title: "All-day event", date: new Date(today.getFullYear(), today.getMonth(), 5), colorIdx: 0 },
    { id: 2, title: "Team meeting", date: new Date(today.getFullYear(), today.getMonth(), 12), colorIdx: 1 },
    { id: 3, title: "Design review", date: new Date(today.getFullYear(), today.getMonth(), today.getDate()), colorIdx: 2 },
  ];
}

let eventCounter = Date.now(); // unique IDs

export default function CalendarCustom() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today);
  const [events, setEvents] = useState(() => loadEvents(today));
  const [modal, setModal] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const inputRef = useRef(null);

  // ✅ Persist f localStorage kol mra kaytkhdl events
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeEvents(events));
  }, [events]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => { setViewDate(new Date(today.getFullYear(), today.getMonth(), 1)); setSelected(today); };

  const getEventsForDay = (d) => events.filter(e => isSameDay(e.date, d));

  const openModal = (date) => { setModal({ date }); setInputVal(""); setColorIdx(0); setTimeout(() => inputRef.current?.focus(), 50); };
  const closeModal = () => setModal(null);

  const addEvent = () => {
    if (!inputVal.trim()) return;
    setEvents(prev => [...prev, { id: ++eventCounter, title: inputVal.trim(), date: modal.date, colorIdx }]);
    closeModal();
  };

  const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  const selectedEvents = events.filter(e => isSameDay(e.date, selected));

  // Build grid cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ empty: true, key: `e${i}` });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, key: `d${d}` });
  }
  // fill to complete last row
  while (cells.length % 7 !== 0) cells.push({ empty: true, key: `ef${cells.length}` });

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f1117; }
        .cal-day:hover { background: rgba(59,130,246,0.08) !important; cursor: pointer; }
        .cal-day:hover .day-num { color: #3b82f6 !important; }
        .nav-btn:hover { background: rgba(59,130,246,0.15) !important; color: #3b82f6 !important; }
        .today-btn:hover { background: rgba(59,130,246,0.25) !important; }
        .evt-item:hover { background: rgba(255,255,255,0.06) !important; }
        .del-btn:hover { color: #ef4444 !important; background: rgba(239,68,68,0.12) !important; }
        .add-btn:hover { background: #2563eb !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.35) !important; }
        .color-swatch:hover { transform: scale(1.15); }
        .modal-overlay { animation: fadeIn 0.15s ease; }
        .modal-box { animation: slideUp 0.2s ease; }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform: translateY(0) } }
        input:focus { outline: none; }
      `}</style>

      {/* ── LEFT: Calendar ── */}
      <div style={s.calPanel}>

        {/* Header */}
        <div style={s.calHeader}>
          <div style={s.monthTitle}>
            <span style={s.monthName}>{MONTHS[month]}</span>
            <span style={s.yearNum}>{year}</span>
          </div>
          <div style={s.navGroup}>
            <button className="today-btn" onClick={goToday} style={s.todayBtn}>Today</button>
            <button className="nav-btn" onClick={prevMonth} style={s.navBtn}>‹</button>
            <button className="nav-btn" onClick={nextMonth} style={s.navBtn}>›</button>
          </div>
        </div>

        {/* Day labels */}
        <div style={s.dayLabels}>
          {DAYS.map(d => (
            <div key={d} style={s.dayLabel}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div style={s.grid}>
          {cells.map(cell => {
            if (cell.empty) return <div key={cell.key} style={s.emptyCell} />;
            const { date } = cell;
            const isToday = isSameDay(date, today);
            const isSel = isSameDay(date, selected);
            const dayEvts = getEventsForDay(date);
            const isOtherMonth = false;

            return (
              <div
                key={cell.key}
                className="cal-day"
                onClick={() => { setSelected(date); }}
                onDoubleClick={() => openModal(date)}
                style={{
                  ...s.dayCell,
                  background: isSel
                    ? "rgba(59,130,246,0.14)"
                    : "transparent",
                  border: isSel
                    ? "1px solid rgba(59,130,246,0.40)"
                    : "1px solid transparent",
                }}
              >
                {/* Day number */}
                <div className="day-num" style={{
                  ...s.dayNum,
                  color: isToday ? "#fff" : isSel ? "#3b82f6" : "rgba(255,255,255,0.65)",
                  background: isToday ? "#3b82f6" : "transparent",
                  borderRadius: isToday ? "50%" : "0",
                  width: isToday ? "26px" : "auto",
                  height: isToday ? "26px" : "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: isToday || isSel ? 700 : 500,
                }}>
                  {date.getDate()}
                </div>

                {/* Event dots */}
                <div style={s.dotRow}>
                  {dayEvts.slice(0, 3).map((ev, i) => (
                    <div
                      key={ev.id}
                      style={{
                        ...s.dot,
                        background: EVENT_COLORS[ev.colorIdx % EVENT_COLORS.length].dot,
                      }}
                    />
                  ))}
                  {dayEvts.length > 3 && (
                    <span style={s.moreLabel}>+{dayEvts.length - 3}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={s.legend}>
          <span style={s.legendHint}>Click to select · Double-click to add event</span>
        </div>
      </div>

      {/* ── RIGHT: Sidebar ── */}
      <div style={s.sidebar}>

        {/* Selected date header */}
        <div style={s.sidebarHeader}>
          <div>
            <div style={s.sidebarDateLabel}>{formatDateLabel(selected)}</div>
            <div style={s.sidebarSubLabel}>
              {selectedEvents.length === 0
                ? "No events"
                : `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""}`}
            </div>
          </div>
          <button
            className="add-btn"
            onClick={() => openModal(selected)}
            style={s.addBtn}
          >
            + Add
          </button>
        </div>

        {/* Accent line */}
        <div style={s.accentLine} />

        {/* Events list */}
        <div style={s.eventsList}>
          {selectedEvents.length === 0 ? (
            <div style={s.emptyState}>
              <div style={s.emptyIcon}>📅</div>
              <div style={s.emptyText}>Double-click any day<br />to add an event</div>
            </div>
          ) : (
            selectedEvents.map(ev => {
              const c = EVENT_COLORS[ev.colorIdx % EVENT_COLORS.length];
              return (
                <div key={ev.id} className="evt-item" style={{ ...s.eventItem, background: c.bg, border: `1px solid ${c.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
                    <span style={s.eventTitle}>{ev.title}</span>
                  </div>
                  <button className="del-btn" onClick={() => deleteEvent(ev.id)} style={s.delBtn}>✕</button>
                </div>
              );
            })
          )}
        </div>

        {/* All events summary */}
        {events.length > 0 && (
          <div style={s.allEventsSummary}>
            <div style={s.summaryTitle}>All Events ({events.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "180px", overflowY: "auto" }}>
              {events.slice().sort((a,b) => a.date - b.date).map(ev => {
                const c = EVENT_COLORS[ev.colorIdx % EVENT_COLORS.length];
                return (
                  <div key={ev.id} style={s.summaryItem}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
                    <span style={s.summaryEvtTitle}>{ev.title}</span>
                    <span style={s.summaryDate}>{formatDateLabel(ev.date)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div className="modal-overlay" style={s.overlay} onClick={closeModal}>
          <div className="modal-box" style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <div style={s.modalTitle}>New Event</div>
              <div style={s.modalDate}>{formatDateLabel(modal.date)}</div>
            </div>

            <input
              ref={inputRef}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") addEvent(); if (e.key === "Escape") closeModal(); }}
              placeholder="Event title..."
              style={s.modalInput}
            />

            {/* Color picker */}
            <div style={s.colorRow}>
              {EVENT_COLORS.map((c, i) => (
                <div
                  key={i}
                  className="color-swatch"
                  onClick={() => setColorIdx(i)}
                  style={{
                    ...s.colorSwatch,
                    background: c.dot,
                    boxShadow: colorIdx === i ? `0 0 0 2px #0f1117, 0 0 0 4px ${c.dot}` : "none",
                    transform: colorIdx === i ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <div style={s.modalActions}>
              <button onClick={closeModal} style={s.cancelBtn}>Cancel</button>
              <button onClick={addEvent} style={s.confirmBtn}>Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Styles ──
const s = {
  root: {
    display: "flex",
    gap: "20px",
    padding: "28px",
    minHeight: "100vh",
    background: "#0f1117",
    fontFamily: "'DM Sans', sans-serif",
    color: "#fff",
  },
  // Calendar panel
  calPanel: {
    flex: "1 1 0",
    background: "#161b27",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.07)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  calHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  monthTitle: { display: "flex", alignItems: "baseline", gap: "8px" },
  monthName: { fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: "#fff" },
  yearNum: { fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.35)" },
  navGroup: { display: "flex", gap: "6px", alignItems: "center" },
  todayBtn: {
    background: "rgba(59,130,246,0.12)",
    border: "1px solid rgba(59,130,246,0.25)",
    color: "#3b82f6",
    borderRadius: "8px",
    padding: "5px 12px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
    letterSpacing: "0.3px",
  },
  navBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.6)",
    borderRadius: "8px",
    width: "32px",
    height: "32px",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.18s",
    fontFamily: "'DM Sans', sans-serif",
  },
  // Day labels
  dayLabels: {
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    marginBottom: "6px",
  },
  dayLabel: {
    textAlign: "center",
    fontSize: "11px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.30)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    padding: "4px 0",
  },
  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    gap: "3px",
    flex: 1,
  },
  emptyCell: { minHeight: "64px" },
  dayCell: {
    minHeight: "64px",
    borderRadius: "10px",
    padding: "7px 8px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    transition: "background 0.15s, border 0.15s",
    cursor: "pointer",
  },
  dayNum: {
    fontSize: "13px",
    lineHeight: 1,
    transition: "color 0.15s",
  },
  dotRow: {
    display: "flex",
    gap: "3px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  moreLabel: {
    fontSize: "9px",
    color: "rgba(255,255,255,0.40)",
    fontWeight: 700,
  },
  legend: {
    marginTop: "12px",
    textAlign: "center",
  },
  legendHint: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.22)",
    letterSpacing: "0.2px",
  },
  // Sidebar
  sidebar: {
    width: "280px",
    flexShrink: 0,
    background: "#161b27",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.07)",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "14px",
  },
  sidebarDateLabel: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.3,
  },
  sidebarSubLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
    marginTop: "3px",
  },
  addBtn: {
    background: "#3b82f6",
    border: "none",
    color: "#fff",
    borderRadius: "9px",
    padding: "7px 14px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 14px rgba(59,130,246,0.25)",
  },
  accentLine: {
    height: "2px",
    width: "36px",
    borderRadius: "2px",
    background: "linear-gradient(90deg,#1e3a6e,#3b82f6)",
    marginBottom: "16px",
  },
  eventsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "24px 0",
  },
  emptyIcon: { fontSize: "28px", opacity: 0.4 },
  emptyText: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.30)",
    textAlign: "center",
    lineHeight: 1.6,
  },
  eventItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: "10px",
    transition: "background 0.15s",
    cursor: "default",
  },
  eventTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.88)",
  },
  delBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.25)",
    fontSize: "11px",
    cursor: "pointer",
    width: "22px",
    height: "22px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    fontFamily: "'DM Sans', sans-serif",
    flexShrink: 0,
  },
  // All events summary
  allEventsSummary: {
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  summaryTitle: {
    fontSize: "11px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.30)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "10px",
  },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px 0",
  },
  summaryEvtTitle: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.65)",
    fontWeight: 500,
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  summaryDate: {
    fontSize: "10px",
    color: "rgba(255,255,255,0.25)",
    whiteSpace: "nowrap",
  },
  // Modal
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },
  modalBox: {
    background: "#1a2035",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "18px",
    padding: "26px",
    width: "340px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
  },
  modalHeader: { marginBottom: "18px" },
  modalTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "18px",
    fontWeight: 800,
    color: "#fff",
  },
  modalDate: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
    marginTop: "3px",
  },
  modalInput: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "11px 14px",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: "14px",
    transition: "border 0.15s",
  },
  colorRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    alignItems: "center",
  },
  colorSwatch: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.15s",
    flexShrink: 0,
  },
  modalActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  cancelBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.55)",
    borderRadius: "9px",
    padding: "8px 18px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  confirmBtn: {
    background: "#3b82f6",
    border: "none",
    color: "#fff",
    borderRadius: "9px",
    padding: "8px 18px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 14px rgba(59,130,246,0.30)",
  },
};