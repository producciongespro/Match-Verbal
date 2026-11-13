import React, { useEffect } from 'react';
import { playAudioFile } from '../utils/audio';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    playAudioFile('audios/intro.mp3');
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      onClick={onFinish}
      className="relative flex min-h-screen w-full cursor-pointer items-center justify-center bg-black overflow-hidden"
      title="Cliquez pour continuer"
    >
      <img
        src="img/splash.jpg"
        alt="Match Verbal Splash"
        className="h-screen w-full max-w-2xl object-cover sm:object-contain animate-fade-in"
      />
    </div>
  );
}
