import React, { useState } from 'react';
import contenidosData from './data/contenidos.json';
import { useProgress } from './hooks/useProgress';
import SplashScreen from './components/SplashScreen';
import MainMenu from './components/MainMenu';
import VerbSubMenu from './components/VerbSubMenu';
import VerbDetail from './components/VerbDetail';
import KaraokeMenu from './components/KaraokeMenu';
import KaraokeDetail from './components/KaraokeDetail';
import CreditsScreen from './components/CreditsScreen';
import SettingsModal from './components/SettingsModal';
import FillInBlankActivity from './components/activities/FillInBlankActivity';
import SelectActivity from './components/activities/SelectActivity';
import DragWordActivity from './components/activities/DragWordActivity';
import MatchImageActivity from './components/activities/MatchImageActivity';

export default function App() {
  // Screens: 'splash' | 'menu' | 'submenu' | 'verbDetail' | 'activity' | 'karaokeMenu' | 'karaokeDetail' | 'credits'
  const [screen, setScreen] = useState('splash');
  const [currentLevel, setCurrentLevel] = useState(1); // 1..6
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0); // 0..9
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const {
    ultimoNivel,
    verbosVistos,
    ensureFirstVerbUnlocked,
    markVerbVisited,
    isPracticeUnlocked,
    unlockNextLevel,
    resetProgress,
  } = useProgress();

  const webApp = contenidosData.webApp;
  const nivelesRaw = webApp[0].niveles;
  const canciones = webApp[2].canciones;
  const creditos = webApp[3].creditos;

  // In contenidos.json, even indices (0, 2, 4, 6, 8, 10) hold { verbos: [...] }
  // and odd indices (1, 3, 5, 7, 9, 11) hold { actividades: [...] }
  const levelVerbsIndex = (currentLevel - 1) * 2;
  const levelActivitiesIndex = levelVerbsIndex + 1;
  const currentLevelVerbs = nivelesRaw[levelVerbsIndex]?.verbos || [];
  const currentLevelActivities =
    nivelesRaw[levelActivitiesIndex]?.actividades || [];

  const goHome = () => {
    setScreen('menu');
  };

  const handleSelectLevel = (lvl) => {
    setCurrentLevel(lvl);
    setScreen('submenu');
  };

  const handleSelectVerb = (verbIdx) => {
    setCurrentVerbIndex(verbIdx);
    setScreen('verbDetail');
  };

  const renderActivity = () => {
    const commonProps = {
      levelNumber: currentLevel,
      questions: currentLevelActivities,
      onCompleteLevel: unlockNextLevel,
      onBack: () => setScreen('submenu'),
      onHome: goHome,
    };

    switch (currentLevel) {
      case 1:
      case 5:
        return <FillInBlankActivity {...commonProps} />;
      case 2:
      case 6:
        return <SelectActivity {...commonProps} />;
      case 3:
        return <DragWordActivity {...commonProps} />;
      case 4:
        return <MatchImageActivity {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg min-h-screen flex flex-col">
        {screen === 'splash' && (
          <SplashScreen onFinish={() => setScreen('menu')} />
        )}

        {screen === 'menu' && (
          <MainMenu
            ultimoNivel={ultimoNivel}
            onSelectLevel={handleSelectLevel}
            onOpenKaraoke={() => setScreen('karaokeMenu')}
            onOpenCredits={() => setScreen('credits')}
            onOpenConfig={() => setIsConfigOpen(true)}
          />
        )}

        {screen === 'submenu' && (
          <VerbSubMenu
            levelNumber={currentLevel}
            levelVerbs={currentLevelVerbs}
            verbosVistos={verbosVistos}
            practiceUnlocked={isPracticeUnlocked(
              currentLevel,
              currentLevelVerbs
            )}
            ensureFirstVerbUnlocked={ensureFirstVerbUnlocked}
            onSelectVerb={handleSelectVerb}
            onStartActivity={() => setScreen('activity')}
            onHome={goHome}
          />
        )}

        {screen === 'verbDetail' && (
          <VerbDetail
            levelNumber={currentLevel}
            verbIndex={currentVerbIndex}
            levelVerbs={currentLevelVerbs}
            markVerbVisited={markVerbVisited}
            onBack={() => setScreen('submenu')}
            onHome={goHome}
          />
        )}

        {screen === 'activity' && renderActivity()}

        {screen === 'karaokeMenu' && (
          <KaraokeMenu
            canciones={canciones}
            ultimoNivel={ultimoNivel}
            onSelectSong={(idx) => {
              setCurrentSongIndex(idx);
              setScreen('karaokeDetail');
            }}
            onOpenCredits={() => setScreen('credits')}
            onHome={goHome}
          />
        )}

        {screen === 'karaokeDetail' && (
          <KaraokeDetail
            songIndex={currentSongIndex}
            song={canciones[currentSongIndex]}
            onBack={() => setScreen('karaokeMenu')}
            onOpenCredits={() => setScreen('credits')}
            onHome={goHome}
          />
        )}

        {screen === 'credits' && (
          <CreditsScreen creditos={creditos} onHome={goHome} />
        )}

        <SettingsModal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          onConfirmReset={() => {
            resetProgress();
            setScreen('menu');
          }}
        />
      </div>
    </div>
  );
}
