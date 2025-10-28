"use client";

import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const InteractiveGridPattern = dynamic(
  () =>
    import("@/components/magicui/interactive-grid-pattern").then(
      (mod) => mod.InteractiveGridPattern
    ),
  { ssr: false }
);


interface GitHubProfile {
  username?: string;
  name?: string;
  avatar_url?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
}

interface GitHubAnalysisResponse {
  profile: GitHubProfile;
  analysis?: { executive_summary?: string; summary?: string };
}

export default function GitHubProfileReviewPage() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<GitHubAnalysisResponse | null>(null);
  const [summary, setSummary] = useState("");
  const [followersDisplay, setFollowersDisplay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reportRef = useRef<HTMLDivElement>(null);

  // 🔍 Analyze GitHub user
  const handleAnalyze = async () => {
    if (!username.trim()) return alert("Please enter a GitHub username");

    setLoading(true);
    setError("");
    setResult(null);
    setSummary("");
    setFollowersDisplay("");

    try {
      const res = await fetch("/api/proxy-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_username: username.trim() }),
      });

      const data: GitHubAnalysisResponse & { error?: string } = await res.json();

      if (data.error) {
        setError(`⚠️ ${data.error}`);
        setLoading(false);
        return;
      }

      const profile = data.profile;

      // 🪄 Fallback summary
      const fallbackSummary = `GitHub user ${profile.name || profile.username} has ${profile.followers ?? 0} followers, follows ${profile.following ?? 0}, and has ${profile.public_repos ?? 0} public repositories.`;

      const executiveSummary =
        data.analysis?.executive_summary?.trim() ||
        data.analysis?.summary?.trim() ||
        fallbackSummary;

      setSummary(executiveSummary);
      setFollowersDisplay(`Followers: ${profile.followers ?? 0} | Following: ${profile.following ?? 0}`);
      setResult(data);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError("⚠️ Unable to complete analysis. Please check the username and try again.");
    } finally {
      setLoading(false);
    }
  };

  // 📋 Copy summary to clipboard
  const handleCopy = () => summary && navigator.clipboard.writeText(summary);

  // 💾 Download Markdown
  const handleDownload = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${result?.profile.username || "github_user"}_profile_review.md`);
  };

  // 📄 Download PDF
  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${result?.profile.username || "github_user"}_profile_review.pdf`);
  };

  return (
    <div className="bg-zinc-100 min-h-screen relative">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[20%] h-[100%] skew-y-12 pointer-events-none"
        )}
      />

      <div className="max-w-5xl mx-auto p-6 pt-16 space-y-6 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
          🧑‍💻 GitHub Profile Review Assistant
        </h1>
        <p className="text-gray-600">
          Analyze any GitHub profile to uncover skills, strengths, and developer insights.
        </p>

        {/* Username Input */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 shadow-md bg-zinc-100 shadow-zinc-500 rounded-lg"
            placeholder="Enter GitHub username (e.g. yash700701)"
          />
        </div>

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={handleAnalyze}
            disabled={loading || !username.trim()}
            className={`shadow-md bg-zinc-100 shadow-zinc-500 rounded-lg px-6 py-3 hover:shadow-lg transition ${
              loading || !username.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "🔍 Analyzing..." : "Analyze Profile"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-red-600 font-medium bg-red-100 p-3 rounded-lg mt-4 border border-red-300">
            {error}
          </div>
        )}

        {/* Report Display */}
        {result && (
          <div ref={reportRef} className="space-y-4 mt-6 p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              {result.profile.avatar_url && (
                <img
                  src={result.profile.avatar_url}
                  alt={`${result.profile.username}'s avatar`}
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold">
                  {result.profile.name || result.profile.username}
                </h2>
                <p className="text-gray-500">@{result.profile.username}</p>
                <p className="text-gray-600 mt-1">{followersDisplay}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-lg">Executive Summary</h3>
              <pre className="whitespace-pre-wrap mt-2">{summary}</pre>
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-zinc-200 rounded hover:bg-zinc-300"
              >
                Copy Markdown
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-zinc-200 rounded hover:bg-zinc-300"
              >
                Download .md
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-zinc-200 rounded hover:bg-zinc-300"
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
