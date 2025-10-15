import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const repo_url = searchParams.get("repo_url");

    if (!repo_url) {
      return NextResponse.json({ error: "Missing repo_url query parameter" }, { status: 400 });
    }

    const apiResponse = await axios.post(
      `https://code-analysis-87738157215.asia-south1.run.app/analyze?repo_url=${encodeURIComponent(repo_url)}`,
      {},
      { timeout: 60000 }
    );

    return NextResponse.json(apiResponse.data);
  } catch (error) {
    console.error("Proxy API error:", error);
    return NextResponse.json({ error: "Failed to fetch from upstream API" }, { status: 500 });
  }
}
