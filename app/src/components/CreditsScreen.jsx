import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function CreditsScreen({ creditos, onHome }) {
  const info = creditos?.[0] || {};

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white">
      <Header title="Crédits" />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 py-6">
        <div className="w-full rounded-2xl bg-sky-50/70 p-6 sm:p-8 border border-sky-100 shadow-xs space-y-3 text-base sm:text-lg text-[#009ee3] leading-relaxed">
          <p>
            <strong className="text-[#005386]">Auteur :</strong> {info.Auteur}
          </p>
          <p>
            <strong className="text-[#005386]">Développeurs :</strong> {info['Développeurs']}
          </p>
          <p>
            <strong className="text-[#005386]">Graphiste et Enregistrement audio :</strong>{' '}
            {info.Graphiste_y_Enregistrement_audio}
          </p>
          <p>
            <strong className="text-[#005386]">Audio :</strong> {info.Audio}
          </p>
          <p>
            <strong className="text-[#005386]">Idée originale :</strong> {info['Idée_originale']}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <img
            src="img/logo.png"
            alt="Logo Match Verbal"
            className="h-16 sm:h-24 w-auto object-contain"
          />
          <img
            src="img/mep.png"
            alt="Logo MEP"
            className="h-16 sm:h-24 w-auto object-contain"
          />
        </div>
      </main>

      <Footer onHomeClick={onHome} />
    </div>
  );
}
