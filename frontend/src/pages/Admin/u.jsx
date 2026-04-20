import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

const SIDEBAR_ITEMS = [
  { id: "stats", label: "Global Statistics", icon: "📊" },
  { id: "users", label: "User Management", icon: "👥" },
  { id: "categories", label: "Category Management", icon: "🗂️" },
  { id: "approval", label: "Organizer Approval", icon: "✅" },
  { id: "moderation", label: "Content Moderation", icon: "🛡️" },
];

const ATTENDANCE_DATA = [
  { month: "Jan", attendance: 2400 },
  { month: "Feb", attendance: 3200 },
  { month: "Mar", attendance: 2800 },
  { month: "Apr", attendance: 4100 },
  { month: "May", attendance: 3800 },
  { month: "Jun", attendance: 4500 },
  { month: "Jul", attendance: 5200 },
  { month: "Aug", attendance: 4800 },
  { month: "Sep", attendance: 5900 },
  { month: "Oct", attendance: 6200 },
  { month: "Nov", attendance: 5950 },
  { month: "Dec", attendance: 6600 },
];

const CATEGORY_DATA = [
  { name: "Conférence", value: 35, color: "#3b5bdb" },
  { name: "Atelier", value: 25, color: "#7950f2" },
  { name: "Hackathon", value: 20, color: "#f59f00" },
  { name: "Culturel", value: 12, color: "#37b24d" },
  { name: "Sportif", value: 8, color: "#f03e3e" },
];

const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 28000 },
  { month: "Feb", revenue: 32000 },
  { month: "Mar", revenue: 29000 },
  { month: "Apr", revenue: 38000 },
  { month: "May", revenue: 42000 },
  { month: "Jun", revenue: 39000 },
  { month: "Jul", revenue: 45000 },
  { month: "Aug", revenue: 41000 },
  { month: "Sep", revenue: 48000 },
  { month: "Oct", revenue: 51000 },
  { month: "Nov", revenue: 46000 },
  { month: "Dec", revenue: 48329 },
];

const USERS = [
  { id: 1, name: "Ahmed Benali", email: "a.benali@uni.ma", role: "Étudiant", status: "Actif", events: 5, joined: "2024-09-01" },
  { id: 2, name: "Fatima Zahra", email: "f.zahra@uni.ma", role: "Organisateur", status: "Actif", events: 12, joined: "2024-08-15" },
  { id: 3, name: "Karim Idrissi", email: "k.idrissi@uni.ma", role: "Étudiant", status: "Inactif", events: 2, joined: "2024-10-03" },
  { id: 4, name: "Sara Maarouf", email: "s.maarouf@uni.ma", role: "Organisateur", status: "En attente", events: 8, joined: "2024-11-20" },
  { id: 5, name: "Youssef Alami", email: "y.alami@uni.ma", role: "Étudiant", status: "Actif", events: 3, joined: "2025-01-10" },
  { id: 6, name: "Nadia Tahiri", email: "n.tahiri@uni.ma", role: "Étudiant", status: "Actif", events: 7, joined: "2024-09-22" },
];

const PENDING_ORGANIZERS = [
  { id: 1, name: "Mohamed Benkirane", email: "m.benkirane@uni.ma", dept: "Informatique", date: "2025-04-01", reason: "Club Robotique" },
  { id: 2, name: "Leila Cherkaoui", email: "l.cherkaoui@uni.ma", dept: "Économie", date: "2025-04-03", reason: "Association Entrepreneuriat" },
  { id: 3, name: "Omar Hajji", email: "o.hajji@uni.ma", dept: "Physique", date: "2025-04-05", reason: "Club Sciences" },
];

const MODERATION_ITEMS = [
  { id: 1, title: "Conférence Blockchain", organizer: "Club Finance", flag: "Contenu inapproprié", date: "2025-04-06", status: "En attente" },
  { id: 2, title: "Soirée Étudiante", organizer: "BDE", flag: "Localisation incorrecte", date: "2025-04-07", status: "En attente" },
  { id: 3, title: "Atelier Marketing", organizer: "Club Business", flag: "Spam", date: "2025-04-04", status: "Résolu" },
];

const CATEGORIES_LIST = [
  { id: 1, name: "Conférence", events: 156, color: "#3b5bdb", icon: "🎤" },
  { id: 2, name: "Atelier", events: 98, color: "#7950f2", icon: "🛠️" },
  { id: 3, name: "Hackathon", events: 34, color: "#f59f00", icon: "💻" },
  { id: 4, name: "Culturel", events: 72, color: "#37b24d", icon: "🎭" },
  { id: 5, name: "Sportif", events: 45, color: "#f03e3e", icon: "⚽" },
  { id: 6, name: "Séminaire", events: 61, color: "#1098ad", icon: "📚" },
];

const C = {
  bg: "#f0f2f8",
  sidebar: "#ffffff",
  card: "#ffffff",
  primary: "#1e3a8a",
  primaryLight: "#dbeafe",
  accent: "#f59e0b",
  text: "#1e293b",
  muted: "#64748b",
  border: "#e2e8f0",
  success: "#16a34a",
  successBg: "#dcfce7",
  danger: "#dc2626",
  dangerBg: "#fee2e2",
  warning: "#d97706",
  warningBg: "#fef3c7",
  info: "#0369a1",
  infoBg: "#e0f2fe",
};

const StatCard = ({ label, value, icon, iconBg, change, changeLabel }) => (
  <div style={{ background: C.card, borderRadius: 12, padding: "20px 24px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flex: 1 }}>
    <div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
        <span style={{ color: C.success }}>↗ {change}</span>
        <span style={{ color: C.muted }}>{changeLabel}</span>
      </div>
    </div>
    <div style={{ width: 48, height: 48, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
      {icon}
    </div>
  </div>
);

const Badge = ({ label, color, bg }) => (
  <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>{label}</span>
);

const statusStyle = (s) => {
  if (s === "Actif" || s === "Résolu") return { color: C.success, bg: C.successBg };
  if (s === "Inactif") return { color: C.muted, bg: "#f1f5f9" };
  return { color: C.warning, bg: C.warningBg };
};

export default function UniEventsAdmin() {
  const [active, setActive] = useState("stats");
  const [users, setUsers] = useState(USERS);
  const [pendingOrgs, setPendingOrgs] = useState(PENDING_ORGANIZERS);
  const [modItems, setModItems] = useState(MODERATION_ITEMS);
  const [categories, setCategories] = useState(CATEGORIES_LIST);
  const [newCat, setNewCat] = useState("");
  const [notification, setNotification] = useState(null);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const approveOrg = (id) => {
    setPendingOrgs((p) => p.filter((o) => o.id !== id));
    notify("Organisateur approuvé ✓");
  };
  const rejectOrg = (id) => {
    setPendingOrgs((p) => p.filter((o) => o.id !== id));
    notify("Demande rejetée.", "warning");
  };
  const resolveFlag = (id) => {
    setModItems((m) => m.map((i) => i.id === id ? { ...i, status: "Résolu" } : i));
    notify("Signalement résolu ✓");
  };
  const deleteUser = (id) => {
    setUsers((u) => u.filter((x) => x.id !== id));
    notify("Utilisateur supprimé.", "warning");
  };
  const addCategory = () => {
    if (!newCat.trim()) return;
    setCategories((c) => [...c, { id: Date.now(), name: newCat, events: 0, color: "#6366f1", icon: "🏷️" }]);
    setNewCat("");
    notify("Catégorie ajoutée ✓");
  };

  const inp = {
    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8,
    padding: "9px 14px", fontSize: 14, color: C.text, fontFamily: "inherit",
    outline: "none", width: "100%", boxSizing: "border-box",
  };

  const renderContent = () => {
    if (active === "stats") return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>Global Statistics</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 14 }}>Overview of your university events platform</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          <StatCard label="Total Users" value="12,458" icon="👥" iconBg="#dbeafe" change="+12.5%" changeLabel="vs last month" />
          <StatCard label="Pending Organizers" value="23" icon="🧑‍💼" iconBg="#fef3c7" change="+3" changeLabel="vs last month" />
          <StatCard label="Live Events" value="847" icon="📅" iconBg="#dcfce7" change="+127" changeLabel="vs last month" />
          <StatCard label="Monthly Revenue" value="$48,329" icon="💵" iconBg="#f3e8ff" change="+8.2%" changeLabel="vs last month" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={{ background: C.card, borderRadius: 14, padding: "24px", border: `1px solid ${C.border}` }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>Event Attendance Trends</h2>
            <p style={{ margin: "0 0 20px", color: C.muted, fontSize: 13 }}>Total event attendance over the past 12 months</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={ATTENDANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.muted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: C.muted }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }} />
                <Line type="monotone" dataKey="attendance" stroke={C.primary} strokeWidth={2.5} dot={{ fill: C.primary, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: C.card, borderRadius: 14, padding: "24px", border: `1px solid ${C.border}` }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>Events by Category</h2>
            <p style={{ margin: "0 0 16px", color: C.muted, fontSize: 13 }}>Distribution this year</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={CATEGORY_DATA} dataKey="value" cx="50%" cy="50%" outerRadius={75} innerRadius={40}>
                  {CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {CATEGORY_DATA.map((c) => (
                <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color }} />
                    <span style={{ color: C.muted }}>{c.name}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: C.text }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: C.card, borderRadius: 14, padding: "24px", border: `1px solid ${C.border}` }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>Monthly Revenue</h2>
          <p style={{ margin: "0 0 20px", color: C.muted, fontSize: 13 }}>Revenue evolution over the past 12 months</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: C.muted }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }} />
              <Bar dataKey="revenue" fill={C.primary} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );

    if (active === "users") return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>User Management</h1>
            <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 14 }}>{users.length} utilisateurs enregistrés</p>
          </div>
        </div>
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {["Nom", "Email", "Rôle", "Statut", "Événements", "Inscription", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: C.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                const s = statusStyle(u.status);
                return (
                  <tr key={u.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: C.primary }}>
                          {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span style={{ fontWeight: 600, color: C.text }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: C.muted }}>{u.email}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <Badge label={u.role} color={u.role === "Organisateur" ? "#7c3aed" : C.info} bg={u.role === "Organisateur" ? "#ede9fe" : C.infoBg} />
                    </td>
                    <td style={{ padding: "14px 16px" }}><Badge label={u.status} color={s.color} bg={s.bg} /></td>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: C.text }}>{u.events}</td>
                    <td style={{ padding: "14px 16px", color: C.muted }}>{new Date(u.joined).toLocaleDateString("fr-FR")}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <button onClick={() => deleteUser(u.id)} style={{ background: C.dangerBg, color: C.danger, border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Supprimer</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );

    if (active === "categories") return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>Category Management</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 14 }}>Gérez les catégories d'événements</p>
        </div>
        <div style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: C.text }}>Ajouter une catégorie</h3>
          <div style={{ display: "flex", gap: 10 }}>
            <input style={{ ...inp, flex: 1 }} value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Nom de la catégorie..." />
            <button onClick={addCategory} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 8, padding: "0 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>+ Ajouter</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ background: C.card, borderRadius: 12, padding: "20px", border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: cat.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{cat.icon}</div>
                  <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{cat.name}</span>
                </div>
                <button onClick={() => setCategories((c) => c.filter((x) => x.id !== cat.id))} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16, padding: 4 }}>✕</button>
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: cat.color, marginBottom: 4 }}>{cat.events}</div>
              <div style={{ fontSize: 12, color: C.muted }}>événements</div>
              <div style={{ marginTop: 10, background: C.bg, borderRadius: 999, height: 4, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, (cat.events / 200) * 100)}%`, height: "100%", background: cat.color, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if (active === "approval") return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>Organizer Approval</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 14 }}>{pendingOrgs.length} demande(s) en attente</p>
        </div>
        {pendingOrgs.length === 0 ? (
          <div style={{ background: C.card, borderRadius: 14, padding: "60px 24px", border: `1px solid ${C.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>Aucune demande en attente</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>Toutes les demandes ont été traitées</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {pendingOrgs.map((org) => (
              <div key={org.id} style={{ background: C.card, borderRadius: 14, padding: "20px 24px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.warningBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: C.warning }}>
                    {org.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{org.name}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{org.email}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <Badge label={org.dept} color={C.info} bg={C.infoBg} />
                      <Badge label={org.reason} color={C.warning} bg={C.warningBg} />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.muted }}>{new Date(org.date).toLocaleDateString("fr-FR")}</span>
                  <button onClick={() => rejectOrg(org.id)} style={{ background: C.dangerBg, color: C.danger, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Rejeter</button>
                  <button onClick={() => approveOrg(org.id)} style={{ background: C.success, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Approuver</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    if (active === "moderation") return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>Content Moderation</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 14 }}>Signalements et contenus à vérifier</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {modItems.map((item) => {
            const s = statusStyle(item.status);
            return (
              <div key={item.id} style={{ background: C.card, borderRadius: 14, padding: "20px 24px", border: `1px solid ${item.status === "En attente" ? "#fca5a5" : C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>Organisateur: {item.organizer}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Badge label={`⚠️ ${item.flag}`} color={C.danger} bg={C.dangerBg} />
                    <Badge label={item.status} color={s.color} bg={s.bg} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.muted }}>{new Date(item.date).toLocaleDateString("fr-FR")}</span>
                  {item.status === "En attente" && (
                    <button onClick={() => resolveFlag(item.id)} style={{ background: C.success, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Résoudre</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Notification */}
      {notification && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, background: notification.type === "success" ? C.success : C.warning, color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
          {notification.msg}
        </div>
      )}

      {/* Sidebar */}
      <div style={{ width: 220, background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: "0 0 16px", flexShrink: 0 }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: C.primary, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🎓</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>UniEvents</div>
            <div style={{ fontSize: 11, color: C.muted }}>Admin Portal</div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "16px 10px" }}>
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
                background: active === item.id ? C.primary : "transparent",
                color: active === item.id ? "#fff" : C.muted,
                fontSize: 13, fontWeight: active === item.id ? 600 : 500,
                fontFamily: "inherit", marginBottom: 2, textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>AD</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Admin User</div>
            <div style={{ fontSize: 11, color: C.muted }}>admin@university.edu</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>
        {renderContent()}
      </div>
    </div>
  );
}