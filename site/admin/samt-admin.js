/* SAMT BACK OFFICE — EDITS content/samt.json, PREVIEWS THE LAYER SITE LIVE, PUBLISHES IN ONE COMMIT */
(function () {
"use strict";
var R = window.SAMT_RENDER;

/* REPO */
var OWNER = "walidalwawi";
var REPO = "samt";
var BRANCH = "main";
var API = "https://api.github.com/repos/" + OWNER + "/" + REPO;
var DATA_FILE = "content/samt.json";
var MANIFEST_FILE = "content/manifest.json";
var KEY_STORE = "bd-gh-key";
var DRAFT_STORE = "samt-draft";
var RESERVED = ["", "index", "library", "about", "404", "admin", "assets", "images", "files"];

/* STATE */
var S = {
key: lsGet(KEY_STORE) || "",
data: null,
base: null,
published: "",
hist: [],
fut: [],
dev: window.innerWidth <= 900 ? "m" : "d",
tab: "content",
sub: { content: "journal", layers: "menu", type: "sizes", motion: "presets", site: "general" },
sel: { post: null, page: null, book: null },
pv: { view: "journal", post: "" },
mem: {},
fresh: {},
q: "",
publishing: false,
status: ""
};

/* SMALL HELPERS */
function lsGet(k) {
try {
return localStorage.getItem(k);
} catch (e) {
return null;
}
}
function lsSet(k, v) {
try {
localStorage.setItem(k, v);
} catch (e) {}
}
function lsDel(k) {
try {
localStorage.removeItem(k);
} catch (e) {}
}
function $(id) {
return document.getElementById(id);
}
function el(tag, attrs, kids) {
var n = document.createElement(tag);
Object.keys(attrs || {}).forEach(function (k) {
var v = attrs[k];
if (v === null || v === undefined || v === false) return;
if (k === "class") n.className = v;
else if (k === "text") n.textContent = v;
else if (k === "html") n.innerHTML = v;
else if (k.indexOf("on") === 0 && typeof v === "function") n.addEventListener(k.slice(2), v);
else n.setAttribute(k, v === true ? "" : v);
});
(kids || []).forEach(function (c) {
if (c === null || c === undefined || c === false) return;
n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
});
return n;
}
function clone(o) {
return JSON.parse(JSON.stringify(o));
}
function rid() {
return Math.random().toString(36).slice(2, 10);
}
function slugify(s) {
return String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "untitled";
}
var toastTimer;
function toast(msg) {
var t = $("bd-toast");
t.textContent = msg;
t.hidden = false;
clearTimeout(toastTimer);
toastTimer = setTimeout(function () { t.hidden = true; }, 4200);
}
function setStatus(msg, warn) {
S.status = msg;
var s = document.querySelector(".bd-ad-status");
if (s) {
s.textContent = msg;
s.classList.toggle("is-warn", !!warn);
}
}

/* LOOK — READ AND WRITE SETTINGS BY PATH ("menu.w") */
function L() {
return R.look(S.data);
}
function getL(path) {
var p = path.split(".");
var v = L();
for (var i = 0; i < p.length; i++) v = v == null ? v : v[p[i]];
return v;
}
function setL(path, val) {
var p = path.split(".");
S.data.look = S.data.look || {};
var o = S.data.look;
for (var i = 0; i < p.length - 1; i++) {
o[p[i]] = o[p[i]] && typeof o[p[i]] === "object" ? o[p[i]] : {};
o = o[p[i]];
}
o[p[p.length - 1]] = val;
}

/* GITHUB */
function gh(method, url, body) {
var ctl = method === "GET" && window.AbortController ? new AbortController() : null;
var timer = ctl ? setTimeout(function () { ctl.abort(); }, 30000) : null;
return fetch(url.indexOf("http") === 0 ? url : API + url, {
method: method,
headers: { "Authorization": "Bearer " + S.key, "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
body: body ? JSON.stringify(body) : undefined,
cache: "no-store",
signal: ctl ? ctl.signal : undefined
}).catch(function (err) {
if (timer) clearTimeout(timer);
throw new Error(err && err.name === "AbortError" ? "GitHub didn't answer in 30 seconds. Check the connection and try again." : "Couldn't reach GitHub (" + (err && err.message ? err.message : "network") + ").");
}).then(function (r) {
if (timer) clearTimeout(timer);
if (r.status === 401) throw new Error("KEY");
return r.json().then(function (j) {
if (!r.ok) {
var e = new Error((j && j.message) || ("HTTP " + r.status));
e.status = r.status;
throw e;
}
return j;
});
});
}
function b64ToText(b) {
var bin = atob(String(b).replace(/\n/g, ""));
var bytes = new Uint8Array(bin.length);
for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
return new TextDecoder("utf-8").decode(bytes);
}
function blobToB64(blob) {
return new Promise(function (res, rej) {
var r = new FileReader();
r.onload = function () { res(String(r.result).split(",")[1] || ""); };
r.onerror = function () { rej(r.error); };
r.readAsDataURL(blob);
});
}
async function ghFile(path, ref) {
try {
var j = await gh("GET", "/contents/" + path + "?ref=" + (ref || BRANCH));
var b64 = j.content;
if (!b64 && j.sha) b64 = (await gh("GET", "/git/blobs/" + j.sha)).content;
return { sha: j.sha, text: b64ToText(b64 || "") };
} catch (err) {
if (err.status === 404) return null;
throw err;
}
}

/* KEY GATE */
function lock(msg) {
$("bd-gate").hidden = false;
$("bd-gate-msg").textContent = msg || "";
$("bd-gate-key").focus();
}
async function connect() {
var k = $("bd-gate-key").value.trim();
if (!k) {
$("bd-gate-msg").textContent = "Paste the key first.";
return;
}
S.key = k;
$("bd-gate-msg").textContent = "Checking…";
try {
await gh("GET", "");
lsSet(KEY_STORE, k);
$("bd-gate").hidden = true;
load();
} catch (err) {
S.key = "";
$("bd-gate-msg").textContent = err.message === "KEY" ? "GitHub didn't accept that key." : (err.status === 404 ? "That key can't see walidalwawi/samt. Add the repo to the key." : err.message);
}
}

/* LOAD */
async function load() {
if (!S.key) {
lock();
return;
}
setStatus("Opening…");
try {
var f = await ghFile(DATA_FILE);
if (!f) throw new Error("content/samt.json is missing on GitHub.");
var remote = JSON.parse(f.text);
S.base = f.sha;
S.published = JSON.stringify(remote);
S.data = remote;
var draft = null;
try {
draft = JSON.parse(lsGet(DRAFT_STORE) || "null");
} catch (e) {}
if (draft && draft.data) {
if (draft.base === f.sha) {
S.data = draft.data;
toast("Your unpublished draft is back.");
}
else {
lsSet(DRAFT_STORE + "-old", JSON.stringify(draft));
toast("GitHub changed since your last draft, so the draft was set aside.");
}
}
S.hist = [JSON.stringify(S.data)];
S.fut = [];
S.pv = { view: "journal", post: S.data.featured || "" };
render();
setStatus(isDirty() ? "Draft — not published" : "Up to date");
} catch (err) {
if (err.message === "KEY") {
lock("That GitHub key no longer works. Make a new one.");
return;
}
setStatus("Couldn't open: " + err.message, true);
toast("Couldn't open the site: " + err.message);
}
}

/* CHANGES, UNDO, DRAFT */
var histTimer;
var draftTimer;
var pvTimer;
function isDirty() {
return S.data && JSON.stringify(S.data) !== S.published;
}
function changed(opt) {
opt = opt || {};
clearTimeout(histTimer);
histTimer = setTimeout(snapshot, 450);
clearTimeout(draftTimer);
draftTimer = setTimeout(saveDraft, 300);
clearTimeout(pvTimer);
pvTimer = setTimeout(preview, opt.now ? 0 : 160);
renderTop();
if (opt.panel) renderPanel();
}
function snapshot() {
var j = JSON.stringify(S.data);
if (S.hist[S.hist.length - 1] === j) return;
S.hist.push(j);
if (S.hist.length > 120) S.hist.shift();
S.fut = [];
renderTop();
}
function saveDraft() {
if (!S.data) return;
if (isDirty()) lsSet(DRAFT_STORE, JSON.stringify({ base: S.base, data: S.data, at: Date.now() }));
else lsDel(DRAFT_STORE);
setStatus(isDirty() ? "Draft saved here — not published" : "Up to date");
}
function undo() {
snapshot();
if (S.hist.length < 2) return;
S.fut.push(S.hist.pop());
S.data = JSON.parse(S.hist[S.hist.length - 1]);
afterHistory();
}
function redo() {
if (!S.fut.length) return;
var j = S.fut.pop();
S.hist.push(j);
S.data = JSON.parse(j);
afterHistory();
}
function afterHistory() {
saveDraft();
render();
}

/* IMAGES */
function imgUrl(file) {
if (!file) return "";
if (S.mem[file]) return S.mem[file];
return "/images/" + encodeURIComponent(file);
}
function pickFile() {
return new Promise(function (res) {
var inp = $("bd-file");
inp.value = "";
inp.onchange = function () { res(inp.files && inp.files[0]); };
inp.click();
});
}
async function uploadImage() {
var file = await pickFile();
if (!file) return null;
if (file.size > 20 * 1024 * 1024) {
toast("That image is over 20 MB. Make it smaller first.");
return null;
}
var ext = (file.name.match(/\.([a-z0-9]+)$/i) || [0, "jpg"])[1].toLowerCase();
var name = slugify(file.name.replace(/\.[^.]+$/, "")) + "-" + Date.now().toString(36) + "." + ext;
setStatus("Uploading " + file.name + "…");
try {
var j = await gh("POST", "/git/blobs", { content: await blobToB64(file), encoding: "base64" });
S.fresh[name] = j.sha;
S.mem[name] = URL.createObjectURL(file);
var dims = await new Promise(function (res) {
var im = new Image();
im.onload = function () { res({ w: im.naturalWidth, h: im.naturalHeight }); };
im.onerror = function () { res({}); };
im.src = S.mem[name];
});
setStatus("Uploaded — goes live when you publish");
return { file: name, w: dims.w, h: dims.h };
} catch (err) {
if (err.message === "KEY") lock("That GitHub key no longer works.");
setStatus("Upload failed", true);
toast("Upload failed: " + err.message);
return null;
}
}

/* PREVIEW */
function routeFor(pv) {
if (pv.view === "library") return { kind: "library" };
if (pv.view === "about") return { kind: "about" };
if (pv.view === "post") {
var isPage = (S.data.pages || []).some(function (p) { return p.id === pv.post; });
var exists = isPage || R.visiblePosts(S.data).some(function (p) { return p.id === pv.post; });
if (exists) return { kind: isPage ? "page" : "post", id: pv.post };
}
return { kind: "journal" };
}
var scrollMem = {};
function rememberScroll() {
var f = $("bd-preview");
try {
var d = f.contentDocument;
if (!d) return;
["#bd-content", ".bd-half-journal", ".bd-half-library", "#bd-about"].forEach(function (s) {
var n = d.querySelector(s);
if (n) scrollMem[s] = n.scrollTop;
});
} catch (e) {}
}
function restoreScroll() {
var f = $("bd-preview");
try {
var d = f.contentDocument;
Object.keys(scrollMem).forEach(function (s) {
var n = d.querySelector(s);
if (n) n.scrollTop = scrollMem[s];
});
} catch (e) {}
}
function preview() {
if (!S.data) return;
rememberScroll();
var html = R.documentHTML(S.data, routeFor(S.pv), {
css: R.css(S.data, ""),
js: "/assets/samt.js?v=" + Date.now().toString(36).slice(0, 5),
head: "<script>window.SAMT_PREVIEW = true;</script>\n",
img: imgUrl
});
var f = $("bd-preview");
f.onload = function () { restoreScroll(); };
f.srcdoc = html;
fitFrame();
}
function fitFrame() {
var stage = $("bd-stage");
var frame = $("bd-frame");
var W = S.dev === "m" ? 390 : 1280;
var H = S.dev === "m" ? 844 : 800;
var sw = stage.clientWidth - 36;
var sh = stage.clientHeight - 36;
if (window.innerWidth <= 900) {
sw = stage.clientWidth - 20;
sh = stage.clientHeight - 20;
}
var sc = Math.min(1, sw / W, S.dev === "m" ? sh / H : 1);
if (S.dev === "d") H = Math.max(560, Math.round(sh / sc));
frame.style.width = W + "px";
frame.style.height = H + "px";
frame.style.transform = "scale(" + sc + ")";
frame.style.marginBottom = (H * sc - H) + "px";
frame.style.marginLeft = frame.style.marginRight = ((W * sc - W) / 2) + "px";
frame.classList.toggle("is-phone", S.dev === "m");
$("bd-dim").textContent = (S.dev === "m" ? "Phone " : "Desktop ") + W + " × " + H + " · " + Math.round(sc * 100) + "%";
}
function goPreview(view, post) {
S.pv = { view: view, post: post || S.pv.post };
var f = $("bd-preview");
try {
f.contentWindow.postMessage({ samt: "go", view: view, post: S.pv.post }, "*");
} catch (e) {
preview();
}
renderSub();
}
window.addEventListener("message", function (ev) {
var d = ev.data || {};
if (d.samt !== "state" || ev.source !== $("bd-preview").contentWindow) return;
var was = S.pv.view + S.pv.post;
S.pv = { view: d.view, post: d.post };
if (was === S.pv.view + S.pv.post) return;
renderSub();
if (d.view === "post" && S.tab === "content" && !panelBusy()) {
var isPage = (S.data.pages || []).some(function (p) { return p.id === d.post; });
if (isPage && S.sub.content === "pages") S.sel.page = d.post;
else if (!isPage && S.sub.content === "journal") S.sel.post = d.post;
else return;
renderPanel();
}
});
function panelBusy() {
var a = document.activeElement;
return a && $("bd-panel").contains(a) && (a.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(a.tagName));
}

/* TOP BAR */
var TABS = [["content", "Content"], ["layers", "Layers"], ["type", "Type"], ["motion", "Motion"], ["site", "Site"]];
function renderTop() {
var top = $("bd-top");
top.innerHTML = "";
top.appendChild(el("div", { class: "bd-ad-brand" }, [el("b", { text: "صمت" }), el("span", { class: "bd-ad-dev", text: "BACK OFFICE" })]));
top.appendChild(el("div", { class: "bd-ad-tabs", role: "tablist" }, TABS.map(function (t) {
return el("button", { class: "bd-ad-tab" + (S.tab === t[0] ? " is-on" : ""), type: "button", role: "tab", "aria-selected": S.tab === t[0] ? "true" : "false", text: t[1], onclick: function () { S.tab = t[0]; render(); } });
})));
var dirty = isDirty();
top.appendChild(el("div", { class: "bd-ad-tools" }, [
el("span", { class: "bd-ad-status" + (/fail|Couldn|Not /.test(S.status) ? " is-warn" : ""), text: S.status }),
el("div", { class: "bd-ad-seg", role: "group", "aria-label": "Device" }, [
el("button", { type: "button", class: S.dev === "d" ? "is-on" : "", text: "Desktop", onclick: function () { setDev("d"); } }),
el("button", { type: "button", class: S.dev === "m" ? "is-on" : "", text: "Phone", onclick: function () { setDev("m"); } })
]),
el("button", { class: "bd-ad-btn is-icon", type: "button", title: "Undo (⌘Z)", "aria-label": "Undo", text: "↶", disabled: S.hist.length < 2, onclick: undo }),
el("button", { class: "bd-ad-btn is-icon", type: "button", title: "Redo (⇧⌘Z)", "aria-label": "Redo", text: "↷", disabled: !S.fut.length, onclick: redo }),
el("a", { class: "bd-ad-btn", href: "/", target: "_blank", rel: "noopener", text: "View site" }),
el("button", { class: "bd-ad-btn is-primary", type: "button", text: S.publishing ? "Publishing…" : "Publish", disabled: !dirty || S.publishing, title: "Save & publish (⌘S)", onclick: publish })
]));
}
function setDev(d) {
S.dev = d;
render();
}

/* SUB BAR — SECTIONS OF THE TAB, AND WHERE THE PREVIEW SITS */
var SUBS = {
content: [["journal", "Journal"], ["library", "Library"], ["about", "About"], ["pages", "Pages"]],
layers: [["menu", "Menu sheet"], ["index", "Index sheet"], ["library", "Library"], ["post", "Post"], ["ground", "Ground"]],
type: [["sizes", "Sizes"], ["fonts", "Fonts"], ["colour", "Colour"]],
motion: [["presets", "Presets"], ["sheets", "Sheets"], ["gestures", "Gestures"]],
site: [["general", "General"], ["menu", "Menu"], ["code", "Custom CSS"], ["key", "GitHub"]]
};
function renderSub() {
var sub = $("bd-sub");
sub.innerHTML = "";
SUBS[S.tab].forEach(function (s) {
sub.appendChild(el("button", { class: "bd-ad-subtab" + (S.sub[S.tab] === s[0] ? " is-on" : ""), type: "button", text: s[1], onclick: function () { S.sub[S.tab] = s[0]; followSub(); render(); } }));
});
sub.appendChild(el("span", { class: "bd-ad-spacer" }));
var v = S.pv.view;
sub.appendChild(el("div", { class: "bd-ad-go" }, [
el("span", { text: "PREVIEW" }),
goBtn("Journal", v === "journal", function () { goPreview("journal"); }),
goBtn("Library", v === "library", function () { goPreview("library"); }),
goBtn("Post", v === "post", function () { goPreview("post", S.sel.post || S.pv.post || S.data.featured); }),
goBtn("About", v === "about", function () { goPreview("about"); })
]));
}
function goBtn(label, on, fn) {
return el("button", { class: "bd-ad-btn is-small" + (on ? " is-primary" : ""), type: "button", text: label, onclick: fn });
}
function followSub() {
var t = S.tab;
var s = S.sub[t];
if (t === "content" && s === "library") goPreview("library");
if (t === "content" && s === "about") goPreview("about");
if (t === "content" && s === "journal") goPreview(S.sel.post ? "post" : "journal", S.sel.post);
if (t === "layers" && s === "menu") goPreview("about");
if (t === "layers" && s === "index") goPreview("journal");
if (t === "layers" && s === "library") goPreview("library");
if (t === "layers" && s === "post") goPreview("post", S.pv.post || S.data.featured);
}

/* RENDER ALL */
function render() {
renderTop();
renderSub();
renderPanel();
preview();
}
function renderPanel() {
var p = $("bd-panel");
var keep = p.scrollTop;
p.innerHTML = "";
var fn = PANELS[S.tab + "." + S.sub[S.tab]];
if (fn) fn(p);
p.scrollTop = keep;
}

/* FIELD BUILDERS */
function sec(title, kids, extra) {
return el("section", { class: "bd-ad-sec" }, [el("h3", {}, [el("span", { text: title }), extra || null])].concat(kids));
}
function note(t) {
return el("p", { class: "bd-ad-note", text: t });
}
function devTag(on) {
return on ? el("span", { class: "bd-ad-dev", text: S.dev === "m" ? "PHONE" : "DESKTOP" }) : null;
}
function num(label, key, o) {
o = o || {};
var k = S.dev === "m" && o.m ? o.m : key;
var val = Number(getL(k));
var lab = S.dev === "m" && o.mLabel ? o.mLabel : label;
var rng = el("input", { type: "range", min: o.min || 0, max: o.max || 100, step: o.step || 1, value: val, "aria-label": lab });
var box = el("input", { class: "bd-ad-input is-num", type: "number", min: o.min || 0, max: o.max || 100, step: o.step || 1, value: val, "aria-label": lab + " value" });
function put(v, from) {
v = Number(v);
if (isNaN(v)) return;
if (o.clamp) v = o.clamp(v);
setL(k, v);
if (from !== rng) rng.value = v;
if (from !== box) box.value = v;
changed();
if (o.after) o.after(v);
}
rng.addEventListener("input", function () { put(rng.value, rng); });
box.addEventListener("change", function () { put(box.value, box); });
return el("div", { class: "bd-ad-f" }, [el("label", {}, [lab + (o.unit ? " (" + o.unit + ")" : ""), " ", devTag(!!o.m)]), el("div", { class: "bd-ad-range" }, [rng, box])]);
}
function toggle(label, key) {
var cb = el("input", { type: "checkbox" });
cb.checked = !!getL(key);
cb.addEventListener("change", function () {
setL(key, cb.checked);
changed();
});
return el("div", { class: "bd-ad-f" }, [el("span", { class: "bd-ad-flabel", text: "" }), el("label", { class: "bd-ad-check" }, [cb, label])]);
}
function choose(label, key, opts, after) {
var v = String(getL(key));
var seg = opts.length <= 4 && opts.every(function (x) { return x[1].length < 14; });
if (seg) {
return el("div", { class: "bd-ad-f" }, [el("span", { class: "bd-ad-flabel", text: label }), el("div", { class: "bd-ad-seg" }, opts.map(function (x) {
return el("button", { type: "button", class: v === String(x[0]) ? "is-on" : "", text: x[1], onclick: function () { setL(key, x[0]); changed({ panel: true }); if (after) after(x[0]); } });
}))]);
}
var s = el("select", { class: "bd-ad-select", "aria-label": label }, opts.map(function (x) {
var op = el("option", { value: x[0], text: x[1] });
if (String(x[0]) === v) op.selected = true;
return op;
}));
s.addEventListener("change", function () {
var val = s.value;
var orig = opts.filter(function (x) { return String(x[0]) === val; })[0];
setL(key, orig ? orig[0] : val);
changed();
if (after) after(val);
});
return el("div", { class: "bd-ad-f" }, [el("label", { text: label }), s]);
}
var GREYS = ["#FFFFFF", "#FBFAF8", "#F3F1EC", "#E9E6DF", "#E4E1DA", "#D9D5CC", "#D2CEC6", "#C4BFB5", "#A8A399", "#6B6862", "#2B2A27", "#111111"];
function colour(label, key) {
var v = String(getL(key) || "#000000").toUpperCase();
var pick = el("input", { type: "color", value: v.length === 7 ? v : "#000000", "aria-label": label + " picker" });
var hex = el("input", { class: "bd-ad-input", value: v, "aria-label": label + " hex" });
function put(x) {
if (!/^#[0-9a-f]{6}$/i.test(x)) return;
setL(key, x.toUpperCase());
changed({ panel: true });
}
pick.addEventListener("input", function () { setL(key, pick.value.toUpperCase()); hex.value = pick.value.toUpperCase(); changed(); });
pick.addEventListener("change", function () { put(pick.value); });
hex.addEventListener("change", function () { put(hex.value.trim()); });
return el("div", { class: "bd-ad-f is-wide" }, [el("label", { text: label }), el("div", { class: "bd-ad-color" }, GREYS.map(function (g) {
return el("button", { type: "button", class: "bd-ad-swatch" + (g === v ? " is-on" : ""), style: "background:" + g, title: g, "aria-label": g, onclick: function () { put(g); } });
}).concat([pick, hex]))]);
}
function textIn(label, get, set, o) {
o = o || {};
var inp = el(o.area ? "textarea" : "input", { class: o.area ? "bd-ad-area" + (o.code ? " is-code" : "") : "bd-ad-input", placeholder: o.ph || "", "aria-label": label, spellcheck: o.code ? "false" : null });
inp.value = get() || "";
inp.addEventListener("input", function () {
set(inp.value);
changed();
});
if (o.blur) inp.addEventListener("change", function () { o.blur(inp); });
return el("div", { class: "bd-ad-f" + (o.wide || o.area ? " is-wide" : "") }, [el("label", { text: label }), inp]);
}
function resetBtn(group) {
return el("button", { class: "bd-ad-btn is-small", type: "button", text: "Reset", title: "Back to the defaults", onclick: function () {
if (!confirm("Reset these settings to the defaults?")) return;
if (S.data.look) delete S.data.look[group];
changed({ panel: true, now: true });
} });
}

/* BLOCK EDITOR — TEXT, IMAGE, QUOTE, FOLD-OUT LIST, PRODUCT */
function blocksEditor(blocks, kinds) {
var wrap = el("div", {});
function redraw() {
wrap.innerHTML = "";
blocks.forEach(function (b, i) {
wrap.appendChild(blockCard(b, i));
});
wrap.appendChild(el("div", { class: "bd-ad-add" }, kinds.map(function (k) {
return el("button", { class: "bd-ad-btn is-small", type: "button", text: "+ " + KIND_LABEL[k], onclick: function () { add(k); } });
})));
}
async function add(k) {
var b = { t: k };
if (k === "text") b.html = "<p></p>";
if (k === "quote") b.html = "<p></p>";
if (k === "list") {
b.title = "Title";
b.items = [];
b.open = false;
}
if (k === "product") {
b.title = "Product";
b.price = "";
b.note = "";
b.href = "";
}
if (k === "image") {
var up = await uploadImage();
if (!up) return;
b.file = up.file;
b.w = up.w;
b.h = up.h;
b.alt = "";
b.caption = "";
}
blocks.push(b);
changed();
redraw();
var last = wrap.querySelectorAll(".bd-ad-rich");
if (last.length && (k === "text" || k === "quote")) last[last.length - 1].focus();
}
function blockCard(b, i) {
var head = el("div", { class: "bd-ad-block-h" }, [
el("span", { text: KIND_LABEL[b.t] || b.t }),
el("button", { class: "bd-ad-btn is-small is-icon", type: "button", "aria-label": "Move up", text: "↑", disabled: i === 0, onclick: function () { blocks.splice(i - 1, 0, blocks.splice(i, 1)[0]); changed(); redraw(); } }),
el("button", { class: "bd-ad-btn is-small is-icon", type: "button", "aria-label": "Move down", text: "↓", disabled: i === blocks.length - 1, onclick: function () { blocks.splice(i + 1, 0, blocks.splice(i, 1)[0]); changed(); redraw(); } }),
el("button", { class: "bd-ad-btn is-small is-icon is-danger", type: "button", "aria-label": "Delete block", text: "✕", onclick: function () { if (!confirm("Delete this " + (KIND_LABEL[b.t] || "block").toLowerCase() + "?")) return; blocks.splice(i, 1); changed(); redraw(); } })
]);
var body = el("div", { class: "bd-ad-block-b" });
if (b.t === "text" || b.t === "quote" || b.t === "html") body.appendChild(rich(b, b.t === "quote"));
if (b.t === "image") body.appendChild(imageFields(b, function () { changed(); redraw(); }));
if (b.t === "list") {
body.appendChild(textIn("Title", function () { return b.title; }, function (v) { b.title = v; }));
body.appendChild(textIn("Items, one per line", function () { return (b.items || []).join("\n"); }, function (v) { b.items = v.split("\n").map(function (x) { return x.trim(); }).filter(Boolean); }, { area: true }));
var cb = el("input", { type: "checkbox" });
cb.checked = !!b.open;
cb.addEventListener("change", function () { b.open = cb.checked; changed(); });
body.appendChild(el("label", { class: "bd-ad-check" }, [cb, "Starts open"]));
}
if (b.t === "product") {
body.appendChild(imageFields(b, function () { changed(); redraw(); }, true));
body.appendChild(textIn("Title", function () { return b.title; }, function (v) { b.title = v; }));
body.appendChild(textIn("Price", function () { return b.price; }, function (v) { b.price = v; }));
body.appendChild(textIn("Note", function () { return b.note; }, function (v) { b.note = v; }, { ph: "Sold out" }));
body.appendChild(textIn("Link", function () { return b.href; }, function (v) { b.href = v; }, { ph: "https://" }));
}
return el("div", { class: "bd-ad-block" }, [head, body]);
}
redraw();
return wrap;
}
var KIND_LABEL = { text: "Text", image: "Image", quote: "Quote", list: "Fold-out list", product: "Product", html: "HTML" };
function rich(b, isQuote) {
var box = el("div", { class: "bd-ad-rich" + (isQuote ? " is-quote" : ""), contenteditable: "true", role: "textbox", "aria-multiline": "true", "aria-label": isQuote ? "Quote" : "Text" });
box.innerHTML = b.html || "";
function save() {
var h = box.innerHTML.replace(/<div>/g, "<p>").replace(/<\/div>/g, "</p>").replace(/ style="[^"]*"/g, "").replace(/<span>([\s\S]*?)<\/span>/g, "$1");
if (!/^\s*</.test(h) && h.trim()) h = "<p>" + h + "</p>";
b.html = h;
changed();
}
box.addEventListener("input", save);
box.addEventListener("paste", function (ev) {
ev.preventDefault();
var t = (ev.clipboardData || window.clipboardData).getData("text/plain");
var paras = t.split(/\n\s*\n/).map(function (x) { return x.replace(/\n/g, " ").trim(); }).filter(Boolean);
if (paras.length > 1) document.execCommand("insertHTML", false, paras.map(function (x) { return "<p>" + x.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</p>"; }).join(""));
else document.execCommand("insertText", false, t);
});
box.addEventListener("focus", function () {
try {
document.execCommand("defaultParagraphSeparator", false, "p");
} catch (e) {}
});
function cmd(c, v) {
return function (ev) {
ev.preventDefault();
box.focus();
document.execCommand(c, false, v);
save();
};
}
var bar = el("div", { class: "bd-ad-fmt" }, [
el("button", { type: "button", title: "Bold", html: "<b>B</b>", onmousedown: cmd("bold") }),
el("button", { type: "button", title: "Italic", html: "<i>I</i>", onmousedown: cmd("italic") }),
el("button", { type: "button", title: "Link", text: "Link", onmousedown: function (ev) {
ev.preventDefault();
var u = prompt("Link address", "https://");
if (!u) return;
box.focus();
document.execCommand("createLink", false, u);
save();
} }),
el("button", { type: "button", title: "Remove formatting", text: "Clear", onmousedown: function (ev) { ev.preventDefault(); box.focus(); document.execCommand("removeFormat"); document.execCommand("unlink"); save(); } })
]);
return el("div", {}, [bar, box]);
}
function imageFields(b, redraw, optional) {
var pic = b.file ? el("img", { src: imgUrl(b.file), alt: "" }) : el("div", { class: "bd-ad-noimg" });
return el("div", { class: "bd-ad-img" }, [pic, el("div", {}, [
el("div", { class: "bd-ad-add" }, [
el("button", { class: "bd-ad-btn is-small", type: "button", text: b.file ? "Replace" : "Upload", onclick: async function () {
var up = await uploadImage();
if (!up) return;
b.file = up.file;
b.w = up.w;
b.h = up.h;
redraw();
} }),
optional && b.file ? el("button", { class: "bd-ad-btn is-small", type: "button", text: "Remove", onclick: function () { b.file = ""; redraw(); } }) : null
]),
b.t === "image" ? textIn("Description", function () { return b.alt; }, function (v) { b.alt = v; }, { wide: true, ph: "What the drawing shows" }) : null,
b.t === "image" ? textIn("Caption", function () { return b.caption; }, function (v) { b.caption = v; }, { wide: true, ph: "Optional, shown in mono" }) : null
])]);
}

/* CONTENT — JOURNAL */
function postById(id) {
return (S.data.posts || []).filter(function (p) { return p.id === id; })[0];
}
function pageById(id) {
return (S.data.pages || []).filter(function (p) { return p.id === id; })[0];
}
function slugFree(slug, self) {
if (RESERVED.indexOf(slug) >= 0) return false;
return !(S.data.posts || []).concat(S.data.pages || []).some(function (x) { return x !== self && x.slug === slug; });
}
function slugField(item) {
return textIn("Address", function () { return item.slug; }, function () {}, { ph: "post-name", blur: function (inp) {
var s = slugify(inp.value);
if (!slugFree(s, item)) {
toast("samt.co/" + s + " is taken. Pick another address.");
inp.value = item.slug;
return;
}
item.slug = s;
inp.value = s;
changed();
} });
}
function journalPanel(p) {
var post = postById(S.sel.post);
if (post) return postEditor(p, post);
var list = el("div", { class: "bd-ad-list" });
(S.data.posts || []).forEach(function (x, i) {
var tags = [];
if (x.id === S.data.featured) tags.push(el("span", { class: "bd-ad-tag", text: "UNDER INDEX" }));
if (x.hidden) tags.push(el("span", { class: "bd-ad-tag", text: "HIDDEN" }));
list.appendChild(el("div", { class: "bd-ad-row" }, [
x.cover ? el("img", { class: "bd-ad-thumb", src: imgUrl(x.cover), alt: "" }) : el("span", { class: "bd-ad-thumb" }),
el("button", { type: "button", style: "border:0;background:none;text-align:left;padding:0;min-width:0", onclick: function () { S.sel.post = x.id; goPreview("post", x.id); renderPanel(); } }, [
el("span", { class: "bd-ad-row-t", text: x.title }),
el("span", { class: "bd-ad-row-m", text: R.readMeta(x) })
]),
el("div", { style: "display:flex;gap:4px;align-items:center" }, tags.concat([
el("button", { class: "bd-ad-btn is-small is-icon", type: "button", "aria-label": "Move up", text: "↑", disabled: i === 0, onclick: function () { var a = S.data.posts; a.splice(i - 1, 0, a.splice(i, 1)[0]); changed({ panel: true }); } }),
el("button", { class: "bd-ad-btn is-small is-icon", type: "button", "aria-label": "Move down", text: "↓", disabled: i === S.data.posts.length - 1, onclick: function () { var a = S.data.posts; a.splice(i + 1, 0, a.splice(i, 1)[0]); changed({ panel: true }); } })
]))
]));
});
p.appendChild(sec("Journal · " + (S.data.posts || []).length + " posts", [
note("Tap a post to edit it. The order here is the order on the index sheet."),
list,
el("div", { class: "bd-ad-add" }, [el("button", { class: "bd-ad-btn", type: "button", text: "+ New post", onclick: function () {
var t = "New post";
var s = slugify(t);
var n = 2;
while (!slugFree(s)) s = slugify(t) + "-" + n++;
var np = { id: rid(), slug: s, title: t, subtitle: "", desc: "", cover: "", hidden: false, blocks: [{ t: "text", html: "<p></p>" }] };
S.data.posts.unshift(np);
S.sel.post = np.id;
changed({ panel: true, now: true });
goPreview("post", np.id);
} })])
]));
}
function postEditor(p, post) {
p.appendChild(sec("Post", [
el("button", { class: "bd-ad-back", type: "button", text: "← All posts", onclick: function () { S.sel.post = null; goPreview("journal"); renderPanel(); } }),
textIn("Title", function () { return post.title; }, function (v) { post.title = v; }),
textIn("Subtitle", function () { return post.subtitle; }, function (v) { post.subtitle = v; }, { ph: "Optional" }),
slugField(post),
textIn("Search text", function () { return post.desc; }, function (v) { post.desc = v; }, { area: true, ph: "One or two lines for Google and link previews" }),
coverField(post),
el("div", { class: "bd-ad-f" }, [el("span", { class: "bd-ad-flabel", text: "" }), el("label", { class: "bd-ad-check" }, [checkbox(S.data.featured === post.id, function (on) { S.data.featured = on ? post.id : ((R.visiblePosts(S.data)[0] || {}).id || ""); }), "Lies under the index (featured)"])]),
el("div", { class: "bd-ad-f" }, [el("span", { class: "bd-ad-flabel", text: "" }), el("label", { class: "bd-ad-check" }, [checkbox(!!post.hidden, function (on) { post.hidden = on; }), "Hidden from the site"])])
]));
p.appendChild(sec("Text and drawings", [blocksEditor(post.blocks, ["text", "image", "quote", "list"])]));
p.appendChild(sec("Danger", [el("button", { class: "bd-ad-btn is-danger", type: "button", text: "Delete this post", onclick: function () {
if (!confirm("Delete \"" + post.title + "\"? You can undo until you publish.")) return;
S.data.posts = S.data.posts.filter(function (x) { return x !== post; });
if (S.data.featured === post.id) S.data.featured = (R.visiblePosts(S.data)[0] || {}).id || "";
S.sel.post = null;
goPreview("journal");
changed({ panel: true, now: true });
} })]));
}
function checkbox(on, fn) {
var cb = el("input", { type: "checkbox" });
cb.checked = on;
cb.addEventListener("change", function () {
fn(cb.checked);
changed({ panel: true });
});
return cb;
}
function coverField(post) {
var imgs = post.blocks.filter(function (b) { return b.t === "image" && b.file; }).map(function (b) { return b.file; });
if (post.cover && imgs.indexOf(post.cover) < 0) imgs.unshift(post.cover);
var row = el("div", { class: "bd-ad-color" }, imgs.map(function (f) {
return el("button", { type: "button", class: "bd-ad-swatch" + (post.cover === f ? " is-on" : ""), style: "width:48px;height:48px;background:#fff url('" + imgUrl(f).replace(/'/g, "%27") + "') center/contain no-repeat", "aria-label": "Use " + f, onclick: function () { post.cover = f; changed({ panel: true }); } });
}).concat([el("button", { class: "bd-ad-btn is-small", type: "button", text: "Upload own", onclick: async function () {
var up = await uploadImage();
if (!up) return;
post.cover = up.file;
changed({ panel: true });
} })]));
return el("div", { class: "bd-ad-f is-wide" }, [el("label", { text: "Card image (on the index)" }), row]);
}

/* CONTENT — LIBRARY */
function libraryPanel(p) {
var lib = S.data.library = S.data.library || { items: [] };
var book = (lib.items || []).filter(function (b) { return b.id === S.sel.book; })[0];
if (book) return bookEditor(p, lib, book);
var q = el("input", { class: "bd-ad-input", placeholder: "Search title, author, topic", "aria-label": "Search the library", value: S.q });
var list = el("div", { class: "bd-ad-list" });
function fill() {
list.innerHTML = "";
var w = S.q.toLowerCase();
lib.items.filter(function (b) { return !w || (b.title + " " + b.author + " " + (b.topics || []).join(" ")).toLowerCase().indexOf(w) >= 0; }).forEach(function (b) {
var src = R.bookCover(b, imgUrl);
list.appendChild(el("button", { class: "bd-ad-row", type: "button", onclick: function () { S.sel.book = b.id; renderPanel(); } }, [
src ? el("img", { class: "bd-ad-thumb", src: src, alt: "", loading: "lazy", referrerpolicy: "no-referrer" }) : el("span", { class: "bd-ad-thumb" }),
el("span", { style: "min-width:0" }, [el("span", { class: "bd-ad-row-t", text: b.title }), el("span", { class: "bd-ad-row-m", text: [b.author].concat(b.topics || []).filter(Boolean).join(" · ") })]),
el("span", { class: "bd-ad-row-m", text: "Edit" })
]));
});
}
q.addEventListener("input", function () { S.q = q.value; fill(); });
fill();
p.appendChild(sec("Library · " + lib.items.length + " books", [
note("Covers come from the Google Drive link automatically. Upload your own to replace one. Topics become the filters."),
q,
el("div", { style: "height:10px" }),
list,
el("div", { class: "bd-ad-add" }, [el("button", { class: "bd-ad-btn", type: "button", text: "+ Add book", onclick: function () {
var b = { id: "lb" + rid(), title: "New book", author: "", topics: [], href: "", file: "" };
lib.items.unshift(b);
S.sel.book = b.id;
changed({ panel: true });
} })])
]));
p.appendChild(sec("Filter row", [
textIn("First filter", function () { return lib.all || "All"; }, function (v) { lib.all = v; }),
el("div", { class: "bd-ad-f" }, [el("span", { class: "bd-ad-flabel", text: "" }), el("label", { class: "bd-ad-check" }, [checkbox(lib.filters !== false, function (on) { lib.filters = on; }), "Show topic filters"])])
]));
}
function bookEditor(p, lib, b) {
var src = R.bookCover(b, imgUrl);
p.appendChild(sec("Book", [
el("button", { class: "bd-ad-back", type: "button", text: "← All books", onclick: function () { S.sel.book = null; renderPanel(); } }),
el("div", { class: "bd-ad-img" }, [src ? el("img", { src: src, alt: "", referrerpolicy: "no-referrer" }) : el("div", { class: "bd-ad-noimg" }), el("div", {}, [
el("div", { class: "bd-ad-add" }, [
el("button", { class: "bd-ad-btn is-small", type: "button", text: "Upload cover", onclick: async function () { var up = await uploadImage(); if (!up) return; b.file = up.file; changed({ panel: true }); } }),
b.file ? el("button", { class: "bd-ad-btn is-small", type: "button", text: "Use Drive cover", onclick: function () { b.file = ""; changed({ panel: true }); } }) : null
])
])]),
textIn("Title", function () { return b.title; }, function (v) { b.title = v; }),
textIn("Author", function () { return b.author; }, function (v) { b.author = v; }),
textIn("Topics", function () { return (b.topics || []).join(", "); }, function (v) { b.topics = v.split(",").map(function (x) { return x.trim(); }).filter(Boolean); }, { ph: "Art, Poetry" }),
textIn("Link", function () { return b.href; }, function (v) { b.href = v.trim(); }, { ph: "Google Drive link" })
]));
p.appendChild(sec("Danger", [el("button", { class: "bd-ad-btn is-danger", type: "button", text: "Remove this book", onclick: function () {
if (!confirm("Remove \"" + b.title + "\" from the library?")) return;
lib.items = lib.items.filter(function (x) { return x !== b; });
S.sel.book = null;
changed({ panel: true });
} })]));
}

/* CONTENT — ABOUT AND PAGES */
function aboutPanel(p) {
S.data.about = S.data.about || { blocks: [] };
p.appendChild(sec("About — written on the menu sheet", [note("This text sits on the menu sheet and slides over everything when About is tapped."), blocksEditor(S.data.about.blocks, ["text", "quote", "list", "image"])]));
}
function pagesPanel(p) {
S.data.pages = S.data.pages || [];
var page = pageById(S.sel.page);
if (page) {
var mi = (S.data.menu || []).filter(function (m) { return m.kind === "page" && m.page === page.id; })[0];
p.appendChild(sec("Page", [
el("button", { class: "bd-ad-back", type: "button", text: "← All pages", onclick: function () { S.sel.page = null; goPreview("journal"); renderPanel(); } }),
textIn("Title", function () { return page.title; }, function (v) { page.title = v; if (mi) mi.label = v; }),
slugField(page),
textIn("Search text", function () { return page.desc; }, function (v) { page.desc = v; }, { area: true }),
el("div", { class: "bd-ad-f" }, [el("span", { class: "bd-ad-flabel", text: "" }), el("label", { class: "bd-ad-check" }, [checkbox(!!(mi && mi.show !== false), function (on) {
if (!mi) {
mi = { id: "m" + rid(), kind: "page", page: page.id, label: page.title, show: true };
S.data.menu.push(mi);
}
mi.show = on;
}), "Show in the menu"])])
]));
p.appendChild(sec("Content", [note("Pages open in the content layer, like a post."), blocksEditor(page.blocks, ["text", "image", "quote", "list", "product"])]));
p.appendChild(sec("Danger", [el("button", { class: "bd-ad-btn is-danger", type: "button", text: "Delete this page", onclick: function () {
if (!confirm("Delete the page \"" + page.title + "\"?")) return;
S.data.pages = S.data.pages.filter(function (x) { return x !== page; });
S.data.menu = S.data.menu.filter(function (m) { return !(m.kind === "page" && m.page === page.id); });
S.sel.page = null;
goPreview("journal");
changed({ panel: true, now: true });
} })]));
return;
}
var list = el("div", { class: "bd-ad-list" }, S.data.pages.map(function (x) {
return el("button", { class: "bd-ad-row is-plain", type: "button", onclick: function () { S.sel.page = x.id; goPreview("post", x.id); renderPanel(); } }, [el("span", { class: "bd-ad-row-t", text: x.title + "  /" + x.slug }), el("span", { class: "bd-ad-row-m", text: "Edit" })]);
}));
p.appendChild(sec("Pages", [note("Extra pages like Supply. They open in the content layer and can sit in the menu."), list, el("div", { class: "bd-ad-add" }, [el("button", { class: "bd-ad-btn", type: "button", text: "+ New page", onclick: function () {
var s = "page";
var n = 2;
while (!slugFree(s)) s = "page-" + n++;
var np = { id: rid(), slug: s, title: "New page", desc: "", blocks: [{ t: "text", html: "<p></p>" }] };
S.data.pages.push(np);
S.sel.page = np.id;
changed({ panel: true, now: true });
goPreview("post", np.id);
} })])]));
}

/* LAYERS */
function layersMenu(p) {
p.appendChild(sec("Menu sheet — the top layer", [
note("The sheet with the menu. Desktop: a column on the left. Phone: a band on top. About slides it over everything."),
colour("Colour", "menu.color"),
num("See-through", "menu.alpha", { min: 0, max: 100, unit: "%" }),
num("Blur below", "menu.blur", { min: 0, max: 30, unit: "px" }),
num("Column width", "menu.w", { m: "menu.band", mLabel: "Band height", min: 40, max: 420, unit: "px" }),
num("Side padding", "menu.pad", { m: "menu.padM", min: 0, max: 120, unit: "px" }),
num("Item spacing", "menu.gap", { m: "menu.gapM", min: 0, max: 48, unit: "px" }),
S.dev === "d" ? choose("Align", "menu.align", [["right", "Right"], ["left", "Left"]]) : null,
textIn("Current mark", function () { return getL("menu.marker"); }, function (v) { setL("menu.marker", v); }, { ph: ">" }),
num("Mark gap", "menu.markGap", { min: 0, max: 40, unit: "px" }),
toggle("Hairline edge", "menu.edge")
], resetBtn("menu")));
p.appendChild(sec("About on the sheet", [
num("Text width", "menu.aboutW", { min: 280, max: 1100, unit: "px" }),
num("Side padding", "menu.aboutPad", { m: "menu.aboutPadM", min: 0, max: 200, unit: "px" })
]));
}
var RATIOS = [["1/1", "Square"], ["4/5", "4:5"], ["3/4", "3:4"], ["2/3", "2:3"], ["3/2", "3:2"], ["16/9", "16:9"]];
function layersIndex(p) {
p.appendChild(sec("Index sheet — tracing paper", [
note("Journal on its top half, Library on its bottom half. It slides up and down between them, and away when a post opens."),
colour("Colour", "index.color"),
num("See-through", "index.alpha", { min: 0, max: 100, unit: "%" }),
num("Blur below", "index.blur", { min: 0, max: 30, unit: "px" }),
num("Edge left showing", "index.sliver", { m: "index.sliverM", min: 0, max: 160, unit: "px" }),
num("Side padding", "index.pad", { m: "index.padM", min: 0, max: 160, unit: "px" }),
num("Top padding", "index.padTop", { m: "index.padTopM", min: 0, max: 160, unit: "px" }),
toggle("Hairline edge", "index.edge")
], resetBtn("index")));
p.appendChild(sec("Journal cards", [
num("Columns", "index.cols", { m: "index.colsM", min: 1, max: 8 }),
num("Column gap", "index.gap", { m: "index.gapM", min: 0, max: 120, unit: "px" }),
num("Row gap", "index.rowGap", { m: "index.rowGapM", min: 0, max: 160, unit: "px" }),
choose("Image shape", "index.ratio", RATIOS),
choose("Image fit", "index.fit", [["contain", "Whole"], ["cover", "Fill"]]),
colour("Image paper", "index.thumbBg"),
toggle("Show titles", "index.captions"),
toggle("Show words ~ minutes", "index.meta")
]));
}
function layersLibrary(p) {
p.appendChild(sec("Library — bottom half of the index sheet", [
num("Columns", "index.libCols", { m: "index.libColsM", min: 1, max: 10 }),
num("Column gap", "index.libGap", { m: "index.libGapM", min: 0, max: 120, unit: "px" }),
num("Row gap", "index.libRowGap", { m: "index.libRowGapM", min: 0, max: 160, unit: "px" }),
choose("Cover shape", "index.libRatio", RATIOS),
toggle("Show titles", "index.libTitles"),
toggle("Show authors", "index.libAuthors"),
toggle("Show topic filters", "index.filters")
], resetBtn("index")));
}
function layersPost(p) {
p.appendChild(sec("Post — the bottom layer", [
num("Text width", "post.measure", { min: 320, max: 1000, unit: "px" }),
num("Title column", "post.side", { min: 120, max: 500, unit: "px" }),
num("Column gap", "post.gap", { min: 0, max: 160, unit: "px" }),
num("Top padding", "post.padTop", { m: "post.padTopM", min: 0, max: 200, unit: "px" }),
num("Bottom padding", "post.padBottom", { min: 0, max: 400, unit: "px" }),
num("Paragraph spacing", "post.blockGap", { m: "post.blockGapM", min: 0, max: 60, unit: "px" }),
num("Drawing width", "post.imgW", { min: 30, max: 100, unit: "%" }),
choose("Quote", "post.quote", [["card", "Card"], ["line", "Line"], ["indent", "Indent"]]),
colour("Quote card", "post.quoteBg"),
toggle("Show subtitle", "post.showSub"),
toggle("Show words ~ minutes", "post.showMeta"),
textIn("Back mark", function () { return getL("post.metaBack"); }, function (v) { setL("post.metaBack", v); }, { ph: "<" }),
toggle("Show image captions", "post.captions")
], resetBtn("post")));
}
function layersGround(p) {
p.appendChild(sec("Ground — under everything", [
colour("Ground", "color.ground"),
colour("Paper (cards, covers)", "color.paper")
]));
}

/* TYPE — TWO SIZES AND A MONO */
function typeSizes(p) {
function k(n) {
return S.dev === "m" ? "size." + n + "M" : "size." + n;
}
p.appendChild(sec("Two sizes and a mono", [
note("Large: menu, the Arabic mark, the post title on phones. Small: everything else. Mono: words ~ minutes, filters, captions — always smaller than Small."),
num("Large", "size.large", { m: "size.largeM", min: 10, max: 60, step: 0.5, unit: "px", clamp: function (v) { return Math.max(v, getL(k("small"))); } }),
num("Small", "size.small", { m: "size.smallM", min: 9, max: 30, step: 0.5, unit: "px", clamp: function (v) { return Math.min(v, getL(k("large"))); }, after: function (v) {
if (getL(k("mono")) >= v) setL(k("mono"), Math.max(7, v - 1.5));
} }),
num("Mono", "size.mono", { m: "size.monoM", min: 7, max: 24, step: 0.5, unit: "px", clamp: function (v) { return Math.min(v, getL(k("small")) - 0.5); } }),
num("Large line height", "size.lhLarge", { min: 1, max: 2, step: 0.05 }),
num("Small line height", "size.lhSmall", { min: 1, max: 2.2, step: 0.05 }),
num("Mono line height", "size.lhMono", { min: 1, max: 2, step: 0.05 })
], resetBtn("size")));
}
function typeFonts(p) {
p.appendChild(sec("Fonts", [
choose("Text", "font.sans", Object.keys(R.SANS).map(function (k) { return [k, R.SANS[k].label]; })),
choose("Mono", "font.mono", Object.keys(R.MONO).map(function (k) { return [k, R.MONO[k].label]; })),
choose("Weight", "font.weight", [[400, "Regular"], [500, "Medium"]]),
num("Letter spacing", "size.tracking", { min: -0.05, max: 0.1, step: 0.005, unit: "em" }),
choose("Mono case", "size.monoCase", [["none", "As typed"], ["uppercase", "CAPITALS"], ["lowercase", "lower"]])
], resetBtn("font")));
}
function typeColour(p) {
p.appendChild(sec("Ink", [
colour("Text", "color.ink"),
colour("Quiet text (mono, subtitles)", "color.muted"),
choose("Links in text", "color.link", [["underline", "Underline"], ["muted", "Quiet"], ["plain", "Plain"]])
], resetBtn("color")));
}

/* MOTION */
var PRESETS = [
{ id: "paper", label: "Paper", hint: "Sheets glide and settle. Cards lift, books swing open. The default.", set: { ease: "paper", dur: 460, menuDur: 460, tilt: 0, lift: true, stagger: true, step: 40, thumb: "lift", book: "swing", reveal: "focus", focusBlur: 3 } },
{ id: "drag", label: "Heavy drag", hint: "Slow to start, like pulling a big sheet across a desk. Slight tilt.", set: { ease: "drag", dur: 720, menuDur: 640, tilt: 0.6, lift: true, stagger: true, step: 55, thumb: "nudge", book: "swing", reveal: "focus", focusBlur: 4 } },
{ id: "stop", label: "Stop-motion", hint: "Moves in six frames, like a paper animation. Deadpan.", set: { ease: "stop", dur: 540, menuDur: 540, tilt: 1, lift: false, stagger: false, step: 40, thumb: "tilt", book: "swing", reveal: "none", focusBlur: 3 } },
{ id: "tracing", label: "Tracing", hint: "A frosted sheet lies on each card and slides off when tapped.", set: { ease: "paper", dur: 520, menuDur: 520, tilt: 0, lift: true, stagger: true, step: 35, thumb: "trace", book: "lift", reveal: "rise", focusBlur: 3 } },
{ id: "quiet", label: "Quiet", hint: "Quick, even slides. No tilt, no settling. For reading.", set: { ease: "slide", dur: 320, menuDur: 320, tilt: 0, lift: false, stagger: false, step: 40, thumb: "nudge", book: "lift", reveal: "none", focusBlur: 3 } },
{ id: "still", label: "Still", hint: "Almost no motion. Sheets jump into place.", set: { ease: "straight", dur: 120, menuDur: 120, tilt: 0, lift: false, stagger: false, step: 40, thumb: "none", book: "none", reveal: "none", focusBlur: 3 } }
];
function motionPresets(p) {
var m = L().motion;
var cur = PRESETS.filter(function (x) { return Object.keys(x.set).every(function (k) { return String(m[k]) === String(x.set[k]); }); })[0];
p.appendChild(sec("Presets", [
note("Pick a starting point, then fine-tune under Sheets and Gestures. Use the Play buttons to watch it."),
el("div", { class: "bd-ad-presets" }, PRESETS.map(function (x) {
return el("button", { class: "bd-ad-preset" + (cur === x ? " is-on" : ""), type: "button", onclick: function () {
S.data.look = S.data.look || {};
S.data.look.motion = clone(x.set);
changed({ panel: true, now: true });
setTimeout(function () { play("post"); }, 500);
} }, [el("b", { text: x.label }), el("small", { text: x.hint })]);
}))
]));
p.appendChild(playRow());
}
function playRow() {
return sec("Play", [el("div", { class: "bd-ad-add" }, [
el("button", { class: "bd-ad-btn", type: "button", text: "▶ Open a post", onclick: function () { play("post"); } }),
el("button", { class: "bd-ad-btn", type: "button", text: "▶ Journal ↔ Library", onclick: function () { play("library"); } }),
el("button", { class: "bd-ad-btn", type: "button", text: "▶ About", onclick: function () { play("about"); } })
])]);
}
function play(kind) {
var feat = S.data.featured || (R.visiblePosts(S.data)[0] || {}).id;
var seq = kind === "post" ? [["journal"], ["post", feat], ["journal"]] : kind === "library" ? [["journal"], ["library"], ["journal"]] : [["journal"], ["about"], ["journal"]];
var gap = Math.max(900, L().motion.dur + 700);
seq.forEach(function (s, i) {
setTimeout(function () { goPreview(s[0], s[1]); }, i * gap);
});
}
function motionSheets(p) {
p.appendChild(sec("How the sheets move", [
choose("Feel", "motion.ease", Object.keys(R.EASE).map(function (k) { return [k, R.EASE[k].label]; })),
num("Index speed", "motion.dur", { min: 100, max: 1600, step: 10, unit: "ms" }),
num("Menu speed", "motion.menuDur", { min: 100, max: 1600, step: 10, unit: "ms" }),
num("Tilt while moving", "motion.tilt", { min: 0, max: 3, step: 0.1, unit: "°" }),
toggle("Hard shadow while moving", "motion.lift"),
toggle("Cards settle one by one", "motion.stagger"),
num("Settle step", "motion.step", { min: 10, max: 160, unit: "ms" }),
choose("Post appears", "motion.reveal", [["focus", "Focus"], ["rise", "Rises"], ["none", "As is"]]),
num("Out-of-focus blur", "motion.focusBlur", { min: 0, max: 12, step: 0.5, unit: "px" })
], resetBtn("motion")));
p.appendChild(playRow());
}
function motionGestures(p) {
p.appendChild(sec("Gestures — one small physical move per thing", [
note("Hover teases the gesture on desktop. A tap plays it fully, then the post opens."),
choose("Journal card", "motion.thumb", [["lift", "Lift off the sheet"], ["nudge", "Nudge aside"], ["tilt", "Tilt"], ["trace", "Tracing sheet slides off"], ["none", "None"]], function () { goPreview("journal"); }),
choose("Library book", "motion.book", [["swing", "Cover swings open"], ["lift", "Lift"], ["tilt", "Tilt"], ["none", "None"]], function () { goPreview("library"); })
], resetBtn("motion")));
p.appendChild(playRow());
}

/* SITE */
function siteGeneral(p) {
var site = S.data.site = S.data.site || {};
p.appendChild(sec("Site", [
textIn("Name", function () { return site.title; }, function (v) { site.title = v; }),
textIn("Mark on the sheet", function () { return site.mark; }, function (v) { site.mark = v; }, { ph: "صمت" }),
textIn("Search text", function () { return site.description; }, function (v) { site.description = v; }, { area: true }),
textIn("Language code", function () { return site.lang; }, function (v) { site.lang = v.trim(); }, { ph: "en" })
]));
}
function siteMenu(p) {
var menu = S.data.menu = S.data.menu || [];
var rows = menu.map(function (m, i) {
var lab = el("input", { class: "bd-ad-input", value: m.label, "aria-label": "Label" });
lab.addEventListener("input", function () { m.label = lab.value; changed(); });
return el("div", { class: "bd-ad-row is-plain", style: "grid-template-columns:minmax(0,1fr) auto" }, [lab, el("div", { style: "display:flex;gap:4px;align-items:center" }, [
el("label", { class: "bd-ad-check", title: "Show" }, [checkbox(m.show !== false, function (on) { m.show = on; }), ""]),
el("span", { class: "bd-ad-tag", text: m.kind === "page" ? "PAGE" : m.kind.toUpperCase() }),
el("button", { class: "bd-ad-btn is-small is-icon", type: "button", "aria-label": "Move up", text: "↑", disabled: i === 0, onclick: function () { menu.splice(i - 1, 0, menu.splice(i, 1)[0]); changed({ panel: true }); } }),
el("button", { class: "bd-ad-btn is-small is-icon", type: "button", "aria-label": "Move down", text: "↓", disabled: i === menu.length - 1, onclick: function () { menu.splice(i + 1, 0, menu.splice(i, 1)[0]); changed({ panel: true }); } })
])]);
});
p.appendChild(sec("Menu", [note("Rename, reorder, show or hide. Journal, Library and About move the sheets; pages open in the content layer. Add pages under Content → Pages.")].concat(rows)));
}
function siteCode(p) {
p.appendChild(sec("Custom CSS", [
note("For anything the panels don't reach. It's added after the generated styles. Classes: .bd-menu .bd-index .bd-content .bd-thumb .bd-book .bd-post .bd-b-text .bd-b-quote .bd-mono"),
textIn("CSS", function () { return S.data.css; }, function (v) { S.data.css = v; }, { area: true, code: true })
]));
}
function siteKey(p) {
p.appendChild(sec("GitHub", [
note("Connected to walidalwawi/samt. Publish puts everything live in one commit; Cloudflare updates in about 30 seconds."),
el("div", { class: "bd-ad-add" }, [
el("button", { class: "bd-ad-btn", type: "button", text: "Reload from GitHub", onclick: function () {
if (isDirty() && !confirm("Throw away your unpublished changes and reload what's live?")) return;
lsDel(DRAFT_STORE);
load();
} }),
el("button", { class: "bd-ad-btn is-danger", type: "button", text: "Forget key on this device", onclick: function () {
if (!confirm("Forget the GitHub key on this device?")) return;
lsDel(KEY_STORE);
S.key = "";
lock();
} })
])
]));
}
var PANELS = {
"content.journal": journalPanel,
"content.library": libraryPanel,
"content.about": aboutPanel,
"content.pages": pagesPanel,
"layers.menu": layersMenu,
"layers.index": layersIndex,
"layers.library": layersLibrary,
"layers.post": layersPost,
"layers.ground": layersGround,
"type.sizes": typeSizes,
"type.fonts": typeFonts,
"type.colour": typeColour,
"motion.presets": motionPresets,
"motion.sheets": motionSheets,
"motion.gestures": motionGestures,
"site.general": siteGeneral,
"site.menu": siteMenu,
"site.code": siteCode,
"site.key": siteKey
};

/* PUBLISH — ONE COMMIT */
async function publish() {
if (!S.data || S.publishing) return;
S.publishing = true;
renderTop();
setStatus("Publishing…");
try {
var stamp = Date.now().toString(36);
var files = R.files(S.data, stamp);
files[DATA_FILE] = JSON.stringify(S.data, null, 1);
var pages = Object.keys(files).filter(function (p) { return /^site\/.+\.html$/.test(p); });
files[MANIFEST_FILE] = JSON.stringify({ pages: pages, published: new Date().toISOString() }, null, 1);
var now = await ghFile(DATA_FILE);
if ((now ? now.sha : null) !== S.base) throw new Error("CHANGED");
var old = await ghFile(MANIFEST_FILE);
var oldPages = [];
try {
oldPages = old ? (JSON.parse(old.text).pages || []) : [];
} catch (e) {}
var ref = await gh("GET", "/git/ref/heads/" + BRANCH);
var head = ref.object.sha;
var commit = await gh("GET", "/git/commits/" + head);
var tree = Object.keys(files).map(function (path) {
return { path: path, mode: "100644", type: "blob", content: files[path] };
});
var used = usedImages();
Object.keys(S.fresh).forEach(function (name) {
if (used[name]) tree.push({ path: "site/images/" + name, mode: "100644", type: "blob", sha: S.fresh[name] });
});
oldPages.filter(function (p) { return pages.indexOf(p) < 0 && p !== "site/admin.html"; }).forEach(function (p) {
tree.push({ path: p, mode: "100644", type: "blob", sha: null });
});
var nt = await gh("POST", "/git/trees", { base_tree: commit.tree.sha, tree: tree });
var nc = await gh("POST", "/git/commits", { message: "Publish from the Samt back office", tree: nt.sha, parents: [head] });
await gh("PATCH", "/git/refs/heads/" + BRANCH, { sha: nc.sha });
var after = await gh("GET", "/contents/" + DATA_FILE + "?ref=" + nc.sha);
S.base = after.sha;
S.published = JSON.stringify(S.data);
S.fresh = {};
lsDel(DRAFT_STORE);
S.publishing = false;
renderTop();
setStatus("Going live…");
toast("Published. Cloudflare is putting it live.");
watchLive(stamp);
} catch (err) {
S.publishing = false;
renderTop();
var m = String(err && err.message || err);
if (m === "KEY") {
lock("That GitHub key no longer works. Make a new one.");
return;
}
if (m === "CHANGED") {
setStatus("Not published", true);
toast("The site was changed on GitHub since you opened it. Your draft is saved — reload under Site → GitHub, then redo the change.");
return;
}
setStatus("Not published — " + m, true);
toast("Not published: " + m);
}
}
function usedImages() {
var u = {};
function b(list) {
(list || []).forEach(function (x) { if (x.file) u[x.file] = true; });
}
(S.data.posts || []).forEach(function (p) { if (p.cover) u[p.cover] = true; b(p.blocks); });
(S.data.pages || []).forEach(function (p) { b(p.blocks); });
b((S.data.about || {}).blocks);
b((S.data.library || {}).items);
return u;
}
function watchLive(stamp) {
var t0 = Date.now();
(function poll() {
fetch("/assets/samt.css?check=" + Date.now(), { cache: "no-store" }).then(function (r) { return r.text(); }).then(function (txt) {
if (txt.indexOf(stamp) >= 0) {
setStatus("Live");
toast("It's live on samt.co.");
return;
}
if (Date.now() - t0 > 240000) {
setStatus("Published — still waiting for Cloudflare", true);
return;
}
setTimeout(poll, 4000);
}).catch(function () { setTimeout(poll, 4000); });
})();
}

/* KEYS AND START */
document.addEventListener("keydown", function (ev) {
var mod = ev.metaKey || ev.ctrlKey;
if (!mod) return;
if (ev.key === "s") {
ev.preventDefault();
publish();
}
if (ev.key.toLowerCase() === "z" && !panelBusy()) {
ev.preventDefault();
if (ev.shiftKey) redo();
else undo();
}
});
window.addEventListener("resize", fitFrame);
window.addEventListener("beforeunload", function () { saveDraft(); });
$("bd-gate-go").addEventListener("click", connect);
$("bd-gate-key").addEventListener("keydown", function (ev) { if (ev.key === "Enter") connect(); });
renderTop();
load();
})();
