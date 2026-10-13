const StemCell = (() => {
  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const categoryName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || "";

  const formatPrice = (price) =>
    price == null ? "Ask for price" : `${SITE.currency}${Number(price).toLocaleString("en-NG")}`;

  const waLink = (message) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

  const orderMessage = (product, qty = 1, variant = "") => {
    const lines = [
      `Hello ${SITE.name}, I would like to order:`,
      `• ${product.name}${variant ? ` (${variant})` : ""}${product.size ? ` — ${product.size}` : ""}`,
      `• Quantity: ${qty}`,
    ];
    if (product.price == null) lines.push("Please tell me the price and delivery cost.");
    return lines.join("\n");
  };

  const leafIcon = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#1f5d2c"/><path d="M32 12c-9 7-13 15-13 22 0 8 6 14 13 16 7-2 13-8 13-16 0-7-4-15-13-22z" fill="#8bc34a"/><path d="M32 18v32" stroke="#1f5d2c" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="14" r="4" fill="#d4a62a"/></svg>`;

  const waIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.44-5.02c0-5.21 4.24-9.45 9.45-9.45a9.4 9.4 0 0 1 9.44 9.46c0 5.21-4.24 9.44-9.46 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.79.7.69 5.8.69 12.06c0 2 .52 3.96 1.52 5.68L.6 23.6l6-1.57a11.33 11.33 0 0 0 5.44 1.39h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.32-8.03z"/></svg>`;

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    el.innerHTML = `
      <header class="header">
        <div class="container header-inner">
          <a href="index.html" class="logo">${leafIcon}<span>${escapeHtml(SITE.name)}</span></a>
          <button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
          <nav class="nav">
            <a href="index.html">Home</a>
            <a href="index.html#shop">Shop</a>
            <a href="index.html#how">How to Order</a>
            <a href="index.html#about">About</a>
            <a href="#contact">Contact</a>
            <a href="${waLink(`Hello ${SITE.name}, I have a question.`)}" class="btn btn-wa btn-sm" target="_blank" rel="noopener">${waIcon} WhatsApp</a>
          </nav>
        </div>
      </header>`;
    const toggle = el.querySelector(".menu-toggle");
    const nav = el.querySelector(".nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) nav.classList.remove("open");
    });
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const year = new Date().getFullYear();
    el.innerHTML = `
      <footer class="footer" id="contact">
        <div class="container footer-grid">
          <div>
            <a href="index.html" class="logo logo-light">${leafIcon}<span>${escapeHtml(SITE.name)}</span></a>
            <p>${escapeHtml(SITE.tagline)}. Healthy & wealthy family.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>${CATEGORIES.map((c) => `<li><a href="index.html?category=${c.id}#shop">${escapeHtml(c.name)}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul>
              <li><a href="${waLink(`Hello ${SITE.name}, I have a question.`)}" target="_blank" rel="noopener">WhatsApp: ${escapeHtml(SITE.phone)}</a></li>
              <li><a href="tel:${SITE.phone.replace(/\s/g, "")}">Call: ${escapeHtml(SITE.phone)}</a></li>
              <li><a href="mailto:${SITE.email}">${escapeHtml(SITE.email)}</a></li>
              <li>${escapeHtml(SITE.address)}</li>
            </ul>
          </div>
        </div>
        <div class="container disclaimer">
          <p><strong>Disclaimer:</strong> These products are herbal dietary supplements and have not been evaluated as medicines. They are not intended to diagnose, treat, cure or prevent any disease. Results may vary. Always consult a qualified doctor before use, especially if you are pregnant, breastfeeding, on medication, or managing a serious medical condition.</p>
          <p class="copyright">© ${year} ${escapeHtml(SITE.name)}. All rights reserved.</p>
        </div>
      </footer>
      <a class="wa-float" href="${waLink(`Hello ${SITE.name}, I would like to make an order.`)}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${waIcon}</a>`;
  }

  function productCard(p) {
    return `
      <article class="card">
        <a href="product.html?id=${p.id}" class="card-image">
          <img src="${p.images[0]}" alt="${escapeHtml(p.name)}" loading="lazy" />
        </a>
        <div class="card-body">
          <span class="card-brand">${escapeHtml(p.brand)} · ${escapeHtml(categoryName(p.category))}</span>
          <h3><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a></h3>
          <p class="card-tagline">${escapeHtml(p.tagline)}</p>
          <p class="card-price">${formatPrice(p.price)}</p>
          <div class="card-actions">
            <a href="product.html?id=${p.id}" class="btn btn-outline btn-sm">Details</a>
            <a href="${waLink(orderMessage(p))}" class="btn btn-wa btn-sm" target="_blank" rel="noopener">${waIcon} Order</a>
          </div>
        </div>
      </article>`;
  }

  function initCommon() {
    renderHeader();
    renderFooter();
    document.querySelectorAll(".js-wa-general").forEach((a) => {
      a.href = waLink(`Hello ${SITE.name}, I would like to make an order.`);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  function initHome() {
    initCommon();

    document.getElementById("featured-grid").innerHTML = PRODUCTS.filter((p) => p.featured).map(productCard).join("");

    const params = new URLSearchParams(location.search);
    let activeCategory = params.get("category") || "all";
    const search = document.getElementById("search");
    const chips = document.getElementById("category-chips");
    const grid = document.getElementById("product-grid");
    const empty = document.getElementById("empty-state");

    chips.innerHTML = [{ id: "all", name: "All" }, ...CATEGORIES]
      .map((c) => `<button class="chip" data-category="${c.id}">${escapeHtml(c.name)}</button>`)
      .join("");

    const render = () => {
      const q = search.value.trim().toLowerCase();
      const list = PRODUCTS.filter((p) => {
        if (activeCategory !== "all" && p.category !== activeCategory) return false;
        if (!q) return true;
        const haystack = [p.name, p.brand, p.tagline, p.description, categoryName(p.category), ...p.benefits]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
      grid.innerHTML = list.map(productCard).join("");
      empty.hidden = list.length > 0;
      chips.querySelectorAll(".chip").forEach((b) => b.classList.toggle("active", b.dataset.category === activeCategory));
    };

    chips.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      activeCategory = btn.dataset.category;
      render();
    });
    search.addEventListener("input", render);
    render();
  }

  function initProduct() {
    initCommon();
    const id = new URLSearchParams(location.search).get("id");
    const p = PRODUCTS.find((x) => x.id === id);
    const root = document.getElementById("product-detail");

    if (!p) {
      root.innerHTML = `<div class="not-found"><h1>Product not found</h1><p>This product may have been removed.</p><a href="index.html#shop" class="btn btn-primary">Back to shop</a></div>`;
      return;
    }

    document.title = `${p.name} — ${SITE.name}`;
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = `${p.name}: ${p.tagline}. Order on WhatsApp.`;
    document.head.appendChild(meta);

    const thumbs =
      p.images.length > 1
        ? `<div class="thumbs">${p.images
            .map((src, i) => `<button class="thumb${i === 0 ? " active" : ""}" data-src="${src}"><img src="${src}" alt="" /></button>`)
            .join("")}</div>`
        : "";

    const variantSelect = p.variants
      ? `<label class="field"><span>Blend</span><select id="variant">${p.variants.map((v) => `<option>${escapeHtml(v)}</option>`).join("")}</select></label>`
      : "";

    const ingredients = p.ingredients
      ? `<div class="detail-block"><h3>Ingredients</h3><p>${p.ingredients.map(escapeHtml).join(", ")}</p></div>`
      : "";

    root.innerHTML = `
      <nav class="breadcrumb"><a href="index.html">Home</a> / <a href="index.html?category=${p.category}#shop">${escapeHtml(categoryName(p.category))}</a> / <span>${escapeHtml(p.name)}</span></nav>
      <div class="detail">
        <div class="gallery">
          <div class="gallery-main"><img id="main-image" src="${p.images[0]}" alt="${escapeHtml(p.name)}" /></div>
          ${thumbs}
        </div>
        <div class="detail-info">
          <span class="card-brand">${escapeHtml(p.brand)}</span>
          <h1>${escapeHtml(p.name)}</h1>
          <p class="detail-tagline">${escapeHtml(p.tagline)}</p>
          ${p.size ? `<p class="detail-size">Size: <strong>${escapeHtml(p.size)}</strong></p>` : ""}
          <p class="detail-price">${formatPrice(p.price)}</p>
          <p>${escapeHtml(p.description)}</p>
          <div class="order-box">
            ${variantSelect}
            <label class="field"><span>Quantity</span>
              <div class="qty"><button type="button" data-step="-1" aria-label="Decrease">−</button><input id="qty" type="number" min="1" value="1" /><button type="button" data-step="1" aria-label="Increase">+</button></div>
            </label>
            <a id="order-btn" class="btn btn-wa btn-block" target="_blank" rel="noopener">${waIcon} Order on WhatsApp</a>
          </div>
          ${ingredients}
          <div class="detail-block">
            <h3>Benefits</h3>
            <ul class="benefits">${p.benefits.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
          </div>
        </div>
      </div>`;

    const qty = document.getElementById("qty");
    const variant = document.getElementById("variant");
    const orderBtn = document.getElementById("order-btn");
    const updateOrder = () => {
      const n = Math.max(1, parseInt(qty.value, 10) || 1);
      orderBtn.href = waLink(orderMessage(p, n, variant ? variant.value : ""));
    };
    root.querySelectorAll(".qty button").forEach((b) =>
      b.addEventListener("click", () => {
        qty.value = Math.max(1, (parseInt(qty.value, 10) || 1) + Number(b.dataset.step));
        updateOrder();
      })
    );
    qty.addEventListener("input", updateOrder);
    if (variant) variant.addEventListener("change", updateOrder);
    updateOrder();

    root.querySelectorAll(".thumb").forEach((t) =>
      t.addEventListener("click", () => {
        document.getElementById("main-image").src = t.dataset.src;
        root.querySelectorAll(".thumb").forEach((x) => x.classList.toggle("active", x === t));
      })
    );

    const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id);
    const fill = PRODUCTS.filter((x) => x.featured && x.id !== p.id && !related.includes(x));
    const picks = [...related, ...fill].slice(0, 4);
    if (picks.length) {
      document.getElementById("related-grid").innerHTML = picks.map(productCard).join("");
      document.getElementById("related-wrap").hidden = false;
    }
  }

  return { initHome, initProduct };
})();
