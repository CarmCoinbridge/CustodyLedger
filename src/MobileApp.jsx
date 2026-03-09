import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const css = `
${FONTS}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{height:100%;background:#0f0f1a;font-family:'DM Sans',sans-serif;}
:root{
  --ink:#141420;--gold:#c9a84c;--gold-light:#f5e9cc;
  --green:#2d7a5f;--green-light:#d4ede5;--green-border:#9fd4bc;
  --red:#8b3a3a;--red-light:#faeaea;--red-border:#e0aaaa;
  --amber:#7a4e1e;--amber-light:#faf0e0;--amber-border:#e0c090;
  --blue:#2d5f8b;--blue-light:#e4eef8;--blue-border:#a0c0e0;
  --muted:#8888aa;--border:#e2e2ee;--white:#fff;
  --bg:#0f0f1a;--bg-card:#1a1a2e;--bg-card2:#22223a;
}
.app{max-width:420px;margin:0 auto;min-height:100vh;background:var(--bg);}

/* TOPBAR */
.topbar{display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px;border-bottom:1px solid rgba(255,255,255,0.07);}
.logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:#fff;}
.logo em{color:var(--gold);font-style:normal;}
.logo-sub{font-size:9px;color:var(--muted);font-family:'DM Mono',monospace;letter-spacing:0.12em;text-transform:uppercase;margin-top:3px;}
.staff-pill{display:flex;align-items:center;gap:8px;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:5px 12px 5px 8px;}
.staff-avatar{width:24px;height:24px;border-radius:50%;background:var(--gold);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;font-family:'DM Mono',monospace;}
.staff-name{font-size:12px;color:rgba(255,255,255,0.7);}

/* SCREEN */
.screen{padding:18px 20px 32px;}

/* FACILITY BANNER */
.facility-banner{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px 16px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;}
.fac-left{display:flex;align-items:center;gap:10px;}
.fac-dot{width:8px;height:8px;border-radius:50%;background:var(--green);flex-shrink:0;}
.fac-name{font-size:14px;color:#fff;font-weight:600;}
.fac-type{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:2px;}
.fac-time{font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);}

/* DATE GREETING */
.greeting{margin-bottom:18px;}
.greeting-time{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:4px;}
.greeting-text{font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;font-weight:400;}
.greeting-text em{color:var(--gold);font-style:normal;}

/* ACTIVITY CARD */
.activity-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:14px;position:relative;overflow:hidden;}
.activity-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),transparent);}
.ac-title{font-size:10px;text-transform:uppercase;letter-spacing:0.13em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px;}
.ac-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.ac-item{background:var(--bg-card2);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px 12px;display:flex;align-items:center;gap:10px;}
.ac-ico{font-size:18px;flex-shrink:0;}
.ac-val{font-size:20px;font-family:'Cormorant Garamond',serif;color:#fff;font-weight:600;line-height:1;}
.ac-lbl{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:2px;}

/* ALERTS */
.alerts-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:14px;}
.alerts-title{font-size:10px;text-transform:uppercase;letter-spacing:0.13em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:10px;}
.alert-item{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:7px;border:1px solid;}
.alert-item:last-child{margin-bottom:0;}
.alert-item.warn{background:rgba(122,78,30,0.15);border-color:var(--amber-border);}
.alert-item.danger{background:rgba(139,58,58,0.15);border-color:var(--red-border);}
.alert-item.info{background:rgba(45,95,139,0.15);border-color:var(--blue-border);}
.alert-item.success{background:rgba(45,122,95,0.15);border-color:var(--green-border);}
.alert-ico{font-size:14px;margin-top:1px;flex-shrink:0;}
.alert-txt{font-size:12.5px;color:rgba(255,255,255,0.8);font-weight:500;}
.alert-sub{font-size:10.5px;color:var(--muted);margin-top:2px;font-family:'DM Mono',monospace;}

/* SCAN BUTTON */
.scan-btn{width:100%;padding:18px;border-radius:14px;background:var(--gold);color:var(--ink);border:none;font-size:16px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:12px;transition:all 0.15s;}
.scan-btn:active{transform:scale(0.98);}
.scan-btn-ico{font-size:22px;}

.quick-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}
.qa-btn{background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:13px 12px;text-align:center;cursor:pointer;transition:all 0.13s;color:rgba(255,255,255,0.6);font-size:12.5px;font-family:'DM Sans',sans-serif;}
.qa-btn:active{border-color:var(--gold);background:rgba(201,168,76,0.08);}
.qa-ico{font-size:20px;margin-bottom:5px;}

/* SCAN SCREEN */
.scan-hero{margin:0 -20px;position:relative;background:#000;overflow:hidden;}
.cam-viewport{width:100%;aspect-ratio:1;position:relative;overflow:hidden;background:#000;}
.cam-viewport video{width:100%;height:100%;object-fit:cover;display:block;}
.scan-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;}
.scan-frame{width:200px;height:200px;position:relative;}
.sc{position:absolute;width:28px;height:28px;border-color:var(--gold);border-style:solid;border-width:0;}
.sc.tl{top:0;left:0;border-top-width:3px;border-left-width:3px;border-radius:4px 0 0 0;}
.sc.tr{top:0;right:0;border-top-width:3px;border-right-width:3px;border-radius:0 4px 0 0;}
.sc.bl{bottom:0;left:0;border-bottom-width:3px;border-left-width:3px;border-radius:0 0 0 4px;}
.sc.br{bottom:0;right:0;border-bottom-width:3px;border-right-width:3px;border-radius:0 0 4px 0;}
.scan-line{position:absolute;left:4px;right:4px;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);animation:scanline 2s ease-in-out infinite;}
@keyframes scanline{0%{top:8px;opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{top:calc(100% - 8px);opacity:0;}}
.scan-dim{position:absolute;inset:0;background:rgba(0,0,0,0.45);clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,calc(50% - 100px) calc(50% - 100px),calc(50% - 100px) calc(50% + 100px),calc(50% + 100px) calc(50% + 100px),calc(50% + 100px) calc(50% - 100px),calc(50% - 100px) calc(50% - 100px));}
.scan-status{background:var(--bg-card);padding:11px 20px;display:flex;align-items:center;gap:9px;border-bottom:1px solid rgba(255,255,255,0.06);}
.scan-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);animation:pulse 1.5s ease-in-out infinite;flex-shrink:0;}
.scan-dot.off{background:var(--muted);animation:none;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(0.8);}}
.scan-status-txt{font-size:12px;color:rgba(255,255,255,0.55);font-family:'DM Mono',monospace;}

.demo-label{font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);font-family:'DM Mono',monospace;margin:16px 0 10px;}
.demo-case{display:flex;align-items:center;gap:12px;width:100%;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;margin-bottom:8px;cursor:pointer;text-align:left;transition:all 0.13s;}
.demo-case:active{border-color:var(--gold);}
.demo-qr{font-size:24px;opacity:0.8;}
.demo-name{font-size:13px;color:#fff;font-weight:500;}
.demo-id{font-family:'DM Mono',monospace;font-size:11px;color:var(--gold);margin-top:2px;}
.demo-loc{font-size:11px;color:var(--muted);margin-top:1px;}

/* MOVEMENT SCREEN */
.case-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;margin-bottom:16px;position:relative;overflow:hidden;}
.case-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),transparent);}
.cc-scanned{font-size:9px;text-transform:uppercase;letter-spacing:0.14em;color:var(--gold);font-family:'DM Mono',monospace;margin-bottom:8px;display:flex;align-items:center;gap:5px;}
.cc-scanned::before{content:'✓';}
.cc-name{font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;margin-bottom:5px;}
.cc-id{display:inline-flex;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.25);border-radius:5px;padding:2px 9px;font-family:'DM Mono',monospace;font-size:11px;color:var(--gold);margin-bottom:12px;}
.cc-meta{display:flex;gap:14px;}
.cc-mi-lbl{font-size:9.5px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;font-family:'DM Mono',monospace;margin-bottom:2px;}
.cc-mi-val{font-size:12.5px;color:rgba(255,255,255,0.8);font-weight:500;}
.cc-loc{margin-top:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:7px;padding:9px 12px;display:flex;align-items:center;gap:7px;font-family:'DM Mono',monospace;font-size:11.5px;color:rgba(255,255,255,0.55);}
.cc-loc strong{color:rgba(255,255,255,0.8);}

.sec-title{font-size:10px;text-transform:uppercase;letter-spacing:0.13em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:10px;}
.action-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:18px;}
.action-btn{background:var(--bg-card2);border:2px solid rgba(255,255,255,0.08);border-radius:11px;padding:13px 10px;text-align:center;cursor:pointer;transition:all 0.13s;color:rgba(255,255,255,0.55);font-family:'DM Sans',sans-serif;}
.action-btn.sel{border-color:var(--gold);color:#fff;background:rgba(201,168,76,0.1);}
.action-ico{font-size:20px;margin-bottom:5px;}
.action-lbl{font-size:12px;font-weight:500;}

.loc-row{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:16px;}
.fsel{width:100%;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:10px 13px;color:#fff;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;}
.fsel:focus{border-color:var(--gold);}
.finp{width:100%;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:10px 13px;color:#fff;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;margin-bottom:9px;}
.finp::placeholder{color:rgba(255,255,255,0.25);}
.finp:focus{border-color:var(--gold);}
.flbl{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:5px;display:block;}

.verify-item{display:flex;align-items:center;gap:12px;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:13px;margin-bottom:8px;cursor:pointer;transition:all 0.13s;-webkit-user-select:none;user-select:none;}
.verify-item.checked{border-color:var(--green-border);background:rgba(45,122,95,0.1);}
.vcheck{width:28px;height:28px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;transition:all 0.13s;color:transparent;}
.verify-item.checked .vcheck{background:var(--green);border-color:var(--green);color:#fff;}
.vlbl{font-size:13px;color:rgba(255,255,255,0.7);}
.verify-item.checked .vlbl{color:#fff;}
.vval{font-family:'DM Mono',monospace;font-size:11px;color:var(--gold);margin-top:2px;}

.submit-btn{width:100%;padding:15px;border-radius:11px;border:none;font-size:15px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;}
.submit-btn.ready{background:var(--gold);color:var(--ink);}
.submit-btn.ready:active{transform:scale(0.98);}
.submit-btn.disabled{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.25);cursor:not-allowed;}

.success-screen{padding:36px 20px;text-align:center;}
.success-ring{width:76px;height:76px;border-radius:50%;background:rgba(45,122,95,0.15);border:2px solid var(--green);display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 18px;animation:pop 0.4s cubic-bezier(.34,1.56,.64,1);}
@keyframes pop{from{transform:scale(0.5);opacity:0;}to{transform:scale(1);opacity:1;}}
.success-title{font-family:'Cormorant Garamond',serif;font-size:26px;color:#fff;margin-bottom:6px;}
.success-sub{font-size:13px;color:var(--muted);margin-bottom:22px;line-height:1.5;}
.log-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:11px;padding:14px;text-align:left;margin-bottom:18px;}
.log-lbl{font-size:9.5px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:9px;}
.log-row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
.log-row:last-child{border-bottom:none;}
.log-k{font-size:11.5px;color:var(--muted);}
.log-v{font-size:11.5px;color:rgba(255,255,255,0.8);font-family:'DM Mono',monospace;text-align:right;max-width:180px;}

.back-btn{display:inline-flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;color:var(--muted);font-size:13px;font-family:'DM Sans',sans-serif;padding:0 0 14px 0;}
.note{background:var(--bg-card);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px 13px;font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:12px;}
.note strong{color:rgba(255,255,255,0.55);}

/* CAM PERMISSION */
.cam-box{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:22px 18px;text-align:center;margin-bottom:14px;}
.cam-ico{font-size:34px;margin-bottom:10px;}
.cam-title{font-size:15px;color:#fff;font-weight:600;margin-bottom:5px;}
.cam-sub{font-size:12.5px;color:var(--muted);margin-bottom:14px;line-height:1.5;}
.cam-btn{background:var(--gold);color:var(--ink);border:none;border-radius:8px;padding:10px 20px;font-size:13.5px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;}
`;

const DEMO_CASES = [
  { id:"CL-2024-0041", name:"Margaret Elaine Foster", dob:"1941-03-12", dod:"2024-11-14", location:{ cooler:"Cooler 2", shelf:"Shelf B3" }, status:"In Storage", kin:"Robert Foster (Son)" },
  { id:"CL-2024-0042", name:"Samuel James Okonkwo", dob:"1958-07-22", dod:"2024-11-15", location:{ cooler:"Cooler 1", shelf:"Shelf A1" }, status:"Awaiting Release", kin:"Amara Okonkwo (Wife)" },
  { id:"CL-2024-0044", name:"David Peter Steyn", dob:"1945-01-09", dod:"2024-11-16", location:{ cooler:"Cooler 4", shelf:"Shelf B1" }, status:"In Storage", kin:"Helen Steyn (Wife)" },
];

const ACTIONS = [
  { id:"move", ico:"📦", lbl:"Move to Storage" },
  { id:"prep", ico:"🔧", lbl:"Remove for Prep" },
  { id:"transport", ico:"🚐", lbl:"Release for Transport" },
  { id:"return", ico:"↩️", lbl:"Return to Storage" },
];

const TODAY = {
  intakes: 2,
  movements: 3,
  transports: 1,
  alerts: 4,
};

const ALERTS = [
  { type:"warn", ico:"⚠️", txt:"Release verification pending", sub:"CL-2024-0042 · S. J. Okonkwo" },
  { type:"info", ico:"🚐", txt:"Transport in progress", sub:"CL-2024-0043 · B. A. Naidoo · Avbob Crematorium" },
  { type:"success", ico:"✅", txt:"New intake completed", sub:"CL-2024-0044 · D. P. Steyn · 11:20" },
];

function getNow() {
  const d = new Date();
  return { time:d.toTimeString().slice(0,5), date:d.toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"}) };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function useCamera(active) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [camState, setCamState] = useState("idle");
  useEffect(() => {
    if (!active) { if (streamRef.current) { streamRef.current.getTracks().forEach(t=>t.stop()); streamRef.current=null; } setCamState("idle"); return; }
    if (!navigator.mediaDevices?.getUserMedia) { setCamState("unsupported"); return; }
    setCamState("requesting");
    navigator.mediaDevices.getUserMedia({ video:{ facingMode:"environment" } })
      .then(stream => { streamRef.current=stream; if (videoRef.current) videoRef.current.srcObject=stream; setCamState("active"); })
      .catch(() => setCamState("denied"));
    return () => { if (streamRef.current) { streamRef.current.getTracks().forEach(t=>t.stop()); streamRef.current=null; } };
  }, [active]);
  const setVideoRef = (el) => { videoRef.current=el; if (el && streamRef.current) el.srcObject=streamRef.current; };
  return { camState, videoRef:setVideoRef };
}

// ── HOME SCREEN ───────────────────────────────────────────────────────────────
function HomeScreen({ onScan }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-ZA", { hour:"2-digit", minute:"2-digit" });
  const dateStr = now.toLocaleDateString("en-ZA", { weekday:"long", day:"numeric", month:"long" });

  return (
    <div className="screen">
      {/* Greeting */}
      <div className="greeting">
        <div className="greeting-time">{dateStr} · {timeStr}</div>
        <div className="greeting-text">{getGreeting()}, <em>T. Dlamini</em></div>
      </div>

      {/* Facility */}
      <div className="facility-banner">
        <div className="fac-left">
          <div className="fac-dot" />
          <div>
            <div className="fac-name">Pretoria Main</div>
            <div className="fac-type">Funeral Home · Floor Staff</div>
          </div>
        </div>
        <div className="fac-time">Shift active</div>
      </div>

      {/* Today's Activity */}
      <div className="activity-card">
        <div className="ac-title">Today's Activity — Your Location</div>
        <div className="ac-grid">
          <div className="ac-item">
            <div className="ac-ico">📥</div>
            <div>
              <div className="ac-val">{TODAY.intakes}</div>
              <div className="ac-lbl">New Intakes</div>
            </div>
          </div>
          <div className="ac-item">
            <div className="ac-ico">🔄</div>
            <div>
              <div className="ac-val">{TODAY.movements}</div>
              <div className="ac-lbl">Movements</div>
            </div>
          </div>
          <div className="ac-item">
            <div className="ac-ico">🚐</div>
            <div>
              <div className="ac-val">{TODAY.transports}</div>
              <div className="ac-lbl">Transports</div>
            </div>
          </div>
          <div className="ac-item">
            <div className="ac-ico">📧</div>
            <div>
              <div className="ac-val">{TODAY.alerts}</div>
              <div className="ac-lbl">Alerts Sent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="alerts-card">
        <div className="alerts-title">Active Alerts — Your Location</div>
        {ALERTS.map((a,i) => (
          <div key={i} className={`alert-item ${a.type}`}>
            <div className="alert-ico">{a.ico}</div>
            <div>
              <div className="alert-txt">{a.txt}</div>
              <div className="alert-sub">{a.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scan Button */}
      <button className="scan-btn" onClick={onScan}>
        <span className="scan-btn-ico">⬛</span>
        Scan ID Tag
      </button>

      {/* Quick Actions */}
      <div className="quick-actions">
        {[
          { ico:"📋", lbl:"Active Cases" },
          { ico:"❄️", lbl:"Storage Map" },
          { ico:"📊", lbl:"Shift Log" },
          { ico:"🔔", lbl:"All Alerts" },
        ].map((a,i) => (
          <div key={i} className="qa-btn">
            <div className="qa-ico">{a.ico}</div>
            {a.lbl}
          </div>
        ))}
      </div>

      <div className="note">
        📱 <strong>Tip:</strong> Tap "Scan ID Tag" to log any movement. All actions are timestamped and synced to the dashboard instantly.
      </div>
    </div>
  );
}

// ── SCAN SCREEN ───────────────────────────────────────────────────────────────
function ScanScreen({ onScanned, onBack }) {
  const [camActive, setCamActive] = useState(false);
  const { camState, videoRef } = useCamera(camActive);

  return (
    <div>
      <div className="scan-hero">
        <div className="cam-viewport">
          {camActive && camState === "active"
            ? <video ref={videoRef} autoPlay playsInline muted style={{width:"100%",height:"100%",objectFit:"cover"}} />
            : <div style={{width:"100%",height:"100%",background:"#000",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{textAlign:"center",color:"rgba(255,255,255,0.15)"}}>
                  <div style={{fontSize:44,marginBottom:8}}>📷</div>
                  <div style={{fontSize:11,fontFamily:"DM Mono,monospace"}}>Camera inactive</div>
                </div>
              </div>
          }
          <div className="scan-dim" />
          <div className="scan-overlay">
            <div className="scan-frame">
              <div className="sc tl"/><div className="sc tr"/>
              <div className="sc bl"/><div className="sc br"/>
              {camActive && camState==="active" && <div className="scan-line"/>}
            </div>
          </div>
        </div>
        <div className="scan-status">
          <div className={`scan-dot ${camState==="active"?"":"off"}`}/>
          <div className="scan-status-txt">
            {camState==="active" ? "Camera active — point at QR tag" :
             camState==="requesting" ? "Requesting camera access…" :
             camState==="denied" ? "Camera access denied" :
             "Camera inactive"}
          </div>
        </div>
      </div>

      <div className="screen">
        <button className="back-btn" onClick={onBack}>← Back to Shift</button>

        {!camActive && camState !== "denied" && (
          <div className="cam-box">
            <div className="cam-ico">📷</div>
            <div className="cam-title">Enable Camera</div>
            <div className="cam-sub">Allow camera access to scan QR tags on the floor.</div>
            <button className="cam-btn" onClick={() => setCamActive(true)}>Enable Camera</button>
          </div>
        )}

        {camState === "denied" && (
          <div className="cam-box">
            <div className="cam-ico">🚫</div>
            <div className="cam-title">Camera Access Denied</div>
            <div className="cam-sub">Enable camera permissions in your browser settings.</div>
          </div>
        )}

        <div className="demo-label">— Tap a case to simulate a scan —</div>
        {DEMO_CASES.map(c => (
          <button key={c.id} className="demo-case" onClick={() => onScanned(c)}>
            <div className="demo-qr">⬛</div>
            <div>
              <div className="demo-name">{c.name}</div>
              <div className="demo-id">{c.id}</div>
              <div className="demo-loc">{c.location.cooler} · {c.location.shelf}</div>
            </div>
          </button>
        ))}
        <div className="note" style={{marginTop:8}}>In production, the camera reads QR codes automatically using jsQR — no tapping needed.</div>
      </div>
    </div>
  );
}

// ── MOVEMENT SCREEN ───────────────────────────────────────────────────────────
function MovementScreen({ c, onBack, onDone }) {
  const [action, setAction] = useState(null);
  const [checks, setChecks] = useState([false,false,false]);
  const [cooler, setCooler] = useState("Cooler 2");
  const [shelf, setShelf] = useState("B1");
  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toggle = i => setChecks(c => c.map((v,idx) => idx===i?!v:v));
  const allChecked = checks.every(Boolean);
  const canSubmit = action && allChecked && (action!=="transport"||(driver&&vehicle));

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const {time,date} = getNow();
      const labels = {
        move:`Moved to ${cooler} — Shelf ${shelf}`,
        prep:`Removed for preparation`,
        transport:`Released for transport — Driver: ${driver}, Vehicle: ${vehicle}`,
        return:`Returned to storage — ${cooler} Shelf ${shelf}`,
      };
      onDone({ caseId:c.id, caseName:c.name, action:labels[action], time, date });
    }, 800);
  };

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back to Scan</button>
      <div className="case-card">
        <div className="cc-scanned">QR Tag Scanned</div>
        <div className="cc-name">{c.name}</div>
        <div className="cc-id">{c.id}</div>
        <div className="cc-meta">
          <div><div className="cc-mi-lbl">DOB</div><div className="cc-mi-val">{c.dob}</div></div>
          <div><div className="cc-mi-lbl">Status</div><div className="cc-mi-val">{c.status}</div></div>
        </div>
        <div className="cc-loc">📍 Currently: <strong>&nbsp;{c.location.cooler} · {c.location.shelf}</strong></div>
      </div>

      <div className="sec-title">Select Action</div>
      <div className="action-grid">
        {ACTIONS.map(a => (
          <div key={a.id} className={`action-btn ${action===a.id?"sel":""}`} onClick={() => setAction(a.id)}>
            <div className="action-ico">{a.ico}</div>
            <div className="action-lbl">{a.lbl}</div>
          </div>
        ))}
      </div>

      {(action==="move"||action==="return") && (
        <>
          <div className="sec-title">New Location</div>
          <div className="loc-row">
            <select className="fsel" value={cooler} onChange={e=>setCooler(e.target.value)}>
              <option>Cooler 1</option><option>Cooler 2</option><option>Cooler 3</option><option>Cooler 4</option>
            </select>
            <select className="fsel" value={shelf} onChange={e=>setShelf(e.target.value)}>
              <option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>B3</option>
            </select>
          </div>
        </>
      )}

      {action==="transport" && (
        <>
          <div className="sec-title">Transport Details</div>
          <label className="flbl">Driver Name</label>
          <input className="finp" placeholder="Full name" value={driver} onChange={e=>setDriver(e.target.value)}/>
          <label className="flbl">Vehicle Plate</label>
          <input className="finp" placeholder="e.g. GP 445-231" value={vehicle} onChange={e=>setVehicle(e.target.value)}/>
        </>
      )}

      {action && (
        <>
          <div className="sec-title">Verify Before Logging</div>
          {[
            {l:"ID tag confirmed",v:c.id},
            {l:"Name visually confirmed",v:c.name},
            {l:"Case number confirmed",v:c.id},
          ].map((item,i) => (
            <div key={i} className={`verify-item ${checks[i]?"checked":""}`} onClick={() => toggle(i)}>
              <div className="vcheck">{checks[i]?"✓":""}</div>
              <div><div className="vlbl">{item.l}</div><div className="vval">{item.v}</div></div>
            </div>
          ))}
        </>
      )}

      <button className={`submit-btn ${canSubmit&&!submitting?"ready":"disabled"}`}
        onClick={canSubmit&&!submitting?handleSubmit:undefined}>
        {submitting?"Logging…":canSubmit?"✓ Log Movement":action?"Complete all checks":"Select an action above"}
      </button>
    </div>
  );
}

// ── SUCCESS SCREEN ────────────────────────────────────────────────────────────
function SuccessScreen({ log, onReset }) {
  return (
    <div className="screen">
      <div className="success-screen">
        <div className="success-ring">✓</div>
        <div className="success-title">Movement Logged</div>
        <div className="success-sub">Custody record updated and synced to dashboard.</div>
      </div>
      <div className="log-card">
        <div className="log-lbl">Custody Log Entry</div>
        {[
          {k:"Case ID",v:log.caseId},
          {k:"Name",v:log.caseName},
          {k:"Action",v:log.action},
          {k:"Time",v:`${log.date} · ${log.time}`},
          {k:"Staff",v:"T. Dlamini"},
        ].map(row => (
          <div className="log-row" key={row.k}>
            <div className="log-k">{row.k}</div>
            <div className="log-v" style={{fontSize:10.5}}>{row.v}</div>
          </div>
        ))}
      </div>
      <button className="submit-btn ready" onClick={onReset} style={{marginBottom:12}}>
        ⬛ Scan Next Tag
      </button>
      <div className="note">📧 <strong>Admin notified.</strong> Visible on dashboard immediately.</div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home"); // home | scan | movement | success
  const [scannedCase, setScannedCase] = useState(null);
  const [logEntry, setLogEntry] = useState(null);

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="topbar">
          <div>
            <div className="logo">Custody<em>Ledger</em></div>
            <div className="logo-sub">Floor Scanner</div>
          </div>
          <div className="staff-pill">
            <div className="staff-avatar">TD</div>
            <div className="staff-name">T. Dlamini</div>
          </div>
        </div>

        {screen==="home" && <HomeScreen onScan={() => setScreen("scan")} />}
        {screen==="scan" && <ScanScreen onScanned={c => { setScannedCase(c); setScreen("movement"); }} onBack={() => setScreen("home")} />}
        {screen==="movement" && scannedCase && <MovementScreen c={scannedCase} onBack={() => setScreen("scan")} onDone={log => { setLogEntry(log); setScreen("success"); }} />}
        {screen==="success" && logEntry && <SuccessScreen log={logEntry} onReset={() => { setScannedCase(null); setLogEntry(null); setScreen("home"); }} />}
      </div>
    </>
  );
}
