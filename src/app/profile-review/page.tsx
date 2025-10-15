// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { marked } from "marked";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
// import { cn } from "@/lib/utils";

// interface GitHubAnalysisResponse {
//   status: string;
//   github_username: string;
//   analysis_steps: string[];
//   result: {
//     raw: string; 
//   };
// }

// export default function GitHubProfileReviewPage() {
//   const [username, setUsername] = useState("");
//   const [result, setResult] = useState<GitHubAnalysisResponse | null>(null);
//   const [parsed, setParsed] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const reportRef = useRef<HTMLDivElement>(null);

//   const API_URL =
//     "https://code-analysis-87738157215.asia-south1.run.app";

//   useEffect(() => {
//     if (result?.result?.raw) {
//       // Render markdown if wrapped in code blocks
//       const cleaned = result.result.raw.replace(/```(json|markdown)?/g, "");
//       const html = marked.parse(cleaned) as string;
//       setParsed(html);
//     }
//   }, [result]);

//   /** Generate Profile Review */
// //    const handleAnalyze = async () => {
// //   if (!username.trim()) {
// //     setError("Please provide a GitHub username.");
// //     return;
// //   }

// //   setLoading(true);
// //   setError("");
// //   setResult(null);

// //   try {
// //     const res = await axios.post(`/api/analyze-profile?repo_url=https://github.com/${username}`);
// //     setResult(res.data);
// //   } catch (err) {
// //     console.error(err);
// //     setError("Error connecting to the GitHub analysis API.");
// //   } finally {
// //     setLoading(false);
// //   }
// // };
// const handleAnalyze = async () => {
//   if (!username.trim()) {
//     setError("Please provide a valid GitHub username.");
//     return;
//   }

//   setLoading(true);
//   setError("");
//   setResult(null);

//   try {
//     const repoUrl = `https://github.com/${username.trim()}`;
//     const res = await axios.post(`https://code-analysis-87738157215.asia-south1.run.app/analyze?repo_url=${encodeURIComponent(repoUrl)}`);
//     setResult(res.data);
//   } catch (err) {
//     setError("Error connecting to the GitHub analysis API.");
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };


//   /** Copy */
//   const handleCopy = () => {
//     if (result?.result?.raw) {
//       navigator.clipboard.writeText(result.result.raw);
//     }
//   };

//   /** Download as .md */
//   const handleDownload = () => {
//     if (result?.result?.raw) {
//       const blob = new Blob([result.result.raw], {
//         type: "text/plain;charset=utf-8",
//       });
//       saveAs(blob, `${result.github_username}_profile_review.md`);
//     }
//   };

//   /** Download as PDF */
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
//           Analyze any GitHub profile to uncover skills, strengths, and developer
//           insights.
//         </p>

//         {/* Input Form */}
//         <div className="grid grid-cols-1 gap-4 mt-8">
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="p-3 z-10 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg"
//             placeholder="Enter GitHub username (e.g. yash700701)"
//           />
//         </div>

//         {/* Analyze Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleAnalyze}
//             disabled={loading}
//             className="shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg px-6 py-3 hover:shadow-lg cursor-pointer"
//           >
//             {loading ? "Analyzing..." : "Analyze Profile"}
//           </button>
//         </div>

//         {error && <p className="text-red-500 font-medium">{error}</p>}

//         {/* Output */}
//         {result && (
//           <div
//             ref={reportRef}
//             className="mt-8 p-6 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg space-y-4"
//           >
//             <h2 className="text-xl font-semibold mb-2">
//               📄 Analysis Report — {result.github_username}
//             </h2>

//             <div className="text-sm md:text-base text-black leading-relaxed space-y-3">
//               {/* Render Analysis Steps */}
//               <ul className="list-disc list-inside mb-4">
//                 {result.analysis_steps.map((step, idx) => (
//                   <li key={idx}>{step}</li>
//                 ))}
//               </ul>

//               {/* Render Markdown Analysis */}
//               <div dangerouslySetInnerHTML={{ __html: parsed }} />
//             </div>

//             {/* Actions */}
//             <div className="flex gap-4 mt-4">
//               <button
//                 onClick={handleCopy}
//                 className="px-4 py-2 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg hover:shadow-lg"
//               >
//                 📋 Copy
//               </button>
//               <button
//                 onClick={handleDownload}
//                 className="px-4 py-2 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg hover:shadow-lg"
//               >
//                 ⬇️ Download .md
//               </button>
//               <button
//                 onClick={handleDownloadPDF}
//                 className="px-4 py-2 shadow-md inset-shadow-2xs inset-shadow-white bg-zinc-100 shadow-zinc-500 rounded-lg hover:shadow-lg"
//               >
//                 📄 Download PDF
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
  result: { raw: string };
}

export default function GitHubProfileReviewPage() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<GitHubAnalysisResponse | null>(null);
  const [parsed, setParsed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reportRef = useRef<HTMLDivElement>(null);

  const API_URL = "https://code-analysis-87738157215.asia-south1.run.app";

  /** Convert Markdown → HTML when result updates */
  useEffect(() => {
    if (result?.result?.raw) {
      const cleaned = result.result.raw.replace(/```(json|markdown)?/g, "");
      const html = marked.parse(cleaned) as string;
      setParsed(html);
    }
  }, [result]);

  /** Analyze GitHub Profile */
  const handleAnalyze = async () => {
  if (!username.trim()) {
    setError("Please provide a valid GitHub username or repo path.");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  const repoUrl = `https://github.com/${username.trim()}`;

  try {
    const res = await axios.post(
      `${API_URL}/analyze?repo_url=${encodeURIComponent(repoUrl)}`,
      {},
      { timeout: 60000 }
    );

    console.log("🔍 Raw API response:", res.data);

    // 🧠 Normalize API response into your expected shape
    const normalizedResult = {
      status: "success",
      github_username: username.trim(),
      analysis_steps: ["Languages detected", "Profile summary generated"],
      result: {
        raw: `### 🧠 GitHub Repository Analysis\n\n**Languages:**\n\`\`\`json\n${JSON.stringify(
          res.data.languages,
          null,
          2
        )}\n\`\`\`\n\n**Summary:**\n${res.data.summary}`,
      },
    };

    setResult(normalizedResult);
  } catch (err: any) {
    console.error("Analysis Error:", err);

    if (err.response) {
      setError(`Server Error: ${err.response.status} ${err.response.statusText}`);
    } else if (err.request) {
      setError("Network error: Unable to reach the analysis server.");
    } else {
      setError(err.message || "An unknown error occurred.");
    }
  } finally {
    setLoading(false);
  }
};

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
          Analyze any GitHub profile to uncover skills, strengths, and developer insights.
        </p>

        {/* Input */}
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
            disabled={loading}
            className={`shadow-md bg-zinc-100 shadow-zinc-500 rounded-lg px-6 py-3 hover:shadow-lg cursor-pointer transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
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
          <div
          ref={reportRef}
          className="max-w-4xl mx-auto mt-12 rounded-2xl bg-white border border-gray-200 shadow-lg ring-1 ring-gray-100 p-10 flex flex-col space-y-8"
        >
          {/* Header */}
          <header className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7V5m0 0L8 9m4-4l4 4" />
              </svg>
              GitHub Profile Analysis — {result.github_username}
            </h2>
            <span className="text-sm text-gray-500 italic">Generated on {new Date().toLocaleDateString()}</span>
          </header>

          {/* Steps */}
          <section className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-medium mb-4 text-gray-700">Analysis Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-800">
              {result.analysis_steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </section>

          {/* Markdown Analysis */}
          <section
            className="prose max-w-none prose-indigo prose-lg text-gray-900"
            dangerouslySetInnerHTML={{ __html: parsed }}
          />

          {/* Actions */}
          <footer className="flex flex-wrap gap-4 justify-end">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
              aria-label="Copy report markdown"
            >
              📋 Copy
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
              aria-label="Download markdown file"
            >
              ⬇️ Download .md
            </button>

            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
              aria-label="Download report as PDF"
            >
              📄 Download PDF
            </button>
          </footer>
        </div>
        )}
      </div>
    </div>
  );
}
