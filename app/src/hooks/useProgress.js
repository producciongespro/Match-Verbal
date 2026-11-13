import { useState, useCallback } from 'react';

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === 'undefined') return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(fallback) && !Array.isArray(parsed) ? fallback : parsed;
  } catch {
    return fallback;
  }
}

function readUltimoNivel() {
  const raw = localStorage.getItem('ultimoNivel');
  const num = parseInt(raw, 10);
  if (isNaN(num) || num < 1) {
    localStorage.setItem('ultimoNivel', '1');
    return 1;
  }
  return num;
}

export function useProgress() {
  const [ultimoNivel, setUltimoNivel] = useState(() => readUltimoNivel());
  const [verbosVistos, setVerbosVistos] = useState(() => {
    const list = readJsonStorage('VerbosVistos', []);
    localStorage.setItem('VerbosVistos', JSON.stringify(list));
    return list;
  });
  const [nivelesVistos, setNivelesVistos] = useState(() => {
    const list = readJsonStorage('nivelesVistos', []);
    localStorage.setItem('nivelesVistos', JSON.stringify(list));
    return list;
  });
  const [nivelCompleto, setNivelCompleto] = useState(() => {
    const val = readJsonStorage('nivelCompleto', 'false');
    localStorage.setItem('nivelCompleto', JSON.stringify(val));
    return val === 'true' || val === true;
  });

  const ensureFirstVerbUnlocked = useCallback((levelVerbs) => {
    if (!levelVerbs || levelVerbs.length === 0) return;
    const firstVerb = levelVerbs[0].verbo[0];
    setVerbosVistos((prev) => {
      if (prev.includes(firstVerb)) return prev;
      const updated = [...prev, firstVerb];
      localStorage.setItem('VerbosVistos', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markVerbVisited = useCallback((levelNumber, verbIndex, levelVerbs) => {
    if (!levelVerbs || !levelVerbs[verbIndex]) return;
    const currentVerb = levelVerbs[verbIndex].verbo[0];
    const nextIndex = verbIndex + 1;

    setVerbosVistos((prev) => {
      const updated = [...prev];
      if (!updated.includes(currentVerb)) {
        updated.push(currentVerb);
      }
      if (nextIndex < levelVerbs.length) {
        const nextVerb = levelVerbs[nextIndex].verbo[0];
        if (!updated.includes(nextVerb)) {
          updated.push(nextVerb);
        }
      }
      localStorage.setItem('VerbosVistos', JSON.stringify(updated));
      return updated;
    });

    if (nextIndex >= levelVerbs.length) {
      setNivelesVistos((prev) => {
        if (prev.includes(levelNumber)) return prev;
        const updated = [...prev, levelNumber];
        localStorage.setItem('nivelesVistos', JSON.stringify(updated));
        return updated;
      });
      setNivelCompleto(true);
      localStorage.setItem('nivelCompleto', JSON.stringify('true'));
    }
  }, []);

  const isPracticeUnlocked = useCallback(
    (levelNumber, levelVerbs) => {
      if (levelNumber < ultimoNivel) return true;
      if (nivelesVistos.includes(levelNumber)) return true;
      if (!levelVerbs || levelVerbs.length === 0) return false;
      return levelVerbs.every((item) => verbosVistos.includes(item.verbo[0])) && nivelCompleto;
    },
    [ultimoNivel, nivelesVistos, verbosVistos, nivelCompleto]
  );

  const unlockNextLevel = useCallback((completedLevelNumber) => {
    const nextLevel = completedLevelNumber + 1;
    setUltimoNivel((prev) => {
      const updated = Math.max(prev, nextLevel);
      localStorage.setItem('ultimoNivel', String(updated));
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.clear();
    localStorage.setItem('VerbosVistos', JSON.stringify([]));
    localStorage.setItem('nivelesVistos', JSON.stringify([]));
    localStorage.setItem('ultimoNivel', '1');
    localStorage.setItem('nivelCompleto', JSON.stringify('false'));
    setUltimoNivel(1);
    setVerbosVistos([]);
    setNivelesVistos([]);
    setNivelCompleto(false);
  }, []);

  return {
    ultimoNivel,
    verbosVistos,
    nivelesVistos,
    nivelCompleto,
    ensureFirstVerbUnlocked,
    markVerbVisited,
    isPracticeUnlocked,
    unlockNextLevel,
    resetProgress,
  };
}
