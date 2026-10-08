/* ============================================================
   祈小安 · 共享 UI 组件
   把侧边栏、顶栏、页脚、气泡这些重复结构集中生成，
   页面里只留内容，改一处全站生效。
   ============================================================ */
(function () {
  "use strict";

  const NAV = [
    { id: "home",     href: "index.html",     label: "首页",       sub: "Home",      icon: "home",    group: "导览" },
    { id: "character",href: "character.html", label: "小安档案",   sub: "Profile",   icon: "user",    group: "她是谁" },
    { id: "plugins",  href: "plugins.html",   label: "插件装备",   sub: "Plugins",   icon: "plug",    group: "她是谁" },
    { id: "behavior", href: "behavior.html",  label: "说话方式",   sub: "Voice",     icon: "chat",    group: "她是谁" },
    { id: "memory",   href: "memory.html",    label: "记忆系统",   sub: "Memory",    icon: "brain",   group: "她是谁" },
    { id: "quotes",   href: "quotes.html",    label: "每日好句",   sub: "Quotes",    icon: "quote",   group: "来聊聊" },
    { id: "contact",  href: "contact.html",   label: "联系祈安",   sub: "Contact",   icon: "mail",    group: "来聊聊" }
  ];

  const GROUPS = ["导览", "她是谁", "来聊聊"];

  function navHTML(current) {
    let html = '<a class="brand" href="index.html">' +
      '<img class="brand-avatar" src="assets/img/qixiaoan-avatar.jpg" alt="祈小安" width="512" height="512">' +
      '<span class="brand-text">' +
        '<span class="brand-name">祈小安</span>' +
        '<span class="brand-meta">v1.0.1 · 私聊特化</span>' +
      "</span></a>";

    GROUPS.forEach((g) => {
      const items = NAV.filter((n) => n.group === g);
      if (!items.length) return;
      html += '<div class="nav-group"><div class="nav-label">' + g + "</div>";
      items.forEach((n) => {
        html += '<a class="nav-item' + (n.id === current ? " active" : "") + '" href="' + n.href + '">' +
          '<i data-icon="' + n.icon + '"></i><span>' + n.label + "</span>" +
          '<span class="nav-sub">' + n.sub + "</span></a>";
      });
      html += "</div>";
    });

    html += '<div class="side-card">' +
      '<div class="row-between"><span class="t">今日状态</span><span class="badge"><span class="dot"></span>在线</span></div>' +
      '<div class="tiny muted">私聊特化 · 一对一专属<br>回复克制，不写小作文</div>' +
      '<div class="side-meter"><i style="width:88%"></i></div>' +
      '<button class="btn ghost small" data-theme-toggle style="justify-content:center">' +
        '<i data-icon="moon"></i><span>切换月夜</span></button>' +
    "</div>";
    return html;
  }

  function footerHTML() {
    return '' +
    '<div class="row-between">' +
      '<div class="row" style="gap:12px">' +
        '<img class="brand-avatar sm" src="assets/img/qixiaoan-avatar.jpg" alt="祈小安" width="512" height="512">' +
        "<span><b style=\"font-family:var(--font-cute)\">祈小安</b> · v1.0.1 私聊特化型 QQ 机器人<br>" +
        '<span class="tiny">作者 / 主人：祈安（QQ 2674488298）</span></span>' +
      "</div>" +
      '<div class="footer-links">' +
        NAV.map((n) => '<a href="' + n.href + '">' + n.label + "</a>").join("") +
        '<a href="https://docs.astrbot.app/" target="_blank" rel="noopener">AstrBot 文档</a>' +
      "</div>" +
    "</div>" +
    '<div class="divider" style="margin:8px 0"></div>' +
    '<div class="tiny">本站为角色介绍页，非官方站点。插件版本与功能描述依据插件面板与插件说明整理；' +
    "角色设定与对话示例仅作展示，实际表现以机器人在线行为为准。</div>";
  }

  function chrome() {
    const page = document.body.getAttribute("data-page") || "home";

    const sb = document.querySelector(".sidebar");
    if (sb) sb.innerHTML = navHTML(page);

    const tb = document.querySelector(".topbar");
    if (tb) {
      tb.innerHTML =
        '<a class="row" href="index.html" style="gap:10px">' +
          '<img class="brand-avatar xs" src="assets/img/qixiaoan-avatar.jpg" alt="祈小安" width="512" height="512">' +
          '<b style="font-family:var(--font-cute);letter-spacing:.06em">祈小安</b>' +
        "</a>" +
        '<div class="row" style="gap:8px">' +
          '<button class="burger" aria-label="打开菜单"><span></span></button>' +
          '<button class="btn ghost small" data-theme-toggle aria-label="切换主题"><i data-icon="moon"></i></button>' +
        "</div>";
    }

    const ft = document.querySelector(".footer");
    if (ft) ft.innerHTML = footerHTML();

    document.querySelectorAll("[data-bubble]").forEach((el) => {
      const who = el.getAttribute("data-who");
      el.classList.add("bubble", el.getAttribute("data-side") === "me" ? "me" : "her");
      if (who) el.insertAdjacentHTML("afterbegin", '<span class="who">' + who + "</span>");
    });

    if (window.qxaInjectArt) window.qxaInjectArt();
  }

  document.addEventListener("DOMContentLoaded", chrome);
})();
