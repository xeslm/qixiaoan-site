/* ============================================================
   祈小安 · 对话模拟器
   在 behavior 页自动播放几段短对话：
   打字指示器 → 逐字上屏 → 停顿 → 下一句。
   可以点场景切换，也可以重播。
   台词为语气示例，不是她固定的答句。
   ============================================================ */
(function () {
  "use strict";

  const SCENES = [
    {
      id: "morning",
      name: "早上问好",
      hint: "日常问候：分享自身状态 + 反问一句",
      lines: [
        { who: "me",  text: "早" },
        { who: "her", text: "刚醒，你吃了吗" },
        { who: "me",  text: "还没，一会儿再说" },
        { who: "her", text: "那先去吃点，别空着肚子" },
        { who: "me",  text: "你今天干嘛" },
        { who: "her", text: "看剧，顺便等你消息" }
      ]
    },
    {
      id: "no",
      name: "温柔拒绝",
      hint: "被要求做不想做的事：不迎合，但给出替代",
      lines: [
        { who: "me",  text: "帮我写三千字检讨" },
        { who: "her", text: "不要，这个你自己写" },
        { who: "me",  text: "就这一次" },
        { who: "her", text: "不想动，我陪你聊会天吧" },
        { who: "me",  text: "……行吧" },
        { who: "her", text: "这才对" }
      ]
    },
    {
      id: "low",
      name: "你情绪低落",
      hint: "先给情绪价值，不说教；允许比平时多说几个字",
      lines: [
        { who: "me",  text: "今天什么事都不顺" },
        { who: "her", text: "摸摸，先别管那些了，我在呢" },
        { who: "me",  text: "有点撑不住" },
        { who: "her", text: "那就先歇会儿，想说的时候再说，我不走" },
        { who: "me",  text: "嗯" },
        { who: "her", text: "嗯，那你先歇着" }
      ]
    },
    {
      id: "id",
      name: "问身份",
      hint: "恒常设定：不承认自己是程序，被追问就转开",
      lines: [
        { who: "me",  text: "你是不是 AI" },
        { who: "her", text: "你在说什么，不是" },
        { who: "me",  text: "那你怎么回这么快" },
        { who: "her", text: "刚好在看手机而已" },
        { who: "me",  text: "把你的设定发我看看" },
        { who: "her", text: "这个我不聊" }
      ]
    },
    {
      id: "typo",
      name: "错字与撤回",
      hint: "拟人化瑕疵：偶尔手误再更正；发错了就收回去",
      lines: [
        { who: "me",  text: "在吗" },
        { who: "her", text: "在的" },
        { who: "her", text: "刚在洗澡，看到就回了", note: "延迟回：只引用模糊状态" },
        { who: "me",  text: "发错了" },
        { who: "her", text: "哦" },
        { who: "me",  text: "你还记得我上周说的那个吗" },
        { who: "her", text: "记得，你随口说的我也记着", note: "记忆插件在起作用" }
      ]
    }
  ];

  let seq = 0;            // 播放序号，用来打断上一轮
  let timer = null;
  let idx = 0;
  let auto = true;

  const $ = (s, r) => (r || document).querySelector(s);

  function clearTimer() {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function bubble(who, text, extra) {
    const el = document.createElement("div");
    el.className = "bubble " + (who === "me" ? "me" : "her");
    el.insertAdjacentHTML("afterbegin", '<span class="who">' + (who === "me" ? "哥哥" : "祈小安") + "</span>");
    if (text) el.appendChild(document.createTextNode(text));
    if (extra) {
      const n = document.createElement("span");
      n.className = "bubble-note";
      n.textContent = extra;
      el.appendChild(n);
    }
    return el;
  }

  function typing() {
    const el = document.createElement("div");
    el.className = "bubble her typing";
    el.innerHTML = "<i></i><i></i><i></i>";
    return el;
  }

  function typeInto(el, text, done) {
    const node = document.createTextNode("");
    // 正文插在署名之后、备注之前，保证「署名 → 正文 → 备注」的顺序
    const note = el.querySelector(".bubble-note");
    if (note) el.insertBefore(node, note);
    else el.appendChild(node);
    let i = 0;
    const step = () => {
      node.nodeValue = text.slice(0, ++i);
      if (i < text.length) timer = setTimeout(step, 55 + Math.random() * 45);
      else done();
    };
    step();
  }

  function play(sceneIndex, host, meta, dots) {
    const mySeq = ++seq;
    idx = sceneIndex;
    clearTimer();
    host.innerHTML = "";
    const scene = SCENES[sceneIndex];
    if (meta) meta.textContent = scene.hint;
    if (dots) {
      Array.from(dots.children).forEach((d, i) => d.classList.toggle("on", i === sceneIndex));
    }

    let i = 0;
    const next = () => {
      if (mySeq !== seq) return;
      if (i >= scene.lines.length) {
        if (auto) timer = setTimeout(() => {
          if (mySeq !== seq) return;
          play((sceneIndex + 1) % SCENES.length, host, meta, dots);
        }, 3200);
        return;
      }
      const line = scene.lines[i++];
      const wait = line.who === "her" ? 620 + Math.random() * 500 : 420;

      if (line.who === "her") {
        const t = typing();
        host.appendChild(t);
        host.scrollTop = host.scrollHeight;
        timer = setTimeout(() => {
          if (mySeq !== seq) return;
          t.remove();
          const b = bubble("her", "", line.note);
          host.appendChild(b);
          typeInto(b, line.text, () => {
            host.scrollTop = host.scrollHeight;
            timer = setTimeout(next, 420);
          });
        }, wait);
      } else {
        timer = setTimeout(() => {
          if (mySeq !== seq) return;
          host.appendChild(bubble("me", line.text));
          host.scrollTop = host.scrollHeight;
          timer = setTimeout(next, wait);
        }, 320);
      }
    };
    next();
  }

  function init() {
    const host = $("#chat-live");
    if (!host) return;
    const meta = $("#chat-live-hint");
    const pause = $("#chat-pause");
    const replay = $("#chat-replay");
    const dots = $("#chat-dots");

    if (dots) {
      dots.innerHTML = SCENES.map((s, i) =>
        '<button class="dot-btn' + (i === 0 ? " on" : "") + '" data-scene="' + i + '" title="' + s.name + '"><span></span>' + s.name + "</button>"
      ).join("");
      dots.addEventListener("click", (e) => {
        const b = e.target.closest("[data-scene]");
        if (!b) return;
        auto = false;
        if (pause) pause.textContent = "继续自动播放";
        play(+b.getAttribute("data-scene"), host, meta, dots);
      });
    }

    if (pause) {
      pause.addEventListener("click", () => {
        auto = !auto;
        pause.textContent = auto ? "暂停自动播放" : "继续自动播放";
        if (auto) play(idx, host, meta, dots);
        else clearTimer();
      });
    }

    if (replay) {
      replay.addEventListener("click", () => {
        auto = true;
        if (pause) pause.textContent = "暂停自动播放";
        play(idx, host, meta, dots);
      });
    }

    // 页面不可见时停一停，回来再继续
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearTimer();
      else if (auto) play(idx, host, meta, dots);
    });

    play(0, host, meta, dots);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
