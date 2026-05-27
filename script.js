const tg = window.Telegram.WebApp;

tg.expand();

const factText = document.getElementById("fact");
const generateBtn = document.getElementById("generate-btn");
const sendBtn = document.getElementById("send-btn");

const facts = [
    "Утки шпионят за тобой через отражения в окнах.",
    "Луна на самом деле сделана из просроченного сыра.",
    "90% людей забывают, зачем зашли в комнату. Остальные врут.",
    "Если кот смотрит в стену — там призрак.",
    "Wi-Fi работает быстрее, если на него кричать.",
    "Пельмени вкуснее после полуночи по законам физики.",
    "Комары выбирают жертву по музыкальному вкусу.",
    "Чем громче пакетик чипсов — тем вкуснее содержимое.",
    "Каждый холодильник ночью издает звуки, чтобы напугать тебя.",
    "Если долго смотреть на носки — они исчезают по одному."
];

function generateFact() {
    const randomFact =
        facts[Math.floor(Math.random() * facts.length)];

    factText.style.opacity = "0";

    setTimeout(() => {
        factText.innerText = randomFact;
        factText.style.opacity = "1";
    }, 200);

    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred("medium");
    }
}

generateBtn.addEventListener("click", generateFact);

sendBtn.addEventListener("click", () => {
    const fact = factText.innerText.trim();

    if (!fact || fact.includes("Нажми")) {
        tg.showAlert("Сначала сгенерируй факт");
        return;
    }

    Telegram.WebApp.switchInlineQuery(
        `🔮 Факт-Оракул:\n\n${fact}`,
        ["users", "groups", "channels"]
    );
});

generateFact();
