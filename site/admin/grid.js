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
more: '<circle cx="4.5" cy="10" r="1"/><circle cx="10" cy="10" r="1"/><circle cx="15.5" cy="10" r="1"/>',
grip: '<circle cx="7.5" cy="5" r="1"/><circle cx="12.5" cy="5" r="1"/><circle cx="7.5" cy="10" r="1"/><circle cx="12.5" cy="10" r="1"/><circle cx="7.5" cy="15" r="1"/><circle cx="12.5" cy="15" r="1"/>',
panelR: '<rect x="2.5" y="3.5" width="15" height="13" rx="1"/><path d="M12.5 3.5v13"/>',
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
sheetmenu: '<path d="M4 3.5v13"/><path d="M8 6h8M8 10h6M8 14h8"/>',
pager: '<path d="M7.5 6.5 4 10l3.5 3.5M4 10h5M12.5 6.5 16 10l-3.5 3.5M16 10h-5"/>',
indexlink: '<path d="M3.5 6h6M3.5 10h6M3.5 14h6"/><path d="M12.5 10h4.5M15 7.5l2.5 2.5-2.5 2.5"/>',
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
var BS_BLEND = [["normal", "Normal"], ["ink", "Lines only · drop the white"], ["multiply", "Multiply"], ["darken", "Darken"], ["lighten", "Lighten"], ["screen", "Screen"], ["overlay", "Overlay"], ["soft-light", "Soft light"], ["hard-light", "Hard light"], ["color-burn", "Colour burn"], ["difference", "Difference"], ["exclusion", "Exclusion"], ["luminosity", "Luminosity"]];
var BS_TONE = [["color", "Colour"], ["grey", "Greyscale"], ["dark", "Darker"], ["light", "Lighter"]];
var BLOCK_STYLE = {
text: [["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["ink", "Text colour", "color", ""], ["tracking", "Spacing (em)", "px", ""], ["measure", "Max width", "px", ""]],
image: [["blend", "Blend mode", "sel", "normal", BS_BLEND], ["backdrop", "Blend against colour", "color", ""], ["tone", "Tone", "sel", "color", BS_TONE], ["opacity", "Opacity %", "px", 100], ["radius", "Corners", "px", 0], ["hard", "Hard shadow", "bool", "0"]],
gallery: [["blend", "Blend mode", "sel", "normal", BS_BLEND], ["backdrop", "Blend against colour", "color", ""], ["tone", "Tone", "sel", "color", BS_TONE], ["opacity", "Opacity %", "px", 100], ["radius", "Corners", "px", 0]],
notes: [["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["ink", "Text colour", "color", ""]],
list: [["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["ink", "Text colour", "color", ""]],
link: [["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["ink", "Text colour", "color", ""]],
embed: [["radius", "Corners", "px", 0]],
rule: [["ink", "Colour", "color", ""], ["weight", "Thickness", "px", 1]],
quote: [["style", "Text style", "style", "body"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["align", "Align", "sel", "center", BS_ALIGN], ["pad", "Padding top/bottom", "dp", 40, null, 28], ["padX", "Padding sides", "dp", 46, null, 22], ["bg", "Background", "color", ""], ["ink", "Text colour", "color", ""], ["shadow", "Soft shadow", "bool", "1"], ["line", "Line on the left", "bool", "0"]],
posts: [["titleStyle", "Title style", "style", "body"], ["titleSize", "Title size", "dp", ""], ["titleLh", "Title line", "dp", ""], ["metaStyle", "Info style", "style", "small"], ["metaSize", "Info size", "dp", ""], ["metaLh", "Info line", "dp", ""], ["metaGap", "Gap above info", "px", 8], ["cardBg", "Card colour", "color", ""], ["cardPad", "Card padding", "dp", 0], ["minH", "Text min height", "px", ""], ["imgGap", "Image gap", "px", 12], ["imagePos", "Image", "sel", "top", [["top", "Above text"], ["bottom", "Below text"]]], ["ratio", "Crop", "sel", "auto", [["auto", "Original"], ["1", "Square"], ["4/3", "4 : 3"], ["3/2", "3 : 2"], ["16/9", "16 : 9"], ["3/4", "3 : 4"]]], ["hover", "Hover", "sel", "dim", [["none", "None"], ["dim", "Dim"], ["lift", "Lift"]]], ["look", "Card look", "sel", "plain", [["plain", "Plain"], ["zine", "Zine · cover swings open"], ["trace", "Tracing paper · sheet slides off"]]], ["fTitleStyle", "Featured title", "style", "heading"], ["zine", "Staples", "bool", "0"], ["staple", "Staple colour", "color", ""], ["pageBg", "Inside page colour", "color", ""], ["paperBg", "Paper colour", "color", ""], ["paperInk", "Paper text colour", "color", ""], ["paperAlpha", "Paper colour strength %", "px", 72], ["paperFrost", "Paper frost (blurs the image)", "px", 8], ["paperPad", "Paper padding", "dp", 16], ["paperInset", "Paper inset", "px", 0], ["paperLine", "Paper edge line", "color", ""], ["paperTilt", "Paper tilt (deg)", "px", 0], ["textPos", "Text on paper", "sel", "bottom", [["top", "Top"], ["center", "Middle"], ["bottom", "Bottom"]]], ["slideDir", "Paper slides", "sel", "up", [["up", "Up"], ["down", "Down"], ["left", "Left"], ["right", "Right"]]], ["slideHover", "Slide on hover %", "px", 12], ["slideTap", "Slide on tap %", "px", 62], ["imgBlur", "Extra image blur", "px", 0], ["imgTone", "Tone", "sel", "color", [["color", "Colour"], ["grey", "Greyscale"], ["dark", "Darker"], ["light", "Lighter"]]], ["imgBlend", "Blend mode", "sel", "normal", BS_BLEND], ["imgBackdrop", "Blend against colour", "color", ""]],
library: [["blend", "Cover blend mode", "sel", "normal", BS_BLEND], ["backdrop", "Blend against colour", "color", ""], ["book", "Book look", "bool", "1"], ["spine", "Spine colour", "color", "#8a8a8a"], ["spineW", "Spine width", "px", 10], ["shadow", "Shadow", "bool", "1"], ["radius", "Page corner", "px", 2], ["hover", "Hover", "sel", "tilt", [["none", "None"], ["tilt", "Open (perspective)"], ["lift", "Lift"]]]],
toggle: [["style", "Text style", "style", "body"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["marker", "Marker", "sel", "plus", [["plus", "+ / —"], ["arrow", "→ / ↓"], ["none", "None"]]], ["itemGap", "Between items", "px", 0], ["indent", "Indent items", "px", 0]],
product: [["style", "Text style", "style", "body"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["align", "Align", "sel", "left", BS_ALIGN]],
pager: [["style", "Text style (words)", "style", "body"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["align", "Align (words)", "sel", "left", BS_ALIGN]],
postinfo: [["style", "Text style", "style", "small"], ["size", "Size", "dp", ""], ["lh", "Line", "dp", ""], ["upper", "Capitals", "bool", "0"], ["tracking", "Letter space (em)", "px", ""], ["ink", "Text colour", "color", ""], ["align", "Align", "sel", "left", [["left", "Left"], ["center", "Centre"], ["right", "Right"], ["spread", "Spread · back left, facts right"]]], ["padT", "Space above", "dp", ""], ["padB", "Space below", "dp", ""], ["line", "Line below", "bool", "0"], ["backGap", "Back link gap", "px", ""], ["backSize", "Back link size", "px", ""], ["backInk", "Back link colour", "color", ""], ["backDim", "Back link strength %", "px", ""]],
menubtn: [["style", "Link style", "style", "body"], ["size", "Link size", "dp", ""], ["lh", "Link line", "dp", ""], ["textCase", "Case", "sel", "none", BS_CASE], ["tracking", "Spacing (em)", "px", ""], ["itemGap", "Between links", "dp", 0], ["groupGap", "Between groups", "dp", 20], ["headGap", "Under heading", "px", 4], ["current", "Current page", "sel", "underline", [["underline", "Line"], ["dim", "Dim"], ["strike", "Strike"], ["arrow", "→"], ["none", "None"]]], ["hover", "Hover", "sel", "underline", [["underline", "Line"], ["dim", "Dim"], ["none", "None"]]], ["brandStyle", "Name style", "style", "body"], ["brandSize", "Name size", "dp", ""], ["brandLh", "Name line", "dp", ""], ["brandGap", "Name gap", "dp", 16]],
ptitle: [["style", "Text style", "style", "body"], ["align", "Align", "sel", "left", BS_ALIGN]]
};
/* A FIELD ONLY SHOWS WHEN IT DOES SOMETHING: v(k) READS THE CURRENT VALUE (THIS BLOCK, OR THE MASTER) */
var BS_WHEN = {
"posts.hover": function (v) { return (v("look") || "plain") === "plain"; },
"posts.zine": function (v) { return v("look") === "zine"; },
"posts.staple": function (v) { return v("look") === "zine" && (v("zine") === "1" || v("zine") === 1 || v("zine") === true); },
"posts.pageBg": function (v) { return v("look") === "zine"; },
"posts.fTitleStyle": function (v, e) { return !e || (e.props.featured || "none") !== "none"; },
"library.spine": function (v) { return v("book") === "1" || v("book") === 1 || v("book") === true; },
"library.spineW": function (v) { return v("book") === "1" || v("book") === 1 || v("book") === true; },
"library.radius": function (v) { return v("book") === "1" || v("book") === 1 || v("book") === true; },
"menubtn.brandStyle": function (v, e) { return !e || (e.props.brand || "none") !== "none"; },
"menubtn.brandSize": function (v, e) { return !e || (e.props.brand || "none") !== "none"; },
"menubtn.brandLh": function (v, e) { return !e || (e.props.brand || "none") !== "none"; },
"menubtn.brandGap": function (v, e) { return !e || (e.props.brand || "none") !== "none"; },
"menubtn.groupGap": function (v, e) { return !e || e.props.group === "sections"; },
"menubtn.headGap": function (v, e) { return !e || e.props.group === "sections"; }
};
["paperBg", "paperInk", "paperAlpha", "paperFrost", "paperPad", "paperInset", "paperLine", "paperTilt", "textPos", "slideDir", "slideHover", "slideTap", "imgBlur", "imgTone"].forEach(function (k) {
BS_WHEN["posts." + k] = function (v) { return v("look") === "trace"; };
});
BS_WHEN["image.backdrop"] = function (v) { return ["normal", "ink", ""].indexOf(v("blend") || "") < 0; };
BS_WHEN["gallery.backdrop"] = function (v) { return ["normal", "ink", ""].indexOf(v("blend") || "") < 0; };
BS_WHEN["library.backdrop"] = function (v) { return ["normal", "ink", ""].indexOf(v("blend") || "") < 0; };
BS_WHEN["posts.imgBackdrop"] = function (v) { return ["normal", "ink", ""].indexOf(v("imgBlend") || "") < 0; };
BS_WHEN["image.tone"] = function (v) { return v("blend") !== "ink"; };
BS_WHEN["gallery.tone"] = function (v) { return v("blend") !== "ink"; };
var BS_GROUPS = {
posts: [["Text", ["titleStyle", "titleSize", "titleLh", "metaStyle", "metaSize", "metaLh", "metaGap", "fTitleStyle"]], ["Card", ["cardBg", "cardPad", "minH", "imgGap", "imagePos", "ratio"]], ["Card image", ["imgBlend", "imgBackdrop", "imgTone", "imgBlur"]], ["Tracing paper", ["paperBg", "paperInk", "paperAlpha", "paperFrost", "paperPad", "paperInset", "paperLine", "paperTilt", "textPos"]], ["Zine", ["zine", "staple", "pageBg"]], ["Motion", ["look", "hover", "slideDir", "slideHover", "slideTap"]]],
library: [["Covers", ["blend", "backdrop"]], ["Book", ["book", "spine", "spineW", "shadow", "radius"]], ["Motion", ["hover"]]],
quote: [["Text", ["style", "size", "lh", "align", "ink"]], ["Box", ["pad", "padX", "bg", "shadow", "line"]]],
postinfo: [["Text", ["style", "size", "lh", "upper", "tracking", "ink"]], ["Place", ["align", "padT", "padB", "line"]], ["Back link", ["backGap", "backSize", "backInk", "backDim"]]],
menubtn: [["Links", ["style", "size", "lh", "textCase", "tracking", "itemGap", "groupGap", "headGap", "current", "hover"]], ["Name", ["brandStyle", "brandSize", "brandLh", "brandGap"]]]
};
function bsMotionKeys(type) {
var g = (BS_GROUPS[type] || []).filter(function (x) { return x[0] === "Motion"; })[0];
return g ? g[1] : [];
}
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
function menuEditor(id, bare) {
var ms = S.project.site.menus;
var mi = ms.indexOf(menuById(id));
var m = ms[mi];
var base = "menu." + mi + ".items.";
var pageOpts = seqPages().map(function (q) { return [q.id, (q.parent ? "  ↳ " : "") + q.title]; });
var h = bare ? "" : field("Menu name", input("menu." + mi + ".name", m.name));
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
hideLeft: false,
hideRight: false,
codeTab: "out",
outTab: "css",
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
sheetmenu: { x: 0, w: 12, xm: 0, wm: 4, space: "", spaceM: "" },
indexlink: { x: 0, w: 12, xm: 0, wm: 6, space: "", spaceM: "" },
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
if (page && (page.kind === "pin" || page.ownLayout) && page.colset) return page.colset;
if (page && page.parent && S.project.site.postLayout) return S.project.site.postLayout;
return S.project.site.layout;
}
function layWho(page) {
return page.kind === "pin" ? "pin" : page.ownLayout ? "page" : page.parent ? "post" : "site";
}
function layFor(who) {
if (who === "post") {
if (!S.project.site.postLayout) S.project.site.postLayout = fixLayout(clone(S.project.site.layout));
return S.project.site.postLayout;
}
return who === "site" ? S.project.site.layout : curPage().colset;
}
function layPath(who) {
return who === "site" ? "site.layout" : who === "post" ? "site.postLayout" : "page.colset";
}
/* POSTS THAT FOLLOW THE POST MASTER'S COLUMNS */
function postCols(page) {
return !!(page && page.parent && !page.ownLayout && page.kind !== "pin" && S.project.site.postLayout);
}
function isSpreadPage(page) {
var L = lay(page);
return isSpread(S.project.site) || ((postCols(page) || (page.kind !== "pin" && page.ownLayout && !!page.colset)) && (L.cols > 1 || L.align === "spread"));
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
var PL = s.postLayout;
if (PL && PL.cols > 1) out.splice(1, 0, ".bd-cols.bd-cl-posts {\ngrid-template-columns: " + colTemplate(PL, phone) + ";\ncolumn-gap: " + (phone ? PL.gutterM : PL.gutter) + "px;\n}");
return out.join("\n");
}
var BD_FILL_TYPES = ["ptitle", "menubtn", "pager", "posts", "postinfo", "quote", "toggle", "product"];
/* LAYERS — THE SITE AS PAPER SHEETS (MENU, INDEX, CONTENT) THAT SLIDE AND BLUR WHAT'S UNDER THEM */
var LAYER_DEFAULTS = {
on: false, journal: "", library: "", about: "", mark: "",
menuColor: "#D2CEC6", menuAlpha: 58, menuBlur: 9, menuW: 200, menuBand: 52, menuPad: 40, menuPadM: 16, menuGap: 4, menuGapM: 14, menuAlign: "right", marker: ">", menuEdge: true, menuStyle: "heading",
aboutW: 620, aboutPad: 64, aboutPadM: 24,
indexColor: "#E4E1DA", indexAlpha: 55, indexBlur: 9, sliver: 44, sliverM: 14, indexEdge: true,
ease: "paper", dur: 460, menuDur: 460, tilt: 0, lift: true, reveal: "focus", focusBlur: 3, trans: "slide"
};
/* HOW A POST OR PAGE OPENS — THE INDEX SHEET GETS OUT OF THE WAY (SITE DEFAULT, EVERY PAGE CAN OVERRIDE) */
var LAYER_TRANS = [["slide", "Slide away"], ["drop", "Drop · falls to the bottom"], ["push", "Push · slides off the other side"], ["rise", "Rise · lifts off the top"], ["cut", "Cut · no motion"]];
function layerTrans(page) {
var t = page && page.trans;
var ok = function (x) { return LAYER_TRANS.some(function (o) { return o[0] === x; }); };
if (t && ok(t)) return t;
var m = S.project.site.layers.trans;
return ok(m) ? m : "slide";
}
var LAYER_EASE = { paper: ["Paper", "cubic-bezier(.2,.8,.2,1)"], slide: ["Even slide", "cubic-bezier(.65,0,.35,1)"], drag: ["Heavy drag", "cubic-bezier(.7,0,.25,1)"], stop: ["Stop-motion", "steps(6, end)"], straight: ["Straight", "linear"] };
var LAYER_PRESETS = {
paper: { ease: "paper", dur: 460, menuDur: 460, tilt: 0, lift: true, reveal: "focus" },
drag: { ease: "drag", dur: 720, menuDur: 640, tilt: 0, lift: true, reveal: "focus" },
stop: { ease: "stop", dur: 540, menuDur: 540, tilt: 0, lift: false, reveal: "none" },
quiet: { ease: "slide", dur: 320, menuDur: 320, tilt: 0, lift: false, reveal: "none" },
still: { ease: "straight", dur: 120, menuDur: 120, tilt: 0, lift: false, reveal: "none" }
};
function normalizeProject(p) {
var d = siteDefaults(p.site && p.site.name);
var s = p.site;
if (!s.styles && s.fs) s.styles = stylesFrom(s.fs, s.lh, s.ms || s.fs, s.ml || s.lh, s.fsM || s.fs, s.lhM || s.lh, s.msM || s.ms || s.fs, s.mlM || s.ml || s.lh);
if (s.showNum === undefined) s.showNum = false;
s.layers = Object.assign(clone(LAYER_DEFAULTS), s.layers || {});
if (!s.postGo || typeof s.postGo !== "object") s.postGo = { side: "", sideM: "" };
if (!s.postArrows || typeof s.postArrows !== "object") s.postArrows = {};
if (s.layers.on && !s.sheets) migrateSheets(p);
s.sheets = (s.sheets || []).map(function (k) {
var o = Object.assign(clone(SHEET_DEFAULTS), k);
/* OLDER: THE EDGE PAGE WAS A SEPARATE "STRIP" FIELD, AND SHEETS CARRIED THEIR PAGES' TEXT WIDTH AND PADDING */
if (o.strip) {
if ((o.pages || []).indexOf(o.strip) < 0) o.pages = (o.pages || []).concat([o.strip]);
o.restPage = o.strip;
if (o.rest === "open") o.rest = "peek";
}
if (o.paneW || o.pad !== "" || o.padM !== "") (o.pages || []).forEach(function (id) {
var q = p.pages[id];
if (!q || id === o.strip) return;
q.box = Object.assign({}, q.box || {});
var pd = o.pad !== "" && o.pad != null ? parseFloat(o.pad) || 0 : 0;
if (o.paneW && q.box.maxW == null) q.box.maxW = String(parseFloat(o.paneW) + pd * 2);
if (o.pad !== "" && o.pad != null && q.box.pl == null) { q.box.pl = String(o.pad); q.box.pr = String(o.pad); }
if (o.padM !== "" && o.padM != null && q.box.plM == null) { q.box.plM = String(o.padM); q.box.prM = String(o.padM); }
});
o.shadow = k.shadow != null ? k.shadow : k.line === false ? "none" : "line";
delete o.line;
delete o.strip;
delete o.paneW;
delete o.pad;
delete o.padM;
return o;
});
s.editor = Object.assign({ layout: {}, hidden: [], order: {}, moved: {}, custom: [] }, s.editor || {});
/* OLD SHEET MARGINS BECOME THE PAGE'S PADDING */
Object.keys(p.pages || {}).forEach(function (id) {
var q = p.pages[id];
if (!q) return;
q.box = Object.assign({}, q.box || {});
var has = function (k) { return q[k] !== undefined && q[k] !== "" && q[k] != null; };
if (has("sheetPadT") && q.box.pt == null) q.box.pt = String(q.sheetPadT);
if (has("sheetPadTM") && q.box.ptM == null) q.box.ptM = String(q.sheetPadTM);
if (has("sheetPadX") && q.box.pl == null) {
q.box.pl = String(q.sheetPadX);
q.box.pr = String(q.sheetPadX);
}
if (has("sheetPadXM") && q.box.plM == null) {
q.box.plM = String(q.sheetPadXM);
q.box.prM = String(q.sheetPadXM);
}
delete q.sheetPadT;
delete q.sheetPadTM;
delete q.sheetPadX;
delete q.sheetPadXM;
});
/* ONCE: A PAGE'S "HIDE TITLE" AND AN IMAGE'S "NO ZOOM" ONLY MEAN SOMETHING WHEN THE SITE-WIDE SWITCH IS ON; OLDER DATA HAD THEM SET ON EVERYTHING, SO THE SITE SWITCHES DID NOTHING */
if (!s.followV1) {
Object.keys(p.pages || {}).forEach(function (id) {
var q = p.pages[id];
if (!q) return;
if (!s.header && q.header === false && q.kind !== "pin" && !(q.els || []).some(function (e) { return e.type === "sheetmenu"; })) delete q.header;
if (!s.zoom) (q.els || []).forEach(function (e) {
if (e.type === "image" && e.props && e.props.zoom === false) e.props.zoom = true;
});
});
s.followV1 = true;
}
if (!s.layOrderV1) {
layMigrateOrderIn(p);
s.layOrderV1 = true;
}
layUnparkIn(p);
s.unparkV1 = true;
if (!s.pinV1) {
layPinMenuIn(p);
s.pinV1 = true;
}
/* THE GLASS: WHAT IS STUCK TO THE WINDOW ITSELF AND NEVER MOVES WHILE PAPER SLIDES UNDER IT */
s.glass = Object.assign({ menu: "", at: "bottom", color: "", alpha: 92, blur: 8 }, s.glass || {});
if (!s.glassV1) {
layGlassIn(p);
s.glassV1 = true;
}
/* ONCE: A PAGE'S OWN MARGINS BECOME THE SHEET'S (BEFORE sheetFix DROPS THEM), SO NOTHING MOVES WHEN THE MODEL TIGHTENS */
if (!s.oneV1) {
layOneIn(p);
s.oneV1 = true;
}
sheetFix(p);
sheetPinOrder(p);
if (s.glass) s.glass.menu = "";
killBlocks(p);
s.motion = Object.assign({ gDur: 450, gEase: "ease", tease: 8, open: 24 }, s.motion || {});
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
if (s.postLayout) s.postLayout = fixLayout(s.postLayout);
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
var BD_TYPE_CLASS = { text: "bd-text", notes: "bd-notes", image: "bd-figure", gallery: "bd-gallery", library: "bd-library", link: "bd-link", list: "bd-list", embed: "bd-embed", html: "bd-html", rule: "bd-rule", ptitle: "bd-ptitle", menubtn: "bd-menubtn", sheetmenu: "bd-sheetmenu", indexlink: "bd-ix", pager: "bd-pagerbar", posts: "bd-posts", postinfo: "bd-postinfo", quote: "bd-quote", toggle: "bd-toggle", product: "bd-product" };
var BD_TYPE_NAME = { text: "Text", notes: "Notes", image: "Image", gallery: "Gallery", library: "Library", link: "Link", list: "List", embed: "Video", html: "HTML", rule: "Rule", ptitle: "Page title", menubtn: "Menu", sheetmenu: "Sheet menu", indexlink: "Index link", pager: "Page arrows", posts: "Blog posts", postinfo: "Post info", quote: "Quote", toggle: "Fold-out list", product: "Product" };
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
sheetmenu: { w: 12, h: 6, props: { menu: "", marker: ">", align: "right", style: "heading", gap: 4, gapM: 14, pad: 40, padM: 16, mark: "" } },
indexlink: { w: 12, h: 3, props: { label: "Index;", crumbs: true, sep: " / ", gap: 12, dim: 60, line: true, style: "body" } },
pager: { w: 12, h: 3, props: { num: "num", line: false, loop: false, scope: "site", look: "arrows", nextLabel: "Next, ", prevLabel: "", align: "left", style: "body" } },
posts: { w: 12, h: 30, props: { blog: "", layout: "grid", cols: 3, colsM: 1, gap: 40, gapM: 24, rowGap: 40, rowGapM: 24, sort: "order", limit: "", featured: "none", fLayout: "stack", fTitleStyle: "heading", showImage: true, showTitle: true, showDate: false, showMeta: true, showExcerpt: false, imagePos: "top", ratio: "auto", imgGap: 12, cardBg: "", cardPad: 0, cardPadM: "", minH: "", titleStyle: "body", titleSize: "", titleLh: "", metaStyle: "small", metaSize: "", metaLh: "", metaGap: 8, hover: "dim" } },
postinfo: { w: 12, h: 3, props: { back: true, backLabel: "<", date: false, words: true, time: true, sep: "", style: "small", size: "", lh: "" } },
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
"--bd-g-dur: " + s.motion.gDur + "ms;",
"--bd-g-ease: " + s.motion.gEase + ";",
"--bd-g-tease: " + s.motion.tease + "deg;",
"--bd-g-open: " + s.motion.open + "deg;",
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

/* ZINE CARDS — DEADPAN GESTURE: THE COVER SWINGS OPEN ON ITS STAPLED SPINE */
.bd-posts.is-zine .bd-post {
position: relative;
padding: 0;
background: none;
perspective: 900px;
}
.bd-post-cover {
display: contents;
}
.bd-posts.is-zine .bd-post-cover {
position: relative;
z-index: 1;
display: flex;
flex-direction: column;
height: 100%;
padding: var(--ppad, 0px);
background: var(--pbg, #eeeeee);
box-shadow: 2px 3px 0 rgba(0, 0, 0, 0.12);
transform-origin: left center;
transition: transform var(--bd-g-dur, 0.45s) var(--bd-g-ease, ease), box-shadow var(--bd-g-dur, 0.45s) var(--bd-g-ease, ease);
}
.bd-posts.is-zine.is-img-bottom .bd-post-cover .bd-post-img {
order: 2;
margin: var(--pimg-gap, 12px) 0 0;
}
.bd-post-page {
position: absolute;
inset: 0;
z-index: 0;
overflow: hidden;
padding: var(--ppad, 18px);
background: var(--ppage, #ffffff);
box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
}
.bd-posts.has-staples .bd-post-cover::before,
.bd-posts.has-staples .bd-post-cover::after {
content: "";
position: absolute;
left: 5px;
width: 2px;
height: 14px;
background: var(--pstaple, #555555);
}
.bd-posts.has-staples .bd-post-cover::before {
top: 22%;
}
.bd-posts.has-staples .bd-post-cover::after {
bottom: 22%;
}
.bd-posts.is-zine a.bd-post:hover {
opacity: 1;
transform: none;
}
@media (hover: hover) {
.bd-posts.is-zine a.bd-post:hover .bd-post-cover {
transform: rotateY(calc(var(--bd-g-tease, 8deg) * -1));
box-shadow: 5px 4px 0 rgba(0, 0, 0, 0.12);
}
}
.bd-posts.is-zine a.bd-post.is-open .bd-post-cover {
transform: rotateY(calc(var(--bd-g-open, 24deg) * -1));
box-shadow: 10px 6px 0 rgba(0, 0, 0, 0.12);
}
.bd-posts.is-zine .bd-post-cover {
backface-visibility: hidden;
}
.bd-posts.is-zine a.bd-post.is-unfold {
z-index: 5;
}
.bd-posts.is-zine a.bd-post.is-unfold .bd-post-cover {
transform: rotateY(-170deg);
box-shadow: none;
transition: transform 0.35s ease-in;
}
.bd-unfold {
position: fixed;
z-index: 100;
pointer-events: none;
box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
transition: left 0.38s ease-in-out, top 0.38s ease-in-out, width 0.38s ease-in-out, height 0.38s ease-in-out, background-color 0.38s ease;
}
@view-transition {
navigation: auto;
}
.bd-posts.is-zine .bd-post.is-featured.is-f-side {
display: block;
}
.bd-posts.is-zine .bd-post.is-featured.is-f-side .bd-post-cover {
display: grid;
grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
column-gap: var(--pgap, 40px);
}

/* TRACING PAPER CARDS — DEADPAN GESTURE: A FROSTED SHEET LIES ON THE POSTER, HOVER NUDGES IT, A TAP SLIDES IT AWAY */
.bd-posts.is-trace .bd-post {
position: relative;
display: block;
overflow: hidden;
aspect-ratio: var(--pratio, 3 / 4);
padding: 0;
background: var(--pbg, #e6e5e1);
}
.bd-posts.is-trace .bd-post.is-featured.is-f-side {
display: block;
}
.bd-posts.is-trace .bd-post-img {
position: absolute;
inset: 0;
margin: 0;
}
.bd-posts.is-trace .bd-post-img img {
width: 100%;
height: 100%;
aspect-ratio: auto;
object-fit: cover;
filter: blur(var(--tp-imgblur, 0px)) var(--tp-tone, brightness(1));
transform: scale(1.03);
}
.bd-post-paper {
position: absolute;
inset: var(--tp-inset, 0px);
z-index: 1;
display: flex;
flex-direction: column;
justify-content: var(--tp-just, flex-end);
padding: var(--tp-pad, 16px);
color: var(--tp-ink, #111111);
background: color-mix(in srgb, var(--tp-bg, #f4f3ef) var(--tp-a, 72%), transparent);
-webkit-backdrop-filter: blur(var(--tp-frost, 8px));
backdrop-filter: blur(var(--tp-frost, 8px));
box-shadow: inset 0 0 0 1px var(--tp-line, rgba(0, 0, 0, 0.08));
transform: rotate(var(--tp-tilt, 0deg));
transition: transform calc(var(--bd-g-dur, 450ms) * 1.2) var(--bd-g-ease, cubic-bezier(0.3, 0.7, 0.2, 1));
}
.bd-posts.is-trace a.bd-post:hover {
opacity: 1;
transform: none;
}
@media (hover: hover) {
.bd-posts.is-trace a.bd-post:hover .bd-post-paper {
transform: var(--tp-hover, translate(0%, -12%)) rotate(var(--tp-tilt, 0deg));
}
}
.bd-posts.is-trace a.bd-post.is-open .bd-post-paper {
transform: var(--tp-tap, translate(0%, -62%)) rotate(var(--tp-tilt, 0deg));
}
@media (prefers-reduced-motion: reduce) {
.bd-post-paper {
transition: none;
}
}

/* POST INFO */
.bd-postinfo-back {
margin-right: 0.6em;
text-decoration: none;
}
.bd-postinfo.is-al-center {
text-align: center;
}
.bd-postinfo.is-al-right {
text-align: right;
}
.bd-postinfo.is-al-spread {
display: flex;
justify-content: space-between;
}
.bd-postinfo.has-line {
padding-bottom: 14px;
border-bottom: 1px solid var(--bd-rule);
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
.bd-ix {
display: flex;
align-items: baseline;
gap: var(--ix-gap);
}
.bd-ix-a {
color: inherit;
text-decoration: underline;
text-underline-offset: 3px;
}
.bd-ix.is-plain .bd-ix-a {
text-decoration: none;
}
.bd-ix-crumb {
opacity: var(--ix-dim);
}
.bd-ix-c {
color: inherit;
text-decoration: none;
}
.bd-ix-c:hover {
text-decoration: underline;
text-underline-offset: 3px;
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
if (!phone) out.push(postArrowsCSS());
return out.filter(Boolean).join("\n");
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
transition: transform var(--bd-g-dur, 0.45s) var(--bd-g-ease, ease), box-shadow var(--bd-g-dur, 0.45s) var(--bd-g-ease, ease);
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
@media (hover: hover) {
.bd-library.is-hov-tilt a.bd-lib-item:hover .bd-lib-cover {
transform: rotateY(calc(var(--bd-g-tease, 8deg) * -1));
box-shadow: 6px 5px 12px rgba(0, 0, 0, 0.18);
}
.bd-library.is-hov-lift a.bd-lib-item:hover .bd-lib-cover {
transform: translateY(-2px);
}
}
.bd-library.is-hov-tilt a.bd-lib-item.is-open .bd-lib-cover {
transform: rotateY(calc(var(--bd-g-open, 24deg) * -1));
box-shadow: 14px 8px 18px rgba(0, 0, 0, 0.22);
}
.bd-library.is-hov-lift a.bd-lib-item.is-open .bd-lib-cover {
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
var x = layersOn() || page.kind === "pin" ? "" : pageBoxCSS(page, phone, ".bd-panel.bd-pg-" + page.id, null) + (underPatternCSS(page, ".bd-panel.bd-pg-" + page.id, phone) ? "\n" + underPatternCSS(page, ".bd-panel.bd-pg-" + page.id, phone) : "") + (!phone && effPage(page).sheetBg ? '\n.bd-site[data-bd-page="' + page.slug + '"] {\nbackground: ' + bgVal(effPage(page).sheetBg) + ";\n}" : "");
return r + (g ? "\n" + g : "") + (b ? "\n" + b : "") + (x.trim() ? "\n" + x.trim() : "");
}
/* PAGE BOX — SPACE AROUND AND INSIDE A PAGE, AND A CARD FOR IT TO SIT ON. NUMBERS ARE PX; % IS OF THE WINDOW (TOP/BOTTOM OF ITS HEIGHT, SIDES OF ITS WIDTH) */
var BOX_SIDES = [["t", "top"], ["r", "right"], ["b", "bottom"], ["l", "left"]];
/* IN THE CANVAS A % IS A SHARE OF THE DRAWN WINDOW (SET WHILE ITS CSS IS WRITTEN); PUBLISHED, IT'S vh / vw */
var BOX_VIEW = null;
function boxLen(v, side) {
var s = String(v == null ? "" : v).trim().replace(/\s+/g, "");
if (!s) return null;
var m = s.match(/^(-?\d+(?:\.\d+)?)(px|%|vh|vw|rem|em)?$/);
if (!m) return null;
var u = m[2] || "px";
if (u === "%" && BOX_VIEW) return Math.round(parseFloat(m[1]) * (side === "t" || side === "b" ? BOX_VIEW.h : BOX_VIEW.w)) / 100 + "px";
if (u === "%") u = side === "t" || side === "b" ? "vh" : "vw";
return m[1] + u;
}
function boxVal(b, k, phone) {
return phone && b[k + "M"] !== "" && b[k + "M"] != null ? b[k + "M"] : b[k];
}
/* POST PAGES: THE MASTER LOOK (site.postBox) UNDER EACH POST'S OWN SPACE & CARD */
function effPage(q) {
if (!q || !q.parent || typeof S === "undefined" || !S.project) return q;
var pb = S.project.site.postBox;
if (!pb) return q;
var own = q.box || {};
var m = {};
Object.keys(pb).forEach(function (k) {
if (k === "sheetBg") return;
var v = pb[k];
if (v !== "" && v != null && v !== false) m[k] = v;
});
Object.keys(own).forEach(function (k) {
var v = own[k];
if (v === "" || v == null || v === false || (k === "shadow" && v === "none")) return;
m[k] = v;
});
var c = Object.assign({}, q);
c.box = m;
if (!c.sheetBg && pb.sheetBg) c.sheetBg = pb.sheetBg;
return c;
}
function pageBoxCSS(q, phone, sel, ins, noMargin) {
q = effPage(q);
var b = q.box || {};
var cardOn = true;
var onSh = !!noMargin;
if (noMargin) {
cardOn = pageMode(q) === "card";
noMargin = false;
}
var anyM = false;
var passed = !!ins;
ins = ins || { top: 0, right: 0, bottom: 0, left: 0 };
var def = { t: "var(--bd-wt)", r: "var(--bd-wr)", b: "var(--bd-wb)", l: "var(--bd-wl)" };
var d = [];
var sideM = false;
BOX_SIDES.forEach(function (sd) {
var M = noMargin ? null : boxLen(boxVal(b, "m" + sd[0], phone), sd[0]);
var P = boxLen(boxVal(b, "p" + sd[0], phone), sd[0]);
var I = ins[sd[1]] || 0;
if (M != null) {
anyM = true;
d.push("margin-" + sd[1] + ": " + (I ? "calc(" + I + "px" + pinGrow(sd[1], phone) + " + " + M + ")" : M) + ";");
if (sd[0] === "l" || sd[0] === "r") sideM = true;
if (P == null && I) d.push("padding-" + sd[1] + ": " + def[sd[0]] + ";");
}
if (P != null) d.push("padding-" + sd[1] + ": " + (I && M == null ? "calc(" + I + "px" + pinGrow(sd[1], phone) + " + " + P + ")" : P) + ";");
else if (onSh && passed) d.push("padding-" + sd[1] + ": " + (I ? "calc(" + I + "px" + pinGrow(sd[1], phone) + " + " + def[sd[0]] + ")" : def[sd[0]]) + ";");
else if (!onSh && M == null && I) d.push("padding-" + sd[1] + ": calc(" + I + "px" + pinGrow(sd[1], phone) + " + " + def[sd[0]] + ");");
});
var w = boxLen(boxVal(b, "maxW", phone), "l");
if (sideM) d.push("width: auto;");
if (w) d.push("max-width: " + w + ";");
if (w && onSh && !anyM) d.push("margin: 0;");
if (!phone) {
if (b.ink) d.push("color: " + b.ink + ";", "--bd-ink: " + b.ink + ";");
if (cardOn && b.card) {
var ca = solidPct(b.cardA, 0);
d.push("background: " + fillCSS(b.card, ca) + ";");
}
var bl = cardOn ? parseFloat(b.blur) : 0;
if (bl > 0) d.push("-webkit-backdrop-filter: blur(" + bl + "px);", "backdrop-filter: blur(" + bl + "px);");
var r = cardOn ? parseFloat(b.radius) : 0;
if (r > 0) d.push("border-radius: " + r + "px;");
if (!cardOn) { /* SHEET MODE: NO CARD */ }
else if (b.shadow && b.shadow !== "none") d.push("box-shadow: " + shadowCSS(b, true) + ";");
if (b.fit) d.push("min-height: 0;");
}
var rc = !phone && cardOn && q.id ? rimCardCSS(q, sel, !onSh) : "";
return (d.length ? sel + " {\n" + d.join("\n") + "\n}" : "") + (rc ? (d.length ? "\n" : "") + rc : "");
}
/* THE PAGE'S SPACE & CARD FIELDS (RIGHT PANEL) */
function pageBoxPanel(pg, tail) {
var ph = S.mode === "phone";
var b = pg.box || {};
var four = function (pre) {
return '<div class="bd-ed-row" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + BOX_SIDES.map(function (sd) {
var k = pre + sd[0] + (ph ? "M" : "");
return '<label class="bd-ed-field"><span class="bd-ed-label">' + sd[1] + '</span><input class="bd-ed-input bd-ed-n" data-bind="page.box.' + k + '" value="' + esc(b[k] == null ? "" : b[k]) + '"' + (ph && b[pre + sd[0]] ? ' placeholder="' + esc(b[pre + sd[0]]) + '"' : "") + "></label>";
}).join("") + "</div>";
};
var onSheet = layersOn() && sheetOf(pg.id).k > -1;
var own = true;
return '<div class="bd-ed-sec"><span class="bd-ed-title">Space & card' + (ph ? " · phone" : "") + "</span>"
+ (onSheet ? "" : '<span class="bd-ed-label">Margin · outside the page</span>' + four("m"))
+ '<span class="bd-ed-label">Padding · inside the page</span>' + four("p")

+ '<div class="bd-ed-hint">Numbers are px. 20% = a fifth of the window (top and bottom of its height, sides of its width). Blank = the site’s.' + (ph ? " Blank on phone = same as desktop." : "") + "</div>"
+ (own ? fillIn("Card colour", "page.box.card", b.card || "", "#ffffff", "None") + (onSheet ? "" : fillIn("Behind the page", "page.sheetBg", pg.sheetBg || "", "#ffffff", "Site"))
+ row(numIn("Corners", "page.box.radius", b.radius == null ? "" : b.radius, "blank"), numIn("Card see-through %", "page.box.cardA", b.cardA == null ? "" : b.cardA, "blank"), numIn("Blur behind", "page.box.blur", b.blur == null ? "" : b.blur, "blank")) : "")
+ (ph ? "" : colorIn("Text colour", "page.box.ink", b.ink || "", S.project.site.colors.ink, "Site"))
+ field("Max width" + (ph ? " · phone" : ""), input("page.box.maxW" + (ph ? "M" : ""), (ph ? b.maxWM : b.maxW) || "", "", ' placeholder="720 or 60%"'))
+ (own ? field("Shadow", seg("page.box.shadow", b.shadow || "none", [["none", "None"], ["line", "Line"], ["hard", "Hard"], ["soft", "Soft"]])) : "")
+ sw("Card only as tall as what’s on it", "page.box.fit", !!b.fit)
+ (onSheet && own ? '<span class="bd-ed-label">Inherits the sheet unless set</span>' + field("Decoration", select("page.pattern", pg.pattern || "", [["", "Inherit from sheet"], ["none", "None"]].concat(SHEET_PATTERNS.filter(function (x) { return x[0]; })))) + field("On hover", seg("page.hover", pg.hover || "", [["", "Inherit"], ["lift", "Lift"]])) : "")
+ (tail || "")
+ "</div>";
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
if (postLook(e) === "trace") px("--tp-pad", "paperPad");
if (!phone) {
px("--pminh", "minH");
px("--pimg-gap", "imgGap");
px("--pmgap", "metaGap");
if (E(e, "cardBg")) d.push("--pbg: " + E(e, "cardBg") + ";");
if (E(e, "staple")) d.push("--pstaple: " + E(e, "staple") + ";");
if (E(e, "pageBg")) d.push("--ppage: " + E(e, "pageBg") + ";");
/* TRACING PAPER — COLOUR, SEE-THROUGH, FROST, SLIDE */
if (postLook(e) === "trace") {
if (E(e, "paperBg")) d.push("--tp-bg: " + E(e, "paperBg") + ";");
if (E(e, "paperInk")) d.push("--tp-ink: " + E(e, "paperInk") + ";");
if (E(e, "paperLine")) d.push("--tp-line: " + E(e, "paperLine") + ";");
var tpa = N(e, "paperAlpha", false);
if (tpa != null) d.push("--tp-a: " + Math.max(0, Math.min(100, tpa)) + "%;");
px("--tp-frost", "paperFrost");
px("--tp-inset", "paperInset");
px("--tp-imgblur", "imgBlur");
var tpt = N(e, "paperTilt", false);
if (tpt != null) d.push("--tp-tilt: " + tpt + "deg;");
var tdir = E(e, "slideDir") || "up";
var tmv = function (n) { var v = (tdir === "up" || tdir === "left" ? -1 : 1) * n; return tdir === "up" || tdir === "down" ? "translate(0%, " + v + "%)" : "translate(" + v + "%, 0%)"; };
var th = N(e, "slideHover", false), tt = N(e, "slideTap", false);
d.push("--tp-hover: " + tmv(th != null ? th : 12) + ";");
d.push("--tp-tap: " + tmv(tt != null ? tt : 62) + ";");
var ttp = E(e, "textPos") || "bottom";
d.push("--tp-just: " + (ttp === "top" ? "flex-start" : ttp === "center" ? "center" : "flex-end") + ";");
var tone = E(e, "imgTone") || "color";
if (tone !== "color") d.push("--tp-tone: " + (tone === "grey" ? "grayscale(1)" : tone === "dark" ? "brightness(0.7)" : "brightness(1.2) saturate(0.8)") + ";");
}
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
if (e.type === "postinfo") {
px("padding-top", "padT");
px("padding-bottom", "padB");
if (!phone) {
if (ON(e, "upper")) d.push("text-transform: uppercase;");
if (N(e, "tracking", false) != null) d.push("letter-spacing: " + N(e, "tracking", false) + "em;");
if (E(e, "ink")) d.push("color: " + E(e, "ink") + ";");
var pbd = [];
if (N(e, "backGap", false) != null) pbd.push("margin-right: " + N(e, "backGap", false) + "px;");
if (N(e, "backSize", false) != null) pbd.push("font-size: " + N(e, "backSize", false) + "px;");
if (E(e, "backInk")) pbd.push("color: " + E(e, "backInk") + ";");
if (N(e, "backDim", false) != null) pbd.push("opacity: " + (N(e, "backDim", false) / 100) + ";");
if (pbd.length) out.push(sel + " .bd-postinfo-back {\n" + pbd.join("\n") + "\n}");
}
}
/* MASTER + OVERRIDE LOOKS FOR TEXT-LIKE BLOCKS */
if (e.type === "text" || e.type === "notes" || e.type === "list" || e.type === "link") {
font(e.type === "notes" ? sel + ",\n" + sel + " li" : e.type === "list" ? sel + ",\n" + sel + " h2,\n" + sel + " li" : sel, "size", "lh");
if (!phone && E(e, "ink")) out.push(".bd-site " + sel + (e.type === "link" ? "" : ",\n.bd-site " + sel + " a") + " {\ncolor: " + E(e, "ink") + ";\n}");
if (!phone) {
if (e.type === "text" && N(e, "tracking", false) != null) d.push("letter-spacing: " + N(e, "tracking", false) + "em;");
if (e.type === "text" && N(e, "measure", false) != null) d.push("max-width: " + N(e, "measure", false) + "px;");
}
}
/* IMAGES — BLEND MODE, TONE, OPACITY, CORNERS, HARD SHADOW */
if ((e.type === "image" || e.type === "gallery" || e.type === "library" || e.type === "posts") && !phone) {
var im = [];
var bl = E(e, e.type === "posts" ? "imgBlend" : "blend");
if (bl === "ink") im.push("mix-blend-mode: multiply;", "--bd-ink-img: 1;");
else if (bl && bl !== "normal") im.push("mix-blend-mode: " + bl + ";");
if (e.type === "image" || e.type === "gallery") {
var tn = E(e, "tone");
if (tn && tn !== "color" && bl !== "ink") im.push("filter: " + (tn === "grey" ? "grayscale(1)" : tn === "dark" ? "brightness(0.7)" : "brightness(1.2) saturate(0.8)") + ";");
var op = N(e, "opacity", false);
if (op != null && op < 100) im.push("opacity: " + Math.max(0, op) / 100 + ";");
var rd = N(e, "radius", false);
if (rd) im.push("border-radius: " + rd + "px;");
if (e.type === "image" && ON(e, "hard")) im.push("box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.12);");
}
if (im.length) out.push((e.type === "posts" ? sel + ".bd-posts .bd-post-img img" : e.type === "library" ? sel + " .bd-lib-cover img" : sel + " img") + " {\n" + im.join("\n") + "\n}");
var bk = E(e, e.type === "posts" ? "imgBackdrop" : "backdrop");
if (bl && bl !== "normal" && bl !== "ink" && bk) out.push((e.type === "image" ? sel : e.type === "gallery" ? sel + " figure" : e.type === "library" ? sel + " .bd-lib-cover" : sel + " .bd-post-cover,\n" + sel + " .bd-post-img") + " {\nbackground-color: " + bk + ";\n}");
}
if (e.type === "embed" && !phone && N(e, "radius", false)) out.push(sel + " {\nborder-radius: " + N(e, "radius", false) + "px;\noverflow: hidden;\n}");
if (e.type === "rule" && !phone) {
if (E(e, "ink")) d.push("border-color: " + E(e, "ink") + ";");
if (N(e, "weight", false) != null) d.push("border-top-width: " + N(e, "weight", false) + "px;");
}
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
/* 1 YOUR OWN CARD IMAGE, 2 THE IMAGE YOU MARKED, 3 THE FIRST IMAGE IN THE POST */
if (q.cover && (q.cover.assetId || q.cover.file)) return q.cover;
if (q.thumb) {
var tk = String(q.thumb).split(":");
var te = (q.els || []).filter(function (e) { return e.id === tk[0]; })[0];
if (te && te.type === "image" && (te.props.assetId || te.props.file)) return te.props;
if (te && te.type === "gallery" && te.props.items) {
var ti = te.props.items.filter(function (it) { return it.id === tk[1]; })[0];
if (ti) return ti;
}
}
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
var look = postLook(e);
if (look === "trace") {
var ttxt = '<span class="bd-post-paper"><span class="bd-post-txt">' + txt.join("") + "</span></span>";
return '<a class="bd-post' + (feat ? " is-featured" : "") + (parts.length ? "" : " is-noimg") + '" href="/' + esc(q.slug || "") + '">' + parts.join("") + ttxt + "</a>";
}
parts.push('<span class="bd-post-txt">' + txt.join("") + "</span>");
var zine = look === "zine";
var body = zine ? '<span class="bd-post-page bd-ts-' + (E(e, "metaStyle") || "small") + '">' + esc(postPeek(q)) + '</span><span class="bd-post-cover">' + parts.join("") + "</span>" : parts.join("");
return '<a class="bd-post' + (feat ? " is-featured is-f-" + (p.fLayout || "stack") : "") + '" href="/' + esc(q.slug || "") + '">' + body + "</a>";
}
/* WHICH CARD LOOK — "Card look" WINS; OLDER SITES WITH THE ZINE SWITCH OR "OPEN" HOVER STAY ZINES */
function postLook(e) {
var l = E(e, "look");
if (l === "trace" || l === "zine") return l;
return ON(e, "zine") || E(e, "hover") === "open" ? "zine" : "plain";
}
function postPeek(q) {
if (q.excerpt) return q.excerpt;
var title = String(q.h1 || q.title || "").trim();
var paras = [];
(q.els || []).forEach(function (e) {
if (e.type !== "text") return;
String(e.props.html || "").split(/<\/p>/i).forEach(function (h) {
var t = h.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
if (t && t !== title && t.length > 60) paras.push(t);
});
});
var t = paras[0] || "";
return t.length > 240 ? t.slice(0, 237).replace(/\s+\S*$/, "") + "…" : t;
}
function postsHTML(e, ctx) {
var p = e.props;
var L = postsList(p);
var cls = "bd-el bd-e-" + e.id + " bd-posts is-" + (p.layout || "grid") + " is-img-" + (E(e, "imagePos") || "top") + (postLook(e) === "trace" ? " is-trace is-hov-none" : " is-hov-" + (E(e, "hover") || "none") + (postLook(e) === "zine" ? " is-zine" + (ON(e, "zine") ? " has-staples" : "") : ""));
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
if (e.type === "sheetmenu") return sheetMenuHTML(e, base);
if (e.type === "indexlink") return indexLinkHTML(e, base);
if (e.type === "postinfo") {
/* A BLOG CAN SWITCH POST INFO OFF FOR ALL ITS POSTS (page.postInfo = false on the blog); THE BLOCKS STAY IN THE EDITOR */
var ip = forPage();
var pib = ip && ip.parent && S.project.pages[ip.parent];
if (ctx !== "edit" && pib && pib.postInfo === false) return "";
var bits = [];
if (p.date && ip && ip.date) bits.push(esc(fmtDate(ip.date)));
var wc = ip ? postWords(ip) : 0;
if (p.words) bits.push(wc + " words");
if (p.time) bits.push(Math.max(1, Math.ceil(wc / 200)) + " min");
var bl = ip && ip.parent ? S.project.pages[ip.parent] : null;
var back = p.back ? '<a class="bd-postinfo-back" href="/' + esc(bl ? bl.slug || "" : "") + '">' + esc(p.backLabel || "<") + "</a>" : "";
var psep = p.sep != null && p.sep !== "" ? esc(p.sep) : p.words && p.time && !p.date ? " ~ " : " · ";
return '<div class="' + base + " bd-postinfo bd-ts-" + (E(e, "style") || "small") + " is-al-" + (E(e, "align") || "left") + (ON(e, "line") ? " has-line" : "") + '">' + back + "<span>" + bits.join(psep) + "</span></div>";
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
/* POST ARROWS: ONE SWITCH IN MASTER · BLOG, ONE OVERRIDE ON EACH BLOG PAGE. A POST THAT HAS ITS OWN PAGE ARROWS BLOCK KEEPS THAT ONE */
var POST_ARROWS_DEF = { on: false, look: "arrows", num: "count", align: "left", style: "body", prevLabel: "", nextLabel: "Next, ", loop: false, line: false, space: 60, gap: 18, size: 22, ink: "" };
function postArrowsCfg() {
return Object.assign({}, POST_ARROWS_DEF, S.project.site.postArrows || {});
}
function postArrowsOn(page) {
if (!page || !page.parent || page.kind === "pin") return false;
if (!postArrowsCfg().on) return false;
var bl = S.project.pages[page.parent];
if (bl && bl.postArrows === false) return false;
return !(page.els || []).some(function (e) { return e.type === "pager"; });
}
function postArrowsHTML(page, ctx) {
if (!postArrowsOn(page)) return "";
var c = postArrowsCfg();
var e = { id: "parrows", type: "pager", own: {}, props: { scope: "blog", look: c.look, num: c.num, align: c.align, style: c.style, prevLabel: c.prevLabel, nextLabel: c.nextLabel, loop: c.loop, line: c.line } };
var h = elHTML(e, ctx);
return h ? '<div class="bd-post-arrows">\n' + h + "\n</div>" : "";
}
function postArrowsCSS() {
var c = postArrowsCfg();
if (!c.on) return "";
var jc = { left: "flex-start", center: "center", right: "flex-end", spread: "space-between" }[c.align] || "flex-start";
var o = [".bd-post-arrows {\nmargin-top: " + (parseFloat(c.space) || 0) + "px;\n" + (c.ink ? "color: " + c.ink + ";\n" : "") + "}"];
o.push(".bd-post-arrows .bd-pagerbar {\ndisplay: flex;\nalign-items: center;\njustify-content: " + jc + ";\ngap: " + (parseFloat(c.gap) || 0) + "px;\n}");
o.push(".bd-post-arrows .bd-pagerbar a {\ndisplay: block;\nwidth: auto;\n}");
o.push(".bd-post-arrows .bd-pagerbar.is-text a + a {\nmargin-left: 0;\n}");
o.push(".bd-post-arrows .bd-pagerbar svg {\nwidth: " + (parseFloat(c.size) || 22) + "px;\nheight: " + (parseFloat(c.size) || 22) + "px;\n}");
return o.join("\n");
}
function postArrowsPanel() {
var c = postArrowsCfg();
var P = "site.postArrows.";
var h = '<div class="bd-ed-sec"><span class="bd-ed-title">Post arrows</span>'
+ sw("Arrows at the end of every post", P + "on", c.on)
+ '<div class="bd-ed-hint">Previous and next post, under every post of every blog. A blog page can switch them off for its own posts. A post that has its own Page arrows block keeps that one.</div>';
if (c.on) {
h += row(field("Look", seg(P + "look", c.look, [["arrows", "Arrows"], ["text", "Words"]])), field("Align", seg(P + "align", c.align, [["left", "Left"], ["center", "Centre"], ["right", "Right"], ["spread", "Spread"]])));
if (c.look === "text") h += row(field("Before next title", input(P + "nextLabel", c.nextLabel, "", ' placeholder="Next, "')), field("Before previous title", input(P + "prevLabel", c.prevLabel, "", ' placeholder="empty = hide"')));
h += row(numIn("Space above px", P + "space", c.space), numIn("Gap px", P + "gap", c.gap));
if (c.look !== "text") h += numIn("Arrow size px", P + "size", c.size);
h += field("Text style", select(P + "style", c.style, styleOpts())) + colorIn("Colour", P + "ink", c.ink, "#111111", "Ink") + sw("Line above", P + "line", !!c.line) + sw("Loop from last to first", P + "loop", !!c.loop);
}
return h + "</div>";
}
function contentHTML(page, ctx) {
var flow = isMaster(page);
var html = function (list) { return list.map(function (e) { return elHTML(e, ctx); }).filter(Boolean).join("\n\n"); };
var arr = postArrowsHTML(page, ctx);
if (arr) arr = "\n" + arr;
if (!flow) return '<div class="bd-grid">\n' + html(sortedEls(page, "d")) + "\n</div>" + arr;
var n = nCols(page);
if (n < 2) return '<div class="bd-flow">\n' + html(page.els) + "\n</div>" + arr;
var out = '<div class="bd-cols is-c' + n + (page.kind === "pin" || page.ownLayout ? " bd-cl-" + page.id : postCols(page) ? " bd-cl-posts" : "") + '">';
for (var c = 1; c <= n; c++) {
out += '\n<div class="bd-col bd-flow" data-col="' + c + '">\n' + html(page.els.filter(function (e) { return colOf(e, page) === c; })) + "\n</div>";
}
return out + "\n</div>" + arr;
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
/* A BLOG'S TITLE = HOW MANY POSTS + ITS NAME; A POST'S TITLE = ITS NUMBER + ITS NAME (BOTH, NAME ONLY OR NUMBER ONLY) */
var HEAD_MODES = [["both", "Number and name"], ["name", "Name only"], ["num", "Number only"]];
function headMode(page) {
var s = S.project.site;
if (page.blog) return page.titleMode || s.blogHead || "both";
var b = page.parent ? S.project.pages[page.parent] : null;
if (b) return b.postTitleMode || s.postHead || "both";
return "";
}
function headNumber(page) {
if (page.blog) return String(postsOf(page.id).length);
return String(postsOf(page.parent).map(function (q) { return q.id; }).indexOf(page.id) + 1);
}
function headInner(page) {
var s = S.project.site;
var m = headMode(page);
var name = esc(page.h1 || page.title);
if (!m) return (page.num && s.showNum ? '<span class="bd-num">' + esc(page.num) + "</span>\n" : "") + "<h1>" + name + "</h1>\n";
var num = headNumber(page);
if (m === "num") return "<h1>" + esc(num) + "</h1>\n";
return (m === "both" ? '<span class="bd-num">' + esc(num) + "</span>\n" : "") + "<h1>" + name + "</h1>\n";
}
function headHTML(page) {
var s = S.project.site;
if (!s.header || page.header === false || page.kind === "pin") return "";
return '<header class="bd-head">\n' + headInner(page) + "</header>\n";
}
/* LAYERS */
function layersOn() {
return !!(S.project && S.project.site.layers && S.project.site.layers.on);
}
function hexAlpha(hex, pct) {
var h = String(hex || "#000000").replace("#", "");
if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
var n = parseInt(h, 16) || 0;
return "rgba(" + ((n >> 16) & 255) + ", " + ((n >> 8) & 255) + ", " + (n & 255) + ", " + Math.round(pct) / 100 + ")";
}
/* A FILL IS A COLOUR OR A TWO-COLOUR LINEAR GRADIENT ("linear-gradient(180deg, #aaa, #bbb)"); A SHEET'S SEE-THROUGH APPLIES TO EVERY STOP */
function parseFill(v) {
var m = String(v || "").match(/^linear-gradient\(\s*(-?[\d.]+)deg\s*,\s*(#[0-9a-f]{3,6}|transparent)\s*,\s*(#[0-9a-f]{3,6}|transparent)\s*\)$/i);
return m ? { angle: parseFloat(m[1]), a: m[2], b: m[3] } : null;
}
function fillStop(c, pct) {
return c === "transparent" ? "transparent" : hexAlpha(c, pct);
}
function fillCSS(v, pct) {
if (v === "none" || v === "transparent") return "transparent";
var g = parseFill(v);
if (g) return "linear-gradient(" + g.angle + "deg, " + fillStop(g.a, pct) + ", " + fillStop(g.b, pct) + ")";
return hexAlpha(v, pct);
}
/* SEE-THROUGH % (WHAT EVERY PANEL SHOWS) → HOW SOLID THE PAINT IS: 0 = SOLID PAPER, 100 = CLEAR GLASS; BLANK = THE GIVEN DEFAULT */
function solidPct(v, dflt) {
var t = v === "" || v == null ? dflt : parseFloat(v);
if (isNaN(t)) t = dflt;
return Math.max(0, Math.min(100, 100 - t));
}
function sheetSolid(k) {
return solidPct(k.alpha, SHEET_DEFAULTS.alpha);
}
/* "NONE" PAINTS NOTHING; ANYTHING ELSE IS WRITTEN AS IT IS */
function bgVal(v) {
return v === "none" ? "transparent" : v;
}
/* A SHEET'S PAPER PATTERN: FLAT HAIRLINES OVER THE FILL (LINED, GRID FOR MATHS, DOTS, RULED WITH A MARGIN LINE) */
SHEET_PATTERNS = [["", "Plain"], ["lined", "Lined"], ["grid", "Squared · maths"], ["dots", "Dotted"], ["ruled", "Ruled · margin line"]];
function sheetPatternList(k) {
var t = k.pattern;
if (!t) return [];
var z = Math.max(6, parseFloat(k.patSize) || 28);
var c = hexAlpha(k.patColor || "#000000", k.patAlpha == null || k.patAlpha === "" ? 14 : k.patAlpha);
var ln = function (deg) { return "repeating-linear-gradient(" + deg + "deg, transparent 0, transparent " + (z - 1) + "px, " + c + " " + (z - 1) + "px, " + c + " " + z + "px)"; };
if (t === "lined") return [ln(180)];
if (t === "grid") return [ln(180), ln(90)];
if (t === "dots") return ["radial-gradient(circle, " + c + " 1px, transparent 1.6px) 0 0 / " + z + "px " + z + "px"];
if (t === "ruled") return [ln(180), "linear-gradient(90deg, transparent 63px, " + c + " 63px, " + c + " 64px, transparent 64px)"];
return [];
}
function sheetPattern(k) {
return sheetPatternList(k).join(", ");
}
/* THE PAPER: PATTERN LINES AND FILL, PAINTED ON EACH PAGE OF THE SHEET. A GRADIENT RUNS OVER THE WHOLE SCROLLABLE PAGE (local) AND OVER ALL THE SHEET'S PAGES (page j of N takes the j-th slice), SO THE SHEET READS AS ONE PIECE OF PAPER */
function pagePaperK(k, q) {
return q && q.pattern ? Object.assign({}, k, { pattern: q.pattern === "none" ? "" : q.pattern }) : k;
}
/* A CARD PAGE'S DECORATION LIES ON THE CARD ITSELF (OVER ITS COLOUR); THE PAPER BEHIND KEEPS THE SHEET'S OWN */
function cardPaperK(k, q) {
return q && pageMode(q) === "card" ? k : pagePaperK(k, q);
}
function cardPatternCSS(k, q, sel, phone) {
if (phone || !q || pageMode(q) !== "card" || !q.pattern || q.pattern === "none") return "";
var L = sheetPatternList(pagePaperK(k, q)).map(function (t) { return t + " local"; });
if (!L.length) return "";
var b = effPage(q).box || {};
var ca = solidPct(b.cardA, 0);
return sel + " {\nbackground: " + L.join(", ") + ", " + (b.card ? fillCSS(b.card, ca) : "transparent") + ";\n}";
}
/* A PAGE WITH NO SHEET HAS ITS OWN CARD: ITS DECORATION LIES ON THAT CARD (SAME LINES AS A SHEET'S PAPER) */
function underPatternCSS(q, sel, phone) {
if (phone || !q || q.parent || q.kind === "pin" || !q.pattern || q.pattern === "none") return "";
var L = sheetPatternList({ pattern: q.pattern, patColor: SHEET_DEFAULTS.patColor, patSize: SHEET_DEFAULTS.patSize, patAlpha: SHEET_DEFAULTS.patAlpha }).map(function (t) { return t + " local"; });
if (!L.length) return "";
var b = effPage(q).box || {};
var ca = solidPct(b.cardA, 0);
return sel + " {\nbackground: " + L.join(", ") + ", " + (b.card ? fillCSS(b.card, ca) : "transparent") + ";\n}";
}
/* GRAIN: A NOISE LAYER PAINTED AS PART OF THE PAPER (NO BLEND MODE, SO THE SHEET'S BLUR STILL SEES WHAT LIES UNDER IT) */
function grainLayer(g) {
g = Math.max(0, Math.min(100, parseFloat(g) || 0));
if (!g) return "";
var a = Math.round(g * 0.9) / 100;
return "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .3 0 0 0 0 .25 0 0 0 0 .2 0 0 0 " + a + " 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\") 0 0 / 160px 160px repeat local";
}
function sheetPaper(k, pct, j, N) {
var f = fillCSS(k.color || "#E4E1DA", pct);
var g = parseFill(k.color || "");
var out = sheetPatternList(k).map(function (t) { return t + " local"; });
var gr = grainLayer(k.grain);
if (gr) out.unshift(gr);
N = Math.max(1, N || 1);
j = j || 0;
if (g) {
var x = k.axis === "x";
var pos = N > 1 ? Math.round(j / (N - 1) * 10000) / 100 : 0;
out.push(f + " " + (x ? pos + "% 0" : "0 " + pos + "%") + " / " + (x ? N * 100 + "% 100%" : "100% " + N * 100 + "%") + " local");
} else out.push(f);
return out.join(", ");
}
/* SHEETS — ANY PAGE CAN LIE ON A PAPER SHEET; THE SHEETS LIST (TOP → BOTTOM) DECIDES WHAT LIES OVER WHAT */
var SHEET_PATTERNS;
var SHEET_DEFAULTS = { id: "", name: "Sheet", pages: [], restPage: "", edge: "left", edgeM: "top", rest: "open", peek: 200, peekM: 52, sliver: 44, sliverM: 14, axis: "y", covers: "all", coverPages: [], color: "#E4E1DA", alpha: 45, blur: 9, shadow: "soft", grain: 0, nudge: 0, dur: "", box: {}, pattern: "", patColor: "#000000", patSize: 28, patAlpha: 14, out: "peek", lv: "", arrive: "slide", main: "", hover: "" };
/* THE PAGE A PEEKING SHEET SHOWS AT REST — DRAWN ON ITS EDGE, ALWAYS THERE; THE OTHER PAGES SLIDE INTO VIEW */
function sheetStrip(k) {
if (!k || k.rest !== "peek") return null;
var q = sheetPage(k.restPage) || sheetPage((k.pages || [])[0]);
return q && (k.pages || []).indexOf(q.id) > -1 ? q : null;
}
function sheetPanes(k, phone) {
var st = sheetStrip(k);
var a = (k.pages || []).map(sheetPage).filter(function (q) { return q && (!st || q.id !== st.id); });
return phone && sheetRev(k) ? a.slice().reverse() : a;
}
/* THE PHONE CAN SWAP ITS TWO PAGES (revM) AND PIN A DIFFERENT PAGE (pinM); BLANK = SAME AS DESKTOP */
function sheetRev(k) {
return !!(k && k.revM && sheetPanes(k).length === 2);
}
/* A PINNED PAGE NEVER LEAVES THE WINDOW: THE SHEET SLIDES BETWEEN ITS PAGES, BUT ONLY AS FAR AS THE PINNED PAGE STAYS AGAINST THE WINDOW'S EDGE */
function sheetPin(k, phone) {
var P = sheetPanes(k).map(function (q) { return q.id; });
var id = k && phone && k.pinM ? (k.pinM === "none" ? "" : k.pinM) : k && k.pin;
return id && P.length > 1 && P.indexOf(id) > -1 ? id : "";
}
function sheetPinGeo(k, phone) {
var id = sheetPin(k, phone);
if (!id) return null;
var P = sheetPanes(k, phone).map(function (q) { return q.id; });
var pi = P.indexOf(id);
var x = sheetAx(k, phone) === "x";
var first = pi === 0;
var key = x ? (first ? "l" : "r") : (first ? "t" : "b");
var edge = x ? (first ? "right" : "left") : (first ? "bottom" : "top");
var wc = BOX_VIEW ? (x ? BOX_VIEW.w : BOX_VIEW.h) + "px" : x ? "100vw" : "100vh";
var M = boxLen(boxVal(k.box || {}, "m" + key, phone), key) || "0px";
return { id: id, pi: pi, N: P.length, P: P, x: x, key: key, edge: edge, len: "max(0px, min(max(calc(" + wc + " - " + M + "), var(--k-pl, 0px)), calc(" + wc + " - 48px)))" };
}
/* THE PINNED PAGE EITHER SLIDES TO THE WINDOW'S EDGE WHEN THE OTHER PAGE OPENS (DEFAULT) OR STAYS EXACTLY WHERE IT IS (A BAND THAT NEVER MOVES; THE OTHER PAGE SLIDES IN BESIDE IT) — PHONE CAN DIFFER */
function sheetPinStay(k, phone) {
return false;
if (!sheetPin(k)) return false;
return (phone && k.pinModeM ? k.pinModeM : k.pinMode) === "stay";
}
function sheetPinPx(k, phone) {
if (sheetPinStay(k, phone)) return null;
var g = sheetPinGeo(k, phone);
if (!g) return null;
var raw = String(boxVal(k.box || {}, "m" + g.key, phone) == null ? "" : boxVal(k.box || {}, "m" + g.key, phone)).trim();
var W = g.x ? (phone ? 390 : 1280) : (phone ? 780 : 800);
var m = parseFloat(raw) || 0;
if (/%$/.test(raw)) m = m * W / 100;
return { edge: g.edge, px: Math.max(0, Math.min(W - m, W - 48)) };
}
/* WHAT A PINNED STRIP LEAVES OUT OF THE WINDOW ON ONE SIDE, AS DRAWN; THE RUNTIME ADDS WHAT THE STRIP REALLY NEEDS BEYOND THAT (--bd-pin-<side>) */
function pinGrow(side, phone) {
if (side !== "left" && side !== "right") return "";
var n = 0;
sheetList().forEach(function (k) {
var pp = sheetPinPx(k, phone);
if (pp && pp.edge === side) n += pp.px;
});
return n ? " + max(0px, calc(var(--bd-pin-" + side + ", 0px) - " + n + "px))" : "";
}
function sheetPinCSS(phone) {
var out = [];
var KD = "var(--ly-pdur, var(--k-dur, var(--ly-dur)))";
sheetList().forEach(function (k) {
var g = sheetPinGeo(k, phone);
var sel = '#bd-ly .bd-ly-k[data-k="' + k.id + '"]';
/* THE PHONE STARTS FROM A CLEAN PANE: THE DESKTOP PIN RULES NAME THE PAGE ([data-page]), SO THE RESET MUST OUTRANK THEM, OR THE DESKTOP PADDING-LEFT SURVIVES ON A PHONE THAT SPREADS THE OTHER WAY */
if (phone && (g || sheetPinGeo(k, false))) out.push(sel + " .bd-ly-pane[data-page] {\ntranslate: none;\nz-index: auto;\npadding: 0;\nclip-path: none;\ntransform: none;\n}");
if (!g) return;
var ax = g.x ? "x" : "y";
var pg = function (i) { return ' .bd-ly-pane[data-page="' + g.P[i] + '"]'; };
var dd = "clamp(-1, calc(var(--i) - " + g.pi + "), 1)";
var f = g.pi === 0 ? "clamp(0, calc(var(--i) - 0), 1)" : "calc(" + dd + " * " + dd + ")";
var ff = "max(" + f + ", var(--k-hold, 0))";
var tf = "translate3d(calc(var(--k-sx, 0px) * -1 * " + ff + "), calc(var(--k-sy, 0px) * -1 * " + ff + "), 0)";
/* THE SHEET SCROLLS AS ONE: THE OTHER PAGE SCROLLS AND THE PINNED PAGE MOVES WITH IT (RUNTIME --k-sx / --k-sy); ONLY THE SLIDE KEEPS THE PINNED PAGE IN THE WINDOW */
if (g.pi === 0) {
out.push(sel + pg(0) + " {\ntranslate: " + (g.x ? "calc(" + f + " * " + g.len + ") 0" : "0 calc(" + f + " * " + g.len + ")") + ";\ntransform: " + tf + ";\ntransition: translate " + KD + " var(--ly-ease);\n}");
out.push(sel + pg(1) + " {\nbox-sizing: border-box;\npadding-" + (g.x ? "left" : "top") + ": " + g.len + ";\n}");
out.push(sel + pg(1) + "[data-own] {\nclip-path: inset(" + (g.x ? "0 0 0 " + g.len : g.len + " 0 0 0") + ");\n}");
} else {
var sh = "calc(var(--i) * -100% / var(--n) + clamp(-1, calc(var(--i) - " + g.pi + "), 1) * " + g.len + ")";
out.push(sel + " .bd-ly-track.is-ax" + (phone ? "m" : "") + "-" + ax + " {\ntransform: translate3d(" + (g.x ? sh + ", 0, 0" : "0, " + sh + ", 0") + ");\n}");
for (var pj = 0; pj < g.pi; pj++) out.push(sel + pg(pj) + " {\nbox-sizing: border-box;\npadding-" + (g.x ? "left" : "top") + ": " + g.len + ";\n}");
out.push(sel + pg(g.pi) + " {\ntransform: " + tf + ";\n}");
}
out.push(sel + pg(g.pi) + " {\noverflow: visible;\n}");
out.push(sel + ",\n" + sel + " .bd-ly-pane {\npointer-events: none;\n}\n" + sel + " .bd-ly-paper {\npointer-events: auto;\n}");
});
return out.join("\n");
}
var SHEET_EDGES = [["left", "Left"], ["right", "Right"], ["top", "Top"], ["bottom", "Bottom"]];
/* A SHEET'S SPREAD DIRECTION AND ★ PAGE: THE PHONE HAS ITS OWN (axisM, mainM); BLANK = SAME AS DESKTOP */
function sheetAx(k, phone) {
return phone && (k.axisM === "x" || k.axisM === "y") ? k.axisM : k.axis === "x" ? "x" : "y";
}
function sheetMain(k, phone) {
return phone && k.mainM && (k.pages || []).indexOf(k.mainM) > -1 ? k.mainM : k.main;
}
function sheetList() {
var s = S.project.site;
return (s.sheets || []).filter(function (k) { return k && k.id; });
}
function sheetPage(id) {
var q = id && S.project.pages[id];
return q && q.kind !== "pin" ? q : null;
}
/* WHERE A PAGE LIVES: ON A SHEET (k = SHEET INDEX, i = ITS PLACE ON THE SHEET), AS A SHEET'S EDGE STRIP, OR UNDERNEATH (k = -1) */
function sheetOf(id) {
var K = sheetList();
for (var n = 0; n < K.length; n++) {
if ((K[n].pages || []).indexOf(id) < 0) continue;
var st = sheetStrip(K[n]);
if (st && st.id === id) return { id: id, k: n, i: -1, strip: true, sheet: K[n] };
return { id: id, k: n, i: sheetPanes(K[n]).map(function (q) { return q.id; }).indexOf(id), sheet: K[n] };
}
return { id: id, k: -1, i: 0 };
}
function sheetUsed() {
var ids = [];
sheetList().forEach(function (k) {
(k.pages || []).forEach(function (id) { ids.push(id); });
});
return ids;
}
function sheetContent() {
var used = sheetUsed();
return S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (q) { return q && q.kind !== "pin" && used.indexOf(q.id) < 0; });
}
/* THE PAGE "/" OPENS ON: THE FIRST PAGE OF THE FIRST SHEET THAT LIES OPEN */
function sheetHome() {
return sheetHomeSheet() || (sheetContent()[0] || {}).id || "";
}
function sheetHomeSheet() {
var K = sheetList();
for (var n = 0; n < K.length; n++) {
if (K[n].rest !== "open" && K[n].rest !== "still") continue;
if (sheetPin(K[n])) continue;
var q = sheetPanes(K[n])[0];
if (q) return q.id;
}
return "";
}
/* WHAT LIES UNDERNEATH BEFORE ANYTHING IS OPENED: THE FEATURED POST OF A BLOG ON A SHEET */
function sheetFeatured() {
var blog = null;
sheetList().forEach(function (k) {
sheetPanes(k).forEach(function (q) {
if (!blog && q.blog) blog = q;
});
});
var posts = blog ? postsOf(blog.id) : [];
var f = posts.filter(function (q) { return q.featured; })[0] || posts[0] || sheetContent()[0];
return f ? f.id : "";
}
function sheetModel() {
return sheetList().map(function (k) {
var pids = sheetPanes(k).map(function (q) { return q.id; });
var pe = postEdges(k);
return { rest: k.rest || "open", covers: k.covers === "some" ? (k.coverPages || []).slice() : null, panes: pids, main: Math.max(0, pids.indexOf(k.main)), pin: pids.indexOf(sheetPin(k)), pe: pe ? pe.d : "", blogs: pe ? sheetBlogs(k) : [] };
});
}
function sheetFocus(page) {
var w = page ? sheetOf(page.id) : null;
if (!w || w.strip) {
var h = sheetHome();
return h ? sheetOf(h) : { id: "", k: -1, i: 0 };
}
return { id: w.id, k: w.k, i: Math.max(0, w.i), par: (page && page.parent) || "" };
}
/* THE PLAN (EXPORTED AS-IS, SHARED BY PUBLISH AND THE RUNTIME): WHERE EVERY SHEET GOES WHEN A PAGE OPENS
- the page's own sheet opens on it; sheets above it go back to rest (an open-at-rest sheet tucks to its sliver)
- sheets below it keep what they were doing
- a page underneath: every open-at-rest sheet tucks, peeking sheets keep peeking
- a sheet that doesn't cover the page hides */
function bdSheetPlan(K, f, prev) {
return K.map(function (k, n) {
var p = prev && prev[n];
var pane = p ? p.i : k.main || 0;
var cov = !k.covers || k.covers.indexOf(f.id) > -1 || k.panes.indexOf(f.id) > -1;
if (f.k === n) return { st: "open", i: f.i };
if (k.pin > -1) return { st: "open", i: k.main };
/* THE BLOG ANIMATION TOOL: A POST OF THIS SHEET'S BLOG OPENS UNDERNEATH, SO THE SHEET LEAVES TO THE CHOSEN SIDE */
if (k.pe && f.k < 0 && f.par && (k.blogs || []).indexOf(f.par) > -1) return { st: "hidden", i: pane };
/* A STILL SHEET BELOW THE PAGE THAT OPENS STAYS WHERE IT IS: THAT PAGE ALREADY LIES OVER IT */
if (k.rest === "still") return { st: cov || (f.k > -1 && n > f.k) ? "open" : "hidden", i: pane };
if (f.k > -1 && n > f.k && p) return { st: p.st, i: p.i };
if (!cov) return { st: "hidden", i: pane };
if (k.rest === "open") return { st: f.k < 0 || n < f.k ? "tuck" : "open", i: pane };
return { st: k.rest === "hidden" ? "hidden" : "peek", i: pane };
});
}
/* COMPATIBILITY: WHICH SHEET PAGES ACT AS JOURNAL / LIBRARY / ABOUT */
function layerRoles() {
var panes = [];
var about = null;
sheetList().forEach(function (k) {
sheetPanes(k).forEach(function (q) {
panes.push(q);
if (!about && k.rest !== "open" && k.rest !== "still") about = q;
});
});
var journal = panes.filter(function (q) { return q.blog; })[0] || null;
var library = panes.filter(function (q) { return (q.els || []).some(function (e) { return e.type === "library"; }); })[0] || null;
return { journal: journal, library: library, about: about };
}
function layerBody(page, ctx) {
var keep = S.renderPage;
S.renderPage = page;
var out = '<div class="bd-panel bd-pg-' + page.id + '">\n<main class="bd-main">\n' + headHTML(page) + contentHTML(page, ctx) + "\n</main>\n</div>";
S.renderPage = keep;
return out;
}
/* IS THIS MENU LINK THE CURRENT ONE? THE OPEN PAGE, OR A POST'S BLOG WHEN THE POST ITSELF ISN'T IN THE MENU */
function sheetCurrent(id, focus, linked, ids) {
if (!focus || !id) return false;
if (id === focus) return true;
if (linked) return false;
var f = S.project.pages[focus];
if (f && f.parent && (ids || []).indexOf(f.parent) > -1) return f.parent === id;
return sheetOf(focus).k < 0 && id === (S.layerBack || sheetHome());
}
/* THE INDEX LINK: A STYLED LINK (TEXT OR SYMBOL) THAT ALWAYS OPENS THE MENU PAGE, WITH THE BREADCRUMBS OF THE PAGE WE ARE IN BESIDE IT. THE RUNTIME KEEPS THE CRUMBS IN STEP WITH THE OPEN PAGE */
function menuPageOf() {
return S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (q) { return q && q.kind !== "pin" && (q.els || []).some(function (e) { return e.type === "sheetmenu"; }); })[0] || null;
}
function crumbsOf(q) {
var b = q && q.parent ? S.project.pages[q.parent] : q;
return b && b.blog ? [{ t: b.title, s: b.slug }] : [];
}
function indexLinkHTML(e, base) {
var p = e.props;
var mp = menuPageOf();
var map = {};
S.project.order.forEach(function (id) { var q = S.project.pages[id]; if (q && q.kind !== "pin") map[q.id] = crumbsOf(q); });
var focus = S.layerFocus || (S.renderPage ? S.renderPage.id : "");
var sep = p.sep == null ? " / " : p.sep;
var now = map[focus] ? map[focus].map(function (c) { return '<a class="bd-ix-c" href="/' + esc(c.s) + '">' + esc(c.t) + "</a>"; }).join(esc(sep)) : "";
var dim = (parseFloat(p.dim) || 0) / 100;
var vars = "--ix-gap: " + (parseFloat(p.gap) || 0) + "px; --ix-dim: " + dim + ";";
return '<div class="' + base + " bd-ix bd-ts-" + esc(E(e, "style") || "body") + (p.line === false ? " is-plain" : "") + '" style="' + vars + '">\n<a class="bd-ix-a" href="/' + esc(mp ? mp.slug : "menu") + '"' + (mp ? ' data-id="' + mp.id + '"' : "") + ">" + esc(p.label || "") + "</a>"
+ (p.crumbs === false ? "" : '\n<span class="bd-ix-crumb" data-sep="' + esc(sep) + '" data-crumbs="' + esc(JSON.stringify(map)) + '" aria-live="polite">' + now + "</span>") + "\n</div>";
}
/* THE SHEET MENU BLOCK — THE SITE MENU WRITTEN ON A SHEET'S EDGE, WITH A MARK */
function sheetMenuHTML(e, base) {
var s = S.project.site;
var p = e.props;
var mid = p.menu || s.nav.menu;
var focus = S.layerFocus || (S.renderPage ? S.renderPage.id : "");
var items = [];
var ids = [];
menuGroups(mid).forEach(function (g) {
g.items.forEach(function (it) {
var q = it.url ? null : S.project.pages[it.page] || S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (x) { return x && x.slug === it.slug && x.kind !== "pin"; })[0];
if (q) ids.push(q.id);
items.push({ it: it, q: q });
});
});
var linked = ids.indexOf(focus) > -1;
var lis = items.map(function (o) {
if (o.it.url) return '<li><a class="bd-ly-a" href="' + esc(o.it.url) + '"' + (o.it.ext ? ' target="_blank" rel="noopener"' : "") + '><span class="bd-ly-mk" aria-hidden="true">' + esc(p.marker || "") + "</span>" + esc(o.it.title) + "</a></li>";
var cur = o.q && sheetCurrent(o.q.id, focus, linked, ids);
return '<li><a class="bd-ly-a' + (cur ? " is-current" : "") + '" href="/' + esc(o.q ? o.q.slug : o.it.slug) + '"' + (o.q ? ' data-id="' + o.q.id + '"' : "") + '><span class="bd-ly-mk" aria-hidden="true">' + esc(p.marker || "") + "</span>" + esc(o.it.title) + "</a></li>";
}).join("\n");
var st = "bd-ts-" + esc(p.style || "heading");
var vars = "--sm-pad: " + (parseFloat(p.pad) || 0) + "px; --sm-padm: " + (parseFloat(p.padM) || 0) + "px; --sm-gap: " + (parseFloat(p.gap) || 0) + "px; --sm-gapm: " + (parseFloat(p.gapM) || 0) + "px;";
return '<nav class="' + base + ' bd-sheetmenu is-al-' + (p.align === "left" ? "left" : "right") + '" style="' + vars + '" aria-label="Menu">\n<ul class="bd-ly-list ' + st + '">\n' + lis + '\n</ul>\n<div class="bd-ly-mark ' + st + '">' + esc(p.mark || s.name) + "</div>\n</nav>";
}
function layerDoc(page, ctx) {
var s = S.project.site;
var Ls = s.layers;
var K = sheetList();
var f = sheetFocus(page);
var plan = bdSheetPlan(sheetModel(), f, null);
var shown = f.k < 0 ? f.id : sheetFeatured();
var keep = S.layerFocus;
var keepB = S.layerBack;
S.layerFocus = f.id;
S.layerBack = "";
plan.forEach(function (pl, n) { if (!S.layerBack && pl.st === "tuck") S.layerBack = (sheetModel()[n].panes || [])[pl.i] || ""; });
var arts = sheetContent().map(function (q) {
return '<article class="bd-ly-art' + (q.id === shown ? " is-shown" : "") + '" data-id="' + q.id + '" data-slug="' + esc(q.slug) + '" data-title="' + esc(q.title) + '"' + (q.parent ? ' data-parent="' + q.parent + '"' : "") + (q.trans ? ' data-trans="' + esc(layerTrans(q)) + '"' : "") + (parseInt(q.transDur, 10) > 0 ? ' data-dur="' + parseInt(q.transDur, 10) + '"' : "") + ">\n" + layerBody(q, ctx) + "\n</article>";
}).join("\n");
var sheets = K.map(function (k, n) {
var pl = plan[n];
var panes = sheetPanes(k);
var strip = sheetStrip(k);
var onPage = pl.st === "peek" && strip ? strip : panes[pl.i] || strip;
var pe = postEdges(k);
var fq = S.project.pages[f.id];
var usePe = !!(pe && pl.st !== "open" && fq && fq.parent && sheetBlogs(k).indexOf(fq.parent) > -1);
return '<section class="bd-ly-sheet bd-ly-k' + (strip ? "" : " is-paper") + ' is-e-' + esc(usePe ? pe.d : k.edge || "left") + " is-em-" + esc(usePe ? pe.m : k.edgeM || "top") + " is-r-" + esc(k.rest || "open") + " is-st-" + pl.st + (onPage ? " is-on-" + onPage.id : "") + (k.lv ? " is-lv-" + esc(k.lv) : "") + (k.hover === "lift" ? " is-hv-lift" : "") + (k.arrive === "fade" || k.arrive === "cut" ? " is-ap-" + k.arrive : "") + '" data-k="' + esc(k.id) + '" data-rest="' + esc(k.rest || "open") + '" data-edge="' + esc(k.edge || "left") + '" data-edge-m="' + esc(k.edgeM || "top") + '"' + (pe ? ' data-blogs="' + esc(sheetBlogs(k).join(" ")) + '" data-pe="' + pe.d + '" data-pe-m="' + pe.m + '"' : "") + ' data-main="' + Math.max(0, panes.map(function (q) { return q.id; }).indexOf(k.main)) + '" data-main-m="' + Math.max(0, panes.map(function (q) { return q.id; }).indexOf(sheetMain(k, true))) + '" data-pin="' + panes.map(function (q) { return q.id; }).indexOf(sheetPin(k)) + '" data-pin-m="' + panes.map(function (q) { return q.id; }).indexOf(sheetPin(k, true)) + '"' + (sheetRev(k) ? ' data-rev-m="1"' : "") + ' data-covers="' + (k.covers === "some" ? esc((k.coverPages || []).join(",")) : "all") + '" aria-label="' + esc(k.name || "Sheet") + '">\n'
+ (!strip && sheetBlur(k) > 0 ? '<div class="bd-ly-blur" aria-hidden="true"></div>\n' : "") + '<div class="bd-ly-body">\n<div class="bd-ly-track is-ax-' + sheetAx(k) + " is-axm-" + sheetAx(k, true) + '" style="--n: ' + Math.max(1, panes.length) + "; --i: " + pl.i + ';">\n'
+ panes.map(function (q, j) {
return '<div class="bd-ly-pane' + (j === pl.i ? " is-on" : "") + '"' + "" + ' data-page="' + q.id + '" data-slug="' + esc(q.slug) + '" data-title="' + esc(q.title) + '">\n<div class="bd-ly-paper">\n' + layerBody(q, ctx) + "\n</div>\n</div>";
}).join("\n") + "\n</div>\n</div>\n"
+ (strip ? '<div class="bd-ly-strip">\n' + layerBody(strip, ctx) + "\n</div>\n" : "") + "</section>";
}).join("\n");
S.layerFocus = keep;
S.layerBack = keepB;
var tr = layerTrans(f.k < 0 ? S.project.pages[f.id] : null);
return '<div class="bd-ly is-t-' + tr + (f.k < 0 ? " is-v-post" : "") + '" id="bd-ly" data-trans="' + esc(layerTrans(null)) + '" data-dur="' + Ls.dur + '" data-focus="' + esc(f.id) + '" data-home="' + esc(sheetHome()) + '">\n'
+ '<div class="bd-ly-sheet bd-ly-content" id="bd-ly-content" tabindex="-1">\n' + arts + "\n</div>\n" + sheets + '\n<div class="bd-ly-bar is-off" id="bd-ly-bar" aria-hidden="true"><i></i></div>\n' + glassHTML() + "\n</div>";
}
/* HOW FAR THE PEEKING SHEETS ABOVE PUSH A SHEET (OR THE PAGES UNDERNEATH) IN FROM EACH EDGE */
var NO_INS = { left: 0, right: 0, top: 0, bottom: 0 };
/* A SHEET THAT PARKS ON AN EDGE STAYS BESIDE THE PEEKS ABOVE IT; EVERY OTHER SHEET STARTS AT THE WINDOW'S EDGE AND LIES UNDER THEM, ONLY ITS CONTENT IS PUSHED IN */
function sheetBoxIns(k, n, phone) {
return k.rest === "peek" ? sheetInsets(n, phone) : NO_INS;
}
/* A SHEET'S OWN MARGIN (OUTSIDE ITS EDGES, PX OR %) AND PADDING (INSIDE, PX) */
/* A SHEET WITHOUT A STRIP IS ONE PIECE OF PAPER: ITS MARGINS BELONG TO THE PAPER (THE FIRST PAGE'S START, THE LAST PAGE'S END, THE SIDES OF EVERY PAGE) AND SCROLL WITH IT, NOT TO A FIXED FRAME */
function sheetPaperSides(k, q, phone) {
var P = sheetPanes(k, phone).map(function (x) { return x.id; });
var i = Math.max(0, P.indexOf(q && q.id));
var N = Math.max(1, P.length);
return sheetAx(k, phone) === "x" ? { t: true, b: true, l: i === 0, r: i === N - 1 } : { l: true, r: true, t: i === 0, b: i === N - 1 };
}
function sheetPaperMargins(k, q, phone) {
/* THE PAPER'S MARGINS ARE THE SHEET'S, FOR EVERY PAGE ON IT */
var sd = sheetPaperSides(k, q, phone);
var b = k.box || {};
var o = {};
["t", "r", "b", "l"].forEach(function (x) { o[x] = (sd[x] && boxLen(boxVal(b, "m" + x, phone), x)) || "0px"; });
return o;
}
function sheetEx(k, n, phone, q) {
var ins = sheetBoxIns(k, n, phone);
var b = k.box || {};
var ex = {};
var paper = !sheetStrip(k);
var sides = paper && q ? sheetPaperSides(k, q, phone) : {};
BOX_SIDES.forEach(function (sd) {
var M = paper && !sides[sd[0]] ? null : boxLen(boxVal(b, "m" + sd[0], phone), sd[0]);
ex[sd[1]] = M != null ? "calc(" + ins[sd[1]] + "px + " + M + ")" : ins[sd[1]] + "px";
});
return ex;
}
function sheetPadIns(k, n, phone) {
var base = k.rest === "peek" ? NO_INS : sheetInsets(n, phone);
var b = k.box || {};
var o = {};
BOX_SIDES.forEach(function (sd) {
o[sd[1]] = (base[sd[1]] || 0) + (parseFloat(boxVal(b, "p" + sd[0], phone)) || 0);
});
return o;
}
function sheetInsets(upto, phone) {
var o = { left: 0, right: 0, top: 0, bottom: 0 };
sheetList().forEach(function (k, n) {
if (n >= upto) return;
if (k.rest !== "peek") {
var pp = sheetPinPx(k, phone);
if (pp) o[pp.edge] += pp.px;
return;
}
var e = (phone ? k.edgeM : k.edge) || "left";
o[e] += parseFloat(phone ? k.peekM : k.peek) || 0;
});
return o;
}
/* EVERY STATE OF A SHEET, PER EDGE AND PER WAY OF GETTING OUT OF THE WAY; EACH RULE SETS EVERY VALUE SO PHONE RULES REPLACE DESKTOP ONES */
function sheetStateCSS(pfx, edges) {
var TR = LAYER_TRANS.map(function (t) { return t[0]; });
var out = [];
edges.forEach(function (e) {
var horiz = e === "left" || e === "right";
var low = e === "left" || e === "top";
var ax = horiz ? "kx" : "ky";
var o = { left: "0 50%", right: "100% 50%", top: "50% 0", bottom: "50% 100%" }[e];
var V = function (x) {
var d = Object.assign({ kx: "0px", ky: "0px", kfx: "0deg", kfy: "0deg", ksx: "1", ksy: "1" }, x);
return "--kx: " + d.kx + ";\n--ky: " + d.ky + ";\n--kfx: " + d.kfx + ";\n--kfy: " + d.kfy + ";\n--ksx: " + d.ksx + ";\n--ksy: " + d.ksy + ";\ntransform-origin: " + o + ";";
};
var away = function (amt) { return low ? "calc(" + amt + " - 100%)" : "calc(100% - " + amt + ")"; };
var sel = ".bd-ly .bd-ly-k." + pfx + e;
var x = {};
out.push(sel + ".is-st-open {\n" + V(x) + "\n}");
x = {};
x[ax] = away("var(--k-peek)");
out.push(sel + ".is-st-peek {\n" + V(x) + "\n}");
if (!pfx.match(/em/)) {
x = {};
x[ax] = away("(var(--k-peek) + var(--k-nudge))");
out.push("@media (hover: hover) and (min-width: 761px) {\n" + sel + ".is-st-peek:hover:not(:has(a:hover)) {\n" + V(x) + "\n}\n}");
}
x = {};
x[ax] = low ? "calc(-100% - 24px)" : "calc(100% + 24px)";
out.push(sel + ".is-st-hidden {\n" + V(x) + "\n}");
TR.forEach(function (t) {
var d = {};
var sl = "var(--k-sliver)";
if (t === "drop") d.ky = "calc(100% - " + sl + ")";
else if (t === "rise") d.ky = "calc(" + sl + " - 100%)";
else if (t === "push") d.kx = horiz && !low ? "calc(" + sl + " - 100%)" : "calc(100% - " + sl + ")";
else d[ax] = away(sl);
out.push(".bd-ly.is-t-" + t + " .bd-ly-k." + pfx + e + ".is-st-tuck {\n" + V(d) + "\n}");
out.push("#bd-ly .bd-ly-k.is-lv-" + t + "." + pfx + e + ".is-st-tuck {\n" + V(d) + "\n}");
});
var body = { left: "top: 0;\nright: var(--k-strip);\nbottom: 0;\nleft: 0;", right: "top: 0;\nright: 0;\nbottom: 0;\nleft: var(--k-strip);", top: "top: 0;\nright: 0;\nbottom: var(--k-strip);\nleft: 0;", bottom: "top: var(--k-strip);\nright: 0;\nbottom: 0;\nleft: 0;" }[e];
var strip = { left: "top: 0;\nright: 0;\nbottom: 0;\nleft: auto;\nwidth: var(--k-strip);\nheight: auto;", right: "top: 0;\nright: auto;\nbottom: 0;\nleft: 0;\nwidth: var(--k-strip);\nheight: auto;", top: "top: auto;\nright: 0;\nbottom: 0;\nleft: 0;\nwidth: auto;\nheight: var(--k-strip);", bottom: "top: 0;\nright: 0;\nbottom: auto;\nleft: 0;\nwidth: auto;\nheight: var(--k-strip);" }[e];
out.push(".bd-ly-k." + pfx + e + " > .bd-ly-body {\n" + body + "\n}");
out.push(".bd-ly-k." + pfx + e + " > .bd-ly-strip {\n" + strip + "\n}");
});
return out.join("\n");
}
/* A SHEET BLURS ONLY WHAT LIES UNDER IT: ITS OWN BLUR, PLUS THE "COMES INTO FOCUS" BLUR (TWO BLURS ADD AS THE ROOT OF THEIR SQUARES) */
function sheetBlur(k) {
var Ls = S.project.site.layers;
var b = parseFloat(k.blur) || 0;
var f = Ls.reveal === "focus" ? parseFloat(Ls.focusBlur) || 0 : 0;
return Math.round(Math.sqrt(b * b + f * f) * 10) / 10;
}
/* A SHEET IS ONE PIECE: ONLY ITS OUTER CORNERS ROUND, NEVER THE JOIN BETWEEN ITS PAGES */
/* EDGES — THE SHAPE OF A SHEET'S (OR A CARD'S) OUTER EDGES ON THE SIDES YOU CHOOSE. SHAPES ARE CUT WITH A MASK, SO THEY WORK ON SEE-THROUGH AND BLURRED PAPER; ON A TWO-PAGE SHEET ONLY THE SHEET'S OUTER EDGES ARE CUT, NEVER THE JOIN */
var RIM_SHAPES = [["", "Plain"], ["line", "Line"], ["torn", "Torn"], ["stamp", "Stamp"], ["notch", "Ticket"], ["punch", "Punched"], ["tab", "Tab"]];
var RIM_SIZE = { line: 1, torn: 10, stamp: 5, notch: 16, punch: 6, tab: 28 };
var RIM_GAP = { stamp: 6, punch: 64, tab: 120 };
var RIM_SVG = {
"": '<svg viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="24" fill="#fff" stroke="#111"/></svg>',
line: '<svg viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="24" fill="#fff"/><path d="M8 8H32" stroke="#111" stroke-width="2.5"/></svg>',
torn: '<svg viewBox="0 0 40 40"><path d="M8 32V12L11 9L14 12L17 8L20 11L23 8L26 12L29 9L32 11V32Z" fill="#fff" stroke="#111"/></svg>',
stamp: '<svg viewBox="0 0 40 40"><path d="M8 8H11A2 2 0 0 0 15 8H18A2 2 0 0 0 22 8H25A2 2 0 0 0 29 8H32V32H8Z" fill="#fff" stroke="#111"/></svg>',
notch: '<svg viewBox="0 0 40 40"><path d="M8 8H16A4 4 0 0 0 24 8H32V32H8Z" fill="#fff" stroke="#111"/></svg>',
punch: '<svg viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="24" fill="#fff" stroke="#111"/><circle cx="13" cy="14" r="2" fill="#111"/><circle cx="13" cy="20" r="2" fill="#111"/><circle cx="13" cy="26" r="2" fill="#111"/></svg>',
tab: '<svg viewBox="0 0 40 40"><path d="M8 13H17V8H27V13H32V32H8Z" fill="#fff" stroke="#111"/></svg>'
};
function rimNum(v, d) {
var n = parseFloat(v);
return v === "" || v == null || isNaN(n) || n < 0 ? d : n;
}
function rimOf(o) {
var r = (o && o.rim) || {};
var shape = r.shape || "";
return { shape: shape, sides: r.sides == null ? "trbl" : String(r.sides), size: rimNum(r.size, RIM_SIZE[shape] || 0) || RIM_SIZE[shape] || 0, gap: rimNum(r.gap, RIM_GAP[shape] || 0), color: r.color || "", at: rimNum(r.at, 10), label: r.label || "" };
}
/* WHICH OF THE CHOSEN SIDES ARE OUTER EDGES OF THE SHEET FOR PAGE j OF N */
function rimOuter(sides, ax, j, N) {
return sides.split("").filter(function (s) {
if (N < 2) return true;
if (ax === "x") return !((s === "l" && j > 0) || (s === "r" && j < N - 1));
return !((s === "t" && j > 0) || (s === "b" && j < N - 1));
}).join("");
}
var RIM_TEAR = [0.35, 0.8, 0.2, 0.65, 0.1, 0.9, 0.4, 0.15, 0.7, 0.3, 0.85, 0.5, 0.35];
function rimTornSVG(side, D) {
var pts = RIM_TEAR.map(function (f, i) { return [i * 5, Math.round(D * (0.1 + 0.85 * f) * 10) / 10]; });
var P;
if (side === "t") P = pts.map(function (p) { return p[0] + "," + p[1]; }).concat(["60," + D, "0," + D]);
else if (side === "b") P = pts.map(function (p) { return p[0] + "," + (D - p[1]); }).concat(["60,0", "0,0"]);
else if (side === "l") P = pts.map(function (p) { return p[1] + "," + p[0]; }).concat([D + ",60", D + ",0"]);
else P = pts.map(function (p) { return (D - p[1]) + "," + p[0]; }).concat(["0,60", "0,0"]);
var w = side === "t" || side === "b" ? 60 : D;
var h = side === "t" || side === "b" ? D : 60;
return "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "' viewBox='0 0 " + w + " " + h + "' preserveAspectRatio='none'><polygon points='" + P.join(" ") + "'/></svg>\")";
}
/* THE MASK LAYERS: THE MIDDLE OF THE PAPER STAYS WHOLE, EACH CUT SIDE GETS A STRIP WITH ITS PATTERN */
function rimMask(rim, on) {
var sh = rim.shape;
if (!on || ["torn", "stamp", "notch", "punch"].indexOf(sh) < 0) return "";
var r = rim.size;
var D = sh === "punch" ? Math.round(r * 3) * 2 : r;
var off = D / 2;
var d = { t: on.indexOf("t") > -1 ? D : 0, r: on.indexOf("r") > -1 ? D : 0, b: on.indexOf("b") > -1 ? D : 0, l: on.indexOf("l") > -1 ? D : 0 };
var L = ["linear-gradient(#000 0 0) " + d.l + "px " + d.t + "px / calc(100% - " + (d.l + d.r) + "px) calc(100% - " + (d.t + d.b) + "px) no-repeat"];
var hole = function (at) { return "radial-gradient(circle at " + at + ", #0000 " + r + "px, #000 " + (r + 0.5) + "px)"; };
var pos = { t: "0 0", b: "0 100%", l: "0 0", r: "100% 0" };
on.split("").forEach(function (s) {
var along = s === "t" || s === "b";
if (sh === "torn") L.push(rimTornSVG(s, D) + " " + pos[s] + " / " + (along ? "60px " + D + "px repeat-x" : D + "px 60px repeat-y"));
else if (sh === "stamp") {
var t = r * 2 + rim.gap;
var at = { t: "50% 0", b: "50% 100%", l: "0 50%", r: "100% 50%" }[s];
L.push(hole(at) + " " + pos[s] + " / " + (along ? t + "px " + D + "px round no-repeat" : D + "px " + t + "px no-repeat round"));
} else if (sh === "notch") {
var at2 = { t: "50% 0", b: "50% 100%", l: "0 50%", r: "100% 50%" }[s];
L.push(hole(at2) + " " + pos[s] + " / " + (along ? "100% " + D + "px" : D + "px 100%") + " no-repeat");
} else {
var g = Math.max(r * 3, rim.gap || 64);
var at3 = { t: "50% " + off + "px", b: "50% " + off + "px", l: off + "px 50%", r: off + "px 50%" }[s];
L.push(hole(at3) + " " + pos[s] + " / " + (along ? g + "px " + D + "px round no-repeat" : D + "px " + g + "px no-repeat round"));
}
});
return "-webkit-mask: " + L.join(", ") + ";\nmask: " + L.join(", ") + ";\n";
}
/* A LINE EDGE AND A TAB: DRAWN BY THE PAPER'S OWN ::before / ::after (THE PAPER IS position: relative) */
function rimLineCSS(rim, on, sel) {
if (rim.shape !== "line" || !on) return "";
var w = function (s) { return on.indexOf(s) > -1 ? rim.size + "px" : "0"; };
return sel + "::before {\ncontent: \"\";\nposition: absolute;\ninset: 0;\nz-index: 2;\npointer-events: none;\nborder-style: solid;\nborder-color: " + (rim.color || "currentColor") + ";\nborder-width: " + [w("t"), w("r"), w("b"), w("l")].join(" ") + ";\nborder-radius: inherit;\n}";
}
function rimTabCSS(rim, on, sel, fill) {
if (rim.shape !== "tab" || !on) return "";
var s = on.charAt(0);
var h = rim.size;
var w = rim.gap || 120;
var at = Math.max(0, Math.min(100, rim.at));
var d = ["content: " + JSON.stringify(rim.label) + ";", "position: absolute;", "z-index: 1;", "pointer-events: none;", "box-sizing: border-box;", "display: flex;", "align-items: center;", "justify-content: center;", "background: " + fill + ";", "font: 11px/1 var(--bd-mono);", "letter-spacing: 0.04em;", "color: " + (rim.color || "currentColor") + ";", "white-space: nowrap;"];
if (s === "t" || s === "b") d.push((s === "t" ? "bottom" : "top") + ": 100%;", "left: calc(" + at + "% - " + (w * at / 100) + "px);", "width: " + w + "px;", "height: " + h + "px;", "border-radius: " + (s === "t" ? "6px 6px 0 0" : "0 0 6px 6px") + ";");
else d.push((s === "l" ? "right" : "left") + ": 100%;", "top: calc(" + at + "% - " + (w * at / 100) + "px);", "width: " + h + "px;", "height: " + w + "px;", "writing-mode: vertical-rl;", "border-radius: " + (s === "l" ? "6px 0 0 6px" : "0 6px 6px 0") + ";");
return sel + "::after {\n" + d.join("\n") + "\n}";
}
/* THE SOLID COLOUR A TAB IS PAINTED IN (A GRADIENT GIVES ITS FIRST STOP) */
function rimTabFill(color, pct) {
var g = parseFill(color || "");
var c = g ? (g.a !== "transparent" ? g.a : g.b) : color;
if (!c || c === "none" || c === "transparent") return "transparent";
return fillCSS(c, pct);
}
/* SHADOWS: NONE | SOFT | HARD | LINE, WITH SIZE AND STRENGTH (BLANK = THE USUAL LOOK) */
function shadowCSS(o, card) {
var sh = o.shadow || "none";
if (sh === "none") return "none";
var S = rimNum(o.shadowSize, -1);
var A = rimNum(o.shadowA, -1);
if (sh === "soft") return card ? "0 " + Math.round((S < 0 ? 50 : S) * 0.36) + "px " + (S < 0 ? 50 : S) + "px rgba(0, 0, 0, " + (A < 0 ? 12 : A) / 100 + ")" : "0 0 " + (S < 0 ? 28 : S) + "px rgba(0, 0, 0, " + (A < 0 ? 16 : A) / 100 + ")";
if (sh === "hard") { var h = S < 0 ? 8 : S; return h + "px " + h + "px 0 rgba(0, 0, 0, " + (A < 0 ? (card ? 8 : 10) : A) / 100 + ")"; }
return "0 0 0 " + (S < 0 ? 1 : S) + "px rgba(0, 0, 0, " + (A < 0 ? 12 : A) / 100 + ")";
}
/* THE SAME SHADOW AS A FILTER, SO IT FOLLOWS A CUT EDGE */
function shadowDrop(o, card) {
var b = shadowCSS(o, card);
if (b === "none") return "";
var m = b.match(/^(-?[\d.]+(?:px)?) (-?[\d.]+(?:px)?) ([\d.]+(?:px)?)(?: ([\d.]+px))? (rgba\([^)]*\))$/);
if (!m) return "";
if (m[4]) return "drop-shadow(0 0 " + Math.max(0.5, parseFloat(m[4]) * 0.6) + "px " + m[5] + ")";
return "drop-shadow(" + m[1] + " " + m[2] + " " + m[3] + " " + m[5] + ")";
}
/* ONE SHEET PAPER: ITS CUT, LINE OR TAB ON THE OUTER SIDES; THE SHADOW MOVES TO THE PANE (A FILTER) WHEN THE EDGE IS CUT */
function rimPaperCSS(k, q, qi, qn, phone, sel) {
var rim = rimOf(k);
if (!rim.shape) return "";
var on = rimOuter(rim.sides, sheetAx(k, phone), qi, qn);
var out = [];
var pane = '.bd-ly-pane[data-page="' + q.id + '"]';
var m = rimMask(rim, on);
out.push(sel + " {\nposition: relative;\n" + (m || "-webkit-mask: none;\nmask: none;\n") + (m ? "box-shadow: none;\n" : "") + "}");
var drop = m ? shadowDrop(k) : "";
if (drop) {
var ax = sheetAx(k, phone);
var cut = qn < 2 ? "" : ax === "x" ? (qi === 0 ? "inset(-80px 0 -80px -80px)" : "inset(-80px -80px -80px 0)") : (qi === 0 ? "inset(-80px -80px 0 -80px)" : "inset(0 -80px -80px -80px)");
out.push(pane + " {\nfilter: " + drop + ";\n" + (cut ? "clip-path: " + cut + ";\n" : "") + "}");
} else if (phone) out.push(pane + " {\nfilter: none;\n}");
var ln = rimLineCSS(rim, on, sel);
if (ln) out.push(ln);
var tb = rimTabCSS(rim, on, sel, rimTabFill(k.color || "#E4E1DA", sheetSolid(k)));
if (tb) out.push(tb);
if (phone && !on) out.push(sel + "::before,\n" + sel + "::after {\ndisplay: none;\n}");
return out.join("\n");
}
/* A CARD (A CARD PAGE ON A SHEET, OR A PAGE UNDERNEATH) WITH ITS OWN EDGE; UNDERNEATH, THE SHADOW OF A CUT EDGE LIES ON THE ARTICLE AROUND IT */
function rimCardCSS(q, sel, under) {
var b = q.box || {};
var rim = rimOf(b);
if (!rim.shape || !rim.sides) return "";
var out = [];
var m = rimMask(rim, rim.sides);
out.push(sel + " {\nposition: relative;\n" + m + (m ? "box-shadow: none;\n" : "") + "}");
if (m && under) {
var drop = shadowDrop(b, true);
if (drop) out.push(".bd-ly-art:has(> .bd-panel.bd-pg-" + q.id + "),\n.bd-site:has(> .bd-panel.bd-pg-" + q.id + ") {\nfilter: " + drop + ";\n}");
}
var ln = rimLineCSS(rim, rim.sides, sel);
if (ln) out.push(ln);
var tb = rimTabCSS(rim, rim.sides, sel, b.card ? rimTabFill(b.card, solidPct(b.cardA, 0)) : "var(--bd-panel, #fff)");
if (tb) out.push(tb);
return out.join("\n");
}
/* THE EDGE PANEL: SHAPE THUMBNAILS, THE FOUR SIDES AROUND A SQUARE, THE NUMBERS THAT SHAPE NEEDS, THEN THE SHADOW */
function rimPanel(base, o, card) {
var rim = rimOf(o);
var r = o.rim || {};
var P = base + "rim.";
var h = '<span class="bd-ed-label">Edge</span><div class="bd-ed-thumbs bd-ed-rims">' + RIM_SHAPES.map(function (x) {
var on = rim.shape === x[0];
return '<button class="bd-ed-thumb' + (on ? " is-on" : "") + '" data-act="set" data-path="' + P + 'shape" data-val="' + x[0] + '" aria-pressed="' + on + '">' + RIM_SVG[x[0]] + "<i>" + x[1] + "</i></button>";
}).join("") + "</div>";
if (rim.shape) {
var side = function (s, name) {
var on = rim.sides.indexOf(s) > -1;
return '<button class="bd-ed-side is-' + s + (on ? " is-on" : "") + '" data-act="rim-side" data-path="' + P + 'sides" data-s="' + s + '" data-cur="' + rim.sides + '" aria-pressed="' + on + '" title="' + name + '">' + name + "</button>";
};
var one = rim.shape === "tab";
h += '<div class="bd-ed-rimrow"><div class="bd-ed-sides' + (one ? " is-one" : "") + '">' + side("t", "Top") + side("l", "Left") + '<span class="bd-ed-sides-box"></span>' + side("r", "Right") + side("b", "Bottom") + "</div>";
var sz = { line: "Line px", torn: "Tear depth", stamp: "Hole size", notch: "Notch size", punch: "Hole size", tab: "Tab height" }[rim.shape];
var gp = { stamp: "Gap", punch: "Spacing", tab: "Tab width" }[rim.shape];
h += '<div class="bd-ed-rimnums">' + numIn(sz, P + "size", r.size == null ? "" : r.size, "blank", RIM_SIZE[rim.shape]) + (gp ? numIn(gp, P + "gap", r.gap == null ? "" : r.gap, "blank", RIM_GAP[rim.shape]) : "") + "</div></div>";
if (one) h += two(numIn("Along %", P + "at", r.at == null ? "" : r.at, "blank", 10), field("Label", input(P + "label", r.label || ""))) + '<div class="bd-ed-hint">One tab, on the first side ticked.</div>';
if (rim.shape === "line" || rim.shape === "tab") h += field(rim.shape === "line" ? "Line colour" : "Label colour", '<input type="color" class="bd-ed-input" data-bind="' + P + 'color" value="' + esc(rim.color || "#111111") + '">');
if (!card) h += '<div class="bd-ed-hint">Only the sheet’s outer edges are cut, never the join between its pages.</div>';
if (["torn", "stamp", "notch", "punch"].indexOf(rim.shape) > -1) h += '<div class="bd-ed-hint">Drawings set to Multiply show a faint box on see-through paper with a cut edge; set them to Lines only.</div>';
}
var sh = o.shadow || "none";
h += '<span class="bd-ed-label">Shadow</span>' + seg(base + "shadow", sh, [["none", "None"], ["soft", "Soft"], ["hard", "Hard"], ["line", "Line"]]);
if (sh !== "none") h += two(numIn(sh === "line" ? "Line px" : sh === "hard" ? "Offset px" : "Size px", base + "shadowSize", o.shadowSize == null ? "" : o.shadowSize, "blank", sh === "line" ? 1 : sh === "hard" ? 8 : card ? 50 : 28), numIn("Strength %", base + "shadowA", o.shadowA == null ? "" : o.shadowA, "blank", sh === "soft" ? (card ? 12 : 16) : sh === "hard" ? (card ? 8 : 10) : 12));
if (card && ["torn", "stamp", "notch", "punch"].indexOf(rim.shape) > -1 && sh !== "none") h += '<div class="bd-ed-hint">A cut card on a sheet casts no shadow; underneath it follows the cut.</div>';
return h;
}
function sheetRadius(k, i, N, pinned, phone) {
var r = parseFloat(k.radius);
if (!(r > 0) || pinned) return "";
var x = sheetAx(k, phone) === "x";
var first = i === 0, last = i === N - 1;
var c = x ? [first, last, last, first] : [first, first, last, last];
return "border-radius: " + c.map(function (on) { return on ? r + "px" : "0"; }).join(" ") + ";\n";
}
/* THE SHEET'S SHADOW LIES ONLY ON THE SHEET'S OUTER EDGES: EACH PAPER'S SHADOW IS CUT OFF ON THE SIDE WHERE IT JOINS ITS NEIGHBOUR */
function sheetJoinClip(k, qi, qn, phone) {
if (qn < 2 || (k.shadow || "none") === "none") return "";
var x = sheetAx(k, phone) === "x";
var e = "-60px";
var t = e, r = e, b = e, l = e;
if (x) { if (qi === 0) r = "0"; else l = "0"; }
else { if (qi === 0) b = "0"; else t = "0"; }
return "clip-path: inset(" + t + " " + r + " " + b + " " + l + ");\n";
}
function sheetLine(k, phone) {
var sh = k.shadow || "none";
if (sh === "none") return "none";
if (!sheetStrip(k)) return shadowCSS(k);
if (sh === "soft") return "0 0 28px rgba(0, 0, 0, 0.16)";
var e = (phone ? k.edgeM : k.edge) || "left";
if (sh === "hard") return { left: "8px 8px 0", right: "-8px 8px 0", top: "8px 8px 0", bottom: "8px -8px 0" }[e] + " rgba(0, 0, 0, 0.1)";
var side = k.rest === "peek" ? { left: "right", right: "left", top: "bottom", bottom: "top" }[e] : e;
var a = k.rest === "peek" ? "0.12" : "0.1";
return { left: "-1px 0 0", right: "1px 0 0", top: "0 -1px 0", bottom: "0 1px 0" }[side] + " rgba(0, 0, 0, " + a + ")";
}
/* PER SHEET: WHERE IT SITS, HOW MUCH PEEKS, ITS PAPER */
function sheetBoxCSS(phone) {
var K = sheetList();
var out = [];
K.forEach(function (k, n) {
var ins = sheetEx(k, n, phone);
var sel = '.bd-ly-k[data-k="' + k.id + '"]';
var peek = parseFloat(phone ? k.peekM : k.peek) || 0;
var kmt = sheetStrip(k) ? boxLen(boxVal(k.box || {}, "mt", phone), "t") : null;
var kbase = sheetBoxIns(k, n, phone).top;
var d = [kmt != null ? "--k-mt: " + kmt + ";" : "", "top: " + (kmt != null ? "calc(" + kbase + "px + var(--k-mt) - var(--k-up, 0px))" : ins.top) + ";", "right: " + ins.right + ";", "bottom: " + ins.bottom + ";", "left: " + ins.left + ";", "--k-peek: " + peek + "px;", "--k-sliver: " + (k.out === "hide" ? -12 : (parseFloat(phone ? k.sliverM : k.sliver) || 0) + (k.rest === "peek" ? 0 : sheetInsets(n, phone)[(phone ? k.edgeM : k.edge) || "left"])) + "px;", "--k-strip: " + (sheetStrip(k) ? peek : 0) + "px;", "--k-nudge: " + (k.hover === "nudge" ? parseFloat(k.nudge) || 14 : parseFloat(k.nudge) || 0) + "px;", "box-shadow: " + (sheetStrip(k) ? sheetLine(k, phone) : "none") + ";"];
d = d.filter(Boolean);
if (!phone) d = d.concat(["z-index: " + (2 + K.length - 1 - n) + ";"]);
if (!phone && sheetStrip(k)) d = d.concat(["-webkit-backdrop-filter: blur(" + sheetBlur(k) + "px);", "backdrop-filter: blur(" + sheetBlur(k) + "px);"]);
if (!phone && parseInt(k.dur, 10) > 0) d.push("--k-dur: " + parseInt(k.dur, 10) + "ms;");
out.push(sel + " {\n" + d.join("\n") + "\n}");
});
return out.join("\n");
}
/* A PAGE'S INSET: HOW FAR THE PAGE SITS INSIDE ITS SHEET'S FRAME (THE SHEET'S PAPER SHOWS AROUND IT) */
function insetCSS(q, phone, sel) {
q = effPage(q);
var b = q.box || {};
var d = [];
var M = {};
BOX_SIDES.forEach(function (sd) {
M[sd[0]] = boxLen(boxVal(b, "m" + sd[0], phone), sd[0]);
if (M[sd[0]] != null) d.push("margin-" + sd[1] + ": " + M[sd[0]] + ";");
});
if ((M.t != null || M.b != null) && !b.fit) d.push("min-height: calc(100% - " + (M.t || "0px") + " - " + (M.b || "0px") + ");");
if (M.l != null || M.r != null) d.push("width: auto;", "box-sizing: border-box;");
return d.length ? sel + " {\n" + d.join("\n") + "\n}" : "";
}
/* THE BLOG ANIMATION TOOL: WHEN A POST OPENS, THE SHEET HOLDING ITS BLOG LEAVES TO THIS SIDE (site.postGo.side desktop, sideM phone; blank = the sheet's own edge; a blank phone follows the desktop choice) */
var POST_SIDES = ["left", "right", "top", "bottom"];
function sheetBlogs(k) {
return sheetPanes(k).filter(function (q) { return q && q.blog; }).map(function (q) { return q.id; });
}
function postEdges(k) {
var g = (S.project && S.project.site.postGo) || {};
var d = POST_SIDES.indexOf(g.side) > -1 ? g.side : "";
var m = POST_SIDES.indexOf(g.sideM) > -1 ? g.sideM : "";
if ((!d && !m) || !sheetBlogs(k).length) return null;
return { d: d || k.edge || "left", m: m || d || k.edgeM || "top" };
}
function sheetEdges(phone) {
var u = [];
sheetList().forEach(function (k) {
var e = (phone ? k.edgeM : k.edge) || "left";
if (u.indexOf(e) < 0) u.push(e);
var pe = postEdges(k);
if (pe) {
var x = phone ? pe.m : pe.d;
if (u.indexOf(x) < 0) u.push(x);
}
});
return u;
}
/* PER PAGE: WHAT'S BEHIND IT, ITS SPACE AND CARD — UNDERNEATH (OFFSET BY THE PEEKING SHEETS) OR ON A SHEET */
function layerPageCSS(phone) {
var out = [];
var ins = sheetInsets(1e9, phone);
sheetContent().forEach(function (q) {
var sel = '.bd-ly-art[data-id="' + q.id + '"]';
if (!phone && q.sheetBg) out.push(sel + " {\nmin-height: 100%;\nbackground: " + bgVal(q.sheetBg) + ";\n}");
var bx = pageBoxCSS(q, phone, sel + " > .bd-panel", ins);
if (bx) out.push(bx);
var upx = underPatternCSS(q, sel + " > .bd-panel", phone);
if (upx) out.push(upx);
});
sheetList().forEach(function (k, n) {
var padIns = sheetPadIns(k, n, phone);
if (!phone && !sheetStrip(k) && sheetBlur(k) > 0) out.push('.bd-ly-k[data-k="' + k.id + '"] > .bd-ly-blur {\nposition: absolute;\ntop: 0;\nleft: 0;\nwidth: 100%;\nheight: 100%;\npointer-events: none;\n-webkit-backdrop-filter: blur(' + sheetBlur(k) + 'px);\nbackdrop-filter: blur(' + sheetBlur(k) + 'px);\n}');
var panesK = sheetPanes(k);
(phone && sheetRev(k) ? sheetPanes(k, true) : (k.pages || []).map(sheetPage).filter(Boolean)).forEach(function (q, qi, qa) {
var st = sheetStrip(k);
var sel = st && st.id === q.id ? '.bd-ly-k[data-k="' + k.id + '"] > .bd-ly-strip' : '.bd-ly-pane[data-page="' + q.id + '"] > .bd-ly-paper';
if (!st) {
var pm = sheetPaperMargins(k, q, phone);
/* ON A PINNED SHEET THE SIDE MARGINS BELONG TO THE PANE (SO ITS HIT AREA IS THE PAPER, NO CLIP-PATH, AND THE BLUR STILL SEES WHAT LIES UNDER IT) */
var kpin = sheetPin(k, phone);
var hitPane = !!kpin && kpin !== String(q.id);
out.push(sel + " {\nmargin: " + pm.t + " " + (hitPane ? "0" : pm.r) + " 0 " + (hitPane ? "0" : pm.l) + ";\nmin-height: calc(100% - " + pm.t + " - " + pm.b + ");\nbox-shadow: " + sheetLine(k, phone) + ";\n" + sheetJoinClip(k, qi, qa.length, phone) + sheetRadius(k, qi, qa.length, hitPane === false && !!kpin, phone) + "}");
var rp = rimPaperCSS(k, q, qi, qa.length, phone, sel);
if (rp) out.push(rp);
out.push('.bd-ly-pane[data-page="' + q.id + '"] {\n--pm-b: ' + pm.b + ';\n' + (hitPane ? "margin-left: " + pm.l + ";\nmargin-right: " + pm.r + ";\n" + (sheetAx(k, phone) === "x" ? "flex-basis: calc(100% / var(--n) - " + pm.l + " - " + pm.r + ");\n" : "") : "") + "}");
}
if (!phone) out.push(sel + " {\nbackground: " + (st && st.id === q.id ? sheetPaper(k, sheetSolid(k)) : sheetPaper(cardPaperK(k, q), sheetSolid(k), panesK.indexOf(q), panesK.length)) + ";\n}");
if (!phone && q.sheetBg) out.push(sel + " {\nbackground: " + bgVal(q.sheetBg) + ";\n}");
var bx = pageBoxCSS(q, phone, sel + " > .bd-panel", st && st.id === q.id ? null : padIns, true);
if (bx) out.push(bx);
if (!st) { var cp = cardPatternCSS(k, q, sel + " > .bd-panel", phone); if (cp) out.push(cp); }
if (!st && pageMode(q) === "card") {
var cpm = sheetPaperMargins(k, q, phone);
out.push('.bd-ly-pane[data-page="' + q.id + '"] {\noverflow: hidden;\n}');
out.push('.bd-ly-pane[data-page="' + q.id + '"]::after {\ndisplay: none;\n}');
out.push(sel + " {\nheight: calc(100% - " + cpm.t + " - " + cpm.b + ");\noverflow-y: auto;\nbackground-attachment: scroll;\nscrollbar-width: none;\n}");
out.push(sel + "::-webkit-scrollbar {\ndisplay: none;\n}");
out.push(sel + " > .bd-panel {\nflex: none;\nheight: auto;\n}");
}
if (!(st && st.id === q.id)) {
if (!phone && q.hover === "lift") out.push("@media (hover: hover) and (min-width: 761px) {\n" + sel + " > .bd-panel:hover {\nbox-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);\n}\n}");
}
});
});
return out.join("\n");
}
function contentInsetCSS(phone) {
var ins = sheetInsets(1e9, phone);
var d = ["padding-top: calc(" + ins.top + "px + var(--bd-wt));", "padding-left: calc(" + ins.left + "px" + pinGrow("left", phone) + " + var(--bd-wl));"];
if (ins.right) d.push("padding-right: calc(" + ins.right + "px" + pinGrow("right", phone) + ");");
if (ins.bottom) d.push("padding-bottom: " + ins.bottom + "px;");
var o = ".bd-ly-art > .bd-panel {\n" + d.join("\n") + "\n}";
/* A PINNED STRIP TALLER THAN ITS DRAWN MARGIN PUSHES THE PAGES UNDERNEATH DOWN BY THE DIFFERENCE (RUNTIME --bd-pin-top / --bd-pin-bottom) */
var yp = false;
sheetList().forEach(function (k) {
var g = sheetPinGeo(k, phone);
if (g && !g.x) yp = true;
});
if (yp) o += "\n.bd-ly-art::before {\ncontent: \"\";\ndisplay: block;\nheight: max(0px, calc(var(--bd-pin-top, 0px) - " + ins.top + "px));\n}\n.bd-ly-art::after {\ncontent: \"\";\ndisplay: block;\nheight: max(0px, calc(var(--bd-pin-bottom, 0px) - " + ins.bottom + "px));\n}";
return o;
}
/* THE SHEET MENU ON A STRIP (PUBLISHED), ON THE STRIP PAGE ITSELF AND ON THE CANVAS CHROME */
function sheetMenuCSS(phone) {
var W = [".bd-ly-strip", ".bd-site.is-strip", ".bd-ly-edit"];
var sel = function (x) { return W.map(function (w) { return w + " " + x; }).join(",\n"); };
if (phone) return [
sel(".bd-ly-list") + " {\ntop: auto;\nbottom: 0;\nright: var(--sm-padm);\nwidth: auto;\nheight: 100%;\nflex-direction: row;\nalign-items: center;\ngap: var(--sm-gapm);\n}",
sel(".bd-sheetmenu.is-al-left .bd-ly-list") + ",\n" + sel(".bd-sheetmenu.is-al-right .bd-ly-list") + " {\nalign-items: center;\n}",
sel(".bd-ly-mark") + " {\ntop: auto;\nleft: var(--sm-padm);\nright: auto;\nbottom: 0;\nheight: 100%;\ndisplay: flex;\nalign-items: center;\n}"
].join("\n");
return [
sel(".bd-panel") + ",\n" + sel(".bd-main") + ",\n" + sel(".bd-grid") + ",\n" + sel(".bd-cols") + ",\n" + sel(".bd-col") + ",\n" + sel(".bd-el") + " {\nposition: static;\n}",
sel(".bd-ly-list") + " {\nposition: absolute;\ntop: var(--bd-wt);\nright: var(--sm-pad);\nwidth: calc(100% - var(--sm-pad) - 16px);\ndisplay: flex;\nflex-direction: column;\nalign-items: flex-end;\ngap: var(--sm-gap);\nmargin: 0;\npadding: 0;\nlist-style: none;\n}",
sel(".bd-sheetmenu.is-al-left .bd-ly-list") + " {\nalign-items: flex-start;\n}",
sel(".bd-ly-mark") + " {\nposition: absolute;\nright: var(--sm-pad);\nbottom: var(--bd-wt);\n}",
".bd-ly-a {\ndisplay: inline-flex;\ngap: 10px;\nwhite-space: nowrap;\n}",
".bd-ly-mk {\nvisibility: hidden;\n}",
".bd-ly-a.is-current .bd-ly-mk {\nvisibility: visible;\n}"
].join("\n");
}
/* THE PHONE'S OWN SPREAD: THE TRACK RUNS ALONG THE PHONE AXIS (is-axm-*), WHATEVER THE DESKTOP DOES */
/* THE PHONE'S OWN PAGE ORDER: A SWAPPED SHEET LAYS ITS TWO PAGES THE OTHER WAY ROUND ON A PHONE (STRAIGHT FLEX ORDER, NOTHING MOVES) */
function sheetOrderCSS() {
var out = [];
sheetList().forEach(function (k) {
if (!sheetRev(k)) return;
sheetPanes(k, true).forEach(function (q, i) { out.push('#bd-ly .bd-ly-k[data-k="' + k.id + '"] .bd-ly-pane[data-page="' + q.id + '"] {\norder: ' + i + ';\n}'); });
});
return out.join("\n");
}
function sheetAxisCSS() {
return [
".bd-ly-track.is-axm-y {\nflex-direction: column;\nwidth: 100%;\nheight: calc(var(--n) * 100%);\ntransform: translate3d(0, calc(var(--i) * -100% / var(--n)), 0);\n}",
".bd-ly-track.is-axm-x {\nflex-direction: row;\nwidth: calc(var(--n) * 100%);\nheight: 100%;\ntransform: translate3d(calc(var(--i) * -100% / var(--n)), 0, 0);\n}"
].join("\n");
}
function layerCSS(phone) {
var Ls = S.project.site.layers;
if (phone) return [
contentInsetCSS(true),
sheetAxisCSS(),
sheetOrderCSS(),
sheetBoxCSS(true),
sheetPinCSS(true),
sheetStateCSS("is-em-", sheetEdges(true)),
sheetMenuCSS(true),
layerPageCSS(true),
glassCSS(true)
].filter(Boolean).join("\n");
var ease = (LAYER_EASE[Ls.ease] || LAYER_EASE.paper)[1];
var KD = "var(--ly-pdur, var(--k-dur, var(--ly-dur)))";
var out = [
":root {\n--ly-dur: " + Ls.dur + "ms;\n--ly-ease: " + ease + ";\n--ly-tilt: " + (Ls.tilt || 0) + "deg;\n--ly-focus: " + Ls.focusBlur + "px;\n}",
"body.bd-layered {\nheight: 100%;\nmargin: 0;\noverflow: hidden;\n}",
".bd-ly {\nposition: fixed;\ninset: 0;\noverflow: hidden;\n}",
".bd-ly-sheet {\nposition: absolute;\n--lx: 0px;\n--ly: 0px;\n--lr: 0deg;\ntransform: translate3d(var(--lx), var(--ly), 0) rotate(var(--lr));\ntransition: transform var(--ly-dur) var(--ly-ease), box-shadow var(--ly-dur) var(--ly-ease), filter var(--ly-dur) var(--ly-ease);\nwill-change: transform;\n}",
".bd-ly-sheet.is-moving {\n--lr: var(--ly-tilt);\n}",
".bd-ly-sheet .bd-panel {\nmin-height: 0;\nbackground: transparent;\n}",
".bd-ly-pane > .bd-ly-paper {\ndisplay: flex;\nflex-direction: column;\nmin-height: 100%;\nbox-sizing: border-box;\n}",
".bd-ly-paper > .bd-panel {\nflex: 1 0 auto;\nbox-sizing: border-box;\n}",
".bd-ly-pane::after {\ncontent: \"\";\ndisplay: block;\nflex: none;\nheight: var(--pm-b, 0px);\n}",
".bd-ly-content {\ninset: 0;\nz-index: 1;\noverflow-y: auto;\n-webkit-overflow-scrolling: touch;\noverscroll-behavior: contain;\nbackground: var(--bd-page);\n}",
Ls.reveal === "rise" ? ".bd-ly:not(.is-v-post) .bd-ly-content {\n--ly: 18px;\n}" : "",
".bd-ly-art {\ndisplay: none;\n}",
".bd-ly-art.is-shown {\ndisplay: block;\n}",
contentInsetCSS(false),
".bd-ly-k {\n--kx: 0px;\n--ky: 0px;\n--kfx: 0deg;\n--kfy: 0deg;\n--ksx: 1;\n--ksy: 1;\noverflow: hidden;\ntransform: translate3d(var(--kx), var(--ky), 0) rotate(var(--lr)) perspective(2400px) rotateY(var(--kfy)) rotateX(var(--kfx)) scale(var(--ksx), var(--ksy));\ntransition: transform " + KD + " var(--ly-ease), box-shadow " + KD + " var(--ly-ease), top " + KD + " var(--ly-ease), right " + KD + " var(--ly-ease), bottom " + KD + " var(--ly-ease), left " + KD + " var(--ly-ease);\n}",
Ls.lift ? ".bd-ly-k.is-moving {\nbox-shadow: 8px 8px 0 rgba(0, 0, 0, 0.06);\n}\n.bd-ly-k.is-paper.is-moving {\nbox-shadow: none;\n}\n.bd-ly-k.is-paper.is-moving .bd-ly-paper {\nbox-shadow: 8px 8px 0 rgba(0, 0, 0, 0.06);\n}" : "",
".bd-ly.is-t-cut .bd-ly-k.is-r-open {\ntransition-duration: 0s;\n}",
"#bd-ly .bd-ly-k[class*=\"is-lv-\"]:not(.is-lv-cut) {\ntransition-duration: " + KD + ";\n}",
"@media (hover: hover) and (min-width: 761px) {\n#bd-ly .bd-ly-k.is-hv-lift:hover:not(:has(a:hover)) {\nbox-shadow: 0 16px 44px rgba(0, 0, 0, 0.22);\n}\n#bd-ly .bd-ly-k.is-paper.is-hv-lift:hover:not(:has(a:hover)) {\nbox-shadow: none;\n}\n#bd-ly .bd-ly-k.is-paper.is-hv-lift:hover:not(:has(a:hover)) .bd-ly-paper {\nbox-shadow: 0 16px 44px rgba(0, 0, 0, 0.22);\n}\n}",
"#bd-ly .bd-ly-k.is-lv-cut,\n#bd-ly .bd-ly-k.is-ap-cut {\ntransition-duration: 0s;\n}",
"#bd-ly .bd-ly-k.is-ap-fade {\nopacity: 1;\ntransition-property: transform, box-shadow, top, right, bottom, left, opacity;\n}",
"#bd-ly .bd-ly-k.is-ap-fade.is-lift {\ntransition-property: transform, box-shadow, right, bottom, left, opacity;\n}",
"#bd-ly .bd-ly-k.is-ap-fade.is-snapbox {\ntransition-property: transform, box-shadow, opacity;\n}",
"#bd-ly .bd-ly-k.is-ap-fade.is-st-hidden {\n--kx: 0px;\n--ky: 0px;\n--kfx: 0deg;\n--kfy: 0deg;\n--ksx: 1;\n--ksy: 1;\nopacity: 0;\npointer-events: none;\n}",
".bd-ly-k.is-lift {\ntransition-property: transform, box-shadow, right, bottom, left;\n}",
".bd-ly-k.is-snapbox {\ntransition-property: transform, box-shadow;\n}",
".bd-ly-body,\n.bd-ly-strip {\nposition: absolute;\noverflow: hidden;\n}",
".bd-ly-track {\nposition: absolute;\ntop: 0;\nleft: 0;\ndisplay: flex;\ntransition: transform " + KD + " var(--ly-ease);\nwill-change: transform;\n}",
".bd-ly-track.is-ax-y {\nflex-direction: column;\nwidth: 100%;\nheight: calc(var(--n) * 100%);\ntransform: translate3d(0, calc(var(--i) * -100% / var(--n)), 0);\n}",
".bd-ly-track.is-ax-x {\nflex-direction: row;\nwidth: calc(var(--n) * 100%);\nheight: 100%;\ntransform: translate3d(calc(var(--i) * -100% / var(--n)), 0, 0);\n}",
".bd-ly-track.is-snap {\ntransition: none;\n}",
".bd-ly-pane {\nflex: 0 0 calc(100% / var(--n));\nmin-width: 0;\nmin-height: 0;\noverflow-y: auto;\n-webkit-overflow-scrolling: touch;\noverscroll-behavior: contain;\n}",
sheetBoxCSS(false),
sheetPinCSS(false),
sheetStateCSS("is-e-", sheetEdges(false)),
sheetMenuCSS(false),
layerPageCSS(false),
glassCSS(false),
".is-t-unfold .bd-ly-art.is-enter {\ntransform-origin: 50% 0;\nanimation: bd-ly-unfold var(--ly-pdur, var(--ly-dur)) var(--ly-ease) both;\n}",
"@keyframes bd-ly-unfold {\nfrom {\ntransform: perspective(1600px) rotateX(-88deg);\n}\nto {\ntransform: none;\n}\n}",
"@media (prefers-reduced-motion: reduce) {\n.bd-ly-sheet,\n.bd-ly-track {\ntransition-duration: 1ms;\n}\n}"
];
return out.filter(Boolean).join("\n");
}
/* LAYER RUNTIME (EXPORTED AS-IS) — MOVES THE SHEETS BY bdSheetPlan, KEEPS THE ADDRESS BAR IN STEP */
function bdLayers(doc, preview) {
var root = doc.getElementById("bd-ly");
if (!root) return;
var content = doc.getElementById("bd-ly-content");
var els = Array.prototype.slice.call(root.querySelectorAll(".bd-ly-k"));
var base = parseInt(root.getAttribute("data-dur"), 10) || 460;
var dur = base;
var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var siteTitle = doc.title.split(" — ").pop();
var master = root.getAttribute("data-trans") || "slide";
var home = root.getAttribute("data-home") || "";
var F = root.getAttribute("data-focus") || home;
var before = home;
var model = els.map(function (k) {
var c = k.getAttribute("data-covers");
var st = k.querySelector(".bd-ly-strip > .bd-panel");
return { el: k, e0: k.getAttribute("data-edge") || "left", em0: k.getAttribute("data-edge-m") || "top", pe: k.getAttribute("data-pe") || "", peM: k.getAttribute("data-pe-m") || "", blogs: (k.getAttribute("data-blogs") || "").split(" ").filter(Boolean), rest: k.getAttribute("data-rest") || "open", main: parseInt(k.getAttribute(window.matchMedia("(max-width: 760px)").matches && k.hasAttribute("data-main-m") ? "data-main-m" : "data-main"), 10) || 0, pin: isNaN(parseInt(k.getAttribute(window.matchMedia("(max-width: 760px)").matches && k.hasAttribute("data-pin-m") ? "data-pin-m" : "data-pin"), 10)) ? -1 : parseInt(k.getAttribute(window.matchMedia("(max-width: 760px)").matches && k.hasAttribute("data-pin-m") ? "data-pin-m" : "data-pin"), 10), rev: k.hasAttribute("data-rev-m"), covers: c && c !== "all" ? c.split(",") : null, panes: Array.prototype.map.call(k.querySelectorAll(".bd-ly-pane"), function (p) { return p.getAttribute("data-page"); }), track: k.querySelector(".bd-ly-track"), strip: st ? (st.className.match(/\bbd-pg-(\S+)/) || [])[1] || "" : "" };
});
/* THE PHONE'S OWN PAGE ORDER: --i COUNTS PAGES AS THEY LIE (CSS order), THE PLAN COUNTS THEM IN THE MARKUP */
var vis = function (m, i) { return m.rev && window.matchMedia("(max-width: 760px)").matches ? m.panes.length - 1 - i : i; };
model.forEach(function (m) {
if (m.rev) m.track.style.setProperty("--i", vis(m, parseInt(m.track.style.getPropertyValue("--i"), 10) || 0));
});
model.forEach(function (m) {
if (m.pin < 0) return;
var kids = Array.prototype.slice.call(m.track.children);
var pinPane = kids[m.pin];
kids.forEach(function (pn, ix) {
if (ix === m.pin || pn.hasAttribute("data-own")) return;
pn.addEventListener("scroll", function () {
pinPane.style.setProperty("--k-sy", pn.scrollTop + "px");
pinPane.style.setProperty("--k-sx", pn.scrollLeft + "px");
}, { passive: true });
});
pinPane.addEventListener("wheel", function (e) {
var i = vis(m, parseInt(m.track.style.getPropertyValue("--i"), 10) || 0);
var pn = kids[i];
if (i !== m.pin && pn && !pn.hasAttribute("data-own")) pn.scrollBy(e.deltaX, e.deltaY);
}, { passive: true });
/* SAFARI ONLY SCROLLS A PANE THAT TAKES POINTER EVENTS: THE OTHER PANES TAKE THEM, CLIPPED TO THEIR PAPER, SO CLICKS AROUND THE PAPER STILL REACH WHAT LIES BENEATH */
m.hit = kids.filter(function (pn, ix) { return ix !== m.pin && getComputedStyle(pn).clipPath === "none"; });
m.hit.forEach(function (pn) {
pn.addEventListener("scroll", function () { hitClip(pn); }, { passive: true });
});
});
function hitClip(pn) {
var pp = pn.querySelector(".bd-ly-paper");
if (!pp) return;
pn.style.pointerEvents = "auto";
}
function hitAll() {
model.forEach(function (m) { (m.hit || []).forEach(hitClip); });
pinLen();
}
/* PAGES SIDE BY SIDE ON ONE SHEET END ON THE SAME LINE: EVERY PAPER IS AS LONG AS THE LONGEST PAGE AND GROWS WITH IT */
function pinLen() {
/* A PINNED STRIP IS AS BIG AS ITS PAGE REALLY IS (HEIGHT ON A VERTICAL SHEET, WIDTH ON A HORIZONTAL ONE): THE SHEET, THE OPEN PAGE AND EVERYTHING UNDER IT USE THAT, NOT THE DRAWN MARGIN ALONE */
var pg = { top: 0, bottom: 0, left: 0, right: 0 };
model.forEach(function (m) {
if (m.pin < 0) return;
var kid = m.track.children[m.pin];
var pp = kid && kid.querySelector(".bd-ly-paper");
if (!pp) return;
var col = getComputedStyle(m.track).flexDirection === "column";
var r = pp.getBoundingClientRect();
if (col) {
var h = Math.ceil(r.height);
m.el.style.setProperty("--k-pl", h + "px");
pg[m.pin === 0 ? "bottom" : "top"] += h;
} else {
m.el.style.removeProperty("--k-pl");
pg[m.pin === 0 ? "right" : "left"] += Math.ceil(r.width);
}
});
["top", "bottom", "left", "right"].forEach(function (e) { root.style.setProperty("--bd-pin-" + e, pg[e] + "px"); });
model.forEach(function (m) {
if (getComputedStyle(m.track).flexDirection !== "row") return;
var kids = Array.prototype.slice.call(m.track.children);
var stay = false;
var pp = kids.filter(function (pn, ix) { return !(stay && ix === m.pin); }).map(function (pn) { return pn.querySelector(".bd-ly-paper"); }).filter(Boolean);
if (stay && kids[m.pin] && kids[m.pin].querySelector(".bd-ly-paper")) kids[m.pin].querySelector(".bd-ly-paper").style.minHeight = "";
if (pp.length < 2) return;
pp.forEach(function (x) { x.style.minHeight = ""; });
/* THE BOTTOM EDGES LINE UP EVEN WHEN THE PAPERS START AT DIFFERENT HEIGHTS */
var top = pp.map(function (x) { var pn = x.parentNode; return x.getBoundingClientRect().top - pn.getBoundingClientRect().top + pn.scrollTop; });
var end = Math.max.apply(null, pp.map(function (x, n) { return top[n] + x.getBoundingClientRect().height; }));
pp.forEach(function (x, n) { x.style.minHeight = Math.ceil(end - top[n]) + "px"; });
});
}
/* ONE BLUR LAYER PER SHEET: CLIPPED TO THE UNION OF ITS PAPERS, SO THE SHEET IS ONE CONTINUOUS BLUR WITH NO JOIN BETWEEN ITS PAGES */
var blurs = model.map(function (m) {
var el = m.el.querySelector(":scope > .bd-ly-blur");
return el ? { k: m.el, el: el, papers: Array.prototype.slice.call(m.el.querySelectorAll(".bd-ly-pane > .bd-ly-paper")), d: "" } : null;
}).filter(Boolean);
function blurSync() {
blurs.forEach(function (b) {
var sr = b.k.getBoundingClientRect();
var d = "";
b.papers.forEach(function (pp) {
var r = pp.getBoundingClientRect();
var x = Math.round((r.left - sr.left) * 10) / 10;
var y = Math.round((r.top - sr.top) * 10) / 10;
var w = Math.round(r.width * 10) / 10;
var h = Math.round(r.height * 10) / 10;
var cs = getComputedStyle(pp);
var v = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(function (z) { return parseFloat(z) || 0; });
var f = Math.min(1, w / ((v[0] + v[1]) || 1e9), w / ((v[3] + v[2]) || 1e9), h / ((v[0] + v[3]) || 1e9), h / ((v[1] + v[2]) || 1e9));
v = v.map(function (z) { return z * f; });
d += "M" + (x + v[0]) + " " + y + "H" + (x + w - v[1]) + "A" + v[1] + " " + v[1] + " 0 0 1 " + (x + w) + " " + (y + v[1]) + "V" + (y + h - v[2]) + "A" + v[2] + " " + v[2] + " 0 0 1 " + (x + w - v[2]) + " " + (y + h) + "H" + (x + v[3]) + "A" + v[3] + " " + v[3] + " 0 0 1 " + x + " " + (y + h - v[3]) + "V" + (y + v[0]) + "A" + v[0] + " " + v[0] + " 0 0 1 " + (x + v[0]) + " " + y + "Z";
});
if (d !== b.d) {
b.d = d;
b.el.style.clipPath = 'path("' + d + '")';
b.el.style.webkitClipPath = 'path("' + d + '")';
}
});
}
var blurUntil = 0;
var blurRaf = 0;
function blurTick() {
blurRaf = 0;
blurSync();
if (Date.now() < blurUntil) blurRaf = requestAnimationFrame(blurTick);
}
function blurKick(ms) {
if (!blurs.length) return;
blurUntil = Math.max(blurUntil, Date.now() + ms);
if (!blurRaf) blurRaf = requestAnimationFrame(blurTick);
}
if (blurs.length) {
root.addEventListener("scroll", function () { blurKick(160); }, true);
["transitionrun", "transitionstart", "transitionend"].forEach(function (t) { root.addEventListener(t, function () { blurKick(dur + 300); }, true); });
window.addEventListener("resize", function () { blurKick(300); });
window.addEventListener("load", function () { blurKick(1500); });
if (window.ResizeObserver) {
var rb = new ResizeObserver(function () { blurKick(300); });
blurs.forEach(function (b) { b.papers.forEach(function (x) { rb.observe(x); }); });
}
blurKick(1500);
}
hitAll();
if (window.ResizeObserver) {
var ro = new ResizeObserver(function () { pinLen(); });
model.forEach(function (m) { Array.prototype.forEach.call(m.track.querySelectorAll(".bd-ly-paper"), function (x) { ro.observe(x); }); });
}
window.addEventListener("resize", hitAll);
window.addEventListener("load", hitAll);
function onPage(m, st, i) {
m.el.style.removeProperty("--k-up");
var id = st === "peek" && m.strip ? m.strip : m.panes[i] || m.strip;
m.el.className = m.el.className.replace(/\bis-on-\S+/g, "").replace(/\s+/g, " ").trim() + (id ? " is-on-" + id : "");
}
var cur = model.map(function (m) {
return { st: (m.el.className.match(/\bis-st-([a-z]+)/) || [])[1] || "open", i: vis(m, parseInt(m.track.style.getPropertyValue("--i"), 10) || 0) };
});
function art(id) {
return content.querySelector('.bd-ly-art[data-id="' + id + '"]');
}
function pane(id) {
return root.querySelector('.bd-ly-pane[data-page="' + id + '"]');
}
function where(id) {
for (var n = 0; n < model.length; n++) {
var j = model[n].panes.indexOf(id);
if (j > -1) return { id: id, k: n, i: j };
}
return id && art(id) ? { id: id, k: -1, i: 0, par: art(id).getAttribute("data-parent") || "" } : null;
}
function kd(m) {
return parseInt(getComputedStyle(m.el).getPropertyValue("--k-dur"), 10) || dur;
}
function sizes() {
els.forEach(function (k) {
var sl = parseFloat(getComputedStyle(k).getPropertyValue("--k-sliver")) || 40;
if (k.offsetWidth) k.style.setProperty("--k-sqx", Math.max(0.01, sl / k.offsetWidth).toFixed(4));
if (k.offsetHeight) k.style.setProperty("--k-sqy", Math.max(0.01, sl / k.offsetHeight).toFixed(4));
});
}
sizes();
window.addEventListener("resize", sizes);
/* THE ONE SCROLL LINE, ON THE WINDOW'S RIGHT EDGE, FOR THE PAGE THAT IS SCROLLING */
var barEl = doc.getElementById("bd-ly-bar");
var thumb = barEl ? barEl.querySelector("i") : null;
function scroller() {
var f = where(F);
if (f && f.k > -1 && cur[f.k] && cur[f.k].st === "open") return model[f.k].el.querySelector(".bd-ly-pane.is-on");
return content;
}
function bar() {
if (!thumb) return;
var sc = scroller();
var h = root.clientHeight;
if (!sc || sc.scrollHeight <= sc.clientHeight + 1) {
barEl.classList.add("is-off");
return;
}
var th = Math.max(28, Math.round(h * sc.clientHeight / sc.scrollHeight));
var top = Math.round((h - th) * sc.scrollTop / (sc.scrollHeight - sc.clientHeight));
barEl.classList.remove("is-off");
thumb.style.setProperty("--bh", th + "px");
thumb.style.setProperty("--bt", top + "px");
}
if (thumb) {
var drag = null;
thumb.addEventListener("pointerdown", function (e) {
var sc = scroller();
drag = { y: e.clientY, t: sc.scrollTop, sc: sc };
thumb.setPointerCapture(e.pointerId);
e.preventDefault();
});
thumb.addEventListener("pointermove", function (e) {
if (!drag) return;
var h = root.clientHeight;
var th = Math.max(28, Math.round(h * drag.sc.clientHeight / drag.sc.scrollHeight));
drag.sc.scrollTop = drag.t + (e.clientY - drag.y) * (drag.sc.scrollHeight - drag.sc.clientHeight) / Math.max(1, h - th);
});
thumb.addEventListener("pointerup", function () { drag = null; });
thumb.addEventListener("pointercancel", function () { drag = null; });
root.addEventListener("scroll", bar, true);
window.addEventListener("resize", bar);
window.addEventListener("load", bar);
setTimeout(bar, 60);
}
/* A SHEET WITH A TOP MARGIN RISES FIRST: SCROLLING USES UP THE MARGIN (THE SHEET'S TOP EDGE CLIMBS), THEN THE PAGE SCROLLS INSIDE IT; BACK AT THE TOP THE MARGIN COMES BACK */
els.forEach(function (k) {
var tY = null;
function room() {
var v = getComputedStyle(k).getPropertyValue("--k-mt").trim();
if (!v) return 0;
var p = doc.createElement("div");
p.style.cssText = "position:absolute;visibility:hidden;width:0;height:" + v;
root.appendChild(p);
var h = p.offsetHeight;
root.removeChild(p);
return h > 0 ? h : 0;
}
function get() {
return parseFloat(k.style.getPropertyValue("--k-up")) || 0;
}
function put(v) {
k.classList.add("is-lift");
clearTimeout(k.bdLift);
k.bdLift = setTimeout(function () { k.classList.remove("is-lift"); }, 160);
k.style.setProperty("--k-up", v + "px");
}
function eat(e, d) {
if (!d || !k.classList.contains("is-st-open")) return false;
var pn = k.querySelector(".bd-ly-pane.is-on");
if (!pn || !pn.contains(e.target)) return false;
var m = room();
if (!m) return false;
var up = pn.scrollTop > 0 ? m : Math.min(get(), m);
if (d > 0 && up < m) {
var n = Math.min(m, up + d);
put(n);
pn.scrollTop += d - (n - up);
return true;
}
if (d < 0 && up > 0 && pn.scrollTop <= 0) {
put(Math.max(0, up + d));
return true;
}
return false;
}
k.addEventListener("wheel", function (e) {
if (eat(e, e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) && e.cancelable) e.preventDefault();
}, { passive: false });
k.addEventListener("touchstart", function (e) {
tY = e.touches.length === 1 ? e.touches[0].clientY : null;
}, { passive: true });
k.addEventListener("touchmove", function (e) {
if (tY === null) return;
var y = e.touches[0].clientY;
var d = tY - y;
tY = y;
if (eat(e, d) && e.cancelable) e.preventDefault();
}, { passive: false });
k.addEventListener("scroll", function (e) {
var pn = e.target;
if (!pn || !pn.classList || !pn.classList.contains("bd-ly-pane") || pn.scrollTop <= 0) return;
var m = room();
if (m && get() < m) put(m);
}, true);
});
function moving(m) {
if (reduce) return;
m.el.classList.add("is-moving");
clearTimeout(m.el.bdMv);
m.el.bdMv = setTimeout(function () { m.el.classList.remove("is-moving"); }, Math.round(kd(m) * 0.55));
}
function slugOf(id) {
var x = pane(id) || art(id);
return x ? x.getAttribute("data-slug") : "";
}
function mark() {
var a0 = art(F);
var par = a0 ? a0.getAttribute("data-parent") : "";
var has = function (id) { return !!id && !!root.querySelector('.bd-ly-a[data-id="' + id + '"]'); };
var on = F;
if (a0 && !has(F)) {
on = has(par) ? par : "";
if (!on) {
for (var n = 0; n < model.length; n++) {
if (cur[n].st === "tuck") {
on = model[n].panes[cur[n].i];
break;
}
}
}
}
root.querySelectorAll(".bd-ly-a[data-id]").forEach(function (a) {
a.classList.toggle("is-current", a.getAttribute("data-id") === on);
});
document.querySelectorAll(".bd-ix-crumb").forEach(function (c) {
if (!c.bdMap) { try { c.bdMap = JSON.parse(c.getAttribute("data-crumbs")); } catch (x) { c.bdMap = {}; } }
var cr = c.bdMap[F];
c.textContent = "";
(cr || []).forEach(function (x, i) {
if (i) c.appendChild(document.createTextNode(c.getAttribute("data-sep")));
var l = document.createElement("a");
l.className = "bd-ix-c";
l.href = "/" + x.s;
l.textContent = x.t;
c.appendChild(l);
});
});
}
function go(id, pop) {
var f = where(id);
if (!f) return;
var pf = where(F) || { id: F, k: -1, i: 0 };
var edgy = function (x) { return model[x].rest === "peek" || model[x].rest === "hidden"; };
if (f.k > -1 && edgy(f.k) && !(pf.k > -1 && edgy(pf.k))) before = F;
/* THE WAY OUT OF THE WAY BELONGS TO THE PAGE UNDERNEATH BEING OPENED OR CLOSED */
var tid = f.k < 0 ? f.id : pf.k < 0 && f.k > -1 && model[f.k].rest === "open" ? pf.id : "";
if (tid && art(tid)) {
var ta = art(tid);
var tr = ta.getAttribute("data-trans") || master;
var td = parseInt(ta.getAttribute("data-dur"), 10) || 0;
root.className = root.className.replace(/\bis-t-[a-z]+\b/g, "").replace(/\s+/g, " ").trim() + " is-t-" + tr;
dur = td || base;
if (td) root.style.setProperty("--ly-pdur", td + "ms");
else root.style.removeProperty("--ly-pdur");
}
if (f.k < 0) {
var a = art(f.id);
if (!a.classList.contains("is-shown")) {
content.querySelectorAll(".bd-ly-art.is-shown").forEach(function (x) { x.classList.remove("is-shown"); });
a.classList.add("is-shown");
content.scrollTop = 0;
}
}
var next = bdSheetPlan(model, f, cur);
/* ONE SHEET NEVER SPLITS: A PAGE LEAVING A PINNED SHEET SCROLLS BACK TO ITS TOP WHILE IT SLIDES, AND THE PINNED PAGE KEEPS FOLLOWING IT, SO THE PAPER STAYS ONE PIECE */
next.forEach(function (n, x) {
var m = model[x];
var c = cur[x];
if (m.pin < 0 || c.i === m.pin || n.i === c.i) return;
var kids = m.track.children;
var pn = kids[c.i];
var pp = kids[m.pin];
if (!pn || !pp || pn.hasAttribute("data-own") || !(pn.scrollTop > 0 || pn.scrollLeft > 0)) return;
var y0 = pn.scrollTop;
var x0 = pn.scrollLeft;
var t0 = null;
var len = reduce ? 0 : dur;
pp.style.setProperty("--k-hold", "1");
cancelAnimationFrame(pn.bdHome);
var step = function (t) {
if (t0 == null) t0 = t;
var k = len ? Math.min(1, (t - t0) / len) : 1;
var e = 1 - Math.pow(1 - k, 3);
pn.scrollTop = y0 * (1 - e);
pn.scrollLeft = x0 * (1 - e);
pp.style.setProperty("--k-sy", pn.scrollTop + "px");
pp.style.setProperty("--k-sx", pn.scrollLeft + "px");
if (k < 1) pn.bdHome = requestAnimationFrame(step);
else pp.style.removeProperty("--k-hold");
};
pn.bdHome = requestAnimationFrame(step);
});
next.forEach(function (n, x) {
var m = model[x];
var c = cur[x];
if (n.i !== c.i) {
/* A SHEET THAT ISN'T LYING OPEN CHANGES PAGE INSTANTLY, OUT OF SIGHT, THEN ONLY SLIDES BACK */
if (c.st !== "open") m.track.classList.add("is-snap");
m.track.style.setProperty("--i", vis(m, n.i));
if (c.st !== "open") {
void m.track.offsetWidth;
m.track.classList.remove("is-snap");
}
m.track.querySelectorAll(".bd-ly-pane").forEach(function (p, j) { p.classList.toggle("is-on", j === n.i); });
}
if (n.st !== c.st) {
/* WHEN A POST OPENS, THE BLOG'S SHEET LEAVES TO THE SIDE CHOSEN IN THE BLOG ANIMATION TOOL; OTHERWISE TO ITS OWN EDGE */
var po = f.k < 0 && art(f.id) ? art(f.id).getAttribute("data-parent") || "" : "";
var useP = !!(m.pe && n.st !== "open" && po && m.blogs.indexOf(po) > -1);
m.el.className = m.el.className.replace(/\bis-e-[a-z]+\b/g, "").replace(/\bis-em-[a-z]+\b/g, "").replace(/\s+/g, " ").trim() + " is-e-" + (useP ? m.pe : m.e0) + " is-em-" + (useP ? m.peM : m.em0);
/* A SHEET'S EDGES NEVER MOVE WHILE IT SLIDES: ITS BOX CHANGES INSTANTLY, THE SLIDE IS A STRAIGHT LINE */
m.el.classList.add("is-snapbox");
clearTimeout(m.el.bdSb);
m.el.bdSb = setTimeout(function () { m.el.classList.remove("is-snapbox"); }, dur + 80);
m.el.classList.remove("is-st-" + c.st);
m.el.classList.add("is-st-" + n.st);
moving(m);
} else if (n.i !== c.i) moving(m);
if (n.st !== c.st || n.i !== c.i) onPage(m, n.st, n.i);
});
cur = next;
F = f.id;
setTimeout(bar, 30);
setTimeout(bar, dur + 80);
setTimeout(hitAll, dur + 80);
root.classList.toggle("is-v-post", f.k < 0);
root.setAttribute("data-focus", F);
mark();
var ft = art(F);
doc.title = ft ? ft.getAttribute("data-title") + " — " + siteTitle : siteTitle;
if (f.k < 0) content.focus({ preventScroll: true });
if (preview || pop) return;
try {
history.pushState({ bdly: 1 }, "", "/" + slugOf(F));
} catch (e) {}
}
function back() {
var f = where(F);
if (!f) return;
if (f.k > -1 && (model[f.k].rest === "peek" || model[f.k].rest === "hidden")) {
go(before && before !== F && where(before) ? before : home);
return;
}
if (f.k < 0) {
for (var n = 0; n < model.length; n++) {
if (cur[n].st === "tuck") {
go(model[n].panes[cur[n].i]);
return;
}
}
if (home !== F) go(home);
}
}
function bySlug(slug) {
slug = String(slug || "").replace(/^\/+|\/+$/g, "").replace(/\.html$/, "");
if (slug === "index") slug = "";
var x = root.querySelector('.bd-ly-pane[data-slug="' + slug + '"]');
if (x) return x.getAttribute("data-page");
var a = content.querySelector('.bd-ly-art[data-slug="' + slug + '"]');
return a ? a.getAttribute("data-id") : "";
}
window.bdLayerOpen = function (href) {
var u;
try {
u = new URL(href, location.href);
} catch (e) {
return false;
}
if (!preview && u.origin !== location.origin) return false;
var id = bySlug(u.pathname);
if (!id) return false;
var w = where(id);
if (id === F && w && w.k > -1 && (model[w.k].rest === "peek" || model[w.k].rest === "hidden")) back();
else go(id);
setTimeout(function () {
doc.querySelectorAll(".bd-unfold").forEach(function (x) { x.remove(); });
doc.querySelectorAll(".is-open, .is-unfold").forEach(function (x) { x.classList.remove("is-open", "is-unfold"); });
}, dur);
return true;
};
doc.addEventListener("click", function (ev) {
if (ev.defaultPrevented || ev.button > 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
var a = ev.target.closest && ev.target.closest("a[href]");
if (!a || a.target === "_blank") return;
if (window.bdLayerOpen(a.href)) ev.preventDefault();
});
doc.addEventListener("keydown", function (ev) {
if (ev.key === "Escape") back();
});
if (!preview) {
window.addEventListener("popstate", function () {
go(bySlug(location.pathname) || home, true);
});
}
mark();
}
/* CANVAS IN LAYERS MODE — THE PAGE ON ITS SHEET, WITH THE PEEKING SHEETS ABOVE IT DRAWN AT THEIR EDGES (STATIC) */
function layerEditCSS(page, phone) {
BOX_VIEW = { w: phone ? 390 : 1280, h: phone ? 780 : 800 };
try {
return layerEditCSSIn(page, phone);
} finally {
BOX_VIEW = null;
}
}
function layerEditCSSIn(page, phone) {
page = effPage(page);
var w = sheetOf(page.id);
var menu = sheetMenuCSS(false) + (phone ? "\n" + sheetMenuCSS(true) : "");
if (w.strip) {
var k = w.sheet;
var peek = Math.max(parseFloat(phone ? k.peekM : k.peek) || 0, phone ? 40 : 120);
var sx = pageBoxCSS(page, phone, ".bd-site.is-strip .bd-panel", null, true);
return [":host {\nposition: relative;\n}", ".bd-site.is-strip {\nposition: relative;\n" + (phone ? "width: 100%;\nheight: " + peek + "px;\nmin-height: 0;\n" : "width: " + peek + "px;\nmin-height: 640px;\n") + "background: " + sheetPaper(k, 100) + ";\n}", sx, menu].join("\n");
}
var out = [":host {\nposition: relative;\n}"];
if (w.k > -1) {
/* A PAGE ON A SHEET: THE SHEET ITSELF SHRINKS TO THE PAGE'S MARGINS, WHAT LIES UNDERNEATH SHOWS AROUND IT */
var ins = sheetEx(w.sheet, w.k, phone, page);
var padIns = sheetPadIns(w.sheet, w.k, phone);
var b = page.box || {};
var edge = [ins.top, ins.right, ins.bottom, ins.left];
var paper = page.sheetBg ? bgVal(page.sheetBg) : sheetPaper(cardPaperK(w.sheet, page), 100, sheetPanes(w.sheet).indexOf(page), sheetPanes(w.sheet).length);
out.push(".bd-site.is-layered {\nposition: relative;\nbox-sizing: border-box;\nbackground: #dcd9d2;\npadding: " + edge.join(" ") + ";\n}");
/* THE PAPER IS THE SITE'S ::before, WHICH THE NAV OVERLAY ALSO USES (opacity 0, z-index 9): TAKE IT BACK */
out.push(".bd-site.is-layered::before {\ncontent: \"\";\nposition: absolute;\nopacity: 1;\nz-index: 0;\ntransition: none;\npointer-events: none;\ntop: " + ins.top + ";\nright: " + ins.right + ";\nbottom: " + ins.bottom + ";\nleft: " + ins.left + ";\nbackground: " + paper + ";\nbox-shadow: 0 0 0 1px rgba(0, 0, 0, 0.16);\n}");
var rimK = rimOf(w.sheet);
if (rimK.shape) {
var panesC = sheetPanes(w.sheet, phone);
var onK = rimOuter(rimK.sides, sheetAx(w.sheet, phone), Math.max(0, panesC.map(function (x) { return x.id; }).indexOf(page.id)), panesC.length);
var mk = rimMask(rimK, onK);
if (mk) out.push(".bd-site.is-layered::before {\n" + mk + "}");
if (rimK.shape === "line" && onK) out.push(".bd-site.is-layered::before {\nbox-sizing: border-box;\nborder-style: solid;\nborder-color: " + (rimK.color || "currentColor") + ";\nborder-width: " + ["t", "r", "b", "l"].map(function (x) { return onK.indexOf(x) > -1 ? rimK.size + "px" : "0"; }).join(" ") + ";\n}");
}
out.push(".bd-site.is-layered .bd-panel {\nposition: relative;\nbackground: transparent;\nmargin: 0;\n}");
var bx = pageBoxCSS(page, phone, ".bd-site.is-layered .bd-panel.bd-pg-" + page.id, padIns, true);
if (bx) out.push(bx);
var cpx = cardPatternCSS(w.sheet, page, ".bd-site.is-layered .bd-panel.bd-pg-" + page.id, phone);
if (cpx) out.push(cpx);
if (phone) {
var bb = page.box || {};
var bxc = pageBoxCSS({ box: { card: bb.card, radius: bb.radius, shadow: bb.shadow, fit: bb.fit } }, false, ".bd-site.is-layered .bd-panel.bd-pg-" + page.id, null);
if (bxc) out.push(bxc);
}
} else {
/* UNDERNEATH: THE PEEKING SHEETS ABOVE TAKE THEIR SHARE OF THE WINDOW */
var ins2 = sheetInsets(1e9, phone);
out.push(".bd-site.is-layered {\nbackground: " + (page.sheetBg ? bgVal(page.sheetBg) : "var(--bd-page)") + ";\n}", ".bd-site.is-layered .bd-panel {\nbackground: transparent;\npadding-left: calc(" + ins2.left + "px + var(--bd-wl));\npadding-top: calc(" + ins2.top + "px + var(--bd-wt));\n" + (ins2.right ? "padding-right: " + ins2.right + "px;\n" : "") + "}");
var bsel = ".bd-site.is-layered .bd-panel.bd-pg-" + page.id;
var bx2 = pageBoxCSS(page, phone, bsel, ins2);
if (bx2) out.push(bx2);
var upx2 = underPatternCSS(page, bsel, phone);
if (upx2) out.push(upx2);
if (phone) {
var bb2 = page.box || {};
var bxc2 = pageBoxCSS({ box: { card: bb2.card, radius: bb2.radius, shadow: bb2.shadow, fit: bb2.fit } }, false, bsel, null);
if (bxc2) out.push(bxc2);
}
}
out.push(".bd-ly-edit {\nposition: absolute;\nz-index: 5;\npointer-events: none;\noverflow: hidden;\nfont-family: var(--bd-sans);\ncolor: var(--bd-ink);\n}");
out.push(".bd-ly-edit a {\ncolor: inherit;\ntext-decoration: none;\n}");
out.push(".bd-ly-edit .bd-ed-cols {\ndisplay: none;\n}");
out.push(menu);
return out.join("\n");
}
function layerEditChrome(page) {
var w = sheetOf(page.id);
if (w.strip) return "";
var phone = S.mode === "phone";
var keep = S.layerFocus;
S.layerFocus = page.id;
var h = "";
sheetList().forEach(function (k, n) {
if ((w.k > -1 && n >= w.k) || k.rest !== "peek") return;
var e = (phone ? k.edgeM : k.edge) || "left";
var peek = parseFloat(phone ? k.peekM : k.peek) || 0;
var ins = sheetInsets(n, phone);
var pos = e === "left" ? "top:" + ins.top + "px;bottom:" + ins.bottom + "px;left:" + ins.left + "px;width:" + peek + "px" : e === "right" ? "top:" + ins.top + "px;bottom:" + ins.bottom + "px;right:" + ins.right + "px;width:" + peek + "px" : e === "top" ? "left:" + ins.left + "px;right:" + ins.right + "px;top:" + ins.top + "px;height:" + peek + "px" : "left:" + ins.left + "px;right:" + ins.right + "px;bottom:" + ins.bottom + "px;height:" + peek + "px";
var strip = sheetStrip(k);
h += '<div class="bd-ly-edit" style="' + pos + ";background:" + sheetPaper(k, sheetSolid(k)) + ";box-shadow:" + sheetLine(k, phone) + (parseFloat(k.radius) > 0 ? ";border-radius:" + parseFloat(k.radius) + "px" : "") + ";-webkit-backdrop-filter:blur(" + (parseFloat(k.blur) || 0) + "px);backdrop-filter:blur(" + (parseFloat(k.blur) || 0) + 'px)">' + (strip ? layerBody(strip, "view") : "") + "</div>";
});
S.layerFocus = keep;
return h;
}
/* START FROM THE CLASSIC SET: A MENU SHEET (MENU PAGE ON ITS EDGE, ABOUT ON IT) OVER AN INDEX SHEET (JOURNAL ABOVE LIBRARY) */
function migrateSheets(p) {
var s = p.site;
var L = Object.assign(clone(LAYER_DEFAULTS), s.layers || {});
var all = p.order.map(function (id) { return p.pages[id]; }).filter(function (q) { return q && q.kind !== "pin"; });
var pg = function (id) { var q = id && p.pages[id]; return q && q.kind !== "pin" ? q : null; };
var journal = pg(L.journal) || all.filter(function (q) { return q.blog; })[0] || all[0] || null;
var library = pg(L.library) || all.filter(function (q) { return (q.els || []).some(function (e) { return e.type === "library"; }); })[0] || null;
var about = pg(L.about) || all.filter(function (q) { return q.slug === "about"; })[0] || null;
var slug = all.some(function (q) { return q.slug === "menu"; }) ? "sheet-menu" : "menu";
var menu = newPage("Menu", "", slug, "");
menu.header = false;
menu.els = [{ id: uid(), type: "sheetmenu", d: { x: 0, y: 0, w: s.cols || 12, h: 6 }, m: null, props: { menu: (s.nav && s.nav.menu) || "", marker: L.marker, align: L.menuAlign === "left" ? "left" : "right", style: L.menuStyle || "heading", gap: L.menuGap, gapM: L.menuGapM, pad: L.menuPad, padM: L.menuPadM, mark: L.mark || "" } }];
p.pages[menu.id] = menu;
p.order.push(menu.id);
var idx = [journal, library].filter(Boolean).map(function (q) { return q.id; }).filter(function (id, i, a) { return a.indexOf(id) === i; });
s.sheets = [
Object.assign(clone(SHEET_DEFAULTS), { id: "menu", name: "Menu", pages: (about && idx.indexOf(about.id) < 0 ? [about.id] : []).concat([menu.id]), restPage: menu.id, edge: "left", edgeM: "top", rest: "peek", peek: L.menuW, peekM: L.menuBand, sliver: L.sliver, sliverM: L.sliverM, color: L.menuColor, alpha: 100 - L.menuAlpha, blur: L.menuBlur, shadow: L.menuEdge ? "line" : "none", dur: L.menuDur !== L.dur ? L.menuDur : "" }),
Object.assign(clone(SHEET_DEFAULTS), { id: "index", name: "Index", pages: idx, edge: "left", edgeM: "top", rest: "open", peek: 0, peekM: 0, sliver: L.sliver - L.menuW, sliverM: L.sliverM, color: L.indexColor, alpha: 100 - L.indexAlpha, blur: L.indexBlur, shadow: L.indexEdge ? "line" : "none" })
];
if (about && idx.indexOf(about.id) < 0) {
about.box = Object.assign({}, about.box || {}, { maxW: String(L.aboutW + L.aboutPad * 2), pl: String(L.aboutPad), pr: String(L.aboutPad), plM: String(L.aboutPadM), prM: String(L.aboutPadM) });
}
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
if (layersOn() && page.kind !== "pin") return '<div class="bd-panel bd-pg-' + page.id + '">\n<main class="bd-main">\n\n' + (headHTML(page) ? "<!-- HEADER -->\n" + headHTML(page) + "\n" : "") + "<!-- CONTENT -->\n" + contentHTML(page, ctx) + "\n\n</main>\n</div>";
var top = pinsFor(page, "top", false).map(function (p) { return pinHTML(p, ctx); }).join("\n");
var bottom = pinsFor(page, "bottom", false).map(function (p) { return pinHTML(p, ctx); }).join("\n");
var fixed = pinsFor(page, "top", true).concat(pinsFor(page, "bottom", true)).map(function (p) { return pinHTML(p, ctx); }).join("\n");
var stack = (page.stack || []).map(function (id) { return S.project.pages[id]; }).filter(function (p) { return p && p.kind === "page"; }).map(function (p) {
return '<section class="bd-stack"' + (edit ? ' data-stack="' + p.id + '"' : "") + ">\n" + headHTML(p) + contentHTML(p, edit ? "view" : ctx) + "\n</section>";
}).join("\n");
var head = headHTML(page);
return (fixed ? fixed + "\n" : "") + '<div class="bd-panel bd-pg-' + page.id + '">\n' + (top ? top + "\n" : "") + '<main class="bd-main">\n\n' + (head ? "<!-- HEADER -->\n" + head + "\n" : "") + "<!-- CONTENT -->\n" + contentHTML(page, ctx) + "\n" + (stack ? "\n<!-- STACKED -->\n" + stack + "\n" : "") + "\n</main>" + (bottom ? "\n" + bottom : "") + "\n</div>";
}
function pageHTMLOld(page, ctx) {
var s = S.project.site;
var head = "";
if (s.header && page.header !== false) {
head = '<header class="bd-head">\n' + headInner(page) + "</header>\n";
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
/* LINES ONLY — BAKE THE WHITE OUT OF A DRAWING SO ONLY THE LINES ARE LEFT (WORKS IN EVERY BROWSER, WHATEVER IS BEHIND) */
function bdInk(root) {
var cache = (function () {
try {
if (window.parent && window.parent !== window && window.parent.__bdInkCache) return window.parent.__bdInkCache;
} catch (err) {}
return (window.__bdInkCache = window.__bdInkCache || {});
})();
var bake = function (img) {
var src = img.getAttribute("data-bd-src") || img.currentSrc || img.src;
if (!src || src.indexOf("data:") === 0 || src.indexOf("blob:") === 0) return;
var ink = (getComputedStyle(img).color.match(/\d+(\.\d+)?/g) || [17, 17, 17]).map(Number);
var key = src + "|" + ink.join(",");
var done = function (url) {
img.setAttribute("data-bd-src", src);
img.removeAttribute("srcset");
img.src = url;
img.style.mixBlendMode = "normal";
};
if (cache[key] === "…") return;
if (cache[key]) return done(cache[key]);
var w = img.naturalWidth;
var h = img.naturalHeight;
if (!w || !h) return;
var k = Math.min(1, 1800 / Math.max(w, h));
w = Math.round(w * k);
h = Math.round(h * k);
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var cx = cv.getContext("2d");
var px;
try {
cx.drawImage(img, 0, 0, w, h);
px = cx.getImageData(0, 0, w, h);
} catch (err) {
return;
}
var d = px.data;
for (var i = 0; i < d.length; i += 4) {
var lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
var a = Math.max(0, Math.min(1, (232 - lum) / 172)) * (d[i + 3] / 255);
d[i] = ink[0];
d[i + 1] = ink[1];
d[i + 2] = ink[2];
d[i + 3] = Math.round(a * 255);
}
cx.putImageData(px, 0, 0);
/* KEPT AS A BLOB URL: CHEAP TO ASSIGN AGAIN AND AGAIN, DECODED ONCE BY THE BROWSER */
cache[key] = "…";
var finish = function (url) {
cache[key] = url;
done(url);
};
try {
if (cv.toBlob) cv.toBlob(function (bl) { if (bl) finish(URL.createObjectURL(bl)); else delete cache[key]; }, "image/png");
else finish(cv.toDataURL("image/png"));
} catch (err) {
delete cache[key];
}
};
Array.prototype.forEach.call(root.querySelectorAll("img"), function (img) {
if (img.__bdInk) return;
if (getComputedStyle(img).getPropertyValue("--bd-ink-img").trim() !== "1") return;
img.__bdInk = true;
if (img.src.indexOf("blob:") === 0) return;
img.loading = "eager";
if (img.complete && img.naturalWidth) bake(img);
else img.addEventListener("load", function () { bake(img); }, { once: true });
});
}
function bdGalleries(root) {
var host = root.querySelector(".bd-site") || (root.classList && root.classList.contains("bd-site") ? root : document.body);
/* GESTURES — HOVER TEASES, A TAP OR CLICK PLAYS THE FULL MOVE, THEN THE LINK OPENS */
if (!root.__bdGesture) {
root.__bdGesture = true;
var gd = (typeof BD_DATA !== "undefined" && BD_DATA.gDur) || 450;
var bdOpen = function (u) {
if (window.bdLayerOpen && window.bdLayerOpen(u)) return;
window.location.href = u;
};
root.addEventListener("click", function (ev) {
var a = ev.target.closest && ev.target.closest(".bd-library.is-hov-tilt a.bd-lib-item, .bd-library.is-hov-lift a.bd-lib-item, .bd-posts.is-zine a.bd-post, .bd-posts.is-trace a.bd-post");
if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.defaultPrevented) return;
if (host.classList.contains("is-editing")) return;
var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
a.classList.add("is-open");
if (a.target === "_blank" || still || (root.getRootNode && root.getRootNode() !== document)) {
setTimeout(function () { a.classList.remove("is-open"); }, 1100);
return;
}
ev.preventDefault();
if (!a.matches(".bd-post")) {
setTimeout(function () { bdOpen(a.href); }, gd + 70);
return;
}
/* TRACING PAPER: THE SHEET SLIDES OFF THE POSTER, THEN THE POST OPENS */
if (a.closest(".is-trace")) {
setTimeout(function () { bdOpen(a.href); }, Math.round(gd * 1.2) + 80);
return;
}
/* ZINE: COVER SWINGS FULLY AWAY, THE INSIDE PAGE GROWS INTO THE NEXT PAGE */
setTimeout(function () { a.classList.add("is-unfold"); }, Math.round(gd * 0.62));
setTimeout(function () {
var leaf = a.querySelector(".bd-post-page") || a;
var r = leaf.getBoundingClientRect();
var panel = document.querySelector(".bd-panel");
var sheet = document.createElement("div");
sheet.className = "bd-unfold";
sheet.style.left = r.left + "px";
sheet.style.top = r.top + "px";
sheet.style.width = r.width + "px";
sheet.style.height = r.height + "px";
sheet.style.background = getComputedStyle(leaf).backgroundColor;
document.body.appendChild(sheet);
void sheet.offsetWidth;
sheet.style.left = "0px";
sheet.style.top = "0px";
sheet.style.width = "100vw";
sheet.style.height = "100vh";
if (panel) sheet.style.background = getComputedStyle(panel).backgroundColor;
}, 600);
setTimeout(function () { bdOpen(a.href); }, Math.round(gd * 2.2));
});
window.addEventListener("pageshow", function () {
root.querySelectorAll(".is-open, .is-unfold").forEach(function (x) { if (x.matches("a.bd-lib-item, a.bd-post")) x.classList.remove("is-open", "is-unfold"); });
document.querySelectorAll(".bd-unfold").forEach(function (x) { x.remove(); });
});
}
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
/* SCROLLBARS: A THIN BLACK LINE; WITH SHEETS ONE LINE ON THE WINDOW'S FAR RIGHT EDGE FOR WHICHEVER PAGE IS SCROLLING (SHEETS HAVE MARGINS, SO THEIR OWN BARS WOULD FLOAT IN THE MIDDLE) */
function scrollCSS() {
var out = ["* {\nscrollbar-width: thin;\nscrollbar-color: var(--bd-ink) transparent;\n}", "::-webkit-scrollbar {\nwidth: 4px;\nheight: 4px;\n}", "::-webkit-scrollbar-thumb {\nbackground: var(--bd-ink);\n}", "::-webkit-scrollbar-track {\nbackground: transparent;\n}"];
if (layersOn()) out.push(".bd-ly-content,\n.bd-ly-pane {\nscrollbar-width: none;\n}", ".bd-ly-content::-webkit-scrollbar,\n.bd-ly-pane::-webkit-scrollbar {\ndisplay: none;\n}", ".bd-ly-bar {\nposition: absolute;\ntop: 0;\nright: 0;\nbottom: 0;\nwidth: 18px;\nz-index: 30;\npointer-events: none;\n}", ".bd-ly-bar.is-off {\ndisplay: none;\n}", ".bd-ly-bar i {\nposition: absolute;\nright: 0;\ntop: var(--bt, 0px);\nwidth: 18px;\nheight: var(--bh, 40px);\npointer-events: auto;\ntouch-action: none;\ncursor: default;\n}", ".bd-ly-bar i::after {\ncontent: \"\";\nposition: absolute;\ntop: 0;\nright: 0;\nbottom: 0;\nwidth: 3px;\nbackground: var(--bd-ink);\n}");
return out.join("\n");
}
function exportCSS() {
var s = S.project.site;
var pages = S.project.order.map(function (id) { return S.project.pages[id]; });
var out = [baseCSS(s, "export")];
out.push("/* SCROLLBARS */\n" + scrollCSS() + "\n");
out.push("/* MASTER */\n" + masterRules(s, false) + "\n");
out.push("/* COLUMNS */\n" + colRules(false) + "\n");
var pr = pinRules(false);
if (pr) out.push("/* HEADER + FOOTER */\n" + pr + "\n");
pages.forEach(function (p) {
var r = layoutRules(p, false);
if (r) out.push("/* PAGE: " + (p.title || p.slug).toUpperCase().replace(/\*\//g, "") + " */\n" + r + "\n");
});
var cs = cssSplit(s.css);
if (layersOn()) out.push("/* LAYERS */\n" + layerCSS(false) + "\n");
if (cs.desk.trim()) out.push("/* CUSTOM */\n" + cs.desk.trim() + "\n");
var mob = [mobileRules(s, ":root"), "/* MASTER */\n" + masterRules(s, true), "/* COLUMNS */\n" + colRules(true)];
var prm = pinRules(true);
if (prm) mob.push("/* HEADER + FOOTER */\n" + prm);
pages.forEach(function (p) {
var r = layoutRules(p, true);
if (r) mob.push("/* PAGE: " + (p.title || p.slug).toUpperCase().replace(/\*\//g, "") + " */\n" + r);
});
if (layersOn()) mob.push("/* LAYERS */\n" + layerCSS(true));
if (cs.mob.trim()) mob.push("/* CUSTOM */\n" + cs.mob.trim());
out.push("/* MOBILE */\n@media (max-width: 760px) {\n" + mob.join("\n") + "\n}\n");
return out.join("\n");
}
function exportJS() {
var d = chromeData("");
delete d.current;
d.gDur = S.project.site.motion.gDur;
if (layersOn()) {
d.menu = false;
d.pager = false;
}
return (layersOn() ? "/* LAYERS */\n" + bdSheetPlan.toString() + "\n" + bdLayers.toString() + "\ndocument.addEventListener(\"DOMContentLoaded\", function () {\nbdLayers(document, !!window.BD_PREVIEW);\n});\n\n" : "") + "/* DATA */\nvar BD_DATA = " + JSON.stringify(d, null, 0).replace(/\},\{/g, "},\n{") + ";\n\n/* CHROME */\n" + bdChrome.toString() + "\n\n/* GALLERIES */\n" + bdGalleries.toString() + "\n\n/* LINES ONLY */\n" + bdInk.toString() + "\n\n/* START */\ndocument.addEventListener(\"DOMContentLoaded\", function () {\nvar data = Object.assign({}, BD_DATA, { current: document.body.getAttribute(\"data-bd-page\") || \"\" });\nbdChrome(document, data);\nbdGalleries(document);\nbdInk(document);\n});\n";
}
function exportPage(page) {
var s = S.project.site;
if (layersOn() && page.kind !== "pin") return exportLayered(page, page.slug === "" && !page.h1 ? s.name : (page.title + " — " + s.name));
var title = page.slug === "" && !page.h1 ? s.name : (page.title + " — " + s.name);
return "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>" + esc(title) + "</title>\n" + (page.desc ? '<meta name="description" content="' + esc(page.desc) + '">\n' : "") + '<link rel="stylesheet" href="/assets/bd.css">\n' + (s.head && s.head.trim() ? "<!-- HEAD -->\n" + s.head.trim() + "\n" : "") + (!isSpread(s) && isSpreadPage(page) ? "<style>\n/* SPREAD */\n:root {\n--bd-w: 100%;\n}\n</style>\n" : "") + (page.css && page.css.trim() ? "<style>\n/* PAGE */\n" + page.css.trim() + "\n</style>\n" : "") + '<script src="/assets/bd.js" defer><\/script>\n</head>\n<body class="bd-site" data-bd-page="' + esc(page.slug) + '">\n' + pageHTML(page, "export") + "\n</body>\n</html>\n";
}
function exportLayered(page, title, noindex) {
var s = S.project.site;
var css = S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (q) { return q && q.css && q.css.trim(); }).map(function (q) { return "/* PAGE: " + (q.title || q.slug).toUpperCase().replace(/\*\//g, "") + " */\n" + q.css.trim(); }).join("\n");
return "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<title>" + esc(title) + "</title>\n" + (page && page.desc ? '<meta name="description" content="' + esc(page.desc) + '">\n' : "") + (noindex ? '<meta name="robots" content="noindex">\n' : "") + '<link rel="stylesheet" href="/assets/bd.css">\n' + (s.head && s.head.trim() ? "<!-- HEAD -->\n" + s.head.trim() + "\n" : "") + (css ? "<style>\n" + css + "\n</style>\n" : "") + '<script src="/assets/bd.js" defer><\/script>\n</head>\n<body class="bd-site bd-layered" data-bd-page="' + esc(page ? page.slug : "404") + '">\n' + layerDoc(page, "export") + "\n</body>\n</html>\n";
}
function export404() {
var s = S.project.site;
if (layersOn()) return exportLayered(null, "Not found — " + s.name, true);
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
if (S.project) { sheetFix(S.project); sheetPinOrder(S.project); homeSync(S.project); }
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
S.hideLeft = lsGet("bd-hide-left") === "1";
S.hideRight = lsGet("bd-hide-right") === "1";
window.addEventListener("resize", function () { applyPanels(); });
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
if (pg.cover && pg.cover.file) list.push(pg.cover);
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
/* THE COLOUR OF THIS BUILD — CHANGES WITH EVERY RELEASE, SO A REFRESH SHOWS WHETHER THE NEWEST EDITOR LOADED */
var BD_BUILD = "#7c3aed";
function setStatus(text, warn) {
S.status = text;
S.statusWarn = !!warn;
var el = document.querySelector(".bd-ed-status");
if (el) {
el.textContent = text;
el.classList.toggle("is-warn", !!warn);
el.title = "Edits are kept in this browser until you press Publish";
}
var rv = document.querySelector('[data-act="revert"]');
if (rv) rv.disabled = !/^Not published/.test(text || "");
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
S.undo = [];
S.redo = [];
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
/* TOOLS — EVERY BUTTON, TAB AND SECTION OF THE BACK OFFICE CAN BE HIDDEN, BROUGHT BACK, REORDERED AND MOVED; YOUR OWN TOOLS COME IN AS CODE */
var TOOL_ZONES = { top: ["Top bar", "btn"], rail: ["Rail", "btn"], left: ["Left panel", "panel"], right: ["Right panel", "panel"] };
var RAIL_TYPES = [["text", "Text"], ["image", "Image"], ["gallery", "Gallery"], ["library", "Library"], ["link", "Link"], ["list", "List"], ["embed", "Video"], ["html", "HTML"], ["rule", "Rule"], ["quote", "Quote"], ["toggle", "Fold-out list"], ["sep1"], ["menubtn", "Menu"], ["sheetmenu", "Sheet menu"], ["indexlink", "Index link"], ["pager", "Page arrows"], ["sep2"], ["posts", "Blog posts"], ["postinfo", "Post info"], ["sep3"]];
var TOOL_DEFAULT = {
top: ["toggle-left", "brand", "projects", "mode", "undo", "redo", "code-btn", "preview", "revert", "publish", "status", "toggle-right"],
rail: RAIL_TYPES.map(function (t) { return t.length > 1 ? "add:" + t[0] : t[0]; }).concat(["inspect"]),
left: ["pages", "styles", "motion", "site", "code"],
right: []
};
var TOOL_TEMPLATE = "// A tool of your own. Ask Claude: “make me a back-office tool that …”, then paste the code here.\nBD.tool({\nid: \"hello\",\nname: \"Hello\",\nkind: \"button\", // button (top bar or rail) · panel (a tab) · section (inside a panel)\nicon: '<circle cx=\"10\" cy=\"10\" r=\"6\"/>', // 20×20 line drawing, optional\nzone: \"top\", // button: top or rail · panel: left or right\nrun: function (api) {\napi.say(\"Hello from \" + api.page.title);\n}\n});\n";
var TOOLS_X = {};
var TOOL_ERR = {};
function editorPrefs() {
var s = S.project.site;
s.editor = Object.assign({ layout: {}, hidden: [], order: {}, moved: {}, custom: [] }, s.editor || {});
return s.editor;
}
/* WHAT A TOOL CAN DO: READ AND CHANGE THE SITE, THE PAGE, THE SELECTED BLOCK; BUILD PANEL FIELDS */
function toolAPI() {
return {
get site() { return S.project.site; },
get page() { return curPage(); },
get block() { return selEl(); },
state: S,
set: function (path, v) { snap(); applyPath(path, v); changed(); },
change: function (fn) { snap(); fn(); changed(); },
render: function () { render(); },
say: function (msg) { setStatus(String(msg)); },
css: function () { return exportCSS(); },
uid: uid,
ui: { field: field, row: row, sw: sw, seg: seg, select: select, input: input, numIn: numIn, colorIn: colorIn, esc: esc, icon: I }
};
}
function loadCustomTools() {
var list = editorPrefs().custom || [];
var key = JSON.stringify(list);
if (S.toolsKey === key) return;
S.toolsKey = key;
TOOLS_X = {};
TOOL_ERR = {};
list.forEach(function (c) {
try {
var got = [];
var BD = { tool: function (spec) { got.push(spec); } };
(new Function("BD", "api", c.code))(BD, toolAPI());
if (!got.length) throw new Error("Nothing was added: the code has to call BD.tool({ … }).");
got.forEach(function (spec) {
if (!spec || !spec.id) throw new Error("A tool needs an id.");
spec.id = String(spec.id).replace(/[^a-z0-9-]/gi, "-").toLowerCase();
spec.kind = spec.kind || (spec.run ? "button" : spec.panel ? "section" : "panel");
spec.cid = c.id;
TOOLS_X[spec.id] = spec;
});
} catch (err) {
TOOL_ERR[c.id] = String((err && err.message) || err);
}
});
}
function toolIcon(paths) {
return '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths || '<rect x="4" y="4" width="12" height="12" rx="1"/>') + "</svg>";
}
function toolDefs() {
loadCustomTools();
var phone = S.mode === "phone";
var d = {
"toggle-left": { label: "Left panel", icon: I.panel, act: "toggle-left", iconOnly: true },
"brand": { label: "“Back office” label", only: ["top"], html: function () { return '<span class="bd-ed-brand">Back office</span>'; } },
"projects": { label: "Site switcher", icon: I.chev, act: "projects", html: function (z) { return z === "top" ? '<button class="bd-ed-btn" data-act="projects" aria-haspopup="true"><span class="bd-ed-hide-narrow">' + esc(REPO.domain || S.project.site.name) + "</span>" + I.chev + "</button>" : null; } },
"mode": { label: "Desktop | Phone", html: function (z) {
if (z === "top") return '<div class="bd-ed-top-mid"><div class="bd-ed-seg" role="group" aria-label="Layout"><button data-act="mode" data-val="desk" class="' + (phone ? "" : "is-on") + '" aria-pressed="' + !phone + '">' + I.desk + '<span class="bd-ed-hide-narrow">Desktop</span></button><button data-act="mode" data-val="phone" class="' + (phone ? "is-on" : "") + '" aria-pressed="' + phone + '">' + I.phone + '<span class="bd-ed-hide-narrow">Phone</span></button></div></div>';
return '<button class="bd-ed-tool' + (phone ? "" : " is-on") + '" data-act="mode" data-val="desk" data-tip="Desktop" aria-label="Desktop">' + I.desk + '</button><button class="bd-ed-tool' + (phone ? " is-on" : "") + '" data-act="mode" data-val="phone" data-tip="Phone" aria-label="Phone">' + I.phone + "</button>";
} },
"undo": { label: "Undo", icon: I.undo, act: "undo", iconOnly: true, disabled: function () { return !S.undo.length; } },
"redo": { label: "Redo", icon: I.redo, act: "redo", iconOnly: true, disabled: function () { return !S.redo.length; } },
"code-btn": { label: "Code", icon: I.code, act: "code", on: function () { return S.codeOpen; } },
"preview": { label: "Preview", icon: I.eye, act: "preview", on: function () { return S.preview && !S.inspect; } },
"revert": { label: "Revert", only: ["top"], html: function () {
if (S.confirm === "discard") return '<span class="bd-ed-confirm is-inline">Throw away unpublished changes? <button class="bd-ed-btn is-danger" data-act="discard-yes">Discard</button><button class="bd-ed-btn" data-act="confirm-no">Keep</button></span>';
return '<button class="bd-ed-btn" data-act="revert"' + (hasDraft() ? "" : " disabled") + ' title="Go back to what is live — throws away everything not yet published">' + I.undo + '<span class="bd-ed-hide-narrow">Revert</span></button>';
} },
"publish": { label: "Save & publish", icon: I.up, act: "export", primary: true, disabled: function () { return S.publishing; }, text: function () { return S.publishing ? "Publishing…" : "Save & publish"; } },
"status": { label: "Saved / published status", only: ["top"], html: function () { return '<span class="bd-ed-build" style="background:' + BD_BUILD + '" title="Build ' + BD_BUILD + '"></span><span class="bd-ed-status bd-ed-hide-narrow"></span>'; } },
"toggle-right": { label: "Right panel", icon: I.panelR, act: "toggle-right", iconOnly: true },
"inspect": { label: "Style anything", icon: I.target, act: "inspect", iconOnly: true }
};
RAIL_TYPES.forEach(function (t) {
if (t.length === 1) {
d[t[0]] = { label: "— divider", sep: true };
return;
}
d["add:" + t[0]] = { label: "Add " + t[1].toLowerCase(), tip: t[1], icon: I[t[0]], act: "add", type: t[0], iconOnly: true, when: function () { return t[0] === "menubtn" ? !layersOn() : (t[0] === "sheetmenu" || t[0] === "indexlink") ? layersOn() : true; } };
});
Object.keys(TOOLS_X).forEach(function (id) {
var x = TOOLS_X[id];
if (x.kind !== "button") return;
d["x:" + id] = { label: x.name || id, icon: toolIcon(x.icon), act: "tool-run", tool: id, iconOnly: !x.text, custom: x };
});
return d;
}
function panelDefs() {
loadCustomTools();
var d = { pages: { label: "Pages", html: pagesPanel }, styles: { label: "Styles", html: stylesPanel }, motion: { label: "Motion", html: motionPanel }, site: { label: "Site", html: sitePanel }, code: { label: "Code", fixed: "left" } };
Object.keys(TOOLS_X).forEach(function (id) {
var x = TOOLS_X[id];
if (x.kind !== "panel") return;
d["x:" + id] = { label: x.name || id, custom: x, html: function () { return toolSafe(x, function () { return x.render ? x.render(toolAPI()) : ""; }); } };
});
return d;
}
function toolSafe(x, fn) {
try {
return fn() || "";
} catch (err) {
return '<div class="bd-ed-sec"><div class="bd-ed-err">' + esc(x.name || x.id) + ": " + esc(String((err && err.message) || err)) + "</div></div>";
}
}
/* WHERE EVERYTHING IS NOW: SAVED ORDER FIRST, ANYTHING NEW GOES TO ITS USUAL PLACE */
function toolLayout() {
var E = editorPrefs();
var defs = toolDefs();
var pdefs = panelDefs();
var L = { top: [], rail: [], left: [], right: [] };
var seen = {};
Object.keys(L).forEach(function (z) {
var btn = TOOL_ZONES[z][1] === "btn";
(E.layout[z] || TOOL_DEFAULT[z]).forEach(function (id) {
var t = btn ? defs[id] : pdefs[id];
if (!t || seen[id] || (t.only && t.only.indexOf(z) < 0) || (t.fixed && t.fixed !== z)) return;
L[z].push(id);
seen[id] = true;
});
});
Object.keys(defs).forEach(function (id) {
if (seen[id]) return;
var z = defs[id].custom ? (defs[id].custom.zone === "rail" ? "rail" : "top") : TOOL_DEFAULT.rail.indexOf(id) > -1 ? "rail" : "top";
var at = TOOL_DEFAULT[z].indexOf(id);
if (at > -1 && at < L[z].length) L[z].splice(at, 0, id);
else L[z].push(id);
});
Object.keys(pdefs).forEach(function (id) {
if (seen[id]) return;
L[pdefs[id].custom && pdefs[id].custom.zone === "right" ? "right" : "left"].push(id);
});
return L;
}
function toolHidden(id) {
return editorPrefs().hidden.indexOf(id) > -1;
}
function toolZoneOf(id) {
var L = toolLayout();
for (var z in L) if (L[z].indexOf(id) > -1) return z;
return "";
}
function toolButtonHTML(id, t, z) {
if (t.html) {
var h = t.html(z);
if (h != null) return h;
}
if (t.sep) return z === "rail" ? '<span class="bd-ed-rail-sep"></span>' : '<span class="bd-ed-top-sep"></span>';
var on = t.on && t.on();
var dis = t.disabled && t.disabled();
var attrs = ' data-act="' + t.act + '"' + (t.type ? ' data-type="' + t.type + '"' : "") + (t.tool ? ' data-tool="' + esc(t.tool) + '"' : "") + (dis ? " disabled" : "") + ' aria-label="' + esc(t.label) + '"';
if (z === "rail") return '<button class="bd-ed-tool' + (on ? " is-on" : "") + '"' + attrs + ' data-tip="' + esc(t.tip || t.label) + '">' + (t.icon || "") + "</button>";
var txt = t.text ? t.text() : t.label;
return '<button class="bd-ed-btn' + (t.iconOnly ? " is-icon" : "") + (on ? " is-on" : "") + (t.primary ? " is-primary" : "") + '"' + attrs + ' title="' + esc(t.tip || t.label) + '">' + (t.icon || "") + (t.iconOnly ? "" : '<span class="bd-ed-hide-narrow">' + esc(txt) + "</span>") + "</button>";
}
function toolZoneHTML(z) {
var defs = toolDefs();
var L = toolLayout();
var h = L[z].filter(function (id) { var t = defs[id]; return t && !toolHidden(id) && (!t.when || t.when()); }).map(function (id) { return toolButtonHTML(id, defs[id], z); }).join("");
if (z === "top" && h.indexOf("bd-ed-top-mid") < 0) {
var at = h.indexOf('data-act="projects"');
var end = at > -1 ? h.indexOf("</button>", at) + 9 : h.length;
h = h.slice(0, end) + '<div class="bd-ed-top-mid"></div>' + h.slice(end);
}
return h + (z === "rail" ? '<span class="bd-ed-rail-sep"></span><button class="bd-ed-tool" data-act="tools-open" data-val="rail" data-tip="Tools · hide, move, add" aria-label="Tools">' + I.more + "</button>" : '<button class="bd-ed-btn is-icon" data-act="tools-open" data-val="top" title="Tools · hide, move, add" aria-label="Tools">' + I.more + "</button>");
}
/* SECTIONS OF A PANEL, EACH WITH A STEADY ID FROM ITS HEADING */
function secLabel(node) {
var lab = node.querySelector(".bd-ed-label, .bd-ed-title, summary") || node.querySelector(".bd-ed-hint, button");
return lab ? lab.textContent.replace(/\s+/g, " ").trim() : "";
}
function panelSections(pid) {
var pd = panelDefs()[pid];
if (!pd || !pd.html) return [];
var box = document.createElement("div");
box.innerHTML = pd.html();
var out = [];
var used = {};
Array.prototype.slice.call(box.children).forEach(function (node, n) {
var lab = secLabel(node);
var key = lab.split("·")[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32) || "part-" + (n + 1);
var id = pid + ":" + key;
while (used[id]) id += "-2";
used[id] = true;
node.setAttribute("data-sec", id);
out.push({ id: id, node: node, label: lab ? lab.slice(0, 48) : "Part " + (n + 1) });
});
Object.keys(TOOLS_X).forEach(function (xid) {
var x = TOOLS_X[xid];
if (x.kind !== "section" || (x.panel || "styles") !== pid) return;
var b = document.createElement("div");
b.innerHTML = toolSafe(x, function () { return x.render ? x.render(toolAPI()) : ""; });
var node = b.firstElementChild || b;
if (!node.classList.contains("bd-ed-sec")) {
var w = document.createElement("div");
w.className = "bd-ed-sec";
w.innerHTML = b.innerHTML;
node = w;
}
var id = pid + ":x-" + xid;
node.setAttribute("data-sec", id);
out.push({ id: id, node: node, label: x.name || xid });
});
return out;
}
function arrangedSections(pid) {
var E = editorPrefs();
var list = panelSections(pid).filter(function (s) { return !E.moved[s.id] || E.moved[s.id] === pid; });
var srcs = {};
Object.keys(E.moved).forEach(function (sid) {
var src = sid.split(":")[0];
if (E.moved[sid] !== pid || src === pid) return;
srcs[src] = srcs[src] || panelSections(src);
var found = srcs[src].filter(function (s) { return s.id === sid; })[0];
if (found) list.push(found);
});
var order = E.order[pid] || [];
list.forEach(function (s, n) { s.n = n; });
list.sort(function (a, b) {
var ia = order.indexOf(a.id);
var ib = order.indexOf(b.id);
if (ia < 0 && ib < 0) return a.n - b.n;
if (ia < 0) return 1;
if (ib < 0) return -1;
return ia - ib;
});
return list;
}
function panelHTML(pid) {
return arrangedSections(pid).filter(function (s) { return !toolHidden(s.id); }).map(function (s) { return s.node.outerHTML; }).join("");
}
function tabsHTML(z, cur, extra) {
var pdefs = panelDefs();
var L = toolLayout();
return '<div class="bd-ed-tabs" role="tablist">' + (extra || "") + L[z].filter(function (id) { return pdefs[id] && !toolHidden(id); }).map(function (id) {
return '<button data-act="' + (z === "left" ? "left-tab" : "right-tab") + '" data-val="' + esc(id) + '" class="' + (cur === id ? "is-on" : "") + '">' + esc(pdefs[id].label) + "</button>";
}).join("") + '<button class="bd-ed-tabs-more" data-act="tools-open" data-val="' + z + '" aria-label="Tools · hide, move, add" title="Tools · hide, move, add">' + I.more + "</button></div>";
}
/* THE TOOLS SHEET: ONE PER ZONE */
function renderTools() {
var box = $("bd-tools");
if (!S.toolsZone || !S.project) {
if (box) box.hidden = true;
return;
}
if (!box) {
box = document.createElement("div");
box.id = "bd-tools";
box.className = "bd-ed-pop is-tools";
document.body.appendChild(box);
}
var z = S.toolsZone;
var E = editorPrefs();
var btn = TOOL_ZONES[z][1] === "btn";
var defs = btn ? toolDefs() : panelDefs();
var L = toolLayout();
var mine = L[z];
var others = Object.keys(TOOL_ZONES).filter(function (q) { return q !== z && TOOL_ZONES[q][1] === TOOL_ZONES[z][1]; });
var chip = function (act, label, extra, on) { return '<button class="bd-ed-chip' + (on ? " is-on" : "") + '" data-act="' + act + '"' + (extra || "") + ">" + label + "</button>"; };
var row = function (id, t, n, len) {
var hid = toolHidden(id);
var a = ' data-id="' + esc(id) + '" data-z="' + z + '"';
return '<div class="bd-ed-trow' + (hid ? " is-hidden" : "") + '"><span>' + esc(t.label) + '</span><span class="bd-ed-trow-acts">'
+ (n > 0 ? chip("tool-up", "↑", a) : "") + (n < len - 1 ? chip("tool-down", "↓", a) : "")
+ chip(hid ? "tool-show" : "tool-hide", hid ? "Show" : "Hide", a, hid)
+ (t.fixed || t.only ? "" : others.map(function (q) { return chip("tool-move", "→ " + TOOL_ZONES[q][0].replace(" panel", "").replace(" bar", ""), a + ' data-to="' + q + '"'); }).join(""))
+ "</span></div>";
};
var h = '<div class="bd-ed-sec"><div class="bd-ed-head"><span class="bd-ed-title">Tools · ' + TOOL_ZONES[z][0] + '</span><button class="bd-ed-btn" style="height:26px" data-act="tools-close">Done</button></div><div class="bd-ed-hint">Hide what you don’t use, bring it back here, change the order, or move it to another ' + (btn ? "bar" : "panel") + ".</div></div>";
h += '<div class="bd-ed-sec"><span class="bd-ed-label">' + (btn ? "Buttons" : "Tabs") + "</span>" + mine.map(function (id, n) { return row(id, defs[id], n, mine.length); }).join("") + "</div>";
if (!btn) {
var pid = z === "left" ? S.leftTab : S.rightTab;
var pd = panelDefs()[pid];
if (pd && pd.html) {
var secs = arrangedSections(pid);
var pids = Object.keys(panelDefs()).filter(function (q) { return q !== pid && panelDefs()[q].html; });
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Sections in “' + esc(pd.label) + "”</span>" + secs.map(function (s, n) {
var hid = toolHidden(s.id);
var a = ' data-id="' + esc(s.id) + '" data-p="' + esc(pid) + '"';
return '<div class="bd-ed-trow' + (hid ? " is-hidden" : "") + '"><span>' + esc(s.label) + '</span><span class="bd-ed-trow-acts">'
+ (n > 0 ? chip("sec-up", "↑", a) : "") + (n < secs.length - 1 ? chip("sec-down", "↓", a) : "")
+ chip(hid ? "sec-show" : "sec-hide", hid ? "Show" : "Hide", a, hid)
+ pids.map(function (q) { return chip("sec-move", "→ " + esc(panelDefs()[q].label), a + ' data-to="' + esc(q) + '"'); }).join("")
+ "</span></div>";
}).join("") + '<div class="bd-ed-hint">Open another tab to arrange its sections.</div></div>';
}
}
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Your tools</span>';
(E.custom || []).forEach(function (c) {
var names = Object.keys(TOOLS_X).filter(function (k) { return TOOLS_X[k].cid === c.id; }).map(function (k) { return TOOLS_X[k].name || k; });
h += '<div class="bd-ed-trow"><span>' + esc(names.join(", ") || c.name || "Tool") + '</span><span class="bd-ed-trow-acts">' + chip("tool-edit", "Edit", ' data-id="' + esc(c.id) + '"') + chip("tool-del", "Remove", ' data-id="' + esc(c.id) + '"') + "</span></div>" + (TOOL_ERR[c.id] ? '<div class="bd-ed-err">' + esc(TOOL_ERR[c.id]) + "</div>" : "");
});
if (S.toolsAdd) {
var cur = S.toolsEdit ? (E.custom || []).filter(function (c) { return c.id === S.toolsEdit; })[0] : null;
h += '<textarea class="bd-ed-input bd-ed-tools-code" id="bd-tool-code" spellcheck="false">' + esc(cur ? cur.code : TOOL_TEMPLATE) + "</textarea>"
+ (S.toolsMsg ? '<div class="bd-ed-err">' + esc(S.toolsMsg) + "</div>" : "")
+ '<div class="bd-ed-hint">Paste the code Claude gives you. A tool runs inside the back office with full access to your site (and your GitHub key), so only paste code you trust.</div>'
+ '<div class="bd-ed-actions"><button class="bd-ed-btn is-primary" data-act="tool-save">' + (cur ? "Save tool" : "Add tool") + '</button><button class="bd-ed-btn" data-act="tool-cancel">Cancel</button></div>';
} else h += '<div class="bd-ed-actions"><button class="bd-ed-btn" data-act="tool-add">' + I.plus + "Add tool</button></div>";
h += "</div>";
h += '<div class="bd-ed-sec"><div class="bd-ed-actions"><button class="bd-ed-btn is-sm" data-act="tools-reset">Put everything back</button></div><div class="bd-ed-hint">Saved with the site when you publish, so every device gets the same layout.</div></div>';
box.innerHTML = h;
box.classList.toggle("is-at-left", z === "right");
box.hidden = false;
}
function toolsChanged() {
scheduleSave();
render();
renderTools();
}
function layoutWritable() {
var E = editorPrefs();
var L = toolLayout();
Object.keys(L).forEach(function (z) { E.layout[z] = L[z].slice(); });
return E;
}
function toolAction(act, b) {
var E = editorPrefs();
var id = b.getAttribute("data-id");
var z = b.getAttribute("data-z");
var p = b.getAttribute("data-p");
var to = b.getAttribute("data-to");
var mv = function (list, d) {
var i = list.indexOf(id);
if (i < 0 || i + d < 0 || i + d >= list.length) return;
list.splice(i + d, 0, list.splice(i, 1)[0]);
};
if (act === "tools-open") {
S.toolsZone = S.toolsZone === b.getAttribute("data-val") ? null : b.getAttribute("data-val");
S.toolsAdd = false;
S.toolsEdit = null;
S.toolsMsg = "";
renderTools();
return;
}
if (act === "tools-close") {
S.toolsZone = null;
renderTools();
return;
}
if (act === "tool-add" || act === "tool-edit") {
S.toolsAdd = true;
S.toolsEdit = act === "tool-edit" ? id : null;
S.toolsMsg = "";
renderTools();
return;
}
if (act === "tool-cancel") {
S.toolsAdd = false;
S.toolsEdit = null;
S.toolsMsg = "";
renderTools();
return;
}
if (act === "tool-run") {
var x = TOOLS_X[b.getAttribute("data-tool")];
if (x && x.run) {
try {
x.run(toolAPI(), b);
} catch (err) {
setStatus((x.name || x.id) + ": " + ((err && err.message) || err), true);
}
}
return;
}
if (act === "tool-fn") {
var y = TOOLS_X[b.getAttribute("data-tool")];
var fn = y && y.actions && y.actions[b.getAttribute("data-fn")];
if (fn) {
try {
fn(toolAPI(), b);
} catch (err) {
setStatus((y.name || y.id) + ": " + ((err && err.message) || err), true);
}
}
return;
}
snap();
if (act === "tool-save") {
var code = ($("bd-tool-code") || {}).value || "";
var test = { tool: function () { test.n = (test.n || 0) + 1; } };
try {
(new Function("BD", "api", code))(test, toolAPI());
if (!test.n) throw new Error("Nothing was added: the code has to call BD.tool({ … }).");
} catch (err) {
S.undo.pop();
S.toolsMsg = String((err && err.message) || err);
renderTools();
return;
}
if (S.toolsEdit) E.custom.forEach(function (c) { if (c.id === S.toolsEdit) c.code = code; });
else E.custom.push({ id: uid(), code: code });
S.toolsAdd = false;
S.toolsEdit = null;
S.toolsMsg = "";
} else if (act === "tool-del") {
E.custom = E.custom.filter(function (c) { return c.id !== id; });
} else if (act === "tool-up" || act === "tool-down") {
mv(layoutWritable().layout[z], act === "tool-up" ? -1 : 1);
} else if (act === "tool-hide" || act === "sec-hide") {
if (E.hidden.indexOf(id) < 0) E.hidden.push(id);
} else if (act === "tool-show" || act === "sec-show") {
E.hidden = E.hidden.filter(function (x) { return x !== id; });
} else if (act === "tool-move") {
var W = layoutWritable();
W.layout[z] = W.layout[z].filter(function (x) { return x !== id; });
W.layout[to].push(id);
if (z === "right" && S.rightTab === id) S.rightTab = "sel";
if (z === "left" && S.leftTab === id) S.leftTab = "pages";
} else if (act === "sec-up" || act === "sec-down") {
E.order[p] = arrangedSections(p).map(function (s) { return s.id; });
mv(E.order[p], act === "sec-up" ? -1 : 1);
} else if (act === "sec-move") {
if (id.split(":")[0] === to) delete E.moved[id];
else E.moved[id] = to;
} else if (act === "tools-reset") {
E.layout = {};
E.hidden = [];
E.order = {};
E.moved = {};
}
toolsChanged();
}

function renderTop() {
var t = $("bd-top");
if (!S.project) {
t.innerHTML = '<span class="bd-ed-brand">Back office</span><span class="bd-ed-brand">' + esc(REPO.domain || "") + '</span><div class="bd-ed-top-mid"></div><span class="bd-ed-status"></span>';
return;
}
t.innerHTML = toolZoneHTML("top");
setStatus(S.status || "Saved", S.statusWarn);
applyPanels();
}

/* LEFT PANEL */
function field(label, inner) {
return '<label class="bd-ed-field"><span class="bd-ed-label">' + label + "</span>" + inner + "</label>";
}
function input(path, val, type, extra) {
return '<input class="bd-ed-input" data-bind="' + path + '"' + (type ? ' data-type="' + type + '"' : "") + ' value="' + esc(val) + '"' + (extra || "") + ">";
}
function numIn(label, path, val, type, ph) {
return field(label, '<input class="bd-ed-input bd-ed-n" inputmode="decimal" data-bind="' + path + '" data-type="' + (type || "num") + '" value="' + esc(val) + '"' + (ph != null && ph !== "" ? ' placeholder="' + esc(ph) + '"' : "") + ">");
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
function colorIn(label, path, val, fallback, empty) {
return field(label, '<div class="bd-ed-list-row" style="grid-template-columns:minmax(0,1fr) auto"><input type="color" class="bd-ed-input" data-bind="' + path + '" value="' + esc(val || fallback) + '"><button class="bd-ed-btn" style="height:30px" data-act="set" data-path="' + path + '" data-val="">' + (val ? "Reset" : empty || "Ink") + "</button></div>");
}
/* A COLOUR FIELD THAT CAN ALSO BE A GRADIENT (SOLID | GRADIENT, THEN ONE OR TWO COLOURS AND AN ANGLE) */
function fillIn(label, path, val, fallback, empty) {
var g = parseFill(val);
var none = val === "none";
var h = seg("fill.mode|" + path, g ? "grad" : none ? "none" : "solid", [["solid", "Solid"], ["grad", "Gradient"], ["none", "None"]]);
if (g) {
var sv = function (c) { return c === "transparent" ? (g.a !== "transparent" ? g.a : g.b !== "transparent" ? g.b : "#ffffff") : c; };
var ends = g.a === "transparent" ? "xc" : g.b === "transparent" ? "cx" : "cc";
h += '<div class="bd-ed-list-row" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) auto"><input type="color" class="bd-ed-input" aria-label="From" data-bind="fill.a|' + path + '" value="' + esc(sv(g.a)) + '"><input type="color" class="bd-ed-input" aria-label="To" data-bind="fill.b|' + path + '" value="' + esc(sv(g.b)) + '"><input class="bd-ed-input bd-ed-n" aria-label="Angle" inputmode="decimal" data-type="num" data-bind="fill.angle|' + path + '" value="' + esc(g.angle) + '"><button class="bd-ed-btn" style="height:30px" data-act="set" data-path="' + path + '" data-val="">Reset</button></div>'
+ select("fill.ends|" + path, ends, [["cc", "Colour → colour"], ["cx", "Colour → clear"], ["xc", "Clear → colour"]])
+ '<div class="bd-ed-hint">From, to, angle in degrees (180 = top to bottom, 90 = left to right). A clear end fades to see-through.</div>';
} else if (none) h += '<div class="bd-ed-list-row" style="grid-template-columns:minmax(0,1fr) auto"><span class="bd-ed-hint">Nothing painted: see-through.</span><button class="bd-ed-btn" style="height:30px" data-act="set" data-path="' + path + '" data-val="">' + (empty || "Ink") + "</button></div>";
else h += '<div class="bd-ed-list-row" style="grid-template-columns:minmax(0,1fr) auto"><input type="color" class="bd-ed-input" data-bind="' + path + '" value="' + esc(val || fallback) + '"><button class="bd-ed-btn" style="height:30px" data-act="set" data-path="' + path + '" data-val="">' + (val ? "Reset" : empty || "Ink") + "</button></div>";
return field(label, h);
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
var h = '<div class="bd-ed-sec">' + (S.mode === "phone" ? '<div class="bd-ed-hint">Showing phone sizes.</div>' : "")
+ row(field("Main face", select("site.sans", s.sans, BD_FONTS_SANS)), field("Mono face", select("site.mono", s.mono, BD_FONTS_MONO))) + "</div>";
BD_STYLES.forEach(function (k, i) {
if (k[0] === "mono") return;
var st = s.styles[k[0]];
var p = "site.styles." + k[0];
h += '<div class="bd-ed-sec">' + adv("style-" + k[0], k[1] + ' <span class="bd-ed-sum">' + (S.mode === "phone" ? st.sizeM + "/" + st.lhM : st.size + "/" + st.lh) + " · " + (st.font === "mono" ? "mono" : "main") + "</span>",
row(dpIn("Size", p + ".size", p + ".sizeM", st.size, st.sizeM), dpIn("Line", p + ".lh", p + ".lhM", st.lh, st.lhM))
+ row(field("Face", seg(p + ".font", st.font, [["sans", "Main"], ["mono", "Mono"]])), field("Weight", select(p + ".weight", String(st.weight), [["400", "Regular"], ["500", "Medium"], ["700", "Bold"]])))
+ row(field("Case", select(p + ".textCase", st.textCase, [["none", "As typed"], ["uppercase", "UPPER"], ["lowercase", "lower"]])), numIn("Spacing (em)", p + ".tracking", st.tracking))
+ sw("Italic", p + ".italic", st.italic)
+ colorIn("Colour", p + ".color", st.color, s.colors.ink), i === 0) + "</div>";
});
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Blocks</span></div>';
Object.keys(BLOCK_STYLE).forEach(function (t) {
h += '<div class="bd-ed-sec">' + adv("bs-" + t, BD_TYPE_NAME[t], styleFields(t, "site", null, { skip: bsMotionKeys(t), hide: { quote: ["Text"], posts: ["Text"], library: ["Covers", "Book"] }[t] || [] }) + (bsMotionKeys(t).length && t !== "library" ? '<div class="bd-ed-hint">Card looks and gestures are in the Motion tab.</div>' : "")) + "</div>";
});
return h;
}
function motionPanel() {
var s = S.project.site;
var M = s.motion;
var Lz = s.layers;
var h = "";
if (false) {
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Paper sheets</span><div class="bd-ed-hint">How every sheet moves, unless a sheet sets its own. Preview to watch.</div><div class="bd-ed-actions">' + [["paper", "Paper"], ["drag", "Heavy drag"], ["stop", "Stop-motion"], ["quiet", "Quiet"], ["still", "Still"]].map(function (x) {
return '<button class="bd-ed-btn" data-act="ly-preset" data-val="' + x[0] + '">' + x[1] + "</button>";
}).join("") + "</div>"
+ field("A post or page underneath opens with", select("site.layers.trans", Lz.trans || "slide", LAYER_TRANS)) + '<div class="bd-ed-hint">How the sheets above get out of the way, in a straight line. A sheet can set its own in its panel.</div>'
+ field("Feel", select("site.layers.ease", Lz.ease, Object.keys(LAYER_EASE).map(function (k) { return [k, LAYER_EASE[k][0]]; })))
+ row(numIn("Every sheet (ms)", "site.layers.dur", Lz.dur), field("", '<div class="bd-ed-hint">A sheet can set its own speed and leave: tap its title in Pages.</div>'))
+ row(numIn("Out-of-focus blur", "site.layers.focusBlur", Lz.focusBlur))
+ sw("Hard shadow while moving", "site.layers.lift", Lz.lift)
+ field("The post underneath", seg("site.layers.reveal", Lz.reveal, [["focus", "Comes into focus"], ["rise", "Rises"], ["none", "As is"]])) + "</div>";
}
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Animation</span>'
+ row(numIn("Speed (ms)", "site.motion.gDur", M.gDur, "int"), field("Feel", select("site.motion.gEase", M.gEase, [["ease", "Ease"], ["cubic-bezier(.2,.8,.2,1)", "Paper"], ["cubic-bezier(.7,0,.25,1)", "Heavy drag"], ["ease-in-out", "Even"], ["steps(5, end)", "Stop-motion"], ["linear", "Straight"]])))
+ row(numIn("Book hover tease (°)", "site.motion.tease", M.tease), numIn("Book tap opens (°)", "site.motion.open", M.open)) + "</div>";
h += '<div class="bd-ed-sec"><span class="bd-ed-label">Library</span>' + styleFields("library", "site", null, { only: ["book"].concat(bsMotionKeys("library").filter(function (x) { return x !== "hover"; })), flat: true }) + "</div>";
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
if (layersOn() && sheetOf(p.id).k > -1) return;
var g = groups.filter(function (x) { return x.key === p.section; })[0] || other;
g.pages.push(p);
});
if (layersOn()) sheetList().slice().reverse().forEach(function (k, i) {
groups.unshift({ key: "", label: "Sheet · " + (k.name || "Sheet"), pages: (k.pages || []).map(sheetPage).filter(Boolean), sheet: k });
});
if (other.pages.length) groups.push(other);
if (layersOn()) {
pins.label = "Header & footer · not shown with paper sheets";
if (pins.pages.length) groups.push(pins);
} else groups.push(pins);
var h = '<div class="bd-ed-sec"><div class="bd-ed-actions"><button class="bd-ed-btn" data-act="page-add">' + I.plus + 'Page</button><button class="bd-ed-btn" data-act="blog-add">' + I.plus + 'Blog</button>' + (layersOn() ? '<button class="bd-ed-btn" data-act="sheet-add">' + I.plus + "Sheet</button>" : '<button class="bd-ed-btn" data-act="pin-add" data-val="top">' + I.plus + 'Header</button><button class="bd-ed-btn" data-act="pin-add" data-val="bottom">' + I.plus + "Footer</button>") + "</div>";
groups.forEach(function (g) {
if (!g.pages.length && !g.pins && !g.sheet) return;
var gl = g.sheet ? "<b>" + esc(g.sheet.name || "Sheet") + '</b><span class="bd-ed-gtag">' + (sheetPin(g.sheet) ? "pinned" : g.sheet.rest === "open" ? "open" : g.sheet.rest === "still" ? "still" : g.sheet.rest === "peek" ? "peeks" : "hidden") + "</span>" + I.sliders : esc(g.label);
h += '<div class="bd-ed-group' + (g.sheet ? " is-sheet" : "") + (g.sheet && g.pages.some(function (q) { return q.blog; }) ? " is-blog" : "") + (g.pins ? " is-pins" : "") + '" data-gk="' + esc(g.key) + '"' + (g.sheet ? ' data-sheet="' + esc(g.sheet.id) + '"' : "") + '>' + (g.sheet ? '<div class="bd-ed-glabel"><span class="bd-ed-grip is-sheet" data-grip="sheet" data-id="' + esc(g.sheet.id) + '" title="Drag to change the stack order">' + I.grip + '</span><button class="bd-ed-group-label is-btn' + (S.sheetSel === g.sheet.id ? " is-on" : "") + '" data-act="sheet-sel" data-id="' + esc(g.sheet.id) + '">' + gl + "</button></div>" : '<div class="bd-ed-group-label">' + gl + "</div>");
if (g.sheet && !g.pages.length) h += '<div class="bd-ed-hint" style="padding:2px 4px">Empty · tap the name, then Dissolve to remove it.</div>';
if (g.pins && !g.pages.length) h += '<div class="bd-ed-hint" style="padding:2px 4px">None yet. A header or footer shows on every page, with its own columns.</div>';
g.pages.forEach(function (p) {
var st = g.sheet ? sheetStrip(g.sheet) : null;
var tag = p.kind === "pin" ? (p.pin.place === "bottom" ? "foot" : "head") : st && st.id === p.id ? "edge" : p.blog ? "blog" : esc(p.num || "·");
h += '<div class="bd-ed-pgw' + (p.id === S.pageId ? " is-on" : "") + '" data-pid="' + p.id + '">' + (p.kind === "pin" ? '<span class="bd-ed-grip is-off"></span>' : '<span class="bd-ed-grip" data-grip="page" data-id="' + p.id + '" title="Drag to move">' + I.grip + "</span>") + '<button class="bd-ed-pg' + (p.id === S.pageId ? " is-on" : "") + '" data-act="page" data-id="' + p.id + '"><b>' + tag + "</b><span>" + (p.slug === "" && p.kind !== "pin" ? "⌂ " : "") + esc(p.title) + "</span></button></div>";
if (p.blog) {
h += '<button class="bd-ed-pg is-post is-pmaster' + (S.postMaster ? " is-on" : "") + '" data-act="post-master" data-id="' + p.id + '"><b>▤</b><span>All posts · master</span></button>';
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
+ (cp.slug !== "" && cp.kind !== "pin" && !layersOn() ? '<button class="bd-ed-btn" data-act="make-home">' + I.home + "Home</button>" : "")
+ '<button class="bd-ed-btn is-danger" data-act="page-del" aria-label="Delete">' + I.trash + "</button></div>";
if (S.confirm === "page") h += '<div class="bd-ed-confirm">Delete “' + esc(cp.title) + '” for good? <button class="bd-ed-btn is-danger" data-act="page-del-yes">Delete</button><button class="bd-ed-btn" data-act="confirm-no">Keep</button></div>';
return h + "</div>";
}
/* ONE SHEET'S SETTINGS — SHOWN ON THE RIGHT WHEN ITS TITLE IS TAPPED IN PAGES (S.sheetSel) */
function sheetFour(P, b, pre, ph) {
return '<div class="bd-ed-row" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + BOX_SIDES.map(function (sd) {
var k = pre + sd[0] + (ph ? "M" : "");
return '<label class="bd-ed-field"><span class="bd-ed-label">' + sd[1] + '</span><input class="bd-ed-input bd-ed-n" data-bind="' + P + "box." + k + '" value="' + esc(b[k] == null ? "" : b[k]) + '"' + (ph && b[pre + sd[0]] ? ' placeholder="' + esc(b[pre + sd[0]]) + '"' : "") + "></label>";
}).join("") + "</div>";
}
/* THE SIMPLE WAY TO SAY HOW A SHEET MOVES (Starts, When another opens, Strip) — WRITTEN INTO THE SHEET'S rest / out / sliver / peek FIELDS */
function sheetMoveState(k) {
var num = function (x) { return parseFloat(x) || 0; };
var shown = k.rest === "open" || k.rest === "still";
return {
shown: shown,
stay: k.rest === "still",
d: shown ? (k.out === "hide" ? 0 : num(k.sliver)) : (k.rest === "peek" ? num(k.peek) : 0),
m: shown ? (k.out === "hide" ? "" : k.sliverM) : (k.rest === "peek" ? k.peekM : "")
};
}
function sheetMove(k, part, v) {
if (!k) return;
var st = sheetMoveState(k);
function put(d, m) {
var any = d > 0 || (m !== "" && m != null && parseFloat(m) > 0);
if (k.rest === "open" || k.rest === "still") {
k.sliver = d;
k.sliverM = m;
k.out = any ? "peek" : "hide";
} else {
k.peek = d;
k.peekM = m;
k.rest = any ? "peek" : "hidden";
}
}
if (part === "start") {
if (v === "shown") {
k.rest = "open";
put(st.d, st.m);
} else {
k.rest = "peek";
put(st.d > 0 ? st.d : 60, st.m);
}
} else if (part === "other") {
k.rest = v === "stay" ? "still" : "open";
put(st.d, st.m);
} else if (part === "strip") {
put(Math.max(0, parseFloat(v) || 0), st.m);
} else if (part === "stripM") {
put(st.d, v === "" || v == null ? "" : Math.max(0, parseFloat(v) || 0));
}
}
/* THE SHEET AS A MAP: THE GREEN SHEET HOLDS ITS PAGES (RED), THE BLUE WINDOW IS WHAT SHOWS — DRAG IT ONTO THE MAIN PAGE */
function sheetMapHTML(n) {
var k = sheetList()[n];
var panes = sheetPanes(k);
var N = Math.max(1, panes.length);
var x = k.axis === "x";
var mi = Math.max(0, panes.map(function (q) { return q.id; }).indexOf(k.main));
var W = 300;
var sx = x ? 12 : 75;
var sy = 26;
var sw = x ? W - 24 : 150;
var sl = x ? sw / N : Math.min(64, 220 / N);
var shh = x ? 84 : sl * N;
var H = sy + shh + 16;
var g = "#4cba3a";
var r = "#d94545";
var o = '<div class="bd-ed-sec"><span class="bd-ed-title">Layout</span><svg class="bd-smap" viewBox="0 0 ' + W + " " + H + '" width="100%" role="img" aria-label="Sheet, its pages and the window" data-n="' + n + '" data-count="' + N + '" data-axis="' + (x ? "x" : "y") + '" data-sx="' + sx + '" data-sy="' + sy + '" data-sl="' + sl + '" style="touch-action:none;display:block;max-width:360px">';
o += '<text x="' + sx + '" y="16" font-size="11" fill="currentColor" opacity=".6">' + esc(k.name || "Sheet") + " · " + N + (N === 1 ? " page" : " pages") + "</text>";
o += '<rect x="' + sx + '" y="' + sy + '" width="' + sw + '" height="' + shh + '" fill="none" stroke="' + g + '" stroke-width="3"/>';
panes.forEach(function (q, i) {
var px = x ? sx + i * sl + 10 : sx + 14;
var py = x ? sy + 14 : sy + i * sl + 8;
var pw = x ? sl - 20 : sw - 28;
var ph = x ? shh - 28 : sl - 16;
o += '<g data-act="page" data-id="' + q.id + '" style="cursor:pointer"><rect x="' + px + '" y="' + py + '" width="' + pw + '" height="' + ph + '" fill="none" stroke="' + r + '" stroke-width="2.5"/><text x="' + (px + 8) + '" y="' + (py + 16) + '" font-size="11" fill="' + r + '">' + esc(String(q.title || "").slice(0, Math.max(6, Math.floor(pw / 6.5)))) + "</text>" + (i === mi ? '<text x="' + (px + 8) + '" y="' + (py + 30) + '" font-size="10" fill="currentColor" opacity=".6">main</text>' : "") + "</g>";
});
var wx = x ? sx + mi * sl : sx;
var wy = x ? sy : sy + mi * sl;
var ww = x ? sl : sw;
var wh = x ? shh : sl;
o += '<rect data-sheetwin="1" x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" fill="rgba(80,160,185,.35)" stroke="rgba(80,160,185,.9)" stroke-width="1.5" style="cursor:grab"/>';
o += '<text x="' + (x ? wx + ww - 6 : wx + ww - 6) + '" y="' + (wy + wh - 6) + '" text-anchor="end" font-size="10" fill="currentColor" opacity=".7" pointer-events="none">window · drag</text>';
return o + '</svg><div class="bd-ed-hint">The blue window is what shows when the sheet opens. Drag it onto the page that should be the main one. Tap a page to edit it; drag margins and edges on the canvas.</div></div>';
}
(function () {
var drag = null;
document.addEventListener("pointerdown", function (e) {
var w = e.target && e.target.closest && e.target.closest("[data-sheetwin]");
if (!w) return;
var svg = w.ownerSVGElement;
e.preventDefault();
drag = { w: w, svg: svg, x0: parseFloat(w.getAttribute("x")), y0: parseFloat(w.getAttribute("y")), px: e.clientX, py: e.clientY, id: e.pointerId };
try { w.setPointerCapture(e.pointerId); } catch (err) {}
});
document.addEventListener("pointermove", function (e) {
if (!drag) return;
var d = drag.svg.dataset;
var sc = drag.svg.getBoundingClientRect().width / (drag.svg.viewBox.baseVal.width || 300);
var x = d.axis === "x";
var sl = parseFloat(d.sl);
var N = +d.count;
if (x) drag.w.setAttribute("x", Math.max(parseFloat(d.sx), Math.min(parseFloat(d.sx) + sl * (N - 1), drag.x0 + (e.clientX - drag.px) / sc)));
else drag.w.setAttribute("y", Math.max(parseFloat(d.sy), Math.min(parseFloat(d.sy) + sl * (N - 1), drag.y0 + (e.clientY - drag.py) / sc)));
});
function end(e) {
if (!drag) return;
var d = drag.svg.dataset;
var x = d.axis === "x";
var sl = parseFloat(d.sl);
var cur = x ? parseFloat(drag.w.getAttribute("x")) - parseFloat(d.sx) : parseFloat(drag.w.getAttribute("y")) - parseFloat(d.sy);
var i = Math.max(0, Math.min(+d.count - 1, Math.round(cur / sl)));
var k = sheetList()[+d.n];
var panes = k ? sheetPanes(k) : [];
drag = null;
if (k && panes[i] && e.type !== "pointercancel") {
snap();
k.main = panes[i].id;
changed();
} else render();
}
document.addEventListener("pointerup", end);
document.addEventListener("pointercancel", end);
})();
/* THE LAYOUT DRAWING — THE WINDOW (BLUE), THE SHEET AT ITS MARGINS (GREEN), ITS PAGES (RED). EVERYTHING IS DRAGGED HERE AND SNAPS TO THE 5% GRID */
/* THE LAYOUT MODEL — EVERYTHING IN WINDOW PX: THE WINDOW IS (0,0)-(W,H), THE SHEET IS LAID FLAT AT ITS MARGINS, THE WINDOW SITS ON THE ★ PAGE */
function layM(v, phone, box, s) {
BOX_VIEW = v;
try {
return gridPx(boxLen(boxVal(box || {}, "m" + s, phone), s));
} finally {
BOX_VIEW = null;
}
}
var LAY_C = { sheet: "#7b5ea7", sheetFill: "rgba(123,94,167,.07)", page: "#6b6862", pageFill: "rgba(255,255,255,.9)", win: "#d9573b", winFill: "rgba(217,87,59,.07)", half: "#d9573b", salmon: "#ebb0a0" };
/* THE ★ PAGE: THE ONE THE WINDOW SITS ON AT REST */
function layStar(k, phone) {
var pages = (k.pages || []).map(sheetPage).filter(Boolean);
var id = k.rest === "peek" ? (sheetStrip(k) || {}).id : sheetMain(k, phone);
var i = pages.map(function (q) { return q.id; }).indexOf(id);
return i < 0 ? 0 : i;
}
/* KEEP EVERY SHEET TIDY: NO MISSING PAGES, AND A STRIP LIES WHERE THE EXPORT PUTS IT (LEFT/TOP EDGE = LAST, RIGHT/BOTTOM EDGE = FIRST) */
/* GONE FOR GOOD: NOTES, PRODUCT AND PAGE TITLE BLOCKS (WALID'S REVIEW) */
function killBlocks(p) {
var gone = { notes: 1, product: 1, ptitle: 1 };
Object.keys(p.pages || {}).forEach(function (id) {
var q = p.pages[id];
if (q && Array.isArray(q.els)) q.els = q.els.filter(function (e) { return !(e && gone[e.type]); });
});
}
function sheetFix(p) {
var site = p && p.site;
if (!site || !site.sheets) return;
/* STRAIGHT LINES ONLY: NO FOLD, CONCERTINA OR TILT; THE SITE DECIDES HOW A PAGE OPENS, NOT THE PAGE */
var okT = function (x) { return LAYER_TRANS.some(function (o) { return o[0] === x; }); };
if (site.layers) {
site.layers.tilt = 0;
if (!okT(site.layers.trans)) site.layers.trans = "slide";
}
Object.keys(p.pages || {}).forEach(function (id) {
var q = p.pages[id];
if (q) { delete q.trans; delete q.transDur; }
});
site.sheets.forEach(function (k) { if (k && k.lv && !okT(k.lv)) k.lv = ""; });
site.sheets.forEach(function (k) {
if (!k) return;
k.pages = (k.pages || []).filter(function (id, i, a) { var q = p.pages[id]; return q && q.kind !== "pin" && a.indexOf(id) === i; });
if (k.pin && (k.pages.indexOf(k.pin) < 0 || k.pages.length < 2 || k.rest === "peek")) k.pin = "";
if (k.pin && k.rest !== "still") k.rest = "still";
if (k.pinM && k.pinM !== "none" && (k.pages || []).indexOf(k.pinM) < 0) delete k.pinM;
if (k.revM && sheetPanes(k).length !== 2) delete k.revM;
if (k.hover === "nudge" && k.rest !== "peek") k.hover = "";
/* ONE SHEET, ONE PIECE: PAGES ON IT NEVER OWN GEOMETRY. NO OWN SCROLL, NO OWN MARGINS, NO STAYS-PUT BAND */
delete k.pinMode;
delete k.pinModeM;
delete k.pinPad;
k.pages.forEach(function (id) {
var q = p.pages[id];
if (!q) return;
delete q.scroll;
delete q.sheetBg;
delete q.indep;
delete q.trans;
delete q.transDur;
});
if (k.restPage && k.pages.indexOf(k.restPage) < 0) k.restPage = "";
if (k.main && k.pages.indexOf(k.main) < 0) k.main = "";
if (k.mainM && k.pages.indexOf(k.mainM) < 0) k.mainM = "";
if (k.rest !== "peek" || k.pages.length < 2) return;
var id = k.restPage || k.pages[0];
k.restPage = id;
var want = k.edge === "right" || k.edge === "bottom" ? 0 : k.pages.length - 1;
var i = k.pages.indexOf(id);
if (i === want) return;
k.pages.splice(i, 1);
k.pages.splice(want, 0, id);
});
}
/* PINNED SHEETS LIE ABOVE THE WHOLE STACK AND DON'T COUNT FOR HOME; HOME IS THE FIRST PAGE OF THE FIRST SHEET THAT ISN'T PINNED, AND IT OWNS THE ADDRESS "/" */
/* ONCE: A SHEET WHOSE PAGE HOLDS THE SHEET MENU PINS THAT PAGE — THE MENU NEVER LEAVES THE WINDOW */
function layPinMenuIn(p) {
((p.site || {}).sheets || []).forEach(function (k) {
if (!k || k.pin || (k.pages || []).length < 2 || k.rest === "peek") return;
var id = (k.pages || []).filter(function (x) { var q = p.pages[x]; return q && (q.els || []).some(function (e) { return e.type === "sheetmenu"; }); })[0];
if (id) k.pin = id;
});
}
/* ONCE: A PAGE LYING ON A SHEET NEVER OWNS GEOMETRY. THE START MARGIN OF THE FIRST PAGE AND THE END MARGIN OF THE LAST PAGE MOVE ONTO THE SHEET (WHEN THE SHEET HAS NONE); AN INSET ON A SHEET THAT HAD NO OWN-PAPER PAGE BECOMES PADDING; EVERYTHING ELSE IS DROPPED BY sheetFix */
function layOneIn(p) {
((p.site || {}).sheets || []).forEach(function (k) {
if (!k) return;
var ids = (k.pages || []).filter(function (id) { return p.pages[id] && p.pages[id].kind !== "pin" && !p.pages[id].parent; });
if (!ids.length) return;
k.box = k.box || {};
var x = k.axis === "x";
var st = x ? "l" : "t", en = x ? "r" : "b";
var first = p.pages[ids[0]], last = p.pages[ids[ids.length - 1]];
["", "M"].forEach(function (m) {
var a = first.box && first.box["m" + st + m], z = last.box && last.box["m" + en + m];
if (a != null && a !== "" && (k.box["m" + st + m] == null || k.box["m" + st + m] === "")) k.box["m" + st + m] = a;
if (z != null && z !== "" && (k.box["m" + en + m] == null || k.box["m" + en + m] === "")) k.box["m" + en + m] = z;
});
ids.forEach(function (id) {
var q = p.pages[id], b = q.box;
if (!b || (q.indep && k.pin)) return;
["t", "r", "b", "l"].forEach(function (sd) {
["", "M"].forEach(function (m) {
var v = b["m" + sd + m];
if (v == null || v === "" || (b["p" + sd + m] != null && b["p" + sd + m] !== "")) return;
if ((q === first && sd === st) || (q === last && sd === en)) return;
if (/%\s*$/.test(String(v))) return;
b["p" + sd + m] = v;
});
});
});
});
}
function sheetPinOrder(p) {
var site = p && p.site;
if (!site || !site.sheets) return;
var a = site.sheets.filter(function (k) { return k && k.pin; });
var b = site.sheets.filter(function (k) { return !(k && k.pin); });
var all = a.concat(b);
if (all.some(function (k, i) { return k !== site.sheets[i]; })) site.sheets.splice.apply(site.sheets, [0, site.sheets.length].concat(all));
}
function homeSync(p) {
var site = p && p.site;
if (!site || !site.layers || !site.layers.on || !site.sheets || !site.sheets.length) return;
var keep = S.project;
S.project = p;
var id = sheetHomeSheet();
S.project = keep;
var q = id && p.pages[id];
if (!q || q.slug === "" || q.kind === "pin" || q.parent) return;
p.order.forEach(function (x) {
var o = p.pages[x];
if (o && o.slug === "" && o.id !== q.id) o.slug = uniqueSlugIn(p, o.title, o.id);
});
q.slug = "";
}
function uniqueSlugIn(p, title, id) {
var base = String(title || "page").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "page";
var taken = {};
p.order.forEach(function (x) { if (x !== id && p.pages[x]) taken[p.pages[x].slug] = true; });
var s = base, n = 2;
while (taken[s]) s = base + "-" + n++;
return s;
}
function sheetFull(k) {
return (k.pages || []).filter(function (id) { var q = sheetPage(id); return q && !q.parent; }).length >= 2;
}
/* ON EVERY LOAD: A PARKED STRIP BECOMES PLAIN PAPER — ITS ★ PAGE KEEPS THE SAME VISIBLE SLICE AS A MARGIN AT THE OUTER END OF THE SHEET, THE JOIN BETWEEN THE PAGES LIES ON THE WINDOW'S EDGE */
function layUnparkIn(p) {
((p.site || {}).sheets || []).forEach(function (k) {
if (!k || k.rest !== "peek") return;
var ids = (k.pages || []).filter(function (id) { return p.pages[id] && p.pages[id].kind !== "pin" && !p.pages[id].parent; });
if (!ids.length) { k.rest = "open"; k.restPage = ""; return; }
var id = k.restPage && ids.indexOf(k.restPage) > -1 ? k.restPage : ids[0];
var star = ids.indexOf(id), N = ids.length;
k.box = k.box || {};
var W = 1280, H = 800, WM = 390, HM = 780;
[false, true].forEach(function (ph) {
var e = (ph ? k.edgeM : k.edge) || (ph ? "top" : "left");
var ax = ph ? (e === "left" || e === "right" ? "x" : "y") : (k.axis === "x" ? "x" : "y");
var L = ph ? (ax === "x" ? WM : HM) : (ax === "x" ? W : H);
var pk = Math.max(0, parseFloat(ph ? (k.peekM === "" || k.peekM == null ? k.peek : k.peekM) : k.peek) || 0);
var aS = ax === "x" ? "l" : "t", aE = ax === "x" ? "r" : "b";
var M = ph ? "M" : "";
var pct = Math.round((L - Math.min(L, pk)) / L * 10000) / 100;
if (pct <= 0) return;
var key = star === N - 1 ? aE : aS;
k.box["m" + key + M] = pct + "%";
});
k.rest = "still";
k.main = id;
k.restPage = "";
});
}
/* ONCE: A PINNED SHEET WHOSE PHONE MARGINS CUT IT INTO A BAND (A BIG CROSS MARGIN) MOVES THE BAND TO THE PINNED PAGE ITSELF AND STAYS PUT ON PHONE, SO THE OTHER PAGE IS NO LONGER SQUEEZED INTO THE BAND */
function layStayIn(p) {
}
/* ONCE: A STRIP THAT PEEKS FROM THE LEFT/TOP LIES AT THE END OF ITS SHEET, FROM THE RIGHT/BOTTOM AT THE START, SO THE SPREAD READS THE RIGHT WAY ROUND */
function layMigrateOrderIn(p) {
((p.site || {}).sheets || []).forEach(function (k) {
if (!k || k.rest !== "peek") return;
var st = (k.pages || []).indexOf(k.restPage) > -1 ? { id: k.restPage } : (k.pages || []).length ? { id: k.pages[0] } : null;
if (!st || (k.pages || []).length < 2) return;
var e = k.edge || "left";
var i = k.pages.indexOf(st.id);
var want = e === "left" || e === "top" ? k.pages.length - 1 : 0;
if (i === want) return;
k.pages.splice(i, 1);
k.pages.splice(want, 0, st.id);
});
}
function sheetGeo(n, phone) {
var K = sheetList();
var k = K[n];
var v = gridView(phone);
var ax = sheetAx(k, phone);
if (phone && sheetStrip(k)) ax = k.edgeM === "left" || k.edgeM === "right" ? "x" : "y";
var L = ax === "x" ? v.w : v.h;
var C = ax === "x" ? v.h : v.w;
var pages = phone && sheetRev(k) ? sheetPanes(k, true) : (k.pages || []).map(sheetPage).filter(Boolean);
var N = Math.max(1, pages.length);
var star = layStar(k, phone);
var ins = sheetBoxIns(k, n, phone);
var m = {};
["l", "r", "t", "b"].forEach(function (s) { m[s] = layM(v, phone, k.box, s); });
var aS = ax === "x" ? "l" : "t", aE = ax === "x" ? "r" : "b", cS = ax === "x" ? "t" : "l", cE = ax === "x" ? "b" : "r";
var insA = { l: ins.left, r: ins.right, t: ins.top, b: ins.bottom };
var mStart = m[aS], mEnd = m[aE];
var peek = parseFloat(phone ? k.peekM : k.peek) || 0;
var edge = (phone ? k.edgeM : k.edge) || "left";
var cutSide = "";
if (k.rest === "peek" && N > 1) {
cutSide = star === N - 1 ? "start" : star === 0 ? "end" : "";
if (cutSide === "start") mEnd = Math.max(0, L - peek);
if (cutSide === "end") mStart = Math.max(0, L - peek);
}
var ox = star * L;
var a0 = mStart - ox + insA[aS], a1 = N * L - mEnd - ox - insA[aE];
var c0 = m[cS] + insA[cS], c1 = C - m[cE] - insA[cE];
var R = function (A0, A1, C0, C1) { return ax === "x" ? { l: A0, r: A1, t: C0, b: C1 } : { l: C0, r: C1, t: A0, b: A1 }; };
var rect = R(a0, a1, c0, c1);
var slots = pages.map(function (q, i) {
var s0 = Math.max(i * L - ox + insA[aS], a0), s1 = Math.min((i + 1) * L - ox - (i === N - 1 ? insA[aE] : 0), a1);
var sl = R(s0, s1, c0, c1);
var pm = {};
["l", "r", "t", "b"].forEach(function (s) { pm[s] = layM(v, phone, q.box, s); });
return { q: q, i: i, slot: sl, box: { l: sl.l + pm.l, r: sl.r - pm.r, t: sl.t + pm.t, b: sl.b - pm.b }, pm: pm };
});
/* WHERE THE SHEET GOES WHEN A PAGE UNDERNEATH OPENS */
var ghost = null, away = null;
if (k.rest === "open" || k.rest === "still") {
var out = k.out || "peek";
var sl = k.rest === "open" ? parseFloat(phone ? k.sliverM : k.sliver) : NaN;
if (isNaN(sl)) sl = k.rest === "open" ? parseFloat(k.sliver) || 0 : 0;
if (k.rest === "open") {
var eIns = { left: ins.left, right: ins.right, top: ins.top, bottom: ins.bottom }[edge] || 0;
var vis = out === "hide" ? 0 : eIns + sl;
var sh = 0;
if (edge === "left") sh = -(rect.r - vis);
else if (edge === "right") sh = (v.w - rect.l) - vis;
else if (edge === "top") sh = -(rect.b - vis);
else sh = (v.h - rect.t) - vis;
var dx = edge === "left" || edge === "right" ? sh : 0, dy = edge === "top" || edge === "bottom" ? sh : 0;
ghost = { l: rect.l + dx, r: rect.r + dx, t: rect.t + dy, b: rect.b + dy };
away = { edge: edge, vis: vis, hide: out === "hide" };
}
}
return { k: k, n: n, v: v, ax: ax, L: L, C: C, N: N, pages: pages, star: star, ins: ins, m: m, mStart: mStart, mEnd: mEnd, cutSide: cutSide, rect: rect, slots: slots, ghost: ghost, away: away, phone: phone, hidden: k.rest === "hidden" };
}
/* WRITE THE OLD FIELDS FROM THE DRAWN GEOMETRY. g may carry: mStart, mEnd, mCS, mCE (px), star (index), away ({edge, vis} | "stay") */
function layWrite(n, phone, g) {
var G = sheetGeo(n, phone);
var k = G.k;
var v = G.v;
var ax = G.ax;
var aS = ax === "x" ? "l" : "t", aE = ax === "x" ? "r" : "b", cS = ax === "x" ? "t" : "l", cE = ax === "x" ? "b" : "r";
var mStart = g.mStart != null ? g.mStart : G.mStart;
var mEnd = g.mEnd != null ? g.mEnd : G.mEnd;
var mCS = g.mCS != null ? g.mCS : G.m[cS];
var mCE = g.mCE != null ? g.mCE : G.m[cE];
var star = g.star != null ? g.star : G.star;
var N = G.N;
var spw = G.pages[star];
var L = G.L;
var pct = function (px, side) { var len = side === "l" || side === "r" ? v.w : v.h; return px < 0.5 ? (phone ? "0" : "") : Math.round(px / len * 10000) / 100 + "%"; };
var M = phone ? "M" : "";
k.box = k.box || {};
var sp = G.pages[star];
if (phone) {
/* THE PHONE ONLY HAS ITS OWN NUMBERS: MARGINS, ★ PAGE (mainM) AND SPREAD (axisM) */
k.mainM = spw ? spw.id : "";
k.box["m" + aS + M] = pct(mStart, aS);
k.box["m" + aE + M] = pct(mEnd, aE);
if (k.rest === "open" && g.away && g.away !== "stay") {
k.edgeM = g.away.edge;
var eInsM = { left: G.ins.left, right: G.ins.right, top: G.ins.top, bottom: G.ins.bottom }[g.away.edge] || 0;
k.sliverM = g.away.vis <= 0.5 ? "" : Math.max(0, Math.round(g.away.vis - eInsM));
}
} else {
if (k.rest === "peek") { k.rest = "still"; k.restPage = ""; }
if (k.rest !== "hidden" && g.away !== undefined) {
if (g.away === "stay" || !g.away) k.rest = "still";
else {
k.rest = "open";
k.edge = g.away.edge;
var eIns = { left: G.ins.left, right: G.ins.right, top: G.ins.top, bottom: G.ins.bottom }[g.away.edge] || 0;
if (g.away.vis <= 0.5) { k.out = "hide"; k.sliver = ""; }
else { k.out = "peek"; k.sliver = Math.max(0, Math.round(g.away.vis - eIns)); }
}
}
k.main = sp ? sp.id : "";
k.box["m" + aS] = pct(mStart, aS);
k.box["m" + aE] = pct(mEnd, aE);
}
k.box["m" + cS + M] = pct(mCS, cS);
k.box["m" + cE + M] = pct(mCE, cE);
}
/* THE LAYOUT DRAWING — DRAWN FROM sheetGeo; EVERY HANDLE WRITES THROUGH layWrite */
function layoutDrawing(n, pg, mode) {
var phone = S.mode === "phone";
var G = sheetGeo(n, phone);
var k = G.k;
var v = G.v;
/* THE CANVAS IS ALWAYS TWO WINDOWS WIDE AND TWO HIGH: FOUR HALVES. THE WINDOW SITS ON ONE OF THEM, THE SHEET LIES OVER TWO NEIGHBOURS (BOTH IN A COLUMN, OR BOTH IN A ROW) */
var cc = G.N === 2 && G.ax === "x" ? G.star : (+(phone ? k.vcM : k.vc) === 1 ? 1 : 0);
var rr = G.N === 2 && G.ax === "y" ? G.star : (+(phone ? k.vrM : k.vr) === 1 ? 1 : 0);
var B = { l: -cc * v.w, t: -rr * v.h, r: (2 - cc) * v.w, b: (2 - rr) * v.h };
var pad = v.w * 0.05;
B = { l: B.l - pad, t: B.t - pad - v.h * 0.03, r: B.r + pad, b: B.b + pad + v.h * 0.03 };
var DW = 380;
var sc = DW / (B.r - B.l);
var VH = Math.round((B.b - B.t) * sc);
var r1 = function (x) { return Math.round(x * 10) / 10; };
var X = function (x) { return r1((x - B.l) * sc); };
var Y = function (y) { return r1((y - B.t) * sc); };
var Lx = function (x) { return r1(x * sc); };
var o = '<svg class="bd-lay" viewBox="0 0 ' + DW + " " + VH + '" width="100%" role="img" aria-label="Layout of the window, the sheet and its pages" data-n="' + n + '" data-bx="' + B.l + '" data-by="' + B.t + '" data-sc="' + sc + '" data-w="' + v.w + '" data-h="' + v.h + '" data-dw="' + DW + '" data-axis="' + G.ax + '" style="display:block;touch-action:none;color:inherit">';
/* THE WINDOW'S GRID, TILED OVER EVERYTHING */
var sx = v.w / 20, sy = v.h / 20;
for (var x = Math.floor(B.l / sx) * sx; x <= B.r; x += sx) {
var ix = Math.round(x / sx), hx = ((ix % 20) + 20) % 20 === 10, qx = ix % 5 === 0;
o += '<line x1="' + X(x) + '" y1="0" x2="' + X(x) + '" y2="' + VH + '" stroke="' + (hx ? LAY_C.half : "currentColor") + '" stroke-opacity="' + (hx ? .22 : qx ? .09 : .035) + '" stroke-width="' + (hx ? 1 : .6) + '"/>';
}
for (var y = Math.floor(B.t / sy) * sy; y <= B.b; y += sy) {
var iy = Math.round(y / sy), hy = ((iy % 20) + 20) % 20 === 10, qy = iy % 5 === 0;
o += '<line x1="0" y1="' + Y(y) + '" x2="' + DW + '" y2="' + Y(y) + '" stroke="' + (hy ? LAY_C.half : "currentColor") + '" stroke-opacity="' + (hy ? .22 : qy ? .09 : .035) + '" stroke-width="' + (hy ? 1 : .6) + '"/>';
}
var rect = function (r, attrs) { return '<rect x="' + X(r.l) + '" y="' + Y(r.t) + '" width="' + Lx(Math.max(0, r.r - r.l)) + '" height="' + Lx(Math.max(0, r.b - r.t)) + '" ' + attrs + "/>"; };
/* THE FOUR HALVES */
var cellsV = "", cellsHit = "";
for (var ci = 0; ci < 2; ci++) for (var ri = 0; ri < 2; ri++) {
var cr = { l: (ci - cc) * v.w, r: (ci - cc + 1) * v.w, t: (ri - rr) * v.h, b: (ri - rr + 1) * v.h };
var isWin = ci === cc && ri === rr;
cellsV += rect(cr, 'fill="rgba(255,255,255,' + (isWin ? 0 : .45) + ')" stroke="currentColor" stroke-opacity=".28" stroke-dasharray="6 4"');
if (!isWin) {
cellsV += '<text x="' + r1(X(cr.l) + Lx(cr.r - cr.l) / 2) + '" y="' + r1(Y(cr.t) + Lx(cr.b - cr.t) / 2 + 3) + '" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity=".4">tap · window here</text>';
cellsHit += '<g data-act="lay-cell" data-i="' + n + '" data-c="' + ci + '" data-r="' + ri + '" style="cursor:pointer">' + rect(cr, 'fill="transparent"') + "</g>";
}
}
o += cellsV;
/* THIS SHEET */
o += rect(G.rect, 'rx="12" fill="' + LAY_C.sheetFill + '" stroke="' + LAY_C.sheet + '" stroke-opacity=".7" stroke-width="1.5"' + (G.hidden ? ' stroke-dasharray="6 4"' : ""));
var card = function (b, q, cur, isStar, below) {
var bx = X(b.l), by = Y(b.t), bw = Lx(Math.max(0, b.r - b.l)), bh = Lx(Math.max(0, b.b - b.t));
var c = '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="9" fill="#fff" stroke="rgba(0,0,0,.14)" stroke-width="1"/>';
if (bw > 40 && bh > 30) {
c += '<rect x="' + r1(bx + 10) + '" y="' + r1(by + 10) + '" width="' + r1(bw * .42) + '" height="5" rx="2.5" fill="rgba(0,0,0,.2)"/>';
[.8, .66, .74].forEach(function (f, i) { if (by + 26 + i * 8 < by + bh - 10) c += '<rect x="' + r1(bx + 10) + '" y="' + r1(by + 22 + i * 8) + '" width="' + r1((bw - 20) * f) + '" height="3" rx="1.5" fill="rgba(0,0,0,.1)"/>'; });
if (bh > 80) c += '<rect x="' + r1(bx + 10) + '" y="' + r1(by + bh * .44) + '" width="' + r1(bw - 20) + '" height="' + r1(bh * .3) + '" rx="6" fill="' + LAY_C.salmon + '"/>';
}
if (below === null) return c;
var nm = esc(String(q.title || "").slice(0, Math.max(4, Math.floor(bw / 6.2))));
var tag = (isStar ? "★ " : "") + nm + "";
if (below) return c + '<text x="' + r1(bx + bw / 2) + '" y="' + r1(by + bh + 14) + '" text-anchor="middle" font-size="10.5" fill="' + (cur ? "#1f1e1c" : "#6b6862") + '"' + (cur ? ' font-weight="600"' : "") + ">" + tag + "</text>";
return c + '<text x="' + r1(bx + 10) + '" y="' + r1(by + bh - 9) + '" font-size="10.5" fill="' + (cur ? "#1f1e1c" : "#6b6862") + '"' + (cur ? ' font-weight="600"' : "") + ">" + tag + "</text>";
};
/* ITS PAGES */
var focusId = pg && G.pages.some(function (q) { return q.id === pg.id; }) ? pg.id : (G.pages[G.star] || {}).id;
var rmBtns = "";
var swapHits = "";
var flagBtns = "";
var handles = "";
var dimPass = "";
var brightPass = "";
var hnd = function (kind, side, cx, cy, col, extra) {
var vert = side === "l" || side === "r";
return '<g data-lh="' + kind + '" data-s="' + side + '" ' + (extra || "") + ' style="cursor:' + (vert ? "ew-resize" : "ns-resize") + '"><rect x="' + r1(cx - (vert ? 10 : 20)) + '" y="' + r1(cy - (vert ? 20 : 10)) + '" width="' + (vert ? 20 : 40) + '" height="' + (vert ? 40 : 20) + '" fill="transparent"/><rect x="' + r1(cx - (vert ? 2.5 : 9)) + '" y="' + r1(cy - (vert ? 9 : 2.5)) + '" width="' + (vert ? 5 : 18) + '" height="' + (vert ? 18 : 5) + '" rx="3" fill="' + col + '" stroke="#fff" stroke-width="1.2"/></g>';
};
G.slots.forEach(function (s) {
var q = s.q;
var b = s.box;
var cur = q.id === focusId;
var isStar = s.i === G.star;
var w = Lx(Math.max(0, b.r - b.l));
var belowLbl = G.ax === "x";
dimPass += "<g>" + card(b, q, cur, isStar, belowLbl) + "</g>";
brightPass += card(b, q, cur, isStar, null);
var cx = X(b.r) - 9, cy = Y(b.t) + 9;
var scx = Math.floor(((s.slot.l + s.slot.r) / 2 + cc * v.w) / v.w), scy = Math.floor(((s.slot.t + s.slot.b) / 2 + rr * v.h) / v.h);
var inWin = scx === cc && scy === rr;
if (G.N === 2) swapHits += '<g data-swap="' + s.i + '" data-i="' + n + '" data-bx="' + X(b.l) + '" data-by="' + Y(b.t) + '" data-bw="' + Lx(Math.max(0, b.r - b.l)) + '" data-bh="' + Lx(Math.max(0, b.b - b.t)) + '"' + (inWin ? "" : ' data-act="lay-cell" data-c="' + scx + '" data-r="' + scy + '"') + ' style="cursor:grab">' + rect(b, 'fill="transparent"') + "</g>";
{
/* FLAGS ON THE CARD: PIN · INDEPENDENT · OWN SCROLL — DRAWN IN THE CARD'S HALF SO THEY ALWAYS FIT */
var pinned = sheetPin(k, phone) === q.id;
var fl = [["pin", "PIN", pinned, true]];
var fx = X(s.slot.l) + 5;
var fy = G.ax === "x" ? Y(s.slot.b) - 22 : Y(s.slot.t) + 5;
if (pinned) flagBtns += '<rect x="' + r1(X(b.l)) + '" y="' + r1(Y(b.t) + 4) + '" width="4" height="' + r1(Math.max(0, Lx(b.b - b.t) - 8)) + '" rx="2" fill="#1f1e1c" pointer-events="none"/>';
fl.forEach(function (f) {
if (!f[3]) return;
flagBtns += '<g data-act="lay-flag" data-f="' + f[0] + '" data-i="' + n + '" data-id="' + q.id + '" style="cursor:pointer"><rect x="' + r1(fx - 3) + '" y="' + r1(fy - 5) + '" width="' + (f[1].length * 6 + 12) + '" height="26" fill="transparent"/><rect x="' + r1(fx) + '" y="' + r1(fy) + '" width="' + (f[1].length * 6 + 6) + '" height="15" rx="7.5" fill="' + (f[2] ? "#1f1e1c" : "#fff") + '" stroke="#1f1e1c" stroke-width="1"/><text x="' + r1(fx + (f[1].length * 6 + 6) / 2) + '" y="' + r1(fy + 10.5) + '" text-anchor="middle" font-size="8.5" font-weight="600" letter-spacing=".4" fill="' + (f[2] ? "#fff" : "#1f1e1c") + '">' + f[1] + "</text></g>";
fx += f[1].length * 6 + 12;
});
}
rmBtns += '<g data-act="lay-rm" data-i="' + n + '" data-id="' + q.id + '" style="cursor:pointer"><circle cx="' + cx + '" cy="' + cy + '" r="7" fill="#6b6862"/><path d="M' + (cx - 3) + " " + (cy - 3) + "l6 6m0 -6l-6 6" + '" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></g>';
});
o += '<clipPath id="bd-lay-win-' + n + '"><rect x="' + X(0) + '" y="' + Y(0) + '" width="' + Lx(v.w) + '" height="' + Lx(v.h) + '" rx="9"/></clipPath>';
o += '<g opacity=".55">' + dimPass + '</g><g clip-path="url(#bd-lay-win-' + n + ')" pointer-events="none">' + brightPass + "</g>";
o += cellsHit;
if (!sheetFull(k)) o += '<g data-dropsheet="' + n + '">' + rect(G.rect, 'fill="transparent"') + "</g>";
o += swapHits + rmBtns + flagBtns;
/* THE WINDOW */
o += rect({ l: 0, t: 0, r: v.w, b: v.h }, 'rx="9" fill="' + LAY_C.winFill + '" stroke="' + LAY_C.win + '" stroke-width="2.5" pointer-events="none"');
o += '<text x="' + (X(0) + 6) + '" y="' + (Y(0) - 5) + '" font-size="10" font-weight="600" fill="' + LAY_C.win + '">window</text>';
/* THE SHEET'S EDGES */
var pgSlot = mode === "page" && pg ? G.slots.filter(function (x) { return x.q.id === pg.id; })[0] : null;
if (pgSlot) {
var pb = pgSlot.box;
var pid = 'data-id="' + pg.id + '"';
handles += hnd("page", "l", X(pb.l), Y((pb.t + pb.b) / 2), LAY_C.page, pid) + hnd("page", "r", X(pb.r), Y((pb.t + pb.b) / 2), LAY_C.page, pid) + hnd("page", "t", X((pb.l + pb.r) / 2), Y(pb.t), LAY_C.page, pid) + hnd("page", "b", X((pb.l + pb.r) / 2), Y(pb.b), LAY_C.page, pid);
} else if (!G.hidden) {
var r = G.rect;
handles += hnd("sheet", "l", X(r.l), Y((r.t + r.b) / 2), LAY_C.sheet) + hnd("sheet", "r", X(r.r), Y((r.t + r.b) / 2), LAY_C.sheet) + hnd("sheet", "t", X((r.l + r.r) / 2), Y(r.t), LAY_C.sheet) + hnd("sheet", "b", X((r.l + r.r) / 2), Y(r.b), LAY_C.sheet);
}
return o + handles + "</svg>";
}
function sheetLayoutHTML(n, skipAxis) {
var k = sheetList()[n];
var P = "site.sheets." + n + ".";
var phone = S.mode === "phone";
var used = sheetUsed();
var free = S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (q) { return q && q.kind !== "pin" && !q.parent && used.indexOf(q.id) < 0; });
var G = sheetGeo(n, phone);
var h = skipAxis ? "" : field("Pages spread", seg(P + (S.mode === "phone" ? "axisM" : "axis"), sheetAx(k, S.mode === "phone"), [["y", "Vertical"], ["x", "Horizontal"]]));
h += '<div class="bd-lay-box">' + layoutDrawing(n, curPage()) + "</div>";
if (!sheetFull(k)) h += '<button class="bd-ed-btn" data-act="lay-add" data-i="' + n + '">+ page</button>';
if (S.layAdd === n) {
h += '<div class="bd-ed-sec" style="margin:0"><span class="bd-ed-label">Put on this sheet</span>' + free.map(function (q) { return '<button class="bd-ed-btn" style="margin:2px 4px 2px 0" data-act="sheet-page-add" data-i="' + n + '" data-id="' + q.id + '">' + esc(q.title) + "</button>"; }).join("") + '<button class="bd-ed-btn" style="margin:2px 0" data-act="lay-new" data-i="' + n + '">' + I.plus + "New page</button>" + (free.length ? "" : '<div class="bd-ed-hint">Every page is already on a sheet.</div>') + "</div>";
}
return h;
}
(function () {
var d = null;
/* LAYERS PANE: DRAG A PAGE (OR A SHEET) BY ITS GRIP */
(function () {
var D = null;
function mark(x, y) {
var el = document.elementFromPoint(x, y);
document.querySelectorAll(".is-drop-before, .is-drop-after, .is-drop-in, .is-drop-card").forEach(function (n) { n.classList.remove("is-drop-before", "is-drop-after", "is-drop-in", "is-drop-card"); });
D.row = D.grp = null;
D.card = null;
D.after = false;
if (!el) return;
var cg = D.kind === "page" && el.closest ? el.closest("[data-swap], [data-dropsheet]") : null;
if (cg && cg.ownerSVGElement && cg.ownerSVGElement.classList.contains("bd-lay")) {
D.card = cg;
cg.classList.add("is-drop-card");
return;
}
var g = el.closest(".bd-ed-group");
if (!g || g.classList.contains("is-pins")) return;
if (D.kind === "sheet") {
if (!g.hasAttribute("data-sheet") || g.getAttribute("data-sheet") === D.id) return;
var r0 = g.getBoundingClientRect();
D.grp = g;
D.after = y > r0.top + r0.height / 2;
g.classList.add(D.after ? "is-drop-after" : "is-drop-before");
return;
}
D.grp = g;
var row = el.closest(".bd-ed-pgw");
if (row && row.getAttribute("data-pid") !== D.id && row.parentNode === g) {
var r = row.getBoundingClientRect();
D.row = row;
D.after = y > r.top + r.height / 2;
row.classList.add(D.after ? "is-drop-after" : "is-drop-before");
} else g.classList.add("is-drop-in");
}
/* A PAGE DROPPED ON THE DRAWING: ON A CARD IT REPLACES THAT PAGE (THE TWO CHANGE PLACES), ON AN EMPTY PART OF A SHEET THAT HAS ROOM IT IS ADDED */
function layDrop(d) {
var K = S.project.site.sheets;
var id = d.id;
var pg = S.project.pages[id];
var cg = d.card;
if (!pg || pg.parent || !cg) return;
var swapAt = cg.getAttribute("data-swap");
var n = +(cg.getAttribute("data-i") || cg.getAttribute("data-dropsheet"));
var k = K[n];
if (!k) return;
var src = K.filter(function (x) { return (x.pages || []).indexOf(id) > -1; })[0];
var clean = function (x, gone, now) {
if (x.pin === gone) x.pin = "";
if (x.main === gone) x.main = now || "";
if (x.restPage === gone) x.restPage = "";
};
if (swapAt === null) {
if (sheetFull(k) || src === k) return;
snap();
if (src) { src.pages = src.pages.filter(function (x) { return x !== id; }); clean(src, id, ""); }
k.pages = (k.pages || []).concat([id]);
changed();
return;
}
var G = sheetGeo(n, S.mode === "phone");
var slot = G.slots.filter(function (s) { return s.i === +swapAt; })[0];
var tid = slot && slot.q ? slot.q.id : "";
if (!tid || tid === id) return;
snap();
if (src === k && S.mode === "phone") {
k.revM = !k.revM;
if (!k.revM) delete k.revM;
changed();
return;
}
if (src === k) {
var A = k.pages.slice();
var a = A.indexOf(id);
var c = A.indexOf(tid);
A[a] = tid;
A[c] = id;
k.pages = A;
} else {
k.pages = k.pages.map(function (x) { return x === tid ? id : x; });
clean(k, tid, id);
if (src) {
src.pages = src.pages.map(function (x) { return x === id ? tid : x; });
clean(src, id, tid);
}
}
changed();
}
function finish() {
var d = D;
D = null;
document.body.classList.remove("has-drag");
document.querySelectorAll(".is-drag, .is-drop-before, .is-drop-after, .is-drop-in, .is-drop-card").forEach(function (n) { n.classList.remove("is-drag", "is-drop-before", "is-drop-after", "is-drop-in", "is-drop-card"); });
if (d && d.moved && d.card) { layDrop(d); return; }
if (!d || !d.moved || !d.grp) return;
var K = S.project.site.sheets;
if (d.kind === "sheet") {
var from = K.map(function (k) { return k.id; }).indexOf(d.id);
var to = K.map(function (k) { return k.id; }).indexOf(d.grp.getAttribute("data-sheet"));
if (from < 0 || to < 0) return;
snap();
var mv = K.splice(from, 1)[0];
to = K.indexOf(S.project.site.sheets.filter(function (k) { return k.id === d.grp.getAttribute("data-sheet"); })[0]);
K.splice(to + (d.after ? 1 : 0), 0, mv);
changed();
return;
}
var id = d.id;
var pg = S.project.pages[id];
if (!pg) return;
var tid = d.row ? d.row.getAttribute("data-pid") : "";
var sid = d.grp.getAttribute("data-sheet");
var full = sid && K.filter(function (k) { return k.id === sid && (k.pages || []).indexOf(id) < 0 && sheetFull(k); })[0];
if (full) return;
snap();
var was = K.filter(function (k) { return (k.pages || []).indexOf(id) > -1; })[0];
K.forEach(function (k) {
if ((k.pages || []).indexOf(id) < 0) return;
k.pages = k.pages.filter(function (x) { return x !== id; });
if (!sid || k.id !== sid) {
if (k.main === id) k.main = "";
if (k.restPage === id) k.restPage = "";
}
});
if (sid) {
var t = K.filter(function (k) { return k.id === sid; })[0];
if (!t) return;
t.pages = t.pages || [];
var at = tid ? t.pages.indexOf(tid) : -1;
if (at < 0) t.pages.push(id);
else t.pages.splice(at + (d.after ? 1 : 0), 0, id);
} else {
var key = d.grp.getAttribute("data-gk") || "";
pg.section = key;
var o = S.project.order;
o.splice(o.indexOf(id), 1);
var oi = tid ? o.indexOf(tid) : -1;
if (oi < 0) {
var last = -1;
o.forEach(function (q, i) { var qq = S.project.pages[q]; if (qq && !qq.parent && qq.kind !== "pin" && (qq.section || "") === key && !sheetOf(q).sheet) last = i; });
oi = last < 0 ? o.length : last + 1;
} else oi += d.after ? 1 : 0;
o.splice(oi, 0, id);
}
changed();
}
document.addEventListener("pointerdown", function (e) {
var gp = e.target.closest && e.target.closest("[data-grip]");
if (!gp || gp.classList.contains("is-off")) return;
e.preventDefault();
D = { kind: gp.getAttribute("data-grip"), id: gp.getAttribute("data-id"), x: e.clientX, y: e.clientY, moved: false };
var host = gp.closest(".bd-ed-pgw, .bd-ed-group");
if (host) host.classList.add("is-drag");
try { gp.setPointerCapture(e.pointerId); } catch (err) {}
});
document.addEventListener("pointermove", function (e) {
if (!D) return;
if (!D.moved && Math.abs(e.clientY - D.y) + Math.abs(e.clientX - D.x) < 6) return;
D.moved = true;
document.body.classList.add("has-drag");
mark(e.clientX, e.clientY);
});
document.addEventListener("pointerup", function () { if (D) finish(); });
document.addEventListener("pointercancel", function () { if (D) finish(); });
})();
/* DRAG A PAGE OF THE SHEET ALONG ITS SPREAD TO SWAP THE ORDER; A TAP STILL PUTS THE WINDOW ON IT */
(function () {
var W = null;
document.addEventListener("pointerdown", function (e) {
var g = e.target && e.target.closest && e.target.closest("[data-swap]");
if (!g || (e.target.closest && e.target.closest("[data-act=lay-rm]"))) return;
var svg = g.ownerSVGElement;
if (!svg || !svg.classList.contains("bd-lay")) return;
var r = svg.getBoundingClientRect();
W = { g: g, svg: svg, x0: e.clientX, y0: e.clientY, k: r.width / 380, sc: +svg.getAttribute("data-sc"), ax: svg.getAttribute("data-axis"), w: +svg.getAttribute("data-w"), h: +svg.getAttribute("data-h"), n: +g.getAttribute("data-i"), i: +g.getAttribute("data-swap"), moved: false, along: 0, ghost: null };
try { g.setPointerCapture(e.pointerId); } catch (err) {}
});
document.addEventListener("pointermove", function (e) {
if (!W) return;
var dx = e.clientX - W.x0, dy = e.clientY - W.y0;
if (!W.moved && Math.hypot(dx, dy) < 7) return;
if (!W.moved) {
W.moved = true;
var gh = document.createElementNS("http://www.w3.org/2000/svg", "rect");
gh.setAttribute("x", W.g.getAttribute("data-bx"));
gh.setAttribute("y", W.g.getAttribute("data-by"));
gh.setAttribute("width", W.g.getAttribute("data-bw"));
gh.setAttribute("height", W.g.getAttribute("data-bh"));
gh.setAttribute("rx", "9");
gh.setAttribute("fill", "rgba(217,87,59,.16)");
gh.setAttribute("stroke", "#d9573b");
gh.setAttribute("stroke-width", "1.5");
gh.setAttribute("stroke-dasharray", "5 3");
gh.setAttribute("pointer-events", "none");
W.svg.appendChild(gh);
W.ghost = gh;
}
var a = W.ax === "x" ? dx : dy;
W.along = a / W.k / W.sc / (W.ax === "x" ? W.w : W.h);
var t = W.ax === "x" ? (a / W.k) + ",0" : "0," + (a / W.k);
W.ghost.setAttribute("transform", "translate(" + t + ")");
});
function done(e) {
if (!W) return;
var w = W;
W = null;
if (w.ghost && w.ghost.parentNode) w.ghost.parentNode.removeChild(w.ghost);
if (!w.moved) return;
var swallow = function (ev) { ev.stopPropagation(); ev.preventDefault(); };
document.addEventListener("click", swallow, true);
setTimeout(function () { document.removeEventListener("click", swallow, true); }, 0);
var k = sheetList()[w.n];
if (!k || e.type === "pointercancel") return;
var P = sheetPanes(k).map(function (q) { return q.id; });
if (P.length !== 2) return;
var toward = w.i === 0 ? w.along > 0.3 : w.along < -0.3;
if (!toward) return;
snap();
if (S.mode === "phone") {
k.revM = !k.revM;
if (!k.revM) delete k.revM;
changed();
return;
}
var A = (k.pages || []).slice();
var tops = A.map(function (id, ix) { return { id: id, ix: ix }; }).filter(function (o) { var q = S.project.pages[o.id]; return q && !q.parent; });
if (tops.length !== 2) return;
A[tops[0].ix] = tops[1].id;
A[tops[1].ix] = tops[0].id;
k.pages = A;
changed();
}
document.addEventListener("pointerup", done);
document.addEventListener("pointercancel", done);
})();
document.addEventListener("pointerdown", function (e) {
var hd = e.target && e.target.closest && e.target.closest("[data-lh]");
if (!hd) return;
var svg = hd.ownerSVGElement;
if (!svg || !svg.classList.contains("bd-lay")) return;
e.preventDefault();
e.stopPropagation();
var r = svg.getBoundingClientRect();
d = { hd: hd, svg: svg, kind: hd.getAttribute("data-lh"), side: hd.getAttribute("data-s") || "", id: hd.getAttribute("data-id") || "", n: +(hd.getAttribute("data-n") != null ? hd.getAttribute("data-n") : svg.getAttribute("data-n")), bx: +svg.getAttribute("data-bx"), by: +svg.getAttribute("data-by"), sc: +svg.getAttribute("data-sc"), w: +svg.getAttribute("data-w"), h: +svg.getAttribute("data-h"), axis: svg.getAttribute("data-axis"), k: r.width / +svg.getAttribute("data-dw"), off: parseFloat(hd.getAttribute("data-off")) || 0, phone: S.mode === "phone", r: r, x0: e.clientX, y0: e.clientY, res: null };
var lab = document.createElementNS("http://www.w3.org/2000/svg", "text");
lab.setAttribute("font-size", "11");
lab.setAttribute("fill", LAY_C.half);
lab.setAttribute("font-weight", "600");
svg.appendChild(lab);
d.lab = lab;
try { hd.setPointerCapture(e.pointerId); } catch (err) {}
});
/* POINTER → WINDOW PX */
function at(e) {
var x = (e.clientX - d.r.left) / d.k, y = (e.clientY - d.r.top) / d.k;
return { x: (x - (d.side === "l" || d.side === "r" ? d.off : 0)) / d.sc + d.bx, y: (y - (d.side === "t" || d.side === "b" ? d.off : 0)) / d.sc + d.by, sx: x, sy: y };
}
function snapTo(v, len) {
var step = len * GRID_STEP / 100;
return Math.round(v / step) * step;
}
document.addEventListener("pointermove", function (e) {
if (!d) return;
var p = at(e);
var G = sheetGeo(d.n, d.phone);
var vert = d.side === "l" || d.side === "r";
var txt = "";
var tx = 0, ty = 0;
if (d.kind === "sheet" || d.kind === "page") {
var pos = vert ? snapTo(p.x, d.w) : snapTo(p.y, d.h);
var cur = d.kind === "sheet" ? G.rect[d.side] : (G.slots.filter(function (s) { return s.q.id === d.id; })[0] || { box: G.rect }).box[d.side];
if (vert) tx = (pos - cur) * d.sc; else ty = (pos - cur) * d.sc;
d.res = { pos: pos };
txt = Math.round(pos / (vert ? d.w : d.h) * 100) + "%";
} else if (d.kind === "win") {
var L = G.L;
var along = d.axis === "x" ? p.x : p.y;
var i = Math.max(0, Math.min(G.N - 1, Math.floor((along + G.star * L) / L)));
d.res = { star: i };
var shift = (i - G.star) * L * d.sc;
if (d.axis === "x") tx = shift; else ty = shift;
txt = "★ " + ((G.pages[i] || {}).title || "");
} else if (d.kind === "away") {
var dx = (e.clientX - d.x0) / d.k / d.sc, dy = (e.clientY - d.y0) / d.k / d.sc;
var horiz = Math.abs(dx) >= Math.abs(dy);
var amt = horiz ? snapTo(dx, d.w) : snapTo(dy, d.h);
var base = G.ghost || G.rect;
var tot = horiz ? (base.l - G.rect.l) + amt : (base.t - G.rect.t) + amt;
var edge = horiz ? (tot < 0 ? "left" : "right") : (tot < 0 ? "top" : "bottom");
var vis;
if (edge === "left") vis = G.rect.r + tot;
else if (edge === "right") vis = d.w - (G.rect.l + tot);
else if (edge === "top") vis = G.rect.b + tot;
else vis = d.h - (G.rect.t + tot);
vis = Math.max(0, Math.min(vis, edge === "left" || edge === "right" ? d.w : d.h));
var stays = Math.abs(tot) < 0.5;
d.res = stays ? { away: "stay" } : { away: { edge: edge, vis: vis } };
tx = horiz ? amt * d.sc : 0;
ty = horiz ? 0 : amt * d.sc;
txt = stays ? "stays" : vis <= 0.5 ? "out of sight" : edge + " · " + Math.round(vis / (horiz ? d.w : d.h) * 100) + "% showing";
}
d.hd.setAttribute("transform", "translate(" + Math.round(tx * 10) / 10 + " " + Math.round(ty * 10) / 10 + ")");
var bb = d.hd.getBBox();
d.lab.setAttribute("x", bb.x + bb.width / 2 + tx + 16);
d.lab.setAttribute("y", bb.y + bb.height / 2 + ty - 10);
d.lab.textContent = txt;
});
function end(e) {
if (!d) return;
var s = d;
d = null;
if (s.lab && s.lab.parentNode) s.lab.parentNode.removeChild(s.lab);
if (e.type === "pointercancel" || !s.res) { s.hd.removeAttribute("transform"); return; }
layApply(s);
}
document.addEventListener("pointerup", end);
document.addEventListener("pointercancel", end);
})();
function layApply(s) {
var phone = s.phone;
var G = sheetGeo(s.n, phone);
var k = G.k;
snap();
if (s.kind === "page") {
var q = S.project.pages[s.id];
var sl = G.slots.filter(function (x) { return x.q.id === s.id; })[0];
if (!q || !sl) return;
q.box = q.box || {};
var ins = s.side === "l" ? s.res.pos - sl.slot.l : s.side === "r" ? sl.slot.r - s.res.pos : s.side === "t" ? s.res.pos - sl.slot.t : sl.slot.b - s.res.pos;
ins = Math.max(0, ins);
var len = s.side === "l" || s.side === "r" ? G.v.w : G.v.h;
var opp = { l: "r", r: "l", t: "b", b: "t" }[s.side];
var ov = boxVal(q.box, "m" + opp, phone);
var on = parseFloat(ov) || 0;
var oPx = /%\s*$/.test(String(ov)) ? on / 100 * len : on;
ins = Math.min(ins, Math.max(0, len * 0.9 - oPx));
q.box["m" + s.side + (phone ? "M" : "")] = ins < 0.5 ? "0" : Math.round(ins / len * 10000) / 100 + "%";
} else if (s.kind === "sheet") {
var L = G.L, N = G.N, star = G.star, ins2 = G.ins;
var g = {};
var pos = s.res.pos;
var alongStart = G.ax === "x" ? "l" : "t", alongEnd = G.ax === "x" ? "r" : "b";
var I = { l: ins2.left, r: ins2.right, t: ins2.top, b: ins2.bottom };
if (s.side === alongStart) g.mStart = Math.max(0, pos + star * L - I[s.side]);
else if (s.side === alongEnd) g.mEnd = Math.max(0, N * L - (pos + star * L) - I[s.side]);
else if (s.side === "l" || s.side === "t") g.mCS = Math.max(0, pos - I[s.side]);
else g.mCE = Math.max(0, (s.side === "r" ? G.v.w : G.v.h) - pos - I[s.side]);
layWrite(s.n, phone, g);
} else if (s.kind === "win") {
if (s.res.star === G.star) return;
layWrite(s.n, phone, { star: s.res.star });
} else if (s.kind === "away") {
layWrite(s.n, phone, { away: s.res.away });
}
changed();
}
/* THE SPREAD — THE WHOLE SHEET LAID FLAT IN THE PREVIEW PANE, THE WINDOW DRAWN ON IT */
function spreadDoc(n, phone) {
var G = sheetGeo(n, phone);
var k = G.k;
var v = G.v;
var K = sheetList();
var B = { l: 0, t: 0, r: v.w, b: v.h };
var U = function (r) { if (!r) return; B = { l: Math.min(B.l, r.l), t: Math.min(B.t, r.t), r: Math.max(B.r, r.r), b: Math.max(B.b, r.b) }; };
U(G.rect);
U(G.ghost);
K.forEach(function (o, j) { if (j !== n) U(sheetGeo(j, phone).rect); });
var pad = 24;
B = { l: B.l - pad, t: B.t - pad, r: B.r + pad, b: B.b + pad };
var W = Math.round(B.r - B.l), H = Math.round(B.b - B.t);
var px = function (r) { return "left:" + Math.round(r.l - B.l) + "px;top:" + Math.round(r.t - B.t) + "px;width:" + Math.round(r.r - r.l) + "px;height:" + Math.round(r.b - r.t) + "px;"; };
var keep = S.layerFocus;
S.layerFocus = (G.pages[G.star] || {}).id || "";
var st = sheetStrip(k);
var extra = [];
var body = '<div id="bd-spread" style="position:relative;width:' + W + "px;height:" + H + 'px;overflow:hidden;background:#cfcdc6">';
K.forEach(function (o, j) {
if (j === n) return;
var og = sheetGeo(j, phone);
body += '<div class="bd-sp-ghost" style="' + px(og.rect) + '"><span>' + esc(o.name || "Sheet") + "</span></div>";
});
if (G.ghost) body += '<div class="bd-sp-ghost is-away" style="' + px(G.ghost) + '"><span>' + esc(k.name || "Sheet") + " · when a page underneath opens</span></div>";
body += '<section class="bd-ly-sheet bd-ly-k bd-sp-sheet' + (st ? "" : " is-paper") + ' is-e-' + esc(k.edge || "left") + " is-em-" + esc(k.edgeM || "top") + '" data-k="' + esc(k.id) + '" style="' + px(G.rect) + '">';
G.slots.forEach(function (s) {
var q = s.q;
var rel = { l: s.slot.l - G.rect.l, t: s.slot.t - G.rect.t, r: s.slot.r - G.rect.l, b: s.slot.b - G.rect.t };
body += '<div class="bd-sp-slot" style="left:' + Math.round(rel.l) + "px;top:" + Math.round(rel.t) + "px;width:" + Math.round(rel.r - rel.l) + "px;height:" + Math.round(rel.b - rel.t) + 'px"><div class="bd-ly-pane is-on" data-page="' + q.id + '"><div class="bd-ly-paper">' + layerBody(q, "view") + "</div></div></div>";
if (st && st.id === q.id) {
var sel = '.bd-ly-pane[data-page="' + q.id + '"] > .bd-ly-paper';
extra.push(sel + " {\nbackground: " + sheetPaper(k, sheetSolid(k)) + ";\n}");
var bx = pageBoxCSS(q, phone, sel + " > .bd-panel", null, true);
if (bx) extra.push(bx);
}
});
body += "</section>";
G.slots.forEach(function (s) {
body += '<a class="bd-sp-tap" href="#" data-page="' + s.q.id + '" style="' + px(s.slot) + '" aria-label="Edit ' + esc(s.q.title) + '"><span>' + esc(s.q.title) + (s.i === G.star ? " ★" : "") + "</span></a>";
});
body += '<div class="bd-sp-win" style="' + px({ l: 0, t: 0, r: v.w, b: v.h }) + '"><span>window · what a visitor sees at rest</span></div>';
body += "</div>";
S.layerFocus = keep;
var css = exportCSS();
var sp = ["html, body {\nmargin: 0;\noverflow: hidden;\nbackground: #cfcdc6;\n}", "#bd-spread .bd-sp-sheet {\nposition: absolute;\ntransform: none;\ntransition: none;\noverflow: visible;\nbox-shadow: 0 2px 0 rgba(0,0,0,.08), 0 18px 48px rgba(0,0,0,.14);\n}", "#bd-spread .bd-sp-slot {\nposition: absolute;\noverflow: hidden;\n}", "#bd-spread .bd-sp-slot > .bd-ly-pane {\nposition: relative;\nheight: 100%;\noverflow: hidden;\n}", "#bd-spread .bd-sp-ghost {\nposition: absolute;\nborder: 1px dashed " + LAY_C.sheet + ";\nbackground: rgba(123,94,167,.06);\n}", "#bd-spread .bd-sp-ghost span {\nposition: absolute;\nright: 8px;\nbottom: 6px;\nfont: 12px/1 ui-monospace, Menlo, monospace;\ncolor: " + LAY_C.sheet + ";\n}", "#bd-spread .bd-sp-win {\nposition: absolute;\nborder: 3px solid " + LAY_C.win + ";\npointer-events: none;\nz-index: 5;\n}", "#bd-spread .bd-sp-win span {\nposition: absolute;\nleft: 0;\ntop: -22px;\nfont: 13px/1 ui-monospace, Menlo, monospace;\ncolor: " + LAY_C.win + ";\nwhite-space: nowrap;\n}", "#bd-spread .bd-sp-tap {\nposition: absolute;\nz-index: 6;\ndisplay: block;\ntext-decoration: none;\n}", "#bd-spread .bd-sp-tap span {\nposition: absolute;\nleft: 10px;\ntop: 10px;\nfont: 13px/1 ui-monospace, Menlo, monospace;\ncolor: " + LAY_C.page + ";\nbackground: rgba(255,255,255,.85);\npadding: 5px 8px;\nborder: 1px solid " + LAY_C.page + ";\n}", "#bd-spread .bd-sp-tap:hover {\noutline: 2px solid " + LAY_C.page + ";\noutline-offset: -2px;\n}", "#bd-spread .bd-ly-paper {\nmargin: 0 !important;\nmin-height: 100% !important;\nbox-shadow: none !important;\n}", "#bd-spread .bd-ly-pane::after {\ndisplay: none;\n}"];
var js = "<script>document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.bd-sp-tap');if(!a)return;e.preventDefault();try{parent.postMessage({bdSpreadPage:a.getAttribute('data-page')},'*');}catch(err){}});<\/script>";
return "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>Spread</title>\n<style id=\"bd-prev-css\">\n" + css.replace(/<\/style/gi, "<\\/style") + "\n</style>\n<style>\n" + sp.join("\n") + "\n" + extra.join("\n") + "\n</style>\n</head>\n<body class=\"bd-spread-body\">\n" + body + "\n" + js + "\n</body>\n</html>";
}
/* THE RED "INHERIT ALL" BAR AT THE TOP OF EVERY PAGE AND SHEET PANEL: ASKS FIRST, THEN DROPS EVERY OVERRIDE SO IT FOLLOWS THE MASTER AGAIN */
/* WALID'S PANELS: ONE SKIN FOR SHEET AND PAGE. DETAILS · LAYOUT · STYLE · EFFECT · EXTRAS · INHERIT + DELETE */
/* WALID'S PANEL DESIGNER COLOURS: ONE COLOUR PER PANEL, THE PANE BEHIND IS #e7e4dc */
var PC = {
sheet: { pane: "transparent", det: "#f3f0e1", lay: "#f3f0e1", sty: "#f3f0e1", end: "#141416", edge: "transparent" },
page: { pane: "transparent", det: "#f3f0e2", lay: "#f3f0e2", sty: "#f3f0e2", end: "#141416", edge: "transparent", bar: "#f3f0e7" },
under: { pane: "transparent", det: "#f3f0e3", lay: "#f3f0e3", sty: "#f3f0e3", end: "#141416", edge: "transparent" },
blog: { pane: "transparent", det: "#f3f0e4", lay: "#f3f0e4", sty: "#f3f0e4", end: "#141416", edge: "transparent", bar: "#f3f0e7" },
post: { pane: "transparent", det: "#f3f0e5", lay: "#f3f0e5", sty: "#f3f0e5", end: "#141416", edge: "transparent" },
master: { pane: "transparent", det: "#f3f0e6", lay: "#f3f0e6", sty: "#f3f0e6", end: "#141416", edge: "transparent" }
};
function skinColour(k) { SK.kind = PC[k] ? k : "page"; var c = PC[k] || PC.page; SK.edge = c.edge; SK.bar = c.bar || c.det; SK.pane = c.pane; SK.det = c.det; SK.lay = c.lay; SK.sty = c.sty; SK.eff = c.sty; SK.end = c.end; }
var SK = { pane: "#e7e4dc", det: "#e6ebe6", lay: "#ffffff", sty: "#faf9f6", eff: "#faf9f6", end: "#f3e6df" };
/* PANEL SECTIONS ARE FLAT: NO COLOURS OF THEIR OWN, ONLY CLASSES (THE STYLESHEET DECIDES THE LOOK) */
function skinCls(color) {
return color === SK.end ? " is-end" : "";
}
function skin(title, color, inner) {
return '<div class="bd-ed-sec bd-ed-skin' + skinCls(color) + '"><span class="bd-ed-title">' + title + "</span>" + inner + "</div>";
}
function skinFold(title, color, inner, open) {
return '<details class="bd-ed-sec bd-ed-skin bd-ed-skinfold' + skinCls(color) + '"' + (open ? " open" : "") + '><summary class="bd-ed-title">' + title + "</summary>" + inner + "</details>";
}
function skinWrap(inner) {
return '<div class="bd-ed-skinwrap is-' + (SK.kind || "page") + '">' + inner + "</div>";
}
function two(a, b) {
return '<div class="bd-ed-two">' + a + b + "</div>";
}
var PAT_SVG = {
"": '<svg viewBox="0 0 40 40"></svg>',
lined: '<svg viewBox="0 0 40 40" stroke="#777" stroke-width="1"><path d="M0 8H40M0 16H40M0 24H40M0 32H40"/></svg>',
grid: '<svg viewBox="0 0 40 40" stroke="#999" stroke-width=".8"><path d="M0 10H40M0 20H40M0 30H40M10 0V40M20 0V40M30 0V40"/></svg>',
dots: '<svg viewBox="0 0 40 40" fill="#777"><circle cx="8" cy="8" r="1.4"/><circle cx="20" cy="8" r="1.4"/><circle cx="32" cy="8" r="1.4"/><circle cx="8" cy="20" r="1.4"/><circle cx="20" cy="20" r="1.4"/><circle cx="32" cy="20" r="1.4"/><circle cx="8" cy="32" r="1.4"/><circle cx="20" cy="32" r="1.4"/><circle cx="32" cy="32" r="1.4"/></svg>',
ruled: '<svg viewBox="0 0 40 40" stroke="#777" stroke-width="1"><path d="M0 12H40M0 22H40M0 32H40"/><path d="M9 0V40" stroke="#d9573b"/></svg>'
};
function patThumbs(path, val, extra) {
var list = (extra || []).concat(SHEET_PATTERNS.filter(function (x) { return !extra || x[0]; }).map(function (x) { return [x[0], x[1].split(" ·")[0]]; }));
return '<div class="bd-ed-thumbs">' + list.map(function (x) {
var on = (val || "") === x[0];
return '<button class="bd-ed-thumb' + (on ? " is-on" : "") + '" data-act="set" data-path="' + path + '" data-val="' + x[0] + '" aria-pressed="' + on + '">' + (PAT_SVG[x[0]] || '<svg viewBox="0 0 40 40"></svg>') + "<i>" + esc(x[1]) + "</i></button>";
}).join("") + "</div>";
}
function pageMode(q) {
if (q.mode === "card" || q.mode === "sheet") return q.mode;
var b = q.box || {};
return b.card || parseFloat(b.blur) > 0 || parseFloat(b.radius) > 0 || (b.shadow && b.shadow !== "none") ? "card" : "sheet";
}
function inhDelBar(kind, i, delBtn) {
var attrs = ' data-kind="' + kind + '" data-i="' + (i == null ? "" : i) + '"';
var t = "Controls";
if (S.confirm === "inherit") return skin(t, SK.end, '<div class="bd-ed-confirm">Reset every setting of this ' + kind + ' to the master? <button class="bd-ed-btn bd-ed-inherit" data-act="inherit-yes"' + attrs + '>Inherit all</button><button class="bd-ed-btn" data-act="inherit-no">Keep</button></div>');
if (S.confirm === "page" && kind === "page") return skin(t, SK.end, '<div class="bd-ed-confirm">Delete this page for good? <button class="bd-ed-btn is-danger" data-act="page-del-yes">Delete</button><button class="bd-ed-btn" data-act="confirm-no">Keep</button></div>');
return skin(t, SK.end, two('<button class="bd-ed-btn bd-ed-inherit" data-act="inherit-ask"' + attrs + ">Inherit all</button>", delBtn));
}
function inheritBar(kind, i) {
var attrs = ' data-kind="' + kind + '" data-i="' + (i == null ? "" : i) + '"';
if (S.confirm === "inherit") return '<div class="bd-ed-sec bd-ed-inh"><div class="bd-ed-confirm">Reset every setting of this ' + kind + ' to the master? <button class="bd-ed-btn bd-ed-inherit" data-act="inherit-yes"' + attrs + '>Inherit all</button><button class="bd-ed-btn" data-act="inherit-no">Keep</button></div></div>';
return '<div class="bd-ed-sec bd-ed-inh"><button class="bd-ed-btn bd-ed-inherit" data-act="inherit-ask"' + attrs + ">Inherit all</button></div>";
}
function sheetPanelHTML(n) {
var k = sheetList()[n];
if (!k) return "";
return skinWrap(sheetEditHTML(n));
}
function sheetEditHTML(n) {
var k = sheetList()[n];
if (!k) return "";
var P = "site.sheets." + n + ".";
skinColour("sheet");
var pages = (k.pages || []).map(sheetPage).filter(Boolean);
var pins = pages.map(function (q, j) {
var on = sheetPin(k, S.mode === "phone") === q.id;
return pages.length > 1 ? '<button class="bd-ed-pinpill' + (on ? " is-on" : "") + '" data-act="lay-flag" data-f="pin" data-i="' + n + '" data-id="' + q.id + '" aria-pressed="' + on + '">PIN ' + (j + 1) + "</button>" : "";
}).join("");
var h = skin("Details", SK.det, field("Name", input(P + "name", k.name || "")));
h += skin("Layout", SK.lay, two(seg(P + (S.mode === "phone" ? "axisM" : "axis"), sheetAx(k, S.mode === "phone"), [["y", "Vertical"], ["x", "Horizontal"]]), '<div class="bd-ed-pins">' + pins + "</div>") + sheetLayoutHTML(n, true));
h += skin("Style", SK.sty, ovrNote("sheet", k, n) + blendNote() + '<span class="bd-ed-label">Background</span>' + fillIn("", P + "color", k.color, "#E4E1DA") + two(numIn("See-through %", P + "alpha", k.alpha), numIn("Blur", P + "blur", k.blur)) + '<span class="bd-ed-label">Decoration</span>' + patThumbs(P + "pattern", k.pattern || "") + numIn("Grain %", P + "grain", k.grain || "", "blank", 0) + (k.pattern ? row(field("Lines", '<input type="color" class="bd-ed-input" data-bind="' + P + 'patColor" value="' + esc(k.patColor || "#000000") + '">'), numIn("Spacing px", P + "patSize", k.patSize), numIn("Strength %", P + "patAlpha", k.patAlpha)) : "") + numIn("Corners", P + "radius", k.radius == null ? "" : k.radius, "blank") + rimPanel(P, k, false));
h += inhDelBar("sheet", n, '<button class="bd-ed-btn is-danger" data-act="sheet-del" data-i="' + n + '">' + I.trash + "Dissolve</button>");
return h;
}
/* PUT A PAGE ON A SHEET ("" = underneath, "new" = a fresh sheet) */
function pageToSheet(pg, to) {
if (!pg) return;
snap();
var K = S.project.site.sheets;
K.forEach(function (k) {
k.pages = (k.pages || []).filter(function (id) { return id !== pg.id; });
if (k.restPage === pg.id) k.restPage = "";
});
if (to === "new") {
var k2 = Object.assign(clone(SHEET_DEFAULTS), { id: uid(), name: pg.title, pages: [pg.id], rest: "open" });
K.unshift(k2);
} else if (to) {
var k3 = K.filter(function (k) { return k.id === to; })[0];
if (k3) k3.pages = (k3.pages || []).concat([pg.id]);
}
S.project.site.sheets = K.filter(function (k) { return (k.pages || []).length; });
changed();
}
function layersPanel() {
var s = S.project.site;
var Lz = s.layers;
var h = '<div class="bd-ed-sec"><span class="bd-ed-label">Paper sheets</span>' + (Lz.on ? "" : sw("Show the site as layers", "site.layers.on", Lz.on) + '<div class="bd-ed-hint">Pages lie on translucent sheets stacked over the rest of the site.</div>');
if (!Lz.on) return h + "</div>";
h += '<div class="bd-ed-hint">' + (sheetList().length ? sheetList().length + " sheet" + (sheetList().length > 1 ? "s" : "") + ". " : "No sheets yet. ") + "Tap a sheet’s title in Pages to edit it, move it up or down the stack, or change how it moves. Pages and posts not on a sheet lie underneath, one at a time.</div></div>";
return h;
}
function sitePanel() {
var s = S.project.site;
var h = (layersOn() ? "" : layersPanel()) + '<div class="bd-ed-sec">' + field("Site name", input("site.name", s.name))
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
h += '<div class="bd-ed-sec"><span class="bd-ed-label">On every page</span>' + sw("Page title at the top", "site.header", s.header) + '<div class="bd-ed-hint">Writes each page’s heading above its content. A page can switch it off in its own panel (Show the title). Or leave this off and place a Page title block where you want it.</div>' + (s.header ? sw("Number above the title", "site.showNum", s.showNum) + field("Blog title shows", select("site.blogHead", s.blogHead || "both", HEAD_MODES)) + field("Post titles show", select("site.postHead", s.postHead || "both", HEAD_MODES)) + '<div class="bd-ed-hint">A blog’s number is how many posts it has; a post’s number is its place in its blog. A blog can set its own in its Details.</div>' : "") + (layersOn() ? "" : sw("Floating menu button", "site.menu", s.menu) + sw("Page arrows at the end", "site.pager", s.pager)) + sw("Click images to zoom", "site.zoom", s.zoom) + '<div class="bd-ed-hint">Tap an image to see it full screen. One image can opt out in its own panel.</div>'
+ (!layersOn() && (s.menu || hasMenuButton()) ? '<button class="bd-ed-btn" data-act="menu-style">' + I.sliders + "Style the menu</button>" : "") + '<div class="bd-ed-hint">' + (layersOn() ? "With paper sheets the menu is a page on a sheet; what must stay still lives on the glass below." : "Or add Menu, Page title and Page arrows blocks to the header and footer.") + "</div></div>";

var secs = s.sections.map(function (x, i) {
return '<div class="bd-ed-list-row">' + input("site.sections." + i + ".key", x.key, "", ' aria-label="Section key"') + input("site.sections." + i + ".label", x.label, "", ' aria-label="Section label"') + '<button class="bd-ed-x" data-act="del-section" data-i="' + i + '" aria-label="Remove section">' + I.x + "</button></div>";
}).join("") + '<button class="bd-ed-btn" data-act="add-section">' + I.plus + "Section</button>";
var ext = s.externals.map(function (x, i) {
return '<div class="bd-ed-field" style="gap:6px;padding-bottom:6px;border-bottom:1px dashed var(--e-line)"><div class="bd-ed-list-row">' + select("site.externals." + i + ".section", x.section, s.sections.map(function (q) { return [q.key, q.key]; })) + input("site.externals." + i + ".title", x.title, "", ' aria-label="Link title"') + '<button class="bd-ed-x" data-act="del-ext" data-i="' + i + '" aria-label="Remove link">' + I.x + "</button></div>" + input("site.externals." + i + ".url", x.url, "", ' aria-label="Link address" placeholder="https://"') + "</div>";
}).join("") + '<button class="bd-ed-btn" data-act="add-ext">' + I.plus + "Outside link</button>";
var oneMenu = layersOn() && s.menus.length === 1;
if (oneMenu) h += '<div class="bd-ed-sec"><span class="bd-ed-label">Menu · the links on the menu sheet</span>' + menuEditor(s.menus[0].id, true) + '<div class="bd-ed-hint">Add pages, links or headings and put them in order. The Menu page on its sheet shows this list.</div></div>';
else h += '<div class="bd-ed-sec"><span class="bd-ed-label">Menus</span>' + menuPicker("ui.menuEdit", S.menuEdit) + menuEditor(S.menuEdit || s.menus[0].id) + '<div class="bd-ed-hint">A menu is the list of links a Menu block or the overlay shows. Make as many as you like; each Menu block picks one.</div>' + (s.menus.length > 1 ? '<button class="bd-ed-btn is-danger is-sm" data-act="menu-del" data-id="' + esc(S.menuEdit || s.menus[0].id) + '">Delete this menu</button>' : "") + "</div>";
h += '<div class="bd-ed-sec">' + adv("site-sections", "Page groups (Pages tab)", '<div class="bd-ed-hint">Groups only sort the Pages list and number pages. They don’t decide what shows in a menu.</div>' + secs) + "</div>";
h += '<div class="bd-ed-sec"><span class="bd-ed-title">Blog posts</span><div class="bd-ed-hint">Columns, colours and space for every post live in the post master.</div><button class="bd-ed-btn" data-act="post-master">' + I.sliders + "All posts · master</button></div>";
h += '<div class="bd-ed-sec">' + adv("site-adv", "Advanced", '<span class="bd-ed-label">Master placement</span>' + masterPanel()
+ '<span class="bd-ed-label">Grid</span>' + row(dpIn("Units", "site.cols", "site.colsM", s.cols, s.colsM, "int"), dpIn("Gap", "site.gap", "site.gapM", s.gap, s.gapM, "int"), numIn("Free-grid row", "site.row", s.row, "int"))) + "</div>";
return h;
}
/* THE BLOG ANIMATION TOOL: A PAD THAT DECIDES TO WHICH SIDE THE BLOG'S SHEET LEAVES WHEN A POST IS CLICKED */
function postGoHTML() {
var g = S.project.site.postGo || {};
var ph = S.mode === "phone";
var key = ph ? "sideM" : "side";
var v = POST_SIDES.indexOf(g[key]) > -1 ? g[key] : "";
var eff = v || (ph ? POST_SIDES.indexOf(g.side) > -1 ? g.side : "" : "");
var b = function (val, lab, title, cls) {
var on = v === val;
return '<button class="bd-ed-padb ' + cls + (on ? " is-on" : "") + '" data-act="set" data-path="site.postGo.' + key + '" data-val="' + val + '" aria-pressed="' + on + '" title="' + title + '">' + lab + "</button>";
};
var dx = { left: -34, right: 34, top: 0, bottom: 0 }[eff] || 0;
var dy = { top: -22, bottom: 22, left: 0, right: 0 }[eff] || 0;
var svg = '<svg class="bd-ed-padsvg" viewBox="0 0 120 80" aria-hidden="true"><rect x="22" y="14" width="76" height="52" rx="3" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1"/>'
+ '<rect x="' + (22 + dx) + '" y="' + (14 + dy) + '" width="76" height="52" rx="3" fill="currentColor" fill-opacity="' + (eff ? ".16" : ".08") + '" stroke="currentColor" stroke-width="1.2"' + (eff ? "" : ' stroke-dasharray="3 3"') + "/>"
+ "</svg>";
return '<div class="bd-ed-sec"><span class="bd-ed-title">Opening a post' + (ph ? " · phone" : "") + "</span>"
+ '<div class="bd-ed-hint">When a post is clicked, the blog’s sheet leaves to this side. ' + (ph ? "The phone has its own; blank follows the desktop." : "Blank keeps the sheet’s own edge.") + "</div>"
+ '<div class="bd-ed-padwrap"><div class="bd-ed-pad">'
+ "<i></i>" + b("top", "↑", "Leaves upwards", "is-t") + "<i></i>"
+ b("left", "←", "Leaves to the left", "is-l") + b("", ph ? "Same" : "Own", ph ? "Same as desktop" : "The sheet’s own edge", "is-c") + b("right", "→", "Leaves to the right", "is-r")
+ "<i></i>" + b("bottom", "↓", "Leaves downwards", "is-b") + "<i></i>"
+ "</div>" + svg + "</div></div>";
}
/* THE POST MASTER: COLUMNS, COLOURS, SPACE AND CARD FOR EVERY BLOG POST (site.postLayout + site.postBox) */
function postFollows(q) {
var b = q.box || {};
var ownBox = Object.keys(b).some(function (k) { var v = b[k]; return !(v === "" || v == null || v === false || (k === "shadow" && v === "none")); });
return !q.ownLayout && !ownBox && !q.sheetBg;
}
function postMasterHTML(bare) {
var s = S.project.site;
var all = S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (q) { return q && q.parent && q.kind !== "pin"; });
var nf = all.filter(postFollows).length;
var h = '<div class="bd-ed-sec"><div class="bd-ed-head"><span class="bd-ed-title">All posts · master</span></div>'
+ '<div class="bd-ed-pfollow">' + all.map(function (q) { var f = postFollows(q); return '<button class="bd-ed-pf' + (f ? " is-f" : "") + '" data-act="page" data-id="' + q.id + '" title="' + esc(q.title) + (f ? " · follows the master" : " · has its own settings") + '"><i></i><span>' + esc(q.title) + "</span><b>" + (f ? "master" : "own") + "</b></button>"; }).join("") + "</div>"
+ (S.confirm === "posts" ? '<div class="bd-ed-confirm">Drop the own columns, colours and space of ' + (all.length - nf) + ' post' + (all.length - nf === 1 ? "" : "s") + '? Their words and blocks stay; what most posts share moves into the master first. <button class="bd-ed-btn bd-ed-inherit" data-act="posts-follow-yes">Make all follow</button><button class="bd-ed-btn" data-act="inherit-no">Keep</button></div>'
: '<button class="bd-ed-btn bd-ed-inherit"' + (nf === all.length ? " disabled" : "") + ' data-act="posts-follow-ask">' + (nf === all.length ? "All " + all.length + " posts follow the master" : "Make all " + all.length + " posts follow (" + (all.length - nf) + " have their own)") + "</button>")
+ "</div>";
h += postArrowsPanel();
h += postGoHTML();
h += '<div class="bd-ed-sec"><span class="bd-ed-title">Columns' + (S.mode === "phone" ? " · phone" : "") + '</span>' + rulerCols({ kind: "page", parent: "posts" }, S.mode === "phone", true) + '<div class="bd-ed-hint">Blocks keep the column they are in. With one column every block stacks.</div></div>';
var pb = pageBoxPanel({ id: "", box: s.postBox || {}, sheetBg: (s.postBox || {}).sheetBg || "" }).replace(/page\.box\./g, "site.postBox.").replace(/page\.sheetBg/g, "site.postBox.sheetBg").replace("Space & card", "Space, card &amp; colour");
if (bare) return h + pb;
skinColour("master");
return '<div class="bd-ed-skinwrap bd-ed-pc-bm">' + h + pb + "</div>";
}
/* THE GLASS: A MENU BAR STUCK TO THE WINDOW. IT NEVER MOVES WHILE PAPER SLIDES UNDER IT, SO NO SHEET EVER NEEDS A BAND */
function glassPanel() {
var g = S.project.site.glass;
return '<div class="bd-ed-sec"><span class="bd-ed-title">On the glass</span>' + field("Menu bar", seg("site.glass.menu", g.menu || "", [["", "Off"], ["phone", "Phone"], ["desktop", "Desktop"], ["both", "Both"]]))
+ (g.menu ? field("At the", seg("site.glass.at", g.at === "top" ? "top" : "bottom", [["top", "Top"], ["bottom", "Bottom"]])) + fillIn("Colour", "site.glass.color", g.color || "", S.project.site.colors.panel, "Panel") + row(numIn("See-through %", "site.glass.alpha", g.alpha), numIn("Blur below", "site.glass.blur", g.blur)) : "")
+ '<div class="bd-ed-hint">The glass is the window itself. A bar stuck to it shows the sheet menu\u2019s links and never moves while the paper slides, which is how a phone keeps its menu without breaking a sheet into a band.</div></div>';
}
function glassHTML() {
var s = S.project.site;
var g = s.glass || {};
if (!g.menu) return "";
var e = { props: { menu: s.nav.menu, marker: "", align: "left", style: "heading", gap: 0, gapM: 0, pad: 0, padM: 0, mark: s.name } };
var inner = sheetMenuHTML(e, "bd-glass-menu").replace(/^<nav[^>]*>/, "").replace(/<\/nav>$/, "");
return '<nav class="bd-glass is-at-' + (g.at === "top" ? "top" : "bottom") + " is-on-" + esc(g.menu) + '" aria-label="Menu">\n' + inner + "\n</nav>";
}
function glassCSS(phone) {
var s = S.project.site;
var g = s.glass || {};
if (!g.menu) return "";
if (phone) return [".bd-glass.is-on-desktop {\ndisplay: none;\n}", ".bd-glass.is-on-phone {\ndisplay: flex;\n}", ".bd-glass {\npadding: 10px max(14px, env(safe-area-inset-right, 0px)) calc(10px + env(safe-area-inset-bottom, 0px)) max(14px, env(safe-area-inset-left, 0px));\n}", ".bd-glass.is-at-top {\npadding-top: calc(10px + env(safe-area-inset-top, 0px));\npadding-bottom: 10px;\n}"].join("\n");
var a = solidPct(g.alpha, 8);
var bl = parseFloat(g.blur) || 0;
return [
".bd-glass {\nposition: fixed;\nleft: 0;\nright: 0;\n" + (g.at === "top" ? "top: 0;" : "bottom: 0;") + "\nz-index: 60;\ndisplay: " + (g.menu === "phone" ? "none" : "flex") + ";\nalign-items: center;\njustify-content: space-between;\ngap: 18px;\npadding: 12px 24px;\nbox-sizing: border-box;\nbackground: " + fillCSS(g.color || s.colors.panel, a) + ";\n" + (bl ? "-webkit-backdrop-filter: blur(" + bl + "px);\nbackdrop-filter: blur(" + bl + "px);\n" : "") + "color: var(--bd-ink);\nfont-family: var(--bd-mono);\nfont-size: var(--bd-fs);\nline-height: var(--bd-lh);\n}",
".bd-glass .bd-ly-list {\ndisplay: flex;\nflex-wrap: wrap;\ngap: 4px 18px;\nmargin: 0;\npadding: 0;\nlist-style: none;\n}",
".bd-glass .bd-ly-mark {\nmargin: 0;\nwhite-space: nowrap;\n}",
".bd-glass .bd-ly-a {\ncolor: inherit;\ntext-decoration: none;\n}",
".bd-glass .bd-ly-a.is-current {\ntext-decoration: underline;\ntext-underline-offset: 3px;\n}"
].join("\n");
}
/* ONCE: A PHONE BAND (PINNED PAGE THAT STAYED PUT) BECOMES A MENU BAR ON THE GLASS */
function layGlassIn(p) {
var s = p.site;
(s.sheets || []).forEach(function (k) {
if (!k) return;
var d = k.pinMode === "stay", m = (k.pinModeM || k.pinMode) === "stay";
if (d && m) s.glass.menu = "both";
else if (m) s.glass.menu = s.glass.menu === "desktop" ? "both" : "phone";
else if (d) s.glass.menu = s.glass.menu === "phone" ? "both" : "desktop";
});
}
/* THE LAYERS PANE: MASTER ABOVE THE LIST */
function layersBarHTML() {
return '<div class="bd-ed-layers"><button class="bd-ed-master' + (S.masterSel ? " is-on" : "") + '" data-act="master-sel"><b>Master</b><span>everything on the site</span></button></div>';
}
function masterPanelHTML() {
var T = [["styles", "Styles"], ["motion", "Motion"], ["site", "Site"], ["blog", "Blog"]];
if (S.postMaster) S.masterTab = "blog";
else if (S.masterTab === "blog" || T.map(function (t) { return t[0]; }).indexOf(S.masterTab) < 0) S.masterTab = "styles";
var h = '<div class="bd-ed-sec"><div class="bd-ed-head"><span class="bd-ed-title">Master</span></div><div class="bd-ed-tabs" role="tablist">';
T.forEach(function (t) {
h += '<button data-act="master-tab" data-val="' + t[0] + '" class="' + (S.masterTab === t[0] ? "is-on" : "") + '">' + t[1] + "</button>";
});
skinColour("master");
return '<div class="bd-ed-skinwrap bd-ed-pc-' + (S.masterTab === "blog" ? "bm" : S.masterTab) + '">' + h + "</div></div>" + (S.masterTab === "blog" ? postMasterHTML(true) : panelHTML(S.masterTab)) + "</div>";
}
function renderLeft() {
var L = $("bd-left");
L.classList.toggle("is-open", S.leftOpen);
if (!S.project) {
L.innerHTML = "";
return;
}
var LT = toolLayout().left.filter(function (id) { return !toolHidden(id) || id === "code"; });
if (S.codeOpen) S.leftTab = "code";
else if (S.leftTab === "code") S.leftTab = "";
if (LT.indexOf(S.leftTab) < 0 && S.leftTab !== "code") S.leftTab = LT.filter(function (id) { return id !== "code"; })[0] || "";
if (S.leftTab !== "code") S.leftTab = "pages";
var h = S.leftTab === "code" ? tabsHTML("left", S.leftTab) : layersBarHTML();
$("bd-app").classList.toggle("has-wide-left", S.leftTab === "code");
L.classList.toggle("has-codepane", S.leftTab === "code");
if (S.leftTab === "code") {
L.innerHTML = h + '<div class="bd-ed-codepane" id="bd-code-slot"></div>';
renderCode();
requestAnimationFrame(fitSheet);
return;
}
h += S.leftTab ? panelHTML(S.leftTab) : '<div class="bd-ed-sec"><div class="bd-ed-hint">Every tab is hidden or moved. Tap ⋯ to bring one back.</div></div>';
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
+ sw("Click to zoom", "el.zoom", p.zoom !== false) + (!S.project.site.zoom && p.zoom !== false ? '<div class="bd-ed-hint">Also needs Site → Click images to zoom.</div>' : "");
var cpg0 = curPage();
if (cpg0 && cpg0.parent && p.assetId) {
var isCard = !(cpg0.cover && (cpg0.cover.assetId || cpg0.cover.file)) && postCover(cpg0) === p;
h += '<button class="bd-ed-btn" data-act="post-thumb"' + (isCard ? ' disabled' : "") + ">" + (isCard ? "★ Card image for this post" : "☆ Use as card image") + "</button>";
}
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
if (e.type === "indexlink") {
h += field("Link text or symbol", input("el.label", p.label || "", "", ' placeholder="Index;"'))
+ '<div class="bd-ed-actions">' + ["Index;", "≡", "☰", "+", "○", "→", "↘", "◦"].map(function (c) { return '<button class="bd-ed-btn" style="min-width:32px;justify-content:center" data-act="set" data-path="el.label" data-val="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div>"
+ sw("Underline the link", "el.line", p.line !== false) + sw("Breadcrumbs beside it", "el.crumbs", p.crumbs !== false)
+ (p.crumbs !== false ? row(field("Between crumbs", input("el.sep", p.sep == null ? " / " : p.sep, "", ' placeholder=" / "')), numIn("Gap px", "el.gap", p.gap == null ? 12 : p.gap)) + numIn("Crumb strength %", "el.dim", p.dim == null ? 60 : p.dim) : "")
+ field("Text style", select("el.style", p.style || "body", styleOpts()))
+ '<div class="bd-ed-hint">Always opens the menu page (the one holding the Sheet menu block). The crumb shows only the name of the blog that is open (a blog page or one of its posts); on every other page there is none.</div>';
}
if (e.type === "sheetmenu") {
var smw = sheetOf(curPage().id);
h += (S.project.site.menus.length > 1 ? field("Shows", menuPicker("el.menu", p.menu || S.project.site.nav.menu)) : "")
+ row(field("Links sit", seg("el.align", p.align === "left" ? "left" : "right", [["left", "Left"], ["right", "Right"]])), field("Current mark", input("el.marker", p.marker || "")))
+ field("Text style", select("el.style", p.style || "heading", BD_STYLES))
+ row(dpIn("Side padding", "el.pad", "el.padM", p.pad, p.padM), dpIn("Between links", "el.gap", "el.gapM", p.gap, p.gapM))
+ field("Mark", input("el.mark", p.mark || "", "", ' placeholder="' + esc(S.project.site.name) + '"'))
+ '<div class="bd-ed-hint">' + (smw.strip ? "This page is the edge of the “" + esc(smw.sheet.name) + "” sheet: the menu sits in the part that peeks out. On desktop the links stack down the strip with the mark at the bottom; on phone they run along the band. Edit the links in Site → Menu." : "A sheet menu shows on a sheet’s edge. Make this page the edge of a sheet: drag it from Layers onto a sheet’s drawing.") + "</div>";
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
+ field("Between the facts", input("el.sep", p.sep || "", "", ' placeholder=" ~ "'))
+ lookSection(e) + '<div class="bd-ed-hint">Counts the words in this post’s text and quotes. Reading time is one minute per 200 words. Switch the back link off to show only the facts. Alignment, spacing, line and back-link styling are in Look below, and for every post at once in Master → Styles → Blocks → Post info.</div>';
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
if (BLOCK_STYLE[e.type] && h.indexOf("bd-ed-look") < 0) h += lookSection(e);
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
function styleOpts() {
var st = S.project.site.styles;
return BD_STYLES.map(function (k) { var x = st[k[0]]; return [k[0], k[1] + (x ? " · " + x.size + "/" + x.lh + (x.font === "mono" ? " mono" : "") : "")]; });
}
function bsOptName(opts, v) {
for (var i = 0; i < opts.length; i++) if (String(opts[i][0]) === String(v)) return opts[i][1];
return v === "" || v == null ? "none" : String(v);
}
function styleFields(type, scope, e, opt) {
opt = opt || {};
var site = bsSite(type);
var el = scope === "el";
var ph = S.mode === "phone";
var val = function (k) { return el ? E(e, k) : site[k]; };
var cells = BLOCK_STYLE[type].filter(function (f) {
if (opt.only && opt.only.indexOf(f[0]) < 0) return false;
if (opt.skip && opt.skip.indexOf(f[0]) > -1) return false;
var w = BS_WHEN[type + "." + f[0]];
return !w || w(val, el ? e : null);
}).map(function (f) {
return { k: f[0], html: styleCell(type, f, el, e, site, ph) };
});
var groups = BS_GROUPS[type] && !opt.flat ? BS_GROUPS[type] : [["", cells.map(function (c) { return c.k; })]];
var h = "";
groups.forEach(function (g) {
var gc = cells.filter(function (c) { return g[1].indexOf(c.k) > -1; });
if (!gc.length) return;
if (g[0] && (opt.hide || []).indexOf(g[0]) < 0) h += '<span class="bd-ed-label bd-ed-group">' + esc(g[0]) + "</span>";
for (var i = 0; i < gc.length; i += 2) h += row(gc[i].html, gc[i + 1] ? gc[i + 1].html : "");
if (g[0] === "Card image" && val("imgBlend") === "ink" && val("cardBg")) h += '<div class="bd-ed-hint">The card colour (' + esc(val("cardBg")) + ') still sits behind the lines. Clear Card colour above to put the lines straight on the sheet.</div>';
if (g[0] === "Card image" && val("imgBlend") === "ink" && (val("look") || "plain") === "trace") h += '<div class="bd-ed-hint">The tracing paper (Motion → Card look) lies over the lines and frosts them.</div>';
});
return h;
}
function styleCell(type, f, el, e, site, ph) {
var k = f[0], kind = f[2];
var path = el ? "el." + k : "site.blockStyles." + type + "." + k;
var cur = el ? e.props[k] : site[k];
var sv = site[k];
if (kind === "style" || kind === "sel" || kind === "bool") {
var opts = kind === "style" ? styleOpts() : kind === "bool" ? [["1", "On"], ["0", "Off"]] : f[4];
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
}
/* CARD IMAGE — AUTO, ONE OF THE POST'S IMAGES, OR YOUR OWN UPLOAD */
function coverOpts(pg) {
var o = [["", "Auto · first image"]];
var n = 0;
(pg.els || []).forEach(function (e) {
if (e.type === "image" && (e.props.assetId || e.props.file)) { n++; o.push([e.id, "Image " + n + " · " + (e.props.alt || e.props.file || "untitled").slice(0, 32)]); }
if (e.type === "gallery") (e.props.items || []).forEach(function (it, i) { if (it.assetId || it.file) o.push([e.id + ":" + it.id, "Gallery · " + (i + 1) + " · " + (it.alt || it.file || "").slice(0, 26)]); });
});
return o;
}
function coverField(pg) {
var own = pg.cover && (pg.cover.assetId || pg.cover.file);
var cv = postCover(pg);
var src = cv ? imgSrc(cv, "edit") : "";
return '<span class="bd-ed-label">Card image</span>'
+ (src ? '<img src="' + esc(src) + '" alt="" style="display:block;width:100%;max-height:150px;object-fit:cover;margin:0 0 8px;background:#eee">' : "")
+ (own ? '<div class="bd-ed-hint">Using your own card image · ' + esc(pg.cover.file || "") + "</div>" : field("Use", select("page.thumb", pg.thumb || "", coverOpts(pg))))
+ row('<button class="bd-ed-btn" data-act="post-cover-up">' + I.plus + (own ? "Replace own image" : "Upload own image") + "</button>", own ? '<button class="bd-ed-btn" data-act="post-cover-x">Remove own</button>' : "")
+ '<div class="bd-ed-hint">Only for the post cards. Not shown inside the post.</div>';
}
/* CODE THAT OVERRIDES A BLOCK — RULES IN SITE CSS / PAGE CSS THAT TARGET THIS BLOCK (INSPECT WRITES THESE) */
function elCssOverrides(e) {
var found = [];
var key = ".bd-e-" + e.id;
[["site", S.project.site.css], ["page", curPage().css]].forEach(function (w) {
var sp = cssSplit(w[1]);
[sp.desk, sp.mob].forEach(function (part, i) {
cssRules(part).forEach(function (r) {
if (r.sel.indexOf(key) > -1) found.push({ where: w[0], phone: i === 1, props: declList(r.body).map(function (d) { return d.prop; }) });
});
});
});
return found;
}
/* HAND CSS (SITE OR PAGE CODE) AIMED AT A SHEET OR A PAGE: IT WINS OVER THE PANEL, SO THE PANEL SAYS SO AND CAN REMOVE IT */
function ovrKeys(kind, x) {
if (kind === "sheet") {
var keys = ['data-k="' + x.id + '"'];
(x.pages || []).forEach(function (id) { keys.push('data-page="' + id + '"', ".bd-pg-" + id); });
return keys;
}
return ['data-page="' + x.id + '"', ".bd-pg-" + x.id];
}
function ovrHit(sel, keys) {
return keys.some(function (k) { return sel.indexOf(k) > -1 && !(k.charAt(0) === "." && new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\\w-]").test(sel)); });
}
function ovrFind(keys) {
var out = [];
var scan = function (css, where) {
var sp = cssSplit(css || "");
[["desk", false], ["mob", true]].forEach(function (pp) {
cssRules(sp[pp[0]]).forEach(function (r) {
if (r.sel.indexOf("@") === 0 || !ovrHit(r.sel, keys)) return;
out.push({ where: where, phone: pp[1], props: declList(r.body).map(function (d) { return d.prop; }) });
});
});
};
scan(S.project.site.css, "Site CSS");
S.project.order.forEach(function (id) { var q = S.project.pages[id]; if (q && q.css) scan(q.css, "Page CSS · " + (q.title || id)); });
return out;
}
function ovrStrip(css, keys) {
var sp = cssSplit(css || "");
var cut = function (part) {
var rules = cssRules(part).filter(function (r) { return r.sel.indexOf("@") !== 0 && ovrHit(r.sel, keys); });
for (var i = rules.length - 1; i >= 0; i--) part = part.slice(0, rules[i].start) + part.slice(rules[i].close + 1);
return part.replace(/\n{3,}/g, "\n\n");
};
return cssJoin(cut(sp.desk), cut(sp.mob));
}
function ovrClear(keys) {
S.project.site.css = ovrStrip(S.project.site.css, keys);
S.project.order.forEach(function (id) { var q = S.project.pages[id]; if (q && q.css) q.css = ovrStrip(q.css, keys); });
}
/* A BLEND MODE ON A SHEET (USUALLY A GRAIN LAYER IN SITE CSS) ISOLATES THE SHEET, SO ITS BLUR SEES NOTHING BEHIND IT */
function blendRules() {
var out = [];
var sp = cssSplit(S.project.site.css || "");
["desk", "mob"].forEach(function (part) {
cssRules(sp[part]).forEach(function (r) {
if (r.sel.indexOf("@") === 0) return;
if (!/\.bd-ly-(k|paper|pane|sheet)/.test(r.sel)) return;
if (declList(r.body).some(function (d) { return d.prop === "mix-blend-mode" && !/normal/.test(d.val); })) out.push({ part: part, r: r });
});
});
return out;
}
function blendNote() {
if (!blendRules().length) return "";
return '<div class="bd-ed-ovr"><div class="bd-ed-hint">A blend mode in Site CSS lies on the sheets, which switches their blur off (it can’t see through a blend). Grain below does the same paper texture without it.</div><button class="bd-ed-btn is-sm" data-act="grain-swap">Use Grain instead</button></div>';
}
function grainSwap() {
var sp = cssSplit(S.project.site.css || "");
["desk", "mob"].forEach(function (part) {
var rules = cssRules(sp[part]).filter(function (r) { return r.sel.indexOf("@") !== 0 && /\.bd-ly-(k|paper|pane|sheet)/.test(r.sel) && declList(r.body).some(function (d) { return d.prop === "mix-blend-mode" && !/normal/.test(d.val); }); });
for (var i = rules.length - 1; i >= 0; i--) sp[part] = sp[part].slice(0, rules[i].start) + sp[part].slice(rules[i].close + 1);
sp[part] = sp[part].replace(/\/\*\s*PAPER\s*\*\/\s*(?=\n|$)/g, "").replace(/\n{3,}/g, "\n\n");
});
S.project.site.css = cssJoin(sp.desk, sp.mob);
sheetList().forEach(function (k) { if (!parseFloat(k.grain)) k.grain = 22; });
}
function ovrNote(kind, x, i) {
var ov = ovrFind(ovrKeys(kind, x));
if (!ov.length) return "";
var props = [];
var where = [];
ov.forEach(function (o) {
o.props.forEach(function (p) { if (props.indexOf(p) < 0) props.push(p); });
var w = o.where + (o.phone ? " · phone" : "");
if (where.indexOf(w) < 0) where.push(w);
});
return '<div class="bd-ed-ovr"><div class="bd-ed-hint">Code overrides this ' + kind + " (" + esc(props.join(", ")) + ") in " + esc(where.join(", ")) + ". Those lines win over the settings below.</div>" + '<button class="bd-ed-btn is-sm" data-act="ovr-clear" data-kind="' + kind + '" data-i="' + (i == null ? "" : i) + '">Remove the code overrides</button></div>';
}
function clearElCss(e) {
var key = ".bd-e-" + e.id;
var strip = function (css) {
var sp = cssSplit(css);
var cut = function (part) {
var rules = cssRules(part).filter(function (r) { return r.sel.indexOf(key) > -1; });
for (var i = rules.length - 1; i >= 0; i--) part = part.slice(0, rules[i].start) + part.slice(rules[i].close + 1);
return part.replace(/\n{3,}/g, "\n\n");
};
return cssJoin(cut(sp.desk), cut(sp.mob));
};
S.project.site.css = strip(S.project.site.css);
curPage().css = strip(curPage().css);
}
function lookSection(e) {
var ov = elCssOverrides(e);
var props = [];
ov.forEach(function (o) { o.props.forEach(function (x) { if (props.indexOf(x) < 0) props.push(x); }); });
var warn = ov.length ? '<div class="bd-ed-hint" style="color:var(--e-warn)">Code overrides this block (' + esc(props.join(", ")) + ") in " + esc(ov.map(function (o) { return (o.where === "site" ? "Site CSS" : "Page CSS") + (o.phone ? " · phone" : ""); }).filter(function (x, i, a) { return a.indexOf(x) === i; }).join(", ")) + '), so those win over the fields below.</div><button class="bd-ed-btn is-sm" data-act="el-css-clear">Remove the code overrides</button>' : "";
return '<span class="bd-ed-label bd-ed-look">Look</span>' + warn + styleFields(e.type, "el", e) + '<div class="bd-ed-hint">Empty or “Site” follows the ' + esc(BD_TYPE_NAME[e.type]) + " master in Styles → Blocks. Set a value here to change only this one.</div>";
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
var RT = toolLayout().right.filter(function (id) { return !toolHidden(id); });
if (RT.indexOf(S.rightTab) < 0) S.rightTab = "sel";
if (S.masterSel) S.rightTab = "sel";
var rtabs = RT.length ? tabsHTML("right", S.rightTab, '<button data-act="right-tab" data-val="sel" class="' + (S.rightTab === "sel" ? "is-on" : "") + '">Selected</button>') : "";
if (RT.length && S.rightTab !== "sel") {
R.innerHTML = rtabs + panelHTML(S.rightTab);
return;
}
if (rtabs) {
renderRightInner(R);
R.insertAdjacentHTML("afterbegin", rtabs);
return;
}
renderRightInner(R);
}
function renderRightInner(R) {
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
if (S.masterSel && !e) {
R.innerHTML = masterPanelHTML();
return;
}
if (S.postMaster && !e) {
R.innerHTML = masterPanelHTML();
return;
}
var sk = S.sheetSel ? sheetList().map(function (k) { return k.id; }).indexOf(S.sheetSel) : -1;
if (sk > -1 && !e) {
R.innerHTML = sheetPanelHTML(sk);
return;
}
if (e && !S.preview) {
syncInsToBlock(e);
var n = nCols(pg);
h += '<div class="bd-ed-sec"><div class="bd-ed-head"><span class="bd-ed-title">' + BD_TYPE_NAME[e.type] + '</span><button class="bd-ed-btn" style="height:26px" data-act="deselect">Done</button></div>'
+ blockContent(e) + "</div>";
h += '<div class="bd-ed-sec">' + adv("blk-fine", "Fine-tune any part (writes CSS)", '<div class="bd-ed-hint">For what Look doesn’t cover: pick a word, link or image inside the block and set any property. It’s saved as code and wins over Look.</div>' + insPanel(true)) + "</div>";
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
var pgw = layersOn() ? sheetOf(pg.id) : null;
var onSheet = !!(pgw && pgw.k > -1 && !pg.parent);
var cardOn = !onSheet || pageMode(pg) === "card";
skinColour(pg.parent ? "post" : !onSheet ? "under" : pg.blog ? "blog" : "page");
var ph = S.mode === "phone";
var bx = pg.box || {};
var four = function (pre) {
return '<div class="bd-ed-row" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + BOX_SIDES.map(function (sd) {
var k = pre + sd[0] + (ph ? "M" : "");
return '<label class="bd-ed-field"><span class="bd-ed-label">' + sd[1] + '</span><input class="bd-ed-input bd-ed-n" data-bind="page.box.' + k + '" value="' + esc(bx[k] == null ? "" : bx[k]) + '"' + (ph && bx[pre + sd[0]] ? ' placeholder="' + esc(bx[pre + sd[0]]) + '"' : "") + "></label>";
}).join("") + "</div>";
};
var menuBox = function (m) { return '<label class="bd-ed-check"><input type="checkbox" data-act="page-menu" data-id="' + m.id + '"' + (m.items.some(function (it) { return it.type === "page" && it.page === pg.id; }) ? " checked" : "") + ">" + (s.menus.length > 1 ? esc(m.name) : "Show in menu") + "</label>"; };
var det = (s.menus.length === 1 ? '<div class="bd-ed-two" style="grid-template-columns:minmax(0,1fr) auto">' + input("page.title", pg.title, "", ' aria-label="Title" placeholder="Title"') + menuBox(s.menus[0]) + "</div>" : field("Title", input("page.title", pg.title)) + '<span class="bd-ed-label">Show in menus</span>' + s.menus.map(menuBox).join(""))
+ (false && pg.slug === "" ? '<div class="bd-ed-hint">' + I.home.replace("<svg", '<svg style="width:12px;height:12px;vertical-align:-2px"') + " Home page</div>" : "")
+ (pg.parent ? '<span class="bd-ed-label">Post</span>' + row(field("Blog", select("page.parent", pg.parent, blogs().map(function (b) { return [b.id, b.title]; }))), field("Date", '<input type="date" class="bd-ed-input" data-bind="page.date" value="' + esc(pg.date || "") + '">'))
+ field("Excerpt for the card", '<textarea class="bd-ed-input" data-bind="page.excerpt" rows="3">' + esc(pg.excerpt || "") + "</textarea>")
+ coverField(pg)
+ sw("Featured ★", "page.featured", !!pg.featured) : "")
+ (pg.blog ? sw("Arrows at the end of this blog’s posts", "page.postArrows", pg.postArrows !== false) + '<div class="bd-ed-hint">' + (postArrowsCfg().on ? "Master · Blog has post arrows on. Switch off to hide them on every post of this blog." : "Post arrows are off in Master · Blog, so this does nothing yet.") + "</div>" : "")
+ (pg.blog ? field("This blog’s title shows", select("page.titleMode", pg.titleMode || "", [["", "Site"]].concat(HEAD_MODES))) + field("Its posts’ titles show", select("page.postTitleMode", pg.postTitleMode || "", [["", "Site"]].concat(HEAD_MODES))) : "")
+ (pg.blog ? sw("Post info on this blog’s posts", "page.postInfo", pg.postInfo !== false) + '<div class="bd-ed-hint">Switch off to hide the Post info block (back link, words, minutes) on every post of this blog.</div>' : "")
+ (pg.kind !== "pin" ? sw("Show the title", "page.header", pg.header !== false) + '<div class="bd-ed-hint">' + (s.header ? "The page heading at the top. Switch off to hide it on this page only." : "Page title at the top is off in Site, so this does nothing yet.") + "</div>" : "")
+ field("Description", '<textarea class="bd-ed-input" data-bind="page.desc" rows="3" style="font-family:var(--e-sans);font-size:12.5px">' + esc(pg.desc) + "</textarea>")
+ field("Group", select("page.section", pg.section, [["", "No group"]].concat(s.sections.map(function (x) { return [x.key, x.label]; }))));
if (onSheet) h += '<div class="bd-ed-sec bd-ed-skin bd-ed-sheetbar" data-act="sheet-sel" data-id="' + esc(pgw.sheet.id) + '" title="Open the sheet\'s settings"><span class="bd-ed-title">' + esc(pgw.sheet.name || "Sheet") + "</span></div>";
h += (pg.parent ? skin("Post", SK.det, '<div class="bd-ed-hint">' + (postFollows(pg) ? "This post follows All posts · master." : "This post has its own settings. Inherit all brings it back to All posts · master.") + '</div><button class="bd-ed-btn" data-act="post-master">' + I.sliders + "Edit All posts · master</button>") : "") + skin("Details", SK.det, det);
var lay = "";
if (onSheet) {
lay += '<span class="bd-ed-label">This page is</span>' + seg("page.mode", pageMode(pg), [["sheet", "Sheet"], ["card", "Card"]])
;
lay += '<span class="bd-ed-label">Where it lies · ' + esc(pgw.sheet.name || "Sheet") + '</span><div class="bd-lay-box">' + layoutDrawing(pgw.k, pg, "page") + "</div>";
}
if (pg.parent) lay += '<span class="bd-ed-label">Margin · outside the page</span>' + four("m");
lay += two(field("Max width" + (ph ? " · phone" : ""), input("page.box.maxW" + (ph ? "M" : ""), (ph ? bx.maxWM : bx.maxW) || "", "", ' placeholder="720 or 60%"')), field("Padding" + (ph ? " · phone" : ""), '<input class="bd-ed-input bd-ed-n" data-bind="padall.page" data-type="blank" value="' + esc(bx["pt" + (ph ? "M" : "")] == null ? "" : bx["pt" + (ph ? "M" : "")]) + '" placeholder="all sides">'));
if (isMaster(pg)) lay += '<span class="bd-ed-label">Columns & grid</span>' + rulerCols(pg, S.mode === "phone", false, true);
h += skin("Layout", SK.lay, lay);

var pgOvr = ovrNote("page", pg);
var sty = pgOvr + (cardOn ? fillIn("Card colour", "page.box.card", bx.card || "", "#ffffff", "None") + (pg.parent ? fillIn("Behind the page", "page.sheetBg", pg.sheetBg || "", "#ffffff", "Site") : "") : "")
+ (cardOn ? two(numIn("Card see-through %", "page.box.cardA", bx.cardA == null ? "" : bx.cardA, "blank"), numIn("Blur", "page.box.blur", bx.blur == null ? "" : bx.blur, "blank")) : "")
+ (cardOn && onSheet ? '<span class="bd-ed-label">Decoration</span>' + patThumbs("page.pattern", pg.pattern || "", [["", "Inherit"], ["none", "None"]]) : "")
+ (cardOn && !onSheet && !pg.parent ? '<span class="bd-ed-label">Decoration</span>' + patThumbs("page.pattern", pg.pattern || "", [["", "None"]]) : "")
+ (cardOn ? numIn("Corners", "page.box.radius", bx.radius == null ? "" : bx.radius, "blank") + rimPanel("page.box.", bx, true) : '<div class="bd-ed-hint">This page uses its sheet’s edges. Make it a Card to give it its own.</div>');
h += (onSheet ? skinFold : skin)("Style", SK.sty, sty, cardOn || !!pgOvr);
var stack = "";
S.project.order.forEach(function (id) {
var q = S.project.pages[id];
if (q.kind === "pin" || q.id === pg.id) return;
stack += '<label class="bd-ed-check"><input type="checkbox" data-act="stack-page" data-id="' + q.id + '"' + ((pg.stack || []).indexOf(q.id) > -1 ? " checked" : "") + ">" + esc((q.num ? q.num + "  " : "") + q.title) + "</label>";
});
if (!layersOn()) h += '<div class="bd-ed-sec">' + adv("pg-stack", "Continue with other pages", '<div class="bd-ed-hint">Chosen pages scroll on below this one, like one long page.</div>' + stack) + "</div>";
h += inhDelBar("page", null, '<button class="bd-ed-btn is-danger" data-act="page-del">' + I.trash + "Delete page</button>");
}
var free = '<div class="bd-ed-seg"><button data-act="layout" data-val="master" class="' + (isMaster(pg) ? "is-on" : "") + '">Columns</button><button data-act="layout" data-val="free" class="' + (isMaster(pg) ? "" : "is-on") + '">Free grid</button></div><div class="bd-ed-hint">' + (isMaster(pg) ? "Blocks stack in columns. Free grid lets you place them anywhere, row by row." : "Blocks sit anywhere on the grid. Columns stacks them again in order.") + "</div>"
+ (S.mode === "phone" && !isMaster(pg) ? '<button class="bd-ed-btn" data-act="restack">' + I.restack + "Restack phone from desktop</button>" : "");
if (pg.kind === "pin" && isMaster(pg)) h += '<div class="bd-ed-sec">' + adv("pg-cols", "Columns & grid", rulerCols(pg, S.mode === "phone"), false) + "</div>";
if (pg.kind === "pin") h += '<div class="bd-ed-sec"><div class="bd-ed-hint">Add blocks from the rail. Tap a block to edit and style it; tap text again to type. Drag to reorder or move between columns. ' + I.target.replace("<svg", '<svg style="width:12px;height:12px;vertical-align:-2px"') + " in the rail styles anything on the page.</div></div>";
R.innerHTML = pg.kind === "pin" ? h : skinWrap(h);
}

/* CODE DRAWER */
var CODE_TABS = [["site", "Site CSS"], ["page", "Page CSS"], ["head", "Head"], ["el", "Block"], ["out", "Full output"], ["files", "Files"]];
function codeBlock() {
var id = S.codeBlockId;
var b = id ? curPage().els.filter(function (x) { return x.id === id; })[0] : null;
return b || selEl();
}
function codeValue(tab) {
var pg = curPage();
var e = tab === "el" ? codeBlock() : selEl();
if (tab === "site") return S.project.site.css || "";
if (tab === "head") return S.project.site.head || "";
if (tab === "page") return pg.css || "";
if (tab === "files") return S.filePath && S.files[S.filePath] ? S.files[S.filePath].text : "";
if (tab === "el") {
if (!e) return "";
if (e.type === "text") return e.props.html;
if (e.type === "html") return e.props.code;
var keep = S.renderPage;
S.renderPage = curPage();
var out = elHTML(e, "export");
S.renderPage = keep;
return out;
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
var EDITOR_CSS = "site/admin/grid.css";
function codeViewOn(id, cur) {
if (id === "editor") return cur === "files" && S.filePath === EDITOR_CSS;
if (id === "files") return cur === "files" && S.filePath !== EDITOR_CSS;
return cur === id;
}
function codeMode(tab) {
var e = selEl();
if (tab === "site" || tab === "page") return "css";
if (tab === "head") return "htmlmixed";
if (tab === "files") return fileMode(S.filePath);
if (tab === "el") return "htmlmixed";
return S.outTab === "css" ? "css" : S.outTab === "js" ? "javascript" : "htmlmixed";
}
function codeReadOnly(tab) {
if (tab === "out") return true;
if (tab === "el") return !codeBlock() || ["text", "html"].indexOf(codeBlock().type) < 0;
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
var CODE_VIEWS = [["out:css", "Full CSS"], ["el", "This block"], ["out:page", "Page HTML"], ["out:js", "JS"], ["head", "Head"], ["editor", "Editor CSS"], ["files", "Files"]];
/* EVERY RULE IN THE PUBLISHED CSS THAT STYLES ONE BLOCK */
function elRules(e) {
var keys = ["bd-e-" + e.id, BD_TYPE_CLASS[e.type] || "bd-none"];
var hit = function (sel) {
return keys.some(function (k) { return new RegExp("\\." + k.replace(/-/g, "\\-") + "(?![\\w-])").test(sel); });
};
var sp = cssSplit(exportCSS());
var pick = function (css) {
return cssRules(css).filter(function (r) { return hit(r.sel); }).map(function (r) { return r.sel + " {" + r.body.replace(/\s+$/, "") + "\n}"; });
};
var d = pick(sp.desk);
var m = pick(sp.mob);
return "/* EVERY RULE THAT STYLES THIS " + BD_TYPE_NAME[e.type].toUpperCase() + " — EDIT THEM HERE */\n" + d.join("\n") + (m.length ? "\n\n/* PHONE */\n" + m.join("\n") : "");
}
/* RULES IN THE PUBLISHED CSS THAT HIT ONE ELEMENT ON THE CANVAS (HOVER/STATE PSEUDO-CLASSES IGNORED) */
function nodeRules(node) {
var sp = cssSplit(exportCSS());
var hits = function (sel) {
return sel.split(",").some(function (one) {
var base = one.replace(/::?(before|after|placeholder|marker|selection|-webkit-[a-z-]+)/g, "").replace(/:(hover|focus|focus-visible|active|visited|first-child|last-child|checked|disabled)/g, "").trim();
if (!base || base.charAt(0) === ":" || base.indexOf("@") === 0) return false;
try {
return node.matches(base) || node.matches(base.replace(/^:root\s*/, ""));
} catch (err) {
return false;
}
});
};
var pick = function (css) {
return cssRules(css).filter(function (r) { return hits(r.sel); }).map(function (r) { return r.sel + " {" + r.body.replace(/\s+$/, "") + "\n}"; });
};
var d = pick(sp.desk);
var m = pick(sp.mob);
return d.join("\n") + (m.length ? "\n\n/* PHONE */\n" + m.join("\n") : "");
}
function nodeLabel(n) {
var c = (n.getAttribute("class") || "").split(/\s+/).filter(function (x) { return x && x.indexOf("is-selected") < 0; }).slice(0, 4).map(function (x) { return "." + x; }).join("");
return "<" + n.tagName.toLowerCase() + ">" + c;
}
function prettyHTML(h) {
return String(h).replace(/></g, ">\n<").replace(/ data-bd-[a-z-]+="[^"]*"/g, "").replace(/ is-selected/g, "");
}
/* EDITING PUBLISHED CSS: THE EDIT IS COMPARED WITH WHAT WAS SHOWN, AND ONLY THE DECLARATIONS YOU CHANGED ARE SAVED, AS OVERRIDES AT THE END OF YOUR CSS (PHONE ONES IN ITS ONE MOBILE BLOCK) */
function cssMapOf(css) {
var m = {};
cssRules(css).forEach(function (r) {
m[r.sel] = m[r.sel] || {};
declList(r.body).forEach(function (d) { m[r.sel][d.prop] = d.val; });
});
return m;
}
function rulesSplit(text) {
var t = String(text || "");
var i = t.search(/\/\*\s*PHONE\s*\*\//);
return i < 0 ? { desk: t, mob: "" } : { desk: t.slice(0, i), mob: t.slice(i).replace(/^\/\*\s*PHONE\s*\*\/\s*/, "") };
}
function cssFullSplit(text) {
return cssSplit(text);
}
function cssDiffApply(base, now) {
var changes = 0;
var kept = 0;
var site = cssSplit(S.project.site.css || "");
var parts = ["desk", "mob"];
parts.forEach(function (part) {
var bm, nm;
try {
bm = cssMapOf(base[part]);
nm = cssMapOf(now[part]);
} catch (err) {
return;
}
var target = site[part];
Object.keys(nm).forEach(function (sel) {
Object.keys(nm[sel]).forEach(function (prop) {
if (bm[sel] && bm[sel][prop] === nm[sel][prop]) return;
target = ruleSet(target, sel, [prop], nm[sel][prop]);
changes++;
});
});
Object.keys(bm).forEach(function (sel) {
Object.keys(bm[sel]).forEach(function (prop) {
if (nm[sel] && nm[sel][prop] != null) return;
var had = ruleGet(target, sel, [prop]);
if (had) {
target = ruleSet(target, sel, [prop], "");
changes++;
} else kept++;
});
});
site[part] = target;
});
if (changes) {
S.project.site.css = cssJoin(site.desk, site.mob);
scheduleSave();
renderTop();
renderCanvas();
}
return { changes: changes, kept: kept };
}
/* A HALF-TYPED EDIT IS NEVER WRITTEN: BRACES MUST CLOSE AND THE ONE PHONE BLOCK MUST STILL BE THERE, OTHERWISE PHONE RULES WOULD LAND IN THE DESKTOP PART AS OVERRIDES */
function cssWhole(text, base) {
var t = String(text || "").replace(/\/\*[\s\S]*?\*\//g, "");
var o = (t.match(/\{/g) || []).length;
var c = (t.match(/\}/g) || []).length;
if (o !== c) return false;
if (base && base.mob && String(base.mob).trim() && !/@media\s*\(max-width:\s*760px\)/.test(t) && !/\/\*\s*PHONE\s*\*\//.test(String(text))) return false;
return true;
}
function cssEditLive(base, text, kind) {
clearTimeout(S.cssLiveT);
var msg0 = $("bd-code-msg");
if (!cssWhole(text, base)) {
if (msg0) msg0.textContent = "Waiting for the code to be complete (every { needs its }).";
return;
}
S.cssLiveT = setTimeout(function () { cssEditApply(base, text, kind); }, 450);
}
function cssEditApply(base, text, kind) {
if (S.pendingSnap) {
snap();
S.pendingSnap = false;
}
var now = kind === "full" ? cssSplit(text) : rulesSplit(text);
var r = cssDiffApply(base, now);
var msg = $("bd-code-msg");
if (msg) msg.textContent = r && r.kept ? "Some lines come from a panel and can’t be removed here — change them in the panel." : "";
if (r && r.changes) {
base.desk = now.desk;
base.mob = now.mob;
}
}
/* SEARCH BOX ABOVE THE CODE: ALL MATCHES MARKED, ENTER / ARROWS STEP THROUGH THEM */
function codeFind(q, step) {
S.findMarks = S.findMarks || [];
S.findMarks.forEach(function (m) { try { m.clear(); } catch (err) {} });
S.findMarks = [];
var cms = (S.cms || []).filter(Boolean);
var hits = [];
if (q) cms.forEach(function (cm) {
var t = cm.getValue().toLowerCase();
var n = q.toLowerCase();
var i = t.indexOf(n);
while (i > -1 && hits.length < 4000) {
hits.push({ cm: cm, from: cm.posFromIndex(i), to: cm.posFromIndex(i + n.length) });
i = t.indexOf(n, i + n.length);
}
});
hits.forEach(function (h) { S.findMarks.push(h.cm.markText(h.from, h.to, { className: "bd-find-hit" })); });
var n = hits.length;
S.findAt = n ? ((step === 0 ? S.findAt || 0 : (S.findAt || 0) + step) % n + n) % n : 0;
var out = $("bd-find-count");
if (out) out.textContent = q ? (n ? S.findAt + 1 + " / " + n : "none") : "";
if (n) {
var h = hits[S.findAt];
h.cm.setSelection(h.from, h.to);
h.cm.scrollIntoView({ from: h.from, to: h.to }, 80);
}
}
function codeCM(host, val, mode, ro, onChange) {
if (!window.CodeMirror) {
var ta = document.createElement("textarea");
ta.spellcheck = false;
ta.readOnly = !!ro;
ta.value = val;
ta.id = onChange ? "bd-code-ta-live" : "";
if (onChange) ta.addEventListener("input", function () { clearTimeout(S.codeTimer); S.codeTimer = setTimeout(function () { onChange(ta.value); }, 220); });
host.appendChild(ta);
/* THE SAME CALLS AS CODEMIRROR USES HERE, SO SEARCH AND JUMPS STILL WORK ON A PLAIN BOX */
return {
ta: ta,
getValue: function () { return ta.value; },
setValue: function (v) { ta.value = v; },
getOption: function (k) { return k === "readOnly" ? !!ro : null; },
posFromIndex: function (i) { return { line: 0, ch: i }; },
markText: function () { return { clear: function () {} }; },
setSelection: function (a, b) { try { ta.setSelectionRange(a.ch, b.ch); } catch (err) {} },
scrollIntoView: function () {},
refresh: function () {},
execCommand: function () { ta.select(); }
};
}
var cm = CodeMirror(host, { value: val, mode: mode, lineNumbers: true, lineWrapping: true, smartIndent: false, electricChars: false, indentUnit: 2, tabSize: 2, readOnly: ro, viewportMargin: 400, extraKeys: { "Cmd-S": function () { publish(); }, "Ctrl-S": function () { publish(); }, "Cmd-F": "findPersistent", "Ctrl-F": "findPersistent" } });
cm.setSize("100%", "100%");
if (onChange) {
cm.on("focus", function () { S.pendingSnap = true; });
cm.on("change", function (inst, ch) {
if (ch.origin === "setValue") return;
clearTimeout(S.codeTimer);
S.codeTimer = setTimeout(function () { onChange(cm.getValue()); }, 220);
});
}
setTimeout(function () { cm.refresh(); }, 0);
setTimeout(function () { cm.refresh(); }, 250);
return cm;
}
function renderCode() {
$("bd-code").innerHTML = "";
$("bd-app").classList.remove("has-code");
S.cm = null;
var C = $("bd-code-slot");
if (!S.codeOpen || !S.project) {
if (C) renderLeft();
return;
}
if (!C) {
renderLeft();
return;
}
var tab = S.codeTab || "out";
if (tab === "out" && ["css", "page", "js"].indexOf(S.outTab) < 0) S.outTab = "css";
var cur = tab === "out" ? "out:" + S.outTab : tab;
var e = selEl();
var hint = "";
if (cur === "out:css") hint = "Everything the site uses, exactly as Publish writes it: base styles, your Styles and Looks, layers, then Your CSS. Read-only: change it with the panels or Your CSS.";
if (cur === "out:page") hint = "The published HTML of this page. Read-only.";
if (cur === "out:js") hint = "The published script. Read-only.";
if (tab === "site") hint = "Your own CSS for every page. It comes last, so it wins over Styles and Look. Phone rules go in the one @media (max-width: 760px) block at the end.";
if (tab === "page") hint = "CSS for this page only.";
if (tab === "head") hint = "HTML in the <head> of every page: fonts, favicon, analytics.";
var tapped = S.codeNode && shadow && shadow.contains(S.codeNode) ? S.codeNode : null;
/* A TAPPED ELEMENT BELONGS TO A BLOCK; A TEXT OR HTML BLOCK'S CODE IS EDITABLE AS A WHOLE, ANY OTHER BLOCK'S ONLY AFTER IT BECOMES AN HTML BLOCK */
var owner = null;
if (tapped && tapped.closest) {
var oh = tapped.closest('[class*="bd-e-"]');
var om = oh ? (oh.getAttribute("class") || "").match(/bd-e-([\w]+)/) : null;
if (om) owner = curPage().els.filter(function (x) { return x.id === om[1]; })[0] || null;
}
if (owner && (owner.type === "text" || owner.type === "html")) {
e = owner;
S.codeBlockId = owner.id;
S.codeJumpNode = tapped;
tapped = null;
} else {
S.codeBlockId = e ? e.id : "";
S.codeJumpNode = null;
}
var target = tapped ? owner : e;
var editableHtml = !!(e && (e.type === "text" || e.type === "html"));
var elLabel = tapped ? nodeLabel(tapped) : e ? BD_TYPE_NAME[e.type].toLowerCase() : "";
if (tab === "el") hint = tapped ? "Inspecting " + elLabel + ". Top: its HTML (read-only until its block becomes an HTML block). Below: every published rule that styles it — edit them directly; each change you make is saved as an override in your CSS." : e ? "Inspecting the selected " + BD_TYPE_NAME[e.type].toLowerCase() + ". Top: its HTML" + (editableHtml ? " — edit it directly" : " as published (read-only until the block becomes an HTML block)") + ". Below: every published rule that styles it — edit them directly. Tap anything on the page to inspect it." : "Tap anything on the page to inspect its HTML and every rule that styles it. Then edit them right here.";
if (cur === "out:css") hint = "Everything the site uses, exactly as Publish writes it. Edit any value: only what you change is saved, as an override at the end of your CSS (phone rules in its one mobile block).";
var html = '<div class="bd-ed-codebar">' + CODE_VIEWS.map(function (t) {
return '<button data-act="code-tab" data-val="' + t[0] + '" class="' + (codeViewOn(t[0], cur) ? "is-on" : "") + '">' + t[1] + "</button>";
}).join("") + '</div>' + (tab === "files" && !S.filePath ? "" : '<div class="bd-ed-codefind"><input class="bd-ed-input" id="bd-find" placeholder="Search this code" aria-label="Search this code" value="' + esc(S.findQ || "") + '" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="bd-ed-btn is-sm" data-act="code-find" data-val="-1" aria-label="Previous match">↑</button><button class="bd-ed-btn is-sm" data-act="code-find" data-val="1" aria-label="Next match">↓</button><span class="bd-ed-label" id="bd-find-count"></span></div>') + '<div class="bd-ed-hint bd-ed-codehint">' + esc(hint) + (tab === "out" ? ' <button class="bd-ed-btn is-sm" data-act="copy-out">' + I.copy + "Copy</button>" : "") + '<span id="bd-code-msg"></span></div>';
if (tab === "el" && target && !(target.type === "text" || target.type === "html")) {
html += S.codeConfirm === target.id
? '<div class="bd-ed-hint bd-ed-codehint">Turn this ' + esc(BD_TYPE_NAME[target.type].toLowerCase()) + ' block into an HTML block? Its panel and Look settings stop applying. Undo brings it back. <button class="bd-ed-btn is-sm" data-act="code-html-yes">Turn into HTML</button> <button class="bd-ed-btn is-sm" data-act="code-html-no">Keep</button></div>'
: '<div class="bd-ed-actions" style="padding:0 10px 6px"><button class="bd-ed-btn is-sm" data-act="code-html-ask">Make this block’s HTML editable</button></div>';
}
if (tab === "files") html += '<div class="bd-ed-codefiles">' + filesSide() + "</div>";
html += '<div class="bd-ed-code-body" id="bd-code-host"></div>';
if (tab === "el" && (e || tapped)) html += '<span class="bd-ed-label bd-ed-codehint">Styles on this ' + (tapped ? "element" : "block") + '</span><div class="bd-ed-code-body is-rules" id="bd-code-rules"></div>';
C.innerHTML = html;
S.cms = [];
if (tab === "el" && tapped) {
S.cms.push(codeCM($("bd-code-host"), prettyHTML(tapped.outerHTML).slice(0, 60000), "htmlmixed", true, null));
var rb = rulesSplit(nodeRules(tapped));
var rtext = "/* EVERY PUBLISHED RULE THAT HITS " + nodeLabel(tapped).toUpperCase() + " — EDIT THEM HERE */\n" + nodeRules(tapped);
var rbase = { desk: rulesSplit(rtext).desk, mob: rulesSplit(rtext).mob };
S.cms.push(codeCM($("bd-code-rules"), rtext, "css", false, function (v) { cssEditLive(rbase, v, "rules"); }));
S.cm = S.cms[0];
} else if (tab === "out" && S.outTab === "css") {
var full = codeValue("out");
var fbase = cssSplit(full);
S.cm = codeCM($("bd-code-host"), full, "css", false, function (v) { cssEditLive(fbase, v, "full"); });
S.cms.push(S.cm);
} else {
var ro = codeReadOnly(tab);
var val = ro && tab !== "out" && !(tab === "el" && e) ? "" : codeValue(tab);
S.cm = codeCM($("bd-code-host"), val, codeMode(tab), ro, ro ? null : function (v) { applyCodeValue(tab, v); });
S.cms.push(S.cm);
if (S.cm && S.cm.on) setTimeout(jumpCode, 0);
if (tab === "el" && e) {
var etext = elRules(e);
var ebase = { desk: rulesSplit(etext).desk, mob: rulesSplit(etext).mob };
S.cms.push(codeCM($("bd-code-rules"), etext, "css", false, function (v) { cssEditLive(ebase, v, "rules"); }));
if (S.cm && S.codeJumpNode && editableHtml) setTimeout(function () { jumpNode(S.cm, S.codeJumpNode); }, 30);
}
}
var fi = $("bd-find");
if (fi) {
fi.addEventListener("input", function () { S.findQ = fi.value; S.findAt = 0; codeFind(fi.value, 0); });
fi.addEventListener("keydown", function (ev) { if (ev.key === "Enter") { ev.preventDefault(); codeFind(fi.value, ev.shiftKey ? -1 : 1); } });
if (S.findQ) codeFind(S.findQ, 0);
}
var fp = $("bd-file-pick");
if (fp) fp.addEventListener("change", function () { openFile(fp.value); });
}
/* JUMP THE HTML EDITOR TO THE ELEMENT YOU TAPPED INSIDE A TEXT OR HTML BLOCK */
function jumpNode(cm, node) {
if (!cm || !node) return;
var tag = "<" + node.tagName.toLowerCase();
var txt = (node.textContent || "").trim().slice(0, 24);
var val = cm.getValue();
var i = -1;
if (txt) {
var ti = val.indexOf(txt);
if (ti > -1) i = val.lastIndexOf(tag, ti);
}
if (i < 0) i = val.indexOf(tag);
if (i < 0) return;
var from = cm.posFromIndex(i);
cm.setSelection(from, cm.posFromIndex(val.indexOf(">", i) + 1 || i + tag.length));
cm.scrollIntoView(from, 80);
}
/* A GENERATED BLOCK BECOMES AN HTML BLOCK HOLDING ITS PUBLISHED HTML (THE BLOCK'S OWN WRAPPER CLASSES ARE DROPPED SO ITS RULES DON'T APPLY TWICE) */
function blockToHtml(e) {
var keep = S.renderPage;
S.renderPage = curPage();
var out = elHTML(e, "export");
S.renderPage = keep;
var tpl = document.createElement("template");
tpl.innerHTML = out.trim();
var root = tpl.content.firstElementChild;
var inner = out;
if (root) {
root.classList.remove("bd-el", "bd-e-" + e.id);
root.removeAttribute("style");
inner = root.outerHTML;
}
snap();
e.type = "html";
e.props = { code: prettyHTML(inner) };
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
if (tab === "el" && S.codeBlockId) e = curPage().els.filter(function (x) { return x.id === S.codeBlockId; })[0] || e;
if (S.pendingSnap && tab !== "files") {
snap();
S.pendingSnap = false;
}
if (tab === "site") S.project.site.css = v;
if (tab === "page") curPage().css = v;
if (tab === "head") S.project.site.head = v;
if (tab === "files") {
if (S.filePath && S.files[S.filePath]) S.files[S.filePath].text = v;
if (S.filePath === EDITOR_CSS) {
var ls = $("bd-editor-live");
if (!ls) {
ls = document.createElement("style");
ls.id = "bd-editor-live";
document.head.appendChild(ls);
}
ls.textContent = v;
}
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
var BD_TYPE_CLASSES = ["bd-text", "bd-notes", "bd-figure", "bd-gallery", "bd-library", "bd-link", "bd-list", "bd-embed", "bd-html", "bd-rule", "bd-ptitle", "bd-menubtn", "bd-ix", "bd-pagerbar", "bd-posts", "bd-postinfo", "bd-quote", "bd-toggle", "bd-product"];
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
r.innerHTML = S.project ? toolZoneHTML("rail") : "";
}

/* CANVAS */
var shadow = null;
S.zoom = 1;
window.__bdInkCache = window.__bdInkCache || {};
/* HIDE OR SHOW THE SIDE PANELS ON WIDE SCREENS SO THE PAGE GETS THE ROOM */
function wideScreen() {
return window.innerWidth > 980;
}
function applyPanels() {
var app = $("bd-app");
var wide = wideScreen();
var hl = wide && S.hideLeft;
var hr = wide && S.hideRight;
app.classList.toggle("is-no-left", !!hl);
app.classList.toggle("is-no-right", !!hr);
app.style.setProperty("--e-rw", "380px");
document.querySelectorAll('[data-act="toggle-left"]').forEach(function (b) { b.classList.toggle("is-on", wide ? !hl : !!S.leftOpen); b.setAttribute("aria-label", hl ? "Show left panel" : "Hide left panel"); });
document.querySelectorAll('[data-act="toggle-right"]').forEach(function (b) { b.classList.toggle("is-on", wide ? !hr : !!S.rightOpen); b.setAttribute("aria-label", hr ? "Show right panel" : "Hide right panel"); });
requestAnimationFrame(fitSheet);
}
function fitSheet() {
var sheet = $("bd-sheet");
var fit = $("bd-fit");
if (!S.project || sheet.hidden) return;
var w = parseFloat(sheet.style.width) || 782;
var avail = $("bd-stage").clientWidth - 80;
var spreadOn = false;
var fitK = avail / w;
if (spreadOn && sheet.offsetHeight) fitK = Math.min(fitK, ($("bd-stage").clientHeight - 80) / sheet.offsetHeight);
var k = Math.min(1, Math.max(spreadOn ? 0.12 : 0.35, fitK));
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
function rulerCols(page, phone, master, bare) {
var who = master ? "post" : layWho(page);
var L = master ? layFor("post") : lay(page);
var pin = page.kind === "pin";
var h = '<span class="bd-ed-rcols">';
if (!pin && !master && !bare) h += '<span class="bd-ed-seg">' + (page.parent ? [["post", "All posts"], ["page", "This post"]] : [["site", "Site"], ["page", "This page"]]).map(function (o) { return '<button data-act="page-own" data-val="' + o[0] + '" class="' + ((o[0] === "page") === !!page.ownLayout ? "is-on" : "") + '">' + o[1] + "</button>"; }).join("") + "</span>";
else if (pin) h += "<b>" + (page.pin.place === "bottom" ? "Footer" : "Header") + "</b>";
if (phone) {
h += L.cols < 2 ? "<span>1 column on phone</span>" : '<span>Phone</span><span class="bd-ed-seg">' + [1, 2].map(function (n) { return '<button data-act="lay-colsM" data-who="' + who + '" data-val="' + n + '" class="' + (L.colsM === n ? "is-on" : "") + '">' + n + "</button>"; }).join("") + "</span>"
+ (L.cols > 1 ? '<label class="bd-ed-rnum">Gutter<input class="bd-ed-input" inputmode="decimal" data-bind="' + layPath(who) + '.gutterM" data-type="int" value="' + L.gutterM + '"></label>' : "");
return h + "</span>";
}
h += '<span class="bd-ed-seg">' + [1, 2, 3].map(function (n) { return '<button data-act="lay-cols" data-who="' + who + '" data-val="' + n + '" class="' + (L.cols === n ? "is-on" : "") + '">' + n + (n === 1 ? " col" : "") + "</button>"; }).join("") + "</span>";
if (L.cols === 1 && !pin) h += '<span class="bd-ed-seg">' + [["center", "Centred"], ["spread", "Spread"]].map(function (o) { return '<button data-act="set" data-path="' + layPath(who) + '.align" data-val="' + o[0] + '" class="' + (L.align === o[0] ? "is-on" : "") + '">' + o[1] + "</button>"; }).join("") + "</span>";
if (L.cols > 1) {
h += '<select class="bd-ed-input bd-ed-rsel" data-act-select="lay-spans" data-who="' + who + '" aria-label="Column widths">' + SPAN_PRESETS[L.cols].map(function (sp) {
var v = sp.join("-");
return '<option value="' + v + '"' + (L.spans.join("-") === v ? " selected" : "") + ">" + sp.join(" · ") + "</option>";
}).join("") + "</select>"
+ '<label class="bd-ed-rnum">Gutter<input class="bd-ed-input" inputmode="decimal" data-bind="' + layPath(who) + '.gutter" data-type="int" value="' + L.gutter + '"></label>';
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
var deskEl = $("bd-desk");
if (!deskEl) {
deskEl = document.createElement("div");
deskEl.id = "bd-desk";
deskEl.className = "bd-ed-desk";
$("bd-stage").appendChild(deskEl);
}
deskEl.hidden = true;
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
ruler.innerHTML = "" + "<span>" + (S.inspect ? "Inspect · tap anything to style it · " + (phone ? "phone" : "desktop") : S.preview ? (layersOn() ? "Preview · the sheets move" : "Preview · menu and arrows work") : (phone ? "Phone" : "Desktop") + " · " + sheetW + 'px · <span id="bd-zoom">100%</span>' + (layersOn() && page.kind !== "pin" ? " · layers: Preview to see them move" : "")) + "</span>" + "<span>" + (master ? "Follows master" : "Free grid") + "</span>";
if (!shadow) {
shadow = sheet.attachShadow({ mode: "open" });
bindCanvas();
}
if (false) {
var sn = sheetList().map(function (k) { return k.id; }).indexOf(S.sheetSel);
if (sn > -1) {
ensurePhoneAll();
var sdoc = spreadDoc(sn, phone);
var mW = parseInt(sdoc.match(/id="bd-spread" style="position:relative;width:(\d+)px;height:(\d+)px/)[1], 10);
var mH = parseInt(sdoc.match(/id="bd-spread" style="position:relative;width:(\d+)px;height:(\d+)px/)[2], 10);
sheet.style.width = mW + "px";
ruler.style.maxWidth = mW + "px";
ruler.innerHTML = '<span>Spread · ' + esc(sheetList()[sn].name || "Sheet") + ' · the whole sheet laid flat · tap a page to edit it</span><span class="bd-ed-seg bd-ed-view"><button class="is-on" data-act="spread-view">Spread</button><button data-act="window-view">Window</button></span>';
var sfr = shadow.querySelector("iframe.bd-spread");
if (!sfr || sfr.bdDoc !== sdoc) {
shadow.innerHTML = '<style>:host{display:block}iframe{display:block;width:100%;border:0;background:#cfcdc6}</style><iframe class="bd-spread" title="Spread"></iframe>';
sfr = shadow.querySelector("iframe.bd-spread");
sfr.style.height = mH + "px";
sfr.bdDoc = sdoc;
sfr.srcdoc = sdoc;
}
requestAnimationFrame(fitSheet);
return;
}
}
if (S.preview && !S.inspect && layersOn()) {
ensurePhoneAll();
var start = page.kind === "pin" ? null : page;
var key = (start ? start.id : "") + "|" + (phone ? "p" : "d");
var css = exportCSS();
var js = exportJS();
var base = layerDoc(start, "view");
var fr = shadow.querySelector("iframe.bd-prev");
var fd = null;
try {
fd = fr && fr.contentDocument;
} catch (err) {}
/* ONLY THE LOOK CHANGED: RESTYLE IN PLACE, THE PREVIEW STAYS WHERE IT IS */
if (fr && fd && fr.bdKey === key && fr.bdBase === base && fr.bdJS === js && fd.getElementById("bd-prev-css")) {
if (fr.bdCSS !== css) {
fd.getElementById("bd-prev-css").textContent = css;
fr.bdCSS = css;
}
requestAnimationFrame(fitSheet);
return;
}
/* THE PAGE CHANGED: REBUILD (ONCE TYPING PAUSES), BUT OPEN WHERE YOU WERE AND KEEP THE SCROLL */
if (fr && fd && fr.bdKey === key && !S.prevNow) {
clearTimeout(S.prevT);
S.prevT = setTimeout(function () {
if (!S.preview) return;
S.prevNow = true;
try {
renderCanvas();
} finally {
S.prevNow = false;
}
}, 380);
return;
}
var keep = null;
if (fr && fd && fr.bdKey === key) {
var ly = fd.getElementById("bd-ly");
if (ly) {
keep = { focus: ly.getAttribute("data-focus"), scroll: {} };
fd.querySelectorAll(".bd-ly-content, .bd-ly-pane").forEach(function (x, i) { keep.scroll[i] = x.scrollTop; });
}
}
var at = keep && keep.focus && S.project.pages[keep.focus] ? S.project.pages[keep.focus] : start;
if (!fr) {
shadow.innerHTML = '<style>:host{display:block}iframe{display:block;width:100%;border:0;background:#fff}</style><iframe class="bd-prev" title="Preview"></iframe>';
fr = shadow.querySelector("iframe.bd-prev");
}
fr.style.height = (phone ? 844 : 820) + "px";
var doc = exportLayered(at, page.title + " — " + s.name);
var body = at === start ? base : layerDoc(at, "view");
fr.bdKey = key;
fr.bdBase = base;
fr.bdJS = js;
fr.bdCSS = css;
window.__bdPrevKeep = keep;
var back = "<script>try{var k=parent.__bdPrevKeep;if(k){document.querySelectorAll(\".bd-ly-content, .bd-ly-pane\").forEach(function(x,i){if(k.scroll[i])x.scrollTop=k.scroll[i];});}}catch(e){}<\/script>";
fr.srcdoc = (doc.replace(/<link rel="stylesheet" href="\/assets\/bd.css">/, '<style id="bd-prev-css">\n' + css.replace(/<\/style/gi, "<\\/style") + "\n</style>").replace(/<script src="\/assets\/bd.js" defer><\/script>/, "<script>window.BD_PREVIEW = true;<\/script>").replace(/<body([^>]*)>[\s\S]*<\/body>/, function (m, a) { return "<body" + a + ">\n" + body + "\n" + back + "\n<script>\n" + js.replace(/<\/script/gi, "<\\/script") + "\n<\/script>\n</body>"; }));
requestAnimationFrame(fitSheet);
return;
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
if (layersOn() && page.kind !== "pin") css += "\n" + layerEditCSS(page, phone);
shadow.innerHTML = "<style>" + css + '</style>' + (layersOn() && page.kind !== "pin" ? layerEditChrome(page) : "") + '<div class="bd-site' + (layersOn() && page.kind !== "pin" ? " is-layered" + (sheetOf(page.id).strip ? " is-strip" : "") : "") + (phone ? " is-phone" : "") + (S.inspect ? " is-inspect" : S.preview ? "" : " is-editing") + (page.kind === "pin" ? " is-pin-page" : "") + '" data-bd-page="' + esc(page.slug) + '">' + pageHTML(page, "edit") + "</div>";
var data = chromeData(page.slug);
data.open = !!S.menuOpen;
data.onToggle = function (o) { S.menuOpen = o; };
bdChrome(shadow, data, function (slug) {
var id = S.project.order.filter(function (i) { return S.project.pages[i].slug === slug && S.project.pages[i].kind !== "pin"; })[0];
if (id) goPage(id);
});
requestAnimationFrame(fitSheet);
bdInk(shadow);
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
S.rightTab = "sel";
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
if (S.codeOpen && id && id !== "__menu") {
S.codeTab = "el";
renderCode();
}
}
/* GRID + DRAG TO RESIZE — THE DRAWN WINDOW (1280×800 / 390×780) GETS A LINE EVERY 5%, THE HALVES MARKED; MARGINS AND PEEK ARE DRAGGED AND SNAP TO IT */
var GRID_STEP = 5;
function gridView(phone) {
return { w: phone ? 390 : 1280, h: phone ? 780 : 800 };
}
function gridPx(v) {
var s = String(v == null ? "" : v);
return /px$/.test(s) ? parseFloat(s) || 0 : 0;
}
function bindCanvas() {
shadow.addEventListener("pointerdown", function (e) {
if (!S.codeOpen) return;
var n = e.composedPath()[0];
if (!n || n.nodeType !== 1 || !n.closest || !n.closest(".bd-site")) return;
/* EDITING SWITCHES OFF CLICKS INSIDE BLOCKS, SO FIND THE DEEPEST ELEMENT UNDER THE FINGER BY ITS BOX */
var deep = n;
var walk = true;
while (walk) {
walk = false;
var kids = deep.children || [];
for (var ki = kids.length - 1; ki >= 0; ki--) {
var kr = kids[ki].getBoundingClientRect();
if (kr.width && kr.height && e.clientX >= kr.left && e.clientX <= kr.right && e.clientY >= kr.top && e.clientY <= kr.bottom && !/^(svg|filter|style|script)$/i.test(kids[ki].tagName) && !(kids[ki].classList && /bd-ed-/.test(kids[ki].className))) {
deep = kids[ki];
walk = true;
break;
}
}
}
S.codeNode = deep;
S.codeTab = "el";
setTimeout(renderCode, 0);
}, true);
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
S.sheetSel = "";
S.masterSel = false;
S.postMaster = false;
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
var cvp = S.project.pages[id].cover;
if (cvp && cvp.file) taken[cvp.file] = true;
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
/* OWN CARD IMAGE FOR A POST */
if (S.coverFor) {
var cpg = S.project.pages[S.coverFor];
S.coverFor = null;
if (!files.length || !cpg) return;
setStatus("Uploading…");
var csz = await imageSize(files[0]);
var cid = await storeImage(files[0]);
if (!cid) {
setStatus("Not published", true);
return;
}
snap();
var ctaken = takenFiles(null);
if (cpg.cover && cpg.cover.file) delete ctaken[cpg.cover.file];
cpg.cover = { assetId: cid, file: uniqueFile("card-" + (cpg.slug || "post") + "-" + files[0].name, ctaken), w: csz.w, h: csz.h, alt: cpg.h1 || cpg.title || "" };
changed();
renderRight();
return;
}
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
}).join("") + (window.BD_ELSEWHERE || []).map(function (x) {
return '<a class="bd-ed-proj" href="' + esc(x.admin) + '" target="_blank" rel="noopener"><span>' + esc(x.domain) + "</span><small>Own back office ↗</small></a>";
}).join("") + '</div><div class="bd-ed-sec"><span class="bd-ed-label">This site</span>'
+ '<a class="bd-ed-proj" href="' + esc(live) + '" target="_blank" rel="noopener"><span>' + esc(REPO.domain || location.host) + "</span><small>Open ↗</small></a>"
+ '<a class="bd-ed-proj" href="https://github.com/' + esc(REPO.owner + "/" + REPO.repo) + '" target="_blank" rel="noopener"><span>' + esc(REPO.owner + "/" + REPO.repo) + "</span><small>GitHub ↗</small></a>"
+ '<div class="bd-ed-hint">' + (hasDraft() ? "You have changes that aren’t on the live site yet. They’re kept in this browser until you publish." : "Everything here is on the live site.") + "</div></div>"
+ '<div class="bd-ed-sec"><div class="bd-ed-actions">'
+ '<button class="bd-ed-btn is-primary" data-act="export"' + (S.publishing ? " disabled" : "") + ">" + I.up + "Publish</button>"
+ '<button class="bd-ed-btn" data-act="zip">' + I.down + "Download zip</button>"
+ '<button class="bd-ed-btn" data-act="view-out">' + I.code + "Generated code</button>"
+ "</div>";
h += '</div><div class="bd-ed-sec"><div class="bd-ed-actions"><button class="bd-ed-btn" data-act="sign-out">' + I.x + "Forget GitHub key on this device</button></div></div>";
pop.innerHTML = h;
pop.hidden = false;
}

/* EVENTS */
window.addEventListener("message", function (e) {
var id = e.data && e.data.bdSpreadPage;
if (id && S.project && S.project.pages[id]) goPage(id);
});
document.addEventListener("click", function (e) {
var b = e.target.closest("[data-act]");
var pop = $("bd-pop");
if (!pop.hidden && !e.target.closest("#bd-pop") && !(b && b.getAttribute("data-act") === "projects")) closePop();
if (S.toolsZone && !e.target.closest("#bd-tools") && !(b && b.getAttribute("data-act") === "tools-open") && !e.target.closest(".bd-ed-left, .bd-ed-right, #bd-top, #bd-rail")) {
S.toolsZone = null;
renderTools();
}
if (!b) return;
var act = b.getAttribute("data-act");
var val = b.getAttribute("data-val");
var A = {
"projects": function () { if (pop.hidden) openPop(); else closePop(); },
"zip": exportZip,
"discard": function () { S.confirm = "discard"; openPop(); },
"revert": function () { S.confirm = "discard"; renderTop(); },
"discard-yes": discardDraft,
"sign-out": function () { closePop(); lock("Key forgotten on this device."); },
"reload": loadSite,
"grain-swap": function () { snap(); grainSwap(); changed(); },
"rim-side": function () { var cur = b.getAttribute("data-cur") || ""; var sd = b.getAttribute("data-s"); var one = b.parentNode.classList.contains("is-one"); var nv = one ? sd : cur.indexOf(sd) > -1 ? cur.replace(sd, "") : "trbl".split("").filter(function (x) { return x === sd || cur.indexOf(x) > -1; }).join(""); snap(); applyPath(b.getAttribute("data-path"), nv); changed(); },
"ovr-clear": function () { var kind = b.getAttribute("data-kind"); var x = kind === "sheet" ? sheetList()[+b.getAttribute("data-i")] : curPage(); if (!x) return; snap(); ovrClear(ovrKeys(kind, x)); changed(); },
"el-css-clear": function () { var e = selEl(); if (!e) return; snap(); clearElCss(e); changed(); },
"tools-open": function () { toolAction(act, b); },
"tools-close": function () { toolAction(act, b); },
"tools-reset": function () { toolAction(act, b); },
"tool-add": function () { toolAction(act, b); },
"tool-edit": function () { toolAction(act, b); },
"tool-cancel": function () { toolAction(act, b); },
"tool-save": function () { toolAction(act, b); },
"tool-del": function () { toolAction(act, b); },
"tool-run": function () { toolAction(act, b); },
"tool-fn": function () { toolAction(act, b); },
"tool-up": function () { toolAction(act, b); },
"tool-down": function () { toolAction(act, b); },
"tool-hide": function () { toolAction(act, b); },
"tool-show": function () { toolAction(act, b); },
"tool-move": function () { toolAction(act, b); },
"sec-up": function () { toolAction(act, b); },
"sec-down": function () { toolAction(act, b); },
"sec-hide": function () { toolAction(act, b); },
"sec-show": function () { toolAction(act, b); },
"sec-move": function () { toolAction(act, b); },
"right-tab": function () { S.rightTab = val; S.rightOpen = true; renderRight(); if (S.toolsZone) renderTools(); },
"sheet-add": function () { snap(); var pg = newPage("Sheet " + (sheetList().length + 1), "", "sheet-" + (sheetList().length + 1), ""); S.project.pages[pg.id] = pg; S.project.order.push(pg.id); S.project.site.sheets.unshift(Object.assign(clone(SHEET_DEFAULTS), { id: uid(), name: pg.title, pages: [pg.id], rest: "open" })); goPage(pg.id); changed(); },
"sheet-sel": function () {
var id = b.getAttribute("data-id");
var kk = sheetList().filter(function (x) { return x.id === id; })[0];
if (!kk) return;
var first = (kk.pages || []).map(sheetPage).filter(Boolean)[0];
if (first) goPage(first.id);
S.sel = null;
S.sheetSel = id;
S.leftOpen = false;
S.rightOpen = true;
S.rightTab = "sel";
render();
},
"sheet-play": function () {
var kk = sheetList().filter(function (x) { return x.id === S.sheetSel; })[0];
var under = sheetContent()[0];
var mine = kk && (kk.pages || []).map(sheetPage).filter(Boolean)[0];
if (!kk || !under || !mine) {
toast("Needs a page that lies underneath, not on a sheet.");
return;
}
var go = function (q) {
try {
var d = $("bd-sheet").shadowRoot.querySelector("iframe.bd-prev").contentDocument;
var a = d.createElement("a");
a.href = q.slug === "" ? "/" : "/" + q.slug;
a.textContent = "x";
d.querySelector(".bd-ly-content").appendChild(a);
a.click();
} catch (err) {}
};
S.preview = true;
S.pageId = mine.id;
render();
setTimeout(function () { go(under); }, 1800);
setTimeout(function () { go(mine); }, 3600);
},
"lay-page": function () { S.pageId = b.getAttribute("data-id"); S.sel = null; render(); },
"lay-rm": function () { var k = S.project.site.sheets[+b.getAttribute("data-i")]; if (!k) return; snap(); var id = b.getAttribute("data-id"); k.pages = (k.pages || []).filter(function (x) { return x !== id; }); if (k.main === id) k.main = ""; if (k.restPage === id) k.restPage = ""; changed(); },
"lay-main": function () { var i = +b.getAttribute("data-i"); var k = S.project.site.sheets[i]; if (!k) return; snap(); var j = (k.pages || []).indexOf(b.getAttribute("data-id")); if (j < 0) return; layWrite(i, false, { star: j }); changed(); },
"lay-cell": function () { var i = +b.getAttribute("data-i"), c = +b.getAttribute("data-c"), r = +b.getAttribute("data-r"); var k = S.project.site.sheets[i]; if (!k) return; snap(); var ph = S.mode === "phone"; var G = sheetGeo(i, ph); var idx = G.N === 2 ? (G.ax === "y" ? r : c) : 0; if (ph) { k.vcM = c; k.vrM = r; } else { k.vc = c; k.vr = r; } if (G.N === 2 && idx !== G.star) layWrite(i, ph, { star: idx }); changed(); },
"lay-hide": function () { var i = +b.getAttribute("data-i"); var k = S.project.site.sheets[i]; if (!k) return; snap(); if (b.getAttribute("data-val") === "1") k.rest = "hidden"; else { k.rest = "still"; layWrite(i, false, {}); } changed(); },
"spread-view": function () { S.spread = true; S.preview = false; render(); },
"window-view": function () { S.spread = false; S.preview = true; render(); },
"lay-add": function () { var i = +b.getAttribute("data-i"); if (S.project.site.sheets[i] && sheetFull(S.project.site.sheets[i])) return; S.layAdd = S.layAdd === i ? -1 : i; render(); },
"lay-new": function () {
var i = +b.getAttribute("data-i");
var k = S.project.site.sheets[i];
if (!k || sheetFull(k)) return;
var p = newPage("New page", "", "", "");
p.kind = "page";
p.stack = p.stack || [];
p.slug = uniqueSlug("new-page", p.id);
snap();
S.project.pages[p.id] = p;
S.project.order.push(p.id);
k.pages = (k.pages || []).concat([p.id]);
S.layAdd = -1;
changed();
},
"lay-filter": function () { S.layFilter = S.layFilter === val ? "" : val; renderLeft(); },
"master-sel": function () { S.masterSel = true; S.postMaster = false; S.sheetSel = ""; S.sel = null; if (S.live) endEdit(); render(); },
"master-done": function () { S.masterSel = false; render(); },
"post-master": function () {
if (S.live) endEdit();
S.postMaster = true;
S.masterSel = false;
S.sheetSel = "";
S.sel = null;
S.confirm = null;
var cp = curPage();
if (!cp || !cp.parent) {
var first = S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (q) { return q && q.parent && q.kind !== "pin"; })[0];
if (first) S.pageId = first.id;
}
render();
},
"post-master-done": function () { S.postMaster = false; S.confirm = null; render(); },
"posts-follow-ask": function () { S.confirm = "posts"; renderRight(); },
"posts-follow-yes": function () {
S.confirm = null;
snap();
var site = S.project.site;
var P = S.project.order.map(function (id) { return S.project.pages[id]; }).filter(function (q) { return q && q.parent && q.kind !== "pin"; });
/* WHAT MOST POSTS SHARE MOVES INTO THE MASTER FIRST, SO THE POSTS KEEP THEIR LOOK */
var most = function (vals) {
var c = {};
vals.forEach(function (v) { var k = JSON.stringify(v); c[k] = (c[k] || 0) + 1; });
var best = null, n = 0;
Object.keys(c).forEach(function (k) { if (c[k] > n) { n = c[k]; best = k; } });
return best == null ? undefined : JSON.parse(best);
};
var pb = site.postBox = site.postBox || {};
var keys = {};
P.forEach(function (q) { Object.keys(q.box || {}).forEach(function (k) { keys[k] = 1; }); });
Object.keys(keys).forEach(function (k) {
var cur = pb[k];
if (!(cur === "" || cur == null || cur === false || (k === "shadow" && cur === "none") || (k === "card" && cur === "none"))) return;
var v = most(P.map(function (q) { return (q.box || {})[k]; }).filter(function (v) { return !(v === "" || v == null || v === false); }));
if (v !== undefined) pb[k] = v;
});
if (!pb.sheetBg || pb.sheetBg === "none") {
var sb = most(P.map(function (q) { return q.sheetBg; }).filter(function (v) { return v; }));
if (sb !== undefined) pb.sheetBg = sb;
}
if (!site.postLayout || JSON.stringify(site.postLayout) === JSON.stringify(site.layout)) {
var cl = most(P.filter(function (q) { return q.ownLayout && q.colset; }).map(function (q) { return q.colset; }));
if (cl) site.postLayout = fixLayout(clone(cl));
}
layFor("post");
S.project.order.forEach(function (id) {
var q = S.project.pages[id];
if (!q || !q.parent || q.kind === "pin") return;
q.box = {};
delete q.sheetBg;
q.ownLayout = false;
});
changed();
},
"master-tab": function () {
if (val === "blog") {
A["post-master"]();
return;
}
S.masterTab = val;
S.postMaster = false;
S.masterSel = true;
S.confirm = null;
render();
},
"sheet-done": function () { S.sheetSel = ""; render(); },
"sheet-del": function () { snap(); S.sheetSel = ""; S.project.site.sheets.splice(+b.getAttribute("data-i"), 1); changed(); },
"sheet-up": function () { var K = S.project.site.sheets; var i = +b.getAttribute("data-i"); if (i < 1) return; snap(); K.splice(i - 1, 0, K.splice(i, 1)[0]); changed(); },
"sheet-down": function () { var K = S.project.site.sheets; var i = +b.getAttribute("data-i"); if (i >= K.length - 1) return; snap(); K.splice(i + 1, 0, K.splice(i, 1)[0]); changed(); },
"sheet-page-add": function () { var k = S.project.site.sheets[+b.getAttribute("data-i")]; if (!k || sheetFull(k)) return; S.layAdd = -1; snap(); k.pages = (k.pages || []).concat([b.getAttribute("data-id")]); changed(); },
"sheet-page-del": function () { var k = S.project.site.sheets[+b.getAttribute("data-i")]; if (!k) return; snap(); k.pages.splice(+b.getAttribute("data-j"), 1); changed(); },
"sheet-page-up": function () { var k = S.project.site.sheets[+b.getAttribute("data-i")]; var j = +b.getAttribute("data-j"); if (!k || j < 1) return; snap(); k.pages.splice(j - 1, 0, k.pages.splice(j, 1)[0]); changed(); },
"sheet-page-down": function () { var k = S.project.site.sheets[+b.getAttribute("data-i")]; var j = +b.getAttribute("data-j"); if (!k || j >= k.pages.length - 1) return; snap(); k.pages.splice(j + 1, 0, k.pages.splice(j, 1)[0]); changed(); },
"sheet-cover": function () { var k = S.project.site.sheets[+b.getAttribute("data-i")]; var id = b.getAttribute("data-id"); if (!k) return; snap(); var c = k.coverPages = k.coverPages || []; var x = c.indexOf(id); if (x > -1) c.splice(x, 1); else c.push(id); changed(); },
"ly-preset": function () { var v = b.getAttribute("data-val"); if (!LAYER_PRESETS[v]) return; snap(); Object.assign(S.project.site.layers, clone(LAYER_PRESETS[v])); changed(); },
"confirm-no": function () { var was = S.confirm; S.confirm = null; if (was === "discard") { renderTop(); if (!$("bd-pop").hidden) openPop(); } else { renderLeft(); renderRight(); } },
"mode": function () { if (S.live) endEdit(); S.mode = val; render(); },
"undo": doUndo,
"redo": doRedo,
"code": function () { S.codeOpen = !S.codeOpen; S.leftTab = S.codeOpen ? "code" : "pages"; if (S.codeOpen && window.innerWidth <= 980) S.leftOpen = true; render(); },
"code-tab": function () { S.codeNode = null; if (val === "editor") { S.codeTab = "files"; openFile(EDITOR_CSS); return; } if (val === "files" && S.filePath === EDITOR_CSS) S.filePath = ""; if (val.indexOf("out:") === 0) { S.codeTab = "out"; S.outTab = val.slice(4); } else S.codeTab = val; renderCode(); },
"out-tab": function () { S.outTab = val; renderCode(); },
"code-find": function () { codeFind(S.findQ || "", parseInt(val, 10) || 1); },
"code-html-ask": function () { S.codeConfirm = S.codeBlockId; renderCode(); },
"code-html-no": function () { S.codeConfirm = null; renderCode(); },
"code-html-yes": function () {
var id = S.codeConfirm;
S.codeConfirm = null;
var blk = curPage().els.filter(function (x) { return x.id === id; })[0];
if (!blk || blk.type === "html" || blk.type === "text") { renderCode(); return; }
blockToHtml(blk);
S.codeNode = null;
S.sel = blk.id;
changed();
renderCode();
},
"copy-out": function () {
var txt = S.cm ? S.cm.getValue() : codeValue("out");
var done = function () { toast("Copied."); };
var fail = function () { if (S.cm) S.cm.execCommand("selectAll"); toast("Selected. Press Copy on your keyboard."); };
try {
navigator.clipboard.writeText(txt).then(done, fail);
} catch (err) {
fail();
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
if (!on && pg.parent) layFor("post");
if (on && !pg.colset) pg.colset = fixLayout(clone(lay(pg)));
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
if (!S.cm || S.cm.ta) toast("Look for " + sel);
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
"post-cover-up": function () {
var cp = curPage();
if (!cp) return;
S.coverFor = cp.id;
$("bd-file").multiple = false;
$("bd-file").click();
},
"post-thumb": function () {
var cp = curPage(), te = selEl();
if (!cp || !te) return;
snap();
cp.thumb = te.id;
delete cp.cover;
changed();
renderRight();
},
"post-cover-x": function () {
var cp = curPage();
if (!cp || !cp.cover) return;
snap();
delete cp.cover;
changed();
renderRight();
},
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
"toggle-left": function () { if (wideScreen()) { S.hideLeft = !S.hideLeft; lsSet("bd-hide-left", S.hideLeft ? "1" : ""); applyPanels(); return; } S.leftOpen = !S.leftOpen; S.rightOpen = false; renderLeft(); renderRight(); },
"toggle-right": function () { if (wideScreen()) { S.hideRight = !S.hideRight; lsSet("bd-hide-right", S.hideRight ? "1" : ""); applyPanels(); return; } S.rightOpen = !S.rightOpen; S.leftOpen = false; renderLeft(); renderRight(); },
"left-tab": function () { var wasCode = S.codeOpen; S.leftTab = val; S.codeOpen = val === "code"; renderLeft(); renderTop(); if (S.toolsZone) renderTools(); if (wasCode !== S.codeOpen) requestAnimationFrame(fitSheet); },
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
"page-del": function () { S.confirm = "page"; renderLeft(); renderRight(); },
"inherit-ask": function () { S.confirm = "inherit"; renderRight(); },
"inherit-no": function () { S.confirm = null; renderRight(); },
"inherit-yes": function () {
var kind = b.getAttribute("data-kind");
S.confirm = null;
snap();
if (kind === "sheet") {
var k = sheetList()[+b.getAttribute("data-i")];
if (!k) return;
var d = clone(SHEET_DEFAULTS);
["color", "alpha", "blur", "shadow", "shadowSize", "shadowA", "rim", "grain", "nudge", "dur", "box", "pattern", "patColor", "patSize", "patAlpha", "lv", "arrive", "hover", "covers", "coverPages", "edge", "edgeM", "sliver", "sliverM", "out", "peek", "peekM"].forEach(function (x) { k[x] = d[x]; });
["pinPad", "pinMode", "pinModeM", "layPg"].forEach(function (x) { delete k[x]; });
} else {
var pg = curPage();
if (!pg) return;
["indep", "scroll", "sheetBg", "pattern", "hover", "trans", "transDur", "header"].forEach(function (x) { delete pg[x]; });
pg.box = {};
if (pg.parent) {
pg.ownLayout = false;
layFor("post");
}
}
changed();
},
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
"lay-flag": function () {
var f = b.getAttribute("data-f");
var id = b.getAttribute("data-id");
var k = S.project.site.sheets[+b.getAttribute("data-i")];
var q = S.project.pages[id];
if (!k || !q) return;
snap();
if (f === "pin") {
if (S.mode === "phone") {
var nv = sheetPin(k, true) === id ? "none" : id;
if (nv === (sheetPin(k) || "none")) delete k.pinM;
else k.pinM = nv;
} else k.pin = sheetPin(k) === id ? "" : id;
}
changed();
},
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
} else if (root === "padall") {
var pq = curPage();
pq.box = pq.box || {};
BOX_SIDES.forEach(function (sd) { pq.box["p" + sd[0] + (S.mode === "phone" ? "M" : "")] = v; });
} else if (root === "fill") {
var bar = rest.indexOf("|");
var part = rest.slice(0, bar);
var real = rest.slice(bar + 1);
var rr = real.split(".")[0];
var obj = rr === "page" ? curPage() : S.project.site;
var cur = real.split(".").slice(1).reduce(function (o, key) { return o == null ? o : o[key]; }, obj);
var g0 = parseFill(cur);
var solid = g0 ? (g0.a !== "transparent" ? g0.a : g0.b !== "transparent" ? g0.b : "#ffffff") : /^#[0-9a-f]{3,6}$/i.test(cur || "") ? cur : "#ffffff";
var nv0;
if (part === "mode") nv0 = v === "grad" ? (g0 ? cur : "linear-gradient(180deg, " + solid + ", #ffffff)") : v === "none" ? "none" : g0 ? solid : cur === "none" ? "" : cur;
else if (part === "ends") {
var g2 = g0 || { angle: 180, a: solid, b: "#ffffff" };
var c0 = g2.a !== "transparent" ? g2.a : g2.b !== "transparent" ? g2.b : "#ffffff";
nv0 = "linear-gradient(" + g2.angle + "deg, " + (v === "xc" ? "transparent" : c0) + ", " + (v === "cx" ? "transparent" : v === "xc" ? c0 : g2.b === "transparent" ? "#ffffff" : g2.b) + ")";
} else {
var g1 = g0 || { angle: 180, a: solid, b: "#ffffff" };
if (part === "angle") g1.angle = parseFloat(v) || 0;
else g1[part] = v;
nv0 = "linear-gradient(" + g1.angle + "deg, " + g1.a + ", " + g1.b + ")";
}
applyPath(real, nv0);
} else if (root === "smove") {
var sb = rest.indexOf("|");
sheetMove(sheetList()[+rest.slice(0, sb)], rest.slice(sb + 1), v);
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
if (rest === "thumb") setTimeout(renderRight, 0);
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
var sa = e.target.closest && e.target.closest("[data-act-change]");
if (sa && sa.value) {
var act = sa.getAttribute("data-act-change");
if (act === "sheet-page-add") { var k = S.project.site.sheets[+sa.getAttribute("data-i")]; if (k && !sheetFull(k)) { snap(); k.pages = (k.pages || []).concat([sa.value]); changed(); } }
if (act === "page-sheet") { pageToSheet(curPage(), sa.value); }
return;
}
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
/* TYPING: THE PAGE REDRAWS ONCE THE KEYS PAUSE; A PICK OR A SWITCH REDRAWS AT ONCE */
var typing = t.tagName === "TEXTAREA" || (t.tagName === "INPUT" && !/^(color|checkbox|radio|range)$/.test(t.type));
clearTimeout(S.typeT);
var go = function () {
if (!inLeft) renderLeft();
renderCanvas();
if (!inRight) renderRight();
if (S.codeOpen) renderCode();
};
if (typing) S.typeT = setTimeout(go, 160);
else go();
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
