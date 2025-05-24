// src/pages/api/github/fork.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Octokit } from "@octokit/rest";

type Data = { forkUrl?: string; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1) Decodifica o JWT e pega o payload
  const tokenPayload = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("→ Token payload:", tokenPayload);

  if (!tokenPayload?.githubToken || !tokenPayload.githubLogin) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const githubToken = tokenPayload.githubToken as string;
  const forkOwner = tokenPayload.githubLogin as string;
  const upstreamOwner = process.env.GITHUB_UPSTREAM_OWNER!;
  const repoName = process.env.GITHUB_UPSTREAM_REPO!;

  try {
    const octokit = new Octokit({ auth: githubToken });

    // Cria o fork no usuário autenticado (forkOwner)
    const { data: fork } = await octokit.repos.createFork({
      owner: upstreamOwner,
      repo: repoName,
    });

    return res.status(200).json({ forkUrl: fork.html_url });
  } catch (e: any) {
    console.error("Erro criando fork:", e);
    return res.status(500).json({ error: e.message || "Erro interno" });
  }
}
