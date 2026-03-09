import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const css = `
${FONTS}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{height:100%;background:#0f0f1a;font-family:'DM Sans',sans-serif;}
:root{
  --ink:#141420;--gold:#c9a84c;--gold-light:#f5e9cc;
  --green:#2d7a5f;--green-light:#d4ede5;--green-border:#9fd4bc;
  --red:#8b3a3a;--red-light:#faeaea;--red-border:#e0aaaa;
  --blue:#2d5f8b;--muted:#8888aa;--border:#e2e2ee;
  --surface:#f7f7fc;--white:#fff;
  --bg:#0f0f1a;--bg-card:#1a1a2e;--bg-card2:#22223a;
}
.app{max-width:420px;margin:0 auto;min-height:100vh;background:var(--bg);}

.topbar{padding:20px 20px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.07);}
.logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:#fff;}
.logo em{color:var(--gold);font-style:normal;}
.logo-sub{font-size:9px;color:var(--muted);font-family:'DM Mono',monospace;letter-spacing:0.12em;text-transform:uppercase;margin-top:3px;}
.step-pill{background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.25);border-radius:20px;padding:4px 12px;font-family:'DM Mono',monospace;font-size:11px;color:var(--gold);}

.screen{padding:20px;}

/* PROGRESS */
.progress-bar{display:flex;gap:0;margin-bottom:24px;border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);}
.pb-step{flex:1;padding:10px 8px;text-align:center;font-size:10px;font-family:'DM Mono',monospace;color:rgba(255,255,255,0.3);background:var(--bg-card);border-right:1px solid rgba(255,255,255,0.08);transition:all 0.2s;}
.pb-step:last-child{border-right:none;}
.pb-step.done{background:rgba(45,122,95,0.2);color:var(--green);}
.pb-step.active{background:rgba(201,168,76,0.15);color:var(--gold);font-weight:600;}
.pb-step-ico{font-size:14px;margin-bottom:3px;}

/* CASE CARD */
.case-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;margin-bottom:18px;position:relative;overflow:hidden;}
.case-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),transparent);}
.cc-label{font-size:9px;text-transform:uppercase;letter-spacing:0.14em;color:var(--gold);font-family:'DM Mono',monospace;margin-bottom:8px;}
.cc-name{font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;margin-bottom:6px;}
.cc-id{display:inline-flex;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.25);border-radius:5px;padding:2px 9px;font-family:'DM Mono',monospace;font-size:11.5px;color:var(--gold);margin-bottom:12px;}
.cc-row{display:flex;gap:14px;margin-bottom:4px;}
.cc-item-lbl{font-size:9.5px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;font-family:'DM Mono',monospace;margin-bottom:2px;}
.cc-item-val{font-size:12.5px;color:rgba(255,255,255,0.8);font-weight:500;}

/* SECTION */
.sec-title{font-size:10px;text-transform:uppercase;letter-spacing:0.13em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:10px;}

/* FORM */
.finp{width:100%;padding:11px 13px;border:1px solid rgba(255,255,255,0.12);border-radius:8px;font-size:13.5px;color:#fff;background:var(--bg-card2);font-family:'DM Sans',sans-serif;outline:none;margin-bottom:10px;}
.finp::placeholder{color:rgba(255,255,255,0.25);}
.finp:focus{border-color:var(--gold);}
.flbl{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:5px;display:block;}

/* VERIFY */
.verify-item{display:flex;align-items:center;gap:12px;background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:13px;margin-bottom:8px;cursor:pointer;transition:all 0.13s;-webkit-user-select:none;user-select:none;}
.verify-item.checked{border-color:var(--green-border);background:rgba(45,122,95,0.1);}
.vcheck{width:28px;height:28px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;transition:all 0.13s;color:transparent;}
.verify-item.checked .vcheck{background:var(--green);border-color:var(--green);color:#fff;}
.vlbl{font-size:13px;color:rgba(255,255,255,0.7);}
.verify-item.checked .vlbl{color:#fff;}
.vval{font-family:'DM Mono',monospace;font-size:11px;color:var(--gold);margin-top:2px;}

/* PHOTO */
.photo-box{background:var(--bg-card2);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;margin-bottom:16px;display:flex;align-items:center;gap:14px;}
.photo-ico{font-size:28px;}
.photo-lbl{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:3px;}
.photo-sub{font-size:11px;color:var(--muted);}
.photo-btn{margin-left:auto;padding:8px 14px;border-radius:7px;border:none;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;}
.photo-btn.taken{background:rgba(45,122,95,0.2);color:var(--green);border:1px solid var(--green-border);}
.photo-btn.notyet{background:rgba(201,168,76,0.15);color:var(--gold);border:1px solid rgba(201,168,76,0.3);}

/* SUBMIT */
.submit-btn{width:100%;padding:15px;border-radius:11px;border:none;font-size:15px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:4px;}
.submit-btn.ready{background:var(--gold);color:var(--ink);}
.submit-btn.ready:active{transform:scale(0.98);}
.submit-btn.disabled{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.25);cursor:not-allowed;}

/* SUCCESS */
.success-screen{padding:40px 20px;text-align:center;}
.success-ring{width:80px;height:80px;border-radius:50%;background:rgba(45,122,95,0.15);border:2px solid var(--green);display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 20px;animation:pop 0.4s cubic-bezier(.34,1.56,.64,1);}
@keyframes pop{from{transform:scale(0.5);opacity:0;}to{transform:scale(1);opacity:1;}}
.success-title{font-family:'Cormorant Garamond',serif;font-size:26px;color:#fff;margin-bottom:8px;}
.success-sub{font-size:13.5px;color:var(--muted);line-height:1.6;margin-bottom:24px;}
.log-card{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:11px;padding:16px;text-align:left;margin-bottom:20px;}
.log-label{font-size:9.5px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:10px;}
.log-row{display:flex;justify-content:space-between;align-items:flex-start;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
.log-row:last-child{border-bottom:none;}
.log-key{font-size:11.5px;color:var(--muted);}
.log-val{font-size:11.5px;color:rgba(255,255,255,0.8);font-family:'DM Mono',monospace;text-align:right;max-width:200px;}

/* NOTE */
.note{background:var(--bg-card);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:11px 13px;font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:14px;}
.note strong{color:rgba(255,255,255,0.6);}

/* WHATSAPP SHARE */
.share-box{background:var(--bg-card);border:1px solid rgba(255,255,255,0.08);border-radius:11px;padding:16px;margin-bottom:16px;}
.share-label{font-size:9.5px;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:10px;}
.share-btns{display:flex;gap:8px;}
.share-btn{flex:1;padding:10px 8px;border-radius:8px;border:none;font-size:12.5px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;text-align:center;}
.share-btn.wa{background:#25d366;color:#fff;}
.share-btn.sms{background:var(--blue);color:#fff;}
.share-btn.copy{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);}
`;

const CASE = {
  id: "CL-2024-0043",
  name: "Beatrice Anne Naidoo",
  dob: "1972-11-03",
  dod: "2024-11-16",
  from: "Pretoria Main Mortuary",
  to: "Avbob Crematorium, Pretoria",
  kin: "Priya Naidoo (Daughter)",
};

function getNow() {
  const d = new Date();
  return {
    time: d.toTimeString().slice(0,5),
    date: d.toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"}),
  };
}

export default function DriverApp() {
  const [step, setStep] = useState(1); // 1=details, 2=collection, 3=delivery, 4=done
  const [driverName, setDriverName] = useState("");
  const [driverId, setDriverId] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [collectChecks, setCollectChecks] = useState([false,false,false]);
  const [collectPhoto, setCollectPhoto] = useState(false);
  const [deliverChecks, setDeliverChecks] = useState([false,false,false]);
  const [deliverPhoto, setDeliverPhoto] = useState(false);
  const [collectLog, setCollectLog] = useState(null);
  const [deliverLog, setDeliverLog] = useState(null);

  const toggleCollect = i => setCollectChecks(c => c.map((v,idx) => idx===i?!v:v));
  const toggleDeliver = i => setDeliverChecks(c => c.map((v,idx) => idx===i?!v:v));

  const steps = ["Details","Collection","Delivery","Complete"];

  const canProceedDetails = driverName && driverId && vehicle;
  const canProceedCollect = collectChecks.every(Boolean) && collectPhoto;
  const canProceedDeliver = deliverChecks.every(Boolean) && deliverPhoto;

  const handleCollect = () => {
    const {time,date} = getNow();
    setCollectLog({time,date});
    setStep(3);
  };

  const handleDeliver = () => {
    const {time,date} = getNow();
    setDeliverLog({time,date});
    setStep(4);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="topbar">
          <div>
            <div className="logo">Custody<em>Ledger</em></div>
            <div className="logo-sub">Driver Portal</div>
          </div>
          <div className="step-pill">Step {step} of 4</div>
        </div>

        {/* PROGRESS */}
        <div style={{padding:"14px 20px 0"}}>
          <div className="progress-bar">
            {steps.map((s,i) => (
              <div key={s} className={`pb-step ${i+1 < step?"done":i+1===step?"active":""}`}>
                <div className="pb-step-ico">{i+1 < step?"✓":i===0?"📋":i===1?"📦":i===2?"📍":"✅"}</div>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1 — DRIVER DETAILS */}
        {step === 1 && (
          <div className="screen">
            <div className="sec-title">Your Details</div>
            <div className="note">No account needed. Fill in your details to begin the transport record for this journey.</div>
            <label className="flbl">Full Name</label>
            <input className="finp" placeholder="Your full name" value={driverName} onChange={e=>setDriverName(e.target.value)}/>
            <label className="flbl">ID / Passport Number</label>
            <input className="finp" placeholder="ID number" value={driverId} onChange={e=>setDriverId(e.target.value)}/>
            <label className="flbl">Vehicle Registration</label>
            <input className="finp" placeholder="e.g. GP 445-231" value={vehicle} onChange={e=>setVehicle(e.target.value)}/>

            <div style={{marginTop:6}}>
              <div className="sec-title">Transport Assignment</div>
              <div className="case-card">
                <div className="cc-label">Assigned Case</div>
                <div className="cc-name">{CASE.name}</div>
                <div className="cc-id">{CASE.id}</div>
                <div className="cc-row">
                  <div><div className="cc-item-lbl">From</div><div className="cc-item-val">{CASE.from}</div></div>
                  <div><div className="cc-item-lbl">To</div><div className="cc-item-val">{CASE.to}</div></div>
                </div>
              </div>
            </div>

            <button className={`submit-btn ${canProceedDetails?"ready":"disabled"}`}
              onClick={canProceedDetails?()=>setStep(2):undefined}>
              Proceed to Collection →
            </button>
          </div>
        )}

        {/* STEP 2 — COLLECTION */}
        {step === 2 && (
          <div className="screen">
            <div className="case-card">
              <div className="cc-label">Collecting</div>
              <div className="cc-name">{CASE.name}</div>
              <div className="cc-id">{CASE.id}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:6,fontFamily:"DM Mono,monospace"}}>From: {CASE.from}</div>
            </div>

            <div className="sec-title">Verify Before Collection</div>
            {[
              {l:"QR tag scanned on deceased",v:CASE.id},
              {l:"Name on tag matches case",v:CASE.name},
              {l:"Destination confirmed",v:CASE.to},
            ].map((item,i) => (
              <div key={i} className={`verify-item ${collectChecks[i]?"checked":""}`} onClick={()=>toggleCollect(i)}>
                <div className="vcheck">{collectChecks[i]?"✓":""}</div>
                <div><div className="vlbl">{item.l}</div><div className="vval">{item.v}</div></div>
              </div>
            ))}

            <div className="sec-title" style={{marginTop:14}}>Photo Confirmation</div>
            <div className="photo-box">
              <div className="photo-ico">📷</div>
              <div>
                <div className="photo-lbl">Photograph the ID tag</div>
                <div className="photo-sub">Confirm you have the correct person</div>
              </div>
              <button className={`photo-btn ${collectPhoto?"taken":"notyet"}`} onClick={()=>setCollectPhoto(true)}>
                {collectPhoto?"✓ Done":"Take Photo"}
              </button>
            </div>

            <button className={`submit-btn ${canProceedCollect?"ready":"disabled"}`}
              onClick={canProceedCollect?handleCollect:undefined}>
              ✓ Confirm Collection
            </button>
          </div>
        )}

        {/* STEP 3 — DELIVERY */}
        {step === 3 && (
          <div className="screen">
            {collectLog && (
              <div className="note">
                ✅ <strong>Collection confirmed</strong> at {collectLog.time} · {collectLog.date}<br/>
                Now confirm delivery at destination.
              </div>
            )}

            <div className="case-card">
              <div className="cc-label">Delivering</div>
              <div className="cc-name">{CASE.name}</div>
              <div className="cc-id">{CASE.id}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:6,fontFamily:"DM Mono,monospace"}}>To: {CASE.to}</div>
            </div>

            <div className="sec-title">Verify Before Handover</div>
            {[
              {l:"QR tag scanned at destination",v:CASE.id},
              {l:"Receiving staff present",v:"Staff signature required"},
              {l:"Destination confirmed",v:CASE.to},
            ].map((item,i) => (
              <div key={i} className={`verify-item ${deliverChecks[i]?"checked":""}`} onClick={()=>toggleDeliver(i)}>
                <div className="vcheck">{deliverChecks[i]?"✓":""}</div>
                <div><div className="vlbl">{item.l}</div><div className="vval">{item.v}</div></div>
              </div>
            ))}

            <div className="sec-title" style={{marginTop:14}}>Delivery Photo</div>
            <div className="photo-box">
              <div className="photo-ico">📷</div>
              <div>
                <div className="photo-lbl">Photograph tag at destination</div>
                <div className="photo-sub">Like Amazon delivery confirmation</div>
              </div>
              <button className={`photo-btn ${deliverPhoto?"taken":"notyet"}`} onClick={()=>setDeliverPhoto(true)}>
                {deliverPhoto?"✓ Done":"Take Photo"}
              </button>
            </div>

            <button className={`submit-btn ${canProceedDeliver?"ready":"disabled"}`}
              onClick={canProceedDeliver?handleDeliver:undefined}>
              ✓ Confirm Delivery
            </button>
          </div>
        )}

        {/* STEP 4 — COMPLETE */}
        {step === 4 && (
          <div className="success-screen">
            <div className="success-ring">✓</div>
            <div className="success-title">Delivery Complete</div>
            <div className="success-sub">Both collection and delivery have been confirmed. The custody record has been updated automatically. Your link has now expired.</div>

            <div className="log-card">
              <div className="log-label">Journey Record</div>
              {[
                {k:"Case ID", v:CASE.id},
                {k:"Name", v:CASE.name},
                {k:"Driver", v:driverName},
                {k:"Vehicle", v:vehicle},
                {k:"Collected", v:`${collectLog?.date} · ${collectLog?.time}`},
                {k:"Delivered", v:`${deliverLog?.date} · ${deliverLog?.time}`},
                {k:"Destination", v:CASE.to},
              ].map(row => (
                <div className="log-row" key={row.k}>
                  <div className="log-key">{row.k}</div>
                  <div className="log-val">{row.v}</div>
                </div>
              ))}
            </div>

            <div className="share-box">
              <div className="share-label">Share confirmation with funeral home</div>
              <div className="share-btns">
                <button className="share-btn wa">💬 WhatsApp</button>
                <button className="share-btn sms">📱 SMS</button>
                <button className="share-btn copy">📋 Copy</button>
              </div>
            </div>

            <div className="note">📧 <strong>Admin notified automatically.</strong> Full custody log updated in CustodyLedger. This link is now expired and cannot be reused.</div>
          </div>
        )}
      </div>
    </>
  );
}
