/* LAYERS */
function bdLayers(doc, preview) {
var root = doc.getElementById("bd-ly");
if (!root) return;
var content = doc.getElementById("bd-ly-content");
var index = doc.getElementById("bd-ly-index");
var menu = doc.getElementById("bd-ly-menu");
var dur = parseInt(root.getAttribute("data-dur"), 10) || 460;
var menuDur = parseInt(root.getAttribute("data-menu-dur"), 10) || dur;
var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var siteTitle = doc.title.split(" — ").pop();
var S = { view: root.getAttribute("data-view"), half: root.getAttribute("data-half"), post: root.getAttribute("data-post") };
var before = "journal";
var homeSlug = (menu.querySelector('[data-go="journal"]') || { getAttribute: function () { return "/"; } }).getAttribute("href");
function art(id) {
return content.querySelector('.bd-ly-art[data-id="' + id + '"]');
}
function moving(el) {
if (reduce || !el) return;
el.classList.add("is-moving");
clearTimeout(el.bdMv);
el.bdMv = setTimeout(function () { el.classList.remove("is-moving"); }, Math.round((el === menu ? menuDur : dur) * 0.55));
}
function urlFor() {
if (S.view === "post") {
var a = art(S.post);
return a ? "/" + a.getAttribute("data-slug") : "/";
}
var m = menu.querySelector('[data-go="' + (S.view === "about" ? "about" : S.half) + '"]');
return m ? m.getAttribute("href") : homeSlug;
}
function mark() {
menu.querySelectorAll(".bd-ly-a").forEach(function (a) {
var g = a.getAttribute("data-go");
var on = S.view === "about" ? g === "about" : S.view === "post" && g === "post" ? a.getAttribute("data-id") === S.post : g === S.half && !(S.view === "post" && menu.querySelector('[data-go="post"][data-id="' + S.post + '"]'));
a.classList.toggle("is-current", on);
});
}
function go(view, id, pop) {
var prev = { view: S.view, half: S.half, post: S.post };
if (view === "journal" || view === "library") {
S.view = view;
S.half = view;
} else if (view === "about") {
if (S.view !== "about") before = S.view;
S.view = "about";
} else if (view === "post") {
S.view = "post";
if (id) S.post = id;
}
if (S.post !== prev.post) {
var a = art(S.post);
if (a) {
content.querySelectorAll(".bd-ly-art.is-shown").forEach(function (x) { x.classList.remove("is-shown"); });
a.classList.add("is-shown");
content.scrollTop = 0;
}
}
var tucked = S.view === "about" && (prev.view === "post" || (prev.view === "about" && root.classList.contains("is-tucked")));
root.classList.toggle("is-tucked", tucked);
root.classList.remove("is-v-" + prev.view, "is-h-" + prev.half);
root.classList.add("is-v-" + S.view, "is-h-" + S.half);
if (prev.half !== S.half || (prev.view === "post") !== (S.view === "post" || tucked)) moving(index);
if ((prev.view === "about") !== (S.view === "about")) moving(menu);
mark();
var t = S.view === "post" && art(S.post) ? art(S.post).getAttribute("data-title") + " — " + siteTitle : siteTitle;
doc.title = t;
if (S.view === "post") content.focus({ preventScroll: true });
if (preview || pop) return;
try {
history.pushState({ bdly: 1 }, "", urlFor());
} catch (e) {}
}
function back() {
if (S.view === "about") go(before === "post" ? "post" : S.half);
else if (S.view === "post") go(S.half);
}
function bySlug(slug) {
slug = String(slug || "").replace(/^\/+|\/+$/g, "").replace(/\.html$/, "");
var m = menu.querySelector('.bd-ly-a[href="/' + slug + '"]');
if (m && m.getAttribute("data-go") !== "post") return { view: m.getAttribute("data-go") };
var a = content.querySelector('.bd-ly-art[data-slug="' + slug + '"]');
if (a) return { view: "post", id: a.getAttribute("data-id") };
return null;
}
window.bdLayerOpen = function (href) {
var u;
try {
u = new URL(href, location.href);
} catch (e) {
return false;
}
if (!preview && u.origin !== location.origin) return false;
var r = bySlug(u.pathname);
if (!r) return false;
go(r.view, r.id);
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
var g = a.getAttribute("data-go");
if (g === "about" && S.view === "about") {
ev.preventDefault();
back();
return;
}
if (window.bdLayerOpen(a.href)) ev.preventDefault();
});
doc.addEventListener("keydown", function (ev) {
if (ev.key === "Escape") back();
});
if (!preview) {
window.addEventListener("popstate", function () {
var r = bySlug(location.pathname) || { view: "journal" };
go(r.view, r.id, true);
});
}
mark();
}
document.addEventListener("DOMContentLoaded", function () {
bdLayers(document, !!window.BD_PREVIEW);
});

/* DATA */
var BD_DATA = {"site":"Samt","menu":false,"groups":[{"label":"","items":[{"title":"Journal","slug":""},
{"title":"Library","slug":"library"},
{"title":"About","slug":"about"}]}],"pager":false,"nav":{"icon":"text","label":"ص مت","openLabel":"×","corner":"right","headings":false,"accordion":true,"current":"arrow","title":"hide"},"sections":[],"pages":[{"section":"","slug":"","num":"","title":"Journal"},
{"section":"","slug":"how-to-deseed-a-watermelon","num":"","title":"How To Deseed A Watermelon For Safe Consumption"},
{"section":"","slug":"handala-and-the-freeze-point","num":"","title":"Handala And The Freeze Point"},
{"section":"","slug":"militant-improvisation","num":"","title":"Militant Improvisation"},
{"section":"","slug":"the-bourgeoi-rtist","num":"","title":"The Bourgeoi’rtist"},
{"section":"","slug":"art-in-times-of-crisis","num":"","title":"Art In Times Of Crisis"},
{"section":"","slug":"library","num":"","title":"Library"},
{"section":"","slug":"about","num":"","title":"About"},
{"section":"","slug":"supply","num":"","title":"Supply"}],"externals":[]};

/* CHROME */
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

/* GALLERIES */
function bdGalleries(root) {
var host = root.querySelector(".bd-site") || (root.classList && root.classList.contains("bd-site") ? root : document.body);
/* GESTURES — HOVER TEASES, A TAP OR CLICK PLAYS THE FULL MOVE, THEN THE LINK OPENS */
if (!root.__bdGesture) {
root.__bdGesture = true;
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
setTimeout(function () { bdOpen(a.href); }, 520);
return;
}
/* TRACING PAPER: THE SHEET SLIDES OFF THE POSTER, THEN THE POST OPENS */
if (a.closest(".is-trace")) {
setTimeout(function () { bdOpen(a.href); }, 620);
return;
}
/* ZINE: COVER SWINGS FULLY AWAY, THE INSIDE PAGE GROWS INTO THE NEXT PAGE */
setTimeout(function () { a.classList.add("is-unfold"); }, 280);
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
setTimeout(function () { bdOpen(a.href); }, 1000);
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

/* START */
document.addEventListener("DOMContentLoaded", function () {
var data = Object.assign({}, BD_DATA, { current: document.body.getAttribute("data-bd-page") || "" });
bdChrome(document, data);
bdGalleries(document);
});
