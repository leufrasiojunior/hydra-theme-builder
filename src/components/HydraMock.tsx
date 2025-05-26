// src/components/HydraMock.tsx
import {
  ArrowDownTrayIcon,
  Cog6ToothIcon,
  HomeIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import React, { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';

export interface HydraMockProps {
  customCss: string;
}

export interface TrendingGame {
  shop: string;
  description: string;
  title: string;
  objectId: string;
  iconUrl: string;
  coverImageUrl: string;
  libraryHeroImageUrl: string;
  logoImageUrl: string;
  logoPosition: string;
  libraryImageUrl: string;
  uri: string;
}

// Componente GameOverlay integrado
const GameOverlay = ({
  backgroundUrl,
  logoUrl,
  title = 'Game',
  logoPosition = 'left',
  showDarkOverlay = false,
}: {
  backgroundUrl: string;
  logoUrl: string;
  title?: string;
  logoPosition?: string;
  showDarkOverlay?: boolean;
}) => {
  const logoPositionClasses = {
    left: 'absolute top-6 left-6 h-64 w-64',
    center:
      'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'top-left': 'absolute top-6 left-6',
    'bottom-right': 'absolute bottom-6 right-6',
    'top-right': 'absolute top-6 right-6',
    'bottom-left': 'absolute bottom-6 left-6',
    'bottom-center': 'absolute bottom-6 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div
      className={`
                        hero__backdrop
                        relative w-full h-full
                        flex overflow-hidden
                        bg-gradient-to-t from-black/80 to-transparent`}
    >
      {/* Imagem de fundo */}
      <div className="relative w-full h-full">
        <Image
          src={backgroundUrl}
          alt={`${title} background`}
          fill
          className="hero__media object-cover object-center absolute inset-0 transition-transform duration-200 ease-in-out group-hover:scale-[1.02]"
          unoptimized
        />

        {/* Overlay escuro opcional */}
        {showDarkOverlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        )}

        {/* Logo sobreposto */}
        {logoUrl && (
          <div
            className={`${
              logoPositionClasses[logoPosition] || logoPositionClasses.left
            } z-20 max-w-[50%]`}
          >
            <Image
              src={logoUrl}
              alt={`${title} logo`}
              width={300}
              height={150}
              className="w-full h-auto max-h-20 object-contain drop-shadow-lg"
              unoptimized
            />
          </div>
        )}

        {/* Descrição do jogo no canto inferior esquerdo */}
        <div className="absolute bottom-6 left-6 max-w-[60%] text-white">
          <p className="text-sm leading-relaxed drop-shadow-md">
            Explore Cyrodiil like never before with stunning new visuals and
            refined gameplay in The Elder Scrolls IV: Oblivion™ Remastered.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Prefixa cada seletor do bloco CSS com "#hydra-mock ".
 * Ex.: ".sidebar {…}" → "#hydra-mock .sidebar {…}"
 */
function scopeCss(css: string): string {
  return css.replace(
    /([^{}]+)\{([^}]*)\}/g,
    (_match: string, selectors: string, body: string): string => {
      const scoped = selectors
        .split(',')
        .map((raw: string) => {
          const sel = raw.trim();
          // Se o usuário escreveu body/html/#root, escopa para o container
          if (sel === 'body' || sel === 'html' || sel === '#root') {
            return '#hydra-mock';
          }
          // Se já está prefixado, mantém
          if (sel.startsWith('#hydra-mock')) {
            return sel;
          }
          // Caso normal, prefixa
          return `#hydra-mock ${sel}`;
        })
        .join(', ');
      return `${scoped} {${body}}`;
    }
  );
}

export const HydraMock = forwardRef<HTMLDivElement, HydraMockProps>(
  ({ customCss }, ref) => {
    const [game, setGame] = useState<TrendingGame | null>(null);

    useEffect(() => {
      // Busca o array completo e pega o primeiro elemento
      fetch('https://hydra-api-us-east-1.losbroxas.org/games/featured')
        .then((res) => res.json())
        .then((data: TrendingGame[]) => {
          if (Array.isArray(data) && data.length) {
            setGame(data[0]);
            console.log(data[0]);
          }
        })
        .catch(() => {
          /* silencioso em caso de erro */
        });
    }, []);

    return (
      <div
        ref={ref}
        id="hydra-mock"
        className="hydra-mock flex flex-col h-full w-full bg-gray-900 text-gray-200 font-sans
                 rounded-lg overflow-hidden border border-gray-700"
      >
        {/* Injeta o CSS do tema escopado */}
        <style>{scopeCss(customCss)}</style>

        {/* 1) Title Bar */}
        <div className="title-bar flex items-center h-10 bg-[#151515] px-4 border-b-2 border-[#ffffff26]">
          <span className="text-lg font-semibold">Hydra</span>
        </div>

        {/* 2) Conteúdo principal: sidebar + main */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="sidebar sidebar__container w-64 bg-[#151515] p-4 flex flex-col overflow-y-auto border-r border-[#ffffff26]">
            {/* Perfil do usuário */}
            <div className="sidebar-profile mb-6">
              <button className="sidebar-profile__button flex items-center space-x-2 w-full">
                <span className="profile-avatar octicon octicon-person text-xl" />
                <div className="sidebar-profile__button-content">
                  <div className="sidebar-profile__button-title font-semibold">
                    User Name
                  </div>
                  <div className="sidebar-profile__button-game-running-title text-sm text-gray-400">
                    No Game Running
                  </div>
                </div>
              </button>
            </div>
            {/* Menu de navegação */}
            <nav className="sidebar__content flex-1">
              <ul className="sidebar__menu space-y-1">
                <li className="sidebar__menu-item">
                  <button className="sidebar__menu-item-button flex items-center space-x-2 w-full px-3 py-2 rounded bg-gray-700">
                    <HomeIcon
                      className="h-5 w-5 text-gray-200"
                      aria-hidden="true"
                    />
                    <span>Início</span>
                  </button>
                </li>
                <li className="sidebar__menu-item">
                  <button className="sidebar__menu-item-button flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-gray-700">
                    <Squares2X2Icon
                      className="h-5 w-5 text-gray-200"
                      aria-hidden="true"
                    />
                    <span>Catálogo</span>
                  </button>
                </li>
                <li className="sidebar__menu-item">
                  <button className="sidebar__menu-item-button flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-gray-700">
                    <ArrowDownTrayIcon
                      className="h-5 w-5 text-gray-200"
                      aria-hidden="true"
                    />
                    <span>Downloads</span>
                  </button>
                </li>
                <li className="sidebar__menu-item">
                  <button className="sidebar__menu-item-button flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-gray-700 sidebar__menu-item--active">
                    <Cog6ToothIcon
                      className="h-5 w-5 text-gray-200"
                      aria-hidden="true"
                    />
                    <span>Ajustes</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="header header--is-windows flex items-center justify-between bg-[#151515] p-4 flex-shrink-0 m-">
              <div className="header__section header__section--left flex items-center space-x-2">
                <button className="header__back-button header__back-button--enabled octicon octicon-arrow-left" />
                <h1 className="header__title header__title--has-back-button text-xl">
                  Início
                </h1>
              </div>
              <div className="header__search relative">
                <input
                  type="text"
                  placeholder="Buscar jogos"
                  className="header__search-input bg-gray-700 text-gray-300 placeholder-gray-500 px-3 py-1 rounded focus:outline-none"
                />
                <button className="header__action-button absolute right-1 top-1 octicon octicon-search" />
              </div>
            </header>

            {/* Área de conteúdo com scroll */}
            <div className="container container__content flex-1 overflow-auto p-4 space-y-6 bg-[#1b1b1b] w-full">
              {/* Seção de Destaques */}
              <section className="settings__container">
                <h2 className="text-lg mb-2">Destaques</h2>
                {game && game.libraryHeroImageUrl ? (
                  <div
                    className="
                                        group relative w-full h-[280px] min-h-[280px] max-h-[280px]
                                        rounded-md overflow-hidden
                                        border border-[#ffffff26]
                                        shadow-[0_0_15px_0_#000]
                                        cursor-pointer
                                        z-10"
                  >
                    <GameOverlay
                      backgroundUrl={game.libraryHeroImageUrl}
                      logoUrl={game.logoImageUrl}
                      title={game.title}
                      logoPosition={game.logoPosition || 'left'}
                      showDarkOverlay={true}
                    />
                  </div>
                ) : (
                  // Fallback/Loading state
                  <div className="rounded overflow-hidden">
                    <div className="w-full h-40 bg-gray-600 animate-pulse flex items-center justify-center">
                      <span className="text-gray-400">Carregando...</span>
                    </div>
                  </div>
                )}
              </section>

              {/* Filtros por categoria */}
              <section className="settings__appearance settings-appearance__actions flex space-x-2">
                <button className="settings-appearance__button flex items-center space-x-1 px-4 py-2 bg-gray-700 rounded">
                  <span className="octicon octicon-flame" />
                  <span>Populares</span>
                </button>
                <button className="settings-appearance__button flex items-center space-x-1 px-4 py-2 bg-gray-700 rounded">
                  <span className="octicon octicon-calendar" />
                  <span>Mais baixados</span>
                </button>
                <button className="settings-appearance__button flex items-center space-x-1 px-4 py-2 bg-gray-700 rounded">
                  <span className="octicon octicon-trophy" />
                  <span>Pra platinizar</span>
                </button>
                <button className="settings-appearance__button flex items-center space-x-1 px-4 py-2 bg-gray-700 rounded">
                  <span className="octicon octicon-light-bulb" />
                  <span>Surpreenda-me</span>
                </button>
              </section>

              {/* Grid de cards de jogos */}
              <section className="settings-appearance__themes grid grid-cols-2 gap-4">
                <div className="theme-card bg-gray-700 rounded h-36"></div>
                <div className="theme-card bg-gray-700 rounded h-36"></div>
                <div className="theme-card bg-gray-700 rounded h-36"></div>
                <div className="theme-card bg-gray-700 rounded h-36"></div>
              </section>
            </div>
          </div>
        </div>

        {/* 3) Bottom Panel */}
        <div className="bottom-panel flex items-center justify-between h-8 bg-gray-800 px-4">
          <div className="bottom-panel__downloads-button text-sm text-gray-400">
            Sem downloads em andamento
          </div>
          <div className="bottom-panel__version-button text-sm text-gray-400">
            Ej3ppdvg – v3.5.2 "Lumen"
          </div>
        </div>
      </div>
    );
  }
);

HydraMock.displayName = 'HydraMock';
