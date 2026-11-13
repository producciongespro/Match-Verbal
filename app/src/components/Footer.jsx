import React from 'react';

export default function Footer({
  leftIcon,
  onLeftClick,
  leftTitle = 'Retour',
  centerIcon = 'img/icons/home.PNG',
  onHomeClick,
  rightIcon,
  onRightClick,
  rightTitle = '',
  highlightRight = false,
}) {
  return (
    <footer className="sticky bottom-0 z-20 w-full bg-white pb-3 pt-1 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
      <div className="rayita-divider mb-2" />
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 sm:px-10">
        {/* Left Button */}
        <div className="flex w-1/3 justify-start">
          {leftIcon ? (
            <button
              type="button"
              onClick={onLeftClick}
              title={leftTitle}
              className="rounded-xl p-1.5 transition hover:bg-sky-50 active:scale-95 cursor-pointer"
            >
              <img
                src={leftIcon}
                alt={leftTitle}
                className="h-11 w-11 sm:h-14 sm:w-14 object-contain"
              />
            </button>
          ) : (
            <div className="h-11 w-11 sm:h-14 sm:w-14" />
          )}
        </div>

        {/* Center Home Button */}
        <div className="flex w-1/3 justify-center">
          {centerIcon && (
            <button
              type="button"
              onClick={onHomeClick}
              title="Accueil"
              className="rounded-xl p-1.5 transition hover:bg-sky-50 active:scale-95 cursor-pointer"
            >
              <img
                src={centerIcon}
                alt="Accueil"
                className="h-11 w-11 sm:h-14 sm:w-14 object-contain"
              />
            </button>
          )}
        </div>

        {/* Right Button */}
        <div className="flex w-1/3 justify-end">
          {rightIcon ? (
            <button
              type="button"
              onClick={onRightClick}
              disabled={!onRightClick}
              title={rightTitle}
              className={`rounded-xl p-1.5 transition ${
                onRightClick
                  ? 'hover:bg-sky-50 active:scale-95 cursor-pointer'
                  : 'cursor-not-allowed opacity-75'
              } ${highlightRight ? 'char-selected' : ''}`}
            >
              <img
                src={rightIcon}
                alt={rightTitle || 'Action'}
                className="h-11 w-11 sm:h-14 sm:w-14 object-contain"
              />
            </button>
          ) : (
            <div className="h-11 w-11 sm:h-14 sm:w-14" />
          )}
        </div>
      </div>
    </footer>
  );
}
