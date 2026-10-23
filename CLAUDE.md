# Samt · CLAUDE.md

## What this is
Static site for samt.co on Cloudflare Workers (static assets, free plan). Pushing to `main` deploys.
Source of truth is `content/site.json`; the back office at /admin renders and publishes it.

## Back office (site/admin.html + site/admin/grid.*)
Walid's Site Grid editor — ONE back office for walidalwawi.com and samt.co. Identical files in both repos (site/admin.html differs only in BD_HOST); change one, copy to the other. BD_SITES in admin.html lists the sites; the switcher stores the choice in localStorage bd-site-current. One GitHub key (bd-gh-key) covers both repos.
- Blocks: text, image, gallery, library, link, notes, list, video, html, rule, quote, fold-out list (toggle), product; site blocks menu (list or button + overlay, with brand text beside it), page title, page arrows (arrows or "Next, title" words; pages or blog scope); blog blocks posts (cards grid/columns/list, featured, card look) and post info (back link, words ~ minutes).
- Blogs: a page with `blog: true`; posts are pages with `parent: <blog id>`, plus `date`, `excerpt`, `featured`. Posts are skipped by the menu and by site-scope page arrows. Cards use the post's h1 || title, first image, and word count.
- Prefer a real block over an html block; html blocks are for genuine one-offs.
- Inspect: picks any element in the canvas; design bar writes rules into site.css or page.css via cssSplit/ruleSet; on Phone into the single @media (max-width: 760px) block, which Publish merges into bd.css's one mobile block.
- Code drawer is CodeMirror 5 (cdnjs). Files tab edits any non-generated repo file and uploads to site/files/ or site/images/; both ride in the publish commit.
- Loads content/site.json from GitHub with Walid's fine-grained token (kept in his browser only).
- Draft autosaves to localStorage (bd-draft-<repo>) until Publish.
- Publish = one commit: content/site.json, content/manifest.json, every page .html, site/404.html, site/assets/bd.css (stamped "PUBLISHED <id>"), site/assets/bd.js, new images (uploaded earlier as git blobs). Pages in the old manifest but not the new one are deleted. Then polls /assets/bd.css for the stamp.
- Image props: assetId "live" (in site/images), "sha:<blob>" (uploaded, not yet published), "remote" (still hot-linked from an old URL; Publish tries to copy it in).

## Layers (site.layers.on + site.sheets) — the paper-sheet site (used by samt.co)
Site tab → Paper sheets. Any page can lie on a translucent sheet; site.sheets is the stack, top → bottom (list order = z order). Pages not on a sheet lie underneath (content layer), one shown at a time.
- A sheet (SHEET_DEFAULTS): pages (several = it slides between them, axis y/x), strip (a page drawn on its edge — the part that peeks out), edge / edgeM (left/right/top/bottom, desktop/phone), rest (open | peek | hidden), peek/peekM px, sliver/sliverM px (what stays when a page underneath opens; measured from the sheet's own edge, can be negative to tuck under the sheet above), covers (all | some + coverPages), color/alpha/blur/line, dur (own speed), paneW/pad/padM (its pages' text width and side padding).
- A sheet's box is inset by the peeks of the peeking sheets above it (sheetInsets); pages underneath are padded by all peeking sheets.
- bdSheetPlan(K, focus, prev) — exported as-is, used by Publish (initial classes) and the runtime: the page's own sheet opens on it; sheets above go back to rest (open-at-rest ones tuck); sheets below keep what they were doing; a page underneath tucks every open-at-rest sheet; a sheet that doesn't cover the page hides. Runtime bdLayers(): states as is-st-open/peek/tuck/hidden on .bd-ly-k, page on a sheet = --i on .bd-ly-track (snaps instantly when the sheet isn't open, so it only slides back), pushState, Escape/back, About-style toggle (tapping the open page of a non-open-at-rest sheet goes back).
- The menu is a page: "Menu" with a Sheet menu block (sheetmenu: menu, marker, align, style, pad/padM, gap/gapM, mark), used as the Menu sheet's strip. Current link: the open page, else a post's blog, else the page of the sheet that tucked.
- Classic set (migrateSheets, run on load when layers are on and site.sheets is missing; also a button): Menu sheet (strip = Menu page, About on it, rest peek, left/top) over Index sheet (Journal ↕ Library, rest open). Output is pixel-identical to the old fixed three-sheet layout (checked state by state, desktop + phone).
- Opening transitions (LAYER_TRANS, site.layers.trans; page.trans overrides, Page → This page's sheet): slide, fold, unfold, squash, drop, push, rise, cut — sheetStateCSS writes every state per edge and per transition (desktop prefix is-e-, phone is-em- inside the one mobile block; each rule sets every --k value so phone replaces desktop). Root carries is-t-<trans> of the page underneath being opened/closed; page.transDur → --ly-pdur.
- Page → This page's sheet (pages underneath): opens with, speed, paper colour, margins (layerPageCSS). Pages on a sheet show "On a sheet → Edit the sheet".
- Canvas: the page on its sheet's paper, with the peeking sheets above drawn at their edges (layerEditChrome renders their strip pages); a strip page is edited at strip size (.bd-site.is-strip). Preview renders the real export in an iframe.

## Looks: master + override for every block type
Styles → Blocks sets the default look per block type (BLOCK_STYLE); a block's own Look fields override it ("Site" = follow the master). Now covers text, image, gallery, notes, list, link, video, rule, quote, posts, library, toggle, product, pager, post info, menu, page title. Images, galleries, library covers and post card images have a blend mode (mix-blend-mode) plus a "blend against colour" backdrop (a blend shows nothing on white otherwise), tone/opacity/corners.
- BS_WHEN hides fields that do nothing in the current state (tracing-paper fields only with Card look = Tracing paper, staples only with Zine, spine only with Book look, backdrop only with a blend, etc.).
- Every block with a master shows Look in its own panel; if Site/Page CSS has rules for that block (.bd-e-<id>, usually from Inspect) Look warns and offers "Remove the code overrides". The CSS fine-tuner (Inspect bar) sits folded under Look.
- Layers mode hides what a layered site doesn't use: + Header/Footer, floating menu button, page arrows at the end, Continue with other pages; the rail offers Sheet menu instead of Menu.
- Audit: /home-style test sets every BLOCK_STYLE field as master and as override and checks canvas + export change (see session notes); keep new fields wired in blockRules.
- Left panel tabs: Pages · Styles · Motion · Site · Code. Code is no longer a bottom drawer: it opens as a wide left pane (has-wide-left). Views: Full CSS (default, read-only, exactly what Publish writes), Your CSS (site.css), Page CSS, This block (selected block's published HTML — editable for text/html — plus every published rule that styles it, via elRules), Page HTML, JS, Head, Files. Tapping a block with Code open switches to This block. With Code open, any tap on the canvas inspects the deepest element under the finger (S.codeNode, found by box because editing disables pointer events inside blocks): its HTML plus every published rule that matches it (nodeRules uses element.matches, ignoring :hover/::before).
- Blend "Lines only · drop the white" (value ink): the rule writes mix-blend-mode: multiply plus the marker --bd-ink-img: 1. Runtime bdInk() (in bd.js, also run on the edit canvas) bakes every marked image once: canvas → white becomes transparent, dark becomes the text colour → PNG data URL, then blend back to normal. Multiply alone failed in Safari because the sheets (transform/backdrop-filter) isolate the blend; the bake works everywhere. Images it cannot read (other domains) keep plain multiply.
- Panels: the two buttons at the top corners hide/show the left and right panels on wide screens (S.hideLeft/S.hideRight, saved in localStorage bd-hide-left / bd-hide-right; classes is-no-left / is-no-right on .bd-ed-app).
- Motion tab: paper-sheet motion (layers presets/ease/speeds/tilt/shadow/reveal), gestures (site.motion: gDur, gEase, tease, open → --bd-g-* tokens used by zine/trace/library transitions and the gesture delays in bdGalleries), and the master card look/hover/slide for Blog posts and book look/hover for Library. Those motion keys are skipped in Styles → Blocks (BS_GROUPS "Motion" group) but still overridable in a block's Look → Motion.
- Look fields are grouped (BS_GROUPS): posts Text / Card / Card image / Tracing paper / Zine / Motion; library Covers / Book / Motion; quote Text / Box; menu Links / Name.
- Tools (site.editor: layout, hidden, order, moved, custom — saved with the site): every top-bar button, rail button, left/right tab and panel section can be hidden, brought back, reordered and moved. The ⋯ at the end of the top bar, the rail and each tab strip opens the Tools sheet for that zone. Buttons move between top bar and rail; tabs between left and right (the right panel then gets tabs: Selected + moved panels); sections between any panels (ids from their headings: "<panel>:<slug>"). toolLayout() fills in anything new at its usual place.
- Add tool: code box; the code calls BD.tool({ id, name, kind: button|panel|section, icon (20×20 svg inner), zone (top/rail · left/right), panel (for sections), run(api) / render(api), actions: { name(api, el) } → data-act="tool-fn" data-tool data-fn }). api: site, page, block, state, set(path, v), change(fn), render(), say(msg), css(), uid, ui (field, row, sw, seg, select, input, numIn, colorIn, esc, icon). Errors show in the Tools sheet, never break the editor. Custom code runs with full editor access.
- Editor theme: monochrome warm greys, mono tabs, black for what's on.

## Delivery format — non-negotiable
- Complete file replacements only. Never partial diffs.
- Output as inline code blocks, never file downloads (Walid works on mobile)

## CSS conventions ("Brutalist Architecture")
- Zero indentation, flush left · one property per line · /* SECTION */ comments
- bd- namespace · is- / has- state classes
- Desktop-first; ALL mobile styles in ONE media block at the end

## When unsure
Ask before assuming.

## Samt house style — "deadpan gesture" (fixed, Walid's choice)
- Interactions mimic one real-life gesture, stripped to a diagram: the library book cover swings open ~24° on hover (flat grey spine, blunt shadow, no textures, no realism).
- One small physical gesture per element, never decoration: brutalist surfaces, the motion supplies the humour.
- Keep it flat: solid colours, hard shadows, simple transforms (rotate/translate). No gradients for realism, no bounce, no 3D beyond a single hinge.
- Timing ~0.45s ease; angles small enough to read as cheeky, not as a 3D effect.
- Reference implementation: library "Book look" (.bd-library.is-book, hover "Open (perspective)").
- Mobile first: hover only teases (~8°, desktop with real hover); a tap/click plays the full gesture (~24°) and the link opens after ~0.5s. New-tab links open immediately while the gesture plays.
- Journal cards use the tracing-paper variant (Posts block → Card look → Tracing paper): a frosted sheet with the post info lies on the poster image; hover nudges it, a tap slides it most of the way off, then the post opens. The zine variant (cover swings) is still available as a Card look.
- Each post can set its own card image: mark an image block "Use as card image", pick one under Page → Card image, or upload an own image there (cards only, not shown in the post).
