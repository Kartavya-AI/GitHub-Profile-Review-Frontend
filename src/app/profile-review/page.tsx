"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { marked } from "marked";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

interface GitHubAnalysisResponse {
  status: string;
  github_username: string;
  analysis_steps: string[];
  result: {
    raw: string; // markdown or JSON string
  };
}

export default function GitHubProfileReviewPage() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<GitHubAnalysisResponse | null>(null);
  const [parsed, setParsed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reportRef = useRef<HTMLDivElement>(null);

  const API_URL =
    "https://github-analysis-977121587860.europe-west1.run.app/analyze";

  useEffect(() => {
    if (result?.result?.raw) {
      // Render markdown if wrapped in code blocks
      const cleaned = result.result.raw.replace(/```(json|markdown)?/g, "");
      const html = marked.parse(cleaned) as string;
      setParsed(html);
    }
  }, [result]);

  /** Generate Profile Review */
  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError("Please provide a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post<GitHubAnalysisResponse>(API_URL, {
        github_username: username,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Error connecting to the GitHub analysis API.");
    } finally {
      setLoading(false);
    }
  };

  /** Copy */
  const handleCopy = () => {
    if (result?.result?.raw) {
      navigator.clipboard.writeText(result.result.raw);
    }
  };

  /** Download as .md */
  const handleDownload = () => {
    if (result?.result?.raw) {
      const blob = new Blob([result.result.raw], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, `${result.github_username}_profile_review.md`);
    }
  };

  /** Download as PDF */
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
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[20%] h-[100%] skew-y-12 pointer-events-none"
        )}
      />

      <div className="max-w-5xl mx-auto p-6 pt-16 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
          🧑‍💻 GitHub Profile Review Assistant
        </h1>
        <p className="text-gray-600">
          Analyze any GitHub profile to uncover skills, strengths, and developer
          insights.
        </p>

        {/* Input Form */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 z-10 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg"
            placeholder="Enter GitHub username (e.g. yash700701)"
          />
        </div>

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg px-6 py-3 hover:shadow-lg cursor-pointer"
          >
            {loading ? "Analyzing..." : "Analyze Profile"}
          </button>
        </div>

        {error && <p className="text-red-500 font-medium">{error}</p>}

        {/* Output */}
        {result && (
          <div
            ref={reportRef}
            className="mt-8 p-6 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg space-y-4"
          >
            <h2 className="text-xl font-semibold mb-2">
              📄 Analysis Report — {result.github_username}
            </h2>

            <div className="text-sm md:text-base text-black leading-relaxed space-y-3">
              {/* Render Analysis Steps */}
              <ul className="list-disc list-inside mb-4">
                {result.analysis_steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>

              {/* Render Markdown Analysis */}
              <div dangerouslySetInnerHTML={{ __html: parsed }} />
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleCopy}
                className="px-4 py-2 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg hover:shadow-lg"
              >
                📋 Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg hover:shadow-lg"
              >
                ⬇️ Download .md
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg hover:shadow-lg"
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
