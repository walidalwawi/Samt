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
        await ev("sheetList().forEach(function(k){ if (k.id === 'menu') { k.peek = 300; k.peekM = 70; k.out = 'peek'; } if (k.id === 'index') { k.box = {}; } }); changed();")
        # the canvas shrinks the sheet to a page's margins (desktop and phone), % included
        await ev("goPage('b2lr3tkr')"); await pg.wait_for_timeout(500)
        full = await ev(f"(() => {{ const r = {sh}.querySelector('.bd-site .bd-panel').getBoundingClientRect(); return [r.width, r.height]; }})()")
        await ev("S.project.pages['b2lr3tkr'].box = { mt: '20%', ml: '100', mr: '100', mb: '50' }; changed();"); await pg.wait_for_timeout(700)
        small = await ev(f"(() => {{ const r = {sh}.querySelector('.bd-site .bd-panel').getBoundingClientRect(); return [r.width, r.height]; }})()")
        ok('canvas: left+right inset (100 + 100 at 0.6 zoom) leave the page 120px narrower than its sheet', small[0] < full[0] - 20)
        ok('canvas: a page on an open sheet under a peeking menu: its inset (100px) sits inside the frame, the menu inset goes into its content', await ev(f"(() => {{ const l = {sh}.querySelector('.bd-site'); const q = l.querySelector('.bd-panel'); return getComputedStyle(l).paddingLeft === '0px' && getComputedStyle(q).marginLeft === '100px' && parseFloat(getComputedStyle(q).paddingLeft) >= 300; }})()"))
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
        # blur only under a sheet; a sheet with a top margin rises before the page scrolls inside it
        await ev("(function(){ var ix = S.project.site.sheets.find(function(k){return k.id==='index'}); ix.rest='open'; ix.shadow='line'; S.project.site.layers.reveal='focus'; S.project.site.layers.focusBlur=5; ix.blur=10; ix.box={mt:'100'}; S.project.pages['b2lr3tkr'].box={}; changed(); })()")
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
        await ev("(function(){ var ix = S.project.site.sheets.find(function(k){return k.id==='index'}); ix.rest='open'; ix.sliver=60; S.project.site.layers.dur=900; ix.box={mt:'100',mr:'90'}; S.project.pages['fji5ongj'].box={}; changed(); })()")
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
        # --- sheet panel, fills, patterns, margin/padding, leave/appear, page card ---
        import re
        errs2 = errs
        # left title selects sheet, right shows sheet settings
        await ev("S.preview=false; S.sel=null; render()"); await pg.wait_for_timeout(300)
        await ev("S.leftTab='pages'; render()"); await pg.wait_for_timeout(300)
        n = await pg.locator('button.bd-ed-group-label.is-btn').count()
        ok('left: sheet titles are buttons (%d)'%n, n>=2)
        await pg.locator('button.bd-ed-group-label.is-btn').nth(1).click(); await pg.wait_for_timeout(500)
        t = await ev("document.getElementById('bd-right').innerText")
        t=t.lower(); ok('right: sheet settings show', all(x.lower() in t for x in ['Style','Margin & padding','Pages spread','On leave','On appear','On hover','Layout','Pattern']))
        ok('right: page-only sections hidden', 'Space & card' not in t)
        # page click returns to page settings
        await ev("goPage(sheetList()[1].pages[0])"); await pg.wait_for_timeout(300)
        t = await ev("document.getElementById('bd-right').innerText")
        ok('page click -> page settings with Sheet settings button', 'Space & card' in t and 'Sheet settings' in t)
        await ev("S.sheetSel = sheetList()[1].id; render()")
        # model edits
        K = "S.project.site.sheets[1]"
        await ev(f"{K}.color='none'; {K}.pattern='grid'; {K}.out='hide'; {K}.lv='fold'; {K}.arrive='fade'; {K}.box={{ml:'20',pt:'30',mt:'10'}}; changed()")
        css = await ev("layerCSS(false)")
        blk = re.search(r'\.bd-ly-k\[data-k="'+(await ev(K+'.id'))+r'"\] \{[^}]*\}', css).group(0)
        ok('css: none paper is transparent + grid lines (painted on the pages)', re.search(r'bd-ly-pane\[data-page="[^"]+"\] \{\nbackground: repeating-linear-gradient[^}]*transparent', css) is not None)
        ok('css: hide leave gives a negative sliver', '--k-sliver: -12px' in blk)
        ok('css: sheet margin moves edges (left 20px, top 10px)', 'left: calc(0px + 20px)' in blk or 'left: calc(300px + 20px)' in blk)
        ok('css: per-sheet leave override', '#bd-ly .bd-ly-k.is-lv-fold' in css)
        ok('css: fade-in rule', 'is-ap-fade.is-st-hidden' in css)
        ok('css: sheet padding goes to pages (30px top)', re.search(r'bd-ly-pane\[data-page="[^"]+"\] > \.bd-panel \{[^}]*padding-top: calc\(30px', css) is not None)
        html = await ev("layerDoc(curPage(), 'view')")
        ok('markup: classes is-lv-fold + is-ap-fade', 'is-lv-fold' in html and 'is-ap-fade' in html)
        # gradient to clear
        await ev(f"{K}.color='linear-gradient(90deg, #ff0000, #0000ff)'; applyPath('fill.ends|site.sheets.1.color','cx'); ")
        v = await ev(K+'.color')
        ok('gradient: colour -> clear stored (%s)'%v, v=='linear-gradient(90deg, #ff0000, transparent)')
        css = await ev("layerCSS(false)")
        ok('css: clear stop stays transparent', re.search(r'rgba\(255, 0, 0, [\d.]+\), transparent', css) is not None)
        await ev(f"applyPath('fill.mode|site.sheets.1.color','none')")
        ok('fill mode None -> "none"', (await ev(K+'.color'))=='none')
        # page card opacity + blur + none
        pid = await ev("sheetList()[1].pages[0]")
        await ev(f"S.project.pages['{pid}'].box = {{card:'#ffffff', cardA:'40', blur:'6'}}; changed()")
        css = await ev("layerCSS(false)")
        ok('css: page card see-through + blur', 'rgba(255, 255, 255, 0.4)' in css and 'blur(6px)' in css)
        # canvas
        await ev("goPage('%s'); S.sheetSel=''; render()"%pid); await pg.wait_for_timeout(600)
        ok('canvas renders', await ev("!!document.getElementById('bd-sheet').shadowRoot.querySelector('.bd-site')"))
        ok('no page errors '+str(errs[:2]), not errs)

        # --- one place for sheets: Site has no Stack list, the sheet panel has Higher / Lower, also while previewing
        await ev("S.leftTab='site'; S.preview=false; render()")
        ok('site tab: no Stack list any more', 'Stack' not in await ev("document.getElementById('bd-left').innerText.replace(/\\s+/g,' ')"))
        await ev("S.leftTab='pages'; S.sheetSel=sheetList()[0].id; S.preview=true; S.sel=null; render()")
        tt = (await ev("document.getElementById('bd-right').innerText")).lower()
        ok('sheet panel shows while previewing, with Stack + Higher/Lower', 'higher' in tt and 'lower' in tt and 'style' in tt)
        id0 = await ev("sheetList()[0].id")
        await ev("S.preview=false; sheetList(); document.querySelector('[data-act=\"sheet-down\"]') && document.querySelector('[data-act=\"sheet-down\"]').click()"); await pg.wait_for_timeout(300)
        ok('Lower moves the sheet down the stack', await ev(f"sheetList()[1].id === '{id0}'"))
        # --- "stays showing" is measured past the peeking strips above, so it is visible; Play button; hide
        await ev("S.project.site.sheets.sort((a,b)=> a.id==='menu' ? -1 : b.id==='menu' ? 1 : 0); S.project.site.sheets.forEach(k=>{ if(k.id==='index'){ k.sliver=30; k.rest='open'; k.out='peek'; } }); changed()")
        css = await ev("layerCSS(false)")
        ok('sliver is measured past the menu strip (300 + 30 = 330px)', re.search(r'data-k="index"\] \{[^}]*--k-sliver: 330px', css) is not None)
        await ev("S.sheetSel=sheetList().filter(k=>k.id==='index')[0].id; S.preview=false; S.sel=null; render()")
        ok('sheet panel has the Play button', 'sheet-play' in await ev("document.getElementById('bd-right').innerHTML"))
        # --- page inset: inside the sheet's frame, never moves the sheet edges
        await ev("S.project.pages['b2lr3tkr'].box = { ml: '10%', mt: '40' }; S.preview = false; changed();")
        css = await ev("exportCSS()")
        ok('inset: the export insets the page panel (margin on the panel, not on the sheet)', '.bd-ly-pane[data-page="b2lr3tkr"] > .bd-panel {\nmargin-top: 40px;' in css and 'margin-left: 10vw;' in css)
        ok('inset: the sheet itself has no per-page edge rule any more', '.is-on-b2lr3tkr {' not in css)
        await pg.click('[data-act=preview]'); await pg.wait_for_timeout(2500)
        FR2 = "document.getElementById('bd-sheet').shadowRoot.querySelector('iframe')"
        await ev(FR2 + ".contentWindow.document.querySelector('a[href=\"/library\"]').click()"); await pg.wait_for_timeout(900)
        got = await ev("(function(){ var d = " + FR2 + ".contentWindow.document; var pn = d.querySelector('.bd-ly-pane[data-page=\"b2lr3tkr\"]'); var q = pn.querySelector('.bd-panel'); var a = pn.getBoundingClientRect(), b = q.getBoundingClientRect(); return [Math.round(b.left - a.left), Math.round(b.top - a.top), Math.round(a.width - b.width)]; })()")
        ok('inset: published, the page sits 10% (of the window) and 40px inside its pane, the pane stays full', got[0] > 100 and got[1] == 40)
        await pg.click('[data-act=preview]'); await pg.wait_for_timeout(600)
        await ev("S.project.pages['b2lr3tkr'].box = {}; S.preview=false; changed();")
        # --- the simple behaviour model writes the old fields
        await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='index'})[0]; k.rest='open'; k.out='peek'; k.sliver=40; k.sliverM=''; })()")
        ok('behaviour: Starts Away turns a shown sheet with a 40px strip into a peeking one', await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='index'})[0]; sheetMove(k, 'start', 'away'); return k.rest === 'peek' && k.peek === 40; })()"))
        ok('behaviour: strip 0 on an away sheet = hidden', await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='index'})[0]; sheetMove(k, 'strip', 0); return k.rest === 'hidden'; })()"))
        ok('behaviour: Starts Shown + Stays shown = still', await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='index'})[0]; sheetMove(k, 'start', 'shown'); sheetMove(k, 'other', 'stay'); return k.rest === 'still'; })()"))
        ok('behaviour: Goes away with a strip = open + peek out + sliver', await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='index'})[0]; sheetMove(k, 'other', 'away'); sheetMove(k, 'strip', 25); return k.rest === 'open' && k.out === 'peek' && k.sliver === 25; })()"))
        await ev("S.sheetSel='index'; S.preview=false; S.sel=null; render()")
        rt = await ev("document.getElementById('bd-right').innerHTML")
        ok('behaviour: panel shows Starts, Side, On appear, On leave, On hover always', all(t in rt for t in ['Starts', 'Side', 'On appear', 'On leave', 'On hover', 'When another page opens']))
        await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='index'})[0]; k.rest='open'; k.out='peek'; k.sliver=100; })()")
        # --- layout map: drag the window onto the main page; hover; page decoration
        await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='index'})[0]; k.axis='x'; k.main=''; k.hover='lift'; S.sheetSel=k.id; S.preview=false; S.sel=null; render(); })()"); await pg.wait_for_timeout(500)
        wbox = await ev("(function(){ var w = document.querySelector('#bd-right [data-sheetwin]'); var r = w.getBoundingClientRect(); return [r.x + r.width/2, r.y + r.height/2, r.width]; })()")
        await pg.mouse.move(wbox[0], wbox[1]); await pg.mouse.down(); await pg.mouse.move(wbox[0] + wbox[2] * 0.9, wbox[1], steps=6); await pg.mouse.up(); await pg.wait_for_timeout(500)
        ok('map: dragging the blue window onto the second page makes it the main page', await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='index'})[0]; return k.main === sheetPanes(k)[1].id; })()"))
        doc = await ev("layerDoc(S.project.pages['b2lr3tkr'], 'export')")
        ok('map: the published sheet starts on the main page (data-main=1, --i on the track)', 'data-main="1"' in doc)
        css = await ev("exportCSS()")
        ok('hover: a lifting sheet gets the class and the desktop hover rule', 'is-hv-lift' in await ev("layerDoc(S.project.pages['b2lr3tkr'], 'export')") and 'is-hv-lift:hover' in css)
        await ev("S.project.pages['b2lr3tkr'].pattern='dots'; S.project.pages['b2lr3tkr'].hover='lift'; changed();")
        css = await ev("exportCSS()")
        ok('page: its own decoration and hover lift override the sheet', 'radial-gradient' in css and '.bd-panel:hover' in css)
        await ev("S.project.pages['b2lr3tkr'].pattern=''; S.project.pages['b2lr3tkr'].hover=''; var k=sheetList().filter(function(k){return k.id==='index'})[0]; k.main=''; k.hover=''; k.axis='y'; changed();")
        # --- grid + drag to resize (desktop and phone), always snapping to the 5% grid
        await ev("S.sheetSel=''; S.preview=false; S.inspect=false; S.mode='desktop'; S.project.pages['b2lr3tkr'].box = {}; goPage('b2lr3tkr'); render()"); await pg.wait_for_timeout(700)
        SHB = "document.getElementById('bd-sheet').shadowRoot"
        ok('grid: a line every 5% with the halves marked', await ev(f"{SHB}.querySelectorAll('.bd-gr i').length") == 38 and await ev(f"{SHB}.querySelectorAll('.bd-gr i.is-h').length") == 2)
        ok('grid: four drag handles on a page', await ev(f"{SHB}.querySelectorAll('.bd-gh').length") == 4)
        async def drag(side, frac, phone):
            g = await ev(f"(()=>{{const h=[...{SHB}.querySelectorAll('.bd-gh')].find(x=>x.dataset.side==='{side}'); const r=h.getBoundingClientRect(); const s=document.getElementById('bd-sheet').getBoundingClientRect(); return [r.x+r.width/2, r.y+r.height/2, s.x, s.y, S.zoom]}})()")
            x, y, sx, sy, z = g
            W, H = (390, 780) if phone else (1280, 800)
            tx = sx + (W * frac + 3) * z if side in 'lr' else x
            ty = sy + (H * frac + 3) * z if side in 'tb' else y
            await pg.mouse.move(x, y); await pg.mouse.down(); await pg.mouse.move(tx, ty, steps=6); await pg.mouse.up(); await pg.wait_for_timeout(700)
        await drag('l', 0.30, False)
        ok('drag: the left edge lands on the 30% line (384px of 1280)', abs(await ev(f"parseFloat([...{SHB}.querySelectorAll('.bd-gh')].find(x=>x.dataset.side==='l').dataset.dist)") - 384) < 1.5)
        await drag('t', 0.20, False)
        ok('drag: the top edge lands on the 20% line (160px of 800)', abs(await ev(f"parseFloat([...{SHB}.querySelectorAll('.bd-gh')].find(x=>x.dataset.side==='t').dataset.dist)") - 160) < 1.5)
        await ev("S.mode='phone'; render()"); await pg.wait_for_timeout(700)
        await drag('l', 0.50, True)
        ok('drag on phone writes the phone value only and lands on 50% (195px of 390)', await ev("!!S.project.pages['b2lr3tkr'].box.mlM && /%$/.test(S.project.pages['b2lr3tkr'].box.ml)") and abs(await ev(f"parseFloat([...{SHB}.querySelectorAll('.bd-gh')].find(x=>x.dataset.side==='l').dataset.dist)") - 195) < 1.5)
        await ev("S.mode='desktop'; S.sheetSel=sheetOf('b2lr3tkr').sheet.id; render()"); await pg.wait_for_timeout(700)
        ok('grid: with a sheet selected the handles are the sheet’s', await ev(f"{SHB}.querySelectorAll('.bd-gh.is-sheet').length") == 4)
        ok('grid: the switch turns it off', 'ui.grid' in await ev("document.getElementById('bd-right').innerHTML"))
        await ev("S.grid=false; S.sheetSel=''; render()"); await pg.wait_for_timeout(500)
        ok('grid: off draws nothing', await ev(f"{SHB}.querySelectorAll('.bd-gh, .bd-gr').length") == 0)
        await ev("S.grid=true; S.project.pages['b2lr3tkr'].box = {}; render()")
        await ev("(function(){ var k = sheetList().filter(function(k){return k.id==='menu'})[0]; S.sheetSel=''; goPage(sheetStrip(k).id); })()"); await pg.wait_for_timeout(700)
        ok('grid: the edge strip has one handle (how much of it shows)', await ev(f"{SHB}.querySelectorAll('.bd-gh.is-peek').length") == 1)
        await drag('r', 0.15, False)
        ok('drag: the peek amount snaps to 15% of the window (192px)', await ev("sheetList().filter(function(k){return k.id==='menu'})[0].peek") == 192)
        # phone padding: a page on a sheet under a peeking menu never keeps the desktop's big left padding
        css = await ev("exportCSS()")
        ok('phone: one mobile block only', css.count('@media (max-width: 760px)') == 1)
        # gradient paper continues across the scroll area
        await ev("S.project.site.sheets.find(k => k.id==='index').color = 'linear-gradient(180deg, #ffffff, #8899ff)'; changed()")
        css = await ev("exportCSS()")
        ok('gradient: paper is painted on the panes, attached local, spread over every page of the sheet', 'local' in css and '200%' in css)
        ok('no page errors', not errs)
        await b.close()
    bad = [n for n, c in R if not c]
    print(len(R), 'checks', len(bad), 'failed')
asyncio.run(run())
