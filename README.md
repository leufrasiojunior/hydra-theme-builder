# Hydra Theme Builder 🚀

![Logo placeholder](docs/logo-placeholder.png)

[Visite o app](https://hydra-theme-builder.vercel.app/) e ajude a evoluir o projeto!

Este webapp foi criado para facilitar a construção de temas personalizados para o **Hydra Launcher**. Ele oferece um editor interativo que gera automaticamente um fork do repositório de temas, cria uma nova branch e abre um Pull Request com o seu CSS e screenshot.

## Tecnologias

- **Next.js** + **TypeScript**
- **Tailwind CSS** para o layout
- **NextAuth** para autenticação via GitHub
- **Monaco Editor** para edição de CSS
- Integração com a API do GitHub via **Octokit**

## Segurança

- Toda autenticação é feita exclusivamente pelo GitHub, sem que o servidor armazene informações de login.
- As chaves privadas usadas na aplicação nunca são salvas ou compartilhadas.
- O servidor apenas utiliza tokens temporários gerados pelo próprio GitHub para realizar as operações necessárias.

## Como executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador para testar localmente.

## Como usar

1. Faça login com sua conta do GitHub.
2. O aplicativo cria automaticamente um **fork** (cópia) do repositório de temas.
3. Ao salvar suas alterações é gerado um **commit** (registro de modificações) e um **git push** envia esse código para o repositório no GitHub.
4. Por fim é aberta uma **Pull Request** (proposta de alteração) com seu tema e o screenshot gerado.

O editor conta com sugestões das classes do Hydra, facilitando a edição do CSS.

![GIF placeholder autocomplete](docs/autocomplete-placeholder.gif)

![GIF placeholder editor](docs/editor-placeholder.gif)

## Contato e suporte

Encontrou algum problema ou tem sugestões? Abra uma _issue_ ou fale comigo diretamente.

## Avisos importantes

- **Hydra-Theme-Builder não possui nenhuma relação oficial com o projeto [Hydra](https://github.com/hydralauncher/hydra).**
- O aplicativo está em **alpha** e, por isso, nenhuma alteração é feita diretamente no projeto principal de temas do Hydra ([repositório](https://github.com/hydralauncher/hydra-themes) / [loja](https://hydrathemes.shop/)).
- Durante o período de testes todas as atualizações ficarão disponíveis apenas neste repositório pessoal: <https://github.com/leufrasiojunior/my_test_repo>.

Divirta-se criando temas e contribua com melhorias! 😄

## TODO

- [ ] Upload de imagens via api.imgbb.com com suas credenciais
- [ ] Melhor detalhamento do layout do aplicativo original do Hydra
- [ ] Melhor identificação dos itens que podem ser alterados no aplicativo Hydra
