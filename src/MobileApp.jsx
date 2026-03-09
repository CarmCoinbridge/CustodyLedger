import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const css = `
${FONTS}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{height:100%;background:#0f0f1a;font-family:'DM Sans',sans-serif;}
:root{
  --ink:#141420;--gold:#c9a84c;
  --green:#2d7a5f;--green-border:#9fd4bc;
  --red:#8b3a3a;--red-border:#e0aaaa;
  --amber-border:#e0c090;--blue-border:#a0c0e0;
  --muted:#8888aa;
  --bg:#0f0f1a;--bg-card:#1a1a2e;--bg-card2:#22223a;
}
.app{max-width:420px;margin:0 auto;min-height:100vh;background:var(--bg);padding-bottom:72px;}

/* TOPBAR */
.topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 13px;border-bottom:1px solid rgba(255,255,255,0.07);position:sticky;top:0;background:var(--bg);z-index:50;}
.logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:#fff;}
.logo em{color:var(--gold);font-style:normal;}
.logo-sub{font-size:9px;color:var(--muted);font-family:'DM Mono',monospace;letter-spacing:0.12em;text-transform:uppercase;margin-top:2px;}
.staff-pill{display:flex;align-items:center;gap:7px;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:5px 11px 5px 7px;}
.staff-avatar{width:24px;height:24px;border-radius:50%;background:var(--gold);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;font-family:'DM Mono',monospace;}
.staff-name{font-size:12px;color:rgba(255,255,255,0.7);}

/* BOTTOM NAV */
.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:420px;background:var(--bg-card);border-top:1px solid rgba(255,255,255,0.08);display:flex;z-index:100;}
.bn-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px 4px 8px;cursor:pointer;border:none;background:none;}
.bn-ico{font-size:18px;margin-bottom:3px;}
.bn-lbl{font-size:9.5px;font-family:'DM Mono',monospace;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;}
.bn-item.on .bn-lbl{color:var(--gold);}

/* SCREEN */
.screen{padding:18px 20px 16px;}

/* GREETING */
.greeting{margin-bottom:16px;}
.greeting-time{font-size:10.5px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:3px;}
.greeting-text{font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;}
.greeting-text em{color:var(--gold);font-style:normal;}

/* FACILITY BANNER */
.fac-banner{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 15px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;}
.fac-l{display:flex;align-items:center;gap:9px;}
.fac-dot{width:7px;height:7px;border-radius:50%;background:var(--green);flex-shrink:0;}
.fac-name{font-size:13.5px;color:#fff;font-weight:600;}
.fac-type{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:1px;}
.fac-shift{font-size:10px;color:var(--green);font-family:'DM Mono',monospace;background:rgba(45,122,95,0.15);border:1px solid var(--green-border);border-radius:10px;padding:2px 9px;}

/* ACTIVITY */
.activity-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:15px;margin-bottom:13px;position:relative;overflow:hidden;}
.activity-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),transparent);}
.ac-title{font-size:10px;text-transform:uppercase;letter-spacing:0.13em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:11px;}
.ac-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
.ac-item{background:var(--bg-card2);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px 11px;display:flex;align-items:center;gap:9px;}
.ac-ico{font-size:17px;flex-shrink:0;}
.ac-val{font-size:19px;font-family:'Cormorant Garamond',serif;color:#fff;font-weight:600;line-height:1;}
.ac-lbl{font-size:9.5px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:1px;}

/* ALERTS */
.alerts-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:15px;margin-bottom:13px;}
.alerts-title{font-size:10px;text-transform:uppercase;letter-spacing:0.13em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:10px;}
.al-item{display:flex;align-items:flex-start;gap:9px;padding:9px 11px;border-radius:8px;margin-bottom:6px;border:1px solid;}
.al-item:last-child{margin-bottom:0;}
.al-item.warn{background:rgba(122,78,30,0.12);border-color:var(--amber-border);}
.al-item.danger{background:rgba(139,58,58,0.12);border-color:var(--red-border);}
.al-item.info{background:rgba(45,95,139,0.12);border-color:var(--blue-border);}
.al-item.success{background:rgba(45,122,95,0.12);border-color:var(--green-border);}
.al-ico{font-size:13px;margin-top:1px;flex-shrink:0;}
.al-txt{font-size:12.5px;color:rgba(255,255,255,0.8);font-weight:500;}
.al-sub{font-size:10.5px;color:var(--muted);margin-top:2px;font-family:'DM Mono',monospace;}

/* BUTTONS */
.scan-btn{width:100%;padding:17px;border-radius:13px;background:var(--gold);color:var(--ink);border:none;font-size:16px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;margin-bottom:11px;transition:all 0.15s;}
.scan-btn:active{transform:scale(0.98);}
.submit-btn{width:100%;padding:15px;border-radius:11px;border:none;font-size:15px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:7px;margin-bottom:9px;}
.submit-btn.ready{background:var(--gold);color:var(--ink);}
.submit-btn.ready:active{transform:scale(0.98);}
.submit-btn.disabled{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.22);cursor:not-allowed;}
.submit-btn.green{background:var(--green);color:#fff;}
.submit-btn.outline{background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.6);}

/* QUICK ACTIONS */
.qa-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:16px;}
.qa-btn{background:var(--bg-card2);border:none;border-radius:10px;padding:13px 10px;text-align:center;cursor:pointer;}
.qa-btn:active{opacity:0.7;}
.qa-ico{font-size:20px;margin-bottom:5px;}
.qa-lbl{font-size:12px;color:rgba(255,255,255,0.6);}

/* CASES */
.case-row{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:13px 15px;margin-bottom:8px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;}
.case-row:active{border-color:var(--gold);}
.cr-name{font-size:13.5px;color:#fff;font-weight:500;margin-bottom:3px;}
.cr-id{font-family:'DM Mono',monospace;font-size:10.5px;color:var(--gold);margin-bottom:3px;}
.cr-loc{font-size:11px;color:var(--muted);}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:500;font-family:'DM Mono',monospace;white-space:nowrap;}
.badge::before{content:'●';font-size:6px;}
.b-blue{background:rgba(45,95,139,0.2);color:#7ab0e0;}
.b-gold{background:rgba(201,168,76,0.15);color:var(--gold);}
.b-green{background:rgba(45,122,95,0.2);color:#7ad4b0;}
.b-purple{background:rgba(122,74,154,0.2);color:#c0a0e0;}

/* STORAGE */
.cooler-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;margin-bottom:10px;}
.cooler-head{background:rgba(255,255,255,0.05);padding:10px 14px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);}
.cooler-name{font-size:12px;font-weight:600;color:#fff;font-family:'DM Mono',monospace;}
.cooler-cap{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;}
.shelf-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;padding:10px;}
.shelf{border-radius:5px;padding:7px 9px;font-size:10px;font-family:'DM Mono',monospace;border:1px solid transparent;}
.shelf.occupied{background:rgba(139,58,58,0.15);border-color:var(--red-border);color:#e0a0a0;}
.shelf.available{background:rgba(45,122,95,0.12);border-color:var(--green-border);color:#7ad4b0;}
.shelf.reserved{background:rgba(201,168,76,0.12);border-color:rgba(201,168,76,0.3);color:var(--gold);}
.shelf.maintenance{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08);color:var(--muted);}
.shelf-id{font-weight:600;margin-bottom:2px;}
.shelf-occ{font-size:9px;opacity:0.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* SCAN */
.scan-hero{margin:0 -20px;background:#000;overflow:hidden;}
.cam-viewport{width:100%;aspect-ratio:1;position:relative;overflow:hidden;background:#000;display:flex;align-items:center;justify-content:center;}
.scan-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;}
.scan-frame{width:200px;height:200px;position:relative;}
.sc{position:absolute;width:28px;height:28px;border-color:var(--gold);border-style:solid;border-width:0;}
.sc.tl{top:0;left:0;border-top-width:3px;border-left-width:3px;border-radius:4px 0 0 0;}
.sc.tr{top:0;right:0;border-top-width:3px;border-right-width:3px;border-radius:0 4px 0 0;}
.sc.bl{bottom:0;left:0;border-bottom-width:3px;border-left-width:3px;border-radius:0 0 0 4px;}
.sc.br{bottom:0;right:0;border-bottom-width:3px;border-right-width:3px;border-radius:0 0 4px 0;}
.scan-line{position:absolute;left:4px;right:4px;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);animation:scanline 2s ease-in-out infinite;}
@keyframes scanline{0%{top:8px;opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{top:calc(100% - 8px);opacity:0;}}
.scan-dim{position:absolute;inset:0;background:rgba(0,0,0,0.5);clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,calc(50% - 100px) calc(50% - 100px),calc(50% - 100px) calc(50% + 100px),calc(50% + 100px) calc(50% + 100px),calc(50% + 100px) calc(50% - 100px),calc(50% - 100px) calc(50% - 100px));}
.scan-status-bar{background:var(--bg-card);padding:10px 20px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.06);}
.scan-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);animation:pulse 1.5s ease-in-out infinite;flex-shrink:0;}
.scan-dot.off{background:var(--muted);animation:none;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(0.8);}}
.scan-status-txt{font-size:11.5px;color:rgba(255,255,255,0.5);font-family:'DM Mono',monospace;}
.demo-case{display:flex;align-items:center;gap:11px;width:100%;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:11px 13px;margin-bottom:7px;cursor:pointer;text-align:left;}
.demo-case:active{border-color:var(--gold);}
.demo-name{font-size:13px;color:#fff;font-weight:500;}
.demo-id{font-family:'DM Mono',monospace;font-size:10.5px;color:var(--gold);margin-top:2px;}
.demo-loc{font-size:10.5px;color:var(--muted);margin-top:1px;}

/* MOVEMENT */
.case-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:14px;position:relative;overflow:hidden;}
.case-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),transparent);}
.cc-scanned{font-size:9px;text-transform:uppercase;letter-spacing:0.14em;color:var(--gold);font-family:'DM Mono',monospace;margin-bottom:7px;}
.cc-name{font-family:'Cormorant Garamond',serif;font-size:21px;color:#fff;margin-bottom:5px;}
.cc-id{display:inline-flex;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.25);border-radius:5px;padding:2px 8px;font-family:'DM Mono',monospace;font-size:10.5px;color:var(--gold);margin-bottom:11px;}
.cc-meta{display:flex;gap:12px;}
.cc-ml{font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;font-family:'DM Mono',monospace;margin-bottom:2px;}
.cc-mv{font-size:12px;color:rgba(255,255,255,0.8);font-weight:500;}
.cc-loc{margin-top:11px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:7px;padding:8px 11px;font-family:'DM Mono',monospace;font-size:11px;color:rgba(255,255,255,0.5);}
.cc-loc strong{color:rgba(255,255,255,0.75);}

.sec-title{font-size:10px;text-transform:uppercase;letter-spacing:0.13em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:9px;}
.action-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;}
.action-btn{background:var(--bg-card2);border:2px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 9px;text-align:center;cursor:pointer;color:rgba(255,255,255,0.5);font-family:'DM Sans',sans-serif;}
.action-btn.sel{border-color:var(--gold);color:#fff;background:rgba(201,168,76,0.1);}
.action-ico{font-size:19px;margin-bottom:4px;}
.action-lbl{font-size:11.5px;font-weight:500;}
.loc-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;}
.fsel{width:100%;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;color:#fff;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;}
.fsel:focus{border-color:var(--gold);}
.finp{width:100%;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;color:#fff;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;margin-bottom:8px;}
.finp::placeholder{color:rgba(255,255,255,0.22);}
.finp:focus{border-color:var(--gold);}
.ftxt{width:100%;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;color:#fff;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;resize:none;min-height:90px;}
.ftxt::placeholder{color:rgba(255,255,255,0.22);}
.ftxt:focus{border-color:var(--gold);}
.flbl{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:5px;display:block;}

.verify-item{display:flex;align-items:center;gap:11px;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;margin-bottom:7px;cursor:pointer;-webkit-user-select:none;user-select:none;}
.verify-item.checked{border-color:var(--green-border);background:rgba(45,122,95,0.1);}
.vcheck{width:27px;height:27px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;color:transparent;}
.verify-item.checked .vcheck{background:var(--green);border-color:var(--green);color:#fff;}
.vlbl{font-size:13px;color:rgba(255,255,255,0.7);}
.verify-item.checked .vlbl{color:#fff;}
.vval{font-family:'DM Mono',monospace;font-size:10.5px;color:var(--gold);margin-top:2px;}

/* SUCCESS */
.success-wrap{padding:32px 20px;text-align:center;}
.success-ring{width:74px;height:74px;border-radius:50%;background:rgba(45,122,95,0.15);border:2px solid var(--green);display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 16px;animation:pop 0.4s cubic-bezier(.34,1.56,.64,1);}
@keyframes pop{from{transform:scale(0.5);opacity:0;}to{transform:scale(1);opacity:1;}}
.success-title{font-family:'Cormorant Garamond',serif;font-size:25px;color:#fff;margin-bottom:5px;}
.success-sub{font-size:12.5px;color:var(--muted);margin-bottom:20px;line-height:1.5;}
.log-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:11px;padding:13px;text-align:left;margin-bottom:16px;}
.log-lbl{font-size:9.5px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:8px;}
.log-row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
.log-row:last-child{border-bottom:none;}
.log-k{font-size:11px;color:var(--muted);}
.log-v{font-size:11px;color:rgba(255,255,255,0.8);font-family:'DM Mono',monospace;text-align:right;max-width:180px;}

/* MISC */
.back-btn{display:inline-flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;color:var(--muted);font-size:13px;font-family:'DM Sans',sans-serif;padding:0 0 13px 0;}
.note{background:var(--bg-card);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px 12px;font-size:11.5px;color:var(--muted);line-height:1.6;margin-bottom:11px;}
.note strong{color:rgba(255,255,255,0.5);}
.divider{border:none;border-top:1px solid rgba(255,255,255,0.07);margin:14px 0;}
.gen-id-box{background:var(--ink);color:var(--gold);font-family:'DM Mono',monospace;font-size:18px;font-weight:500;padding:14px 18px;border-radius:8px;text-align:center;letter-spacing:0.12em;margin:12px 0;}
.gen-id-lbl{font-size:9px;color:rgba(255,255,255,0.3);letter-spacing:0.12em;margin-bottom:4px;}

/* INTAKE */
.intake-banner{background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.25);border-radius:9px;padding:11px 14px;margin-bottom:14px;display:flex;align-items:center;gap:9px;}
.intake-banner-txt{font-size:12.5px;color:rgba(255,255,255,0.7);line-height:1.4;}
.intake-banner-txt strong{color:var(--gold);}

/* HELP */
.help-sec-title{font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid rgba(255,255,255,0.07);}
.help-item{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;margin-bottom:8px;cursor:pointer;}
.help-item:active{border-color:var(--gold);}
.help-item-head{display:flex;align-items:center;justify-content:space-between;}
.help-item-title{font-size:13.5px;color:#fff;font-weight:500;display:flex;align-items:center;gap:9px;}
.help-item-body{font-size:12.5px;color:var(--muted);line-height:1.6;margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.07);}

/* MESSAGE */
.msg-box{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:14px;}
.msg-head{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.msg-avatar{width:32px;height:32px;border-radius:50%;background:rgba(201,168,76,0.2);display:flex;align-items:center;justify-content:center;font-size:12px;font-family:'DM Mono',monospace;font-weight:700;color:var(--gold);}
.msg-to{font-size:12px;color:rgba(255,255,255,0.7);}
.msg-role{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;}
.prio-row{display:flex;gap:8px;margin-bottom:12px;}
.prio-btn{flex:1;padding:8px 6px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:var(--bg-card2);color:rgba(255,255,255,0.4);font-size:11.5px;font-family:'DM Sans',sans-serif;cursor:pointer;text-align:center;}
.prio-btn.sel.low{background:rgba(45,122,95,0.2);border-color:var(--green-border);color:#7ad4b0;}
.prio-btn.sel.med{background:rgba(201,168,76,0.15);border-color:rgba(201,168,76,0.3);color:var(--gold);}
.prio-btn.sel.high{background:rgba(139,58,58,0.2);border-color:var(--red-border);color:#e0a0a0;}
.sent-card{background:rgba(45,122,95,0.12);border:1px solid var(--green-border);border-radius:9px;padding:14px;display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.sent-txt{font-size:13px;color:#7ad4b0;font-weight:500;}
.sent-sub{font-size:11px;color:var(--muted);margin-top:2px;font-family:'DM Mono',monospace;}

/* CAM */
.cam-box{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;text-align:center;margin-bottom:13px;}
.cam-btn{background:var(--gold);color:var(--ink);border:none;border-radius:8px;padding:9px 20px;font-size:13.5px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;}
`;

// ── DATA ──────────────────────────────────────────────────────────────────────
const CASES = [
  { id:"CL-2024-0041", name:"Margaret Elaine Foster", dob:"1941-03-12", dod:"2024-11-14", location:{ cooler:"Cooler 2", shelf:"Shelf B3" }, status:"In Storage", kin:"Robert Foster (Son)", disposition:"burial" },
  { id:"CL-2024-0042", name:"Samuel James Okonkwo", dob:"1958-07-22", dod:"2024-11-15", location:{ cooler:"Cooler 1", shelf:"Shelf A1" }, status:"Awaiting Release", kin:"Amara Okonkwo (Wife)", disposition:"burial" },
  { id:"CL-2024-0044", name:"David Peter Steyn", dob:"1945-01-09", dod:"2024-11-16", location:{ cooler:"Cooler 4", shelf:"Shelf B1" }, status:"In Storage", kin:"Helen Steyn (Wife)", disposition:"burial" },
];
const STORAGE = {
  "Cooler 1":[{id:"A1",status:"occupied",occ:"S. J. Okonkwo"},{id:"A2",status:"available"},{id:"B1",status:"available"},{id:"B2",status:"maintenance"}],
  "Cooler 2":[{id:"A1",status:"available"},{id:"A2",status:"reserved",occ:"Reserved"},{id:"B1",status:"available"},{id:"B2",status:"available"},{id:"B3",status:"occupied",occ:"M. E. Foster"}],
  "Cooler 3":[{id:"A1",status:"available"},{id:"A2",status:"available"},{id:"B1",status:"available"},{id:"B2",status:"available"}],
  "Cooler 4":[{id:"A1",status:"available"},{id:"A2",status:"available"},{id:"B1",status:"occupied",occ:"D. P. Steyn"},{id:"B2",status:"available"}],
};
const STATUS_BADGE = {"In Storage":"b-blue","Awaiting Release":"b-gold","In Preparation":"b-gold","At Crematorium":"b-purple","Released to Family":"b-green"};
const ACTIONS = [{id:"move",ico:"📦",lbl:"Move to Storage"},{id:"prep",ico:"🔧",lbl:"Remove for Prep"},{id:"transport",ico:"🚐",lbl:"Transport"},{id:"return",ico:"↩️",lbl:"Return"}];
const HELP_ITEMS = [
  {ico:"⬛",title:"How to scan a QR tag",body:"Open the Scan tab, enable camera, and point at the QR tag. The case opens automatically. If scanning fails, tap a case from the Active Cases list instead."},
  {ico:"📦",title:"Logging a movement",body:"After scanning, select the action, confirm the new location, tick all three verification checks, then tap Log Movement. The record syncs to the dashboard instantly."},
  {ico:"📥",title:"Creating a new intake",body:"Senior Staff can create a full intake directly from the Intake tab. Standard staff can send a request to the duty senior. A QR tag is generated immediately and ready to print."},
  {ico:"⚡",title:"Load shedding / power outage",body:"The mobile app works offline during load shedding. All actions queue automatically and sync when connectivity returns. Admin is alerted via SMS for any outage."},
  {ico:"🔄",title:"If you make a mistake",body:"You cannot delete a log entry. Contact your Facility Admin immediately — they can add a correction note. The original entry is always preserved for audit purposes."},
  {ico:"🔒",title:"Your permissions",body:"Your role is Senior Staff at Pretoria Main. You can create intakes, log movements, and release to transport. Release to family requires a countersign from another senior staff member."},
];

function getNow() {
  const d = new Date();
  return {time:d.toTimeString().slice(0,5),date:d.toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"})};
}
function getGreeting() {
  const h = new Date().getHours();
  return h<12?"Good morning":h<17?"Good afternoon":"Good evening";
}

// ── SCREENS ───────────────────────────────────────────────────────────────────

function HomeScreen({onScan,onNav}) {
  const now = new Date();
  return (
    <div className="screen">
      <div className="greeting">
        <div className="greeting-time">{now.toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long"})} · {now.toLocaleTimeString("en-ZA",{hour:"2-digit",minute:"2-digit"})}</div>
        <div className="greeting-text">{getGreeting()}, <em>T. Dlamini</em></div>
      </div>
      <div className="fac-banner">
        <div className="fac-l"><div className="fac-dot"/><div><div className="fac-name">Pretoria Main</div><div className="fac-type">Funeral Home · Senior Staff</div></div></div>
        <div className="fac-shift">Shift active</div>
      </div>
      <div className="activity-card">
        <div className="ac-title">Today's Activity — Pretoria Main</div>
        <div className="ac-grid">
          {[{ico:"📥",val:2,lbl:"New Intakes"},{ico:"🔄",val:3,lbl:"Movements"},{ico:"🚐",val:1,lbl:"Transports"},{ico:"📧",val:4,lbl:"Alerts Sent"}].map((a,i)=>(
            <div key={i} className="ac-item"><div className="ac-ico">{a.ico}</div><div><div className="ac-val">{a.val}</div><div className="ac-lbl">{a.lbl}</div></div></div>
          ))}
        </div>
      </div>
      <div className="alerts-card">
        <div className="alerts-title">Active Alerts — Pretoria Main</div>
        {[
          {type:"warn",ico:"⚠️",txt:"Release verification pending",sub:"CL-2024-0042 · S. J. Okonkwo"},
          {type:"info",ico:"🚐",txt:"Transport in progress",sub:"CL-2024-0043 · Avbob Crematorium"},
          {type:"success",ico:"✅",txt:"New intake completed",sub:"CL-2024-0044 · D. P. Steyn · 11:20"},
        ].map((a,i)=>(
          <div key={i} className={`al-item ${a.type}`}><div className="al-ico">{a.ico}</div><div><div className="al-txt">{a.txt}</div><div className="al-sub">{a.sub}</div></div></div>
        ))}
      </div>
      <button className="scan-btn" onClick={onScan}>⬛ Scan ID Tag</button>
      <div className="qa-grid">
        <button className="qa-btn" onClick={()=>onNav("cases")}><div className="qa-ico">📋</div><div className="qa-lbl">Active Cases</div></button>
        <button className="qa-btn" onClick={()=>onNav("storage")}><div className="qa-ico">❄️</div><div className="qa-lbl">Storage Map</div></button>
        <button className="qa-btn" onClick={()=>onNav("intake")}><div className="qa-ico">📥</div><div className="qa-lbl">New Intake</div></button>
        <button className="qa-btn" onClick={()=>onNav("help")}><div className="qa-ico">🆘</div><div className="qa-lbl">Help</div></button>
      </div>
    </div>
  );
}

function CasesScreen({onScan}) {
  return (
    <div className="screen">
      <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:12}}>Active Cases — Pretoria Main</div>
      <div className="note">Tap any case to log a movement directly.</div>
      {CASES.map(c=>(
        <div key={c.id} className="case-row" onClick={()=>onScan(c)}>
          <div><div className="cr-name">{c.name}</div><div className="cr-id">{c.id}</div><div className="cr-loc">📍 {c.location.cooler} · {c.location.shelf}</div></div>
          <div style={{textAlign:"right"}}><span className={`badge ${STATUS_BADGE[c.status]||"b-blue"}`}>{c.status}</span><div style={{fontSize:10,color:"var(--muted)",marginTop:5,fontFamily:"DM Mono,monospace",textTransform:"capitalize"}}>{c.disposition}</div></div>
        </div>
      ))}
    </div>
  );
}

function StorageScreen() {
  return (
    <div className="screen">
      <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:4}}>Storage Map — Pretoria Main</div>
      <div style={{fontSize:11,color:"var(--muted)",fontFamily:"DM Mono,monospace",marginBottom:12}}>T. Dlamini · Live view</div>
      <div style={{display:"flex",gap:10,fontSize:10.5,marginBottom:14,flexWrap:"wrap"}}>
        <span style={{color:"#e0a0a0"}}>● Occupied</span><span style={{color:"#7ad4b0"}}>● Available</span><span style={{color:"var(--gold)"}}>● Reserved</span><span style={{color:"var(--muted)"}}>● Maintenance</span>
      </div>
      {Object.entries(STORAGE).map(([name,shelves])=>{
        const occ=shelves.filter(s=>s.status==="occupied").length;
        return (
          <div key={name} className="cooler-card">
            <div className="cooler-head"><div className="cooler-name">{name}</div><div className="cooler-cap">{occ}/{shelves.length} occupied</div></div>
            <div className="shelf-grid">
              {shelves.map(s=>(
                <div key={s.id} className={`shelf ${s.status}`}><div className="shelf-id">Shelf {s.id}</div><div className="shelf-occ">{s.occ||s.status.charAt(0).toUpperCase()+s.status.slice(1)}</div></div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function IntakeScreen() {
  const [mode,setMode]=useState(null);
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({firstName:"",lastName:"",dob:"",dod:"",source:"",disposition:"burial",kin:"",cooler:"Cooler 2",shelf:"A1"});
  const [genId,setGenId]=useState("");
  const [reqNote,setReqNote]=useState("");
  const [reqSent,setReqSent]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  if(!mode) return (
    <div className="screen">
      <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:12}}>New Intake</div>
      <div className="intake-banner"><span style={{fontSize:16}}>🔑</span><div className="intake-banner-txt">Logged in as <strong>Senior Staff</strong>. You can create a full intake or request one from admin.</div></div>
      <button className="submit-btn ready" onClick={()=>setMode("full")}>📥 Create Full Intake</button>
      <button className="submit-btn outline" onClick={()=>setMode("request")}>📨 Request Intake from Admin</button>
      <div className="note" style={{marginTop:4}}>Standard Staff can only send requests. Senior Staff can complete intakes directly.</div>
    </div>
  );

  if(mode==="request") return (
    <div className="screen">
      <button className="back-btn" onClick={()=>{setMode(null);setReqSent(false);}}>← Back</button>
      {reqSent?(
        <div className="sent-card"><span style={{fontSize:20}}>✅</span><div><div className="sent-txt">Request sent to Sarah Dlamini</div><div className="sent-sub">Super Admin · Notified via SMS</div></div></div>
      ):(
        <>
          <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:12}}>Request Intake</div>
          <div className="msg-box">
            <div className="msg-head"><div className="msg-avatar">SD</div><div><div className="msg-to">Sarah Dlamini</div><div className="msg-role">Super Admin · Pretoria Main</div></div></div>
            <label className="flbl">Brief description</label>
            <textarea className="ftxt" placeholder="e.g. Body arrived from Sunridge Hospital, name unknown, approx 60yr male…" value={reqNote} onChange={e=>setReqNote(e.target.value)}/>
          </div>
          <button className="submit-btn ready" style={{opacity:reqNote?1:0.4}} onClick={reqNote?()=>setReqSent(true):undefined}>📨 Send Request to Admin</button>
        </>
      )}
    </div>
  );

  return (
    <div className="screen">
      <button className="back-btn" onClick={()=>{setMode(null);setStep(1);}}>← Back</button>
      <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:3}}>New Intake</div>
      <div style={{fontSize:10.5,color:"var(--muted)",fontFamily:"DM Mono,monospace",marginBottom:14}}>Step {step} of 2</div>
      {step===1?(
        <>
          <div className="sec-title">Deceased Details</div>
          <label className="flbl">First Name</label><input className="finp" value={form.firstName} onChange={e=>set("firstName",e.target.value)} placeholder="First name"/>
          <label className="flbl">Last Name</label><input className="finp" value={form.lastName} onChange={e=>set("lastName",e.target.value)} placeholder="Last name"/>
          <div className="loc-row">
            <div><label className="flbl">Date of Birth</label><input type="date" className="finp" value={form.dob} onChange={e=>set("dob",e.target.value)}/></div>
            <div><label className="flbl">Date of Death</label><input type="date" className="finp" value={form.dod} onChange={e=>set("dod",e.target.value)}/></div>
          </div>
          <label className="flbl">Source</label>
          <select className="fsel" style={{marginBottom:9}} value={form.source} onChange={e=>set("source",e.target.value)}>
            <option value="">Select…</option><option>Hospital</option><option>Home — Natural Causes</option><option>Police — Scene</option><option>Clinic</option><option>Funeral Home Transfer</option>
          </select>
          <label className="flbl" style={{marginTop:5}}>Disposition</label>
          <select className="fsel" style={{marginBottom:9}} value={form.disposition} onChange={e=>set("disposition",e.target.value)}><option value="burial">Burial</option><option value="cremation">Cremation</option></select>
          <label className="flbl" style={{marginTop:5}}>Next of Kin</label><input className="finp" value={form.kin} onChange={e=>set("kin",e.target.value)} placeholder="Name & relationship"/>
          <div className="divider"/>
          <div className="sec-title">Storage Placement</div>
          <div className="loc-row">
            <div><label className="flbl">Cooler</label><select className="fsel" value={form.cooler} onChange={e=>set("cooler",e.target.value)}><option>Cooler 1</option><option>Cooler 2</option><option>Cooler 3</option><option>Cooler 4</option></select></div>
            <div><label className="flbl">Shelf</label><select className="fsel" value={form.shelf} onChange={e=>set("shelf",e.target.value)}><option>A1</option><option>A2</option><option>B1</option><option>B2</option></select></div>
          </div>
          <button className="submit-btn ready" style={{marginTop:8,opacity:form.firstName&&form.lastName&&form.source?1:0.4}}
            onClick={form.firstName&&form.lastName&&form.source?()=>{setGenId(`CL-2024-00${Math.floor(45+Math.random()*10)}`);setStep(2);}:undefined}>
            Generate Case ID →
          </button>
        </>
      ):(
        <>
          <div style={{background:"rgba(45,122,95,0.12)",border:"1px solid var(--green-border)",borderRadius:9,padding:"11px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:9}}>
            <span style={{fontSize:16}}>✅</span><span style={{fontSize:12.5,color:"#7ad4b0",fontWeight:500}}>Case created. Print tag and attach immediately.</span>
          </div>
          <div className="gen-id-box"><div className="gen-id-lbl">CUSTODYLEDGER · CASE ID</div>{genId}</div>
          <div style={{fontSize:12.5,color:"var(--muted)",lineHeight:1.9,marginBottom:14}}>
            <strong style={{color:"rgba(255,255,255,0.6)"}}>Name:</strong> {form.firstName} {form.lastName}<br/>
            <strong style={{color:"rgba(255,255,255,0.6)"}}>Placement:</strong> {form.cooler} · Shelf {form.shelf}<br/>
            <strong style={{color:"rgba(255,255,255,0.6)"}}>Disposition:</strong> {form.disposition}
          </div>
          <button className="submit-btn ready" style={{marginBottom:9}}>🖨 Print QR Tag</button>
          <div className="note">📧 <strong>Admin notified.</strong> Sarah Dlamini alerted via SMS with case summary.</div>
          <button className="submit-btn outline" onClick={()=>{setMode(null);setStep(1);setForm({firstName:"",lastName:"",dob:"",dod:"",source:"",disposition:"burial",kin:"",cooler:"Cooler 2",shelf:"A1"});}}>← Back to Intake Options</button>
        </>
      )}
    </div>
  );
}

function HelpScreen() {
  const [expanded,setExpanded]=useState(null);
  const [showMsg,setShowMsg]=useState(false);
  const [msgText,setMsgText]=useState("");
  const [priority,setPriority]=useState("med");
  const [sent,setSent]=useState(false);

  return (
    <div className="screen">
      <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:14}}>Help & Support</div>

      <div style={{marginBottom:18}}>
        <div className="help-sec-title">Message Super Admin</div>
        {sent?(
          <div className="sent-card"><span style={{fontSize:20}}>✅</span><div><div className="sent-txt">Message sent to Sarah Dlamini</div><div className="sent-sub">Super Admin · Will respond shortly · SMS sent</div></div></div>
        ):showMsg?(
          <div className="msg-box">
            <div className="msg-head"><div className="msg-avatar">SD</div><div><div className="msg-to">Sarah Dlamini</div><div className="msg-role">Super Admin · Pretoria Main</div></div></div>
            <div className="prio-row">
              {[{id:"low",lbl:"Low"},{id:"med",lbl:"Medium"},{id:"high",lbl:"Urgent"}].map(p=>(
                <button key={p.id} className={`prio-btn ${priority===p.id?"sel":""} ${p.id}`} onClick={()=>setPriority(p.id)}>{p.lbl}</button>
              ))}
            </div>
            <label className="flbl">Your message</label>
            <textarea className="ftxt" placeholder="Describe your issue or question…" value={msgText} onChange={e=>setMsgText(e.target.value)}/>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <button className="submit-btn outline" style={{flex:1,marginBottom:0}} onClick={()=>setShowMsg(false)}>Cancel</button>
              <button className="submit-btn ready" style={{flex:2,marginBottom:0,opacity:msgText?1:0.4}} onClick={msgText?()=>{setSent(true);setShowMsg(false);}:undefined}>📨 Send</button>
            </div>
          </div>
        ):(
          <div className="help-item" onClick={()=>setShowMsg(true)}>
            <div className="help-item-head">
              <div className="help-item-title"><span>💬</span> Message Super Admin</div>
              <span style={{color:"var(--muted)"}}>›</span>
            </div>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:6}}>Send a direct message to Sarah Dlamini. Urgent messages trigger an SMS alert immediately.</div>
          </div>
        )}
      </div>

      <div>
        <div className="help-sec-title">How-To Guide</div>
        {HELP_ITEMS.map((item,i)=>(
          <div key={i} className="help-item" onClick={()=>setExpanded(e=>e===i?null:i)}>
            <div className="help-item-head">
              <div className="help-item-title"><span>{item.ico}</span>{item.title}</div>
              <span style={{color:"var(--muted)"}}>{expanded===i?"∨":"›"}</span>
            </div>
            {expanded===i&&<div className="help-item-body">{item.body}</div>}
          </div>
        ))}
      </div>

      <div className="note" style={{marginTop:8}}>
        📞 <strong>Emergency:</strong> Call your Facility Admin directly if the system is unavailable.<br/><br/>
        🔄 <strong>Offline mode:</strong> All actions queue and sync automatically when connectivity returns.
      </div>
    </div>
  );
}

function ScanScreen({onScanned,onBack}) {
  const [camActive,setCamActive]=useState(false);
  return (
    <div>
      <div className="scan-hero">
        <div className="cam-viewport" style={{height:280}}>
          <div style={{textAlign:"center",color:"rgba(255,255,255,0.15)"}}>
            <div style={{fontSize:42,marginBottom:8}}>📷</div>
            <div style={{fontSize:11,fontFamily:"DM Mono,monospace"}}>{camActive?"Scanning…":"Camera inactive"}</div>
          </div>
          <div className="scan-dim"/>
          <div className="scan-overlay">
            <div className="scan-frame">
              <div className="sc tl"/><div className="sc tr"/><div className="sc bl"/><div className="sc br"/>
              {camActive&&<div className="scan-line"/>}
            </div>
          </div>
        </div>
        <div className="scan-status-bar">
          <div className={`scan-dot ${camActive?"":"off"}`}/>
          <div className="scan-status-txt">{camActive?"Camera active — point at QR tag":"Camera inactive"}</div>
        </div>
      </div>
      <div className="screen">
        <button className="back-btn" onClick={onBack}>← Back</button>
        {!camActive&&(
          <div className="cam-box">
            <div style={{fontSize:30,marginBottom:8}}>📷</div>
            <div style={{fontSize:14,color:"#fff",fontWeight:600,marginBottom:5}}>Enable Camera</div>
            <div style={{fontSize:12,color:"var(--muted)",marginBottom:13,lineHeight:1.5}}>Allow camera access to scan QR tags on the floor.</div>
            <button className="cam-btn" onClick={()=>setCamActive(true)}>Enable Camera</button>
          </div>
        )}
        <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--muted)",fontFamily:"DM Mono,monospace",margin:"4px 0 10px"}}>— Tap a case to simulate a scan —</div>
        {CASES.map(c=>(
          <button key={c.id} className="demo-case" onClick={()=>onScanned(c)}>
            <div style={{fontSize:22,opacity:0.8}}>⬛</div>
            <div><div className="demo-name">{c.name}</div><div className="demo-id">{c.id}</div><div className="demo-loc">{c.location.cooler} · {c.location.shelf}</div></div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MovementScreen({c,onBack,onDone}) {
  const [action,setAction]=useState(null);
  const [checks,setChecks]=useState([false,false,false]);
  const [cooler,setCooler]=useState("Cooler 2");
  const [shelf,setShelf]=useState("B1");
  const [driver,setDriver]=useState("");
  const [vehicle,setVehicle]=useState("");
  const [submitting,setSubmitting]=useState(false);
  const toggle=i=>setChecks(ch=>ch.map((v,idx)=>idx===i?!v:v));
  const allChecked=checks.every(Boolean);
  const canSubmit=action&&allChecked&&(action!=="transport"||(driver&&vehicle));
  const handleSubmit=()=>{
    setSubmitting(true);
    setTimeout(()=>{
      const {time,date}=getNow();
      const labels={move:`Moved to ${cooler} — Shelf ${shelf}`,prep:`Removed for preparation`,transport:`Released for transport — ${driver} · ${vehicle}`,return:`Returned to storage — ${cooler} Shelf ${shelf}`};
      onDone({caseId:c.id,caseName:c.name,action:labels[action],time,date});
    },800);
  };
  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="case-card">
        <div className="cc-scanned">✓ QR Tag Scanned</div>
        <div className="cc-name">{c.name}</div>
        <div className="cc-id">{c.id}</div>
        <div className="cc-meta"><div><div className="cc-ml">Status</div><div className="cc-mv">{c.status}</div></div><div><div className="cc-ml">Next of Kin</div><div className="cc-mv">{c.kin}</div></div></div>
        <div className="cc-loc">📍 Currently: <strong> {c.location.cooler} · {c.location.shelf}</strong></div>
      </div>
      <div className="sec-title">Select Action</div>
      <div className="action-grid">
        {ACTIONS.map(a=>(
          <div key={a.id} className={`action-btn ${action===a.id?"sel":""}`} onClick={()=>setAction(a.id)}>
            <div className="action-ico">{a.ico}</div><div className="action-lbl">{a.lbl}</div>
          </div>
        ))}
      </div>
      {(action==="move"||action==="return")&&(
        <><div className="sec-title">New Location</div>
        <div className="loc-row">
          <select className="fsel" value={cooler} onChange={e=>setCooler(e.target.value)}><option>Cooler 1</option><option>Cooler 2</option><option>Cooler 3</option><option>Cooler 4</option></select>
          <select className="fsel" value={shelf} onChange={e=>setShelf(e.target.value)}><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>B3</option></select>
        </div></>
      )}
      {action==="transport"&&(
        <><div className="sec-title">Transport Details</div>
        <label className="flbl">Driver Name</label><input className="finp" placeholder="Full name" value={driver} onChange={e=>setDriver(e.target.value)}/>
        <label className="flbl">Vehicle Plate</label><input className="finp" placeholder="e.g. GP 445-231" value={vehicle} onChange={e=>setVehicle(e.target.value)}/></>
      )}
      {action&&(
        <><div className="sec-title">Verify Before Logging</div>
        {[{l:"ID tag confirmed",v:c.id},{l:"Name visually confirmed",v:c.name},{l:"Case number confirmed",v:c.id}].map((item,i)=>(
          <div key={i} className={`verify-item ${checks[i]?"checked":""}`} onClick={()=>toggle(i)}>
            <div className="vcheck">{checks[i]?"✓":""}</div>
            <div><div className="vlbl">{item.l}</div><div className="vval">{item.v}</div></div>
          </div>
        ))}</>
      )}
      <button className={`submit-btn ${canSubmit&&!submitting?"ready":"disabled"}`} onClick={canSubmit&&!submitting?handleSubmit:undefined}>
        {submitting?"Logging…":canSubmit?"✓ Log Movement":action?"Complete all checks first":"Select an action above"}
      </button>
    </div>
  );
}

function SuccessScreen({log,onReset}) {
  return (
    <div className="screen">
      <div className="success-wrap">
        <div className="success-ring">✓</div>
        <div className="success-title">Movement Logged</div>
        <div className="success-sub">Custody record updated and synced to dashboard instantly.</div>
      </div>
      <div className="log-card">
        <div className="log-lbl">Custody Log Entry</div>
        {[{k:"Case ID",v:log.caseId},{k:"Name",v:log.caseName},{k:"Action",v:log.action},{k:"Time",v:`${log.date} · ${log.time}`},{k:"Staff",v:"T. Dlamini"}].map(row=>(
          <div className="log-row" key={row.k}><div className="log-k">{row.k}</div><div className="log-v" style={{fontSize:10}}>{row.v}</div></div>
        ))}
      </div>
      <button className="submit-btn ready" onClick={onReset}>⬛ Scan Next Tag</button>
      <div className="note">📧 <strong>Admin notified.</strong> Visible on dashboard immediately.</div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
const NAV=[{id:"home",ico:"🏠",lbl:"Home"},{id:"cases",ico:"📋",lbl:"Cases"},{id:"scan",ico:"⬛",lbl:"Scan"},{id:"storage",ico:"❄️",lbl:"Storage"},{id:"help",ico:"🆘",lbl:"Help"}];

export default function App() {
  const [nav,setNav]=useState("home");
  const [scannedCase,setScannedCase]=useState(null);
  const [logEntry,setLogEntry]=useState(null);

  const handleScan=()=>{setScannedCase(null);setLogEntry(null);setNav("scan");};
  const handleScanned=c=>{setScannedCase(c);};
  const handleDone=log=>setLogEntry(log);
  const handleReset=()=>{setScannedCase(null);setLogEntry(null);setNav("home");};
  const handleNavCase=c=>{setScannedCase(c);setNav("scan");};

  const showMovement=scannedCase&&!logEntry;
  const showSuccess=!!logEntry;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="topbar">
          <div><div className="logo">Custody<em>Ledger</em></div><div className="logo-sub">Floor Scanner</div></div>
          <div className="staff-pill"><div className="staff-avatar">TD</div><div className="staff-name">T. Dlamini</div></div>
        </div>

        {showSuccess?<SuccessScreen log={logEntry} onReset={handleReset}/>:
         showMovement?<MovementScreen c={scannedCase} onBack={()=>setScannedCase(null)} onDone={handleDone}/>:
         nav==="home"?<HomeScreen onScan={handleScan} onNav={setNav}/>:
         nav==="cases"?<CasesScreen onScan={handleNavCase}/>:
         nav==="scan"?<ScanScreen onScanned={handleScanned} onBack={()=>setNav("home")}/>:
         nav==="storage"?<StorageScreen/>:
         nav==="intake"?<IntakeScreen/>:
         nav==="help"?<HelpScreen/>:null}

        <div className="bottom-nav">
          {NAV.map(item=>(
            <button key={item.id} className={`bn-item ${nav===item.id?"on":""}`}
              onClick={()=>{setScannedCase(null);setLogEntry(null);item.id==="scan"?handleScan():setNav(item.id);}}>
              <div className="bn-ico">{item.ico}</div>
              <div className="bn-lbl">{item.lbl}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
