/* ============================================================
   祈小安 · 内联图形库（零外部图片，离线可用 / 高清不糊）
   - 8 个插件图标
   - 通用界面图标
   - 祈小安形象（大图 / 头像 / Q 版）
   用法：<i data-icon="memory"></i>  <i data-art="girl" data-art-size="320"></i>
   ============================================================ */
(function () {
  "use strict";

  const S = 'xmlns="http://www.w3.org/2000/svg"';

  /* ---------------- 插件图标 ---------------- */
  const ICONS = {
    merge: `<svg ${S} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="7" width="26" height="14" rx="6" fill="#cfe6ff" stroke="#6fb8ff" stroke-width="2"/>
      <rect x="18" y="21" width="26" height="14" rx="6" fill="#e6f1ff" stroke="#6fb8ff" stroke-width="2"/>
      <path d="M16 14h6M31 28h7" stroke="#6fb8ff" stroke-width="2" stroke-linecap="round"/>
      <circle cx="11" cy="14" r="1.8" fill="#6fb8ff"/><circle cx="25" cy="28" r="1.8" fill="#6fb8ff"/>
    </svg>`,
    search: `<svg ${S} viewBox="0 0 48 48" fill="none">
      <circle cx="21" cy="21" r="12" fill="#efe7ff" stroke="#a98ff0" stroke-width="2.4"/>
      <path d="M30 30l9 9" stroke="#a98ff0" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M15 21h12M21 15v12" stroke="#c9b6f5" stroke-width="2" stroke-linecap="round"/>
      <circle cx="36" cy="13" r="5" fill="#c9b6f5" opacity=".55"/>
    </svg>`,
    memory: `<svg ${S} viewBox="0 0 48 48" fill="none">
      <path d="M24 40s-15-9-15-19a9 9 0 0 1 15-6.7A9 9 0 0 1 39 21c0 10-15 19-15 19z"
            fill="#ffe3ec" stroke="#ff8fb1" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M17 20h5l2 3 2-6 2 6 2-3h4" stroke="#ff8fb1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="35" cy="11" r="3" fill="#ffd98e"/>
    </svg>`,
    magic: `<svg ${S} viewBox="0 0 48 48" fill="none">
      <path d="M28 6l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#e0f7f1" stroke="#6fd2bd" stroke-width="2" stroke-linejoin="round"/>
      <path d="M14 26l2.4 5.6L22 34l-5.6 2.4L14 42l-2.4-5.6L6 34l5.6-2.4z" fill="#a8e6d5" opacity=".85"/>
      <circle cx="37" cy="37" r="3.4" fill="#ffd98e" stroke="#f7bd57" stroke-width="1.6"/>
    </svg>`,
    heart: `<svg ${S} viewBox="0 0 48 48" fill="none">
      <path d="M24 41C10 32 5 25 5 18.5A9.5 9.5 0 0 1 24 14a9.5 9.5 0 0 1 19 4.5C43 25 38 32 24 41z"
            fill="#fff4dc" stroke="#f7bd57" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M12 22a8 8 0 0 1 8-6" stroke="#f7bd57" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      <circle cx="24" cy="24" r="3" fill="#ffb3c9"/>
    </svg>`,
    undo: `<svg ${S} viewBox="0 0 48 48" fill="none">
      <path d="M14 18H29a11 11 0 0 1 0 22h-9" stroke="#6fb8ff" stroke-width="3" stroke-linecap="round"/>
      <path d="M19 11l-7 7 7 7" stroke="#6fb8ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="24" y="7" width="18" height="12" rx="4" fill="#e2f1ff" stroke="#6fb8ff" stroke-width="1.8"/>
      <path d="M29 13h8" stroke="#6fb8ff" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    eraser: `<svg ${S} viewBox="0 0 48 48" fill="none">
      <rect x="12" y="8" width="24" height="10" rx="4" fill="#d9f2ec" stroke="#6fd2bd" stroke-width="2"/>
      <rect x="12" y="21" width="24" height="10" rx="4" fill="#eef4f8" stroke="#9dbdd8" stroke-width="2" stroke-dasharray="4 3"/>
      <path d="M8 38h32" stroke="#9dbdd8" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M16 38l6-5 6 5" stroke="#6fd2bd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    sticker: `<svg ${S} viewBox="0 0 48 48" fill="none">
      <path d="M24 5c11 0 19 7.6 19 18 0 9.4-7.6 19-19 19-11 0-19-9.4-19-19C5 12.6 13 5 24 5z" fill="#ffe3ec" stroke="#ff8fb1" stroke-width="2.2"/>
      <circle cx="17" cy="21" r="2.6" fill="#26384c"/><circle cx="31" cy="21" r="2.6" fill="#26384c"/>
      <path d="M18 30c3.4 3.6 8.6 3.6 12 0" stroke="#ff8fb1" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M40 15l3.2 6.4L50 24" stroke="#ffd98e" stroke-width="0" fill="none"/>
      <circle cx="41" cy="12" r="3.2" fill="#ffd98e"/>
    </svg>`,

    /* --- 界面图标 --- */
    home: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M4 10.6 12 4l8 6.6V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
    user: `<svg ${S} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8.4" r="3.6" stroke="currentColor" stroke-width="1.7"/><path d="M4.8 20c.9-3.7 3.8-5.6 7.2-5.6s6.3 1.9 7.2 5.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    plug: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M9 3v5M15 3v5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M6 8h12v3.5a6 6 0 0 1-6 6 6 6 0 0 1-6-6z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 17.5V21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    chat: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-5 4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
    brain: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M12 5.6C10.6 3.9 8.9 3.3 7.4 4.1 5.9 4.9 5.4 6.6 5.8 8.2 4.5 9 4 10.6 4.6 12c.4 1 1.3 1.6 2.3 1.8-.2 1.7.7 3.2 2.3 3.5 1.4.3 2.4-.3 2.8-1.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 5.6c1.4-1.7 3.1-2.3 4.6-1.5 1.5.8 2 2.5 1.6 4.1 1.3.8 1.8 2.4 1.2 3.8-.4 1-1.3 1.6-2.3 1.8.2 1.7-.7 3.2-2.3 3.5-1.4.3-2.4-.3-2.8-1.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    shield: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 12l2.2 2.2L15.5 10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    sparkle: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M12 3l2 5.4 5.4 2-5.4 2-2 5.4-2-5.4-5.4-2 5.4-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    quote: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M9.5 6C6.9 7.2 5.5 9.4 5.5 12.4V18h5.2v-5.4H8.2c0-1.9.7-3.2 2.3-4zM19 6c-2.6 1.2-4 3.4-4 6.4V18h5.2v-5.4h-2.5c0-1.9.7-3.2 2.3-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    mail: `<svg ${S} viewBox="0 0 24 24" fill="none"><rect x="3" y="5.5" width="18" height="13" rx="2.6" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 8 12 13l7.5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    copy: `<svg ${S} viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2.4" stroke="currentColor" stroke-width="1.7"/><path d="M15 5.5A2 2 0 0 0 13 4H6a2 2 0 0 0-2 2v7a2 2 0 0 0 1.5 1.9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    refresh: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M20 12a8 8 0 1 1-2.4-5.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M20 4.5V10h-5.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    down: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M12 4v11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7.5 11.5 12 16l4.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19.5h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    up: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M12 19V6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M6.5 11 12 5.5 17.5 11" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    moon: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
    sun: `<svg ${S} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    clock: `<svg ${S} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.6V12l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    users: `<svg ${S} viewBox="0 0 24 24" fill="none"><circle cx="9.5" cy="8.5" r="3.2" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 19c.8-3.2 3.2-4.8 6-4.8s5.2 1.6 6 4.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16 5.8a3 3 0 0 1 0 5.4M17.5 19c-.2-1.6-.8-2.9-1.7-3.8 2.6.2 4.3 1.9 4.7 3.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    tag: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M12.6 3.6H20V11l-8.6 8.6a2 2 0 0 1-2.8 0L3.8 14.8a2 2 0 0 1 0-2.8z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="16.4" cy="7.6" r="1.5" fill="currentColor"/></svg>`,
    lock: `<svg ${S} viewBox="0 0 24 24" fill="none"><rect x="4.5" y="10" width="15" height="10" rx="2.6" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 10V7.8a3.5 3.5 0 0 1 7 0V10" stroke="currentColor" stroke-width="1.7"/></svg>`,
    star: `<svg ${S} viewBox="0 0 24 24" fill="none"><path d="M12 3.6l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.9l6.1-.7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    play: `<svg ${S} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.4" stroke="currentColor" stroke-width="1.7"/><path d="M10.4 9.2 15 12l-4.6 2.8z" fill="currentColor"/></svg>`
  };

  /* ---------------- 祈小安形象 ---------------- */
  const ART = {
    /* 主形象：半身像，月白 × 樱花 × 紫罗兰 */
    girl: `<svg ${S} viewBox="0 0 320 380" fill="none">
      <defs>
        <linearGradient id="qHair" x1="40" y1="30" x2="280" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#eaf0ff"/><stop offset=".45" stop-color="#dcd0f7"/><stop offset="1" stop-color="#c3b3ee"/>
        </linearGradient>
        <linearGradient id="qHairBack" x1="60" y1="40" x2="260" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#cfc2ef"/><stop offset="1" stop-color="#a58fe0"/>
        </linearGradient>
        <linearGradient id="qSkin" x1="120" y1="120" x2="200" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff6f1"/><stop offset="1" stop-color="#ffe4dc"/>
        </linearGradient>
        <linearGradient id="qCloth" x1="90" y1="250" x2="240" y2="370" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e3edf8"/>
        </linearGradient>
        <radialGradient id="qBlush" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#ffb3c9" stop-opacity=".85"/><stop offset="1" stop-color="#ffb3c9" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="qEye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7fb6e8"/><stop offset=".55" stop-color="#5f8fd6"/><stop offset="1" stop-color="#4a6fc0"/>
        </linearGradient>
      </defs>

      <!-- 后发 -->
      <path d="M160 34c-58 0-96 40-98 96-2 52 8 104 26 150 8 20 24 34 46 40-14-46-18-96-14-150 3-42 20-64 40-72 20 8 37 30 40 72 4 54 0 104-14 150 22-6 38-20 46-40 18-46 28-98 26-150-2-56-40-96-98-96z"
            fill="url(#qHairBack)"/>
      <!-- 身体 -->
      <path d="M160 236c-42 0-76 20-88 54-5 14-7 30-8 50h192c-1-20-3-36-8-50-12-34-46-54-88-54z" fill="url(#qCloth)"/>
      <path d="M160 236c-14 0-27 2-38 7l38 44 38-44c-11-5-24-7-38-7z" fill="#ffffff"/>
      <!-- 领结 -->
      <path d="M146 268h28l-6 12 6 12h-28l6-12z" fill="#ffb3c9"/>
      <circle cx="160" cy="286" r="6" fill="#ff8fb1"/>
      <!-- 脖子 -->
      <path d="M142 208h36v34c0 8-8 14-18 14s-18-6-18-14z" fill="#f7d8cf"/>
      <!-- 脸 -->
      <path d="M160 68c-40 0-68 28-68 68 0 46 30 88 68 88s68-42 68-88c0-40-28-68-68-68z" fill="url(#qSkin)"/>
      <!-- 耳朵 -->
      <ellipse cx="93" cy="160" rx="8" ry="13" fill="#ffe4dc"/><ellipse cx="227" cy="160" rx="8" ry="13" fill="#ffe4dc"/>
      <!-- 前发 -->
      <path d="M160 60c-46 0-74 32-74 76 0 8 1 15 3 22 4-30 18-48 34-56 6 12 16 20 28 22-6-12-6-24-2-32 14 14 38 22 62 20 8 6 12 20 14 46 2-7 3-14 3-22 0-44-28-76-68-76z"
            fill="url(#qHair)"/>
      <!-- 呆毛 -->
      <path d="M168 46c8-14 22-20 34-14-10 2-16 10-16 20-4-4-12-6-18-6z" fill="url(#qHair)"/>
      <!-- 猫耳发夹 -->
      <path d="M104 96l-4-22 20 12z" fill="#ffb3c9"/><path d="M104 96l-4-22 20 12z" fill="#ffffff" opacity=".35"/>
      <path d="M212 88l8-22 12 20z" fill="#ffb3c9"/><path d="M212 88l8-22 12 20z" fill="#ffffff" opacity=".3"/>
      <!-- 眼睛 -->
      <ellipse cx="130" cy="164" rx="16" ry="18" fill="#ffffff"/>
      <ellipse cx="190" cy="164" rx="16" ry="18" fill="#ffffff"/>
      <ellipse cx="131" cy="166" rx="11" ry="14" fill="url(#qEye)"/>
      <ellipse cx="189" cy="166" rx="11" ry="14" fill="url(#qEye)"/>
      <circle cx="135" cy="171" r="4.6" fill="#ffffff" opacity=".92"/>
      <circle cx="193" cy="171" r="4.6" fill="#ffffff" opacity=".92"/>
      <circle cx="127" cy="159" r="2.4" fill="#ffffff" opacity=".8"/>
      <circle cx="185" cy="159" r="2.4" fill="#ffffff" opacity=".8"/>
      <!-- 上睫毛 -->
      <path d="M114 152c6-8 22-10 30-2" stroke="#5b5a80" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M176 150c8-8 24-6 30 2" stroke="#5b5a80" stroke-width="3.4" stroke-linecap="round"/>
      <!-- 腮红 -->
      <ellipse cx="112" cy="186" rx="16" ry="10" fill="url(#qBlush)"/>
      <ellipse cx="208" cy="186" rx="16" ry="10" fill="url(#qBlush)"/>
      <!-- 嘴 -->
      <path d="M155 192c3 4 7 4 10 0" stroke="#e08b95" stroke-width="2.6" stroke-linecap="round"/>
      <!-- 星形发饰 -->
      <path d="M246 128l3.4 7.6 8.2 1-6 5.6 1.6 8-7.2-4-7.2 4 1.6-8-6-5.6 8.2-1z" fill="#ffd98e"/>
      <circle cx="62" cy="120" r="5" fill="#a8e6d5"/>
      <circle cx="272" cy="196" r="4" fill="#ffb3c9"/>
    </svg>`,

    /* 头像（方形裁切用，圆形也好看） */
    avatar: `<svg ${S} viewBox="0 0 320 320" fill="none">
      <defs>
        <linearGradient id="aHair" x1="60" y1="20" x2="270" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f2f0ff"/><stop offset=".5" stop-color="#ddd2f8"/><stop offset="1" stop-color="#c0afee"/>
        </linearGradient>
        <linearGradient id="aSkin" x1="120" y1="120" x2="200" y2="270" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff8f4"/><stop offset="1" stop-color="#ffe4dc"/>
        </linearGradient>
        <radialGradient id="aBlush" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#ffb3c9" stop-opacity=".9"/><stop offset="1" stop-color="#ffb3c9" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="aEye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8cc0ee"/><stop offset="1" stop-color="#4a6fc0"/>
        </linearGradient>
      </defs>
      <circle cx="160" cy="160" r="160" fill="#f4f8fc"/>
      <path d="M160 40c-62 0-104 42-106 104-2 54 10 106 30 152h152c20-46 32-98 30-152-2-62-44-104-106-104z" fill="url(#aHair)"/>
      <path d="M160 66c-44 0-74 30-74 74 0 50 32 94 74 94s74-44 74-94c0-44-30-74-74-74z" fill="url(#aSkin)"/>
      <path d="M160 56c-50 0-80 34-80 82 0 9 1 17 4 25 4-32 20-52 38-60 6 13 17 21 30 23-6-13-6-26-2-34 15 15 41 23 66 21 9 7 13 22 15 50 3-8 4-16 4-25 0-48-25-82-75-82z" fill="url(#aHair)"/>
      <path d="M170 40c10-16 26-22 40-15-12 2-19 11-19 22-5-5-14-7-21-7z" fill="url(#aHair)"/>
      <path d="M98 92l-5-24 22 13z" fill="#ffb3c9"/>
      <path d="M220 84l9-24 13 22z" fill="#ffb3c9"/>
      <ellipse cx="128" cy="176" rx="17" ry="19" fill="#fff"/>
      <ellipse cx="192" cy="176" rx="17" ry="19" fill="#fff"/>
      <ellipse cx="129" cy="178" rx="12" ry="15" fill="url(#aEye)"/>
      <ellipse cx="191" cy="178" rx="12" ry="15" fill="url(#aEye)"/>
      <circle cx="133" cy="183" r="5" fill="#fff" opacity=".92"/>
      <circle cx="195" cy="183" r="5" fill="#fff" opacity=".92"/>
      <path d="M110 162c7-9 24-11 33-2" stroke="#5b5a80" stroke-width="3.6" stroke-linecap="round"/>
      <path d="M177 160c9-9 26-7 33 2" stroke="#5b5a80" stroke-width="3.6" stroke-linecap="round"/>
      <ellipse cx="108" cy="200" rx="17" ry="11" fill="url(#aBlush)"/>
      <ellipse cx="212" cy="200" rx="17" ry="11" fill="url(#aBlush)"/>
      <path d="M154 204c4 5 8 5 12 0" stroke="#e08b95" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M244 132l3.6 8 8.6 1.1-6.3 5.9 1.7 8.4-7.6-4.2-7.6 4.2 1.7-8.4-6.3-5.9 8.6-1.1z" fill="#ffd98e"/>
    </svg>`,

    /* Q 版小图标（用于装饰、列表） */
    chibi: `<svg ${S} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="cHair" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f0eeff"/><stop offset="1" stop-color="#c7b8f0"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="#f2f7fc"/>
      <path d="M60 16c-24 0-40 16-40 40 0 22 6 42 14 54h52c8-12 14-32 14-54 0-24-16-40-40-40z" fill="url(#cHair)"/>
      <path d="M60 26c-17 0-28 12-28 28 0 19 12 36 28 36s28-17 28-36c0-16-11-28-28-28z" fill="#fff6f1"/>
      <path d="M60 20c-19 0-30 13-30 31 0 4 0 7 1 10 2-12 8-20 15-23 2 5 7 8 12 9-2-5-2-10-1-13 6 6 16 9 25 8 3 3 5 9 6 19 1-3 1-6 1-10 0-18-11-31-29-31z" fill="url(#cHair)"/>
      <ellipse cx="48" cy="62" rx="7" ry="8" fill="#fff"/><ellipse cx="72" cy="62" rx="7" ry="8" fill="#fff"/>
      <ellipse cx="48" cy="63" rx="5" ry="6.4" fill="#5f8fd6"/><ellipse cx="72" cy="63" rx="5" ry="6.4" fill="#5f8fd6"/>
      <circle cx="50" cy="65" r="2" fill="#fff"/><circle cx="74" cy="65" r="2" fill="#fff"/>
      <ellipse cx="40" cy="72" rx="7" ry="4.4" fill="#ffb3c9" opacity=".6"/>
      <ellipse cx="80" cy="72" rx="7" ry="4.4" fill="#ffb3c9" opacity=".6"/>
      <path d="M56 74c2.6 3 5.4 3 8 0" stroke="#e08b95" stroke-width="2" stroke-linecap="round"/>
      <path d="M86 40l2.6 5.8 6.4.8-4.7 4.4 1.2 6.2-5.5-3.1-5.5 3.1 1.2-6.2-4.7-4.4 6.4-.8z" fill="#ffd98e"/>
    </svg>`,

    /* 装饰：月亮 */
    moonish: `<svg ${S} viewBox="0 0 120 120" fill="none">
      <defs><radialGradient id="mMoon" cx=".35" cy=".3" r=".8">
        <stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef6fd"/><stop offset="1" stop-color="#cfe1f0"/>
      </radialGradient></defs>
      <circle cx="60" cy="60" r="34" fill="url(#mMoon)"/>
      <circle cx="74" cy="48" r="30" fill="#f7fbfe" opacity=".92"/>
      <circle cx="46" cy="76" r="3" fill="#d3e3ef"/><circle cx="60" cy="84" r="2" fill="#d3e3ef"/>
      <path d="M92 30l2.4 5.4 5.8.7-4.3 4 1.1 5.7-5-2.8-5 2.8 1.1-5.7-4.3-4 5.8-.7z" fill="#ffd98e"/>
      <circle cx="28" cy="34" r="3.4" fill="#ffb3c9"/><circle cx="24" cy="90" r="2.6" fill="#a8e6d5"/>
    </svg>`,

    /* 装饰：聊天气泡对 */
    bubbles: `<svg ${S} viewBox="0 0 160 120" fill="none">
      <rect x="8" y="14" width="92" height="34" rx="16" fill="#e2f1ff" stroke="#6fb8ff" stroke-width="2"/>
      <path d="M30 48l-4 14 16-14z" fill="#e2f1ff" stroke="#6fb8ff" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="34" cy="31" r="3" fill="#6fb8ff"/><circle cx="54" cy="31" r="3" fill="#6fb8ff"/><circle cx="74" cy="31" r="3" fill="#6fb8ff"/>
      <rect x="56" y="64" width="94" height="34" rx="16" fill="#ffe3ec" stroke="#ff8fb1" stroke-width="2"/>
      <path d="M126 98l6 14-18-14z" fill="#ffe3ec" stroke="#ff8fb1" stroke-width="2" stroke-linejoin="round"/>
      <path d="M74 81h56" stroke="#ff8fb1" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <path d="M74 90h34" stroke="#ff8fb1" stroke-width="3" stroke-linecap="round" opacity=".45"/>
    </svg>`,

    /* 装饰：记忆方块 */
    blocks: `<svg ${S} viewBox="0 0 140 120" fill="none">
      <rect x="10" y="40" width="44" height="44" rx="12" fill="#ffe3ec" stroke="#ff8fb1" stroke-width="2"/>
      <rect x="62" y="20" width="44" height="44" rx="12" fill="#ece4ff" stroke="#a98ff0" stroke-width="2"/>
      <rect x="84" y="70" width="44" height="44" rx="12" fill="#e0f7f1" stroke="#6fd2bd" stroke-width="2"/>
      <path d="M32 62h30M84 42v22" stroke="#9dbdd8" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="32" cy="62" r="4" fill="#ff8fb1"/><circle cx="84" cy="42" r="4" fill="#a98ff0"/><circle cx="106" cy="92" r="4" fill="#6fd2bd"/>
    </svg>`,

    /* 装饰：星屑 */
    stars: `<svg ${S} viewBox="0 0 120 120" fill="none">
      <path d="M60 12l5.4 13.2L78 30l-12.6 4.8L60 48l-5.4-13.2L42 30l12.6-4.8z" fill="#ffd98e"/>
      <path d="M26 66l3.6 8.8L38 78l-8.4 3.2L26 90l-3.6-8.8L14 78l8.4-3.2z" fill="#ffb3c9"/>
      <path d="M92 70l3 7.4 7.4 2.6-7.4 2.6-3 7.4-3-7.4-7.4-2.6 7.4-2.6z" fill="#c9b6f5"/>
    </svg>`
  };

  /* ---------------- 注入 ---------------- */
  function inject() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      const k = el.getAttribute("data-icon");
      if (ICONS[k] && !el.dataset.iconDone) {
        el.innerHTML = ICONS[k];
        el.dataset.iconDone = "1";
        el.style.display = "inline-flex";
      }
    });
    document.querySelectorAll("[data-art]").forEach((el) => {
      const k = el.getAttribute("data-art");
      if (ART[k] && !el.dataset.artDone) {
        el.innerHTML = ART[k];
        el.dataset.artDone = "1";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", inject);
  window.qxaInjectArt = inject;
  window.QXA_ICONS = ICONS;
  window.QXA_ART = ART;

  /* 人物图片缺失时的兜底：换成月白占位图，不留裂图 */
  const PH = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">' +
    '<defs><radialGradient id="g" cx=".35" cy=".3" r=".85">' +
    '<stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef6fd"/><stop offset="1" stop-color="#d3e3ef"/>' +
    "</radialGradient></defs>" +
    '<rect width="320" height="320" fill="#f7fafc"/>' +
    '<circle cx="160" cy="160" r="120" fill="url(#g)"/>' +
    '<circle cx="196" cy="128" r="96" fill="#fbfdff" opacity=".92"/>' +
    '<text x="160" y="176" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#7b91a6">祈小安</text>' +
    '<text x="160" y="208" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#a7b8c8">立绘待放入 assets/img</text>' +
    "</svg>"
  );

  function guardImages() {
    document.querySelectorAll("img").forEach((img) => {
      if (img.dataset.guarded) return;
      img.dataset.guarded = "1";
      img.addEventListener("error", function once() {
        if (img.src === PH) return;
        img.src = PH;
        img.classList.add("img-fallback");
        img.alt = "祈小安 · 立绘待放入 assets/img/qixiaoan.jpg";
      }, { once: true });
    });
  }

  document.addEventListener("DOMContentLoaded", guardImages);
  window.qxaGuardImages = guardImages;
})();
