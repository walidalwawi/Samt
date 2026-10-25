import asyncio, sys, json, time
sys.path.insert(0, '/home/claude/work')
from grid_test import gh
from playwright.async_api import async_playwright
SKIP = {'page-del-yes','sign-out','discard','discard-yes','export','zip','publish','reload','projects','tool-del','sheet-del','page-del','sel-del','menu-del','del-section','del-ext','tools-reset','pin-add','page-add','blog-add','post-add','sheet-add','add-section','add-ext','menu-new','tool-add','tool-save','set','page','left-tab','right-tab','tools-open','tools-close','add','code-tab','mode','code','preview','toggle-left','toggle-right','undo','redo','confirm-no','page-menu','stack-page','sheet-cover','layout','el-css-clear','inspect'}
SNAP = "() => ({ css: exportCSS(), html: exportPage(curPage()), model: JSON.stringify(S.project), st: JSON.stringify([S.leftTab, S.rightTab, S.sel, S.pageId, S.mode, S.preview, S.codeOpen]) })"
async def run():
    log = []
    def rec(zone, what, ok, note=''):
        log.append((zone, what, 'ok' if ok else 'FAIL', note))
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1440, 'height': 1000})
        await ctx.add_init_script("localStorage.setItem('bd-gh-key','t');localStorage.setItem('bd-site-current','samt')")
        await ctx.route('https://api.github.com/**', gh)
        await ctx.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, body=''))
        await ctx.route('https://drive.google.com/**', lambda r: r.fulfill(status=404, body=''))
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('http://127.0.0.1:8765/admin'); await pg.wait_for_timeout(3000)
        ev = pg.evaluate
        # A KNOWN SET OF SHEETS, WHATEVER THE LIVE SITE HAS RIGHT NOW
        await ev("S.project.site.layers.on = true; S.project.site.sheets = [Object.assign(clone(SHEET_DEFAULTS), { id: 'menu', name: 'Menu', axis: 'x', rest: 'peek', edge: 'left', edgeM: 'top', peek: 300, peekM: 70, restPage: '56ud3gky', pages: ['nsye72w3', '56ud3gky'], box: {} }), Object.assign(clone(SHEET_DEFAULTS), { id: 'index', name: 'Index', axis: 'y', rest: 'open', out: 'peek', sliver: 100, edge: 'left', main: 'fji5ongj', pages: ['fji5ongj', 'b2lr3tkr'], box: {} })]; ['nsye72w3','56ud3gky','fji5ongj','b2lr3tkr','zty6iib1'].forEach(function (id) { S.project.pages[id].box = {}; }); changed();"); await pg.wait_for_timeout(600)
        async def noerr(zone, what):
            if errs:
                rec(zone, what, False, errs[-1][:120]); errs.clear()
            else: rec(zone, what, True)
        # timings
        t = await pg.evaluate("""() => { const t = (f, n) => { const a = performance.now(); for (let i = 0; i < n; i++) f(); return Math.round((performance.now() - a) / n * 10) / 10; }; return { top: t(renderTop, 5), left: t(renderLeft, 5), right: t(renderRight, 5), canvas: t(renderCanvas, 5), exportCSS: t(exportCSS, 5), exportJS: t(exportJS, 5) }; }""")
        log.append(('timing', json.dumps(t), 'ms', 'per render, desktop Chromium'))
        # top bar + rail buttons
        for sel, zone in [('#bd-top', 'top bar'), ('#bd-rail', 'rail')]:
            acts = await pg.locator(f'{sel} [data-act]').evaluate_all("els => els.map(e => [e.getAttribute('data-act'), e.getAttribute('data-val') || e.getAttribute('data-type') || ''])")
            for act, val in acts:
                if act in ('export', 'projects'): continue
                if await pg.locator(f'{sel} [data-act="{act}"]').first.evaluate("e => e.disabled || e.offsetParent === null"): rec(zone, act, True, 'disabled or hidden now'); continue
                q = f'{sel} [data-act="{act}"]' + (f'[data-val="{val}"]' if val and act == 'mode' else '') + (f'[data-type="{val}"]' if act == 'add' else '')
                try:
                    await pg.locator(q).first.click(timeout=3000); await pg.wait_for_timeout(250)
                    if act == 'add':
                        n = await pg.evaluate("curPage().els.length")
                        await pg.evaluate("snap(); curPage().els.pop(); S.sel = null; changed();")
                        rec(zone, f'add {val}', n > 0)
                    elif act == 'tools-open':
                        await noerr(zone, 'tools sheet opens'); await pg.click('[data-act=tools-close]'); await pg.wait_for_timeout(150)
                    elif act in ('preview', 'code', 'inspect'):
                        await noerr(zone, act + ' on'); await pg.evaluate("S.preview = false; S.inspect = false; S.codeOpen = false; render();"); await pg.wait_for_timeout(300); await noerr(zone, act + ' off')
                    elif act in ('toggle-left', 'toggle-right'):
                        await noerr(zone, act); await pg.locator(q).first.click(); await pg.wait_for_timeout(100)
                    else:
                        await noerr(zone, act + (' ' + val if val else ''))
                except Exception as e:
                    rec(zone, act, False, str(e)[:100])
        await pg.evaluate("S.mode = 'desk'; S.preview = false; S.inspect = false; S.codeOpen = false; S.leftTab = 'pages'; S.masterSel = false; render();")
        # left tabs: every field + safe button
        for tab in ['pages', 'styles', 'motion', 'site']:
            BOX = '#bd-left' if tab == 'pages' else '#bd-right'
            SET = ("S.masterSel = false; S.leftTab = 'pages'; renderLeft();" if tab == 'pages' else f"S.sheetSel = ''; S.sel = null; S.masterSel = true; S.masterTab = '{tab}'; render();")
            await pg.evaluate(SET); await pg.wait_for_timeout(200)
            await pg.evaluate("document.querySelectorAll('" + BOX + " details').forEach(d => d.open = true)")
            await noerr('left/' + tab, 'renders')
            binds = await pg.locator(BOX + ' [data-bind]').evaluate_all("els => els.map(e => [e.getAttribute('data-bind'), e.tagName, e.type || '', e.getAttribute('data-type') || ''])")
            seen = set()
            for path, tag, typ, dt in binds:
                if path in seen or path.startswith('ui.'): continue
                seen.add(path)
                before = await pg.evaluate(SNAP)
                try:
                    el = pg.locator(f'{BOX} [data-bind="{path}"]').first
                    if tag == 'SELECT':
                        opts = await el.evaluate("e => Array.from(e.options).map(o => o.value)")
                        cur = await el.evaluate("e => e.value")
                        alt = [o for o in opts if o != cur]
                        if not alt: rec('left/' + tab, path, True, 'one option'); continue
                        await el.select_option(alt[-1])
                    elif typ == 'color':
                        await el.evaluate("e => { e.value = '#ff0000'; e.dispatchEvent(new Event('input', {bubbles: true})); }")
                    elif typ == 'checkbox':
                        await el.click()
                    else:
                        cur = await el.evaluate("e => e.value")
                        nv = '37' if dt in ('num', 'int', 'blank', 'px') or cur.replace('.', '').isdigit() else (cur + ' x')
                        if dt == 'slug': nv = 'slug-x'
                        await el.fill(nv); await el.dispatch_event('input')
                    await pg.wait_for_timeout(260)
                    after = await pg.evaluate(SNAP)
                    changed = before['css'] != after['css'] or before['html'] != after['html']
                    applied = before['model'] != after['model']
                    rec('left/' + tab, path, applied, '' if changed else ('applied · nothing on this page uses it' if applied else 'did not apply'))
                except Exception as e:
                    rec('left/' + tab, path, False, str(e)[:100])
                await pg.evaluate("document.querySelectorAll('" + BOX + " details').forEach(d => d.open = true)")
                if errs: rec('left/' + tab, path + ' error', False, errs[-1][:120]); errs.clear()
            # safe buttons
            acts = await pg.locator(BOX + ' [data-act]').evaluate_all("els => [...new Set(els.map(e => e.getAttribute('data-act')))]")
            for act in acts:
                if act in SKIP: continue
                try:
                    await pg.locator(f'{BOX} [data-act="{act}"]').first.click(timeout=2000); await pg.wait_for_timeout(200)
                    await noerr('left/' + tab, 'button ' + act)
                    await pg.evaluate(SET + f" S.confirm = null; document.querySelectorAll('{BOX} details').forEach(d => d.open = true)")
                except Exception as e:
                    rec('left/' + tab, 'button ' + act, False, str(e)[:80])
        # right panel: page (underneath), page on a sheet, post, each block type
        targets = []
        targets.append(('page underneath', "S.sel = null; goPage('zty6iib1');"))
        targets.append(('page on a sheet', "S.sel = null; goPage('nsye72w3');"))
        targets.append(('post', "S.sel = null; goPage('aj2hm4y8');"))
        types = await pg.evaluate("Object.keys(BD_TYPE_NAME)")
        for ty in types:
            targets.append(('block ' + ty, f"goPage('aj2hm4y8'); var d = elDefaults('{ty}'); if (d) {{ var e = {{ id: 'tst_{ty}', type: '{ty}', d: {{ x: 0, y: 300, w: 12, h: 6 }}, m: null, props: d.props }}; curPage().els.push(e); S.sel = e.id; }} render();"))
        for name, setup in targets:
            await pg.evaluate(setup); await pg.wait_for_timeout(300)
            await pg.evaluate("document.querySelectorAll('#bd-right details').forEach(d => d.open = true)")
            await noerr('right/' + name, 'renders')
            binds = await pg.locator('#bd-right [data-bind]').evaluate_all("els => els.map(e => [e.getAttribute('data-bind'), e.tagName, e.type || '', e.getAttribute('data-type') || ''])")
            seen = set()
            for path, tag, typ, dt in binds:
                if path in seen or path.startswith('ui.') or path.startswith('ins.'): continue
                seen.add(path)
                before = await pg.evaluate(SNAP)
                try:
                    el = pg.locator(f'#bd-right [data-bind="{path}"]').first
                    if tag == 'SELECT':
                        opts = await el.evaluate("e => Array.from(e.options).map(o => o.value)")
                        cur = await el.evaluate("e => e.value")
                        alt = [o for o in opts if o != cur]
                        if not alt: rec('right/' + name, path, True, 'one option'); continue
                        await el.select_option(alt[-1])
                    elif typ == 'color':
                        await el.evaluate("e => { e.value = '#ff0000'; e.dispatchEvent(new Event('input', {bubbles: true})); }")
                    elif typ == 'checkbox':
                        await el.click()
                    elif typ == 'date':
                        await el.fill('2026-01-02'); await el.dispatch_event('input')
                    else:
                        cur = await el.evaluate("e => e.value")
                        nv = '37' if dt in ('num', 'int', 'blank', 'px') or cur.replace('.', '').isdigit() else (cur + ' x')
                        if dt == 'slug': nv = 'slug-x'
                        if path.startswith('own.'): nv = '5'
                        if typ == 'range': nv = '0.5'
                        await el.fill(nv); await el.dispatch_event('input')
                    await pg.wait_for_timeout(260)
                    after = await pg.evaluate(SNAP)
                    changed = before['css'] != after['css'] or before['html'] != after['html']
                    applied = before['model'] != after['model'] or path.startswith('ui.')
                    rec('right/' + name, path, applied, '' if changed else ('applied · not visible in export' if applied else 'did not apply'))
                except Exception as e:
                    rec('right/' + name, path, False, str(e)[:100])
                await pg.evaluate("document.querySelectorAll('#bd-right details').forEach(d => d.open = true)")
                if errs: rec('right/' + name, path + ' error', False, errs[-1][:120]); errs.clear()
            sw = await pg.locator('#bd-right [data-act=set][data-vtype=bool]').evaluate_all("els => els.map(e => e.getAttribute('data-path'))")
            for path in dict.fromkeys(sw):
                before = await pg.evaluate(SNAP)
                if await pg.locator(f'#bd-right [data-act=set][data-path="{path}"]').count() == 0 or await pg.locator(f'#bd-right [data-act=set][data-path="{path}"]').first.evaluate("e => e.offsetParent === null"): rec('right/' + name, 'switch ' + path, True, 'folded away'); continue
                try:
                    await pg.locator(f'#bd-right [data-act=set][data-path="{path}"]').first.click(timeout=2000); await pg.wait_for_timeout(200)
                    after = await pg.evaluate(SNAP)
                    rec('right/' + name, 'switch ' + path, before['model'] != after['model'] or before['st'] != after['st'] or path.startswith('ui.'), '')
                except Exception as e:
                    rec('right/' + name, 'switch ' + path, False, str(e)[:80])
                await pg.evaluate("document.querySelectorAll('#bd-right details').forEach(d => d.open = true)")
            segs = await pg.locator('#bd-right .bd-ed-seg [data-act=set]').evaluate_all("els => [...new Set(els.map(e => e.getAttribute('data-path')))]")
            for path in segs:
                before = await pg.evaluate(SNAP)
                try:
                    btns = pg.locator(f'#bd-right .bd-ed-seg [data-act=set][data-path="{path}"]:not(.is-on)')
                    if await btns.count() == 0: continue
                    await btns.last.click(timeout=2000); await pg.wait_for_timeout(200)
                    after = await pg.evaluate(SNAP)
                    rec('right/' + name, 'choice ' + path, before['model'] != after['model'] or before['st'] != after['st'], '')
                except Exception as e:
                    rec('right/' + name, 'choice ' + path, False, str(e)[:80])
                await pg.evaluate("document.querySelectorAll('#bd-right details').forEach(d => d.open = true)")
            if errs: rec('right/' + name, 'errors', False, errs[-1][:120]); errs.clear()
        await b.close()
    fails = [l for l in log if l[2] == 'FAIL']
    out = ['# Back office test log', '', f'Generated by work/full_pass.py · {time.strftime("%Y-%m-%d %H:%M")} · {len(log)} checks · {len(fails)} failed', '', '| Where | What | Result | Note |', '|---|---|---|---|']
    for l in log: out.append('| ' + ' | '.join(str(x).replace('|', '\\|') for x in l) + ' |')
    open('/home/claude/walidalwawi/TESTS.md', 'w').write('\n'.join(out) + '\n')
    print(len(log), 'checks', len(fails), 'failed')
    for f in fails: print('FAIL', f)
asyncio.run(run())
