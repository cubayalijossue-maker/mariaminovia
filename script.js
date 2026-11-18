const envelopeScreen = document.getElementById('envelopeScreen');
const birthdayScreen = document.getElementById('birthdayScreen');
const letterScreen = document.getElementById('letterScreen');
const envelope = document.getElementById('openEnvelope');
const candles = [...document.querySelectorAll('.candle')];
const instruction = document.getElementById('cakeInstruction');
const toLetter = document.getElementById('toLetter');
const giftMessage = document.getElementById('giftMessage');
const toast = document.getElementById('toast');
let toastTimer;

function showScreen(screen) {
  [envelopeScreen, birthdayScreen, letterScreen].forEach(item => item.classList.remove('active'));
  screen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

envelope.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return;
  envelope.classList.add('open');
  setTimeout(() => showScreen(birthdayScreen), 950);
});

candles.forEach(candle => {
  candle.addEventListener('click', () => {
    if (candle.classList.contains('off')) return;
    candle.classList.add('off');
    const remaining = candles.filter(item => !item.classList.contains('off')).length;
    if (remaining > 0) {
      instruction.textContent = `¡Muy bien! Te quedan ${remaining} velita${remaining === 1 ? '' : 's'} ✨`;
    } else {
      instruction.textContent = '¡Deseo concedido! Que todos tus sueños se hagan realidad 💚';
      toLetter.classList.remove('hidden');
      showToast('¡Feliz cumpleaños, mi amor! ❤️');
    }
  });
});

toLetter.addEventListener('click', () => showScreen(letterScreen));

document.querySelectorAll('.gift').forEach(gift => {
  gift.addEventListener('click', () => {
    document.querySelectorAll('.gift').forEach(item => item.classList.remove('selected'));
    gift.classList.add('selected');
    giftMessage.textContent = gift.dataset.message;
  });
});

document.getElementById('replay').addEventListener('click', () => {
  envelope.classList.remove('open');
  candles.forEach(candle => candle.classList.remove('off'));
  instruction.textContent = 'Pide un deseo y toca las velitas para apagarlas ✨';
  toLetter.classList.add('hidden');
  document.querySelectorAll('.gift').forEach(item => item.classList.remove('selected'));
  giftMessage.textContent = 'Aquí aparecerá tu sorpresa...';
  showScreen(envelopeScreen);
});
