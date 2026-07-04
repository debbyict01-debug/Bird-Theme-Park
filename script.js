const moodResults = [
  {
    status: "審核狀態：已審核",
    stamp: "待觀察",
    message: "今日董事長心情：正在查帳，請勿打擾。",
  },
  {
    status: "審核狀態：暫准通過",
    stamp: "APPROVED",
    message: "今日董事長心情：海風吹得剛好，暫時可親近。",
  },
  {
    status: "審核狀態：黃燈警戒",
    stamp: "栗米不足",
    message: "今日董事長心情：栗米不足，請保持距離。",
  },
  {
    status: "審核狀態：本鳥已讀",
    stamp: "待觀察",
    message: "今日董事長心情：表面冷靜，實則想罵。",
  },
  {
    status: "審核狀態：暫准通過",
    stamp: "APPROVED",
    message: "今日董事長心情：批准你可愛三分鐘。",
  },
  {
    status: "審核狀態：黃燈警戒",
    stamp: "蜘蛛鳥",
    message: "今日董事長心情：已啟動蜘蛛鳥預備模式。",
  },
];

const scratchResults = {
  認真抓脖子: {
    status: "審核狀態：暫准通過",
    stamp: "APPROVED",
    message: "評價：尚可。董事長閉眼三秒，表示本次服務暫准通過。",
  },
  抓臉頰旁邊: {
    status: "審核狀態：需要微調",
    stamp: "待觀察",
    message: "評價：需要微調。董事長啾一聲，提醒你角度偏了。",
  },
  隨便亂抓: {
    status: "審核狀態：重大缺失",
    stamp: "BBBBBBB",
    message: "評價：重大缺失。董事長回覆：BBBBBBB。",
  },
  假裝有抓: {
    status: "審核狀態：詐欺行為",
    stamp: "退回",
    message: "評價：詐欺行為。董事長表示：你以為我感覺不到嗎？",
  },
  偷偷摸頭: {
    status: "審核狀態：禁止事項",
    stamp: "禁止",
    message: "評價：禁止事項。董事長不接受摸頭，請立即停止錯誤服務。",
  },
};

const humanReviewResults = [
  {
    status: "審核狀態：暫准通過",
    stamp: "APPROVED",
    message: "今日人類表現：尚可。放風權益未明顯受損，但仍須持續補栗米。",
  },
  {
    status: "審核狀態：人類需改善",
    stamp: "待補件",
    message: "今日人類表現：說明不足。請補交抓癢服務紀錄與栗米進貨明細。",
  },
  {
    status: "審核狀態：黃燈警戒",
    stamp: "黃燈警戒",
    message: "今日人類表現：偵測到異常笑聲。董事長正在評估你是否在討論他的私人行為。",
  },
  {
    status: "審核狀態：重大缺失",
    stamp: "BBBBBBB",
    message: "今日人類表現：抓癢品質、放風安排與說話分寸皆需重新訓練。",
  },
];

const chairmanQuotes = [
  "栗米可以少，帳不能亂。",
  "海風很自由，帳目要清楚。",
  "你以為我在發呆，其實我在審核。",
  "可愛不是免責條款。",
  "人類最大的問題，就是以為小鳥不懂管理。",
  "秩序不是限制，是鳥類美學。",
  "本董事長不接受摸頭，但接受高品質抓癢。",
];

const renderApproval = (id, detail) => {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  target.innerHTML = `
    <span class="approval-title">董事長批示</span>
    <span class="approval-status">${detail.status}</span>
    <strong class="approval-stamp">${detail.stamp}</strong>
    <p>${detail.message}</p>
  `;
};

document.getElementById("moodButton")?.addEventListener("click", () => {
  const index = Math.floor(Math.random() * moodResults.length);
  renderApproval("moodResult", moodResults[index]);
});

document.getElementById("cornButton")?.addEventListener("click", () => {
  const value = document.getElementById("cornInput")?.value ?? "";
  const amount = Number(value);

  if (value.trim() === "" || !Number.isFinite(amount) || amount < 0) {
    renderApproval("cornResult", {
      status: "審核狀態：帳目無效",
      stamp: "退回",
      message: "請輸入有效栗米數量，董事長不接受模糊帳目。",
    });
    return;
  }

  if (amount === 0) {
    renderApproval("cornResult", {
      status: "審核狀態：黃燈警戒",
      stamp: "補貨",
      message: "董事長皺眉：你今天是不是忘記補貨？",
    });
    return;
  }

  if (amount >= 1 && amount <= 10) {
    renderApproval("cornResult", {
      status: "審核狀態：已蓋章",
      stamp: "APPROVED",
      message: "董事長表示：可接受，但請附發票。",
    });
    return;
  }

  if (amount >= 11 && amount <= 99) {
    renderApproval("cornResult", {
      status: "審核狀態：栗米審核中",
      stamp: "待說明",
      message: "董事長警覺：此筆栗米支出偏高，請補充說明。",
    });
    return;
  }

  renderApproval("cornResult", {
    status: "審核狀態：重大異常",
    stamp: "震怒",
    message: "董事長震怒：你是不是把整個財務部吃掉了？",
  });
});

document.getElementById("speechButton")?.addEventListener("click", () => {
  const text = document.getElementById("speechInput")?.value ?? "";

  if (text.includes("掉下來買新的")) {
    renderApproval("speechResult", {
      status: "審核狀態：嚴重違規",
      stamp: "退回",
      message: "審核結果：嚴重違規。本董事長為園區最高資產，不接受替換論。",
    });
    return;
  }

  if (text.includes("摸頭")) {
    renderApproval("speechResult", {
      status: "審核狀態：禁止事項",
      stamp: "禁止",
      message: "審核結果：禁止事項。董事長不喜歡摸頭，請改申請高品質抓癢服務。",
    });
    return;
  }

  if (text.includes("可愛")) {
    renderApproval("speechResult", {
      status: "審核狀態：暫准通過",
      stamp: "APPROVED",
      message: "審核結果：暫准通過。但請注意，可愛不是免責條款。",
    });
    return;
  }

  renderApproval("speechResult", {
    status: "審核狀態：列入觀察",
    stamp: "本鳥已讀",
    message: "審核結果：列入觀察。董事長正在評估你這句話是否有問題。",
  });
});

document.getElementById("scratchButton")?.addEventListener("click", () => {
  const value = document.getElementById("scratchSelect")?.value ?? "";
  renderApproval(
    "scratchResult",
    scratchResults[value] ?? {
      status: "審核狀態：服務待評",
      stamp: "待觀察",
      message: "請送出服務內容，董事長將親自評分。",
    },
  );
});

document.getElementById("humanButton")?.addEventListener("click", () => {
  const index = Math.floor(Math.random() * humanReviewResults.length);
  renderApproval("humanResult", humanReviewResults[index]);
});

document.getElementById("quoteButton")?.addEventListener("click", () => {
  const index = Math.floor(Math.random() * chairmanQuotes.length);
  renderApproval("quoteResult", {
    status: "審核狀態：本鳥已閱",
    stamp: "語錄",
    message: chairmanQuotes[index],
  });
});
