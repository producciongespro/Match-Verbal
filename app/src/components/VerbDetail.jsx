import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { playVerbAudio } from '../utils/audio';

const TITULOS = ['Infinitif', 'Passé composé', 'Futur simple'];

export default function VerbDetail({
  levelNumber,
  verbIndex,
  levelVerbs,
  markVerbVisited,
  onBack,
  onHome,
}) {
  const [showMeaning, setShowMeaning] = useState(false);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);

  const verbData = levelVerbs?.[verbIndex]?.verbo || [];

  useEffect(() => {
    markVerbVisited(levelNumber, verbIndex, levelVerbs);
    setShowMeaning(false);
  }, [levelNumber, verbIndex, levelVerbs, markVerbVisited]);

  const handlePlayTense = (idx) => {
    const text = verbData[idx];
    if (!text) return;
    setActiveAudioIndex(idx);
    playVerbAudio(text, idx);
    setTimeout(() => {
      setActiveAudioIndex(null);
    }, 900);
  };

  const handleShowSens = () => {
    setShowMeaning(true);
    setTimeout(() => {
      setShowMeaning(false);
    }, 2200);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <Header title={`Niveaux ${levelNumber}`} />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-6 py-4">
        <div className="w-full max-w-sm space-y-4">
          {TITULOS.map((titulo, idx) => (
            <div key={titulo} className="w-full">
              <p className="mb-1.5 text-left text-lg sm:text-xl font-bold text-[#009ee3]">
                {titulo}
              </p>
              <button
                type="button"
                onClick={() => handlePlayTense(idx)}
                className={`flex w-full items-center justify-between rounded-xl bg-[#009ee3] px-5 py-3.5 sm:py-4 text-xl sm:text-2xl font-bold text-white shadow-sm transition hover:bg-[#0088c6] active:scale-98 cursor-pointer ${
                  activeAudioIndex === idx ? 'ring-4 ring-sky-300' : ''
                }`}
              >
                <span className="mx-auto">{verbData[idx]}</span>
                <Volume2 className="h-6 w-6 shrink-0 opacity-85" />
              </button>
            </div>
          ))}

          {/* Sens (Meaning in Spanish) */}
          <div className="pt-6">
            <button
              type="button"
              onClick={handleShowSens}
              className="w-full rounded-xl bg-[#e4241f] px-5 py-3.5 sm:py-4 text-center text-xl sm:text-2xl font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-98 cursor-pointer"
            >
              {showMeaning ? verbData[3] : 'Sens'}
            </button>
          </div>
        </div>
      </main>

      <Footer
        leftIcon="img/icons/Izquierda-T.png"
        onLeftClick={onBack}
        leftTitle="Retour aux verbes"
        onHomeClick={onHome}
      />
    </div>
  );
}
