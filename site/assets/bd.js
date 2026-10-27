/* LAYERS */
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
/* A PINNED STRIP IS AS TALL AS ITS PAGE REALLY IS: THE SHEET, THE OPEN PAGE AND THE PAGES UNDERNEATH ALL USE THAT, NOT THE DRAWN MARGIN ALONE */
var gt = 0;
var gb = 0;
model.forEach(function (m) {
if (m.pin < 0) return;
var kid = m.track.children[m.pin];
var pp = kid && kid.querySelector(".bd-ly-paper");
if (!pp || getComputedStyle(m.track).flexDirection !== "column") {
m.el.style.removeProperty("--k-pl");
return;
}
var h = Math.ceil(pp.getBoundingClientRect().height);
m.el.style.setProperty("--k-pl", h + "px");
if (m.pin === 0) gb += h;
else gt += h;
});
root.style.setProperty("--bd-pin-top", gt + "px");
root.style.setProperty("--bd-pin-bottom", gb + "px");
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
c.textContent = cr ? cr.join(c.getAttribute("data-sep")) : "";
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
document.addEventListener("DOMContentLoaded", function () {
bdLayers(document, !!window.BD_PREVIEW);
});

/* DATA */
var BD_DATA = {"site":"Samt","menu":false,"groups":[{"label":"","items":[{"title":"Journal","slug":""},
{"title":"Library","slug":"library"},
{"title":"About","slug":"about"}]}],"pager":false,"nav":{"icon":"text","label":"ص مت","openLabel":"×","corner":"right","headings":false,"accordion":true,"current":"arrow","title":"hide"},"sections":[],"pages":[{"section":"","slug":"menu","num":"","title":"Menu"},
{"section":"","slug":"how-to-deseed-a-watermelon","num":"","title":"How To Deseed A Watermelon For Safe Consumption"},
{"section":"","slug":"","num":"","title":"Journal"},
{"section":"","slug":"handala-and-the-freeze-point","num":"","title":"Handala And The Freeze Point"},
{"section":"","slug":"militant-improvisation","num":"","title":"Militant Improvisation"},
{"section":"","slug":"the-bourgeoi-rtist","num":"","title":"The Bourgeoi’rtist"},
{"section":"","slug":"art-in-times-of-crisis","num":"","title":"Art In Times Of Crisis"},
{"section":"","slug":"library","num":"","title":"Library"},
{"section":"","slug":"about","num":"","title":"About"}],"externals":[],"gDur":450};

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

/* LINES ONLY */
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

/* START */
document.addEventListener("DOMContentLoaded", function () {
var data = Object.assign({}, BD_DATA, { current: document.body.getAttribute("data-bd-page") || "" });
bdChrome(document, data);
bdGalleries(document);
bdInk(document);
});
