# Academic Personal Homepage Design

## Goal

Build a minimal GitHub Pages personal academic homepage for Jiaqi Wu in the `mypage` folder. The page should work as the root of a `username.github.io` repository and should be easy to deploy without a build step.

## Content Scope

The page includes five primary sections:

- About: a concise academic self-introduction based on the resume.
- Research: a very short paragraph summarizing research interests.
- Publications: papers and posters from the resume, each shown as an image placeholder plus title, authors, venue/status, and PDF/Code buttons.
- Research Experience: internship/project entries that are primarily experience, each condensed to one line.
- Awards & Recognition: scholarships, challenge results, funded programs, and paper/project recognitions. Repeated scholarships are merged into one item with multiple dates.

The page may use the resume portrait as a homepage avatar. The public page should not expose phone number or WeChat. The resume PDF is used as source material but is not highlighted as a public download in this version.

## Visual Direction

Use a classic academic single-page layout inspired by Kui Wu, Xueqi Ma, Rui Xu, Jon Barron-style homepages, and Academic Pages:

- restrained typography and generous white space;
- top profile block with portrait, followed by Research, Publications, Research Experience, and Awards;
- section headings sit in a narrow left column, with content in a wider right column on desktop;
- content-first sections with clear publication hierarchy;
- publication entries use a visual thumbnail area on the left and bibliographic information plus buttons on the right;
- neutral color palette with a small academic blue accent;
- no heavy animations, decorative gradients, or marketing-style hero area.

## Architecture

This is a static site with no framework and a small content/render split:

- `index.html` owns the GitHub Pages entrypoint and a single `site-root` mount point.
- `data/site-data.js` owns editable profile, research, publication, experience, and award content.
- `scripts/render-site.js` turns the data file into semantic homepage markup.
- `styles.css` owns responsive layout, typography, and print-friendly presentation.
- `assets/profile.jpg` stores the optimized avatar image.
- `tests/validate-site.mjs` checks that the expected content, data structure, asset references, and privacy constraints are present.

## Deployment Notes

The site is designed for the root of a `username.github.io` repository. GitHub Pages from a private repository may require GitHub Pro, Team, Enterprise Cloud, or Enterprise Server, depending on the account. If the account plan does not support Pages from private repositories, the repository can stay private and the site can be deployed through another static host, or the repository visibility can be changed when publishing is acceptable.

## Acceptance Criteria

- Opening `index.html` shows the profile, About, Research Experience, and Publications sections.
- The top-to-bottom order is About, Research, Publications, Research Experience, Awards & Recognition.
- The page includes Jiaqi Wu's Tsinghua affiliation and research interests in computer graphics, computer vision, and rendering.
- The page includes the four publication entries from the resume.
- Each publication has an image placeholder and PDF/Code button placeholders.
- The Research Experience section keeps Huawei/Tencent internship or project entries.
- The CGAI Challenge, Beijing Undergraduate Research Program, and Tencent Spark Program recognitions appear in Awards & Recognition, not Research Experience.
- National Scholarship and Tang Zhongying Moral Education Scholarship are each merged into a single item with multiple dates.
- The page references only local assets and has no build step.
- The page does not display phone number or WeChat.
- The validation script exits successfully after implementation.
