# Kitchen Noir Portfolio Redesign Implementation Plan

> **For agentic workers:** Follow this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing Flask portfolio into THE DEVELOPER'S KITCHEN while preserving its content, routes, project data, and interactions.

**Architecture:** Keep Flask/Jinja and the existing single-page section structure. Rework the current template and CSS in place, retain existing IDs and form selectors for JavaScript behavior, and update only the small visual brand assets and 404 presentation.

**Tech Stack:** Flask 3.1.1, Jinja, HTML, CSS, vanilla JavaScript, Google Fonts, locally served Unsplash hero photography.

**Spec:** `docs/superpowers/specs/2026-11-12-kitchen-noir-portfolio-design.md`

## Global Constraints

- Keep Flask routes, current data structures, section IDs, form IDs/names, and JavaScript selectors needed by existing behaviors.
- Keep the CV's printable document semantics and output.
- Maintain mobile navigation and responsive layouts; preserve keyboard access, focus visibility, reduced-motion behavior, and image alt text.
- Avoid new dependencies. Any kitchen photograph must have a practical local/remote asset strategy and dark overlay; do not replace existing project screenshots with stock images.
- No fictional projects, skills, experience, links, or contact methods.
- Kitchen Noir palette: `#171717`, `#34312D`, `#D6C5A5`, `#A34F36`, `#899078`, warm white.
- Use Playfair Display for headings, Inter for body, and IBM Plex Mono for labels and technical metadata.

---

### Task 1: Reframe the homepage content and navigation

**Files:**
- Modify: `templates/index.html`

**Interfaces:**
- Consumes: existing Flask template variables `projects`, `skills`, `experience`, `og_image`, `site_url`, `current_year`.
- Produces: same IDs, data attributes, form selectors, actions, and content in a new Kitchen Noir editorial hierarchy.

- [x] Add Playfair Display, Inter, and IBM Plex Mono font families to the existing Google Fonts include.
- [x] Update page title, theme metadata, and social text to the THE DEVELOPER'S KITCHEN identity without changing `og_image` or route URLs.
- [x] Replace the compact `T.` wordmark with a two-line THE DEVELOPER'S KITCHEN wordmark and add a small developer descriptor.
- [x] Rename nav labels visually to La entrada, El chef, La despensa, Trayectoria, La carta, and Reservaciones while retaining hrefs `#hero`, `#about`, `#skills`, `#experience`, `#projects`, and `#contact`.
- [x] Recompose `#hero` with the supplied Spanish tagline, existing role/profile context, an availability indicator supported by the current contact copy, “Explorar la carta” linking to `#projects`, contact CTA, and existing CV download.
- [x] Give the about section the heading “BEHIND THE KITCHEN” while retaining every existing paragraph, stat, and timeline item.
- [x] Rename visible section headings to the pantry/menu/reservations vocabulary while retaining all dynamic loops and all 11 projects.
- [x] Preserve project preview fallback attributes, project filters, action links, contact links, CV links, form labels/IDs, and WhatsApp submission selectors.
- [x] Add the Unsplash photo credit as a small linked attribution, pointing to the selected hero image's source page.

### Task 2: Build the Kitchen Noir design system and responsive editorial layouts

**Files:**
- Modify: `static/css/style.css`

**Interfaces:**
- Consumes: existing class structure from `templates/index.html` and interaction classes from `static/js/main.js`.
- Produces: desktop and mobile visual layouts for every existing homepage section, plus both states of the existing theme toggle.

- [x] Replace the current theme variables with Kitchen Noir dark tokens and a restrained light-theme variant; keep dark as the page's initial theme.
- [x] Set serif headings, sans-serif body copy, and mono labels with CSS variables and readable line lengths.
- [x] Style the fixed navigation as a quiet menu masthead, with fine rules, warm text, and a clear mobile drawer.
- [x] Serve the licensed Unsplash kitchen photo from `static/images/kitchen-hero.jpg`; style it as a full-height editorial cover with a charcoal overlay and responsive focal position.
- [x] Use restrained paper grain, section rules, generous vertical spacing, and terracotta/olive accents; avoid excessive gradients and decorative symbols.
- [x] Rebuild about/experience layouts with editorial columns, fine rules, warm text, and subdued date/metadata labels.
- [x] Rebuild skills as four labeled pantry panels using only existing categories/items.
- [x] Rebuild the project list as numbered menu cards with responsive image/text composition, discreet borders, ingredient-like technology tags, and clear demo/code actions.
- [x] Rebuild contact as an editorial reservation card; style the existing form as a developer message form.
- [x] Ensure visible focus states, keyboard-operable controls, touch-sized mobile targets, and reduced-motion overrides.
- [x] Verify breakpoints at narrow mobile, tablet, and wide desktop widths by inspecting the stylesheet and rendered page.

### Task 3: Align secondary identity assets and simplify motion

**Files:**
- Modify: `templates/404.html`
- Modify: `static/css/style.css`
- Modify: `static/js/main.js`
- Modify: `static/favicon.svg`
- Modify: `static/og-image.svg`
- Add: `static/images/kitchen-hero.jpg`

**Interfaces:**
- Consumes: current Flask 404 route and existing JS interaction hooks.
- Produces: visually consistent error/social assets and restrained interactions with the original functional behavior intact.

- [x] Restyle the custom 404 page with Kitchen Noir colors and serif heading while retaining its home link and noindex metadata.
- [x] Redraw the favicon as a simple cream/terracotta monogram or wordmark mark on charcoal; retain SVG format and path.
- [x] Recompose the SVG social preview with the new name, warm palette, and developer descriptor; retain its 1200×630 dimensions and current path.
- [x] Remove custom cursor, magnetic button, hero parallax, and project glow effects from the JS/CSS because they conflict with the requested restrained motion; retain scroll state, theme toggle, mobile menu, typing role, reveal, counters, filters, lightbox, contact submit, and back-to-top.
- [x] Ensure reveal transitions remain short and honor `prefers-reduced-motion`.
- [x] Keep `templates/cv.html` and CV download behavior unchanged so the printable CV remains intact.

### Task 4: Review preservation and responsive presentation

**Files:**
- Review: `app.py`, `templates/index.html`, `templates/cv.html`, `templates/404.html`, `static/css/style.css`, `static/js/main.js`, `static/favicon.svg`, `static/og-image.svg`

- [x] Compare `app.py` project, experience, and skill records against the final rendered template loops; confirm no data records or links changed.
- [x] Confirm all section IDs and original action destinations remain in the template.
- [x] Inspect the final template and JavaScript selectors together for the theme toggle, mobile menu, project filters, lightbox, WhatsApp form, and back-to-top behavior.
- [x] Review desktop, tablet, and mobile CSS for overflow, contrast, focus visibility, and reduced-motion handling.
- [x] Confirm `/`, `/cv`, `/cv-pdf`, and the 404 handler remain unchanged in `app.py`.
