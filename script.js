/* ==========================================================================
   Green Para Bay — script.js
   --------------------------------------------------------------------------
   Everything that is not cart logic lives here:

     1. Icon library + <span data-icon="name"> hydration
     2. Toast notifications
     3. Mobile menu
     4. Scroll reveal (IntersectionObserver)
     5. Animated counters
     6. Animated star ratings
     7. Navbar scroll state + active link
     8. Smooth anchor scrolling
     9. Lazy image fading (data-src -> <img class="loaded">)
     10. Product card template + add-to-cart delegation
     11. Section renderers, all driven by data.js
     12. Shop filters, search and empty state
     13. FAQ accordion
     14. Contact form -> WhatsApp
     15. Sticky mobile action bar
   ========================================================================== */

(function () {
  "use strict";

  /* ======================================================================
     1. ICON LIBRARY
     24x24 stroke icons, currentColor. Keep new icons in the same style:
     round caps, round joins, 1.8-2 stroke weight.
     ====================================================================== */

  var ICONS = {
    /* brand + UI */
    leaf: '<path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66c.83-2.37 2.2-4.31 3.74-5.66C7.83 17 7 14.43 7 12c0-4.5 3.5-8 8-8 1.7 0 3.27.56 4.55 1.5-1.74.17-3.34.92-4.55 1.95 2.5.18 4.5 2.25 4.5 4.8 0 1.31-.4 2.52-1.08 3.52 1.58-.57 2.83-1.64 3.58-3.02C20.84 11.82 19.1 9.5 17 8Z"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
    cart: '<circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h2.2l2.6 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H5.4"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrowRight: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    heart: '<path d="M12 20.5S3.8 15.3 3.8 9.9A4.9 4.9 0 0 1 12 6.6a4.9 4.9 0 0 1 8.2 3.3c0 5.4-8.2 10.6-8.2 10.6Z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
    sparkle: '<path d="M12 2.5 13.8 8l5.5 1.8L13.8 11.6 12 17l-1.8-5.4L4.7 9.8 10.2 8 12 2.5Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',

    /* contact */
    phone: '<path d="M6.6 3h3l1.5 4-2 1.4a12.4 12.4 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z"/>',
    pin: '<path d="M12 2.5a7 7 0 0 1 7 7c0 5.1-7 12-7 12s-7-6.9-7-12a7 7 0 0 1 7-7Z"/><circle cx="12" cy="9.5" r="2.6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/>',
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="m3.5 7 8.5 6 8.5-6"/>',

    /* social */
    whatsapp:
      '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21.5l5-1.3A9 9 0 1 0 12 3Z"/><path d="M9.2 8.4c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.3 0 .5-.1.7l-.4.5c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.3.1.5.1.7-.1l.5-.4c.2-.2.4-.2.7-.1l1.6.8c.4.2.5.4.5.6 0 .2 0 .5-.1.7-.2.5-.7.9-1.2 1-.5.1-1.3.1-3.1-.8a11 11 0 0 1-4.3-3.9c-.9-1.5-1-2.9-.9-3.4 0-.5.3-1 .5-1.2Z"/>',
    instagram:
      '<rect x="3" y="3" width="18" height="18" rx="5.4"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>',
    facebook:
      '<path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V2.6h-2.6C11.5 2.6 10.4 4.2 10.4 6.7v1.8H8V12h2.4v9.4H14V12h2.5l.5-3.5H14Z"/>',
    tiktok:
      '<path d="M15 3v10.5a3.5 3.5 0 1 1-3-3.46"/><path d="M15 3.5c.6 2.4 2.3 3.9 4.8 4.2"/>',

    /* categories */
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/>',
    droplet: '<path d="M12 2.7S5.6 10 5.6 14.3a6.4 6.4 0 1 0 12.8 0C18.4 10 12 2.7 12 2.7Z"/>',
    shower: '<path d="M4 20h16"/><path d="M6.5 20v-3h3v3M14.5 20v-3h3v3"/><path d="M9 15a5 5 0 0 1 6 0"/><path d="M12 15V4.5"/><path d="M9.5 6.5 12 4.5l2.5 2"/>',
    baby: '<circle cx="12" cy="6" r="3.2"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    spa: '<path d="M12 21c0-5 3-9 8-9.5C19.5 16 16 20 12 21Z"/><path d="M12 21c0-4-2.4-7.2-6.5-7.6C5 17.4 8 20.4 12 21Z"/><path d="M12 21v-4"/>',

    /* reasons */
    shield: '<path d="M12 2.6 4.5 5.3v6.4c0 4.7 3.1 8.6 7.5 9.7 4.4-1.1 7.5-5 7.5-9.7V5.3L12 2.6Z"/><path d="m8.8 12 2.2 2.2 4.2-4.2"/>',
    chat: '<path d="M12 3.4c5 0 9 3.5 9 7.9s-4 7.9-9 7.9a10.4 10.4 0 0 1-2.7-.3L4 20.6l1.4-3.8A7.5 7.5 0 0 1 3 11.3C3 6.9 7 3.4 12 3.4Z"/><path d="M8.6 11.4h6.8M8.6 14.2h4.2"/>',
    truck: '<path d="M2.8 6.5h11.4v9.8H2.8z"/><path d="M14.2 9.8h3.4l3 3.2v3.3h-6.4z"/><circle cx="7" cy="18.4" r="1.9"/><circle cx="17" cy="18.4" r="1.9"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20.5a7.4 7.4 0 0 1 14.4 0"/>',
    capsule: '<path d="M8.5 3.5a4 4 0 0 1 5.7 0l5.3 5.3a4 4 0 0 1 0 5.7l-3.6 3.6a4 4 0 0 1-5.7 0l-5.3-5.3a4 4 0 0 1 0-5.7Z"/><path d="m6.5 10.5 7-7"/>',

    /* misc */
    quote: '<path d="M9.5 5.5C6.5 7 5 9.5 5 13h3.5v6H3.8v-5.4c0-4.4 2-7.3 5.7-8.1ZM20.5 5.5C17.5 7 16 9.5 16 13h3.5v6h-4.7v-5.4c0-4.4 2-7.3 5.7-8.1Z"/>',
    lock: '<rect x="4.5" y="10" width="15" height="11" rx="3"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/>',
    home: '<path d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20Z"/><path d="M9.5 21.5V15h5v6.5"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M3.5 10h17M8.5 3v4M15.5 3v4"/>',
    gift: '<rect x="3" y="8.5" width="18" height="12.5" rx="2.5"/><path d="M3 13.5h18M12 8.5V21"/><path d="M12 8.5S11 3 8.2 3a2.2 2.2 0 0 0 0 4.4h3.8Zm0 0s1-5.5 3.8-5.5a2.2 2.2 0 0 1 0 4.4H12Z"/>',
    camera: '<path d="M3 8.5h3.5L8 6h8l1.5 2.5H21v11H3Z"/><circle cx="12" cy="13.5" r="3.4"/>',
    filter: '<path d="M3 5.5h18l-7 8v6l-4 2v-8Z"/>',
    box: '<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5Z"/><path d="M3 7.5 12 12m0 0 9-4.5M12 12v9"/>'
  };

  /**
   * Return an <svg> string for the given icon name.
   * @param {string} name  key in ICONS
   * @param {number} size  px, default 24
   * @param {number} sw    stroke width, default 2
   */
  function svg(name, size, sw) {
    var body = ICONS[name] || ICONS.leaf;
    return (
      '<svg viewBox="0 0 24 24" width="' + (size || 24) + '" height="' + (size || 24) + '" fill="none" ' +
      'stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false">' + body + "</svg>"
    );
  }

  /** Replace every <span data-icon="name"> with the matching inline SVG. */
  function hydrateIcons(scope) {
    (scope || document).querySelectorAll("[data-icon]").forEach(function (host) {
      if (host.dataset.iconDone) return;
      host.innerHTML = svg(host.getAttribute("data-icon"), host.hasAttribute("data-icon-size") ? +host.getAttribute("data-icon-size") : undefined, host.hasAttribute("data-icon-sw") ? +host.getAttribute("data-icon-sw") : undefined);
      host.dataset.iconDone = "1";
    });
  }

  /* ======================================================================
     2. TOAST
     ====================================================================== */

  var toastEl = null;
  var toastTimer = null;
  var toastAction = null;

  /**
   * Show a toast.
   * @param {string} message
   * @param {string} [type]  "success" (default), "wa", "warn"
   * @param {object} [opts]  { actionLabel, onAction } — renders a small
   *                         button inside the toast, e.g. "Voir le panier"
   */
  function showToast(message, type, opts) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }

    toastEl.innerHTML =
      svg(type === "wa" ? "whatsapp" : "check", 19, 2.2) +
      '<span class="toast__msg"></span>' +
      (opts && opts.actionLabel ? '<button class="toast__action" type="button"></button>' : "");

    toastEl.querySelector(".toast__msg").textContent = message;

    var actionBtn = toastEl.querySelector(".toast__action");
    if (actionBtn) {
      toastAction = opts.onAction;
      actionBtn.textContent = opts.actionLabel;
      actionBtn.addEventListener("click", function () {
        if (typeof toastAction === "function") toastAction();
        hideToast();
      });
    } else {
      toastAction = null;
    }

    toastEl.className = "toast show" + (type ? " toast--" + type : "");

    clearTimeout(toastTimer);
    // a toast with an action stays up longer so it can be tapped
    toastTimer = setTimeout(hideToast, opts && opts.actionLabel ? 4200 : 2600);
  }

  function hideToast() {
    if (toastEl) toastEl.classList.remove("show");
  }

  /* ======================================================================
     3. MOBILE MENU
     ====================================================================== */

  function initMobileMenu() {
    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("active", open);
      document.body.classList.toggle("no-scroll", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("active"));
    });

    // click on the dimmed backdrop closes
    menu.addEventListener("click", function (event) {
      if (event.target === menu) setOpen(false);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("active")) setOpen(false);
    });
  }

  /* ======================================================================
     4. SCROLL REVEAL
     Elements fade and rise once. data-delay staggers siblings.
     ====================================================================== */

  var revealObserver = null;

  function initReveal() {
    var items = document.querySelectorAll(".reveal:not(.active)");
    if (!items.length) return;

    // No IntersectionObserver (very old browser): show everything
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("active");
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
            // setTimeout keeps the stagger when several items land together
            setTimeout(function () {
              el.classList.add("active");
            }, delay);
            revealObserver.unobserve(el);
          });
        },
        // threshold stays low and the bottom margin is generous: tall cards
        // (product grids, timelines) must start revealing as soon as any
        // meaningful part of them appears, not once 12% of the whole block
        // has entered the viewport
        { threshold: 0, rootMargin: "0px 0px -8% 0px" }
      );
    }

    items.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ======================================================================
     5. ANIMATED COUNTERS
     ====================================================================== */

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1700;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      // easeOutExpo: fast start, gentle landing
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(target * eased).toLocaleString("fr-FR") + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ======================================================================
     6. ANIMATED STAR RATINGS
     ====================================================================== */

  function fillStars(block) {
    var value = parseInt(block.getAttribute("data-stars") || "0", 10);
    block.querySelectorAll(".star").forEach(function (star, index) {
      if (index < value) {
        setTimeout(function () {
          star.classList.add("filled");
        }, index * 110);
      }
    });
  }

  function initStars() {
    var blocks = document.querySelectorAll("[data-stars]");
    if (!blocks.length) return;

    if (!("IntersectionObserver" in window)) {
      blocks.forEach(fillStars);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          fillStars(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    blocks.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ======================================================================
     7. NAVBAR — shadow on scroll, active link
     ====================================================================== */

  function initNavbar() {
    var nav = document.querySelector(".navbar");
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Which file are we on?
    var file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (file === "" || file === "/") file = "index.html";

    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === file) link.classList.add("active");
    });
  }

  /* ======================================================================
     8. SMOOTH ANCHORS (the CSS already handles it, this fixes the offset)
     ====================================================================== */

  function initSmoothScroll() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: top, behavior: "smooth" });
      // keep the URL tidy without a jump
      history.replaceState(null, "", id);
    });
  }

  /* ======================================================================
     9. LAZY IMAGES
     <div class="..." data-img="url"> becomes <img class="loaded"> when ready.
     The .loaded class triggers the CSS opacity fade.
     ====================================================================== */

  function loadImage(slot) {
    var url = slot.getAttribute("data-img");
    if (!url) return;

    var img = document.createElement("img");
    img.alt = slot.getAttribute("data-alt") || "";
    img.loading = "lazy";
    img.decoding = "async";

    img.addEventListener("load", function () {
      img.classList.add("loaded");
      slot.appendChild(img);
    });

    img.addEventListener("error", function () {
      // Image unavailable: keep the on-brand gradient, no broken icon
      slot.classList.add("is-fallback");
    });

    img.src = url;
  }

  function initImages(scope) {
    (scope || document).querySelectorAll("[data-img]").forEach(function (slot) {
      if (slot.dataset.imgDone) return;
      slot.dataset.imgDone = "1";
      loadImage(slot);
    });
  }

  /* ======================================================================
     10. PRODUCT CARD TEMPLATE
     One builder used by the homepage, the promo band and the shop grid.
     ====================================================================== */

  function starsMarkup(rating) {
    var out = "";
    for (var i = 0; i < 5; i++) {
      out += '<span class="star' + (i < rating ? " filled" : "") + '">★</span>';
    }
    return out;
  }

  function discountPercent(p) {
    if (!p.oldPrice || p.oldPrice <= p.price) return 0;
    return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  }

  function productCard(p, options) {
    options = options || {};
    var off = discountPercent(p);

    var badge = p.promo
      ? '<span class="product-card__badge">Promo −' + off + "%</span>"
      : "";

    var priceRow =
      p.oldPrice && off > 0
        ? '<div class="product-card__price"><span class="price-now">' +
          formatPrice(p.price) +
          '</span><span class="price-was">' +
          formatPrice(p.oldPrice) +
          "</span></div>"
        : '<div class="product-card__price"><span class="price-now">' + formatPrice(p.price) + "</span></div>";

    return (
      '<article class="product-card tap-scale reveal" data-category="' + p.category + '"' +
      (options.delay ? ' data-delay="' + options.delay + '"' : "") +
      ">" +
      '<div class="product-card__media">' +
      badge +
      '<button class="product-card__fav" type="button" aria-label="Ajouter aux favoris">' + svg("heart", 17, 2.2) + "</button>" +
      '<div data-img="' + p.img + '" data-alt="' + p.shortName + '" style="position:absolute;inset:0"></div>' +
      "</div>" +
      '<div class="product-card__body">' +
      '<span class="product-card__brand">' + p.brand + "</span>" +
      '<h3 class="product-card__name">' + p.shortName + "</h3>" +
      '<div class="product-card__stars" aria-hidden="true">' + starsMarkup(p.rating || 5) + "</div>" +
      (options.showDesc === false ? "" : '<p class="product-card__desc">' + p.desc + "</p>") +
      priceRow +
      '<div class="product-card__actions">' +
      '<button class="btn btn--primary btn-add" type="button" data-add="' + p.id + '">' +
      svg("bag", 18, 2.1) + "<span>Ajouter au panier</span></button>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  /* ======================================================================
     11. SECTION RENDERERS
     All copy and data come from data.js so the pages stay light.
     ====================================================================== */

  var $ = function (id) {
    return document.getElementById(id);
  };

  /** Nos Univers — the five category cards on the homepage */
  function renderUnivers() {
    var host = $("universGrid");
    if (!host) return;

    host.innerHTML = CATEGORIES.map(function (c, i) {
      return (
        '<a class="univers-card tap-scale reveal" href="shop.html?cat=' + c.id + '" data-delay="' + i * 90 + '">' +
        '<span class="univers-card__icon">' + svg(c.icon, 27, 1.9) + "</span>" +
        '<h3 class="univers-card__title">' + c.name + "</h3>" +
        '<p class="univers-card__desc">' + c.desc + "</p>" +
        '<span class="univers-card__meta">' + c.brands + "</span>" +
        '<span class="univers-card__link">Voir les produits ' + svg("arrowRight", 16, 2.4) + "</span>" +
        "</a>"
      );
    }).join("");

    hydrateIcons(host);
  }

  /** Nos Marques — the brand marquee, duplicated for a seamless loop */
  function renderBrands() {
    var track = $("brandsTrack");
    if (!track) return;

    var one = BRANDS_LIST.map(function (b) {
      return (
        '<div class="brand-badge tap-scale">' +
        '<span class="brand-badge__mark">' + b.logo + "</span>" +
        '<span><span class="brand-badge__name">' + b.name + "</span>" +
        '<span class="brand-badge__note">' + b.note + "</span></span>" +
        "</div>"
      );
    }).join("");

    track.innerHTML = one + one;
  }

  /** Featured products — six hand-picked ids from PRODUCTS */
  function renderFeatured() {
    var host = $("featuredGrid");
    if (!host) return;

    var ids = ["p1", "p4", "p2", "p9", "p13", "p5"];
    var picked = ids.map(getProductById).filter(Boolean);

    host.innerHTML = picked
      .map(function (p, i) {
        return productCard(p, { delay: i * 80 });
      })
      .join("");

    initImages(host);
  }

  /** Promo band — the three biggest discounts, on a deep green background */
  function renderPromo() {
    var host = $("promoGrid");
    if (!host) return;

    var promos = PRODUCTS.filter(function (p) {
      return p.promo && p.oldPrice;
    })
      .sort(function (a, b) {
        return discountPercent(b) - discountPercent(a);
      })
      .slice(0, 3);

    host.innerHTML = promos
      .map(function (p, i) {
        var off = discountPercent(p);
        return (
          '<article class="promo-card tap-scale reveal" data-delay="' + i * 100 + '">' +
          '<div class="promo-card__media">' +
          '<span class="promo-card__discount">−' + off + "%<small>PROMO</small></span>" +
          '<div data-img="' + p.img + '" data-alt="' + p.shortName + '" style="position:absolute;inset:0"></div>' +
          "</div>" +
          '<div class="promo-card__body">' +
          '<span class="promo-card__brand">' + p.brand + "</span>" +
          '<h3 class="promo-card__name">' + p.shortName + "</h3>" +
          '<p class="promo-card__note">' + p.desc + "</p>" +
          '<div class="promo-card__price"><span class="price-now">' + formatPrice(p.price) +
          '</span><span class="price-was">' + formatPrice(p.oldPrice) + "</span></div>" +
          '<button class="btn btn--primary btn-add" type="button" data-add="' + p.id + '">' +
          svg("bag", 18, 2.1) + "<span>Ajouter au panier</span></button>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    initImages(host);
  }

  /** Stats — animated counters */
  function renderStats() {
    var host = $("statsGrid");
    if (!host) return;

    host.innerHTML = STATS.map(function (s, i) {
      return (
        '<div class="stat reveal" data-delay="' + i * 90 + '">' +
        '<span class="stat__icon">' + svg(s.icon, 21, 2) + "</span>" +
        '<span class="stat__number" data-count="' + s.value + '" data-suffix="' + s.suffix + '">0</span>' +
        '<span class="stat__label">' + s.label + "</span>" +
        "</div>"
      );
    }).join("");
  }

  /** Pourquoi Green Para Bay — the four reasons */
  function renderWhy() {
    var host = $("whyGrid");
    if (!host) return;

    var reasons = [
      {
        icon: "shield",
        title: "Une pharmacienne experte",
        text:
          "Chaque recommandation vient d'Imane, pharmacienne diplômée. Pas de vendeur, une vraie professionnelle de santé qui connaît son métier."
      },
      {
        icon: "chat",
        title: "Commander en 1 clic via WhatsApp",
        text:
          "Pas de compte à créer, pas de carte bancaire. Votre panier part directement sur WhatsApp, en un message clair que vous pouvez relire."
      },
      {
        icon: "truck",
        title: "Livraison à M'diq & alentours",
        text:
          "Livraison en main propre dans M'diq, Oued Laou, Larache et les communes voisines. Le créneau est toujours confirmé avec vous avant le passage."
      },
      {
        icon: "instagram",
        title: "Une communauté de +2,7K abonnés",
        text:
          "Conseils, nouveautés et promotions partagés chaque semaine. Suivez le compte, posez vos questions en story, on vous répond."
      }
    ];

    host.innerHTML = reasons
      .map(function (r, i) {
        return (
          '<div class="why-card tap-scale reveal" data-delay="' + i * 90 + '">' +
          '<span class="why-card__icon">' + svg(r.icon, 25, 2) + "</span>" +
          "<h3>" + r.title + "</h3>" +
          "<p>" + r.text + "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  /** Testimonials — stars animate in when scrolled to */
  function renderTestimonials() {
    var host = $("testimonialsGrid");
    if (!host) return;

    host.innerHTML = TESTIMONIALS.map(function (t, i) {
      return (
        '<figure class="testimonial tap-scale reveal" data-delay="' + i * 90 + '">' +
        '<div class="stars" data-stars="' + t.rating + '" role="img" aria-label="' + t.rating + ' étoiles sur 5">' +
        '<span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>' +
        "</div>" +
        "<blockquote>" + t.text + "</blockquote>" +
        "<figcaption>" +
        '<span class="avatar">' + t.name.charAt(0) + "</span>" +
        "<span><strong>" + t.name + "</strong><br><small>" + t.location + "</small></span>" +
        "</figcaption>" +
        "</figure>"
      );
    }).join("");
  }

  /** Instagram teaser — a feed-style grid */
  function renderInstagram() {
    var host = $("instaGrid");
    if (!host) return;

    host.innerHTML = INSTAGRAM_POSTS.map(function (post, i) {
      return (
        '<a class="insta-tile tap-scale reveal" href="' + BRAND.instagram +
        '" target="_blank" rel="noopener noreferrer" aria-label="' + post.caption + '" data-delay="' + i * 70 + '">' +
        '<span class="insta-tile__img"><span data-img="' + post.img + '" data-alt="' + post.caption + '" style="position:absolute;inset:0"></span></span>' +
        '<span class="insta-tile__tag">' + post.tag + "</span>" +
        '<span class="insta-tile__overlay">' + svg("instagram", 26, 1.9) + "</span>" +
        '<span class="insta-tile__caption">' + post.caption + "</span>" +
        "</a>"
      );
    }).join("");

    initImages(host);
  }

  /** FAQ accordion (services page) */
  function renderFaq() {
    var host = $("faqList");
    if (!host) return;

    host.innerHTML = FAQ.map(function (item, i) {
      return (
        '<div class="faq-item reveal" data-delay="' + i * 60 + '">' +
        '<button class="faq-question" type="button" aria-expanded="false">' +
        "<span>" + item.q + "</span>" +
        '<span class="faq-plus" aria-hidden="true">+</span>' +
        "</button>" +
        '<div class="faq-answer"><p>' + item.a + "</p></div>" +
        "</div>"
      );
    }).join("");
  }

  /** Opening hours table (contact page) */
  function renderHours() {
    document.querySelectorAll("[data-hours]").forEach(function (host) {
      // the contact page gets the striped table; the footer keeps its own
      // compact markup so it does not inherit the table's visual weight
      if (host.hasAttribute("data-hours-compact")) return;

      var todayIndex = new Date().getDay(); // 0 = Sunday
      var labelByIndex = { 0: "Dimanche", 1: "Lundi", 6: "Samedi" };

      host.innerHTML = BRAND.hours
        .map(function (row) {
          // highlight the block that contains today
          var isToday =
            todayIndex === 0
              ? row.day === "Dimanche"
              : labelByIndex[todayIndex] && row.day.indexOf(labelByIndex[todayIndex]) === 0;
          return (
            '<div class="hours__row' + (isToday ? " hours__row--today" : "") + '">' +
            "<strong>" + row.day + "</strong><span>" + row.time + "</span></div>"
          );
        })
        .join("");
    });
  }

  /* ======================================================================
     12. SHOP PAGE — search, filters, empty state
     ====================================================================== */

  function initShop() {
    var grid = $("shopGrid");
    if (!grid) return;

    var filters = $("shopFilters");
    var input = $("shopSearch");
    var clearBtn = $("shopSearchClear");
    var countEl = $("shopCount");
    var emptyEl = $("shopEmpty");

    var activeCategory = "all";
    var query = "";

    /* Build the filter pills */
    if (filters) {
      var pills = ['<button class="filter-pill tap-scale active" type="button" data-filter="all">Tous</button>'];
      CATEGORIES.forEach(function (c) {
        pills.push(
          '<button class="filter-pill tap-scale" type="button" data-filter="' +
            c.id + '">' + c.short + "</button>"
        );
      });
      filters.innerHTML = pills.join("");
    }

    /* Deep link: shop.html?cat=cheveux preselects a category */
    var params = new URLSearchParams(window.location.search);
    var wanted = params.get("cat");
    if (wanted && getCategoryById(wanted)) {
      activeCategory = wanted;
      if (filters) {
        filters.querySelectorAll(".filter-pill").forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-filter") === wanted);
        });
      }
    }

    function render() {
      var list = PRODUCTS.filter(function (p) {
        var catOk = activeCategory === "all" || p.category === activeCategory;
        var haystack = (p.name + " " + p.brand + " " + p.desc + " " + (getCategoryById(p.category) || {}).name).toLowerCase();
        var queryOk = !query || haystack.indexOf(query) !== -1;
        return catOk && queryOk;
      });

      grid.innerHTML = list
        .map(function (p, i) {
          return productCard(p, { delay: (i % 8) * 55 });
        })
        .join("");

      initImages(grid);
      initReveal();

      if (countEl) {
        var label = list.length > 1 ? "produits" : "produit";
        countEl.innerHTML = "<strong>" + list.length + "</strong> " + label;
      }
      if (emptyEl) emptyEl.classList.toggle("hidden", list.length > 0);
    }

    if (filters) {
      filters.addEventListener("click", function (event) {
        var btn = event.target.closest(".filter-pill");
        if (!btn) return;
        activeCategory = btn.getAttribute("data-filter");
        filters.querySelectorAll(".filter-pill").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        render();
      });
    }

    if (input) {
      input.addEventListener("input", function () {
        query = input.value.trim().toLowerCase();
        if (clearBtn) clearBtn.classList.toggle("show", query.length > 0);
        render();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        input.value = "";
        query = "";
        clearBtn.classList.remove("show");
        input.focus();
        render();
      });
    }

    render();
  }

  /* ======================================================================
     13. FAQ accordion toggle (one open at a time)
     ====================================================================== */

  function initFaqToggle() {
    document.addEventListener("click", function (event) {
      var question = event.target.closest(".faq-question");
      if (!question) return;

      var item = question.closest(".faq-item");
      var wasOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  }

  /* ======================================================================
     14. CONTACT FORM — no backend, hands the message to WhatsApp
     ====================================================================== */

  function initContactForm() {
    var form = $("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var name = (data.get("name") || "Client").toString().trim() || "Client";
      var subject = (data.get("subject") || "Demande générale").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!message) {
        showToast("Merci d'écrire votre message 🙂", "warn");
        return;
      }

      var text =
        "Bonjour Green Para Bay 👋\n" +
        "Nom : " + name + "\n" +
        "Sujet : " + subject + "\n\n" +
        message;

      showToast("Merci " + name + " ! Ouverture de WhatsApp…", "wa");
      window.open("https://wa.me/" + BRAND.phoneRaw + "?text=" + encodeURIComponent(text), "_blank");
      form.reset();
    });
  }

  /* ======================================================================
     15. STICKY MOBILE ACTION BAR
     Slides in once the user leaves the hero, so WhatsApp is always one tap
     away without covering the hero call to action.
     ====================================================================== */

  function initMobileBar() {
    var bar = $("mobileBar");
    if (!bar) return;

    document.body.classList.add("has-bar");

    var hero = document.querySelector(".hero, .page-hero");

    function update() {
      var past = hero ? window.scrollY > hero.offsetHeight * 0.6 : window.scrollY > 400;
      bar.classList.toggle("show", past);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ======================================================================
     16. FAVOURITES (decorative, keeps the heart button from feeling dead)
     ====================================================================== */

  function initFavourites() {
    document.addEventListener("click", function (event) {
      var heart = event.target.closest(".product-card__fav");
      if (!heart) return;
      var on = heart.classList.toggle("is-on");
      heart.style.color = on ? "#ff5c1a" : "";
      heart.setAttribute("aria-pressed", String(on));
      showToast(on ? "Ajouté à vos favoris ❤️" : "Retiré de vos favoris");
    });
  }

  /* ======================================================================
     17. ADD TO CART — one delegated listener for the whole page
     ====================================================================== */

  function initAddToCart() {
    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-add]");
      if (!btn || !window.Cart) return;

      var id = btn.getAttribute("data-add");
      var product = getProductById(id);
      if (!product) return;

      // 1. confirm right under the thumb: the label flips to "Ajouté ✓"
      var label = btn.querySelector("span");
      if (label) {
        var original = label.textContent;
        label.textContent = "Ajouté ✓";
        btn.classList.add("added");
        setTimeout(function () {
          label.textContent = original;
          btn.classList.remove("added");
        }, 1200);
      }

      // 2. add: updates the badge, bounces the cart button, throws leaves
      Cart.add(id, btn);

      // 3. a toast, so the tap is unmistakably acknowledged, with a shortcut
      //    straight into the cart. Skipped when the cart sheet is already open,
      //    because there the item visibly appearing in the list is enough.
      if (Cart.isOpen()) return;

      showToast(product.shortName + " ajouté au panier", "success", {
        actionLabel: "Voir le panier",
        onAction: function () {
          hideToast();
          Cart.open();
        }
      });
    });
  }

  /* ======================================================================
     18. BOOT
     ====================================================================== */

  function boot() {
    // cart.js also listens for DOMContentLoaded, so the panel exists by now
    Cart.init();

    // Icon placeholders written in the HTML
    hydrateIcons();

    // Mobile chrome
    initMobileMenu();
    initNavbar();
    initSmoothScroll();
    initMobileBar();

    // Data-driven sections (each no-ops when its host is missing)
    renderUnivers();
    renderBrands();
    renderFeatured();
    renderPromo();
    renderStats();
    renderWhy();
    renderTestimonials();
    renderInstagram();
    renderFaq();
    renderHours();

    // Behaviours
    initShop();
    initAddToCart();
    initFavourites();
    initFaqToggle();
    initContactForm();

    // Animations last, so everything they animate is in the DOM
    initImages();
    initReveal();
    initCounters();
    initStars();

    // Fade the page in
    document.body.classList.add("page-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  /* Exposed for debugging in the console */
  window.GPB = {
    svg: svg,
    productCard: productCard,
    showToast: showToast
  };
})();
