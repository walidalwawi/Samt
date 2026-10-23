import asyncio, sys
sys.path.insert(0, '/home/claude/work')
from grid_test import gh
from playwright.async_api import async_playwright
PFX = sys.argv[1]
SETUP = sys.argv[2] if len(sys.argv) > 2 else ''
async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
        await ctx.add_init_script("localStorage.setItem('bd-gh-key','t');localStorage.setItem('bd-site-current','samt')")
        await ctx.route('https://api.github.com/**', gh)
        await ctx.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, body=''))
        pg = await ctx.new_page(); errs=[]
        pg.on('pageerror', lambda e: errs.append('ed:'+str(e)))
        await pg.goto('http://127.0.0.1:8765/admin'); await pg.wait_for_timeout(3000)
        if SETUP: await pg.evaluate(SETUP)
        files = await pg.evaluate("""() => { ensurePhoneAll(); const f = {}; S.project.order.forEach(id => { const p = S.project.pages[id]; if (p.kind === 'pin') return; f[(p.slug || 'index') + '.html'] = exportPage(p); }); f['assets/bd.css'] = exportCSS(); f['assets/bd.js'] = exportJS(); return f; }""")
        import os
        os.makedirs('/home/claude/samt/site/_t/assets', exist_ok=True)
        for k, v in files.items():
            v = v.replace('/assets/bd.css', '/_t/assets/bd.css').replace('/assets/bd.js', '/_t/assets/bd.js')
            open('/home/claude/samt/site/_t/' + k, 'w').write(v)
        for vw, vh, name in [(1440, 900, 'desk'), (390, 844, 'phone')]:
            p2 = await ctx.new_page(); await p2.set_viewport_size({'width': vw, 'height': vh}); p2.on('pageerror', lambda e: errs.append(str(e)))
            async def shot(n):
                await p2.wait_for_timeout(900); await p2.screenshot(path=f'/home/claude/work/shots/{PFX}-{name}-{n}.png')
            async def click(sel):
                await p2.evaluate("(s) => document.querySelector(s).click()", sel)
            await p2.goto('http://127.0.0.1:8765/_t/index.html'); await shot('1journal')
            await click('a[href="/library"]'); await shot('2library')
            await click('a[href="/about"]'); await shot('3about')
            await click('a[href="/about"]'); await shot('4back')
            await click('a[href="/"]'); await p2.wait_for_timeout(900)
            await click('a[href="/how-to-deseed-a-watermelon"]'); await shot('5post')
            await click('a[href="/about"]'); await shot('6aboutpost')
            await click('a[href="/about"]'); await shot('7backpost')
            await click('a[href="/library"]'); await shot('8postlib')
            await p2.goto('http://127.0.0.1:8765/_t/supply.html'); await shot('9supply')
            await p2.close()
        print('errors', errs); await b.close()
asyncio.run(run())
