import asyncio, json, base64, os, sys
from playwright.async_api import async_playwright
REPO = '/home/claude/samt'
cap = {}


def files():
    out = []
    for r, ds, fs in os.walk(REPO):
        if '.git' in r:
            continue
        for f in fs:
            out.append(os.path.relpath(os.path.join(r, f), REPO))
    return out


async def gh(route):
    req = route.request
    u = req.url.split('?')[0]
    m = req.method

    async def ok(j):
        await route.fulfill(status=200, content_type='application/json', body=json.dumps(j))
    if m == 'GET' and '/contents/' in u:
        path = u.split('/contents/', 1)[1]
        fp = os.path.join(REPO, path)
        if os.path.isfile(fp):
            return await ok({'sha': 'sha-' + path, 'content': base64.b64encode(open(fp, 'rb').read()).decode()})
        return await route.fulfill(status=404, content_type='application/json', body='{"message":"Not Found"}')
    if m == 'GET' and u.rstrip('/').endswith('/repos/walidalwawi/samt'):
        return await ok({'name': 'samt'})
    if m == 'GET' and '/git/ref/heads/main' in u:
        return await ok({'object': {'sha': 'head1'}})
    if m == 'GET' and '/git/commits/head1' in u:
        return await ok({'tree': {'sha': 'tree1'}})
    if m == 'GET' and '/git/trees/' in u:
        return await ok({'tree': [{'path': p, 'type': 'blob'} for p in files()]})
    if m == 'POST' and u.endswith('/git/blobs'):
        return await ok({'sha': 'blob1'})
    if m == 'POST' and u.endswith('/git/trees'):
        cap['tree'] = json.loads(req.post_data)
        return await ok({'sha': 'tree2'})
    if m == 'POST' and u.endswith('/git/commits'):
        return await ok({'sha': 'c2'})
    if m == 'PATCH':
        return await ok({})
    print('UNHANDLED', m, u)
    await route.fulfill(status=404, content_type='application/json', body='{}')


async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
        await ctx.add_init_script("localStorage.setItem('bd-gh-key','t');localStorage.setItem('bd-site-current','samt')")
        await ctx.route('https://api.github.com/**', gh)
        await ctx.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, body=''))
        await ctx.route('https://drive.google.com/**', lambda r: r.fulfill(status=404, body=''))
        await ctx.route('https://cdnjs.cloudflare.com/**', lambda r: r.continue_())
        pg = await ctx.new_page()
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('http://127.0.0.1:8765/admin')
        await pg.wait_for_timeout(3000)
        await pg.screenshot(path='/home/claude/work/shots/g1.png')
        await pg.click('.bd-ed-left .bd-ed-tabs button:has-text("Site")')
        await pg.wait_for_timeout(500)
        await pg.screenshot(path='/home/claude/work/shots/g2-site.png')
        await pg.click('[data-act=preview]')
        await pg.wait_for_timeout(2500)
        await pg.screenshot(path='/home/claude/work/shots/g3-preview.png')
        fl = pg.frame_locator('iframe[title=Preview]')
        await fl.locator('a.bd-post').first.click()
        await pg.wait_for_timeout(1800)
        await pg.screenshot(path='/home/claude/work/shots/g4-post.png')
        await fl.locator('.bd-ly-a[data-go=about]').click()
        await pg.wait_for_timeout(900)
        await pg.screenshot(path='/home/claude/work/shots/g5-about.png')
        await pg.click('[data-act=preview]')
        await pg.click('[data-act=code]') if await pg.locator('[data-act=code]').count() else None
        await pg.wait_for_timeout(800)
        pass
        await pg.wait_for_timeout(800)
        await pg.click('[data-act=code-tab][data-val="out:css"]')
        await pg.wait_for_timeout(800)
        await pg.screenshot(path='/home/claude/work/shots/g6-code.png')
        print('errors', errs)
        if '--publish' in sys.argv:
            await pg.keyboard.press('Control+s')
            await pg.wait_for_timeout(5000)
            t = cap.get('tree', {}).get('tree', [])
            print('paths', [x['path'] for x in t])
            for x in t:
                fp = os.path.join(REPO, x['path'])
                if x.get('content') is not None:
                    os.makedirs(os.path.dirname(fp), exist_ok=True)
                    open(fp, 'w').write(x['content'])
                elif x.get('sha') is None and os.path.exists(fp):
                    os.remove(fp)
                    print('deleted', x['path'])
        await b.close()
if __name__ == "__main__":
    asyncio.run(run())
