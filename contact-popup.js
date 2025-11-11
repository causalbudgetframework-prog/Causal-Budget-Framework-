/* contact-popup.js — delegation version */
(function () {
  // --- obfuscated email: replace with yours ---
const EMAIL_PARTS = [
  "fra","rk","us","al","bud","me","@g","ca",".co","ma","il","get","wo","m"
];
const ORDER = [7,2,3,4,11,0,5,12,1,6,9,10,8,13];
  const assembleEmail = () => ORDER.map(i => EMAIL_PARTS[i]).join("");
  const mailto = () => `mailto:${encodeURIComponent(assembleEmail())}`;
  const gmail  = () => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(assembleEmail())}`;

  // --- styles ---
  const STYLE = `
  .cp-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:grid;place-items:center;z-index:9999}
  .cp-modal{background:#0f141c;color:#e8edf2;width:min(92vw,520px);border:1px solid #18202c;border-radius:12px;padding:18px;box-shadow:0 10px 30px rgba(0,0,0,.45);font:15px/1.5 system-ui,sans-serif}
  .cp-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .cp-title{font-size:18px;margin:0}
  .cp-close{background:transparent;border:0;color:#a7b4c6;font-size:20px;cursor:pointer}
  .cp-email{margin:10px 0 16px;padding:10px 12px;background:#121a24;border:1px solid #1a2230;border-radius:8px;user-select:text;word-break:break-all;font-family:ui-monospace,Menlo,Consolas,monospace}
  .cp-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .cp-btn{padding:10px 12px;border-radius:10px;border:1px solid #1a2230;background:#192232;color:#e8edf2;cursor:pointer}
  .cp-btn:hover{filter:brightness(1.05)}
  .cp-small{color:#9fb2c9;font-size:12px;margin-top:10px}
  `;
  if (!document.querySelector('style[data-contact-popup]')) {
    const s = document.createElement('style');
    s.dataset.contactPopup = '1';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  // --- tiny DOM helper ---
  const el = (t,a={},k=[]) => {
    const n=document.createElement(t);
    for(const [k2,v] of Object.entries(a)){
      if(k2==="class") n.className=v;
      else if(k2==="text") n.textContent=v;
      else n.setAttribute(k2,v);
    }
    k.forEach(c=>n.appendChild(c));
    return n;
  };

  function buildAndShowModal(){
    const overlay = el("div",{class:"cp-overlay",role:"dialog","aria-modal":"true"});
    const modal   = el("div",{class:"cp-modal"});
    const header  = el("div",{class:"cp-header"},[
      el("h3",{class:"cp-title",text:"Contact"}),
      el("button",{class:"cp-close","aria-label":"Close"},[document.createTextNode("×")]),
    ]);
    const emailStr = assembleEmail();
    const emailBox = el("div",{class:"cp-email"},[document.createTextNode(emailStr)]);
    const btnMail  = el("button",{class:"cp-btn",type:"button"},[document.createTextNode("Email me via client")]);
    const btnGmail = el("button",{class:"cp-btn",type:"button"},[document.createTextNode("Gmail me")]);
    const actions  = el("div",{class:"cp-actions"},[btnMail,btnGmail]);
    const small    = el("div",{class:"cp-small",text:"Your email app will open in a new window or tab."});
    modal.append(header,emailBox,actions,small);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const close = () => { window.removeEventListener('keydown',onKey); overlay.remove(); };
    const onKey = e => { if(e.key==='Escape') close(); };
    window.addEventListener('keydown',onKey);
    overlay.addEventListener('click',e=>{ if(e.target===overlay) close(); });
    header.querySelector('.cp-close').addEventListener('click',close);
    btnMail.addEventListener('click',()=>{ window.location.href = mailto(); close(); });
    btnGmail.addEventListener('click',()=>{ window.open(gmail(),"_blank","noopener,noreferrer"); close(); });
  }

  // --- event delegation: works regardless of load order ---
  function delegatedClick(e){
    // match the clicked element or any ancestor with the attribute
    const trigger = e.target.closest?.('[data-contact-popup]');
    if (!trigger) return;
    e.preventDefault();
    buildAndShowModal();
  }
  document.addEventListener('click', delegatedClick, true); // capture to beat other handlers

  // expose manual API for testing
  window.ContactPopup = {
    open: buildAndShowModal,
    attach(selector){
      const t = typeof selector==='string' ? document.querySelector(selector) : selector;
      if (!t) return;
      t.setAttribute('data-contact-popup',''); // mark it so delegation picks it up
    }
  };
})();
