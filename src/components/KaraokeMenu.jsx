import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function KaraokeMenu({
  canciones,
  ultimoNivel,
  onSelectSong,
  onOpenCredits,
  onHome,
}) {
  // Original app showed 8 songs (indices 0..7); let's display up to 8 or all available
  const maxBotones = Math.min(canciones.length, 8);

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <Header
        leftIcon="img/logo.png"
        rightIcon="img/icons/Info.png"
        onRightClick={onOpenCredits}
      />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 py-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img
            src="img/icons/Microfono-T.png"
            alt="Micro"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-[#4bbccb]">
            Karaoké
          </h1>
        </div>

        <p className="mb-6 text-center text-base sm:text-lg font-semibold text-slate-600">
          Chantez et pratiquez des verbes au sein de ces chansons
        </p>

        <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-md w-full place-items-center">
          {canciones.slice(0, maxBotones).map((song, i) => {
            const isUnlocked = i < 2 || ultimoNivel >= i;
            const imgSrc = isUnlocked
              ? `img/karaoke/cancion${i}.png`
              : `img/karaoke/cancion${i}b.png`;

            return (
              <button
                key={song.id || i}
                type="button"
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onSelectSong(i)}
                className={`p-1 transition-transform ${
                  isUnlocked
                    ? 'cursor-pointer hover:scale-105 active:scale-95'
                    : 'cursor-not-allowed opacity-85'
                }`}
                title={isUnlocked ? `${song.titulo} - ${song.artista}` : 'Chanson verrouillée'}
              >
                <img
                  src={imgSrc}
                  alt={`Chanson ${i + 1}`}
                  className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
                />
              </button>
            );
          })}
        </div>
      </main>

      <Footer onHomeClick={onHome} />
    </div>
  );
}
