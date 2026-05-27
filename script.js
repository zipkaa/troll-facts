const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const facts = [
  "Если долго смотреть на чайник, он начинает кипеть из уважения.",
  "У каждой потерянной зарядки есть тайная жизнь где-то под диваном.",
  "Пингвины ходят так важно, потому что знают пароль от Антарктиды.",
  "Кошки специально роняют вещи, чтобы проверять гравитацию на свежесть.",
  "Самые умные мысли приходят ровно тогда, когда уже отправил сообщение.",
  "Если надеть носки разного цвета, вероятность приключений повышается на 37%.",
  "Луна светит ночью, потому что не доверяет уличным фонарям.",
  "Пельмени — это равиоли, которые выбрали суровый путь.",
  "Будильник звонит громко только тем, кто морально не готов к реальности.",
  "Wi‑Fi становится быстрее, если смотреть на роутер с лёгким осуждением."
];

const factEl = document.querySelector("#fact");
const generateBtn = document.querySelector("#generateBtn");
const sendBtn = document.querySelector("#sendBtn");

let currentFact = "";
let previousIndex = -1;

function randomFact() {
  let index = Math.floor(Math.random() * facts.length);

  if (facts.length > 1) {
    while (index === previousIndex) {
      index = Math.floor(Math.random() * facts.length);
    }
  }

  previousIndex = index;
  return facts[index];
}

function getFactToShare() {
  const fromState = (currentFact || "").trim();
  const fromPage = (factEl?.textContent || "").trim();

  // Берём факт из переменной, а если Telegram/страница перерисовали состояние — из текста на экране.
  const fact = fromState || fromPage;

  // Не даём отправлять стартовую заглушку вместо факта.
  if (!fact || fact.includes("Нажми кнопку") || fact.includes("генератор")) {
    return "";
  }

  return fact;
}

function showFact() {
  currentFact = randomFact();

  factEl.classList.remove("pop");
  void factEl.offsetWidth;
  factEl.textContent = currentFact;
  factEl.classList.add("pop");

  sendBtn.disabled = false;
  sendBtn.textContent = "📨 Отправить в чат";

  tg?.HapticFeedback?.impactOccurred("light");
}

async function copyFactFallback(text) {
  try {
    await navigator.clipboard.writeText(text);
    sendBtn.textContent = "✅ Скопировано";
  } catch (error) {
    sendBtn.textContent = "⚠️ Не удалось отправить";
  }

  setTimeout(() => {
    sendBtn.textContent = "📨 Отправить в чат";
  }, 1400);
}

function sendFactToSelectedChat() {
  const factToShare = getFactToShare();

  if (!factToShare) {
    sendBtn.textContent = "🔮 Сначала сгенерируй факт";
    tg?.HapticFeedback?.notificationOccurred("error");

    setTimeout(() => {
      sendBtn.textContent = "📨 Отправить в чат";
    }, 1400);
    return;
  }

  currentFact = factToShare;
  tg?.HapticFeedback?.notificationOccurred("success");

  if (tg?.switchInlineQuery) {
    try {
      // Открывает выбор чата. После выбора Telegram покажет inline-карточку с этим фактом.
      tg.switchInlineQuery(factToShare, ["users", "groups", "channels"]);
      return;
    } catch (error) {
      console.error("switchInlineQuery error:", error);
    }
  }

  // Запасной вариант для браузера или старого клиента Telegram.
  copyFactFallback(factToShare);
}

function init() {
  sendBtn.disabled = true;
  generateBtn.addEventListener("click", showFact);
  sendBtn.addEventListener("click", sendFactToSelectedChat);
}

init();
