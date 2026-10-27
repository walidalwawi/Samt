import asyncio, sys, os
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
        pg.on('pageerror', lambda e: errs.append('ed:' + str(e)))
        await pg.goto('http://127.0.0.1:8765/admin'); await pg.wait_for_timeout(3000)
        ev = pg.evaluate
        # the Blog tab sits with the Master tabs and the tool is a pad
        await pg.click('#bd-left [data-act=master-sel]'); await pg.wait_for_timeout(300)
        ok('master: four tabs, Styles Motion Site Blog', await pg.locator('#bd-right [data-act=master-tab]').count() == 4)
        ok('master: no Done button, no About line', await pg.locator('#bd-right [data-act=master-done]').count() == 0)
        await pg.click('#bd-right [data-act=master-tab][data-val=blog]'); await pg.wait_for_timeout(400)
        ok('master: the Blog tab shows All posts · master and keeps the four tabs', await pg.locator('#bd-right [data-act=master-tab]').count() == 4 and await pg.locator('#bd-right .is-pf, #bd-right .bd-ed-pfollow').count() == 1)
        ok('blog tool: a pad of five buttons (up, left, own, right, down)', await pg.locator('#bd-right .bd-ed-padb').count() == 5)
        await pg.click('#bd-right .bd-ed-padb.is-r'); await pg.wait_for_timeout(300)
        ok('blog tool: Right is saved on the site', await ev("S.project.site.postGo.side === 'right'"))
        await ev("S.mode = 'phone'; render()")
        await pg.click('#bd-right .bd-ed-padb.is-t'); await pg.wait_for_timeout(300)
        ok('blog tool: the phone has its own side (sideM), desktop stays right', await ev("S.project.site.postGo.sideM === 'top' && S.project.site.postGo.side === 'right'"))
        await ev("S.mode = 'desktop'; render()")
        ok('export: the sheet that holds the blog carries both sides, no other sheet does', await ev("""(function(){ var h = exportPage(Object.values(S.project.pages).filter(function(q){return q.blog})[0]); var n = (h.match(/data-pe=/g) || []).length; return n === 1 && /data-pe="right" data-pe-m="top"/.test(h); })()"""))
        ok('export: the hidden state exists for the chosen sides', await ev("(function(){ var c = exportCSS(); return /\\.bd-ly-k\\.is-e-right\\.is-st-hidden/.test(c) && /is-em-top\\.is-st-hidden/.test(c); })()"))
        ok('export: a post opened directly starts with the sheet already off to that side', await ev("(function(){ var q = Object.values(S.project.pages).filter(function(q){return q.parent})[0]; var h = exportPage(q); return /is-paper is-e-right is-em-top[^\"]* is-st-hidden/.test(h) || (/is-e-right/.test(h) && /is-st-hidden/.test(h)); })()"))
        files = await ev("""() => { ensurePhoneAll(); const f = {}; S.project.order.forEach(id => { const p = S.project.pages[id]; if (p.kind === 'pin') return; f[(p.slug || 'index') + '.html'] = exportPage(p); }); f['assets/bd.css'] = exportCSS(); f['assets/bd.js'] = exportJS(); return f; }""")
        os.makedirs('/home/claude/samt/site/_t/assets', exist_ok=True)
        for k, v in files.items():
            v = v.replace('/assets/bd.css', '/_t/assets/bd.css').replace('/assets/bd.js', '/_t/assets/bd.js')
            open('/home/claude/samt/site/_t/' + k, 'w').write(v)
        async def sheetRect(p2):
            return await p2.evaluate("""() => { var k = document.querySelector('.bd-ly-k[data-blogs]'); var r = k.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: innerWidth, h: innerHeight, cls: k.className }; }""")
        for vw, vh, name, side in [(1440, 900, 'desktop', 'right'), (390, 844, 'phone', 'top')]:
            p2 = await ctx.new_page(); await p2.set_viewport_size({'width': vw, 'height': vh}); p2.on('pageerror', lambda e: errs.append(str(e)))
            await p2.goto('http://127.0.0.1:8765/_t/index.html'); await p2.wait_for_timeout(900)
            r0 = await sheetRect(p2)
            ok(name + ': the journal lies in the window at first', r0['l'] < r0['w'] and r0['r'] > 0 and r0['t'] < r0['h'] and r0['b'] > 0)
            await p2.evaluate("document.querySelector('a[href=\"/how-to-deseed-a-watermelon\"]').click()"); await p2.wait_for_timeout(1500)
            r1 = await sheetRect(p2)
            gone = {'right': r1['l'] >= r1['w'] - 1, 'top': r1['b'] <= 1, 'left': r1['r'] <= 1, 'bottom': r1['t'] >= r1['h'] - 1}[side]
            ok(name + ': clicking a post sends the blog sheet off to the ' + side, gone and ('is-e-' + side in r1['cls'] or 'is-em-' + side in r1['cls']))
            await p2.evaluate("document.querySelector('a[href=\"/\"]').click()"); await p2.wait_for_timeout(1500)
            r2 = await sheetRect(p2)
            ok(name + ': and back to the blog it comes home', r2['l'] < r2['w'] - 1 and r2['r'] > 1 and r2['t'] < r2['h'] - 1 and r2['b'] > 1)
            await p2.close()
        # --- a page with no sheet is the page-on-a-sheet panel in its Card state
        await ev("(function(){ S.masterSel = false; S.postMaster = false; S.sheetSel = ''; S.sel = null; var q = Object.values(S.project.pages).filter(function(q){ return !q.blog && !q.parent && q.kind !== 'pin' && sheetOf(q.id).k < 0; })[0]; window.__u = q ? q.id : ''; if (q) S.pageId = q.id; render(); })()")
        if await ev("window.__u"):
            ok('no sheet: Layout has max width, padding and columns but no margins, no hint', await pg.locator('#bd-right [data-bind="page.box.maxW"]').count() == 1 and await pg.locator('#bd-right [data-bind="page.box.mt"]').count() == 0 and await pg.locator('#bd-right .bd-ed-hint:has-text("lies underneath")').count() == 0)
            ok('no sheet: Style is open with card colour, see-through, blur, decoration, corners, shadow, no Behind the page', await pg.locator('#bd-right [data-path="page.box.shadow"]').count() > 0 and await pg.locator('#bd-right .bd-ed-thumbs').count() == 1 and await pg.locator('#bd-right [data-path="page.sheetBg"], #bd-right [data-bind="page.sheetBg"]').count() == 0)
            await ev("(function(){ var q = S.project.pages[window.__u]; q.pattern = 'lined'; q.box = q.box || {}; q.box.card = '#ffffff'; changed(); })()")
            ok('no sheet: its decoration lies on the card in the export', await ev("exportCSS().indexOf('.bd-ly-art[data-id=\"' + window.__u + '\"] > .bd-panel {\\nbackground: repeating-linear-gradient') > -1"))
        # blank = the sheet's own edge as before
        await ev("S.project.site.postGo = { side: '', sideM: '' }; changed()")
        ok('blank: no data-pe at all, the sheet keeps its own edge', await ev("exportPage(Object.values(S.project.pages).filter(function(q){return q.blog})[0]).indexOf('data-pe=') < 0"))
        ok('no page errors', not errs)
        await b.close()
    bad = [n for n, c in R if not c]
    print(len(R), 'checks', len(bad), 'failed')
asyncio.run(run())
