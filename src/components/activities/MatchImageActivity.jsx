import React, { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { playFeedbackAudio } from '../../utils/audio';

function normalizeFrench(str) {
  return (str || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function MatchImageActivity({
  levelNumber = 4,
  questions,
  onCompleteLevel,
  onBack,
  onHome,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === total - 1;
  const levelPassed = isLastQuestion && selectedWord !== null && score === total;

  const handleSelectWord = (word) => {
    if (selectedWord !== null) return;

    const right =
      normalizeFrench(word) === normalizeFrench(currentQuestion.correcta);

    setSelectedWord(word);
    setIsCorrect(right);
    playFeedbackAudio(right);

    const newScore = right ? score + 1 : score;
    if (right) {
      setScore(newScore);
    }

    if (isLastQuestion && newScore === total) {
      onCompleteLevel(levelNumber);
    }
  };

  const handleNext = () => {
    if (selectedWord === null || isLastQuestion) return;
    setCurrentIndex((prev) => prev + 1);
    setSelectedWord(null);
    setIsCorrect(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedWord(null);
    setIsCorrect(null);
    setScore(0);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <Header
        leftIcon="img/icons/llave-M.png"
        title={`Niveaux ${levelNumber}`}
        isActivity={true}
      />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-between px-5 py-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#005386] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Image {currentIndex + 1} / {total}
            </span>
            <span className="text-sm font-bold text-[#009ee3]">
              Réussites : {score} / {total}
            </span>
          </div>

          <h4 className="mb-6 text-xl sm:text-2xl font-bold text-[#4bbccb]">
            Choisissez le verbe correct pour l'image correspondante.
          </h4>

          {/* Image + 3 Verb Cards Layout */}
          <div className="my-4 grid grid-cols-12 items-center gap-4 sm:gap-8">
            {/* Left: Verb Illustration */}
            <div className="col-span-7 flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <img
                src={`img/draws/${currentQuestion.imagen}`}
                alt="Illustration du verbe"
                className="h-44 w-44 sm:h-60 sm:w-60 object-contain"
              />
            </div>

            {/* Right: 3 Selectable Cards */}
            <div className="col-span-5 flex flex-col items-end justify-center gap-4 sm:gap-5">
              {currentQuestion.elementos.map((palabra, idx) => {
                const isThisSelected = selectedWord === palabra;

                return (
                  <button
                    key={`${palabra}-${idx}`}
                    type="button"
                    disabled={selectedWord !== null}
                    onClick={() => handleSelectWord(palabra)}
                    className={`flex w-full items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-3 text-base sm:text-xl font-bold transition-all duration-300 ${
                      isThisSelected
                        ? isCorrect
                          ? '-translate-x-4 sm:-translate-x-8 scale-105 border-green-600 bg-green-50 text-green-700 shadow-md'
                          : '-translate-x-4 sm:-translate-x-8 scale-105 border-red-600 bg-red-50 text-red-700 shadow-md'
                        : selectedWord !== null
                        ? 'border-slate-200 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'border-[#009ee3] bg-white text-[#009ee3] hover:bg-sky-50 hover:scale-105 active:scale-95 cursor-pointer shadow-xs'
                    }`}
                  >
                    <span>{palabra}</span>
                    {isThisSelected &&
                      (isCorrect ? (
                        <Check className="h-5 w-5 text-green-600 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-600 shrink-0" />
                      ))}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Next / Retry Controls */}
        <div className="mt-6 flex items-center justify-end gap-4">
          {!isLastQuestion ? (
            <button
              type="button"
              disabled={selectedWord === null}
              onClick={handleNext}
              className={`transition-transform ${
                selectedWord !== null
                  ? 'cursor-pointer hover:scale-105 active:scale-95'
                  : 'cursor-not-allowed opacity-70'
              }`}
            >
              <img
                src={
                  selectedWord !== null
                    ? 'img/icons/nextActivo.png'
                    : 'img/icons/nextInactivo.png'
                }
                alt="Suivant"
                className="h-11 sm:h-14 w-auto object-contain"
              />
            </button>
          ) : selectedWord !== null ? (
            levelPassed ? (
              <div className="w-full rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-center text-green-800 font-bold">
                Bravo ! 6/6 réponses correctes ! Cliquez sur la clé en bas à droite.
              </div>
            ) : (
              <div className="flex w-full items-center justify-between rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                <span className="text-sm sm:text-base font-bold text-amber-900">
                  Score : {score}/{total}. Il faut {total}/{total} pour débloquer le niveau suivant.
                </span>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 rounded-xl bg-[#009ee3] px-4 py-2 text-sm font-bold text-white hover:bg-[#0088c6] cursor-pointer shrink-0"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Recommencer</span>
                </button>
              </div>
            )
          ) : null}
        </div>
      </main>

      <Footer
        leftIcon="img/icons/Izquierda-T.png"
        onLeftClick={onBack}
        leftTitle="Retour aux verbes"
        onHomeClick={onHome}
        rightIcon={
          levelPassed ? 'img/icons/llave-T.png' : 'img/icons/llave-inactiva.png'
        }
        onRightClick={levelPassed ? onHome : undefined}
        rightTitle={
          levelPassed ? 'Niveau débloqué ! Retour au menu' : 'Complétez les 6 exercices'
        }
        highlightRight={levelPassed}
      />
    </div>
  );
}
