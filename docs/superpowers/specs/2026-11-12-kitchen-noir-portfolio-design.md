# Kitchen Noir Portfolio Redesign

## Goal
Transform the existing Flask portfolio into THE DEVELOPER'S KITCHEN, a polished Kitchen Noir identity that reads clearly as a software developer portfolio. Preserve the existing application, content, data, routes, and interactions.

## Current application
- Flask app in `app.py`; homepage `/`, CV `/cv`, PDF download `/cv-pdf`, and custom 404 handler.
- Homepage content is Jinja in `templates/index.html`; projects (11), skills (4 groups), experience (Firox), and profile narrative are currently embedded in templates/app.py.
- `static/css/style.css` and `static/js/main.js` implement the current visual system and interactions.
- Existing project preview assets are under `static/images/`; retain the current image/fallback behavior.
- Current interactions include responsive navigation, theme toggle, scroll progress, active section state, reveal effects, project filters, accessible lightbox, contact form to WhatsApp, CV download/online links, and back-to-top.

## Design direction
- Kitchen Noir: charcoal `#171717`, slate `#34312D`, cream `#D6C5A5`, terracotta `#A34F36`, olive `#899078`, warm white.
- Playfair Display for display headings, Inter for body text, IBM Plex Mono for labels and technical metadata.
- Editorial fine-dining visual language: dark professional kitchen photography, subtle menu-paper grain, fine rules, generous spacing, restrained borders, asymmetrical editorial composition, and strong serif/sans contrast.
- Keep readability and clear developer identity above restaurant mimicry. No recipe content, invented portfolio data, fictional links, decorative emoji, childish illustrations, neon, or gratuitous motion.

## Homepage structure and content
Retain the existing section IDs and destinations. Use culinary language as visual section titles/navigation labels while retaining all profile and programming content.

1. `#hero` / entry: brand title THE DEVELOPER'S KITCHEN, supplied tagline (“Transformo ideas en soluciones digitales. Cada proyecto tiene su receta, cada línea de código tiene su propósito.”), existing profile/role context, availability statement already supported by existing contact content, CTA to `#projects` (“Explorar la carta”), contact CTA to `#contact`, and existing CV link. Use a darkened, professionally styled kitchen image and accessible contrast.
2. `#about` / chef: preserve all existing profile paragraphs, stats, and learning timeline. Include the editorial title “BEHIND THE KITCHEN”; do not add credentials or work history.
3. `#skills` / pantry: preserve the existing skill categories and every item; style as organized ingredient labels/containers.
4. `#experience`: preserve Firox role, period, description, tags, and company URL; frame it consistently with the kitchen identity.
5. `#projects` / menu: preserve all 11 project records, ordering, descriptions, types, tags, GitHub/demo destinations, preview images/fallbacks, and filtering. Present as numbered editorial menu cards with clear actions and a subtle ingredient treatment for technologies. Do not invent development claims beyond supplied descriptions.
6. `#contact` / reservations: title “LET'S CREATE SOMETHING TOGETHER”; preserve email, GitHub, LinkedIn, CV links, form fields, and WhatsApp submission behavior. The form remains a developer contact form, not a restaurant reservation form.

## Compatibility and implementation constraints
- Keep Flask routes, current data structures, section IDs, form IDs/names, and JavaScript selectors needed by existing behaviors.
- Keep the CV's printable document semantics and output. Keep the custom 404 route useful and style it consistently if practical.
- Maintain mobile navigation and responsive layouts; preserve keyboard access, focus visibility, reduced-motion behavior, and image alt text.
- Avoid new dependencies. Any kitchen photograph must have a practical local/remote asset strategy and dark overlay; do not replace existing project screenshots with stock images.
- Update page metadata/theme branding and favicon/social preview only as needed to match the new identity without changing URLs.

## Acceptance criteria
- Existing routes and portfolio information remain intact.
- All original project filters, preview lightbox, theme toggle, mobile menu, contact form, and CV actions remain functional.
- The main page is visually coherent in Kitchen Noir at desktop and mobile sizes, with the requested fine-dining identity and readable contrast.
- No fictional projects, skills, experience, links, or contact methods are introduced.
