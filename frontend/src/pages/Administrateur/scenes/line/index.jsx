import { useState, useEffect } from "react";

const initialOrganizers = [
  { id: 1, name: "Dr. Sarah Johnson", initials: "DSJ", color: "#3B4F7C", email: "s.johnson@uiz.ac.ma", department: "Computer Science", submitted: "4/24/2026", status: "pending" },
  { id: 2, name: "Pr. Michael Chen", initials: "PMC", color: "#2D6A4F", email: "m.chen@uiz.ac.ma", department: "Engineering", submitted: "4/25/2026", status: "pending" },
  { id: 3, name: "Pr. David Williams", initials: "PDW", color: "#1B4965", email: "d.williams@uiz.ac.ma", department: "Mathematics", submitted: "4/26/2026", status: "pending" },
  { id: 4, name: "Dr. Lisa Anderson", initials: "DLA", color: "#5C3D2E", email: "l.anderson@uiz.ac.ma", department: "Psychology", submitted: "4/24/2026", status: "pending" },
  { id: 1, name: "Dr. Sarah Johnson", initials: "DSJ", color: "#3B4F7C", email: "s.johnson@uiz.ac.ma", department: "Computer Science", submitted: "4/24/2026", status: "pending" },
  { id: 2, name: "Pr. Michael Chen", initials: "PMC", color: "#2D6A4F", email: "m.chen@uiz.ac.ma", department: "Engineering", submitted: "4/25/2026", status: "pending" },
  { id: 3, name: "Pr. David Williams", initials: "PDW", color: "#1B4965", email: "d.williams@uiz.ac.ma", department: "Mathematics", submitted: "4/26/2026", status: "pending" },
  { id: 4, name: "Dr. Lisa Anderson", initials: "DLA", color: "#5C3D2E", email: "l.anderson@uiz.ac.ma", department: "Psychology", submitted: "4/24/2026", status: "pending" },

];

const statusConfig = {
  pending:  { bg: "#FFF7E6", color: "#B45309", border: "#FCD34D", label: "Cultural",  dot: "⚠" },
  verified: { bg: "#ECFDF5", color: "#065F46", border: "#6EE7B7", label: "Technology", dot: "✓" },
  rejected: { bg: "#FEF2F2", color: "#991B1B", border: "#FCA5A5", label: "social", dot: "✕" },
  approved: { bg: "#ECFDF5", color: "#065F46", border: "#6EE7B7", label: "Academic", dot: "✓" },
};

const StatusBadge = ({ status }) => {
  const s = statusConfig[status] || statusConfig.pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: 11 }}>{s.dot}</span> {s.label}
    </span>
  );
};

const Avatar = ({ initials, color, size = 40 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: color, color: "#fff", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.3, fontWeight: 700, letterSpacing: 1,
  }}>{initials}</div>
);

const StatCard = ({ icon, label, count, accent, isMobile }) => (
  <div style={{
    flex: 1, minWidth: isMobile ? "100%" : 0,
    background: "#fff", borderRadius: 14,
    border: "1px solid #E8EAF0", padding: isMobile ? "16px 20px" : "20px 24px",
    display: "flex", alignItems: "center", gap: 14,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  }}>
    <div style={{
      width: 42, height: 42, borderRadius: 12, flexShrink: 0,
      background: accent + "1A", display: "flex",
      alignItems: "center", justifyContent: "center", fontSize: 19,
    }}>{icon}</div>
    <div>
      <div style={{ fontSize: 12, color: "#7B8494", fontWeight: 500, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: "#1A1F36", lineHeight: 1 }}>{count}</div>
    </div>
  </div>
);

const OrganizerCard = ({ o, onApprove, onReject }) => (
  <div style={{
    background: "#fff", borderRadius: 14,
    border: "1px solid #E8EAF0", padding: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <Avatar initials={o.initials} color={o.color} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: "#1A1F36", fontSize: 15, marginBottom: 2 }}>{o.name}</div>
        <div style={{ color: "#7B8494", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.email}</div>
      </div>
      <StatusBadge status={o.status} />
    </div>
    <div style={{ display: "flex", gap: 20, marginBottom: 14, flexWrap: "wrap" }}>
      <div>
        <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Department</div>
        <div style={{ fontSize: 13, color: "#4B5563", fontWeight: 500 }}>{o.department}</div>
      </div>
      <div>
        <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Submitted</div>
        <div style={{ fontSize: 13, color: "#4B5563", fontWeight: 500 }}>{o.submitted}</div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {o.status === "pending" && (<>
        <button className="action-btn approve-btn" style={{ flex: 1 }} onClick={() => onApprove(o.id)}>✓ Approve</button>
        <button className="action-btn reject-btn"  style={{ flex: 1 }} onClick={() => onReject(o.id)}>✕ Reject</button>
      </>)}
      <button className="action-btn docs-btn" style={{ flex: o.status === "pending" ? "0 0 auto" : 1 }}>📄 View Docs</button>
    </div>
  </div>
);

export default function OrganizerApproval() {
  const [organizers, setOrganizers] = useState(initialOrganizers);
  const [toast, setToast] = useState(null);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2500);
  };

  const handleApprove = (id) => {
    setOrganizers(prev => prev.map(o => o.id === id ? { ...o, status: "approved" } : o));
    showToast("Application approved successfully", "#065F46");
  };

  const handleReject = (id) => {
    setOrganizers(prev => prev.map(o => o.id === id ? { ...o, status: "rejected" } : o));
    showToast("Application rejected", "#991B1B");
  };

  const pending  = organizers.filter(o => o.status === "pending").length;
  const approved = organizers.filter(o => o.status === "approved").length;
  const rejected = organizers.filter(o => o.status === "rejected").length;

  const pad = isMobile ? "20px 16px" : isTablet ? "28px 24px" : "36px 32px";

  return (
    <div style={{ minHeight: "100vh", background: "#131929", fontFamily: "'DM Sans', sans-serif", padding: pad }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
        .action-btn {
          cursor: pointer; border: none; border-radius: 8px;
          padding: 8px 14px; font-size: 13px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          transition: transform 0.1s, box-shadow 0.1s;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }
        .action-btn:active { transform: scale(0.97); }
        .approve-btn { background: #16A34A; color: #fff; }
        .reject-btn  { background: #DC2626; color: #fff; }
        .docs-btn    { background: #fff; color: #4B5563; border: 1px solid #D1D5DB !important; }
        tr:hover td  { background: #F9FAFB; }
        td { transition: background 0.15s; }
        .table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 16px; border: 1px solid #E8EAF0; box-shadow: 0 1px 6px rgba(0,0,0,0.05); }
        .toast {
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          padding: 11px 22px; border-radius: 10px; color: #fff;
          font-weight: 600; font-size: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18); z-index: 999;
          animation: slideUp 0.3s ease; white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        @keyframes slideUp {
          from { opacity:0; transform: translateX(-50%) translateY(16px); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: isMobile ? 20 : 28 }}>
        <h1 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 800, color: "#fff", margin: 0 }}>Organizer Approval</h1>
        <p style={{ color: "#7B8494", margin: "4px 0 0", fontSize: 13 }}>Review and approve event organizer applications</p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: "flex", gap: 12, marginBottom: isMobile ? 20 : 24,
        flexDirection: isMobile ? "column" : "row",
      }}>
        <StatCard icon="⚠️" label="Pending Reviews" count={pending}  accent="#F59E0B" isMobile={isMobile} />
        <StatCard icon="✅" label="Approved"         count={approved} accent="#10B981" isMobile={isMobile} />
        <StatCard icon="❌" label="Rejected"         count={rejected} accent="#EF4444" isMobile={isMobile} />
      </div>

      {/* Mobile: cards / Tablet+Desktop: table */}
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {organizers.map(o => (
            <OrganizerCard key={o.id} o={o} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </div>
      ) : (
        <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700, background: "#fff" }}>
            <thead>
              <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E8EAF0" }}>
                {["Name", "Email", "Department", "Submitted", "Status", "Actions"].map(h => (
                  <th key={h} style={{
                    padding: "13px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 700, color: "#6B7280",
                    textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {organizers.map((o, i) => (
                <tr key={o.id} style={{ borderBottom: i < organizers.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar initials={o.initials} color={o.color} size={36} />
                      <span style={{ fontWeight: 600, color: "#1A1F36", fontSize: 13, whiteSpace: "nowrap" }}>{o.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#6B7280", fontSize: 12 }}>{o.email}</td>
                  <td style={{ padding: "14px 16px", color: "#4B5563", fontSize: 12 }}>{o.department}</td>
                  <td style={{ padding: "14px 16px", color: "#6B7280", fontSize: 12, whiteSpace: "nowrap" }}>{o.submitted}</td>
                  <td style={{ padding: "14px 16px" }}><StatusBadge status={o.status} /></td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {o.status === "pending" && (<>
                        <button className="action-btn approve-btn" onClick={() => handleApprove(o.id)}>✓ Approve</button>
                        <button className="action-btn reject-btn"  onClick={() => handleReject(o.id)}>✕ Reject</button>
                      </>)}
                      <button className="action-btn docs-btn">📄 Docs</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toast && <div className="toast" style={{ background: toast.color }}>{toast.msg}</div>}
    </div>
  );
}