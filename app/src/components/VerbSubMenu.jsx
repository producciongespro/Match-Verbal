import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function VerbSubMenu({
  levelNumber,
  levelVerbs,
  verbosVistos,
  practiceUnlocked,
  ensureFirstVerbUnlocked,
  onSelectVerb,
  onStartActivity,
  onHome,
}) {
  useEffect(() => {
    ensureFirstVerbUnlocked(levelVerbs);
  }, [levelVerbs, ensureFirstVerbUnlocked]);

  // Determine which verb is the latest unlocked one in this level to highlight it
  const unlockedIndices = levelVerbs
    .map((v, idx) => (verbosVistos.includes(v.verbo[0]) ? idx : -1))
    .filter((idx) => idx !== -1);
  const latestUnlockedIdx =
    unlockedIndices.length > 0 ? Math.max(...unlockedIndices) : 0;

  const renderVerbButton = (verbObj, idx) => {
    const label = verbObj.verbo[0];
    const isUnlocked = idx === 0 || verbosVistos.includes(label);
    const isHighlighted =
      isUnlocked && idx === latestUnlockedIdx && !practiceUnlocked;

    return (
      <button
        key={idx}
        type="button"
        disabled={!isUnlocked}
        onClick={() => isUnlocked && onSelectVerb(idx)}
        className={`w-full rounded-xl py-3.5 px-3 text-center font-bold transition-all shadow-xs ${
          label.length > 8 ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
        } ${
          isUnlocked
            ? 'bg-[#005386] text-white hover:bg-[#0066a4] active:scale-95 cursor-pointer'
            : 'bg-[#efeeee] text-[#a9a5a4] cursor-not-allowed'
        } ${isHighlighted ? 'char-selected ring-3 ring-[#009ee3]' : ''}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <Header title={`Niveaux ${levelNumber}`} />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 py-4">
        <p className="mb-4 text-center text-sm sm:text-base font-semibold text-slate-500">
          {practiceUnlocked
            ? 'Tous les verbes ont été consultés ! Vous pouvez passer à la pratique.'
            : 'Consultez chaque verbe dans l’ordre pour débloquer l’exercice.'}
        </p>

        {/* 2 columns of 5 verbs each (0..4 left, 5..9 right) */}
        <div className="grid w-full max-w-md grid-cols-2 gap-3.5 sm:gap-5">
          <div className="flex flex-col gap-3 sm:gap-4">
            {levelVerbs.slice(0, 5).map((v, i) => renderVerbButton(v, i))}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {levelVerbs.slice(5, 10).map((v, i) => renderVerbButton(v, i + 5))}
          </div>
        </div>
      </main>

      <Footer
        onHomeClick={onHome}
        rightIcon={
          practiceUnlocked
            ? 'img/icons/practica.png'
            : 'img/icons/practicaBloqueada.png'
        }
        onRightClick={practiceUnlocked ? onStartActivity : undefined}
        rightTitle={
          practiceUnlocked
            ? 'Aller à la pratique'
            : 'Consultez les 10 verbes pour débloquer la pratique'
        }
        highlightRight={practiceUnlocked}
      />
    </div>
  );
}
