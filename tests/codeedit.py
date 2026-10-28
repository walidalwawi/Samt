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
        r = await ev("""() => { S.codeOpen = true; S.leftTab = 'code'; render(); S.codeTab = 'out'; S.outTab = 'css'; renderCode(); var cm = S.cm; return { ro: cm.getOption('readOnly'), n: cm.getValue().length }; }""")
        ok('Full CSS is editable', r['ro'] in (False, None, ''))
        r = await ev("""() => { S.codeTab = 'out'; S.outTab = 'css'; renderCode(); var cm = S.cm; var v = cm.getValue(); var m = v.match(/\\n([.#a-z][^{}\\n]*) \\{\\n\\s*([a-z-]+): ([^;\\n]+);/); if (!m) return { none: true }; var sel = m[1], prop = m[2], val = m[3]; var nv = v.replace(m[0], m[0].replace(prop + ': ' + val, prop + ': 7px')); cm.setValue(nv); cm.ta.dispatchEvent(new Event('input')); return { sel: sel, prop: prop, css: S.project.site.css || '' }; }""")
        await pg.wait_for_timeout(600)
        css = await ev("S.project.site.css || ''")
        ok('editing a value saves an override in site css', r.get('sel') and ': 7px' in css and r['sel'].split(',')[0].strip()[:6] in css)
        r = await ev("""() => { S.codeTab = 'out'; S.outTab = 'css'; renderCode(); var fi = document.getElementById('bd-find'); fi.value = 'padding'; fi.dispatchEvent(new Event('input')); return document.getElementById('bd-find-count').textContent; }""")
        ok('search finds matches', r and r != 'none')
        r = await ev("""() => { var q = curPage(); q.els.push({ id: 'tx1', type: 'text', x:0,y:0,w:12,h:3, props: { html: '<p>Hello <b>there</b></p>' } }); S.sel = 'tx1'; S.codeTab = 'el'; renderCode(); var a = S.cms[0].getOption('readOnly'); S.cms[0].setValue('<p>Changed</p>'); S.cms[0].ta.dispatchEvent(new Event('input')); return new Promise(function (res) { setTimeout(function () { res({ ro: a, h: q.els.filter(function (x) { return x.id === 'tx1'; })[0].props.html }); }, 600); }); }""")
        ok('text block html is editable', r['ro'] in (False, None, '') and r['h'] == '<p>Changed</p>')
        r = await ev("""() => { var q = curPage(); var e = q.els.filter(function (x) { return x.type === 'rule'; })[0] || (q.els.push({ id: 'ru1', type: 'rule', x:0,y:0,w:12,h:1, props: {} }), q.els[q.els.length-1]); S.sel = e.id; S.codeTab = 'el'; S.codeConfirm = null; renderCode(); var asked = document.querySelector('[data-act=code-html-ask]') != null; S.codeConfirm = e.id; renderCode(); S.codeConfirm = e.id; var b = document.querySelector('[data-act=code-html-yes]'); if (b) b.click(); return { asked: asked, type: e.type, code: (e.props.code || '').slice(0, 60) }; }""")
        ok('generated block can become html', r['asked'] and r['type'] == 'html' and r['code'])
        ok('no page errors', not errs)
        if errs: print(errs)
        await b.close()
asyncio.run(run())
bad = [n for n, v in R if not v]
print(len(R), 'checks', len(bad), 'failed')
