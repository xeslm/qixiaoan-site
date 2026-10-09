/* ============================================================
   祈小安 · 交互总控
   预加载 / 侧边栏 / 滚动揭示 / 3D 悬浮 / 打字机 / 主题 / 计数器
   / 数字滚动 / 插件渲染与筛选 / 弹窗 / 提示条
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const D  = window.QXA || {};

  /* 取内联 SVG 图标（由 images.js 提供），拿不到就返回空，绝不抛错 */
  const icon = (k) => (window.QXA_ICONS && window.QXA_ICONS[k]) || "";

  /* ---------- 预加载 ---------- */
  function preloader() {
    const el = $(".preloader");
    if (!el) return;
    const bar = $(".pre-bar i", el);
    const pct = $(".pre-pct", el);
    let v = 0;
    const timer = setInterval(() => {
      v = Math.min(100, v + Math.random() * 18 + 6);
      if (bar) bar.style.width = v + "%";
      if (pct) pct.textContent = String(Math.floor(v)).padStart(3, "0") + "%";
      if (v >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          el.classList.add("done");
          document.body.classList.add("ready");
        }, 260);
      }
    }, 110);
    // 兜底：3 秒后无论进度如何都放行
    setTimeout(() => {
      clearInterval(timer);
      el.classList.add("done");
      document.body.classList.add("ready");
    }, 3000);
  }

  /* ---------- 侧边栏（移动端） ---------- */
  function sidebar() {
    const sb = $(".sidebar");
    const burger = $(".burger");
    const scrim = $(".scrim");
    if (!sb || !burger) return;
    const close = () => { sb.classList.remove("open"); scrim && scrim.classList.remove("show"); };
    burger.addEventListener("click", () => {
      sb.classList.toggle("open");
      scrim && scrim.classList.toggle("show", sb.classList.contains("open"));
    });
    scrim && scrim.addEventListener("click", close);
    $$(".nav-item", sb).forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- 滚动揭示 ---------- */
  let revealObserver = null;
  function revealInit() {
    const items = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            revealObserver.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    items.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 卡片 3D 悬浮 ---------- */
  function tilt() {
    if (window.matchMedia("(hover: none)").matches) return;
    $$(".tilt").forEach((el) => {
      let raf = null, tx = 0, ty = 0;
      const apply = () => {
        el.style.transform = "perspective(900px) rotateX(" + ty + "deg) rotateY(" + tx + "deg) translateY(-4px)";
        raf = null;
      };
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tx = px * 9; ty = -py * 9;
        el.style.setProperty("--x", ((e.clientX - r.left) / r.width * 100) + "%");
        el.style.setProperty("--y", ((e.clientY - r.top) / r.height * 100) + "%");
        if (!raf) raf = requestAnimationFrame(apply);
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- 打字机 ---------- */
  function typewriter() {
    const el = $("[data-typed]");
    if (!el) return;
    const list = JSON.parse(el.getAttribute("data-typed"));
    let li = 0, ci = 0, del = false;
    const step = () => {
      const cur = list[li];
      el.textContent = cur.slice(0, ci);
      if (!del && ci < cur.length) { ci++; setTimeout(step, 78); }
      else if (!del && ci === cur.length) { del = true; setTimeout(step, 1500); }
      else if (del && ci > 0) { ci--; setTimeout(step, 34); }
      else { del = false; li = (li + 1) % list.length; setTimeout(step, 260); }
    };
    step();
  }

  /* ---------- 数字滚动 ---------- */
  function counters() {
    const els = $$("[data-count]");
    if (!els.length) return;
    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count")) || 0;
      const dec = (el.getAttribute("data-dec") | 0);
      const dur = 1200;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(dec);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((ens) => {
      ens.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- 进度条动画 ---------- */
  function meters() {
    const els = $$(".meter-bar i[data-w]");
    if (!els.length) return;
    const io = new IntersectionObserver((ens) => {
      ens.forEach((en) => {
        if (en.isIntersecting) {
          const el = en.target;
          setTimeout(() => { el.style.width = el.getAttribute("data-w") + "%"; }, 120);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- 主题切换 ---------- */
  function theme() {
    const KEY = "qxa-theme";
    const root = document.documentElement;
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) root.setAttribute("data-theme", saved);
    } catch (e) {}

    const iconName = () => (root.getAttribute("data-theme") === "night" ? "sun" : "moon");

    function syncIcons() {
      $$("[data-theme-toggle]").forEach((btn) => {
        const night = root.getAttribute("data-theme") === "night";
        btn.setAttribute("aria-label", night ? "切换到白天" : "切换到夜晚");
        btn.classList.toggle("is-night", night);
        const slot = $("[data-icon]", btn);
        if (slot && window.QXA_ICONS && window.QXA_ICONS[iconName()]) {
          slot.innerHTML = window.QXA_ICONS[iconName()];
          slot.dataset.iconDone = "1";
        }
        const label = $("span", btn);
        if (label && /月夜|白天|月夜模式/.test(label.textContent)) {
          label.textContent = night ? "回到白天" : "切换月夜";
        }
      });
    }

    // 事件委托：侧边栏与顶栏的按钮都是后注入的，统一在这里处理
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-theme-toggle]");
      if (!btn) return;
      const night = root.getAttribute("data-theme") === "night";
      root.setAttribute("data-theme", night ? "day" : "night");
      try { localStorage.setItem(KEY, night ? "day" : "night"); } catch (err) {}
      syncIcons();
      toast(night ? "天亮啦" : "晚安，月亮出来了");
    });

    window.qxaSyncThemeIcons = syncIcons;
    syncIcons();
  }

  /* ---------- 提示条 ---------- */
  let toastTimer = null;
  function toast(msg) {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }
  window.qxaToast = toast;

  /* ---------- 插件渲染 ---------- */
  function renderPlugins() {
    const host = $("#plugin-grid");
    if (!host || !D.PLUGINS) return;

    const POINT_LIMIT = 3;
    host.innerHTML = D.PLUGINS.map((p, i) => {
      const pts = (p.points || []).slice(0, POINT_LIMIT).map((f) => "<li>" + esc(f) + "</li>").join("");
      const more = (p.points || []).length > POINT_LIMIT
        ? '<li class="muted">还有 ' + (p.points.length - POINT_LIMIT) + " 条，点开看</li>" : "";
      return '' +
        '<article class="card tilt plugin-card reveal d' + ((i % 4) + 1) + '" data-tone="' + p.tone + '" data-plugin="' + p.id + '">' +
          '<span class="card-glow" style="background:radial-gradient(420px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,.5), transparent 60%)"></span>' +
          '<div class="plugin-top">' +
            '<div class="plugin-ico">' + icon(p.icon) + "</div>" +
            "<div>" +
              '<div class="plugin-name">' + esc(p.name) +
                '<span class="plugin-ver">v' + esc(p.version) + "</span>" +
                '<span class="badge"><span class="dot"></span>已开启</span>' +
              "</div>" +
              '<div class="plugin-tagline" style="margin-top:2px">' + esc(p.tagline) + "</div>" +
            "</div>" +
            '<span class="switch" aria-hidden="true"></span>' +
          "</div>" +
          '<p class="plugin-sum">' + esc(p.what) + "</p>" +
          '<ul class="plugin-feats">' + pts + more + "</ul>" +
          '<div class="plugin-foot">' +
            '<span class="chip">' + esc(p.repo.split(" / ")[1] || p.repo) + "</span>" +
            '<button class="btn ghost small" data-detail="' + p.id + '">看它具体做什么</button>' +
          "</div>" +
        "</article>";
    }).join("");

    tilt();
    revealInit();

    host.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-detail]");
      if (btn) { openPlugin(btn.getAttribute("data-detail")); return; }
      const card = e.target.closest("[data-plugin]");
      if (card) openPlugin(card.getAttribute("data-plugin"));
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function openPlugin(id) {
    const p = (D.PLUGINS || []).find((x) => x.id === id);
    if (!p) return;
    const modal = $("#plugin-modal");
    if (!modal) return;
    try {
      if (location.hash !== "#plugin=" + id) history.replaceState(null, "", "#plugin=" + id);
    } catch (e) {}
    const vn = (D.VERSION_NOTES || []).find((v) => p.name.indexOf(v.name) === 0 || v.name.indexOf(p.name) === 0);
    $("#pm-title").textContent = p.name;
    $("#pm-body").innerHTML =
      '<p class="plugin-tagline" style="font-size:16px;margin-bottom:14px">' + esc(p.tagline) + "</p>" +
      '<p style="margin:0 0 18px">' + esc(p.what) + "</p>" +
      '<div class="small-caps" style="margin-bottom:8px">特点</div>' +
      '<ul class="plugin-feats">' + (p.points || []).map((f) => "<li>" + esc(f) + "</li>").join("") + "</ul>" +
      '<div class="divider" style="margin:20px 0"></div>' +
      '<dl class="kv">' +
        "<dt>当前版本</dt><dd>v" + esc(p.version) + (vn && vn.repo !== ("v" + p.version) && vn.repo !== p.version
          ? ' <span class="tiny muted">（仓库最新：' + esc(vn.repo) + "）</span>" : "") + "</dd>" +
        "<dt>出处</dt><dd>" + esc(p.repo) + "</dd>" +
        "<dt>插件标识</dt><dd class=\"mono tiny\">" + esc(p.alias) + "</dd>" +
      "</dl>" +
      '<div class="note" style="margin-top:18px">插件由第三方作者开发，本站只介绍它在她身上起什么作用。' +
      "版本号按面板显示值写，细节以插件自身配置为准。</div>";
    modal.classList.add("show");
  }

  function modal() {
    const m = $("#plugin-modal");
    if (!m) return;

    function close() {
      m.classList.remove("show");
      try {
        if (/^#plugin=/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
      } catch (e) {}
    }

    m.addEventListener("click", (e) => {
      if (e.target.closest(".modal-close") || e.target.classList.contains("modal-bg")) close();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    // 支持直接分享链接：#plugin=stealer
    function fromHash() {
      const mt = /^#plugin=([\w-]+)$/.exec(location.hash || "");
      if (mt) openPlugin(mt[1]);
    }
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* ---------- 插件筛选 / 搜索 ---------- */
  function filters() {
    const wrap = $("#plugin-filters");
    const host = $("#plugin-grid");
    const box = $("#plugin-search");
    if (!host) return;

    function apply() {
      const active = wrap ? ($(".filter-btn.active", wrap) || {}).getAttribute?.("data-filter") || "all" : "all";
      const q = box ? box.value.trim().toLowerCase() : "";
      $$("[data-plugin]", host).forEach((card) => {
        const p = (D.PLUGINS || []).find((x) => x.id === card.getAttribute("data-plugin"));
        let ok = true;
        if (active !== "all") {
          ok = !!p && p.tone === active;
        }
        if (ok && q) {
          const hay = (p.name + p.alias + p.tagline + p.what + (p.points || []).join("")).toLowerCase();
          ok = hay.includes(q);
        }
        card.style.display = ok ? "" : "none";
      });
    }

    if (wrap) {
      wrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        $$(".filter-btn", wrap).forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        apply();
      });
    }
    if (box) box.addEventListener("input", apply);
  }

  /* ---------- 行为页：对话矩阵渲染 ---------- */
  function renderMatrix() {
    const host = $("#matrix-list");
    if (!host || !D.MATRIX) return;
    host.innerHTML = D.MATRIX.map((m) => '' +
      '<div class="card reveal" style="padding:16px 18px">' +
        '<div class="rule-when">' + esc(m.trigger) + "</div>" +
        '<div class="bubble her" style="margin-top:10px">' + esc(m.reply) + "</div>" +
      "</div>").join("");
    revealInit();
  }

  function renderRoutes() {
    const host = $("#route-list");
    if (!host || !D.ROUTES) return;
    host.innerHTML = D.ROUTES.map((r, i) => '' +
      '<div class="card reveal d' + ((i % 4) + 1) + '" style="padding:16px 18px">' +
        '<div class="rule-when">' + esc(r.when) + "</div>" +
        '<div class="rule-then" style="margin-top:7px">' + esc(r.then) + "</div>" +
      "</div>").join("");
    revealInit();
  }

  function renderForbidden() {
    const host = $("#forbidden-wall");
    if (!host || !D.FORBIDDEN) return;
    host.innerHTML = D.FORBIDDEN.map((g) => '' +
      '<div class="stack" style="gap:10px">' +
        '<div class="small-caps">' + esc(g.kind) + "</div>" +
        '<div class="wordwall">' + g.items.map((w) => '<span class="word">' + esc(w) + "</span>").join("") + "</div>" +
      "</div>").join("");
  }

  function renderAxes() {
    const host = $("#axis-list");
    if (!host || !D.PERSONA_AXES) return;
    host.innerHTML = D.PERSONA_AXES.map((a) => '' +
      '<div class="card tilt reveal" data-tone="' + a.tone + '">' +
        '<span class="card-glow" style="background:radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,.5), transparent 62%)"></span>' +
        '<div class="row-between" style="margin-bottom:10px">' +
          '<div><div class="card-title">' + esc(a.name) + "</div>" +
          '<div class="small-caps">' + esc(a.en) + "</div></div>" +
          '<div class="display grad-text" style="font-size:30px"><span data-count="' + a.weight + '">0</span></div>' +
        "</div>" +
        '<p class="muted" style="font-size:13.5px;margin-bottom:14px">' + esc(a.desc) + "</p>" +
        '<div class="meter" data-tone="' + a.tone + '"><div class="meter-bar"><i data-w="' + a.weight + '"></i></div></div>' +
        '<div class="row" style="margin-top:14px;gap:6px">' +
          a.points.map((p) => '<span class="chip" data-tone="' + a.tone + '">' + esc(p) + "</span>").join("") +
        "</div>" +
      "</div>").join("");
    tilt(); revealInit(); counters(); meters();
  }

  function renderStats() {
    const host = $("#stat-row");
    if (!host || !D.STATS) return;
    host.innerHTML = D.STATS.map((s) => '' +
      '<div class="kpi reveal"><span class="v grad-text">' + esc(s.value) + "</span>" +
      '<span class="l">' + esc(s.label) + "</span></div>").join("");
    revealInit();
  }

  /* ---------- 版本对照表 ---------- */
  function renderVersions() {
    const host = $("#version-table");
    if (!host || !D.VERSION_NOTES) return;

    host.innerHTML =
      '<div class="sch-row" data-cell="1" style="font-weight:600;background:var(--surface-sunken)">' +
        "<span>插件</span><span>面板显示</span><span>仓库最新</span><span>说明</span>" +
      "</div>" +
      D.VERSION_NOTES.map((v) => {
        const same = v.panel.replace(/^v/, "") === v.repo.replace(/^v/, "");
        return '<div class="sch-row" data-cell="1">' +
          "<span><b>" + esc(v.name) + "</b></span>" +
          '<span class="mono tiny">v' + esc(v.panel.replace(/^v/, "")) + "</span>" +
          '<span class="mono tiny' + (same ? " muted" : "") + '">' + esc(v.repo) + "</span>" +
          '<span class="tiny ' + (same ? "muted" : "") + '">' + (same ? "一致" : "仓库已更新") + "</span>" +
        "</div>";
      }).join("");

    revealInit();
  }

  /* ---------- 插件名与仓库对照 ---------- */
  function renderCredits() {
    const host = $("#credit-list");
    if (!host || !D.PLUGINS) return;
    host.innerHTML = D.PLUGINS.map((p, i) => '' +
      '<div class="sch-row" data-cell="1">' +
        '<span><b>' + esc(p.name) + "</b></span>" +
        '<span class="mono tiny muted" style="overflow-wrap:anywhere">' + esc(p.repo) + "</span>" +
        '<span class="chip" data-tone="' + p.tone + '">v' + esc(p.version) + "</span>" +
      "</div>").join("");
    revealInit();
  }

  /* ---------- 无障碍：键盘点击 ---------- */
  function keyboard() {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const stage = document.activeElement;
      if (stage && stage.classList && stage.classList.contains("quote-stage")) {
        e.preventDefault();
        stage.click();
      }
    });
  }

  /* ---------- 启动 ---------- */
  /* 每个模块单独兜底：任何一个渲染出错，都不牵连其它模块 */
  function boot(label, fn) {
    try { fn(); }
    catch (err) { console.error("[祈小安] " + label + " 初始化失败：", err); }
  }

  document.addEventListener("DOMContentLoaded", () => {
    [
      ["主题", theme],
      ["侧边栏", sidebar],
      ["预加载", preloader],
      ["滚动揭示", revealInit],
      ["3D 悬浮", tilt],
      ["打字机", typewriter],
      ["数字滚动", counters],
      ["进度条", meters],
      ["对话矩阵", renderMatrix],
      ["场景路由", renderRoutes],
      ["禁用词墙", renderForbidden],
      ["性格三轴", renderAxes],
      ["数据看板", renderStats],
      ["版本对照表", renderVersions],
      ["插件对照表", renderCredits],
      ["筛选与搜索", filters],
      ["弹窗", modal],
      ["键盘操作", keyboard],
      ["插件卡片", renderPlugins]
    ].forEach(([label, fn]) => boot(label, fn));
  });
})();
