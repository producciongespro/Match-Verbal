import React from 'react';

export default function Header({
  leftIcon,
  title,
  isActivity = false,
  showConfig = false,
  onConfigClick,
  rightIcon,
  onRightClick,
}) {
  return (
    <header className="w-full bg-white pt-3 pb-1">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 sm:px-6 min-h-[64px]">
        {/* Left section */}
        <div className="flex w-1/4 items-center justify-start">
          {leftIcon ? (
            <img
              src={leftIcon}
              alt="Logo"
              className={
                isActivity
                  ? 'h-12 w-12 sm:h-16 sm:w-16 object-contain'
                  : 'h-11 sm:h-14 w-auto object-contain'
              }
            />
          ) : (
            <div className="h-12 w-12" />
          )}
        </div>

        {/* Center section */}
        <div className="flex w-2/4 items-center justify-center text-center">
          {showConfig ? (
            <button
              type="button"
              onClick={onConfigClick}
              className="group rounded-full p-2 transition hover:bg-sky-50 active:scale-95 cursor-pointer"
              title="Configuration / Réinitialiser"
            >
              <img
                src="img/icons/configurar.png"
                alt="Configurer"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain transition-transform group-hover:rotate-45"
              />
            </button>
          ) : title ? (
            <h1
              className={
                isActivity
                  ? 'text-3xl sm:text-5xl font-bold text-[#009ee3] tracking-tight'
                  : 'text-3xl sm:text-4xl font-bold text-[#4bbccb] tracking-tight'
              }
            >
              {title}
            </h1>
          ) : null}
        </div>

        {/* Right section */}
        <div className="flex w-1/4 items-center justify-end">
          {rightIcon ? (
            <button
              type="button"
              onClick={onRightClick}
              className="rounded-full p-1.5 transition hover:bg-sky-50 active:scale-95 cursor-pointer"
              title="Information / Crédits"
            >
              <img
                src={rightIcon}
                alt="Acción derecha"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain"
              />
            </button>
          ) : (
            <div className="h-10 w-10" />
          )}
        </div>
      </div>
      <div className="rayita-divider mt-2" />
    </header>
  );
}
