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

type LogoPosition =
  | 'left'
  | 'center'
  | 'top-left'
  | 'bottom-right'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center';

//
// Componente “hero” que exibe a imagem de fundo (libraryHeroImageUrl),
// o logo sobreposto e a descrição do jogo
//
const GameOverlay = ({
  backgroundUrl,
  logoUrl,
  title = 'Game',
  logoPosition = 'left',
  showDarkOverlay = false,
  description = '',
}: {
  backgroundUrl: string;
  logoUrl: string;
  title?: string;
  logoPosition?: LogoPosition;
  showDarkOverlay?: boolean;
  description?: string;
}) => {
  const logoPositionClasses: Record<LogoPosition, string> = {
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
      className="
        hero__backdrop
        relative w-full h-full
        flex overflow-hidden
        bg-gradient-to-t from-black/80 to-transparent
      "
    >
      {/* Container da imagem de fundo */}
      <div className="relative w-full h-full">
        <Image
          src={backgroundUrl}
          alt={`${title} background`}
          fill
          className="
            hero__media
            object-cover object-center
            absolute inset-0
            transition-transform duration-200 ease-in-out
            group-hover:scale-[1.02]
          "
          unoptimized
        />

        {showDarkOverlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        )}

        {/* Logo sobreposto */}
        {logoUrl && (
          <div
            className={`
              ${logoPositionClasses[logoPosition] || logoPositionClasses.left}
              z-20 max-w-[50%]
            `}
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

        {/* Descrição no canto inferior esquerdo */}
        <div className="absolute bottom-6 left-6 max-w-[60%] text-white z-20">
          <p className="text-sm leading-relaxed drop-shadow-md">
            {description && description !== 'Game'
              ? description
              : 'DESCRIPTION-OF-THE-GAME'}
          </p>
        </div>
      </div>
    </div>
  );
};

//
// Função que “prefixa” o CSS customizado com #hydra-mock
// para que as regras não vazem para o resto da página.
//
function scopeCss(css: string): string {
  return css.replace(
    /([^{}]+)\{([^}]*)\}/g,
    (_match: string, selectors: string, body: string) => {
      const scoped = selectors
        .split(',')
        .map((raw: string) => {
          const sel = raw.trim();
          if (sel === 'body' || sel === 'html' || sel === '#root') {
            return '#hydra-mock';
          }
          if (sel.startsWith('#hydra-mock')) {
            return sel;
          }
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
      fetch('https://hydra-api-us-east-1.losbroxas.org/games/featured')
        .then((res) => res.json())
        .then((data: TrendingGame[]) => {
          if (Array.isArray(data) && data.length) {
            setGame(data[0]);
          }
        })
        .catch(() => {
          // ignora erros silenciosamente
        });
    }, []);

    return (
      <div
        ref={ref}
        id="hydra-mock"
        className="
          hydra-mock flex flex-col h-full w-full
          bg-gray-900 text-gray-200 font-sans
          rounded-lg overflow-hidden border border-gray-700
        "
      >
        {/* Injeta o CSS customizado, “escopado” para #hydra-mock */}
        <style>{scopeCss(customCss)}</style>

        {/* 1) Title Bar */}
        <div className="title-bar flex items-center h-10 bg-[#151515] px-4 border-b-2 border-[#ffffff26]">
          <span className="text-lg font-semibold">Hydra</span>
        </div>

        {/* 2) Área principal: sidebar + main */}
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
            <header className="header header--is-windows flex items-center justify-between bg-[#151515] p-4 flex-shrink-0">
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

            {/* Conteúdo com scroll */}
            <div className="container container__content flex-1 overflow-auto p-4 space-y-6 bg-[#1b1b1b] w-full">
              <section className="home__content flex flex-col gap-6 w-full">
                {/* Seção de Destaques */}
                <h2 className="text-lg mb-2">Destaques</h2>

                {game && game.libraryHeroImageUrl ? (
                  <div
                    className="
                      group relative w-full h-[280px] min-h-[280px] max-h-[280px]
                      rounded-md overflow-hidden
                      border border-[#ffffff26]
                      shadow-[0_0_15px_0_#000]
                      cursor-pointer
                      z-10
                    "
                  >
                    <GameOverlay
                      backgroundUrl={game.libraryHeroImageUrl}
                      logoUrl={game.logoImageUrl}
                      title={game.title}
                      logoPosition={
                        [
                          'left',
                          'center',
                          'top-left',
                          'bottom-right',
                          'top-right',
                          'bottom-left',
                          'bottom-center',
                        ].includes(game.logoPosition)
                          ? (game.logoPosition as LogoPosition)
                          : 'left'
                      }
                      showDarkOverlay={true}
                      description={game.description}
                    />
                  </div>
                ) : (
                  <div className="rounded overflow-hidden">
                    <div className="w-full h-40 bg-gray-600 animate-pulse flex items-center justify-center">
                      <span className="text-gray-400">Carregando...</span>
                    </div>
                  </div>
                )}

                {/* Filtros por categoria */}
                <section className="settings__appearance settings-appearance__actions flex justify-between items-center home__header">
                  <ul className="home__buttons-list flex space-x-2">
                    <li>
                      <button className="settings-appearance__button flex items-center space-x-1 px-4 py-2 bg-gray-700 rounded">
                        {/* Aqui trocamos pelo GIF de chama */}
                        <img
                          src="/icos/flame-animated.gif"
                          alt="Flame Icon"
                          className="h-6 w-6"
                        />
                        <span>Populares</span>
                      </button>
                    </li>
                    <li>
                      <button className="settings-appearance__button flex items-center space-x-1 px-4 py-2 bg-gray-700 rounded">
                        <span className="octicon octicon-calendar" />
                        <span>Mais baixados</span>
                      </button>
                    </li>
                    <li>
                      <button className="settings-appearance__button flex items-center space-x-1 px-4 py-2 bg-gray-700 rounded">
                        <span className="octicon octicon-trophy" />
                        <span>Pra Platinar</span>
                      </button>
                    </li>
                  </ul>
                  <button className="button button--outline flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                    <div className="home__icon-wrapper">
                      <img
                        src="/icos/stars-animated.gif"
                        alt="Stars animation"
                        className="home__stars-icon h-5 w-5 object-contain"
                      />
                    </div>
                    <span>Surpreenda-me</span>
                  </button>
                </section>

                {/* Título “Populares” com o ícone de chama */}
                <h2 className="home__title flex items-center gap-2 mt-2">
                  <img
                    src="/icos/flame-animated.gif"
                    alt="Flame Icon"
                    className="h-6 w-6"
                  />
                  Populares
                </h2>

                {/* Grid de cards de jogos */}
                <section className="settings-appearance__themes grid grid-cols-2 gap-4 home__cards">
                  <div className="theme-card bg-gray-700 rounded h-36 home__card-skeleton"></div>
                  <div className="theme-card bg-gray-700 rounded h-36 home__card-skeleton"></div>
                  <div className="theme-card bg-gray-700 rounded h-36 home__card-skeleton"></div>
                  <div className="theme-card bg-gray-700 rounded h-36 home__card-skeleton"></div>
                </section>
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
