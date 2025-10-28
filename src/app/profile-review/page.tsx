
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { marked } from "marked";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
// import { cn } from "@/lib/utils";
// import type { AxiosError } from "axios";
// interface GitHubAnalysisResponse {
//   status: string;
//   github_username: string;
//   analysis_steps: string[];
//   result: { raw: string };
// }

// export default function GitHubProfileReviewPage() {
//   const [username, setUsername] = useState("");
//   const [result, setResult] = useState<GitHubAnalysisResponse | null>(null);
//   const [parsed, setParsed] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const reportRef = useRef<HTMLDivElement>(null);

//   /** Convert Markdown → HTML when result updates */
//   useEffect(() => {
//     if (result?.result?.raw) {
//       const cleaned = result.result.raw.replace(/```(json|markdown)?/g, "");
//       const html = marked.parse(cleaned) as string;
//       setParsed(html);
//     }
//   }, [result]);

//   /** Analyze GitHub Profile */
//     const handleAnalyze = async () => {
//       if (!username.trim()) {
//         setError("Please provide a valid GitHub username.");
//         return;
//       }

//       setLoading(true);
//       setError("");
//       setResult(null);

//       try {
//         const response = await fetch(
//           "https://github-analysis-87738157215.europe-west1.run.app/analyze",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ github_username: username.trim() }),
//           }
//         );

//         if (!response.ok) {
//           const text = await response.text();
//           setError(`Server Error: ${response.status} ${text}`);
//           return;  // <--- Important to stop execution here
//         }

//         const data = await response.json();
//         console.log("🔍 Raw API response:", data);

//       const normalizedResult = {
//         status: "success",
//         github_username: username.trim(),
//         analysis_steps: ["Languages detected", "Profile summary generated"],
//         result: {
//           raw: `### 🧠 GitHub Repository Analysis

//       **Languages:**

//       \`\`\`json
//       ${JSON.stringify(data.languages && Object.keys(data.languages).length ? data.languages : { "No data": "No languages detected" }, null, 2)}
//       \`\`\`

//       **Summary:**
//       ${data.summary?.trim() ? data.summary : "No summary available."}`,
//         },
//       };
//         setResult(normalizedResult);
//       } catch (err) {
//         console.error("Analysis Error:", err);
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unknown error occurred.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//   /** Copy raw markdown */
//   const handleCopy = () => {
//     if (result?.result?.raw) {
//       navigator.clipboard.writeText(result.result.raw);
//     }
//   };

//   /** Download .md file */
//   const handleDownload = () => {
//     if (result?.result?.raw) {
//       const blob = new Blob([result.result.raw], {
//         type: "text/plain;charset=utf-8",
//       });
//       saveAs(blob, `${result.github_username}_profile_review.md`);
//     }
//   };

//   /** Download PDF snapshot */
//   const handleDownloadPDF = async () => {
//     if (reportRef.current) {
//       const canvas = await html2canvas(reportRef.current, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${result?.github_username}_profile_review.pdf`);
//     }
//   };

//   return (
//     <div className="bg-zinc-100 min-h-screen">
//       <InteractiveGridPattern
//         className={cn(
//           "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
//           "inset-x-0 inset-y-[20%] h-[100%] skew-y-12 pointer-events-none"
//         )}
//       />

//       <div className="max-w-5xl mx-auto p-6 pt-16 space-y-6">
//         <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
//           🧑‍💻 GitHub Profile Review Assistant
//         </h1>
//         <p className="text-gray-600">
//           Analyze any GitHub profile to uncover skills, strengths, and developer insights.
//         </p>

//         {/* Input */}
//         <div className="grid grid-cols-1 gap-4 mt-8">
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="p-3 shadow-md bg-zinc-100 shadow-zinc-500 rounded-lg"
//             placeholder="Enter GitHub username (e.g. yash700701)"
//           />
//         </div>

//         {/* Analyze Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleAnalyze}
//             disabled={loading}
//             className={`shadow-md bg-zinc-100 shadow-zinc-500 rounded-lg px-6 py-3 hover:shadow-lg cursor-pointer transition ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "🔍 Analyzing..." : "Analyze Profile"}
//           </button>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="text-red-600 font-medium bg-red-100 p-3 rounded-lg mt-4 border border-red-300">
//             ⚠️ {error}
//           </div>
//         )}

//         {/* Report Section */}
//         {result && (
//           <div
//           ref={reportRef}
//           className="max-w-4xl mx-auto mt-12 rounded-2xl bg-white border border-gray-200 shadow-lg ring-1 ring-gray-100 p-10 flex flex-col space-y-8"
//         >
//           {/* Header */}
//           <header className="flex items-center justify-between">
//             <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8 text-blue-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3" />
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 7V5m0 0L8 9m4-4l4 4" />
//               </svg>
//               GitHub Profile Analysis — {result.github_username}
//             </h2>
//             <span className="text-sm text-gray-500 italic">Generated on {new Date().toLocaleDateString()}</span>
//           </header>

//           {/* Steps */}
//           <section className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
//             <h3 className="text-xl font-medium mb-4 text-gray-700">Analysis Steps</h3>
//             <ol className="list-decimal list-inside space-y-2 text-gray-800">
//               {result.analysis_steps.map((step, idx) => (
//                 <li key={idx} className="leading-relaxed">{step}</li>
//               ))}
//             </ol>
//           </section>

//           {/* Markdown Analysis */}
//           <section
//             className="prose max-w-none prose-indigo prose-lg text-gray-900"
//             dangerouslySetInnerHTML={{ __html: parsed }}
//           /> 
//           {/* Actions */}
//           <footer className="flex flex-wrap gap-4 justify-end">
//             <button
//               onClick={handleCopy}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//               aria-label="Copy report markdown"
//             >
//               📋 Copy
//             </button>

//             <button
//               onClick={handleDownload}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//               aria-label="Download markdown file"
//             >
//               ⬇️ Download .md
//             </button>

//             <button
//               onClick={handleDownloadPDF}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//               aria-label="Download report as PDF"
//             >
//               📄 Download PDF
//             </button>
//           </footer>
//         </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

interface GitHubFullAnalysis {
  status: string;
  github_username: string;
  analysis_steps: string[];
  result: any;
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
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<GitHubFullAnalysis | null>(null);
  const [parsed, setParsed] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reportRef = useRef<HTMLDivElement>(null);

  /** Convert Markdown → HTML when result updates */
  useEffect(() => {
    if (result?.result?.raw) {
      const html = marked.parse(result.result.raw) as string;
      setParsed(html);
    }
  }, [result]);
/** Analyze GitHub Profile */
const handleAnalyze = async () => {
  if (!username.trim()) {
    setError("Please provide a valid GitHub username.");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);
  setSummary("");

  try {
    // 1️⃣ Call backend proxy
    const response = await fetch("/api/proxy-analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ github_username: username.trim() }),
    });

    const data = await response.json();
    console.log("🔍 Raw API response:", data);

    // 2️⃣ Handle upstream errors
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

    // 3️ Extract JSON from raw LLM response
    const raw = data.result?.raw || "";
    const jsonMatch = raw.match(/```json\n([\s\S]+?)\n```/);

    if (!jsonMatch) {
      setError("⚠️ Could not extract analysis content.");
      setLoading(false);
      return;
    }

    const parsedJson = JSON.parse(jsonMatch[1]);
    console.log("Parsed JSON:", parsedJson);

    // 4️ Fetch GitHub profile info
    const gitHubProfileData = await fetchGitHubProfile(username.trim());

    // 5️ Support multiple possible report keys
    const report =
      parsedJson.report ||
      parsedJson.skill_assessment_report ||
      parsedJson.github_analysis_report ||
      {};

    // 6️ Generate summary (robust fallback)
    const summaryText = getExecutiveSummary(report, gitHubProfileData || {});
    setSummary(summaryText);

    // 7️ Extract additional details
    const strengths =
      report.key_strengths_and_areas_for_improvement?.strengths || [];
    const improvements =
      report.key_strengths_and_areas_for_improvement?.areas_for_improvement ||
      [];
    const repos = Array.isArray(report.repos) ? report.repos : [];
    const skills = Array.isArray(report.skills) ? report.skills : [];

    // 8️ Normalize final result
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
        bio: summaryText, // show clean summary
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

/** Robust Executive Summary Fallback */
function getExecutiveSummary(report: any, profile: any) {
  let summary = (report.executive_summary || "").trim();

  const noDataKeywords = ["not being found", "no data available"];
  const isNoData =
    !summary ||
    summary.length < 20 ||
    noDataKeywords.some((kw) => summary.toLowerCase().includes(kw));

  if (isNoData) {
    // Build minimal fallback summary from GitHub profile
    const name = profile?.name || profile?.username || "This user";
    const followers = profile?.followers ?? 0;
    const following = profile?.following ?? 0;
    const bio = profile?.bio ? ` Bio: "${profile.bio}"` : "";

    summary = `${name} has ${followers} follower${
      followers !== 1 ? "s" : ""
    } and is following ${following} user${following !== 1 ? "s" : ""}.${bio} Limited public data is available to generate a detailed executive summary.`;
  }

  return summary;
}

  /** Copy raw markdown */
  const handleCopy = () => {
    if (result?.result?.raw) {
      navigator.clipboard.writeText(result.result.raw);
    }
  };

  /** Download .md file */
  const handleDownload = () => {
    if (result?.result?.raw) {
      const blob = new Blob([result.result.raw], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, `${result.github_username}_profile_review.md`);
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
const noDataKeywords = ["not being found", "no data available"];

const isNoData = noDataKeywords.some(keyword =>
  summary.toLowerCase().includes(keyword)
);

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
            className={`shadow-md bg-zinc-100 shadow-zinc-500 rounded-lg px-6 py-3 hover:shadow-lg cursor-pointer transition ${
              loading || !username.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "🔍 Analyzing..." : "Analyze Profile"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-red-600 font-medium bg-red-100 p-3 rounded-lg mt-4 border border-red-300">
            ⚠️ {error}
          </div>
        )}

        {/* Report Section */}
        {result && (
          <div ref={reportRef} className="space-y-6 mt-6">
            {/* Profile Section */}
            <section className="profile-section bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
              {result.profile.avatar_url && (
                <img
                  src={result.profile.avatar_url}
                  alt={`${result.profile.username}'s avatar`}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold">
                  {result.profile.name} (@{result.profile.username})
                </h2>
                <p className="text-gray-600 mt-2">{result.profile.bio}</p>
                <p className="text-gray-500 mt-1">
                  Followers: {result.profile.followers} • Following:{" "}
                  {result.profile.following}
                </p>
              </div>
            </section>

            {/* 🧠 Executive Summary Section */}
            {/* <section className="summary-section bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">🧠 Executive Summary</h3>
              {isNoData ? (
                <p className="text-gray-500 italic">
                  Sorry, there is insufficient data to generate a detailed analysis for this user.
                </p>
              ) : (
                <p className="text-gray-800 whitespace-pre-line">{summary}</p>
              )}
            </section> */}

            <section className="summary-section bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">🧠 Executive Summary</h3>
            <p className="text-gray-800 whitespace-pre-line">{summary}</p>
          </section>

            {/* Repositories Section */}
            {Array.isArray(result.repos) && result.repos.length > 0 && (
              <section className="repos-section bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">📦 Repositories</h3>
                <ul className="space-y-3">
                  {result.repos.map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {repo.name}
                      </a>
                      <p className="text-gray-600">{repo.description}</p>
                      <p className="text-sm text-gray-500">
                        ⭐ {repo.stars} | Forks: {repo.forks} | Language:{" "}
                        {repo.language}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Skills Section */}
            {Array.isArray(result.skills) && result.skills.length > 0 && (
              <section className="skills-section bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">🛠️ Skills</h3>
                <ul className="list-disc pl-6">
                  {result.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Strengths Section */}
            {Array.isArray(result.strengths) && result.strengths.length > 0 && (
              <section className="strengths-section bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">💪 Strengths</h3>
                <ul className="list-disc pl-6">
                  {result.strengths.map((strength) => (
                    <li key={strength}>{strength}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Improvements Section */}
            {Array.isArray(result.improvements) && result.improvements.length > 0 && (
              <section className="improvements-section bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">🔧 Areas for Improvement</h3>
                <ul className="list-disc pl-6">
                  {result.improvements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Buttons */}
            <div className="space-x-4 mt-4">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Copy Raw JSON
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Download Markdown
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
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
