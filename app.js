/* ICDL Lab - motore della piattaforma */
(function () {
  "use strict";

  /* ---------- Utilita' ---------- */
  const $app = document.getElementById("app");
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of kids.flat(Infinity)) {
      if (c == null || c === false) continue;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return el;
  }
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’`]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const pct = (p, m) => (m ? Math.round((p / m) * 100) : 0);
  const fmtMin = (sec) => { const m = Math.floor(sec / 60), s = Math.floor(sec % 60); return m + ":" + String(s).padStart(2, "0"); };
  const LETTERS = "ABCDEFG";
  const PASS = 75;

  /* ---------- Icone (SVG a tratto) ---------- */
  const P = {
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    apps: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="3.5"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    window: '<rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="M2.5 9h19"/><circle cx="6" cy="6.5" r=".6"/><circle cx="8.5" cy="6.5" r=".6"/><path d="M7 14h6M7 17h10"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 11h18"/>',
    network: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4.5M12 12l-5.5 5M12 12l5.5 5"/>',
    shield: '<path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.7 3.9 5.9 3.9 9.5s-1.3 6.8-3.9 9.5c-2.6-2.7-3.9-5.9-3.9-9.5S9.4 5.2 12 2.5z"/>',
    compass: '<circle cx="12" cy="12" r="9.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5.5 5.5"/>',
    chat: '<path d="M4 5h16a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 17h-9l-5 4v-4H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 5z"/><path d="M7.5 10h9M7.5 13h6"/>',
    mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 6.5 9 6.5 9-6.5"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><rect x="7" y="13" width="3" height="3" rx=".6"/>',
    back: '<path d="M15 5 8 12l7 7"/>',
    home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M6 9.5V20h12V9.5"/>',
    up: '<path d="m6 15 6-6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    redo: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.4-6.5 8-6.5s7 2 8 6.5"/>',
    mega: '<path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    key: '<circle cx="8" cy="14" r="4.5"/><path d="m11.5 11 8-8M16 6l2.5 2.5M14 8l2 2"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>'
  };
  const icon = (n) => { const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor"); s.setAttribute("stroke-width", "1.9"); s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round"); s.setAttribute("aria-hidden", "true"); s.innerHTML = P[n] || ""; return s; };

  function ring(value, size, stroke, big) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.min(100, Math.max(0, value)) / 100);
    const col = value >= 75 ? "var(--mint)" : value >= 50 ? "var(--sun)" : "var(--ko)";
    const wrap = document.createElement("div");
    wrap.innerHTML = `<svg class="${big ? "bigring" : "ring"}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${value}%">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="${stroke}"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${col}" stroke-width="${stroke}" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="${big ? 40 : 11}">${value}%</text></svg>`;
    return wrap.firstChild;
  }

  /* ---------- Archivio locale ---------- */
  const KEY = "icdl-lab-v1";
  let db = { attivo: null, profili: {} };
  try { const raw = localStorage.getItem(KEY); if (raw) db = Object.assign(db, JSON.parse(raw)); } catch (e) { /* storage non disponibile */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* ignora */ } };
  const me = () => db.profili[db.attivo];

  /* ---------- Codice di salvataggio ---------- */
  const b64 = (bytes) => { let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const unb64 = (str) => { str = str.replace(/-/g, "+").replace(/_/g, "/"); while (str.length % 4) str += "="; const bin = atob(str); const out = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; };
  async function pipe(bytes, Stream) { const s = new Blob([bytes]).stream().pipeThrough(new Stream("deflate-raw")); return new Uint8Array(await new Response(s).arrayBuffer()); }
  function snapshot(p) {
    // Versione compatta del profilo: ultimi 10 tentativi per lezione, errori solo nell'ultimo
    const risultati = {};
    for (const id in p.risultati) {
      const list = p.risultati[id].slice(-10);
      risultati[id] = list.map((r, i) => i === list.length - 1 ? r : Object.assign({}, r, { errori: [] }));
    }
    return { v: 1, nome: p.nome, classe: p.classe || "", corso: p.corso || {}, risultati };
  }
  async function encodeProfile(p) {
    const bytes = new TextEncoder().encode(JSON.stringify(snapshot(p)));
    try { if (window.CompressionStream) return "ICDL1-" + b64(await pipe(bytes, CompressionStream)); } catch (e) { /* uso il formato semplice */ }
    return "ICDL0-" + b64(bytes);
  }
  async function decodeCode(code) {
    code = String(code).replace(/\s+/g, "");
    const m = code.match(/^ICDL([01])-([A-Za-z0-9_-]+)$/);
    if (!m) throw new Error("formato");
    let bytes = unb64(m[2]);
    if (m[1] === "1") {
      if (!window.DecompressionStream) throw new Error("browser");
      bytes = await pipe(bytes, DecompressionStream);
    }
    const data = JSON.parse(new TextDecoder().decode(bytes));
    if (!data || !data.nome || typeof data.risultati !== "object") throw new Error("formato");
    return data;
  }
  function mergeProfile(data) {
    const nome = String(data.nome).slice(0, 30);
    const p = db.profili[nome] || (db.profili[nome] = { nome, classe: "", corso: {}, risultati: {} });
    if (data.classe) p.classe = String(data.classe).slice(0, 10);
    for (const id in data.risultati) {
      const local = p.risultati[id] || [];
      const seen = new Set(local.map((r) => r.data));
      const all = local.concat((data.risultati[id] || []).filter((r) => r && !seen.has(r.data)));
      all.sort((a, b) => String(a.data).localeCompare(String(b.data)));
      p.risultati[id] = all;
    }
    for (const id in data.corso || {}) {
      const r = data.corso[id];
      if (r && (!p.corso[id] || (r.step || 0) > (p.corso[id].step || 0))) p.corso[id] = r;
    }
    db.attivo = nome; save();
    return p;
  }
  function copyText(text, area, btn) {
    const ok = () => { btn.lastChild.textContent = "Copiato!"; setTimeout(() => (btn.lastChild.textContent = "Copia il codice"), 2000); };
    const fallback = () => { area.focus(); area.select(); btn.lastChild.textContent = "Ora premi Ctrl+C"; };
    try { navigator.clipboard.writeText(text).then(ok, fallback); } catch (e) { fallback(); }
  }
  function codeCard(intro) {
    const area = h("textarea", { class: "code", id: "codice-salvataggio", readonly: true, rows: "4", "aria-label": "Codice di salvataggio" }, "Sto preparando il codice...");
    const btn = h("button", { class: "btn primary", type: "button", disabled: true }, icon("copy"), h("span", null, "Copia il codice"));
    let code = "";
    encodeProfile(me()).then((c) => { code = c; area.value = c; btn.disabled = false; });
    btn.addEventListener("click", () => copyText(code, area, btn));
    area.addEventListener("focus", () => area.select());
    return h("section", { class: "card savecard" },
      h("div", { class: "save-head" }, h("span", { class: "save-ic" }, icon("key")), h("div", null, h("h3", null, "Il tuo codice di salvataggio"),
        h("p", null, intro || "Copialo e incollalo in un posto sicuro: un documento, una email a te stesso o il registro della classe. La prossima volta, su qualsiasi computer, incollalo nella pagina iniziale per ritrovare tutti i progressi."))),
      area,
      h("div", { class: "row", style: "margin-top:12px" }, btn, h("span", { class: "empty-note", style: "font-size:14px" }, "Il codice cambia dopo ogni lezione: copia sempre l'ultimo.")));
  }

  const TYPE_LABEL = { scheda: "Momento prof", quiz: "Quiz", vf: "Vero o falso", abbina: "Abbina", smista: "Smista", ordina: "Metti in ordine", indovinello: "Indovinello", sfida: "Sfida finale", simulazione: "Simulazione" };
  const typeKey = (a) => a.variante || a.tipo;

  /* ---------- Schermata profilo ---------- */
  function header() {
    const p = me();
    return h("header", { class: "top" }, h("div", { class: "wrap" },
      h("div", { class: "brand" }, h("div", { class: "logo" }, "i"), h("div", null, h("small", null, "Computer e Online Essentials"), h("h1", null, "ICDL Lab"))),
      p ? h("div", { class: "who" },
        h("div", { class: "avatar", "aria-hidden": "true" }, p.nome.charAt(0).toUpperCase()),
        h("div", { style: "font-weight:700" }, p.nome, p.classe ? h("div", { style: "font-size:13px;opacity:.85;font-weight:500" }, "Classe " + p.classe) : null),
        h("button", { class: "btn", onclick: () => go("codice") }, icon("key"), "Codice"),
        h("button", { class: "btn", onclick: () => { db.attivo = null; save(); go("profilo"); } }, icon("user"), "Cambia studente")
      ) : null
    ));
  }

  function viewProfilo() {
    const nomi = Object.keys(db.profili);
    const err = h("p", { class: "err", role: "alert" });
    const inNome = h("input", { id: "nome", autocomplete: "off", maxlength: "30", placeholder: "Es. Giulia" });
    const inClasse = h("input", { id: "classe", autocomplete: "off", maxlength: "10", placeholder: "Es. 2B" });
    const entra = (nome, classe) => {
      nome = nome.trim();
      if (!nome) { err.textContent = "Scrivi il tuo nome per iniziare."; inNome.focus(); return; }
      if (!db.profili[nome]) db.profili[nome] = { nome, classe: classe.trim(), corso: {}, risultati: {} };
      else if (classe.trim()) db.profili[nome].classe = classe.trim();
      db.attivo = nome; save(); go("home");
    };
    const form = h("form", { class: "form", onsubmit: (e) => { e.preventDefault(); entra(inNome.value, inClasse.value); } },
      h("div", { class: "field" }, h("label", { for: "nome" }, "Il tuo nome"), inNome),
      h("div", { class: "field" }, h("label", { for: "classe" }, "Classe (facoltativa)"), inClasse),
      err,
      h("button", { class: "btn primary", type: "submit" }, "Entra nel laboratorio", icon("arrow"))
    );
    return [header(), h("main", null, h("div", { class: "wrap" }, h("div", { class: "hello fade-in" },
      h("div", null,
        h("div", { class: "eyebrow" }, "12 lezioni da 90 minuti"),
        h("h2", { style: "margin-top:10px" }, "Impara il computer ", h("span", null, "giocando"), "."),
        h("p", { class: "lead" }, "Indovinelli, quiz, giochi da abbinare e smistare, sfide a tempo. Alla fine di ogni lezione ricevi il tuo resoconto con i punti forti e cosa ripassare."),
        h("p", { class: "lead", style: "font-size:15px" }, "I tuoi progressi restano salvati su questo browser.")
      ),
      h("div", { class: "card" },
        h("h3", { style: "font-size:24px;margin-bottom:16px" }, "Chi sei?"),
        form,
        nomi.length ? h("div", { style: "margin-top:20px" }, h("div", { class: "eyebrow" }, "Gia' registrati su questo computer"),
          h("div", { class: "profiles" }, nomi.map((n) => h("button", { class: "chip-btn", type: "button", onclick: () => entra(n, "") }, n)))) : null
      )
    ), restoreCard()))];
  }

  function restoreCard() {
    const area = h("textarea", { class: "code", id: "codice-ripristino", rows: "3", placeholder: "Incolla qui il codice che inizia con ICDL1-" });
    const msg = h("p", { class: "err", role: "alert" });
    const btn = h("button", { class: "btn sun", type: "submit" }, icon("key"), "Ripristina i progressi");
    const form = h("form", { class: "form", onsubmit: async (e) => {
      e.preventDefault(); msg.textContent = "";
      if (!area.value.trim()) { msg.textContent = "Incolla prima il tuo codice."; area.focus(); return; }
      btn.disabled = true;
      try { mergeProfile(await decodeCode(area.value)); go("home"); }
      catch (err) {
        btn.disabled = false;
        msg.textContent = err.message === "browser" ? "Questo browser non riesce a leggere il codice. Prova con Chrome, Edge o Firefox aggiornati." : "Il codice non e' valido. Controlla di averlo copiato tutto, dall'inizio ICDL fino all'ultimo carattere.";
      }
    } }, area, msg, h("div", null, btn));
    return h("section", { class: "card savecard", style: "margin-top:24px" },
      h("div", { class: "save-head" }, h("span", { class: "save-ic" }, icon("key")), h("div", null, h("h3", null, "Hai un codice di salvataggio?"),
        h("p", null, "Incollalo qui per ritrovare lezioni completate, resoconti e lezioni in corso, anche se sei su un altro computer."))),
      form);
  }

  /* ---------- Home: mappa delle lezioni ---------- */
  function bestOf(id) { const r = me().risultati[id]; return r && r.length ? Math.max(...r.map((x) => x.pct)) : null; }

  function viewHome() {
    const p = me();
    const fatte = LEZIONI.filter((l) => bestOf(l.id) != null);
    const media = fatte.length ? Math.round(fatte.reduce((s, l) => s + bestOf(l.id), 0) / fatte.length) : 0;
    const xp = LEZIONI.reduce((s, l) => { const r = p.risultati[l.id]; return s + (r && r.length ? Math.max(...r.map((x) => x.punti)) : 0); }, 0);

    const tile = (l) => {
      const best = bestOf(l.id), run = p.corso[l.id];
      let status;
      if (run && run.step > 0) status = h("span", { class: "pill go" }, "In corso: " + run.step + "/" + l.attivita.length);
      else if (best != null) status = h("span", { class: "pill done" }, "Completata");
      else status = h("span", { class: "pill new" }, "Da iniziare");
      return h("button", { class: "tile " + l.modulo.toLowerCase(), onclick: () => go("intro", l.id), "aria-label": "Lezione " + l.id + ": " + l.titolo },
        h("div", { class: "tile-top" }, h("span", { class: "n num" }, String(l.id).padStart(2, "0")), h("span", { class: "ic" }, icon(l.icona))),
        h("div", null, h("h4", null, l.titolo), h("p", null, l.sotto)),
        h("div", { class: "status" }, h("div", { class: "row", style: "gap:6px" }, status, l.simulazione ? h("span", { class: "pill sim" }, "Simulazione") : null), best != null ? ring(best, 44, 5) : h("span", { class: "mono", style: "color:var(--muted)" }, "90 min"))
      );
    };
    const mod = (code, name, tagClass, list) => h("section", { class: "module" },
      h("div", { class: "module-head" }, h("span", { class: "tag " + tagClass }, code), h("h3", null, name)),
      h("div", { class: "grid" }, list.map(tile)));

    return [header(), h("main", null, h("div", { class: "wrap fade-in" },
      h("div", { class: "greet" },
        h("div", null, h("div", { class: "eyebrow" }, "Mappa del corso"), h("h2", { style: "margin-top:6px" }, "Ciao " + p.nome + ", scegli la lezione")),
        h("div", { class: "stats" },
          h("div", { class: "stat" }, h("b", { class: "num" }, fatte.length + "/12"), h("span", null, "lezioni fatte")),
          h("div", { class: "stat" }, h("b", { class: "num" }, fatte.length ? media + "%" : "-"), h("span", null, "media migliore")),
          h("div", { class: "stat" }, h("b", { class: "num" }, xp), h("span", null, "punti XP")))
      ),
      mod("Modulo 1", "Computer Essentials", "ce", LEZIONI.filter((l) => l.modulo === "CE")),
      mod("Modulo 2", "Online Essentials", "oe", LEZIONI.filter((l) => l.modulo === "OE")),
      h("div", { style: "margin-top:34px" }, codeCard(fatte.length || Object.keys(p.corso).length ? null : "Quando avrai fatto la prima lezione, copia questo codice prima di chiudere: ti servira' per ritrovare i progressi su un altro computer."))
    ))];
  }

  /* ---------- Intro lezione ---------- */
  function viewIntro(id) {
    const l = LEZIONI.find((x) => x.id === id), p = me(), run = p.corso[id];
    let t = 0;
    const plan = l.attivita.map((a) => { const start = t; t += a.min; return h("li", null, h("span", { class: "t num" }, start + "'"), h("span", { class: "k" }, a.titolo), h("span", { class: "typechip ty-" + typeKey(a) }, TYPE_LABEL[typeKey(a)])); });
    const resume = run && run.step > 0 && run.step < l.attivita.length;
    const hist = p.risultati[id] || [];
    return [header(), h("main", null, h("div", { class: "wrap fade-in" },
      h("button", { class: "btn ghost back", onclick: () => go("home") }, icon("back"), "Mappa del corso"),
      h("div", { class: "intro" },
        h("div", { class: "intro-hero" },
          h("div", { class: "row" }, h("span", { class: "tag " + l.modulo.toLowerCase() }, (l.modulo === "CE" ? "Computer Essentials" : "Online Essentials")), h("span", { class: "eyebrow" }, "Lezione " + l.id + " di 12")),
          h("h2", null, l.titolo), h("p", null, l.sotto),
          h("ul", { class: "goals" }, l.obiettivi.map((o) => h("li", null, o))),
          h("div", { class: "row" },
            resume ? h("button", { class: "btn primary", onclick: () => go("lezione", id) }, "Riprendi dall'attivita' " + (run.step + 1), icon("arrow")) : null,
            h("button", { class: "btn " + (resume ? "" : "primary"), onclick: () => { startRun(id); go("lezione", id); } }, resume ? "Ricomincia da capo" : (hist.length ? "Rifai la lezione" : "Inizia la lezione"), resume ? null : icon("arrow")),
            hist.length ? h("button", { class: "btn ghost", onclick: () => go("report", id) }, "Ultimo resoconto") : null
          ),
          hist.length ? h("p", { style: "margin-top:16px;color:var(--muted);font-weight:600" }, "Tentativi: " + hist.length + "  |  Migliore: " + bestOf(id) + "%") : null
        ),
        h("div", { class: "card" },
          h("h3", null, "Piano della lezione"),
          h("ol", { class: "plan" }, plan),
          h("div", { class: "total" }, h("span", null, "Durata totale"), h("span", { class: "mono" }, t + " minuti"))
        )
      )
    ))];
  }

  /* ---------- Gestione sessione ---------- */
  function startRun(id) { me().corso[id] = { step: 0, passi: [], tempo: 0 }; save(); }
  let tick = null, stepStart = 0, curRun = null;

  function viewLezione(id) {
    const l = LEZIONI.find((x) => x.id === id), p = me();
    if (!p.corso[id]) startRun(id);
    const run = p.corso[id];
    if (run.step >= l.attivita.length) { finish(l); return null; }
    const a = l.attivita[run.step];
    const points = run.passi.reduce((s, x) => s + Object.values(x.temi).reduce((q, t) => q + t.p, 0), 0);

    const timeEl = h("span", { class: "num" }, fmtMin(run.tempo));
    const ptsEl = h("span", { class: "num" }, points + " XP");
    stepStart = Date.now(); curRun = run;
    clearInterval(tick);
    tick = setInterval(() => { timeEl.textContent = fmtMin(run.tempo + (stepStart ? (Date.now() - stepStart) / 1000 : 0)); }, 1000);

    const bar = h("div", { class: "lbar" }, h("div", { class: "wrap" },
      h("button", { class: "iconbtn", "aria-label": "Torna alla lezione", onclick: () => { commitTime(run); go("intro", id); } }, icon("back")),
      h("div", { class: "ttl" }, h("b", null, l.id + ". " + l.titolo),
        h("div", { class: "segs", "aria-label": "Attivita' " + (run.step + 1) + " di " + l.attivita.length }, l.attivita.map((_, i) => h("div", { class: "seg" + (i < run.step ? " done" : i === run.step ? " cur" : "") })))),
      h("div", { class: "meta" }, h("span", { class: "hide-sm" }, (run.step + 1) + "/" + l.attivita.length), ptsEl, timeEl)
    ));

    const done = (res) => {
      commitTime(run);
      run.passi[run.step] = res; run.step++; save();
      go("lezione", id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const onScore = (add) => { ptsEl.textContent = (points + add) + " XP"; };
    const body = RENDER[a.tipo](a, done, onScore);
    const tk = typeKey(a);
    const card = h("section", { class: "card act fade-in" },
      h("div", { class: "act-head" }, h("span", { class: "typechip ty-" + tk }, TYPE_LABEL[tk]), h("span", { class: "counter" }, "circa " + a.min + " min")),
      h("h2", null, a.titolo), body);
    return [bar, h("main", { style: "padding-top:0" }, h("div", { class: "wrap narrow" }, card))];
  }
  function commitTime(run) { if (stepStart) { run.tempo += (Date.now() - stepStart) / 1000; stepStart = Date.now(); save(); } }

  /* Risultato di un'attivita': { temi: {tema:{p,m}}, errori: [{d, tua, giusta, e}], sim?: {p,m} } */
  function newRes() { return { temi: {}, errori: [] }; }
  function addT(res, tema, p, m) { const t = res.temi[tema] || (res.temi[tema] = { p: 0, m: 0 }); t.p += p; t.m += m; }
  function fb(kind, title, text) { return h("div", { class: "feedback fade-in " + kind, role: "status" }, h("b", null, title), text ? h("span", null, text) : null); }
  const OK_WORDS = ["Esatto!", "Perfetto!", "Giusto!", "Ottimo!", "Bravissimo!"];
  const KO_WORDS = ["Non proprio.", "Quasi.", "Attenzione.", "Ritenta la prossima."];
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  /* ---------- Renderer delle attivita' ---------- */
  const RENDER = {
    scheda(a, done) {
      return h("div", null,
        h("div", { class: "prof" }, icon("mega"), h("span", null, a.nota || "Ascolta la spiegazione del prof. Qui trovi i concetti chiave da ricordare.")),
        h("div", { class: "scheda-grid" }, a.punti.map(([k, v]) => h("div", { class: "concept" }, h("b", null, k), h("p", null, v)))),
        h("div", { class: "next-row" }, h("button", { class: "btn primary", onclick: () => done(newRes()) }, "Ho capito, avanti", icon("arrow"))));
    },

    quiz(a, done, onScore) {
      const sim = a.variante === "simulazione";
      const qs = (sim ? a.domande : shuffle(a.domande)).map(([q, opts, e, t]) => {
        const order = shuffle(opts.map((o, i) => ({ o, ok: i === 0 })));
        return { q, order, e, tema: t || a.tema, giusta: opts[0] };
      });
      const res = newRes(); if (sim) res.sim = { p: 0, m: qs.length };
      let i = 0, gained = 0;
      const box = h("div");
      const show = () => {
        const Q = qs[i]; box.innerHTML = "";
        const next = h("button", { class: "btn primary", hidden: true, onclick: () => { i++; i < qs.length ? show() : done(res); } }, i < qs.length - 1 ? "Prossima domanda" : "Concludi", icon("arrow"));
        const fbBox = h("div");
        const opts = Q.order.map((o, k) => h("button", { class: "opt", onclick: () => answer(k) }, h("span", { class: "L" }, LETTERS[k]), h("span", null, o.o)));
        function answer(k) {
          opts.forEach((b) => (b.disabled = true));
          const ok = Q.order[k].ok;
          addT(res, Q.tema, ok ? 1 : 0, 1);
          if (sim) res.sim.p += ok ? 1 : 0;
          if (!ok) res.errori.push({ d: Q.q, tua: Q.order[k].o, giusta: Q.giusta, e: Q.e });
          if (ok) { gained++; onScore(gained); }
          if (sim) {
            opts[k].classList.add("picked");
            setTimeout(() => { i++; i < qs.length ? show() : done(res); }, 450);
            return;
          }
          Q.order.forEach((o, j) => { if (o.ok) opts[j].classList.add("ok"); });
          if (!ok) opts[k].classList.add("ko");
          fbBox.append(fb(ok ? "ok" : "ko", ok ? pick(OK_WORDS) : pick(KO_WORDS), Q.e));
          next.hidden = false; next.focus();
        }
        box.append(
          h("div", { class: "counter" }, (sim ? "Domanda " : "") + (i + 1) + " di " + qs.length + (sim ? "  |  nessun aiuto, come all'esame" : "")),
          h("p", { class: "question" }, Q.q),
          h("div", { class: "opts" }, opts), fbBox, h("div", { class: "next-row" }, next));
      };
      show();
      return box;
    },

    vf(a, done, onScore) {
      const items = shuffle(a.items).map(([t, v, e, tema]) => ({ t, v, e, tema: tema || a.tema }));
      const res = newRes(); let i = 0, gained = 0;
      const box = h("div");
      const show = () => {
        const it = items[i]; box.innerHTML = "";
        const fbBox = h("div");
        const next = h("button", { class: "btn primary", hidden: true, onclick: () => { i++; i < items.length ? show() : done(res); } }, i < items.length - 1 ? "Prossima" : "Concludi", icon("arrow"));
        const bV = h("button", { class: "vf-btn v", onclick: () => ans(true, bV) }, "Vero");
        const bF = h("button", { class: "vf-btn f", onclick: () => ans(false, bF) }, "Falso");
        function ans(val, btn) {
          bV.disabled = bF.disabled = true; btn.classList.add("sel");
          const ok = val === it.v;
          addT(res, it.tema, ok ? 1 : 0, 1);
          if (ok) { gained++; onScore(gained); } else res.errori.push({ d: it.t, tua: val ? "Vero" : "Falso", giusta: it.v ? "Vero" : "Falso", e: it.e });
          fbBox.append(fb(ok ? "ok" : "ko", ok ? pick(OK_WORDS) : pick(KO_WORDS), it.e));
          next.hidden = false; next.focus();
        }
        box.append(h("div", { class: "counter" }, (i + 1) + " di " + items.length), h("p", { class: "question" }, it.t), h("div", { class: "vf-btns" }, bV, bF), fbBox, h("div", { class: "next-row" }, next));
      };
      show();
      return box;
    },

    abbina(a, done, onScore) {
      const pairs = a.coppie.map(([l, r], i) => ({ l, r, i }));
      const left = shuffle(pairs), right = shuffle(pairs);
      const map = {}; // indice coppia sinistra -> indice coppia destra scelta
      let sel = null, checked = false;
      const box = h("div");
      const verify = h("button", { class: "btn primary", disabled: true, onclick: check }, "Verifica");
      const fbBox = h("div");
      const lBtns = {}, rBtns = {};
      const order = () => Object.keys(map).map(Number);
      function badgeFor(li) { const ks = order(); return ks.indexOf(li) + 1; }
      function paint() {
        left.forEach((p) => {
          const b = lBtns[p.i]; b.classList.toggle("sel", sel === p.i);
          const bd = b.querySelector(".badge"); const paired = map[p.i] != null;
          bd.className = "badge" + (paired ? "" : " empty"); bd.textContent = paired ? badgeFor(p.i) : "";
        });
        right.forEach((p) => {
          const b = rBtns[p.i]; const owner = Object.keys(map).find((k) => map[k] === p.i);
          const bd = b.querySelector(".badge");
          bd.className = "badge" + (owner != null ? "" : " empty"); bd.textContent = owner != null ? badgeFor(Number(owner)) : "";
        });
        verify.disabled = Object.keys(map).length !== pairs.length;
      }
      left.forEach((p) => {
        lBtns[p.i] = h("button", { class: "mi left", onclick: () => { if (checked) return; if (map[p.i] != null) delete map[p.i]; sel = sel === p.i ? null : p.i; paint(); } }, h("span", { class: "badge empty" }), h("span", { class: "t" }, p.l));
      });
      right.forEach((p) => {
        rBtns[p.i] = h("button", { class: "mi", onclick: () => {
          if (checked) return;
          if (sel == null) { const owner = Object.keys(map).find((k) => map[k] === p.i); if (owner != null) { delete map[owner]; paint(); } return; }
          for (const k in map) if (map[k] === p.i) delete map[k];
          map[sel] = p.i; sel = null; paint();
        } }, h("span", { class: "badge empty" }), h("span", { class: "t" }, p.r));
      });
      function check() {
        checked = true; verify.hidden = true;
        const res = newRes(); let ok = 0;
        left.forEach((p) => {
          const good = map[p.i] === p.i; if (good) ok++;
          addT(res, a.tema, good ? 1 : 0, 1);
          lBtns[p.i].classList.add(good ? "ok" : "ko");
          if (!good) {
            lBtns[p.i].querySelector(".t").append(h("span", { class: "fix" }, "Giusto: " + p.r));
            res.errori.push({ d: "Abbina: " + p.l, tua: pairs[map[p.i]].r, giusta: p.r, e: "" });
          }
        });
        right.forEach((p) => { const owner = Number(Object.keys(map).find((k) => map[k] === p.i)); rBtns[p.i].classList.add(owner === p.i ? "ok" : "ko"); });
        onScore(ok);
        fbBox.append(fb(ok === pairs.length ? "ok" : ok >= pairs.length / 2 ? "info" : "ko", ok + " coppie giuste su " + pairs.length, ok === pairs.length ? "Tutto perfetto!" : "Guarda le correzioni sotto le voci in rosso."));
        next.hidden = false; next.focus();
        box._res = res;
      }
      const next = h("button", { class: "btn primary", hidden: true, onclick: () => done(box._res) }, "Avanti", icon("arrow"));
      box.append(h("p", { class: "istr" }, a.istr || "Tocca una voce a sinistra e poi quella giusta a destra."),
        h("div", { class: "match" }, h("div", { class: "col" }, left.map((p) => lBtns[p.i])), h("div", { class: "col right" }, right.map((p) => rBtns[p.i]))),
        fbBox, h("div", { class: "next-row" }, verify, next));
      return box;
    },

    smista(a, done, onScore) {
      const items = shuffle(a.items).map(([t, g], i) => ({ t, g, i, at: null }));
      let sel = null, checked = false;
      const box = h("div"), pool = h("div", { class: "pool" }), fbBox = h("div");
      const binEls = a.gruppi.map((g, gi) => {
        const list = h("div", { class: "items" });
        const el = h("div", { class: "bin", role: "button", tabindex: "0", "aria-label": "Metti in " + g,
          onclick: (e) => { if (e.target.closest(".chip")) return; drop(gi); },
          onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); drop(gi); } } },
          h("h5", null, h("span", null, g), h("span", { class: "mono count", style: "font-size:13px" }, "0")), list);
        el._list = list; return el;
      });
      function drop(gi) { if (checked || sel == null) return; items[sel].at = gi; sel = null; paint(); }
      const chipEls = items.map((it) => h("button", { class: "chip", onclick: () => { if (checked) return; if (it.at != null) { it.at = null; sel = null; } else sel = sel === it.i ? null : it.i; paint(); } }, it.t));
      const verify = h("button", { class: "btn primary", disabled: true, onclick: check }, "Verifica");
      function paint() {
        items.forEach((it, k) => { const c = chipEls[k]; c.classList.toggle("sel", sel === it.i); (it.at == null ? pool : binEls[it.at]._list).append(c); });
        binEls.forEach((b, gi) => { b.querySelector(".count").textContent = items.filter((x) => x.at === gi).length; b.classList.toggle("ready", sel != null); });
        pool.classList.toggle("empty", items.every((x) => x.at != null));
        verify.disabled = !items.every((x) => x.at != null);
      }
      function check() {
        checked = true; verify.hidden = true; sel = null; paint();
        const res = newRes(); let ok = 0;
        items.forEach((it, k) => {
          const good = it.at === it.g; if (good) ok++;
          addT(res, a.tema, good ? 1 : 0, 1);
          chipEls[k].classList.add(good ? "ok" : "ko");
          if (!good) {
            chipEls[k].title = "Andava in: " + a.gruppi[it.g];
            binEls[it.g]._list.append(h("span", { class: "chip ok", style: "border-style:dashed" }, it.t));
            res.errori.push({ d: "Smista: " + it.t, tua: a.gruppi[it.at], giusta: a.gruppi[it.g], e: "" });
          }
        });
        onScore(ok);
        fbBox.append(fb(ok === items.length ? "ok" : ok >= items.length / 2 ? "info" : "ko", ok + " su " + items.length + " al posto giusto", ok === items.length ? "Smistamento perfetto!" : "Le voci barrate erano nel gruppo sbagliato: quelle tratteggiate mostrano dove andavano."));
        next.hidden = false; next.focus();
        box._res = res;
      }
      const next = h("button", { class: "btn primary", hidden: true, onclick: () => done(box._res) }, "Avanti", icon("arrow"));
      box.append(h("p", { class: "istr" }, a.istr || "Tocca una voce e poi il gruppo giusto."), pool, h("div", { class: "bins" }, binEls), fbBox, h("div", { class: "next-row" }, verify, next));
      paint();
      return box;
    },

    ordina(a, done, onScore) {
      let cur = shuffle(a.passi.map((t, i) => ({ t, i })));
      if (cur.every((x, k) => x.i === k)) cur.reverse();
      const box = h("div"), list = h("ol", { class: "order" }), fbBox = h("div");
      let checked = false;
      function paint() {
        list.innerHTML = "";
        cur.forEach((x, k) => {
          const up = h("button", { "aria-label": "Sposta su", disabled: k === 0 || checked, onclick: () => { [cur[k - 1], cur[k]] = [cur[k], cur[k - 1]]; paint(); list.children[k - 1].querySelector("button").focus(); } }, icon("up"));
          const dn = h("button", { "aria-label": "Sposta giu'", disabled: k === cur.length - 1 || checked, onclick: () => { [cur[k + 1], cur[k]] = [cur[k], cur[k + 1]]; paint(); list.children[k + 1].querySelectorAll("button")[1].focus(); } }, icon("down"));
          const li = h("li", { class: checked ? (x.i === k ? "ok" : "ko") : "" }, h("span", { class: "pos num" }, k + 1),
            h("span", { class: "txt" }, x.t, checked && x.i !== k ? h("span", { class: "should" }, "Posizione giusta: " + (x.i + 1)) : null),
            h("span", { class: "mv" }, up, dn));
          list.append(li);
        });
      }
      const verify = h("button", { class: "btn primary", onclick: () => {
        checked = true; verify.hidden = true; paint();
        const ok = cur.filter((x, k) => x.i === k).length, res = newRes();
        addT(res, a.tema, ok, cur.length);
        if (ok < cur.length) res.errori.push({ d: "Metti in ordine: " + a.titolo, tua: ok + " passaggi su " + cur.length + " al posto giusto", giusta: a.passi.join("  >  "), e: "" });
        onScore(ok);
        fbBox.append(fb(ok === cur.length ? "ok" : "info", ok + " su " + cur.length + " al posto giusto", ok === cur.length ? "Sequenza perfetta!" : "Ordine corretto: " + a.passi.join("  >  ")));
        next.hidden = false; next.focus(); box._res = res;
      } }, "Verifica l'ordine");
      const next = h("button", { class: "btn primary", hidden: true, onclick: () => done(box._res) }, "Avanti", icon("arrow"));
      box.append(h("p", { class: "istr" }, a.istr || "Usa le frecce per mettere in ordine."), list, fbBox, h("div", { class: "next-row" }, verify, next));
      paint();
      return box;
    },

    indovinello(a, done, onScore) {
      const MAX = 3; let hints = 0, tries = 0, over = false;
      const ok = a.risposte.map(norm);
      const box = h("div"), fbBox = h("div"), hintBox = h("div", { class: "hints" }), triesEl = h("p", { class: "tries" });
      const input = h("input", { id: "risposta-" + a.titolo.length, autocomplete: "off", placeholder: "Scrivi la tua risposta", "aria-label": "Risposta" });
      const tryBtn = h("button", { class: "btn primary", type: "submit" }, "Prova");
      const hintBtn = h("button", { class: "btn sun", type: "button", onclick: () => {
        if (over || hints >= a.indizi.length) return;
        hintBox.append(h("div", { class: "hint fade-in" }, h("span", null, "Indizio " + (hints + 1)), a.indizi[hints]));
        hints++; upd(); input.focus();
      } }, icon("bulb"), "Indizio");
      const giveUp = h("button", { class: "btn ghost", type: "button", onclick: () => end(false) }, "Mi arrendo");
      function upd() {
        hintBtn.disabled = over || hints >= a.indizi.length;
        triesEl.textContent = "Valore attuale: " + Math.max(1, MAX - hints) + " XP" + (tries ? "  |  tentativi: " + tries : "");
      }
      function end(won) {
        over = true; input.disabled = tryBtn.disabled = giveUp.disabled = true; upd();
        const res = newRes(), pts = won ? Math.max(1, MAX - hints) : 0;
        addT(res, a.tema, pts, MAX);
        if (!won) res.errori.push({ d: "Indovinello: " + a.testo, tua: "Nessuna risposta", giusta: a.risposte[0], e: a.spiega });
        onScore(pts);
        fbBox.append(fb(won ? "ok" : "ko", won ? "Indovinato! +" + pts + " XP" : "La risposta era: " + a.risposte[0], a.spiega));
        next.hidden = false; next.focus(); box._res = res;
      }
      const form = h("form", { class: "guess", onsubmit: (e) => {
        e.preventDefault(); if (over) return;
        const v = norm(input.value); if (!v) return;
        tries++;
        if (ok.includes(v)) end(true);
        else { input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake"); input.select(); upd(); fbBox.innerHTML = ""; fbBox.append(fb("ko", "Non e' questa.", tries >= 2 && hints < a.indizi.length ? "Prova a chiedere un indizio." : "Riprova!")); }
      } }, input, tryBtn);
      const next = h("button", { class: "btn primary", hidden: true, onclick: () => done(box._res) }, "Avanti", icon("arrow"));
      box.append(h("div", { class: "riddle" }, h("span", { class: "q", "aria-hidden": "true" }, "?"), h("p", null, a.testo)), form, hintBox, triesEl, fbBox,
        h("div", { class: "next-row" }, hintBtn, giveUp, next));
      upd();
      setTimeout(() => input.focus(), 50);
      return box;
    }
  };

  /* ---------- Chiusura e resoconto ---------- */
  function finish(l) {
    clearInterval(tick);
    const p = me(), run = p.corso[l.id];
    const temi = {}, errori = []; let sim = null;
    run.passi.forEach((r) => {
      if (!r) return;
      for (const t in r.temi) { const x = temi[t] || (temi[t] = { p: 0, m: 0 }); x.p += r.temi[t].p; x.m += r.temi[t].m; }
      errori.push(...r.errori);
      if (r.sim) sim = r.sim;
    });
    const P_ = Object.values(temi).reduce((s, x) => s + x.p, 0), M_ = Object.values(temi).reduce((s, x) => s + x.m, 0);
    const rec = { data: new Date().toISOString(), pct: pct(P_, M_), punti: P_, max: M_, temi, errori, durata: Math.round(run.tempo), sim: sim ? pct(sim.p, sim.m) : null };
    (p.risultati[l.id] = p.risultati[l.id] || []).push(rec);
    delete p.corso[l.id];
    save();
    go("report", l.id);
  }

  function viewReport(id) {
    const l = LEZIONI.find((x) => x.id === id), p = me();
    const hist = p.risultati[id] || [];
    if (!hist.length) { go("intro", id); return null; }
    const r = hist[hist.length - 1], prev = hist.length > 1 ? hist[hist.length - 2] : null;
    const temi = Object.entries(r.temi).map(([k, v]) => ({ k, nome: (TEMI[k] || {}).nome || k, cons: (TEMI[k] || {}).consiglio || "", v: pct(v.p, v.m), p: v.p, m: v.m })).sort((a, b) => b.v - a.v);
    const forti = temi.filter((t) => t.v >= 80), deboli = temi.filter((t) => t.v < PASS).sort((a, b) => a.v - b.v);

    let livello, frase;
    if (r.pct >= 90) { livello = "Fuoriclasse"; frase = "Hai padroneggiato la lezione. Sei pronto per la prossima sfida."; }
    else if (r.pct >= 75) { livello = "Ottimo lavoro"; frase = "Sei sopra la soglia d'esame ICDL. Un piccolo ripasso e sarai imbattibile."; }
    else if (r.pct >= 60) { livello = "Buona base"; frase = "Le basi ci sono. Concentrati sugli argomenti segnalati qui sotto per superare il 75%."; }
    else { livello = "Da ripassare"; frase = "Questa lezione va ripassata con calma. Parti dai consigli e poi rifai la lezione."; }

    const lv = (v) => (v >= 75 ? "lv-hi" : v >= 50 ? "lv-mid" : "lv-lo");
    const diff = prev ? r.pct - prev.pct : null;
    const next = LEZIONI.find((x) => x.id === id + 1);

    return [header(), h("main", null, h("div", { class: "wrap fade-in" },
      h("button", { class: "btn ghost back", onclick: () => go("home") }, icon("home"), "Mappa del corso"),
      h("section", { class: "card" },
        h("div", { class: "rep-hero" }, ring(r.pct, 170, 16, true),
          h("div", null,
            h("div", { class: "eyebrow" }, "Resoconto  |  Lezione " + l.id + ": " + l.titolo),
            h("h2", null, livello), h("p", null, frase),
            r.sim != null ? h("div", { class: "verdict " + (r.sim >= PASS ? "pass" : "fail") }, "Simulazione d'esame: " + r.sim + "%  |  " + (r.sim >= PASS ? "Superata" : "Non ancora superata, serve il " + PASS + "%")) : null
          )),
        h("div", { class: "mini-stats" },
          h("div", { class: "stat" }, h("b", { class: "num" }, r.punti + "/" + r.max), h("span", null, "XP ottenuti")),
          h("div", { class: "stat" }, h("b", { class: "num" }, fmtMin(r.durata)), h("span", null, "tempo attivo")),
          h("div", { class: "stat" }, h("b", { class: "num" }, r.errori.length), h("span", null, "errori")),
          h("div", { class: "stat" }, h("b", { class: "num" }, diff == null ? "1o" : (diff > 0 ? "+" : "") + diff + "%"), h("span", null, diff == null ? "tentativo" : "rispetto a prima")))
      ),
      h("div", { class: "rep-grid" },
        h("section", { class: "card" }, h("h3", null, "Come sei andato per argomento"),
          h("div", { class: "bars" }, temi.map((t) => h("div", { class: "bar-row" },
            h("div", { class: "lab" }, h("span", null, t.nome), h("span", { class: "num" }, t.v + "%")),
            h("div", { class: "bar", role: "img", "aria-label": t.nome + " " + t.v + "%" }, h("i", { class: lv(t.v), style: "width:" + Math.max(3, t.v) + "%" }))))),
          forti.length ? h("div", { style: "margin-top:22px" }, h("div", { class: "eyebrow", style: "margin-bottom:8px" }, "I tuoi punti di forza"), h("div", { class: "strengths" }, forti.map((t) => h("span", null, t.nome)))) : null,
          hist.length > 1 ? h("div", { style: "margin-top:22px" }, h("div", { class: "eyebrow" }, "Andamento dei tentativi"),
            h("div", { class: "history", role: "img", "aria-label": "Tentativi: " + hist.map((x) => x.pct + "%").join(", ") }, hist.slice(-10).map((x) => h("div", { style: "height:" + Math.max(6, x.pct) + "%", title: x.pct + "%" })))) : null
        ),
        h("section", { class: "card" }, h("h3", null, "Su cosa migliorare"),
          deboli.length ? h("div", { class: "improve" }, deboli.map((t) => h("div", { class: "tip" }, h("b", null, h("span", null, t.nome), h("span", { class: "mono", style: "font-size:14px" }, t.v + "%")), h("p", null, t.cons))))
            : h("p", { class: "empty-note" }, "Nessun argomento sotto il " + PASS + "%. Per alzare ancora il punteggio prova a rifare la lezione usando meno indizi negli indovinelli.")
        )
      ),
      r.errori.length ? h("section", { class: "card", style: "margin-top:20px" }, h("h3", null, "Errori da rivedere"),
        h("div", { class: "errors" }, r.errori.slice(0, 12).map((e) => h("div", { class: "erow" }, h("b", null, e.d),
          h("small", null, "Tua risposta: " + e.tua), h("small", null, h("span", { class: "g" }, "Corretta: "), e.giusta), e.e ? h("small", null, e.e) : null))),
        r.errori.length > 12 ? h("p", { class: "empty-note", style: "margin-top:10px" }, "e altri " + (r.errori.length - 12) + " errori.") : null) : null,
      h("div", { style: "margin-top:20px" }, codeCard("Prima di chiudere copia il codice aggiornato: la prossima volta, su qualsiasi computer, incollalo nella pagina iniziale per ritrovare i tuoi progressi.")),
      h("div", { class: "row", style: "margin-top:24px" },
        next ? h("button", { class: "btn primary", onclick: () => go("intro", next.id) }, "Lezione " + next.id + ": " + next.titolo, icon("arrow")) : null,
        h("button", { class: "btn", onclick: () => { startRun(id); go("lezione", id); } }, icon("redo"), "Rifai la lezione"),
        h("button", { class: "btn ghost", onclick: () => go("home") }, "Torna alla mappa"))
    ))];
  }

  function viewCodice() {
    return [header(), h("main", null, h("div", { class: "wrap narrow fade-in" },
      h("button", { class: "btn ghost back", onclick: () => go("home") }, icon("home"), "Mappa del corso"),
      codeCard()))];
  }

  /* ---------- Router ---------- */
  function go(view, arg) {
    if (view !== "lezione") { clearInterval(tick); curRun = null; stepStart = 0; }
    if (!me() && view !== "profilo") view = "profilo";
    const V = { codice: viewCodice, profilo: viewProfilo, home: viewHome, intro: viewIntro, lezione: viewLezione, report: viewReport }[view];
    const out = V(arg);
    if (out == null) return;
    $app.innerHTML = "";
    $app.append(...out);
    if (view !== "lezione") window.scrollTo(0, 0);
  }
  document.addEventListener("visibilitychange", () => {
    if (!curRun) return;
    if (document.hidden) { commitTime(curRun); stepStart = 0; }
    else stepStart = Date.now();
  });
  go(me() ? "home" : "profilo");
})();
