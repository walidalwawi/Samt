/* BACK OFFICE — SITE GRID EDITOR
LOADS content/site.json FROM GITHUB, EDITS PAGES ON A SNAPPING GRID, KEEPS A DRAFT IN THIS BROWSER,
AND PUBLISHES PAGES + CSS + JS + IMAGES AS ONE COMMIT. CLOUDFLARE DEPLOYS EVERY COMMIT ON main. */
/* TEMPLATE IMAGES */
var BD_TEMPLATE_IMAGES = {
eoup: { id: "72504ab3fe3a9144273677ac04fdabee", file: "eoup-library-circles.jpg" },
letter: { id: "d6ccadf82f999f43c9ec859f0dc3bb9b", file: "resignation-letter.webp" }
};

/* FONT OPTIONS */
var BD_SYSTEM_FONTS = ["Helvetica Neue", "Arial", "Georgia", "Times New Roman"];
var BD_FONTS_SANS = ["Helvetica Neue", "Arial", "Hanken Grotesk", "Instrument Sans", "Schibsted Grotesk", "Work Sans", "Archivo", "IBM Plex Sans", "Newsreader", "EB Garamond", "Instrument Serif", "Fraunces"];
var BD_FONTS_MONO = ["IBM Plex Mono", "JetBrains Mono", "Space Mono", "DM Mono", "Courier Prime"];
var BD_SERIFS = ["Newsreader", "EB Garamond", "Instrument Serif", "Fraunces"];

/* ICONS */
var I = {};
(function () {
var p = {
panel: '<rect x="2.5" y="3.5" width="15" height="13" rx="1"/><path d="M7.5 3.5v13"/>',
sliders: '<path d="M3 6h9M15 6h2M3 14h3M9 14h8"/><circle cx="13.5" cy="6" r="1.6"/><circle cx="7.5" cy="14" r="1.6"/>',
desk: '<rect x="2.5" y="4" width="15" height="10" rx="1"/><path d="M7 17h6"/>',
phone: '<rect x="6" y="2.5" width="8" height="15" rx="1.5"/><path d="M9 15h2"/>',
undo: '<path d="M7 5 3.5 8.5 7 12"/><path d="M4 8.5h8a4 4 0 0 1 0 8H9"/>',
redo: '<path d="m13 5 3.5 3.5L13 12"/><path d="M16 8.5H8a4 4 0 0 0 0 8h3"/>',
code: '<path d="m7 6-4 4 4 4M13 6l4 4-4 4"/>',
target: '<circle cx="10" cy="10" r="5.5"/><path d="M10 2v4M10 14v4M2 10h4M14 10h4"/>',
eye: '<path d="M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10Z"/><circle cx="10" cy="10" r="2.3"/>',
down: '<path d="M10 3v10M6 9l4 4 4-4M4 17h12"/>',
text: '<path d="M4 5V4h12v1M10 4v12M7.5 16h5"/>',
image: '<rect x="2.5" y="4" width="15" height="12" rx="1"/><circle cx="7" cy="8" r="1.4"/><path d="m3 15 4.5-4.5 3 3 2-2L17 15"/>',
link: '<path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-.9.9"/><path d="M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l.9-.9"/>',
notes: '<path d="M8 5h9M8 10h9M8 15h9"/><path d="M3 4.5h1.5V7M3 9.5h2l-2 2.5h2M3 14h2v3H3"/>',
list: '<path d="M3 5h3M3 10h3M3 15h3M9 5h8M9 10h8M9 15h8"/>',
embed: '<rect x="2.5" y="4" width="15" height="12" rx="1"/><path d="m8.5 7.5 4 2.5-4 2.5z"/>',
html: '<path d="m6 7-3 3 3 3M14 7l3 3-3 3M11.5 5l-3 10"/>',
rule: '<path d="M2.5 10h15"/><path d="M2.5 6v8M17.5 6v8" opacity=".5"/>',
plus: '<path d="M10 4v12M4 10h12"/>',
trash: '<path d="M4 6h12M8 6V4h4v2M5.5 6l.8 10h7.4l.8-10"/>',
copy: '<rect x="6.5" y="6.5" width="10" height="10" rx="1"/><path d="M13.5 6.5V3.5h-10v10h3"/>',
up: '<path d="M10 16V4M5.5 8.5 10 4l4.5 4.5"/>',
dn: '<path d="M10 4v12M5.5 11.5 10 16l4.5-4.5"/>',
front: '<rect x="7" y="7" width="9" height="9" rx="1"/><path d="M4 12V4h8" opacity=".5"/>',
back: '<rect x="4" y="4" width="9" height="9" rx="1" opacity=".5"/><path d="M16 8v8H8"/>',
x: '<path d="m5 5 10 10M15 5 5 15"/>',
chev: '<path d="m6 8 4 4 4-4"/>',
home: '<path d="M3.5 9.5 10 4l6.5 5.5M5.5 8v8h9V8"/>',
restack: '<path d="M5 4h10v3H5zM5 9h10v3H5zM5 14h10v3H5z"/>',
library: '<rect x="3" y="3.5" width="3.5" height="13"/><rect x="8" y="3.5" width="3.5" height="13"/><path d="m13.5 4.5 3.3-.8 2.4 12.2-3.3.8z"/>',
gallery: '<rect x="2.5" y="3" width="6.5" height="6.5"/><rect x="11" y="3" width="6.5" height="6.5"/><rect x="2.5" y="11.5" width="6.5" height="6"/><rect x="11" y="11.5" width="6.5" height="6"/>',
pin: '<path d="M7 3h6l-1 5 3 3H5l3-3zM10 11v6"/>',
ptitle: '<path d="M3.5 7h13M3.5 11h8"/><path d="M3.5 15h5" opacity=".5"/>',
menubtn: '<path d="M4 6h12M4 10h12M4 14h12"/>',
pager: '<path d="M7.5 6.5 4 10l3.5 3.5M4 10h5M12.5 6.5 16 10l-3.5 3.5M16 10h-5"/>',
posts: '<rect x="2.5" y="3" width="6.5" height="9"/><rect x="11" y="3" width="6.5" height="9"/><path d="M2.5 15h6.5M11 15h6.5M2.5 17.5h4M11 17.5h4"/>',
postinfo: '<path d="M7 6 3.5 10 7 14"/><path d="M10 10h7"/>',
quote: '<path d="M4.5 13.5c0-3 1-5 3.5-6.5M11.5 13.5c0-3 1-5 3.5-6.5"/><path d="M4 16h12" opacity=".5"/>',
toggle: '<path d="M5 6h10M5 10h10M5 14h6"/><path d="M15.5 13v4M13.5 15h4"/>',
product: '<rect x="4" y="2.5" width="12" height="10"/><path d="M4 15.5h9M4 18h5"/>',
star: '<path d="m10 3 2.1 4.4 4.8.6-3.5 3.3.9 4.8L10 13.8 5.7 16.1l.9-4.8L3.1 8l4.8-.6z"/>'
};
Object.keys(p).forEach(function (k) {
I[k] = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p[k] + '</svg>';
});
})();

/* BLOCK STYLES — A SITE-WIDE LOOK PER BLOCK TYPE (STYLES TAB); A BLOCK'S OWN VALUE WINS, EMPTY = SITE STYLE */
var BS_ALIGN = [["left", "Left"], ["center", "Centre"], ["right", "Right"]];
var BS_CASE = [["none", "As typed"], ["uppercase", "UPPER"], ["lowercase", "lower"]];
var BLOCK_STYLE = {
quote: [["style", "Text style", "style", "body"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["align", "Align", "sel", "center", BS_ALIGN], ["pad", "Padding top/bottom", "dp", 40, null, 28], ["padX", "Padding sides", "dp", 46, null, 22], ["bg", "Background", "color", ""], ["ink", "Text colour", "color", ""], ["shadow", "Soft shadow", "bool", "1"], ["line", "Line on the left", "bool", "0"]],
posts: [["titleStyle", "Title style", "style", "body"], ["titleSize", "Title size", "dp", ""], ["titleLh", "Title line", "dp", ""], ["metaStyle", "Info style", "style", "small"], ["metaSize", "Info size", "dp", ""], ["metaLh", "Info line", "dp", ""], ["metaGap", "Gap above info", "px", 8], ["cardBg", "Card colour", "color", ""], ["cardPad", "Card padding", "dp", 0], ["minH", "Text min height", "px", ""], ["imgGap", "Image gap", "px", 12], ["imagePos", "Image", "sel", "top", [["top", "Above text"], ["bottom", "Below text"]]], ["ratio", "Crop", "sel", "auto", [["auto", "Original"], ["1", "Square"], ["4/3", "4 : 3"], ["3/2", "3 : 2"], ["16/9", "16 : 9"], ["3/4", "3 : 4"]]], ["hover", "Hover", "sel", "dim", [["none", "None"], ["dim", "Dim"], ["lift", "Lift"]]], ["fTitleStyle", "Featured title", "style", "heading"]],
library: [["book", "Book look", "bool", "1"], ["spine", "Spine colour", "color", "#8a8a8a"], ["spineW", "Spine width", "px", 10], ["shadow", "Shadow", "bool", "1"], ["radius", "Page corner", "px", 2], ["hover", "Hover", "sel", "tilt", [["none", "None"], ["tilt", "Open (perspective)"], ["lift", "Lift"]]]],
toggle: [["style", "Text style", "style", "body"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["marker", "Marker", "sel", "plus", [["plus", "+ / —"], ["arrow", "→ / ↓"], ["none", "None"]]], ["itemGap", "Between items", "px", 0], ["indent", "Indent items", "px", 0]],
product: [["style", "Text style", "style", "body"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["align", "Align", "sel", "left", BS_ALIGN]],
pager: [["style", "Text style (words)", "style", "body"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["align", "Align (words)", "sel", "left", BS_ALIGN]],
postinfo: [["style", "Text style", "style", "small"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""]],
menubtn: [["style", "Link style", "style", "body"], ["size", "Link size", "dp", ""], ["lh", "Link line", "dp", ""], ["textCase", "Case", "sel", "none", BS_CASE], ["tracking", "Spacing (em)", "px", ""], ["itemGap", "Between links", "dp", 0], ["groupGap", "Between groups", "dp", 20], ["headGap", "Under heading", "px", 4], ["current", "Current page", "sel", "underline", [["underline", "Line"], ["dim", "Dim"], ["strike", "Strike"], ["arrow", "→"], ["none", "None"]]], ["hover", "Hover", "sel", "underline", [["underline", "Line"], ["dim", "Dim"], ["none", "None"]]], ["brandStyle", "Name style", "style", "body"], ["brandSize", "Name size", "dp", ""], ["brandLh", "Name line", "dp", ""], ["brandGap", "Name gap", "dp", 16]],
ptitle: [["style", "Text style", "style", "body"], ["align", "Align", "sel", "left", BS_ALIGN]]
};
function bsKeys(f) {
return f[2] === "dp" ? [f[0], f[0] + "M"] : [f[0]];
}
function bsNorm(f, v) {
if (f[2] === "bool") return v === true || v === "1" || v === 1 ? "1" : v === false || v === "0" || v === 0 ? "0" : "";
return v;
}
function bsSite(type) {
var b = S.project && S.project.site.blockStyles;
return (b && b[type]) || {};
}
function E(e, k) {
var v = e.props[k];
if (v !== "" && v != null) return v;
var sv = bsSite(e.type)[k];
return sv == null ? "" : sv;
}
function N(e, k, phone) {
var site = bsSite(e.type);
var list = phone ? [e.props[k + "M"], site[k + "M"], e.props[k], site[k]] : [e.props[k], site[k]];
for (var i = 0; i < list.length; i++) {
var v = list[i];
if (v !== "" && v != null && !isNaN(parseFloat(v))) return parseFloat(v);
}
return null;
}
function ON(e, k) {
var v = E(e, k);
return v === true || v === "1" || v === 1;
}
function normalizeBlockStyles(p) {
var s = p.site;
s.blockStyles = s.blockStyles || {};
Object.keys(BLOCK_STYLE).forEach(function (t) {
var els = [];
p.order.forEach(function (id) { (p.pages[id].els || []).forEach(function (e) { if (e.type === t) els.push(e); }); });
var fresh = !s.blockStyles[t];
var bs = s.blockStyles[t] = s.blockStyles[t] || {};
BLOCK_STYLE[t].forEach(function (f) {
bsKeys(f).forEach(function (k, i) {
els.forEach(function (e) { if (e.props[k] !== undefined && f[2] === "bool") e.props[k] = bsNorm(f, e.props[k]); });
if (bs[k] === undefined) {
var dv = i === 1 ? (f[5] !== undefined ? f[5] : "") : f[3];
if (fresh) {
var cnt = {};
var best = null;
els.forEach(function (e) {
var v = e.props[k];
if (v === "" || v == null) return;
var key = String(v);
cnt[key] = (cnt[key] || 0) + 1;
if (best === null || cnt[key] > cnt[String(best)]) best = v;
});
if (best !== null) dv = best;
}
bs[k] = dv;
}
if (fresh) els.forEach(function (e) { if (e.props[k] !== undefined && String(e.props[k]) === String(bs[k])) e.props[k] = ""; });
});
});
});
}

/* MENUS — EXPLICIT LISTS OF PAGES, LINKS AND HEADINGS; ANY MENU BLOCK OR THE OVERLAY SHOWS ONE */
function normalizeMenus(p) {
var s = p.site;
if (!Array.isArray(s.menus) || !s.menus.length) {
var items = [];
s.sections.forEach(function (sec) {
var pages = p.order.map(function (id) { return p.pages[id]; }).filter(function (q) { return q && q.kind !== "pin" && !q.parent && q.section === sec.key; });
var ext = (s.externals || []).filter(function (x) { return x.section === sec.key; });
if (!pages.length && !ext.length) return;
if (s.sections.filter(function (x) { return p.order.some(function (id) { var q = p.pages[id]; return q && q.kind !== "pin" && !q.parent && q.section === x.key; }) || (s.externals || []).some(function (e) { return e.section === x.key; }); }).length > 1) items.push({ id: uid(), type: "heading", label: sec.label });
pages.forEach(function (q) { items.push({ id: uid(), type: "page", page: q.id, label: "" }); });
ext.forEach(function (x) { items.push({ id: uid(), type: "link", label: x.title, url: x.url, newTab: true }); });
});
s.menus = [{ id: "main", name: "Main menu", items: items }];
}
s.menus.forEach(function (m) { m.items = (m.items || []).filter(function (it) { return it.type !== "page" || p.pages[it.page]; }); });
if (!s.nav.menu || !s.menus.some(function (m) { return m.id === s.nav.menu; })) s.nav.menu = s.menus[0].id;
}
function menuById(id) {
var ms = S.project.site.menus || [];
return ms.filter(function (m) { return m.id === id; })[0] || ms[0] || { id: "", name: "", items: [] };
}
function menuGroups(id) {
var groups = [];
var g = { label: "", items: [] };
menuById(id).items.forEach(function (it) {
if (it.type === "heading") {
if (g.label || g.items.length) groups.push(g);
g = { label: it.label || "", items: [] };
return;
}
if (it.type === "page") {
var q = S.project.pages[it.page];
if (!q) return;
g.items.push({ title: it.label || q.title, slug: q.slug || "", page: q.id });
} else if (it.type === "link") g.items.push({ title: it.label || it.url, url: it.url || "#", ext: it.newTab !== false });
});
if (g.label || g.items.length) groups.push(g);
return groups;
}
function menuEditor(id) {
var ms = S.project.site.menus;
var mi = ms.indexOf(menuById(id));
var m = ms[mi];
var base = "menu." + mi + ".items.";
var pageOpts = seqPages().map(function (q) { return [q.id, (q.parent ? "  ↳ " : "") + q.title]; });
var h = field("Menu name", input("menu." + mi + ".name", m.name));
if (!m.items.length) h += '<div class="bd-ed-hint">Empty. Add pages, links or headings below.</div>';
m.items.forEach(function (it, i) {
var ctl = '<span class="bd-ed-gbtns" style="flex-direction:row"><button class="bd-ed-x" data-act="menu-item-move" data-m="' + mi + '" data-i="' + i + '" data-val="-1" aria-label="Up">' + I.up + '</button><button class="bd-ed-x" data-act="menu-item-move" data-m="' + mi + '" data-i="' + i + '" data-val="1" aria-label="Down">' + I.dn + '</button><button class="bd-ed-x" data-act="menu-item-del" data-m="' + mi + '" data-i="' + i + '" aria-label="Remove">' + I.x + "</button></span>";
var body;
if (it.type === "heading") body = '<span class="bd-ed-label" style="margin:0">Heading</span>' + input(base + i + ".label", it.label, "", ' placeholder="Heading" aria-label="Heading"');
else if (it.type === "page") {
var q = S.project.pages[it.page];
body = select(base + i + ".page", it.page, pageOpts) + input(base + i + ".label", it.label, "", ' placeholder="' + esc(q ? q.title : "") + '" aria-label="Label"');
} else body = input(base + i + ".label", it.label, "", ' placeholder="Label" aria-label="Label"') + input(base + i + ".url", it.url, "", ' placeholder="https://" aria-label="Address"') + '<label class="bd-ed-check"><input type="checkbox" data-act="menu-item-tab" data-m="' + mi + '" data-i="' + i + '"' + (it.newTab !== false ? " checked" : "") + ">New tab</label>";
h += '<div class="bd-ed-mitem' + (it.type === "heading" ? " is-head" : "") + '"><div class="bd-ed-field" style="gap:4px">' + body + "</div>" + ctl + "</div>";
});
var missing = seqPages().filter(function (q) { return !q.parent && !m.items.some(function (it) { return it.type === "page" && it.page === q.id; }); });
h += '<div class="bd-ed-actions">'
+ '<select class="bd-ed-input" data-act-select="menu-add-page" data-m="' + mi + '" aria-label="Add a page"><option value="">+ Page…</option>' + seqPages().map(function (q) { return '<option value="' + q.id + '">' + esc((q.parent ? "↳ " : "") + q.title) + "</option>"; }).join("") + "</select>"
+ '<button class="bd-ed-btn is-sm" data-act="menu-item-add" data-m="' + mi + '" data-val="link">' + I.plus + 'Link</button><button class="bd-ed-btn is-sm" data-act="menu-item-add" data-m="' + mi + '" data-val="heading">' + I.plus + "Heading</button>"
+ (missing.length ? '<button class="bd-ed-btn is-sm" data-act="menu-add-all" data-m="' + mi + '">' + I.plus + "All " + missing.length + " missing pages</button>" : "")
+ "</div>";
return h;
}
function menuPicker(path, cur) {
var ms = S.project.site.menus;
return '<div class="bd-ed-list-row" style="grid-template-columns:minmax(0,1fr) auto">' + select(path, cur || ms[0].id, ms.map(function (m) { return [m.id, m.name]; })) + '<button class="bd-ed-btn is-sm" data-act="menu-new" data-path="' + path + '">' + I.plus + "New menu</button></div>";
}

/* STATE */
var S = {
store: null,
assets: null,
downloads: null,
project: null,
projects: [],
pageId: null,
sel: null,
mode: "desk",
preview: false,
live: null,
liveBefore: null,
undo: [],
redo: [],
saved: {},
savedMeta: "",
saving: false,
again: false,
status: "",
statusWarn: false,
codeOpen: false,
codeTab: "site",
outTab: "page",
leftTab: "pages",
leftOpen: false,
rightOpen: false,
pendingSnap: false,
mem: {},
confirm: null,
drag: null
};

/* UTIL */
function uid() {
return Math.random().toString(36).slice(2, 10);
}
function esc(s) {
return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function slugify(s) {
return String(s || "").toLowerCase().replace(/[’'"“”]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function clamp(v, a, b) {
return Math.max(a, Math.min(b, v));
}
function clone(o) {
return JSON.parse(JSON.stringify(o));
}
function $(id) {
return document.getElementById(id);
}
var toastTimer = null;
function toast(msg) {
var t = $("bd-toast");
t.textContent = msg;
t.hidden = false;
clearTimeout(toastTimer);
toastTimer = setTimeout(function () { t.hidden = true; }, 3200);
}
function getPath(obj, path) {
return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
}
function setPath(obj, path, val) {
var keys = path.split(".");
var o = obj;
for (var i = 0; i < keys.length - 1; i++) {
if (o[keys[i]] == null) o[keys[i]] = {};
o = o[keys[i]];
}
o[keys[keys.length - 1]] = val;
}
function fontStack(name, mono) {
if (mono) return '"' + name + '", Menlo, Consolas, monospace';
if (BD_SERIFS.indexOf(name) > -1) return '"' + name + '", Georgia, "Times New Roman", serif';
return '"' + name + '", "Helvetica Neue", Arial, sans-serif';
}
function fontQuery(names) {
names = names.filter(function (n) { return BD_SYSTEM_FONTS.indexOf(n) < 0; });
if (!names.length) return "";
return "https://fonts.googleapis.com/css2?" + names.map(function (n) { return "family=" + n.replace(/ /g, "+") + ":ital,wght@0,400;1,400"; }).join("&") + "&display=swap";
}
function ensureFont(name) {
if (BD_SYSTEM_FONTS.indexOf(name) > -1) return;
var id = "bd-font-" + slugify(name);
if (document.getElementById(id)) return;
var l = document.createElement("link");
l.id = id;
l.rel = "stylesheet";
l.href = fontQuery([name]);
document.head.appendChild(l);
}

/* DEFAULTS */
function siteDefaults(name) {
return {
name: name || "Untitled site",
w: 702,
pad: 33,
top: 48,
mt: 96,
mr: 33,
mb: 96,
ml: 33,
mtM: 24,
mrM: 20,
mbM: 24,
mlM: 20,
cols: 12,
colsM: 4,
row: 8,
gap: 0,
gapM: 0,
indent: 133,
indentM: 56,
labelW: 100,
labelWM: 88,
colors: { page: "#ffffff", panel: "#f5f5f5", ink: "#111111", rule: "#dddddd" },
sans: "Hanken Grotesk",
mono: "IBM Plex Mono",
fs: 23.5,
lh: 29.6,
ms: 16.5,
ml: 22.2,
fsM: 18,
lhM: 23,
msM: 13,
mlM: 17.5,
header: true,
menu: true,
pager: true,
sections: [{ key: "a", label: "a. work" }],
externals: [],
css: "",
head: "",
showNum: true,
zoom: true,
styles: stylesFrom(23.5, 29.6, 16.5, 22.2, 18, 23, 13, 17.5),
nav: navDefaults(),
master: masterDefaults()
};
}
function styleDef(font, size, lh, sizeM, lhM) {
return { font: font, size: size, lh: lh, sizeM: sizeM, lhM: lhM, weight: 400, italic: false, textCase: "none", tracking: 0, color: "" };
}
function stylesFrom(fs, lh, ms, ml, fsM, lhM, msM, mlM) {
return {
body: styleDef("sans", fs, lh, fsM, lhM),
heading: styleDef("sans", Math.round(fs * 1.45 * 10) / 10, Math.round(lh * 1.3 * 10) / 10, Math.round(fsM * 1.45 * 10) / 10, Math.round(lhM * 1.3 * 10) / 10),
small: styleDef("sans", ms, ml, msM, mlM),
caption: styleDef("mono", ms, ml, msM, mlM),
mono: styleDef("mono", ms, ml, msM, mlM)
};
}
var BD_STYLES = [["body", "Body"], ["heading", "Heading"], ["small", "Small"], ["caption", "Caption"], ["mono", "Mono"]];
function styleCSS(s, phone) {
var st = s.styles;
var map = [
["body", ".bd-site,\n.bd-ts-body,\n.bd-list.is-body ul"],
["heading", ".bd-text.is-heading,\n.bd-text.is-large,\n.bd-ptitle.is-heading,\n.bd-ts-heading,\n.bd-list.is-heading ul"],
["small", ".bd-text.is-small,\n.bd-ptitle.is-small,\n.bd-ts-small,\n.bd-list.is-small ul"],
["caption", ".bd-text.is-caption,\n.bd-ptitle.is-caption,\n.bd-ts-caption,\n.bd-figure figcaption,\n.bd-gi figcaption,\n.bd-zoom-cap,\n.bd-list.is-caption ul"],
["mono", ".bd-text.is-mono,\n.bd-ptitle.is-mono,\n.bd-ts-mono,\n.bd-notes,\n.bd-list.is-mono ul"]
];
return map.map(function (m) {
var x = st[m[0]];
var out = [m[1] + " {"];
if (!phone) {
out.push("font-family: var(--bd-" + (x.font === "mono" ? "mono" : "sans") + ");");
out.push("font-weight: " + x.weight + ";");
out.push("font-style: " + (x.italic ? "italic" : "normal") + ";");
out.push("text-transform: " + x.textCase + ";");
out.push("letter-spacing: " + (x.tracking || 0) + "em;");
if (x.color) out.push("color: " + x.color + ";");
}
out.push("font-size: " + (phone ? x.sizeM : x.size) + "px;");
out.push("line-height: " + (phone ? x.lhM : x.lh) + "px;");
out.push("}");
return out.join("\n");
}).join("\n");
}
function navDefaults() {
return {
icon: "lines",
label: "☰",
openLabel: "",
btnFont: "sans",
btnSize: 24,
btnColor: "",
btnCase: "none",
corner: "right",
btnTop: 34,
btnSide: 34,
btnTopM: 22,
btnSideM: 18,
font: "sans",
size: 0,
lh: 0,
sizeM: 0,
lhM: 0,
color: "",
navCase: "none",
tracking: 0,
headings: true,
accordion: true,
current: "dim",
indent: 28,
title: "right",
fade: 0.12,
bg: "",
bgAlpha: 0.92
};
}
function masterDefaults() {
return {
space: 60,
spaceM: 40,
headX: 2,
headXM: 1,
headSpace: 60,
headSpaceM: 40,
types: {
text: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
notes: { x: 5, w: 7, xm: 1, wm: 3, space: "", spaceM: "" },
image: { x: 1, w: 9, xm: 0, wm: 4, space: "", spaceM: "" },
gallery: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
library: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
link: { x: 0, w: 4, xm: 0, wm: 4, space: "", spaceM: "" },
list: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
embed: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
html: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
rule: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
ptitle: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
menubtn: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
pager: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
posts: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
postinfo: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
quote: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
toggle: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
product: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" }
}
};
}
/* COLUMNS — LIKE A CARGO COLUMN SET: 1 (CENTRED OR SPREAD), 2 OR 3 SPREAD, PHONE 1 OR 2 */
var SPAN_PRESETS = {
1: [[12]],
2: [[6, 6], [4, 8], [8, 4], [3, 9], [9, 3], [5, 7], [7, 5]],
3: [[4, 4, 4], [3, 6, 3], [6, 3, 3], [3, 3, 6], [2, 5, 5], [5, 5, 2], [3, 4, 5]]
};
function layoutDefaults() {
return { cols: 1, align: "center", spans: [12], colsM: 1, gutter: 30, gutterM: 20 };
}
function fixLayout(L) {
L = Object.assign(layoutDefaults(), L || {});
L.cols = clamp(parseInt(L.cols, 10) || 1, 1, 3);
L.colsM = clamp(parseInt(L.colsM, 10) || 1, 1, 2);
if (!Array.isArray(L.spans) || L.spans.length !== L.cols) L.spans = SPAN_PRESETS[L.cols][0].slice();
return L;
}
function lay(page) {
return page && (page.kind === "pin" || page.ownLayout) && page.colset ? page.colset : S.project.site.layout;
}
function layWho(page) {
return page.kind === "pin" ? "pin" : page.ownLayout ? "page" : "site";
}
function layFor(who) {
return who === "site" ? S.project.site.layout : curPage().colset;
}
function isSpreadPage(page) {
var L = lay(page);
return isSpread(S.project.site) || (page.kind !== "pin" && page.ownLayout && !!page.colset && (L.cols > 1 || L.align === "spread"));
}
function nCols(page) {
if (!page || !isMaster(page)) return 1;
return lay(page).cols || 1;
}
function colOf(e, page) {
return clamp(e.col || 1, 1, nCols(page));
}
function isSpread(s) {
return s.layout.cols > 1 || s.layout.align === "spread";
}
function colTemplate(L, phone) {
if (phone) return L.colsM === 2 && L.cols > 1 ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)";
return L.spans.map(function (n) { return "minmax(0, " + n + "fr)"; }).join(" ");
}
function colRules(phone) {
var s = S.project.site;
var out = [".bd-main .bd-cols {\ngrid-template-columns: " + colTemplate(s.layout, phone) + ";\ncolumn-gap: " + (phone ? s.layout.gutterM : s.layout.gutter) + "px;\n}"];
S.project.order.forEach(function (id) {
var p = S.project.pages[id];
if (!p || !(p.kind === "pin" || p.ownLayout) || !p.colset || p.colset.cols < 2) return;
out.push(".bd-cols.bd-cl-" + p.id + " {\ngrid-template-columns: " + colTemplate(p.colset, phone) + ";\ncolumn-gap: " + (phone ? p.colset.gutterM : p.colset.gutter) + "px;\n}");
});
return out.join("\n");
}
var BD_FILL_TYPES = ["ptitle", "menubtn", "pager", "posts", "postinfo", "quote", "toggle", "product"];
function normalizeProject(p) {
var d = siteDefaults(p.site && p.site.name);
var s = p.site;
if (!s.styles && s.fs) s.styles = stylesFrom(s.fs, s.lh, s.ms || s.fs, s.ml || s.lh, s.fsM || s.fs, s.lhM || s.lh, s.msM || s.ms || s.fs, s.mlM || s.ml || s.lh);
if (s.showNum === undefined) s.showNum = false;
if (s.mt === undefined) {
var ot = s.top != null ? s.top : 48;
var op = s.pad != null ? s.pad : 33;
s.mt = ot * 2;
s.mb = ot * 2;
s.ml = op;
s.mr = op;
s.mtM = 24;
s.mbM = 24;
s.mlM = 20;
s.mrM = 20;
}
Object.keys(d).forEach(function (k) {
if (s[k] === undefined) s[k] = clone(d[k]);
});
s.nav = Object.assign(navDefaults(), s.nav || {});
Object.keys(d.styles).forEach(function (k) {
s.styles[k] = Object.assign(clone(d.styles[k]), s.styles[k] || {});
});
var fresh = !s.master;
var m = masterDefaults();
if (fresh) {
Object.keys(m.types).forEach(function (k) {
var t = m.types[k];
t.w = Math.min(t.w, s.cols);
t.x = Math.min(t.x, s.cols - t.w);
t.wm = k === "notes" ? Math.max(1, s.colsM - 1) : s.colsM;
t.xm = k === "notes" ? Math.min(1, s.colsM - t.wm) : 0;
});
}
var hadTypes = s.master && s.master.types ? Object.keys(s.master.types) : null;
s.master = Object.assign(m, s.master || {});
s.master.types = Object.assign(masterDefaults().types, s.master.types || {});
if (hadTypes) Object.keys(s.master.types).forEach(function (k) {
if (hadTypes.indexOf(k) > -1) return;
s.master.types[k].w = s.cols;
s.master.types[k].x = 0;
s.master.types[k].wm = s.colsM;
s.master.types[k].xm = 0;
});
Object.keys(m.types).forEach(function (k) {
s.master.types[k] = Object.assign({ x: 0, w: s.cols, xm: 0, wm: s.colsM, space: "", spaceM: "" }, masterDefaults().types[k] || {}, s.master.types[k] || {});
});
p.order.forEach(function (id) {
var pg = p.pages[id];
if (!pg.layout) pg.layout = "master";
pg.kind = pg.kind || "page";
pg.stack = pg.stack || [];
pg.pin = Object.assign({ place: "top", fixed: false, show: "all", pages: [], h: "", hM: "", gap: "", gapM: "" }, pg.pin || {});
});
s.layout = fixLayout(s.layout);
p.order.forEach(function (id) {
var pg = p.pages[id];
if (pg.layout && typeof pg.layout === "object") {
pg.colset = pg.layout;
pg.layout = "master";
}
if (pg.kind === "pin" || pg.ownLayout) pg.colset = fixLayout(pg.colset);
});
p.order.forEach(function (id) {
(p.pages[id].els || []).forEach(function (e) {
if (BD_FILL_TYPES.indexOf(e.type) < 0) return;
var d = elDefaults(e.type).props;
Object.keys(d).forEach(function (k) { if (e.props[k] === undefined) e.props[k] = clone(d[k]); });
});
});
normalizeBlockStyles(p);
normalizeMenus(p);
if (s.master.types.library && s.master.types.library.wm === 4 && s.colsM !== 4 && !s.master.libFix) {
s.master.types.library.wm = s.colsM;
s.master.types.library.w = s.cols;
}
s.master.libFix = 1;
if (!s.master.types.gallery) s.master.types.gallery = Object.assign({ space: "", spaceM: "" }, s.master.types.image);
return p;
}
var BD_TYPE_CLASS = { text: "bd-text", notes: "bd-notes", image: "bd-figure", gallery: "bd-gallery", library: "bd-library", link: "bd-link", list: "bd-list", embed: "bd-embed", html: "bd-html", rule: "bd-rule", ptitle: "bd-ptitle", menubtn: "bd-menubtn", pager: "bd-pagerbar", posts: "bd-posts", postinfo: "bd-postinfo", quote: "bd-quote", toggle: "bd-toggle", product: "bd-product" };
var BD_TYPE_NAME = { text: "Text", notes: "Notes", image: "Image", gallery: "Gallery", library: "Library", link: "Link", list: "List", embed: "Video", html: "HTML", rule: "Rule", ptitle: "Page title", menubtn: "Menu", pager: "Page arrows", posts: "Blog posts", postinfo: "Post info", quote: "Quote", toggle: "Fold-out list", product: "Product" };
function effPlace(e, phone) {
var s = S.project.site;
var t = s.master.types[e.type] || { x: 0, w: 12, xm: 0, wm: 4 };
var o = e.own || {};
var cols = phone ? s.colsM : s.cols;
var x = phone ? (o.xm != null ? o.xm : t.xm) : (o.x != null ? o.x : t.x);
var w = phone ? (o.wm != null ? o.wm : t.wm) : (o.w != null ? o.w : t.w);
w = clamp(w, 1, cols);
x = clamp(x, 0, cols - w);
return { x: x, w: w };
}
function isMaster(page) {
return page.layout !== "free";
}
function elDefaults(type) {
var map = {
text: { w: 12, h: 8, props: { html: "<p>New text. Tap twice to edit.</p>", style: "body", indent: false, align: "left" } },
gallery: { w: 12, h: 30, props: galleryDefaults() },
library: { w: 12, h: 40, props: { items: [], cols: 5, colsM: 2, gutter: 30, gutterM: 16, ratio: "2/3", titles: false, filters: true, allLabel: "All" } },
image: { w: 9, h: 36, x: 1, props: { assetId: "", file: "", alt: "", caption: "", fit: "contain", zoom: true } },
link: { w: 4, h: 4, props: { text: "Link", href: "/", newTab: false, style: "underline" } },
notes: { w: 7, h: 6, x: 5, props: { items: ["First note."] } },
list: { w: 12, h: 10, props: { heading: "Heading", rows: [["2026", "Entry"]] } },
embed: { w: 12, h: 40, props: { url: "", title: "Video" } },
html: { w: 12, h: 8, props: { code: "<p>Custom HTML</p>" } },
rule: { w: 12, h: 2, props: {} },
ptitle: { w: 12, h: 3, props: { style: "body", align: "left", num: false } },
menubtn: { w: 12, h: 3, props: { menu: "", mode: "button", corner: "", brand: "none", brandText: "", brandPos: "before", brandStyle: "body", brandSize: "", brandLh: "", brandGap: 16, brandGapM: "", align: "start", dir: "vertical", group: "flat", style: "body", size: "", sizeM: "", lh: "", lhM: "", textCase: "none", tracking: "", itemGap: 0, itemGapM: "", groupGap: 20, groupGapM: "", headGap: 4, current: "underline", hover: "underline" } },
pager: { w: 12, h: 3, props: { num: "num", line: false, loop: false, scope: "site", look: "arrows", nextLabel: "Next, ", prevLabel: "", align: "left", style: "body" } },
posts: { w: 12, h: 30, props: { blog: "", layout: "grid", cols: 3, colsM: 1, gap: 40, gapM: 24, rowGap: 40, rowGapM: 24, sort: "order", limit: "", featured: "none", fLayout: "stack", fTitleStyle: "heading", showImage: true, showTitle: true, showDate: false, showMeta: true, showExcerpt: false, imagePos: "top", ratio: "auto", imgGap: 12, cardBg: "", cardPad: 0, cardPadM: "", minH: "", titleStyle: "body", titleSize: "", titleLh: "", metaStyle: "small", metaSize: "", metaLh: "", metaGap: 8, hover: "dim" } },
postinfo: { w: 12, h: 3, props: { back: true, backLabel: "<", date: false, words: true, time: true, style: "small", size: "", lh: "" } },
quote: { w: 12, h: 10, props: { html: "<p>A line worth pulling out.</p>", style: "body", align: "center", pad: 40, padX: 46, padM: 28, padXM: 22, bg: "", shadow: true, line: false } },
toggle: { w: 12, h: 6, props: { title: "More", items: ["First", "Second"], open: false, marker: "plus", style: "body", itemGap: 0, indent: 0 } },
product: { w: 6, h: 30, props: { assetId: "", file: "", alt: "", title: "Product name", price: "", note: "", href: "", style: "body", align: "left", size: "", lh: "" } }
};
var out = clone(map[type]);
if (out && BLOCK_STYLE[type]) BLOCK_STYLE[type].forEach(function (f) { bsKeys(f).forEach(function (k) { out.props[k] = ""; }); });
return out;
}
function newPage(title, section, slug, num) {
return {
id: uid(),
title: title,
h1: "",
num: num || "",
slug: slug,
section: section || "",
desc: "",
header: true,
layout: "master",
css: "",
els: [{ id: uid(), type: "text", d: { x: 0, y: 0, w: 12, h: 4 }, m: null, props: { html: "<p>Text to come.</p>", font: "sans", size: "body", indent: false, align: "left" } }]
};
}
function blankProject() {
var site = siteDefaults("Untitled site");
var home = newPage("Home", "a", "", "1");
return { id: uid(), name: "Untitled site", site: site, order: [home.id], pages: (function () { var o = {}; o[home.id] = home; return o; })() };
}

/* D445 TEMPLATE */
function templateProject() {
var site = siteDefaults("Walid Al Wawi");
site.w = 750;
site.pad = 100;
site.top = 50;
site.colsM = 6;
site.row = 50;
site.indent = 100;
site.indentM = 0;
site.colors = { page: "#ffffff", panel: "#ffffff", ink: "#111111", rule: "#ffffff" };
site.styles = stylesFrom(15, 20, 15, 20, 15, 20, 15, 20);
site.showNum = false;
site.nav = Object.assign(navDefaults(), { icon: "text", label: "index;", btnCase: "lowercase", btnSize: 15, btnTop: 50, btnSide: 100, btnTopM: 24, btnSideM: 20, current: "arrow", fade: 0.08, title: "hide", indent: 20 });
site.master = masterDefaults();
site.master.space = 50;
site.master.spaceM = 50;
site.master.types = {
text: { x: 0, w: 12, xm: 0, wm: 6, space: "", spaceM: "" },
notes: { x: 3, w: 9, xm: 1, wm: 5, space: "", spaceM: "" },
image: { x: 1, w: 10, xm: 0, wm: 6, space: "", spaceM: "" },
gallery: { x: 1, w: 10, xm: 0, wm: 6, space: "", spaceM: "" },
link: { x: 0, w: 4, xm: 0, wm: 6, space: "", spaceM: "" },
list: { x: 0, w: 12, xm: 0, wm: 6, space: "", spaceM: "" },
embed: { x: 0, w: 12, xm: 0, wm: 6, space: "", spaceM: "" },
html: { x: 0, w: 12, xm: 0, wm: 6, space: "", spaceM: "" },
rule: { x: 0, w: 12, xm: 0, wm: 6, space: "", spaceM: "" }
};
site.sections = [{ key: "a", label: "a. art" }, { key: "b", label: "b. biography" }, { key: "c", label: "c. commentary" }, { key: "e", label: "e. external" }];
site.externals = [
{ section: "e", title: "Samt for Art and Research", url: "https://samt.co" },
{ section: "e", title: "@walidalwawi", url: "https://www.instagram.com/walidalwawi/" },
{ section: "e", title: "Practical Practice", url: "#" }
];
var pages = [];
function T(html, x, y, w, h, extra) {
return { id: uid(), type: "text", d: { x: x, y: y, w: w, h: h }, m: null, props: Object.assign({ html: html, font: "sans", size: "body", indent: false, align: "left" }, extra || {}) };
}
function N(items, x, y, w, h) {
return { id: uid(), type: "notes", d: { x: x, y: y, w: w, h: h }, m: null, props: { items: items } };
}
function IMG(key, alt, x, y, w, h) {
var t = BD_TEMPLATE_IMAGES[key];
return { id: uid(), type: "image", d: { x: x, y: y, w: w, h: h }, m: null, props: { assetId: t.id, file: t.file, alt: alt, caption: "", fit: "contain" } };
}
function L(heading, rows, y, h) {
return { id: uid(), type: "list", d: { x: 0, y: y, w: 12, h: h }, m: null, props: { heading: heading, rows: rows } };
}
function P(section, slug, num, title, h1, els, desc) {
var pg = newPage(title, section, slug, num);
pg.h1 = h1 || "";
pg.desc = desc || "";
pg.els = els;
pages.push(pg);
}
var stub = function () { return [T("<p>Text to come.</p>", 0, 0, 12, 4)]; };
P("a", "eoup", "1", "EOUP", "EOUP, 2018", [
T("<p>Paper Architecture / Installation. Commissioned by The Qattan Art Foundation for YAYA 2018.</p><p>Proposes a hypothetical organisation that works on providing relief for Palestinian Refugees residing outside of the PLO mandates or UNRWA jurisdiction.<sup>1</sup> Hosted within a structure that mixes the iconography of the Dome of the Rock with the mechanism of parachuting in an architectural image that identifies its purpose as a body of aid to Palestinians.<sup>2</sup></p>", 0, 0, 12, 30, { indent: true }),
N(['<a href="/files/EOUP-Charter.pdf">EOUP-Charter.pdf</a>', '<a href="/files/Negotiation_Affairs_Department_PLO-Excerpt.pdf">Negotiation_Affairs_Department_PLO-Excerpt</a>'], 5, 34, 7, 6),
IMG("eoup", "EOUP installed at Library Circles, James Art Center, Dubai", 1, 46, 9, 40),
N(["Library Circles, James Art Center, Dubai."], 5, 90, 7, 4)
], "EOUP. Paper Architecture / Installation. Commissioned by The Qattan Art Foundation for YAYA 2018.");
[["forbidden-fruit", "2", "Forbidden Fruit"], ["eternity-of-silence", "3", "Eternity Of Silence"], ["inaudible-dialogue", "4", "Inaudible Dialogue"], ["qibla", "5", "Qibla"], ["passport", "6", "Passport"], ["white-socks", "7", "White Socks"], ["chair-of-saladin", "8", "Chair Of Saladin"], ["coffin", "9", "Coffin"], ["thobe", "10", "Thobe"], ["grasshopper", "11", "Grasshopper"], ["hiding", "12", "Hiding"]].forEach(function (a) {
P("a", a[0], a[1], a[2], "", stub());
});
P("b", "biography", "b.1", "Biography", "", [
T("<p>Walid Al Wawi is a Palestinian artist, writer, and cultural practitioner whose work moves between painting, performance, video, installation, and text. Rooted in more than a decade of engagement in the SWANA region, his practice interrogates the conditions of art in times of crisis, exposing sentimentalism as a mechanism through which institutional frameworks reduce Arab identity to tragedy.</p><p>Al Wawi’s practice unfolds at the intersection of performance, installation, and object-based intervention, where material is weaponised against the infrastructures that seek to contain it. His works dismantle the symbols through which authority, nationalism, and capital reproduce themselves. Rather than documenting identity, his practice performs its impossibility, staging Palestinian existence as both a refusal of imposed categories and an insistence on continuity beyond them.</p><p>Among his projects, <a href=\"/eoup\">EOUP</a> (Embassy of Unofficial Palestine) proposes an architectural installation imagining a hypothetical organisation that provides relief for Palestinian refugees outside the mandates of the PLO or UNRWA. The work combines the iconography of the Dome of the Rock with the mechanics of parachuting, creating an architectural image that identifies itself as a body of aid. Through video, audio, text, and constructed form, EOUP opens an inquiry into jurisdiction, exile, and the possibilities of unofficial spaces.</p><p>Al Wawi has been welcomed by institutions including Darat al Funun, Jameel Arts Centre, Tate Exchange, the Museum of Modern and Contemporary Art South Korea, and FIAC Art Fair, though his work insists on the limits of such spaces.</p><p>Building on this trajectory, in 2017 Al Wawi founded Samt, a virtual platform for art and research that exists primarily online through <a href=\"https://samt.co\" target=\"_blank\" rel=\"noopener\">samt.co</a>. Conceived as both a critique and an alternative to the Western-centered art educational canon, Samt challenges the political economy and hierarchical structures of the art system. By shifting the site of discourse from fixed geographies to a fluid techno-digital approach, it expands the terrain of art beyond its physical confinements.</p><p>In 2022, Samt advanced this mission with the creation of the Samt Alternative Art School (SAAS), directly confronting the Eurocentric academy, capitalist frameworks, and patriarchal dominance embedded in the historical and contemporary art canon, fostering instead a pedagogy of insurgent practice.</p>", 0, 0, 12, 60, { indent: true })
], "Walid Al Wawi is a Palestinian artist, writer, and cultural practitioner.");
P("b", "resume", "b.2", "Resume", "", [
L("Residencies", [["2017", "Museum of Modern and Contemporary Art, Seoul"]], 0, 8),
L("Exhibitions, Fairs &amp; International contributions", [["2022", "Verbal History, Public Art Fund, New York"], ["2022", "He-athen, Mathaf, Qatar"], ["2019", "EOUP, Art Jameel, Dubai"], ["2019", "Qala, Darat Al Funun, Amman"], ["2018", "We Shall Be Monsters, Qattan Art Foundation, Ramallah"], ["2017", "May God Teach You English, MMCA, Seoul"], ["2017", "The Rationaliser .b, XX Bienal, Santa Cruz"], ["2017", "Dialectic, Tate Exchange, London"], ["2017", "Portrait Patriot, Momentum, Berlin"], ["2016", "Flood System, Art16, London"], ["2016", "Iteration, Satalite, Dubai"], ["2016", "The Rationaliser, Fe Alharaka Baraka, Maraya Art Center, Dubai"], ["2014", "The Grasshopper, FIAC In Process, Paris"], ["2014", "Modification and tragedy, Turning point, Tashkeel, Dubai"], ["2013", "Hiding, INCUBARTE, Spain"], ["2013", "Flood System, Maraya Art Center, Abudhabi Art, Dubai"], ["2012", "Place the dots, Funoon, Art Dubai, Dubai"]], 14, 40),
L("Curation", [["", "Qala 0.89003 at Darat Al Funun, The Lab"], ["", "Qala 0.89002 at Gray Noise, Alserkal Avenue"], ["", "Qala 0.89001 at Satellite, Alserkal Avenue"], ["", "Flag Continent at TATE exchange"]], 60, 12),
L("Awards &amp; Honours", [["2018", "10 Finalists, YAYA 2018, Qattan Art Foundation"], ["2017", "Slama Art Fellowship"], ["2016", "50 Finalists, Sovereign Art Prize"], ["2013", "Kunooz Art Prize, Ayyam Gallery"], ["2013", "50 Shortlisted, Emergant International Artist"], ["2011", "First Place in Fine Arts, Shikha Manal YAA"]], 78, 16),
L("Collections", [["2020", "Burjeel Art Foundation"], ["2016", "Zayed Bin Sultan Al Nahyan"], ["2016", "Maraya Art Center"]], 100, 10)
], "Residencies, exhibitions, curation, awards and collections of Walid Al Wawi.");
P("b", "", "b.3", "Resignation", "1988/2024 – ?, Resignation", [
T("<p>In 2024, Al Wawi initiated Resignation, a performance that frames his daily existence as a Palestinian as an ongoing work, one that began at birth and will continue until the end of his mortal journey. In affirmation of this, all work on this website and any future works added will be exhibited with no financial compensation to the artist, under specific conditions.</p>", 0, 0, 12, 24),
N(["Approval is granted by the artist.", "Art production costs are covered if needed.", "Artwork delivery to the exhibition space and back to the artist is covered.", '<a href="/files/Resignation-Letter.pdf">Resignation-Letter</a>'], 5, 28, 7, 12),
IMG("letter", "Handwritten resignation letter by Walid Al Wawi", 1, 46, 9, 84)
], "In 2024, Al Wawi initiated Resignation, a performance that frames his daily existence as a Palestinian as an ongoing work.");
[["how-to-deseed-a-watermelon", "c.1", "How To Deseed A Watermelon For Safe Consumption"], ["militant-improvisation", "c.2", "Militant Improvisation: The Militant Cultural Front"], ["the-many-and-the-ones", "c.3", "The Many And The Ones"], ["south-north-palestine", "c.4", "South, North, Palestine"], ["israels-co-opting", "c.5", "“Israel's” co opting of indigenous struggle."], ["al-thawabit", "c.6", "Al Thawabit"]].forEach(function (a) {
P("c", a[0], a[1], a[2], "", stub());
});
var o = {};
pages.forEach(function (p) { o[p.id] = p; });
return { id: uid(), name: "Walid Al Wawi", site: site, order: pages.map(function (p) { return p.id; }), pages: o };
}

/* CSS GENERATORS */
function sizeTokens(s, m) {
var fs = m ? s.fsM : s.fs;
var lh = m ? s.lhM : s.lh;
return { ls: Math.round(fs * 1.45 * 10) / 10, ll: Math.round(lh * 1.3 * 10) / 10 };
}
function navBg(n) {
if (!n.bg) return "transparent";
var h = n.bg.replace("#", "");
if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
var r = parseInt(h.slice(0, 2), 16);
var g = parseInt(h.slice(2, 4), 16);
var b = parseInt(h.slice(4, 6), 16);
return "rgba(" + r + ", " + g + ", " + b + ", " + n.bgAlpha + ")";
}
function baseCSS(s, ctx) {
var R = ctx === "export" ? ":root" : ":host";
var t = sizeTokens(s, false);
var out = [];
if (ctx === "export") {
out.push("/* FONTS */");
var fq = fontQuery(s.sans === s.mono ? [s.sans] : [s.sans, s.mono]);
if (fq) out.push('@import url("' + fq + '");');
out.push("");
}
out.push("/* TOKENS */", R + " {",
"--bd-page: " + s.colors.page + ";",
"--bd-panel: " + s.colors.panel + ";",
"--bd-ink: " + s.colors.ink + ";",
"--bd-rule: " + s.colors.rule + ";",
"--bd-sans: " + fontStack(s.sans) + ";",
"--bd-mono: " + fontStack(s.mono, true) + ";",
"--bd-w: " + (isSpread(s) ? "100%" : s.w + "px") + ";",
"--bd-wt: " + s.mt + "px;",
"--bd-wr: " + s.mr + "px;",
"--bd-wb: " + s.mb + "px;",
"--bd-wl: " + s.ml + "px;",
"--bd-pad: " + s.ml + "px;",
"--bd-top: " + Math.round(s.mt / 2) + "px;",
"--bd-cols: " + s.cols + ";",
"--bd-row: " + s.row + "px;",
"--bd-gap: " + s.gap + "px;",
"--bd-indent: " + s.indent + "px;",
"--bd-label: " + s.labelW + "px;",
"--bd-fs: " + s.styles.body.size + "px;",
"--bd-lh: " + s.styles.body.lh + "px;",
"--bd-ms: " + s.styles.mono.size + "px;",
"--bd-ml: " + s.styles.mono.lh + "px;",
"--bd-ls: " + s.styles.heading.size + "px;",
"--bd-ll: " + s.styles.heading.lh + "px;",
"--bd-space: " + s.master.space + "px;",
"--bd-head-x: " + s.master.headX + ";",
"--bd-head-space: " + s.master.headSpace + "px;",
"--bd-btn-font: var(--bd-" + (s.nav.btnFont === "mono" ? "mono" : "sans") + ");",
"--bd-btn-size: " + s.nav.btnSize + "px;",
"--bd-btn-color: " + (s.nav.btnColor || "var(--bd-ink)") + ";",
"--bd-btn-top: " + s.nav.btnTop + "px;",
(s.nav.menuTop !== "" && s.nav.menuTop != null && !isNaN(parseFloat(s.nav.menuTop)) ? "--bd-menu-top: " + parseFloat(s.nav.menuTop) + "px;" : "--bd-menu-top: var(--bd-menu-top);"),
"--bd-btn-side: " + s.nav.btnSide + "px;",
"--bd-nav-font: var(--bd-" + (s.nav.font === "mono" ? "mono" : "sans") + ");",
"--bd-nav-size: " + (s.nav.size ? s.nav.size + "px" : "var(--bd-fs)") + ";",
"--bd-nav-lh: " + (s.nav.lh ? s.nav.lh + "px" : "var(--bd-lh)") + ";",
"--bd-nav-color: " + (s.nav.color || "var(--bd-ink)") + ";",
"--bd-nav-indent: " + s.nav.indent + "px;",
"--bd-nav-fade: " + s.nav.fade + ";",
"--bd-nav-bg: " + navBg(s.nav) + ";",
"}", "");
out.push(`/* RESET */
*,
*::before,
*::after {
box-sizing: border-box;
}
.bd-site {
display: flow-root;
margin: 0;
background: var(--bd-page);
color: var(--bd-ink);
font-family: var(--bd-sans);
font-size: var(--bd-fs);
line-height: var(--bd-lh);
font-weight: 400;
-webkit-font-smoothing: antialiased;
-webkit-text-size-adjust: 100%;
}
.bd-site a {
color: inherit;
text-decoration: none;
}
.bd-site img,
.bd-site video,
.bd-site iframe {
display: block;
max-width: 100%;
height: auto;
}
.bd-site p,
.bd-site ol,
.bd-site ul,
.bd-site figure,
.bd-site h1,
.bd-site h2,
.bd-site h3 {
margin: 0;
padding: 0;
font: inherit;
}
.bd-site ol,
.bd-site ul {
list-style: none;
}
.bd-site sup {
font-size: 0.6em;
line-height: 0;
vertical-align: 0.75em;
}

/* PANEL */
.bd-panel {
position: relative;
width: var(--bd-w);
max-width: 100%;
min-height: 100vh;
margin: 0 auto;
padding: var(--bd-wt) var(--bd-wr) var(--bd-wb) var(--bd-wl);
background: var(--bd-panel);
display: flex;
flex-direction: column;
}
.bd-main {
flex: 1;
counter-reset: bd-note;
transition: opacity 0.25s ease;
}

/* HEADER */
.bd-head {
padding-left: calc(100% * var(--bd-head-x) / var(--bd-cols));
margin-bottom: var(--bd-head-space);
}
.bd-num {
display: block;
margin-bottom: 30px;
}

/* GRID */
.bd-grid {
display: grid;
grid-template-columns: repeat(var(--bd-cols), minmax(0, 1fr));
grid-auto-rows: minmax(var(--bd-row), auto);
column-gap: var(--bd-gap);
}
.bd-el {
min-width: 0;
}

/* FLOW */
.bd-flow {
--bd-colw: calc((100% - (var(--bd-cols) - 1) * var(--bd-gap)) / var(--bd-cols));
display: flex;
flex-direction: column;
align-items: flex-start;
}
.bd-flow > .bd-el {
flex: none;
margin-left: calc(var(--x, 0) * (var(--bd-colw) + var(--bd-gap)));
width: calc(var(--w, var(--bd-cols)) * var(--bd-colw) + (var(--w, var(--bd-cols)) - 1) * var(--bd-gap));
}
.bd-flow > .bd-el + .bd-el {
margin-top: var(--bd-space);
}
.bd-flow > .bd-link {
width: auto;
max-width: calc(var(--w, var(--bd-cols)) * var(--bd-colw) + (var(--w, var(--bd-cols)) - 1) * var(--bd-gap));
}

/* COLUMNS */
.bd-cols {
display: grid;
align-items: start;
row-gap: var(--bd-space);
}
.bd-col {
min-width: 0;
}

/* TEXT */
.bd-text p + p {
margin-top: var(--bd-lh);
}
.bd-text.has-indent p + p {
margin-top: 0;
text-indent: var(--bd-indent);
}
.bd-text.is-mono {
font-family: var(--bd-mono);
font-size: var(--bd-ms);
line-height: var(--bd-ml);
}
.bd-text.is-small {
font-size: var(--bd-ms);
line-height: var(--bd-ml);
}
.bd-text.is-large {
font-size: var(--bd-ls);
line-height: var(--bd-ll);
}
.bd-text.is-center {
text-align: center;
}
.bd-text.is-right {
text-align: right;
}
.bd-text a {
border-bottom: 1px solid currentColor;
}

/* NOTES */
.bd-notes {
font-family: var(--bd-mono);
font-size: var(--bd-ms);
line-height: var(--bd-ml);
}
.bd-notes li {
position: relative;
overflow-wrap: anywhere;
padding-left: 3.2em;
counter-increment: bd-note;
}
.bd-notes li::before {
content: counter(bd-note) ".";
position: absolute;
left: 0;
top: 0;
}
.bd-notes a {
text-decoration: underline;
text-underline-offset: 3px;
}

/* LIST */
.bd-list h2 {
margin-bottom: 14px;
}
.bd-list li {
display: grid;
grid-template-columns: var(--bd-label) minmax(0, 1fr);
}
.bd-list li > span:first-child {
padding-right: 12px;
}

/* FIGURE */
.bd-figure img {
width: 100%;
}
.bd-figure.is-cover {
display: flex;
flex-direction: column;
}
.bd-figure.is-cover img {
flex: 1;
min-height: 0;
height: 100%;
object-fit: cover;
}
.bd-figure figcaption {
margin-top: 12px;
font-family: var(--bd-mono);
font-size: var(--bd-ms);
line-height: var(--bd-ml);
}

/* LINK */
.bd-link {
align-self: start;
justify-self: start;
}
.bd-link.is-underline {
border-bottom: 1px solid currentColor;
}
.bd-link.is-arrow::after {
content: " \\2192";
}

/* EMBED */
.bd-embed {
position: relative;
align-self: start;
aspect-ratio: 16 / 9;
background: #000000;
}
.bd-embed iframe {
position: absolute;
inset: 0;
width: 100%;
height: 100%;
border: 0;
}

/* RULE */
.bd-rule {
align-self: center;
width: 100%;
height: 0;
margin: 0;
border: 0;
border-top: 1px solid var(--bd-rule);
}

/* BURGER */
.bd-burger {
position: fixed;
top: calc(var(--bd-top) + var(--bd-btn-top));
right: max(0px, calc(50% - var(--bd-w) / 2 + var(--bd-btn-side)));
padding: 0;
border: 0;
background: none;
cursor: pointer;
color: var(--bd-btn-color);
font-family: var(--bd-btn-font);
font-size: var(--bd-btn-size);
line-height: 1;
text-transform: @@BTNCASE@@;
z-index: 20;
transition: opacity 0.25s ease;
}
.bd-burger.is-left {
right: auto;
left: max(0px, calc(50% - var(--bd-w) / 2 + var(--bd-btn-side)));
}
.bd-burger svg {
display: block;
width: calc(var(--bd-btn-size) * 1.17);
height: var(--bd-btn-size);
}

/* MENU */
.bd-menu {
position: fixed;
top: calc(var(--bd-top) * 2);
left: calc(50% - var(--bd-w) / 2 + var(--bd-pad));
width: calc(var(--bd-w) - var(--bd-pad) * 2);
max-height: calc(100vh - var(--bd-top) * 3);
overflow-y: auto;
display: flex;
justify-content: space-between;
align-items: flex-start;
color: var(--bd-nav-color);
font-family: var(--bd-nav-font);
font-size: var(--bd-nav-size);
line-height: var(--bd-nav-lh);
letter-spacing: @@TRACKING@@;
text-transform: @@NAVCASE@@;
opacity: 0;
pointer-events: none;
transition: opacity 0.25s ease;
z-index: 10;
}
.bd-menu-list {
flex: 1;
min-width: 0;
}
.bd-menu-head {
display: block;
padding: 0;
border: 0;
background: none;
color: inherit;
font: inherit;
letter-spacing: inherit;
text-transform: inherit;
text-align: left;
cursor: pointer;
}
.bd-menu-items {
display: none;
padding: 4px 0 10px var(--bd-nav-indent);
}
.bd-menu-group.is-open .bd-menu-items,
.bd-menu.is-open-all .bd-menu-items {
display: block;
}
.bd-menu-group.is-open .bd-menu-head {
text-decoration: underline;
text-underline-offset: 4px;
text-decoration-thickness: 1px;
}
.bd-menu.is-open-all .bd-menu-head {
text-decoration: none;
cursor: default;
}
.bd-menu.is-flat .bd-menu-head {
display: none;
}
.bd-menu-group.is-plain .bd-menu-items {
display: block;
padding-left: 0;
}
.bd-menu.is-flat .bd-menu-items {
display: block;
padding: 0;
}
.bd-menu.is-flat .bd-menu-group + .bd-menu-group {
margin-top: var(--bd-nav-lh);
}
.bd-menu-head:hover,
.bd-menu a:hover {
opacity: 0.4;
}
.bd-menu.is-cur-dim a.is-current {
opacity: 0.4;
}
.bd-menu.is-cur-underline a.is-current {
text-decoration: underline;
text-underline-offset: 4px;
text-decoration-thickness: 1px;
}
.bd-menu.is-cur-strike a.is-current {
text-decoration: line-through;
text-decoration-thickness: 1px;
}
.bd-menu.is-cur-arrow a.is-current::before {
content: "\\2192\\00a0";
}
.bd-menu-title {
flex: none;
margin-left: 16px;
text-align: right;
white-space: nowrap;
}
.bd-menu.is-title-left {
flex-direction: row-reverse;
}
.bd-menu.is-title-left .bd-menu-title {
margin: 0 16px 0 0;
text-align: left;
}
.bd-site::before {
content: "";
position: fixed;
inset: 0;
background: var(--bd-nav-bg);
opacity: 0;
pointer-events: none;
transition: opacity 0.25s ease;
z-index: 9;
}
.has-menu::before {
opacity: 1;
}
.has-menu .bd-menu {
opacity: 1;
pointer-events: auto;
}
.has-menu .bd-main,
.has-menu .bd-pager {
opacity: var(--bd-nav-fade);
}

/* PAGER */
.bd-pager {
display: grid;
grid-template-columns: calc(100% * var(--bd-head-x) / var(--bd-cols)) 1fr auto;
align-items: center;
margin-top: 120px;
padding-top: 14px;
border-top: 1px solid var(--bd-rule);
transition: opacity 0.25s ease;
}
.bd-pager a {
display: block;
width: 24px;
}
.bd-pager svg {
display: block;
width: 22px;
height: 22px;
}
.bd-pager-next {
grid-column: 3;
}

/* PAGE TITLE BLOCK */
.bd-ptitle.is-al-center {
text-align: center;
}
.bd-ptitle.is-al-right {
text-align: right;
}

/* MENU BLOCK */
.bd-pin {
position: relative;
}
.bd-menubtn {
display: flex;
flex-wrap: wrap;
align-items: baseline;
gap: var(--mgap, 16px);
min-height: 1px;
}
.bd-menubtn.is-al-center {
justify-content: center;
}
.bd-menubtn.is-al-end {
justify-content: flex-end;
}
.bd-menubtn.is-al-spread {
justify-content: space-between;
}
.bd-menubtn.is-brand-after .bd-mbrand {
order: 2;
}
.bd-menubtn.is-brand-above {
flex-direction: column;
align-items: flex-start;
}
.bd-menubtn.is-brand-above.is-al-center {
align-items: center;
}
.bd-menubtn.is-brand-above.is-al-end {
align-items: flex-end;
}
.bd-mbrand {
display: block;
}
.bd-mlist ul {
margin: 0;
padding: 0;
list-style: none;
}
.bd-mlist a {
display: inline-block;
border-bottom: 1px solid transparent;
}
.bd-mlist.is-vertical li + li {
margin-top: var(--igap, 0px);
}
.bd-mlist.is-vertical .bd-mgroup + .bd-mgroup {
margin-top: var(--ggap, 20px);
}
.bd-mlist.is-horizontal,
.bd-mlist.is-horizontal ul {
display: flex;
flex-wrap: wrap;
}
.bd-mlist.is-horizontal {
gap: var(--ggap, 20px);
}
.bd-mlist.is-horizontal ul {
gap: var(--igap, 16px);
}
.bd-mlist.is-horizontal.has-heads .bd-mgroup {
display: flex;
gap: var(--igap, 16px);
}
.bd-mhead {
display: block;
margin-bottom: var(--hgap, 4px);
}
.bd-mlist.is-horizontal .bd-mhead {
margin-bottom: 0;
}
.bd-mlist.is-hov-underline a:hover,
.bd-mlist.is-cur-underline a.is-current {
border-bottom-color: currentColor;
}
.bd-mlist.is-hov-dim a:hover,
.bd-mlist.is-cur-dim a.is-current {
opacity: 0.4;
}
.bd-mlist.is-cur-strike a.is-current {
text-decoration: line-through;
text-decoration-thickness: 1px;
}
.bd-mlist.is-cur-arrow a.is-current::before {
content: "\\2192\\00a0";
}
.bd-flow > .bd-menubtn.is-corner-right,
.bd-flow > .bd-menubtn.is-corner-left {
position: absolute;
top: 0;
width: auto;
margin: 0;
z-index: 20;
}
.bd-flow > .bd-menubtn.is-corner-right {
right: 0;
left: auto;
}
.bd-flow > .bd-menubtn.is-corner-left {
left: 0;
}
.bd-burger.is-inline {
display: block;
position: relative;
top: auto;
right: auto;
left: auto;
}
.bd-pin .bd-el {
transition: opacity 0.25s ease;
}
.has-menu .bd-pin .bd-el:not(.bd-menubtn),
.has-menu .bd-mbrand {
opacity: var(--bd-nav-fade);
}
.bd-mbrand {
transition: opacity 0.25s ease;
}

/* BLOG POSTS */
.bd-posts {
display: grid;
grid-template-columns: repeat(var(--pcols, 3), minmax(0, 1fr));
column-gap: var(--pgap, 40px);
row-gap: var(--prow, 40px);
align-items: start;
}
.bd-posts.is-list {
grid-template-columns: minmax(0, 1fr);
}
.bd-posts.is-masonry {
display: block;
columns: var(--pcols, 3);
column-gap: var(--pgap, 40px);
}
.bd-posts.is-masonry .bd-post {
break-inside: avoid;
margin-bottom: var(--prow, 40px);
}
.bd-post-txt {
min-height: var(--pminh, 0px);
}
.bd-post {
display: flex;
flex-direction: column;
padding: var(--ppad, 0px);
background: var(--pbg, transparent);
transition: opacity 0.2s ease, transform 0.2s ease;
}
.bd-post-img {
display: block;
margin-bottom: var(--pimg-gap, 12px);
}
.bd-posts.is-img-bottom .bd-post-img {
order: 2;
margin: var(--pimg-gap, 12px) 0 0;
}
.bd-post img {
width: 100%;
aspect-ratio: var(--pratio, auto);
object-fit: cover;
}
.bd-post-txt,
.bd-post-t,
.bd-post-d,
.bd-post-m,
.bd-post-x {
display: block;
}
.bd-post-d,
.bd-post-m,
.bd-post-x {
margin-top: var(--pmgap, 8px);
}
.bd-post.is-featured {
grid-column: 1 / -1;
column-span: all;
}
.bd-post.is-featured.is-f-side {
display: grid;
grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
column-gap: var(--pgap, 40px);
align-items: start;
}
.bd-post.is-featured.is-f-side .bd-post-img {
margin: 0;
}
.bd-posts.is-hov-dim .bd-post:hover {
opacity: 0.6;
}
.bd-posts.is-hov-lift .bd-post:hover {
transform: translateY(-3px);
}

/* POST INFO */
.bd-postinfo-back {
margin-right: 0.6em;
}

/* QUOTE */
.bd-quote {
margin: 0;
}
.bd-quote.is-al-center {
text-align: center;
}
.bd-quote.is-al-right {
text-align: right;
}
.bd-quote.has-shadow {
box-shadow: 0 24px 60px rgba(0, 0, 0, 0.09);
}
.bd-quote.has-line {
border-left: 1px solid currentColor;
}
.bd-quote p + p {
margin-top: var(--bd-lh);
}

/* FOLD-OUT LIST */
.bd-toggle summary {
list-style: none;
cursor: pointer;
}
.bd-toggle summary::-webkit-details-marker {
display: none;
}
.bd-toggle.is-mark-plus summary::before {
content: "+";
display: inline-block;
width: 1.8em;
}
.bd-toggle.is-mark-plus[open] summary::before {
content: "\\2014";
}
.bd-toggle.is-mark-arrow summary::before {
content: "\\2192";
display: inline-block;
width: 1.8em;
}
.bd-toggle.is-mark-arrow[open] summary::before {
content: "\\2193";
}
.bd-toggle ul {
margin: var(--bd-lh) 0 0;
padding: 0 0 0 var(--tind, 0px);
list-style: none;
}
.bd-toggle li + li {
margin-top: var(--tgap, 0px);
}

/* PRODUCT */
.bd-product {
display: block;
margin: 0;
}
.bd-product img {
width: 100%;
}
.bd-product-t {
margin-top: 12px;
}
.bd-product.is-al-center {
text-align: center;
}
.bd-product.is-al-right {
text-align: right;
}
.bd-product-empty {
display: block;
padding: 40px 12px;
background: rgba(0, 0, 0, 0.04);
text-align: center;
}

/* PAGE ARROWS BLOCK */
.bd-pagerbar {
display: grid;
grid-template-columns: calc(100% * var(--bd-head-x) / var(--bd-cols)) 1fr auto;
align-items: center;
}
.bd-pagerbar.has-line {
padding-top: 14px;
border-top: 1px solid var(--bd-rule);
}
.bd-pagerbar a {
display: block;
width: 24px;
}
.bd-pagerbar svg {
display: block;
width: 22px;
height: 22px;
}
.bd-pagerbar-next {
grid-column: 3;
}
.bd-pagerbar.is-text {
display: block;
}
.bd-pagerbar.is-text.is-al-center {
text-align: center;
}
.bd-pagerbar.is-text.is-al-right {
text-align: right;
}
.bd-pagerbar.is-text a {
display: inline;
width: auto;
}
.bd-pagerbar.is-text a + a {
margin-left: 2em;
}
`);
out.push(EXTRA_BASE);
out.push("/* TYPE STYLES */\n" + styleCSS(s, false) + "\n");
return out.join("\n").replace("@@BTNCASE@@", s.nav.btnCase || "none").replace("@@NAVCASE@@", s.nav.navCase || "none").replace("@@TRACKING@@", (s.nav.tracking || 0) + "em");
}
function masterRules(s, phone) {
var m = s.master;
var out = [];
Object.keys(BD_TYPE_CLASS).forEach(function (k) {
var t = m.types[k] || masterDefaults().types[k];
if (!t) return;
var cols = phone ? s.colsM : s.cols;
var w = clamp(phone ? t.wm : t.w, 1, cols);
var x = clamp(phone ? t.xm : t.x, 0, cols - w);
out.push(".bd-flow > ." + BD_TYPE_CLASS[k] + " {\n--x: " + x + ";\n--w: " + w + ";\n}");
var sp = phone ? t.spaceM : t.space;
if (sp !== "" && sp != null && !isNaN(parseFloat(sp))) out.push(".bd-flow > .bd-el + ." + BD_TYPE_CLASS[k] + " {\nmargin-top: " + parseFloat(sp) + "px;\n}");
});
return out.join("\n");
}
function flowRules(page, phone) {
if (!isMaster(page)) return "";
var out = [];
page.els.forEach(function (e) {
var o = e.own;
if (!o) return;
var has = phone ? (o.xm != null || o.wm != null || o.x != null || o.w != null) : (o.x != null || o.w != null);
if (!has) return;
var p = effPlace(e, phone);
out.push(".bd-flow > .bd-e-" + e.id + " {\n--x: " + p.x + ";\n--w: " + p.w + ";\n}");
});
return out.join("\n");
}
var EXTRA_BASE = `
/* GALLERY */
.bd-gi {
--cols: 3;
--gut: 16px;
--rowh: 220px;
}
.bd-gi figure {
min-width: 0;
}
.bd-gi img {
width: 100%;
}
.bd-gi figcaption {
margin-top: 8px;
}
.bd-gallery.is-grid .bd-gi {
display: grid;
grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
gap: var(--gut);
}
.bd-gallery.is-columns .bd-gi {
column-count: var(--cols);
column-gap: var(--gut);
}
.bd-gallery.is-columns .bd-gi figure {
break-inside: avoid;
margin-bottom: var(--gut);
}
.bd-gallery.is-justify .bd-gi {
display: flex;
flex-wrap: wrap;
gap: var(--gut);
}
.bd-gallery.is-justify .bd-gi::after {
content: "";
flex-grow: 999;
}
.bd-gallery.is-justify .bd-gi figure {
flex-grow: var(--r);
flex-basis: calc(var(--r) * var(--rowh));
}
.bd-gallery.is-free .bd-gi {
position: relative;
height: 0;
}
.bd-gallery.is-free .bd-gi figure {
position: absolute;
}
.bd-gallery.is-slides .bd-gi {
display: grid;
}
.bd-gallery.is-slides .bd-gi figure {
grid-area: 1 / 1;
opacity: 0;
pointer-events: none;
transition: opacity 0.45s ease, transform 0.45s ease;
}
.bd-gallery.is-slides .bd-gi figure.is-on {
opacity: 1;
pointer-events: auto;
}
.bd-gallery.is-slide .bd-gi {
overflow: hidden;
}
.bd-gallery.is-slide .bd-gi figure {
opacity: 1;
transform: translateX(100%);
}
.bd-gallery.is-slide .bd-gi figure.is-on {
transform: translateX(0);
}
.bd-gallery.is-slide .bd-gi figure.is-past {
transform: translateX(-100%);
}
.bd-slide-nav {
display: flex;
align-items: center;
gap: 16px;
margin-top: 10px;
font-family: var(--bd-mono);
font-size: var(--bd-ms);
}
.bd-slide-nav button {
padding: 0;
border: 0;
background: none;
color: inherit;
font: inherit;
cursor: pointer;
}
.bd-gallery.has-zones .bd-gi {
cursor: e-resize;
}
.has-nocap figcaption {
display: none;
}
.has-zoom img {
cursor: zoom-in;
}

/* LIBRARY */
.bd-library {
--cols: 5;
--gut: 30px;
--ratio: 2 / 3;
}
.bd-lib-filter {
display: flex;
flex-wrap: wrap;
gap: 4px 10px;
margin-bottom: 40px;
font-size: 12px;
line-height: 18px;
}
.bd-lib-filter button {
padding: 0;
border: 0;
border-bottom: 1px solid transparent;
background: none;
color: inherit;
font: inherit;
cursor: pointer;
}
.bd-lib-filter button.is-on,
.bd-lib-filter button:hover {
border-bottom-color: currentColor;
}
.bd-lib-grid {
display: grid;
grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
gap: var(--gut);
}
.bd-library .bd-lib-item {
display: block;
min-width: 0;
border-bottom: 0;
}
.bd-lib-cover {
position: relative;
display: block;
}
.bd-lib-item img,
.bd-lib-blank {
display: block;
width: 100%;
aspect-ratio: var(--ratio);
object-fit: cover;
background: #eeeeee;
}
.bd-lib-item img {
color: transparent;
font-size: 0;
}
.bd-lib-blank {
padding: 12px;
font-size: 12px;
line-height: 16px;
}
.bd-lib-t {
display: block;
margin-top: 8px;
font-size: 12px;
line-height: 16px;
}
.bd-lib-item.is-hidden {
display: none;
}
.bd-library:not(.is-book) a.bd-lib-item:hover img {
opacity: 0.85;
}
.bd-library.is-book .bd-lib-item {
perspective: 900px;
}
.bd-library.is-book .bd-lib-cover {
overflow: hidden;
border-radius: 0 var(--lib-r, 2px) var(--lib-r, 2px) 0;
transform-origin: left center;
transition: transform 0.45s ease, box-shadow 0.45s ease;
}
.bd-library.is-book .bd-lib-cover::before {
content: "";
position: absolute;
top: 0;
bottom: 0;
left: 0;
z-index: 1;
width: var(--spine-w, 10px);
background: linear-gradient(90deg, rgba(0, 0, 0, 0.28), rgba(255, 255, 255, 0.18) 45%, rgba(0, 0, 0, 0.12)), var(--spine, #8a8a8a);
}
.bd-library.is-book .bd-lib-cover::after {
content: "";
position: absolute;
top: 0;
bottom: 0;
left: var(--spine-w, 10px);
z-index: 1;
width: 3px;
background: linear-gradient(90deg, rgba(0, 0, 0, 0.18), transparent);
}
.bd-library.has-shadow .bd-lib-cover {
box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.16);
}
.bd-library.is-hov-tilt a.bd-lib-item:hover .bd-lib-cover {
transform: rotateY(-24deg);
box-shadow: 14px 8px 18px rgba(0, 0, 0, 0.22);
}
.bd-library.is-hov-lift a.bd-lib-item:hover .bd-lib-cover {
transform: translateY(-6px);
box-shadow: 4px 12px 18px rgba(0, 0, 0, 0.2);
}

/* ZOOM */
.bd-zoom {
position: fixed;
inset: 0;
z-index: 50;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 12px;
padding: 32px;
background: var(--bd-panel);
cursor: zoom-out;
}
.bd-zoom img {
max-width: 100%;
max-height: calc(100vh - 110px);
width: auto;
height: auto;
object-fit: contain;
}

/* PINS */
.bd-pin.is-fixed {
position: fixed;
left: 0;
right: 0;
z-index: 15;
pointer-events: none;
}
.bd-pin.is-fixed > div {
width: var(--bd-w);
max-width: 100%;
margin: 0 auto;
padding: 0 var(--bd-wr) 0 var(--bd-wl);
pointer-events: auto;
}
.bd-pin.is-fixed.is-top > div {
padding-top: var(--bd-wt);
}
.bd-pin.is-fixed.is-bottom > div {
padding-bottom: var(--bd-wb);
}
.bd-pin.is-fixed.is-top {
top: 0;
}
.bd-pin.is-fixed.is-bottom {
bottom: 0;
}
.bd-panel > .bd-pin.is-top {
margin-bottom: var(--bd-space);
}
.bd-panel > .bd-pin.is-bottom {
margin-top: var(--bd-space);
}

/* STACK */
.bd-stack {
margin-top: calc(var(--bd-space) * 2);
}
`;
function mobileRules(s, R) {
var t = sizeTokens(s, true);
return [R + " {",
"--bd-top: 0px;",
"--bd-wt: " + s.mtM + "px;",
"--bd-wr: " + s.mrM + "px;",
"--bd-wb: " + s.mbM + "px;",
"--bd-wl: " + s.mlM + "px;",
"--bd-pad: " + s.mlM + "px;",
"--bd-cols: " + s.colsM + ";",
"--bd-gap: " + s.gapM + "px;",
"--bd-indent: " + s.indentM + "px;",
"--bd-label: " + s.labelWM + "px;",
"--bd-fs: " + s.styles.body.sizeM + "px;",
"--bd-lh: " + s.styles.body.lhM + "px;",
"--bd-ms: " + s.styles.mono.sizeM + "px;",
"--bd-ml: " + s.styles.mono.lhM + "px;",
"--bd-ls: " + s.styles.heading.sizeM + "px;",
"--bd-ll: " + s.styles.heading.lhM + "px;",
"--bd-space: " + s.master.spaceM + "px;",
"--bd-head-x: " + s.master.headXM + ";",
"--bd-head-space: " + s.master.headSpaceM + "px;",
"--bd-btn-top: " + s.nav.btnTopM + "px;",
(s.nav.menuTopM !== "" && s.nav.menuTopM != null && !isNaN(parseFloat(s.nav.menuTopM)) ? "--bd-menu-top: " + parseFloat(s.nav.menuTopM) + "px;" : (s.nav.menuTop !== "" && s.nav.menuTop != null && !isNaN(parseFloat(s.nav.menuTop)) ? "--bd-menu-top: " + parseFloat(s.nav.menuTop) + "px;" : "--bd-menu-top: var(--bd-menu-top);")),
"--bd-btn-side: " + s.nav.btnSideM + "px;",
"--bd-nav-size: " + (s.nav.sizeM ? s.nav.sizeM + "px" : "var(--bd-fs)") + ";",
"--bd-nav-lh: " + (s.nav.lhM ? s.nav.lhM + "px" : "var(--bd-lh)") + ";",
"}",
`.bd-panel {
width: 100%;
min-height: 100vh;
}
.bd-num {
margin-bottom: 18px;
}
.bd-burger {
right: var(--bd-btn-side);
}
.bd-burger.is-left {
left: var(--bd-btn-side);
}
.bd-menu {
top: 24px;
left: var(--bd-pad);
width: calc(100% - var(--bd-pad) * 2 - 44px);
max-height: calc(100vh - 48px);
flex-direction: column-reverse;
justify-content: flex-end;
}
.bd-menu-list {
flex: none;
width: 100%;
}
.bd-menu-title {
margin: 0 0 var(--bd-lh);
text-align: left;
}
.bd-menu.is-title-left {
flex-direction: column-reverse;
}
.bd-menu.is-title-left .bd-menu-title {
margin: 0 0 var(--bd-lh);
}
.bd-pager {
margin-top: 80px;
}
.bd-zoom {
padding: 16px;
}`, styleCSS(s, true)].join("\n");
}
function freeHeight(g) {
var h = 0;
(g.items || []).forEach(function (it) {
var r = it.w && it.h ? it.h / it.w : 0.75;
h = Math.max(h, it.fy + it.fw * r);
});
return Math.round((h + 4) * 100) / 100;
}
function galleryRules(page, phone) {
var out = [];
page.els.forEach(function (e) {
if (e.type === "library") {
var lp = e.props;
out.push(".bd-e-" + e.id + " {\n--cols: " + (phone ? lp.colsM : lp.cols) + ";\n--gut: " + (phone ? lp.gutterM : lp.gutter) + "px;" + (phone ? "" : "\n--ratio: " + (lp.ratio === "auto" ? "auto" : String(lp.ratio).replace("/", " / ")) + ";") + "\n}");
}
}); page.els.forEach(function (e) {
if (e.type !== "gallery") return;
var g = e.props;
var sel = ".bd-e-" + e.id + " .bd-gi";
if (phone) {
out.push(sel + " {\n--cols: " + g.colsM + ";\n--gut: " + g.gutterM + "px;\n--rowh: " + g.rowHM + "px;\n}");
if (g.layout === "free" && g.freeM === "stack") out.push(sel + " {\nheight: auto;\npadding-bottom: 0;\n}\n" + sel + " figure {\nposition: static;\nwidth: 100% !important;\n}\n" + sel + " figure + figure {\nmargin-top: var(--gut);\n}");
return;
}
var m = [sel + " {", "--cols: " + g.cols + ";", "--gut: " + g.gutter + "px;", "--rowh: " + g.rowH + "px;"];
if (g.layout === "grid" && g.align !== "start") m.push("align-items: " + g.align + ";");
if (g.layout === "free") m.push("padding-bottom: " + freeHeight(g) + "%;");
m.push("}");
out.push(m.join("\n"));
if (g.layout === "grid" && g.ratio !== "auto") out.push(sel + " img {\naspect-ratio: " + g.ratio + ";\nobject-fit: cover;\n}");
var H = freeHeight(g);
(g.items || []).forEach(function (it) {
var isel = ".bd-e-" + e.id + " .bd-i-" + it.id;
if (g.layout === "justify") out.push(isel + " {\n--r: " + (it.w && it.h ? Math.round(it.w / it.h * 1000) / 1000 : 1.333) + ";\n}");
if (g.layout === "free") out.push(isel + " {\nleft: " + Math.round(it.fx * 100) / 100 + "%;\ntop: " + Math.round(it.fy / H * 10000) / 100 + "%;\nwidth: " + Math.round(it.fw * 100) / 100 + "%;\n}");
});
});
return out.join("\n");
}
function layoutRules(page, phone) {
var r = isMaster(page) ? flowRules(page, phone) : posRules(page, phone ? "m" : "d");
var g = galleryRules(page, phone);
var b = blockRules(page, phone);
return r + (g ? "\n" + g : "") + (b ? "\n" + b : "");
}
function pick(p, k, phone) {
var v = phone && p[k + "M"] !== "" && p[k + "M"] != null ? p[k + "M"] : p[k];
return v === "" || v == null || isNaN(parseFloat(v)) ? null : parseFloat(v);
}
function blockRules(page, phone) {
var out = [];
page.els.forEach(function (e) {
var p = e.props;
var sel = ".bd-e-" + e.id;
var d = [];
var px = function (css, k) { var v = N(e, k, phone); if (v != null) d.push(css + ": " + v + "px;"); };
var font = function (target, kS, kL) {
var a = N(e, kS, phone), b = N(e, kL, phone);
if (a != null || b != null) out.push(target + " {\n" + (a != null ? "font-size: " + a + "px;\n" : "") + (b != null ? "line-height: " + b + "px;\n" : "") + "}");
};
if (e.type === "quote") {
var qy = N(e, "pad", phone), qx = N(e, "padX", phone);
if (qy != null || qx != null) d.push("padding: " + (qy || 0) + "px " + (qx || 0) + "px;");
if (!phone) {
if (E(e, "bg")) d.push("background: " + E(e, "bg") + ";");
if (E(e, "ink")) d.push("color: " + E(e, "ink") + ";");
d.push("text-align: " + (E(e, "align") || "left") + ";");
if (ON(e, "shadow")) d.push("box-shadow: 0 24px 60px rgba(0, 0, 0, 0.09);");
if (ON(e, "line")) d.push("border-left: 1px solid currentColor;");
}
font(sel, "size", "lh");
}
if (e.type === "posts") {
var pc = pick(p, "cols", phone), pg2 = pick(p, "gap", phone), pr = pick(p, "rowGap", phone);
if (pc != null) d.push("--pcols: " + pc + ";");
if (pg2 != null) d.push("--pgap: " + pg2 + "px;");
if (pr != null) d.push("--prow: " + pr + "px;");
px("--ppad", "cardPad");
if (!phone) {
px("--pminh", "minH");
px("--pimg-gap", "imgGap");
px("--pmgap", "metaGap");
if (E(e, "cardBg")) d.push("--pbg: " + E(e, "cardBg") + ";");
var ra = E(e, "ratio");
if (ra && ra !== "auto") d.push("--pratio: " + String(ra).replace("/", " / ") + ";");
}
font(sel + " .bd-post:not(.is-featured) .bd-post-t", "titleSize", "titleLh");
font(sel + " .bd-post-m,\n" + sel + " .bd-post-d", "metaSize", "metaLh");
}
if (e.type === "library" && !phone) {
if (E(e, "spine")) d.push("--spine: " + E(e, "spine") + ";");
px("--spine-w", "spineW");
px("--lib-r", "radius");
(p.items || []).forEach(function (b) { if (b.spine) out.push(sel + ' .bd-lib-item[data-k="' + b.id + '"] {\n--spine: ' + b.spine + ";\n}"); });
}
if (e.type === "toggle") {
if (!phone) {
px("--tgap", "itemGap");
px("--tind", "indent");
}
font(sel, "size", "lh");
}
if (e.type === "product") {
if (!phone) d.push("text-align: " + (E(e, "align") || "left") + ";");
font(sel + " .bd-product-t", "size", "lh");
}
if (e.type === "pager" || e.type === "postinfo") font(sel, "size", "lh");
if (e.type === "menubtn") {
px("--mgap", "brandGap");
px("--igap", "itemGap");
px("--ggap", "groupGap");
if (!phone) px("--hgap", "headGap");
var t = [];
var fs = N(e, "size", phone), lh = N(e, "lh", phone);
if (fs != null) t.push("font-size: " + fs + "px;");
if (lh != null) t.push("line-height: " + lh + "px;");
if (!phone && E(e, "textCase") && E(e, "textCase") !== "none") t.push("text-transform: " + E(e, "textCase") + ";");
if (!phone && N(e, "tracking", false) != null) t.push("letter-spacing: " + N(e, "tracking", false) + "em;");
if (t.length) out.push(sel + " .bd-mlist {\n" + t.join("\n") + "\n}");
font(sel + " .bd-mbrand", "brandSize", "brandLh");
}
if (d.length) out.push(sel + " {\n" + d.join("\n") + "\n}");
});
return out.join("\n");
}
function posRules(page, key) {
return page.els.map(function (e) {
var p = e[key];
if (!p) return "";
return ".bd-e-" + e.id + " {\ngrid-column: " + (p.x + 1) + " / span " + p.w + ";\ngrid-row: " + (p.y + 1) + " / span " + p.h + ";\n" + (e.z ? "z-index: " + e.z + ";\n" : "") + "}";
}).filter(Boolean).join("\n");
}
var EDIT_CSS = `
.is-pin-page .bd-main {
position: relative;
}
.is-pin-page .bd-burger {
pointer-events: none;
}
.is-editing .bd-mslot:empty {
min-width: 40px;
min-height: 16px;
outline: 1px dashed rgba(47, 75, 255, 0.5);
}
/* EDITOR ONLY */
.bd-panel {
min-height: 640px;
}
.is-editing .bd-grid,
.is-editing .bd-flow {
position: relative;
}
.is-editing .bd-main > .bd-grid,
.is-editing .bd-main > .bd-flow {
min-height: 360px;
}
.is-editing .bd-pin .bd-flow {
min-height: 40px;
}
.is-editing .bd-col {
position: relative;
min-height: 120px;
outline: 1px dashed rgba(47, 75, 255, 0.28);
outline-offset: 4px;
}
.bd-ed-drop {
position: absolute;
left: 0;
right: 0;
height: 0;
border-top: 2px solid #2f4bff;
pointer-events: none;
z-index: 999;
}
.is-editing .bd-burger {
outline: 1px dashed transparent;
outline-offset: 6px;
}
.is-editing .bd-burger:hover {
outline-color: rgba(47, 75, 255, 0.5);
}
.is-editing .bd-burger.is-selected {
outline: 1.5px solid #2f4bff;
}
.bd-ed-cols {
position: absolute;
inset: 0;
display: grid;
grid-template-columns: repeat(var(--bd-cols), minmax(0, 1fr));
column-gap: var(--bd-gap);
pointer-events: none;
z-index: 0;
}
.bd-ed-cols i {
background: rgba(47, 75, 255, 0.045);
box-shadow: inset 1px 0 rgba(47, 75, 255, 0.12), inset -1px 0 rgba(47, 75, 255, 0.12);
}
.is-editing .bd-el {
position: relative;
cursor: grab;
outline: 1px dashed transparent;
touch-action: none;
-webkit-user-select: none;
user-select: none;
}
.is-editing .bd-el:hover {
outline-color: rgba(47, 75, 255, 0.5);
}
.is-editing .bd-el.is-selected {
outline: 1.5px solid #2f4bff;
}
.is-editing .bd-el.is-live {
cursor: text;
outline: 1.5px solid #2f4bff;
touch-action: auto;
-webkit-user-select: text;
user-select: text;
}
.is-editing .bd-el.is-dragging {
opacity: 0.85;
cursor: grabbing;
}
.is-editing .bd-el a {
pointer-events: none;
}
.is-editing .bd-el.is-live a {
pointer-events: auto;
}
.bd-ed-sel {
position: absolute;
pointer-events: none;
z-index: 999;
}
.bd-ed-tag {
position: absolute;
left: -1.5px;
bottom: 100%;
margin-bottom: 2px;
background: #2f4bff;
color: #ffffff;
font: 10px/1 "IBM Plex Mono", Menlo, monospace;
padding: 4px 6px;
white-space: nowrap;
border-radius: 2px;
}
.bd-ed-h {
position: absolute;
width: 12px;
height: 12px;
background: #ffffff;
border: 1.5px solid #2f4bff;
pointer-events: auto;
touch-action: none;
}
.bd-ed-h::before {
content: "";
position: absolute;
inset: -10px;
}
.bd-ed-h[data-h="e"] {
right: -7px;
top: calc(50% - 6px);
cursor: ew-resize;
}
.bd-ed-h[data-h="s"] {
bottom: -7px;
left: calc(50% - 6px);
cursor: ns-resize;
}
.bd-ed-h[data-h="se"] {
right: -7px;
bottom: -7px;
cursor: nwse-resize;
}
.bd-figure.is-empty {
min-height: 140px;
display: flex;
align-items: center;
justify-content: center;
background: repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.045) 0 10px, transparent 10px 20px);
outline: 1px solid rgba(0, 0, 0, 0.12);
font-family: var(--bd-mono);
font-size: 13px;
color: rgba(0, 0, 0, 0.5);
}
.bd-embed.is-placeholder {
display: flex;
align-items: center;
justify-content: center;
color: #ffffff;
font-family: var(--bd-mono);
font-size: 13px;
}
.bd-ed-gempty {
padding: 28px 16px;
border: 1px dashed rgba(0, 0, 0, 0.28);
font-family: var(--bd-mono);
font-size: 13px;
color: rgba(0, 0, 0, 0.55);
text-align: center;
}
.is-editing .bd-gallery.is-free.is-selected .bd-gi figure {
cursor: move;
}
.is-editing .bd-gallery.is-free .bd-gi {
background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px);
background-size: 5% 5%;
}
.bd-ed-fh {
position: absolute;
right: -7px;
bottom: -7px;
width: 13px;
height: 13px;
background: #ffffff;
border: 1.5px solid #2f4bff;
cursor: nwse-resize;
touch-action: none;
}
.is-editing .bd-pin[data-pin],
.is-editing .bd-stack[data-stack] {
cursor: pointer;
outline: 1px dashed rgba(0, 0, 0, 0.2);
outline-offset: 4px;
}
.is-editing .bd-pin[data-pin]:hover,
.is-editing .bd-stack[data-stack]:hover {
outline-color: #2f4bff;
}
.is-editing .bd-pin .bd-el,
.is-editing .bd-stack .bd-el {
cursor: pointer;
}
.bd-html:empty::before {
content: "Empty HTML block";
font-family: var(--bd-mono);
font-size: 13px;
opacity: 0.5;
}
`;

/* HTML GENERATORS */
function embedSrc(url) {
var m;
url = String(url || "").trim();
if ((m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/))) return "https://www.youtube-nocookie.com/embed/" + m[1];
if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return "https://player.vimeo.com/video/" + m[1];
return url;
}
function imgSrc(p, ctx) {
if (ctx === "export") return p.assetId === "remote" ? p.remote : "/images/" + p.file;
if (p.assetId && S.mem[p.assetId]) return S.mem[p.assetId].url;
if (p.file && S.liveMem[p.file]) return S.liveMem[p.file];
if (p.assetId && p.assetId.indexOf("sha:") === 0) {
loadBlob(p);
return BLANK_IMG;
}
if (p.assetId === "remote") return p.remote || "";
if (p.assetId) return LIVE_BASE + "/images/" + p.file;
return "";
}
function textStyle(p) {
if (p.style) return p.style;
if (p.font === "mono") return "mono";
if (p.size === "small") return "small";
if (p.size === "large") return "heading";
return "body";
}
function driveId(u) {
var m = String(u || "").match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([\w-]{20,})/);
return m ? m[1] : "";
}
function libCover(b, ctx) {
if (b.assetId) return imgSrc(b, ctx);
if (b.src) return b.src;
var id = driveId(b.href);
return id ? "https://drive.google.com/thumbnail?id=" + id + "&sz=w600" : "";
}
function libTopics(p) {
var seen = {};
var out = [];
(p.items || []).forEach(function (b) {
(b.topics || []).forEach(function (t) {
t = String(t).trim();
if (t && !seen[t.toLowerCase()]) {
seen[t.toLowerCase()] = true;
out.push(t);
}
});
});
return out.sort(function (a, b) { return a.localeCompare(b); });
}
function galleryDefaults() {
return { layout: "grid", items: [], cols: 3, colsM: 2, gutter: 16, gutterM: 10, ratio: "auto", align: "start", rowH: 220, rowHM: 140, captions: true, zoom: true, transition: "fade", nav: "arrows", auto: 0, counter: true, snap: 2.5, freeM: "stack" };
}
function seqPages() {
return S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (q) { return q && q.kind !== "pin"; });
}
function sitePages() {
return seqPages().filter(function (q) { return !q.parent; });
}
function blogs() {
return seqPages().filter(function (q) { return q.blog; });
}
function postsOf(blogId) {
return seqPages().filter(function (q) { return q.parent === blogId; });
}
function postWords(q) {
var t = (q.els || []).map(function (e) {
if (e.type === "text") return e.props.html || "";
if (e.type === "quote") return e.props.html || "";
return "";
}).join(" ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
var w = t.split(/\s+/).filter(function (x) { return /[\w\u0600-\u06ff]/.test(x); }).length;
return w;
}
function postCover(q) {
var im = (q.els || []).filter(function (e) { return e.type === "image" && e.props.assetId; })[0];
if (im) return im.props;
var g = (q.els || []).filter(function (e) { return e.type === "gallery" && e.props.items && e.props.items.length; })[0];
return g ? g.props.items[0] : null;
}
function fmtDate(d) {
if (!d) return "";
var m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
if (!m) return d;
return parseInt(m[3], 10) + " " + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][parseInt(m[2], 10) - 1] + " " + m[1];
}
function forPage() {
var r = S.renderPage;
if (r && r.kind !== "pin") return r;
var seq = seqPages();
return seq[1] || seq[0] || null;
}
var BD_ARROWS = {
prev: '<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 11H4M10 4.5 3.5 11l6.5 6.5"/></svg>',
next: '<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11h15M12 4.5l6.5 6.5-6.5 6.5"/></svg>'
};
function postsList(p) {
var host = S.renderPage && S.renderPage.kind !== "pin" ? S.renderPage : null;
var bid = p.blog || (host && host.blog ? host.id : host && host.parent ? host.parent : (blogs()[0] || {}).id);
var list = bid ? postsOf(bid) : [];
if (p.sort === "newest") list = list.slice().sort(function (a, b) { return String(b.date || "").localeCompare(String(a.date || "")); });
var feat = null;
if (p.featured === "first" && list.length) feat = list[0];
if (p.featured === "marked") feat = list.filter(function (q) { return q.featured; })[0] || null;
if (feat) list = list.filter(function (q) { return q !== feat; });
var lim = parseInt(p.limit, 10);
if (lim > 0) list = list.slice(0, lim);
return { blog: bid, feat: feat, list: list };
}
function postCard(q, e, ctx, feat) {
var p = e.props;
var parts = [];
if (p.showImage) {
var cv = postCover(q);
var cs = cv ? imgSrc(cv, ctx) : "";
if (cs) parts.push('<span class="bd-post-img"><img src="' + esc(cs) + '" alt=""' + (ctx === "export" ? ' loading="lazy"' : ' draggable="false"') + "></span>");
}
var txt = [];
if (p.showTitle) txt.push('<span class="bd-post-t bd-ts-' + (feat ? E(e, "fTitleStyle") || "heading" : E(e, "titleStyle") || "body") + '">' + esc(q.h1 || q.title) + "</span>");
if (p.showDate && q.date) txt.push('<span class="bd-post-d bd-ts-' + (E(e, "metaStyle") || "small") + '">' + esc(fmtDate(q.date)) + "</span>");
if (p.showMeta) {
var w = postWords(q);
txt.push('<span class="bd-post-m bd-ts-' + (E(e, "metaStyle") || "small") + '">' + w + " words ~ " + Math.max(1, Math.ceil(w / 200)) + " min</span>");
}
if (p.showExcerpt && q.excerpt) txt.push('<span class="bd-post-x">' + esc(q.excerpt) + "</span>");
parts.push('<span class="bd-post-txt">' + txt.join("") + "</span>");
return '<a class="bd-post' + (feat ? " is-featured is-f-" + (p.fLayout || "stack") : "") + '" href="/' + esc(q.slug || "") + '">' + parts.join("") + "</a>";
}
function postsHTML(e, ctx) {
var p = e.props;
var L = postsList(p);
var cls = "bd-el bd-e-" + e.id + " bd-posts is-" + (p.layout || "grid") + " is-img-" + (E(e, "imagePos") || "top") + " is-hov-" + (E(e, "hover") || "none");
if (!L.blog) return ctx === "export" ? "" : '<div class="' + cls + '"><div class="bd-ed-gempty">Blog posts · add a blog in the Pages tab</div></div>';
if (!L.feat && !L.list.length) return ctx === "export" ? "" : '<div class="' + cls + '"><div class="bd-ed-gempty">No posts yet · add one with + Post</div></div>';
return '<div class="' + cls + '">\n' + (L.feat ? postCard(L.feat, e, ctx, true) + "\n" : "") + L.list.map(function (q) { return postCard(q, e, ctx, false); }).join("\n") + "\n</div>";
}
function menuBrandHTML(e) {
var p = e.props;
var b = p.brand || "none";
if (b === "none") return "";
var cls = "bd-mbrand bd-ts-" + (E(e, "brandStyle") || "body");
if (b === "page") {
var bp = forPage();
return '<span class="' + cls + '">' + esc(bp ? bp.h1 || bp.title : "Page title") + "</span>\n";
}
return '<a class="' + cls + '" href="/">' + esc(b === "custom" ? p.brandText || S.project.site.name : S.project.site.name) + "</a>\n";
}
function menuListHTML(e) {
var p = e.props;
var cur = forPage();
var groups = menuGroups(p.menu || S.project.site.nav.menu);
var heads = p.group === "sections";
return '<nav class="bd-mlist bd-ts-' + (E(e, "style") || "body") + " is-" + (p.dir === "horizontal" ? "horizontal" : "vertical") + " is-cur-" + (E(e, "current") || "none") + " is-hov-" + (E(e, "hover") || "none") + (heads ? " has-heads" : "") + '" aria-label="Menu">\n' + groups.map(function (g) {
return '<div class="bd-mgroup">\n' + (heads && g.label ? '<span class="bd-mhead">' + esc(g.label) + "</span>\n" : "") + "<ul>\n" + g.items.map(function (it) {
if (it.url) return '<li><a href="' + esc(it.url) + '"' + (it.ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(it.title) + "</a></li>";
return '<li><a href="/' + esc(it.slug) + '"' + (cur && it.page === cur.id ? ' class="is-current" aria-current="page"' : "") + ">" + esc(it.title) + "</a></li>";
}).join("\n") + "\n</ul>\n</div>";
}).join("\n") + "\n</nav>\n";
}
function elHTML(e, ctx) {
var p = e.props;
var base = "bd-el bd-e-" + e.id;
if (e.type === "ptitle") {
var tp = forPage();
return '<div class="' + base + " bd-ptitle bd-ts-" + (E(e, "style") || "body") + " is-al-" + (E(e, "align") || "left") + '">\n' + (p.num && tp && tp.num ? '<span class="bd-num">' + esc(tp.num) + "</span>\n" : "") + "<h1>" + esc(tp ? tp.h1 || tp.title : "Page title") + "</h1>\n</div>";
}
if (e.type === "posts") return postsHTML(e, ctx);
if (e.type === "postinfo") {
var ip = forPage();
var bits = [];
if (p.date && ip && ip.date) bits.push(esc(fmtDate(ip.date)));
var wc = ip ? postWords(ip) : 0;
if (p.words) bits.push(wc + " words");
if (p.time) bits.push(Math.max(1, Math.ceil(wc / 200)) + " min");
var bl = ip && ip.parent ? S.project.pages[ip.parent] : null;
var back = p.back ? '<a class="bd-postinfo-back" href="/' + esc(bl ? bl.slug || "" : "") + '">' + esc(p.backLabel || "<") + "</a>" : "";
return '<div class="' + base + " bd-postinfo bd-ts-" + (E(e, "style") || "small") + '">' + back + "<span>" + bits.join(p.words && p.time && !p.date ? " ~ " : " · ") + "</span></div>";
}
if (e.type === "quote") {
return '<blockquote class="' + base + " bd-quote bd-ts-" + (E(e, "style") || "body") + '">\n' + String(p.html || "") + "\n</blockquote>";
}
if (e.type === "toggle") {
return '<details class="' + base + " bd-toggle bd-ts-" + (E(e, "style") || "body") + " is-mark-" + (E(e, "marker") || "plus") + '"' + (p.open ? " open" : "") + ">\n<summary>" + esc(p.title || "") + "</summary>\n<ul>\n" + (p.items || []).map(function (x) { return "<li>" + x + "</li>"; }).join("\n") + "\n</ul>\n</details>";
}
if (e.type === "product") {
var psrc = p.assetId ? imgSrc(p, ctx) : "";
var pimg = psrc ? '<img src="' + esc(psrc) + '" alt="' + esc(p.alt || p.title) + '"' + (ctx === "export" ? ' loading="lazy"' : "") + ">" : (ctx === "export" ? "" : '<span class="bd-product-empty">Choose an image in the panel</span>');
var ptxt = '<div class="bd-product-t bd-ts-' + (E(e, "style") || "body") + '">' + esc(p.title) + (p.price ? "<br>" + esc(p.price) : "") + (p.note ? '<br><span class="bd-product-n">' + esc(p.note) + "</span>" : "") + "</div>";
var ptag = p.href ? "a" : "figure";
return "<" + ptag + ' class="' + base + ' bd-product"' + (p.href ? ' href="' + esc(p.href) + '"' : "") + ">\n" + pimg + "\n" + ptxt + "\n</" + ptag + ">";
}
if (e.type === "menubtn") {
var mc = " bd-menubtn is-mode-" + (p.mode === "list" ? "list" : "button") + " is-al-" + (p.align || "start") + " is-brand-" + (p.brandPos || "before");
if (p.corner === "right" || p.corner === "left") mc += " is-corner-" + p.corner;
var inner = p.mode === "list" ? menuListHTML(e) : '<span class="bd-mslot" data-bd-menu></span>';
return '<div class="' + base + mc + '">\n' + menuBrandHTML(e) + inner + "\n</div>";
}
if (e.type === "pager") {
var seq = sitePages();
var fp0 = forPage();
if (p.scope === "blog" && fp0 && fp0.parent) seq = postsOf(fp0.parent);
var cp = forPage();
var at = seq.indexOf(cp);
if (at < 0) return ctx === "export" ? "" : '<nav class="' + base + ' bd-pagerbar"></nav>';
var pv = seq[at - 1] || (p.loop ? seq[seq.length - 1] : null);
var nx = seq[at + 1] || (p.loop ? seq[0] : null);
if (pv === cp) pv = null;
if (nx === cp) nx = null;
if (p.look === "text") {
var tl = function (q, lab, cls) { return '<a class="' + cls + '" href="/' + esc(q.slug || "") + '">' + esc(lab) + esc(q.h1 || q.title) + "</a>"; };
var parts = [];
if (pv && p.prevLabel) parts.push(tl(pv, p.prevLabel, "bd-pagerbar-prev"));
if (nx && p.nextLabel !== "") parts.push(tl(nx, p.nextLabel || "", "bd-pagerbar-next"));
return '<div class="' + base + " bd-pagerbar is-text bd-ts-" + (E(e, "style") || "body") + " is-al-" + (E(e, "align") || "left") + (p.line ? " has-line" : "") + '">' + parts.join("\n") + "</div>";
}
var mid = p.num === "count" ? (at + 1) + " / " + seq.length : p.num === "title" ? (cp.h1 || cp.title) : p.num === "none" ? "" : (cp.num || "");
var lk = function (q, dir) { return '<a href="/' + esc(q.slug || "") + '" aria-label="' + (dir === "prev" ? "Previous: " : "Next: ") + esc(q.title) + '">' + BD_ARROWS[dir] + "</a>"; };
return '<nav class="' + base + " bd-pagerbar" + (p.line ? " has-line" : "") + '" aria-label="Pages">\n<span class="bd-pagerbar-prev">' + (pv ? lk(pv, "prev") : "") + '</span>\n<span class="bd-pagerbar-num">' + esc(mid) + '</span>\n<span class="bd-pagerbar-next">' + (nx ? lk(nx, "next") : "") + "</span>\n</nav>";
}
if (e.type === "library") {
var books = p.items || [];
var lcls = " bd-library" + (ON(e, "book") ? " is-book" : "") + (ON(e, "shadow") ? " has-shadow" : "") + " is-hov-" + (E(e, "hover") || "none");
if (!books.length) return ctx === "export" ? "" : '<div class="' + base + lcls + '"><div class="bd-ed-gempty">Library · add books in the panel</div></div>';
var topics = libTopics(p);
var bar = p.filters !== false && topics.length ? '<nav class="bd-lib-filter" aria-label="Topics">\n<button type="button" class="is-on" data-t="">' + esc(p.allLabel || "All") + "</button>\n" + topics.map(function (t) { return '<button type="button" data-t="' + esc(slugify(t)) + '">' + esc(t) + "</button>"; }).join("\n") + "\n</nav>\n" : "";
var cells = books.map(function (b) {
var src = libCover(b, ctx);
var tags = (b.topics || []).map(slugify).join(" ");
var cover = '<span class="bd-lib-cover">' + (src ? '<img src="' + esc(src) + '" alt="' + esc(b.title || "") + '"' + (ctx === "export" ? ' loading="lazy"' : ' draggable="false"') + ">" : '<span class="bd-lib-blank">' + esc(b.title || "Untitled") + "</span>") + "</span>";
var inner = cover + (p.titles ? '<span class="bd-lib-t">' + esc(b.title || "") + (b.author ? '<br><i>' + esc(b.author) + "</i>" : "") + "</span>" : "");
var attrs = ' data-t="' + esc(tags) + '" data-k="' + esc(b.id) + '"';
return b.href ? '<a class="bd-lib-item" href="' + esc(b.href) + '" target="_blank" rel="noopener"' + attrs + ' title="' + esc(b.title || "") + '">' + inner + "</a>" : '<div class="bd-lib-item"' + attrs + ">" + inner + "</div>";
}).join("\n");
return '<div class="' + base + lcls + '">\n' + bar + '<div class="bd-lib-grid">\n' + cells + "\n</div>\n</div>";
}
if (e.type === "text") {
var c = " bd-text";
var sty = textStyle(p);
if (sty !== "body") c += " is-" + sty;
if (p.indent) c += " has-indent";
if (p.align === "center") c += " is-center";
if (p.align === "right") c += " is-right";
return '<div class="' + base + c + '">\n' + String(p.html || "").replace(/<\/(p|h[1-6]|ul|ol|blockquote)>\s*(?=<)/g, "</$1>\n") + "\n</div>";
}
if (e.type === "notes") {
return '<ol class="' + base + ' bd-notes">\n' + (p.items || []).map(function (i) { return "<li>" + i + "</li>"; }).join("\n") + "\n</ol>";
}
if (e.type === "list") {
return '<section class="' + base + ' bd-list is-' + (p.style || "body") + '">\n' + (p.heading ? "<h2>" + p.heading + "</h2>\n" : "") + "<ul>\n" + (p.rows || []).map(function (r) { return "<li><span>" + (r[0] || "") + "</span><span>" + (r[1] || "") + "</span></li>"; }).join("\n") + "\n</ul>\n</section>";
}
if (e.type === "image") {
var src = imgSrc(p, ctx);
if (!p.assetId || !src) {
if (ctx === "export") return "";
return '<figure class="' + base + ' bd-figure is-empty">Choose an image in the panel</figure>';
}
return '<figure class="' + base + " bd-figure" + (p.fit === "cover" ? " is-cover" : "") + (p.zoom !== false && S.project.site.zoom ? " has-zoom" : "") + '">\n<img src="' + esc(src) + '" alt="' + esc(p.alt) + '"' + (ctx === "export" ? ' loading="lazy"' : "") + ">\n" + (p.caption ? "<figcaption>" + p.caption + "</figcaption>\n" : "") + "</figure>";
}
if (e.type === "gallery") {
var items = p.items || [];
if (!items.length) {
if (ctx === "export") return "";
return '<div class="' + base + ' bd-gallery is-grid"><div class="bd-ed-gempty">Gallery · add images in the panel</div></div>';
}
var gc = " bd-gallery is-" + p.layout + (p.captions ? "" : " has-nocap") + (p.zoom && p.layout !== "slides" ? " has-zoom" : "") + (p.layout === "slides" && p.transition === "slide" ? " is-slide" : "") + (p.layout === "slides" && p.nav === "zones" ? " has-zones" : "");
var attrs = p.layout === "slides" ? ' data-nav="' + p.nav + '" data-auto="' + (p.auto || 0) + '" data-counter="' + (p.counter ? 1 : 0) + '"' : "";
var figs = items.map(function (it, i) {
var src = imgSrc(it, ctx);
return '<figure class="bd-i-' + it.id + (p.layout === "slides" && i === 0 ? " is-on" : "") + '"><img src="' + esc(src) + '" alt="' + esc(it.alt) + '"' + (it.w ? ' width="' + it.w + '" height="' + it.h + '"' : "") + (ctx === "export" ? ' loading="lazy"' : ' draggable="false"') + ">" + (it.caption ? "<figcaption>" + it.caption + "</figcaption>" : "") + "</figure>";
}).join("\n");
return '<div class="' + base + gc + '"' + attrs + '>\n<div class="bd-gi">\n' + figs + "\n</div>\n</div>";
}
if (e.type === "link") {
var lc = p.style === "underline" ? " is-underline" : p.style === "arrow" ? " is-arrow" : "";
return '<a class="' + base + " bd-link" + lc + '" href="' + esc(p.href) + '"' + (p.newTab ? ' target="_blank" rel="noopener"' : "") + ">" + esc(p.text) + "</a>";
}
if (e.type === "embed") {
var es = embedSrc(p.url);
if (ctx === "export") {
if (!es) return "";
return '<div class="' + base + ' bd-embed">\n<iframe src="' + esc(es) + '" title="' + esc(p.title) + '" allow="fullscreen; picture-in-picture" loading="lazy"></iframe>\n</div>';
}
var host = es ? es.replace(/^https?:\/\/(www\.)?/, "").split("/")[0] : "Paste a YouTube or Vimeo link";
return '<div class="' + base + ' bd-embed is-placeholder">▶ ' + esc(host) + "</div>";
}
if (e.type === "html") {
return '<div class="' + base + ' bd-html">\n' + (p.code || "") + "\n</div>";
}
if (e.type === "rule") {
return '<hr class="' + base + ' bd-rule">';
}
return "";
}
function sortedEls(page, key) {
return page.els.slice().sort(function (a, b) {
var pa = a[key] || a.d;
var pb = b[key] || b.d;
return pa.y - pb.y || pa.x - pb.x;
});
}
function contentHTML(page, ctx) {
var flow = isMaster(page);
var html = function (list) { return list.map(function (e) { return elHTML(e, ctx); }).filter(Boolean).join("\n\n"); };
if (!flow) return '<div class="bd-grid">\n' + html(sortedEls(page, "d")) + "\n</div>";
var n = nCols(page);
if (n < 2) return '<div class="bd-flow">\n' + html(page.els) + "\n</div>";
var out = '<div class="bd-cols is-c' + n + (page.kind === "pin" || page.ownLayout ? " bd-cl-" + page.id : "") + '">';
for (var c = 1; c <= n; c++) {
out += '\n<div class="bd-col bd-flow" data-col="' + c + '">\n' + html(page.els.filter(function (e) { return colOf(e, page) === c; })) + "\n</div>";
}
return out + "\n</div>";
}
function pinsFor(page, place, fixed) {
return S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (p) {
if (!p || p.kind !== "pin" || p.id === page.id) return false;
if (p.pin.place !== place || !!p.pin.fixed !== fixed) return false;
return p.pin.show === "all" || (p.pin.pages || []).indexOf(page.id) > -1;
});
}
function pinHTML(p, ctx) {
return '<div class="bd-pin bd-p-' + p.id + " is-" + p.pin.place + (p.pin.fixed ? " is-fixed" : "") + '"' + (ctx === "edit" ? ' data-pin="' + p.id + '"' : "") + ">\n" + contentHTML(p, ctx === "edit" ? "view" : ctx) + "\n</div>";
}
function headHTML(page) {
var s = S.project.site;
if (!s.header || page.header === false || page.kind === "pin") return "";
return '<header class="bd-head">\n' + (page.num && s.showNum ? '<span class="bd-num">' + esc(page.num) + "</span>\n" : "") + "<h1>" + esc(page.h1 || page.title) + "</h1>\n</header>\n";
}
function relatedPages(page) {
return S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (p) {
return p && p.id !== page.id && (p.kind === "pin" || (page.stack || []).indexOf(p.id) > -1);
});
}
function pageHTML(page, ctx) {
var keep = S.renderPage;
S.renderPage = page;
var out = pageHTMLInner(page, ctx);
S.renderPage = keep;
return out;
}
function pageHTMLInner(page, ctx) {
var s = S.project.site;
var edit = ctx === "edit";
var top = pinsFor(page, "top", false).map(function (p) { return pinHTML(p, ctx); }).join("\n");
var bottom = pinsFor(page, "bottom", false).map(function (p) { return pinHTML(p, ctx); }).join("\n");
var fixed = pinsFor(page, "top", true).concat(pinsFor(page, "bottom", true)).map(function (p) { return pinHTML(p, ctx); }).join("\n");
var stack = (page.stack || []).map(function (id) { return S.project.pages[id]; }).filter(function (p) { return p && p.kind === "page"; }).map(function (p) {
return '<section class="bd-stack"' + (edit ? ' data-stack="' + p.id + '"' : "") + ">\n" + headHTML(p) + contentHTML(p, edit ? "view" : ctx) + "\n</section>";
}).join("\n");
var head = headHTML(page);
return (fixed ? fixed + "\n" : "") + '<div class="bd-panel">\n' + (top ? top + "\n" : "") + '<main class="bd-main">\n\n' + (head ? "<!-- HEADER -->\n" + head + "\n" : "") + "<!-- CONTENT -->\n" + contentHTML(page, ctx) + "\n" + (stack ? "\n<!-- STACKED -->\n" + stack + "\n" : "") + "\n</main>" + (bottom ? "\n" + bottom : "") + "\n</div>";
}
function pageHTMLOld(page, ctx) {
var s = S.project.site;
var head = "";
if (s.header && page.header !== false) {
head = '<header class="bd-head">\n' + (page.num && s.showNum ? '<span class="bd-num">' + esc(page.num) + "</span>\n" : "") + "<h1>" + esc(page.h1 || page.title) + "</h1>\n</header>\n";
}
var flow = isMaster(page);
var els = (flow ? page.els : sortedEls(page, "d")).map(function (e) { return elHTML(e, ctx); }).filter(Boolean).join("\n\n");
return '<div class="bd-panel">\n<main class="bd-main">\n\n' + (head ? "<!-- HEADER -->\n" + head + "\n" : "") + '<!-- CONTENT -->\n<div class="' + (flow ? "bd-flow" : "bd-grid") + '">\n' + els + "\n</div>\n\n</main>\n</div>";
}
function hasType(t) {
return S.project.order.some(function (id) { var p = S.project.pages[id]; return p && (p.els || []).some(function (e) { return e.type === t; }); });
}
function hasMenuButton() {
return S.project.order.some(function (id) { var p = S.project.pages[id]; return p && (p.els || []).some(function (e) { return e.type === "menubtn" && e.props.mode !== "list"; }); });
}
function chromeData(pageSlug) {
var s = S.project.site;
var pages = S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (p) { return p && p.kind !== "pin"; }).map(function (p) {
return { section: p.section, slug: p.slug, num: p.num, title: p.title };
});
return { site: s.name, menu: s.menu || hasMenuButton(), groups: menuGroups(s.nav.menu).map(function (g) { return { label: g.label, items: g.items.map(function (it) { return it.url ? { title: it.title, url: it.url, ext: !!it.ext } : { title: it.title, slug: it.slug }; }) }; }), pager: s.pager, nav: { icon: s.nav.icon, label: s.nav.label, openLabel: s.nav.openLabel, corner: s.nav.corner, headings: s.nav.headings, accordion: s.nav.accordion, current: s.nav.current, title: s.nav.title }, sections: s.sections, pages: pages, externals: s.externals, current: pageSlug };
}

/* SITE CHROME (EXPORTED AS-IS) */
function bdChrome(root, data, nav) {
var host = root.querySelector(".bd-site") || document.body;
var panel = root.querySelector(".bd-panel");
if (!panel) return;
var icons = {
burger: '<svg viewBox="0 0 28 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h20M4 12h20M4 18h20"/></svg>',
prev: '<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 11H4M10 4.5 3.5 11l6.5 6.5"/></svg>',
next: '<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11h15M12 4.5l6.5 6.5-6.5 6.5"/></svg>'
};
var pages = data.pages;
var index = -1;
for (var i = 0; i < pages.length; i++) {
if (pages[i].slug === data.current) index = i;
}
var section = index > -1 ? pages[index].section : "";
function make(tag, cls, html) {
var el = document.createElement(tag);
if (cls) el.className = cls;
if (html) el.innerHTML = html;
return el;
}
function href(p) {
return p.slug ? "/" + p.slug : "/";
}
function link(a, p) {
a.href = href(p);
if (nav) {
a.addEventListener("click", function (e) {
e.preventDefault();
nav(p.slug);
});
}
}
if (data.menu) {
var o = data.nav || {};
var menu = make("nav", "bd-menu is-cur-" + (o.current || "dim") + (o.headings === false ? " is-flat" : "") + (o.accordion === false ? " is-open-all" : "") + (o.title === "left" ? " is-title-left" : ""));
menu.setAttribute("aria-label", "Menu");
var list = make("div", "bd-menu-list");
(data.groups || []).forEach(function (gr) {
if (!gr.items.length && !gr.label) return;
var mine = gr.items.some(function (it) { return !it.url && it.slug === data.current; });
var group = make("div", "bd-menu-group" + (mine || !gr.label ? " is-open" : ""));
var ul = make("ul", "bd-menu-items");
if (gr.label) {
var head = make("button", "bd-menu-head");
head.type = "button";
head.textContent = gr.label;
head.setAttribute("aria-expanded", mine || o.accordion === false ? "true" : "false");
head.addEventListener("click", function () {
if (o.accordion === false) return;
var open = group.classList.toggle("is-open");
head.setAttribute("aria-expanded", open ? "true" : "false");
});
group.appendChild(head);
} else group.classList.add("is-plain");
gr.items.forEach(function (it) {
var li = make("li");
var a = make("a", !it.url && it.slug === data.current ? "is-current" : "");
a.textContent = it.title;
if (it.url) {
a.href = it.url;
if (it.ext) {
a.target = "_blank";
a.rel = "noopener";
}
} else link(a, { slug: it.slug });
li.appendChild(a);
ul.appendChild(li);
});
group.appendChild(ul);
list.appendChild(group);
});
var title = make("a", "bd-menu-title");
title.textContent = data.site;
var home = null;
for (var h = 0; h < pages.length; h++) {
if (pages[h].slug === "") home = pages[h];
}
link(title, home || { slug: "" });
menu.appendChild(list);
if (o.title !== "hide") menu.appendChild(title);
panel.appendChild(menu);
var burger = make("button", "bd-burger" + (o.corner === "left" ? " is-left" : ""));
burger.type = "button";
burger.setAttribute("aria-expanded", "false");
var face = function (open) {
if (o.icon === "text") burger.textContent = open && o.openLabel ? o.openLabel : (o.label || "Menu");
else burger.innerHTML = icons.burger;
};
face(false);
burger.setAttribute("aria-label", "Open menu");
var slot = root.querySelector("[data-bd-menu]");
if (slot) {
burger.className += " is-inline";
slot.appendChild(burger);
} else {
host.appendChild(burger);
}
var setMenu = function (open) {
host.classList.toggle("has-menu", open);
burger.setAttribute("aria-expanded", open ? "true" : "false");
burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
face(open);
if (data.onToggle) data.onToggle(open);
};
if (data.open) setMenu(true);
burger.addEventListener("click", function (e) {
e.stopPropagation();
setMenu(!host.classList.contains("has-menu"));
});
host.addEventListener("click", function (e) {
if (!host.classList.contains("has-menu")) return;
if (menu.contains(e.target) || burger.contains(e.target)) return;
setMenu(false);
});
if (!nav) {
document.addEventListener("keydown", function (e) {
if (e.key === "Escape") setMenu(false);
});
}
}
if (data.pager && index > -1) {
var pager = make("nav", "bd-pager");
pager.setAttribute("aria-label", "Pages");
var prev = pages[index - 1];
var next = pages[index + 1];
var slot = make("span", "bd-pager-prev");
if (prev) {
var pa = make("a", "", icons.prev);
link(pa, prev);
pa.setAttribute("aria-label", "Previous: " + prev.title);
slot.appendChild(pa);
}
pager.appendChild(slot);
pager.appendChild(make("span", "bd-pager-num", pages[index].num || ""));
if (next) {
var na = make("a", "bd-pager-next", icons.next);
link(na, next);
na.setAttribute("aria-label", "Next: " + next.title);
pager.appendChild(na);
}
panel.appendChild(pager);
}
}

/* GALLERY RUNTIME (EXPORTED AS-IS) */
function bdGalleries(root) {
var host = root.querySelector(".bd-site") || (root.classList && root.classList.contains("bd-site") ? root : document.body);
root.querySelectorAll(".bd-library").forEach(function (lib) {
var bar = lib.querySelector(".bd-lib-filter");
if (!bar) return;
bar.addEventListener("click", function (ev) {
var b = ev.target.closest("button");
if (!b) return;
var t = b.getAttribute("data-t");
bar.querySelectorAll("button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
lib.querySelectorAll(".bd-lib-item").forEach(function (it) {
var tags = (it.getAttribute("data-t") || "").split(" ");
it.classList.toggle("is-hidden", !!t && tags.indexOf(t) < 0);
});
});
});
root.querySelectorAll(".bd-gallery.is-slides").forEach(function (g) {
var figs = Array.prototype.slice.call(g.querySelectorAll(".bd-gi figure"));
if (!figs.length) return;
var at = 0;
var navType = g.getAttribute("data-nav") || "arrows";
var count = null;
function show(n) {
at = (n + figs.length) % figs.length;
figs.forEach(function (f, i) {
f.classList.toggle("is-on", i === at);
f.classList.toggle("is-past", i < at);
});
if (count) count.textContent = (at + 1) + " / " + figs.length;
}
if (navType === "arrows" || g.getAttribute("data-counter") === "1") {
var bar = document.createElement("div");
bar.className = "bd-slide-nav";
if (navType === "arrows") {
var prev = document.createElement("button");
prev.type = "button";
prev.textContent = "←";
prev.setAttribute("aria-label", "Previous image");
prev.addEventListener("click", function () { show(at - 1); });
var next = document.createElement("button");
next.type = "button";
next.textContent = "→";
next.setAttribute("aria-label", "Next image");
next.addEventListener("click", function () { show(at + 1); });
bar.appendChild(prev);
bar.appendChild(next);
}
if (g.getAttribute("data-counter") === "1") {
count = document.createElement("span");
bar.appendChild(count);
}
g.appendChild(bar);
}
if (navType === "zones" || navType === "single") {
g.querySelector(".bd-gi").addEventListener("click", function (e) {
var r = this.getBoundingClientRect();
if (navType === "single" || e.clientX > r.left + r.width / 2) show(at + 1);
else show(at - 1);
});
}
var auto = parseFloat(g.getAttribute("data-auto")) || 0;
if (auto > 0) setInterval(function () { show(at + 1); }, auto * 1000);
show(0);
});
root.addEventListener("click", function (e) {
var img = e.target.closest ? e.target.closest(".has-zoom img") : null;
if (!img) return;
var wrap = img.closest(".bd-gi");
var list = wrap ? Array.prototype.slice.call(wrap.querySelectorAll("img")) : [img];
var at = list.indexOf(img);
var box = document.createElement("div");
box.className = "bd-zoom";
box.setAttribute("role", "dialog");
box.setAttribute("aria-label", "Image");
var big = document.createElement("img");
var cap = document.createElement("div");
cap.className = "bd-zoom-cap";
box.appendChild(big);
box.appendChild(cap);
function show(n) {
at = (n + list.length) % list.length;
big.src = list[at].src;
big.alt = list[at].alt;
var fc = list[at].parentNode.querySelector("figcaption");
cap.textContent = fc ? fc.textContent : "";
}
function close() {
box.remove();
document.removeEventListener("keydown", key);
}
function key(ev) {
if (ev.key === "Escape") close();
if (ev.key === "ArrowRight") show(at + 1);
if (ev.key === "ArrowLeft") show(at - 1);
}
box.addEventListener("click", close);
document.addEventListener("keydown", key);
show(at);
host.appendChild(box);
});
}

/* EXPORT BUILDERS */
function ensurePhoneAll() {
S.project.order.forEach(function (id) {
var p = S.project.pages[id];
if (!isMaster(p)) ensurePhone(p);
});
}
function pinRules(phone) {
var out = [];
S.project.order.forEach(function (id) {
var p = S.project.pages[id];
if (p.kind !== "pin") return;
var h = phone ? p.pin.hM : p.pin.h;
var g = phone ? p.pin.gapM : p.pin.gap;
var sel = ".bd-pin.bd-p-" + p.id;
if (h !== "" && h != null && !isNaN(parseFloat(h))) out.push(sel + (p.pin.fixed ? " > div" : "") + " {\nheight: " + parseFloat(h) + "px;\n" + (p.pin.fixed ? "box-sizing: content-box;\n" : "") + "}");
if (g !== "" && g != null && !isNaN(parseFloat(g))) out.push(".bd-panel > " + sel + " {\nmargin-" + (p.pin.place === "bottom" ? "top" : "bottom") + ": " + parseFloat(g) + "px;\n}");
});
return out.join("\n");
}
function exportCSS() {
var s = S.project.site;
var pages = S.project.order.map(function (id) { return S.project.pages[id]; });
var out = [baseCSS(s, "export")];
out.push("/* MASTER */\n" + masterRules(s, false) + "\n");
out.push("/* COLUMNS */\n" + colRules(false) + "\n");
var pr = pinRules(false);
if (pr) out.push("/* HEADER + FOOTER */\n" + pr + "\n");
pages.forEach(function (p) {
var r = layoutRules(p, false);
if (r) out.push("/* PAGE: " + (p.title || p.slug).toUpperCase().replace(/\*\//g, "") + " */\n" + r + "\n");
});
var cs = cssSplit(s.css);
if (cs.desk.trim()) out.push("/* CUSTOM */\n" + cs.desk.trim() + "\n");
var mob = [mobileRules(s, ":root"), "/* MASTER */\n" + masterRules(s, true), "/* COLUMNS */\n" + colRules(true)];
var prm = pinRules(true);
if (prm) mob.push("/* HEADER + FOOTER */\n" + prm);
pages.forEach(function (p) {
var r = layoutRules(p, true);
if (r) mob.push("/* PAGE: " + (p.title || p.slug).toUpperCase().replace(/\*\//g, "") + " */\n" + r);
});
if (cs.mob.trim()) mob.push("/* CUSTOM */\n" + cs.mob.trim());
out.push("/* MOBILE */\n@media (max-width: 760px) {\n" + mob.join("\n") + "\n}\n");
return out.join("\n");
}
function exportJS() {
var d = chromeData("");
delete d.current;
return "/* DATA */\nvar BD_DATA = " + JSON.stringify(d, null, 0).replace(/\},\{/g, "},\n{") + ";\n\n/* CHROME */\n" + bdChrome.toString() + "\n\n/* GALLERIES */\n" + bdGalleries.toString() + "\n\n/* START */\ndocument.addEventListener(\"DOMContentLoaded\", function () {\nvar data = Object.assign({}, BD_DATA, { current: document.body.getAttribute(\"data-bd-page\") || \"\" });\nbdChrome(document, data);\nbdGalleries(document);\n});\n";
}
function exportPage(page) {
var s = S.project.site;
var title = page.slug === "" && !page.h1 ? s.name : (page.title + " — " + s.name);
return "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>" + esc(title) + "</title>\n" + (page.desc ? '<meta name="description" content="' + esc(page.desc) + '">\n' : "") + '<link rel="stylesheet" href="/assets/bd.css">\n' + (s.head && s.head.trim() ? "<!-- HEAD -->\n" + s.head.trim() + "\n" : "") + (!isSpread(s) && isSpreadPage(page) ? "<style>\n/* SPREAD */\n:root {\n--bd-w: 100%;\n}\n</style>\n" : "") + (page.css && page.css.trim() ? "<style>\n/* PAGE */\n" + page.css.trim() + "\n</style>\n" : "") + '<script src="/assets/bd.js" defer><\/script>\n</head>\n<body class="bd-site" data-bd-page="' + esc(page.slug) + '">\n' + pageHTML(page, "export") + "\n</body>\n</html>\n";
}
function export404() {
var s = S.project.site;
return "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>Not found — " + esc(s.name) + '</title>\n<meta name="robots" content="noindex">\n<link rel="stylesheet" href="/assets/bd.css">\n<script src="/assets/bd.js" defer><\/script>\n</head>\n<body class="bd-site" data-bd-page="404">\n<div class="bd-panel">\n<main class="bd-main">\n\n<!-- HEADER -->\n<header class="bd-head">\n<span class="bd-num">—</span>\n<h1>Not found</h1>\n</header>\n\n<!-- CONTENT -->\n<div class="bd-grid">\n<div class="bd-el bd-text" style="grid-column: 1 / -1;">\n<p><a href="/">Return to the beginning.</a></p>\n</div>\n</div>\n\n</main>\n</div>\n</body>\n</html>\n';
}

/* PHONE LAYOUT */
function ensurePhone(page) {
var cols = S.project.site.colsM;
var missing = page.els.filter(function (e) { return !e.m; });
if (!missing.length) return false;
var bottom = 0;
page.els.forEach(function (e) {
if (e.m) bottom = Math.max(bottom, e.m.y + e.m.h);
});
var y = bottom ? bottom + 3 : 0;
sortedEls({ els: missing }, "d").forEach(function (e) {
var h = e.d.h;
if (e.type === "text" || e.type === "notes" || e.type === "list") h = Math.max(2, Math.round(e.d.h * Math.min(2.2, S.project.site.cols / Math.max(1, e.d.w) * 0.55 + 0.5)));
if (e.type === "image") h = Math.max(4, Math.round(e.d.h * 0.7));
e.m = { x: 0, y: y, w: cols, h: h };
y += h + 3;
});
return true;
}
function restackPhone(page) {
page.els.forEach(function (e) { e.m = null; });
ensurePhone(page);
}
/* LOOKUPS */
function curPage() {
return S.project ? S.project.pages[S.pageId] : null;
}
function posKey() {
return S.mode === "phone" ? "m" : "d";
}
function gridCols() {
return S.mode === "phone" ? S.project.site.colsM : S.project.site.cols;
}
function selEl() {
var p = curPage();
if (!p || !S.sel) return null;
for (var i = 0; i < p.els.length; i++) {
if (p.els[i].id === S.sel) return p.els[i];
}
return null;
}
function bottomOf(page, key) {
var b = 0;
page.els.forEach(function (e) {
var p = e[key];
if (p) b = Math.max(b, p.y + p.h);
});
return b;
}
function uniqueSlug(base, exceptId) {
base = slugify(base) || "page";
var taken = {};
S.project.order.forEach(function (id) {
if (id !== exceptId) taken[S.project.pages[id].slug] = true;
});
var s = base;
var n = 2;
while (taken[s]) {
s = base + "-" + n;
n++;
}
return s;
}
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

/* HISTORY */
function stateJSON() {
return JSON.stringify({ site: S.project.site, order: S.project.order, pages: S.project.pages });
}
function snap() {
if (!S.project) return;
S.undo.push(stateJSON());
if (S.undo.length > 80) S.undo.shift();
S.redo = [];
}
function restore(json) {
var o = JSON.parse(json);
S.project.site = o.site;
S.project.order = o.order;
S.project.pages = o.pages;
S.project.name = o.site.name;
normalizeProject(S.project);
if (!S.project.pages[S.pageId]) S.pageId = S.project.order[0];
if (!selEl()) S.sel = null;
}
function doUndo() {
if (S.live) endEdit();
if (!S.undo.length) return;
S.redo.push(stateJSON());
restore(S.undo.pop());
changed();
}
function doRedo() {
if (!S.redo.length) return;
S.undo.push(stateJSON());
restore(S.redo.pop());
changed();
}
function changed(opts) {
scheduleSave();
render(opts);
}

/* GITHUB */
var SITES = window.BD_SITES || [];
var HOST_REPO = window.BD_HOST || "";
var REPO = (function () {
var want = lsGet("bd-site-current");
return SITES.filter(function (x) { return x.repo === want; })[0] || SITES.filter(function (x) { return x.repo === HOST_REPO; })[0] || SITES[0] || {};
})();
var LIVE_BASE = REPO.repo === HOST_REPO ? "" : "https://" + REPO.domain;
var GH_API = "https://api.github.com/repos/" + REPO.owner + "/" + REPO.repo;
var GH_BRANCH = REPO.branch || "main";
var GH_KEY_STORE = "bd-gh-key";
var DRAFT_STORE = "bd-draft-" + REPO.repo;
var SITE_FILE = "content/site.json";
var MANIFEST_FILE = "content/manifest.json";
var OUT = "site/";
var KEEP = ["site/admin.html", "site/404.html"];
var LIVE_POLL_MS = 4000;
var LIVE_GIVE_UP_MS = 240000;
var BLANK_IMG = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
S.key = lsGet(GH_KEY_STORE) || "";
S.base = null;
S.published = "";
S.liveMem = {};
S.loadingBlob = {};
S.files = {};
S.fileList = null;
S.filePath = "";
S.uploads = [];
S.generated = [];
S.inspect = false;
S.ins = null;
S.open = {};
document.addEventListener("toggle", function (e) {
var d = e.target;
if (d && d.getAttribute && d.getAttribute("data-key")) S.open[d.getAttribute("data-key")] = d.open;
}, true);
function lsDel(k) {
try {
localStorage.removeItem(k);
} catch (e) {}
}
function gh(method, url, body) {
var ctl = method === "GET" && window.AbortController ? new AbortController() : null;
var timer = ctl ? setTimeout(function () { ctl.abort(); }, 30000) : null;
return fetch(url.indexOf("http") === 0 ? url : GH_API + url, {
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
var err = new Error((j && j.message) || ("HTTP " + r.status));
err.status = r.status;
throw err;
}
return j;
});
});
}
function b64ToBytes(b) {
var bin = atob(String(b).replace(/\n/g, ""));
var bytes = new Uint8Array(bin.length);
for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
return bytes;
}
function b64ToText(b) {
return new TextDecoder("utf-8").decode(b64ToBytes(b));
}
function blobToB64(blob) {
return new Promise(function (res, rej) {
var r = new FileReader();
r.onload = function () { res(String(r.result).split(",")[1] || ""); };
r.onerror = function () { rej(r.error); };
r.readAsDataURL(blob);
});
}
async function ghFile(path) {
try {
var j = await gh("GET", "/contents/" + path + "?ref=" + GH_BRANCH);
var b64 = j.content;
if (!b64 && j.sha) b64 = (await gh("GET", "/git/blobs/" + j.sha)).content;
return { sha: j.sha, text: b64ToText(b64 || "") };
} catch (err) {
if (err.status === 404) return null;
throw err;
}
}
function allImages(pr) {
var list = [];
(pr || S.project).order.forEach(function (id) {
var pg = (pr || S.project).pages[id];
if (!pg) return;
pg.els.forEach(function (e) {
if ((e.type === "image" || e.type === "product") && e.props.file) list.push(e.props);
if (e.type === "gallery" || e.type === "library") (e.props.items || []).forEach(function (it) { if (it.file) list.push(it); });
});
});
return list;
}
function loadBlob(p) {
var id = p.assetId;
if (S.loadingBlob[id] || !S.key) return;
S.loadingBlob[id] = true;
gh("GET", "/git/blobs/" + id.slice(4)).then(function (j) {
var blob = new Blob([b64ToBytes(j.content)], { type: guessType(p.file) || "image/jpeg" });
S.mem[id] = { url: URL.createObjectURL(blob), blob: blob };
clearTimeout(S.blobTimer);
S.blobTimer = setTimeout(function () { renderCanvas(); if (S.sel) renderRight(); }, 60);
}).catch(function () {});
}

function repoImage(img) {
var m = /\/images\/([^?#]+)$/.exec(img.getAttribute("src") || "");
if (!m || img.getAttribute("data-bd-tried") || !S.key) return;
img.setAttribute("data-bd-tried", "1");
var file = decodeURIComponent(m[1]);
if (S.liveMem[file]) {
img.src = S.liveMem[file];
return;
}
gh("GET", "/contents/" + OUT + "images/" + encodeURIComponent(file) + "?ref=" + GH_BRANCH).then(function (j) {
return j.content ? j.content : gh("GET", "/git/blobs/" + j.sha).then(function (b) { return b.content; });
}).then(function (b64) {
var blob = new Blob([b64ToBytes(b64)], { type: guessType(file) || "image/jpeg" });
S.liveMem[file] = URL.createObjectURL(blob);
img.src = S.liveMem[file];
}).catch(function () {});
}

/* KEY */
function lock(why) {
lsDel(GH_KEY_STORE);
S.key = "";
var g = $("bd-gate");
g.hidden = false;
var m = $("bd-gate-msg");
m.textContent = why || "";
m.classList.toggle("is-warn", !!why);
}
async function connect() {
var k = $("bd-gate-key").value.trim();
var m = $("bd-gate-msg");
if (!k) {
m.textContent = "Paste the key first.";
m.classList.add("is-warn");
return;
}
S.key = k;
m.textContent = "Checking…";
m.classList.remove("is-warn");
try {
var r = await gh("GET", "");
if (!r.permissions || !r.permissions.push) throw new Error("This key can read but not publish. Give it Contents: Read and write.");
lsSet(GH_KEY_STORE, k);
$("bd-gate-key").value = "";
$("bd-gate").hidden = true;
loadSite();
} catch (err) {
S.key = "";
m.textContent = err.message === "KEY" ? "GitHub did not accept that key." : err.message;
m.classList.add("is-warn");
}
}

/* SAVING — DRAFT LIVES IN THIS BROWSER UNTIL YOU PUBLISH */
function setStatus(text, warn) {
S.status = text;
S.statusWarn = !!warn;
var el = document.querySelector(".bd-ed-status");
if (el) {
el.textContent = text;
el.classList.toggle("is-warn", !!warn);
el.title = "Edits are kept in this browser until you press Publish";
}
}
function scheduleSave() {
if (!S.project) return;
clearTimeout(S.saveTimer);
S.saveTimer = setTimeout(saveNow, 400);
}
async function saveNow() {
if (!S.project || S.publishing) return;
clearTimeout(S.saveTimer);
if (!hasDraft()) {
lsDel(DRAFT_STORE);
if (S.status === "Not published") setStatus("Published");
return;
}
var files = {};
dirtyFiles().forEach(function (p) { files[p] = S.files[p]; });
try {
localStorage.setItem(DRAFT_STORE, JSON.stringify({ base: S.base, at: Date.now(), data: stateJSON(), files: files, uploads: S.uploads }));
setStatus("Not published");
} catch (e) {
setStatus("Not published · draft too big to keep", true);
}
}
function hasDraft() {
return !!S.project && (stateJSON() !== S.published || dirtyFiles().length > 0 || S.uploads.length > 0);
}
window.addEventListener("beforeunload", function (e) {
if (hasDraft() && !lsGet(DRAFT_STORE)) {
e.preventDefault();
e.returnValue = "";
}
});

/* SITE */
async function loadSite() {
S.booting = true;
S.loadError = "";
S.files = {};
S.fileList = null;
S.filePath = "";
S.uploads = [];
render();
var file = null;
try {
file = await ghFile(SITE_FILE);
var man = await ghFile(MANIFEST_FILE);
try {
S.generated = man ? (JSON.parse(man.text).pages || []) : [];
} catch (e) {
S.generated = [];
}
} catch (err) {
S.booting = false;
if (err.message === "KEY") {
lock("That GitHub key no longer works. Make a new one.");
return;
}
S.loadError = err.message;
render();
return;
}
var data = null;
if (file) {
try {
data = JSON.parse(file.text);
} catch (e) {
S.booting = false;
S.loadError = SITE_FILE + " is not valid JSON. Fix it on GitHub, then reload.";
render();
return;
}
}
try {
await openLoaded(file, data);
} catch (err) {
S.booting = false;
S.loadError = "Couldn't open the site: " + (err && err.message ? err.message : err);
render();
}
}
async function openLoaded(file, data) {
var p = data ? { id: data.id || "site", name: data.name || (data.site && data.site.name) || REPO.name, site: data.site, order: data.order || [], pages: data.pages || {} } : blankProject();
if (!data) {
p.site.name = REPO.name || p.site.name;
p.name = p.site.name;
}
S.base = file ? file.sha : null;
setProject(p);
S.published = data ? stateJSON() : "";
var draft = null;
try {
draft = JSON.parse(lsGet(DRAFT_STORE) || "null");
} catch (e) {}
var hasFiles = draft && ((draft.files && Object.keys(draft.files).length) || (draft.uploads && draft.uploads.length));
if (draft && draft.data && (draft.data !== S.published || hasFiles)) {
if (draft.base === S.base) {
try {
if (draft.data !== S.published) restore(draft.data);
S.files = draft.files || {};
S.uploads = draft.uploads || [];
toast("Your unpublished changes are back.");
} catch (err) {
var fresh = JSON.parse(file.text);
setProject({ id: fresh.id || "site", name: fresh.name || (fresh.site && fresh.site.name) || REPO.name, site: fresh.site, order: fresh.order || [], pages: fresh.pages || {} });
lsSet(DRAFT_STORE + "-backup", lsGet(DRAFT_STORE));
lsDel(DRAFT_STORE);
toast("Couldn't reopen your last draft, so the published version is open. The draft is kept as a backup.");
}
} else {
lsSet(DRAFT_STORE + "-backup", lsGet(DRAFT_STORE));
lsDel(DRAFT_STORE);
toast("The site changed on GitHub after your last draft. Opened the published version; the old draft is kept as a backup.");
}
}
S.booting = false;
render();
setStatus(hasDraft() ? "Not published" : "Published");
}
function setProject(p) {
normalizeProject(p);
S.project = p;
var home = p.order.filter(function (id) { return p.pages[id] && p.pages[id].slug === "" && p.pages[id].kind !== "pin"; })[0];
S.pageId = home || p.order[0];
S.sel = null;
S.undo = [];
S.redo = [];
ensureFont(p.site.sans);
ensureFont(p.site.mono);
}
function discardDraft() {
lsDel(DRAFT_STORE);
S.confirm = null;
closePop();
loadSite();
}

/* RENDER */
function render(opts) {
opts = opts || {};
renderTop();
if (!opts.skipLeft) renderLeft();
renderCanvas();
if (!opts.skipRight) renderRight();
if (!opts.skipCode) renderCode();
}
function renderTop() {
var t = $("bd-top");
if (!S.project) {
t.innerHTML = '<span class="bd-ed-brand">Back office</span><span class="bd-ed-brand">' + esc(REPO.domain || "") + '</span><div class="bd-ed-top-mid"></div><span class="bd-ed-status"></span>';
return;
}
var phone = S.mode === "phone";
t.innerHTML = '<button class="bd-ed-btn is-icon bd-ed-narrow" data-act="toggle-left" aria-label="Pages and site">' + I.panel + '</button>'
+ '<span class="bd-ed-brand">Back office</span>'
+ '<button class="bd-ed-btn" data-act="projects" aria-haspopup="true"><span class="bd-ed-hide-narrow">' + esc(REPO.domain || S.project.site.name) + '</span>' + I.chev + "</button>"
+ '<div class="bd-ed-top-mid"><div class="bd-ed-seg" role="group" aria-label="Layout">'
+ '<button data-act="mode" data-val="desk" class="' + (phone ? "" : "is-on") + '" aria-pressed="' + !phone + '">' + I.desk + '<span class="bd-ed-hide-narrow">Desktop</span></button>'
+ '<button data-act="mode" data-val="phone" class="' + (phone ? "is-on" : "") + '" aria-pressed="' + phone + '">' + I.phone + '<span class="bd-ed-hide-narrow">Phone</span></button>'
+ "</div></div>"
+ '<button class="bd-ed-btn is-icon" data-act="undo" aria-label="Undo"' + (S.undo.length ? "" : " disabled") + ">" + I.undo + "</button>"
+ '<button class="bd-ed-btn is-icon" data-act="redo" aria-label="Redo"' + (S.redo.length ? "" : " disabled") + ">" + I.redo + "</button>"
+ '<button class="bd-ed-btn' + (S.codeOpen ? " is-on" : "") + '" data-act="code">' + I.code + '<span class="bd-ed-hide-narrow">Code</span></button>'
+ '<button class="bd-ed-btn' + (S.preview && !S.inspect ? " is-on" : "") + '" data-act="preview">' + I.eye + '<span class="bd-ed-hide-narrow">Preview</span></button>'
+ '<button class="bd-ed-btn is-primary" data-act="export"' + (S.publishing ? " disabled" : "") + ">" + I.up + '<span class="bd-ed-hide-narrow">' + (S.publishing ? "Publishing…" : "Save & publish") + "</span></button>"
+ '<span class="bd-ed-status bd-ed-hide-narrow"></span>'
+ '<button class="bd-ed-btn is-icon bd-ed-narrow" data-act="toggle-right" aria-label="Inspector">' + I.sliders + "</button>";
setStatus(S.status || "Saved", S.statusWarn);
}

/* LEFT PANEL */
function field(label, inner) {
return '<label class="bd-ed-field"><span class="bd-ed-label">' + label + "</span>" + inner + "</label>";
}
function input(path, val, type, extra) {
return '<input class="bd-ed-input" data-bind="' + path + '"' + (type ? ' data-type="' + type + '"' : "") + ' value="' + esc(val) + '"' + (extra || "") + ">";
}
function numIn(label, path, val, type) {
return field(label, '<input class="bd-ed-input bd-ed-n" inputmode="decimal" data-bind="' + path + '" data-type="' + (type || "num") + '" value="' + esc(val) + '">');
}
/* ONE FIELD THAT EDITS THE DESKTOP VALUE ON DESKTOP AND THE PHONE VALUE ON PHONE */
function dpIn(label, pathD, pathM, vD, vM, type) {
var ph = S.mode === "phone";
return field(label + (ph ? ' <b class="bd-ed-ph">phone</b>' : ""), '<input class="bd-ed-input bd-ed-n" inputmode="decimal" data-bind="' + (ph ? pathM : pathD) + '" data-type="' + (type || "num") + '" value="' + esc(ph ? vM : vD) + '"' + (ph && vD !== "" && vD != null ? ' placeholder="' + esc(vD) + '"' : "") + ">");
}
function row() {
return '<div class="bd-ed-row">' + Array.prototype.slice.call(arguments).join("") + "</div>";
}
function adv(key, title, inner, open) {
var o = S.open[key] != null ? S.open[key] : !!open;
return '<details class="bd-ed-adv" data-key="' + key + '"' + (o ? " open" : "") + "><summary>" + title + "</summary>" + inner + "</details>";
}
function sw(label, path, on) {
return '<div class="bd-ed-toggle"><span>' + label + '</span><button class="bd-ed-switch' + (on ? " is-on" : "") + '" data-act="set" data-path="' + path + '" data-val="' + (!on) + '" data-vtype="bool" role="switch" aria-checked="' + !!on + '" aria-label="' + label + '"></button></div>';
}
function seg(path, cur, opts) {
return '<div class="bd-ed-seg">' + opts.map(function (o) {
return '<button data-act="set" data-path="' + path + '" data-val="' + o[0] + '" class="' + (String(cur) === String(o[0]) ? "is-on" : "") + '">' + o[1] + "</button>";
}).join("") + "</div>";
}
function select(path, cur, opts) {
return '<select class="bd-ed-input" data-bind="' + path + '">' + opts.map(function (o) {
var v = Array.isArray(o) ? o[0] : o;
var l = Array.isArray(o) ? o[1] : o;
return '<option value="' + esc(v) + '"' + (String(v) === String(cur) ? " selected" : "") + ">" + esc(l) + "</option>";
}).join("") + "</select>";
}
function chips(path, list) {
return '<div class="bd-ed-actions">' + list.map(function (c) {
return '<button class="bd-ed-btn" style="min-width:32px;justify-content:center" data-act="set" data-path="' + path + '" data-val="' + esc(c) + '">' + esc(c) + "</button>";
}).join("") + "</div>";
}
function colorIn(label, path, val, fallback) {
return field(label, '<div class="bd-ed-list-row" style="grid-template-columns:minmax(0,1fr) auto"><input type="color" class="bd-ed-input" data-bind="' + path + '" value="' + esc(val || fallback) + '"><button class="bd-ed-btn" style="height:30px" data-act="set" data-path="' + path + '" data-val="">' + (val ? "Reset" : "Ink") + "</button></div>");
}
function navPanel(inBlock) {
var s = S.project.site;
var n = s.nav;
var h = '<div class="bd-ed-sec"><span class="bd-ed-label">Button</span>'
+ (inBlock ? "" : sw("Floating menu button", "site.menu", s.menu))
+ sw("Show it open here", "ui.menuOpen", !!S.menuOpen)
+ field("Face", seg("site.nav.icon", n.icon, [["lines", "Lines"], ["text", "Text or symbol"]]));
if (n.icon === "text") {
h += field("Label", input("site.nav.label", n.label, "", ' placeholder="☰  menu  index;  +"'))
+ chips("site.nav.label", ["☰", "≡", "+", "○", "●", "✳", "※", "→", "menu", "index;", "Menu"])
+ field("Label while open", input("site.nav.openLabel", n.openLabel, "", ' placeholder="×  close"'))
+ chips("site.nav.openLabel", ["×", "−", "✕", "←", "close", "Close"]);
}
h += row(field("Font", seg("site.nav.btnFont", n.btnFont, [["sans", "Main"], ["mono", "Mono"]])), numIn("Size", "site.nav.btnSize", n.btnSize))
+ colorIn("Colour", "site.nav.btnColor", n.btnColor, s.colors.ink)
+ field("Case", seg("site.nav.btnCase", n.btnCase, [["none", "As typed"], ["uppercase", "UPPER"], ["lowercase", "lower"]]))
+ (inBlock ? "" : field("Corner", seg("site.nav.corner", n.corner, [["left", "Top left"], ["right", "Top right"]]))
+ row(dpIn("From top", "site.nav.btnTop", "site.nav.btnTopM", n.btnTop, n.btnTopM, "int"), dpIn("From side", "site.nav.btnSide", "site.nav.btnSideM", n.btnSide, n.btnSideM, "int")))
+ "</div>";
h += '<div class="bd-ed-sec"><span class="bd-ed-label">' + (inBlock ? "Overlay" : "Menu") + "</span>"
+ row(dpIn("Links start from top", "site.nav.menuTop", "site.nav.menuTopM", n.menuTop, n.menuTopM, "blank"))
+ field("Font", seg("site.nav.font", n.font, [["sans", "Main"], ["mono", "Mono"]]))
+ row(dpIn("Size (0 = body)", "site.nav.size", "site.nav.sizeM", n.size, n.sizeM), dpIn("Line", "site.nav.lh", "site.nav.lhM", n.lh, n.lhM))
+ colorIn("Colour", "site.nav.color", n.color, s.colors.ink)
+ row(field("Case", select("site.nav.navCase", n.navCase, [["none", "As typed"], ["uppercase", "UPPER"], ["lowercase", "lower"]])), numIn("Spacing (em)", "site.nav.tracking", n.tracking))
+ sw("Show headings from the menu", "site.nav.headings", n.headings)
+ (n.headings ? sw("Fold sections", "site.nav.accordion", n.accordion) : "")
+ numIn("Indent items (px)", "site.nav.indent", n.indent, "int")
+ field("Current page", seg("site.nav.current", n.current, [["dim", "Dim"], ["underline", "Line"], ["strike", "Strike"], ["arrow", "→"]]))
+ field("Site name inside the overlay", seg("site.nav.title", n.title, [["left", "Left"], ["right", "Right"], ["hide", "Hide"]]))
+ field("Page behind menu · " + Math.round(n.fade * 100) + "%", '<input type="range" min="0" max="1" step="0.02" data-bind="site.nav.fade" data-type="num" value="' + n.fade + '" aria-label="Page opacity behind menu">')
+ colorIn("Backdrop", "site.nav.bg", n.bg, s.colors.panel)
+ (n.bg ? field("Backdrop strength · " + Math.round(n.bgAlpha * 100) + "%", '<input type="range" min="0" max="1" step="0.02" data-bind="site.nav.bgAlpha" data-type="num" value="' + n.bgAlpha + '" aria-label="Backdrop strength">') : "")
+ "</div>";
return h;
}
function masterPanel() {
var s = S.project.site;
var m = s.master;
var h = '<div class="bd-ed-hint">Spacing and the default place of each block type inside a column, on a ' + (S.mode === "phone" ? s.colsM : s.cols) + "-unit grid.</div>"
+ row(dpIn("Space between blocks", "site.master.space", "site.master.spaceM", m.space, m.spaceM, "int"))
+ row(dpIn("Title indent (units)", "site.master.headX", "site.master.headXM", m.headX, m.headXM, "int"), dpIn("Space under title", "site.master.headSpace", "site.master.headSpaceM", m.headSpace, m.headSpaceM, "int"));
Object.keys(BD_TYPE_CLASS).forEach(function (k) {
var t = m.types[k];
var p = "site.master.types." + k;
h += '<div class="bd-ed-mrow"><span>' + BD_TYPE_NAME[k] + "</span>" + row(dpIn("Start", p + ".x", p + ".xm", t.x, t.xm, "int"), dpIn("Width", p + ".w", p + ".wm", t.w, t.wm, "int"), dpIn("Space above", p + ".space", p + ".spaceM", t.space, t.spaceM, "blank")) + "</div>";
});
h += '<button class="bd-ed-btn" data-act="all-master">Make every page follow the master</button>';
return h;
}
function galleryPanel(g) {
var p = "el";
var h = field("Layout", select(p + ".layout", g.layout, [["grid", "Grid"], ["columns", "Columns"], ["justify", "Justify"], ["free", "Freeform"], ["slides", "Slideshow"]]));
if (g.layout === "grid" || g.layout === "columns") h += row(dpIn("Columns", p + ".cols", p + ".colsM", g.cols, g.colsM, "int"), g.layout !== "slides" ? dpIn("Gutter", p + ".gutter", p + ".gutterM", g.gutter, g.gutterM, "int") : "");
if (g.layout === "grid") h += row(field("Crop", select(p + ".ratio", g.ratio, [["auto", "Original"], ["1", "Square"], ["4/3", "4 : 3"], ["3/2", "3 : 2"], ["16/9", "16 : 9"], ["3/4", "3 : 4"]])), field("Align", select(p + ".align", g.align, [["start", "Top"], ["center", "Middle"], ["end", "Bottom"]])));
if (g.layout === "justify") h += row(dpIn("Row height", p + ".rowH", p + ".rowHM", g.rowH, g.rowHM, "int"), dpIn("Gutter", p + ".gutter", p + ".gutterM", g.gutter, g.gutterM, "int"));
if (g.layout === "free") h += row(field("Snap", select(p + ".snap", g.snap, [["0", "Off"], ["1", "1%"], ["2.5", "2.5%"], ["5", "5%"], ["10", "10%"]])), field("On phones", select(p + ".freeM", g.freeM, [["stack", "Stack"], ["scale", "Keep layout"]]))) + '<div class="bd-ed-hint">Drag images inside the gallery; pull the corner square to resize.</div>';
if (g.layout === "slides") h += row(field("Transition", select(p + ".transition", g.transition, [["fade", "Fade"], ["slide", "Slide"]])), field("Navigation", select(p + ".nav", g.nav, [["arrows", "Arrows"], ["zones", "Click sides"], ["single", "Click to advance"], ["none", "None"]])), numIn("Autoplay (s)", p + ".auto", g.auto)) + sw("Counter", p + ".counter", g.counter);
h += sw("Captions", p + ".captions", g.captions) + (g.layout !== "slides" ? sw("Click to zoom", p + ".zoom", g.zoom) : "");
h += '<div class="bd-ed-head"><span class="bd-ed-label">' + g.items.length + " image" + (g.items.length === 1 ? "" : "s") + '</span><button class="bd-ed-btn" style="height:26px" data-act="pick-image">' + I.plus + "Add</button></div>";
g.items.forEach(function (it, i) {
h += '<div class="bd-ed-gthumb"><img src="' + esc(imgSrc(it, "edit")) + '" alt=""><div class="bd-ed-field" style="gap:4px">' + input("gi." + i + ".caption", it.caption, "", ' placeholder="Caption" aria-label="Caption"') + input("gi." + i + ".alt", it.alt, "", ' placeholder="Describe the image" aria-label="Alt text"') + '</div><div class="bd-ed-gbtns"><button class="bd-ed-x" data-act="gi-up" data-i="' + i + '" aria-label="Earlier">' + I.up + '</button><button class="bd-ed-x" data-act="gi-down" data-i="' + i + '" aria-label="Later">' + I.dn + '</button><button class="bd-ed-x" data-act="gi-del" data-i="' + i + '" aria-label="Remove">' + I.x + "</button></div></div>";
});
return h;
}
function libraryPanel(p, e) {
var h = row(dpIn("Columns", "el.cols", "el.colsM", p.cols, p.colsM, "int"), dpIn("Gap", "el.gutter", "el.gutterM", p.gutter, p.gutterM, "int"))
+ row(field("Cover shape", select("el.ratio", p.ratio, [["2/3", "Book 2 : 3"], ["3/4", "3 : 4"], ["1", "Square"], ["auto", "Original"]])), field("All button", input("el.allLabel", p.allLabel)))
+ sw("Topic filter", "el.filters", p.filters !== false) + sw("Titles under covers", "el.titles", !!p.titles)
+ lookSection(e);
var topics = libTopics(p);
h += '<div class="bd-ed-hint">' + (topics.length ? "Topics: " + topics.map(esc).join(" · ") : "Give books topics to build the filter.") + "</div>";
h += '<div class="bd-ed-head"><span class="bd-ed-label">' + p.items.length + " book" + (p.items.length === 1 ? "" : "s") + '</span><span class="bd-ed-actions"><button class="bd-ed-btn is-sm" data-act="pick-image">' + I.plus + 'Covers</button><button class="bd-ed-btn is-sm" data-act="lib-add">' + I.plus + "No cover</button></span></div>";
p.items.forEach(function (b, i) {
h += '<div class="bd-ed-gthumb">' + (libCover(b, "edit") ? '<img src="' + esc(libCover(b, "edit")) + '" alt="" data-act="lib-cover" data-id="' + b.id + '" title="Replace cover">' : '<button class="bd-ed-x" style="width:44px;height:58px" data-act="lib-cover" data-id="' + b.id + '" aria-label="Add cover">' + I.image + "</button>")
+ '<div class="bd-ed-field" style="gap:4px">' + input("gi." + i + ".title", b.title, "", ' placeholder="Title" aria-label="Title"') + input("gi." + i + ".author", b.author || "", "", ' placeholder="Author" aria-label="Author"') + input("gi." + i + ".href", b.href, "", ' placeholder="Link to PDF" aria-label="Link"') + (b.assetId ? "" : input("gi." + i + ".src", b.src || "", "", ' placeholder="Cover image URL (Drive links fill this in)" aria-label="Cover URL"')) + input("gi." + i + ".topics", (b.topics || []).join(", "), "csv", ' placeholder="Topics, comma separated" aria-label="Topics"')
+ '<div class="bd-ed-list-row" style="grid-template-columns:auto minmax(0,1fr) auto;align-items:center"><span class="bd-ed-label" style="margin:0">Spine</span><input type="color" class="bd-ed-input" data-bind="gi.' + i + '.spine" value="' + esc(b.spine || E(e, "spine") || "#8a8a8a") + '" aria-label="Spine colour"><button class="bd-ed-btn is-sm" data-act="set" data-path="gi.' + i + '.spine" data-val="">' + (b.spine ? "Default" : "Default ✓") + "</button></div>" + "</div>"
+ '<div class="bd-ed-gbtns"><button class="bd-ed-x" data-act="gi-up" data-i="' + i + '" aria-label="Earlier">' + I.up + '</button><button class="bd-ed-x" data-act="gi-down" data-i="' + i + '" aria-label="Later">' + I.dn + '</button><button class="bd-ed-x" data-act="gi-del" data-i="' + i + '" aria-label="Remove">' + I.x + "</button></div></div>";
});
return h;
}
function stylesPanel() {
var s = S.project.site;
var h = '<div class="bd-ed-sec"><div class="bd-ed-hint">The type every block uses. Pick a block’s style in its panel; for one-off changes use Style in the block panel.' + (S.mode === "phone" ? " Showing phone sizes." : "") + "</div>"
+ row(field("Main face", select("site.sans", s.sans, BD_FONTS_SANS)), field("Mono face", select("site.mono", s.mono, BD_FONTS_MONO))) + "</div>";
BD_STYLES.forEach(function (k, i) {
var st = s.styles[k[0]];
var p = "site.styles." + k[0];
h += '<div class="bd-ed-sec">' + adv("style-" + k[0], k[1] + ' <span class="bd-ed-sum">' + (S.mode === "phone" ? st.sizeM + "/" + st.lhM : st.size + "/" + st.lh) + " · " + (st.font === "mono" ? "mono" : "main") + "</span>",
row(dpIn("Size", p + ".size", p + ".sizeM", st.size, st.sizeM), dpIn("Line", p + ".lh", p + ".lhM", st.lh, st.lhM))
+ row(field("Face", seg(p + ".font", st.font, [["sans", "Main"], ["mono", "Mono"]])), field("Weight", select(p + ".weight", String(st.weight), [["400", "Regular"], ["500", "Medium"], ["700", "Bold"]])))
+ row(field("Case", select(p + ".textCase", st.textCase, [["none", "As typed"], ["uppercase", "UPPER"], ["lowercase", "lower"]])), numIn("Spacing (em)", p + ".tracking", st.tracking))
+ sw("Italic", p + ".italic", st.italic)
+ colorIn("Colour", p + ".color", st.color, s.colors.ink), i === 0) + "</div>";
});
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Blocks</span><div class="bd-ed-hint">The look every block of a kind starts with. A block can still change any of these in its own panel.</div></div>';
Object.keys(BLOCK_STYLE).forEach(function (t) {
h += '<div class="bd-ed-sec">' + adv("bs-" + t, BD_TYPE_NAME[t], styleFields(t, "site")) + "</div>";
});
return h;
}
function pagesPanel() {
var s = S.project.site;
var groups = s.sections.map(function (x) { return { key: x.key, label: x.label, pages: [] }; });
var other = { key: "", label: "No group", pages: [] };
var pins = { key: "", label: "Header & footer", pages: [], pins: true };
S.project.order.forEach(function (id) {
var p = S.project.pages[id];
if (p.kind === "pin") {
pins.pages.push(p);
return;
}
if (p.parent && S.project.pages[p.parent]) return;
var g = groups.filter(function (x) { return x.key === p.section; })[0] || other;
g.pages.push(p);
});
if (other.pages.length) groups.push(other);
groups.push(pins);
var h = '<div class="bd-ed-sec"><div class="bd-ed-actions"><button class="bd-ed-btn" data-act="page-add">' + I.plus + 'Page</button><button class="bd-ed-btn" data-act="blog-add">' + I.plus + 'Blog</button><button class="bd-ed-btn" data-act="pin-add" data-val="top">' + I.plus + 'Header</button><button class="bd-ed-btn" data-act="pin-add" data-val="bottom">' + I.plus + "Footer</button></div>";
groups.forEach(function (g) {
if (!g.pages.length && !g.pins) return;
h += '<div class="bd-ed-group"><div class="bd-ed-group-label">' + esc(g.label) + "</div>";
if (g.pins && !g.pages.length) h += '<div class="bd-ed-hint" style="padding:2px 4px">None yet. A header or footer shows on every page, with its own columns.</div>';
g.pages.forEach(function (p) {
var tag = p.kind === "pin" ? (p.pin.place === "bottom" ? "foot" : "head") : p.blog ? "blog" : esc(p.num || "·");
h += '<button class="bd-ed-pg' + (p.id === S.pageId ? " is-on" : "") + '" data-act="page" data-id="' + p.id + '"><b>' + tag + "</b><span>" + (p.slug === "" && p.kind !== "pin" ? "⌂ " : "") + esc(p.title) + "</span></button>";
if (p.blog) {
postsOf(p.id).forEach(function (q) {
h += '<button class="bd-ed-pg is-post' + (q.id === S.pageId ? " is-on" : "") + '" data-act="page" data-id="' + q.id + '"><b>' + (q.featured ? "★" : "↳") + "</b><span>" + esc(q.title) + "</span></button>";
});
h += '<button class="bd-ed-pg is-post is-add" data-act="post-add" data-id="' + p.id + '"><b>+</b><span>Post</span></button>';
}
});
h += "</div>";
});
h += "</div>";
var cp = curPage();
h += '<div class="bd-ed-sec"><div class="bd-ed-actions">'
+ '<button class="bd-ed-btn" data-act="page-up" aria-label="Move up">' + I.up + "</button>"
+ '<button class="bd-ed-btn" data-act="page-down" aria-label="Move down">' + I.dn + "</button>"
+ '<button class="bd-ed-btn" data-act="page-dup">' + I.copy + "Duplicate</button>"
+ (cp.slug !== "" && cp.kind !== "pin" ? '<button class="bd-ed-btn" data-act="make-home">' + I.home + "Home</button>" : "")
+ '<button class="bd-ed-btn is-danger" data-act="page-del" aria-label="Delete">' + I.trash + "</button></div>";
if (S.confirm === "page") h += '<div class="bd-ed-confirm">Delete “' + esc(cp.title) + '” for good? <button class="bd-ed-btn is-danger" data-act="page-del-yes">Delete</button><button class="bd-ed-btn" data-act="confirm-no">Keep</button></div>';
return h + "</div>";
}
function sitePanel() {
var s = S.project.site;
var h = '<div class="bd-ed-sec">' + field("Site name", input("site.name", s.name))
+ '<span class="bd-ed-label">Colour</span>' + row(
field("Page", '<input type="color" class="bd-ed-input" data-bind="site.colors.page" value="' + esc(s.colors.page) + '">'),
field("Panel", '<input type="color" class="bd-ed-input" data-bind="site.colors.panel" value="' + esc(s.colors.panel) + '">'),
field("Ink", '<input type="color" class="bd-ed-input" data-bind="site.colors.ink" value="' + esc(s.colors.ink) + '">'),
field("Rule", '<input type="color" class="bd-ed-input" data-bind="site.colors.rule" value="' + esc(s.colors.rule) + '">')) + "</div>";
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Page frame</span>'
+ row(numIn("Width", "site.w", s.w, "int"))
+ '<span class="bd-ed-label">Window margins</span>'
+ row(dpIn("Top", "site.mt", "site.mtM", s.mt, s.mtM, "int"), dpIn("Right", "site.mr", "site.mrM", s.mr, s.mrM, "int"), dpIn("Bottom", "site.mb", "site.mbM", s.mb, s.mbM, "int"), dpIn("Left", "site.ml", "site.mlM", s.ml, s.mlM, "int"))
+ row(dpIn("Paragraph indent", "site.indent", "site.indentM", s.indent, s.indentM, "int"))
+ '<div class="bd-ed-hint">Columns are set in the bar above the canvas.</div></div>';
h += '<div class="bd-ed-sec"><span class="bd-ed-label">On every page</span>' + sw("Page title", "site.header", s.header) + (s.header ? sw("Number above the title", "site.showNum", s.showNum) : "") + sw("Floating menu button", "site.menu", s.menu) + sw("Page arrows at the end", "site.pager", s.pager) + sw("Click images to zoom", "site.zoom", s.zoom)
+ (s.menu || hasMenuButton() ? '<button class="bd-ed-btn" data-act="menu-style">' + I.sliders + "Style the menu</button>" : "") + '<div class="bd-ed-hint">Or add Menu, Page title and Page arrows blocks to the header and footer.</div></div>';
var secs = s.sections.map(function (x, i) {
return '<div class="bd-ed-list-row">' + input("site.sections." + i + ".key", x.key, "", ' aria-label="Section key"') + input("site.sections." + i + ".label", x.label, "", ' aria-label="Section label"') + '<button class="bd-ed-x" data-act="del-section" data-i="' + i + '" aria-label="Remove section">' + I.x + "</button></div>";
}).join("") + '<button class="bd-ed-btn" data-act="add-section">' + I.plus + "Section</button>";
var ext = s.externals.map(function (x, i) {
return '<div class="bd-ed-field" style="gap:6px;padding-bottom:6px;border-bottom:1px dashed var(--e-line)"><div class="bd-ed-list-row">' + select("site.externals." + i + ".section", x.section, s.sections.map(function (q) { return [q.key, q.key]; })) + input("site.externals." + i + ".title", x.title, "", ' aria-label="Link title"') + '<button class="bd-ed-x" data-act="del-ext" data-i="' + i + '" aria-label="Remove link">' + I.x + "</button></div>" + input("site.externals." + i + ".url", x.url, "", ' aria-label="Link address" placeholder="https://"') + "</div>";
}).join("") + '<button class="bd-ed-btn" data-act="add-ext">' + I.plus + "Outside link</button>";
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Menus</span>' + menuPicker("ui.menuEdit", S.menuEdit) + menuEditor(S.menuEdit || s.menus[0].id) + '<div class="bd-ed-hint">A menu is the list of links a Menu block or the overlay shows. Make as many as you like; each Menu block picks one.</div>' + (s.menus.length > 1 ? '<button class="bd-ed-btn is-danger is-sm" data-act="menu-del" data-id="' + esc(S.menuEdit || s.menus[0].id) + '">Delete this menu</button>' : "") + "</div>";
h += '<div class="bd-ed-sec">' + adv("site-sections", "Page groups (Pages tab)", '<div class="bd-ed-hint">Groups only sort the Pages list and number pages. They don’t decide what shows in a menu.</div>' + secs) + "</div>";
h += '<div class="bd-ed-sec">' + adv("site-adv", "Advanced", '<span class="bd-ed-label">Master placement</span>' + masterPanel()
+ '<span class="bd-ed-label">Grid</span>' + row(dpIn("Units", "site.cols", "site.colsM", s.cols, s.colsM, "int"), dpIn("Gap", "site.gap", "site.gapM", s.gap, s.gapM, "int"), numIn("Free-grid row", "site.row", s.row, "int"))) + "</div>";
return h;
}
function renderLeft() {
var L = $("bd-left");
L.classList.toggle("is-open", S.leftOpen);
if (!S.project) {
L.innerHTML = "";
return;
}
if (["pages", "styles", "site"].indexOf(S.leftTab) < 0) S.leftTab = "pages";
var h = '<div class="bd-ed-tabs" role="tablist">' + [["pages", "Pages"], ["styles", "Styles"], ["site", "Site"]].map(function (t) {
return '<button data-act="left-tab" data-val="' + t[0] + '" class="' + (S.leftTab === t[0] ? "is-on" : "") + '">' + t[1] + "</button>";
}).join("") + "</div>";
if (S.leftTab === "pages") h += pagesPanel();
else if (S.leftTab === "styles") h += stylesPanel();
else h += sitePanel();
L.innerHTML = h;
}

/* RIGHT PANEL */
function blockContent(e) {
var p = e.props;
var h = "";
if (e.type === "text") {
h += '<div class="bd-ed-actions"><button class="bd-ed-btn" data-act="edit-text">' + I.text + 'Edit text</button><button class="bd-ed-btn" data-act="ins-html">' + I.html + "HTML</button></div>"
+ row(field("Style", select("el.style", textStyle(p), BD_STYLES)), field("Align", select("el.align", p.align, [["left", "Left"], ["center", "Centre"], ["right", "Right"]])))
+ sw("Indent new paragraphs", "el.indent", p.indent);
}
if (e.type === "image") {
h += '<button class="bd-ed-btn" data-act="pick-image">' + I.image + (p.assetId ? "Replace image" : "Choose image") + "</button>"
+ field("Alt text", input("el.alt", p.alt, "", ' placeholder="Describe the image"'))
+ field("Caption", input("el.caption", p.caption))
+ row(field("Fit", select("el.fit", p.fit, [["contain", "Whole image"], ["cover", "Fill the box"]])))
+ sw("Click to zoom", "el.zoom", p.zoom !== false);
}
if (e.type === "gallery") h += galleryPanel(p);
if (e.type === "library") h += libraryPanel(p, e);
if (e.type === "link") {
h += field("Text", input("el.text", p.text)) + field("Goes to", input("el.href", p.href, "", ' placeholder="/page or https://"'))
+ row(field("Look", select("el.style", p.style, [["plain", "Plain"], ["underline", "Underline"], ["arrow", "Arrow →"]])))
+ sw("Open in new tab", "el.newTab", p.newTab);
}
if (e.type === "notes") h += field("Notes, one per line", '<textarea class="bd-ed-input" data-bind="el.items" data-type="lines" rows="6">' + esc((p.items || []).join("\n")) + "</textarea>") + '<div class="bd-ed-hint">Numbers continue across the page. Links: &lt;a href="/files/x.pdf"&gt;x.pdf&lt;/a&gt;</div>';
if (e.type === "list") {
h += field("Heading", input("el.heading", p.heading))
+ row(field("Style", select("el.style", p.style || "body", BD_STYLES)), dpIn("Left column (all lists)", "site.labelW", "site.labelWM", S.project.site.labelW, S.project.site.labelWM, "int"))
+ field("Rows: left | right", '<textarea class="bd-ed-input" data-bind="el.rows" data-type="rows" rows="8">' + esc((p.rows || []).map(function (r) { return (r[0] || "") + " | " + (r[1] || ""); }).join("\n")) + "</textarea>");
}
if (e.type === "embed") h += field("YouTube or Vimeo link", input("el.url", p.url, "", ' placeholder="https://vimeo.com/123456"')) + field("Title", input("el.title", p.title)) + '<div class="bd-ed-hint">Plays on the live site.</div>';
if (e.type === "html") h += field("HTML", '<textarea class="bd-ed-input" data-bind="el.code" rows="8">' + esc(p.code) + "</textarea>") + '<button class="bd-ed-btn" data-act="ins-html">' + I.code + "Open in code editor</button>";
if (e.type === "rule") h += '<div class="bd-ed-hint">A thin line in the rule colour.</div>';
if (e.type === "ptitle") {
h += sw("Page number above", "el.num", !!p.num) + lookSection(e) + '<div class="bd-ed-hint">Shows the title of whichever page is open. Put it in the header to use it on every page.</div>';
}
if (e.type === "menubtn") {
var list = p.mode === "list";
var mid = list ? p.menu || S.project.site.nav.menu : S.project.site.nav.menu;
h += field("Type", seg("el.mode", list ? "list" : "button", [["list", "List of links"], ["button", "Button + overlay"]]))
+ field("Shows", menuPicker(list ? "el.menu" : "site.nav.menu", mid))
+ adv("menu-links-" + mid, "Edit the links in “" + esc(menuById(mid).name) + "”", menuEditor(mid), true)
+ field("Position", select("el.corner", p.corner || "", [["", "In line"], ["right", "Top right corner"], ["left", "Top left corner"]]))
+ '<span class="bd-ed-label">Next to it</span>'
+ row(field("Show", select("el.brand", p.brand || "none", [["none", "Nothing"], ["site", "Site name"], ["page", "Page title"], ["custom", "My own text"]])), field("Sits", select("el.brandPos", p.brandPos || "before", [["before", "Before"], ["after", "After"], ["above", "Above"]])))
+ (p.brand === "custom" ? field("Text", input("el.brandText", p.brandText, "", ' placeholder="' + esc(S.project.site.name) + '"')) : "")
+ field("Align", seg("el.align", p.align || "start", [["start", "Left"], ["center", "Centre"], ["end", "Right"], ["spread", "Spread"]]));
if (list) {
h += row(field("Direction", seg("el.dir", p.dir || "vertical", [["vertical", "Down"], ["horizontal", "Across"]])), field("Grouping", seg("el.group", p.group || "flat", [["flat", "One list"], ["sections", "By section"]])))
+ lookSection(e);
} else {
h += lookSection(e) + "</div>" + navPanel(true) + '<div class="bd-ed-sec"><div class="bd-ed-hint">The overlay and its button style are shared by every menu button on the site.</div>';
}
}
if (e.type === "pager") {
h += row(field("Look", seg("el.look", p.look || "arrows", [["arrows", "Arrows"], ["text", "Words"]])), field("Goes through", select("el.scope", p.scope || "site", [["site", "Pages"], ["blog", "Posts of this blog"]])));
if (p.look === "text") h += row(field("Before next title", input("el.nextLabel", p.nextLabel, "", ' placeholder="Next, "')), field("Before previous title", input("el.prevLabel", p.prevLabel, "", ' placeholder="empty = hide"')));
else h += field("Middle shows", select("el.num", p.num || "num", [["num", "Page number"], ["count", "3 / 12"], ["title", "Page title"], ["none", "Nothing"]]));
h += sw("Line above", "el.line", !!p.line) + sw("Loop from last to first", "el.loop", !!p.loop) + lookSection(e)
+ '<div class="bd-ed-hint">' + (p.scope === "blog" ? "Goes to the previous and next post of the blog this post belongs to." : "Goes to the previous and next page in the order of the Pages list (blog posts are skipped).") + "</div>";
}
if (e.type === "postinfo") {
h += sw("Back link to the blog", "el.back", p.back !== false) + (p.back !== false ? field("Back link text", input("el.backLabel", p.backLabel, "", ' placeholder="<"')) : "")
+ sw("Date", "el.date", !!p.date) + sw("Word count", "el.words", p.words !== false) + sw("Reading time", "el.time", p.time !== false)
+ lookSection(e) + '<div class="bd-ed-hint">Counts the words in this post’s text and quotes. Reading time is one minute per 200 words.</div>';
}
if (e.type === "quote") {
h += '<div class="bd-ed-actions"><button class="bd-ed-btn" data-act="ins-html">' + I.html + "Edit text</button></div>"
+ field("Text", '<textarea class="bd-ed-input" data-bind="el.html" rows="5">' + esc(p.html) + "</textarea>") + lookSection(e);
}
if (e.type === "toggle") {
h += field("Heading you click", input("el.title", p.title))
+ field("Items, one per line", '<textarea class="bd-ed-input" data-bind="el.items" data-type="lines" rows="7">' + esc((p.items || []).join("\n")) + "</textarea>")
+ sw("Open to start", "el.open", !!p.open) + lookSection(e);
}
if (e.type === "product") {
h += '<button class="bd-ed-btn" data-act="pick-image">' + I.image + (p.assetId ? "Replace image" : "Choose image") + "</button>"
+ field("Name", input("el.title", p.title)) + row(field("Price", input("el.price", p.price, "", ' placeholder="£20.00"')), field("Note", input("el.note", p.note, "", ' placeholder="Sold out"')))
+ field("Link (shop, email…)", input("el.href", p.href, "", ' placeholder="https:// or mailto:"'))
+ field("Alt text", input("el.alt", p.alt)) + lookSection(e);
}
if (e.type === "posts") h += postsPanel(e);
return h;
}
function postsPanel(e) {
var p = e.props;
var bl = blogs();
var L = postsList(p);
var h = (bl.length > 1 ? field("Blog", select("el.blog", p.blog || "", [["", "This blog"]].concat(bl.map(function (b) { return [b.id, b.title]; })))) : "")
+ row(field("Layout", select("el.layout", p.layout || "grid", [["grid", "Grid"], ["masonry", "Columns (uneven)"], ["list", "List"]])), p.layout !== "list" ? dpIn("Columns", "el.cols", "el.colsM", p.cols, p.colsM, "int") : "")
+ row(dpIn("Gap across", "el.gap", "el.gapM", p.gap, p.gapM, "blank"), dpIn("Gap down", "el.rowGap", "el.rowGapM", p.rowGap, p.rowGapM, "blank"))
+ row(field("Featured on top", select("el.featured", p.featured || "none", [["none", "None"], ["first", "First post"], ["marked", "Post marked ★"]])), p.featured !== "none" ? field("Featured look", seg("el.fLayout", p.fLayout || "stack", [["stack", "Stacked"], ["side", "Side by side"]])) : "")
+ row(field("Order", select("el.sort", p.sort || "order", [["order", "As listed"], ["newest", "Newest first"]])), numIn("Show at most", "el.limit", p.limit, "blank"))
+ '<span class="bd-ed-label">Each card shows</span>'
+ sw("Image (first image in the post)", "el.showImage", !!p.showImage) + sw("Title", "el.showTitle", !!p.showTitle) + sw("Date", "el.showDate", !!p.showDate) + sw("Words ~ minutes", "el.showMeta", !!p.showMeta) + sw("Excerpt", "el.showExcerpt", !!p.showExcerpt)
+ lookSection(e);
var all = L.blog ? postsOf(L.blog) : [];
h += '<div class="bd-ed-head"><span class="bd-ed-label">' + all.length + " post" + (all.length === 1 ? "" : "s") + '</span><button class="bd-ed-btn is-sm" data-act="post-add" data-id="' + (L.blog || "") + '">' + I.plus + "Post</button></div>";
all.forEach(function (q, i) {
h += '<div class="bd-ed-plist"><button class="bd-ed-x' + (q.featured ? " is-on" : "") + '" data-act="post-feat" data-id="' + q.id + '" aria-label="Featured" title="Featured">' + I.star + '</button><button class="bd-ed-pg" style="grid-template-columns:1fr" data-act="page" data-id="' + q.id + '"><span>' + esc(q.title) + '</span></button><button class="bd-ed-x" data-act="post-move" data-id="' + q.id + '" data-val="-1" aria-label="Earlier">' + I.up + '</button><button class="bd-ed-x" data-act="post-move" data-id="' + q.id + '" data-val="1" aria-label="Later">' + I.dn + "</button></div>";
});
return h + '<div class="bd-ed-hint">Each post is its own page. Click one to open it. Cards use the post’s title, first image and text.</div>';
}
function bsOptName(opts, v) {
for (var i = 0; i < opts.length; i++) if (String(opts[i][0]) === String(v)) return opts[i][1];
return v === "" || v == null ? "none" : String(v);
}
function styleFields(type, scope, e) {
var site = bsSite(type);
var el = scope === "el";
var ph = S.mode === "phone";
var cells = BLOCK_STYLE[type].map(function (f) {
var k = f[0], kind = f[2];
var path = el ? "el." + k : "site.blockStyles." + type + "." + k;
var cur = el ? e.props[k] : site[k];
var sv = site[k];
if (kind === "style" || kind === "sel" || kind === "bool") {
var opts = kind === "style" ? BD_STYLES : kind === "bool" ? [["1", "On"], ["0", "Off"]] : f[4];
var inh = el ? [["", "Site · " + bsOptName(opts, sv)]] : [];
return field(f[1], select(path, cur == null ? "" : String(cur), inh.concat(opts)));
}
if (kind === "color") {
var shown = cur || sv || "";
return field(f[1], '<div class="bd-ed-list-row" style="grid-template-columns:minmax(0,1fr) auto"><input type="color" class="bd-ed-input" data-bind="' + path + '" value="' + esc(shown || "#ffffff") + '"><button class="bd-ed-btn" style="height:30px" data-act="set" data-path="' + path + '" data-val="">' + (cur ? (el ? "Site" : "Clear") : el ? "Site" : "None") + "</button></div>");
}
var bindK = kind === "dp" && ph ? path + "M" : path;
var v = kind === "dp" && ph ? (el ? e.props[k + "M"] : site[k + "M"]) : cur;
var phv = kind === "dp" && ph ? (el ? (site[k + "M"] !== "" && site[k + "M"] != null ? site[k + "M"] : e.props[k] !== "" && e.props[k] != null ? e.props[k] : sv) : sv) : (el ? sv : "");
return field(f[1] + (kind === "dp" && ph ? ' <b class="bd-ed-ph">phone</b>' : ""), '<input class="bd-ed-input bd-ed-n" inputmode="decimal" data-bind="' + bindK + '" data-type="blank" value="' + esc(v == null ? "" : v) + '"' + (phv !== "" && phv != null ? ' placeholder="' + esc(phv) + '"' : "") + ">");
});
var h = "";
for (var i = 0; i < cells.length; i += 2) h += row(cells[i], cells[i + 1] || "");
return h;
}
function lookSection(e) {
return '<span class="bd-ed-label">Look</span>' + styleFields(e.type, "el", e) + '<div class="bd-ed-hint">Empty or “Site” follows the ' + esc(BD_TYPE_NAME[e.type]) + " style in the Styles tab. Set a value here to change only this one.</div>";
}
function blockPlace(e) {
var pg = curPage();
var ph = S.mode === "phone";
if (isMaster(pg)) {
var ep = effPlace(e, ph);
var hasOwn = e.own && (ph ? (e.own.xm != null || e.own.wm != null) : (e.own.x != null || e.own.w != null));
return '<div class="bd-ed-hint">Inside its column, on ' + gridCols() + " units" + (ph ? " (phone)" : "") + ". Drag sideways or pull the handle to change. " + (hasOwn ? "This block has its own place." : "Following the master.") + "</div>"
+ row(numIn("Start", "own.x", ep.x, "int"), numIn("Width", "own.w", ep.w, "int"))
+ (hasOwn ? '<button class="bd-ed-btn" data-act="own-reset">Back to master</button>' : "");
}
var pos = e[posKey()] || e.d;
return '<div class="bd-ed-hint">Free grid' + (ph ? " · phone" : "") + ". Drag to move, pull a handle to resize. Arrow keys nudge.</div>" + row(numIn("Start", "pos.x", pos.x, "int"), numIn("Row", "pos.y", pos.y, "int"), numIn("Width", "pos.w", pos.w, "int"), numIn("Height", "pos.h", pos.h, "int"));
}
function syncInsToBlock(e) {
if (!shadow) return;
var node = shadow.querySelector(".bd-main .bd-e-" + e.id) || shadow.querySelector(".bd-e-" + e.id);
if (!node) {
S.ins = null;
return;
}
var cur = insEl();
if (cur && node.contains(cur) && S.ins.block === e.id) return;
S.ins = { path: insPath(node), block: e.id, scope: S.ins ? S.ins.scope : "one", where: S.ins ? S.ins.where : "site" };
}
function renderRight() {
var R = $("bd-right");
R.classList.toggle("is-open", S.rightOpen);
if (!S.project) {
R.innerHTML = "";
return;
}
if (S.inspect) {
R.innerHTML = insPanel(false);
fillIns();
return;
}
var e = selEl();
var pg = curPage();
var h = "";
if (S.sel === "__menu" && !S.preview) {
R.innerHTML = '<div class="bd-ed-sec"><div class="bd-ed-head"><span class="bd-ed-title">Menu</span><button class="bd-ed-btn" style="height:26px" data-act="deselect">Done</button></div><div class="bd-ed-hint">Applies on every page.</div></div>' + navPanel();
return;
}
if (e && !S.preview) {
syncInsToBlock(e);
var n = nCols(pg);
h += '<div class="bd-ed-sec"><div class="bd-ed-head"><span class="bd-ed-title">' + BD_TYPE_NAME[e.type] + '</span><button class="bd-ed-btn" style="height:26px" data-act="deselect">Done</button></div>'
+ blockContent(e) + "</div>";
h += insPanel(true);
h += '<div class="bd-ed-sec">'
+ (n > 1 ? field("Column", '<div class="bd-ed-seg">' + Array.apply(null, Array(n)).map(function (x, i) { return '<button data-act="set-col" data-val="' + (i + 1) + '" class="' + (colOf(e, pg) === i + 1 ? "is-on" : "") + '">' + (i + 1) + "</button>"; }).join("") + "</div>") : "")
+ '<div class="bd-ed-actions">'
+ (isMaster(pg) ? '<button class="bd-ed-btn" data-act="sel-up" aria-label="Move up">' + I.up + '</button><button class="bd-ed-btn" data-act="sel-down" aria-label="Move down">' + I.dn + "</button>" : '<button class="bd-ed-btn" data-act="sel-front">' + I.front + 'Front</button><button class="bd-ed-btn" data-act="sel-back">' + I.back + "Back</button>")
+ '<button class="bd-ed-btn" data-act="sel-dup">' + I.copy + "Duplicate</button>"
+ '<button class="bd-ed-btn is-danger" data-act="sel-del" aria-label="Delete">' + I.trash + "</button></div>"
+ adv("blk-place", "Exact placement", blockPlace(e)) + "</div>";
R.innerHTML = h;
fillIns();
return;
}
S.ins = null;
if (pg.kind === "pin") {
var foot = pg.pin.place === "bottom";
h += '<div class="bd-ed-sec"><span class="bd-ed-title">' + (foot ? "Footer" : "Header") + "</span>"
+ field("Name", input("page.title", pg.title))
+ field("Sits at", seg("page.pin.place", pg.pin.place, [["top", "Top · header"], ["bottom", "Bottom · footer"]]))
+ row(dpIn("Height", "page.pin.h", "page.pin.hM", pg.pin.h, pg.pin.hM, "blank"), dpIn(foot ? "Space above" : "Space below", "page.pin.gap", "page.pin.gapM", pg.pin.gap, pg.pin.gapM, "blank"))
+ '<div class="bd-ed-hint">Leave empty for automatic. Height is fixed whatever the content.</div>'
+ sw("Stays put while scrolling", "page.pin.fixed", pg.pin.fixed)
+ field("Shows on", seg("page.pin.show", pg.pin.show, [["all", "Every page"], ["pages", "Chosen pages"]]));
if (pg.pin.show === "pages") {
S.project.order.forEach(function (id) {
var q = S.project.pages[id];
if (q.kind === "pin") return;
h += '<label class="bd-ed-check"><input type="checkbox" data-act="pin-page" data-id="' + q.id + '"' + ((pg.pin.pages || []).indexOf(q.id) > -1 ? " checked" : "") + ">" + esc(q.title) + "</label>";
});
}
h += '<div class="bd-ed-hint">Add blocks from the rail like any page. Its columns are set in the bar above the canvas.</div></div>';
} else {
var s = S.project.site;
h += '<div class="bd-ed-sec"><span class="bd-ed-title">Page</span>'
+ field("Title in menu", input("page.title", pg.title))
+ field("Heading on the page", input("page.h1", pg.h1, "", ' placeholder="' + esc(pg.title) + '"'))
+ row(field("Group", select("page.section", pg.section, [["", "No group"]].concat(s.sections.map(function (x) { return [x.key, x.label]; })))), field("Number", input("page.num", pg.num)))
+ (pg.slug === "" ? '<div class="bd-ed-hint">' + I.home.replace("<svg", '<svg style="width:12px;height:12px;vertical-align:-2px"') + " Home page</div>" : field("Address · /" + esc(pg.slug), input("page.slug", pg.slug, "slug", ' placeholder="page-name"')))
+ sw("Show the title", "page.header", pg.header !== false)
+ '<span class="bd-ed-label">Show in menus</span>' + S.project.site.menus.map(function (m) { return '<label class="bd-ed-check"><input type="checkbox" data-act="page-menu" data-id="' + m.id + '"' + (m.items.some(function (it) { return it.type === "page" && it.page === pg.id; }) ? " checked" : "") + ">" + esc(m.name) + "</label>"; }).join("")
+ (pg.blog ? '<div class="bd-ed-hint">This page is a blog. Its posts are listed under it in Pages.</div><button class="bd-ed-btn" data-act="post-add" data-id="' + pg.id + '">' + I.plus + "Post</button>" : "")
+ (pg.parent ? '<span class="bd-ed-label">Post</span>' + row(field("Blog", select("page.parent", pg.parent, blogs().map(function (b) { return [b.id, b.title]; }))), field("Date", '<input type="date" class="bd-ed-input" data-bind="page.date" value="' + esc(pg.date || "") + '">'))
+ field("Excerpt for the card", '<textarea class="bd-ed-input" data-bind="page.excerpt" rows="3">' + esc(pg.excerpt || "") + "</textarea>")
+ sw("Featured ★", "page.featured", !!pg.featured) : "")
+ field("Description for search", '<textarea class="bd-ed-input" data-bind="page.desc" rows="3" style="font-family:var(--e-sans);font-size:12.5px">' + esc(pg.desc) + "</textarea>")
+ "</div>";
var stack = "";
S.project.order.forEach(function (id) {
var q = S.project.pages[id];
if (q.kind === "pin" || q.id === pg.id) return;
stack += '<label class="bd-ed-check"><input type="checkbox" data-act="stack-page" data-id="' + q.id + '"' + ((pg.stack || []).indexOf(q.id) > -1 ? " checked" : "") + ">" + esc((q.num ? q.num + "  " : "") + q.title) + "</label>";
});
h += '<div class="bd-ed-sec">' + adv("pg-stack", "Continue with other pages", '<div class="bd-ed-hint">Chosen pages scroll on below this one, like one long page.</div>' + stack) + "</div>";
}
var free = '<div class="bd-ed-seg"><button data-act="layout" data-val="master" class="' + (isMaster(pg) ? "is-on" : "") + '">Columns</button><button data-act="layout" data-val="free" class="' + (isMaster(pg) ? "" : "is-on") + '">Free grid</button></div><div class="bd-ed-hint">' + (isMaster(pg) ? "Blocks stack in columns. Free grid lets you place them anywhere, row by row." : "Blocks sit anywhere on the grid. Columns stacks them again in order.") + "</div>"
+ (S.mode === "phone" && !isMaster(pg) ? '<button class="bd-ed-btn" data-act="restack">' + I.restack + "Restack phone from desktop</button>" : "");
h += '<div class="bd-ed-sec">' + adv("pg-adv", "Advanced layout", free, !isMaster(pg)) + "</div>";
h += '<div class="bd-ed-sec"><div class="bd-ed-hint">Add blocks from the rail. Tap a block to edit and style it; tap text again to type. Drag to reorder or move between columns. ' + I.target.replace("<svg", '<svg style="width:12px;height:12px;vertical-align:-2px"') + " in the rail styles anything on the page.</div></div>";
R.innerHTML = h;
}

/* CODE DRAWER */
var CODE_TABS = [["site", "Site CSS"], ["page", "Page CSS"], ["head", "Head"], ["el", "Block"], ["files", "Files"]];
function codeValue(tab) {
var pg = curPage();
var e = selEl();
if (tab === "site") return S.project.site.css || "";
if (tab === "head") return S.project.site.head || "";
if (tab === "page") return pg.css || "";
if (tab === "files") return S.filePath && S.files[S.filePath] ? S.files[S.filePath].text : "";
if (tab === "el") {
if (!e) return "";
if (e.type === "text") return e.props.html;
if (e.type === "html") return e.props.code;
return JSON.stringify(e.props, null, 1).replace(/^ +/gm, "");
}
if (S.outTab === "css") {
ensurePhoneAll();
return exportCSS();
}
if (S.outTab === "js") return exportJS();
return exportPage(pg);
}
function fileMode(p) {
if (/\.css$/.test(p)) return "css";
if (/\.(js|json|webmanifest)$/.test(p)) return "javascript";
if (/\.(html|svg|xml)$/.test(p)) return "htmlmixed";
return "text/plain";
}
function codeMode(tab) {
var e = selEl();
if (tab === "site" || tab === "page") return "css";
if (tab === "head") return "htmlmixed";
if (tab === "files") return fileMode(S.filePath);
if (tab === "el") return e && (e.type === "text" || e.type === "html") ? "htmlmixed" : "javascript";
return S.outTab === "css" ? "css" : S.outTab === "js" ? "javascript" : "htmlmixed";
}
function codeReadOnly(tab) {
if (tab === "out") return true;
if (tab === "el") return !selEl();
if (tab === "files") return !S.filePath;
return false;
}
function filesSide() {
var h = '<span class="bd-ed-label">Repo files</span>';
if (!S.fileList) {
loadFileList();
return h + '<div class="bd-ed-hint">Loading the file list…</div>';
}
h += '<select class="bd-ed-input" id="bd-file-pick" aria-label="File"><option value="">Choose a file…</option>' + S.fileList.concat(Object.keys(S.files).filter(function (p) { return S.fileList.indexOf(p) < 0; })).sort().map(function (p) {
var f = S.files[p];
var dirty = f && f.text !== f.orig;
return '<option value="' + esc(p) + '"' + (p === S.filePath ? " selected" : "") + ">" + esc(p.replace(/^site\//, "")) + (dirty ? " •" : "") + "</option>";
}).join("") + "</select>"
+ '<div class="bd-ed-actions"><button class="bd-ed-btn" data-act="file-new">' + I.plus + 'New</button><button class="bd-ed-btn" data-act="file-upload">' + I.up + "Upload</button></div>";
if (S.fileNew) h += '<div class="bd-ed-list-row" style="grid-template-columns:minmax(0,1fr) auto"><input class="bd-ed-input" id="bd-file-name" placeholder="files/notes.txt" aria-label="New file path"><button class="bd-ed-btn" data-act="file-create">Add</button></div>';
if (S.uploads.length) {
h += '<span class="bd-ed-label">Uploaded · goes live on publish</span>';
S.uploads.forEach(function (u) {
h += '<div class="bd-ed-hint" style="font-family:var(--e-mono);font-size:10.5px;word-break:break-all">/' + esc(u.path.replace(/^site\//, "")) + "</div>";
});
}
h += '<div class="bd-ed-hint">Pages, bd.css and bd.js are written by Publish, so they aren’t listed. PDFs and other files go to /files/.</div>';
return h;
}
function renderCode() {
var C = $("bd-code");
$("bd-app").classList.toggle("has-code", S.codeOpen && !!S.project);
S.cm = null;
if (!S.codeOpen || !S.project) {
C.innerHTML = "";
return;
}
var tab = S.codeTab;
var e = selEl();
var side = "";
if (tab === "site") side = "CSS for every page. Inspect writes here too. Phone rules go in the one <b>@media (max-width: 760px)</b> block at the end.";
if (tab === "page") side = "CSS for this page only. Published inside the page’s &lt;head&gt;.";
if (tab === "head") side = "HTML in the &lt;head&gt; of every page: fonts, favicon, analytics, meta tags. Scripts run on the live site only.";
if (tab === "el") side = e ? (e.type === "text" ? "The block’s HTML. Use &lt;p&gt;, &lt;em&gt;, &lt;a&gt;, &lt;sup&gt;." : e.type === "html" ? "Raw HTML for this block." : "This block’s settings as JSON. Edits apply when the JSON is valid.") + '<div class="bd-ed-hint" id="bd-code-msg"></div>' : "Select a block on the canvas to edit its code.";
if (tab === "files") side = filesSide();
if (tab === "out") side = 'Read-only. This is what Publish writes.<div class="bd-ed-seg" style="flex-direction:column;align-self:stretch">' + [["page", curPage().slug ? curPage().slug + ".html" : "index.html"], ["css", "assets/bd.css"], ["js", "assets/bd.js"]].map(function (o) {
return '<button data-act="out-tab" data-val="' + o[0] + '" class="' + (S.outTab === o[0] ? "is-on" : "") + '" style="justify-content:flex-start">' + esc(o[1]) + "</button>";
}).join("") + '</div><button class="bd-ed-btn" data-act="copy-out">' + I.copy + "Copy</button>";
var ro = codeReadOnly(tab);
C.innerHTML = '<div style="display:flex;flex-direction:column;flex:1;min-width:0"><div class="bd-ed-tabs" role="tablist">' + CODE_TABS.concat(tab === "out" ? [["out", "Output"]] : []).map(function (t) {
return '<button data-act="code-tab" data-val="' + t[0] + '" class="' + (tab === t[0] ? "is-on" : "") + '">' + t[1] + "</button>";
}).join("") + '</div><div class="bd-ed-code-body" id="bd-code-host"></div></div>'
+ '<div class="bd-ed-code-side bd-ed-hint">' + side + "</div>";
var host = $("bd-code-host");
var val = ro && tab !== "out" ? "" : codeValue(tab);
if (window.CodeMirror) {
var cm = CodeMirror(host, {
value: val,
mode: codeMode(tab),
lineNumbers: true,
lineWrapping: true,
smartIndent: false,
electricChars: false,
indentUnit: 2,
tabSize: 2,
readOnly: ro,
extraKeys: { "Cmd-S": function () { publish(); }, "Ctrl-S": function () { publish(); }, "Cmd-F": "findPersistent", "Ctrl-F": "findPersistent" }
});
S.cm = cm;
cm.on("focus", function () { S.pendingSnap = true; });
cm.on("change", function (inst, ch) {
if (ch.origin === "setValue") return;
clearTimeout(S.codeTimer);
S.codeTimer = setTimeout(function () { applyCodeValue(tab, cm.getValue()); }, 220);
});
setTimeout(function () {
cm.refresh();
jumpCode();
}, 0);
} else {
host.innerHTML = '<textarea id="bd-code-ta" spellcheck="false" aria-label="Code" data-code="' + tab + '"' + (ro ? " readonly" : "") + "></textarea>";
$("bd-code-ta").value = val;
}
var fp = $("bd-file-pick");
if (fp) fp.addEventListener("change", function () { openFile(fp.value); });
}
function jumpCode() {
var j = S.codeJump;
if (!j || !S.cm || j.tab !== S.codeTab) return;
S.codeJump = null;
var lines = S.cm.getValue().split("\n");
var want = j.sel.replace(/\s+/g, " ").trim();
for (var i = 0; i < lines.length; i++) {
var t = lines[i].replace(/\s*\{\s*$/, "").replace(/\s+/g, " ").trim();
if (t === want && /\{\s*$/.test(lines[i])) {
if (j.phone && !S.cm.getValue().split("\n").slice(0, i).some(function (l) { return l.indexOf("@media") === 0; })) continue;
S.cm.setSelection({ line: i, ch: 0 }, { line: i, ch: lines[i].length });
S.cm.scrollIntoView({ line: i, ch: 0 }, 80);
return;
}
}
}
function applyCodeValue(tab, v) {
var e = selEl();
if (S.pendingSnap && tab !== "files") {
snap();
S.pendingSnap = false;
}
if (tab === "site") S.project.site.css = v;
if (tab === "page") curPage().css = v;
if (tab === "head") S.project.site.head = v;
if (tab === "files") {
if (S.filePath && S.files[S.filePath]) S.files[S.filePath].text = v;
scheduleSave();
renderTop();
return;
}
if (tab === "el" && e) {
var msg = $("bd-code-msg");
if (e.type === "text") e.props.html = v;
else if (e.type === "html") e.props.code = v;
else {
try {
e.props = JSON.parse(v);
if (msg) msg.textContent = "";
} catch (err) {
if (msg) msg.textContent = "Waiting for valid JSON…";
return;
}
}
}
scheduleSave();
renderTop();
renderCanvas();
if (S.inspect || (S.ins && selEl())) fillIns();
else renderRight();
}
function applyCode(t) {
applyCodeValue(t.getAttribute("data-code"), t.value);
}

/* FILES — ANY TEXT FILE IN THE REPO, PLUS UPLOADS TO /files */
async function loadFileList() {
if (S.fileListLoading) return;
S.fileListLoading = true;
try {
var ref = await gh("GET", "/git/ref/heads/" + GH_BRANCH);
var c = await gh("GET", "/git/commits/" + ref.object.sha);
var t = await gh("GET", "/git/trees/" + c.tree.sha + "?recursive=1");
S.fileList = (t.tree || []).filter(function (x) { return x.type === "blob" && editableFile(x.path); }).map(function (x) { return x.path; });
} catch (err) {
S.fileList = [];
toast("Couldn't list the repo files: " + err.message);
}
S.fileListLoading = false;
if (S.codeOpen && S.codeTab === "files") renderCode();
}
function editableFile(p) {
if (!/^site\//.test(p)) return /^(README\.md|CLAUDE\.md|wrangler\.jsonc)$/.test(p);
if (/^site\/(admin\.html|admin\/|assets\/bd\.(css|js)$)/.test(p)) return false;
if (S.generated.indexOf(p) > -1) return false;
return /\.(html|css|js|json|txt|xml|svg|md|webmanifest)$|\/_headers$|\/_redirects$/.test(p);
}
async function openFile(p) {
if (!p) {
S.filePath = "";
renderCode();
return;
}
if (!S.files[p]) {
try {
var f = await ghFile(p);
S.files[p] = { sha: f ? f.sha : null, orig: f ? f.text : "", text: f ? f.text : "" };
} catch (err) {
toast("Couldn't open " + p + ": " + err.message);
return;
}
}
S.filePath = p;
renderCode();
}
function dirtyFiles() {
return Object.keys(S.files).filter(function (p) { return S.files[p].text !== S.files[p].orig; });
}
async function uploadFile(file) {
var isImg = /^image\//.test(file.type);
var name = slugify(file.name.replace(/\.[^.]+$/, "")) || "file";
var ext = (file.name.split(".").pop() || "").toLowerCase();
var path = "site/" + (isImg ? "images/" : "files/") + name + (ext ? "." + ext : "");
if (file.size > 50 * 1024 * 1024) {
toast(file.name + " is over 50 MB. GitHub won't take it.");
return;
}
setStatus("Uploading…");
try {
var j = await gh("POST", "/git/blobs", { content: await blobToB64(file), encoding: "base64" });
S.uploads = S.uploads.filter(function (u) { return u.path !== path; }).concat([{ path: path, sha: j.sha }]);
saveNow();
renderCode();
toast("Uploaded. Link to it as /" + path.replace(/^site\//, "") + " — live after you publish.");
} catch (err) {
if (err.message === "KEY") lock("That GitHub key no longer works. Make a new one.");
else toast(file.name + " didn't upload: " + err.message);
setStatus("Not published", true);
}
}

/* INSPECT — PICK ANY ELEMENT, STYLE IT IN SITE CSS OR PAGE CSS (PHONE WRITES TO THE ONE MOBILE BLOCK) */
var MOBILE_Q = "@media (max-width: 760px)";
var IFIELDS = [
{ g: "Text", k: "size", l: "Size", p: ["font-size"], c: "fontSize" },
{ g: "Text", k: "lh", l: "Line", p: ["line-height"], c: "lineHeight" },
{ g: "Text", k: "track", l: "Spacing", p: ["letter-spacing"], c: "letterSpacing" },
{ g: "Text", k: "weight", l: "Weight", p: ["font-weight"], c: "fontWeight", opts: ["", "300", "400", "500", "700"] },
{ g: "Text", k: "style", l: "Style", p: ["font-style"], c: "fontStyle", opts: ["", "normal", "italic"] },
{ g: "Text", k: "case", l: "Case", p: ["text-transform"], c: "textTransform", opts: ["", "none", "uppercase", "lowercase"] },
{ g: "Text", k: "color", l: "Colour", p: ["color"], c: "color", col: true },
{ g: "Text", k: "align", l: "Align", p: ["text-align"], c: "textAlign", seg: ["left", "center", "right"] },
{ g: "Text", k: "indent", l: "Indent", p: ["text-indent"], c: "textIndent" },
{ g: "Box", k: "bg", l: "Fill", p: ["background-color", "background"], c: "backgroundColor", col: true },
{ g: "Box", k: "mt", l: "Space above", p: ["margin-top"], c: "marginTop" },
{ g: "Box", k: "mb", l: "Space below", p: ["margin-bottom"], c: "marginBottom" },
{ g: "Box", k: "pad", l: "Padding", p: ["padding"], c: "padding" },
{ g: "Box", k: "w", l: "Width", p: ["width"], c: "width" },
{ g: "Box", k: "maxw", l: "Max width", p: ["max-width"], c: "maxWidth" },
{ g: "Box", k: "border", l: "Border", p: ["border"], c: "borderTop" },
{ g: "Box", k: "rad", l: "Round", p: ["border-radius"], c: "borderTopLeftRadius" },
{ g: "Box", k: "op", l: "Opacity", p: ["opacity"], c: "opacity" },
{ g: "Box", k: "disp", l: "Show", p: ["display"], c: "display", opts: ["", "block", "inline", "flex", "grid", "none"] }
];
var BD_TYPE_CLASSES = ["bd-text", "bd-notes", "bd-figure", "bd-gallery", "bd-library", "bd-link", "bd-list", "bd-embed", "bd-html", "bd-rule", "bd-ptitle", "bd-menubtn", "bd-pagerbar", "bd-posts", "bd-postinfo", "bd-quote", "bd-toggle", "bd-product"];
var INSPECT_CSS = `
/* INSPECT */
.is-inspect * {
cursor: crosshair !important;
}
.is-inspect .bd-ins-hover {
outline: 1px dashed rgba(47, 75, 255, 0.7);
outline-offset: -1px;
}
.is-inspect .bd-ins-on {
outline: 2px solid #2f4bff;
outline-offset: -1px;
}
`;

/* CSS TEXT — SPLIT THE MOBILE BLOCK OFF, FIND AND CHANGE ONE RULE */
function cssSplit(css) {
css = String(css || "");
var re = /@media\s*\(\s*max-width\s*:\s*760px\s*\)\s*\{/g;
var m;
var last = null;
while ((m = re.exec(css))) last = m;
if (!last) return { desk: css, mob: "" };
var open = last.index + last[0].length - 1;
var close = matchClose(css, open);
var desk = (css.slice(0, last.index) + css.slice(close + 1)).replace(/\/\*\s*MOBILE\s*\*\/\s*$/, "").replace(/\s+$/, "");
return { desk: desk, mob: css.slice(open + 1, close).replace(/^\s*\n/, "").replace(/\s+$/, "") };
}
function cssJoin(desk, mob) {
desk = String(desk || "").replace(/\s+$/, "");
mob = String(mob || "").replace(/^\s+|\s+$/g, "");
if (!mob) return desk ? desk + "\n" : "";
return (desk ? desk + "\n\n" : "") + "/* MOBILE */\n" + MOBILE_Q + " {\n" + mob + "\n}\n";
}
function matchClose(css, open) {
var d = 0;
for (var i = open; i < css.length; i++) {
if (css[i] === "{") d++;
else if (css[i] === "}") {
d--;
if (d === 0) return i;
}
}
return css.length - 1;
}
function normSel(s) {
return String(s).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*,\s*/g, ", ").trim();
}
function cssRules(css) {
var out = [];
var i = 0;
while (i < css.length) {
var open = css.indexOf("{", i);
if (open < 0) break;
var head = css.slice(i, open);
var close = matchClose(css, open);
var sel = normSel(head);
if (sel.charAt(0) !== "@") out.push({ start: i, open: open, close: close, sel: sel, body: css.slice(open + 1, close) });
i = close + 1;
}
return out;
}
function declList(body) {
return body.replace(/\/\*[\s\S]*?\*\//g, "").split(";").map(function (d) {
var k = d.indexOf(":");
if (k < 0) return null;
return { prop: d.slice(0, k).trim().toLowerCase(), val: d.slice(k + 1).trim() };
}).filter(function (d) { return d && d.prop; });
}
function ruleGet(css, sel, props) {
var r = cssRules(css).filter(function (x) { return x.sel === normSel(sel); }).pop();
if (!r) return "";
var d = declList(r.body).filter(function (x) { return props.indexOf(x.prop) > -1; }).pop();
return d ? d.val : "";
}
function ruleSet(css, sel, props, val) {
val = String(val == null ? "" : val).trim().replace(/;+$/, "");
var rules = cssRules(css).filter(function (x) { return x.sel === normSel(sel); });
var r = rules[rules.length - 1];
if (!r) {
if (!val) return css;
return css.replace(/\s+$/, "") + (css.trim() ? "\n" : "") + sel + " {\n" + props[0] + ": " + val + ";\n}";
}
var decls = declList(r.body);
var done = false;
decls = decls.filter(function (d) {
if (props.indexOf(d.prop) < 0) return true;
if (done || !val) return false;
d.prop = props[0];
d.val = val;
done = true;
return true;
});
if (val && !done) decls.push({ prop: props[0], val: val });
var leadStart = r.start;
while (leadStart < r.open && /\s/.test(css[leadStart])) leadStart++;
var block = decls.length ? sel + " {\n" + decls.map(function (d) { return d.prop + ": " + d.val + ";"; }).join("\n") + "\n}" : "";
var after = css.slice(r.close + 1);
if (!block) after = after.replace(/^\n/, "");
return css.slice(0, leadStart) + block + after;
}

/* WHAT YOU PICKED */
function insRoot() {
return shadow ? shadow.querySelector(".bd-site") : null;
}
function insKids(el) {
return Array.prototype.filter.call(el.children, function (c) { return !/(^|\s)bd-ed-/.test(String(c.className || "")) && c.tagName !== "STYLE"; });
}
function insPath(el) {
var root = insRoot();
var path = [];
while (el && el !== root && el.parentElement) {
path.unshift(insKids(el.parentElement).indexOf(el));
el = el.parentElement;
}
return el === root ? path : null;
}
function insEl() {
var root = insRoot();
if (!S.ins || !root) return null;
var el = root;
for (var i = 0; i < S.ins.path.length; i++) {
el = insKids(el)[S.ins.path[i]];
if (!el) return null;
}
return el;
}
function insTok(el) {
var cls = Array.prototype.slice.call(el.classList || []).filter(function (c) {
return !/^(is|has)-/.test(c) && !/^bd-(e|i)-/.test(c) && c !== "bd-el" && c !== "bd-ins-on" && c !== "bd-ins-hover" && c !== "bd-site";
});
var bd = cls.filter(function (c) { return /^bd-/.test(c); });
if (bd.length) return "." + bd[0];
if (cls.length) return "." + cls[0];
return el.tagName.toLowerCase();
}
function insBlock(el) {
return el.closest ? el.closest(".bd-el") : null;
}
function insSels(el) {
var root = insRoot();
if (el === root) return { one: ".bd-site", all: ".bd-site" };
var blk = insBlock(el);
if (blk) {
var id = idOf(blk);
var type = BD_TYPE_CLASSES.filter(function (c) { return blk.classList.contains(c); })[0] || "bd-el";
if (blk === el) return { one: ".bd-e-" + id, all: "." + type };
var t = insTok(el);
return { one: ".bd-e-" + id + " " + t, all: "." + type + " " + t };
}
var t2 = insTok(el);
if (/^\.bd-/.test(t2)) return { one: t2, all: t2 };
var anc = el.parentElement;
while (anc && anc !== root && !/^\.bd-/.test(insTok(anc))) anc = anc.parentElement;
var s = (anc && anc !== root ? insTok(anc) + " " : ".bd-site ") + t2;
return { one: s, all: s };
}
function insLabel(el) {
var t = el.tagName.toLowerCase();
return t + Array.prototype.slice.call(el.classList || []).filter(function (c) { return c !== "bd-ins-on" && c !== "bd-ins-hover"; }).map(function (c) { return "." + c; }).join("");
}
function insSel() {
var el = insEl();
if (!el) return "";
var s = insSels(el);
return S.ins.scope === "all" ? s.all : s.one;
}
function insCSS() {
return S.ins && S.ins.where === "page" ? (curPage().css || "") : (S.project.site.css || "");
}
function insPut(css) {
if (S.ins && S.ins.where === "page") curPage().css = css;
else S.project.site.css = css;
}
function insGet(props) {
var sp = cssSplit(insCSS());
var sel = insSel();
var phone = S.mode === "phone";
var v = ruleGet(phone ? sp.mob : sp.desk, sel, props);
var base = phone ? ruleGet(sp.desk, sel, props) : "";
return { val: v, base: base };
}
function insSetProp(props, val) {
var sel = insSel();
if (!sel) return;
if (S.pendingIns !== sel + props[0]) {
snap();
S.pendingIns = sel + props[0];
}
var sp = cssSplit(insCSS());
if (S.mode === "phone") sp.mob = ruleSet(sp.mob, sel, props, val);
else sp.desk = ruleSet(sp.desk, sel, props, val);
insPut(cssJoin(sp.desk, sp.mob));
scheduleSave();
renderTop();
renderCanvas();
setTimeout(fillIns, 20);
if (S.codeOpen && (S.codeTab === "site" || S.codeTab === "page")) {
S.codeJump = { tab: S.ins.where === "page" ? "page" : "site", sel: sel, phone: S.mode === "phone" };
renderCode();
}
}
function pickIns(el) {
var root = insRoot();
if (!el || !root || !root.contains(el)) return;
var p = insPath(el);
if (!p) return;
S.ins = { path: p, scope: S.ins ? S.ins.scope : "one", where: S.ins ? S.ins.where : "site" };
S.pendingIns = "";
var blk = insBlock(el);
S.sel = blk ? idOf(blk) : null;
markIns();
renderRight();
if (S.codeOpen && S.codeTab === "el") renderCode();
}
function markIns() {
var root = insRoot();
if (!root) return;
root.querySelectorAll(".bd-ins-on").forEach(function (n) { n.classList.remove("bd-ins-on"); });
var el = insEl();
if (el) el.classList.add("bd-ins-on");
}
function stepVal(v, d) {
var m = /^(-?\d*\.?\d+)([a-z%]*)$/i.exec(String(v).trim());
if (!m) return null;
var n = Math.round((parseFloat(m[1]) + d) * 100) / 100;
return n + (m[2] || "px");
}
function toHex(c) {
if (!c) return "#000000";
if (/^#[0-9a-f]{6}$/i.test(c)) return c;
if (/^#[0-9a-f]{3}$/i.test(c)) return "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
var m = /rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(c);
if (!m) return "#000000";
return "#" + [m[1], m[2], m[3]].map(function (x) { return ("0" + (+x).toString(16)).slice(-2); }).join("");
}
function insPanel(embedded) {
var el = insEl();
var h = "";
if (!embedded) {
h += '<div class="bd-ed-sec"><div class="bd-ed-head"><span class="bd-ed-title">Style anything</span><button class="bd-ed-btn" style="height:26px" data-act="inspect">Done</button></div>';
if (!el) return h + '<div class="bd-ed-hint">Tap anything on the page — a word, a heading, the menu, the header — to style it. ' + (S.mode === "phone" ? "On Phone, changes apply to phones only." : "Switch to Phone to style phones separately.") + "</div></div>";
} else {
if (!el) return "";
h += '<div class="bd-ed-sec">';
}
var s = insSels(el);
var blk = insBlock(el);
var whole = embedded && blk && blk === el;
h += '<div class="bd-ed-head"><span class="bd-ed-label">Style' + (S.mode === "phone" ? ' <b class="bd-ed-ph">phone</b>' : "") + '</span><span class="bd-ed-actions">'
+ (embedded ? '<button class="bd-ed-btn is-sm" data-act="ins-pick">' + I.target + (whole ? "Pick inside" : "Pick") + "</button>" : "")
+ (!whole && el.parentElement && el !== insRoot() ? '<button class="bd-ed-btn is-sm" data-act="ins-parent">' + I.up + "Parent</button>" : "")
+ '<button class="bd-ed-btn is-sm" data-act="ins-code" aria-label="Show rule in code">' + I.code + "</button></span></div>"
+ (whole ? "" : '<div class="bd-ed-ins-tag">' + esc(insLabel(el)) + "</div>")
+ row(field("Applies to", select("ins.scope", S.ins.scope, [["one", "Just this"], ["all", s.all === s.one ? "Same" : "All like it"]])), field("Saved in", select("ins.where", S.ins.where, [["site", "Site CSS"], ["page", "This page"]])));
var groups = {};
IFIELDS.forEach(function (f) {
if (!groups[f.g]) groups[f.g] = [];
groups[f.g].push(f);
});
Object.keys(groups).forEach(function (g, gi) {
var inner = '<div class="bd-ed-ins-grid">';
groups[g].forEach(function (f) {
inner += '<label class="bd-ed-ins-f" data-k="' + f.k + '"><span>' + f.l + "</span>";
if (f.seg) inner += '<span class="bd-ed-seg">' + f.seg.map(function (v) { return '<button data-act="ins-seg" data-k="' + f.k + '" data-val="' + v + '">' + (v === "left" ? "L" : v === "center" ? "C" : "R") + "</button>"; }).join("") + "</span>";
else if (f.opts) inner += '<select class="bd-ed-input" data-ins="' + f.k + '">' + f.opts.map(function (v) { return '<option value="' + v + '">' + (v || "—") + "</option>"; }).join("") + "</select>";
else inner += '<span class="bd-ed-ins-row">' + (f.col ? '<input type="color" data-ins-col="' + f.k + '" aria-label="' + f.l + ' colour">' : "") + '<input class="bd-ed-input" data-ins="' + f.k + '" autocomplete="off" spellcheck="false" autocapitalize="off"></span>';
inner += "</label>";
});
inner += "</div>";
h += adv("ins-" + g, g, inner, !embedded || gi === 0);
});
if (!embedded) {
var model = blk ? selEl() : null;
if (model) h += '<div class="bd-ed-actions">' + ((model.type === "image" || (model.type === "gallery" && el.tagName === "IMG")) ? '<button class="bd-ed-btn" data-act="ins-img">' + I.image + "Replace image</button>" : "") + '<button class="bd-ed-btn" data-act="ins-block">' + I.sliders + "Open block</button></div>";
}
return h + "</div>";
}
function fillIns() {
var R = $("bd-right");
var el = insEl();
if (!el || !R) return;
markIns();
var cs = getComputedStyle(el);
IFIELDS.forEach(function (f) {
var w = R.querySelector('[data-k="' + f.k + '"]');
if (!w) return;
var v = insGet(f.p);
var now = cs[f.c] || "";
w.classList.toggle("is-set", !!v.val);
if (f.seg) {
w.querySelectorAll("button").forEach(function (b) { b.classList.toggle("is-on", b.getAttribute("data-val") === v.val); });
return;
}
var inp = w.querySelector("[data-ins]");
if (inp && document.activeElement !== inp) {
inp.value = v.val;
if (inp.tagName === "INPUT") inp.placeholder = v.base || now;
}
var sw = w.querySelector("[data-ins-col]");
if (sw) sw.value = toHex(/^#|rgb/.test(v.val) ? v.val : now);
});
}
function insField(k) {
return IFIELDS.filter(function (f) { return f.k === k; })[0];
}
document.addEventListener("input", function (e) {
var t = e.target;
if (!t.closest || !t.closest("#bd-right")) return;
var k = t.getAttribute("data-ins");
var kc = t.getAttribute("data-ins-col");
if (kc) {
var inp = $("bd-right").querySelector('[data-ins="' + kc + '"]');
if (inp) inp.value = t.value;
clearTimeout(S.insT);
S.insT = setTimeout(function () { insSetProp(insField(kc).p, t.value); }, 120);
e.stopImmediatePropagation();
return;
}
if (!k) return;
e.stopImmediatePropagation();
clearTimeout(S.insT);
var f = insField(k);
S.insT = setTimeout(function () { insSetProp(f.p, t.value); }, t.tagName === "SELECT" ? 0 : 450);
}, true);
document.addEventListener("keydown", function (e) {
var t = e.target;
if (!t.getAttribute || !t.getAttribute("data-ins") || t.tagName !== "INPUT") return;
if (e.key === "Enter") {
t.blur();
return;
}
if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
var nv = stepVal(t.value || t.placeholder, (e.key === "ArrowUp" ? 1 : -1) * (e.shiftKey ? 10 : 1));
if (nv == null) return;
e.preventDefault();
e.stopPropagation();
t.value = nv;
clearTimeout(S.insT);
insSetProp(insField(t.getAttribute("data-ins")).p, nv);
}, true);

/* INSERT RAIL */
function renderRail() {
var r = $("bd-rail");
r.hidden = !S.project || S.preview;
r.innerHTML = [["text", "Text"], ["image", "Image"], ["gallery", "Gallery"], ["library", "Library"], ["link", "Link"], ["notes", "Notes"], ["list", "List"], ["embed", "Video"], ["html", "HTML"], ["rule", "Rule"], ["quote", "Quote"], ["toggle", "Fold-out list"], ["product", "Product"], ["sep"], ["menubtn", "Menu"], ["ptitle", "Page title"], ["pager", "Page arrows"], ["sep"], ["posts", "Blog posts"], ["postinfo", "Post info"]].map(function (t) {
if (t[0] === "sep") return '<span class="bd-ed-rail-sep"></span>';
return '<button class="bd-ed-tool" data-act="add" data-type="' + t[0] + '" data-tip="' + t[1] + '" aria-label="Add ' + t[1] + '">' + I[t[0]] + "</button>";
}).join("") + '<span class="bd-ed-rail-sep"></span><button class="bd-ed-tool" data-act="inspect" data-tip="Style anything" aria-label="Style anything">' + I.target + "</button>";
}

/* CANVAS */
var shadow = null;
S.zoom = 1;
function fitSheet() {
var sheet = $("bd-sheet");
var fit = $("bd-fit");
if (!S.project || sheet.hidden) return;
var w = parseFloat(sheet.style.width) || 782;
var avail = $("bd-stage").clientWidth - 80;
var k = Math.min(1, Math.max(0.35, avail / w));
S.zoom = k;
sheet.style.transform = k < 1 ? "scale(" + k + ")" : "translateZ(0)";
fit.style.width = w * k + "px";
fit.style.height = sheet.offsetHeight * k + "px";
$("bd-ruler").style.maxWidth = w * k + "px";
var z = document.getElementById("bd-zoom");
if (z) z.textContent = Math.round(k * 100) + "%";
}
if (window.ResizeObserver) {
new ResizeObserver(function () { fitSheet(); }).observe(document.getElementById("bd-sheet"));
new ResizeObserver(function () { fitSheet(); }).observe(document.getElementById("bd-stage"));
}
function rulerCols(page, phone) {
var L = lay(page);
var who = layWho(page);
var pin = page.kind === "pin";
var h = '<span class="bd-ed-rcols">';
if (!pin) h += '<span class="bd-ed-seg">' + [["site", "Site"], ["page", "This page"]].map(function (o) { return '<button data-act="page-own" data-val="' + o[0] + '" class="' + ((o[0] === "page") === !!page.ownLayout ? "is-on" : "") + '">' + o[1] + "</button>"; }).join("") + "</span>";
else h += "<b>" + (page.pin.place === "bottom" ? "Footer" : "Header") + "</b>";
if (phone) {
h += L.cols < 2 ? "<span>1 column on phone</span>" : '<span>Phone</span><span class="bd-ed-seg">' + [1, 2].map(function (n) { return '<button data-act="lay-colsM" data-who="' + who + '" data-val="' + n + '" class="' + (L.colsM === n ? "is-on" : "") + '">' + n + "</button>"; }).join("") + "</span>"
+ (L.cols > 1 ? '<label class="bd-ed-rnum">Gutter<input class="bd-ed-input" inputmode="decimal" data-bind="' + (who === "site" ? "site.layout" : "page.colset") + '.gutterM" data-type="int" value="' + L.gutterM + '"></label>' : "");
return h + "</span>";
}
h += '<span class="bd-ed-seg">' + [1, 2, 3].map(function (n) { return '<button data-act="lay-cols" data-who="' + who + '" data-val="' + n + '" class="' + (L.cols === n ? "is-on" : "") + '">' + n + (n === 1 ? " col" : "") + "</button>"; }).join("") + "</span>";
if (L.cols === 1 && !pin) h += '<span class="bd-ed-seg">' + [["center", "Centred"], ["spread", "Spread"]].map(function (o) { return '<button data-act="set" data-path="' + (who === "page" ? "page.colset" : "site.layout") + '.align" data-val="' + o[0] + '" class="' + (L.align === o[0] ? "is-on" : "") + '">' + o[1] + "</button>"; }).join("") + "</span>";
if (L.cols > 1) {
h += '<select class="bd-ed-input bd-ed-rsel" data-act-select="lay-spans" data-who="' + who + '" aria-label="Column widths">' + SPAN_PRESETS[L.cols].map(function (sp) {
var v = sp.join("-");
return '<option value="' + v + '"' + (L.spans.join("-") === v ? " selected" : "") + ">" + sp.join(" · ") + "</option>";
}).join("") + "</select>"
+ '<label class="bd-ed-rnum">Gutter<input class="bd-ed-input" inputmode="decimal" data-bind="' + (who === "site" ? "site.layout" : "page.colset") + '.gutter" data-type="int" value="' + L.gutter + '"></label>';
}
return h + "</span>";
}
function renderCanvas() {
renderRail();
var sheet = $("bd-sheet");
var empty = $("bd-empty");
if (!S.project) {
sheet.hidden = true;
$("bd-fit").hidden = true;
$("bd-ruler").innerHTML = "";
empty.hidden = false;
empty.innerHTML = S.booting ? '<div class="bd-ed-hint">Opening ' + esc(REPO.domain || "the site") + '…</div>' : S.loadError ? '<div class="bd-ed-empty-card"><span class="bd-ed-label">Back office</span><h2>The site couldn’t be opened.</h2><div class="bd-ed-hint">' + esc(S.loadError) + '</div><div class="bd-ed-actions"><button class="bd-ed-btn is-primary" data-act="reload">Try again</button></div></div>' : "";
return;
}
empty.hidden = true;
sheet.hidden = false;
$("bd-fit").hidden = false;
var s = S.project.site;
var page = curPage();
var phone = S.mode === "phone";
var master = isMaster(page);
if (phone && !master && ensurePhone(page)) scheduleSave();
sheet.className = "bd-ed-sheet " + (phone ? "is-phone" : "is-desk");
var sheetW = phone ? 390 : isSpreadPage(page) ? 1280 : Math.max(640, s.w + 80);
sheet.style.width = sheetW + "px";
var ruler = $("bd-ruler");
ruler.className = "bd-ed-ruler" + (phone ? " is-phone" : "");
ruler.style.maxWidth = sheetW + "px";
ruler.innerHTML = "<span>" + (S.inspect ? "Inspect · tap anything to style it · " + (phone ? "phone" : "desktop") : S.preview ? "Preview · menu and arrows work" : (phone ? "Phone" : "Desktop") + " · " + sheetW + 'px · <span id="bd-zoom">100%</span>') + "</span>" + (master && !S.preview ? rulerCols(page, phone) : "<span>" + (master ? "Follows master" : "Free grid") + "</span>");
if (!shadow) {
shadow = sheet.attachShadow({ mode: "open" });
bindCanvas();
}
var shown = [page].concat(relatedPages(page));
shown.forEach(function (p) {
if (phone && !isMaster(p) && p !== page && ensurePhone(p)) scheduleSave();
});
var layout = masterRules(s, false) + "\n" + colRules(false) + "\n" + pinRules(false) + "\n" + shown.map(function (p) { return layoutRules(p, false); }).join("\n");
if (phone) layout += "\n" + mobileRules(s, ".bd-site") + "\n" + masterRules(s, true) + "\n" + colRules(true) + "\n" + pinRules(true) + "\n" + shown.map(function (p) { return layoutRules(p, true); }).join("\n");
var sc = cssSplit(s.css);
var pc = cssSplit(page.css);
var pinH = page.kind === "pin" ? (phone && page.pin.hM !== "" && page.pin.hM != null ? page.pin.hM : page.pin.h) : "";
if (pinH !== "" && pinH != null && !isNaN(parseFloat(pinH))) layout += "\n.bd-main {\nflex: none;\nheight: " + parseFloat(pinH) + "px;\nbox-shadow: 0 1px 0 #ff4d00;\n}";
var css = baseCSS(s, "edit") + "\n" + (!isSpread(s) && isSpreadPage(page) ? ":host {\n--bd-w: 100%;\n}\n" : "") + layout + "\n" + sc.desk + "\n" + pc.desk + "\n" + (phone ? sc.mob + "\n" + pc.mob + "\n" : "") + (S.inspect ? INSPECT_CSS : S.preview ? "" : EDIT_CSS);
shadow.innerHTML = "<style>" + css + '</style><div class="bd-site' + (phone ? " is-phone" : "") + (S.inspect ? " is-inspect" : S.preview ? "" : " is-editing") + (page.kind === "pin" ? " is-pin-page" : "") + '" data-bd-page="' + esc(page.slug) + '">' + pageHTML(page, "edit") + "</div>";
var data = chromeData(page.slug);
data.open = !!S.menuOpen;
data.onToggle = function (o) { S.menuOpen = o; };
bdChrome(shadow, data, function (slug) {
var id = S.project.order.filter(function (i) { return S.project.pages[i].slug === slug && S.project.pages[i].kind !== "pin"; })[0];
if (id) goPage(id);
});
requestAnimationFrame(fitSheet);
if (S.preview) {
bdGalleries(shadow.querySelector(".bd-site"));
if (S.inspect) markIns();
return;
}
var grid = shadow.querySelector(".bd-main > .bd-grid, .bd-main > .bd-flow");
var selG = selEl();
if (selG && selG.type === "gallery" && selG.props.layout === "free") {
shadow.querySelectorAll(".bd-e-" + selG.id + " .bd-gi figure").forEach(function (f) {
var hd = document.createElement("span");
hd.className = "bd-ed-fh";
f.appendChild(hd);
});
}
shadow.querySelectorAll(".bd-main > .bd-flow, .bd-main > .bd-grid, .bd-main > .bd-cols > .bd-col").forEach(function (g) {
var cols = document.createElement("div");
cols.className = "bd-ed-cols";
cols.innerHTML = new Array(gridCols() + 1).join("<i></i>");
g.insertBefore(cols, g.firstChild);
});
if (S.sel === "__menu") {
var b = shadow.querySelector(".bd-burger");
if (b) b.classList.add("is-selected");
} else if (S.sel) {
var node = shadow.querySelector(".bd-e-" + S.sel);
if (node) node.classList.add("is-selected");
}
requestAnimationFrame(function () { placeSel(); });
}
function placeSel(tmp) {
if (!shadow) return;
var old = shadow.querySelector(".bd-ed-sel");
if (old) old.remove();
var e = selEl();
if (!e || S.preview || S.live) return;
var node = shadow.querySelector(".bd-main .bd-e-" + e.id);
var grid = node && node.parentElement;
if (!node || !grid) return;
var flow = isMaster(curPage());
var phone = S.mode === "phone";
var box = document.createElement("div");
box.className = "bd-ed-sel";
box.style.left = node.offsetLeft + "px";
box.style.top = node.offsetTop + "px";
box.style.width = node.offsetWidth + "px";
box.style.height = node.offsetHeight + "px";
var label;
if (flow) {
var ep = tmp || effPlace(e, phone);
var own = e.own && (phone ? (e.own.xm != null || e.own.wm != null) : (e.own.x != null || e.own.w != null));
label = BD_TYPE_NAME[e.type].toLowerCase() + (nCols(curPage()) > 1 ? " · column " + colOf(e, curPage()) : "") + " · x " + (ep.x + 1) + " · span " + ep.w + (own ? " · own" : " · master");
box.innerHTML = '<span class="bd-ed-tag">' + label + '</span><span class="bd-ed-h" data-h="e"></span>';
} else {
var pos = tmp || e[posKey()] || e.d;
label = BD_TYPE_NAME[e.type].toLowerCase() + " · " + pos.x + "," + pos.y + " · " + pos.w + "×" + pos.h;
box.innerHTML = '<span class="bd-ed-tag">' + label + '</span><span class="bd-ed-h" data-h="e"></span><span class="bd-ed-h" data-h="s"></span><span class="bd-ed-h" data-h="se"></span>';
}
grid.appendChild(box);
}
function tracks(str) {
if (!str || str === "none") return [];
return str.split(" ").map(parseFloat).filter(function (n) { return !isNaN(n); });
}
function cellAt(grid, cx, cy) {
var r = grid.getBoundingClientRect();
var cs = getComputedStyle(grid);
var cols = tracks(cs.gridTemplateColumns);
var rows = tracks(cs.gridTemplateRows);
var cg = parseFloat(cs.columnGap) || 0;
var rg = parseFloat(cs.rowGap) || 0;
var k = S.zoom || 1;
var x = (cx - r.left) / k;
var y = (cy - r.top) / k;
var c = cols.length - 1;
var acc = 0;
for (var i = 0; i < cols.length; i++) {
if (x < acc + cols[i] + cg / 2) {
c = i;
break;
}
acc += cols[i] + cg;
}
if (x < 0) c = 0;
var row = -1;
acc = 0;
for (var j = 0; j < rows.length; j++) {
if (y < acc + rows[j] + rg / 2) {
row = j;
break;
}
acc += rows[j] + rg;
}
if (row < 0) row = rows.length + Math.max(0, Math.floor((y - acc) / (S.project.site.row + rg)));
if (y < 0) row = 0;
return { c: Math.max(0, c), r: Math.max(0, row) };
}
function colAt(box, cx) {
var s = S.project.site;
var phone = S.mode === "phone";
var cols = gridCols();
var gap = phone ? s.gapM : s.gap;
var r = box.getBoundingClientRect();
var x = (cx - r.left) / (S.zoom || 1);
var colw = (box.clientWidth - (cols - 1) * gap) / cols;
return clamp(Math.floor((x + gap / 2) / (colw + gap)), 0, cols - 1);
}
function setOwn(el, phone, vals) {
el.own = el.own || {};
if (vals.x != null) el.own[phone ? "xm" : "x"] = vals.x;
if (vals.w != null) el.own[phone ? "wm" : "w"] = vals.w;
}
function idOf(node) {
var m = node && node.className && String(node.className).match(/bd-e-([a-z0-9]+)/);
return m ? m[1] : null;
}
function selectEl(id) {
S.sel = id;
S.confirm = null;
if (shadow) {
shadow.querySelectorAll(".is-selected").forEach(function (n) { n.classList.remove("is-selected"); });
if (id === "__menu") {
var b = shadow.querySelector(".bd-burger");
if (b) b.classList.add("is-selected");
} else {
var node = id && shadow.querySelector(".bd-e-" + id);
if (node) node.classList.add("is-selected");
}
}
placeSel();
renderRight();
if (S.codeOpen && S.codeTab === "el") renderCode();
}
function bindCanvas() {
shadow.addEventListener("pointermove", function (e) {
if (!S.inspect || e.pointerType === "touch") return;
var t = e.target;
if (S.insHover === t) return;
if (S.insHover) S.insHover.classList.remove("bd-ins-hover");
S.insHover = t && t.classList && !t.classList.contains("bd-site") ? t : null;
if (S.insHover) S.insHover.classList.add("bd-ins-hover");
});
shadow.addEventListener("click", function (e) {
if (!S.inspect) return;
e.preventDefault();
e.stopPropagation();
}, true);
shadow.addEventListener("error", function (e) {
var t = e.target;
if (t && t.tagName === "IMG") repoImage(t);
}, true);
shadow.addEventListener("pointerdown", function (e) {
if (S.inspect) {
e.preventDefault();
pickIns(e.target);
return;
}
if (S.preview || !S.project) return;
var t = e.target;
if (t.closest(".bd-burger") && !(curPage().kind === "pin" && t.closest(".bd-menubtn"))) {
if (S.live) endEdit();
selectEl("__menu");
if (window.innerWidth <= 980) {
S.rightOpen = true;
S.leftOpen = false;
renderLeft();
renderRight();
}
return;
}
if (t.closest(".bd-menu, .bd-pager")) return;
var pinEl = t.closest("[data-pin]");
if (pinEl) {
goPage(pinEl.getAttribute("data-pin"));
toast("Editing the " + (S.project.pages[pinEl.getAttribute("data-pin")].pin.place === "bottom" ? "footer" : "header") + ".");
return;
}
var stEl = t.closest("[data-stack]");
if (stEl) {
goPage(stEl.getAttribute("data-stack"));
return;
}
var fig = t.closest(".bd-gallery.is-free .bd-gi figure");
if (fig) {
var gNode = fig.closest(".bd-gallery");
var gId = idOf(gNode);
if (S.sel !== gId) selectEl(gId);
var gm = selEl();
var iid = (fig.className.match(/bd-i-([a-z0-9]+)/) || [])[1];
var it = gm && gm.props.items.filter(function (x) { return x.id === iid; })[0];
if (it) {
e.preventDefault();
var gr = gNode.querySelector(".bd-gi").getBoundingClientRect();
S.drag = { kind: t.classList.contains("bd-ed-fh") ? "fsize" : "fmove", fig: fig, node: fig, g: gm.props, it: it, sx: e.clientX, sy: e.clientY, w: gr.width, H: freeHeight(gm.props), start: { fx: it.fx, fy: it.fy, fw: it.fw }, moved: false };
return;
}
}
var page = curPage();
var flow = isMaster(page);
var phone = S.mode === "phone";
var handle = t.closest(".bd-ed-h");
var grid = shadow.querySelector(".bd-main > .bd-grid, .bd-main > .bd-flow");
if (handle) {
var el = selEl();
e.preventDefault();
var hn = shadow.querySelector(".bd-main .bd-e-" + el.id);
grid = hn.parentElement;
if (flow) S.drag = { kind: "fresize", id: el.id, grid: grid, node: hn, start: effPlace(el, phone), curW: null, moved: false, sx: e.clientX, sy: e.clientY };
else S.drag = { kind: "resize", dir: handle.getAttribute("data-h"), id: el.id, grid: grid, node: hn, start: clone(el[posKey()]), cur: null, moved: false, sx: e.clientX, sy: e.clientY };
return;
}
var node = t.closest(".bd-el");
if (S.live) {
if (node && idOf(node) === S.live) return;
endEdit();
node = node && shadow.querySelector(".bd-e-" + idOf(node));
grid = shadow.querySelector(".bd-main > .bd-grid, .bd-main > .bd-flow");
}
if (!node) {
if (S.sel) selectEl(null);
return;
}
var id = idOf(node);
var was = S.sel === id;
if (!was) selectEl(id);
var model = selEl();
if (!model) return;
e.preventDefault();
grid = node.parentElement;
if (flow) {
var ep = effPlace(model, phone);
S.drag = { kind: "flow", id: id, col: colOf(model, page), grid: grid, node: node, start: ep, curX: null, idx: page.els.indexOf(model), target: null, moved: false, was: was, sx: e.clientX, sy: e.clientY, off: colAt(grid, e.clientX) - ep.x };
return;
}
var pos = model[posKey()];
var c = cellAt(grid, e.clientX, e.clientY);
S.drag = { kind: "move", id: id, grid: grid, node: node, start: clone(pos), cur: null, moved: false, was: was, sx: e.clientX, sy: e.clientY, off: { c: c.c - pos.x, r: c.r - pos.y } };
});
shadow.addEventListener("dblclick", function (e) {
if (S.preview) return;
var node = e.target.closest(".bd-el");
if (node && !S.live) startEdit(idOf(node));
});
shadow.addEventListener("paste", function (e) {
if (!S.live) return;
e.preventDefault();
var text = (e.clipboardData || window.clipboardData).getData("text/plain");
document.execCommand("insertText", false, text);
});
}
function flowTarget(d, cx, cy) {
var page = curPage();
var tcol = d.col;
var boxes = shadow.querySelectorAll(".bd-main > .bd-cols > .bd-col");
var host = d.grid;
if (boxes.length) {
var best = null;
var bestD = Infinity;
boxes.forEach(function (b) {
var r = b.getBoundingClientRect();
var dist = cx < r.left ? r.left - cx : cx > r.right ? cx - r.right : 0;
if (dist < bestD) {
bestD = dist;
best = b;
}
});
if (best) {
tcol = +best.getAttribute("data-col");
host = best;
}
}
var others = page.els.filter(function (x) { return x.id !== d.id && (!boxes.length || colOf(x, page) === tcol); });
var t = others.length;
for (var i = 0; i < others.length; i++) {
var n = shadow.querySelector(".bd-main .bd-e-" + others[i].id);
if (!n) continue;
var r = n.getBoundingClientRect();
if (cy < r.top + r.height / 2) {
t = i;
break;
}
}
var ind = shadow.querySelector(".bd-ed-drop");
if (!ind || ind.parentElement !== host) {
if (ind) ind.remove();
ind = document.createElement("div");
ind.className = "bd-ed-drop";
host.appendChild(ind);
}
var y;
if (t < others.length) {
var nn = shadow.querySelector(".bd-main .bd-e-" + others[t].id);
y = nn.offsetTop - 6;
} else {
var last = others.length ? shadow.querySelector(".bd-main .bd-e-" + others[others.length - 1].id) : null;
y = last ? last.offsetTop + last.offsetHeight + 6 : 0;
}
ind.style.top = y + "px";
var before = t < others.length ? others[t].id : null;
var after = page.els.filter(function (x) { return colOf(x, page) === d.col; });
var k = after.indexOf(page.els.filter(function (x) { return x.id === d.id; })[0]);
var nowBefore = after[k + 1] ? after[k + 1].id : null;
ind.hidden = tcol === d.col && before === nowBefore;
return { col: tcol, before: before, same: tcol === d.col && before === nowBefore };
}
window.addEventListener("pointermove", function (e) {
var d = S.drag;
if (!d) return;
if (d.kind === "fmove" || d.kind === "fsize") {
var fdx = (e.clientX - d.sx) / d.w * 100;
var fdy = (e.clientY - d.sy) / d.w * 100;
if (!d.moved && Math.abs(fdx) + Math.abs(fdy) < 0.6) return;
d.moved = true;
var step = parseFloat(d.g.snap) || 0;
var sn = function (v) { return step ? Math.round(v / step) * step : v; };
if (d.kind === "fmove") {
d.nfx = clamp(sn(d.start.fx + fdx), 0, 100 - d.start.fw);
d.nfy = Math.max(0, sn(d.start.fy + fdy));
d.fig.style.left = d.nfx + "%";
d.fig.style.top = (d.nfy / d.H * 100) + "%";
} else {
d.nfw = clamp(sn(d.start.fw + fdx), 5, 100 - d.start.fx);
d.fig.style.width = d.nfw + "%";
}
return;
}
if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 4) return;
d.moved = true;
d.node.classList.add("is-dragging");
var cols = gridCols();
if (d.kind === "flow") {
var nx = clamp(colAt(d.grid, e.clientX) - d.off, 0, cols - d.start.w);
if (nx !== (d.curX == null ? d.start.x : d.curX)) {
d.curX = nx;
d.node.style.setProperty("--x", nx);
placeSel({ x: nx, w: d.start.w });
}
d.target = flowTarget(d, e.clientX, e.clientY);
} else if (d.kind === "fresize") {
var nw = clamp(colAt(d.grid, e.clientX) - d.start.x + 1, 1, cols - d.start.x);
if (nw !== (d.curW == null ? d.start.w : d.curW)) {
d.curW = nw;
d.node.style.setProperty("--w", nw);
placeSel({ x: d.start.x, w: nw });
}
} else {
var c = cellAt(d.grid, e.clientX, e.clientY);
var n = clone(d.start);
if (d.kind === "move") {
n.x = clamp(c.c - d.off.c, 0, cols - n.w);
n.y = Math.max(0, c.r - d.off.r);
} else {
if (d.dir.indexOf("e") > -1) n.w = clamp(c.c - n.x + 1, 1, cols - n.x);
if (d.dir.indexOf("s") > -1) n.h = Math.max(1, c.r - n.y + 1);
}
if (!d.cur || n.x !== d.cur.x || n.y !== d.cur.y || n.w !== d.cur.w || n.h !== d.cur.h) {
d.cur = n;
d.node.style.gridColumn = (n.x + 1) + " / span " + n.w;
d.node.style.gridRow = (n.y + 1) + " / span " + n.h;
placeSel(n);
}
}
var st = $("bd-stage").getBoundingClientRect();
if (e.clientY > st.bottom - 36) $("bd-stage").scrollTop += 14;
if (e.clientY < st.top + 36) $("bd-stage").scrollTop -= 14;
});
function endDrag() {
var d = S.drag;
if (!d) return;
S.drag = null;
if (d.kind === "fmove" || d.kind === "fsize") {
if (!d.moved) return;
snap();
if (d.kind === "fmove") {
d.it.fx = Math.round(d.nfx * 100) / 100;
d.it.fy = Math.round(d.nfy * 100) / 100;
} else {
d.it.fw = Math.round(d.nfw * 100) / 100;
}
changed();
return;
}
d.node.classList.remove("is-dragging");
var ind = shadow && shadow.querySelector(".bd-ed-drop");
if (ind) ind.remove();
var el = selEl();
if (!el) return;
var phone = S.mode === "phone";
if (d.kind === "flow" || d.kind === "fresize") {
var page = curPage();
var xChanged = d.curX != null && d.curX !== d.start.x;
var wChanged = d.curW != null && d.curW !== d.start.w;
var moved = d.target != null && !d.target.same;
if (moved && d.target.col !== d.col) xChanged = false;
if (xChanged || wChanged || moved) {
snap();
if (xChanged) setOwn(el, phone, { x: d.curX, w: d.start.w });
if (wChanged) setOwn(el, phone, { x: d.start.x, w: d.curW });
if (moved) placeInCol(page, el, d.target.col, d.target.before);
changed();
return;
}
if (d.moved) {
render();
return;
}
} else {
var key = posKey();
if (d.moved && d.cur && JSON.stringify(d.cur) !== JSON.stringify(el[key])) {
snap();
el[key] = d.cur;
changed();
return;
}
if (d.moved) {
render();
return;
}
}
if ((d.kind === "move" || d.kind === "flow") && d.was) {
if (el.type === "text") startEdit(el.id);
else if (S.rightOpen === false && window.innerWidth <= 980) {
S.rightOpen = true;
renderRight();
}
}
}
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
function measureBreak() {
var page = curPage();
var s = S.project.site;
var phone = S.mode === "phone";
var row = s.row;
var key = phone ? "m" : "d";
page.els.forEach(function (e) {
var n = shadow && shadow.querySelector(".bd-e-" + e.id);
var ep = effPlace(e, phone);
var y = n ? Math.round(n.offsetTop / row) : 0;
var h = n ? Math.max(1, Math.round(n.offsetHeight / row)) : 4;
e[key] = { x: ep.x, y: y, w: ep.w, h: h };
});
if (!phone) {
page.els.forEach(function (e) { e.m = null; });
ensurePhone(page);
} else {
var gapRows = Math.round(s.master.space / row);
var y = 0;
page.els.forEach(function (e) {
var ep = effPlace(e, false);
var h = e.d && e.d.h ? e.d.h : 6;
e.d = { x: ep.x, y: y, w: ep.w, h: h };
y += h + gapRows;
});
}
}
function breakPage() {
snap();
measureBreak();
curPage().layout = "free";
changed();
toast("This page now has its own free grid. Drag blocks anywhere.");
}
function joinMaster() {
var page = curPage();
snap();
page.els = sortedEls(page, "d");
page.layout = "master";
changed();
toast("This page follows the master layout again.");
}

/* TEXT EDITING */
function startEdit(id) {
var p = curPage();
var el = p && p.els.filter(function (x) { return x.id === id; })[0];
if (!el) return;
if (el.type === "html" || el.type === "notes" || el.type === "list") {
selectEl(id);
if (el.type === "html") {
S.codeOpen = true;
S.codeTab = "el";
render();
} else {
var ta = $("bd-right").querySelector("textarea");
if (ta) ta.focus();
}
return;
}
if (el.type !== "text") return;
if (S.sel !== id) selectEl(id);
var node = shadow.querySelector(".bd-e-" + id);
if (!node) return;
S.live = id;
S.liveBefore = stateJSON();
placeSel();
node.classList.add("is-live");
node.contentEditable = "true";
node.focus();
try {
document.execCommand("defaultParagraphSeparator", false, "p");
} catch (err) {}
node.addEventListener("focusout", onLiveBlur);
renderTextbar();
}
function onLiveBlur(e) {
var bar = $("bd-textbar");
if (e.relatedTarget && bar && bar.contains(e.relatedTarget)) return;
setTimeout(function () {
if (!S.live) return;
var a = document.activeElement;
if (bar && bar.contains(a)) return;
if (shadow.activeElement && shadow.activeElement.classList.contains("is-live")) return;
endEdit();
}, 0);
}
function cleanHTML(h) {
var d = document.createElement("div");
d.innerHTML = h;
d.querySelectorAll("script,style,meta,link,iframe,object").forEach(function (n) { n.remove(); });
d.querySelectorAll("div").forEach(function (n) {
var p = document.createElement("p");
p.innerHTML = n.innerHTML;
n.replaceWith(p);
});
d.querySelectorAll("span,font").forEach(function (n) {
n.replaceWith.apply(n, Array.prototype.slice.call(n.childNodes));
});
d.querySelectorAll("b").forEach(function (n) {
var s = document.createElement("strong");
s.innerHTML = n.innerHTML;
n.replaceWith(s);
});
d.querySelectorAll("i").forEach(function (n) {
var s = document.createElement("em");
s.innerHTML = n.innerHTML;
n.replaceWith(s);
});
d.querySelectorAll("*").forEach(function (n) {
Array.prototype.slice.call(n.attributes).forEach(function (a) {
var keep = n.tagName === "A" && (a.name === "href" || a.name === "target" || a.name === "rel");
if (!keep) n.removeAttribute(a.name);
});
});
var out = d.innerHTML.replace(/&nbsp;/g, " ").replace(/ {2,}/g, " ").trim();
if (out && !/^<(p|h[1-6]|ul|ol|blockquote)\b/i.test(out)) out = "<p>" + out + "</p>";
out = out.replace(/<p>(\s|<br>|&nbsp;)*<\/p>/g, "").replace(/<br>(<\/p>)/g, "$1");
return out || "<p></p>";
}
function endEdit() {
if (!S.live) return;
var id = S.live;
var node = shadow.querySelector(".bd-e-" + id);
var p = curPage();
var el = p.els.filter(function (x) { return x.id === id; })[0];
S.live = null;
var slot = $("bd-textbar-slot");
slot.innerHTML = "";
if (!node || !el) {
render();
return;
}
node.removeEventListener("focusout", onLiveBlur);
node.contentEditable = "false";
var html = cleanHTML(node.innerHTML);
if (html !== el.props.html) {
S.undo.push(S.liveBefore);
S.redo = [];
el.props.html = html;
changed();
} else {
render();
}
}
function renderTextbar() {
var slot = $("bd-textbar-slot");
slot.innerHTML = '<div class="bd-ed-textbar" id="bd-textbar" role="toolbar" aria-label="Text"><button data-cmd="bold" aria-label="Bold"><strong>B</strong></button><button data-cmd="italic" aria-label="Italic"><em>I</em></button><button data-cmd="superscript" aria-label="Superscript">x<sup>2</sup></button><button data-cmd="link">Link</button><button data-cmd="unlink">Unlink</button><button data-cmd="removeFormat" aria-label="Clear formatting">Clear</button><span id="bd-linkbox" hidden><input id="bd-linkurl" placeholder="/page or https://" aria-label="Link address"><button data-cmd="link-ok">OK</button></span><button data-cmd="done"><strong>Done</strong></button></div>';
var bar = $("bd-textbar");
bar.addEventListener("pointerdown", function (e) {
if (e.target.closest("input")) return;
e.preventDefault();
});
bar.addEventListener("mousedown", function (e) {
if (e.target.closest("input")) return;
e.preventDefault();
});
bar.addEventListener("click", function (e) {
var b = e.target.closest("[data-cmd]");
if (!b) return;
var cmd = b.getAttribute("data-cmd");
var node = shadow.querySelector(".bd-e-" + S.live);
if (cmd === "done") {
endEdit();
return;
}
if (cmd === "link") {
var before = node.querySelectorAll("a").length;
document.execCommand("createLink", false, "bd-pending-link");
if (node.querySelectorAll('a[href="bd-pending-link"]').length === 0 && node.querySelectorAll("a").length === before) {
toast("Select some words first, then tap Link.");
return;
}
$("bd-linkbox").hidden = false;
$("bd-linkurl").focus();
return;
}
if (cmd === "link-ok") {
applyLink();
return;
}
document.execCommand(cmd, false, null);
});
$("bd-linkurl").addEventListener("keydown", function (e) {
if (e.key === "Enter") {
e.preventDefault();
applyLink();
}
});
}
function applyLink() {
var node = shadow.querySelector(".bd-e-" + S.live);
var url = $("bd-linkurl").value.trim();
node.querySelectorAll('a[href="bd-pending-link"]').forEach(function (a) {
if (!url) {
a.replaceWith.apply(a, Array.prototype.slice.call(a.childNodes));
return;
}
a.setAttribute("href", url);
if (/^https?:/.test(url)) {
a.setAttribute("target", "_blank");
a.setAttribute("rel", "noopener");
}
});
$("bd-linkbox").hidden = true;
$("bd-linkurl").value = "";
node.focus();
}

/* ACTIONS */
function goPage(id) {
if (S.live) endEdit();
S.pageId = id;
S.sel = null;
S.confirm = null;
S.leftOpen = false;
render();
$("bd-stage").scrollTop = 0;
}
function addEl(type) {
var page = curPage();
var d = elDefaults(type);
var cols = S.project.site.cols;
var el = { id: uid(), type: type, d: { x: d.x || 0, y: bottomOf(page, "d") + (page.els.length ? 3 : 0), w: Math.min(d.w, cols), h: d.h }, m: null, props: d.props };
var near = selEl();
if (nCols(page) > 1) el.col = near ? colOf(near, page) : 1;
if (el.d.x + el.d.w > cols) el.d.x = 0;
if (S.mode === "phone") {
ensurePhone(page);
el.m = { x: 0, y: bottomOf(page, "m") + (page.els.length ? 3 : 0), w: S.project.site.colsM, h: type === "image" ? 30 : d.h };
}
snap();
page.els.push(el);
S.sel = el.id;
changed();
requestAnimationFrame(function () {
var node = shadow && shadow.querySelector(".bd-e-" + el.id);
if (node) node.scrollIntoView({ block: "center", behavior: "smooth" });
});
if (type === "image" || type === "gallery") {
$("bd-file").multiple = type === "gallery" || type === "library";
$("bd-file").click();
}
if (type === "text") setTimeout(function () { startEdit(el.id); }, 60);
}
function dupEl() {
var el = selEl();
if (!el) return;
var page = curPage();
var c = clone(el);
c.id = uid();
var key = posKey();
var other = key === "d" ? "m" : "d";
c[key].y = c[key].y + c[key].h + 1;
if (c[other]) c[other].y = c[other].y + c[other].h + 1;
snap();
page.els.splice(page.els.indexOf(el) + 1, 0, c);
S.sel = c.id;
changed();
}
function delEl() {
var el = selEl();
if (!el) return;
var page = curPage();
snap();
page.els.splice(page.els.indexOf(el), 1);
S.sel = null;
changed();
}
function layerEl(front) {
var el = selEl();
if (!el) return;
var page = curPage();
snap();
var zs = page.els.map(function (x) { return x.z || 0; });
if (front) {
el.z = Math.max.apply(null, zs) + 1;
} else {
page.els.forEach(function (x) {
if (x !== el) x.z = (x.z || 0) + 1;
});
el.z = 0;
}
changed();
}
function placeInCol(page, el, col, beforeId) {
page.els.splice(page.els.indexOf(el), 1);
if (nCols(page) > 1) el.col = col;
var at = -1;
if (beforeId) at = page.els.map(function (x) { return x.id; }).indexOf(beforeId);
if (at < 0) {
var same = page.els.filter(function (x) { return colOf(x, page) === colOf(el, page); });
at = same.length ? page.els.indexOf(same[same.length - 1]) + 1 : page.els.length;
}
page.els.splice(at, 0, el);
}
function moveEl(dir) {
var el = selEl();
if (!el) return;
var page = curPage();
var same = page.els.filter(function (x) { return colOf(x, page) === colOf(el, page); });
var i = same.indexOf(el);
var j = i + dir;
if (j < 0 || j >= same.length) return;
snap();
var other = same[j];
page.els.splice(page.els.indexOf(el), 1);
var at = page.els.indexOf(other);
page.els.splice(dir > 0 ? at + 1 : at, 0, el);
changed();
}
function setCol(n) {
var el = selEl();
var page = curPage();
if (!el || nCols(page) < 2) return;
n = clamp(n, 1, nCols(page));
if (colOf(el, page) === n) return;
snap();
placeInCol(page, el, n, null);
changed();
}
function nudge(dx, dy, resize) {
var el = selEl();
if (!el) return;
if (isMaster(curPage())) {
if (dy) {
moveEl(dy);
return;
}
var ph = S.mode === "phone";
var cur = effPlace(el, ph);
var cols1 = gridCols();
snap();
if (resize) setOwn(el, ph, { x: cur.x, w: clamp(cur.w + dx, 1, cols1 - cur.x) });
else setOwn(el, ph, { x: clamp(cur.x + dx, 0, cols1 - cur.w), w: cur.w });
changed();
return;
}
var key = posKey();
var p = el[key];
var cols = gridCols();
snap();
if (resize) {
p.w = clamp(p.w + dx, 1, cols - p.x);
p.h = Math.max(1, p.h + dy);
} else {
p.x = clamp(p.x + dx, 0, cols - p.w);
p.y = Math.max(0, p.y + dy);
}
changed();
}
function galItem(i, dir) {
var el = selEl();
if (!el || (el.type !== "gallery" && el.type !== "library")) return;
snap();
var it = el.props.items[i];
el.props.items.splice(i, 1);
if (dir) el.props.items.splice(clamp(i + dir, 0, el.props.items.length), 0, it);
changed();
}
function addPage(kind, place) {
var cur = curPage();
var foot = place === "bottom";
var p = newPage(kind === "pin" ? (foot ? "Footer" : "Header") : "New page", kind === "pin" ? "" : (cur ? cur.section : ""), "", "");
p.kind = kind === "pin" ? "pin" : "page";
p.stack = [];
p.pin = { place: foot ? "bottom" : "top", fixed: false, show: "all", pages: [] };
if (kind === "pin") p.colset = fixLayout({ cols: 1 });
p.slug = uniqueSlug(kind === "pin" ? (foot ? "footer" : "header") : "new-page", p.id);
if (kind === "pin") p.els[0].props.html = "<p>" + esc(S.project.site.name) + "</p>";
snap();
S.project.pages[p.id] = p;
S.project.order.splice(S.project.order.indexOf(S.pageId) + 1, 0, p.id);
S.pageId = p.id;
S.sel = null;
changed();
}
function dupPage() {
var cur = curPage();
var p = clone(cur);
p.id = uid();
p.title = cur.title + " copy";
p.slug = uniqueSlug((cur.slug || "home") + "-copy", p.id);
p.els.forEach(function (e) { e.id = uid(); });
snap();
S.project.pages[p.id] = p;
S.project.order.splice(S.project.order.indexOf(cur.id) + 1, 0, p.id);
S.pageId = p.id;
S.sel = null;
changed();
}
function movePost(id, dir) {
var q = S.project.pages[id];
var sib = postsOf(q.parent);
var k = sib.indexOf(q);
var other = sib[k + dir];
if (!other) return;
var o = S.project.order;
var a = o.indexOf(q.id);
var b2 = o.indexOf(other.id);
snap();
o[a] = other.id;
o[b2] = q.id;
changed();
}
function addBlog() {
var cur = curPage();
var blog = newPage("Blog", cur && !cur.parent && cur.kind !== "pin" ? cur.section : "", "", "");
blog.slug = uniqueSlug("blog", blog.id);
blog.kind = "page";
blog.blog = true;
blog.stack = [];
blog.pin = { place: "top", fixed: false, show: "all", pages: [] };
var pe = elDefaults("posts");
blog.els = [{ id: uid(), type: "posts", col: 1, d: { x: 0, y: 0, w: 12, h: pe.h }, m: null, props: clone(pe.props) }];
snap();
S.project.pages[blog.id] = blog;
var at = S.project.order.indexOf(S.pageId);
S.project.order.splice(at < 0 ? S.project.order.length : at + 1, 0, blog.id);
var post = makePost(blog.id, "First post");
S.project.pages[post.id] = post;
S.project.order.splice(S.project.order.indexOf(blog.id) + 1, 0, post.id);
S.pageId = blog.id;
S.sel = null;
changed();
}
function makePost(blogId, title) {
var q = newPage(title, "", "", "");
q.slug = uniqueSlug(slugify(title) || "post", q.id);
q.kind = "page";
q.parent = blogId;
q.date = new Date().toISOString().slice(0, 10);
q.excerpt = "";
q.featured = false;
q.stack = [];
q.pin = { place: "top", fixed: false, show: "all", pages: [] };
var mk = function (type, extra) { var d = elDefaults(type); return { id: uid(), type: type, col: 1, d: { x: 0, y: 0, w: 12, h: d.h }, m: null, props: Object.assign(clone(d.props), extra || {}) }; };
q.els = [mk("postinfo"), mk("text", { html: "<p>Write here.</p>" }), mk("pager", { scope: "blog", look: "text", align: "center" })];
return q;
}
function addPost(blogId) {
var blog = S.project.pages[blogId];
if (!blog) return;
snap();
var q = makePost(blogId, "New post");
var sib = postsOf(blogId);
var last = sib.length ? sib[sib.length - 1].id : blogId;
S.project.pages[q.id] = q;
S.project.order.splice(S.project.order.indexOf(last) + 1, 0, q.id);
S.pageId = q.id;
S.sel = null;
changed();
}
function movePage(dir) {
if (curPage().parent) return movePost(S.pageId, dir);
var o = S.project.order;
var i = o.indexOf(S.pageId);
var j = i + dir;
if (j < 0 || j >= o.length) return;
snap();
o.splice(i, 1);
o.splice(j, 0, S.pageId);
changed();
}
function delPage() {
if (S.project.order.length < 2) {
toast("A site needs at least one page.");
S.confirm = null;
renderLeft();
return;
}
var id = S.pageId;
var wasHome = S.project.pages[id].slug === "" && S.project.pages[id].kind !== "pin";
snap();
var i = S.project.order.indexOf(id);
S.project.order.splice(i, 1);
delete S.project.pages[id];
S.project.order.forEach(function (pid) {
var q = S.project.pages[pid];
q.stack = (q.stack || []).filter(function (x) { return x !== id; });
});
if (wasHome) {
var firstPage = S.project.order.map(function (x) { return S.project.pages[x]; }).filter(function (q) { return q.kind !== "pin"; })[0];
if (firstPage) firstPage.slug = "";
}
S.pageId = S.project.order[Math.max(0, i - 1)];
S.sel = null;
S.confirm = null;
changed();
}
function makeHome() {
var cur = curPage();
snap();
S.project.order.forEach(function (id) {
var p = S.project.pages[id];
if (p.slug === "" && p.id !== cur.id) p.slug = uniqueSlug(p.title, p.id);
});
cur.slug = "";
changed();
}
function guessType(name) {
var ext = (name.split(".").pop() || "").toLowerCase();
return { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml" }[ext] || "";
}
function takenFiles(exceptId) {
var taken = {};
S.project.order.forEach(function (id) {
S.project.pages[id].els.forEach(function (e) {
if ((e.type === "image" || e.type === "product") && e.props.file && e.id !== exceptId) taken[e.props.file] = true;
if (e.type === "gallery" || e.type === "library") (e.props.items || []).forEach(function (it) { if (it.file) taken[it.file] = true; });
});
});
return taken;
}
function uniqueFile(name, taken) {
taken = taken || takenFiles(S.sel);
var dot = name.lastIndexOf(".");
var base = slugify(dot > 0 ? name.slice(0, dot) : name) || "image";
var ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : "jpg";
var f = base + "." + ext;
var n = 2;
while (taken[f]) {
f = base + "-" + n + "." + ext;
n++;
}
taken[f] = true;
return f;
}
function imageSize(file) {
return new Promise(function (res) {
var url = URL.createObjectURL(file);
var im = new Image();
im.onload = function () {
res({ w: im.naturalWidth, h: im.naturalHeight });
URL.revokeObjectURL(url);
};
im.onerror = function () { res({ w: 0, h: 0 }); };
im.src = url;
});
}
async function storeImage(file) {
var type = guessType(file.name) || file.type;
if (!/^image\/(jpeg|png|gif|webp|svg\+xml)$/.test(type)) {
toast("Use JPG, PNG, GIF, WebP or SVG images.");
return null;
}
if (file.size > 20 * 1024 * 1024) {
toast(file.name + " is over 20 MB. Export a smaller version and try again.");
return null;
}
try {
var j = await gh("POST", "/git/blobs", { content: await blobToB64(file), encoding: "base64" });
var id = "sha:" + j.sha;
S.mem[id] = { url: URL.createObjectURL(file), blob: file };
return id;
} catch (err) {
if (err.message === "KEY") lock("That GitHub key no longer works. Make a new one.");
else toast(file.name + " didn't upload. Try again in a moment.");
return null;
}
}
$("bd-file").addEventListener("change", async function () {
var files = Array.prototype.slice.call(this.files || []);
this.value = "";
var el = selEl();
if (!files.length || !el || (el.type !== "image" && el.type !== "product" && el.type !== "gallery" && el.type !== "library")) return;
var taken = takenFiles(el.type === "image" || el.type === "product" ? el.id : null);
if (el.type === "image" || el.type === "product") {
setStatus("Uploading…");
var size = await imageSize(files[0]);
var id = await storeImage(files[0]);
if (!id) {
setStatus("Not published", true);
return;
}
snap();
el.props.assetId = id;
el.props.file = uniqueFile(files[0].name, taken);
el.props.w = size.w;
el.props.h = size.h;
if (!el.props.alt) el.props.alt = files[0].name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
} else if (S.replaceItem) {
var item = el.props.items.filter(function (x) { return x.id === S.replaceItem; })[0];
S.replaceItem = null;
if (!item) return;
setStatus("Uploading…");
var rs = await imageSize(files[0]);
var rid = await storeImage(files[0]);
if (!rid) {
setStatus("Not published", true);
return;
}
snap();
item.assetId = rid;
item.file = uniqueFile(files[0].name, taken);
item.w = rs.w;
item.h = rs.h;
} else {
var added = [];
for (var i = 0; i < files.length; i++) {
setStatus("Uploading " + (i + 1) + "/" + files.length + "…");
var sz = await imageSize(files[i]);
var gid = await storeImage(files[i]);
if (!gid) continue;
var n = el.props.items.length + added.length;
if (el.type === "library") added.push({ id: uid(), assetId: gid, file: uniqueFile(files[i].name, taken), title: files[i].name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " "), author: "", topics: [], href: "", w: sz.w, h: sz.h });
else added.push({ id: uid(), assetId: gid, file: uniqueFile(files[i].name, taken), alt: files[i].name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " "), caption: "", w: sz.w, h: sz.h, fx: (n * 8) % 60, fy: n * 6, fw: 32 });
}
if (!added.length) {
setStatus("Not published", true);
return;
}
snap();
el.props.items = el.props.items.concat(added);
}
changed();
});
$("bd-upload").addEventListener("change", function () {
var f = this.files && this.files[0];
this.value = "";
if (f) uploadFile(f);
});

/* PUBLISH — ONE COMMIT: PAGES, CSS, JS, NEW IMAGES, site.json */
async function pullRemoteImages() {
var list = allImages().filter(function (p) { return p.assetId === "remote" && p.remote; });
var failed = 0;
for (var i = 0; i < list.length; i++) {
setStatus("Copying images " + (i + 1) + "/" + list.length + "…");
try {
var r = await fetch(list[i].remote, { mode: "cors" });
if (!r.ok) throw new Error("HTTP " + r.status);
var blob = await r.blob();
var j = await gh("POST", "/git/blobs", { content: await blobToB64(blob), encoding: "base64" });
var id = "sha:" + j.sha;
S.mem[id] = { url: URL.createObjectURL(blob), blob: blob };
list[i].assetId = id;
} catch (err) {
if (err.message === "KEY") throw err;
failed++;
}
}
return failed;
}
function siteJSON(pr) {
return JSON.stringify({ id: pr.id, name: pr.site.name, site: pr.site, order: pr.order, pages: pr.pages }, null, 1);
}
async function publish() {
if (!S.project || S.publishing) return;
if (S.live) endEdit();
closePop();
S.publishing = true;
clearTimeout(S.saveTimer);
renderTop();
setStatus("Publishing…");
try {
ensurePhoneAll();
var failed = await pullRemoteImages();
setStatus("Publishing…");
var stamp = Date.now().toString(36);
var files = {};
S.project.order.forEach(function (id) {
var p = S.project.pages[id];
if (p.kind === "pin") return;
files[OUT + (p.slug ? p.slug + ".html" : "index.html")] = exportPage(p);
});
files[OUT + "404.html"] = export404();
files[OUT + "assets/bd.css"] = "/* PUBLISHED " + stamp + " */\n" + exportCSS();
files[OUT + "assets/bd.js"] = exportJS();
var fresh = allImages().filter(function (p) { return p.assetId && p.assetId.indexOf("sha:") === 0; });
var out = clone({ id: S.project.id, site: S.project.site, order: S.project.order, pages: S.project.pages });
allImages(out).forEach(function (p) {
if (p.assetId && p.assetId.indexOf("sha:") === 0) p.assetId = "live";
});
files[SITE_FILE] = siteJSON(out);
var pages = Object.keys(files).filter(function (p) { return p.indexOf(OUT) === 0 && /\.html$/.test(p); });
files[MANIFEST_FILE] = JSON.stringify({ pages: pages, published: new Date().toISOString() }, null, 1);
var now = await ghFile(SITE_FILE);
if ((now ? now.sha : null) !== S.base) throw new Error("CHANGED");
var dirty = dirtyFiles();
for (var di = 0; di < dirty.length; di++) {
var cur = await ghFile(dirty[di]);
if ((cur ? cur.sha : null) !== S.files[dirty[di]].sha) throw new Error("CHANGED:" + dirty[di]);
}
var old = await ghFile(MANIFEST_FILE);
var oldPages = [];
try {
oldPages = old ? (JSON.parse(old.text).pages || []) : [];
} catch (e) {}
var ref = await gh("GET", "/git/ref/heads/" + GH_BRANCH);
var head = ref.object.sha;
var commit = await gh("GET", "/git/commits/" + head);
var existing = {};
var full = await gh("GET", "/git/trees/" + commit.tree.sha + "?recursive=1");
(full.tree || []).forEach(function (t) { existing[t.path] = true; });
var tree = Object.keys(files).map(function (path) {
return { path: path, mode: "100644", type: "blob", content: files[path] };
});
var seen = {};
fresh.forEach(function (p) {
var path = OUT + "images/" + p.file;
if (seen[path]) return;
seen[path] = true;
tree.push({ path: path, mode: "100644", type: "blob", sha: p.assetId.slice(4) });
});
dirty.forEach(function (p) {
tree.push({ path: p, mode: "100644", type: "blob", content: S.files[p].text });
});
S.uploads.forEach(function (u) {
tree.push({ path: u.path, mode: "100644", type: "blob", sha: u.sha });
});
var gone = oldPages.filter(function (p) { return pages.indexOf(p) < 0 && KEEP.indexOf(p) < 0 && existing[p]; });
gone.forEach(function (p) {
tree.push({ path: p, mode: "100644", type: "blob", sha: null });
});
var nt = await gh("POST", "/git/trees", { base_tree: commit.tree.sha, tree: tree });
var nc = await gh("POST", "/git/commits", { message: "Publish from the back office", tree: nt.sha, parents: [head] });
await gh("PATCH", "/git/refs/heads/" + GH_BRANCH, { sha: nc.sha });
fresh.forEach(function (p) {
if (S.mem[p.assetId]) S.liveMem[p.file] = S.mem[p.assetId].url;
p.assetId = "live";
});
var after = await gh("GET", "/contents/" + SITE_FILE + "?ref=" + nc.sha);
S.base = after.sha;
for (var fi = 0; fi < dirty.length; fi++) {
var nf = S.files[dirty[fi]];
nf.orig = nf.text;
try {
nf.sha = (await gh("GET", "/contents/" + dirty[fi] + "?ref=" + nc.sha)).sha;
} catch (e) {}
}
S.uploads.forEach(function (u) { if (S.fileList && /\.(txt|html|css|js|json|svg|xml|md)$/.test(u.path) && S.fileList.indexOf(u.path) < 0) S.fileList.push(u.path); });
S.uploads = [];
S.generated = pages;
if (S.codeOpen && S.codeTab === "files") renderCode();
S.published = stateJSON();
lsDel(DRAFT_STORE);
S.publishing = false;
renderTop();
setStatus("Going live…");
if (failed) toast(failed + " image" + (failed > 1 ? "s" : "") + " couldn't be copied from the old site, so they still load from there. Replace them when you can.");
else toast("Published. Cloudflare is putting it live.");
watchLive(stamp);
} catch (err) {
S.publishing = false;
renderTop();
var m = String(err && err.message || err);
if (m === "KEY") {
lock("That GitHub key no longer works. Make a new one.");
return;
}
if (m.indexOf("CHANGED:") === 0) {
setStatus("Not published", true);
toast(m.slice(8) + " was changed on GitHub since you opened it. Copy your edit, reload, then paste it back.");
saveNow();
return;
}
if (m === "CHANGED") {
setStatus("Not published", true);
toast("The site was changed on GitHub since you opened it. Your edits are kept here. Reload to see both.");
saveNow();
return;
}
setStatus("Not published", true);
toast("Couldn't publish: " + m);
saveNow();
}
}
function watchLive(stamp) {
clearInterval(S.liveT);
var t0 = Date.now();
S.liveT = setInterval(function () {
fetch(LIVE_BASE + "/assets/bd.css?v=" + Date.now(), { cache: "no-store" }).then(function (r) { return r.text(); }).then(function (t) {
if (t.indexOf("PUBLISHED " + stamp) > -1) {
clearInterval(S.liveT);
S.liveT = null;
if (!hasDraft()) setStatus("Live ✓");
} else if (Date.now() - t0 > LIVE_GIVE_UP_MS) {
clearInterval(S.liveT);
S.liveT = null;
setStatus("Published · check Cloudflare", true);
}
}).catch(function () {});
}, LIVE_POLL_MS);
}

/* DOWNLOAD ZIP — A BACKUP COPY OF THE WHOLE SITE */
async function exportZip() {
if (!S.project) return;
if (S.live) endEdit();
if (!window.JSZip) {
toast("The zip tool didn't load. Reload the page and try again.");
return;
}
closePop();
var was = S.status;
setStatus("Building zip…");
ensurePhoneAll();
var zip = new JSZip();
var s = S.project.site;
S.project.order.forEach(function (id) {
var p = S.project.pages[id];
if (p.kind === "pin") return;
zip.file(p.slug ? p.slug + ".html" : "index.html", exportPage(p));
});
zip.file("404.html", export404());
zip.file("assets/bd.css", exportCSS());
zip.file("assets/bd.js", exportJS());
zip.file("site.json", siteJSON(S.project));
var seen = {};
var missing = 0;
await Promise.all(allImages().map(async function (p) {
if (seen[p.file]) return;
seen[p.file] = true;
try {
var src = S.mem[p.assetId] ? S.mem[p.assetId].url : S.liveMem[p.file] || (p.assetId === "remote" ? p.remote : "/images/" + p.file);
var r = await fetch(src);
if (!r.ok) throw new Error("missing");
zip.file("images/" + p.file, await r.blob());
} catch (err) {
missing++;
}
}));
var blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
var a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = (slugify(s.name) || "site") + "-site.zip";
document.body.appendChild(a);
a.click();
a.remove();
setStatus(was);
toast((missing ? missing + " image" + (missing > 1 ? "s" : "") + " couldn't be included. " : "") + "Zip downloaded.");
}

/* POPOVER */
function closePop() {
$("bd-pop").hidden = true;
S.confirm = S.confirm === "discard" ? null : S.confirm;
}
function openPop() {
var pop = $("bd-pop");
var live = REPO.domain ? "https://" + REPO.domain : location.origin;
var h = '<div class="bd-ed-sec"><span class="bd-ed-label">Sites · one back office</span>' + SITES.map(function (x) {
return '<button class="bd-ed-proj' + (x.repo === REPO.repo ? " is-on" : "") + '" data-act="site-switch" data-repo="' + esc(x.repo) + '"><span>' + esc(x.domain) + "</span><small>" + (x.repo === REPO.repo ? "editing" : "switch") + "</small></button>";
}).join("") + '</div><div class="bd-ed-sec"><span class="bd-ed-label">This site</span>'
+ '<a class="bd-ed-proj" href="' + esc(live) + '" target="_blank" rel="noopener"><span>' + esc(REPO.domain || location.host) + "</span><small>Open ↗</small></a>"
+ '<a class="bd-ed-proj" href="https://github.com/' + esc(REPO.owner + "/" + REPO.repo) + '" target="_blank" rel="noopener"><span>' + esc(REPO.owner + "/" + REPO.repo) + "</span><small>GitHub ↗</small></a>"
+ '<div class="bd-ed-hint">' + (hasDraft() ? "You have changes that aren’t on the live site yet. They’re kept in this browser until you publish." : "Everything here is on the live site.") + "</div></div>"
+ '<div class="bd-ed-sec"><div class="bd-ed-actions">'
+ '<button class="bd-ed-btn is-primary" data-act="export"' + (S.publishing ? " disabled" : "") + ">" + I.up + "Publish</button>"
+ '<button class="bd-ed-btn" data-act="zip">' + I.down + "Download zip</button>"
+ '<button class="bd-ed-btn" data-act="view-out">' + I.code + "Generated code</button>"
+ (hasDraft() ? '<button class="bd-ed-btn is-danger" data-act="discard">' + I.undo + "Discard changes</button>" : "")
+ "</div>";
if (S.confirm === "discard") h += '<div class="bd-ed-confirm">Throw away everything not yet published? <button class="bd-ed-btn is-danger" data-act="discard-yes">Discard</button><button class="bd-ed-btn" data-act="confirm-no">Keep</button></div>';
h += '</div><div class="bd-ed-sec"><div class="bd-ed-actions"><button class="bd-ed-btn" data-act="sign-out">' + I.x + "Forget GitHub key on this device</button></div></div>";
pop.innerHTML = h;
pop.hidden = false;
}

/* EVENTS */
document.addEventListener("click", function (e) {
var b = e.target.closest("[data-act]");
var pop = $("bd-pop");
if (!pop.hidden && !e.target.closest("#bd-pop") && !(b && b.getAttribute("data-act") === "projects")) closePop();
if (!b) return;
var act = b.getAttribute("data-act");
var val = b.getAttribute("data-val");
var A = {
"projects": function () { if (pop.hidden) openPop(); else closePop(); },
"zip": exportZip,
"discard": function () { S.confirm = "discard"; openPop(); },
"discard-yes": discardDraft,
"sign-out": function () { closePop(); lock("Key forgotten on this device."); },
"reload": loadSite,
"confirm-no": function () { var was = S.confirm; S.confirm = null; if (was === "discard") openPop(); else renderLeft(); },
"mode": function () { if (S.live) endEdit(); S.mode = val; render(); },
"undo": doUndo,
"redo": doRedo,
"code": function () { S.codeOpen = !S.codeOpen; render(); },
"code-tab": function () { S.codeTab = val; renderCode(); },
"out-tab": function () { S.outTab = val; renderCode(); },
"copy-out": function () {
var ta = $("bd-code-ta");
var done = function () { toast("Copied."); };
try {
navigator.clipboard.writeText(ta.value).then(done, function () { ta.select(); toast("Selected. Press Copy on your keyboard."); });
} catch (err) {
ta.select();
toast("Selected. Press Copy on your keyboard.");
}
},
"preview": function () { if (S.live) endEdit(); S.inspect = false; S.preview = !S.preview; S.sel = null; render(); },
"inspect": function () {
if (S.live) endEdit();
S.inspect = !S.inspect;
S.preview = S.inspect;
S.ins = null;
S.sel = null;
if (S.inspect && window.innerWidth <= 980) {
S.rightOpen = true;
S.leftOpen = false;
}
render();
},
"page-own": function () {
var pg = curPage();
var on = val === "page";
if (!!pg.ownLayout === on) return;
snap();
pg.ownLayout = on;
if (on && !pg.colset) pg.colset = fixLayout(clone(S.project.site.layout));
changed();
},
"lay-cols": function () {
var L = layFor(b.getAttribute("data-who"));
var n = +val;
if (L.cols === n) return;
snap();
L.cols = n;
L.spans = SPAN_PRESETS[n][0].slice();
if (n === 1) L.colsM = 1;
changed();
},
"lay-colsM": function () {
var L = layFor(b.getAttribute("data-who"));
snap();
L.colsM = +val;
changed();
},
"set-col": function () { setCol(+val); },
"ins-parent": function () { var el = insEl(); if (el && el.parentElement) pickIns(el.parentElement); },
"ins-clear": function () { S.ins = null; markIns(); renderRight(); },
"ins-seg": function () {
var f = insField(b.getAttribute("data-k"));
var cur = insGet(f.p).val;
insSetProp(f.p, cur === val ? "" : val);
},
"ins-code": function () {
var sel = insSel();
if (!sel) return;
S.codeOpen = true;
S.codeTab = S.ins.where === "page" ? "page" : "site";
S.codeJump = { tab: S.codeTab, sel: sel, phone: S.mode === "phone" };
renderCode();
renderTop();
if (!S.cm) toast("Look for " + sel);
},
"ins-html": function () { S.codeOpen = true; S.codeTab = "el"; renderCode(); renderTop(); },
"ins-img": function () {
var el = insEl();
var m = selEl();
if (!m) return;
S.replaceItem = null;
if (m.type === "gallery") {
var fig = el.closest("figure");
var id = fig && (fig.className.match(/bd-i-([a-z0-9]+)/) || [])[1];
if (!id) return;
S.replaceItem = id;
}
$("bd-file").multiple = false;
$("bd-file").click();
},
"ins-block": function () { var id = S.sel; S.inspect = false; S.preview = false; S.sel = id; render(); },
"file-new": function () { S.fileNew = !S.fileNew; renderCode(); var n = $("bd-file-name"); if (n) n.focus(); },
"file-create": function () {
var n = $("bd-file-name");
var p = n ? n.value.trim().replace(/^\/+/, "") : "";
if (!p || /\.\.|\s/.test(p)) { toast("Type a path like files/notes.txt"); return; }
p = "site/" + p.replace(/^site\//, "");
if (!S.files[p]) S.files[p] = { sha: null, orig: "", text: "" };
S.fileNew = false;
S.filePath = p;
renderCode();
},
"file-upload": function () { $("bd-upload").click(); },
"site-switch": function () {
var r = b.getAttribute("data-repo");
if (r === REPO.repo) { closePop(); return; }
saveNow();
lsSet("bd-site-current", r);
location.reload();
},
"export": publish,
"toggle-left": function () { S.leftOpen = !S.leftOpen; S.rightOpen = false; renderLeft(); renderRight(); },
"toggle-right": function () { S.rightOpen = !S.rightOpen; S.leftOpen = false; renderLeft(); renderRight(); },
"left-tab": function () { S.leftTab = val; renderLeft(); },
"page": function () { goPage(b.getAttribute("data-id")); },
"page-add": function () { addPage("page"); },
"menu-item-move": function () { var m = S.project.site.menus[+b.getAttribute("data-m")]; var i = +b.getAttribute("data-i"), j = i + (+val); if (j < 0 || j >= m.items.length) return; snap(); var t = m.items[i]; m.items[i] = m.items[j]; m.items[j] = t; changed(); },
"menu-item-del": function () { var m = S.project.site.menus[+b.getAttribute("data-m")]; snap(); m.items.splice(+b.getAttribute("data-i"), 1); changed(); },
"menu-item-tab": function () { var m = S.project.site.menus[+b.getAttribute("data-m")]; snap(); m.items[+b.getAttribute("data-i")].newTab = b.checked; changed({ skipRight: true }); },
"menu-item-add": function () { var m = S.project.site.menus[+b.getAttribute("data-m")]; snap(); m.items.push(val === "heading" ? { id: uid(), type: "heading", label: "Heading" } : { id: uid(), type: "link", label: "Link", url: "https://", newTab: true }); changed(); },
"menu-add-all": function () { var m = S.project.site.menus[+b.getAttribute("data-m")]; snap(); seqPages().forEach(function (q) { if (!q.parent && !m.items.some(function (it) { return it.type === "page" && it.page === q.id; })) m.items.push({ id: uid(), type: "page", page: q.id, label: "" }); }); changed(); },
"menu-new": function () { snap(); var nm = { id: uid(), name: "Menu " + (S.project.site.menus.length + 1), items: [] }; S.project.site.menus.push(nm); var path = b.getAttribute("data-path"); if (path === "ui.menuEdit") S.menuEdit = nm.id; else applyPath(path, nm.id); changed(); },
"menu-del": function () { var id = b.getAttribute("data-id"); var ms = S.project.site.menus; if (ms.length < 2) return; snap(); S.project.site.menus = ms.filter(function (m) { return m.id !== id; }); S.menuEdit = S.project.site.menus[0].id; normalizeMenus(S.project); changed(); },
"page-menu": function () { var m = menuById(b.getAttribute("data-id")); var pg = curPage(); snap(); if (b.checked) { if (!m.items.some(function (it) { return it.type === "page" && it.page === pg.id; })) m.items.push({ id: uid(), type: "page", page: pg.id, label: "" }); } else m.items = m.items.filter(function (it) { return !(it.type === "page" && it.page === pg.id); }); changed({ skipRight: true }); },
"blog-add": function () { addBlog(); },
"post-add": function () { var bid = b.getAttribute("data-id") || (curPage().blog ? curPage().id : curPage().parent); if (bid) addPost(bid); else addBlog(); },
"post-move": function () { movePost(b.getAttribute("data-id"), +val); },
"post-feat": function () { var q = S.project.pages[b.getAttribute("data-id")]; if (!q) return; snap(); var was = q.featured; postsOf(q.parent).forEach(function (x) { x.featured = false; }); q.featured = !was; changed(); },
"page-dup": dupPage,
"page-up": function () { movePage(-1); },
"page-down": function () { movePage(1); },
"page-del": function () { S.confirm = "page"; renderLeft(); },
"page-del-yes": delPage,
"make-home": makeHome,
"add": function () { if (S.live) endEdit(); addEl(b.getAttribute("data-type")); },
"deselect": function () { selectEl(null); },
"sel-dup": dupEl,
"sel-del": delEl,
"sel-front": function () { layerEl(true); },
"sel-back": function () { layerEl(false); },
"edit-text": function () { if (S.sel) startEdit(S.sel); },
"pick-image": function () { var se = selEl(); $("bd-file").multiple = !!(se && (se.type === "gallery" || se.type === "library")); $("bd-file").click(); },
"restack": function () { snap(); restackPhone(curPage()); changed(); },
"add-section": function () {
snap();
var used = S.project.site.sections.map(function (x) { return x.key; });
var k = "abcdefghijklmnopqrstuvwxyz".split("").filter(function (c) { return used.indexOf(c) < 0; })[0] || uid().slice(0, 2);
S.project.site.sections.push({ key: k, label: k + ". section" });
changed();
},
"del-section": function () { snap(); S.project.site.sections.splice(+b.getAttribute("data-i"), 1); changed(); },
"add-ext": function () { snap(); S.project.site.externals.push({ section: (S.project.site.sections[0] || {}).key || "", title: "Link", url: "https://" }); changed(); },
"del-ext": function () { snap(); S.project.site.externals.splice(+b.getAttribute("data-i"), 1); changed(); },
"layout": function () {
var pg = curPage();
if (val === "free" && isMaster(pg)) breakPage();
if (val === "master" && !isMaster(pg)) joinMaster();
},
"own-reset": function () {
var el = selEl();
if (!el || !el.own) return;
snap();
if (S.mode === "phone") {
delete el.own.xm;
delete el.own.wm;
} else {
delete el.own.x;
delete el.own.w;
}
changed();
},
"all-master": function () {
snap();
S.project.order.forEach(function (id) {
var pg = S.project.pages[id];
if (!isMaster(pg)) {
pg.els = sortedEls(pg, "d");
pg.layout = "master";
}
});
changed();
toast("Every page now follows the master.");
},
"sel-up": function () { moveEl(-1); },
"pin-add": function () { addPage("pin", val); },
"menu-style": function () { S.leftOpen = false; selectEl("__menu"); if (window.innerWidth <= 980) { S.rightOpen = true; renderLeft(); renderRight(); } },
"view-out": function () { closePop(); S.codeOpen = true; S.codeTab = "out"; render(); },
"ins-pick": function () { S.inspect = true; S.preview = true; S.sel = null; render(); },
"pin-page": function () {
var pp = curPage();
snap();
var id = b.getAttribute("data-id");
pp.pin.pages = b.checked ? (pp.pin.pages || []).concat([id]) : (pp.pin.pages || []).filter(function (x) { return x !== id; });
changed({ skipRight: true });
},
"stack-page": function () {
var pp = curPage();
snap();
var id = b.getAttribute("data-id");
pp.stack = b.checked ? (pp.stack || []).concat([id]) : (pp.stack || []).filter(function (x) { return x !== id; });
changed({ skipRight: true });
},
"lib-add": function () { var le = selEl(); if (!le) return; snap(); le.props.items.push({ id: uid(), assetId: "", file: "", title: "Untitled", author: "", topics: [], href: "" }); changed(); },
"lib-cover": function () { S.replaceItem = b.getAttribute("data-id"); $("bd-file").multiple = false; $("bd-file").click(); },
"gi-up": function () { galItem(+b.getAttribute("data-i"), -1); },
"gi-down": function () { galItem(+b.getAttribute("data-i"), 1); },
"gi-del": function () { galItem(+b.getAttribute("data-i"), 0); },
"sel-down": function () { moveEl(1); },
"set": function () {
var path = b.getAttribute("data-path");
var v = b.getAttribute("data-vtype") === "bool" ? val === "true" : val;
if (path.indexOf("ins.") === 0) {
if (S.ins) S.ins[path.slice(4)] = v;
renderRight();
return;
}
if (path === "ui.menuOpen") {
S.menuOpen = v;
render();
return;
}
snap();
applyPath(path, v);
changed();
}
};
if (A[act]) A[act]();
});
function applyPath(path, v) {
var root = path.split(".")[0];
var rest = path.slice(root.length + 1);
var el = selEl();
if (root === "ui") {
S[rest] = v;
} else if (root === "menu") {
setPath(S.project.site.menus, rest, v);
} else if (root === "site") {
setPath(S.project.site, rest, v);
if (rest === "sans" || rest === "mono") ensureFont(v);
if (rest === "name") S.project.name = v;
} else if (root === "page") {
var pg = curPage();
if (rest === "slug") v = uniqueSlug(v || pg.title, pg.id);
setPath(pg, rest, v);
} else if (root === "el" && el) {
if (el.type === "gallery" && (rest === "snap" || rest === "auto")) v = parseFloat(v) || 0;
setPath(el.props, rest, v);
} else if (root === "gi" && el && (el.type === "gallery" || el.type === "library")) {
var gp = rest.split(".");
el.props.items[+gp[0]][gp[1]] = v;
} else if (root === "own" && el) {
var ph = S.mode === "phone";
var cur = effPlace(el, ph);
var cols0 = gridCols();
var nv = {};
if (rest === "w") {
nv.w = clamp(v, 1, cols0);
nv.x = clamp(cur.x, 0, cols0 - nv.w);
} else {
nv.w = cur.w;
nv.x = clamp(v, 0, cols0 - cur.w);
}
setOwn(el, ph, nv);
} else if (root === "pos" && el) {
var p = el[posKey()];
var cols = gridCols();
p[rest] = v;
p.w = clamp(p.w, 1, cols);
p.x = clamp(p.x, 0, cols - p.w);
p.y = Math.max(0, p.y);
p.h = Math.max(1, p.h);
}
}
document.addEventListener("change", function (e) {
var t = e.target;
if (!S.project || !t.getAttribute) return;
if (t.closest && t.closest("#bd-ruler") && t.getAttribute("data-bind")) {
var rv = parseInt(t.value, 10);
if (isNaN(rv)) return;
snap();
applyPath(t.getAttribute("data-bind"), rv);
changed();
return;
}
if (t.getAttribute("data-act-select") === "menu-add-page") {
if (!t.value) return;
var mm = S.project.site.menus[+t.getAttribute("data-m")];
snap();
mm.items.push({ id: uid(), type: "page", page: t.value, label: "" });
changed();
return;
}
if (t.getAttribute("data-act-select") !== "lay-spans") return;
var L = layFor(t.getAttribute("data-who"));
snap();
L.spans = t.value.split("-").map(Number);
changed();
});
document.addEventListener("focusin", function (e) {
if (e.target.matches && e.target.matches("[data-bind], #bd-code-ta")) S.pendingSnap = true;
});
document.addEventListener("input", function (e) {
var t = e.target;
if (!S.project) return;
if (t.id === "bd-code-ta") {
clearTimeout(S.codeTimer);
S.codeTimer = setTimeout(function () { applyCode(t); }, 220);
return;
}
var path = t.getAttribute && t.getAttribute("data-bind");
if (!path) return;
if (t.closest("#bd-ruler")) return;
if (path.indexOf("ins.") === 0) {
if (S.ins) S.ins[path.slice(4)] = t.value;
var sl = $("bd-right").querySelector(".bd-ed-ins-tag");
fillIns();
return;
}
var type = t.getAttribute("data-type");
var v = t.value;
if (type === "int") v = parseInt(v, 10);
if (type === "num") v = parseFloat(v);
if ((type === "int" || type === "num") && isNaN(v)) return;
if (type === "blank") {
v = String(v).trim() === "" ? "" : parseFloat(v);
if (v !== "" && isNaN(v)) return;
}
if (type === "slug" && !slugify(v)) return;
if (type === "csv") v = v.split(",").map(function (x) { return x.trim(); }).filter(Boolean);
if (type === "lines") v = v.split("\n").map(function (x) { return x.trim(); }).filter(Boolean);
if (type === "rows") v = v.split("\n").filter(function (x) { return x.trim(); }).map(function (x) { var i = x.indexOf("|"); return i < 0 ? ["", x.trim()] : [x.slice(0, i).trim(), x.slice(i + 1).trim()]; });
if (S.pendingSnap) {
snap();
S.pendingSnap = false;
}
applyPath(path, v);
var inLeft = !!t.closest("#bd-left");
var inRight = !!t.closest("#bd-right");
scheduleSave();
renderTop();
if (!inLeft) renderLeft();
renderCanvas();
if (!inRight) renderRight();
if (S.codeOpen) renderCode();
});
document.addEventListener("keydown", function (e) {
if (!S.project) return;
var t = e.composedPath()[0];
var typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
var mod = e.metaKey || e.ctrlKey;
if (S.live && e.key === "Escape") {
e.preventDefault();
endEdit();
return;
}
if (typing) return;
var k = e.key.toLowerCase();
if (mod && k === "s") {
e.preventDefault();
publish();
return;
}
if (mod && k === "z") {
e.preventDefault();
if (e.shiftKey) doRedo();
else doUndo();
return;
}
if (mod && k === "y") {
e.preventDefault();
doRedo();
return;
}
if (e.key === "Escape") {
if (!$("bd-pop").hidden) closePop();
else if (S.sel) selectEl(null);
return;
}
if (!S.sel || S.preview) return;
if (e.key === "Delete" || e.key === "Backspace") {
e.preventDefault();
delEl();
} else if (mod && k === "d") {
e.preventDefault();
dupEl();
} else if (e.key === "Enter") {
e.preventDefault();
startEdit(S.sel);
} else if (e.key.indexOf("Arrow") === 0) {
e.preventDefault();
var dx = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
var dy = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;
nudge(dx, dy, e.shiftKey);
}
});
window.addEventListener("resize", function () { requestAnimationFrame(function () { placeSel(); }); });

/* BOOT */
$("bd-gate-go").addEventListener("click", connect);
$("bd-gate-key").addEventListener("keydown", function (e) {
if (e.key === "Enter") connect();
});
if (S.key) loadSite();
else lock("");
