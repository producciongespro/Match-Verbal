import React, { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { playFeedbackAudio } from '../../utils/audio';

export default function DragWordActivity({
  levelNumber = 3,
  questions,
  onCompleteLevel,
  onBack,
  onHome,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === total - 1;
  const levelPassed = isLastQuestion && selectedWord !== null && score === total;

  const evaluateChoice = (word) => {
    if (selectedWord !== null) return;
    const right =
      word.trim().toLowerCase() ===
      currentQuestion.correcta.trim().toLowerCase();

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

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const word = e.dataTransfer.getData('text/plain');
    if (word) {
      evaluateChoice(word);
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
        title={String(levelNumber)}
        isActivity={true}
      />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-between px-5 py-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#005386] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Question {currentIndex + 1} / {total}
            </span>
            <span className="text-sm font-bold text-[#009ee3]">
              Réussites : {score} / {total}
            </span>
          </div>

          <h4 className="mb-6 text-xl sm:text-2xl font-bold text-[#4bbccb]">
            Emportez la forme correcte du verbe pour compléter la phrase.
          </h4>

          {/* Draggable / Clickable Word Cards */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {currentQuestion.elementos.map((palabra, i) => {
              const isChosen = selectedWord === palabra;
              if (isChosen) return null;

              return (
                <div
                  key={`${palabra}-${i}`}
                  draggable={selectedWord === null}
                  onDragStart={(e) => handleDragStart(e, palabra)}
                  onClick={() => evaluateChoice(palabra)}
                  className={`rounded-xl border-2 border-[#009ee3] bg-white px-4 py-2.5 text-center font-bold text-[#009ee3] shadow-xs transition select-none ${
                    palabra.length > 9 ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                  } ${
                    selectedWord === null
                      ? 'cursor-pointer hover:bg-sky-50 hover:scale-105 active:scale-95'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  title="Glissez ou cliquez pour placer ce verbe"
                >
                  {palabra}
                </div>
              );
            })}
          </div>

          {/* Sentence with Drop Target */}
          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 text-xl sm:text-2xl leading-relaxed text-slate-800 text-center shadow-2xs">
            <span>{currentQuestion.parte1} </span>

            <span
              onDragOver={(e) => {
                e.preventDefault();
                if (selectedWord === null) setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`inline-flex min-w-[150px] items-center justify-center gap-1.5 rounded-xl border-b-3 px-4 py-1 mx-1 font-bold transition ${
                selectedWord === null
                  ? isDragOver
                    ? 'border-[#009ee3] bg-sky-100 text-[#009ee3]'
                    : 'border-slate-400 bg-white text-slate-400'
                  : isCorrect
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-red-600 bg-red-50 text-red-700'
              }`}
            >
              {selectedWord ? (
                <>
                  <span>{selectedWord}</span>
                  {isCorrect ? (
                    <Check className="h-6 w-6 text-green-600" />
                  ) : (
                    <X className="h-6 w-6 text-red-600" />
                  )}
                </>
              ) : (
                '___________'
              )}
            </span>

            <span> {currentQuestion.parte2}</span>
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
