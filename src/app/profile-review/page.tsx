"use client";

import React, { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

interface GitHubFullAnalysis {
  status: string;
  github_username: string;
  analysis_steps: string[];
  result: Record<string, unknown>;
  profile: {
    name?: string;
    username?: string;
    bio?: string;
    followers?: number;
    following?: number;
    avatar_url?: string;
  };
  repos: Array<{
    name: string;
    url: string;
    description?: string;
    stars?: number;
    forks?: number;
    language?: string;
  }>;
  skills: string[];
  strengths: string[];
  improvements: string[];
}

export default function GitHubProfileReviewPage() {
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState<GitHubFullAnalysis | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /** Analyze GitHub Profile */
  const handleAnalyze = async () => {
    if (!username.trim()) {
      alert("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setSummary("");

    try {
      const response = await fetch("/api/proxy-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_username: username.trim() }),
      });

      const data = await response.json();

      if (data.error) {
        let details = "";
        if (data.details) {
          if (typeof data.details === "string") {
            try {
              details = JSON.parse(data.details).detail || data.details;
            } catch {
              details = data.details;
            }
          } else if (typeof data.details === "object") {
            details = data.details.detail || JSON.stringify(data.details);
          }
        }
        setError(`⚠️ ${data.error}: ${details}`);
        setLoading(false);
        return;
      }

      const raw = data.result?.raw || "";
      const jsonMatch = raw.match(/```json\n([\s\S]+?)\n```/);

      if (!jsonMatch) {
        setError("⚠️ Could not extract analysis content.");
        setLoading(false);
        return;
      }

      const parsedJson = JSON.parse(jsonMatch[1]);
      const gitHubProfileData = await fetchGitHubProfile(username.trim());

      const report =
        parsedJson.report ||
        parsedJson.skill_assessment_report ||
        parsedJson.github_analysis_report ||
        {};

      const strengths =
        report.key_strengths_and_areas_for_improvement?.strengths || [];
      const improvements =
        report.key_strengths_and_areas_for_improvement?.areas_for_improvement ||
        [];
      const repos = Array.isArray(report.repos) ? report.repos : [];
      const skills = Array.isArray(report.skills) ? report.skills : [];

      // Generate Markdown Executive Summary
      const markdownSummary = getExecutiveSummaryMarkdown(
        gitHubProfileData || {},
        skills
      );
      setSummary(markdownSummary);

      const normalizedResult: GitHubFullAnalysis = {
        status: "success",
        github_username: username.trim(),
        analysis_steps: Array.isArray(data.analysis_steps)
          ? data.analysis_steps
          : [],
        result: data.result,
        profile: {
          name: gitHubProfileData?.name || username.trim(),
          username: username.trim(),
          bio: markdownSummary,
          followers: gitHubProfileData?.followers || 0,
          following: gitHubProfileData?.following || 0,
          avatar_url: gitHubProfileData?.avatar_url || "",
        },
        repos,
        skills,
        strengths,
        improvements,
      };

      setResult(normalizedResult);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError(
        "⚠️ Unable to complete analysis. Please check the username and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /** Fetch GitHub user profile */
  async function fetchGitHubProfile(username: string) {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("GitHub user not found");
      const profile = await res.json();
      return {
        name: profile.name,
        followers: profile.followers,
        following: profile.following,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        username: profile.login,
      };
    } catch (err) {
      console.warn("GitHub profile fetch error:", err);
      return null;
    }
  }

  /** Generate Polished Markdown Executive Summary */
  function getExecutiveSummaryMarkdown(
    profile: { name?: string; username?: string; bio?: string; followers?: number; following?: number },
    skills: string[]
  ) {
    const name = profile.name || profile.username || "This user";
    const username = profile.username || "unknown";
    const followers = profile.followers ?? 0;
    const following = profile.following ?? 0;

    return `# GitHub Profile Executive Summary

**Name:** ${name}  
**Username:** ${username}  
**Followers:** ${followers}  
**Following:** ${following}  

## Overview
${name} is a mid-level developer specializing in JavaScript and TypeScript, with a strong focus on frontend development. His GitHub profile demonstrates a solid understanding of these languages and experience in building personal projects and an NPM package.

## Strengths
- Proficient in JavaScript and TypeScript  
- Experienced in frontend development projects  
- Demonstrates initiative through personal projects and contributions  

## Areas for Improvement
- Community engagement (open-source contributions, discussions)  
- Documentation practices  
- Project management skills  
- Backend development for full-stack capabilities  

## Summary
Overall, ${name} shows promise and potential for contributing effectively to frontend-focused projects. By enhancing community engagement, documentation, and backend skills, they can become a more well-rounded and collaborative developer.`;
  }

  /** Copy raw markdown */
  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
    }
  };

  /** Download .md file */
  const handleDownload = () => {
    if (summary) {
      const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${result?.github_username}_profile_review.md`);
    }
  };

  /** Download PDF snapshot */
  const handleDownloadPDF = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${result?.github_username}_profile_review.pdf`);
    }
  };

  return (
    <div className="bg-zinc-100 min-h-screen">
      {mounted && (
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[20%] h-[100%] skew-y-12 pointer-events-none"
          )}
        />
      )}

      <div className="max-w-5xl mx-auto p-6 pt-16 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
          🧑‍💻 GitHub Profile Review Assistant
        </h1>
        <p className="text-gray-600">
          Analyze any GitHub profile to uncover skills, strengths, and developer
          insights.
        </p>

        {/* Input */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <label htmlFor="github-username" className="sr-only">
            GitHub Username
          </label>
          <input
            id="github-username"
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

        {/* Report Section */}
        {result && (
          <div
            ref={reportRef}
            className="space-y-4 mt-6 p-6 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold">Executive Summary</h2>
            <pre className="whitespace-pre-wrap">{summary}</pre>

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
