/* ==========================================================================
   Green Para Bay — cart.js
   --------------------------------------------------------------------------
   The cart, and nothing else. It owns:
     - persistence in localStorage (key "gpb_cart")
     - the bottom-sheet / side-drawer markup
     - rendering the item list, quantities and total
     - the "Commander via WhatsApp" message and the wa.me redirect
     - the micro-interaction when an item is added

   It injects its own markup into <div id="cart-root"> so every page gets it
   for free. Public API:
     Cart.add(id, sourceEl)   add one unit
     Cart.open() / close()
     Cart.getCount()          total units
     Cart.getTotal()          total in MAD
     Cart.getItems()          [{ product, qty }]
   ========================================================================== */

var Cart = (function () {
  "use strict";

  var STORAGE_KEY = "gpb_cart";
  var WHATSAPP_NUMBER = "212641381910";

  var items = read(); // [{ id, qty }]
  var els = {};
  var lastFocused = null;
  var ready = false;

  /* ----------------------------------------------------------------------
     Persistence
     ---------------------------------------------------------------------- */

  function read() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];

      return parsed
        .filter(function (line) {
          // drop anything unknown, so removing a product from data.js
          // also removes it from a saved cart
          return line && typeof line.id === "string" && typeof line.qty === "number" && line.qty > 0 && getProductById(line.id);
        })
        .map(function (line) {
          return { id: line.id, qty: Math.min(99, Math.floor(line.qty)) };
        });
    } catch (err) {
      // Storage blocked (private mode, disabled cookies): keep an in-memory cart
      return [];
    }
  }

  function persist() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      /* the cart still works for the current page view */
    }
  }

  /* ----------------------------------------------------------------------
     Derived state
     ---------------------------------------------------------------------- */

  function getItems() {
    return items
      .map(function (line) {
        return { product: getProductById(line.id), qty: line.qty };
      })
      .filter(function (row) {
        return row.product;
      });
  }

  function getCount() {
    return items.reduce(function (sum, line) {
      return sum + line.qty;
    }, 0);
  }

  function getTotal() {
    return items.reduce(function (sum, line) {
      var product = getProductById(line.id);
      return sum + (product ? product.price * line.qty : 0);
    }, 0);
  }

  /* ----------------------------------------------------------------------
     Markup
     ---------------------------------------------------------------------- */

  function markup() {
    return [
      '<div class="cart-overlay" id="cartOverlay"></div>',
      '<aside class="cart-panel" id="cartPanel" role="dialog" aria-modal="true" aria-labelledby="cartTitle">',

      '  <header class="cart-header">',
      '    <h2 class="cart-header__title" id="cartTitle">Mon panier',
      '      <span class="cart-header__count" id="cartHeadCount">0</span>',
      "    </h2>",
      '    <button class="cart-close tap-scale" id="cartClose" type="button" aria-label="Fermer le panier">',
      '      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      "    </button>",
      "  </header>",

      '  <div class="cart-body" id="cartBody"></div>',

      '  <div class="cart-summary">',
      '    <div class="cart-summary__row"><span>Articles</span><span id="cartCount">0</span></div>',
      '    <div class="cart-summary__row"><span>Livraison à M\'diq</span><span class="cart-summary__free">Offerte</span></div>',
      '    <div class="cart-summary__row cart-summary__row--total"><span>Total</span><span id="cartTotal">0 DH</span></div>',
      "  </div>",

      '  <footer class="cart-footer">',
      '    <button class="btn btn--whatsapp btn--block" id="cartWhatsApp" type="button">',
      '      <span class="btn-icon" data-icon="whatsapp"></span> Commander via WhatsApp',
      "    </button>",
      '    <p class="cart-footer__hint">Paiement à la livraison · Confirmation par message</p>',
      "  </footer>",

      "</aside>"
    ].join("\n");
  }

  /* ----------------------------------------------------------------------
     Rendering
     ---------------------------------------------------------------------- */

  function renderBody() {
    var rows = getItems();

    /* ---- empty state ---- */
    if (rows.length === 0) {
      els.body.innerHTML = [
        '<div class="cart-empty">',
        '  <div class="cart-empty__icon">',
        '    <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66c.83-2.37 2.2-4.31 3.74-5.66C7.83 17 7 14.43 7 12c0-4.5 3.5-8 8-8 1.7 0 3.27.56 4.55 1.5-1.74.17-3.34.92-4.55 1.95 2.5.18 4.5 2.25 4.5 4.8 0 1.31-.4 2.52-1.08 3.52 1.58-.57 2.83-1.64 3.58-3.02C20.84 11.82 19.1 9.5 17 8Z"/></svg>',
        "  </div>",
        "  <h3>Votre panier est vide</h3>",
        "  <p>Ajoutez vos produits préférés, puis commandez en un clic via WhatsApp.</p>",
        '  <a class="btn btn--green" href="shop.html" style="margin-top:6px">Voir la boutique</a>',
        "</div>"
      ].join("");
      return;
    }

    /* ---- items ---- */
    var html = rows
      .map(function (row) {
        var p = row.product;
        return [
          '<div class="cart-item" data-id="' + p.id + '">',
          '  <div class="cart-item__media"><img src="' + p.img + '" alt="" loading="lazy" decoding="async"></div>',
          '  <div class="cart-item__info">',
          '    <span class="cart-item__name">' + p.shortName + "</span>",
          '    <span class="cart-item__unit">' + formatPrice(p.price) + " l'unité</span>",
          "  </div>",
          '  <div class="cart-item__side">',
          '    <span class="cart-item__price">' + formatPrice(p.price * row.qty) + "</span>",
          '    <div class="qty">',
          '      <button type="button" data-qty="-1" aria-label="Retirer un ' + p.shortName + '">−</button>',
          "      <output>" + row.qty + "</output>",
          '      <button type="button" data-qty="1" aria-label="Ajouter un ' + p.shortName + '">+</button>',
          "    </div>",
          '    <button class="cart-remove" type="button" data-remove aria-label="Retirer ' + p.shortName + ' du panier">Retirer</button>',
          "  </div>",
          "</div>"
        ].join("");
      })
      .join("");

    els.body.innerHTML = html;
  }

  function renderChrome() {
    var count = getCount();
    var total = getTotal();

    // every cart button in the page (there is normally one)
    document.querySelectorAll(".cart-badge").forEach(function (badge) {
      badge.textContent = count;
      badge.classList.toggle("show", count > 0);
    });

    var headCount = document.getElementById("cartHeadCount");
    if (headCount) headCount.textContent = count;

    var countRow = document.getElementById("cartCount");
    if (countRow) countRow.textContent = count;

    var totalRow = document.getElementById("cartTotal");
    if (totalRow) totalRow.textContent = formatPrice(total);
  }

  function render() {
    renderBody();
    renderChrome();
  }

  /* ----------------------------------------------------------------------
     Mutations
     ---------------------------------------------------------------------- */

  function setQty(id, qty) {
    var line = items.find(function (l) {
      return l.id === id;
    });
    if (!line) return;

    if (qty <= 0) {
      items = items.filter(function (l) {
        return l.id !== id;
      });
    } else {
      line.qty = Math.min(99, qty);
    }

    persist();
    render();
  }

  function add(productId) {
    if (!getProductById(productId)) return;

    var line = items.find(function (l) {
      return l.id === productId;
    });

    if (line) {
      line.qty = Math.min(99, line.qty + 1);
    } else {
      items.push({ id: productId, qty: 1 });
    }

    persist();
    render();
  }

  /* ----------------------------------------------------------------------
     WhatsApp order
     ---------------------------------------------------------------------- */

  function buildMessage() {
    var rows = getItems();

    var lines = rows.map(function (row) {
      return "• " + row.product.shortName + " (" + row.qty + ") — " + formatPrice(row.product.price * row.qty);
    });

    return [
      "Bonjour Green Para Bay 👋",
      "Je souhaite commander :",
      "",
      lines.join("\n"),
      "",
      "Total : " + formatPrice(getTotal()),
      "",
      "Livraison à M'diq 🛵",
      "Merci de me confirmer la disponibilité et le créneau."
    ].join("\n");
  }

  function orderViaWhatsApp() {
    if (items.length === 0) {
      open();
      return;
    }
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildMessage()), "_blank");
  }

  /* ----------------------------------------------------------------------
     Open / close
     ---------------------------------------------------------------------- */

  function open() {
    if (!els.panel) return;

    lastFocused = document.activeElement;
    render();

    els.overlay.classList.add("active");
    els.panel.classList.add("active");
    document.body.classList.add("no-scroll");

    // move focus in for screen readers, without yanking the page around
    setTimeout(function () {
      var close = document.getElementById("cartClose");
      if (close) close.focus({ preventScroll: true });
    }, 80);
  }

  function close() {
    if (!els.panel) return;

    els.overlay.classList.remove("active");
    els.panel.classList.remove("active");
    document.body.classList.remove("no-scroll");

    if (lastFocused && lastFocused.focus) {
      lastFocused.focus({ preventScroll: true });
    }
  }

  function isOpen() {
    return !!(els.panel && els.panel.classList.contains("active"));
  }

  /* ----------------------------------------------------------------------
     Micro-interaction: cart button bounce, badge pulse, leaf burst
     ---------------------------------------------------------------------- */

  function burst(originEl) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var origin = originEl || document.querySelector(".cart-btn");
    if (!origin) return;

    var rect = origin.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;

    for (var i = 0; i < 6; i++) {
      var particle = document.createElement("span");
      particle.className = "leaf-particle" + (i % 2 ? " leaf-particle--coral" : "");

      // scatter outward and upward
      var angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
      var distance = 40 + Math.random() * 46;

      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.setProperty("--dx", Math.cos(angle) * distance + "px");
      particle.style.setProperty("--dy", Math.sin(angle) * distance - 40 + "px");
      particle.style.setProperty("--rot", (Math.random() * 200 - 100).toFixed(0) + "deg");
      particle.style.animationDelay = i * 35 + "ms";

      document.body.appendChild(particle);

      (function (node, delay) {
        setTimeout(function () {
          node.remove();
        }, 900 + delay);
      })(particle, i * 35);
    }
  }

  function celebrate(sourceEl) {
    var cartBtn = document.querySelector(".cart-btn");

    if (cartBtn) {
      // restart the animation by removing the class and forcing a reflow
      cartBtn.classList.remove("bounce");
      void cartBtn.offsetWidth;
      cartBtn.classList.add("bounce");

      document.querySelectorAll(".cart-badge").forEach(function (badge) {
        badge.classList.remove("pulse");
        void badge.offsetWidth;
        badge.classList.add("pulse");
      });
    }

    burst(cartBtn || sourceEl);
  }

  /* ----------------------------------------------------------------------
     Init
     ---------------------------------------------------------------------- */

  function init() {
    if (ready) return;

    var root = document.getElementById("cart-root");
    if (!root) return;
    ready = true;

    root.innerHTML = markup();

    els.overlay = document.getElementById("cartOverlay");
    els.panel = document.getElementById("cartPanel");
    els.body = document.getElementById("cartBody");

    // hydrate the icon placeholder inside the WhatsApp button
    var waBtn = document.getElementById("cartWhatsApp");
    var iconHost = waBtn && waBtn.querySelector("[data-icon]");
    if (iconHost && window.GPB) {
      iconHost.innerHTML = window.GPB.svg("whatsapp", 20, 1.9);
      iconHost.style.display = "inline-flex";
    }

    // openers: the navbar cart button(s)
    document.querySelectorAll(".cart-btn").forEach(function (btn) {
      btn.addEventListener("click", open);
    });

    document.getElementById("cartClose").addEventListener("click", close);
    els.overlay.addEventListener("click", close);
    document.getElementById("cartWhatsApp").addEventListener("click", orderViaWhatsApp);

    /* Delegated controls: survive every re-render of the item list */
    els.body.addEventListener("click", function (event) {
      var item = event.target.closest(".cart-item");
      if (!item) return;
      var id = item.getAttribute("data-id");
      var line = items.find(function (l) {
        return l.id === id;
      });
      if (!line) return;

      var step = event.target.closest("[data-qty]");
      if (step) {
        setQty(id, line.qty + parseInt(step.getAttribute("data-qty"), 10));
        return;
      }

      if (event.target.closest("[data-remove]")) {
        setQty(id, 0);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) close();
    });

    // Another tab changed the cart
    window.addEventListener("storage", function (event) {
      if (event.key === STORAGE_KEY) {
        items = read();
        render();
      }
    });

    render();
  }

  return {
    init: init,
    add: function (id, sourceEl) {
      add(id);
      celebrate(sourceEl);
    },
    open: open,
    close: close,
    isOpen: isOpen,
    getItems: getItems,
    getCount: getCount,
    getTotal: getTotal,
    buildMessage: buildMessage,
    orderViaWhatsApp: orderViaWhatsApp
  };
})();
