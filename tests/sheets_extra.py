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
        ok('canvas: left+right margins (100 + 100 at 0.6 zoom) leave the sheet 120px narrower than its window', abs(small[0] - (762 - 120)) < 6)
        ok('canvas: a page on an open sheet under a peeking menu starts at the window edge (menu inset goes into its content)', await ev(f"(() => {{ const l = {sh}.querySelector('.bd-site'); const q = l.querySelector('.bd-panel'); return getComputedStyle(l).paddingLeft === '100px' && parseFloat(getComputedStyle(q).paddingLeft) >= 300; }})()"))
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
        # blur only under a sheet; a margin-top sheet rises before the page scrolls inside it
        await ev("(function(){ var ix = S.project.site.sheets.find(function(k){return k.id==='index'}); ix.rest='open'; ix.shadow='line'; S.project.site.layers.reveal='focus'; S.project.site.layers.focusBlur=5; ix.blur=10; S.project.pages['b2lr3tkr'].box={mt:'100'}; changed(); })()")
        css = await ev("exportCSS()")
        ok('blur: the content layer is no longer filtered (only sheets blur what is under them)', '.bd-ly-content {\nfilter' not in css and 'blur(var(--ly-focus))' not in css)
        ok('blur: sheet blur = sqrt(own² + focus²) = 11.2px', 'backdrop-filter: blur(11.2px);' in css)
        await pg.click('[data-act=preview]'); await pg.wait_for_timeout(2500)
        FR = "document.getElementById('bd-sheet').shadowRoot.querySelector('iframe')"
        await ev(FR + ".contentWindow.document.querySelector('a[href=\"/library\"]').click()"); await pg.wait_for_timeout(900)
        r = await ev(FR + ".getBoundingClientRect().toJSON()")
        await pg.mouse.move(r['x'] + r['width'] * 0.6, r['y'] + r['height'] * 0.6)
        st = "(function(){ var w = " + FR + ".contentWindow, k = w.document.querySelector('.bd-ly-k[data-k=index]'), pn = k.querySelector('.bd-ly-pane.is-on'); return [Math.round(k.getBoundingClientRect().top - w.document.querySelector('.bd-ly').getBoundingClientRect().top), pn.scrollTop]; })()"
        t0 = await ev(st)
        await pg.mouse.wheel(0, 60); await pg.wait_for_timeout(200)
        t1 = await ev(st)
        await pg.mouse.wheel(0, 200); await pg.wait_for_timeout(250)
        t2 = await ev(st)
        ok('scroll: the sheet starts 100px down', t0[0] == 100)
        ok('scroll: first scrolling raises the sheet, the page inside stays put', t1[0] == 40 and t1[1] == 0)
        ok('scroll: once at the top the page scrolls inside it', t2[0] == 0 and t2[1] > 0)
        await pg.mouse.wheel(0, -3000); await pg.wait_for_timeout(300)
        await pg.mouse.wheel(0, -80); await pg.wait_for_timeout(250)
        t3 = await ev(st)
        ok('scroll: back at the top, scrolling up brings the margin back', t3[0] == 80)
        # a sheet only ever slides in a straight line; one black scroll line on the window's right edge
        await ev("(function(){ var ix = S.project.site.sheets.find(function(k){return k.id==='index'}); ix.rest='open'; ix.sliver=60; S.project.site.layers.dur=900; S.project.pages['fji5ongj'].box={mt:'100',mr:'90'}; changed(); })()")
        await pg.wait_for_timeout(2500)
        W = FR + ".contentWindow"
        rect = "(function(){ var r = " + W + ".document.querySelector('.bd-ly-k[data-k=index]').getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top)]; })()"
        await ev(W + ".document.querySelector('.bd-ly-pane a[href*=watermelon]').click()")
        tops = []; lefts = []
        for i in range(6):
            await pg.wait_for_timeout(140); q = await ev(rect); tops.append(q[1]); lefts.append(q[0])
        ok('slide: a tucking sheet keeps its top edge (no diagonal)', set(tops) == {100})
        ok('slide: it does move left', lefts[-1] < lefts[0] - 100)
        await pg.wait_for_timeout(1200)
        ok('slide: the tucked sheet keeps its page margins', await ev(W + ".document.querySelector('.bd-ly-k[data-k=index]').className.indexOf('is-on-') > -1"))
        bar = await ev("(function(){ var w = " + W + "; var b = w.document.getElementById('bd-ly-bar'); return [b.className.indexOf('is-off') < 0, Math.round(b.querySelector('i').getBoundingClientRect().right) === w.innerWidth]; })()")
        ok('scrollbar: one black line shows, on the far right edge of the window', bar == [True, True])
        # gradients: a sheet's paper and a page's card/behind colours can be solid or a two-colour gradient
        await ev("(function(){ var ix = S.project.site.sheets.find(function(k){return k.id==='index'}); ix.color='#ebebeb'; ix.alpha=30; applyPath('fill.mode|site.sheets.1.color', 'grad'); applyPath('fill.a|site.sheets.1.color', '#ff0000'); applyPath('fill.angle|site.sheets.1.color', '90'); applyPath('fill.mode|page.sheetBg', 'grad'); changed(); })()")
        css = await ev("exportCSS()")
        ok('gradient: a sheet\'s paper keeps its see-through on every stop', 'linear-gradient(90deg, rgba(255, 0, 0, 0.3), rgba(255, 255, 255, 0.3))' in css)
        ok('gradient: back to solid keeps the first colour', await ev("(function(){ applyPath('fill.mode|site.sheets.1.color', 'solid'); return S.project.site.sheets[1].color; })()") == '#ff0000')
        ok('no page errors', not errs)
        await b.close()
    bad = [n for n, c in R if not c]
    print(len(R), 'checks', len(bad), 'failed')
asyncio.run(run())
