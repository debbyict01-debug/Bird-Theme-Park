const moodResults = [
  "今日董事長心情：正在查帳，請勿打擾。",
  "今日董事長心情：海風吹得剛好，暫時可親近。",
  "今日董事長心情：栗米不足，請保持距離。",
  "今日董事長心情：表面冷靜，實則想罵。",
  "今日董事長心情：批准你可愛三分鐘。",
  "今日董事長心情：已啟動蜘蛛鳥預備模式。",
];

const scratchResults = {
  認真抓脖子: "評價：尚可。董事長閉眼三秒，表示本次服務暫准通過。",
  抓臉頰旁邊: "評價：需要微調。董事長啾一聲，提醒你角度偏了。",
  隨便亂抓: "評價：重大缺失。董事長回覆：BBBBBBB。",
  假裝有抓: "評價：詐欺行為。董事長表示：你以為我感覺不到嗎？",
  偷偷摸頭: "評價：禁止事項。董事長不接受摸頭，請立即停止錯誤服務。",
};

const setText = (id, text) => {
  const target = document.getElementById(id);
  if (target) {
    target.textContent = text;
  }
};

document.getElementById("moodButton")?.addEventListener("click", () => {
  const index = Math.floor(Math.random() * moodResults.length);
  setText("moodResult", moodResults[index]);
});

document.getElementById("cornButton")?.addEventListener("click", () => {
  const value = document.getElementById("cornInput")?.value ?? "";
  const amount = Number(value);

  if (value.trim() === "" || !Number.isFinite(amount) || amount < 0) {
    setText("cornResult", "請輸入有效栗米數量，董事長不接受模糊帳目。");
    return;
  }

  if (amount === 0) {
    setText("cornResult", "董事長皺眉：你今天是不是忘記補貨？");
    return;
  }

  if (amount >= 1 && amount <= 10) {
    setText("cornResult", "董事長表示：可接受，但請附發票。");
    return;
  }

  if (amount >= 11 && amount <= 99) {
    setText("cornResult", "董事長警覺：此筆栗米支出偏高，請補充說明。");
    return;
  }

  setText("cornResult", "董事長震怒：你是不是把整個財務部吃掉了？");
});

document.getElementById("speechButton")?.addEventListener("click", () => {
  const text = document.getElementById("speechInput")?.value ?? "";

  if (text.includes("掉下來買新的")) {
    setText("speechResult", "審核結果：嚴重違規。本董事長為園區最高資產，不接受替換論。");
    return;
  }

  if (text.includes("摸頭")) {
    setText("speechResult", "審核結果：禁止事項。董事長不喜歡摸頭，請改申請高品質抓癢服務。");
    return;
  }

  if (text.includes("可愛")) {
    setText("speechResult", "審核結果：暫准通過。但請注意，可愛不是免責條款。");
    return;
  }

  setText("speechResult", "審核結果：列入觀察。董事長正在評估你這句話是否有問題。");
});

document.getElementById("scratchButton")?.addEventListener("click", () => {
  const value = document.getElementById("scratchSelect")?.value ?? "";
  setText("scratchResult", scratchResults[value] ?? "請送出服務內容，董事長將親自評分。");
});
