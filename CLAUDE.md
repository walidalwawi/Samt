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
Any page can lie on a translucent sheet; site.sheets is the stack, top → bottom (list order = z order). Pages not on a sheet lie underneath (content layer), one shown at a time.
- A sheet (SHEET_DEFAULTS): pages (ordered; several = it slides between them, axis y/x), rest (open | peek | hidden), restPage (with rest=peek: the page drawn on the edge, always there — sheetStrip(k); the other pages are the panes, sheetPanes(k)), edge/edgeM (where it parks, desktop/phone), peek/peekM px (how much of the rest page shows), sliver/sliverM px (what an open sheet leaves showing when a page underneath opens; from its own edge, may be negative), covers (all | some + coverPages), color/alpha/blur/line, dur. Older fields strip / paneW / pad / padM migrate on load (strip → pages + restPage; paneW/pad → the pane pages' box maxW/pl/pr).
- Menu+About and Journal+Library are the same thing: a sheet with two pages. The menu is a page ("Menu") holding a Sheet menu block (sheetmenu: menu, marker, align, style, pad/padM, gap/gapM, mark); it is the Menu sheet's rest page.
- Where it's edited: Pages tab → "+ Sheet" (a sheet with one fresh page), sheets show as groups with their pages indented ("edge" tag = rest page). Right panel of any page → "Lies on" (nothing / a sheet / a new sheet) and, on a sheet, the whole sheet editor (sheetEditHTML — the ONLY place it lives). Site tab → Stack: order only (arrows), tap to open.
- A page's margins (page.box m*) move its SHEET's own edges while it is the page showing (sheetMarginCSS → .bd-ly-k.is-on-<pageid>; runtime keeps is-on-* in step; the sheet transitions top/right/bottom/left) so what's underneath shows sharp around it. Padding/card stay on the panel (pageBoxCSS with noMargin). A page with a max width on a sheet sits at the left; underneath it centres. For pages underneath, margins inset the panel and sheetBg fills behind.
- A sheet's box is inset by the peeks of the peeking sheets above it (sheetInsets); pages underneath are padded by all peeking sheets.
- bdSheetPlan(K, focus, prev) — exported as-is, used by Publish (initial classes) and the runtime: the page's own sheet opens on it; sheets above go back to rest (open-at-rest ones tuck); sheets below keep what they were doing; a page underneath tucks every open-at-rest sheet; a sheet that doesn't cover the page hides. Runtime bdLayers(): is-st-open/peek/tuck/hidden on .bd-ly-k, page on a sheet = --i on .bd-ly-track (snaps instantly when the sheet isn't open, so it only slides back), pushState, Escape/back, About-style toggle.
- Opening transitions (LAYER_TRANS, site.layers.trans; page.trans overrides — Space & card → Opens with, pages underneath only): slide, fold, unfold, squash, drop, push, rise, cut — sheetStateCSS writes every state per edge and per transition (desktop prefix is-e-, phone is-em- inside the one mobile block). page.transDur → --ly-pdur.
- Canvas: the page on its sheet's paper, with the peeking sheets above drawn at their edges (layerEditChrome renders their rest pages); a rest page is edited at strip size (.bd-site.is-strip). Preview renders the real export in an iframe (kept in place; see Panels).
- Classic set: migrateSheets runs once when layers are on and site.sheets is missing. The old three-sheet output is pixel-identical (tests/states.py).

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
- Panels: left = the base for everything (Pages list, Styles masters, Motion, Site incl. the sheet Stack order); right = what's specific to the selected page or block, including its sheet. Typing in a field redraws the canvas 160 ms after the keys pause; picks and switches redraw at once.
- Page → Space & card (pageBoxPanel; page.box: mt/mr/mb/ml margin, pt/pr/pb/pl padding, each with an M phone value that falls back to desktop; card, radius, shadow none/line/hard/soft, maxW, fit) plus page.sheetBg = behind the page. Values: number = px, % = of the window (top/bottom → vh, sides → vw). pageBoxCSS writes .bd-panel.bd-pg-<id> (every page panel carries bd-pg-<id>); pages underneath add the peeking-sheet insets; pages on sheets via .bd-ly-pane[data-page]. Old sheetPadT/X migrate into box padding on load.
- Preview with layers keeps its iframe: a look-only change restyles it in place (#bd-prev-css); a content change rebuilds after typing pauses (380 ms) and reopens the page you were on with the same scroll (parent.__bdPrevKeep). Lines-only drawings are baked once into blob URLs (window.__bdInkCache, keyed by src + ink colour), shared with the preview — assigning a blob src again is free, so re-renders don't re-decode 30 PNGs.
- Editor shades: panels sit on --e-bg, each section is a card (--e-surface), open folds and groups use --e-tint, tool rows alternate.

## Tests (tests/, run from the repo root with the local server tests/serve.py pointing at the samt checkout)
- tests/full_pass.py presses every top-bar and rail button, opens every left tab and changes every field and safe button, then selects a page underneath, a page on a sheet, a post and one block of every type and changes every field, switch and choice on the right. It writes TESTS.md (622 checks). Judged by "did the model change" plus a note when nothing in the export uses it.
- tests/states.py renders every site state (journal, library, about, post, about-from-post, back, post→library, a plain page) on desktop and phone from the current content; compare two runs pixel by pixel. Baseline = the live publish.
- audit.py / ui_test.py / tools_test.py / prev_test.py in the session notes cover block masters, tools and the preview.

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
