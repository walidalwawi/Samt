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
var s = S.project.site; s.header = true;
var bl = Object.values(S.project.pages).filter(function (x) { return x.blog && postsOf(x.id).length > 1; })[0];
var ps = postsOf(bl.id); var q = ps[1];
var out = { n: ps.length, title: bl.title, ptitle: q.title };
function h(pg) { var m = headHTML(pg).replace(/\\n/g, ""); return m; }
out.blog = h(bl); out.post = h(q);
bl.titleMode = "name"; out.blogName = h(bl);
bl.titleMode = "num"; out.blogNum = h(bl);
bl.titleMode = ""; bl.postTitleMode = "num"; out.postNum = h(q);
bl.postTitleMode = ""; s.postHead = "name"; out.postName = h(q);
return out;
}""")
        n = str(r['n'])
        ok('blog: post count above the name', '<span class="bd-num">' + n + '</span>' in r['blog'] and r['title'] in r['blog'])
        ok('post: its place in the blog above the name', '<span class="bd-num">2</span>' in r['post'] and r['ptitle'].split()[0] in r['post'])
        ok('blog: name only', 'bd-num' not in r['blogName'] and r['title'] in r['blogName'])
        ok('blog: number only', r['blogNum'] == '<header class="bd-head"><h1>' + n + '</h1></header>')
        ok('post: own blog choice wins (number only)', '<h1>2</h1>' in r['postNum'])
        ok('post: site choice (name only)', 'bd-num' not in r['postName'] and r['ptitle'].split()[0] in r['postName'])
        ph = await ev("""() => { S.masterSel = true; S.masterTab = 'site'; render(); return document.querySelector('#bd-right').innerHTML; }""")
        ok('site panel shows both choices', 'site.blogHead' in ph and 'site.postHead' in ph)
        ok('no page errors', not errs)
        await b.close()
asyncio.run(run())
print(len(R), 'checks', len([1 for n, v in R if not v]), 'failed')
