/* ============================================================
   祈小安 · 每日好句
   点击卡片即刷新；支持复制、下载 PNG 卡片；
   另有「今日一句」，按日期固定，全站一致
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const ALL = (window.QXA && window.QXA.DAILY_QUOTES) || [];

  /* 兜底句库（data.js 未加载时也能用） */
  const FALLBACK = [
    { text: "今天也要好好吃饭，别拿零食当正餐。", tag: "叮嘱" },
    { text: "累了就早点睡，我在的，明天也还在。", tag: "陪伴" },
    { text: "你不用一直很厉害，偶尔偷个懒也没关系。", tag: "温柔" },
    { text: "不开心就先别硬撑，慢慢说，我听着。", tag: "安抚" },
    { text: "月亮今晚很亮，适合发呆，也适合聊两句。", tag: "夜话" }
  ];

  const pool = () => (ALL.length ? ALL : FALLBACK);

  function rand(n, exclude) {
    if (n <= 1) return 0;
    let i = Math.floor(Math.random() * n);
    if (exclude != null && i === exclude) i = (i + 1) % n;
    return i;
  }

  /* 今日固定一句：以日期为种子 */
  function todayIndex() {
    const d = new Date();
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return seed % pool().length;
  }

  function dayLabel() {
    const d = new Date();
    const w = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
    return d.getFullYear() + " 年 " + (d.getMonth() + 1) + " 月 " + d.getDate() + " 日 · 星期" + w;
  }

  /* ---------- 主卡片：点击刷新 ---------- */
  function stage() {
    const el = $("#quote-stage");
    if (!el) return;
    const txt = $("#quote-text", el);
    const tag = $("#quote-tag", el);
    const cnt = $("#quote-count", el);
    const btn = $("#quote-refresh");
    let idx = null;
    let used = 0;

    function paint(i, animate) {
      const q = pool()[i];
      if (!q) return;
      idx = i;
      used++;
      if (txt) txt.textContent = q.text;
      if (tag) tag.textContent = q.tag;
      if (cnt) cnt.textContent = String(i + 1).padStart(2, "0") + " / " + String(pool().length).padStart(2, "0");
      const counter = $("#quote-used");
      if (counter) counter.textContent = used;
      if (animate && txt) {
        txt.classList.remove("flip");
        void txt.offsetWidth;
        txt.classList.add("flip");
      }
      el.setAttribute("aria-label", "换一句好句：" + q.text);
    }

    function next() {
      paint(rand(pool().length, idx), true);
    }

    el.addEventListener("click", next);
    if (btn) {
      btn.addEventListener("click", (e) => { e.stopPropagation(); next(); spin(btn); });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "r" && !/input|textarea/i.test((e.target.tagName || ""))) next();
    });

    paint(todayIndex(), true);
    window.qxaCurrentQuote = () => pool()[idx];

    /* 复制 */
    const copy = $("#quote-copy");
    if (copy) copy.addEventListener("click", (e) => {
      e.stopPropagation();
      const q = pool()[idx];
      const line = "「" + q.text + "」 —— 祈小安";
      const done = () => window.qxaToast && window.qxaToast("已经复制好啦");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(line).then(done).catch(() => fallbackCopy(line, done));
      } else fallbackCopy(line, done);
    });

    /* 下载卡片 */
    const down = $("#quote-download");
    if (down) down.addEventListener("click", (e) => {
      e.stopPropagation();
      downloadCard(pool()[idx]);
    });
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); }
    catch (err) { window.qxaToast && window.qxaToast("复制失败了，手动选一下吧"); }
    document.body.removeChild(ta);
  }

  function spin(btn) {
    btn.classList.add("spin");
    setTimeout(() => btn.classList.remove("spin"), 640);
  }

  /* ---------- 今日一句（列表首项） ---------- */
  function todayStrip() {
    const host = $("#today-quote");
    if (!host) return;
    const q = pool()[todayIndex()];
    host.innerHTML =
      '<div class="row-between">' +
        '<div><div class="small-caps">今日一句 · ' + dayLabel() + "</div>" +
        '<div class="quote-text" style="font-size:clamp(18px,2.4vw,26px);margin-top:6px">' + esc(q.text) + "</div></div>" +
        '<span class="chip" data-tone="sakura">' + esc(q.tag) + "</span>" +
      "</div>";
  }

  /* ---------- 好句墙 ---------- */
  function wall() {
    const host = $("#quote-wall");
    if (!host) return;
    const list = pool();
    host.innerHTML = list.map((q, i) => '' +
      '<div class="card reveal" data-tone="' + tone(i) + '" style="padding:16px 18px;cursor:pointer" data-quote-index="' + i + '">' +
        '<div style="font-size:14.5px;color:var(--ink)">' + esc(q.text) + "</div>" +
        '<div class="row-between" style="margin-top:10px">' +
          '<span class="chip" data-tone="' + tone(i) + '">' + esc(q.tag) + "</span>" +
          '<span class="mono tiny muted">#' + String(i + 1).padStart(3, "0") + "</span>" +
        "</div>" +
      "</div>").join("");

    host.addEventListener("click", (e) => {
      const card = e.target.closest("[data-quote-index]");
      if (!card) return;
      const q = list[+card.getAttribute("data-quote-index")];
      const stageEl = $("#quote-stage");
      const txt = $("#quote-text");
      const tag = $("#quote-tag");
      if (txt) {
        txt.textContent = q.text;
        txt.classList.remove("flip");
        void txt.offsetWidth;
        txt.classList.add("flip");
      }
      if (tag) tag.textContent = q.tag;
      if (stageEl) stageEl.scrollIntoView({ behavior: "smooth", block: "center" });
      window.qxaToast && window.qxaToast("换成了这一句");
    });

    if (window.qxaInjectArt) window.qxaInjectArt();
  }

  function tone(i) {
    return ["sakura", "lilac", "mint", "sky", "gold"][i % 5];
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---------- 生成可下载的 PNG 卡片（纯 canvas，无依赖） ---------- */
  function downloadCard(q) {
    const W = 1080, H = 1350;
    const cv = document.createElement("canvas");
    const dpr = 1;
    cv.width = W * dpr; cv.height = H * dpr;
    const c = cv.getContext("2d");

    // 背景
    const bg = c.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#fbfdff");
    bg.addColorStop(0.45, "#eef5fb");
    bg.addColorStop(1, "#f6f2fb");
    c.fillStyle = bg;
    c.fillRect(0, 0, W, H);

    // 光斑
    const blobs = [
      [140, 190, 300, "rgba(255,179,201,.42)"],
      [930, 330, 260, "rgba(201,182,245,.38)"],
      [250, 1120, 280, "rgba(168,230,213,.34)"],
      [880, 1080, 220, "rgba(169,216,255,.34)"]
    ];
    blobs.forEach(([x, y, r, col]) => {
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, col);
      g.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = g;
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    });

    // 星屑
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * W, y = Math.random() * H, r = Math.random() * 2.4 + 0.6;
      c.fillStyle = "rgba(255,255,255," + (0.4 + Math.random() * 0.55) + ")";
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    }

    // 卡片底
    const pad = 74;
    roundRect(c, pad, pad, W - pad * 2, H - pad * 2, 52);
    c.fillStyle = "rgba(255,255,255,.82)";
    c.fill();
    c.strokeStyle = "rgba(157,189,216,.5)";
    c.lineWidth = 2;
    c.stroke();

    // 月亮
    const moonG = c.createRadialGradient(W / 2 - 30, 300, 10, W / 2, 330, 130);
    moonG.addColorStop(0, "#ffffff");
    moonG.addColorStop(1, "#dceaf6");
    c.fillStyle = moonG;
    c.beginPath(); c.arc(W / 2, 320, 96, 0, Math.PI * 2); c.fill();
    c.fillStyle = "#f7fbfe";
    c.beginPath(); c.arc(W / 2 + 34, 292, 82, 0, Math.PI * 2); c.fill();

    c.textAlign = "center";

    // 顶部小字
    c.fillStyle = "#7b91a6";
    c.font = "600 30px 'Noto Sans SC','Microsoft YaHei',sans-serif";
    c.fillText("祈 小 安 · 每 日 好 句", W / 2, 520);

    // 引号
    c.fillStyle = "rgba(255,179,201,.6)";
    c.font = "800 150px 'Baloo 2','Noto Sans SC',serif";
    c.fillText("\u201C", W / 2 - 330, 700);

    // 正文（自动换行）
    const text = q.text;
    const maxW = W - 300;
    let size = 62;
    let lines = [];
    for (; size >= 40; size -= 2) {
      c.font = "700 " + size + "px 'Noto Sans SC','Baloo 2','Microsoft YaHei',sans-serif";
      lines = wrap(c, text, maxW);
      if (lines.length <= 4) break;
    }
    const lh = size * 1.62;
    const startY = 780 - ((lines.length - 1) * lh) / 2;
    c.fillStyle = "#26384c";
    lines.forEach((ln, i) => c.fillText(ln, W / 2, startY + i * lh));

    // 分隔线
    const dy = startY + lines.length * lh + 44;
    const lg = c.createLinearGradient(W / 2 - 220, 0, W / 2 + 220, 0);
    lg.addColorStop(0, "rgba(157,189,216,0)");
    lg.addColorStop(0.5, "rgba(157,189,216,.9)");
    lg.addColorStop(1, "rgba(157,189,216,0)");
    c.fillStyle = lg;
    c.fillRect(W / 2 - 220, dy, 440, 2);

    // 标签
    c.fillStyle = "#ff8fb1";
    c.font = "600 32px 'Noto Sans SC','Microsoft YaHei',sans-serif";
    c.fillText("# " + q.tag, W / 2, dy + 74);

    // 落款
    c.fillStyle = "#48607a";
    c.font = "600 34px 'Noto Sans SC','Microsoft YaHei',sans-serif";
    c.fillText("—— 祈小安 v1.0.1", W / 2, H - 220);
    c.fillStyle = "#a7b8c8";
    c.font = "500 26px 'Noto Sans SC','Microsoft YaHei',sans-serif";
    c.fillText("私聊特化型 QQ 机器人 · 祈安", W / 2, H - 160);

    const url = cv.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "祈小安-每日好句-" + new Date().toISOString().slice(0, 10) + ".png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.qxaToast && window.qxaToast("好句卡片已经存下来了");
  }

  function wrap(c, text, maxW) {
    const out = [];
    let line = "";
    for (const ch of text) {
      if (ch === "\n") { out.push(line); line = ""; continue; }
      const test = line + ch;
      if (c.measureText(test).width > maxW && line) { out.push(line); line = ch; }
      else line = test;
    }
    if (line) out.push(line);
    return out;
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  document.addEventListener("DOMContentLoaded", () => {
    stage();
    todayStrip();
    wall();
  });
})();
