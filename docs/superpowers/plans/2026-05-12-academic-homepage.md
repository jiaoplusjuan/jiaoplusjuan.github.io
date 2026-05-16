# Academic Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a static academic homepage for Jiaqi Wu that can be deployed as a `username.github.io` GitHub Pages site.

**Architecture:** The page is a no-build static site with content separated from markup. `index.html` contains only the page shell and `site-root`; `data/site-data.js` contains editable profile, paper, experience, and award data; `scripts/render-site.js` renders that data into the top profile section, Research section, paper-card Publications section, compact Research Experience list, and Awards & Recognition list. `styles.css` contains responsive two-column section layout and typography, `assets/profile.jpg` contains the optimized portrait, and `tests/validate-site.mjs` verifies required content, paper-card structure, section order, award consolidation, and private-data omissions.

**Tech Stack:** HTML5, CSS3, Node.js built-in modules for validation, local JPEG asset.

---

## File Structure

- Create: `tests/validate-site.mjs` - validates homepage files, content data, section order, publication titles, paper-card placeholders, PDF/Code buttons, moved award/recognition entries, merged scholarship dates, local asset references, and absence of phone/WeChat.
- Create: `index.html` - GitHub Pages entrypoint and render mount point.
- Create: `data/site-data.js` - editable homepage content.
- Create: `scripts/render-site.js` - semantic renderer for homepage content.
- Create: `styles.css` - responsive academic layout and visual polish.
- Create: `assets/profile.jpg` - optimized portrait generated from the resume image.
- Keep: `resume_engilish.pdf` - source reference only; not linked prominently on the public page.

### Task 1: Validation Script

**Files:**
- Create: `tests/validate-site.mjs`

- [ ] **Step 1: Write the failing validation script**

```js
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const indexPath = join(root, "index.html");
const stylesPath = join(root, "styles.css");
const profilePath = join(root, "assets", "profile.jpg");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(indexPath), "index.html should exist");
assert(existsSync(stylesPath), "styles.css should exist");
assert(existsSync(profilePath), "assets/profile.jpg should exist");

const html = readFileSync(indexPath, "utf8");
const css = readFileSync(stylesPath, "utf8");

for (const text of [
  "Jiaqi Wu",
  "Tsinghua University",
  "Computer Graphics",
  "Computer Vision",
  "Rendering Techniques",
  "Research Experience",
  "Publications",
  "Gradient Domain Reconstruction for Monte Carlo PDE Solvers",
  "Generalized Spherical Harmonics Products using Spherical Grids",
  "Adding Regional Control for Continuous Remeshing via Attention Flows",
  "SkinRig: Skinning-Prior-Guided Skeleton Binding for Human Meshes",
]) {
  assert(html.includes(text), `index.html should include: ${text}`);
}

assert(html.includes('href="styles.css"'), "index.html should load styles.css");
assert(html.includes('src="assets/profile.jpg"'), "index.html should load the local portrait");
assert(!/(?:\+?86\D*)?1\d{10}/.test(html), "public page should not include phone number");
assert(!/WeChat/i.test(html), "public page should not include WeChat");
assert(css.includes("@media"), "styles.css should include responsive rules");
```

- [ ] **Step 2: Run the validation script and confirm it fails before implementation**

Run: `/Users/jiaqi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/validate-site.mjs`

Expected: failure because `index.html`, `styles.css`, and `assets/profile.jpg` have not all been implemented yet.

### Task 2: Static Homepage

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `assets/profile.jpg`

- [ ] **Step 1: Generate the optimized portrait**

Use the extracted resume image to create `assets/profile.jpg`, cropped around the face and shoulders and resized for web use.

- [ ] **Step 2: Implement `index.html`**

Use semantic sections for About, Research, Publications, Research Experience, and Awards. Keep contact minimal and omit phone/WeChat.

- [ ] **Step 3: Implement `styles.css`**

Use a classic academic single-column layout with a top profile block, paper cards with image placeholders, mobile stacked layout, readable typography, and a restrained academic palette.

- [ ] **Step 4: Run validation and fix issues**

Run: `/Users/jiaqi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/validate-site.mjs`

Expected: exits with code 0 and no thrown errors.

### Task 3: Local Preview

**Files:**
- Read: `index.html`
- Read: `styles.css`

- [ ] **Step 1: Serve the folder locally**

Run: `/Users/jiaqi/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 8000`

Expected: local server starts from `mypage`.

- [ ] **Step 2: Open the page in the in-app browser**

Open: `http://127.0.0.1:8000/`

Expected: profile and all three content sections are visible, with no broken avatar image.

- [ ] **Step 3: Run a final validation command**

Run: `/Users/jiaqi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/validate-site.mjs`

Expected: exits with code 0.
