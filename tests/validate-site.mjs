import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const root = new URL("..", import.meta.url).pathname;
const indexPath = join(root, "index.html");
const sitemapPath = join(root, "sitemap.xml");
const robotsPath = join(root, "robots.txt");
const stylesPath = join(root, "styles.css");
const profilePath = join(root, "assets", "profile.jpg");
const gradientPaperHref = "paper/Gradient-Domain-Reconstruction-for-Monte-Carlo-PDE-Solvers.pdf";
const gradientPaperPath = join(root, gradientPaperHref);
const dataPath = join(root, "data", "site-data.js");
const renderPath = join(root, "scripts", "render-site.js");
const expectedPaperImages = [
  "assets/sig2026wu.jpg",
  "assets/sig2026an.png",
  "assets/sig2025.png",
];
const siteUrl = "https://jiaoplusjuan.github.io/jiaqiwu-tsinghua.github.io/";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(indexPath), "index.html should exist");
assert(existsSync(sitemapPath), "sitemap.xml should exist");
assert(existsSync(robotsPath), "robots.txt should exist");
assert(existsSync(stylesPath), "styles.css should exist");
assert(existsSync(profilePath), "assets/profile.jpg should exist");
assert(existsSync(gradientPaperPath), "Gradient paper PDF should exist for the Gradient paper PDF link");
for (const imagePath of expectedPaperImages) {
  assert(existsSync(join(root, imagePath)), `${imagePath} should exist`);
}
assert(existsSync(dataPath), "data/site-data.js should exist");
assert(existsSync(renderPath), "scripts/render-site.js should exist");

const html = readFileSync(indexPath, "utf8");
const sitemap = readFileSync(sitemapPath, "utf8");
const robots = readFileSync(robotsPath, "utf8");
const css = readFileSync(stylesPath, "utf8");
const dataSource = readFileSync(dataPath, "utf8");
const renderSource = readFileSync(renderPath, "utf8");
const dataContext = { window: {} };
vm.createContext(dataContext);
vm.runInContext(dataSource, dataContext, { filename: dataPath });
const siteData = dataContext.window.siteData;
assert(siteData, "data/site-data.js should expose window.siteData for non-module loading");

assert(sitemap.includes(`<loc>${siteUrl}</loc>`), "sitemap.xml should list the GitHub Pages homepage URL");
assert(sitemap.includes("<lastmod>2026-05-17</lastmod>"), "sitemap.xml should include a current lastmod date");
assert(robots.includes("User-agent: *"), "robots.txt should apply to all crawlers");
assert(robots.includes("Allow: /"), "robots.txt should allow crawling the site");
assert(robots.includes(`Sitemap: ${siteUrl}sitemap.xml`), "robots.txt should reference sitemap.xml");

for (const text of [
  "Jiaqi Wu",
  "Tsinghua University",
  "Computer Graphics",
  "Computer Vision",
  "Monte Carlo PDE solvers",
  "Research",
  "Research Experience",
  "Awards & Recognition",
  "Gradient Domain Reconstruction for Monte Carlo PDE Solvers",
  "Generalized Spherical Harmonics Products using Spherical Grids",
  "Adding Regional Control for Continuous Remeshing via Attention Flows",
  "National Scholarship",
  "Tang Zhongying Moral Education Scholarship",
  "Highest-level funding",
  "First Prize",
]) {
  assert(dataSource.includes(text), `data/site-data.js should include: ${text}`);
}
assert(dataSource.includes("Prof. Kun Xu"), "profile intro should mention Prof. Kun Xu");
assert(dataSource.includes("https://cg.cs.tsinghua.edu.cn/people/~kun/"), "profile intro should link to Prof. Kun Xu's page");
assert(dataSource.includes("Beijing Natural Science Foundation"), "award text should use the corrected Beijing Natural Science Foundation wording");
assert(!/[\u4e00-\u9fff]/.test(dataSource), "data/site-data.js should not contain Chinese annotation text");

assert(
  JSON.stringify(siteData.sectionOrder) === JSON.stringify(["about", "publications", "experience", "awards"]),
  "siteData.sectionOrder should exclude the removed standalone Research section",
);
assert(!("research" in siteData), "siteData should not keep the removed standalone Research section");

assert(html.includes('href="styles.css?v='), "index.html should load cache-busted styles.css");
assert(
  html.includes('<meta name="google-site-verification" content="8v93ilf4QYqnHOZviplRx_3jtbRqEADriWoNgA3eijM">'),
  "index.html should include Google Search Console verification meta",
);
assert(html.includes('id="site-root"'), "index.html should expose a site-root mount point");
assert(html.includes('src="data/site-data.js?v='), "index.html should load cache-busted site data before the renderer");
assert(html.includes('src="scripts/render-site.js?v='), "index.html should load a cache-busted renderer");
assert(!html.includes('type="module"'), "index.html should not require module scripts so direct file opening works");
assert(html.indexOf('src="data/site-data.js') < html.indexOf('src="scripts/render-site.js'), "index.html should load site data before the renderer");
assert(!html.includes("Gradient Domain Reconstruction for Monte Carlo PDE Solvers"), "index.html should not contain editable publication content");
assert(dataSource.includes("assets/profile.jpg"), "data/site-data.js should reference the local portrait");
assert(existsSync(join(root, "resume_engilish.pdf")), "CV PDF should exist at the linked path");
assert(!dataSource.includes("export const"), "data/site-data.js should be a classic script, not an ES module");
assert(renderSource.includes("paper-thumb-frame"), "renderer should wrap paper images in a fixed thumbnail frame");
assert(renderSource.includes("paper-thumb-image"), "renderer should render paper images inside the thumbnail frame");
assert(renderSource.includes("paper-card"), "renderer should create paper cards");
assert(renderSource.includes("venue-note"), "renderer should support highlighted venue notes");
assert(renderSource.includes("data-coming-soon"), "empty paper links should render as clickable coming-soon links");
assert(renderSource.includes("Coming soon"), "renderer should show a Coming soon message for empty paper links");
assert(!renderSource.includes("import("), "renderer should not dynamically import data, so direct file opening works");
assert(!renderSource.includes("export function"), "renderer should be a classic script, not an ES module");
const renderContext = {
  window: {
    siteData: {
      ...siteData,
      profile: {
        ...siteData.profile,
      },
    },
  },
  document: {
    getElementById(id) {
      assert(id === "site-root", "renderer should mount into site-root");
      renderContext.rootElement = {
        innerHTML: "",
      };
      return renderContext.rootElement;
    },
  },
  rootElement: null,
};
delete renderContext.window.siteData.profile.chineseName;
vm.createContext(renderContext);
vm.runInContext(renderSource, renderContext, { filename: renderPath });
assert(renderContext.rootElement.innerHTML.includes("Jiaqi Wu"), "renderer should still render the profile when chineseName is omitted");
for (const href of [
  "https://github.com/jiaoplusjuan",
  "https://cg.cs.tsinghua.edu.cn/people/~kun/",
  "https://shuangz.com",
  "https://sites.cs.ucsb.edu/~lingqi/",
]) {
  assert(renderContext.rootElement.innerHTML.includes(`href="${href}"`), `renderer should link author/profile URL: ${href}`);
}
assert(
  renderContext.rootElement.innerHTML.includes('<strong><a class="author-link" href="https://github.com/jiaoplusjuan">Jiaqi Wu</a></strong>'),
  "highlighted linked authors should remain bold",
);
assert(
  renderContext.rootElement.innerHTML.includes('href="https://cg.cs.tsinghua.edu.cn/people/~kun/"'),
  "renderer should turn the Kun Xu intro link into an anchor",
);
assert(renderContext.rootElement.innerHTML.includes("Publications"), "renderer should still render the Publications section");
assert(!renderContext.rootElement.innerHTML.includes('id="research"'), "renderer should not render the standalone Research section");
assert(!renderContext.rootElement.innerHTML.includes("undefined"), "renderer should not print undefined when optional profile fields are omitted");
const venueNoteRenderContext = {
  window: {
    siteData: {
      ...siteData,
      publications: [
        {
          ...siteData.publications[0],
          venueNote: "Best Paper Award",
        },
        ...siteData.publications.slice(1),
      ],
    },
  },
  document: {
    getElementById(id) {
      assert(id === "site-root", "renderer should mount into site-root for venue-note rendering");
      venueNoteRenderContext.rootElement = {
        innerHTML: "",
      };
      return venueNoteRenderContext.rootElement;
    },
  },
  rootElement: null,
};
vm.createContext(venueNoteRenderContext);
vm.runInContext(renderSource, venueNoteRenderContext, { filename: renderPath });
assert(venueNoteRenderContext.rootElement.innerHTML.includes("venue-note"), "renderer should render venue-note markup");
assert(venueNoteRenderContext.rootElement.innerHTML.includes("Best Paper Award"), "renderer should render the venue-note text");
assert(
  venueNoteRenderContext.rootElement.innerHTML.includes('<p class="venue-note">Best Paper Award</p>'),
  "venue-note should render on its own line",
);
assert(
  JSON.stringify(siteData.profile.links.map((link) => link.label)) === JSON.stringify(["Email", "GitHub", "CV"]),
  "homepage profile links should be exactly Email, GitHub, and CV",
);
assert(siteData.profile.links.some((link) => link.href === "resume_engilish.pdf"), "CV link should point to the local PDF");
assert(!siteData.profile.links.some((link) => link.href.startsWith("#")), "profile links should not jump to page sections");
assert(siteData.publications.length >= 3, "siteData should include at least three active publications");
assert(
  siteData.publications[0].links.some((link) => link.label === "PDF" && link.href === gradientPaperHref),
  "Gradient paper PDF button should point to the local Gradient paper PDF",
);
assert(siteData.publications[0].authors.find((author) => author.name === "Jiaqi Wu").href === "https://jiaoplusjuan.github.io", "Jiaqi Wu author should link to homepage");
assert(siteData.publications[0].authors.find((author) => author.name === "Kun Xu").href === "https://cg.cs.tsinghua.edu.cn/people/~kun/", "Kun Xu author should link to homepage");
assert(siteData.publications[0].authors.find((author) => author.name === "Shuang Zhao").href === "https://shuangz.com", "Shuang Zhao author should link to homepage");
assert(siteData.publications[1].authors.find((author) => author.name === "Lingqi Yan").href === "https://sites.cs.ucsb.edu/~lingqi/", "Lingqi Yan author should link to homepage");
for (const [index, paper] of siteData.publications.entries()) {
  assert(paper.links.some((link) => link.label === "PDF"), `${paper.title} should define a PDF button`);
  assert(paper.links.every((link) => "href" in link), `${paper.title} links should expose href fields, even when empty`);
  if (index < expectedPaperImages.length) {
    assert(paper.image === expectedPaperImages[index], `${paper.title} should use ${expectedPaperImages[index]}`);
  }
}
const posterPaper = siteData.publications.find((paper) => paper.title === "Adding Regional Control for Continuous Remeshing via Attention Flows");
assert(posterPaper && !posterPaper.links.some((link) => link.label === "Code"), "papers without a Code link should omit the Code key");
const posterStart = renderContext.rootElement.innerHTML.indexOf("Adding Regional Control for Continuous Remeshing via Attention Flows");
const posterEnd = renderContext.rootElement.innerHTML.indexOf("</article>", posterStart);
const posterHTML = renderContext.rootElement.innerHTML.slice(posterStart, posterEnd);
assert(!posterHTML.includes("[ Code ]"), "renderer should not show a Code button when the paper has no Code link");

const experience = siteData.experience.items.map((item) => `${item.date} ${item.text}`).join("\n");
const awards = siteData.awards.items.map((item) => `${item.date} ${item.text}`).join("\n");
for (const movedItem of ["The 5th Jittor AI Algorithm Challenge", "Beijing Natural Science Foundation"]) {
  assert(!experience.includes(movedItem), `${movedItem} should move out of Research Experience`);
  assert(awards.includes(movedItem), `${movedItem} should appear in Awards & Recognition`);
}

assert((awards.match(/National Scholarship/g) || []).length === 1, "National Scholarship dates should be merged into one award item");
assert((awards.match(/Tang Zhongying Moral Education Scholarship/g) || []).length === 1, "Tang Zhongying dates should be merged into one award item");
assert(awards.includes("Sep. 2024") && awards.includes("Sep. 2025"), "National Scholarship merged item should preserve both dates");
assert(awards.includes("Jun. 2023") && awards.includes("May 2024"), "Tang Zhongying merged item should preserve both dates");

assert(!/(?:\+?86\D*)?1\d{10}/.test(dataSource), "public page should not include phone number");
assert(!/WeChat/i.test(dataSource), "public page should not include WeChat");
assert(css.includes("@media"), "styles.css should include responsive rules");
assert(css.includes(".paper-card"), "styles.css should style paper cards");
assert(css.includes(".venue-note"), "styles.css should style paper venue notes");
assert(css.includes("#b91c1c"), "paper venue notes should use red text");
assert(css.includes(".venue-note {") && css.includes("margin: 0 0 5px"), "paper venue notes should be a standalone line");
assert(css.includes(".paper-thumb-frame"), "styles.css should style paper thumbnail wrappers");
assert(css.includes("height: auto"), "paper images should keep their natural aspect ratio after matching width");
assert(!css.includes("aspect-ratio: 16 / 9"), "paper images should not be forced into a fixed thumbnail ratio");
assert(!css.includes("border: 1px solid #d7dde5"), "paper image wrappers should not use the large thumbnail border");
assert(css.includes("top: 50%"), "Coming soon toast should appear near the middle of the page");
assert(css.includes("left: 50%"), "Coming soon toast should be horizontally centered");
assert(css.includes(".site-header"), "styles.css should include the refined header layout");
assert(css.includes(".award-list"), "styles.css should include the refined awards layout");
assert(css.includes("--bg: #ffffff"), "styles.css should use a Rui Xu-style white page background");
assert(css.includes("ui-sans-serif"), "styles.css should use a Rui Xu-style system sans font stack");
assert(css.includes("clamp(2rem, 4vw, 2.75rem)"), "homepage name should be visually smaller than the earlier hero scale");
assert(css.includes(".section-title {"), "styles.css should style section titles above content");
assert(!css.includes("grid-template-columns: 190px"), "section titles should not be locked into a side column");
