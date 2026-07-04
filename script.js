const moodResults = [
  {
    status: "審核狀態：本鳥已閱",
    stamp: "本鳥已閱",
    message: "今日董事長心情：正在查帳，請勿打擾。",
    reflection: "否",
  },
  {
    status: "審核狀態：暫准通過",
    stamp: "暫准通過",
    message: "今日董事長心情：海風吹得剛好，暫時可親近。",
    reflection: "否",
  },
  {
    status: "審核狀態：黃燈警戒",
    stamp: "黃燈警戒",
    message: "今日董事長心情：栗米不足，請保持距離。",
    reflection: "視補貨狀況而定",
  },
  {
    status: "審核狀態：待觀察",
    stamp: "待補件",
    message: "今日董事長心情：表面冷靜，實則想罵。",
    reflection: "可能",
  },
  {
    status: "審核狀態：暫准通過",
    stamp: "暫准通過",
    message: "今日董事長心情：批准你可愛三分鐘。",
    reflection: "否",
  },
  {
    status: "審核狀態：黃燈警戒",
    stamp: "黃燈警戒",
    message: "今日董事長心情：已啟動蜘蛛鳥預備模式。",
    reflection: "請先自我檢討",
  },
];

const scratchResults = {
  "認真抓脖子": {
    status: "審核狀態：暫准通過",
    stamp: "暫准通過",
    message: "評價：尚可。董事長閉眼三秒，表示本次服務暫准通過。",
    reflection: "否",
  },
  "抓臉頰旁邊": {
    status: "審核狀態：需要微調",
    stamp: "本鳥已閱",
    message: "評價：需要微調。董事長啾一聲，提醒你角度偏了。",
    reflection: "否，但請改善角度",
  },
  "隨便亂抓": {
    status: "審核狀態：重大缺失",
    stamp: "BBBBBBB",
    message: "評價：重大缺失。董事長回覆：BBBBBBB。",
    reflection: "是",
  },
  "假裝有抓": {
    status: "審核狀態：詐欺行為",
    stamp: "BBB",
    message: "評價：詐欺行為。董事長表示：你以為我感覺不到嗎？",
    reflection: "是",
  },
  "偷偷摸頭": {
    status: "審核狀態：禁止事項",
    stamp: "人類需改善",
    message: "評價：禁止事項。董事長不接受摸頭，請立即停止錯誤服務。",
    reflection: "是",
  },
};

const stampClassFor = (stamp) => {
  if (stamp === "暫准通過") return "stamp-approved";
  if (stamp === "待補件") return "stamp-pending";
  if (stamp === "黃燈警戒") return "stamp-alert";
  if (stamp === "BBB") return "stamp-bbb";
  if (stamp === "BBBBBBB") return "stamp-bbbbbbb";
  if (stamp === "人類需改善") return "stamp-human";
  return "stamp-read";
};

const renderApproval = (id, detail) => {
  const target = document.getElementById(id);
  if (!target) return;

  target.innerHTML = `
    <span class="approval-title">董事長批示</span>
    <span class="approval-status">${detail.status}</span>
    <strong class="chairman-stamp ${stampClassFor(detail.stamp)}">${detail.stamp}</strong>
    <p>${detail.message}</p>
    <small>是否需要進入人類反省區：${detail.reflection}</small>
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
      status: "審核狀態：待補件",
      stamp: "待補件",
      message: "請輸入有效栗米數量，董事長不接受模糊帳目。",
      reflection: "否，但請補資料",
    });
    return;
  }

  if (amount === 0) {
    renderApproval("cornResult", {
      status: "審核狀態：黃燈警戒",
      stamp: "黃燈警戒",
      message: "董事長皺眉：你今天是不是忘記補貨？",
      reflection: "可能",
    });
    return;
  }

  if (amount >= 1 && amount <= 10) {
    renderApproval("cornResult", {
      status: "審核狀態：暫准通過",
      stamp: "暫准通過",
      message: "董事長表示：可接受，但請附發票。",
      reflection: "否",
    });
    return;
  }

  if (amount >= 11 && amount <= 99) {
    renderApproval("cornResult", {
      status: "審核狀態：黃燈警戒",
      stamp: "黃燈警戒",
      message: "董事長警覺：此筆栗米支出偏高，請補充說明。",
      reflection: "視說明品質而定",
    });
    return;
  }

  renderApproval("cornResult", {
    status: "審核狀態：重大異常",
    stamp: "BBB",
    message: "董事長震怒：你是不是把整個財務部吃掉了？",
    reflection: "是",
  });
});

document.getElementById("speechButton")?.addEventListener("click", () => {
  const text = document.getElementById("speechInput")?.value ?? "";

  if (text.includes("掉下來買新的")) {
    renderApproval("speechResult", {
      status: "審核狀態：嚴重違規",
      stamp: "BBB",
      message: "審核結果：嚴重違規。本董事長為園區最高資產，不接受替換論。",
      reflection: "是",
    });
    return;
  }

  if (text.includes("摸頭")) {
    renderApproval("speechResult", {
      status: "審核狀態：禁止事項",
      stamp: "人類需改善",
      message: "審核結果：禁止事項。董事長不喜歡摸頭，請改申請高品質抓癢服務。",
      reflection: "是",
    });
    return;
  }

  if (text.includes("可愛")) {
    renderApproval("speechResult", {
      status: "審核狀態：暫准通過",
      stamp: "暫准通過",
      message: "審核結果：暫准通過。但請注意，可愛不是免責條款。",
      reflection: "否",
    });
    return;
  }

  renderApproval("speechResult", {
    status: "審核狀態：列入觀察",
    stamp: "本鳥已閱",
    message: "審核結果：列入觀察。董事長正在評估你這句話是否有問題。",
    reflection: "暫不需要",
  });
});

document.getElementById("scratchButton")?.addEventListener("click", () => {
  const value = document.getElementById("scratchSelect")?.value ?? "";
  renderApproval(
    "scratchResult",
    scratchResults[value] ?? {
      status: "審核狀態：待補件",
      stamp: "待補件",
      message: "請選擇抓癢服務項目，董事長不接受空白驗收。",
      reflection: "否，但請補資料",
    },
  );
});
