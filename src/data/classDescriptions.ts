// src/data/classDescriptions.ts
const classDescriptions: Record<string, string> = {
  // 1. Barra de título
  "title-bar": "Contém o nome “Hydra” no topo",

  // 2. Sidebar (Barra lateral)
  sidebar: "Container principal da barra lateral",
  sidebar__container: "Wrapper interno que agrupa todo o conteúdo da sidebar",
  sidebar__content: "Seções de menu abaixo do perfil",
  sidebar__section: "Agrupa cada bloco de menus (ex: Navegação, Biblioteca)",
  sidebar__menu: "Lista de itens de menu",
  "sidebar__menu-item": "Cada <li> do menu",
  "sidebar__menu-item-button": "Botão dentro de cada item de menu",
  "sidebar__menu-item--active": "Marca o item de menu atualmente selecionado",
  sidebar__handle: "Botão de “expandir/recolher” a sidebar",

  // 3. Perfil do usuário na sidebar
  "sidebar-profile": "Container do bloco de perfil (avatar + nome + jogo)",
  "sidebar-profile__button": "Botão principal clicável do perfil",
  "sidebar-profile__button-content": "Wrapper interno do conteúdo do botão",
  "profile-avatar": "Container do avatar (ícone octicon-person)",
  "sidebar-profile__button-information": "Texto (nome e jogo atual)",
  "sidebar-profile__button-title": "Nome do usuário",
  "sidebar-profile__button-game-running-title": "Nome do jogo em execução",
  "sidebar-profile__game-running-icon": "Ícone do jogo em execução",
  "sidebar-profile__friends-button": "Botão “Amigos” (octicon-people)",

  // 4. Campo de busca na sidebar
  "text-field-container": "Wrapper geral do input de busca",
  "text-field-container__text-field-wrapper": "Wrapper interno",
  "text-field-container__text-field": "Container estilizado do input",
  "text-field-container__text-field--dark": "Variante escura do campo",
  "text-field-container__text-field-input": "O <input> propriamente dito",

  // 5. Container principal e header
  container: "Container geral do conteúdo à direita",
  header: "Cabeçalho da área de conteúdo",
  "header--is-windows": "Variante quando rodando no Windows",
  header__section: "Cada coluna do header (esquerda/direita)",
  "header__section--left": "Seção esquerda (botão voltar + título)",
  "header__back-button": "Botão de voltar (octicon-arrow-left)",
  "header__back-button--enabled": "Estado ativo do botão voltar",
  header__title: "Título da página (ex: “Ajustes”)",
  "header__title--has-back-button": "Variante com ícone de volta",
  header__search: "Wrapper do search no header",
  "header__action-button": "Botão de search (octicon-search)",
  "header__search-input": "Input de busca no header",

  // 6. Banner de destaque e filtros
  container__content: "Área principal abaixo do header",
  settings__container: "Container de toda a seção de configurações",
  settings__categories: "Linha de botões de categoria (Geral, Aparência…)",
  settings__appearance: "Container específico de Aparência",
  "settings-appearance__actions": "Ações (botões de loja, limpar, criar)",
  "settings-appearance__actions-left": "Agrupamento esquerdo das ações",
  "settings-appearance__actions-right": "Agrupamento direito das ações",
  "settings-appearance__button": "Botões dentro da seção de Aparência",
  "settings-appearance__themes": "Container dos cards de temas",

  // 7. Cards de tema
  "theme-card": "Card individual de tema",
  "theme-card__header": "Cabeçalho do card (título)",
  "theme-card__header__title": "Nome do tema",
  "theme-card__author": "Texto “by …”",
  "theme-card__author__name": "Botão com o nome do autor",
  "theme-card__actions": "Wrapper dos botões do card",
  "theme-card__actions__left": "Agrupamento esquerdo dos botões do card",
  "theme-card__actions__right": "Agrupamento direito dos botões do card",

  // 8. Botões genéricos
  button: "Classe base para todos os botões",
  "button--outline": "Variante com borda apenas",
  "button--primary": "Variante de destaque (fundo cheio)",
  "button--danger": "Botão de ação perigosa (ex: Trash)",

  // 9. Bottom Panel / Rodapé
  "bottom-panel": "Barra inferior fixa",
  "bottom-panel__downloads-button": "Botão de status de download",
  "bottom-panel__version-button": "Botão que mostra a versão atual",

  // 10. Popups e widgets
  "fb-changelog-popup-wrapper": "Wrapper do changelog (oculto por padrão)",
  "fb-changelog-popup-iframe": "Iframe do changelog",
  "fb-changelog-popup-overlay": "Overlay de fundo do popup",
  "featurebase-widget-overlay": "Overlay genérico de widgets",
  "featurebase-widget-iframe": "Iframe de widget lateral",
  "featurebase-widget-iframe-right": "Iframe de widget lateral (direita)",
  "fb-widget-fullscreen-x": "Botão “X” do widget fullscreen",
  "fb-button-x-fade-in": "Classe auxiliar de animação do “X”",

  // 11. Ícones (Octicons)
  octicon: "Classe base dos SVG icons",
  "octicon-person": "Ícone de pessoa",
  "octicon-people": "Ícone de múltiplas pessoas",
  "octicon-home": "Ícone de home/início",
  "octicon-apps": "Ícone de apps",
  "octicon-download": "Ícone de download",
  "octicon-gear": "Ícone de engrenagem (configurações)",
  "octicon-arrow-left": "Ícone de seta para a esquerda",
  "octicon-search": "Ícone de lupa (search)",
  "octicon-globe": "Ícone de globo (mundo)",
  "octicon-trash": "Ícone de lixeira",
  "octicon-plus": "Ícone de adicionar (+)",
  "octicon-pencil": "Ícone de lápis (editar)",
};

export default classDescriptions;
