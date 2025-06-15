const crazyButton = document.getElementById("crazyButton");
const randomOutput = document.getElementById("randomOutput");
const clickCount = document.getElementById("clickCount");
const puisiForm = document.getElementById("puisiForm");
const kataInput = document.getElementById("kataInput");
const puisiOutput = document.getElementById("puisiOutput");

let totalClicks = 0;

const weirdThings = [
  "🪿 Suara bebek menggema...",
  "💔 Puisi: Aku dan kamu seperti gorengan tanpa sambal.",
  "🕺 Kucing menari dengan gaya breakdance.",
  "🚨 Alarm tsunami berbunyi... tapi cuma bohong.",
  "🤡 Badut sedih karena kamu klik ini.",
  "🎶 Lagu dangdut mulai terdengar (di imajinasi).",
];

crazyButton.addEventListener("click", () => {
  const random = weirdThings[Math.floor(Math.random() * weirdThings.length)];
  randomOutput.textContent = random;

  totalClicks++;
  clickCount.textContent = totalClicks;

  // Easter egg
  if (totalClicks === 100) {
    alert("💥 SELAMAT! Kamu adalah klik-mania!");
  }

  // Ganti warna background
  document.body.style.backgroundColor = getRandomColor();

  // Kirim log ke server
  fetch("/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ klik: true })
  });
});

puisiForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const kata = kataInput.value;

  // Dummy puisi bodoh
  const puisi = `Hai "${kata}",\nKau seperti mie instan...\nCepat membuatku jatuh cinta, lalu kenyang sendiri.`;
  puisiOutput.textContent = puisi;

  // Kirim ke server
  fetch("/puisi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ kata })
  });

  kataInput.value = "";
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}
