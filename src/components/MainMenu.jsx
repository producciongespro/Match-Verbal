import React from 'react';
import Header from './Header';

export default function MainMenu({
  ultimoNivel,
  onSelectLevel,
  onOpenKaraoke,
  onOpenCredits,
  onOpenConfig,
}) {
  const levels = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <Header
        leftIcon="img/logo.png"
        showConfig={true}
        onConfigClick={onOpenConfig}
        rightIcon="img/icons/Info.png"
        onRightClick={onOpenCredits}
      />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-between px-4 py-4 sm:py-6">
        {/* Title Row */}
        <div className="flex items-center justify-center gap-3 my-1">
          <img
            src="img/icons/llave-T.png"
            alt="Clé"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-[#4bbccb] tracking-tight">
            Niveaux
          </h1>
        </div>

        {/* 2-Column Grid matching original layout: Left column (1,2,3), Right column (4,5,6) */}
        <div className="my-4 grid w-full max-w-md grid-cols-2 gap-6 sm:gap-8 place-items-center">
          {/* Column 1: Levels 1, 2, 3 */}
          <div className="flex flex-col items-end gap-4 sm:gap-5 w-full">
            {levels.slice(0, 3).map((lvl) => {
              const isUnlocked = lvl <= ultimoNivel;
              const isCurrent = lvl === ultimoNivel;
              const imgSrc = isUnlocked
                ? `img/niveles/na${lvl}.png`
                : `img/niveles/n${lvl}.png`;

              return (
                <button
                  key={lvl}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => isUnlocked && onSelectLevel(lvl)}
                  className={`flex justify-end w-full transition-transform ${
                    isUnlocked
                      ? 'cursor-pointer hover:scale-105 active:scale-95'
                      : 'cursor-not-allowed opacity-80'
                  } ${isCurrent ? 'char-selected' : ''}`}
                >
                  <img
                    src={imgSrc}
                    alt={`Niveau ${lvl}`}
                    className="w-32 sm:w-40 h-auto object-contain select-none"
                  />
                </button>
              );
            })}
          </div>

          {/* Column 2: Levels 4, 5, 6 */}
          <div className="flex flex-col items-start gap-4 sm:gap-5 w-full">
            {levels.slice(3, 6).map((lvl) => {
              const isUnlocked = lvl <= ultimoNivel;
              const isCurrent = lvl === ultimoNivel;
              const imgSrc = isUnlocked
                ? `img/niveles/na${lvl}.png`
                : `img/niveles/n${lvl}.png`;

              return (
                <button
                  key={lvl}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => isUnlocked && onSelectLevel(lvl)}
                  className={`flex justify-start w-full transition-transform ${
                    isUnlocked
                      ? 'cursor-pointer hover:scale-105 active:scale-95'
                      : 'cursor-not-allowed opacity-80'
                  } ${isCurrent ? 'char-selected' : ''}`}
                >
                  <img
                    src={imgSrc}
                    alt={`Niveau ${lvl}`}
                    className="w-32 sm:w-40 h-auto object-contain select-none"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Karaoke Button */}
        <div className="mt-2 mb-4 flex w-full justify-center">
          <button
            type="button"
            onClick={onOpenKaraoke}
            className="w-3/4 max-w-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <img
              src="img/icons/btnKaraoke.png"
              alt="Karaoké"
              className="mx-auto w-full h-auto object-contain"
            />
          </button>
        </div>
      </main>
    </div>
  );
}
