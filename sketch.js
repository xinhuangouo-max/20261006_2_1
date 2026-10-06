// 儲存目前題目編號
let currentQuestion = 0;

// 儲存答對題數
let score = 0;

// 記錄目前題目是否已作答
let answered = false;

// 記錄測驗是否完成
let quizFinished = false;

// 儲存所有選項按鈕
let optionButtons = [];

// 儲存下一題按鈕
let nextButton;

// 儲存五道國文題目
let questions = [
  {
    // 第一題題目
    question: "「床前明月光」的下一句是什麼？",

    // 第一題選項
    options: [
      "疑是地上霜",
      "低頭思故鄉",
      "舉頭望明月",
      "月是故鄉明"
    ],

    // 正確答案為第一個選項
    answer: 0
  },

  {
    // 第二題題目
    question: "「學而時習之，不亦說乎？」出自哪一本經典？",

    // 第二題選項
    options: [
      "《孟子》",
      "《論語》",
      "《荀子》",
      "《禮記》"
    ],

    // 正確答案為第二個選項
    answer: 1
  },

  {
    // 第三題題目
    question: "下列哪一個成語是形容非常勤奮地學習？",

    // 第三題選項
    options: [
      "守株待兔",
      "畫龍點睛",
      "懸梁刺股",
      "掩耳盜鈴"
    ],

    // 正確答案為第三個選項
    answer: 2
  },

  {
    // 第四題題目
    question: "「山明水秀」主要是用來形容什麼？",

    // 第四題選項
    options: [
      "天氣寒冷",
      "景色優美",
      "聲音很大",
      "速度很快"
    ],

    // 正確答案為第二個選項
    answer: 1
  },

  {
    // 第五題題目
    question: "下列哪一個字的注音是「ㄊㄧㄢ」？",

    // 第五題選項
    options: [
      "天",
      "田",
      "年",
      "連"
    ],

    // 正確答案為第一個選項
    answer: 0
  }
];

// p5.js 程式開始時執行一次
function setup() {
  // 建立符合視窗大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平與垂直置中
  textAlign(CENTER, CENTER);

  // 使用瀏覽器預設字型，增加中文顯示相容性
  textFont("sans-serif");

  // 建立選項按鈕
  createOptionButtons();

  // 建立下一題按鈕
  createNextButton();

  // 載入第一題
  updateQuiz();

  // 設定所有按鈕的響應式樣式
  updateResponsiveLayout();
}

// p5.js 會持續執行
function draw() {
  // 設定背景顏色
  background("#f7d6e0");

  // 如果測驗完成，顯示結果
  if (quizFinished) {
    // 繪製測驗結果畫面
    drawResult();

    // 結束目前的繪圖流程
    return;
  }

  // 繪製標題
  drawTitle();

  // 繪製題目
  drawQuestion();

  // 繪製題數進度
  drawProgress();

  // 更新響應式版面
  updateResponsiveLayout();

  // 更新下一題按鈕狀態
  updateNextButton();
}

// 建立四個選項按鈕
function createOptionButtons() {
  // 使用迴圈建立四個選項
  for (let i = 0; i < 4; i++) {
    // 建立 HTML 按鈕
    let button = createButton("");

    // 設定按鈕點擊事件
    button.mousePressed(function () {
      // 傳入使用者選擇的選項編號
      selectAnswer(i);
    });

    // 將按鈕加入陣列
    optionButtons.push(button);
  }
}

// 建立下一題按鈕
function createNextButton() {
  // 建立下一題按鈕
  nextButton = createButton("下一題");

  // 設定按鈕點擊事件
  nextButton.mousePressed(nextQuestion);

  // 設定按鈕文字顏色
  nextButton.style("color", "#ffffff");

  // 設定按鈕背景顏色
  nextButton.style("background-color", "#cdb4db");

  // 移除按鈕邊框
  nextButton.style("border", "none");

  // 設定按鈕圓角
  nextButton.style("border-radius", "12px");

  // 設定按鈕游標
  nextButton.style("cursor", "pointer");

  // 設定按鈕陰影
  nextButton.style("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.15)");
}

// 更新目前題目的資料
function updateQuiz() {
  // 設定目前題目尚未回答
  answered = false;

  // 取得目前題目資料
  let currentData = questions[currentQuestion];

  // 更新所有選項按鈕
  for (let i = 0; i < optionButtons.length; i++) {
    // 設定選項文字
    optionButtons[i].html(currentData.options[i]);

    // 顯示選項按鈕
    optionButtons[i].show();

    // 設定選項背景顏色
    optionButtons[i].style("background-color", "#ffffff");

    // 設定選項文字顏色
    optionButtons[i].style("color", "#555555");

    // 設定選項邊框
    optionButtons[i].style("border", "3px solid #cdb4db");

    // 清除跳動效果
    optionButtons[i].style("transform", "translateY(0px)");

    // 設定按鈕圓角
    optionButtons[i].style("border-radius", "14px");

    // 設定按鈕游標
    optionButtons[i].style("cursor", "pointer");

    // 設定按鈕陰影
    optionButtons[i].style(
      "box-shadow",
      "0 4px 8px rgba(0, 0, 0, 0.12)"
    );
  }

  // 隱藏下一題按鈕
  nextButton.hide();
}

// 繪製標題
function drawTitle() {
  // 根據視窗短邊設定標題大小
  let titleSize = constrain(min(width, height) * 0.065, 24, 48);

  // 設定標題文字大小
  textSize(titleSize);

  // 設定標題顏色
  fill("#6d597a");

  // 設定粗體文字
  textStyle(BOLD);

  // 顯示標題
  text("國文選擇題測驗", width / 2, height * 0.1);

  // 恢復一般文字樣式
  textStyle(NORMAL);
}

// 繪製題目
function drawQuestion() {
  // 取得目前題目資料
  let currentData = questions[currentQuestion];

  // 根據視窗短邊設定題目大小
  let questionSize = constrain(min(width, height) * 0.038, 17, 30);

  // 設定題目文字大小
  textSize(questionSize);

  // 設定題目文字顏色
  fill("#555555");

  // 設定題目最大寬度
  let questionWidth = min(width * 0.9, 760);

  // 判斷是否為手機畫面
  if (width < 600) {
    // 手機畫面將題目放在較上方
    text(
      currentData.question,
      width / 2,
      height * 0.235,
      questionWidth
    );
  } else {
    // 平板與電腦畫面使用一般位置
    text(
      currentData.question,
      width / 2,
      height * 0.24,
      questionWidth
    );
  }
}

// 繪製進度文字
function drawProgress() {
  // 設定進度文字大小
  let progressSize = constrain(min(width, height) * 0.028, 14, 22);

  // 設定文字大小
  textSize(progressSize);

  // 設定文字顏色
  fill("#8c6f91");

  // 顯示目前題數
  text(
    "第 " + (currentQuestion + 1) + " 題／共 " + questions.length + " 題",
    width / 2,
    height * 0.34
  );
}

// 更新響應式版面
function updateResponsiveLayout() {
  // 取得目前畫面短邊
  let shortSide = min(width, height);

  // 設定選項按鈕寬度
  let buttonWidth = min(width * 0.86, 680);

  // 設定選項按鈕高度
  let buttonHeight = constrain(shortSide * 0.1, 44, 68);

  // 設定選項之間的距離
  let gap = constrain(shortSide * 0.125, 54, 82);

  // 設定選項起始位置
  let startY = height * 0.43;

  // 手機直向畫面調整位置
  if (width < 600 && height >= width) {
    // 將選項往下安排，避免與題目重疊
    startY = height * 0.42;

    // 減少選項之間的間距
    gap = constrain(height * 0.09, 52, 68);
  }

  // 手機橫向畫面調整位置
  if (width >= 600 && height < 600) {
    // 將選項區域移到畫面中央
    startY = height * 0.43;

    // 減少選項高度
    buttonHeight = constrain(height * 0.1, 38, 52);

    // 減少選項間距
    gap = constrain(height * 0.13, 42, 60);
  }

  // 設定四個選項的位置
  for (let i = 0; i < optionButtons.length; i++) {
    // 計算目前選項的垂直座標
    let y = startY + i * gap;

    // 設定選項按鈕位置
    optionButtons[i].position(
      width / 2 - buttonWidth / 2,
      y - buttonHeight / 2
    );

    // 設定選項按鈕大小
    optionButtons[i].size(buttonWidth, buttonHeight);

    // 設定選項文字大小
    let optionSize = constrain(shortSide * 0.032, 15, 23);

    // 手機畫面使用較小文字
    if (width < 600) {
      optionSize = constrain(shortSide * 0.038, 14, 20);
    }

    // 設定選項文字大小
    optionButtons[i].style("font-size", optionSize + "px");

    // 設定選項文字換行與超出處理
    optionButtons[i].style("white-space", "normal");

    // 設定選項內容置中
    optionButtons[i].style("text-align", "center");

    // 設定選項內距
    optionButtons[i].style("padding", "6px");

    // 設定選項盒模型
    optionButtons[i].style("box-sizing", "border-box");
  }
}

// 繪製選項跳動效果
function drawOptions() {
  // 判斷是否已回答且答錯
  if (answered && !isCorrectAnswerSelected()) {
    // 取得正確答案編號
    let correctIndex = questions[currentQuestion].answer;

    // 計算上下跳動距離
    let bounce = sin(frameCount * 0.15) * 10;

    // 將正確答案背景設定為 #ffafcc
    optionButtons[correctIndex].style(
      "background-color",
      "#ffafcc"
    );

    // 讓正確選項上下跳動
    optionButtons[correctIndex].style(
      "transform",
      "translateY(" + bounce + "px)"
    );
  }
}

// 處理使用者選擇答案
function selectAnswer(selectedIndex) {
  // 如果已經作答，就停止執行
  if (answered) {
    return;
  }

  // 設定已經作答
  answered = true;

  // 取得正確答案編號
  let correctIndex = questions[currentQuestion].answer;

  // 判斷是否答對
  if (selectedIndex === correctIndex) {
    // 答對時增加分數
    score++;

    // 設定正確選項背景顏色
    optionButtons[selectedIndex].style(
      "background-color",
      "#bde0c5"
    );

    // 設定正確選項文字顏色
    optionButtons[selectedIndex].style(
      "color",
      "#356859"
    );
  } else {
    // 設定正確選項背景顏色
    optionButtons[correctIndex].style(
      "background-color",
      "#ffafcc"
    );

    // 設定正確選項文字顏色
    optionButtons[correctIndex].style(
      "color",
      "#8b3a62"
    );

    // 設定錯誤選項背景顏色
    optionButtons[selectedIndex].style(
      "background-color",
      "#eeeeee"
    );

    // 設定錯誤選項文字顏色
    optionButtons[selectedIndex].style(
      "color",
      "#999999"
    );
  }

  // 停止所有選項再次被點擊
  for (let i = 0; i < optionButtons.length; i++) {
    // 設定按鈕游標為預設樣式
    optionButtons[i].style("cursor", "default");
  }

  // 顯示下一題按鈕
  nextButton.show();
}

// 判斷正確答案是否被選取
function isCorrectAnswerSelected() {
  // 取得正確答案編號
  let correctIndex = questions[currentQuestion].answer;

  // 取得正確答案背景顏色
  let correctColor = optionButtons[correctIndex].style(
    "background-color"
  );

  // 判斷是否為答對時的淡綠色
  return correctColor === "rgb(189, 224, 197)";
}

// 更新下一題按鈕
function updateNextButton() {
  // 判斷是否已經回答
  if (answered) {
    // 判斷是否為最後一題
    if (currentQuestion === questions.length - 1) {
      // 將按鈕文字改為查看成績
      nextButton.html("查看成績");
    } else {
      // 將按鈕文字設定為下一題
      nextButton.html("下一題");
    }

    // 計算按鈕寬度
    let buttonWidth = constrain(width * 0.34, 130, 190);

    // 計算按鈕高度
    let buttonHeight = constrain(min(width, height) * 0.1, 42, 58);

    // 將按鈕放在畫面下方中央
    nextButton.position(
      width / 2 - buttonWidth / 2,
      height - buttonHeight - max(18, height * 0.035)
    );

    // 設定按鈕大小
    nextButton.size(buttonWidth, buttonHeight);

    // 設定按鈕文字大小
    nextButton.style(
      "font-size",
      constrain(min(width, height) * 0.032, 16, 22) + "px"
    );

    // 顯示下一題按鈕
    nextButton.show();
  } else {
    // 尚未作答時隱藏按鈕
    nextButton.hide();
  }
}

// 進入下一題
function nextQuestion() {
  // 將題目編號加一
  currentQuestion++;

  // 判斷是否完成所有題目
  if (currentQuestion >= questions.length) {
    // 設定測驗完成
    quizFinished = true;

    // 隱藏所有選項按鈕
    for (let i = 0; i < optionButtons.length; i++) {
      optionButtons[i].hide();
    }

    // 隱藏下一題按鈕
    nextButton.hide();
  } else {
    // 載入下一題
    updateQuiz();
  }
}

// 繪製測驗結果
function drawResult() {
  // 取得畫面短邊
  let shortSide = min(width, height);

  // 設定結果標題文字大小
  textSize(constrain(shortSide * 0.075, 26, 52));

  // 設定結果標題顏色
  fill("#6d597a");

  // 設定粗體文字
  textStyle(BOLD);

  // 顯示完成文字
  text("測驗完成！", width / 2, height * 0.35);

  // 恢復一般字體
  textStyle(NORMAL);

  // 設定成績文字大小
  textSize(constrain(shortSide * 0.052, 20, 36));

  // 設定成績文字顏色
  fill("#555555");

  // 顯示答對題數
  text(
    "你答對了 " + score + "／" + questions.length + " 題",
    width / 2,
    height * 0.5
  );

  // 設定鼓勵文字大小
  textSize(constrain(shortSide * 0.034, 16, 25));

  // 設定鼓勵文字顏色
  fill("#8c6f91");

  // 判斷分數並顯示不同訊息
  if (score === questions.length) {
    // 全部答對時顯示訊息
    text("太棒了！全部答對！", width / 2, height * 0.62);
  } else if (score >= 3) {
    // 答對三題以上時顯示訊息
    text("表現很好，繼續保持！", width / 2, height * 0.62);
  } else {
    // 答對兩題以下時顯示訊息
    text("繼續練習，你會越來越進步！", width / 2, height * 0.62);
  }
}

// 當視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新更新響應式版面
  updateResponsiveLayout();

  // 如果測驗尚未完成，就更新按鈕狀態
  if (!quizFinished) {
    // 更新下一題按鈕
    updateNextButton();
  }
}