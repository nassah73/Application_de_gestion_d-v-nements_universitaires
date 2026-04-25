import { useState, useRef, useEffect } from "react";

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

const EVENT_COLORS = [
  { bg: "rgba(205,115,41,0.18)", dot: "#cd7329", border: "rgba(205,115,41,0.35)" },
  { bg: "rgba(34,197,94,0.15)",  dot: "#22c55e", border: "rgba(34,197,94,0.30)" },
  { bg: "rgba(59,130,246,0.15)", dot: "#3b82f6", border: "rgba(59,130,246,0.30)" },
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
  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
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
    { id: 1, title: "Conférence Académique", date: new Date(today.getFullYear(), today.getMonth(), 5), colorIdx: 0 },
    { id: 2, title: "Réunion de Club", date: new Date(today.getFullYear(), today.getMonth(), 12), colorIdx: 1 },
    { id: 3, title: "Exposition Culturelle", date: new Date(today.getFullYear(), today.getMonth(), today.getDate()), colorIdx: 2 },
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
        body { background: #0f172a; }
        .cal-day:hover { background: rgba(255,255,255,0.05) !important; cursor: pointer; }
        .cal-day:hover .day-num { color: #cd7329 !important; }
        .nav-btn:hover { background: rgba(255,255,255,0.1) !important; color: #fff !important; }
        .today-btn:hover { background: rgba(255,255,255,0.15) !important; }
        .evt-item:hover { background: rgba(255,255,255,0.06) !important; }
        .del-btn:hover { color: #ef4444 !important; background: rgba(239,68,68,0.12) !important; }
        .add-btn:hover { background: #b36222 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(205,115,41,0.45) !important; }
        .color-swatch:hover { transform: scale(1.15); }
        .modal-overlay { animation: fadeIn 0.15s ease; }
        .modal-box { animation: slideUp 0.2s ease; }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform: translateY(0) } }
        input:focus { outline: none; border-color: #cd7329 !important; }
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
            <button className="today-btn" onClick={goToday} style={s.todayBtn}>Aujourd'hui</button>
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

            return (
              <div
                key={cell.key}
                className="cal-day"
                onClick={() => { setSelected(date); }}
                onDoubleClick={() => openModal(date)}
                style={{
                  ...s.dayCell,
                  background: isSel
                    ? "rgba(205,115,41,0.14)"
                    : "transparent",
                  border: isSel
                    ? "1px solid rgba(205,115,41,0.40)"
                    : "1px solid transparent",
                }}
              >
                {/* Day number */}
                <div className="day-num" style={{
                  ...s.dayNum,
                  color: isToday ? "#fff" : isSel ? "#cd7329" : "rgba(255,255,255,0.65)",
                  background: isToday ? "#cd7329" : "transparent",
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
                  {dayEvts.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      style={{
                        ...s.dot,
                        backgroundColor: EVENT_COLORS[ev.colorIdx % EVENT_COLORS.length].dot,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={s.legend}>
          <span style={s.legendHint}>Cliquez pour sélectionner · Double-cliquez pour ajouter</span>
        </div>
      </div>

      {/* ── RIGHT: Details ── */}
      <div style={s.detailPanel}>
        <div style={s.detailHeader}>
          <div style={s.detailTitle}>Événements du jour</div>
          <div style={s.detailDate}>{formatDateLabel(selected)}</div>
        </div>

        <div style={s.eventList}>
          {selectedEvents.length === 0 ? (
            <div style={s.noEvt}>
              <div style={s.noEvtIcon}>📅</div>
              <div style={s.noEvtText}>Aucun événement prévu</div>
              <div style={s.noEvtSub}>Double-cliquez sur un jour pour en ajouter un</div>
            </div>
          ) : (
            selectedEvents.map(ev => (
              <div key={ev.id} className="evt-item" style={{
                ...s.evtItem,
                background: EVENT_COLORS[ev.colorIdx % EVENT_COLORS.length].bg,
                borderLeft: `4px solid ${EVENT_COLORS[ev.colorIdx % EVENT_COLORS.length].dot}`,
              }}>
                <div style={s.evtInfo}>
                  <div style={s.evtName}>{ev.title}</div>
                  <div style={s.evtTime}>Journée entière</div>
                </div>
                <button
                  className="del-btn"
                  onClick={() => deleteEvent(ev.id)}
                  style={s.delBtn}
                >
                  Supprimer
                </button>
              </div>
            ))
          )}
        </div>

        <button
          className="add-btn"
          onClick={() => openModal(selected)}
          style={s.addBtn}
        >
          <span style={{ fontSize: "20px" }}>+</span> Ajouter un événement
        </button>
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div className="modal-overlay" style={s.overlay} onClick={closeModal}>
          <div className="modal-box" style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalTitle}>Nouvel événement</div>
            <div style={s.modalSub}>{formatDateLabel(modal.date)}</div>

            <input
              ref={inputRef}
              style={s.input}
              placeholder="Titre de l'événement..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addEvent()}
            />

            <div style={s.colorRow}>
              {EVENT_COLORS.map((c, i) => (
                <div
                  key={i}
                  className="color-swatch"
                  onClick={() => setColorIdx(i)}
                  style={{
                    ...s.colorSwatch,
                    backgroundColor: c.dot,
                    border: colorIdx === i ? "3px solid #fff" : "none",
                    boxShadow: colorIdx === i ? "0 0 12px rgba(255,255,255,0.4)" : "none",
                  }}
                />
              ))}
            </div>

            <div style={s.modalActions}>
              <button onClick={closeModal} style={s.cancelBtn}>Annuler</button>
              <button onClick={addEvent} style={s.confirmBtn}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  root: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 64px)",
    fontFamily: "'DM Sans', sans-serif",
    background: "#0f172a",
    color: "#fff",
    padding: "24px",
    gap: "24px",
    overflow: "hidden",
  },
  calPanel: {
    flex: 1,
    background: "rgba(255,255,255,0.03)",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
  },
  calHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  monthTitle: { display: "flex", flexDirection: "column" },
  monthName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "32px",
    fontWeight: 800,
    color: "#fff",
  },
  yearNum: {
    fontSize: "14px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.4)",
    marginTop: "-4px",
  },
  navGroup: { display: "flex", gap: "8px", alignItems: "center" },
  todayBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "none",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  navBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "none",
    color: "rgba(255,255,255,0.6)",
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  dayLabels: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: "16px",
  },
  dayLabel: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  grid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "repeat(6, 1fr)",
    gap: "4px",
  },
  dayCell: {
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  emptyCell: { opacity: 0 },
  dayNum: {
    fontSize: "15px",
    transition: "all 0.2s",
  },
  dotRow: {
    display: "flex",
    gap: "3px",
    marginTop: "4px",
    height: "5px",
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
  },

  detailPanel: {
    width: "360px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
  },
  detailHeader: { marginBottom: "24px" },
  detailTitle: { fontSize: "18px", fontWeight: 700, marginBottom: "4px" },
  detailDate: { fontSize: "14px", color: "rgba(255,255,255,0.4)" },

  eventList: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" },
  noEvt: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    padding: "20px",
  },
  noEvtIcon: { fontSize: "40px", marginBottom: "12px", opacity: 0.5 },
  noEvtText: { fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.5)" },
  noEvtSub: { fontSize: "13px", marginTop: "4px" },

  evtItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderRadius: "16px",
    transition: "all 0.2s",
  },
  evtInfo: { display: "flex", flexDirection: "column", gap: "2px" },
  evtName: { fontSize: "15px", fontWeight: 600, color: "#fff" },
  evtTime: { fontSize: "12px", color: "rgba(255,255,255,0.5)" },
  delBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.3)",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "8px",
    transition: "all 0.2s",
  },

  addBtn: {
    marginTop: "24px",
    background: "#cd7329",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    padding: "16px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 4px 14px rgba(205,115,41,0.3)",
    transition: "all 0.2s",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#1e293b",
    width: "400px",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
  },
  modalTitle: { fontSize: "20px", fontWeight: 700, marginBottom: "4px" },
  modalSub: { fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "24px" },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "#fff",
    fontSize: "15px",
    marginBottom: "20px",
  },
  colorRow: { display: "flex", gap: "10px", marginBottom: "32px" },
  colorSwatch: { width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", transition: "all 0.2s" },
  modalActions: { display: "flex", gap: "12px" },
  cancelBtn: {
    flex: 1,
    background: "rgba(255,255,255,0.05)",
    border: "none",
    color: "#fff",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
  confirmBtn: {
    flex: 2,
    background: "#cd7329",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
