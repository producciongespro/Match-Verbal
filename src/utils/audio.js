let currentAudio = null;

const AUDIO_EXCEPTIONS = {
  'je-suis-entre': 'j-suis-entre',
  'je-courrai': 'je-courrerai',
  'je-suis-reste': 'j-suis-reste',
};

export function normalizeVerbAudioName(palabra) {
  if (!palabra) return '';

  let clean = '';
  for (let i = 0; i < palabra.length; i++) {
    const ch = palabra.charAt(i);
    clean += ch === ' ' || ch === '/' || ch === "'" ? '-' : ch;
  }

  clean = clean.charAt(0).toLowerCase() + clean.slice(1);

  clean = clean
    .replace(/[àá]/g, 'a')
    .replace(/[èéê]/g, 'e')
    .replace(/[ìíî]/g, 'i')
    .replace(/[òóô]/g, 'o')
    .replace(/[ùúû]/g, 'u');

  if (AUDIO_EXCEPTIONS[clean]) {
    return AUDIO_EXCEPTIONS[clean];
  }

  return clean;
}

export function playAudioFile(src) {
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(src);
    const playPromise = currentAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Ignore browser autoplay block on initial splash screen
      });
    }
  } catch (err) {
    console.warn('No se pudo reproducir el audio:', src, err);
  }
}

export function playVerbAudio(verbText, tenseIndex = 0) {
  const normalized = normalizeVerbAudioName(verbText);
  if (!normalized) return;

  if (normalized === 'read' && tenseIndex === 0) {
    playAudioFile('audios/readp.mp3');
    return;
  }

  playAudioFile(`audios/${normalized}.mp3`);
}

export function playFeedbackAudio(isCorrect) {
  playAudioFile(isCorrect ? 'audios/correct.mp3' : 'audios/wrong.mp3');
}
