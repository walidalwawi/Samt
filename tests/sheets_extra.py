import asyncio, sys
sys.path.insert(0, '/home/claude/work')
from grid_test import gh
from playwright.async_api import async_playwright
R = []
def ok(name, cond): R.append((name, bool(cond))); print(('ok   ' if cond else 'FAIL ') + name)
async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1440, 'height': 1000})
        await ctx.add_init_script("localStorage.setItem('bd-gh-key','t');localStorage.setItem('bd-site-current','samt')")
        await ctx.route('https://api.github.com/**', gh)
        await ctx.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, body=''))
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('http://127.0.0.1:8765/admin'); await pg.wait_for_timeout(3000)
        ev = pg.evaluate
        sh = "document.getElementById('bd-sheet').shadowRoot"
        # the canvas shrinks the sheet to a page's margins (desktop and phone), % included
        await ev("goPage('b2lr3tkr')"); await pg.wait_for_timeout(500)
        full = await ev(f"(() => {{ const r = {sh}.querySelector('.bd-site .bd-panel').getBoundingClientRect(); return [r.width, r.height]; }})()")
        await ev("S.project.pages['b2lr3tkr'].box = { mt: '20%', ml: '100', mr: '100', mb: '50' }; changed();"); await pg.wait_for_timeout(700)
        small = await ev(f"(() => {{ const r = {sh}.querySelector('.bd-site .bd-panel').getBoundingClientRect(); return [r.width, r.height]; }})()")
        ok('canvas: left+right margins make the sheet narrower', small[0] < full[0] - 100)
        css = await ev("layerEditCSS(S.project.pages['b2lr3tkr'], false)")
        ok('canvas: 20% is a share of the drawn window (800 → 160px)', '160px' in css)
        # the edge page of a peeking sheet never draws 0 wide
        await ev("S.project.site.sheets.find(k => k.id === 'index').rest = 'peek'; S.project.site.sheets.find(k => k.id === 'index').peek = 0; changed(); goPage('fji5ongj');"); await pg.wait_for_timeout(600)
        w = await ev(f"{sh}.querySelector('.bd-site').getBoundingClientRect().width")
        ok('canvas: an edge page with 0 showing is still drawn (>= 120px, drawn at 60%)', w >= 70)
        # still sheet: stays put when something opens; hard shadow; nudge variable
        await ev("(function(){ var k = S.project.site.sheets.find(function(k){return k.id==='index'}); k.rest='still'; k.shadow='hard'; S.project.site.sheets.find(function(k){return k.id==='menu'}).nudge=14; changed(); })()")
        plan = await ev("JSON.stringify(bdSheetPlan(sheetModel(), sheetFocus(S.project.pages['zty6iib1']), null))")
        ok('plan: a still sheet stays open when a page underneath opens', '"st":"open"' in plan.split('},{')[1])
        css = await ev("exportCSS()")
        ok('css: hard shadow on the sheet', '8px 8px 0 rgba(0, 0, 0, 0.1)' in css)
        ok('css: nudge variable + hover rule', '--k-nudge: 14px;' in css and ':hover:not(:has(a:hover))' in css)
        # site switches really govern
        await ev("S.project.site.header = true; S.project.site.zoom = true; changed();")
        doc = await ev("layerDoc(S.project.pages['aj2hm4y8'], 'export')")
        ok('site switch Page title writes headings', doc.count('bd-head') >= 5)
        ok('site switch Click images to zoom marks images', doc.count('has-zoom') > 0)
        ok('menus: one list in the Site panel, no picker', await ev("(function(){ S.project.site.menus.length; return menuEditor(S.project.site.menus[0].id, true).indexOf('Menu name') < 0; })()"))
        ok('no page errors', not errs)
        await b.close()
    bad = [n for n, c in R if not c]
    print(len(R), 'checks', len(bad), 'failed')
asyncio.run(run())
