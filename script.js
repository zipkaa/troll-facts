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

function showFact() {
  currentFact = randomFact();
  factEl.classList.remove("pop");
  void factEl.offsetWidth;
  factEl.textContent = currentFact;
  factEl.classList.add("pop");
  sendBtn.disabled = false;

  if (tg?.HapticFeedback) {
    tg.HapticFeedback.impactOccurred("light");
  }
}

function sendFact() {
  if (!currentFact) return;

  if (tg) {
    tg.sendData(currentFact);
    tg.HapticFeedback?.notificationOccurred("success");
  } else {
    navigator.clipboard?.writeText(currentFact);
    sendBtn.textContent = "✅ Скопировано";
    setTimeout(() => (sendBtn.textContent = "📨 Отправить в чат"), 1200);
  }
}

generateBtn.addEventListener("click", showFact);
sendBtn.addEventListener("click", sendFact);
