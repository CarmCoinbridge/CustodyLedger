import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const css = `
${FONTS}
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --ink:#141420;--ink2:#1e1e30;--ink3:#28283e;
  --slate:#52526e;--muted:#8888a8;--faint:#bbbbd0;
  --border:#e4e4f0;--border2:#eeeeF6;
  --surface:#f8f8fd;--surface2:#f2f2fa;
  --white:#ffffff;
  --gold:#b8943a;--gold2:#c9a84c;--gold-light:#f7f0e0;--gold-border:#dfc98a;
  --green:#1f6b4e;--green2:#2d7a5f;--green-light:#e0f2eb;--green-border:#9fd4bc;
  --red:#7a2e2e;--red2:#8b3a3a;--red-light:#faeaea;--red-border:#e0aaaa;
  --blue:#1e4d7a;--blue2:#2d5f8b;--blue-light:#e4eef8;--blue-border:#a0c0e0;
  --amber:#7a4e1e;--amber-light:#faf0e0;--amber-border:#e0c090;
  --sidebar-w:252px;
}
html,body{height:100%;background:var(--surface);font-family:'DM Sans',sans-serif;color:var(--ink);}
.app{display:flex;height:100vh;overflow:hidden;}

/* ── SIDEBAR ── */
.sb{width:var(--sidebar-w);min-width:var(--sidebar-w);background:var(--ink);display:flex;flex-direction:column;overflow:hidden;}
.sb-head{padding:26px 22px 18px;border-bottom:1px solid rgba(255,255,255,0.07);}
.sb-logo{font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;letter-spacing:0.03em;line-height:1;}
.sb-logo em{color:var(--gold2);font-style:normal;}
.sb-tag{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,0.28);letter-spacing:0.14em;text-transform:uppercase;margin-top:5px;}
.sb-facility{margin:12px 14px 0;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:9px 12px;display:flex;align-items:center;gap:8px;}
.sb-fac-dot{width:7px;height:7px;border-radius:50%;background:var(--green2);flex-shrink:0;}
.sb-fac-name{font-size:12px;color:rgba(255,255,255,0.65);font-weight:500;}
.sb-fac-type{font-size:10px;color:rgba(255,255,255,0.3);font-family:'DM Mono',monospace;}
.sb-nav{flex:1;padding:14px 10px;overflow-y:auto;}
.sb-sec{font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.22);font-family:'DM Mono',monospace;padding:10px 12px 6px;}
.sb-item{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:6px;cursor:pointer;color:rgba(255,255,255,0.48);font-size:13px;font-weight:400;transition:all 0.13s;border:none;background:none;width:100%;text-align:left;margin-bottom:1px;}
.sb-item:hover{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.8);}
.sb-item.on{background:rgba(184,148,58,0.14);color:var(--gold2);font-weight:500;}
.sb-item .ico{font-size:14px;width:16px;text-align:center;flex-shrink:0;}
.sb-badge{margin-left:auto;background:var(--red2);color:#fff;font-size:10px;font-family:'DM Mono',monospace;padding:1px 6px;border-radius:10px;}
.sb-badge.amber{background:var(--amber);}
.sb-foot{padding:14px;border-top:1px solid rgba(255,255,255,0.07);}
.sb-user{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:7px;background:rgba(255,255,255,0.04);}
.sb-avatar{width:30px;height:30px;border-radius:50%;background:var(--gold2);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;font-family:'DM Mono',monospace;flex-shrink:0;}
.sb-uname{font-size:12.5px;color:rgba(255,255,255,0.7);font-weight:500;}
.sb-urole{font-size:10px;color:rgba(255,255,255,0.3);font-family:'DM Mono',monospace;}

/* ── MAIN ── */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;}
.topbar{background:var(--white);border-bottom:1px solid var(--border);padding:0 28px;height:58px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.topbar-l{display:flex;align-items:center;gap:14px;}
.topbar-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--ink);font-weight:600;}
.topbar-r{display:flex;gap:10px;align-items:center;}
.content{flex:1;overflow-y:auto;padding:24px 28px;}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;border:none;transition:all 0.13s;font-family:'DM Sans',sans-serif;white-space:nowrap;}
.btn-primary{background:var(--ink);color:#fff;}
.btn-primary:hover{background:var(--ink2);}
.btn-gold{background:var(--gold2);color:var(--ink);font-weight:600;}
.btn-gold:hover{background:var(--gold);}
.btn-ghost{background:transparent;color:var(--slate);border:1px solid var(--border);}
.btn-ghost:hover{background:var(--surface);}
.btn-green{background:var(--green-light);color:var(--green);border:1px solid var(--green-border);}
.btn-red{background:var(--red-light);color:var(--red2);border:1px solid var(--red-border);}
.btn-sm{padding:6px 12px;font-size:12px;}
.btn:disabled{opacity:0.4;cursor:not-allowed;}

/* ── CARDS ── */
.card{background:var(--white);border:1px solid var(--border);border-radius:10px;overflow:hidden;}
.card-head{padding:16px 20px 13px;border-bottom:1px solid var(--border2);display:flex;align-items:center;justify-content:space-between;}
.card-title{font-size:13px;font-weight:600;color:var(--ink);letter-spacing:0.02em;}
.card-body{padding:18px 20px;}

/* ── STATS ── */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px;}
.stat{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:18px 20px;position:relative;overflow:hidden;}
.stat::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;}
.stat.s-gold::after{background:var(--gold2);}
.stat.s-green::after{background:var(--green2);}
.stat.s-blue::after{background:var(--blue2);}
.stat.s-red::after{background:var(--red2);}
.stat.s-amber::after{background:#c97a2d;}
.stat-lbl{font-size:10.5px;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;font-family:'DM Mono',monospace;margin-bottom:7px;}
.stat-val{font-size:30px;font-family:'Cormorant Garamond',serif;color:var(--ink);line-height:1;font-weight:600;}
.stat-sub{font-size:11.5px;color:var(--muted);margin-top:5px;}

/* ── TABLE ── */
.tbl{width:100%;border-collapse:collapse;}
.tbl th{text-align:left;padding:9px 14px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);font-family:'DM Mono',monospace;font-weight:400;border-bottom:1px solid var(--border);background:var(--surface);}
.tbl td{padding:12px 14px;font-size:13px;color:var(--ink);border-bottom:1px solid var(--border2);vertical-align:middle;}
.tbl tr:last-child td{border-bottom:none;}
.tbl tbody tr:hover td{background:var(--surface);cursor:pointer;}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:10.5px;font-weight:500;font-family:'DM Mono',monospace;white-space:nowrap;}
.badge::before{content:'●';font-size:6px;}
.b-green{background:var(--green-light);color:var(--green);}
.b-gold{background:var(--gold-light);color:var(--amber);}
.b-blue{background:var(--blue-light);color:var(--blue);}
.b-red{background:var(--red-light);color:var(--red2);}
.b-slate{background:var(--surface2);color:var(--slate);}
.b-amber{background:var(--amber-light);color:var(--amber);}
.b-purple{background:#f0eafa;color:#5a3a8a;}

/* ── CASE ID ── */
.cid{font-family:'DM Mono',monospace;font-size:11.5px;color:var(--slate);background:var(--surface);padding:2px 7px;border-radius:4px;border:1px solid var(--border);}

/* ── FORMS ── */
.fg{display:flex;flex-direction:column;gap:5px;}
.fg-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.fg-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.fg.span2{grid-column:span 2;}
.flbl{font-size:10.5px;font-weight:600;color:var(--slate);letter-spacing:0.06em;text-transform:uppercase;font-family:'DM Mono',monospace;}
.finp{padding:9px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;color:var(--ink);background:var(--white);font-family:'DM Sans',sans-serif;transition:border-color 0.13s;outline:none;width:100%;}
.finp:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(184,148,58,0.1);}
.fsel{padding:9px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;color:var(--ink);background:var(--white);font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;width:100%;}
.fsel:focus{border-color:var(--gold2);}
.fsec{font-size:10px;text-transform:uppercase;letter-spacing:0.13em;color:var(--muted);font-family:'DM Mono',monospace;margin:18px 0 11px;padding-bottom:7px;border-bottom:1px solid var(--border);}

/* ── TIMELINE ── */
.timeline{position:relative;padding-left:26px;}
.timeline::before{content:'';position:absolute;left:8px;top:6px;bottom:6px;width:1px;background:var(--border);}
.tl-entry{position:relative;margin-bottom:18px;}
.tl-dot{position:absolute;left:-20px;top:4px;width:9px;height:9px;border-radius:50%;background:var(--gold2);border:2px solid var(--white);box-shadow:0 0 0 2px var(--gold2);}
.tl-dot.g{background:var(--green2);box-shadow:0 0 0 2px var(--green2);}
.tl-dot.b{background:var(--blue2);box-shadow:0 0 0 2px var(--blue2);}
.tl-dot.r{background:var(--red2);box-shadow:0 0 0 2px var(--red2);}
.tl-dot.p{background:#7a4a9a;box-shadow:0 0 0 2px #7a4a9a;}
.tl-time{font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);margin-bottom:2px;}
.tl-action{font-size:13px;color:var(--ink);font-weight:500;}
.tl-detail{font-size:11.5px;color:var(--slate);margin-top:2px;}

/* ── STORAGE MAP ── */
.cooler-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.cooler{border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.cooler-head{background:var(--ink);color:#fff;padding:9px 13px;font-size:11.5px;font-weight:600;font-family:'DM Mono',monospace;display:flex;justify-content:space-between;align-items:center;}
.cooler-cap{font-size:9.5px;color:rgba(255,255,255,0.4);}
.shelf-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;padding:10px;background:var(--surface);}
.shelf{border-radius:5px;padding:7px 9px;font-size:10.5px;font-family:'DM Mono',monospace;border:1px solid transparent;}
.shelf.occupied{background:#fff0f0;border-color:var(--red-border);color:var(--red2);}
.shelf.available{background:#f0fff8;border-color:var(--green-border);color:var(--green);}
.shelf.reserved{background:var(--gold-light);border-color:var(--gold-border);color:var(--amber);}
.shelf.maintenance{background:var(--surface2);border-color:var(--border);color:var(--muted);}
.shelf-id{font-weight:600;margin-bottom:2px;}
.shelf-occ{font-size:9.5px;opacity:0.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* ── MODAL ── */
.overlay{position:fixed;inset:0;background:rgba(20,20,32,0.65);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;}
.modal{background:var(--white);border-radius:12px;width:100%;max-width:660px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,0.22);}
.modal-head{padding:22px 26px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:flex-start;position:sticky;top:0;background:var(--white);z-index:1;}
.modal-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--ink);font-weight:600;}
.modal-sub{font-size:11px;color:var(--muted);margin-top:3px;font-family:'DM Mono',monospace;}
.modal-body{padding:22px 26px;}
.modal-foot{padding:14px 26px 22px;display:flex;justify-content:flex-end;gap:9px;border-top:1px solid var(--border);}
.x-btn{background:none;border:none;cursor:pointer;font-size:21px;color:var(--muted);padding:2px 5px;line-height:1;}
.x-btn:hover{color:var(--ink);}

/* ── VERIFY ── */
.verify-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--border);border-radius:8px;margin-bottom:8px;background:var(--surface);cursor:pointer;transition:all 0.13s;}
.verify-item.checked{border-color:var(--green-border);background:var(--green-light);}
.vcheck{width:26px;height:26px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;transition:all 0.13s;color:transparent;}
.verify-item.checked .vcheck{background:var(--green2);border-color:var(--green2);color:#fff;}
.vlbl{font-size:13px;color:var(--ink);}
.vval{font-family:'DM Mono',monospace;font-size:11px;color:var(--gold);margin-top:2px;}

/* ── ALERTS ── */
.alert{display:flex;align-items:flex-start;gap:11px;padding:11px 13px;border-radius:7px;margin-bottom:8px;border:1px solid;}
.alert.warn{background:var(--amber-light);border-color:var(--amber-border);}
.alert.danger{background:var(--red-light);border-color:var(--red-border);}
.alert.info{background:var(--blue-light);border-color:var(--blue-border);}
.alert.success{background:var(--green-light);border-color:var(--green-border);}
.alert-ico{font-size:15px;margin-top:1px;flex-shrink:0;}
.alert-txt{font-size:13px;color:var(--ink);font-weight:500;}
.alert-sub{font-size:11px;color:var(--muted);margin-top:2px;font-family:'DM Mono',monospace;}

/* ── CASE HERO ── */
.case-hero{background:var(--ink);border-radius:10px;padding:22px 26px;margin-bottom:18px;color:#fff;display:flex;justify-content:space-between;align-items:flex-start;}
.ch-name{font-family:'Cormorant Garamond',serif;font-size:26px;margin-bottom:4px;font-weight:400;}
.ch-meta{font-size:11.5px;color:rgba(255,255,255,0.45);font-family:'DM Mono',monospace;line-height:1.8;}
.ch-meta span{color:rgba(255,255,255,0.7);}
.ch-right{text-align:right;}
.ch-id{font-family:'DM Mono',monospace;font-size:12px;color:var(--gold2);margin-bottom:7px;}
.loc-pill{display:inline-flex;align-items:center;gap:7px;background:rgba(184,148,58,0.15);border:1px solid rgba(184,148,58,0.25);border-radius:7px;padding:8px 14px;font-family:'DM Mono',monospace;font-size:11.5px;color:var(--gold2);margin-top:12px;}

/* ── INFO GRID ── */
.ig{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;}
.ig-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.ii-lbl{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:3px;}
.ii-val{font-size:13px;color:var(--ink);font-weight:500;}

/* ── TWO/THREE COL ── */
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.three-col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}

/* ── SUCCESS ── */
.success-ring{width:72px;height:72px;border-radius:50%;background:var(--green-light);border:2px solid var(--green2);display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 16px;animation:pop 0.4s cubic-bezier(.34,1.56,.64,1);}
@keyframes pop{from{transform:scale(0.5);opacity:0;}to{transform:scale(1);opacity:1;}}

/* ── POWER OUTAGE ── */
.outage-banner{background:var(--red-light);border:1px solid var(--red-border);border-radius:9px;padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;}
.outage-left{display:flex;align-items:center;gap:12px;}
.outage-ico{font-size:22px;}
.outage-title{font-size:14px;color:var(--red2);font-weight:600;}
.outage-sub{font-size:11.5px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:2px;}
.outage-timer{font-family:'DM Mono',monospace;font-size:22px;color:var(--red2);font-weight:500;}
.cooler-timer{font-family:'DM Mono',monospace;font-size:11px;color:var(--red2);background:var(--red-light);border:1px solid var(--red-border);border-radius:4px;padding:2px 7px;margin-top:3px;display:inline-block;}
.cooler-timer.safe{color:var(--amber);background:var(--amber-light);border-color:var(--amber-border);}

/* ── SUPER ADMIN ── */
.facility-card{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:16px 18px;cursor:pointer;transition:all 0.13s;margin-bottom:10px;}
.facility-card:hover{border-color:var(--gold-border);box-shadow:0 2px 12px rgba(0,0,0,0.06);}
.fc-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}
.fc-name{font-size:15px;font-weight:600;color:var(--ink);}
.fc-loc{font-size:11.5px;color:var(--muted);margin-top:2px;font-family:'DM Mono',monospace;}
.fc-stats{display:flex;gap:16px;}
.fc-stat{text-align:center;}
.fc-stat-val{font-size:20px;font-family:'Cormorant Garamond',serif;font-weight:600;color:var(--ink);}
.fc-stat-lbl{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:0.08em;}
.cap-bar{height:4px;background:var(--border);border-radius:2px;overflow:hidden;margin-top:8px;}
.cap-fill{height:100%;border-radius:2px;transition:width 0.3s;}
.cap-fill.low{background:var(--green2);}
.cap-fill.mid{background:var(--gold2);}
.cap-fill.high{background:var(--red2);}

/* ── CREMATION ── */
.crema-flow{display:flex;gap:0;margin-bottom:20px;border:1px solid var(--border);border-radius:9px;overflow:hidden;}
.cf-step{flex:1;padding:12px 14px;text-align:center;font-size:11.5px;color:var(--muted);border-right:1px solid var(--border);background:var(--surface);transition:all 0.13s;}
.cf-step:last-child{border-right:none;}
.cf-step.done{background:var(--green-light);color:var(--green);}
.cf-step.active{background:var(--gold-light);color:var(--amber);font-weight:600;}
.cf-step-ico{font-size:18px;margin-bottom:5px;}
.cf-step-lbl{font-size:10px;text-transform:uppercase;letter-spacing:0.08em;font-family:'DM Mono',monospace;}

/* ── DRIVER LINK ── */
.driver-link-box{background:var(--ink);border-radius:9px;padding:16px 18px;margin-bottom:16px;}
.dl-label{font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.35);font-family:'DM Mono',monospace;margin-bottom:8px;}
.dl-url{font-family:'DM Mono',monospace;font-size:12px;color:var(--gold2);word-break:break-all;margin-bottom:10px;}
.dl-actions{display:flex;gap:8px;}
.dl-btn{padding:6px 13px;border-radius:5px;font-size:12px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;}
.dl-btn.copy{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);}
.dl-btn.whatsapp{background:#25d366;color:#fff;}
.dl-btn.sms{background:var(--blue2);color:#fff;}

/* ── MISC ── */
.divider{border:none;border-top:1px solid var(--border);margin:16px 0;}
.empty{text-align:center;padding:40px 20px;color:var(--muted);}
.empty-ico{font-size:32px;margin-bottom:10px;}
.search-box{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:7px 12px;}
.search-inp{border:none;background:none;outline:none;font-size:13px;color:var(--ink);font-family:'DM Sans',sans-serif;width:200px;}
.search-inp::placeholder{color:var(--muted);}
.gen-id-box{background:var(--ink);color:var(--gold2);font-family:'DM Mono',monospace;font-size:20px;font-weight:500;padding:16px 20px;border-radius:8px;text-align:center;letter-spacing:0.12em;margin:14px 0;}
.gen-id-lbl{font-size:9px;color:rgba(255,255,255,0.35);letter-spacing:0.12em;margin-bottom:5px;}
.qr-box{width:76px;height:76px;border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;background:var(--surface);font-size:26px;flex-shrink:0;}
.back-btn{display:inline-flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;color:var(--muted);font-size:13px;font-family:'DM Sans',sans-serif;padding:0 0 14px 0;}
.back-btn:hover{color:var(--ink);}
.note-box{font-size:12px;color:var(--muted);background:var(--surface);border:1px solid var(--border);border-radius:7px;padding:10px 13px;line-height:1.6;}
.role-tag{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:4px;font-size:10px;font-family:'DM Mono',monospace;font-weight:500;}
.rt-superadmin{background:#f0eafa;color:#5a3a8a;}
.rt-admin{background:var(--gold-light);color:var(--amber);}
.rt-senior{background:var(--blue-light);color:var(--blue);}
.rt-staff{background:var(--surface2);color:var(--slate);}
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

const FACILITIES = [
  { id:"f1", name:"Pretoria Main", location:"Pretoria, GP", type:"Funeral Home", cases:4, capacity:74, alerts:1, status:"green" },
  { id:"f2", name:"Johannesburg North", location:"Randburg, GP", type:"Funeral Home", cases:7, capacity:88, alerts:2, status:"red" },
  { id:"f3", name:"Cape Town Central", location:"Cape Town, WC", type:"Mortuary", cases:3, capacity:45, alerts:0, status:"green" },
  { id:"f4", name:"Durban Coast", location:"Durban, KZN", type:"Funeral Home", cases:2, capacity:30, alerts:0, status:"green" },
];

const CASES = [
  { id:"CL-2024-0041", name:"Margaret Elaine Foster", dob:"1941-03-12", dod:"2024-11-14", source:"Sunridge Hospital", intakeDate:"2024-11-14", intakeTime:"09:14", staff:"T. Dlamini", facility:"f1",
    location:{ facility:"Pretoria Main", room:"Mortuary Room A", cooler:"Cooler 2", shelf:"Shelf B3" },
    status:"In Storage", kin:"Robert Foster (Son)", director:"Grace Funeral Services",
    disposition:"burial", cremStep:0,
    log:[
      { time:"09:14", date:"14 Nov 2024", action:"Intake — Received from Sunridge Hospital", staff:"T. Dlamini", dot:"" },
      { time:"09:20", date:"14 Nov 2024", action:"Identification verified — documentation complete", staff:"T. Dlamini", dot:"b" },
      { time:"09:23", date:"14 Nov 2024", action:"Placed in Cooler 2 — Shelf B3", staff:"T. Dlamini", dot:"g" },
      { time:"13:45", date:"15 Nov 2024", action:"Removed for preparation", staff:"N. Khumalo", dot:"" },
      { time:"15:10", date:"15 Nov 2024", action:"Returned to storage — Cooler 2 Shelf B3", staff:"N. Khumalo", dot:"g" },
    ]},
  { id:"CL-2024-0042", name:"Samuel James Okonkwo", dob:"1958-07-22", dod:"2024-11-15", source:"Police — Scene", intakeDate:"2024-11-15", intakeTime:"14:05", staff:"N. Khumalo", facility:"f1",
    location:{ facility:"Pretoria Main", room:"Mortuary Room B", cooler:"Cooler 1", shelf:"Shelf A1" },
    status:"Awaiting Release", kin:"Amara Okonkwo (Wife)", director:"Sunrise Memorial",
    disposition:"burial", cremStep:0,
    log:[
      { time:"14:05", date:"15 Nov 2024", action:"Intake — Received from SAPS Scene", staff:"N. Khumalo", dot:"" },
      { time:"14:18", date:"15 Nov 2024", action:"Identification pending — awaiting NOK confirmation", staff:"N. Khumalo", dot:"r" },
      { time:"16:42", date:"15 Nov 2024", action:"Identification confirmed by Amara Okonkwo", staff:"T. Dlamini", dot:"b" },
      { time:"16:50", date:"15 Nov 2024", action:"Placed in Cooler 1 — Shelf A1", staff:"T. Dlamini", dot:"g" },
    ]},
  { id:"CL-2024-0043", name:"Beatrice Anne Naidoo", dob:"1972-11-03", dod:"2024-11-16", source:"Hillcrest Clinic", intakeDate:"2024-11-16", intakeTime:"07:30", staff:"T. Dlamini", facility:"f1",
    location:{ facility:"Pretoria Main", room:"Mortuary Room A", cooler:"Cooler 3", shelf:"Shelf A2" },
    status:"At Crematorium", kin:"Priya Naidoo (Daughter)", director:"Valley Funeral Home",
    disposition:"cremation", cremStep:2,
    crematorium:"Avbob Crematorium, Pretoria", cremSentDate:"2024-11-17", cremExpectedReturn:"2024-11-19",
    log:[
      { time:"07:30", date:"16 Nov 2024", action:"Intake — Received from Hillcrest Clinic", staff:"T. Dlamini", dot:"" },
      { time:"07:45", date:"16 Nov 2024", action:"Identification verified", staff:"T. Dlamini", dot:"b" },
      { time:"07:52", date:"16 Nov 2024", action:"Placed in Cooler 3 — Shelf A2", staff:"T. Dlamini", dot:"g" },
      { time:"10:15", date:"17 Nov 2024", action:"Released to crematorium — Avbob Crematorium, Pretoria", staff:"N. Khumalo", dot:"p" },
      { time:"10:28", date:"17 Nov 2024", action:"Collection confirmed by driver — S. Mokotha, GP 445-231", staff:"Driver", dot:"" },
      { time:"11:04", date:"17 Nov 2024", action:"Arrival confirmed by Avbob Crematorium", staff:"Avbob Staff", dot:"g" },
    ]},
  { id:"CL-2024-0044", name:"David Peter Steyn", dob:"1945-01-09", dod:"2024-11-16", source:"Home — Natural Causes", intakeDate:"2024-11-16", intakeTime:"11:20", staff:"L. Mokoena", facility:"f1",
    location:{ facility:"Pretoria Main", room:"Mortuary Room A", cooler:"Cooler 4", shelf:"Shelf B1" },
    status:"In Storage", kin:"Helen Steyn (Wife)", director:"Cape Memorial",
    disposition:"burial", cremStep:0,
    log:[
      { time:"11:20", date:"16 Nov 2024", action:"Intake — Received from family home", staff:"L. Mokoena", dot:"" },
      { time:"11:35", date:"16 Nov 2024", action:"Identification verified", staff:"L. Mokoena", dot:"b" },
      { time:"11:40", date:"16 Nov 2024", action:"Placed in Cooler 4 — Shelf B1", staff:"L. Mokoena", dot:"g" },
    ]},
];

const STORAGE_INIT = {
  "Cooler 1":[ {id:"A1",status:"occupied",occ:"S. J. Okonkwo"},{id:"A2",status:"available"},{id:"B1",status:"available"},{id:"B2",status:"maintenance"} ],
  "Cooler 2":[ {id:"A1",status:"available"},{id:"A2",status:"reserved",occ:"Reserved - Grace FS"},{id:"B1",status:"available"},{id:"B2",status:"available"},{id:"B3",status:"occupied",occ:"M. E. Foster"},{id:"B4",status:"available"} ],
  "Cooler 3":[ {id:"A1",status:"available"},{id:"A2",status:"available"},{id:"B1",status:"available"},{id:"B2",status:"available"} ],
  "Cooler 4":[ {id:"A1",status:"available"},{id:"A2",status:"available"},{id:"B1",status:"occupied",occ:"D. P. Steyn"},{id:"B2",status:"available"} ],
};

const STAFF_LIST = [
  { id:"u1", name:"Sarah Dlamini", initials:"SD", role:"superadmin", email:"sarah@gracegroup.co.za", facility:"All Facilities" },
  { id:"u2", name:"T. Dlamini", initials:"TD", role:"admin", email:"t.dlamini@gracegroup.co.za", facility:"Pretoria Main" },
  { id:"u3", name:"N. Khumalo", initials:"NK", role:"senior", email:"n.khumalo@gracegroup.co.za", facility:"Pretoria Main" },
  { id:"u4", name:"L. Mokoena", initials:"LM", role:"staff", email:"l.mokoena@gracegroup.co.za", facility:"Pretoria Main" },
  { id:"u5", name:"P. van der Berg", initials:"PV", role:"admin", email:"p.vdb@gracegroup.co.za", facility:"Johannesburg North" },
];

const STATUS_BADGE = {
  "In Storage":"b-blue","Awaiting Release":"b-gold","In Preparation":"b-gold",
  "At Crematorium":"b-purple","Awaiting Ashes":"b-amber","Ashes in Storage":"b-green",
  "Released to Family":"b-green","Final Disposition":"b-slate","In Transit":"b-amber",
};

const CREM_STEPS = ["Released","Collected","At Crematorium","Cremation Done","Ashes Dispatched","Ashes Received"];

function now() {
  const d = new Date();
  return { time: d.toTimeString().slice(0,5), date: d.toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"}) };
}

function useOutageTimer(active) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!active) { setSecs(0); return; }
    const t = setInterval(() => setSecs(s => s+1), 1000);
    return () => clearInterval(t);
  }, [active]);
  const h = Math.floor(secs/3600), m = Math.floor((secs%3600)/60), s = secs%60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function PowerOutageBanner({ outage, timer, onToggle }) {
  return outage ? (
    <div className="outage-banner">
      <div className="outage-left">
        <div className="outage-ico">⚡</div>
        <div>
          <div className="outage-title">Power Outage Active — Load Shedding Stage 4</div>
          <div className="outage-sub">Outage started · Cooler temp monitoring active · SMS alerts enabled</div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <div className="outage-timer">{timer}</div>
        <button className="btn btn-green btn-sm" onClick={onToggle}>Power Restored</button>
      </div>
    </div>
  ) : (
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
      <button className="btn btn-red btn-sm" onClick={onToggle}>⚡ Log Power Outage</button>
    </div>
  );
}

// ── SUPER ADMIN VIEW ──────────────────────────────────────────────────────────
function SuperAdminView({ onSelectFacility }) {
  const total = FACILITIES.reduce((a,f) => a+f.cases, 0);
  const alerts = FACILITIES.reduce((a,f) => a+f.alerts, 0);
  return (
    <div>
      <div className="stats-row">
        <div className="stat s-gold"><div className="stat-lbl">Total Active Cases</div><div className="stat-val">{total}</div><div className="stat-sub">Across all facilities</div></div>
        <div className="stat s-blue"><div className="stat-lbl">Facilities</div><div className="stat-val">{FACILITIES.length}</div><div className="stat-sub">All online</div></div>
        <div className="stat s-red"><div className="stat-lbl">Active Alerts</div><div className="stat-val">{alerts}</div><div className="stat-sub">Require attention</div></div>
        <div className="stat s-green"><div className="stat-lbl">This Month</div><div className="stat-val">31</div><div className="stat-sub">Cases processed</div></div>
      </div>
      <div className="alert info"><div className="alert-ico">ℹ️</div><div><div className="alert-txt">Johannesburg North approaching storage capacity</div><div className="alert-sub">88% occupied · 2 active alerts · Last updated 14 min ago</div></div></div>
      <div style={{marginTop:18}}>
        <div style={{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:12}}>All Facilities</div>
        {FACILITIES.map(f => {
          const capClass = f.capacity >= 80 ? "high" : f.capacity >= 60 ? "mid" : "low";
          return (
            <div key={f.id} className="facility-card" onClick={() => onSelectFacility(f)}>
              <div className="fc-head">
                <div>
                  <div className="fc-name">{f.name}</div>
                  <div className="fc-loc">{f.location} · {f.type}</div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  {f.alerts > 0 && <span className="badge b-red">{f.alerts} alert{f.alerts>1?"s":""}</span>}
                  <span className={`badge ${f.status==="green"?"b-green":"b-red"}`}>{f.status==="green"?"Online":"Attention"}</span>
                </div>
              </div>
              <div className="fc-stats">
                <div className="fc-stat"><div className="fc-stat-val">{f.cases}</div><div className="fc-stat-lbl">Active Cases</div></div>
                <div className="fc-stat"><div className="fc-stat-val">{f.capacity}%</div><div className="fc-stat-lbl">Capacity</div></div>
              </div>
              <div className="cap-bar"><div className={`cap-fill ${capClass}`} style={{width:`${f.capacity}%`}} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ cases, outage, timer, onToggleOutage, onView, onNew, storage }) {
  const active = cases.filter(c => c.status !== "Final Disposition" && c.status !== "Released to Family").length;
  const inStorage = cases.filter(c => c.status === "In Storage").length;
  const awaitingAshesCases = cases.filter(c => c.status === "Awaiting Ashes");
  return (
    <div>
      <PowerOutageBanner outage={outage} timer={timer} onToggle={onToggleOutage} />
      {outage && (
        <div className="card" style={{marginBottom:18}}>
          <div className="card-head"><div className="card-title">⚡ Cooler Temperature Watch</div></div>
          <div className="card-body">
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {Object.entries(storage).map(([name,shelves]) => {
                const occ = shelves.filter(s=>s.status==="occupied").length;
                const mins = Math.floor(parseInt(timer.split(":")[1]||0));
                const safe = mins < 90;
                return (
                  <div key={name} style={{border:"1px solid var(--border)",borderRadius:7,padding:"10px 12px"}}>
                    <div style={{fontSize:11,fontFamily:"DM Mono,monospace",fontWeight:600,color:"var(--ink)",marginBottom:4}}>{name}</div>
                    <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>{occ} occupied</div>
                    <div className={`cooler-timer ${safe?"safe":""}`}>{safe?"⚠":"🔴"} {timer}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="stats-row">
        <div className="stat s-gold"><div className="stat-lbl">Active Cases</div><div className="stat-val">{active}</div><div className="stat-sub">In facility</div></div>
        <div className="stat s-blue"><div className="stat-lbl">In Storage</div><div className="stat-val">{inStorage}</div><div className="stat-sub">Coolers occupied</div></div>
        <div className="stat s-amber"><div className="stat-lbl">At Crematorium</div><div className="stat-val">{cases.filter(c=>c.status==="At Crematorium").length}</div><div className="stat-sub">Awaiting return</div></div>
        <div className="stat s-red"><div className="stat-lbl">Alerts</div><div className="stat-val">1</div><div className="stat-sub">Require attention</div></div>
      </div>
      <div className="two-col" style={{marginBottom:18}}>
        <div>
          <div className="alert warn"><div className="alert-ico">⚠️</div><div><div className="alert-txt">Release verification pending</div><div className="alert-sub">CL-2024-0042 · S. J. Okonkwo · Awaiting transport</div></div></div>
          {awaitingAshesCases.map(c => (
            <div key={c.id} className="alert danger"><div className="alert-ico">🔴</div><div><div className="alert-txt">Ashes return overdue</div><div className="alert-sub">{c.id} · {c.name} · Expected {c.cremExpectedReturn}</div></div></div>
          ))}
          <div className="alert info"><div className="alert-ico">📧</div><div><div className="alert-txt">Automated alert sent</div><div className="alert-sub">Release notification dispatched to Robert Foster · 08:14</div></div></div>
        </div>
        <div style={{background:"var(--white)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 18px"}}>
          <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"DM Mono,monospace",marginBottom:10}}>Today's Activity</div>
          <div style={{fontSize:13,color:"var(--slate)",lineHeight:2}}>
            <div>📥 2 new intakes</div>
            <div>🔄 3 movements logged</div>
            <div>🚐 1 transport in progress</div>
            <div>📧 4 automated alerts sent</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">Active Cases — Pretoria Main</div>
          <button className="btn btn-gold btn-sm" onClick={onNew}>+ New Intake</button>
        </div>
        <table className="tbl">
          <thead><tr><th>Case ID</th><th>Name</th><th>Intake</th><th>Location</th><th>Disposition</th><th>Status</th></tr></thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id} onClick={() => onView(c)}>
                <td><span className="cid">{c.id}</span></td>
                <td style={{fontWeight:500}}>{c.name}</td>
                <td style={{fontFamily:"DM Mono,monospace",fontSize:11.5}}>{c.intakeDate}</td>
                <td style={{fontSize:12,color:"var(--slate)"}}>{c.location.cooler} · {c.location.shelf}</td>
                <td><span className={`badge ${c.disposition==="cremation"?"b-purple":"b-blue"}`}>{c.disposition==="cremation"?"Cremation":"Burial"}</span></td>
                <td><span className={`badge ${STATUS_BADGE[c.status]||"b-slate"}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── CASE DETAIL ───────────────────────────────────────────────────────────────
function CaseDetail({ c, onBack, onMove, onCremUpdate, onRelease }) {
  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Back to Cases</button>
      <div className="case-hero">
        <div>
          <div className="ch-name">{c.name}</div>
          <div className="ch-meta">
            DOB: <span>{c.dob}</span> &nbsp;·&nbsp; DOD: <span>{c.dod}</span><br/>
            Source: <span>{c.source}</span> &nbsp;·&nbsp; Director: <span>{c.director}</span>
          </div>
          <div className="loc-pill">📍 {c.location.cooler} · {c.location.shelf}</div>
        </div>
        <div className="ch-right">
          <div className="ch-id">{c.id}</div>
          <span className={`badge ${STATUS_BADGE[c.status]||"b-slate"}`}>{c.status}</span>
          <div style={{marginTop:12}}><div className="qr-box" style={{marginLeft:"auto"}}>⬛</div><div style={{fontSize:9.5,color:"rgba(255,255,255,0.3)",textAlign:"center",marginTop:4,fontFamily:"DM Mono,monospace"}}>ID TAG</div></div>
        </div>
      </div>

      {c.disposition === "cremation" && (
        <div className="card" style={{marginBottom:18}}>
          <div className="card-head"><div className="card-title">Cremation Journey</div><button className="btn btn-ghost btn-sm" onClick={() => onCremUpdate(c)}>Update Status</button></div>
          <div className="card-body">
            <div className="crema-flow">
              {CREM_STEPS.map((s,i) => (
                <div key={s} className={`cf-step ${i < c.cremStep ? "done" : i === c.cremStep ? "active" : ""}`}>
                  <div className="cf-step-ico">{i < c.cremStep ? "✓" : i === c.cremStep ? "●" : "○"}</div>
                  <div className="cf-step-lbl">{s}</div>
                </div>
              ))}
            </div>
            {c.crematorium && <div className="note-box">🏭 <strong>Crematorium:</strong> {c.crematorium} &nbsp;·&nbsp; Sent: {c.cremSentDate} &nbsp;·&nbsp; Expected return: {c.cremExpectedReturn}</div>}
          </div>
        </div>
      )}

      <div className="two-col">
        <div>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-head"><div className="card-title">Personal Details</div></div>
            <div className="card-body">
              <div className="ig-2">
                <div><div className="ii-lbl">Next of Kin</div><div className="ii-val">{c.kin}</div></div>
                <div><div className="ii-lbl">Funeral Director</div><div className="ii-val">{c.director}</div></div>
                <div><div className="ii-lbl">Intake Staff</div><div className="ii-val">{c.staff}</div></div>
                <div><div className="ii-lbl">Intake Time</div><div className="ii-val" style={{fontFamily:"DM Mono,monospace",fontSize:12}}>{c.intakeDate} {c.intakeTime}</div></div>
                <div><div className="ii-lbl">Disposition</div><div className="ii-val" style={{textTransform:"capitalize"}}>{c.disposition}</div></div>
                <div><div className="ii-lbl">Facility</div><div className="ii-val">Pretoria Main</div></div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-head"><div className="card-title">Documents</div><button className="btn btn-ghost btn-sm">+ Upload</button></div>
            <div className="card-body">
              <div style={{fontSize:13,color:"var(--slate)",lineHeight:2}}>
                📄 Death Certificate · <span style={{color:"var(--green)",fontSize:12}}>✓ Attached</span><br/>
                📋 Burial Authorization · <span style={{color:"var(--amber)",fontSize:12}}>Pending</span><br/>
                🪪 ID Document · <span style={{color:"var(--green)",fontSize:12}}>✓ Attached</span>
              </div>
            </div>
          </div>
          <div style={{marginTop:14,display:"flex",gap:9}}>
            <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => onMove(c)}>Log Movement</button>
            <button className="btn btn-gold btn-sm" style={{flex:1}} onClick={() => onRelease(c)}>Release to Family</button>
          </div>
        </div>
        <div>
          <div className="card">
            <div className="card-head"><div className="card-title">Chain-of-Custody Log</div></div>
            <div className="card-body">
              <div className="timeline">
                {[...c.log].reverse().map((e,i) => (
                  <div className="tl-entry" key={i}>
                    <div className={`tl-dot ${e.dot}`} />
                    <div className="tl-time">{e.date} · {e.time}</div>
                    <div className="tl-action">{e.action}</div>
                    <div className="tl-detail">Staff: {e.staff}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STORAGE MAP ───────────────────────────────────────────────────────────────
function StorageMap({ storage, onAddShelf, onAddCooler }) {
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        {Object.entries(storage).map(([name,shelves]) => {
          const occ = shelves.filter(s=>s.status==="occupied").length;
          return (
            <div key={name} className="stat s-blue">
              <div className="stat-lbl">{name}</div>
              <div className="stat-val">{occ}<span style={{fontSize:14,color:"var(--muted)"}}>/{shelves.length}</span></div>
              <div className="stat-sub">Shelves occupied</div>
            </div>
          );
        })}
      </div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">Storage Layout — Pretoria Main</div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{display:"flex",gap:12,fontSize:11.5,color:"var(--muted)"}}>
              <span style={{color:"var(--red2)"}}>● Occupied</span>
              <span style={{color:"var(--green)"}}>● Available</span>
              <span style={{color:"var(--amber)"}}>● Reserved</span>
              <span>● Maintenance</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onAddCooler}>+ Add Unit</button>
          </div>
        </div>
        <div style={{padding:18}}>
          <div className="cooler-grid">
            {Object.entries(storage).map(([name,shelves]) => (
              <div key={name} className="cooler">
                <div className="cooler-head">
                  <span>{name}</span>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span className="cooler-cap">{shelves.filter(s=>s.status==="occupied").length}/{shelves.length} occupied</span>
                    <button style={{background:"rgba(255,255,255,0.12)",border:"none",color:"rgba(255,255,255,0.6)",borderRadius:4,padding:"2px 8px",fontSize:11,cursor:"pointer",fontFamily:"DM Mono,monospace"}} onClick={() => onAddShelf(name)}>+ Shelf</button>
                  </div>
                </div>
                <div className="shelf-grid">
                  {shelves.map(s => (
                    <div key={s.id} className={`shelf ${s.status}`}>
                      <div className="shelf-id">Shelf {s.id}</div>
                      <div className="shelf-occ">{s.occ || s.status.charAt(0).toUpperCase()+s.status.slice(1)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STAFF / ROLES ─────────────────────────────────────────────────────────────
function StaffView() {
  const roleLabel = { superadmin:"Super Admin", admin:"Facility Admin", senior:"Senior Staff", staff:"Staff" };
  const roleClass = { superadmin:"rt-superadmin", admin:"rt-admin", senior:"rt-senior", staff:"rt-staff" };
  return (
    <div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">Staff Accounts — Pretoria Main</div>
          <button className="btn btn-gold btn-sm">+ Add Staff</button>
        </div>
        <table className="tbl">
          <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Facility</th><th>Status</th></tr></thead>
          <tbody>
            {STAFF_LIST.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div className="sb-avatar" style={{width:28,height:28,fontSize:10}}>{s.initials}</div>
                    <span style={{fontWeight:500}}>{s.name}</span>
                  </div>
                </td>
                <td><span className={`role-tag ${roleClass[s.role]}`}>{roleLabel[s.role]}</span></td>
                <td style={{fontFamily:"DM Mono,monospace",fontSize:11.5}}>{s.email}</td>
                <td style={{fontSize:12,color:"var(--slate)"}}>{s.facility}</td>
                <td><span className="badge b-green">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="note-box" style={{marginTop:14}}>
        🔒 <strong>Role permissions:</strong> Super Admin sees all facilities. Facility Admin manages one site. Senior Staff can intake and release. Staff can log movements only. Drivers access via one-time link — no account required.
      </div>
    </div>
  );
}

// ── MODALS ────────────────────────────────────────────────────────────────────

function IntakeModal({ onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName:"", lastName:"", dob:"", dod:"", idNum:"", source:"", disposition:"burial", intakeTime:"09:00", staff:"T. Dlamini", kin:"", director:"", cooler:"Cooler 2", shelf:"A1" });
  const [genId, setGenId] = useState("");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleGen = () => {
    setGenId(`CL-2024-00${Math.floor(45+Math.random()*10)}`);
    setStep(2);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-head">
          <div><div className="modal-title">New Intake</div><div className="modal-sub">Step {step} of 2 · {step===1?"Deceased details":"Confirm & generate ID tag"}</div></div>
          <button className="x-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {step === 1 ? (
            <>
              <div className="fsec">Deceased Information</div>
              <div className="fg-2" style={{marginBottom:12}}>
                <div className="fg"><label className="flbl">First Name</label><input className="finp" value={form.firstName} onChange={e=>set("firstName",e.target.value)} placeholder="First name"/></div>
                <div className="fg"><label className="flbl">Last Name</label><input className="finp" value={form.lastName} onChange={e=>set("lastName",e.target.value)} placeholder="Last name"/></div>
                <div className="fg"><label className="flbl">Date of Birth</label><input type="date" className="finp" value={form.dob} onChange={e=>set("dob",e.target.value)}/></div>
                <div className="fg"><label className="flbl">Date of Death</label><input type="date" className="finp" value={form.dod} onChange={e=>set("dod",e.target.value)}/></div>
                <div className="fg"><label className="flbl">ID / National ID</label><input className="finp" value={form.idNum} onChange={e=>set("idNum",e.target.value)} placeholder="ID number"/></div>
                <div className="fg"><label className="flbl">Source</label><select className="fsel" value={form.source} onChange={e=>set("source",e.target.value)}><option value="">Select…</option><option>Hospital</option><option>Home — Natural Causes</option><option>Police — Scene</option><option>Funeral Home Transfer</option><option>Clinic</option></select></div>
              </div>
              <div className="fsec">Disposition & Intake</div>
              <div className="fg-2" style={{marginBottom:12}}>
                <div className="fg"><label className="flbl">Disposition Type</label><select className="fsel" value={form.disposition} onChange={e=>set("disposition",e.target.value)}><option value="burial">Burial</option><option value="cremation">Cremation</option></select></div>
                <div className="fg"><label className="flbl">Receiving Staff</label><select className="fsel" value={form.staff} onChange={e=>set("staff",e.target.value)}><option>T. Dlamini</option><option>N. Khumalo</option><option>L. Mokoena</option></select></div>
                <div className="fg"><label className="flbl">Next of Kin</label><input className="finp" value={form.kin} onChange={e=>set("kin",e.target.value)} placeholder="Name & relationship"/></div>
                <div className="fg"><label className="flbl">Funeral Director</label><input className="finp" value={form.director} onChange={e=>set("director",e.target.value)} placeholder="Funeral home name"/></div>
              </div>
              <div className="fsec">Initial Storage Placement</div>
              <div className="fg-2">
                <div className="fg"><label className="flbl">Cooler</label><select className="fsel" value={form.cooler} onChange={e=>set("cooler",e.target.value)}><option>Cooler 1</option><option>Cooler 2</option><option>Cooler 3</option><option>Cooler 4</option></select></div>
                <div className="fg"><label className="flbl">Shelf</label><select className="fsel" value={form.shelf} onChange={e=>set("shelf",e.target.value)}><option>A1</option><option>A2</option><option>B1</option><option>B2</option></select></div>
              </div>
            </>
          ) : (
            <>
              <div className="alert success" style={{marginBottom:16}}><div className="alert-ico">✅</div><div className="alert-txt">Case record created. Print tag and attach to deceased immediately.</div></div>
              <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                <div style={{flex:1}}>
                  <div className="gen-id-box"><div className="gen-id-lbl">CUSTODYLEDGER · CASE ID</div>{genId}</div>
                  <div style={{fontSize:12.5,color:"var(--slate)",lineHeight:1.9}}><strong>Name:</strong> {form.firstName} {form.lastName}<br/><strong>Placement:</strong> {form.cooler} · Shelf {form.shelf}<br/><strong>Disposition:</strong> {form.disposition}<br/><strong>Staff:</strong> {form.staff}</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div className="qr-box" style={{width:88,height:88,fontSize:32}}>⬛</div>
                  <div style={{fontSize:9.5,color:"var(--muted)",marginTop:5,fontFamily:"DM Mono,monospace"}}>QR CODE</div>
                  <button className="btn btn-ghost btn-sm" style={{marginTop:8}}>🖨 Print Tag</button>
                </div>
              </div>
              <hr className="divider"/>
              <div className="note-box">📧 <strong>Automated alert sent:</strong> Intake notification dispatched to facility admin with case summary and location.</div>
            </>
          )}
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          {step===1
            ? <button className="btn btn-gold" onClick={handleGen} disabled={!form.firstName||!form.lastName||!form.source}>Generate Case ID →</button>
            : <button className="btn btn-gold" onClick={() => { onSubmit(form, genId); onClose(); }}>✓ Complete Intake</button>
          }
        </div>
      </div>
    </div>
  );
}

function MoveModal({ c, onClose, onSubmit }) {
  const [checks, setChecks] = useState([false,false,false]);
  const [cooler, setCooler] = useState("Cooler 3");
  const [shelf, setShelf] = useState("B1");
  const [done, setDone] = useState(false);
  const toggle = i => setChecks(ch => ch.map((v,idx) => idx===i ? !v : v));
  const allChecked = checks.every(Boolean);

  const handleSubmit = () => {
    setDone(true);
    setTimeout(() => { onSubmit(c, cooler, shelf); }, 1200);
  };

  return (
    <div className="overlay">
      <div className="modal" style={{maxWidth:520}}>
        <div className="modal-head">
          <div><div className="modal-title">Log Movement</div><div className="modal-sub">{c.id} · {c.name}</div></div>
          <button className="x-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {done ? (
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div className="success-ring">✓</div>
              <div style={{fontSize:16,fontWeight:600,color:"var(--ink)"}}>Movement Logged</div>
              <div style={{fontSize:13,color:"var(--muted)",marginTop:6}}>Custody record updated · Admin notified</div>
            </div>
          ) : (
            <>
              <div style={{background:"var(--surface)",borderRadius:7,padding:"10px 14px",marginBottom:16,fontFamily:"DM Mono,monospace",fontSize:12,color:"var(--slate)"}}>Current: {c.location.cooler} · {c.location.shelf}</div>
              <div className="fsec">Verification Required</div>
              {[{l:"ID tag scanned",v:c.id},{l:"Name confirmed",v:c.name},{l:"Case number confirmed",v:c.id}].map((item,i) => (
                <div key={i} className={`verify-item ${checks[i]?"checked":""}`} onClick={() => toggle(i)}>
                  <div className="vcheck">{checks[i]?"✓":""}</div>
                  <div><div className="vlbl">{item.l}</div><div className="vval">{item.v}</div></div>
                </div>
              ))}
              <div className="fsec">New Location</div>
              <div className="fg-2">
                <div className="fg"><label className="flbl">Cooler</label><select className="fsel" value={cooler} onChange={e=>setCooler(e.target.value)}><option>Cooler 1</option><option>Cooler 2</option><option>Cooler 3</option><option>Cooler 4</option></select></div>
                <div className="fg"><label className="flbl">Shelf</label><select className="fsel" value={shelf} onChange={e=>setShelf(e.target.value)}><option>A1</option><option>A2</option><option>B1</option><option>B2</option></select></div>
              </div>
              {!allChecked && <div className="alert warn" style={{marginTop:12}}><div className="alert-ico">⚠️</div><div className="alert-txt">All three verification checks required before logging.</div></div>}
            </>
          )}
        </div>
        {!done && <div className="modal-foot"><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-primary" disabled={!allChecked} onClick={handleSubmit}>✓ Confirm Movement</button></div>}
      </div>
    </div>
  );
}

function ReleaseModal({ c, onClose, onSubmit }) {
  const [checks, setChecks] = useState([false,false,false,false]);
  const [collectorName, setCollectorName] = useState("");
  const [collectorId, setCollectorId] = useState("");
  const [photoTaken, setPhotoTaken] = useState(false);
  const [done, setDone] = useState(false);
  const toggle = i => setChecks(ch => ch.map((v,idx) => idx===i ? !v : v));
  const allChecked = checks.every(Boolean) && collectorName && collectorId && photoTaken;

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-head">
          <div><div className="modal-title">Release to Family</div><div className="modal-sub">{c.id} · {c.name}</div></div>
          <button className="x-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {done ? (
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div className="success-ring">✓</div>
              <div style={{fontSize:16,fontWeight:600,color:"var(--ink)"}}>Released to Family</div>
              <div style={{fontSize:13,color:"var(--muted)",marginTop:6,marginBottom:16}}>Case closed · Full custody record preserved · Admin notified</div>
              <div className="note-box">📧 Automated notification sent to {c.kin} confirming release. Full custody log archived permanently.</div>
            </div>
          ) : (
            <>
              <div className="alert warn"><div className="alert-ico">⚠️</div><div><div className="alert-txt">This action is irreversible. Verify identity carefully.</div><div className="alert-sub">Authorised collector on record: {c.kin}</div></div></div>
              <div className="fsec">Collector Details</div>
              <div className="fg-2" style={{marginBottom:14}}>
                <div className="fg"><label className="flbl">Collector Full Name</label><input className="finp" value={collectorName} onChange={e=>setCollectorName(e.target.value)} placeholder="As per ID document"/></div>
                <div className="fg"><label className="flbl">ID / Passport Number</label><input className="finp" value={collectorId} onChange={e=>setCollectorId(e.target.value)} placeholder="ID number"/></div>
              </div>
              <div className="fg" style={{marginBottom:14}}>
                <label className="flbl">Photo Confirmation</label>
                <div style={{display:"flex",gap:10,alignItems:"center",padding:"10px 13px",border:"1px solid var(--border)",borderRadius:7,background:"var(--surface)"}}>
                  <span style={{fontSize:20}}>📷</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:"var(--ink)"}}>Photo of collector with ID document</div>
                    <div style={{fontSize:11.5,color:"var(--muted)"}}>Like Amazon delivery confirmation — timestamped and attached to record</div>
                  </div>
                  <button className={`btn btn-sm ${photoTaken?"btn-green":"btn-ghost"}`} onClick={() => setPhotoTaken(true)}>{photoTaken?"✓ Photo Taken":"Take Photo"}</button>
                </div>
              </div>
              <div className="fsec">Final Verification</div>
              {[
                {l:"ID tag on deceased confirmed",v:c.id},
                {l:"Name matches authorised collector",v:c.kin},
                {l:"Burial/cremation authorization present",v:"Document verified"},
                {l:"Senior staff countersign",v:"Required for release"},
              ].map((item,i) => (
                <div key={i} className={`verify-item ${checks[i]?"checked":""}`} onClick={() => toggle(i)}>
                  <div className="vcheck">{checks[i]?"✓":""}</div>
                  <div><div className="vlbl">{item.l}</div><div className="vval">{item.v}</div></div>
                </div>
              ))}
            </>
          )}
        </div>
        {!done && (
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-gold" disabled={!allChecked} onClick={() => { setDone(true); setTimeout(() => { onSubmit(c); }, 1500); }}>✓ Confirm Release to Family</button>
          </div>
        )}
      </div>
    </div>
  );
}

function TransportModal({ c, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [driverName, setDriverName] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [destination, setDestination] = useState("Avbob Crematorium, Pretoria");
  const [linkGenerated, setLinkGenerated] = useState(false);
  const driverLink = `custodyledger.com/driver/${c.id.toLowerCase()}/a3f9x`;

  const handleGen = () => { setLinkGenerated(true); setStep(2); };

  return (
    <div className="overlay">
      <div className="modal" style={{maxWidth:560}}>
        <div className="modal-head">
          <div><div className="modal-title">Schedule Transport</div><div className="modal-sub">{c.id} · {c.name}</div></div>
          <button className="x-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {step === 1 ? (
            <>
              <div className="fsec">Transport Details</div>
              <div className="fg" style={{marginBottom:12}}>
                <label className="flbl">Destination</label>
                <input className="finp" value={destination} onChange={e=>setDestination(e.target.value)} placeholder="Cemetery, crematorium or facility"/>
              </div>
              <div className="fg-2">
                <div className="fg"><label className="flbl">Driver Name</label><input className="finp" value={driverName} onChange={e=>setDriverName(e.target.value)} placeholder="Full name"/></div>
                <div className="fg"><label className="flbl">Vehicle Plate</label><input className="finp" value={vehicleId} onChange={e=>setVehicleId(e.target.value)} placeholder="e.g. GP 445-231"/></div>
              </div>
              <div className="note-box" style={{marginTop:14}}>
                ℹ️ A one-time link will be generated and sent to the driver. They use it to confirm <strong>collection</strong> and <strong>delivery</strong> — no account needed. Link expires after 24 hours.
              </div>
            </>
          ) : (
            <>
              <div className="alert success" style={{marginBottom:14}}><div className="alert-ico">✅</div><div className="alert-txt">Transport scheduled. Driver link generated and ready to share.</div></div>
              <div className="driver-link-box">
                <div className="dl-label">One-Time Driver Link · Expires 24hrs</div>
                <div className="dl-url">https://{driverLink}</div>
                <div className="dl-actions">
                  <button className="dl-btn copy">📋 Copy Link</button>
                  <button className="dl-btn whatsapp">💬 WhatsApp</button>
                  <button className="dl-btn sms">📱 SMS</button>
                </div>
              </div>
              <div style={{fontSize:12.5,color:"var(--slate)",lineHeight:1.9}}>
                <strong>Driver:</strong> {driverName} &nbsp;·&nbsp; <strong>Vehicle:</strong> {vehicleId}<br/>
                <strong>Destination:</strong> {destination}<br/>
                <strong>Steps for driver:</strong> Step 1 — confirm collection at pickup. Step 2 — confirm delivery with photo at destination.
              </div>
              <hr className="divider"/>
              <div className="note-box">📧 Admin notified · Case status updated to "In Transit" when driver confirms collection</div>
            </>
          )}
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          {step===1
            ? <button className="btn btn-gold" disabled={!driverName||!vehicleId||!destination} onClick={handleGen}>Generate Driver Link →</button>
            : <button className="btn btn-primary" onClick={() => { onSubmit(c, destination, driverName, vehicleId); onClose(); }}>✓ Confirm Transport Scheduled</button>
          }
        </div>
      </div>
    </div>
  );
}

function CremUpdateModal({ c, onClose, onSubmit }) {
  const [nextStep, setNextStep] = useState(c.cremStep + 1);
  const [notes, setNotes] = useState("");
  return (
    <div className="overlay">
      <div className="modal" style={{maxWidth:500}}>
        <div className="modal-head">
          <div><div className="modal-title">Update Cremation Status</div><div className="modal-sub">{c.id} · {c.name}</div></div>
          <button className="x-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="fsec">Current Step</div>
          <div style={{background:"var(--surface)",borderRadius:7,padding:"10px 14px",marginBottom:14,fontFamily:"DM Mono,monospace",fontSize:12,color:"var(--slate)"}}>
            {CREM_STEPS[c.cremStep]} → <strong style={{color:"var(--ink)"}}>{CREM_STEPS[Math.min(nextStep, CREM_STEPS.length-1)]}</strong>
          </div>
          <div className="fsec">Advance To</div>
          <select className="fsel" value={nextStep} onChange={e=>setNextStep(Number(e.target.value))} style={{marginBottom:14}}>
            {CREM_STEPS.map((s,i) => i > c.cremStep && <option key={s} value={i}>{s}</option>)}
          </select>
          <div className="fg"><label className="flbl">Notes (optional)</label><input className="finp" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="e.g. Ashes collected by family member"/></div>
          <div className="note-box" style={{marginTop:14}}>📧 Admin will be notified automatically of this status change.</div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-gold" onClick={() => { onSubmit(c, nextStep, notes); onClose(); }}>✓ Update Status</button>
        </div>
      </div>
    </div>
  );
}

function AddShelfModal({ coolerName, onClose, onAdd }) {
  const [id, setId] = useState("");
  return (
    <div className="overlay">
      <div className="modal" style={{maxWidth:420}}>
        <div className="modal-head">
          <div><div className="modal-title">Add Shelf</div><div className="modal-sub">{coolerName}</div></div>
          <button className="x-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="fg"><label className="flbl">Shelf ID (e.g. C1, D2)</label><input className="finp" value={id} onChange={e=>setId(e.target.value)} placeholder="e.g. C1"/></div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-gold" disabled={!id} onClick={() => { onAdd(coolerName, id); onClose(); }}>+ Add Shelf</button>
        </div>
      </div>
    </div>
  );
}

function AddCoolerModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Cooler");
  return (
    <div className="overlay">
      <div className="modal" style={{maxWidth:420}}>
        <div className="modal-head">
          <div><div className="modal-title">Add Storage Unit</div><div className="modal-sub">Pretoria Main</div></div>
          <button className="x-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="fg-2">
            <div className="fg"><label className="flbl">Unit Name</label><input className="finp" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Cooler 5"/></div>
            <div className="fg"><label className="flbl">Type</label><select className="fsel" value={type} onChange={e=>setType(e.target.value)}><option>Cooler</option><option>Freezer</option><option>Urn Cabinet</option><option>Refrigerator</option></select></div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-gold" disabled={!name} onClick={() => { onAdd(name); onClose(); }}>+ Add Unit</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [role, setRole] = useState("superadmin"); // superadmin | admin
  const [nav, setNav] = useState("dashboard");
  const [cases, setCases] = useState(CASES);
  const [storage, setStorage] = useState(STORAGE_INIT);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [outage, setOutage] = useState(false);
  const outageTimer = useOutageTimer(outage);

  // Modals
  const [showIntake, setShowIntake] = useState(false);
  const [moveTarget, setMoveTarget] = useState(null);
  const [releaseTarget, setReleaseTarget] = useState(null);
  const [transportTarget, setTransportTarget] = useState(null);
  const [cremTarget, setCremTarget] = useState(null);
  const [addShelfTarget, setAddShelfTarget] = useState(null);
  const [showAddCooler, setShowAddCooler] = useState(false);

  const handleNewCase = (form, genId) => {
    const { time, date } = now();
    setCases(cs => [...cs, {
      id: genId, name:`${form.firstName} ${form.lastName}`,
      dob:form.dob, dod:form.dod, source:form.source,
      intakeDate:new Date().toISOString().split("T")[0], intakeTime:form.intakeTime,
      staff:form.staff, facility:"f1",
      location:{ facility:"Pretoria Main", room:"Mortuary Room A", cooler:form.cooler, shelf:`Shelf ${form.shelf}` },
      status:"In Storage", kin:form.kin||"Not provided", director:form.director||"Not assigned",
      disposition:form.disposition, cremStep:0,
      log:[
        { time:form.intakeTime, date, action:`Intake — Received from ${form.source}`, staff:form.staff, dot:"" },
        { time:form.intakeTime, date, action:`Placed in ${form.cooler} — Shelf ${form.shelf}`, staff:form.staff, dot:"g" },
      ]
    }]);
  };

  const handleMove = (c, cooler, shelf) => {
    const { time, date } = now();
    setCases(cs => cs.map(x => x.id===c.id ? {
      ...x, location:{...x.location, cooler, shelf:`Shelf ${shelf}`},
      log:[...x.log, { time, date, action:`Moved to ${cooler} — Shelf ${shelf}`, staff:"T. Dlamini", dot:"b" }]
    } : x));
    if (selectedCase?.id === c.id) setSelectedCase(prev => ({
      ...prev, location:{...prev.location, cooler, shelf:`Shelf ${shelf}`},
      log:[...prev.log, { time, date, action:`Moved to ${cooler} — Shelf ${shelf}`, staff:"T. Dlamini", dot:"b" }]
    }));
    setMoveTarget(null);
  };

  const handleRelease = (c) => {
    const { time, date } = now();
    setCases(cs => cs.map(x => x.id===c.id ? {
      ...x, status:"Released to Family",
      log:[...x.log, { time, date, action:`Released to family — collector ID verified, photo attached`, staff:"T. Dlamini", dot:"g" }]
    } : x));
    setReleaseTarget(null); setSelectedCase(null);
  };

  const handleCremUpdate = (c, nextStep, notes) => {
    const { time, date } = now();
    const statusMap = { 1:"In Transit", 2:"At Crematorium", 3:"At Crematorium", 4:"Awaiting Ashes", 5:"Ashes in Storage" };
    setCases(cs => cs.map(x => x.id===c.id ? {
      ...x, cremStep:nextStep, status:statusMap[nextStep]||x.status,
      log:[...x.log, { time, date, action:`Cremation status: ${CREM_STEPS[nextStep]}${notes?` — ${notes}`:""}`, staff:"T. Dlamini", dot:"p" }]
    } : x));
    if (selectedCase?.id===c.id) setSelectedCase(prev => ({
      ...prev, cremStep:nextStep, status:statusMap[nextStep]||prev.status,
      log:[...prev.log, { time, date, action:`Cremation status: ${CREM_STEPS[nextStep]}${notes?` — ${notes}`:""}`, staff:"T. Dlamini", dot:"p" }]
    }));
  };

  const handleAddShelf = (coolerName, shelfId) => {
    setStorage(s => ({ ...s, [coolerName]: [...s[coolerName], { id:shelfId, status:"available" }] }));
  };

  const handleAddCooler = (name) => {
    setStorage(s => ({ ...s, [name]: [{ id:"A1", status:"available" }, { id:"A2", status:"available" }] }));
  };

  const isSuperAdmin = role === "superadmin";
  const currentFacilityName = selectedFacility ? selectedFacility.name : "Pretoria Main";

  const navItems = [
    { id:"dashboard", ico:"▦", label:"Dashboard" },
    { id:"cases", ico:"⊞", label:"All Cases" },
    { id:"storage", ico:"❄", label:"Storage Map" },
    { id:"staff", ico:"👥", label:"Staff & Roles" },
    { id:"reports", ico:"⊟", label:"Reports" },
  ];

  const titles = { dashboard:"Dashboard", cases:"All Cases", storage:"Storage Map", staff:"Staff & Roles", reports:"Reports" };

  const renderContent = () => {
    if (isSuperAdmin && nav === "dashboard" && !selectedFacility) {
      return <SuperAdminView onSelectFacility={(f) => { setSelectedFacility(f); setRole("admin"); }} />;
    }
    if (selectedCase) return (
      <CaseDetail c={selectedCase} onBack={() => setSelectedCase(null)}
        onMove={c => setMoveTarget(c)} onCremUpdate={c => setCremTarget(c)}
        onRelease={c => setReleaseTarget(c)} />
    );
    if (nav === "dashboard") return (
      <Dashboard cases={cases} outage={outage} timer={outageTimer}
        onToggleOutage={() => setOutage(o => !o)}
        onView={setSelectedCase} onNew={() => setShowIntake(true)} storage={storage} />
    );
    if (nav === "cases") return (
      <div className="card">
        <div className="card-head">
          <div className="card-title">All Cases ({cases.length})</div>
          <div style={{display:"flex",gap:10}}>
            <div className="search-box"><span style={{color:"var(--muted)"}}>🔍</span><input className="search-inp" placeholder="Search name or ID…"/></div>
            <button className="btn btn-ghost btn-sm" onClick={() => setTransportTarget(cases[1])}>🚐 Schedule Transport</button>
            <button className="btn btn-gold btn-sm" onClick={() => setShowIntake(true)}>+ New Intake</button>
          </div>
        </div>
        <table className="tbl">
          <thead><tr><th>Case ID</th><th>Name</th><th>DOD</th><th>Source</th><th>Location</th><th>Disposition</th><th>Status</th></tr></thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id} onClick={() => setSelectedCase(c)}>
                <td><span className="cid">{c.id}</span></td>
                <td style={{fontWeight:500}}>{c.name}</td>
                <td style={{fontFamily:"DM Mono,monospace",fontSize:11.5}}>{c.dod}</td>
                <td style={{fontSize:12,color:"var(--slate)"}}>{c.source}</td>
                <td style={{fontSize:12,color:"var(--slate)"}}>{c.location.cooler} · {c.location.shelf}</td>
                <td><span className={`badge ${c.disposition==="cremation"?"b-purple":"b-blue"}`}>{c.disposition==="cremation"?"Cremation":"Burial"}</span></td>
                <td><span className={`badge ${STATUS_BADGE[c.status]||"b-slate"}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    if (nav === "storage") return (
      <StorageMap storage={storage}
        onAddShelf={cooler => setAddShelfTarget(cooler)}
        onAddCooler={() => setShowAddCooler(true)} />
    );
    if (nav === "staff") return <StaffView />;
    if (nav === "reports") return (
      <div className="card"><div className="card-body"><div className="empty"><div className="empty-ico">📊</div><div>Reports — coming in next build</div></div></div></div>
    );
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="sb">
          <div className="sb-head">
            <div className="sb-logo">Custody<em>Ledger</em></div>
            <div className="sb-tag">Chain of Custody System</div>
            <div className="sb-facility">
              <div className="sb-fac-dot" />
              <div>
                <div className="sb-fac-name">{currentFacilityName}</div>
                <div className="sb-fac-type">{isSuperAdmin && !selectedFacility ? "All Facilities" : "Funeral Home"}</div>
              </div>
            </div>
          </div>
          <div className="sb-nav">
            {isSuperAdmin && !selectedFacility && (
              <>
                <div className="sb-sec">Group Overview</div>
                <button className={`sb-item ${nav==="dashboard"?"on":""}`} onClick={() => setNav("dashboard")}>
                  <span className="ico">⊞</span> All Facilities <span className="sb-badge amber">3</span>
                </button>
                <button className={`sb-item ${nav==="staff"?"on":""}`} onClick={() => setNav("staff")}>
                  <span className="ico">👥</span> Staff & Roles
                </button>
                <button className={`sb-item ${nav==="reports"?"on":""}`} onClick={() => setNav("reports")}>
                  <span className="ico">⊟</span> Group Reports
                </button>
              </>
            )}
            {(!isSuperAdmin || selectedFacility) && (
              <>
                <div className="sb-sec">Operations</div>
                {navItems.map(item => (
                  <button key={item.id} className={`sb-item ${nav===item.id && !selectedCase?"on":""}`}
                    onClick={() => { setNav(item.id); setSelectedCase(null); }}>
                    <span className="ico">{item.ico}</span>
                    {item.label}
                    {item.id==="dashboard" && <span className="sb-badge">1</span>}
                  </button>
                ))}
                {selectedFacility && (
                  <button className="sb-item" style={{marginTop:8,color:"rgba(255,255,255,0.3)"}}
                    onClick={() => { setSelectedFacility(null); setRole("superadmin"); setNav("dashboard"); setSelectedCase(null); }}>
                    <span className="ico">←</span> All Facilities
                  </button>
                )}
              </>
            )}
          </div>
          <div className="sb-foot">
            <div style={{marginBottom:10,display:"flex",gap:6}}>
              <button className={`btn btn-sm ${role==="superadmin"?"btn-gold":"btn-ghost"}`} style={{flex:1,fontSize:10}} onClick={() => { setRole("superadmin"); setSelectedFacility(null); setNav("dashboard"); }}>Super Admin</button>
              <button className={`btn btn-sm ${role==="admin"?"btn-gold":"btn-ghost"}`} style={{flex:1,fontSize:10}} onClick={() => { setRole("admin"); setNav("dashboard"); }}>Facility Admin</button>
            </div>
            <div className="sb-user">
              <div className="sb-avatar">SD</div>
              <div>
                <div className="sb-uname">Sarah Dlamini</div>
                <div className="sb-urole">{role==="superadmin"?"Super Admin":"Facility Admin"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-l">
              <div className="topbar-title">{selectedCase ? selectedCase.name : isSuperAdmin && !selectedFacility ? "Group Overview" : titles[nav]}</div>
              {outage && <span className="badge b-red" style={{animation:"pulse 1s infinite"}}>⚡ Outage Active · {outageTimer}</span>}
            </div>
            <div className="topbar-r">
              <div className="search-box"><span style={{color:"var(--muted)"}}>🔍</span><input className="search-inp" placeholder="Search cases…"/></div>
              {(!isSuperAdmin || selectedFacility) && <button className="btn btn-gold btn-sm" onClick={() => setShowIntake(true)}>+ New Intake</button>}
            </div>
          </div>
          <div className="content">{renderContent()}</div>
        </div>
      </div>

      {showIntake && <IntakeModal onClose={() => setShowIntake(false)} onSubmit={handleNewCase} />}
      {moveTarget && <MoveModal c={moveTarget} onClose={() => setMoveTarget(null)} onSubmit={handleMove} />}
      {releaseTarget && <ReleaseModal c={releaseTarget} onClose={() => setReleaseTarget(null)} onSubmit={handleRelease} />}
      {transportTarget && <TransportModal c={transportTarget} onClose={() => setTransportTarget(null)} onSubmit={() => {}} />}
      {cremTarget && <CremUpdateModal c={cremTarget} onClose={() => setCremTarget(null)} onSubmit={handleCremUpdate} />}
      {addShelfTarget && <AddShelfModal coolerName={addShelfTarget} onClose={() => setAddShelfTarget(null)} onAdd={handleAddShelf} />}
      {showAddCooler && <AddCoolerModal onClose={() => setShowAddCooler(false)} onAdd={handleAddCooler} />}
    </>
  );
}
