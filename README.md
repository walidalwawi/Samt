# Samt

Website for samt.co. Hosted on Cloudflare (free), built with the grid back office.

## Edit the site
Open **walidalwawi.com/admin** or **samt.co/admin** — one back office for both. Switch sites from the name at the top left. First time only: paste a GitHub key with access to both repos.

```
TOP BAR    site ▾ · Desktop | Phone · undo redo · Code · Preview · Save & publish
LEFT       Pages (pages, + Header, + Footer) · Styles (type) · Site (colours, frame, menu, Advanced)
CANVAS     column bar on top (Site | This page · 1 2 3 · widths · gutter; phone 1 2)
           rail: add text, image, gallery, link, notes, list, video, HTML, rule · ⌖ style anything
RIGHT      what you tapped: Page · Header/Footer · Block (content, Style, column, actions) · Menu
CODE       Site CSS · Page CSS · Head · Block · Files
```

- Tap a block: edit its content, then **Style** it (size, colour, spacing…) — "Just this" or "All like it". **Pick inside** styles one word, image or link within it.
- **⌖** in the rail: style anything on the page, including the header and menu.
- On **Phone**, every number you change is the phone value, and Style writes phone-only CSS.
- Rarely needed settings sit under **Advanced** (master placement, grid units, free-grid pages, exact block placement).
- **Save & publish** (or Cmd+S) puts everything live in one GitHub commit; Cloudflare updates in about 30 seconds. Edits are kept in your browser until you publish.

## Where things live
- `content/site.json` — the whole site (pages, blocks, styles). The back office reads and writes this.
- `site/` — what Cloudflare serves. Pages and `assets/bd.css`, `assets/bd.js` are written by Publish; don't edit them by hand.
- `site/images/` — images you add in the back office.
- `site/files/` — put PDFs here on GitHub (Add file → Upload) and link to `/files/name.pdf`.
- `site/admin.html`, `site/admin/` — the back office itself.
- `wrangler.jsonc` — Cloudflare settings. "name" must match the Worker (samt).

## Undo
Cloudflare dashboard → the Worker → Deployments → older version → Rollback. Or revert the commit on GitHub.
