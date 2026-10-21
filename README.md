# Samt

Website for samt.co. Hosted on Cloudflare (free), built with the grid back office.

## Edit the site
Open **walidalwawi.com/admin** or **samt.co/admin** — it's one back office for both. Switch sites from the name at the top left. First time only: paste a GitHub key with access to both repos (the page tells you how).

- **Pages** (left): every page, grouped by menu section. Add, duplicate, reorder, make home.
- **Canvas** (middle): add blocks from the rail — text, image, gallery, link, notes, list, video, HTML, rule. Drag to move, pull the handle to resize; everything snaps to the grid. Tap selected text again to type.
- **Inspect**: tap anything on the page to get the design bar — size, line, spacing, weight, colour, align, fill, spacing above/below, padding, width, border, opacity, show/hide. Style "just this" or "all like it", in Site CSS or this page only. On Phone it writes to the one mobile block. Also: parent, show rule in code, move block, replace image, edit HTML.
- **Code**: Site CSS, Page CSS, Head HTML, the selected block, any other repo file (Files), and the generated output. Upload PDFs and other files from Files → Upload.
- **Master / Styles / Menu / Site**: the grid, type styles, menu button and colours shared by every page.
- **Save & publish** (or Cmd+S): puts everything live in one GitHub commit. Cloudflare updates the site in about 30 seconds.

Edits are kept in your browser until you publish.

## Where things live
- `content/site.json` — the whole site (pages, blocks, styles). The back office reads and writes this.
- `site/` — what Cloudflare serves. Pages and `assets/bd.css`, `assets/bd.js` are written by Publish; don't edit them by hand.
- `site/images/` — images you add in the back office.
- `site/files/` — put PDFs here on GitHub (Add file → Upload) and link to `/files/name.pdf`.
- `site/admin.html`, `site/admin/` — the back office itself.
- `wrangler.jsonc` — Cloudflare settings. "name" must match the Worker (samt).

## Undo
Cloudflare dashboard → the Worker → Deployments → older version → Rollback. Or revert the commit on GitHub.
