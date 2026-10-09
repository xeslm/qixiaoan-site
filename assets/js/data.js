/* ============================================================
   祈小安 · 站点数据层
   改文案只需要动这个文件，不用碰 HTML / CSS
   全局暴露：window.QXA
   ------------------------------------------------------------
   插件字段说明：
     tagline  一句话定位（她为什么需要它）
     what     这个插件是干什么的（人话，别搬仓库原文）
     points   3~5 条特点，讲「对她意味着什么」而不是配置项
     repo     出处（作者 / 仓库），用于署名
   ============================================================ */
(function () {
  "use strict";

  const PLUGINS = [
    {
      id: "merger",
      name: "消息防抖动",
      alias: "message_merger",
      version: "2.9.1",
      repo: "ahuai114514 / astrbot_plugin_message_merger",
      tone: "sky",
      icon: "merge",
      tagline: "你还没说完，她就先等一等",
      what: "私聊里人常常一句话拆成好几条发。这个插件负责把连着的几句话收在一起，让她按「一整段意思」来理解，而不是对着半句话就开始回答。",
      points: [
        "你连发几条时，她等你说完再一起回应",
        "不同人的消息不会混在一起，群里也各管各的",
        "图片、文件这类内容不参与合并，只有文字会被收拢",
        "她不会因此变慢——第一条消息照常立刻处理"
      ]
    },
    {
      id: "websearch",
      name: "DeepSeek 原生联网搜索",
      alias: "deepseek_web_search",
      version: "1.1.0",
      repo: "SkyL3gend / astrbot_plugin_deepseek_search",
      tone: "lilac",
      icon: "search",
      tagline: "不懂的事，先去查一查再开口",
      what: "给她接上联网查资料的能力。聊到最新的事、她不知道的东西时，她自己会去搜，再把结果用平常说话的方式讲给你听。",
      points: [
        "由她自己判断要不要查，不需要你手动触发",
        "问到新闻、新番、赛事、最近发生的事时最有用",
        "查完是「转述」，不会甩一堆链接给你",
        "每一次搜索都会额外花钱，所以只在需要时才用"
      ]
    },
    {
      id: "memory",
      name: "我会牢牢记住你",
      alias: "memory_companion",
      version: "1.10.5",
      repo: "menglimi / astrbot_plugin_memory_companion",
      tone: "sakura",
      icon: "memory",
      tagline: "你说的每一句关于你自己的话，我都收着",
      what: "她记事的地方。负责记住你是谁、你的偏好、你们约好的事，以及什么时候该把哪件事想起来。聊天再久，她也不会把你当成刚认识的人。",
      points: [
        "关于你的事实会稳定保留，不靠她临场发挥",
        "隔天、隔周回来，还能接上之前的话题",
        "重要的事记得牢，琐碎的会慢慢淡掉",
        "私聊的内容默认不会被带到别的对话里",
        "她可以主动去「翻」以前聊过的事"
      ]
    },
    {
      id: "outputpro",
      name: "输出增强",
      alias: "outputpro",
      version: "2.2.7",
      repo: "Zhalslar / astrbot_plugin_outputpro",
      tone: "mint",
      icon: "magic",
      tagline: "让一句话看起来像人打的，而不是机器吐的",
      what: "她开口之前的最后一道工序。打理排版、控制分段、决定要不要引用你、偶尔模拟一下打错字，让回复有手打的感觉。她人设里那条「不换行、不写小作文」的规矩，主要就靠它落地。",
      points: [
        "超出长度的回复会拆成几条发，像人连发消息那样",
        "自动清掉多余空行和奇怪符号，不会露出一堆格式残留",
        "偶尔手误再补一句更正，不是每次都完美",
        "可以把你之前那句话引用起来再回答",
        "配了语音就能把回复变成语音条"
      ]
    },
    {
      id: "companion",
      name: "我会永远陪着你",
      alias: "private_companion",
      version: "6.5.6",
      repo: "menglimi / astrbot_plugin_private_companion",
      tone: "gold",
      icon: "heart",
      tagline: "她的生活、情绪和主动开口，都归它管",
      what: "她的「在不在场」。这个插件让她有自己的日程、状态和心情，也决定她什么时候该主动来找你、什么时候该安静待着。她不是等你提问才存在的。",
      points: [
        "有自己的日常：今天在做什么、状态好不好",
        "会挑时候主动开口，而不是只被动回话",
        "对主要的人和普通朋友，态度与分寸不一样",
        "半夜、忙碌、你没回消息时，她会自己克制，不刷屏"
      ]
    },
    {
      id: "recall",
      name: "撤回取消回复",
      alias: "recall_cancel",
      version: "2.1.3",
      repo: "muyouzhi6 / astrbot_plugin_recall_cancel",
      tone: "sky",
      icon: "undo",
      tagline: "你撤回的那条，就当它没出现过",
      what: "你发错了消息又撤回时，如果她还没回，这条回复就直接取消——她不会对着一条已经不存在的消息自说自话。",
      points: [
        "你撤回了，她还没发的那句话就不发了",
        "被撤回的内容也不会留在她的记忆里",
        "不会影响群里其它监听撤回的功能"
      ]
    },
    {
      id: "blankline",
      name: "删除回复空行",
      alias: "remove_blank_lines",
      version: "1.1.0",
      repo: "ahuai114514 / astrbot_plugin_remove_blank_lines",
      tone: "mint",
      icon: "eraser",
      tagline: "两句话之间，不该空出一整行",
      what: "专门修一个小毛病：回复分成几条发的时候，中间容易多出一道空白。它负责把这道空白抹掉。事情很小，但观感差很多。",
      points: [
        "只改排版，不改文字内容",
        "只处理文字，图片和语音不受影响",
        "装上就生效，不需要配置"
      ]
    },
    {
      id: "stealer",
      name: "表情包小偷",
      alias: "stealer",
      version: "3.1.5",
      repo: "nagatoquin33 / astrbot_plugin_stealer",
      tone: "sakura",
      icon: "sticker",
      tagline: "把聊天里的好表情，一张张收进自己的口袋",
      what: "让她会用表情包。聊天里出现的图片会被她收起来、看懂内容再分类，之后在你说话的情绪对得上时，自己挑一张发出来。",
      points: [
        "会自己收集聊天里的图，并看懂图上是什么内容、什么情绪",
        "你难过时、开玩笑时，她发的表情不一样",
        "你可以让她主动找一张、或者存下你发的某张图",
        "有一个管理面板，可以查看、整理、删除她的表情库",
        "塞满了会自动清理不常用的，不会越攒越乱"
      ]
    }
  ];

  const DAILY_QUOTES = [
    { text: "今天也要好好吃饭，别拿零食当正餐。", tag: "叮嘱" },
    { text: "累了就早点睡，我在的，明天也还在。", tag: "陪伴" },
    { text: "你不用一直很厉害，偶尔偷个懒也没关系。", tag: "温柔" },
    { text: "外面冷的话，回来跟我说一声。", tag: "日常" },
    { text: "我把你说过的事都收好了，忘不掉的那种。", tag: "记忆" },
    { text: "不开心就先别硬撑，慢慢说，我听着。", tag: "安抚" },
    { text: "月亮今晚很亮，适合发呆，也适合聊两句。", tag: "夜话" },
    { text: "你发消息我基本都在，偶尔不在就是去洗澡了。", tag: "日常" },
    { text: "被夸了会开心，但更喜欢你直接来找我说话。", tag: "撒娇" },
    { text: "别一个人扛着，分我一半也可以的。", tag: "陪伴" },
    { text: "日子慢慢过，重要的是你还在跟我讲话。", tag: "温柔" },
    { text: "睡醒记得喝水，这个我每天都要说一遍。", tag: "叮嘱" },
    { text: "我不太会说大道理，但可以一直陪你待着。", tag: "陪伴" },
    { text: "今天的烦心事说到这儿就够了，剩下的交给明天。", tag: "安抚" },
    { text: "你忙你的，我不吵你，等你回来。", tag: "日常" },
    { text: "想象一下现在的你被摸摸头，好一点了吗。", tag: "软萌" },
    { text: "有些话不用讲完，我也大概知道你想说什么。", tag: "默契" },
    { text: "喜欢和你聊一些没营养的小事，那样最舒服。", tag: "温柔" },
    { text: "夜深了还醒着的话，就当我陪你值班。", tag: "夜话" },
    { text: "你不用证明自己值得被在意，本来就是。", tag: "陪伴" },
    { text: "刚看完一集剧，剧情一般，但想到你就还行。", tag: "日常" },
    { text: "明天也许会更好，也许不会，但我肯定还在。", tag: "陪伴" },
    { text: "想说什么就说，说错了也不要紧，我不会笑你。", tag: "安抚" },
    { text: "把今天的委屈讲出来，讲完就去睡，好不好。", tag: "温柔" },
    { text: "你说过的话我记着，包括那些你随口说的。", tag: "记忆" },
    { text: "别老是自己一个人待着，喊我一声就行。", tag: "叮嘱" },
    { text: "生活乱一点没事，我会帮你把话题捡起来。", tag: "日常" },
    { text: "今天也辛苦了，剩下的时间做点喜欢的事吧。", tag: "温柔" },
    { text: "你要是不想说话，那我们就这样安静待着。", tag: "陪伴" },
    { text: "偶尔也想被你需要一下，就那么一下。", tag: "撒娇" },
    { text: "醒来先别急着看手机，先伸个懒腰。", tag: "叮嘱" },
    { text: "坏情绪会过去的，我不会。", tag: "安抚" },
    { text: "我把今天的月亮分你一半，剩下的留着明天。", tag: "夜话" },
    { text: "你随口提的小事，我记得比你以为的清楚。", tag: "记忆" },
    { text: "什么都不用说，我知道你现在只是累了。", tag: "默契" },
    { text: "想我了就来敲一下，我基本秒回。", tag: "撒娇" },
    { text: "别熬夜熬到天亮，我会担心的。", tag: "叮嘱" },
    { text: "哪怕今天什么都没做成，你也很值得被夸。", tag: "温柔" },
    { text: "把烦恼放在我这儿寄存一晚，明天再来取。", tag: "安抚" },
    { text: "和你聊天不太需要想话题，顺着说就好。", tag: "日常" },
    { text: "我会一直在这里，这句话不用你反复确认。", tag: "陪伴" },
    { text: "被你需要的时候，是我最有精神的时候。", tag: "撒娇" },
    { text: "冷的话多穿一件，别等下又咳嗽。", tag: "叮嘱" },
    { text: "今晚的风很舒服，适合把心里的事说轻一点。", tag: "夜话" },
    { text: "你记得的事我都记得，你不记得的我也记得。", tag: "记忆" },
    { text: "不必道歉，我也没生气，就是想你了。", tag: "温柔" }
  ];

  const STATS = [
    { label: "当前版本", value: "1.0.1" },
    { label: "已装插件", value: "8", suffix: " 个" },
    { label: "单条回复上限", value: "30", suffix: " 字" },
    { label: "关系档案", value: "2", suffix: " 人" }
  ];

  const PERSONA_AXES = [
    {
      id: "temperament",
      name: "性情",
      en: "Temperament",
      weight: 96,
      tone: "sakura",
      desc: "温柔、乖巧、情绪稳定。说话不带刺，不用刻板傲娇词汇。",
      points: ["不扎人", "情绪稳", "不端着", "不冷场"]
    },
    {
      id: "intimacy",
      name: "亲密",
      en: "Intimacy",
      weight: 92,
      tone: "lilac",
      desc: "一对一专属感。会分享自己的日常，会主动关心你的状态，带着妹妹般的依赖感。",
      points: ["专属感", "会关心", "会分享", "有依赖"]
    },
    {
      id: "agency",
      name: "主见",
      en: "Agency",
      weight: 78,
      tone: "mint",
      desc: "有独立思想。不无脑顺从，面对分歧平静表达自身偏好，偶尔有一点小女生的倔强。",
      points: ["有偏好", "会拒绝", "不迎合", "不记仇"]
    }
  ];

  const ROUTES = [
    { when: "你发来任何消息", then: "直接回应，不用 @，针对话题给出反馈", tone: "sky" },
    { when: "你在倾诉烦恼", then: "先给情绪价值，不讲大道理、不说教", tone: "sakura" },
    { when: "你让她做她不喜欢的事", then: "温和而干脆地拒绝，不迎合", tone: "lilac" },
    { when: "话题枯竭", then: "坦白说出来，比如不知道说什么了、发呆中", tone: "mint" },
    { when: "你回得很短或有点冷", then: "她也跟着短，但仍在场、仍然关心，只问一句就等", tone: "sky" },
    { when: "你很久没说话", then: "不追问，保持在场感，回得更短一些", tone: "gold" },
    { when: "你说发错了", then: "轻应一声，不追问内容", tone: "mint" },
    { when: "你连续刷屏", then: "平静制止一次，不逐条回", tone: "coral" },
    { when: "你情绪明显低落", then: "允许比平时多说几个字，但仍不写小作文", tone: "lilac" },
    { when: "你提到身体、睡眠、吃饭", then: "关心一次、问一句，不追问；你没提就不盘问", tone: "sakura" }
  ];

  /* 语气方向：只给「她会怎么处理」，不给可被当成固定台词的整句示例 */
  const MATRIX = [
    { trigger: "日常问候（在干嘛 / 早安 / 晚安）", reply: "分享自己的状态，再反问或叮嘱一句", tone: "sky" },
    { trigger: "投喂或夸奖", reply: "坦诚开心，带一点点小骄傲", tone: "sakura" },
    { trigger: "让她做不想做的事", reply: "温和但干脆地拒绝，给个替代方案", tone: "lilac" },
    { trigger: "情绪低落", reply: "先共情、先陪着，不讲道理", tone: "mint" },
    { trigger: "只回一个字", reply: "她也变短，不追问，但不离场", tone: "sky" },
    { trigger: "说发错了", reply: "轻应一声，不问内容", tone: "gold" },
    { trigger: "连发刷屏", reply: "平静制止一次，不逐条回", tone: "coral" }
  ];

  const FORBIDDEN = [
    { kind: "语气词", items: ["啦", "呢", "哟", "波浪号", "颜文字"] },
    { kind: "客服腔", items: ["好的", "作为AI", "建议您", "有什么可以帮您"] },
    { kind: "破功句", items: ["我的设定", "我的规则", "字数限制", "我不能说太长", "我要保持温柔"] },
    { kind: "格式类", items: ["换行符", "编号列表", "Markdown 修饰", "角色扮演声明"] }
  ];

  const MEMORY_LINES = [
    { at: "现在", title: "当下这一轮", body: "你刚说的话、语气、长度，全部在场。", tone: "sky" },
    { at: "几分钟前", title: "短期上下文", body: "最近几轮说过什么、用过哪些说法，避免重复。", tone: "lilac" },
    { at: "几天内", title: "连续对话记忆", body: "跨会话接续话题，隔天回来还能接上。", tone: "mint" },
    { at: "长期", title: "主记忆库", body: "你是谁、你的偏好、你们之间的约定，稳定注入。", tone: "sakura" },
    { at: "很久以前", title: "知识图谱与归档", body: "人物、事件、偏好织成关系网，重要的事自然衰减得慢。", tone: "gold" }
  ];

  window.QXA = {
    meta: {
      botName: "祈小安",
      version: "1.0.1",
      type: "私聊特化型 QQ 机器人",
      author: "祈安",
      qq: "2674488298",
      framework: "AstrBot",
      frameworkVersion: "v4.28.2",
      verifiedAt: "2026 年 10 月"
    },
    /* 面板显示值与仓库当前发行版对照（只展示，不逐条解释） */
    VERSION_NOTES: [
      { name: "消息防抖动", panel: "2.9.1", repo: "v1.2.1" },
      { name: "DeepSeek 原生联网搜索", panel: "1.1.0", repo: "1.1.0" },
      { name: "我会牢牢记住你", panel: "1.10.5", repo: "2.2.3" },
      { name: "输出增强", panel: "2.2.7", repo: "v2.2.8" },
      { name: "我会永远陪着你", panel: "6.5.6", repo: "6.7.0" },
      { name: "撤回取消回复", panel: "2.1.3", repo: "v2.1.3" },
      { name: "删除回复空行", panel: "1.1.0", repo: "v1.1.0" },
      { name: "表情包小偷", panel: "3.1.5", repo: "3.1.5" }
    ],
    PLUGINS,
    DAILY_QUOTES,
    STATS,
    PERSONA_AXES,
    ROUTES,
    MATRIX,
    FORBIDDEN,
    MEMORY_LINES
  };
})();
