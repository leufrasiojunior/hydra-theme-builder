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

  // 1) Extrai JWT
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
  const { themeName, themeCode, themeCss } = req.body as {
    themeName?: string;
    themeCode?: string;
    themeCss?: string;
  };
  if (!themeName || !themeCode || !themeCss) {
    return res
      .status(400)
      .json({ error: "themeName, themeCode e themeCss são obrigatórios" });
  }

  // 3) Monta nomes: slug + código
  const slug = themeName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
  const folderName = `${slug}-${themeCode}`;
  const branchName = `theme-${folderName}`;
  const filePath = `themes/${folderName}/${folderName}.css`;

  // 4) Setup Octokit + vars upstream
  const octokit = new Octokit({ auth: githubToken });
  const upstreamOwner = process.env.GITHUB_UPSTREAM_OWNER!;
  const repoName = process.env.GITHUB_UPSTREAM_REPO!;
  const baseBranch = process.env.GITHUB_UPSTREAM_BRANCH || "main";

  try {
    // 5) SHA da branch base no upstream
    const {
      data: {
        object: { sha: baseSha },
      },
    } = await octokit.git.getRef({
      owner: upstreamOwner,
      repo: repoName,
      ref: `heads/${baseBranch}`,
    });

    // 6) Cria a branch NO FORK do usuário
    await octokit.git.createRef({
      owner: forkOwner,
      repo: repoName,
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    });

    // 7) Prepara para criar/atualizar o arquivo
    let existingSha: string | undefined;
    try {
      const { data: existing } = await octokit.repos.getContent({
        owner: forkOwner,
        repo: repoName,
        path: filePath,
        ref: branchName,
      });
      if ("sha" in existing) existingSha = existing.sha;
    } catch {
      // arquivo não existe ainda
    }

    // 8) Cria ou atualiza o CSS na nova branch
    await octokit.repos.createOrUpdateFileContents({
      owner: forkOwner,
      repo: repoName,
      path: filePath,
      message: `Add theme ${folderName}`,
      content: Buffer.from(themeCss).toString("base64"),
      branch: branchName,
      sha: existingSha,
    });

    // 9) Abre o Pull Request do FORK → UPSTREAM
    const { data: pr } = await octokit.pulls.create({
      owner: upstreamOwner,
      repo: repoName,
      title: `Theme: ${folderName}`,
      head: `${forkOwner}:${branchName}`,
      base: baseBranch,
      body: `Este PR adiciona o tema **${folderName}** gerado pelo Theme Builder.`,
    });

    return res.status(200).json({ prUrl: pr.html_url });
  } catch (e: any) {
    console.error("Erro criando PR:", e);
    return res.status(500).json({ error: e.message || "Erro interno" });
  }
}
