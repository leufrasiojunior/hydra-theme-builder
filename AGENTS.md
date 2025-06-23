# Diretrizes para o agente

Este projeto utiliza Next.js com TypeScript. O código fonte fica em `src/`.

## Estrutura

- Componentes React em `src/components`.
- Páginas Next.js em `src/pages`.

## Estilo

- Utilize sempre TypeScript.
- Respeite o Prettier definido em `.prettierrc` (largura de 80 colunas, aspas simples, etc.).
- Rode `npx prettier --write` nos arquivos modificados antes de commitar.

## Checagens obrigatórias

Após qualquer modificação no repositório rode:

```bash
npm run lint
npm run build
```

Se algum comando falhar, corrija antes de finalizar o PR.

## Variáveis de ambiente

Copie `.env-example` para `.env` e preencha os valores necessários para rodar localmente.
Instale as dependências executando `npm install` antes do primeiro uso.

## Execução em desenvolvimento

Inicie o servidor com:

```bash
npm run dev
```

## Commits

Use mensagens de commit curtas no imperativo, por exemplo:

```
Add login page
Fix typo in component
```
