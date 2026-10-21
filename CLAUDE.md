# Samt · CLAUDE.md

## What this is
Static site for samt.co on Cloudflare Workers (static assets, free plan). Pushing to `main` deploys.
Source of truth is `content/site.json`; the back office at /admin renders and publishes it.

## Back office (site/admin.html + site/admin/grid.*)
Walid's Site Grid editor, shared with the other grid sites. Same code in every grid repo — change it in one, copy to the others.
- Loads content/site.json from GitHub with Walid's fine-grained token (kept in his browser only).
- Draft autosaves to localStorage (bd-draft-<repo>) until Publish.
- Publish = one commit: content/site.json, content/manifest.json, every page .html, site/404.html, site/assets/bd.css (stamped "PUBLISHED <id>"), site/assets/bd.js, new images (uploaded earlier as git blobs). Pages in the old manifest but not the new one are deleted. Then polls /assets/bd.css for the stamp.
- Image props: assetId "live" (in site/images), "sha:<blob>" (uploaded, not yet published), "remote" (still hot-linked from an old URL; Publish tries to copy it in).

## Delivery format — non-negotiable
- Complete file replacements only. Never partial diffs.
- Output as inline code blocks, never file downloads (Walid works on mobile)

## CSS conventions ("Brutalist Architecture")
- Zero indentation, flush left · one property per line · /* SECTION */ comments
- bd- namespace · is- / has- state classes
- Desktop-first; ALL mobile styles in ONE media block at the end

## When unsure
Ask before assuming.
