import asyncio, sys
sys.path.insert(0, '/home/claude/work')
from grid_test import gh
from playwright.async_api import async_playwright
R = []
def ok(name, cond): R.append((name, bool(cond))); print(('ok   ' if cond else 'FAIL ') + name)
async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
        await ctx.add_init_script("localStorage.setItem('bd-gh-key','t');localStorage.setItem('bd-site-current','samt')")
        await ctx.route('https://api.github.com/**', gh)
        await ctx.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, body=''))
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('http://127.0.0.1:8765/admin'); await pg.wait_for_timeout(3000)
        ev = pg.evaluate
        r = await ev("""() => {
var q = Object.values(S.project.pages).filter(function (x) { return x.parent && (x.els || []).some(function (e) { return e.type === "postinfo"; }); })[0];
var e = q.els.filter(function (x) { return x.type === "postinfo"; })[0];
Object.assign(e.props, { align: "right", padT: 10, padB: 40, line: true, upper: true, tracking: 0.1, sep: " | ", backGap: 20, backSize: 18, backInk: "#ff0000", backDim: 50, ink: "#112233" });
var h = exportPage(q), c = exportCSS();
var sel = ".bd-e-" + e.id;
var panel = S.sel = null;
return { h: h, c: c, id: e.id };
}""")
        h, c, i = r['h'], r['c'], r['id']
        ok('html: alignment, line and separator', 'is-al-right' in h and 'has-line' in h and ' | ' in h)
        ok('css: spacing above and below', 'padding-top: 10px' in c and 'padding-bottom: 40px' in c)
        ok('css: capitals, tracking, text colour', 'text-transform: uppercase' in c and 'letter-spacing: 0.1em' in c and '#112233' in c)
        ok('css: back arrow gap, size, colour, strength', all(x in c for x in ['margin-right: 20px', 'font-size: 18px', '#ff0000', 'opacity: 0.5']))
        ok('css: back arrow rule is for this block only', '.bd-e-' + i + ' .bd-postinfo-back' in c)
        ph = await ev("""() => { var q = Object.values(S.project.pages).filter(function (x) { return x.parent && (x.els || []).some(function (e) { return e.type === "postinfo"; }); })[0]; var e = q.els.filter(function (x) { return x.type === "postinfo"; })[0]; goPage(q.id); S.sel = e.id; render(); return document.querySelector('#bd-right').innerHTML; }""")
        ok('panel: new fields shown', all(x in ph for x in ['el.align', 'el.padT', 'el.line', 'el.upper', 'el.backGap', 'el.backInk', 'el.sep']))
        mp = await ev("""() => { S.masterSel = true; S.masterTab = 'styles'; render(); return document.querySelector('#bd-right').innerHTML; }""")
        ok('master styles lists the Post info fields', 'Back link gap' in mp and 'Space below' in mp)
        m = await ev("""() => { var q = Object.values(S.project.pages).filter(function (x) { return x.parent && (x.els || []).some(function (e) { return e.type === "postinfo"; }); })[0]; var e = q.els.filter(function (x) { return x.type === "postinfo"; })[0]; ['align','padT','padB','line','upper','tracking','ink','backGap','backSize','backInk','backDim'].forEach(function (k) { delete e.props[k]; }); Object.assign(bsSite('postinfo'), { align: 'spread', padB: 33, line: '1', backInk: '#abcdef' }); return { h: exportPage(q), c: exportCSS() }; }""")
        ok('master: one setting styles every Post info block', 'is-al-spread' in m['h'] and 'has-line' in m['h'] and 'padding-bottom: 33px' in m['c'] and '#abcdef' in m['c'])
        ok('no page errors', not errs)
        await b.close()
asyncio.run(run())
bad = [n for n, v in R if not v]
print(len(R), 'checks', len(bad), 'failed')
