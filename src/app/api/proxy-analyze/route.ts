import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { github_username } = body;

    if (!github_username) {
      return NextResponse.json(
        { error: "Missing github_username" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://github-analysis-87738157215.europe-west1.run.app/analyze",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_username }),
      }
    );

    if (!response.ok) {
      // Try to parse error details as JSON, fallback to text
      let errorDetails: any = null;
      try {
        errorDetails = await response.json();
      } catch {
        errorDetails = await response.text();
      }

      return NextResponse.json(
        { error: "Upstream error", status: response.status, details: errorDetails },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Proxy request failed" },
      { status: 500 }
    );
  }
}
