# Samt

Website for samt.co. Hosted on Cloudflare (free). Three paper sheets that slide over each other: the menu sheet, the index sheet (Journal on top, Library below), and the post underneath.

## Edit the site
Open **samt.co/admin**. First time on a device: paste a GitHub key with access to walidalwawi/samt (Contents: Read and write).

```
TOP     Content · Layers · Type · Motion · Site   |  Desktop | Phone · ↶ ↷ · View site · Publish
SUB     sections of the tab                       |  PREVIEW  Journal · Library · Post · About
LEFT    the controls                              RIGHT  the live site, exactly as it will publish

Content  Journal (posts, drawings, card image, featured) · Library · About · Pages
Layers   Menu sheet · Index sheet · Library · Post · Ground
Type     Sizes (Large, Small, Mono) · Fonts · Colour
Motion   Presets · Sheets · Gestures   (▶ Play buttons replay the moves)
Site     General · Menu · Custom CSS · GitHub
```

- On **Phone**, every number you change is the phone value.
- **Publish** (or Cmd+S) puts everything live in one GitHub commit; Cloudflare updates in about 30 seconds. Edits are kept in your browser until you publish.

## Where things live
- `content/samt.json` — the whole site: posts, library, about, pages, menu and every look setting.
- `site/` — what Cloudflare serves. Pages and `assets/samt.css` are written by Publish; don't edit them by hand.
- `site/images/` — images you add in the back office.
- `site/files/` — put PDFs here on GitHub (Add file → Upload) and link to `/files/name.pdf`.
- `site/admin.html`, `site/admin/` — the back office.
- `wrangler.jsonc` — Cloudflare settings. "name" must match the Worker (samt).

## Undo
Cloudflare dashboard → the Worker → Deployments → older version → Rollback. Or revert the commit on GitHub. The old Site Grid version of the site is in the git history before this rebuild.
