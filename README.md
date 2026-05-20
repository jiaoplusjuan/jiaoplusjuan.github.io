# Jiaqi Wu Academic Homepage

Static personal academic homepage for a `username.github.io` GitHub Pages repository.

## Files

- `index.html` - minimal page shell
- `GDMCPDE.html` - standalone project page for the Gradient Domain Reconstruction paper
- `styles.css` - responsive academic layout
- `data/site-data.js` - editable homepage content
- `scripts/render-site.js` - renders content data into the page
- `assets/profile.jpg` - optimized portrait
- `assets/sig2026teaser.pdf` - source teaser figure for the Gradient Domain Reconstruction project page
- `assets/sig2026teaser.jpg` - optimized web preview rendered from the teaser PDF
- `tests/validate-site.mjs` - content and privacy validation

## Edit Content

Most day-to-day edits should happen in `data/site-data.js`:

- change profile text in `profile`
- profile text supports Markdown-style links, for example `[Prof. Kun Xu](https://example.com)`
- edit the three homepage links, `Email`, `GitHub`, and `CV`, in `profile.links`
- add or edit papers in `publications`
- add an author link with `href`, for example `{ name: "Kun Xu", href: "https://cg.cs.tsinghua.edu.cn/people/~kun/" }`
- add a red bold honor after a paper venue with `venueNote`, for example `venueNote: "Honorable Mention"`
- replace a paper placeholder image by setting `image: "assets/your-image.jpg"`
- paper images share the same displayed width and keep their natural aspect ratio
- activate a paper button by setting `href`, for example `{ label: "PDF", href: "papers/example.pdf" }`
- leave `href: ""` when a paper link is not ready; the button stays visible and shows `Coming soon` when clicked
- omit the `{ label: "Code", ... }` entry when a paper should not show a Code button
- edit short experience entries in `experience.items`
- edit awards and dates in `awards.items`

## Validate

```bash
/Users/jiaqi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/validate-site.mjs
```

## Preview

You can open `index.html` directly in a browser for a quick local preview.

For a preview closer to GitHub Pages, run:

```bash
/Users/jiaqi/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/`.

## Private Repository Note

GitHub Pages availability for private repositories depends on the GitHub account plan. GitHub documents support for private repositories on Pro, Team, Enterprise Cloud, and Enterprise Server plans:
https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages
