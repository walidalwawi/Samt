/* SAMT — LAYER SITE RUNTIME. MOVES THE PAPER: MENU, INDEX, CONTENT */
(function () {
"use strict";
var root = document.getElementById("bd-samt");
if (!root) return;
var PREVIEW = !!window.SAMT_PREVIEW;
var content = document.getElementById("bd-content");
var index = document.getElementById("bd-index");
var menu = document.getElementById("bd-menu");
var dur = parseInt(root.getAttribute("data-dur"), 10) || 460;
var menuDur = parseInt(root.getAttribute("data-menu-dur"), 10) || dur;
var gesture = root.getAttribute("data-gesture") || "none";
var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var siteTitle = document.title.split(" · ").pop();
var S = {
view: root.getAttribute("data-view") || "journal",
half: root.getAttribute("data-half") || "journal",
post: root.getAttribute("data-post") || ""
};
var before = "journal";

/* HELPERS */
function art(id) {
return content.querySelector(".bd-post[data-id=\"" + id + "\"]");
}
function artBySlug(slug) {
return content.querySelector(".bd-post[data-slug=\"" + slug + "\"]");
}
function moving(el, ms) {
if (reduce || !el) return;
el.classList.add("is-moving");
clearTimeout(el._mv);
el._mv = setTimeout(function () { el.classList.remove("is-moving"); }, Math.round(ms * 0.55));
}
function settle(half) {
if (reduce || !index) return;
var el = index.querySelector(".bd-half-" + half);
if (!el) return;
el.classList.add("is-settle");
void el.offsetWidth;
requestAnimationFrame(function () { el.classList.remove("is-settle"); });
}
function urlFor(st) {
if (st.view === "library") return "/library";
if (st.view === "about") return "/about";
if (st.view === "post") {
var a = art(st.post);
return a ? "/" + a.getAttribute("data-slug") : "/";
}
return "/";
}
function titleFor(st) {
if (st.view === "library") return "Library · " + siteTitle;
if (st.view === "about") return "About · " + siteTitle;
if (st.view === "post") {
var a = art(st.post);
return a ? a.getAttribute("data-title") + " · " + siteTitle : siteTitle;
}
return siteTitle;
}
function markMenu() {
var isPage = S.view === "post" && menu.querySelector("[data-go=\"page\"][data-page=\"" + S.post + "\"]");
menu.querySelectorAll(".bd-menu-a").forEach(function (a) {
var go = a.getAttribute("data-go");
var on = isPage ? a.getAttribute("data-page") === S.post : S.view === "about" ? go === "about" : go === S.half;
a.classList.toggle("is-cur", !!on);
if (on) a.setAttribute("aria-current", "page");
else a.removeAttribute("aria-current");
});
}

/* MOVE */
function go(view, opt) {
opt = opt || {};
var prev = { view: S.view, half: S.half, post: S.post };
if (view === "journal" || view === "library") {
S.half = view;
S.view = view;
}
else if (view === "about") {
if (S.view !== "about") before = S.view;
S.view = "about";
}
else if (view === "post") {
S.view = "post";
if (opt.post) S.post = opt.post;
}
if (S.post !== prev.post || (S.view === "post" && prev.view !== "post")) {
var a = art(S.post);
if (a) {
content.querySelectorAll(".bd-post.is-shown").forEach(function (x) { if (x !== a) x.classList.remove("is-shown"); });
a.classList.add("is-shown");
if (S.post !== prev.post) content.scrollTop = 0;
}
}
var tucked = S.view === "about" && (prev.view === "post" || (prev.view === "about" && root.classList.contains("is-tucked")));
root.classList.toggle("is-tucked", tucked);
root.classList.remove("is-v-" + prev.view, "is-h-" + prev.half);
root.classList.add("is-v-" + S.view, "is-h-" + S.half);
root.setAttribute("data-view", S.view);
root.setAttribute("data-half", S.half);
root.setAttribute("data-post", S.post);
if (prev.view !== S.view || prev.half !== S.half) {
if ((prev.view === "post") !== (S.view === "post" || tucked) || prev.half !== S.half) moving(index, dur);
if ((prev.view === "about") !== (S.view === "about")) moving(menu, menuDur);
if ((S.view === "journal" || S.view === "library") && (prev.view !== S.view)) settle(S.half);
}
markMenu();
document.title = titleFor(S);
if (S.view === "post") content.focus({ preventScroll: true });
if (PREVIEW) {
try {
parent.postMessage({ samt: "state", view: S.view, half: S.half, post: S.post }, "*");
} catch (e) {}
return;
}
if (!opt.pop) {
try {
history.pushState({ samt: S }, "", urlFor(S));
} catch (e) {}
}
}
function back() {
if (S.view === "about") go(before === "post" ? "post" : S.half);
else if (S.view === "post") go(S.half);
}

/* CLICKS */
document.addEventListener("click", function (ev) {
if (ev.defaultPrevented || ev.button > 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
var t = ev.target.closest ? ev.target : ev.target.parentElement;
var nav = t.closest("[data-go]");
if (nav) {
ev.preventDefault();
var g = nav.getAttribute("data-go");
if (g === "about" && S.view === "about") back();
else if (g === "page") go("post", { post: nav.getAttribute("data-page") });
else go(g);
return;
}
var th = t.closest("a.bd-thumb");
if (th) {
ev.preventDefault();
var id = th.getAttribute("data-post");
if (gesture === "none" || reduce) {
go("post", { post: id });
return;
}
th.classList.add("is-open");
setTimeout(function () {
go("post", { post: id });
setTimeout(function () { th.classList.remove("is-open"); }, dur + 200);
}, 320);
return;
}
var bk = t.closest(".bd-book");
if (bk) {
bk.classList.add("is-open");
clearTimeout(bk._op);
bk._op = setTimeout(function () { bk.classList.remove("is-open"); }, 1100);
return;
}
var f = t.closest(".bd-filters button");
if (f) {
var topic = f.getAttribute("data-topic");
f.parentNode.querySelectorAll("button").forEach(function (b) { b.classList.toggle("is-on", b === f); });
index.querySelectorAll(".bd-book").forEach(function (b) {
var list = " " + (b.getAttribute("data-topics") || "") + " ";
b.classList.toggle("is-hidden", !!topic && list.indexOf(" " + topic + " ") < 0);
});
settle("library");
}
});

/* KEYS */
document.addEventListener("keydown", function (ev) {
if (ev.key === "Escape") back();
});

/* HISTORY */
function fromPath() {
var p = location.pathname.replace(/\.html$/, "").replace(/\/+$/, "");
if (p === "" || p === "/index") return { view: "journal" };
if (p === "/library") return { view: "library" };
if (p === "/about") return { view: "about" };
var a = artBySlug(p.slice(1));
return a ? { view: "post", post: a.getAttribute("data-id") } : { view: "journal" };
}
window.addEventListener("popstate", function () {
var r = fromPath();
go(r.view, { post: r.post, pop: true });
});
if (!PREVIEW) {
try {
history.replaceState({ samt: S }, "", location.pathname);
} catch (e) {}
}

/* BACK OFFICE PREVIEW — THE EDITOR CAN DRIVE THE PAPER */
window.addEventListener("message", function (ev) {
var d = ev.data || {};
if (d.samt === "go") go(d.view, { post: d.post });
});
markMenu();
if (PREVIEW) {
try {
parent.postMessage({ samt: "state", view: S.view, half: S.half, post: S.post, ready: true }, "*");
} catch (e) {}
}
})();
