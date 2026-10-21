/* DATA */
var BD_DATA = {"site":"Samt","menu":false,"pager":false,"nav":{"icon":"lines","label":"☰","openLabel":"","corner":"right","headings":true,"accordion":true,"current":"dim","title":"right"},"sections":[{"key":"a","label":"a. samt"}],"pages":[{"section":"a","slug":"","num":"","title":"Journal"},
{"section":"","slug":"how-to-deseed-a-watermelon","num":"","title":"How To Deseed A Watermelon For Safe Consumption"},
{"section":"","slug":"handala-and-the-freeze-point","num":"","title":"Handala And The Freeze Point"},
{"section":"","slug":"militant-improvisation","num":"","title":"Militant Improvisation"},
{"section":"","slug":"the-bourgeoi-rtist","num":"","title":"The Bourgeoi’rtist"},
{"section":"","slug":"art-in-times-of-crisis","num":"","title":"Art In Times Of Crisis"},
{"section":"a","slug":"library","num":"","title":"Library"},
{"section":"a","slug":"supply","num":"","title":"Supply"},
{"section":"a","slug":"about","num":"","title":"About"}],"externals":[]};

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
data.sections.forEach(function (s) {
var items = pages.filter(function (p) { return p.section === s.key; });
var ext = (data.externals || []).filter(function (x) { return x.section === s.key; });
if (!items.length && !ext.length) return;
var group = make("div", "bd-menu-group" + (s.key === section ? " is-open" : ""));
var head = make("button", "bd-menu-head");
head.type = "button";
head.textContent = s.label;
head.setAttribute("aria-expanded", s.key === section || o.accordion === false ? "true" : "false");
head.addEventListener("click", function () {
if (o.accordion === false) return;
var open = group.classList.toggle("is-open");
head.setAttribute("aria-expanded", open ? "true" : "false");
});
var ul = make("ul", "bd-menu-items");
items.forEach(function (p) {
var li = make("li");
var a = make("a", p.slug === data.current ? "is-current" : "");
a.textContent = p.title;
link(a, p);
li.appendChild(a);
ul.appendChild(li);
});
ext.forEach(function (x) {
var li = make("li");
var a = make("a");
a.textContent = x.title;
a.href = x.url;
a.target = "_blank";
a.rel = "noopener";
li.appendChild(a);
ul.appendChild(li);
});
group.appendChild(head);
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
