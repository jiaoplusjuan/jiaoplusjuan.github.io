function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderOptionalText(className, value) {
  if (!value) {
    return "";
  }

  return `<p class="${className}">${escapeHTML(value)}</p>`;
}

function renderInlineLinks(value) {
  const text = String(value);
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let output = "";
  let lastIndex = 0;

  for (const match of text.matchAll(linkPattern)) {
    output += escapeHTML(text.slice(lastIndex, match.index));
    output += `<a href="${escapeHTML(match[2])}">${escapeHTML(match[1])}</a>`;
    lastIndex = match.index + match[0].length;
  }

  return output + escapeHTML(text.slice(lastIndex));
}

function renderProfile(profile) {
  const links = (profile.links || [])
    .map((link) => `<a href="${escapeHTML(link.href)}">${escapeHTML(link.label)}</a>`)
    .join("");
  const name = profile.name || "";
  const portrait = profile.portrait
    ? `<img class="portrait" src="${escapeHTML(profile.portrait)}" alt="Portrait of ${escapeHTML(name)}">`
    : "";

  return `
    <section class="intro site-header" id="about" aria-label="Personal profile">
      <div class="intro-text">
        ${renderOptionalText("kicker", profile.kicker)}
        <h1>${escapeHTML(name)}</h1>
        ${renderOptionalText("name-cn", profile.chineseName)}
        ${renderOptionalText("role", profile.title)}
        ${profile.intro ? `<p>${renderInlineLinks(profile.intro)}</p>` : ""}
        <nav class="profile-links" aria-label="Profile links">${links}</nav>
      </div>
      ${portrait}
    </section>
  `;
}

function renderAuthors(authors) {
  return authors
    .map((author) => {
      const name = `${author.name}${author.note || ""}`;
      const html = author.href
        ? `<a class="author-link" href="${escapeHTML(author.href)}">${escapeHTML(name)}</a>`
        : escapeHTML(name);
      return author.highlight ? `<strong>${html}</strong>` : html;
    })
    .join(", ");
}

function renderPaperLinks(links) {
  return links
    .map((link) => {
      const label = `[ ${escapeHTML(link.label)} ]`;
      if (link.href) {
        return `<a class="paper-link" href="${escapeHTML(link.href)}">${label}</a>`;
      }

      return `<a class="paper-link is-disabled" href="#" data-coming-soon="true" aria-label="${escapeHTML(link.label)} coming soon">${label}</a>`;
    })
    .join("");
}

function renderVenueNote(note) {
  if (!note) {
    return "";
  }

  return `<p class="venue-note">${escapeHTML(note)}</p>`;
}

function renderPaperThumb(paper) {
  if (!paper.image) {
    return `
      <figure class="paper-thumb-frame" aria-label="Paper image placeholder">
        <div class="paper-thumb-placeholder"></div>
      </figure>
    `;
  }

  return `
    <figure class="paper-thumb-frame">
      <img
        class="paper-thumb-image"
        src="${escapeHTML(paper.image)}"
        alt="${escapeHTML(paper.title)} preview"
        loading="lazy"
        decoding="async"
      >
    </figure>
  `;
}

function renderPublications(publications) {
  const papers = publications
    .map(
      (paper) => `
        <article class="paper-card">
          ${renderPaperThumb(paper)}
          <div class="paper-body">
            <h3>${escapeHTML(paper.title)}</h3>
            <p class="authors">${renderAuthors(paper.authors)}</p>
            <p class="venue">${escapeHTML(paper.venue)}</p>
            ${renderVenueNote(paper.venueNote)}
            <div class="paper-actions" aria-label="Paper links">${renderPaperLinks(paper.links)}</div>
          </div>
        </article>
      `,
    )
    .join("");

  return `
    <section class="section" id="publications">
      <div class="section-title">
        <h2>Selected Publications</h2>
        <p class="note">* indicates equal contribution.</p>
      </div>
      <div class="section-content paper-list">${papers}</div>
    </section>
  `;
}

function renderTimelineList(items) {
  return items
    .map(
      (item) => `
        <li>
          <span>${escapeHTML(item.date)}</span>
          <p>${escapeHTML(item.text)}</p>
        </li>
      `,
    )
    .join("");
}

function renderExperience(experience) {
  return `
    <section class="section compact" id="experience">
      <div class="section-title">
        <h2>${escapeHTML(experience.title)}</h2>
      </div>
      <div class="section-content">
        <ul class="timeline">${renderTimelineList(experience.items)}</ul>
      </div>
    </section>
  `;
}

function renderAwards(awards) {
  return `
    <section class="section compact" id="awards">
      <div class="section-title">
        <h2>${escapeHTML(awards.title)}</h2>
      </div>
      <div class="section-content">
        <ul class="award-list">${renderTimelineList(awards.items)}</ul>
      </div>
    </section>
  `;
}

function renderPage(data) {
  return [
    renderProfile(data.profile),
    renderPublications(data.publications),
    renderExperience(data.experience),
    renderAwards(data.awards),
    '<div class="coming-soon-toast" role="status" aria-live="polite">Coming soon</div>',
  ].join("");
}

function showComingSoon(root) {
  const toast = root.querySelector(".coming-soon-toast");
  if (!toast) {
    return;
  }

  toast.classList.add("is-visible");
  window.clearTimeout(showComingSoon.timeout);
  showComingSoon.timeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1400);
}

function mountPage() {
  const root = document.getElementById("site-root");
  if (!root) {
    return;
  }

  root.innerHTML = renderPage(window.siteData);
  if (typeof root.addEventListener === "function") {
    root.addEventListener("click", (event) => {
      const target =
        event.target && typeof event.target.closest === "function"
          ? event.target.closest("[data-coming-soon]")
          : null;
      if (!target) {
        return;
      }

      event.preventDefault();
      showComingSoon(root);
    });
  }
}

if (typeof document !== "undefined") {
  mountPage();
}
