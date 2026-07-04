document.querySelectorAll(".nav-toggle").forEach((button) => {
  const navId = button.getAttribute("aria-controls");
  const nav = navId ? document.getElementById(navId) : null;

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("is-open", !expanded);
  });
});

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const casesGrid = document.getElementById("casesGrid");
if (casesGrid && Array.isArray(window.chairmanCases)) {
  casesGrid.innerHTML = window.chairmanCases
    .map(
      (item) => `
        <article class="event-file">
          <div class="event-meta">
            <span class="tag">${escapeHtml(item.id)}</span>
            <span class="tag">${escapeHtml(item.level)}</span>
            <span class="chairman-stamp ${escapeHtml(item.stampClass)}">${escapeHtml(item.stamp)}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary)}</p>
          <details>
            <summary>展開完整稽核檔案</summary>
            <dl>
              <dt>董事長反應</dt>
              <dd>${escapeHtml(item.reaction)}</dd>
              <dt>官方判定</dt>
              <dd>${escapeHtml(item.verdict)}</dd>
              <dt>人類檢討</dt>
              <dd>${escapeHtml(item.humanReview)}</dd>
              <dt>改善方案</dt>
              <dd>${escapeHtml(item.improvement)}</dd>
            </dl>
          </details>
        </article>
      `,
    )
    .join("");
}

const galleryGrid = document.getElementById("galleryGrid");
if (galleryGrid && Array.isArray(window.galleryItems)) {
  galleryGrid.innerHTML = window.galleryItems
    .map(
      (item) => `
        <article class="gallery-card">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />
          <span class="tag">${escapeHtml(item.mode)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.caption)}</p>
        </article>
      `,
    )
    .join("");
}
