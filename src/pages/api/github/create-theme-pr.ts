// src/pages/api/github/create-theme-pr.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Octokit } from "@octokit/rest";

type Data = { prUrl?: string; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  // 1) Extrai payload do JWT
  const tokenPayload = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!tokenPayload?.githubToken || !tokenPayload.githubLogin) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  const githubToken = tokenPayload.githubToken as string;
  const forkOwner = tokenPayload.githubLogin as string;

  // 2) Lê e valida o body
  const { themeName, themeCode, themeCss, screenshot } = req.body as {
    themeName?: string;
    themeCode?: string;
    themeCss?: string;
    screenshot?: string;
  };
  if (!themeName || !themeCode || !themeCss) {
    return res
      .status(400)
      .json({ error: "themeName, themeCode e themeCss são obrigatórios" });
  }

  // 3) Monta o folderName
  const slug = themeName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
  const folderName = `${slug}-${themeCode}`; // ex: meu-tema-lpQd950J
  const branchName = `theme-${folderName}`;

  // 4) Configura Octokit e dados do upstream
  const octokit = new Octokit({ auth: githubToken });
  const upstreamOwner = process.env.GITHUB_UPSTREAM_OWNER!;
  const repoName = process.env.GITHUB_UPSTREAM_REPO!;
  const baseBranch = process.env.GITHUB_UPSTREAM_BRANCH || "main";

  try {
    // 5) Pega SHA da branch base no upstream
    const {
      data: {
        object: { sha: baseSha },
      },
    } = await octokit.git.getRef({
      owner: upstreamOwner,
      repo: repoName,
      ref: `heads/${baseBranch}`,
    });

    // 6) Cria a nova branch no fork do usuário
    await octokit.git.createRef({
      owner: forkOwner,
      repo: repoName,
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    });

    // 7) Comita o CSS como `theme.css`
    await octokit.repos.createOrUpdateFileContents({
      owner: forkOwner,
      repo: repoName,
      path: `themes/${folderName}/theme.css`, // ← nome fixo
      message: `Add theme CSS for ${folderName}`,
      content: Buffer.from(themeCss).toString("base64"),
      branch: branchName,
    });

    // 8) Se veio o screenshot, comita como `screenshot.png`
    if (screenshot) {
      await octokit.repos.createOrUpdateFileContents({
        owner: forkOwner,
        repo: repoName,
        path: `themes/${folderName}/screenshot.png`, // ← nome fixo
        message: `Add preview screenshot for ${folderName}`,
        content: screenshot, // já é Base64 puro
        branch: branchName,
      });
    }

    // 9) Abre o Pull Request do fork → upstream
    const { data: pr } = await octokit.pulls.create({
      owner: upstreamOwner,
      repo: repoName,
      title: `Theme: ${folderName}`,
      head: `${forkOwner}:${branchName}`,
      base: baseBranch,
      body: `Este PR adiciona o tema **${folderName}**`,
    });

    return res.status(200).json({ prUrl: pr.html_url });
  } catch (e: unknown) {
    console.error("Erro criando PR:", e);
    if (e instanceof Error) {
      return res.status(500).json({ error: e.message });
    }
    return res.status(500).json({ error: "Erro interno" });
  }
}
