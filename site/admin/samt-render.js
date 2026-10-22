/* SAMT RENDER — TURNS content/samt.json INTO THE LAYER SITE (HTML + CSS). USED BY THE BACK OFFICE FOR PREVIEW AND PUBLISH */
(function (root) {
"use strict";

/* DEFAULTS — EVERY LOOK SETTING THE BACK OFFICE CAN CHANGE */
var DEFAULTS = {
font: { sans: "helvetica", mono: "plex", weight: 400 },
size: { large: 18, largeM: 16, small: 13, smallM: 13, mono: 11, monoM: 10, lhLarge: 1.35, lhSmall: 1.6, lhMono: 1.4, tracking: 0, monoCase: "none" },
color: { ink: "#2B2A27", muted: "#6B6862", ground: "#F3F1EC", paper: "#FBFAF8", link: "underline" },
menu: { color: "#D2CEC6", alpha: 58, blur: 9, w: 200, band: 52, pad: 40, padM: 16, gap: 4, gapM: 14, marker: ">", markGap: 10, edge: true, align: "right", aboutW: 620, aboutPad: 64, aboutPadM: 24 },
index: { color: "#E4E1DA", alpha: 55, blur: 9, sliver: 44, sliverM: 14, pad: 56, padM: 16, padTop: 44, padTopM: 20, edge: true, cols: 4, colsM: 2, gap: 40, gapM: 16, rowGap: 48, rowGapM: 28, ratio: "4/5", fit: "contain", thumbBg: "#FFFFFF", captions: true, meta: true, libCols: 6, libColsM: 2, libGap: 32, libGapM: 16, libRowGap: 40, libRowGapM: 28, libRatio: "2/3", libTitles: true, libAuthors: false, filters: true },
post: { measure: 600, side: 280, gap: 48, padTop: 44, padTopM: 24, padBottom: 160, blockGap: 18, blockGapM: 16, imgW: 100, quote: "card", quoteBg: "#FBFAF8", showSub: true, showMeta: true, metaBack: "<", captions: true },
motion: { ease: "paper", dur: 460, menuDur: 460, tilt: 0, lift: true, stagger: true, step: 40, thumb: "lift", book: "swing", reveal: "focus", focusBlur: 3 }
};
var SANS = {
helvetica: { label: "Helvetica Neue", stack: "\"Helvetica Neue\", Helvetica, Arial, sans-serif", g: "" },
inter: { label: "Inter", stack: "Inter, Helvetica, Arial, sans-serif", g: "Inter:wght@400;500" },
hanken: { label: "Hanken Grotesk", stack: "\"Hanken Grotesk\", Helvetica, Arial, sans-serif", g: "Hanken+Grotesk:wght@400;500" },
plexsans: { label: "IBM Plex Sans", stack: "\"IBM Plex Sans\", Helvetica, Arial, sans-serif", g: "IBM+Plex+Sans:wght@400;500" },
instrument: { label: "Instrument Sans", stack: "\"Instrument Sans\", Helvetica, Arial, sans-serif", g: "Instrument+Sans:wght@400;500" },
newsreader: { label: "Newsreader (serif)", stack: "Newsreader, Georgia, serif", g: "Newsreader:wght@400;500" },
garamond: { label: "EB Garamond (serif)", stack: "\"EB Garamond\", Georgia, serif", g: "EB+Garamond:wght@400;500" }
};
var MONO = {
plex: { label: "IBM Plex Mono", stack: "\"IBM Plex Mono\", ui-monospace, monospace", g: "IBM+Plex+Mono:wght@400;500" },
space: { label: "Space Mono", stack: "\"Space Mono\", ui-monospace, monospace", g: "Space+Mono" },
jetbrains: { label: "JetBrains Mono", stack: "\"JetBrains Mono\", ui-monospace, monospace", g: "JetBrains+Mono:wght@400;500" },
dm: { label: "DM Mono", stack: "\"DM Mono\", ui-monospace, monospace", g: "DM+Mono:wght@400;500" },
system: { label: "System mono", stack: "ui-monospace, Menlo, monospace", g: "" }
};
var EASE = {
paper: { label: "Paper", css: "cubic-bezier(.2,.8,.2,1)" },
slide: { label: "Even slide", css: "cubic-bezier(.65,0,.35,1)" },
drag: { label: "Heavy drag", css: "cubic-bezier(.7,0,.25,1)" },
stop: { label: "Stop-motion", css: "steps(6, end)" },
straight: { label: "Straight", css: "linear" }
};
var MP = 760;

/* HELPERS */
function esc(s) {
return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function merge(a, b) {
var o = {};
Object.keys(a).forEach(function (k) {
o[k] = (a[k] && typeof a[k] === "object" && !Array.isArray(a[k])) ? merge(a[k], (b && b[k]) || {}) : (b && b[k] !== undefined && b[k] !== "" && b[k] !== null ? b[k] : a[k]);
});
return o;
}
function look(data) {
return merge(DEFAULTS, (data && data.look) || {});
}
function hexA(hex, pct) {
var h = String(hex || "#000").replace("#", "");
if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
var n = parseInt(h, 16) || 0;
return "rgba(" + ((n >> 16) & 255) + ", " + ((n >> 8) & 255) + ", " + (n & 255) + ", " + (Math.round(pct) / 100) + ")";
}
function stripTags(h) {
return String(h || "").replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
}
function words(item) {
var n = 0;
(item.blocks || []).forEach(function (b) {
if (b.t === "text" || b.t === "quote") n += stripTags(b.html).split(/\s+/).filter(Boolean).length;
});
return n;
}
function readMeta(item) {
var n = words(item);
return n + " words ~ " + Math.max(1, Math.round(n / 200)) + " min";
}
function driveId(u) {
var m = String(u || "").match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([\w-]{20,})/);
return m ? m[1] : "";
}
function defaultImg(file) {
return "/images/" + encodeURIComponent(file);
}
function bookCover(b, img) {
if (b.file) return img(b.file);
if (b.src) return b.src;
var id = driveId(b.href);
return id ? "https://drive.google.com/thumbnail?id=" + id + "&sz=w600" : "";
}
function topicsOf(lib) {
var seen = {};
var out = [];
(lib.items || []).forEach(function (b) {
(b.topics || []).forEach(function (t) {
t = String(t).trim();
if (t && !seen[t.toLowerCase()]) {
seen[t.toLowerCase()] = true;
out.push(t);
}
});
});
return out;
}
function slugTopic(t) {
return String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
function visiblePosts(data) {
return (data.posts || []).filter(function (p) { return !p.hidden; });
}
function contentItems(data) {
return visiblePosts(data).concat(data.pages || []);
}

/* BLOCKS */
function blockHTML(b, img, L) {
if (b.t === "text") return "<div class=\"bd-b bd-b-text\">" + (b.html || "") + "</div>";
if (b.t === "quote") return "<blockquote class=\"bd-b bd-b-quote\">" + (b.html || "") + "</blockquote>";
if (b.t === "image") {
if (!b.file) return "";
var wh = b.w && b.h ? " width=\"" + b.w + "\" height=\"" + b.h + "\"" : "";
return "<figure class=\"bd-b bd-b-image\"><img src=\"" + esc(img(b.file)) + "\" alt=\"" + esc(b.alt) + "\" loading=\"lazy\" decoding=\"async\"" + wh + ">" + (L.post.captions && b.caption ? "<figcaption class=\"bd-mono\">" + esc(b.caption) + "</figcaption>" : "") + "</figure>";
}
if (b.t === "list") {
return "<details class=\"bd-b bd-b-list\"" + (b.open ? " open" : "") + "><summary>" + esc(b.title) + "</summary><ul>" + (b.items || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></details>";
}
if (b.t === "product") {
var pic = b.file ? "<img src=\"" + esc(img(b.file)) + "\" alt=\"" + esc(b.alt || b.title) + "\" loading=\"lazy\">" : "<span class=\"bd-b-product-blank\"></span>";
var inner = "<span class=\"bd-b-product-img\">" + pic + "</span><span class=\"bd-b-product-t\">" + esc(b.title) + "</span><span class=\"bd-mono\">" + esc(b.price) + (b.note ? " · " + esc(b.note) : "") + "</span>";
return b.href ? "<a class=\"bd-b bd-b-product\" href=\"" + esc(b.href) + "\" target=\"_blank\" rel=\"noopener\">" + inner + "</a>" : "<div class=\"bd-b bd-b-product\">" + inner + "</div>";
}
if (b.t === "html") return "<div class=\"bd-b bd-b-html\">" + (b.html || "") + "</div>";
return "";
}
function itemHTML(item, isPost, img, L, shown) {
var side = "<div class=\"bd-post-side\"><h1 class=\"bd-post-title\">" + esc(item.title) + "</h1>" + (isPost && L.post.showSub && item.subtitle ? "<p class=\"bd-post-sub\">" + esc(item.subtitle) + "</p>" : "") + (isPost && L.post.showMeta ? "<p class=\"bd-mono bd-post-meta\"><a href=\"/\" class=\"bd-back\" data-go=\"journal\">" + esc(L.post.metaBack) + "</a> " + esc(readMeta(item)) + "</p>" : "") + "</div>";
var body = "<div class=\"bd-post-body\">" + (item.blocks || []).map(function (b) { return blockHTML(b, img, L); }).join("") + "</div>";
return "<article class=\"bd-post" + (shown ? " is-shown" : "") + "\" data-id=\"" + esc(item.id) + "\" data-slug=\"" + esc(item.slug) + "\" data-title=\"" + esc(item.title) + "\">" + side + body + "</article>";
}

/* LAYERS */
function contentLayer(data, img, L, shownId) {
var html = visiblePosts(data).map(function (p) { return itemHTML(p, true, img, L, p.id === shownId); }).join("");
html += (data.pages || []).map(function (p) { return itemHTML(p, false, img, L, p.id === shownId); }).join("");
return "<main class=\"bd-layer bd-content\" id=\"bd-content\" tabindex=\"-1\">" + html + "</main>";
}
function indexLayer(data, img, L) {
var thumbs = visiblePosts(data).map(function (p, i) {
var cover = p.cover ? "<img src=\"" + esc(img(p.cover)) + "\" alt=\"\" decoding=\"async\">" : "";
return "<a class=\"bd-thumb\" href=\"/" + esc(p.slug) + "\" data-post=\"" + esc(p.id) + "\" style=\"--i: " + i + "\"><span class=\"bd-thumb-img\">" + cover + "</span>" + (L.index.captions ? "<span class=\"bd-thumb-t\">" + esc(p.title) + "</span>" : "") + (L.index.meta ? "<span class=\"bd-mono bd-thumb-m\">" + esc(readMeta(p)) + "</span>" : "") + "</a>";
}).join("");
var lib = data.library || { items: [] };
var tops = topicsOf(lib);
var filters = L.index.filters && lib.filters !== false && tops.length ? "<div class=\"bd-filters bd-mono\" role=\"group\" aria-label=\"Filter the library\"><button type=\"button\" class=\"is-on\" data-topic=\"\">" + esc(lib.all || "All") + "</button>" + tops.map(function (t) { return "<button type=\"button\" data-topic=\"" + esc(slugTopic(t)) + "\">" + esc(t) + "</button>"; }).join("") + "</div>" : "";
var books = (lib.items || []).map(function (b, i) {
var src = bookCover(b, img);
var cover = src ? "<img src=\"" + esc(src) + "\" alt=\"\" loading=\"lazy\" decoding=\"async\" referrerpolicy=\"no-referrer\">" : "<span class=\"bd-book-blank\">" + esc(b.title) + "</span>";
var t = (b.topics || []).map(slugTopic).join(" ");
var inner = "<span class=\"bd-book-cover\">" + cover + "</span>" + (L.index.libTitles ? "<span class=\"bd-book-t\">" + esc(b.title) + "</span>" : "") + (L.index.libAuthors && b.author ? "<span class=\"bd-mono bd-book-a\">" + esc(b.author) + "</span>" : "");
return b.href ? "<a class=\"bd-book\" href=\"" + esc(b.href) + "\" target=\"_blank\" rel=\"noopener\" data-topics=\"" + esc(t) + "\" style=\"--i: " + (i % 24) + "\" aria-label=\"" + esc(b.title + (b.author ? ", " + b.author : "")) + "\">" + inner + "</a>" : "<div class=\"bd-book\" data-topics=\"" + esc(t) + "\" style=\"--i: " + (i % 24) + "\">" + inner + "</div>";
}).join("");
return "<section class=\"bd-layer bd-index\" id=\"bd-index\" aria-label=\"Index\"><div class=\"bd-half bd-half-journal\"><div class=\"bd-thumbs\">" + thumbs + "</div></div><div class=\"bd-half bd-half-library\">" + filters + "<div class=\"bd-books\">" + books + "</div></div></section>";
}
function menuLayer(data, img, L, cur) {
var items = (data.menu || []).filter(function (m) { return m.show !== false; }).map(function (m) {
var href = m.kind === "journal" ? "/" : m.kind === "library" ? "/library" : m.kind === "about" ? "/about" : "/" + ((data.pages || []).filter(function (p) { return p.id === m.page; })[0] || {}).slug;
var on = m.kind === cur.menu || (m.kind === "page" && m.page === cur.post && cur.view === "post");
return "<li><a class=\"bd-menu-a" + (on ? " is-cur" : "") + "\" href=\"" + esc(href) + "\" data-go=\"" + esc(m.kind) + "\"" + (m.page ? " data-page=\"" + esc(m.page) + "\"" : "") + "><span class=\"bd-mark-cur\" aria-hidden=\"true\">" + esc(L.menu.marker) + "</span>" + esc(m.label) + "</a></li>";
}).join("");
var about = ((data.about || {}).blocks || []).map(function (b) { return blockHTML(b, img, L); }).join("");
return "<nav class=\"bd-layer bd-menu\" id=\"bd-menu\" aria-label=\"Menu\"><div class=\"bd-about\" id=\"bd-about\">" + about + "</div><ul class=\"bd-menu-list\">" + items + "</ul><div class=\"bd-sitemark\">" + esc((data.site || {}).mark || "") + "</div></nav>";
}

/* STATE FOR A URL */
function stateFor(data, route) {
var feat = data.featured || (visiblePosts(data)[0] || {}).id || "";
if (route.kind === "post") return { view: "post", half: "journal", menu: "journal", post: route.id };
if (route.kind === "page") return { view: "post", half: "journal", menu: "page", post: route.id };
if (route.kind === "library") return { view: "library", half: "library", menu: "library", post: feat };
if (route.kind === "about") return { view: "about", half: "journal", menu: "about", post: feat };
return { view: "journal", half: "journal", menu: "journal", post: feat };
}

/* DOCUMENT */
function fontsLink(L) {
var fams = [];
var s = SANS[L.font.sans] || SANS.helvetica;
var m = MONO[L.font.mono] || MONO.plex;
if (s.g) fams.push(s.g);
if (m.g) fams.push(m.g);
if (!fams.length) return "";
return "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=" + fams.join("&family=") + "&display=swap\">\n";
}
function documentHTML(data, route, opt) {
opt = opt || {};
var img = opt.img || defaultImg;
var L = look(data);
var cur = stateFor(data, route);
var site = data.site || {};
var item = contentItems(data).filter(function (x) { return x.id === cur.post; })[0];
var title = route.kind === "post" || route.kind === "page" ? (item ? item.title + " · " + (site.title || "Samt") : site.title) : route.kind === "library" ? "Library · " + (site.title || "Samt") : route.kind === "about" ? "About · " + (site.title || "Samt") : (site.title || "Samt");
if (route.kind === "404") title = "Not found · " + (site.title || "Samt");
var desc = (route.kind === "post" || route.kind === "page") && item ? (item.desc || item.subtitle || item.title) : (site.description || "");
var cssTag = opt.css != null ? "<style>\n" + opt.css + "\n</style>\n" : "<link rel=\"stylesheet\" href=\"/assets/samt.css?v=" + esc(opt.stamp || "") + "\">\n";
var jsTag = "<script src=\"" + esc(opt.js || "/assets/samt.js?v=" + (opt.stamp || "")) + "\" defer></script>\n";
var cls = "bd-samt is-v-" + cur.view + " is-h-" + cur.half;
return "<!doctype html>\n<html lang=\"" + esc(site.lang || "en") + "\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<title>" + esc(title) + "</title>\n<meta name=\"description\" content=\"" + esc(desc) + "\">\n<meta property=\"og:title\" content=\"" + esc(title) + "\">\n<meta property=\"og:description\" content=\"" + esc(desc) + "\">\n" + (route.kind === "404" ? "<meta name=\"robots\" content=\"noindex\">\n" : "") + fontsLink(L) + cssTag + (opt.head || "") + jsTag + "</head>\n<body>\n<div class=\"" + cls + "\" id=\"bd-samt\" data-view=\"" + cur.view + "\" data-half=\"" + cur.half + "\" data-post=\"" + esc(cur.post) + "\" data-featured=\"" + esc(data.featured || "") + "\" data-dur=\"" + L.motion.dur + "\" data-menu-dur=\"" + L.motion.menuDur + "\" data-tilt=\"" + (L.motion.tilt || 0) + "\" data-gesture=\"" + esc(L.motion.thumb) + "\">\n" + contentLayer(data, img, L, cur.post) + "\n" + indexLayer(data, img, L) + "\n" + menuLayer(data, img, L, cur) + "\n</div>\n</body>\n</html>\n";
}

/* CSS */
function css(data, stamp) {
var L = look(data);
var s = SANS[L.font.sans] || SANS.helvetica;
var m = MONO[L.font.mono] || MONO.plex;
var ease = (EASE[L.motion.ease] || EASE.paper).css;
var out = [];
function r(sel, props) {
out.push(sel + " {\n" + Object.keys(props).filter(function (k) { return props[k] !== null && props[k] !== undefined; }).map(function (k) { return k + ": " + props[k] + ";"; }).join("\n") + "\n}");
}
function h(sel, props) {
out.push("@media (hover: hover) {\n" + sel + " {\n" + Object.keys(props).map(function (k) { return k + ": " + props[k] + ";"; }).join("\n") + "\n}\n}");
}
function c(t) {
out.push("\n/* " + t + " */");
}
out.push("/* SAMT LAYER SITE" + (stamp ? " — PUBLISHED " + stamp : "") + " — GENERATED BY THE BACK OFFICE, DO NOT EDIT BY HAND */");
c("TOKENS");
r(":root", {
"--bd-sans": s.stack,
"--bd-mono": m.stack,
"--bd-large": L.size.large + "px",
"--bd-small": L.size.small + "px",
"--bd-monos": L.size.mono + "px",
"--bd-lh-l": L.size.lhLarge,
"--bd-lh-s": L.size.lhSmall,
"--bd-lh-m": L.size.lhMono,
"--bd-ink": L.color.ink,
"--bd-muted": L.color.muted,
"--bd-ground": L.color.ground,
"--bd-paper": L.color.paper,
"--bd-menu-bg": hexA(L.menu.color, L.menu.alpha),
"--bd-menu-blur": L.menu.blur + "px",
"--bd-menu-w": L.menu.w + "px",
"--bd-menu-pad": L.menu.pad + "px",
"--bd-menu-gap": L.menu.gap + "px",
"--bd-about-w": L.menu.aboutW + "px",
"--bd-about-pad": L.menu.aboutPad + "px",
"--bd-index-bg": hexA(L.index.color, L.index.alpha),
"--bd-index-blur": L.index.blur + "px",
"--bd-sliver": L.index.sliver + "px",
"--bd-index-pad": L.index.pad + "px",
"--bd-index-top": L.index.padTop + "px",
"--bd-cols": L.index.cols,
"--bd-gap": L.index.gap + "px",
"--bd-row-gap": L.index.rowGap + "px",
"--bd-ratio": String(L.index.ratio).replace("/", " / "),
"--bd-thumb-bg": L.index.thumbBg,
"--bd-lib-cols": L.index.libCols,
"--bd-lib-gap": L.index.libGap + "px",
"--bd-lib-row-gap": L.index.libRowGap + "px",
"--bd-lib-ratio": String(L.index.libRatio).replace("/", " / "),
"--bd-measure": L.post.measure + "px",
"--bd-side": L.post.side + "px",
"--bd-post-gap": L.post.gap + "px",
"--bd-post-top": L.post.padTop + "px",
"--bd-post-bottom": L.post.padBottom + "px",
"--bd-block-gap": L.post.blockGap + "px",
"--bd-img-w": L.post.imgW + "%",
"--bd-quote-bg": L.post.quoteBg,
"--bd-dur": L.motion.dur + "ms",
"--bd-menu-dur": L.motion.menuDur + "ms",
"--bd-ease": ease,
"--bd-step": L.motion.step + "ms",
"--bd-focus": L.motion.focusBlur + "px",
"--bd-tilt": (L.motion.tilt || 0) + "deg"
});
c("BASE");
r("*,\n*::before,\n*::after", { "box-sizing": "border-box" });
r("html,\nbody", { "height": "100%", "margin": "0", "overflow": "hidden", "background": "var(--bd-ground)" });
r("body", { "color": "var(--bd-ink)", "font-family": "var(--bd-sans)", "font-size": "var(--bd-small)", "line-height": "var(--bd-lh-s)", "font-weight": L.font.weight, "letter-spacing": (L.size.tracking || 0) + "em", "-webkit-font-smoothing": "antialiased", "text-rendering": "optimizeLegibility" });
r("a", { "color": "inherit", "text-decoration": "none" });
r(".bd-b a", L.color.link === "underline" ? { "border-bottom": "1px solid currentColor" } : L.color.link === "muted" ? { "color": "var(--bd-muted)" } : { "border-bottom": "0" });
r("p,\nh1,\nul,\nfigure,\nblockquote", { "margin": "0" });
r("img", { "display": "block", "max-width": "100%", "height": "auto" });
r("button", { "padding": "0", "border": "0", "background": "none", "color": "inherit", "font": "inherit", "letter-spacing": "inherit", "cursor": "pointer" });
r(".bd-mono", { "font-family": "var(--bd-mono)", "font-size": "var(--bd-monos)", "line-height": "var(--bd-lh-m)", "text-transform": L.size.monoCase, "color": "var(--bd-muted)" });
r(":focus-visible", { "outline": "1px solid var(--bd-ink)", "outline-offset": "3px" });
c("LAYERS");
r(".bd-samt", { "position": "fixed", "inset": "0", "overflow": "hidden" });
r(".bd-layer", { "position": "absolute", "--lx": "0px", "--ly": "0px", "--lr": "0deg", "transform": "translate3d(var(--lx), var(--ly), 0) rotate(var(--lr))", "transition": "transform var(--bd-dur) var(--bd-ease), box-shadow var(--bd-dur) var(--bd-ease), filter var(--bd-dur) var(--bd-ease)", "will-change": "transform" });
r(".bd-layer.is-moving", { "--lr": "var(--bd-tilt)" });
if (L.motion.lift) r(".bd-index.is-moving,\n.bd-menu.is-moving", { "box-shadow": "8px 8px 0 rgba(0, 0, 0, 0.06)" });
c("CONTENT LAYER");
r(".bd-content", { "inset": "0", "z-index": "1", "overflow-y": "auto", "-webkit-overflow-scrolling": "touch", "overscroll-behavior": "contain", "background": "var(--bd-ground)" });
if (L.motion.reveal === "focus") r(".bd-samt:not(.is-v-post) .bd-content", { "filter": "blur(var(--bd-focus))" });
if (L.motion.reveal === "rise") r(".bd-samt:not(.is-v-post) .bd-content", { "--ly": "18px" });
r(".bd-post", { "display": "none", "grid-template-columns": "var(--bd-side) minmax(0, var(--bd-measure))", "gap": "var(--bd-post-gap)", "padding": "var(--bd-post-top) var(--bd-index-pad) var(--bd-post-bottom) calc(var(--bd-menu-w) + var(--bd-index-pad))" });
r(".bd-post.is-shown", { "display": "grid" });
r(".bd-post-side", { "display": "flex", "flex-direction": "column", "gap": "12px", "align-self": "start", "position": "sticky", "top": "0" });
r(".bd-post-title", { "font-size": "var(--bd-small)", "line-height": "var(--bd-lh-s)", "font-weight": "inherit" });
r(".bd-post-sub", { "color": "var(--bd-muted)" });
r(".bd-back", { "padding-right": "4px" });
r(".bd-post-body", { "display": "flex", "flex-direction": "column", "gap": "var(--bd-block-gap)", "min-width": "0" });
r(".bd-b-text", { "display": "flex", "flex-direction": "column", "gap": "var(--bd-block-gap)" });
r(".bd-b-quote", L.post.quote === "card" ? { "padding": "18px 24px", "background": "var(--bd-quote-bg)", "box-shadow": "3px 3px 0 rgba(0, 0, 0, 0.06)" } : L.post.quote === "line" ? { "padding": "0 0 0 18px", "border-left": "1px solid var(--bd-ink)" } : { "padding": "0 0 0 40px" });
r(".bd-b-quote p + p", { "margin-top": "var(--bd-block-gap)" });
r(".bd-b-image img", { "width": "var(--bd-img-w)" });
r(".bd-b-image figcaption", { "margin-top": "8px" });
r(".bd-b-list summary", { "cursor": "pointer", "list-style": "none" });
r(".bd-b-list summary::-webkit-details-marker", { "display": "none" });
r(".bd-b-list summary::after", { "content": "\" +\"", "font-family": "var(--bd-mono)", "font-size": "var(--bd-monos)" });
r(".bd-b-list[open] summary::after", { "content": "\" −\"" });
r(".bd-b-list ul", { "padding": "8px 0 0", "list-style": "none" });
r(".bd-b-product", { "display": "flex", "flex-direction": "column", "gap": "6px", "max-width": "320px" });
r(".bd-b-product-img img,\n.bd-b-product-blank", { "display": "block", "width": "100%", "aspect-ratio": "4 / 5", "object-fit": "cover", "background": "var(--bd-paper)" });
c("INDEX LAYER");
r(".bd-index", { "top": "0", "left": "var(--bd-menu-w)", "width": "calc(100vw - var(--bd-menu-w))", "height": "200%", "z-index": "2", "background": "var(--bd-index-bg)", "-webkit-backdrop-filter": "blur(var(--bd-index-blur))", "backdrop-filter": "blur(var(--bd-index-blur))", "box-shadow": L.index.edge ? "-1px 0 0 rgba(0, 0, 0, 0.1)" : "none" });
r(".bd-half", { "height": "50%", "overflow-y": "auto", "-webkit-overflow-scrolling": "touch", "overscroll-behavior": "contain", "padding": "var(--bd-index-top) var(--bd-index-pad) var(--bd-index-pad)" });
r(".is-h-library .bd-index", { "--ly": "-50%" });
r(".is-v-post .bd-index,\n.is-tucked .bd-index", { "--lx": "calc(var(--bd-sliver) - 100vw)" });
r(".bd-thumbs", { "display": "grid", "grid-template-columns": "repeat(var(--bd-cols), minmax(0, 1fr))", "gap": "var(--bd-row-gap) var(--bd-gap)", "align-items": "start" });
r(".bd-thumb", { "display": "flex", "flex-direction": "column", "gap": "8px", "min-width": "0", "transition": "transform var(--bd-dur) var(--bd-ease)" });
r(".bd-thumb-img", { "position": "relative", "display": "block", "aspect-ratio": "var(--bd-ratio)", "background": "var(--bd-thumb-bg)", "transition": "transform 0.45s ease, box-shadow 0.45s ease" });
r(".bd-thumb-img img", { "width": "100%", "height": "100%", "object-fit": L.index.fit });
r(".bd-thumb-t", { "display": "block" });
r(".bd-filters", { "display": "flex", "flex-wrap": "wrap", "gap": "4px 14px", "margin-bottom": "28px" });
r(".bd-filters button", { "border-bottom": "1px solid transparent" });
r(".bd-filters button.is-on,\n.bd-filters button:hover", { "color": "var(--bd-ink)", "border-bottom-color": "currentColor" });
r(".bd-books", { "display": "grid", "grid-template-columns": "repeat(var(--bd-lib-cols), minmax(0, 1fr))", "gap": "var(--bd-lib-row-gap) var(--bd-lib-gap)", "align-items": "start" });
r(".bd-book", { "display": "flex", "flex-direction": "column", "gap": "8px", "min-width": "0", "perspective": "900px", "transition": "transform var(--bd-dur) var(--bd-ease)" });
r(".bd-book.is-hidden", { "display": "none" });
r(".bd-book-cover", { "position": "relative", "display": "block", "aspect-ratio": "var(--bd-lib-ratio)", "background": "var(--bd-paper)", "transform-origin": "left center", "transition": "transform 0.45s ease, box-shadow 0.45s ease" });
r(".bd-book-cover img", { "width": "100%", "height": "100%", "object-fit": "cover" });
r(".bd-book-blank", { "display": "block", "padding": "10px", "font-size": "var(--bd-monos)", "line-height": "var(--bd-lh-m)", "font-family": "var(--bd-mono)" });
c("GESTURES — THUMBNAILS (" + L.motion.thumb + ")");
gestureThumb(L.motion.thumb, r, h);
c("GESTURES — BOOKS (" + L.motion.book + ")");
gestureBook(L.motion.book, r, h);
if (L.motion.stagger) {
c("SETTLE — ITEMS LAND ONE BY ONE");
r(".bd-half.is-settle .bd-thumb,\n.bd-half.is-settle .bd-book", { "transform": "translateY(14px)", "transition": "none" });
r(".bd-thumb,\n.bd-book", { "transition-delay": "calc(var(--i, 0) * var(--bd-step))" });
r(".bd-thumb:hover,\n.bd-book:hover,\n.bd-thumb.is-open,\n.bd-book.is-open", { "transition-delay": "0ms" });
}
c("MENU LAYER");
r(".bd-menu", { "top": "0", "left": "0", "width": "100vw", "height": "100%", "z-index": "3", "--lx": "calc(var(--bd-menu-w) - 100vw)", "background": "var(--bd-menu-bg)", "-webkit-backdrop-filter": "blur(var(--bd-menu-blur))", "backdrop-filter": "blur(var(--bd-menu-blur))", "box-shadow": L.menu.edge ? "1px 0 0 rgba(0, 0, 0, 0.12)" : "none", "transition-duration": "var(--bd-menu-dur)" });
r(".is-v-about .bd-menu", { "--lx": "0px" });
r(".bd-menu-list", { "position": "absolute", "top": "var(--bd-index-top)", "right": "var(--bd-menu-pad)", "width": "calc(var(--bd-menu-w) - var(--bd-menu-pad) - 16px)", "display": "flex", "flex-direction": "column", "align-items": L.menu.align === "left" ? "flex-start" : "flex-end", "gap": "var(--bd-menu-gap)", "margin": "0", "padding": "0", "list-style": "none", "font-size": "var(--bd-large)", "line-height": "var(--bd-lh-l)" });
r(".bd-menu-a", { "display": "inline-flex", "gap": L.menu.markGap + "px", "white-space": "nowrap" });
r(".bd-mark-cur", { "visibility": "hidden" });
r(".bd-menu-a.is-cur .bd-mark-cur", { "visibility": "visible" });
r(".bd-menu-a:hover", { "color": "var(--bd-muted)" });
r(".bd-sitemark", { "position": "absolute", "right": "var(--bd-menu-pad)", "bottom": "var(--bd-index-top)", "font-size": "var(--bd-large)", "line-height": "var(--bd-lh-l)" });
r(".bd-about", { "position": "absolute", "top": "0", "bottom": "0", "left": "0", "right": "var(--bd-menu-w)", "overflow-y": "auto", "padding": "var(--bd-post-top) var(--bd-about-pad) var(--bd-post-bottom)", "display": "flex", "flex-direction": "column", "gap": "var(--bd-block-gap)" });
r(".bd-about > *", { "max-width": "var(--bd-about-w)" });
c("REDUCED MOTION");
out.push("@media (prefers-reduced-motion: reduce) {\n.bd-layer,\n.bd-thumb,\n.bd-book,\n.bd-thumb-img,\n.bd-book-cover {\ntransition-duration: 1ms !important;\n}\n}");
c("CUSTOM CSS");
if (data.css) out.push(data.css);
c("PHONE — THE ONE MOBILE BLOCK");
var P = [];
function p(sel, props) {
P.push(sel + " {\n" + Object.keys(props).map(function (k) { return k + ": " + props[k] + ";"; }).join("\n") + "\n}");
}
p(":root", {
"--bd-large": L.size.largeM + "px",
"--bd-small": L.size.smallM + "px",
"--bd-monos": L.size.monoM + "px",
"--bd-band": L.menu.band + "px",
"--bd-menu-pad": L.menu.padM + "px",
"--bd-menu-gap": L.menu.gapM + "px",
"--bd-about-pad": L.menu.aboutPadM + "px",
"--bd-sliver": L.index.sliverM + "px",
"--bd-index-pad": L.index.padM + "px",
"--bd-index-top": L.index.padTopM + "px",
"--bd-cols": L.index.colsM,
"--bd-gap": L.index.gapM + "px",
"--bd-row-gap": L.index.rowGapM + "px",
"--bd-lib-cols": L.index.libColsM,
"--bd-lib-gap": L.index.libGapM + "px",
"--bd-lib-row-gap": L.index.libRowGapM + "px",
"--bd-post-top": L.post.padTopM + "px",
"--bd-block-gap": L.post.blockGapM + "px"
});
p(".bd-post", { "grid-template-columns": "minmax(0, 1fr)", "gap": "20px", "padding": "calc(var(--bd-band) + var(--bd-post-top)) var(--bd-index-pad) var(--bd-post-bottom)" });
p(".bd-post-side", { "position": "static" });
p(".bd-post-title", { "font-size": "var(--bd-large)", "line-height": "var(--bd-lh-l)" });
p(".bd-index", { "top": "var(--bd-band)", "left": "0", "width": "100vw", "height": "calc(200% - var(--bd-band) * 2)", "box-shadow": L.index.edge ? "0 -1px 0 rgba(0, 0, 0, 0.1)" : "none" });
p(".is-v-post .bd-index,\n.is-tucked .bd-index", { "--lx": "0px", "--ly": "calc(-100% + var(--bd-sliver))" });
p(".bd-menu", { "width": "100vw", "height": "100%", "--lx": "0px", "--ly": "calc(var(--bd-band) - 100%)", "box-shadow": L.menu.edge ? "0 1px 0 rgba(0, 0, 0, 0.12)" : "none" });
p(".is-v-about .bd-menu", { "--ly": "0px" });
p(".bd-menu-list", { "top": "auto", "bottom": "0", "right": "var(--bd-menu-pad)", "width": "auto", "height": "var(--bd-band)", "flex-direction": "row", "align-items": "center", "gap": "var(--bd-menu-gap)" });
p(".bd-sitemark", { "top": "auto", "left": "var(--bd-menu-pad)", "right": "auto", "bottom": "0", "height": "var(--bd-band)", "display": "flex", "align-items": "center" });
p(".bd-about", { "right": "0", "bottom": "var(--bd-band)", "padding": "var(--bd-post-top) var(--bd-about-pad) 40px" });
out.push("\n@media (max-width: " + MP + "px) {\n" + P.join("\n") + "\n}");
return out.join("\n") + "\n";
}
function gestureThumb(kind, r, out_hover) {
if (kind === "lift") {
out_hover(".bd-thumb:hover .bd-thumb-img", { "transform": "translate(-3px, -3px)", "box-shadow": "4px 4px 0 rgba(0, 0, 0, 0.12)" });
r(".bd-thumb.is-open .bd-thumb-img", { "transform": "translate(-8px, -8px)", "box-shadow": "10px 10px 0 rgba(0, 0, 0, 0.14)" });
}
if (kind === "nudge") {
out_hover(".bd-thumb:hover .bd-thumb-img", { "transform": "translateX(5px)" });
r(".bd-thumb.is-open .bd-thumb-img", { "transform": "translateX(24px)" });
}
if (kind === "tilt") {
out_hover(".bd-thumb:hover .bd-thumb-img", { "transform": "rotate(-1.5deg)" });
r(".bd-thumb.is-open .bd-thumb-img", { "transform": "rotate(-5deg)" });
}
if (kind === "trace") {
r(".bd-thumb-img::after", { "content": "\"\"", "position": "absolute", "left": "0", "right": "0", "bottom": "0", "height": "38%", "background": "var(--bd-index-bg)", "-webkit-backdrop-filter": "blur(6px)", "backdrop-filter": "blur(6px)", "transition": "transform 0.45s ease" });
r(".bd-thumb-img", { "overflow": "hidden" });
out_hover(".bd-thumb:hover .bd-thumb-img::after", { "transform": "translateY(14%)" });
r(".bd-thumb.is-open .bd-thumb-img::after", { "transform": "translateY(92%)" });
}
}
function gestureBook(kind, r, out_hover) {
if (kind === "swing") {
r(".bd-book-cover::before", { "content": "\"\"", "position": "absolute", "top": "0", "bottom": "0", "left": "0", "z-index": "1", "width": "8px", "background": "#8A8A8A" });
r(".bd-book-cover", { "box-shadow": "2px 2px 0 rgba(0, 0, 0, 0.14)" });
out_hover(".bd-book:hover .bd-book-cover", { "transform": "rotateY(-8deg)", "box-shadow": "5px 3px 0 rgba(0, 0, 0, 0.14)" });
r(".bd-book.is-open .bd-book-cover", { "transform": "rotateY(-24deg)", "box-shadow": "12px 5px 0 rgba(0, 0, 0, 0.16)" });
}
if (kind === "lift") {
out_hover(".bd-book:hover .bd-book-cover", { "transform": "translate(-3px, -3px)", "box-shadow": "4px 4px 0 rgba(0, 0, 0, 0.14)" });
r(".bd-book.is-open .bd-book-cover", { "transform": "translate(-7px, -7px)", "box-shadow": "9px 9px 0 rgba(0, 0, 0, 0.16)" });
}
if (kind === "tilt") {
out_hover(".bd-book:hover .bd-book-cover", { "transform": "rotate(-2deg)" });
r(".bd-book.is-open .bd-book-cover", { "transform": "rotate(-6deg)" });
}
}


/* ALL PUBLISHED FILES */
function files(data, stamp) {
var out = {};
var opt = { stamp: stamp };
out["site/index.html"] = documentHTML(data, { kind: "journal" }, opt);
out["site/library.html"] = documentHTML(data, { kind: "library" }, opt);
out["site/about.html"] = documentHTML(data, { kind: "about" }, opt);
out["site/404.html"] = documentHTML(data, { kind: "404" }, opt);
visiblePosts(data).forEach(function (p) {
out["site/" + p.slug + ".html"] = documentHTML(data, { kind: "post", id: p.id }, opt);
});
(data.pages || []).forEach(function (p) {
out["site/" + p.slug + ".html"] = documentHTML(data, { kind: "page", id: p.id }, opt);
});
out["site/assets/samt.css"] = css(data, stamp);
return out;
}

var api = { DEFAULTS: DEFAULTS, SANS: SANS, MONO: MONO, EASE: EASE, MP: MP, look: look, css: css, documentHTML: documentHTML, files: files, readMeta: readMeta, topicsOf: topicsOf, driveId: driveId, bookCover: bookCover, visiblePosts: visiblePosts, contentItems: contentItems };
root.SAMT_RENDER = api;
if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
