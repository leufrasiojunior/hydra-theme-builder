// src/components/HydraMock.tsx
import React, { forwardRef } from "react";

export interface HydraMockProps {
    customCss: string;
}

/**  
 * Prefixa cada seletor do bloco CSS com "#hydra-mock ".
 * Ex.: ".sidebar {…}" → "#hydra-mock .sidebar {…}"
 */
function scopeCss(css: string): string {
    return css.replace(
        /([^{}]+)\{([^}]*)\}/g,
        (_match: string, selectors: string, body: string): string => {
            const scoped = selectors
                .split(",")
                .map((raw) => {
                    const sel = raw.trim();
                    // Se o usuário escreveu #root ou body/html, redireciona pro container
                    if (sel === "body" || sel === "html" || sel === "#root") {
                        return "#hydra-mock";
                    }
                    // Se já está prefixado, mantém
                    if (sel.startsWith("#hydra-mock")) {
                        return sel;
                    }
                    // Caso normal, prefixa
                    return `#hydra-mock ${sel}`;
                })
                .join(", ");

            return `${scoped} {${body}}`;
        }
    );
}



export const HydraMock = forwardRef<HTMLDivElement, HydraMockProps>(
    ({ customCss }, ref) => (
        <div
            ref={ref}
            id="hydra-mock"
            className="hydra-mock flex h-full w-full bg-gray-900 text-gray-200 font-sans"
        >
            {/* Injeta o CSS do tema */}
            <style>{scopeCss(customCss)}</style>

            {/* Sidebar */}
            <aside className="sidebar sidebar__container w-64 bg-gray-800 p-4 flex flex-col overflow-y-auto">
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
                                <span className="octicon octicon-home sidebar__handle" />
                                <span>Início</span>
                            </button>
                        </li>
                        <li className="sidebar__menu-item">
                            <button className="sidebar__menu-item-button flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-gray-700">
                                <span className="octicon octicon-apps" />
                                <span>Catálogo</span>
                            </button>
                        </li>
                        <li className="sidebar__menu-item">
                            <button className="sidebar__menu-item-button flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-gray-700">
                                <span className="octicon octicon-download" />
                                <span>Downloads</span>
                            </button>
                        </li>
                        <li className="sidebar__menu-item">
                            <button className="sidebar__menu-item-button flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-gray-700 sidebar__menu-item--active">
                                <span className="octicon octicon-gear" />
                                <span>Ajustes</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col">
                {/* Cabeçalho */}
                <header className="header header--is-windows flex items-center justify-between bg-gray-800 p-4 flex-shrink-0">
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
                <div className="container container__content flex-1 overflow-auto p-4 space-y-6">
                    {/* Seção de Destaques */}
                    <section className="settings__container">
                        <h2 className="text-lg mb-2">Destaques</h2>
                        <div className="bg-gray-700 rounded overflow-hidden">
                            <img
                                src="/oblivion-banner.jpg"
                                alt="Oblivion"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Oblivion Remastered</h3>
                                <p className="mt-1 text-gray-300">
                                    Explore Cyrodiil como nunca antes com novos gráficos incríveis
                                    e jogabilidade refinada…
                                </p>
                            </div>
                        </div>
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
    )
);

HydraMock.displayName = "HydraMock";
