import React, { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { playFeedbackAudio } from '../../utils/audio';

export default function SelectActivity({
  levelNumber,
  questions,
  onCompleteLevel,
  onBack,
  onHome,
}) {
  const [answers, setAnswers] = useState(() => questions.map(() => ''));
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState([]);
  const [allCorrect, setAllCorrect] = useState(false);

  const allSelected = answers.every((ans) => ans.trim().length > 0);

  const handleSelectChange = (idx, value) => {
    if (checked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const handleValidate = () => {
    if (!allSelected || checked) return;

    const evaluated = questions.map((q, idx) => {
      const userVal = answers[idx].trim().toLowerCase();
      const expected = q.correcto.trim().toLowerCase();
      return userVal === expected;
    });

    const isAllGood = evaluated.every(Boolean);
    setResults(evaluated);
    setChecked(true);
    setAllCorrect(isAllGood);
    playFeedbackAudio(isAllGood);

    if (isAllGood) {
      onCompleteLevel(levelNumber);
    }
  };

  const handleRetryWrong = () => {
    setAnswers((prev) =>
      prev.map((val, idx) => (results[idx] ? val : ''))
    );
    setChecked(false);
    setResults([]);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <Header
        leftIcon="img/icons/llave-M.png"
        title={String(levelNumber)}
        isActivity={true}
      />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-4">
        <h4 className="mb-4 text-xl sm:text-2xl font-bold text-[#4bbccb]">
          Choisissez la forme verbale correcte pour compléter la phrase.
        </h4>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {questions.map((item, idx) => {
            const isRight = checked && results[idx];
            const isWrong = checked && !results[idx];

            return (
              <div
                key={item.idPregunta || idx}
                className="rounded-xl bg-slate-50/70 p-3.5 border border-slate-100 text-base sm:text-lg leading-relaxed text-slate-700"
              >
                <span className="font-bold text-[#005386] mr-1.5">
                  {idx + 1}.
                </span>
                <span>{item.parte1} </span>

                <span className="inline-flex items-center gap-1 mx-1 align-middle">
                  <select
                    value={answers[idx]}
                    disabled={checked}
                    onChange={(e) => handleSelectChange(idx, e.target.value)}
                    className={`rounded-lg border px-2.5 py-1 text-base sm:text-lg font-semibold outline-none transition cursor-pointer ${
                      isRight
                        ? 'border-[#009624] bg-[#dcedc8] text-green-900'
                        : isWrong
                        ? 'border-[#e77776] bg-[#f8dbdb] text-red-900'
                        : 'border-sky-300 bg-white text-slate-800 focus:border-[#009ee3] focus:ring-2 focus:ring-sky-200'
                    }`}
                  >
                    <option value="" disabled>
                      -- Choisissez --
                    </option>
                    <option value={item.verbo1}>{item.verbo1}</option>
                    <option value={item.verbo2}>{item.verbo2}</option>
                  </select>
                  {isRight && (
                    <Check className="h-5 w-5 text-[#009624] shrink-0" />
                  )}
                  {isWrong && (
                    <X className="h-5 w-5 text-[#e4241f] shrink-0" />
                  )}
                </span>

                <span> {item.parte2}</span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col items-center gap-3">
          {!checked ? (
            <button
              type="button"
              disabled={!allSelected}
              onClick={handleValidate}
              className={`transition-transform ${
                allSelected
                  ? 'cursor-pointer hover:scale-105 active:scale-95'
                  : 'cursor-not-allowed opacity-70'
              }`}
            >
              <img
                src={
                  allSelected
                    ? 'img/icons/doneActivo.png'
                    : 'img/icons/doneInactivo.png'
                }
                alt="Vérifier"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </button>
          ) : allCorrect ? (
            <div className="rounded-xl bg-green-50 border border-green-200 px-5 py-2.5 text-center text-green-800 font-bold animate-fade-in">
              Excellent ! Toutes les réponses sont correctes. Cliquez sur la clé en bas à droite !
            </div>
          ) : (
            <button
              type="button"
              onClick={handleRetryWrong}
              className="flex items-center gap-2 rounded-xl bg-[#009ee3] px-5 py-2.5 font-bold text-white shadow-xs transition hover:bg-[#0088c6] active:scale-95 cursor-pointer"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Corriger les erreurs</span>
            </button>
          )}
        </div>
      </main>

      <Footer
        leftIcon="img/icons/Izquierda-T.png"
        onLeftClick={onBack}
        leftTitle="Retour aux verbes"
        onHomeClick={onHome}
        rightIcon={
          allCorrect ? 'img/icons/llave-T.png' : 'img/icons/llave-inactiva.png'
        }
        onRightClick={allCorrect ? onHome : undefined}
        rightTitle={
          allCorrect ? 'Niveau débloqué ! Retour au menu' : 'Complétez tout correctement'
        }
        highlightRight={allCorrect}
      />
    </div>
  );
}
