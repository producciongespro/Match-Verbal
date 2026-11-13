import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function KaraokeDetail({
  songIndex,
  song,
  onBack,
  onOpenCredits,
  onHome,
}) {
  if (!song) return null;

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <Header
        leftIcon="img/logo.png"
        rightIcon="img/icons/Info.png"
        onRightClick={onOpenCredits}
      />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src="img/icons/Microfono-T.png"
            alt="Micro"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-[#4bbccb]">
            karaoké
          </h1>
        </div>

        <div className="my-4 w-full rounded-2xl bg-sky-50/60 p-6 border border-sky-100 shadow-xs">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#009ee3]">
            {song.titulo}
          </h3>
          <p className="mt-1 text-lg sm:text-xl font-bold text-[#005386]">
            {song.artista}
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10">
            <a
              href={song.url1}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              title="Vidéo Karaoké"
            >
              <img
                src={`img/karaoke/karaoke${songIndex}.png`}
                alt="Karaoké Vidéo"
                className="h-28 w-28 sm:h-36 sm:w-36 object-contain"
              />
              <span className="text-sm font-bold text-[#009ee3]">Karaoké</span>
            </a>

            <a
              href={song.url2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              title="Paroles / Lyrics"
            >
              <img
                src={`img/karaoke/lyric${songIndex}.png`}
                alt="Lyrics Vidéo"
                className="h-28 w-28 sm:h-36 sm:w-36 object-contain"
              />
              <span className="text-sm font-bold text-[#009ee3]">Paroles</span>
            </a>
          </div>
        </div>
      </main>

      <Footer
        leftIcon="img/icons/Izquierda-T.png"
        onLeftClick={onBack}
        leftTitle="Retour au menu Karaoké"
        onHomeClick={onHome}
      />
    </div>
  );
}
