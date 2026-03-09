import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const css = `
${FONTS}
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
html, body { height: 100%; background: #0f0f1a; }

:root {
  --ink: #1a1a2e;
  --ink2: #2d2d4e;
  --slate: #4a4a6a;
  --muted: #8888aa;
  --border: #e2e2ee;
  --surface: #f7f7fc;
  --white: #ffffff;
  --gold: #c9a84c;
  --gold-light: #f5e9cc;
  --green: #2d7a5f;
  --green-light: #d4ede5;
  --red: #8b3a3a;
  --red-light: #f5dada;
  --blue: #2d5f8b;
  --blue-light: #dae8f5;
  --bg-dark: #0f0f1a;
  --bg-card: #1a1a2e;
  --bg-card2: #22223a;
}

.app {
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--bg-dark);
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow: hidden;
}

/* TOP BAR */
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px 14px;
  background: var(--bg-dark);
  position: relative; z-index: 10;
}
.logo { font-family: 'DM Serif Display', serif; font-size: 18px; color: white; }
.logo span { color: var(--gold); }
.logo-sub { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px; }
.staff-pill {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-card2);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 6px 12px 6px 8px;
}
.staff-avatar {
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--gold); color: var(--ink);
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 700; font-family: 'DM Mono', monospace;
}
.staff-name { font-size: 12px; color: rgba(255,255,255,0.7); }

/* SCREEN WRAPPER */
.screen { padding: 0 20px 32px; }

/* SCAN SCREEN */
.scan-hero {
  margin: 0 -20px;
  position: relative;
  background: #000;
  overflow: hidden;
}
.camera-viewport {
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  background: #000;
}
.camera-viewport video {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.scan-overlay {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
}
.scan-frame {
  width: 200px; height: 200px;
  position: relative;
}
.scan-corner {
  position: absolute;
  width: 28px; height: 28px;
  border-color: var(--gold);
  border-style: solid;
  border-width: 0;
}
.scan-corner.tl { top: 0; left: 0; border-top-width: 3px; border-left-width: 3px; border-radius: 4px 0 0 0; }
.scan-corner.tr { top: 0; right: 0; border-top-width: 3px; border-right-width: 3px; border-radius: 0 4px 0 0; }
.scan-corner.bl { bottom: 0; left: 0; border-bottom-width: 3px; border-left-width: 3px; border-radius: 0 0 0 4px; }
.scan-corner.br { bottom: 0; right: 0; border-bottom-width: 3px; border-right-width: 3px; border-radius: 0 0 4px 0; }
.scan-line {
  position: absolute;
  left: 4px; right: 4px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  animation: scanline 2s ease-in-out infinite;
}
@keyframes scanline {
  0% { top: 8px; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: calc(100% - 8px); opacity: 0; }
}
.scan-dim {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.45);
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 100%, 0% 100%,
    0% 0%,
    calc(50% - 100px) calc(50% - 100px),
    calc(50% - 100px) calc(50% + 100px),
    calc(50% + 100px) calc(50% + 100px),
    calc(50% + 100px) calc(50% - 100px),
    calc(50% - 100px) calc(50% - 100px)
  );
}
.scan-status-bar {
  background: var(--bg-card);
  padding: 12px 20px;
  display: flex; align-items: center; gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.scan-status-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--gold);
  animation: pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
.scan-status-dot.inactive { background: var(--muted); animation: none; }
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
.scan-status-text { font-size: 12.5px; color: rgba(255,255,255,0.6); font-family: 'DM Mono', monospace; }

.scan-instructions {
  padding: 20px 0 16px;
  text-align: center;
}
.scan-instructions-title { font-size: 18px; color: white; font-weight: 600; margin-bottom: 6px; }
.scan-instructions-sub { font-size: 13px; color: var(--muted); line-height: 1.5; }

.demo-cases {
  margin-top: 4px;
}
.demo-label {
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--muted); font-family: 'DM Mono', monospace;
  margin-bottom: 10px;
}
.demo-case-btn {
  display: flex; align-items: center; gap: 12px;
  width: 100%;
  background: var(--bg-card2);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}
.demo-case-btn:hover, .demo-case-btn:active { border-color: var(--gold); background: rgba(201,168,76,0.08); }
.demo-qr { font-size: 26px; opacity: 0.8; }
.demo-case-name { font-size: 13.5px; color: white; font-weight: 500; }
.demo-case-id { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--gold); margin-top: 2px; }
.demo-case-loc { font-size: 11px; color: var(--muted); margin-top: 1px; }

/* CONFIRM SCREEN */
.case-card {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}
.case-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--gold), transparent);
}
.scanned-label {
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--gold); font-family: 'DM Mono', monospace;
  margin-bottom: 10px;
  display: flex; align-items: center; gap: 6px;
}
.scanned-label::before { content: '✓'; font-size: 12px; }
.case-name { font-family: 'DM Serif Display', serif; font-size: 22px; color: white; margin-bottom: 6px; line-height: 1.2; }
.case-id-tag {
  display: inline-flex; align-items: center;
  background: rgba(201,168,76,0.15);
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 6px;
  padding: 3px 10px;
  font-family: 'DM Mono', monospace;
  font-size: 12px; color: var(--gold);
  margin-bottom: 14px;
}
.case-meta-row { display: flex; gap: 16px; margin-bottom: 4px; }
.case-meta-item { flex: 1; }
.case-meta-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; font-family: 'DM Mono', monospace; margin-bottom: 3px; }
.case-meta-value { font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 500; }
.current-loc {
  margin-top: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex; align-items: center; gap: 8px;
}
.loc-icon { font-size: 14px; }
.loc-text { font-family: 'DM Mono', monospace; font-size: 12px; color: rgba(255,255,255,0.6); }
.loc-text strong { color: rgba(255,255,255,0.85); }

/* SECTION */
.section-title {
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--muted); font-family: 'DM Mono', monospace;
  margin-bottom: 10px;
}

/* ACTION SELECTOR */
.action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
.action-btn {
  background: var(--bg-card2);
  border: 2px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 14px 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
  color: rgba(255,255,255,0.6);
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
}
.action-btn:hover, .action-btn:active { border-color: var(--gold); color: white; background: rgba(201,168,76,0.08); }
.action-btn.selected { border-color: var(--gold); color: white; background: rgba(201,168,76,0.12); }
.action-btn-icon { font-size: 22px; margin-bottom: 6px; }
.action-btn-label { font-size: 12.5px; font-weight: 500; }

/* LOCATION PICKER */
.loc-picker { margin-bottom: 20px; }
.loc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.loc-select {
  background: var(--bg-card2);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  padding: 11px 14px;
  color: white;
  font-size: 13.5px;
  font-family: 'DM Sans', sans-serif;
  outline: none;
  width: 100%;
  -webkit-appearance: none;
}
.loc-select:focus { border-color: var(--gold); }

/* VERIFY CHECKLIST */
.verify-list { margin-bottom: 20px; }
.verify-item {
  display: flex; align-items: center; gap: 14px;
  background: var(--bg-card2);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.15s;
  -webkit-user-select: none; user-select: none;
}
.verify-item.checked { border-color: var(--green); background: rgba(45,122,95,0.1); }
.verify-check-circle {
  width: 30px; height: 30px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  transition: all 0.15s;
  color: transparent;
}
.verify-item.checked .verify-check-circle {
  background: var(--green); border-color: var(--green); color: white;
}
.verify-item-label { font-size: 13.5px; color: rgba(255,255,255,0.7); }
.verify-item.checked .verify-item-label { color: white; }
.verify-item-value { font-family: 'DM Mono', monospace; font-size: 11.5px; color: var(--gold); margin-top: 3px; }

/* SUBMIT BUTTON */
.submit-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  font-size: 15px; font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.submit-btn.ready { background: var(--gold); color: var(--ink); }
.submit-btn.ready:active { transform: scale(0.98); }
.submit-btn.disabled { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3); cursor: not-allowed; }
.submit-btn.danger { background: var(--red); color: white; }
.submit-btn.success-btn { background: var(--green); color: white; }

/* SUCCESS SCREEN */
.success-screen {
  display: flex; flex-direction: column; align-items: center;
  padding: 40px 20px;
  text-align: center;
}
.success-ring {
  width: 90px; height: 90px; border-radius: 50%;
  background: rgba(45,122,95,0.15);
  border: 3px solid var(--green);
  display: flex; align-items: center; justify-content: center;
  font-size: 38px;
  margin-bottom: 24px;
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes popIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.success-title { font-family: 'DM Serif Display', serif; font-size: 26px; color: white; margin-bottom: 8px; }
.success-sub { font-size: 14px; color: var(--muted); margin-bottom: 28px; line-height: 1.5; }
.success-log-entry {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 16px;
  text-align: left;
  margin-bottom: 20px;
}
.log-entry-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); font-family: 'DM Mono', monospace; margin-bottom: 8px; }
.log-entry-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.log-entry-row:last-child { border-bottom: none; }
.log-entry-key { font-size: 12px; color: var(--muted); }
.log-entry-val { font-size: 12px; color: rgba(255,255,255,0.8); font-family: 'DM Mono', monospace; font-weight: 500; }

/* BACK BTN */
.back-btn {
  display: flex; align-items: center; gap: 6px;
  background: none; border: none;
  color: var(--muted); font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer; padding: 0 0 16px 0;
}
.back-btn:active { color: white; }

/* CAMERA PERMISSION */
.cam-permission {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 24px 20px;
  text-align: center;
  margin-bottom: 16px;
}
.cam-icon { font-size: 36px; margin-bottom: 12px; }
.cam-title { font-size: 16px; color: white; font-weight: 600; margin-bottom: 6px; }
.cam-sub { font-size: 13px; color: var(--muted); margin-bottom: 16px; line-height: 1.5; }
.cam-btn {
  background: var(--gold); color: var(--ink);
  border: none; border-radius: 8px;
  padding: 11px 22px;
  font-size: 14px; font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
}

.note { font-size: 11.5px; color: var(--muted); text-align: center; margin-top: 12px; line-height: 1.5; }

/* Transport extra fields */
.extra-field { margin-bottom: 10px; }
.extra-input {
  width: 100%;
  background: var(--bg-card2);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  padding: 11px 14px;
  color: white;
  font-size: 13.5px;
  font-family: 'DM Sans', sans-serif;
  outline: none;
}
.extra-input::placeholder { color: rgba(255,255,255,0.25); }
.extra-input:focus { border-color: var(--gold); }
.extra-label { font-size: 10.5px; color: var(--muted); font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 5px; }
`;

// ── Demo cases that simulate scanning ──────────────────────────────────────
const DEMO_CASES = [
  {
    id: "CL-2024-0041",
    name: "Margaret Elaine Foster",
    dob: "1941-03-12",
    dod: "2024-11-14",
    location: { cooler: "Cooler 2", shelf: "Shelf B3", room: "Mortuary Room A" },
    status: "In Storage",
    kin: "Robert Foster (Son)",
  },
  {
    id: "CL-2024-0042",
    name: "Samuel James Okonkwo",
    dob: "1958-07-22",
    dod: "2024-11-15",
    location: { cooler: "Cooler 1", shelf: "Shelf A1", room: "Mortuary Room B" },
    status: "Awaiting Release",
    kin: "Amara Okonkwo (Wife)",
  },
  {
    id: "CL-2024-0043",
    name: "Beatrice Anne Naidoo",
    dob: "1972-11-03",
    dod: "2024-11-16",
    location: { cooler: "Cooler 3", shelf: "Shelf A2", room: "Mortuary Room A" },
    status: "In Preparation",
    kin: "Priya Naidoo (Daughter)",
  },
];

const ACTIONS = [
  { id: "move", icon: "📦", label: "Move to Storage" },
  { id: "prep", icon: "🔧", label: "Remove for Prep" },
  { id: "transport", icon: "🚐", label: "Release for Transport" },
  { id: "return", icon: "↩️", label: "Return to Storage" },
];

function getNow() {
  const now = new Date();
  return {
    time: now.toTimeString().slice(0, 5),
    date: now.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }),
  };
}

// ── Camera / QR hook ────────────────────────────────────────────────────────
function useCamera(active) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [camState, setCamState] = useState("idle"); // idle | requesting | active | denied | unsupported

  useEffect(() => {
    if (!active) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setCamState("idle");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) { setCamState("unsupported"); return; }
    setCamState("requesting");
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; }
        setCamState("active");
      })
      .catch(() => setCamState("denied"));
    return () => {
      if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    };
  }, [active]);

  // Attach stream when video element mounts
  const setVideoRef = (el) => {
    videoRef.current = el;
    if (el && streamRef.current) { el.srcObject = streamRef.current; }
  };

  return { camState, videoRef: setVideoRef };
}

// ── Screens ─────────────────────────────────────────────────────────────────

function ScanScreen({ onScanned }) {
  const [camActive, setCamActive] = useState(false);
  const { camState, videoRef } = useCamera(camActive);

  // In a real build, jsQR runs here on requestAnimationFrame
  // For this prototype we simulate with demo buttons

  return (
    <div>
      <div className="scan-hero">
        <div className="camera-viewport">
          {camActive && camState === "active" ? (
            <video ref={videoRef} autoPlay playsInline muted style={{width:"100%",height:"100%",objectFit:"cover"}} />
          ) : (
            <div style={{width:"100%",height:"100%",background:"#000",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{textAlign:"center",color:"rgba(255,255,255,0.2)"}}>
                <div style={{fontSize:48,marginBottom:8}}>📷</div>
                <div style={{fontSize:12,fontFamily:"DM Mono,monospace"}}>Camera inactive</div>
              </div>
            </div>
          )}
          <div className="scan-dim" />
          <div className="scan-overlay">
            <div className="scan-frame">
              <div className="scan-corner tl" /><div className="scan-corner tr" />
              <div className="scan-corner bl" /><div className="scan-corner br" />
              {camActive && camState === "active" && <div className="scan-line" />}
            </div>
          </div>
        </div>
        <div className="scan-status-bar">
          <div className={`scan-status-dot ${camState === "active" ? "" : "inactive"}`} />
          <div className="scan-status-text">
            {camState === "active" ? "Camera active — point at QR tag" :
             camState === "requesting" ? "Requesting camera access…" :
             camState === "denied" ? "Camera access denied" :
             camState === "unsupported" ? "Camera not supported" :
             "Camera inactive"}
          </div>
        </div>
      </div>

      <div className="screen">
        <div className="scan-instructions">
          <div className="scan-instructions-title">Scan ID Tag</div>
          <div className="scan-instructions-sub">Hold the QR code on the deceased's tag within the frame. The case will open automatically.</div>
        </div>

        {!camActive && camState !== "denied" && (
          <div className="cam-permission">
            <div className="cam-icon">📷</div>
            <div className="cam-title">Enable Camera</div>
            <div className="cam-sub">Allow access to your camera to scan QR tags on the floor.</div>
            <button className="cam-btn" onClick={() => setCamActive(true)}>Enable Camera</button>
          </div>
        )}

        {camState === "denied" && (
          <div className="cam-permission">
            <div className="cam-icon">🚫</div>
            <div className="cam-title">Camera Access Denied</div>
            <div className="cam-sub">Enable camera permissions in your browser settings to scan QR tags.</div>
          </div>
        )}

        <div className="demo-cases">
          <div className="demo-label">— Tap a case to simulate a scan —</div>
          {DEMO_CASES.map(c => (
            <button key={c.id} className="demo-case-btn" onClick={() => onScanned(c)}>
              <div className="demo-qr">⬛</div>
              <div>
                <div className="demo-case-name">{c.name}</div>
                <div className="demo-case-id">{c.id}</div>
                <div className="demo-case-loc">{c.location.cooler} · {c.location.shelf}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="note">In production, the phone camera reads the QR code automatically using jsQR — no button taps needed.</div>
      </div>
    </div>
  );
}

function MovementScreen({ caseData, onBack, onDone }) {
  const [action, setAction] = useState(null);
  const [checks, setChecks] = useState([false, false, false]);
  const [newCooler, setNewCooler] = useState("Cooler 2");
  const [newShelf, setNewShelf] = useState("B1");
  const [driverName, setDriverName] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const allChecked = checks.every(Boolean);
  const toggle = i => setChecks(c => c.map((v, idx) => idx === i ? !v : v));

  const canSubmit = action && allChecked &&
    (action !== "transport" || (driverName && vehicleId));

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const { time, date } = getNow();
      const actionLabels = {
        move: `Moved to ${newCooler} — Shelf ${newShelf}`,
        prep: `Removed for preparation`,
        transport: `Released for transport — Driver: ${driverName}, Vehicle: ${vehicleId}`,
        return: `Returned to storage — ${newCooler} Shelf ${newShelf}`,
      };
      onDone({
        caseId: caseData.id,
        caseName: caseData.name,
        action: actionLabels[action],
        time, date,
        newLocation: (action === "move" || action === "return")
          ? `${newCooler} · Shelf ${newShelf}`
          : caseData.location.shelf,
      });
    }, 800);
  };

  return (
    <div className="screen" style={{paddingTop:16}}>
      <button className="back-btn" onClick={onBack}>← Back to Scan</button>

      {/* Case card */}
      <div className="case-card">
        <div className="scanned-label">QR Tag Scanned</div>
        <div className="case-name">{caseData.name}</div>
        <div className="case-id-tag">{caseData.id}</div>
        <div className="case-meta-row">
          <div className="case-meta-item">
            <div className="case-meta-label">DOB</div>
            <div className="case-meta-value">{caseData.dob}</div>
          </div>
          <div className="case-meta-item">
            <div className="case-meta-label">DOD</div>
            <div className="case-meta-value">{caseData.dod}</div>
          </div>
        </div>
        <div className="case-meta-row" style={{marginTop:8}}>
          <div className="case-meta-item">
            <div className="case-meta-label">Next of Kin</div>
            <div className="case-meta-value">{caseData.kin}</div>
          </div>
        </div>
        <div className="current-loc">
          <div className="loc-icon">📍</div>
          <div className="loc-text">Currently: <strong>{caseData.location.cooler} · {caseData.location.shelf}</strong></div>
        </div>
      </div>

      {/* Action picker */}
      <div className="section-title">Select Action</div>
      <div className="action-grid">
        {ACTIONS.map(a => (
          <button key={a.id} className={`action-btn ${action === a.id ? "selected" : ""}`} onClick={() => setAction(a.id)}>
            <div className="action-btn-icon">{a.icon}</div>
            <div className="action-btn-label">{a.label}</div>
          </button>
        ))}
      </div>

      {/* Conditional location/transport fields */}
      {(action === "move" || action === "return") && (
        <div className="loc-picker">
          <div className="section-title">New Location</div>
          <div className="loc-row">
            <select className="loc-select" value={newCooler} onChange={e => setNewCooler(e.target.value)}>
              <option>Cooler 1</option><option>Cooler 2</option><option>Cooler 3</option><option>Cooler 4</option>
            </select>
            <select className="loc-select" value={newShelf} onChange={e => setNewShelf(e.target.value)}>
              <option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>B3</option><option>B4</option>
            </select>
          </div>
        </div>
      )}

      {action === "transport" && (
        <div style={{marginBottom:16}}>
          <div className="section-title">Transport Details</div>
          <div className="extra-field">
            <div className="extra-label">Driver Name</div>
            <input className="extra-input" placeholder="Full name" value={driverName} onChange={e => setDriverName(e.target.value)} />
          </div>
          <div className="extra-field">
            <div className="extra-label">Vehicle ID / Plate</div>
            <input className="extra-input" placeholder="e.g. GP 123-456" value={vehicleId} onChange={e => setVehicleId(e.target.value)} />
          </div>
        </div>
      )}

      {/* Verification */}
      {action && (
        <>
          <div className="section-title">Verify Before Logging</div>
          <div className="verify-list">
            {[
              { label: "ID tag confirmed", value: caseData.id },
              { label: "Name visually confirmed", value: caseData.name },
              { label: "Case number confirmed", value: caseData.id },
            ].map((item, i) => (
              <div key={i} className={`verify-item ${checks[i] ? "checked" : ""}`} onClick={() => toggle(i)}>
                <div className="verify-check-circle">{checks[i] ? "✓" : ""}</div>
                <div>
                  <div className="verify-item-label">{item.label}</div>
                  <div className="verify-item-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        className={`submit-btn ${canSubmit && !submitting ? "ready" : "disabled"}`}
        onClick={canSubmit && !submitting ? handleSubmit : undefined}
        disabled={!canSubmit || submitting}
      >
        {submitting ? "Logging…" : canSubmit ? "✓ Log Movement" : action ? "Complete all checks to continue" : "Select an action above"}
      </button>
    </div>
  );
}

function SuccessScreen({ log, onReset }) {
  return (
    <div className="screen">
      <div className="success-screen">
        <div className="success-ring">✓</div>
        <div className="success-title">Movement Logged</div>
        <div className="success-sub">The chain-of-custody record has been updated and synced.</div>
      </div>

      <div className="success-log-entry">
        <div className="log-entry-label">Custody Log Entry</div>
        {[
          { k: "Case ID", v: log.caseId },
          { k: "Name", v: log.caseName },
          { k: "Action", v: log.action },
          { k: "Time", v: `${log.date} · ${log.time}` },
          { k: "Staff", v: "T. Dlamini" },
        ].map(row => (
          <div className="log-entry-row" key={row.k}>
            <div className="log-entry-key">{row.k}</div>
            <div className="log-entry-val" style={{maxWidth:200,textAlign:"right",fontSize:11}}>{row.v}</div>
          </div>
        ))}
      </div>

      <button className="submit-btn success-btn" onClick={onReset} style={{marginBottom:12}}>
        ⬛ Scan Next Tag
      </button>
      <div className="note">Record saved to CustodyLedger. Visible immediately in the desktop dashboard.</div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("scan"); // scan | movement | success
  const [scannedCase, setScannedCase] = useState(null);
  const [logEntry, setLogEntry] = useState(null);

  const handleScanned = (c) => { setScannedCase(c); setScreen("movement"); };
  const handleDone = (log) => { setLogEntry(log); setScreen("success"); };
  const handleReset = () => { setScannedCase(null); setLogEntry(null); setScreen("scan"); };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="topbar">
          <div>
            <div className="logo">Custody<span>Ledger</span></div>
            <div className="logo-sub">Floor Scanner</div>
          </div>
          <div className="staff-pill">
            <div className="staff-avatar">TD</div>
            <div className="staff-name">T. Dlamini</div>
          </div>
        </div>

        {screen === "scan" && <ScanScreen onScanned={handleScanned} />}
        {screen === "movement" && scannedCase && (
          <MovementScreen
            caseData={scannedCase}
            onBack={() => setScreen("scan")}
            onDone={handleDone}
          />
        )}
        {screen === "success" && logEntry && (
          <SuccessScreen log={logEntry} onReset={handleReset} />
        )}
      </div>
    </>
  );
}
