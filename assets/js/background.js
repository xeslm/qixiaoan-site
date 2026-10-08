/* ============================================================
   祈小安 · 背景层
   1) 星屑 / 花瓣 canvas   2) 鼠标光晕   3) 滚动进度
   全部零依赖，离线可用
   ============================================================ */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. canvas 粒子 ---------- */
  function initCanvas() {
    const cv = document.getElementById("bg-canvas");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, dpr = 1;
    let particles = [], stars = [], shooting = [];

    const PETAL_COLORS = [
      "rgba(255, 179, 201, .85)",
      "rgba(201, 182, 245, .8)",
      "rgba(168, 230, 213, .8)",
      "rgba(255, 217, 142, .8)"
    ];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = Math.floor(window.innerWidth * dpr);
      H = cv.height = Math.floor(window.innerHeight * dpr);
      cv.style.width = window.innerWidth + "px";
      cv.style.height = window.innerHeight + "px";
      build();
    }

    function build() {
      const area = (W * H) / (dpr * dpr);
      const starCount = Math.min(150, Math.round(area / 14000));
      const petalCount = Math.min(34, Math.round(area / 52000));

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: (Math.random() * 1.5 + 0.5) * dpr,
        a: Math.random() * Math.PI * 2,
        sp: 0.004 + Math.random() * 0.02
      }));

      particles = Array.from({ length: petalCount }, () => petal());
    }

    function petal() {
      return {
        x: Math.random() * W,
        y: Math.random() * H - H,
        s: (Math.random() * 7 + 5) * dpr,
        vy: (Math.random() * 0.5 + 0.28) * dpr,
        vx: (Math.random() - 0.5) * 0.5 * dpr,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.03,
        sway: Math.random() * Math.PI * 2,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        alpha: 0.3 + Math.random() * 0.45
      };
    }

    function spawnShooting() {
      if (reduced || shooting.length > 2) return;
      shooting.push({
        x: Math.random() * W * 0.8,
        y: Math.random() * H * 0.4,
        len: (120 + Math.random() * 140) * dpr,
        sp: (7 + Math.random() * 6) * dpr,
        life: 1
      });
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      // 花瓣：两段贝塞尔构成的尖角椭圆
      ctx.moveTo(0, -p.s * 0.5);
      ctx.bezierCurveTo(p.s * 0.62, -p.s * 0.2, p.s * 0.42, p.s * 0.5, 0, p.s * 0.55);
      ctx.bezierCurveTo(-p.s * 0.42, p.s * 0.5, -p.s * 0.62, -p.s * 0.2, 0, -p.s * 0.5);
      ctx.fill();
      ctx.restore();
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      // 星屑
      for (const s of stars) {
        s.a += s.sp;
        const tw = 0.35 + Math.abs(Math.sin(s.a)) * 0.65;
        ctx.globalAlpha = tw * 0.7;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.4 * dpr) {
          ctx.globalAlpha = tw * 0.34;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 花瓣
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.sway += 0.012;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.sway) * 0.42 * dpr;
        p.rot += p.vr;
        if (p.y > H + 40) particles[i] = petal();
        drawPetal(p);
      }

      // 流星
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i];
        m.x += m.sp;
        m.y += m.sp * 0.42;
        m.life -= 0.012;
        const g = ctx.createLinearGradient(m.x - m.len, m.y - m.len * 0.42, m.x, m.y);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(1, "rgba(255,179,201," + Math.max(0, m.life) + ")");
        ctx.globalAlpha = Math.max(0, m.life) * 0.9;
        ctx.strokeStyle = g;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(m.x - m.len, m.y - m.len * 0.42);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        if (m.life <= 0 || m.x > W + 60) shooting.splice(i, 1);
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize, { passive: true });
    resize();
    if (!reduced) {
      frame();
      setInterval(spawnShooting, 5200);
    }
  }

  /* ---------- 2. 鼠标光晕 ---------- */
  function initCursor() {
    if (window.matchMedia("(hover: none)").matches) return;
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.append(glow, dot);

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let gx = tx, gy = ty, dx = tx, dy = ty, raf = null;

    function loop() {
      gx += (tx - gx) * 0.11;
      gy += (ty - gy) * 0.11;
      dx += (tx - dx) * 0.34;
      dy += (ty - dy) * 0.34;
      glow.style.transform = "translate3d(" + gx + "px," + gy + "px,0)";
      dot.style.transform = "translate3d(" + dx + "px," + dy + "px,0" +
        (document.body.classList.contains("cursor-hover") ? " scale(2.6)" : "");
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      document.body.classList.add("cursor-active");
      if (!raf) loop();
    }, { passive: true });

    document.addEventListener("pointerover", (e) => {
      const hot = e.target.closest("a, button, .card, .tile, .nav-item, .quote-stage, .filter-btn, .word");
      document.body.classList.toggle("cursor-hover", !!hot);
    }, { passive: true });

    document.addEventListener("pointerleave", () => document.body.classList.remove("cursor-active"));
  }

  /* ---------- 3. 滚动进度 + 回顶按钮 ---------- */
  function initScrollUI() {
    const bar = document.querySelector(".scroll-progress");
    const top = document.querySelector(".to-top");
    let ticking = false;

    function update() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (bar) bar.style.width = pct.toFixed(2) + "%";
      if (top) top.classList.toggle("show", window.scrollY > 420);
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });

    if (top) top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCanvas();
    initCursor();
    initScrollUI();
  });
})();
