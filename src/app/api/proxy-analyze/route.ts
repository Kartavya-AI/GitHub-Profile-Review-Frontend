import { NextRequest, NextResponse } from "next/server";

interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface AIAnalysis {
  summary?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { github_username } = body;

    if (!github_username) {
      return NextResponse.json({ error: "Missing github_username" }, { status: 400 });
    }

    // 1️⃣ Fetch GitHub profile
    const githubResponse = await fetch(`https://api.github.com/users/${github_username}`);
    if (!githubResponse.ok) {
      return NextResponse.json(
        { error: "GitHub user not found", status: githubResponse.status },
        { status: githubResponse.status }
      );
    }
    const profileData: GitHubProfile = await githubResponse.json();

    // 2️⃣ Call AI analysis safely
    let analysis: AIAnalysis = {};
    try {
      const aiResponse = await fetch(
        "https://github-analysis-87738157215.europe-west1.run.app/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ github_username }),
        }
      );
      if (aiResponse.ok) {
        analysis = await aiResponse.json();
      }
    } catch (err: unknown) {
      console.warn("AI analysis failed, using fallback summary", err);
    }

    // 3️⃣ Build fallback summary if AI summary not available
    const fallbackSummary = `# GitHub Profile Executive Summary

**Name:** ${profileData.name || github_username}  
**Username:** @${profileData.login}  
**Followers:** ${profileData.followers} | **Following:** ${profileData.following}  

${profileData.name || github_username} has ${profileData.public_repos} public repositories, ${profileData.followers} followers, and is following ${profileData.following} users.`;

    return NextResponse.json({
      profile: {
        username: profileData.login,
        name: profileData.name,
        bio: profileData.bio,
        avatar_url: profileData.avatar_url,
        followers: profileData.followers,
        following: profileData.following,
        public_repos: profileData.public_repos,
      },
      analysis: {
        summary: analysis.summary || fallbackSummary,
      },
    });
  } catch (err: unknown) {
    console.error("Proxy analyze failed:", err);
    return NextResponse.json(
      {
        error: "Proxy analyze failed",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
