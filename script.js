const tg = window.Telegram?.WebApp;

if (tg) {
    tg.expand();
    tg.ready();
}

const factText = document.getElementById("fact");
const generateBtn = document.getElementById("generate-btn");
const sendBtn = document.getElementById("send-btn");

const facts = [
    "Утки шпионят за тобой через отражения в окнах.",
    "Луна на самом деле сделана из просроченного сыра.",
    "90% людей забывают, зачем зашли в комнату. Остальные врут.",
    "Если кот смотрит в стену — там призрак.",
    "Wi‑Fi работает быстрее, если на него кричать.",
    "Пельмени вкуснее после полуночи по законам физики.",
    "Комары выбирают жертву по музыкальному вкусу.",
    "Чем громче пакетик чипсов — тем вкуснее содержимое.",
    "Каждый холодильник ночью издает звуки, чтобы напугать тебя.",
    "Если долго смотреть на носки — они исчезают по одному."
];

let currentFact = "";

function vibrate(type = "medium") {
    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred(type);
    }
}

function generateFact() {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    currentFact = randomFact;

    factText.style.opacity = "0";
    factText.style.transform = "translateY(8px) scale(0.98)";

    setTimeout(() => {
        factText.innerText = randomFact;
        factText.style.opacity = "1";
        factText.style.transform = "translateY(0) scale(1)";
    }, 180);

    vibrate("medium");
}

function shareFact() {
    const fact = (currentFact || factText.innerText || "").trim();

    if (!fact || fact.toLowerCase().includes("сгенерируй")) {
        if (tg?.showAlert) {
            tg.showAlert("Сначала сгенерируй факт 🔮");
        } else {
            alert("Сначала сгенерируй факт 🔮");
        }
        return;
    }

    const shareText = `🔮 Факт-Оракул:\n\n${fact}`;

    if (tg?.switchInlineQuery) {
        tg.switchInlineQuery(shareText, ["users", "groups", "channels"]);
    } else {
        navigator.clipboard?.writeText(shareText);
        alert("Факт скопирован. Открой Telegram и вставь его в чат.");
    }
}

generateBtn?.addEventListener("click", generateFact);
sendBtn?.addEventListener("click", shareFact);

generateFact();
