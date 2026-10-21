# Samt

Website for samt.co. Hosted on Cloudflare (free), built with the grid back office.

## Edit the site
Open **samt.co/admin**. First time only: paste a GitHub key (the page tells you how to make one).

- **Pages** (left): every page, grouped by menu section. Add, duplicate, reorder, make home.
- **Canvas** (middle): add blocks from the rail — text, image, gallery, link, notes, list, video, HTML, rule. Drag to move, pull the handle to resize; everything snaps to the grid. Tap selected text again to type.
- **Master / Styles / Menu / Site**: the grid, type styles, menu button and colours shared by every page.
- **Code**: Site CSS, Page CSS, Head HTML, the selected block's HTML, and the generated output.
- **Publish**: puts everything live in one GitHub commit. Cloudflare updates the site in about 30 seconds.

Edits are kept in your browser until you press Publish.

## Where things live
- `content/site.json` — the whole site (pages, blocks, styles). The back office reads and writes this.
- `site/` — what Cloudflare serves. Pages and `assets/bd.css`, `assets/bd.js` are written by Publish; don't edit them by hand.
- `site/images/` — images you add in the back office.
- `site/files/` — put PDFs here on GitHub (Add file → Upload) and link to `/files/name.pdf`.
- `site/admin.html`, `site/admin/` — the back office itself.
- `wrangler.jsonc` — Cloudflare settings. "name" must match the Worker (samt).

## Undo
Cloudflare dashboard → the Worker → Deployments → older version → Rollback. Or revert the commit on GitHub.
